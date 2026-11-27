"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { HubsNav } from "@/components/HubsNav";
import {
  Headphones, Play, Pause, Radio, Clock, SkipForward, SkipBack, ExternalLink, Volume2,
  Mic, Activity, TrendingUp, TrendingDown, Coins, DollarSign, ChevronDown, ChevronUp,
  Newspaper, BarChart3, MapPin, CloudSun, Waves, Signal, type LucideIcon,
} from "lucide-react";

interface LiveSegment {
  id: string;
  slug: string;
  titleAr: string;
  sectionNameAr: string;
  sectionSlug?: string;
  sourceNameAr: string;
  publishedAt: string;
  isBreaking?: boolean;
}

interface PulseResponse {
  latestTopics?: LiveSegment[];
  activeSourcesCount?: number;
  generatedAt?: string;
}

interface MarketQuote {
  symbol: string;
  nameAr: string;
  price: string | null;
  changePct?: string | null;
  currency?: string | null;
}

interface QuotesResponse {
  quotes?: MarketQuote[];
  asOf?: string;
}

interface ProgramItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  icon: LucideIcon;
  accentClass: string;
}

const SECTION_BADGE_MAP: Record<string, string> = {
  فلسطين: "bg-emerald-500/15 text-emerald-300 border-emerald-400/35",
  سياسة: "bg-teal-500/15 text-teal-300 border-teal-400/35",
  اقتصاد: "bg-amber-500/15 text-[var(--gold)] border-amber-400/35",
  أسواق: "bg-amber-500/15 text-[var(--gold)] border-amber-400/35",
  رياضة: "bg-cyan-500/15 text-cyan-300 border-cyan-400/35",
  تكنولوجيا: "bg-sky-500/15 text-sky-300 border-sky-400/35",
  عربي: "bg-rose-500/15 text-rose-300 border-rose-400/35",
  دولي: "bg-indigo-500/15 text-indigo-300 border-indigo-400/35",
};

const PRIORITY_QUOTE_SYMBOLS = ["XAUUSD", "USDILS", "USDJOD", "EURUSD", "BRENT", "XAGUSD"] as const;
const STUDIO_WAVE_BARS = [28, 52, 76, 44, 92, 60, 84, 38, 96, 68, 50, 88, 72, 40, 94, 56, 80, 46, 66, 34];
const EQUALIZER_BARS = [45, 85, 60, 95, 50, 75, 40, 88];
const VOLUME_SEGMENTS = [1, 2, 3, 4, 5, 6, 7, 8];
const SPEED_OPTIONS = [0.85, 1.0, 1.2] as const;

const PROGRAM_GUIDE: ProgramItem[] = [
  {
    id: "news-bulletin",
    title: "نشرة الأخبار",
    subtitle: "العناوين السياسية والميدانية",
    description: "رصد متجدد لأبرز الأخبار العاجلة والتطورات الإقليمية والدولية فور صدورها عن الوكالات والمصادر المعتمدة.",
    badge: "تغطية فورية",
    icon: Newspaper,
    accentClass: "text-emerald-400 bg-emerald-500/15 border-emerald-400/30",
  },
  {
    id: "markets-review",
    title: "مراجعة الأسواق",
    subtitle: "الذهب والعملات والسلع",
    description: "متابعة حية لأسعار أونصة الذهب العالمية وأسعار صرف العملات الرئيسية مقابل الشيكل والدينار والدولار.",
    badge: "بيانات حية",
    icon: BarChart3,
    accentClass: "text-[var(--gold)] bg-amber-500/15 border-amber-400/30",
  },
  {
    id: "palestine-brief",
    title: "ملخص فلسطين",
    subtitle: "الميدان والقدس والضفة وغزة",
    description: "إحاطة صوتية مركزة للشأن الفلسطيني الداخلي والتطورات الميدانية والملفات الإنسانية والاقتصادية المحلية.",
    badge: "أولوية التحرير",
    icon: MapPin,
    accentClass: "text-teal-300 bg-teal-500/15 border-teal-400/30",
  },
  {
    id: "weather-climate",
    title: "الطقس والمناخ",
    subtitle: "الحالة الجوية والتنقل",
    description: "ملخص الأحوال الجوية ودرجات الحرارة والتغيرات المناخية المؤثرة على الحركة اليومية والزراعة والملاحة.",
    badge: "تحديث دوري",
    icon: CloudSun,
    accentClass: "text-cyan-300 bg-cyan-500/15 border-cyan-400/30",
  },
];

