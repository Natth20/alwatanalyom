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

      {/* ترويسة الوسم الفاخرة */}
      <header className="relative rounded-3xl overflow-hidden border border-[var(--gold)]/30 bg-gradient-to-br from-[#26000A]/15 via-[var(--surface)] to-[var(--surface)] dark:from-[#21040c]/95 dark:via-[#140408]/95 dark:to-[#0e0407]/95 p-6 sm:p-9 shadow-xl space-y-3">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-80" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#590018] to-[#26000a] text-[var(--gold)] border border-[var(--gold)]/40 flex items-center justify-center shadow-md shrink-0">
              <Hash className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[var(--primary)] dark:text-[var(--gold)] block">
                محور موضوعي موثق
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-[var(--text)] title-imperial">
                #{tag.nameAr}
              </h1>
            </div>
          </div>

          <span className="px-3.5 py-1.5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] text-xs font-mono font-bold text-[var(--primary)]">
            {articles.length} مادة صحفية
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
          متابعة شاملة لكافة الأخبار والتقارير والتغطيات الميدانية والتحليلية المرتبطة بوسم #{tag.nameAr} من مصادرها الأصلية المعتمدة.
        </p>
      </header>

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

