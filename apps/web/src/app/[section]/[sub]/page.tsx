import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getSectionFeed } from "@/lib/dal";
import { ArticleCard } from "@/components/ArticleCard";
import { LiveWarRoomMap } from "@/components/LiveWarRoomMap";
import {
  ShieldCheck,
  ChevronLeft,
  Layers,
  MapPin,
  Landmark,
  HeartHandshake,
  Radio,
  Flame,
  Scale,
  Sparkles,
  Compass,
  AlertTriangle,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    section: string;
    sub: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section: sectionSlug, sub: subSlug } = await params;
  const feed = await getSectionFeed(sectionSlug, subSlug);

  if (!feed) {
    return { title: "التصنيف غير موجود — الوطن اليوم" };
  }

  return {
    title: `${feed.section.nameAr} — التغطية الميدانية الشاملة | الوطن اليوم`,
    description:
      feed.section.descriptionAr ||
      `آخر الأخبار والتقارير الميدانية الحية لقسم ${feed.section.nameAr} من مصادرها الرسمية الموثقة.`,
    alternates: {
      canonical: `/${sectionSlug}/${subSlug}`,
    },
  };
}

export default async function SubSectionPage({ params }: Props) {
  const { section: sectionSlug, sub: subSlug } = await params;
  const feed = await getSectionFeed(sectionSlug, subSlug);

  if (!feed) {
    notFound();
  }

  const { section, articles } = feed;
  const heroArticle = articles[0];
  const sideArticles = articles.slice(1, 4);
  const remainingArticles = articles.slice(4);

  const isPalestine = sectionSlug === "palestine";
  const isJerusalem = isPalestine && (subSlug === "jerusalem" || section.nameAr.includes("القدس"));
  const isGaza = isPalestine && (subSlug === "gaza" || section.nameAr.includes("غزة"));
  const isWestBank = isPalestine && (subSlug === "west-bank" || section.nameAr.includes("الضفة"));

  return (
    <div dir="rtl" className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 pb-20">
      {/* شريط التنقل العلوي الملكي */}
      <div className="border-b border-white/10 bg-gradient-to-r from-black/80 via-[#180309]/80 to-black/80 py-4">
        <div className="container-custom max-w-7xl mx-auto flex items-center justify-between text-xs text-stone-300">
          <nav aria-label="فتات الخبز" className="flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">
              الرئيسية
            </Link>
            <ChevronLeft className="w-3.5 h-3.5 text-stone-500" />
            <Link
              href={`/${sectionSlug}`}
              className="hover:text-[var(--gold)] transition-colors"
            >
              {sectionSlug === "palestine" ? "فلسطين والميدان" : sectionSlug}
            </Link>
            <ChevronLeft className="w-3.5 h-3.5 text-stone-500" />
            <span className="text-[var(--gold)] font-bold">{section.nameAr}</span>
          </nav>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>بث مباشر من غرفة عمليات الميدان</span>
          </span>
        </div>
      </div>

      <div className="container-custom max-w-7xl mx-auto py-10 space-y-12">
        {/* 1. الترويسة السيادية الخاصة بالمحور الميداني */}
        <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-[#062415]/90 via-[#0e0004]/90 to-[#06120b]/90 p-8 md:p-12 shadow-2xl space-y-6">
          <div className="pointer-events-none absolute -top-32 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black shadow-xs">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>المحور الميداني المعتمد · فلسطين أولاً</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight flex items-center gap-3">
                <span>{section.nameAr}</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-[var(--gold)] border border-[var(--gold)]/30 font-mono">
                  تغطية 24/7
                </span>
              </h1>

              {section.descriptionAr && (
                <p className="text-sm md:text-base text-stone-300 leading-relaxed max-w-2xl">
                  {section.descriptionAr}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
              <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/30 text-center min-w-[130px]">
                <span className="text-[10px] text-stone-400 block font-bold">المواد الموثقة</span>
                <strong className="font-mono text-2xl font-black text-emerald-400 block mt-0.5">
                  {articles.length}
                </strong>
                <span className="text-[10px] text-stone-400 block">تقارير حية</span>
              </div>
            </div>
          </div>

          {/* بطاقات الإحاطة التخصصية حسب المحور الجغرافي */}
          {isJerusalem && (
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-1.5">
                <strong className="text-[var(--gold)] font-bold flex items-center gap-1.5 text-sm">
                  <Landmark className="w-4 h-4" />
                  <span>المسجد الأقصى والبلدة القديمة</span>
                </strong>
                <p className="text-stone-300 leading-relaxed">
                  رصد مباشر للمصلين، مسار الاقتحامات، إغلاق الأبواب، وأوضاع حارة المغاربة والشيخ جراح وسلوان.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-1.5">
                <strong className="text-emerald-300 font-bold flex items-center gap-1.5 text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>الصمود المقدسي وحقوق المواطنة</span>
                </strong>
                <p className="text-stone-300 leading-relaxed">
                  توثيق أوامر الهدم ومحاولات تفريغ المدينة ومساندة المؤسسات المقدسية والهيئات الإسلامية والمسيحية.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-1.5">
                <strong className="text-sky-300 font-bold flex items-center gap-1.5 text-sm">
                  <Scale className="w-4 h-4" />
                  <span>المصادر الرسمية المعتمدة</span>
                </strong>
                <p className="text-stone-300 leading-relaxed">
                  دائرة الأوقاف الإسلامية بالقدس، الهلال الأحمر الفلسطيني، ومكتب الأمم المتحدة للشؤون الإنسانية (OCHA).
                </p>
              </div>
            </div>
          )}

          {isGaza && (
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/30 space-y-1.5">
                <strong className="text-rose-400 font-bold flex items-center gap-1.5 text-sm">
                  <Flame className="w-4 h-4" />
                  <span>الميدان والصمود الإنساني</span>
                </strong>
                <p className="text-stone-300 leading-relaxed">
                  متابعة دقيقة لمراكز الإيواء، خطوط النار، المستشفيات الميدانية، والجهود الأسطورية لفرق الدفاع المدني والإسعاف.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 space-y-1.5">
                <strong className="text-amber-300 font-bold flex items-center gap-1.5 text-sm">
                  <HeartHandshake className="w-4 h-4" />
                  <span>المعابر وشريان الإغاثة</span>
                </strong>
                <p className="text-stone-300 leading-relaxed">
                  رصد شاحنات المساعدات، حركة معبر رفح وكرم أبو سالم، والتنسيق الإنساني مع الأونروا والهلال الأحمر.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-1.5">
                <strong className="text-emerald-300 font-bold flex items-center gap-1.5 text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>تحقيق ونفي الشائعات</span>
                </strong>
                <p className="text-stone-300 leading-relaxed">
                  مطابقة أي ادعاءات عسكرية أو بيانات مجهولة مع ديسك رادار الحقيقة لمنع ترويج الروايات المضللة.
                </p>
              </div>
            </div>
          )}

          {isWestBank && (
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/30 space-y-1.5">
                <strong className="text-amber-300 font-bold flex items-center gap-1.5 text-sm">
                  <Compass className="w-4 h-4" />
                  <span>الحواجز وحركة التنقل اليومية</span>
                </strong>
                <p className="text-stone-300 leading-relaxed">
                  تحديثات لحظية لحواجز حوارة، قلنديا، جبع، الكونتينر، والحمرا لتيسير حركة المواطنين بين المحافظات.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-1.5">
                <strong className="text-emerald-300 font-bold flex items-center gap-1.5 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>صمود الأغوار والريف الفلسطيني</span>
                </strong>
                <p className="text-stone-300 leading-relaxed">
                  رصد اعتداءات المستوطنين وتجريف الأراضي الزراعية ودعم صمود المزارعين والرعاة في الأغوار ومسافر يطا.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-sky-500/30 space-y-1.5">
                <strong className="text-sky-300 font-bold flex items-center gap-1.5 text-sm">
                  <Radio className="w-4 h-4" />
                  <span>مخيمات جنين وطولكرم وبلاطة</span>
                </strong>
                <p className="text-stone-300 leading-relaxed">
                  تغطية خاصة لملحمة الصمود الشعبي وإعادة إعمار البنية التحتية المدمرة في المخيمات الفلسطينية.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 2. ويدجت رادار الميدان الحي عند تصفح فلسطين */}
        {isPalestine && (
          <div className="space-y-6">
            <LiveWarRoomMap />
          </div>
        )}

        {/* 3. شبكة المقالات والمواد الصحفية المصورة بالكامل */}
        {articles.length > 0 ? (
          <div className="space-y-10">
            {heroArticle && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-7">
                  <ArticleCard article={heroArticle} variant="hero" />
                </div>
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-emerald-500/50 pb-2">
                    <h3 className="font-black text-sm text-white flex items-center gap-2">
                      <span className="w-2 h-4 bg-[var(--gold)] rounded-sm" />
                      <span>أحدث التغطيات الميدانية في {section.nameAr}</span>
                    </h3>
                    <span className="text-[11px] text-stone-400">تحديث لحظي</span>
                  </div>
                  <div className="space-y-3">
                    {sideArticles.map((art) => (
                      <ArticleCard key={art.id} article={art} variant="compact" />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {remainingArticles.length > 0 && (
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between border-b-2 border-white/10 pb-2.5">
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <span className="w-2 h-4 bg-emerald-500 rounded-sm" />
                    <span>تغطيات وتقارير ميدانية إضافية</span>
                  </h3>
                  <span className="text-xs text-stone-400">
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
          <div className="p-16 text-center rounded-3xl border border-white/10 bg-white/[0.02] text-stone-400 space-y-3">
            <p className="font-black text-lg text-white">لا توجد مواد منشورة حالياً في هذا المحور</p>
            <p className="text-xs max-w-md mx-auto leading-relaxed">
              يقوم مراسلو المنصة في القدس والضفة وغزة وغرفة الأخبار المركزية بتحديث البيانات لحظة بلحظة بمجرد ورود الأنباء وتوثيقها.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