function getSectionBadgeClass(sectionNameAr: string): string {
  for (const [key, cls] of Object.entries(SECTION_BADGE_MAP)) {
    if (sectionNameAr.includes(key)) return cls;
  }
  return "bg-emerald-500/15 text-emerald-300 border-emerald-400/35";
}

function formatQuotePrice(quote: MarketQuote): string {
  if (!quote.price) return "—";
  const num = Number(quote.price);
  if (!Number.isFinite(num)) return quote.price;
  if (quote.symbol === "USDILS" || quote.symbol === "USDJOD") return num.toFixed(3);
  return num.toFixed(2);
}

export default function PodcastPage() {
  const [segments, setSegments] = useState<LiveSegment[]>([]);
  const [marketSummary, setMarketSummary] = useState<string>("");
  const [marketQuotes, setMarketQuotes] = useState<MarketQuote[]>([]);
  const [marketAsOf, setMarketAsOf] = useState<string | null>(null);
  const [activeSourcesCount, setActiveSourcesCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [speed, setSpeed] = useState<number>(1.0);
  const [expandedTranscripts, setExpandedTranscripts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    Promise.all([
      fetch("/api/v1/pulse")
        .then((r): Promise<PulseResponse | null> => (r.ok ? (r.json() as Promise<PulseResponse>) : Promise.resolve(null)))
        .catch(() => null),
      fetch("/api/v1/quotes")
        .then((r): Promise<QuotesResponse | null> => (r.ok ? (r.json() as Promise<QuotesResponse>) : Promise.resolve(null)))
        .catch(() => null),
    ])
      .then(([pulse, market]) => {
        if (Array.isArray(pulse?.latestTopics)) setSegments(pulse.latestTopics);
        if (typeof pulse?.activeSourcesCount === "number") setActiveSourcesCount(pulse.activeSourcesCount);
        if (Array.isArray(market?.quotes)) {
          const quotesList = market.quotes;
          const gold = quotesList.find((q) => q.symbol === "XAUUSD")?.price;
          const usdIls = quotesList.find((q) => q.symbol === "USDILS")?.price;
          const parts: string[] = [];
          if (gold) parts.push(`سعر أونصة الذهب العالمي يسجل ${Number(gold).toFixed(2)} دولار`);
          if (usdIls) parts.push(`وسعر صرف الدولار مقابل الشيكل عند ${Number(usdIls).toFixed(2)}`);
          setMarketSummary(parts.join("، "));

          const prioritized = PRIORITY_QUOTE_SYMBOLS.map((sym) => quotesList.find((q) => q.symbol === sym)).filter(
            (q): q is MarketQuote => Boolean(q && q.price)
          );
          setMarketQuotes(prioritized.length > 0 ? prioritized : quotesList.filter((q) => Boolean(q.price)).slice(0, 4));
          setMarketAsOf(market.asOf ?? null);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const playSegment = useCallback(
    (index: number) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window) || segments.length === 0) return;
      const idx = index % segments.length;
      const seg = segments[idx];
      if (!seg) return;

      window.speechSynthesis.cancel();
      const extraMarket = idx === 0 && marketSummary ? ` . وفي الأسواق الحية: ${marketSummary}` : "";
      const utterance = new SpeechSynthesisUtterance(
        `قسم ${seg.sectionNameAr}. نقلاً عن ${seg.sourceNameAr}: ${seg.titleAr}${extraMarket}`
      );
      utterance.lang = "ar-SA";
      utterance.rate = speed;
      utterance.onend = () => {
        if (idx + 1 < segments.length) playSegment(idx + 1);
        else setIsPlaying(false);
      };
      utterance.onerror = () => setIsPlaying(false);

      setActiveIdx(idx);
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    },
    [segments, speed, marketSummary]
  );

  const togglePlayback = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      playSegment(activeIdx);
    }
  };

  const toggleTranscript = (id: string) => {
    setExpandedTranscripts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const estimatedMinutes = useMemo(() => {
    if (segments.length === 0) return 0;
    const wordsCount = segments.reduce((acc, seg, idx) => {
      const baseText = `${seg.sectionNameAr} ${seg.sourceNameAr} ${seg.titleAr}`;
      const marketExtra = idx === 0 && marketSummary ? ` ${marketSummary}` : "";
      return acc + (baseText + marketExtra).trim().split(/\s+/).length;
    }, 0);
    return Math.max(1, Math.ceil(wordsCount / (130 * speed)));
  }, [segments, marketSummary, speed]);

  const activeSegment = segments[activeIdx] ?? null;
  const progressPct = segments.length > 0 ? Math.round(((activeIdx + 1) / segments.length) * 100) : 0;

  return (
    <div dir="rtl" className="min-h-screen bg-[#0E0407] text-white">
      <HubsNav current="/podcast" />
      <style>{`
        @keyframes studioEqPulse { 0%, 100% { transform: scaleY(0.28); opacity: 0.55; } 50% { transform: scaleY(1); opacity: 1; } }
        @keyframes studioWaveFlow { 0%, 100% { transform: scaleY(0.32); opacity: 0.35; } 50% { transform: scaleY(1); opacity: 0.9; } }
        @keyframes studioRingExpand { 0% { transform: scale(0.95); opacity: 0.75; } 70%, 100% { transform: scale(1.28); opacity: 0; } }
        @keyframes studioNumberReveal { 0% { opacity: 0; transform: translateY(6px); filter: blur(2px); } 100% { opacity: 1; transform: translateY(0); filter: blur(0); } }
        .studio-eq-bar { transform-origin: bottom center; animation: studioEqPulse 0.95s ease-in-out infinite; }
        .studio-wave-bar { transform-origin: center; animation: studioWaveFlow 1.25s ease-in-out infinite; }
        .studio-ring-ping { animation: studioRingExpand 1.9s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        .studio-num-transition { animation: studioNumberReveal 0.45s cubic-bezier(0.16, 1, 0.3, 1) both; }
      `}</style>

      <div className="container-custom py-8 md:py-12 max-w-6xl space-y-10">
        {/* استوديو البودكاست الإذاعي الفاخر */}
        <header className="relative rounded-3xl overflow-hidden border border-emerald-400/30 bg-gradient-to-br from-[#031E16] via-[#072B21] to-[#0E0407] p-6 sm:p-8 md:p-10 shadow-2xl">
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 -end-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -start-20 h-72 w-72 rounded-full bg-[#590018]/45 blur-3xl" />

          <div className="relative z-10 space-y-7">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-400/15 pb-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black">
                  <Radio className={`w-3.5 h-3.5 ${isPlaying ? "animate-pulse" : ""}`} />
                  <span>استوديو صوت الوطن · البث الإذاعي الحي</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#16060B]/85 border border-white/10 text-[11px] font-bold text-emerald-100/90">
                  <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-emerald-400 shadow-[0_0_10px_#34d399]" : "bg-teal-300/60"}`} />
                  <span>{isPlaying ? "ON AIR · على الهواء" : "READY · الاستوديو جاهز"}</span>
                </div>
                <div className="hidden sm:flex items-end gap-1 h-5 px-2.5 py-1 rounded-xl bg-black/30 border border-emerald-400/20" aria-hidden="true">
                  {EQUALIZER_BARS.map((heightPct, i) => (
                    <span key={i} style={{ height: isPlaying ? `${heightPct}%` : "24%", animationDelay: `${i * 0.11}s` }} className={`w-1 rounded-full bg-gradient-to-t from-emerald-500 to-teal-200 transition-all duration-300 ${isPlaying ? "studio-eq-bar" : "opacity-45"}`} />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-black/30 border border-white/10" aria-label="مؤشر مستوى الصوت">
                  <Volume2 className={`w-4 h-4 ${isPlaying ? "text-emerald-300" : "text-emerald-200/60"}`} />
                  <div className="flex items-end gap-0.5 h-3.5">
                    {VOLUME_SEGMENTS.map((bar) => (
                      <span key={bar} style={{ height: `${30 + bar * 8}%` }} className={`w-1 rounded-full transition-colors ${bar <= (isPlaying ? 7 : 5) ? "bg-emerald-400" : "bg-white/15"}`} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/35 border border-emerald-400/20 text-xs">
                  <span className="px-2 text-emerald-200/75 font-bold">السرعة</span>
                  {SPEED_OPTIONS.map((r) => (
                    <button key={r} type="button" onClick={() => setSpeed(r)} className={`px-2.5 py-1 rounded-xl font-mono font-bold transition-all cursor-pointer ${speed === r ? "bg-emerald-400 text-[#021C14] shadow-md shadow-emerald-500/30" : "text-emerald-100/80 hover:bg-white/10"}`}>
                      {r}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--gold)]">
                  <Mic className="w-4 h-4" />
                  <span>التحرير الصوتي الآلي من غرفة الأخبار المركزية</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                  إيجاز الأخبار والأسواق{" "}
                  <span className="bg-gradient-to-l from-emerald-300 via-teal-200 to-[var(--gold)] bg-clip-text text-transparent">الصوتي المباشر</span>
                </h1>
                <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed max-w-2xl">
                  بث إذاعي فوري لأحدث العناوين المنشورة حالياً في قاعدة البيانات مقترنة بأسعار الذهب والصرف الحية، بتقنية القراءة الصوتية العربية المباشرة.
                </p>
                <div className="rounded-2xl bg-[#16060B]/85 border border-emerald-400/25 p-4 space-y-2 backdrop-blur-md">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 font-black text-emerald-300">
                      <Activity className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`} />
                      <span>{isPlaying ? "يُذاع الآن" : "الفقرة المحددة للبث"}</span>
                    </span>
                    {activeSegment && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 text-[11px] font-bold">
                        {activeSegment.sectionNameAr} · {activeSegment.sourceNameAr}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-white leading-snug line-clamp-2">
                    {loading ? "جاري تحميل موجز غرفة الأخبار..." : activeSegment ? activeSegment.titleAr : "لا تتوفر فقرات إخبارية في الوقت الحالي."}
                  </p>
                  {marketSummary && <p className="text-xs font-bold text-[var(--gold)] pt-1 border-t border-white/10">المؤشر المالي المدمج بالنشرة: {marketSummary}</p>}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-3xl bg-[#16060B]/85 border border-emerald-400/30 p-6 overflow-hidden shadow-inner space-y-6">
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between gap-1 h-28 pointer-events-none opacity-45" aria-hidden="true">
                    {STUDIO_WAVE_BARS.map((h, idx) => (
                      <span key={idx} style={{ height: isPlaying ? `${h}%` : `${Math.max(18, Math.round(h * 0.4))}%`, animationDelay: `${idx * 0.07}s` }} className={`flex-1 rounded-full bg-gradient-to-t from-emerald-600/50 via-emerald-400/70 to-teal-200/80 transition-all duration-500 ${isPlaying ? "studio-wave-bar" : ""}`} />
                    ))}
                  </div>

                  <div className="relative z-10 flex items-center justify-center gap-4 pt-2">
                    <button type="button" disabled={segments.length === 0} onClick={() => playSegment((activeIdx - 1 + Math.max(segments.length, 1)) % Math.max(segments.length, 1))} className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-emerald-500/25 border border-white/15 hover:border-emerald-400/40 text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-40" aria-label="الخبر السابق">
                      <SkipBack className="w-5 h-5" />
                    </button>
                    <div className="relative flex items-center justify-center">
                      {isPlaying && (
                        <>
                          <span className="studio-ring-ping absolute inset-0 rounded-full border-2 border-emerald-400/70" />
                          <span className="studio-ring-ping absolute inset-0 rounded-full border border-teal-300/50" style={{ animationDelay: "0.7s" }} />
                        </>
                      )}
                      <button type="button" disabled={segments.length === 0} onClick={togglePlayback} className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 via-emerald-400 to-teal-200 text-[#021C14] flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.45)] hover:scale-105 active:scale-95 transition-transform cursor-pointer disabled:opacity-50" aria-label={isPlaying ? "إيقاف النشرة" : "تشغيل النشرة"}>
                        {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ms-1" />}
                      </button>
                    </div>
                    <button type="button" disabled={segments.length === 0} onClick={() => playSegment((activeIdx + 1) % Math.max(segments.length, 1))} className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-emerald-500/25 border border-white/15 hover:border-emerald-400/40 text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-40" aria-label="الخبر التالي">
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="relative z-10 space-y-2.5 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-emerald-200 flex items-center gap-1.5">
                        <Signal className="w-3.5 h-3.5 text-emerald-400" />
                        <span>الفقرة {segments.length > 0 ? activeIdx + 1 : 0} / {segments.length}</span>
                      </span>
                      <span className="text-[var(--gold)] flex items-center gap-1.5 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        <span>~{estimatedMinutes} د استماع</span>
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-black/50 border border-white/10 overflow-hidden">
                      <div style={{ width: `${progressPct}%` }} className="h-full rounded-full bg-gradient-to-l from-emerald-400 via-teal-300 to-[var(--gold)] transition-all duration-500" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-emerald-100/70">
                      <span>السرعة الحالية: {speed}x</span>
                      {activeSourcesCount !== null && <span>المصادر النشطة: {activeSourcesCount}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* لوحة ملخص الأسواق المالية الحية */}
        <section className="rounded-3xl border border-emerald-500/25 bg-[#16060B] p-6 md:p-8 shadow-xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-white flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <Coins className="w-5 h-5" />
                </span>
                <span>لوحة الأسواق المدمجة بالبث</span>
              </h2>
              <p className="text-xs text-zinc-400">بيانات الذهب والعملات والطاقة المستجلبة مباشرة من مزود الأسواق الحية</p>
            </div>
            {marketAsOf && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#0E0407] border border-emerald-500/25 text-xs text-emerald-300 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>تحديث {new Date(marketAsOf).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => <div key={i} className="h-28 rounded-2xl bg-[#0E0407] border border-white/5 animate-pulse" />)}
            </div>
          ) : marketQuotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketQuotes.map((quote, idx) => {
                const isNegative = Boolean(quote.changePct?.startsWith("-"));
                const isGold = quote.symbol === "XAUUSD";
                return (
                  <div key={quote.symbol} style={{ animationDelay: `${idx * 75}ms` }} className={`studio-num-transition rounded-2xl p-4 border transition-all ${isGold ? "bg-gradient-to-br from-[#241806] via-[#16060B] to-[#0E0407] border-[var(--gold)]/40" : "bg-[#0E0407] border-emerald-500/20 hover:border-emerald-400/45"}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[11px] font-mono font-bold text-emerald-400">{quote.symbol}</span>
                        <h3 className="text-sm font-black text-white truncate">{quote.nameAr}</h3>
                      </div>
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${isGold ? "bg-[var(--gold)]/15 text-[var(--gold)]" : "bg-emerald-500/15 text-emerald-400"}`}>
                        {isGold ? <Coins className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />}
                      </span>
                    </div>
                    <div className="mt-4 flex items-end justify-between gap-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className={`text-2xl font-black font-mono tracking-tight ${isGold ? "text-[var(--gold)]" : "text-white"}`}>{formatQuotePrice(quote)}</span>
                        {quote.currency && <span className="text-[11px] font-bold text-zinc-400">{quote.currency}</span>}
                      </div>
                      {quote.changePct && (
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-mono font-bold ${isNegative ? "bg-rose-500/15 text-rose-300" : "bg-emerald-500/15 text-emerald-300"}`}>
                          {isNegative ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                          <span>{quote.changePct}</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl bg-[#0E0407] border border-white/10 p-5 text-sm text-zinc-400">
              لم ترد مؤشرات أسعار حية من مزود الأسواق في هذه اللحظة.
            </div>
          )}
        </section>

        {/* الخط الزمني لفقرات النشرة الصوتية الحية */}
        <section className="rounded-3xl border border-white/10 bg-[#16060B] p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <h2 className="text-xl font-black text-white flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                <Headphones className="w-5 h-5" />
              </span>
              <span>نص النشرة وفقرات اليوم الحية ({segments.length})</span>
            </h2>
            {isPlaying && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-emerald-500/15 border border-emerald-400/35 text-xs font-black text-emerald-300">
                <Waves className="w-4 h-4 animate-pulse" />
                <span>قيد الإذاعة الآن — الفقرة {activeIdx + 1}</span>
              </span>
            )}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => <div key={i} className="h-24 rounded-2xl bg-[#0E0407] animate-pulse" />)}
            </div>
          ) : segments.length === 0 ? (
            <div className="rounded-2xl bg-[#0E0407] border border-white/10 p-6 text-center text-sm text-zinc-400">
              لا توجد فقرات منشورة متاحة للقراءة الصوتية حالياً.
            </div>
          ) : (
            <div className="relative ps-6 sm:ps-8 space-y-4">
              <div aria-hidden="true" className="absolute top-4 bottom-4 start-2.5 sm:start-3.5 w-0.5 bg-gradient-to-b from-emerald-400 via-teal-500/40 to-[#590018]/40" />
              {segments.map((seg, idx) => {
                const isCurrent = isPlaying && activeIdx === idx;
                const isSelected = activeIdx === idx;
                const isExpanded = Boolean(expandedTranscripts[seg.id]);
                const badgeClass = getSectionBadgeClass(seg.sectionNameAr);

                return (
                  <div key={seg.id} className="relative">
                    <span aria-hidden="true" className={`absolute -start-6 sm:-start-8 top-6 w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-mono font-black transition-all ${isCurrent ? "bg-emerald-400 border-emerald-200 text-[#021C14] shadow-[0_0_16px_rgba(52,211,153,0.75)] scale-110" : isSelected ? "bg-emerald-500/25 border-emerald-400 text-emerald-300" : "bg-[#0E0407] border-white/20 text-zinc-400"}`}>
                      {idx + 1}
                    </span>

                    <div className={`rounded-2xl border p-4 sm:p-5 transition-all ${isCurrent ? "border-emerald-400/70 bg-gradient-to-l from-emerald-500/15 via-[#072B21]/70 to-[#0E0407] shadow-[0_0_28px_-6px_rgba(16,185,129,0.45)]" : isSelected ? "border-emerald-500/35 bg-[#0E0407]" : "border-white/10 bg-[#0E0407]/85 hover:border-emerald-500/30"}`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <button type="button" onClick={() => playSegment(idx)} className="flex items-start gap-3 text-start flex-1 min-w-0 cursor-pointer group">
                          <div className="space-y-2 min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2 text-[11px]">
                              <span className={`px-2.5 py-0.5 rounded-full border font-black ${badgeClass}`}>{seg.sectionNameAr}</span>
                              <span className="text-zinc-400 font-semibold">{seg.sourceNameAr}</span>
                              <span className="text-zinc-400 font-mono inline-flex items-center gap-1">
                                <Clock className="w-3 h-3 text-emerald-400/80" />
                                {new Date(seg.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                              </span>
                              {isCurrent && (
                                <span className="inline-flex items-end gap-0.5 h-3.5 px-2 py-0.5 rounded-full bg-emerald-500/20" aria-label="قيد التشغيل">
                                  {[50, 95, 65, 85].map((h, waveIdx) => (
                                    <span key={waveIdx} style={{ height: `${h}%`, animationDelay: `${waveIdx * 0.14}s` }} className="studio-eq-bar w-0.5 rounded-full bg-emerald-300" />
                                  ))}
                                </span>
                              )}
                            </div>
                            <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors leading-snug">{seg.titleAr}</h3>
                          </div>
                        </button>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button type="button" onClick={() => toggleTranscript(seg.id)} className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#16060B] border border-white/10 hover:border-emerald-400/40 text-xs font-bold text-emerald-200/85 hover:text-emerald-300 transition-colors cursor-pointer" aria-expanded={isExpanded}>
                            <span>النص</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                          <Link href={`/article/${seg.id}/${seg.slug}`} className="p-2.5 rounded-xl bg-[#16060B] border border-white/10 hover:border-emerald-400 text-zinc-400 hover:text-emerald-300 transition-colors" title="قراءة الخبر الكامل">
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="mt-4 pt-3 border-t border-white/10 text-xs sm:text-sm text-emerald-100/85 leading-relaxed bg-[#16060B]/70 rounded-2xl p-3.5 space-y-1.5">
                          <div className="text-[11px] font-black text-emerald-400">نص القراءة الإذاعية للفقرة:</div>
                          <p>
                            قسم {seg.sectionNameAr}. نقلاً عن {seg.sourceNameAr}: {seg.titleAr}
                            {idx === 0 && marketSummary ? ` . وفي الأسواق الحية: ${marketSummary}` : ""}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* دليل برامج صوت الوطن */}
        <section className="space-y-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-black text-emerald-400">
              <Radio className="w-4 h-4" />
              <span>دليل البث التحريري</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              ماذا يتضمن بث <span className="text-emerald-400">«صوت الوطن»</span>؟
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              هيكل تحريري موحّد يجمع التطورات الإخبارية ومؤشرات الأسواق الحية والشأن الفلسطيني والأحوال الجوية في تجربة استماع متواصلة.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROGRAM_GUIDE.map((program) => {
              const Icon = program.icon;
              return (
                <article key={program.id} className="rounded-3xl border border-white/10 hover:border-emerald-400/40 bg-[#16060B] p-6 flex flex-col justify-between gap-4 transition-all hover:-translate-y-1 shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${program.accentClass}`}>
                        <Icon className="w-6 h-6" />
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#0E0407] border border-white/10 text-[10px] font-black text-emerald-300">
                        {program.badge}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-white">{program.title}</h3>
                      <p className="text-xs font-bold text-emerald-400/90">{program.subtitle}</p>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{program.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}