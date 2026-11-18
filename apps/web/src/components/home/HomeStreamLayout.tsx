import Link from "next/link";
import { StorySummary, ArticleCard as ArticleCardType, InstrumentQuote } from "@awt/shared";
import { ArticleCard } from "@/components/ArticleCard";
import { QuoteTile } from "@/components/QuoteTile";
import { MostReadWidget } from "@/components/MostReadWidget";
import { FrontpageAudioBrief } from "@/components/FrontpageAudioBrief";
import { PalestineCommoditiesWidget } from "@/components/PalestineCommoditiesWidget";
import { LiveWarRoomMap } from "@/components/LiveWarRoomMap";
import { FactCheckSlider } from "@/components/FactCheckSlider";
import { InfographicSection } from "@/components/InfographicSection";
import { InteractivePoll } from "@/components/InteractivePoll";
import { HomeHeroSection } from "./HomeHeroSection";
import { LiveFastStreamWire } from "./LiveFastStreamWire";
import { PalestineFocusBlock } from "./PalestineFocusBlock";
import { HomeAidAndJobsBar } from "./HomeAidAndJobsBar";
import { HomeVideoSection } from "./HomeVideoSection";
import { HomeSportsSection } from "./HomeSportsSection";
import { TrendingUp, ShieldCheck, ChevronLeft } from "lucide-react";

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
  const headlines = [
    heroArticle?.titleAr,
    ...secondaryArticles.map((a) => a.titleAr),
    ...fastStreamArticles.slice(0, 3).map((a) => a.titleAr),
  ].filter(Boolean) as string[];

  return (
    <div className="space-y-12">
      {/* 1. المركز الرئاسي والبطل الإخباري (70% بطل سينمائي + 30% ممر تدفق سريع مصور) */}
      <HomeHeroSection
        heroStory={heroStory}
        heroArticle={heroArticle}
        secondaryArticles={secondaryArticles}
      />

      {/* 1.1 الموجز الصوتي الذكي في صدارة الصفحة الرئيسية */}
      <FrontpageAudioBrief headlines={headlines} />

      {/* 2. كتلة فلسطين أولاً الميدانية (فلسطين، غزة، القدس، الأقصى) */}
      <PalestineFocusBlock stories={palestineStories} />

      {/* 2.1 غرفة العمليات الميدانية الحية وأطلس فلسطين التفاعلي */}
      <LiveWarRoomMap />

      {/* 2.2 سلة المحروقات والسلع الحيوية في السوق الفلسطيني */}
      <PalestineCommoditiesWidget />

      {/* 3. ساحة يلا سبورت والملاعب (مباريات اليوم الحية + شبكة التقارير الكروية العالمية) */}
      <HomeSportsSection articles={sportsArticles} />

      {/* 4. الهيكل التحريري الموسع: الأخبار الإقليمية والدولية والتقنية */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* العمود الرئيسي (8 أعمدة) */}
        <div className="lg:col-span-8 space-y-10">
          {/* شبكة الأقسام المركزية: العالم العربي ودولياً */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* العالم العربي */}
            <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs">
              <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-2.5">
                <h3 className="font-black text-base text-[var(--text)] flex items-center gap-2">
                  <span className="w-2 h-4 bg-[var(--gold)] rounded-sm" />
                  <span>العالم العربي</span>
                </h3>
                <Link href="/arab-world" className="text-xs text-[var(--primary)] font-bold hover:underline flex items-center gap-0.5">
                  <span>المزيد</span>
                  <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                </Link>
              </div>
              <div className="space-y-3">
                {arabWorldArticles.slice(0, 3).map((art) => (
                  <ArticleCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>

            {/* الشؤون الدولية */}
            <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs">
              <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-2.5">
                <h3 className="font-black text-base text-[var(--text)] flex items-center gap-2">
                  <span className="w-2 h-4 bg-[var(--gold)] rounded-sm" />
                  <span>الشؤون الدولية</span>
                </h3>
                <Link href="/world" className="text-xs text-[var(--primary)] font-bold hover:underline flex items-center gap-0.5">
                  <span>المزيد</span>
                  <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                </Link>
              </div>
              <div className="space-y-3">
                {worldArticles.slice(0, 3).map((art) => (
                  <ArticleCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>
          </div>

          {/* قطاع الاقتصاد والتقنية والابتكار */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* الاقتصاد والأسواق */}
            <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs">
              <div className="flex items-center justify-between border-b-2 border-amber-600 pb-2.5">
                <h3 className="font-black text-base text-[var(--text)] flex items-center gap-2">
                  <span className="w-2 h-4 bg-amber-500 rounded-sm" />
                  <span>الاقتصاد وأسواق المال</span>
                </h3>
                <Link href="/economy" className="text-xs text-[var(--primary)] font-bold hover:underline flex items-center gap-0.5">
                  <span>المزيد</span>
                  <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                </Link>
              </div>
              <div className="space-y-3">
                {economyArticles.slice(0, 3).map((art) => (
                  <ArticleCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>

            {/* التقنية والابتكار */}
            <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-xs">
              <div className="flex items-center justify-between border-b-2 border-sky-600 pb-2.5">
                <h3 className="font-black text-base text-[var(--text)] flex items-center gap-2">
                  <span className="w-2 h-4 bg-sky-500 rounded-sm" />
                  <span>التقنية والذكاء الاصطناعي</span>
                </h3>
                <Link href="/tech" className="text-xs text-[var(--primary)] font-bold hover:underline flex items-center gap-0.5">
                  <span>المزيد</span>
                  <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                </Link>
              </div>
              <div className="space-y-3">
                {techArticles.slice(0, 3).map((art) => (
                  <ArticleCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>
          </div>

          {/* رادار الحقيقة ومنزلق التحقيق الجنائي البصري */}
          <FactCheckSlider />

          {/* الإنفوجرافيك وصحافة البيانات والأرقام المعتمدة */}
          <InfographicSection />

          {/* بوابات المساعدات الإنسانية والوظائف المعتمدة */}
          <HomeAidAndJobsBar />

          {/* شريط الصحافة المرئية وفيديو الوطن */}
          <HomeVideoSection articles={videoArticles} />
        </div>

        {/* العمود الجانبي (4 أعمدة): الممر السريع + أسعار الذهب والعملات + استطلاع الرأي + الأكثر قراءة */}
        <div className="lg:col-span-4 space-y-8">
          {/* الممر السريع / التدفق اللحظي بصور دائمة */}
          <LiveFastStreamWire articles={fastStreamArticles} />

          {/* استطلاع الرأي التفاعلي اللحظي */}
          <InteractivePoll />

          {/* نافذة مؤشرات الأسواق والسلع الصادقة */}
          {quotes.length > 0 && (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <h3 className="font-black text-sm text-[var(--text)]">أسواق المال والذهب</h3>
                </div>
                <span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-bold">
                  بيانات حية
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {quotes.slice(0, 4).map((quote) => (
                  <QuoteTile key={quote.symbol} quote={quote} />
                ))}
              </div>

              <div className="pt-2 text-center border-t border-[var(--border)]">
                <Link href="/economy" className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1">
                  <span>مؤشرات بورصات فلسطين والعالم</span>
                  <ChevronLeft className="w-3 h-3 rtl:rotate-0" />
                </Link>
              </div>
            </div>
          )}

          {/* الأكثر قراءة وتفاعلاً */}
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
            <MostReadWidget
              articles={palestineStories
                .flatMap((s) => s.articles)
                .concat(worldArticles)
                .concat(arabWorldArticles)}
            />
          </div>

          {/* ميثاق الشفافية والمسؤولية الصحفية */}
          <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[#26000A]/10 to-[var(--surface)] p-5 space-y-3 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2 font-bold text-[var(--text)]">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="font-black text-sm">ميثاق الشرف والمصداقية:</span>
            </div>
            <p className="leading-relaxed text-xs">
              كافة المواد المنشورة على منصة «الوطن اليوم» منسوبة صراحة لمصادرها الرسمية الموثقة، ونلتزم بسجل تصحيحات شفاف وحماية كاملة لحقوق الملكية الفكرية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
