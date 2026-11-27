import Link from "next/link";
import { prisma } from "@awt/db";
import {
  Radio,
  Megaphone,
  ArrowUpRight,
  TrendingUp,
  FileText,
  Clock,
  ShieldCheck,
  Award,
  Layers,
  Rss,
  Trophy,
  Eye,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let sourcesCount = 0;
  let failingSourcesCount = 0;
  let pendingReviewCount = 0;
  let publishedCount = 0;
  let activeAdsCount = 0;
  let totalAdImpressions: { _sum: { impressions: number | null } } = {
    _sum: { impressions: 0 },
  };
  let recentArticles: any[] = [];
  let dbConnected = false;

  try {
    if (prisma) {
      const results = await Promise.all([
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
      ]);

      dbConnected = true;
      sourcesCount = results[0];
      failingSourcesCount = results[1];
      pendingReviewCount = results[2];
      publishedCount = results[3];
      activeAdsCount = results[4];
      totalAdImpressions = results[5] || { _sum: { impressions: 0 } };
      recentArticles = results[6].map((a) => ({
        id: a.id,
        slug: a.slug,
        titleAr: a.titleAr,
        publishedAtText: new Date(a.publishedAt || Date.now()).toLocaleTimeString("ar-EG", {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        }),
        isBreaking: a.isBreaking || a.titleAr.includes("عاجل"),
        section: { nameAr: a.section?.nameAr || "فلسطين" },
        source: { nameAr: a.source?.nameAr || "هيئة التحرير" },
      }));
    }
  } catch (err) {
    console.warn("Admin Dashboard DB query failed:", err);
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 1. رأس لوحة القيادة — مطابقة تامة للصورة الرسمية */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">
            لوحة القيادة والمراقبة الحية
          </h1>
          <p className="text-xs text-slate-400">
            متابعة فورية لنشاط غرفة الأخبار، طوابير المعالجة، المساحات الإعلانية، وسلامة المصادر
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/articles/new"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--primary)] text-slate-950 font-black text-xs hover:opacity-90 transition-all shadow-md shadow-amber-950/20 active:scale-95"
          >
            <span>+ كتابة مقال أو عاجل</span>
          </Link>
          <Link
            href="/admin/ads"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 font-bold text-xs hover:bg-amber-500/20 transition-colors shadow-sm active:scale-95"
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>إدارة الإعلانات</span>
          </Link>
        </div>
      </div>

      {/* 2. بطاقات الإحصاءات السريعة الخمس — مطابقة تامة للصورة الرسمية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* بطاقة 1: المصادر المعتمدة */}
        <div className="p-4 rounded-2xl border border-white/10 bg-[#16060B]/70 backdrop-blur-sm hover:border-emerald-500/30 transition-all">
          <span className="text-xs text-slate-400 block mb-1 font-medium">المصادر المعتمدة</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 flex items-center gap-2">
            <span>{sourcesCount}</span>
            {failingSourcesCount > 0 && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                {failingSourcesCount} متعثر
              </span>
            )}
          </div>
          <Link href="/admin/sources" className="text-[10px] text-emerald-400 hover:underline mt-1.5 block font-bold">
            فحص وإدارة الخلاصات ←
          </Link>
        </div>

        {/* بطاقة 2: المقالات المنشورة */}
        <div className="p-4 rounded-2xl border border-white/10 bg-[#16060B]/70 backdrop-blur-sm hover:border-white/20 transition-all">
          <span className="text-xs text-slate-400 block mb-1 font-medium">المقالات المنشورة</span>
          <div className="text-2xl sm:text-3xl font-black text-white">{publishedCount}</div>
          <span className="text-[10px] text-slate-400 mt-1.5 block font-semibold">منشورة ومفهرسة</span>
        </div>

        {/* بطاقة 3: الحملات الإعلانية */}
        <div className="p-4 rounded-2xl border border-white/10 bg-[#16060B]/70 backdrop-blur-sm hover:border-amber-500/30 transition-all">
          <span className="text-xs text-slate-400 block mb-1 font-medium">الحملات الإعلانية</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-400 flex items-center gap-2">
            <span>{activeAdsCount}</span>
            <span className="text-xs font-normal text-slate-400">نشطة</span>
          </div>
          <Link href="/admin/ads" className="text-[10px] text-amber-400 hover:underline mt-1.5 block font-bold">
            المساحات والرعايات ←
          </Link>
        </div>

        {/* بطاقة 4: مشاهدات الإعلانات */}
        <div className="p-4 rounded-2xl border border-white/10 bg-[#16060B]/70 backdrop-blur-sm hover:border-sky-500/30 transition-all">
          <span className="text-xs text-slate-400 block mb-1 font-medium">مشاهدات الإعلانات</span>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {(totalAdImpressions._sum.impressions || 0).toLocaleString("ar-EG")}
          </div>
          <span className="text-[10px] text-slate-400 mt-1.5 block font-semibold">ظهور فعلي للزوار</span>
        </div>

        {/* بطاقة 5: تنتظر المراجعة البشرية */}
        <div className="p-4 rounded-2xl border border-white/10 bg-[#16060B]/70 backdrop-blur-sm hover:border-rose-500/30 transition-all">
          <span className="text-xs text-slate-400 block mb-1 font-medium">تنتظر المراجعة البشرية</span>
          <div className="text-2xl sm:text-3xl font-black text-rose-400">{pendingReviewCount}</div>
          <Link href="/admin/newsroom/review" className="text-[10px] text-rose-400 hover:underline mt-1.5 block font-bold">
            مراجعة المواد المعلقة ←
          </Link>
        </div>
      </div>

      {/* 3. شريط الأخبار الأحدث المنشورة في الموقع مباشرة — مطابقة تامة للصورة الرسمية */}
      <div className="rounded-2xl border border-white/10 bg-[#16060B]/80 backdrop-blur-md p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            <h2 className="font-bold text-sm sm:text-base text-white">
              أحدث الأخبار المنشورة في الموقع مباشرة
            </h2>
          </div>
          <Link
            href="/admin/articles"
            className="text-xs text-slate-400 hover:text-white hover:underline font-bold inline-flex items-center gap-1"
          >
            <span>عرض كافة المقالات ({publishedCount})</span>
            <span>←</span>
          </Link>
        </div>

        {/* قائمة الأخبار المنشورة بلحظيتها مع الوسوم */}
        <div className="divide-y divide-white/5 space-y-1">
          {recentArticles.map((article) => (
            <div
              key={article.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] px-2 rounded-xl transition-colors group"
            >
              {/* يمين: الأوسمة والعنوان */}
              <div className="min-w-0 space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  {article.isBreaking && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-black text-[10px] shadow-xs">
                      عاجل
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 text-[10px]">
                    {article.section?.nameAr || "فلسطين"}
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    المصدر: {article.source?.nameAr || "وكالة الأنباء (وفا)"}
                  </span>
                </div>

                <Link
                  href={`/admin/articles`}
                  className="font-bold text-xs sm:text-sm text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2 leading-relaxed block"
                >
                  {article.titleAr}
                </Link>
              </div>

              {/* يسار: الوقت وزر المعاينة */}
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className="text-[11px] font-mono text-slate-400">
                  {article.publishedAtText}
                </span>
                <Link
                  href={`/article/${article.slug}`}
                  target="_blank"
                  className="p-1.5 rounded-lg border border-white/10 hover:border-amber-400/50 hover:bg-white/5 text-slate-400 hover:text-amber-300 transition-all"
                  title="معاينة في الموقع المباشر"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
