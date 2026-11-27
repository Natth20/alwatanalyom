import Link from "next/link";
import { Metadata } from "next";
import { getStoryClusters, getHomeFeed } from "@/lib/dal";
import { Layers, Clock, ExternalLink, ShieldCheck, ArrowUpLeft, Radio } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "القصص المجمعة والتغطيات متعددة المصادر — الوطن اليوم",
  description: "متابعة الملفات الإخبارية المتطورة عبر ربط كافة الوكالات والتغطيات في خط زمني واحد شفاف.",
  alternates: { canonical: "/stories" },
};

export default async function StoriesPage() {
  const [clusters, feed] = await Promise.all([
    getStoryClusters(12),
    getHomeFeed(),
  ]);

  const fallbackStories = [...feed.heroStories, ...feed.palestineStories].map((st) => ({
    id: st.id,
    slug: st.slug,
    headlineAr: st.headlineAr,
    summaryAr: st.summaryAr || null,
    importance: st.importance,
    trendingScore: st.trendingScore,
    firstSeenAt: st.firstSeenAt,
    lastUpdatedAt: st.lastUpdatedAt,
    section: st.sectionSlug ? { slug: st.sectionSlug, nameAr: st.sectionSlug } : null,
    sourcesCount: st.sources.length || 1,
    articlesCount: st.articles.length,
    timeline: st.articles.map((a) => ({
      id: a.id,
      slug: a.slug,
      titleAr: a.titleAr,
      publishedAt: a.publishedAt,
      sourceNameAr: a.source?.nameAr || "الوطن اليوم",
      sourceUrl: `/article/${a.id}/${a.slug}`,
    })),
  }));

  const items = clusters.length > 0 ? clusters : fallbackStories;

  return (
    <div className="container-custom py-10 max-w-6xl space-y-10">
      {/* ترويسة ملفات التغطية متعددة المصادر */}
      <header className="relative rounded-3xl overflow-hidden border border-indigo-500/30 bg-gradient-to-br from-[#120726] via-[#1B081B] to-[#08020A] text-white p-8 md:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/35 text-indigo-300 text-xs font-black">
          <Layers className="w-3.5 h-3.5" />
          <span>نظام تجميع القصص الصحفية (Multi-Source Clusters)</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          ملفات التغطية الشاملة <span className="text-[var(--gold)]">والسياق الزمني</span>
        </h1>

        <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
          بدلاً من تكرار الخبر الواحد من عشرات الوكالات، يجمع محرك «الوطن اليوم» كافة البرقيات المرتبطة بنفس الحدث في ملف زمني واحد يتيح مقارنة المصادر والزوايا بشفافية كاملة.
        </p>
      </header>

      {items.length > 0 ? (
        <div className="space-y-8">
          {items.map((cluster) => (
            <article
              key={cluster.id}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-md space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[var(--border)] pb-5">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {cluster.section && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-black">
                        {cluster.section.nameAr}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{cluster.sourcesCount} مصادر • {cluster.articlesCount} مواد</span>
                    </span>
                    <span className="text-[var(--text-muted)] font-mono flex items-center gap-1 text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      آخر تحديث: {new Date(cluster.lastUpdatedAt).toLocaleString("ar-EG", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-black text-[var(--text)] leading-snug">
                    <Link href={`/story/${cluster.id}/${cluster.slug}`} className="hover:text-[var(--primary)] transition-colors">
                      {cluster.headlineAr}
                    </Link>
                  </h2>

                  {cluster.summaryAr && (
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                      {cluster.summaryAr}
                    </p>
                  )}
                </div>

                <Link
                  href={`/story/${cluster.id}/${cluster.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-xs font-black hover:brightness-110 shrink-0 self-start"
                >
                  <span>فتح ملف القصة الكامل</span>
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* الخط الزمني الفعلي للمواد المرتبطة */}
              {cluster.timeline.length > 0 && (
                <div className="space-y-3 relative before:absolute before:inset-y-2 before:start-3 before:w-0.5 before:bg-[var(--border)]">
                  {cluster.timeline.slice(0, 5).map((item) => (
                    <div key={item.id} className="relative ps-9 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="absolute start-1.5 top-2 w-3.5 h-3.5 rounded-full bg-[var(--primary)] border-2 border-[var(--surface)]" />
                      <div className="min-w-0">
                        <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 me-2">
                          [{item.sourceNameAr}]
                        </span>
                        <Link
                          href={`/article/${item.id}/${item.slug}`}
                          className="text-xs sm:text-sm font-bold text-[var(--text)] hover:text-[var(--primary)] transition-colors"
                        >
                          {item.titleAr}
                        </Link>
                      </div>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0">
                        {item.publishedAt
                          ? new Date(item.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
                          : ""}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center space-y-3">
          <Radio className="w-10 h-10 text-[var(--primary)] mx-auto opacity-60" />
          <p className="text-sm font-bold text-[var(--text)]">
            لا توجد ملفات قصص مجمعة حالياً — تصفح البث اللحظي لمتابعة البرقيات المنفردة.
          </p>
        </div>
      )}
    </div>
  );
}
