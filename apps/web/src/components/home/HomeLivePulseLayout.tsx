import Link from "next/link";
import { StorySummary, ArticleCard as ArticleCardType } from "@awt/shared";
import { ArticleCard } from "@/components/ArticleCard";
import { LiveFastStreamWire } from "./LiveFastStreamWire";
import { PalestineFocusBlock } from "./PalestineFocusBlock";
import { HomeAidAndJobsBar } from "./HomeAidAndJobsBar";
import { Radio, Play, ChevronLeft } from "lucide-react";

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
      <section className="rounded-3xl border border-rose-500/30 bg-gradient-to-l from-rose-950/30 via-[#26000a] to-[#1a0006] p-6 sm:p-8 shadow-xl text-white space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-600 animate-ping" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl text-white">النبض المباشر · التغطية الميدانية اللحظية</span>
                <span className="text-xs bg-rose-600 text-white font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
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
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-md shrink-0 self-start sm:self-auto"
          >
            <span>شاهد البث الكامل</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* شبكة البث المباشر: الفيديو الرئيسي + الأخبار اللحظية المتدفقة */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* مشغل الفيديو الصحفي أو الخبر الأهم */}
          <div className="lg:col-span-7 space-y-3">
            {topVideo ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-lg group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-center justify-center">
                  <Link
                    href={`/article/${topVideo.id}/${topVideo.slug}`}
                    className="w-16 h-16 rounded-full bg-[var(--primary)] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl border-2 border-[var(--gold)]"
                    aria-label="مشاهدة البث"
                  >
                    <Play className="w-7 h-7 fill-current ms-1 text-[var(--gold)]" />
                  </Link>
                </div>
                <div className="absolute bottom-4 right-4 left-4">
                  <span className="px-2.5 py-0.5 rounded bg-[var(--primary)] text-white text-[11px] font-bold inline-block mb-1">
                    {topVideo.sectionNameAr}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-white line-clamp-2">
                    {topVideo.titleAr}
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
          <h2 className="text-xl font-black text-[var(--text)]">متابعات إخبارية شاملة</h2>
          <span className="text-xs text-[var(--text-muted)]">من مصادر معتمدة</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {secondaryArticles.slice(0, 6).map((art) => (
            <ArticleCard key={art.id} article={art} />
          ))}
        </div>
      </section>
    </div>
  );
}

