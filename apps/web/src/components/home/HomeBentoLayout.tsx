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
      <section className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* بطاقة البطل الكبرى (Bento Big Lead) - 8 أعمدة */}
        {heroArticle && (
          <div className="md:col-span-8">
            <ArticleCard article={heroArticle} variant="hero" />
          </div>
        )}

        {/* بطاقتان مكدستان في الجانب - 4 أعمدة */}
        <div className="md:col-span-4 flex flex-col gap-5">
          {palestineLead && (
            <div className="rounded-2xl border border-emerald-500/30 bg-[var(--surface)] p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 mb-2">
                  <ShieldCheck className="w-3 h-3" />
                  <span>فلسطين أولاً</span>
                </span>
                <h3 className="font-bold text-sm text-[var(--text)] line-clamp-2 leading-snug">
                  <Link href={`/article/${palestineLead.id}/${palestineLead.slug}`}>
                    {palestineLead.titleAr}
                  </Link>
                </h3>
              </div>
              <Link href="/palestine" className="text-xs font-bold text-emerald-400 hover:underline pt-2 inline-flex items-center gap-1">
                <span>تغطيات فلسطين ←</span>
              </Link>
            </div>
          )}

          {secondaryArticles[0] && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2.5 py-0.5 rounded-full inline-block mb-2">
                  {secondaryArticles[0].sectionNameAr}
                </span>
                <h3 className="font-bold text-sm text-[var(--text)] line-clamp-2 leading-snug">
                  <Link href={`/article/${secondaryArticles[0].id}/${secondaryArticles[0].slug}`}>
                    {secondaryArticles[0].titleAr}
                  </Link>
                </h3>
              </div>
              <Link href={`/article/${secondaryArticles[0].id}/${secondaryArticles[0].slug}`} className="text-xs font-bold text-[var(--primary)] hover:underline pt-2">
                <span>قراءة التفاصيل ←</span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* بوابات المساعدات والوظائف السريعة */}
      <HomeAidAndJobsBar />

      {/* شبكة القطاعات المتعددة (Multi-Hub) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* عمود الاقتصاد */}
        <div className="space-y-4">
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
        <div className="space-y-4">
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
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-amber-500 pb-2">
            <h3 className="font-bold text-base text-[var(--text)]">الرياضة · يلا سبورت</h3>
            <Link href="/sports" className="text-xs text-[var(--primary)] font-bold hover:underline">المزيد ←</Link>
          </div>
          <div className="space-y-3">
            {sportsArticles.slice(0, 3).map((art) => (
              <ArticleCard key={art.id} article={art} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* شريط الفيديو الصحفي */}
      <HomeVideoSection articles={videoArticles} />

      {/* نافذة أسواق المال والذهب الصادقة */}
      {quotes.length > 0 && (
        <section className="card-luxury rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="font-black text-base text-[var(--text)]">أسواق المال والسلع المعتمدة</h3>
            </div>
            <Link href="/economy" className="text-xs font-bold text-[var(--primary)] hover:underline">
              الأسواق الكاملة ←
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quotes.map((q) => (
              <QuoteTile key={q.symbol} quote={q} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
