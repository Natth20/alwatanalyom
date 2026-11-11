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

export const dynamic = "force-dynamic";

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
        {/* 3. الموجز الإذاعي في 3 دقائق (اسمع أهم أخبار اليوم في 3 دقائق ▶ استمع الآن) */}
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

        {/* 5. مركز تغطيات فلسطين الميدانية التفاعلي (غزة، القدس، الضفة، الشتات) */}
        <PalestineCoverageHub />

        {/* 6. رادار الحقيقة ومكافحة الشائعات وفحص الأخبار (الأولوية 1) */}
        <AskNewsroomWidget />

        {/* 7. قسم الرأي والتحليلات الاستراتيجية (أقلام الوطن) */}
        <OpinionSection />

        {/* 8. في مثل هذا اليوم · ذاكرة الوطن والتاريخ (الأولوية 3) */}
        <HistoryTodayWidget />

        {/* 9. وحدة فلسطين الرئيسية (Palestine First) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🇵🇸</span>
              <h2 className="text-2xl md:text-3xl font-black text-[var(--text)] tracking-tight">فلسطين أولاً</h2>
              <span className="text-xs text-[var(--text-muted)] hidden sm:inline">| رصد استقصائي وميداني شامل للأخبار والتقارير</span>
            </div>
            <Link href="/palestine" className="text-xs font-bold text-[var(--primary)] hover:underline px-3 py-1.5 rounded-xl bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 transition-colors">
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

        {/* 10. بودكاست وإيجاز الوطن الصوتي (صوت الوطن) */}
        <PodcastWidget />

        {/* 11. تحدي اليوم الذكي · لعبة العقل والذاكرة اليومية (الأولوية 4) */}
        <DailyMindGames />

        {/* 12. رادار الميدان · غرفة المتابعة الإنسانية والخدماتية (الأولوية 6) */}
        <LiveWarRoomMap />

        {/* 13. بطاقة تصريح وموقف اليوم */}
        <QuoteOfTheDay />

        {/* 14. نافذة الوطن الاقتصادي */}
        {feed.quotes.length > 0 && (
          <section className="card-luxury rounded-3xl p-6 md:p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                <h3 className="font-black text-lg md:text-xl text-[var(--text)]">نافذة الوطن الاقتصادي · أسواق فلسطين والعالم</h3>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">أسعار معتمدة ولحظية</span>
              </div>
              <Link href="/economy" className="text-xs text-[var(--primary)] font-bold hover:underline">
                مركز الأسواق الكامل ←
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {feed.quotes.map((quote) => (
                <QuoteTile key={quote.symbol} quote={quote} />
              ))}
            </div>
          </section>
        )}

        {/* 15. بيانات وإحصاءات الوطن (صحافة الأرقام والإنفوجرافيك) */}
        <InfographicSection />

        {/* 16. العالم العربي، العالم، والأكثر قراءة */}
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
