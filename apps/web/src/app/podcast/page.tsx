"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Headphones, Play, Pause, Radio, Clock, SkipForward, ExternalLink, Volume2 } from "lucide-react";

interface LiveSegment {
  id: string;
  slug: string;
  titleAr: string;
  sectionNameAr: string;
  sourceNameAr: string;
  publishedAt: string;
}

export default function PodcastPage() {
  const [segments, setSegments] = useState<LiveSegment[]>([]);
  const [marketSummary, setMarketSummary] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [speed, setSpeed] = useState<number>(1.0);

  useEffect(() => {
    Promise.all([
      fetch("/api/v1/pulse").then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch("/api/v1/quotes").then((r) => (r.ok ? r.json() : null)).catch(() => null),
    ])
      .then(([pulse, market]) => {
        if (Array.isArray(pulse?.latestTopics)) {
          setSegments(pulse.latestTopics);
        }
        if (Array.isArray(market?.quotes)) {
          const gold = market.quotes.find((q: any) => q.symbol === "XAUUSD")?.price;
          const usdIls = market.quotes.find((q: any) => q.symbol === "USDILS")?.price;
          const parts: string[] = [];
          if (gold) parts.push(`سعر أونصة الذهب العالمي يسجل ${Number(gold).toFixed(2)} دولار`);
          if (usdIls) parts.push(`وسعر صرف الدولار مقابل الشيكل عند ${Number(usdIls).toFixed(2)}`);
          setMarketSummary(parts.join("، "));
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
      if (typeof window === "undefined" || !("speechSynthesis" in window) || segments.length === 0) {
        return;
      }
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
        if (idx + 1 < segments.length) {
          playSegment(idx + 1);
        } else {
          setIsPlaying(false);
        }
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

  return (
    <div className="container-custom py-10 max-w-5xl space-y-10">
      {/* استوديو البودكاست الأخضر الفاخر */}
      <header className="relative rounded-3xl overflow-hidden border border-emerald-500/35 bg-gradient-to-br from-[#021C14] via-[#062C20] to-[#010C09] text-white p-8 md:p-10 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/35 text-emerald-300 text-xs font-black">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>استوديو صوت الوطن · النشرة الصوتية الحية</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-emerald-200/70">سرعة القراءة:</span>
            {[0.85, 1.0, 1.2].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSpeed(r)}
                className={`px-2.5 py-1 rounded-lg font-mono font-bold cursor-pointer ${
                  speed === r
                    ? "bg-emerald-400 text-[#021C14]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {r}x
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <h1 className="text-3xl md:text-4xl font-black">
              إيجاز الأخبار والأسواق <span className="text-emerald-400">الصوتي المباشر</span>
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              توليد إذاعي فوري لأحدث العناوين المنشورة حالياً في قاعدة البيانات مقترنة بأسعار الذهب والصرف الحية.
            </p>
            {marketSummary && (
              <p className="text-xs font-bold text-[var(--gold)] pt-1">
                المؤشر المالي المدمج بالنشرة: {marketSummary}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              disabled={segments.length === 0}
              onClick={togglePlayback}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-300 text-[#021C14] flex items-center justify-center shadow-2xl hover:scale-105 transition-transform cursor-pointer disabled:opacity-50"
              aria-label={isPlaying ? "إيقاف النشرة" : "تشغيل النشرة"}
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ms-1" />}
            </button>
            <button
              type="button"
              disabled={segments.length === 0}
              onClick={() => playSegment((activeIdx + 1) % Math.max(segments.length, 1))}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
              aria-label="الخبر التالي"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* قائمة فقرات النشرة الصوتية الحية */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <h2 className="text-lg font-black text-[var(--text)] flex items-center gap-2">
            <Headphones className="w-5 h-5 text-emerald-500" />
            <span>نص النشرة وفقرات اليوم الحية ({segments.length})</span>
          </h2>
          {isPlaying && (
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span>قيد الإذاعة الآن — الفقرة {activeIdx + 1}</span>
            </span>
          )}
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 rounded-2xl bg-[var(--surface)] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {segments.map((seg, idx) => {
              const isCurrent = isPlaying && activeIdx === idx;
              return (
                <div
                  key={seg.id}
                  className={`rounded-2xl border p-4 flex items-center justify-between gap-4 transition-all ${
                    isCurrent
                      ? "border-emerald-500 bg-emerald-500/10 shadow-md"
                      : "border-[var(--border)] bg-[var(--surface)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => playSegment(idx)}
                    className="flex items-start gap-3 text-start flex-1 min-w-0 cursor-pointer"
                  >
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-black shrink-0 ${
                        isCurrent ? "bg-emerald-500 text-white" : "bg-[var(--bg)] text-[var(--text-muted)]"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="font-black text-emerald-500">{seg.sectionNameAr}</span>
                        <span className="text-[var(--text-muted)]">•</span>
                        <span className="text-[var(--text-muted)]">{seg.sourceNameAr}</span>
                        <span className="text-[var(--text-muted)] font-mono flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(seg.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-[var(--text)] leading-snug">
                        {seg.titleAr}
                      </h3>
                    </div>
                  </button>

                  <Link
                    href={`/article/${seg.id}/${seg.slug}`}
                    className="p-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] hover:border-emerald-500 text-[var(--text-muted)] hover:text-emerald-500 shrink-0"
                    title="قراءة الخبر الكامل"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
