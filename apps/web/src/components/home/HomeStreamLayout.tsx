import Link from "next/link";
import { StorySummary, ArticleCard as ArticleCardType, InstrumentQuote } from "@awt/shared";
import { ArticleCard } from "@/components/ArticleCard";
import { QuoteTile } from "@/components/QuoteTile";
import { MostReadWidget } from "@/components/MostReadWidget";
import { NewsStoriesBar } from "@/components/NewsStoriesBar";
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
import { AdSlot } from "@/components/AdSlot";
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
    <div className="space-y-16 sm:space-y-20 lg:space-y-24">
      {/* 0. شريط قصص الأخبار التفاعلية السريعة (Visual News Stories Rail) */}
      <NewsStoriesBar />

      {/* 1. المركز الرئاسي والبطل الإخباري ثلاثي الأعمدة (Tri-Pillar Hero Wall) */}
      <HomeHeroSection
        heroStory={heroStory}
        heroArticle={heroArticle}
        secondaryArticles={secondaryArticles}
      />

      {/* 1.1 الموجز الصوتي الذكي في صدارة الصفحة الرئيسية */}
      <FrontpageAudioBrief headlines={headlines} />

      {/* 2. صرح فلسطين أولاً وغرف العمليات الأربع الميدانية */}
      <PalestineFocusBlock stories={palestineStories} />

      {/* 2.1 غرفة العمليات الميدانية الحية وأطلس فلسطين التفاعلي */}
      <LiveWarRoomMap />

      {/* 2.2 صرح المال والأسواق والسلع الحيوية وحاسبة الذهب اللحظية */}
      <PalestineCommoditiesWidget />

      {/* 3. جدارية الصحافة المرئية وفيديو الوطن — بالعرض الكامل 12 عموداً بنمط سينمائي */}
      <HomeVideoSection articles={videoArticles} />

      {/* 4. ساحة يلا سبورت والملاعب (مباريات اليوم الحية + شبكة التقارير الكروية) */}
      <HomeSportsSection articles={sportsArticles} />

      {/* 5. الهيكل التحريري الشبكي: الأخبار الإقليمية والدولية والأعمدة الجانبية */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* العمود الرئيسي للأخبار والتحليلات (8 أعمدة) */}
        <div className="lg:col-span-8 space-y-10">
          {/* شبكة الأقسام المركزية: العالم العربي ودولياً */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* العالم العربي */}
            <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
              <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-3">
                <h3 className="font-black text-base text-[var(--text)] flex items-center gap-2">
                  <span className="w-2 h-4 bg-[var(--gold)] rounded-sm" />
                  <span>العالم العربي</span>
                </h3>
                <Link href="/arab-world" className="text-xs text-[var(--primary)] font-bold hover:underline flex items-center gap-0.5">
                  <span>المزيد</span>
                  <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                </Link>
              </div>
              <div className="space-y-3.5">
                {arabWorldArticles.slice(0, 3).map((art) => (
                  <ArticleCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>

            {/* الشؤون الدولية */}
            <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
              <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-3">
                <h3 className="font-black text-base text-[var(--text)] flex items-center gap-2">
                  <span className="w-2 h-4 bg-[var(--gold)] rounded-sm" />
                  <span>الشؤون الدولية</span>
                </h3>
                <Link href="/world" className="text-xs text-[var(--primary)] font-bold hover:underline flex items-center gap-0.5">
                  <span>المزيد</span>
                  <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                </Link>
              </div>
              <div className="space-y-3.5">
                {worldArticles.slice(0, 3).map((art) => (
                  <ArticleCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>
          </div>

          {/* بانر إعلاني تحريري بين قطاعات الأخبار */}
          <div className="py-2">
            <AdSlot position="BETWEEN_HOMEPAGE_SECTIONS" />
          </div>

          {/* قطاع الاقتصاد وأسواق المال والتقنية والابتكار */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* الاقتصاد وأسواق المال */}
            <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
              <div className="flex items-center justify-between border-b-2 border-amber-600 pb-3">
                <h3 className="font-black text-base text-[var(--text)] flex items-center gap-2">
                  <span className="w-2 h-4 bg-amber-500 rounded-sm" />
                  <span>الاقتصاد والأسواق</span>
                </h3>
                <Link href="/economy" className="text-xs text-[var(--primary)] font-bold hover:underline flex items-center gap-0.5">
                  <span>المزيد</span>
                  <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                </Link>
              </div>
              <div className="space-y-3.5">
                {economyArticles.slice(0, 3).map((art) => (
                  <ArticleCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>

            {/* التقنية والذكاء الاصطناعي */}
            <div className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
              <div className="flex items-center justify-between border-b-2 border-sky-600 pb-3">
                <h3 className="font-black text-base text-[var(--text)] flex items-center gap-2">
                  <span className="w-2 h-4 bg-sky-500 rounded-sm" />
                  <span>التقنية والذكاء الاصطناعي</span>
                </h3>
                <Link href="/tech" className="text-xs text-[var(--primary)] font-bold hover:underline flex items-center gap-0.5">
                  <span>المزيد</span>
                  <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                </Link>
              </div>
              <div className="space-y-3.5">
                {techArticles.slice(0, 3).map((art) => (
                  <ArticleCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* العمود الجانبي (4 أعمدة): الممر السريع + استطلاع الرأي + الأكثر قراءة + ميثاق الشرف */}
        <div className="lg:col-span-4 space-y-8">
          {/* الممر السريع والتدفق اللحظي */}
          <LiveFastStreamWire articles={fastStreamArticles} />

          {/* استطلاع الرأي التفاعلي اللحظي */}
          <InteractivePoll />

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
          <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[#26000A]/20 via-[var(--surface)] to-[var(--surface)] p-6 space-y-3.5 text-xs text-[var(--text-muted)] shadow-md">
            <div className="flex items-center gap-2 font-bold text-[var(--text)]">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="font-black text-sm">ميثاق الشرف والمصداقية:</span>
            </div>
            <p className="leading-relaxed text-xs">
              كافة المواد المنشورة على منصة «الوطن اليوم» منسوبة صراحة لمصادرها الرسمية الموثقة، ونلتزم بسجل تصحيحات شفاف وحماية كاملة لحقوق الملكية الفكرية.
            </p>
            <div className="pt-2">
              <Link
                href="/editorial-policy"
                className="text-xs font-bold text-[var(--gold)] hover:underline inline-flex items-center gap-1"
              >
                <span>الاطلاع على ميثاق الشرف كاملاً</span>
                <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 6. صرح التحقق الجنائي ومنزلق كشف التزييف البصري (بالعرض الكامل) */}
      <FactCheckSlider />

      {/* 7. صحافة البيانات والإنفوجرافيك التفاعلي (بالعرض الكامل) */}
      <InfographicSection />

      {/* 8. بوابات المساعدات الإنسانية والوظائف المعتمدة (بالعرض الكامل) */}
      <HomeAidAndJobsBar />
    </div>
  );
}
