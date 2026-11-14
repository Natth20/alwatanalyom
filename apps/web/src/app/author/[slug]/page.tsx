import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getAuthorFeed } from "@/lib/dal";
import { ArticleCard } from "@/components/ArticleCard";
import { User, Feather } from "lucide-react";

export const revalidate = 300; // ISR 5 دقائق

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feed = await getAuthorFeed(slug);

  if (!feed) {
    return { title: "الكاتب غير موجود — الوطن اليوم" };
  }

  return {
    title: `مقالات الكاتب ${feed.author.nameAr} — الوطن اليوم`,
    description: feed.author.bioAr || `كافة المقالات والتقارير الصحفية للكاتب ${feed.author.nameAr} على منصة الوطن اليوم.`,
    alternates: {
      canonical: `/author/${slug}`,
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const feed = await getAuthorFeed(slug);

  if (!feed) {
    notFound();
  }

  const { author, articles } = feed;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: "https://alwatantoday.net",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `الكاتب: ${author.nameAr}`,
        item: `https://alwatantoday.net/author/${slug}`,
      },
    ],
  };

  return (
    <div className="container-custom py-8 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* مسار التنقل (Breadcrumb) */}
      <nav className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--primary)]">الرئيسية</Link>
        <span>/</span>
        <span className="text-[var(--text-muted)]">الكتّاب</span>
        <span>/</span>
        <span className="text-[var(--primary)] font-bold">{author.nameAr}</span>
      </nav>

      {/* بطاقة الكاتب التعريفية */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-start">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] border-2 border-[var(--gold)] flex items-center justify-center shrink-0">
          <User className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--primary)]/10 text-[var(--primary)]">
            <Feather className="w-3.5 h-3.5" />
            <span>كاتب ومحرر معتمد</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[var(--text)]">
            {author.nameAr}
          </h1>

          {author.bioAr ? (
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              {author.bioAr}
            </p>
          ) : (
            <p className="text-xs text-[var(--text-muted)]">
              صحفي ومحرر مشارك في التغطيات والتحليلات الإخبارية لمنصة «الوطن اليوم».
            </p>
          )}

          <div className="pt-2 text-xs text-[var(--text-muted)] font-medium">
            إجمالي المواد المنشورة: {articles.length} مادة صحفية
          </div>
        </div>
      </div>

      {/* قائمة المقالات */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3">
          <span className="w-2.5 h-6 bg-[var(--primary)] rounded-full" />
          <h2 className="text-xl sm:text-2xl font-black text-[var(--text)]">
            جميع المقالات والتقارير
          </h2>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-[var(--border)] rounded-xl bg-[var(--surface)]/50">
            <p className="text-sm text-[var(--text-muted)]">
              لا توجد مقالات منشورة حالياً لهذا الكاتب.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

