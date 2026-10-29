import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getSectionFeed } from "@/lib/dal";
import { ArticleCard } from "@/components/ArticleCard";

export const revalidate = 60; // ISR 60 ثانية

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
  const otherArticles = articles.slice(1);

  return (
    <div className="container-custom py-8 space-y-8">
      {/* ترويسة القسم */}
      <div className="border-b-2 border-[var(--primary)] pb-4">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
          <Link href="/" className="hover:text-[var(--primary)]">الرئيسية</Link>
          <span>/</span>
          <span className="text-[var(--primary)] font-semibold">{section.nameAr}</span>
        </div>

        <h1 className="text-3xl font-black text-[var(--text)] mb-2">
          {section.nameAr}
        </h1>
        {section.descriptionAr && (
          <p className="text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
            {section.descriptionAr}
          </p>
        )}

        {/* شريط الأقسام الفرعية (Sub-sections Pills) */}
        {section.children.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-2">
            <span className="text-xs text-[var(--text-muted)] font-semibold">تصفح حسب:</span>
            {section.children.map((sub) => (
              <Link
                key={sub.id}
                href={`/${sectionSlug}/${sub.slug}`}
                className="px-3 py-1 rounded-full text-xs font-medium border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors whitespace-nowrap"
              >
                {sub.nameAr}
              </Link>
            ))}
          </div>
        )}

        {/* لوحة التغطية الخاصة لفلسطين أولاً */}
        {sectionSlug === "palestine" && (
          <div className="mt-6 p-4 rounded-xl border border-emerald-500/30 bg-gradient-to-l from-emerald-950/20 via-[var(--surface)] to-[var(--surface)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-400">فلسطين أولاً — التغطية المركزية المباشرة</span>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  تغطية ميدانية وتحقق لحظي لكافة المستجدات في غزة والضفة والقدس وكافة الأراضي المحتلة، ملتزمة بالقاموس التحريري الوطني.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-[var(--text)] border-t md:border-t-0 md:border-r border-[var(--border)] pt-2 md:pt-0 md:pe-4 shrink-0">
                <div className="text-center">
                  <span className="block text-[10px] text-[var(--text-muted)]">المصادر المعتمدة</span>
                  <span className="text-emerald-400 font-bold">وكالة وفا · شهاب · صفا</span>
                </div>
                <div className="text-center border-r border-[var(--border)] pe-4">
                  <span className="block text-[10px] text-[var(--text-muted)]">الرصد الإنساني</span>
                  <span className="text-[var(--primary)] font-bold">وزارة الصحة · الهلال الأحمر</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* لوحة الشراكة مع يلا سبورت لقسم الرياضة */}
        {sectionSlug === "sports" && (
          <div className="mt-6 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-emerald-400">تكامل ذكي مع منصة يلا سبورت (yallasport.com)</span>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  تابع التغطيات الحية، جداول المباريات، وترتيب الدوريات الأوروبية والعربية لحظة بلحظة عبر شريكنا الرياضي المعتمد.
                </p>
              </div>

              <a
                href="https://yallasport.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
              >
                <span>الانتقال إلى يلا سبورت</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* المقالات */}
      {articles.length > 0 ? (
        <div className="space-y-8">
          {heroArticle && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ArticleCard article={heroArticle} variant="hero" />
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-[var(--text)] border-b border-[var(--border)] pb-2">
                  أحدث المواد في القسم
                </h3>
                {otherArticles.slice(0, 3).map((art) => (
                  <ArticleCard key={art.id} article={art} variant="compact" />
                ))}
              </div>
            </div>
          )}

          {otherArticles.length > 3 && (
            <div>
              <h3 className="text-lg font-bold text-[var(--text)] mb-4 border-b border-[var(--border)] pb-2">
                بقية التغطيات
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {otherArticles.slice(3).map((art) => (
                  <ArticleCard key={art.id} article={art} variant="medium" />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-12 text-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]">
          <p className="font-semibold text-base mb-1">لا توجد مواد منشورة حالياً في هذا القسم.</p>
          <p className="text-xs">يقوم محرك الجلب الآلي بمتابعة المصادر على مدار الساعة وسيتم نشر الأخبار فور وصولها.</p>
        </div>
      )}
    </div>
  );
}
