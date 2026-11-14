import Link from "next/link";
import { StorySummary, ArticleCard as ArticleCardType, InstrumentQuote } from "@awt/shared";
import { ArticleCard } from "@/components/ArticleCard";
import { QuoteTile } from "@/components/QuoteTile";
import { MostReadWidget } from "@/components/MostReadWidget";
import { HomeHeroSection } from "./HomeHeroSection";
import { LiveFastStreamWire } from "./LiveFastStreamWire";
import { PalestineFocusBlock } from "./PalestineFocusBlock";
import { HomeAidAndJobsBar } from "./HomeAidAndJobsBar";
import { HomeVideoSection } from "./HomeVideoSection";
import { TrendingUp, ShieldCheck } from "lucide-react";

interface Props {
  heroStory?: StorySummary;
  heroArticle?: ArticleCardType;
  secondaryArticles: ArticleCardType[];
  palestineStories: StorySummary[];
  fastStreamArticles: ArticleCardType[];
  videoArticles: ArticleCardType[];
  arabWorldArticles: ArticleCardType[];
  worldArticles: ArticleCardType[];
  economyArticles: ArticleCardType[];
  techArticles: ArticleCardType[];
  sportsArticles: ArticleCardType[];
  quotes: InstrumentQuote[];
}

export function HomeStreamLayout({
  heroStory,
  heroArticle,
  secondaryArticles,
  palestineStories,
  fastStreamArticles,
  videoArticles,
  arabWorldArticles,
  worldArticles,
  economyArticles,
  techArticles,
  sportsArticles,
  quotes,
}: Props) {
  return (
    <div className="space-y-12">
      {/* 1. وحدة الهيرو الصحفي الماسي والمستجدات المتصدرة (Hero Hub) */}
      <HomeHeroSection
        heroStory={heroStory}
        heroArticle={heroArticle}
        secondaryArticles={secondaryArticles}
      />

      {/* 2. الهيكل التحريري ثنائي الأعمدة: المركز الإخباري + الممر السريع والأسواق */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* العمود الرئيسي (8 أعمدة) */}
        <div className="lg:col-span-8 space-y-10">
          {/* كتلة فلسطين أولاً الميدانية */}
          <PalestineFocusBlock stories={palestineStories} />

          {/* بوابات المساعدات والوظائف الإنسانية المعتمدة */}
          <HomeAidAndJobsBar />

          {/* شريط الصحافة المرئية وفيديو الوطن */}
          <HomeVideoSection articles={videoArticles} />

          {/* شبكة الأقسام المركزية: العالم العربي ودولياً */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* العالم العربي */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-2">
                <h3 className="font-black text-base text-[var(--text)]">العالم العربي</h3>
                <Link href="/arab-world" className="text-xs text-[var(--primary)] font-bold hover:underline">
                  المزيد ←
                </Link>
              </div>
              <div className="space-y-3">
                {arabWorldArticles.slice(0, 3).map((art) => (
                  <ArticleCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>

            {/* دولياً */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-2">
                <h3 className="font-black text-base text-[var(--text)]">الشؤون الدولية</h3>
                <Link href="/world" className="text-xs text-[var(--primary)] font-bold hover:underline">
                  المزيد ←
                </Link>
              </div>
              <div className="space-y-3">
                {worldArticles.slice(0, 3).map((art) => (
                  <ArticleCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>
          </div>

          {/* قطاعا التقنية والرياضة مع يلا سبورت */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* التقنية والابتكار */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b-2 border-sky-600 pb-2">
                <h3 className="font-black text-base text-[var(--text)]">التقنية والابتكار</h3>
                <Link href="/tech" className="text-xs text-[var(--primary)] font-bold hover:underline">
                  المزيد ←
                </Link>
              </div>
              <div className="space-y-3">
                {techArticles.slice(0, 3).map((art) => (
                  <ArticleCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>

            {/* الرياضة مع يلا سبورت */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b-2 border-emerald-600 pb-2">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-base text-[var(--text)]">الرياضة</h3>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    يلا سبورت
                  </span>
                </div>
                <Link href="/sports" className="text-xs text-[var(--primary)] font-bold hover:underline">
                  المزيد ←
                </Link>
              </div>
              <div className="space-y-3">
                {sportsArticles.slice(0, 3).map((art) => (
                  <ArticleCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* العمود الجانبي (4 أعمدة): الممر السريع + الأسواق الموثقة + الأكثر قراءة */}
        <div className="lg:col-span-4 space-y-8">
          {/* الممر السريع / التدفق اللحظي */}
          <LiveFastStreamWire articles={fastStreamArticles} />

          {/* نافذة مؤشرات الأسواق والسلع الصادقة (بدون أرقام عشوائية) */}
          {quotes.length > 0 && (
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-black text-sm text-[var(--text)]">أسواق المال والذهب</h3>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">
                  بيانات معتمدة
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {quotes.slice(0, 4).map((quote) => (
                  <QuoteTile key={quote.symbol} quote={quote} />
                ))}
              </div>

              <div className="pt-2 text-center border-t border-[var(--border)]">
                <Link href="/economy" className="text-xs font-bold text-[var(--primary)] hover:underline">
                  مؤشرات بورصات فلسطين والعالم ←
                </Link>
              </div>
            </div>
          )}

          {/* الأكثر قراءة وتفاعلاً */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
            <MostReadWidget
              articles={palestineStories
                .flatMap((s) => s.articles)
                .concat(worldArticles)
                .concat(arabWorldArticles)}
            />
          </div>

          {/* ميثاق الشفافية والمسؤولية الصحفية */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-muted,#f8fafc)] dark:bg-stone-900/60 p-5 space-y-2.5 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5 font-bold text-[var(--text)]">
              <ShieldCheck className="w-4 h-4 text-[var(--primary)]" />
              <span>معايير النزاهة التحريرية:</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              كافة المواد المنشورة على «الوطن اليوم» منسوبة صراحة لمصادرها الأصلية، وتلتزم المنصة بسجل التصحيحات العلني والتحديث اللحظي الموثق.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

