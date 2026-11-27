import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getSectionFeed } from "@/lib/dal";
import { ArticleCard } from "@/components/ArticleCard";
import { TodayMatchesWidget } from "@/components/sports/TodayMatchesWidget";
import { YallaSportBanner } from "@/components/sports/YallaSportBanner";
import { LiveWarRoomMap } from "@/components/LiveWarRoomMap";
import { PalestineCommoditiesWidget } from "@/components/PalestineCommoditiesWidget";
import { ShieldCheck, ChevronLeft, Sparkles, Layers, Activity, Trophy, Coins } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    section: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section: sectionSlug } = await params;
  const feed = await getSectionFeed(sectionSlug);

  if (!feed) {
    return { title: "القسم غير موجود — الوطن اليوم" };
  }

  return {
    title: `أخبار ${feed.section.nameAr} — الوطن اليوم`,
    description: feed.section.descriptionAr || `آخر الأخبار والتقارير والتغطيات المباشرة لقسم ${feed.section.nameAr} من مصادرها الأصلية.`,
    alternates: {
      canonical: `/${sectionSlug}`,
    },
  };
}

export default async function SectionPage({ params }: Props) {
  const { section: sectionSlug } = await params;
  const feed = await getSectionFeed(sectionSlug);

  if (!feed) {
    notFound();
  }

  const { section, articles } = feed;
  const heroArticle = articles[0];
  const sideArticles = articles.slice(1, 4);
  const remainingArticles = articles.slice(4);

  const SECTION_HERO_THEMES: Record<string, { border: string; bg: string; accent: string; badge: string }> = {
    palestine: {
      border: "border-emerald-500/35",
      bg: "bg-gradient-to-br from-[#062415]/40 via-[var(--surface)] to-[var(--surface)]",
      accent: "from-transparent via-emerald-400 to-transparent",
      badge: "text-emerald-500",
    },
    "arab-world": {
      border: "border-amber-500/35",
      bg: "bg-gradient-to-br from-[#2B1603]/30 via-[var(--surface)] to-[var(--surface)]",
      accent: "from-transparent via-amber-400 to-transparent",
      badge: "text-amber-500",
    },
    world: {
      border: "border-sky-500/35",
      bg: "bg-gradient-to-br from-[#06182B]/35 via-[var(--surface)] to-[var(--surface)]",
      accent: "from-transparent via-sky-400 to-transparent",
      badge: "text-sky-500",
    },
    tech: {
      border: "border-indigo-500/35",
      bg: "bg-gradient-to-br from-[#120A2E]/35 via-[var(--surface)] to-[var(--surface)]",
      accent: "from-transparent via-indigo-400 to-transparent",
      badge: "text-indigo-500",
    },
    opinion: {
      border: "border-[var(--gold)]/40",
      bg: "bg-gradient-to-br from-[#241305]/30 via-[var(--surface)] to-[var(--surface)]",
      accent: "from-transparent via-[var(--gold)] to-transparent",
      badge: "text-[var(--gold)]",
    },
  };
  const theme = SECTION_HERO_THEMES[sectionSlug] || {
    border: "border-[var(--gold)]/30",
    bg: "bg-gradient-to-b from-[#26000A]/15 via-[var(--surface)] to-[var(--surface)]",
    accent: "from-transparent via-[var(--gold)] to-transparent",
    badge: "text-[var(--gold)]",
  };

  return (
    <div className="container-custom py-10 space-y-12">
      {/* 1. ترويسة القسم المصممة بهوية مميزة لكل قطاع */}
      <div className={`card-imperial border ${theme.border} ${theme.bg} p-6 sm:p-9 space-y-5 shadow-imperial relative overflow-hidden`}>
        {/* شريط علوي إمبراطوري */}
        <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${theme.accent} opacity-90`} />

        {/* مسار التنقل الإمبراطوري */}
        <nav aria-label="فتات الخبز" className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors font-medium">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-[var(--gold)]/60 rtl:rotate-0" />
          <span className="text-[var(--primary)] font-black">{section.nameAr}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-[var(--gold)] shadow-[0_0_12px_var(--gold)] animate-pulse" />
              <h1 className="text-3xl sm:text-4xl font-black text-[var(--text)] tracking-tight title-imperial">
                {section.nameAr}
              </h1>
            </div>
            {section.descriptionAr && (
              <p className="text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
                {section.descriptionAr}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[var(--text)] bg-gradient-to-r from-[var(--gold)]/10 to-transparent px-4 py-2.5 rounded-2xl border border-[var(--gold)]/30 shadow-xs self-start md:self-auto">
            <Layers className="w-4 h-4 text-[var(--gold)]" />
            <span className="font-mono text-[var(--primary)] font-black">{articles.length}</span>
            <span>مادة صحفية معتمدة</span>
          </div>
        </div>

        {/* شريط الأقسام الفرعية (Sub-sections Pills) */}
        {section.children.length > 0 && (
          <div className="flex items-center gap-2.5 overflow-x-auto pt-2 scrollbar-none">
            <span className="text-xs text-[var(--text-muted)] font-black shrink-0">التصنيفات الميدانية:</span>
            {section.children.map((sub: any) => (
              <Link
                key={sub.id}
                href={`/${sectionSlug}/${sub.slug}`}
                className="px-4 py-1.5 rounded-xl text-xs font-bold border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)] hover:text-[var(--primary)] transition-all whitespace-nowrap shadow-2xs"
              >
                {sub.nameAr}
              </Link>
            ))}
          </div>
        )}

        {/* لوحة التغطية الخاصة لفلسطين أولاً */}
        {sectionSlug === "palestine" && (
          <div className="mt-4 p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-l from-[#072415]/40 via-[var(--surface)] to-[var(--surface)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-black text-emerald-400">
                    فلسطين أولاً — التغطية المركزية الميدانية الموحدة
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  تغطية ميدانية وتحقق لحظي لكافة المستجدات في غزة والقدس والضفة وكافة الأراضي المحتلة، ملتزمة بالقاموس التحريري الوطني والمصادر الرسمية.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold text-[var(--text)] border-t md:border-t-0 md:border-r border-[var(--border)] pt-3 md:pt-0 md:pe-4 shrink-0">
                <div className="text-center">
                  <span className="block text-[10px] text-[var(--text-muted)]">المصادر المعتمدة</span>
                  <span className="text-emerald-400 font-bold">وفا · صفا · شهاب</span>
                </div>
                <div className="text-center border-r border-[var(--border)] pe-4">
                  <span className="block text-[10px] text-[var(--text-muted)]">الرصد الإنساني</span>
                  <span className="text-[var(--gold)] font-bold">الهلال الأحمر · الصحة</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* لوحة الشراكة مع يلا سبورت لقسم الرياضة */}
        {sectionSlug === "sports" && (
          <div className="mt-4 p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-black text-emerald-400">
                    تكامل حصري مع شبكة يلا سبورت الرياضية (yallasport.com)
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  تابع التغطيات الحية، جداول المباريات، وترتيب الدوريات الأوروبية والعربية لحظة بلحظة عبر شريكنا الرياضي المعتمد.
                </p>
              </div>

              <a
                href="https://yallasport.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-colors flex items-center gap-2 shrink-0 shadow-md"
              >
                <span>الانتقال إلى منصة يلا سبورت</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 2. ويدجت رادار الميدان الحي المباشر لقسم فلسطين */}
      {sectionSlug === "palestine" && (
        <div className="space-y-6">
          <LiveWarRoomMap />
        </div>
      )}

      {/* 3. قسم الرياضة الخاص: جدول مباريات اليوم وبانر يلا سبورت */}
      {sectionSlug === "sports" && (
        <div className="space-y-6">
          <TodayMatchesWidget />
          <YallaSportBanner variant="leaderboard" />
        </div>
      )}

      {/* 4. قسم الاقتصاد الخاص: البورصة والسلع الحيوية */}
      {sectionSlug === "economy" && (
        <div className="space-y-6">
          <PalestineCommoditiesWidget />
        </div>
      )}

      {/* 5. شبكة المقالات والمواد الصحفية المصورة بالكامل */}
      {articles.length > 0 ? (
        <div className="space-y-10">
          {/* الكتلة الأولى: مادة بطلة عريضة + 3 مواد مصغرة بجانبها */}
          {heroArticle && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <ArticleCard article={heroArticle} variant="hero" />
              </div>
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-2">
                  <h3 className="font-black text-sm text-[var(--text)] flex items-center gap-2">
                    <span className="w-2 h-4 bg-[var(--gold)] rounded-sm" />
                    <span>أحدث المواد في القسم</span>
                  </h3>
                  <span className="text-[11px] text-[var(--text-muted)]">محدث باستمرار</span>
                </div>
                <div className="space-y-3">
                  {sideArticles.map((art) => (
                    <ArticleCard key={art.id} article={art} variant="compact" />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* الكتلة الثانية: بقية التغطيات في شبكة ثلاثية غنية بالصور */}
          {remainingArticles.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b-2 border-[var(--border)] pb-2.5">
                <h3 className="text-xl font-black text-[var(--text)] flex items-center gap-2">
                  <span className="w-2 h-4 bg-[var(--primary)] rounded-sm" />
                  <span>تغطيات وتقارير إضافية</span>
                </h3>
                <span className="text-xs text-[var(--text-muted)]">
                  {remainingArticles.length} مادة صحفية
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingArticles.map((art) => (
                  <ArticleCard key={art.id} article={art} variant="medium" />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] space-y-2">
          <p className="font-black text-lg text-[var(--text)]">لا توجد مواد منشورة حالياً في هذا القسم</p>
          <p className="text-xs max-w-md mx-auto">
            يقوم محرك الجلب الآلي بمتابعة المصادر على مدار الساعة وسيتم نشر الأخبار فور وصولها وتدقيقها تحريرياً.
          </p>
        </div>
      )}
    </div>
  );
}
