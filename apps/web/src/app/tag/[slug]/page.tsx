import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getTagFeed } from "@/lib/dal";
import { ArticleCard } from "@/components/ArticleCard";
import { Hash } from "lucide-react";

export const revalidate = 300; // ISR 5 دقائق

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const feed = await getTagFeed(slug);

  if (!feed) {
    return { title: "الوسم غير موجود — الوطن اليوم" };
  }

  return {
    title: `أخبار #${feed.tag.nameAr} — الوطن اليوم`,
    description: `كافة الأخبار والتقارير والتغطيات المرتبطة بالوسم #${feed.tag.nameAr} من مصادرها المعتمدة.`,
    alternates: {
      canonical: `/tag/${slug}`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { slug } = await params;
  const feed = await getTagFeed(slug);

  if (!feed) {
    notFound();
  }

  const { tag, articles } = feed;

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
        name: `وسم: ${tag.nameAr}`,
        item: `https://alwatantoday.net/tag/${slug}`,
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
        <span className="text-[var(--text-muted)]">الوسوم</span>
        <span>/</span>
        <span className="text-[var(--primary)] font-bold">{tag.nameAr}</span>
      </nav>

      {/* ترويسة الوسم */}
      <div className="border-b-2 border-[var(--primary)] pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
            <Hash className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[var(--text)]">
            #{tag.nameAr}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-[var(--text-muted)]">
          أحدث المواد الإخبارية والتقارير المرتبطة بهذا الوسم ({articles.length} مادة صحفية)
        </p>
      </div>

      {/* قائمة المقالات */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-[var(--border)] rounded-xl bg-[var(--surface)]/50">
          <p className="text-sm text-[var(--text-muted)]">
            لا توجد مقالات منشورة حالياً تحت هذا الوسم.
          </p>
        </div>
      )}
    </div>
  );
}

