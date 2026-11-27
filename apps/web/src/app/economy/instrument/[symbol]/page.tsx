import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getInstrumentDetails, getLatestQuotes } from "@/lib/dal";
import { derivePalestineGoldTable } from "@/lib/live-data/markets";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  ShieldCheck,
  ArrowRight,
  Activity,
  Info,
  Coins,
  DollarSign,
  Fuel,
  Sparkles,
  ExternalLink,
  Scale,
  Building2,
  RefreshCw,
  BarChart3,
  Flame,
  Globe2,
} from "lucide-react";

interface Props {
  params: Promise<{
    symbol: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  const inst = await getInstrumentDetails(symbol);

  if (!inst) {
    return {
      title: "الأداة المالية غير موجودة — الوطن الاقتصادي",
    };
  }

  return {
    title: `${inst.nameAr} (${inst.symbol}) — أسعار حية ومؤشرات | بورصة الوطن`,
    description: `رصد لحظي مباشر لسعر ${inst.nameAr}، أحدث التغيرات الحية، والبيانات المعتمدة من ${inst.provider} في سوق فلسطين والأسواق العالمية.`,
  };
}

export default async function InstrumentPage({ params }: Props) {
  const { symbol } = await params;
  const [inst, allQuotes] = await Promise.all([
    getInstrumentDetails(symbol),
    getLatestQuotes(["XAUUSD", "XAGUSD", "USDILS", "USDJOD", "EURUSD", "BRENT", "BTCUSD"]),
  ]);

  if (!inst) {
    notFound();
  }

  const isUp = inst.change && parseFloat(inst.change) > 0;
  const isDown = inst.change && parseFloat(inst.change) < 0;

  const statusConfig: Record<string, { label: string; badgeClass: string; dotClass: string }> = {
    LIVE: {
      label: "بث حي مباشر",
      badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-400/35",
      dotClass: "bg-emerald-400 animate-ping",
    },
    DELAYED: {
      label: "متأخر 15 دقيقة",
      badgeClass: "bg-amber-500/15 text-amber-300 border-amber-400/35",
      dotClass: "bg-amber-400",
    },
    CLOSE: {
      label: "سعر آخر إغلاق",
      badgeClass: "bg-slate-500/15 text-slate-300 border-slate-400/35",
      dotClass: "bg-slate-400",
    },
    UNAVAILABLE: {
      label: "بانتظار البيانات",
      badgeClass: "bg-rose-500/15 text-rose-300 border-rose-400/35",
      dotClass: "bg-rose-400",
    },
  };

  const statusInfo = statusConfig[inst.status] || statusConfig.UNAVAILABLE;

  // إعداد نقاط الرسم البياني SVG
  const historyPoints = inst.history || [];
  const prices = historyPoints.map((h) => h.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 100;
  const range = maxPrice - minPrice || 1;

  // توليد مسار SVG
  const chartWidth = 720;
  const chartHeight = 220;
  const svgPath =
    historyPoints.length > 1
      ? historyPoints
          .map((pt, index) => {
            const x = (index / (historyPoints.length - 1)) * chartWidth;
            const y = chartHeight - ((pt.price - minPrice) / range) * (chartHeight - 50) - 25;
            return `${index === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`;
          })
          .join(" ")
      : "";

  // اشتقاق بيانات الذهب في حال كان الرمز XAUUSD
  const isGold = inst.symbol.toUpperCase() === "XAUUSD";
  const isCurrency = inst.category === "fx";
  const isOil = inst.symbol.toUpperCase() === "BRENT" || inst.symbol.toUpperCase() === "WTI";

  const usdIlsQuote = allQuotes.find((q) => q.symbol === "USDILS");
  const usdJodQuote = allQuotes.find((q) => q.symbol === "USDJOD");

  const goldKarats = isGold && inst.price
    ? derivePalestineGoldTable(
        parseFloat(inst.price),
        usdIlsQuote?.price ? parseFloat(usdIlsQuote.price) : 3.65,
        usdJodQuote?.price ? parseFloat(usdJodQuote.price) : 0.709
      )
    : [];

  return (
    <div dir="rtl" className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 pb-20">
      {/* 1. الترويسة العلوية الأنيقة */}
      <div className="border-b border-white/10 bg-gradient-to-r from-black/80 via-[#19030a]/80 to-black/80 py-4">
        <div className="container-custom max-w-6xl mx-auto flex items-center justify-between text-xs text-stone-300">
          <Link
            href="/economy"
            className="flex items-center gap-2 hover:text-[var(--gold)] font-bold transition-colors group"
          >
            <ArrowRight className="w-4 h-4 rtl:rotate-0 transform group-hover:translate-x-1 transition-transform" />
            <span>العودة إلى بورصة الوطن الاقتصادي والأسواق الحية</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[11px] text-[var(--gold)] font-bold">
              قطاع: {inst.category.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="container-custom max-w-6xl mx-auto py-10 space-y-10">
        {/* 2. شاشة التداول الرئيسية الملكية (Financial Terminal Card) */}
        <div className="relative rounded-3xl border border-[var(--gold)]/30 bg-gradient-to-br from-[#1c020b]/90 via-[#120106]/90 to-[#0a0004]/90 p-7 md:p-10 shadow-2xl backdrop-blur-2xl space-y-8 overflow-hidden">
          <div className="pointer-events-none absolute -top-32 right-1/4 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl" />

          {/* الرأس: اسم المؤشر والأسعار اللحظية */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-bold border ${statusInfo.badgeClass}`}>
                  <span className={`w-2 h-2 rounded-full ${statusInfo.dotClass}`} />
                  <span>{statusInfo.label}</span>
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-[var(--gold)] font-bold">
                  {inst.symbol}
                </span>
                <span className="text-xs text-stone-400">
                  {inst.unit ? `لكل ${inst.unit}` : ""}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                {inst.nameAr}
              </h1>
              <p className="text-xs text-stone-400 font-medium">
                {inst.nameEn} · التداول الدولي المباشر
              </p>
            </div>

            {/* السعر الحي الكبير والتغير المئوي */}
            <div className="text-right md:text-left flex flex-col md:items-end">
              <div className="text-4xl md:text-6xl font-black font-mono text-white tracking-tight flex items-baseline gap-2">
                <span>{inst.price !== null ? inst.price : "—"}</span>
                <span className="text-lg font-bold text-[var(--gold)] font-sans">
                  {inst.currency || ""}
                </span>
              </div>

              {inst.changePct && (
                <div
                  className={`inline-flex items-center gap-1.5 font-mono font-black text-base mt-2 px-3 py-1 rounded-xl border ${
                    isUp
                      ? "text-emerald-300 bg-emerald-500/15 border-emerald-400/30"
                      : isDown
                      ? "text-rose-300 bg-rose-500/15 border-rose-400/30"
                      : "text-stone-300 bg-white/5 border-white/10"
                  }`}
                >
                  {isUp ? <TrendingUp className="w-4 h-4" /> : isDown ? <TrendingDown className="w-4 h-4" /> : null}
                  <span>
                    {isUp ? "+" : ""}
                    {inst.change} ({inst.changePct}%)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* شبكة الإحصاءات السريعة الأربع */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-[11px] text-stone-400 block">أعلى سعر (24 ساعة)</span>
              <strong className="font-mono text-base font-black text-emerald-400 block">
                {inst.high24h !== null && inst.high24h !== undefined ? inst.high24h : "—"} {inst.currency}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-[11px] text-stone-400 block">أدنى سعر (24 ساعة)</span>
              <strong className="font-mono text-base font-black text-rose-400 block">
                {inst.low24h !== null && inst.low24h !== undefined ? inst.low24h : "—"} {inst.currency}
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-[11px] text-stone-400 block">مزود البث المعتمد</span>
              <span className="font-bold text-xs text-[var(--gold)] block truncate mt-0.5">
                {inst.provider}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-[11px] text-stone-400 block">آخر تدقيق زمني</span>
              <span className="text-xs text-stone-300 font-mono block mt-0.5">
                {inst.asOf
                  ? new Date(inst.asOf).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
                  : "لحظي"}
              </span>
            </div>
          </div>

          {/* الرسم البياني للأداء اللحظي */}
          {svgPath && (
            <div className="relative z-10 space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="font-bold flex items-center gap-2 text-white">
                  <Activity className="w-4 h-4 text-[var(--gold)]" />
                  <span>مسار السعر خلال الجلسات الأخيرة</span>
                </span>
                <span className="font-mono text-[11px] bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                  النطاق: {minPrice.toFixed(2)} — {maxPrice.toFixed(2)} {inst.currency}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 border border-white/10 overflow-hidden shadow-inner">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-48 overflow-visible">
                  <line x1="0" y1="25" x2={chartWidth} y2="25" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                  <line x1="0" y1="110" x2={chartWidth} y2="110" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                  <line x1="0" y1="195" x2={chartWidth} y2="195" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

                  <path
                    d={svgPath}
                    fill="none"
                    stroke={isUp ? "#34d399" : isDown ? "#f87171" : "#f5b900"}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* 3. القطاع المالي المتخصص (الذهب الفلسطيني / العملات / النفط) */}
          {isGold && goldKarats.length > 0 && (
            <div className="relative z-10 space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-[var(--gold)]" />
                  <h3 className="text-lg font-black text-white">
                    تسعيرة غرام الذهب في السوق الفلسطيني (شيكل / دينار / دولار)
                  </h3>
                </div>
                <span className="text-[11px] text-stone-400">حساب فوري من سعر الأونصة الرسمي</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {goldKarats.map((k) => (
                  <div
                    key={k.karatNumber}
                    className="p-4 rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-b from-[var(--gold)]/10 to-black/50 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[var(--gold)]">{k.karat}</span>
                      <span className="text-[10px] text-stone-400 font-mono">نقاء {k.purityPct}</span>
                    </div>

                    <div className="text-2xl font-black font-mono text-white">
                      {k.ilsPerGram.toFixed(2)} <span className="text-xs font-sans text-stone-300">₪ / غرام</span>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-stone-400">
                      <span>{k.jodPerGram.toFixed(2)} د.أ</span>
                      <span>${k.usdPerGram.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* بطاقة تقاليد التداول في فلسطين */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-stone-300 leading-relaxed space-y-1">
                <strong className="text-[var(--gold)] block">ملاحظة السوق الفلسطيني (القدس، الضفة، غزة):</strong>
                <p>
                  العيار الأكثر طلباً وتداولاً في أسواق الصاغة الفلسطينية هو <strong>عيار 21</strong>. الأسعار المعروضة أعلاه هي أسعار الذهب الخام (الكسر الصافي) اللحظية بدون احتساب عمولة المصنعية التي تتراوح عادة بين 2.5 إلى 5 دنانير/شيكل للغرام حسب نوع المشغولات.
                </p>
              </div>
            </div>
          )}

          {isOil && (
            <div className="relative z-10 space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Fuel className="w-5 h-5 text-sky-400" />
                <h3 className="text-lg font-black text-white">
                  محددات تسعير المشتقات النفطية في الأراضي الفلسطينية
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <span className="text-[11px] text-sky-300 font-bold block">بنزين 95 أوكتان</span>
                  <p className="text-stone-300 leading-relaxed">
                    يحدد شهرياً من قبل الهيئة العامة للبترول الفلسطينية استناداً لمتوسط أسعار برنت وسعر صرف الشيكل مقابل الدولار.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <span className="text-[11px] text-amber-300 font-bold block">السولار والكاز</span>
                  <p className="text-stone-300 leading-relaxed">
                    سلعة حيوية للقطاع الزراعي والصناعي والنقل والمولدات في غزة والضفة، تخضع لرقابة حكومية على الأسعار.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
                  <span className="text-[11px] text-emerald-300 font-bold block">أسطوانة الغاز المنزلي (12 كغم)</span>
                  <p className="text-stone-300 leading-relaxed">
                    تسعيرة معلنة شهرياً مع خدمة التوصيل المقررة من وزارة الاقتصاد الوطني لحماية المستهلك من التلاعب.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* تنبيه الإفصاح المالي والنزاهة */}
          <div className="relative z-10 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200/90 leading-relaxed">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-300 mb-0.5">معايير الشفافية والإفصاح المالي في الوطن اليوم:</p>
              <p>
                تُبث هذه الأسعار مباشرة استناداً لبيانات البورصات العالمية الرسمية عبر «{inst.provider}». لا تقدم المنصة استشارات استثمارية أو مالية مضاربية، وهدف الخدمة إطلاع القارئ والمواطن والتاجر في فلسطين والوطن العربي على حقيقة الأسعار اللحظية بشفافية مطلقة وبلا وسطاء.
              </p>
            </div>
          </div>
        </div>

        {/* 4. شريط المؤشرات المالية ذات الصلة */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[var(--gold)]" />
              <span>مؤشرات وأسعار مالية أخرى مرتبطة</span>
            </h3>
            <Link href="/economy" className="text-xs text-[var(--gold)] hover:underline font-bold">
              عرض كامل البورصة ←
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {allQuotes
              .filter((q) => q.symbol !== inst.symbol)
              .slice(0, 6)
              .map((q) => (
                <Link
                  key={q.symbol}
                  href={`/economy/instrument/${q.symbol}`}
                  className="p-3.5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[var(--gold)]/40 hover:bg-white/[0.06] transition-all space-y-1 block group"
                >
                  <span className="text-[10px] text-stone-400 block group-hover:text-stone-300">{q.nameAr}</span>
                  <div className="font-mono text-sm font-black text-white group-hover:text-[var(--gold)]">
                    {q.price || "—"}
                  </div>
                  {q.changePct && (
                    <span className="text-[10px] font-mono text-emerald-400 block">
                      {q.changePct}%
                    </span>
                  )}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
