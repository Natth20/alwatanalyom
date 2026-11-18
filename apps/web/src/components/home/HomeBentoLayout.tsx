import Link from "next/link";
import { StorySummary, ArticleCard as ArticleCardType, InstrumentQuote } from "@awt/shared";
import { ArticleCard } from "@/components/ArticleCard";
import { QuoteTile } from "@/components/QuoteTile";
import { HomeVideoSection } from "./HomeVideoSection";
import { HomeAidAndJobsBar } from "./HomeAidAndJobsBar";
import { ShieldCheck, ChevronLeft } from "lucide-react";

interface Props {
  heroArticle?: ArticleCardType;
  secondaryArticles: ArticleCardType[];
  palestineStories: StorySummary[];
  fastStreamArticles: ArticleCardType[];
  videoArticles: ArticleCardType[];
  economyArticles: ArticleCardType[];
  techArticles: ArticleCardType[];
  sportsArticles: ArticleCardType[];
  quotes: InstrumentQuote[];
}

export function HomeBentoLayout({
  heroArticle,
  secondaryArticles,
  palestineStories,
  videoArticles,
  economyArticles,
  techArticles,
  sportsArticles,
  quotes,
}: Props) {
  const palestineLead = palestineStories[0]?.articles[0];

  return (
    <div className="space-y-10">
      {/* شبكة البينتو الرئيسية (Hero Bento Grid) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* بطاقة البطل الكبرى (Bento Big Lead) - 7 أعمدة */}
        {heroArticle && (
          <div className="md:col-span-7">
            <ArticleCard article={heroArticle} variant="hero" />
          </div>
        )}

        {/* بطاقتان مكدستان في الجانب مع صور دائمة - 5 أعمدة */}
        <div className="md:col-span-5 flex flex-col gap-4">
          {palestineLead && (
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-1.5">
                <span className="text-xs font-black text-emerald-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>فلسطين أولاً</span>
                </span>
                <Link href="/palestine" className="text-xs font-bold text-emerald-500 hover:underline">
                  المزيد ←
                </Link>
              </div>
              <ArticleCard article={palestineLead} variant="compact" />
            </div>
          )}

          {secondaryArticles[0] && (
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-1.5">
                <span className="text-xs font-black text-[var(--primary)]">
                  {secondaryArticles[0].sectionNameAr}
                </span>
                <Link href={`/article/${secondaryArticles[0].id}/${secondaryArticles[0].slug}`} className="text-xs font-bold text-[var(--primary)] hover:underline">
                  التفاصيل ←
                </Link>
              </div>
              <ArticleCard article={secondaryArticles[0]} variant="compact" />
            </div>
          )}

          {secondaryArticles[1] && (
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-1.5">
                <span className="text-xs font-black text-[var(--text-muted)]">
                  تغطية إضافية
                </span>
              </div>
              <ArticleCard article={secondaryArticles[1]} variant="compact" />
            </div>
          )}
        </div>
      </section>

      {/* بوابات المساعدات والوظائف السريعة */}
      <HomeAidAndJobsBar />

      {/* شبكة القطاعات المتعددة (Multi-Hub) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* عمود الاقتصاد */}
        <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs">
          <div className="flex items-center justify-between border-b-2 border-emerald-500 pb-2">
            <h3 className="font-bold text-base text-[var(--text)]">نافذة الاقتصاد</h3>
            <Link href="/economy" className="text-xs text-[var(--primary)] font-bold hover:underline">المزيد ←</Link>
          </div>
          <div className="space-y-3">
            {economyArticles.slice(0, 3).map((art) => (
              <ArticleCard key={art.id} article={art} variant="compact" />
            ))}
          </div>
        </div>

        {/* عمود التقنية */}
        <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs">
          <div className="flex items-center justify-between border-b-2 border-sky-500 pb-2">
            <h3 className="font-bold text-base text-[var(--text)]">التقنية والابتكار</h3>
            <Link href="/tech" className="text-xs text-[var(--primary)] font-bold hover:underline">المزيد ←</Link>
          </div>
          <div className="space-y-3">
            {techArticles.slice(0, 3).map((art) => (
              <ArticleCard key={art.id} article={art} variant="compact" />
            ))}
          </div>
        </div>

        {/* عمود الرياضة */}
        <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs">
          <div className="flex items-center justify-between border-b-2 border-emerald-600 pb-2">
            <h3 className="font-bold text-base text-[var(--text)]">الرياضة مع يلا سبورت</h3>
            <Link href="/sports" className="text-xs text-[var(--primary)] font-bold hover:underline">المزيد ←</Link>
          </div>
          <div className="space-y-3">
            {sportsArticles.slice(0, 3).map((art) => (
              <ArticleCard key={art.id} article={art} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* شريط الفيديو */}
      <HomeVideoSection articles={videoArticles} />
    </div>
  );
}
