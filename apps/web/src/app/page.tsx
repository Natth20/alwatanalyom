import { Suspense } from "react";
import { getHomeFeed } from "@/lib/dal";
import { BreakingBar } from "@/components/BreakingBar";
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

  const feed = await getHomeFeed();

  const heroStory = feed.heroStories[0];
  const heroMainArticle = heroStory?.articles[0] || feed.fastStreamArticles[0];
  const secondaryArticles = heroStory?.articles.slice(1).length
    ? heroStory.articles.slice(1)
    : feed.fastStreamArticles.slice(1, 5);

  return (
    <div className="space-y-6 pb-16">
      {/* 1. شريط الأخبار العاجلة اللحظي المتوهج */}
      <BreakingBar articles={feed.breaking} />

      <div className="container-custom space-y-8">
        {/* 2. مبدل النماذج الأولية البصرية الثلاثة للمرحلة 4 (Visual Prototype Switcher) */}
        <Suspense fallback={<div className="h-20 animate-pulse bg-stone-900/20 rounded-2xl" />}>
          <VisualPrototypeSwitcher currentView={currentView} />
        </Suspense>

        {/* 3. عرض النموذج البصري المختار */}
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
      </div>
    </div>
  );
}
