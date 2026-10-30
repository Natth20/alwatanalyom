import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getArticleById } from "@/lib/dal";
import { SportsLinkCard } from "@/components/SportsLinkCard";
import { ArticleActions } from "@/components/ArticleActions";
import { ReadingToolbar } from "@/components/ReadingToolbar";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { AudioReader } from "@/components/AudioReader";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import { ArticleReactions } from "@/components/ArticleReactions";
import { SocialShareBar } from "@/components/SocialShareBar";
import { ShieldCheck, Clock, FileText } from "lucide-react";

export const revalidate = 300; // ISR 5 دقائق

interface PageProps {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id, slug } = await params;
  const article = await getArticleById(id);

  if (!article) {
    return { title: "الخبر غير موجود — الوطن اليوم" };
  }

  return {
    title: `${article.titleAr} — الوطن اليوم`,
    description: article.summaryAr || article.titleAr,
    alternates: {
      canonical: `/article/${article.id}/${article.slug}`,
    },
    openGraph: {
      title: article.titleAr,
      description: article.summaryAr || article.titleAr,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id, slug } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  // إذا تم سحب المقال لأسباب قانونية أو تصحيحية
  if (article.status === "WITHDRAWN") {
    return (
      <div className="container-custom py-16 text-center max-w-xl mx-auto">
        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
          410
        </div>
        <h1 className="text-2xl font-bold mb-3">تم سحب هذه المادة الصحفية</h1>
        <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
          سُحبت هذه المادة التزاماً بمعايير الشفافية وحقوق النشر والتصحيح التحريري.
          {article.withdrawnReason && ` السبب: ${article.withdrawnReason}`}
        </p>
        <Link href="/" className="px-4 py-2 bg-[var(--primary)] text-white rounded-md text-sm font-semibold">
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  // إعادة توجيه 301 إذا كان الـ slug غير مطابق للعنوان المحدث
  if (article.slug && slug !== article.slug) {
    redirect(`/article/${article.id}/${article.slug}`);
  }

  const canonicalUrl = `https://alwatantoday.net/article/${article.id}/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    headline: article.titleAr,
    description: article.summaryAr || article.titleAr,
    image: [
      (article as any).coverImageUrl || "https://alwatantoday.net/og-default.png",
    ],
    datePublished: article.publishedAt,
    dateModified: article.updatedAtPub || article.publishedAt,
    inLanguage: "ar",
    articleSection: article.section.nameAr,
    keywords: article.tags?.map((t) => t.nameAr).join(", ") || "",
    author: article.author
      ? {
          "@type": "Person",
          name: article.author.nameAr,
          url: `https://alwatantoday.net/author/${article.author.slug}`,
        }
      : {
          "@type": "Organization",
          name: article.source?.nameAr || "محرر الوطن اليوم",
          url: article.source?.homepageUrl || "https://alwatantoday.net",
        },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "الوطن اليوم",
      url: "https://alwatantoday.net",
      logo: {
        "@type": "ImageObject",
        url: "https://alwatantoday.net/icon-512.png",
        width: 512,
        height: 512,
      },
    },
    isAccessibleForFree: true,
  };

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
        name: article.section.nameAr,
        item: `https://alwatantoday.net/${article.section.slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.titleAr,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <div className="container-custom py-8 max-w-4xl mx-auto">
      {/* شريط تقدم قراءة المقال الدقيق في أعلى الشاشة */}
      <ReadingProgressBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* مسار التنقل (Breadcrumb) */}
      <nav className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-4">
        <Link href="/" className="hover:text-[var(--primary)]">الرئيسية</Link>
        <span>/</span>
        <Link href={`/${article.section.slug}`} className="hover:text-[var(--primary)] font-semibold text-[var(--primary)]">
          {article.section.nameAr}
        </Link>
        <span>/</span>
        <span className="truncate max-w-xs">{article.titleAr}</span>
      </nav>

      {/* شريط أدوات القراءة التفاعلي */}
      <ReadingToolbar
        article={{
          id: article.id,
          slug: article.slug,
          titleAr: article.titleAr,
          sectionNameAr: article.section.nameAr,
          summaryAr: article.summaryAr,
          sourceNameAr: article.source?.nameAr,
          wordCount: (article.summaryAr?.length || 0) + (article.bodyHtml?.length || 0) / 4,
        }}
      />

      {/* العنوان والتصنيف */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[var(--primary)]/10 text-[var(--primary)] px-2.5 py-0.5 rounded text-xs font-bold">
            {article.section.nameAr}
          </span>
          {article.isBreaking && (
            <span className="bg-[var(--breaking)] text-white px-2 py-0.5 rounded text-xs font-bold animate-pulse">
              عاجل
            </span>
          )}
          {article.kind === "OPINION" && (
            <span className="bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded text-xs font-bold">
              رأي وتحليل
            </span>
          )}
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>مادة مفحوصة ومطابقة للمصدر المعتمد</span>
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-[var(--text)] leading-tight tracking-tight">
          {article.titleAr}
        </h1>

        {/* سطر بيانات النشر وسرعة القراءة */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)] py-1 border-b border-[var(--border)]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>
              نُشر: {new Date(article.publishedAt).toLocaleString("ar-EG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" />
            <span>وقت القراءة المقدر: 2 إلى 3 دقائق</span>
          </span>
        </div>

        {/* شريط المشاركة الاجتماعية الفورية */}
        <SocialShareBar title={article.titleAr} url={canonicalUrl} />

        {article.titleOriginal && article.titleOriginal !== article.titleAr && (
          <p className="text-xs text-[var(--text-muted)] italic dir-ltr text-start">
            Original Headline: &quot;{article.titleOriginal}&quot;
          </p>
        )}

        {article.summaryAr && (
          <div className="p-4 rounded-lg bg-[var(--surface)] border-r-4 border-[var(--primary)] text-base font-medium text-[var(--text)] leading-relaxed">
            {article.summaryAr}
          </div>
        )}

        {/* القارئ الصوتي الذكي للمقال */}
        <AudioReader
          title={article.titleAr}
          summary={article.summaryAr}
          bodyHtml={article.bodyHtml}
        />

        {/* أبرز محاور التغطية الصحفية */}
        <KeyTakeaways summary={article.summaryAr} />
      </div>

      {/* صندوق الشفافية والمسؤولية التحريرية (Transparency Box) */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 p-4 mb-8 text-xs text-[var(--text-muted)] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center font-bold text-[var(--primary)]">
            مصدر
          </div>
          <div>
            <span className="block font-bold text-[var(--text)]">
              المصدر الأصلي: {article.source?.nameAr || "وكالة معتمدة"}
            </span>
            <span>
              نُشر لدى المصدر: {article.sourcePublishedAt ? new Date(article.sourcePublishedAt).toLocaleString("ar-EG") : "غير محدد"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ArticleActions
            article={{
              id: article.id,
              slug: article.slug,
              titleAr: article.titleAr,
              sectionNameAr: article.section.nameAr,
            }}
          />

          {article.translatedBy && (
            <span className="bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded text-[11px] font-medium">
              {article.translatedBy === "machine" ? "🤖 ترجمة آلية مراجعة" : "✍️ ترجمة بشرية"}
            </span>
          )}

          {article.sourceUrl && (
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-colors"
            >
              <span>قراءة الخبر من المصدر</span>
              <span>↗</span>
            </a>
          )}
        </div>
      </div>

      {/* جسم المقال حسب سياسة العرض (Display Policy) */}
      <div id="article-content-body" className="prose prose-lg dark:prose-invert max-w-none mb-12 transition-all">
        {article.displayPolicy === "LICENSED_FULL" && article.bodyHtml ? (
          <div dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />
        ) : (
          <div className="border border-dashed border-[var(--border)] rounded-xl p-8 text-center bg-[var(--surface)]/30 space-y-4">
            <h3 className="font-bold text-base text-[var(--text)]">
              حقوق النشر والاقتباس محفوظة للناشر الأصلي
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
              وفقاً لمبادئ منصة «الوطن اليوم» وسياسة الشفافية وحماية حقوق الملكية الفكرية، نقوم بتلخيص الحدث وتقديم السياق التحريري، بينما يتوفر النص الكامل للخبر لدى الناشر الأصلي مباشرة.
            </p>
            {article.sourceUrl && (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-block px-5 py-2.5 rounded-lg bg-[var(--primary)] text-white text-sm font-bold shadow hover:bg-[var(--primary-hover)] transition-colors"
              >
                متابعة قراءة النص الكامل على {article.source?.nameAr} ↗
              </a>
            )}
          </div>
        )}
      </div>

      {/* شريط مشاعر وانطباعات القراء */}
      <ArticleReactions articleId={article.id} />

      {/* بطاقة يلا سبورت للكيانات الرياضية */}
      {article.sportsLinks && article.sportsLinks.length > 0 && (
        <SportsLinkCard
          links={article.sportsLinks.map((l: any) => ({
            entityId: l.entity.id,
            nameAr: l.entity.nameAr,
            kind: l.entity.kind,
            urlPath: l.entity.urlPath,
          }))}
        />
      )}

      {/* سجل التصحيحات إذا وجد */}
      {article.corrections && article.corrections.length > 0 && (
        <div className="border-t border-[var(--border)] pt-4 mb-8">
          <h4 className="font-bold text-xs text-amber-600 mb-2">سجل التصحيحات:</h4>
          {article.corrections.map((cor) => (
            <p key={cor.id} className="text-xs text-[var(--text-muted)]">
              • {new Date(cor.createdAt).toLocaleDateString("ar-EG")}: {cor.note}
            </p>
          ))}
        </div>
      )}

      {/* تغطيات أخرى لنفس الحدث (Story Cluster) */}
      {article.otherCoverages && article.otherCoverages.length > 0 && (
        <div className="border-t border-[var(--border)] pt-8">
          <h3 className="text-lg font-bold text-[var(--text)] mb-4">
            تغطيات أخرى لنفس الحدث من مصادر متعددة ({article.otherCoverages.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {article.otherCoverages.map((cov) => (
              <div key={cov.id} className="p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)]">
                <span className="text-[11px] font-semibold text-[var(--primary)] block mb-1">
                  {cov.sourceNameAr}
                </span>
                <Link
                  href={`/article/${cov.id}/${cov.slug}`}
                  className="font-bold text-sm text-[var(--text)] hover:text-[var(--primary)] leading-snug line-clamp-2"
                >
                  {cov.titleAr}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

