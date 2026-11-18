import Link from "next/link";
import { StorySummary, ArticleCard as ArticleCardType } from "@awt/shared";
import { ArticleCard } from "@/components/ArticleCard";
import { LiveFastStreamWire } from "./LiveFastStreamWire";
import { PalestineFocusBlock } from "./PalestineFocusBlock";
import { HomeAidAndJobsBar } from "./HomeAidAndJobsBar";
import { Radio, Play, ChevronLeft } from "lucide-react";
import { resolveEditorialImage } from "@/lib/editorial-images";

interface Props {
  heroArticle?: ArticleCardType;
  secondaryArticles: ArticleCardType[];
  palestineStories: StorySummary[];
  fastStreamArticles: ArticleCardType[];
  videoArticles: ArticleCardType[];
}

export function HomeLivePulseLayout({
  heroArticle,
  secondaryArticles,
  palestineStories,
  fastStreamArticles,
  videoArticles,
}: Props) {
  const topVideo = videoArticles[0];

  return (
    <div className="space-y-10">
      {/* شريط الاستوديو والبث الميداني المباشر في قمة الصفحة */}
      <section className="rounded-3xl border border-red-500/30 bg-gradient-to-l from-red-950/40 via-[#26000a] to-[#140005] p-6 sm:p-8 shadow-2xl text-white space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-red-600 animate-ping" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl text-white">النبض المباشر · التغطية الميدانية اللحظية</span>
                <span className="text-xs bg-red-600 text-white font-black px-3 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>ON AIR</span>
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                تغطية استقصائية ومتابعة حية للتطورات السياسية والإنسانية في فلسطين والمنطقة.
              </p>
            </div>
          </div>

          <Link
            href="/live"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black transition-colors shadow-lg shrink-0 self-start sm:self-auto"
          >
            <span>شاهد البث الكامل</span>
            <ChevronLeft className="w-4 h-4 rtl:rotate-0" />
          </Link>
        </div>

        {/* شبكة البث المباشر: الفيديو الرئيسي + الأخبار اللحظية المتدفقة */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* مشغل الفيديو الصحفي أو الخبر الأهم */}
          <div className="lg:col-span-7 space-y-3">
            {topVideo ? (
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-stone-950 border border-white/15 shadow-2xl group">
                <img
                  src={resolveEditorialImage({ titleAr: topVideo.titleAr, id: topVideo.id, sectionSlug: "videos" })}
                  alt={topVideo.titleAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-center justify-center">
                  <Link
                    href={`/article/${topVideo.id}/${topVideo.slug}`}
                    className="w-18 h-18 rounded-full bg-[var(--gold)] text-[#140005] flex items-center justify-center group-hover:scale-115 transition-transform shadow-2xl border-4 border-white"
                    aria-label="مشاهدة البث"
                  >
                    <Play className="w-8 h-8 fill-current ms-1 text-[#140005]" />
                  </Link>
                </div>
                <div className="absolute bottom-4 inset-x-4">
                  <span className="px-3 py-1 rounded-xl bg-[#590018]/90 text-white text-xs font-black inline-block mb-1 border border-[var(--gold)]/30 backdrop-blur-xs">
                    {topVideo.sectionNameAr}
                  </span>
                  <h3 className="font-black text-base sm:text-xl text-white line-clamp-2">
                    <Link href={`/article/${topVideo.id}/${topVideo.slug}`}>
                      {topVideo.titleAr}
                    </Link>
                  </h3>
                </div>
              </div>
            ) : heroArticle ? (
              <ArticleCard article={heroArticle} variant="hero" />
            ) : null}
          </div>

          {/* شريط التدفق اللحظي دقيقة بدقيقة */}
          <div className="lg:col-span-5">
            <LiveFastStreamWire articles={fastStreamArticles} />
          </div>
        </div>
      </section>

      {/* بوابات المساعدات والوظائف الإنسانية الموثقة */}
      <HomeAidAndJobsBar />

      {/* كتلة فلسطين أولاً */}
      <PalestineFocusBlock stories={palestineStories} />

      {/* مستجدات الأخبار الثانوية */}
      <section className="space-y-4">
        <div className="border-b-2 border-[var(--primary)] pb-2 flex items-center justify-between">
          <h2 className="font-black text-lg text-[var(--text)]">مستجدات التغطيات</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {secondaryArticles.slice(0, 3).map((art) => (
            <ArticleCard key={art.id} article={art} variant="medium" />
          ))}
        </div>
      </section>
    </div>
  );
}
