import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getSectionFeed } from "@/lib/dal";
import { ArticleCard } from "@/components/ArticleCard";
import { LiveWarRoomMap } from "@/components/LiveWarRoomMap";
import { ShieldCheck, ChevronLeft, Layers, MapPin, Activity } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    section: string;
    subsection: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section: sectionSlug, subsection: subSlug } = await params;
  const feed = await getSectionFeed(sectionSlug, subSlug);

  if (!feed) {
    return { title: "التصنيف غير موجود — الوطن اليوم" };
  }

  return {
    title: `${feed.section.nameAr} — الوطن اليوم`,
    description: feed.section.descriptionAr || `آخر الأخبار والتقارير الميدانية الحية لقسم ${feed.section.nameAr} من مصادرها الرسمية الموثقة.`,
    alternates: {
      canonical: `/${sectionSlug}/${subSlug}`,
    },
  };
}

export default async function SubsectionPage({ params }: Props) {
  const { section: sectionSlug, subsection: subSlug } = await params;
  const feed = await getSectionFeed(sectionSlug, subSlug);

  if (!feed) {
    notFound();
  }

  const { section, articles } = feed;
  const heroArticle = articles[0];
  const sideArticles = articles.slice(1, 4);
  const remainingArticles = articles.slice(4);

  return (
    <div className="container-custom py-8 space-y-10">
      {/* 1. ترويسة التصنيف الميداني */}
      <div className="card-imperial bg-gradient-to-b from-[#26000A]/15 via-[var(--surface)] to-[var(--surface)] p-6 sm:p-8 space-y-4 shadow-imperial relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-90" />

        {/* مسار التنقل */}
        <nav aria-label="فتات الخبز" className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors font-medium">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-[var(--gold)]/60 rtl:rotate-0" />
          <Link href={`/${sectionSlug}`} className="hover:text-[var(--gold)] transition-colors font-medium">
            {sectionSlug === "palestine" ? "فلسطين والميدان" : sectionSlug}
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-[var(--gold)]/60 rtl:rotate-0" />
          <span className="text-[var(--primary)] font-black">{section.nameAr}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" />
              <h1 className="text-3xl sm:text-4xl font-black text-[var(--text)] tracking-tight title-imperial flex items-center gap-2">
                <span>{section.nameAr}</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  تغطية ميدانية مباشرة
                </span>
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
            <span>مادة صحفية وميدانية</span>
          </div>
        </div>

        {/* كبسولة التوثيق السيادي */}
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>توثيق جنائي وميداني مستند للشهود والوكالات الرسمية والوزارات المعتمدة</span>
          </div>
          <span className="font-mono text-[10px] bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            24/7 Live Feed
          </span>
        </div>
      </div>

      {/* 2. رادار الميدان الإنساني لمحافظات فلسطين */}
      {sectionSlug === "palestine" && (
        <div className="space-y-6">
          <LiveWarRoomMap />
        </div>
      )}

      {/* 3. شبكة المقالات والمواد الصحفية */}
      {articles.length > 0 ? (
        <div className="space-y-10">
          {heroArticle && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <ArticleCard article={heroArticle} variant="hero" />
              </div>
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-2">
                  <h3 className="font-black text-sm text-[var(--text)] flex items-center gap-2">
                    <span className="w-2 h-4 bg-[var(--gold)] rounded-sm" />
                    <span>أحدث التغطيات في {section.nameAr}</span>
                  </h3>
                  <span className="text-[11px] text-[var(--text-muted)]">مباشر</span>
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
          <p className="font-black text-lg text-[var(--text)]">لا توجد مواد منشورة حالياً في هذا المحور</p>
          <p className="text-xs max-w-md mx-auto">
            يقوم مراسلو المنصة وغرفة الأخبار بتحديث البيانات لحظة بلحظة بمجرد ورود الأنباء وتوثيقها.
          </p>
        </div>
      )}
    </div>
  );
}
