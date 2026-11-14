import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getInstrumentDetails } from "@/lib/dal";
import { TrendingUp, TrendingDown, Clock, ShieldCheck, ArrowRight, Activity, Info } from "lucide-react";

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
    title: `${inst.nameAr} (${inst.symbol}) — أسعار حية ومؤشرات | الوطن الاقتصادي`,
    description: `رصد مباشر لأسعار ${inst.nameAr}، أحدث التغيرات اللحظية، والبيانات المعتمدة من ${inst.provider} في سوق فلسطين والأسواق العالمية.`,
  };
}

export default async function InstrumentPage({ params }: Props) {
  const { symbol } = await params;
  const inst = await getInstrumentDetails(symbol);

  if (!inst) {
    notFound();
  }

  const isUp = inst.change && parseFloat(inst.change) > 0;
  const isDown = inst.change && parseFloat(inst.change) < 0;

  const statusConfig: Record<string, { label: string; badgeClass: string }> = {
    LIVE: { label: "مباشر لحظي", badgeClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
    DELAYED: { label: "متأخر 15 دقيقة", badgeClass: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    CLOSE: { label: "آخر إغلاق", badgeClass: "bg-slate-500/10 text-slate-600 border-slate-500/20" },
    UNAVAILABLE: { label: "بانتظار البيانات", badgeClass: "bg-rose-500/10 text-rose-600 border-rose-500/20" },
  };

  const statusInfo = statusConfig[inst.status] || statusConfig.UNAVAILABLE;

  // إعداد نقاط الرسم البياني SVG
  const historyPoints = inst.history || [];
  const prices = historyPoints.map((h) => h.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 100;
  const range = maxPrice - minPrice || 1;

  // توليد مسار SVG
  const chartWidth = 600;
  const chartHeight = 200;
  const svgPath =
    historyPoints.length > 1
      ? historyPoints
          .map((pt, index) => {
            const x = (index / (historyPoints.length - 1)) * chartWidth;
            const y = chartHeight - ((pt.price - minPrice) / range) * (chartHeight - 40) - 20;
            return `${index === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`;
          })
          .join(" ")
      : "";

  return (
    <div className="container-custom py-10 max-w-4xl mx-auto space-y-8">
      {/* شريط التنقل العلوي والرجوع */}
      <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
        <Link
          href="/economy"
          className="flex items-center gap-1 hover:text-[var(--primary)] font-bold transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <span>العودة إلى بورصة الوطن الاقتصادي</span>
        </Link>

        <span className="font-mono bg-[var(--surface)] px-2.5 py-1 rounded-md border border-[var(--border)]">
          {inst.category.toUpperCase()}
        </span>
      </div>

      {/* لوحة بطاقة الأداة الرئيسية */}
      <div className="card-luxury rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${statusInfo.badgeClass}`}>
                {statusInfo.label}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                {inst.symbol}
              </span>
            </div>
            <h1 className="text-3xl font-black text-[var(--text)]">
              {inst.nameAr}
            </h1>
            <p className="text-xs text-[var(--text-muted)] mt-0.5 font-medium">
              {inst.nameEn} · {inst.unit || ""}
            </p>
          </div>

          <div className="text-right md:text-left flex flex-col md:items-end">
            <div className="text-4xl font-black font-mono text-[var(--text)] tracking-tight">
              {inst.price !== null ? inst.price : "—"}{" "}
              <span className="text-base font-normal text-[var(--text-muted)] font-sans">
                {inst.currency || ""}
              </span>
            </div>

            {inst.changePct && (
              <div
                className={`flex items-center gap-1 font-mono font-bold text-sm mt-1 ${
                  isUp ? "text-emerald-500" : isDown ? "text-rose-500" : "text-[var(--text-muted)]"
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

        {/* شبكة الإحصاءات السريعة (24 ساعة) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)]">
            <span className="text-[11px] text-[var(--text-muted)] block">أعلى سعر (24 ساعة)</span>
            <span className="font-mono font-bold text-sm text-[var(--text)] mt-0.5 block">
              {inst.high24h !== null && inst.high24h !== undefined ? inst.high24h : "—"} {inst.currency}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)]">
            <span className="text-[11px] text-[var(--text-muted)] block">أدنى سعر (24 ساعة)</span>
            <span className="font-mono font-bold text-sm text-[var(--text)] mt-0.5 block">
              {inst.low24h !== null && inst.low24h !== undefined ? inst.low24h : "—"} {inst.currency}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)]">
            <span className="text-[11px] text-[var(--text-muted)] block">مزود البيانات المعتمد</span>
            <span className="font-bold text-xs text-[var(--primary)] mt-0.5 block truncate">
              {inst.provider}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)]">
            <span className="text-[11px] text-[var(--text-muted)] block">توقيت آخر تحديث</span>
            <span className="text-[11px] text-[var(--text-muted)] mt-0.5 block truncate font-mono">
              {inst.asOf ? new Date(inst.asOf).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }) : "غير محدد"}
            </span>
          </div>
        </div>

        {/* الرسم البياني للأداء اللحظي */}
        {svgPath ? (
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-3">
              <span className="font-bold flex items-center gap-1.5 text-[var(--text)]">
                <Activity className="w-4 h-4 text-[var(--primary)]" />
                <span>مسار السعر خلال الجلسات الأخيرة</span>
              </span>
              <span className="font-mono text-[10px]">
                نطاق: {minPrice.toFixed(2)} — {maxPrice.toFixed(2)} {inst.currency}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--border)] overflow-hidden">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-44 overflow-visible"
              >
                {/* خطوط شبكة إرشادية خفيفة */}
                <line x1="0" y1="20" x2={chartWidth} y2="20" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
                <line x1="0" y1="100" x2={chartWidth} y2="100" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
                <line x1="0" y1="180" x2={chartWidth} y2="180" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />

                {/* مسار السعر */}
                <path
                  d={svgPath}
                  fill="none"
                  stroke={isUp ? "#10B981" : isDown ? "#EF4444" : "#D4AF37"}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ) : null}

        {/* تنبيه النزاهة والشفافية المالية (القاعدة 5) */}
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold mb-0.5">ملاحظة الإفصاح المالي ومصدر البيانات:</p>
            <p>
              يتم جلب هذه البيانات من «{inst.provider}» وتخزينها مؤقتاً لتقديم أفضل تجربة تصفح. في حال توقف الاتصال المباشر بالمزود يتم تصنيف السعر كـ «متأخر» فوراً وفق معايير الشفافية الصحفية في الوطن اليوم.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
