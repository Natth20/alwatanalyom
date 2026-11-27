import { Suspense } from "react";
import { getHomeFeed, getMostReadArticles } from "@/lib/dal";
import { BreakingBar } from "@/components/BreakingBar";
import { AdSlot } from "@/components/AdSlot";
import { VisualPrototypeSwitcher, type PrototypeView } from "@/components/home/VisualPrototypeSwitcher";
import { HomeStreamLayout } from "@/components/home/HomeStreamLayout";
import { HomeBentoLayout } from "@/components/home/HomeBentoLayout";
import { HomeLivePulseLayout } from "@/components/home/HomeLivePulseLayout";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{
    view?: string;
  }>;
}

export default async function HomePage({ searchParams }: Props) {
  const { view: rawView } = await searchParams;
  const currentView: PrototypeView =
    rawView === "bento" || rawView === "live" ? rawView : "stream";

  const [feed, mostReadArticles] = await Promise.all([
    getHomeFeed(),
    getMostReadArticles(5),
  ]);

  const heroStory = feed.heroStories[0];
  const heroMainArticle = heroStory?.articles[0] || feed.fastStreamArticles[0];
  const secondaryArticles = heroStory?.articles.slice(1).length
    ? heroStory.articles.slice(1)
    : feed.fastStreamArticles.slice(1, 6);

  return (
    <div className="space-y-8 sm:space-y-12 pb-24">
      {/* 0. بانر الليدربورد الملكي الماسي في صدارة الصفحة الرئيسية */}
      <div className="container-custom pt-3">
        <AdSlot position="HEADER_TOP_LEADERBOARD" className="max-w-5xl" />
      </div>

      {/* 1. شريط الأخبار العاجلة اللحظي المتوهج */}
      <BreakingBar articles={feed.breaking} />

      <div className="container-custom space-y-12 sm:space-y-16">
        {/* 2. عرض النموذج التحريري المختار */}
        {currentView === "stream" && (
          <HomeStreamLayout
            heroStory={heroStory}
            heroArticle={heroMainArticle}
            secondaryArticles={secondaryArticles}
            palestineStories={feed.palestineStories}
            fastStreamArticles={feed.fastStreamArticles}
            videoArticles={feed.videoArticles}
            arabWorldArticles={feed.arabWorldArticles}
            worldArticles={feed.worldArticles}
            economyArticles={feed.economyArticles}
            techArticles={feed.techArticles}
            sportsArticles={feed.sportsArticles}
            quotes={feed.quotes}
            mostReadArticles={mostReadArticles}
          />
        )}

        {currentView === "bento" && (
          <HomeBentoLayout
            heroArticle={heroMainArticle}
            secondaryArticles={secondaryArticles}
            palestineStories={feed.palestineStories}
            fastStreamArticles={feed.fastStreamArticles}
            videoArticles={feed.videoArticles}
            economyArticles={feed.economyArticles}
            techArticles={feed.techArticles}
            sportsArticles={feed.sportsArticles}
            quotes={feed.quotes}
          />
        )}

        {currentView === "live" && (
          <HomeLivePulseLayout
            heroArticle={heroMainArticle}
            secondaryArticles={secondaryArticles}
            palestineStories={feed.palestineStories}
            fastStreamArticles={feed.fastStreamArticles}
            videoArticles={feed.videoArticles}
          />
        )}

        {/* 3. مبدل الأنماط التحريرية (يظهر في الأسفل كأداة تحريرية احترافية بدون تشويش على الواجهة) */}
        <div className="pt-8 border-t border-[var(--border)]">
          <Suspense fallback={null}>
            <VisualPrototypeSwitcher currentView={currentView} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
