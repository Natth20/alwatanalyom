import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getSectionFeed } from "@/lib/dal";
import { ArticleCard } from "@/components/ArticleCard";

export const revalidate = 60; // ISR 60 ثانية

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
    return { title: "القسم غير موجود — الوطن اليوم" };
  }

  return {
    title: `${feed.section.nameAr} — الوطن اليوم`,
    description: `تغطيات حية ومتابعة مستمرة لأخبار ${feed.section.nameAr}.`,
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

  return (
    <div className="container-custom py-8 space-y-8">
      {/* ترويسة القسم الفرعي */}
      <div className="border-b-2 border-[var(--primary)] pb-4">
        <nav className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
          <Link href="/" className="hover:text-[var(--primary)]">الرئيسية</Link>
          <span>/</span>
          <Link href={`/${sectionSlug}`} className="hover:text-[var(--primary)]">{sectionSlug}</Link>
          <span>/</span>
          <span className="text-[var(--primary)] font-semibold">{section.nameAr}</span>
        </nav>

        <h1 className="text-3xl font-black text-[var(--text)] mb-2">
          {section.nameAr}
        </h1>
      </div>

      {/* المقالات */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <ArticleCard key={art.id} article={art} variant="medium" />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]">
          <p className="font-semibold text-base mb-1">لا توجد مواد في هذا القسم الفرعي حالياً.</p>
          <Link href={`/${sectionSlug}`} className="text-xs text-[var(--primary)] font-semibold hover:underline">
            العودة للقسم الرئيسي ←
          </Link>
        </div>
      )}
    </div>
  );
}

