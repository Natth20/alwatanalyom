import Link from "next/link";
import { Metadata } from "next";
import { computeLivePulseAnalytics } from "@/lib/live-data/pulse";
import { Activity, BarChart3, Flame, Hash, ShieldCheck, Radio, Eye, Clock, ArrowUpLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "نبض البيانات والرادار الإحصائي المباشر — الوطن اليوم",
  description: "تحليلات إحصائية حية محسوبة مباشرة من قاعدة بيانات المنصة: حجم النشر اليومي، توزيع القطاعات، الكلمات الصاعدة، والمصادر الأكثر نشاطاً.",
  alternates: { canonical: "/pulse" },
};

export default async function PulsePage() {
  const analytics = await computeLivePulseAnalytics();

  return (
    <div className="container-custom py-10 max-w-7xl space-y-10">
      {/* 1. ترويسة رادار البيانات السماوي الداكن (Cyan Analytics Command Center) */}
      <header className="relative rounded-3xl overflow-hidden border border-sky-500/30 bg-gradient-to-br from-[#041524] via-[#071D30] to-[#020A12] text-white p-8 md:p-10 shadow-2xl">
        <div className="absolute -top-24 start-0 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/15 border border-sky-400/35 text-sky-300 text-xs font-black">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>مرصد صحافة البيانات الحية (Live DB Telemetry)</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              نبض <span className="text-sky-400">البيانات</span> والترند الحقيقي
            </h1>
            <p className="text-xs sm:text-sm text-sky-100/80 leading-relaxed">
              لوحة تحليل كمي محسوبة لحظياً من السجل الفعلي للمقالات المنشورة في قاعدة بيانات PostgreSQL بدون أي أرقام تقديرية أو مصطنعة.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="text-[11px] text-sky-200/70 block">إجمالي الأرشيف المنشور</span>
              <strong className="font-mono text-2xl font-black text-white">
                {analytics.totalPublishedArticles.toLocaleString("ar-EG")}
              </strong>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="text-[11px] text-sky-200/70 block">نُشر آخر 24 ساعة</span>
              <strong className="font-mono text-2xl font-black text-emerald-400">
                {analytics.last24hArticles.toLocaleString("ar-EG")}
              </strong>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="text-[11px] text-sky-200/70 block">برقيات عاجلة</span>
              <strong className="font-mono text-2xl font-black text-rose-400">
                {analytics.breakingCount.toLocaleString("ar-EG")}
              </strong>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
              <span className="text-[11px] text-sky-200/70 block">مصادر نشطة</span>
              <strong className="font-mono text-2xl font-black text-[var(--gold)]">
                {analytics.activeSourcesCount.toLocaleString("ar-EG")}
              </strong>
            </div>
          </div>
        </div>
      </header>

      {/* 2. توزيع الأقسام والكلمات الصاعدة */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* توزيع التغطيات حسب الأقسام */}
        <section className="lg:col-span-7 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-7 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <h2 className="text-lg font-black text-[var(--text)] flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sky-500" />
              <span>توزيع النشر حسب الأقسام (آخر 120 مادة)</span>
            </h2>
            <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>محسوب مباشرة</span>
            </span>
          </div>

          <div className="space-y-4">
            {analytics.sectionBreakdown.map((sec) => (
              <Link key={sec.slug} href={`/${sec.slug}`} className="block space-y-1.5 group">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[var(--text)] group-hover:text-sky-500 transition-colors">
                    {sec.nameAr}
                  </span>
                  <span className="font-mono text-[var(--text-muted)]">
                    {sec.count} مادة ({sec.pct}%)
                  </span>
                </div>
                <div className="h-3 rounded-full bg-[var(--bg)] overflow-hidden border border-[var(--border)]/60">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-500"
                    style={{ width: `${Math.max(sec.pct, 3)}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* المصادر الأكثر نشراً + سحابة الكلمات المفتاحية الحقيقية */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-md space-y-4">
            <h2 className="text-base font-black text-[var(--text)] flex items-center gap-2 border-b border-[var(--border)] pb-3">
              <Hash className="w-4 h-4 text-[var(--primary)]" />
              <span>الكلمات الأعلى تكراراً في العناوين الآن</span>
            </h2>
            <div className="flex flex-wrap gap-2">
              {analytics.topKeywords.map((kw, i) => (
                <Link
                  key={kw.keyword}
                  href={`/search?q=${encodeURIComponent(kw.keyword)}`}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all hover:border-sky-500 ${
                    i < 4
                      ? "bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-300"
                      : "bg-[var(--bg)] border-[var(--border)] text-[var(--text)]"
                  }`}
                >
                  #{kw.keyword} <span className="opacity-60 font-mono text-[10px]">({kw.count})</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-md space-y-4">
            <h2 className="text-base font-black text-[var(--text)] flex items-center gap-2 border-b border-[var(--border)] pb-3">
              <Radio className="w-4 h-4 text-emerald-500" />
              <span>توزيع المصادر النشطة</span>
            </h2>
            <div className="space-y-2.5">
              {analytics.topSources.map((src) => (
                <div
                  key={src.nameAr}
                  className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border)]"
                >
                  <span className="font-bold text-[var(--text)]">{src.nameAr}</span>
                  <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">
                    {src.count} تقارير
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* 3. أحدث التدفقات الإخبارية المرصودة */}
      <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-md space-y-5">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <h2 className="text-lg font-black text-[var(--text)] flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-500" />
            <span>عينة التدفق الإخباري الحي من قاعدة البيانات</span>
          </h2>
          <span className="text-[11px] font-mono text-[var(--text-muted)]">
            تحديث: {new Date(analytics.generatedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {analytics.latestTopics.map((item) => (
            <Link
              key={item.id}
              href={`/article/${item.id}/${item.slug}`}
              className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-sky-500/40 transition-all flex items-start justify-between gap-3 group"
            >
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="font-black px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)]">
                    {item.sectionNameAr}
                  </span>
                  <span className="text-[var(--text-muted)]">{item.sourceNameAr}</span>
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-[var(--text)] group-hover:text-sky-500 transition-colors line-clamp-2">
                  {item.titleAr}
                </h3>
                <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)] font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(item.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  {item.readCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {item.readCount.toLocaleString("ar-EG")}
                    </span>
                  )}
                </div>
              </div>
              <ArrowUpLeft className="w-4 h-4 text-[var(--text-muted)] group-hover:text-sky-500 shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
