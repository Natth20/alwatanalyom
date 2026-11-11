import Link from "next/link";
import { prisma } from "@awt/db";
import {
  Radio,
  Megaphone,
  ArrowUpRight,
  Zap,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    sourcesCount,
    failingSourcesCount,
    pendingReviewCount,
    publishedCount,
    activeAdsCount,
    totalAdImpressions,
    recentArticles,
    recentEvents,
  ] = await Promise.all([
    prisma.source.count({ where: { enabled: true } }),
    prisma.source.count({ where: { state: "FAILING" } }),
    prisma.item.count({ where: { status: "REVIEW" } }),
    prisma.article.count({ where: { status: "PUBLISHED" } }),
    prisma.adCampaign.count({ where: { enabled: true } }),
    prisma.adCampaign.aggregate({ _sum: { impressions: true } }),
    prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 6,
      include: { source: true, section: true },
    }),
    prisma.pipelineEvent.findMany({
      orderBy: { at: "desc" },
      take: 6,
      include: { item: true },
    }),
  ]);

  return (
    <div className="space-y-8 max-w-6xl">
      {/* رأس لوحة القيادة */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[var(--text)] mb-1">لوحة القيادة والمراقبة الحية</h1>
          <p className="text-xs text-[var(--text-muted)]">
            متابعة فورية لنشاط غرفة الأخبار، طوابير المعالجة، المساحات الإعلانية، وسلامة المصادر
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/articles/new"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--primary)] text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity"
          >
            <span>+ كتابة مقال أو عاجل</span>
          </Link>
          <Link
            href="/ads"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 font-bold text-xs hover:bg-amber-500/20 transition-colors"
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>إدارة الإعلانات</span>
          </Link>
        </div>
      </div>

      {/* بطاقات الإحصاءات السريعة الخمس */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <span className="text-xs text-[var(--text-muted)] block mb-1">المصادر المعتمدة</span>
          <div className="text-2xl font-black text-emerald-400 flex items-center gap-2">
            <span>{sourcesCount}</span>
            {failingSourcesCount > 0 && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold">
                {failingSourcesCount} متعثر
              </span>
            )}
          </div>
          <Link href="/sources" className="text-[10px] text-emerald-400 hover:underline mt-1 block">
            فحص وإدارة الخلاصات ←
          </Link>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <span className="text-xs text-[var(--text-muted)] block mb-1">المقالات المنشورة</span>
          <div className="text-2xl font-black text-[var(--text)]">{publishedCount}</div>
          <span className="text-[10px] text-[var(--text-muted)] mt-1 block">منشورة ومفهرسة</span>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <span className="text-xs text-[var(--text-muted)] block mb-1">الحملات الإعلانية</span>
          <div className="text-2xl font-black text-amber-400 flex items-center gap-2">
            <span>{activeAdsCount}</span>
            <span className="text-xs font-normal text-[var(--text-muted)]">نشطة</span>
          </div>
          <Link href="/ads" className="text-[10px] text-amber-400 hover:underline mt-1 block">
            المساحات والرعايات ←
          </Link>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <span className="text-xs text-[var(--text-muted)] block mb-1">مشاهدات الإعلانات</span>
          <div className="text-2xl font-black text-sky-400">
            {(totalAdImpressions._sum.impressions || 0).toLocaleString("ar-EG")}
          </div>
          <span className="text-[10px] text-[var(--text-muted)] mt-1 block">ظهور فعلي للزوار</span>
        </div>

        <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <span className="text-xs text-[var(--text-muted)] block mb-1">تنتظر المراجعة البشرية</span>
          <div className="text-2xl font-black text-rose-400">{pendingReviewCount}</div>
          <Link href="/newsroom/review" className="text-[10px] text-rose-400 hover:underline mt-1 block">
            مراجعة المواد المعلقة ←
          </Link>
        </div>
      </div>

      {/* قسم المقالات الأحدث المنشورة حياً */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex items-center justify-between mb-4 border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-[var(--text)]">أحدث الأخبار المنشورة في الموقع مباشرة</h3>
          </div>
          <Link href="/articles" className="text-xs text-[var(--primary)] hover:underline font-semibold">
            عرض كافة المقالات ({publishedCount}) ←
          </Link>
        </div>

        <div className="divide-y divide-[var(--border)]">
          {recentArticles.map((article) => (
            <div key={article.id} className="py-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {article.isBreaking && (
                    <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white text-[10px] font-black">
                      عاجل
                    </span>
                  )}
                  <span className="text-[10px] font-bold text-[var(--primary)] px-2 py-0.5 rounded-full bg-[var(--primary)]/10">
                    {article.section.nameAr}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    المصدر: {article.source?.nameAr || "محرر الموقع"}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[var(--text)] truncate">
                  {article.titleAr}
                </h4>
              </div>

              <div className="shrink-0 flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
                <span>{new Date(article.publishedAt || Date.now()).toLocaleTimeString("ar-EG")}</span>
                <Link
                  href={`http://localhost:3000/article/${article.id}/${article.slug}`}
                  target="_blank"
                  className="p-1 rounded-md hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--primary)]"
                  title="معاينة في الموقع"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* سجل مسار المعالجة الأخير (Pipeline Stream) */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex items-center justify-between mb-4 border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm text-[var(--text)]">سجل أحداث خط الإنتاج الآلي (Pipeline Audit)</h3>
          </div>
          <span className="text-[10px] text-[var(--text-muted)]">محدّث لحظياً</span>
        </div>

        <div className="space-y-2">
          {recentEvents.length > 0 ? (
            recentEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 rounded-xl border border-[var(--border)]/60 bg-[var(--bg)] text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      event.decision === "publish" || event.decision === "published"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : event.decision === "review"
                        ? "bg-amber-500/10 text-amber-400"
                        : event.decision === "duplicate"
                        ? "bg-purple-500/10 text-purple-400"
                        : "bg-slate-500/10 text-slate-400"
                    }`}
                  >
                    {event.stage.toUpperCase()}: {event.decision}
                  </span>
                  <span className="text-[var(--text)] font-medium truncate">
                    {event.item?.titleOriginal || event.reason}
                  </span>
                </div>
                <div className="text-[10px] text-[var(--text-muted)] shrink-0">
                  <span>{new Date(event.at).toLocaleTimeString("ar-EG")}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-xs text-[var(--text-muted)]">
              لا توجد أحداث مسجلة بعد في مسار المعالجة.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
