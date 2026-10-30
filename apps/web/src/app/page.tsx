import Link from "next/link";
import { getHomeFeed } from "@/lib/dal";
import { BreakingBar } from "@/components/BreakingBar";
import { ArticleCard } from "@/components/ArticleCard";
import { QuoteTile } from "@/components/QuoteTile";
import { TrendingRibbon } from "@/components/TrendingRibbon";
import { MostReadWidget } from "@/components/MostReadWidget";
import { QuoteOfTheDay } from "@/components/QuoteOfTheDay";
import { OpinionSection } from "@/components/OpinionSection";
import { PalestineCoverageHub } from "@/components/PalestineCoverageHub";
import { InfographicSection } from "@/components/InfographicSection";
import { PodcastWidget } from "@/components/PodcastWidget";
import { InteractivePoll } from "@/components/InteractivePoll";
import { FrontpageAudioBrief } from "@/components/FrontpageAudioBrief";
import { LiveWarRoomMap } from "@/components/LiveWarRoomMap";
import { HistoryTodayWidget } from "@/components/HistoryTodayWidget";
import { DailyMindGames } from "@/components/DailyMindGames";
import { AskNewsroomWidget } from "@/components/AskNewsroomWidget";

export const revalidate = 30; // ISR 30 ثانية

export default async function HomePage() {
  const feed = await getHomeFeed();

  const heroStory = feed.heroStories[0];
  const heroMainArticle = heroStory?.articles[0];
  const sideHeroArticles = heroStory?.articles.slice(1) || [];

  const headlinesForAudio = [
    heroMainArticle?.titleAr,
    ...feed.breaking.map((b) => b.titleAr),
    ...feed.palestineStories.map((s) => s.articles[0]?.titleAr).filter(Boolean),
  ].filter(Boolean) as string[];

  return (
    <div>
      {/* 1. شريط العاجل المتدفق */}
      <BreakingBar articles={feed.breaking} />

      {/* 2. شريط الموضوعات الأكثر تداولاً */}
      <TrendingRibbon />

      <div className="container-custom mt-6 space-y-12">
        {/* 3. الموجز الصوتي السريع للمنصة (استمع للجريدة في 3 دقائق) */}
        <FrontpageAudioBrief headlines={headlinesForAudio.slice(0, 5)} />

        {/* 4. وحدة البطل (Hero) مع قائمة المتابعات الفورية */}
        {heroMainArticle ? (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ArticleCard article={heroMainArticle} variant="hero" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="border-b border-[var(--border)] pb-2 flex items-center justify-between">
                <h3 className="font-bold text-base text-[var(--text)]">متابعات رئيسية للحدث</h3>
                {heroStory && (
                  <span className="text-xs text-[var(--text-muted)]">
                    {heroStory.coverageCount} تغطيات موثقة
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                {sideHeroArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mx-auto mb-4 font-black text-xl">
              وطن
            </div>
            <h2 className="text-xl font-bold mb-2">غرفة الأخبار قيد المزامنة والجلب</h2>
            <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
              يجري الآن استقبال الخلاصات الإخبارية من المصادر المعتمدة وتصنيفها آلياً. ستظهر الأخبار هنا فور اكتمال دورة النشر.
            </p>
          </div>
        )}

        {/* 5. رادار الميدان وغرفة المتابعة الإنسانية والأمنية */}
        <LiveWarRoomMap />

        {/* 6. مركز تغطيات فلسطين الميدانية التفاعلي (غزة، القدس، الضفة، الشتات) */}
        <PalestineCoverageHub />

        {/* 7. نافذة الوطن الاقتصادي */}
        {feed.quotes.length > 0 && (
          <section className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]"></span>
                <h3 className="font-bold text-base text-[var(--text)]">نافذة الوطن الاقتصادي</h3>
                <span className="text-xs text-[var(--text-muted)]">(أسعار معتمدة ومحدثة)</span>
              </div>
              <Link href="/economy" className="text-xs text-[var(--primary)] font-semibold hover:underline">
                مركز الأسواق الكامل ←
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {feed.quotes.map((quote) => (
                <QuoteTile key={quote.symbol} quote={quote} />
              ))}
            </div>
          </section>
        )}

        {/* 8. قسم الرأي والتحليلات الاستراتيجية (أقلام الوطن) */}
        <OpinionSection />

        {/* 9. في مثل هذا اليوم · ذاكرة الوطن والتاريخ */}
        <HistoryTodayWidget />

        {/* 10. وحدة فلسطين الرئيسية (Palestine First) */}
        <section>
          <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">🇵🇸</span>
              <h2 className="text-2xl font-black text-[var(--text)]">فلسطين</h2>
              <span className="text-xs text-[var(--text-muted)]">| رصد شامل للأخبار والتقارير</span>
            </div>
            <Link href="/palestine" className="text-xs font-bold text-[var(--primary)] hover:underline">
              كل تغطيات فلسطين ←
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feed.palestineStories.slice(0, 3).map((story) => {
              const mainArt = story.articles[0];
              if (!mainArt) return null;
              return <ArticleCard key={mainArt.id} article={mainArt} variant="medium" />;
            })}
          </div>
        </section>

        {/* 11. بودكاست وإيجاز الوطن الصوتي (صوت الوطن) */}
        <PodcastWidget />

        {/* 12. بطاقة تصريح وموقف اليوم */}
        <QuoteOfTheDay />

        {/* 13. رادار الحقيقة وكشف الشائعات وفحص الأخبار */}
        <AskNewsroomWidget />

        {/* 14. بيانات وإحصاءات الوطن (صحافة الأرقام والإنفوجرافيك) */}
        <InfographicSection />

        {/* 15. العالم العربي، العالم، والأكثر قراءة */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 mb-4">
              <h3 className="text-lg font-bold text-[var(--text)]">العالم العربي</h3>
              <Link href="/arab-world" className="text-xs text-[var(--primary)] hover:underline">المزيد ←</Link>
            </div>
            <div className="space-y-3">
              {feed.arabWorldArticles.slice(0, 4).map((art) => (
                <ArticleCard key={art.id} article={art} variant="compact" />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 mb-4">
              <h3 className="text-lg font-bold text-[var(--text)]">دولياً</h3>
              <Link href="/world" className="text-xs text-[var(--primary)] hover:underline">المزيد ←</Link>
            </div>
            <div className="space-y-3">
              {feed.worldArticles.slice(0, 4).map((art) => (
                <ArticleCard key={art.id} article={art} variant="compact" />
              ))}
            </div>
          </div>

          <div>
            <MostReadWidget
              articles={feed.palestineStories
                .flatMap((s) => s.articles)
                .concat(feed.worldArticles)
                .concat(feed.arabWorldArticles)}
            />
          </div>
        </section>

        {/* 16. تحدي اليوم الذكي · لعبة العقل والذاكرة اليومية */}
        <DailyMindGames />

        {/* 17. استطلاع رأي القراء التفاعلي */}
        <InteractivePoll />

        {/* 18. التقنية والرياضة */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 mb-4">
              <h3 className="text-lg font-bold text-[var(--text)]">التقنية والابتكار</h3>
              <Link href="/tech" className="text-xs text-[var(--primary)] hover:underline">المزيد ←</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {feed.techArticles.slice(0, 2).map((art) => (
                <ArticleCard key={art.id} article={art} variant="medium" />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-2 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-[var(--text)]">الرياضة</h3>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-1.5 py-0.5 rounded font-semibold">يلا سبورت</span>
              </div>
              <Link href="/sports" className="text-xs text-[var(--primary)] hover:underline">المزيد ←</Link>
            </div>
            <div className="space-y-3">
              {feed.sportsArticles.slice(0, 3).map((art) => (
                <ArticleCard key={art.id} article={art} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
