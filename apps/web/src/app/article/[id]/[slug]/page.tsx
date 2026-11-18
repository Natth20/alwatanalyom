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
import { ShieldCheck, Clock, FileText, Hash, ArrowRight, Camera, Share2, Sparkles, Flame } from "lucide-react";
import { resolveEditorialImage } from "@/lib/editorial-images";

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

  const imageUrl = resolveEditorialImage(article);

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
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: article.titleAr,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.titleAr,
      description: article.summaryAr || article.titleAr,
      images: [imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id, slug } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  // إذا تم سحب المقال لأسباب تصحيحية
  if (article.status === "WITHDRAWN") {
    return (
      <div className="container-custom py-16 text-center max-w-xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center mx-auto mb-4 font-black text-2xl border border-red-500/20">
          410
        </div>
        <h1 className="text-2xl font-black mb-3 text-[var(--text)]">تم سحب هذه المادة الصحفية</h1>
        <p className="text-sm text-[var(--text-muted)] mb-6 leading-relaxed">
          سُحبت هذه المادة التزاماً بمعايير الشفافية وحقوق النشر والتصحيح التحريري.
          {article.withdrawnReason && ` السبب: ${article.withdrawnReason}`}
        </p>
        <Link href="/" className="px-5 py-2.5 bg-[#590018] text-[var(--gold)] rounded-xl text-xs font-black shadow-md">
          العودة للصفحة الرئيسية
        </Link>
      </div>
    );
  }

  // إعادة توجيه 301 إذا كان الـ slug غير مطابق للعنوان المحدث
  const decodedSlug = decodeURIComponent(slug);
  if (article.slug && decodedSlug !== article.slug && slug !== article.slug) {
    redirect(`/article/${article.id}/${encodeURIComponent(article.slug)}`);
  }

  const canonicalUrl = `https://alwatantoday.net/article/${article.id}/${article.slug}`;
  const articleImageUrl = resolveEditorialImage(article);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    headline: article.titleAr,
    description: article.summaryAr || article.titleAr,
    image: [articleImageUrl],
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
    <article className="container-custom py-8 max-w-4xl mx-auto space-y-8">
      {/* 0. شريط تقدم قراءة المقال الدقيق في أعلى الشاشة */}
      <ReadingProgressBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* 1. مسار التنقل التحريري المنساب (Breadcrumbs) */}
      <nav aria-label="فتات الخبز" className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--primary)] transition-colors">
          الرئيسية
        </Link>
        <span>/</span>
        <Link
          href={`/${article.section.slug}`}
          className="hover:text-[var(--primary)] font-bold text-[var(--primary)] transition-colors"
        >
          {article.section.nameAr}
        </Link>
        <span>/</span>
        <span className="truncate max-w-xs opacity-75">{article.titleAr}</span>
      </nav>

      {/* 2. شريط أدوات القراءة التفاعلي (تكبير الخط، الاستماع الصوتي، الحفظ) */}
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

      {/* 3. الترويسة الرئيسية للمقال (Header Hero) */}
      <header className="space-y-4">
        {/* الشارات العلوية */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/${article.section.slug}`}
            className="bg-[#590018] text-[var(--gold)] px-3.5 py-1 rounded-xl text-xs font-black border border-[var(--gold)]/30 hover:brightness-110 transition-all shadow-sm"
          >
            {article.section.nameAr}
          </Link>

          {article.isBreaking && (
            <span className="bg-red-600 text-white px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>عاجل</span>
            </span>
          )}

          {article.kind === "OPINION" && (
            <span className="bg-amber-500/10 text-amber-600 px-3 py-1 rounded-xl text-xs font-bold border border-amber-500/20">
              رأي وتحليل
            </span>
          )}

          <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl font-bold flex items-center gap-1.5 ms-auto">
            <ShieldCheck className="w-4 h-4" />
            <span>مادة مفحوصة ومطابقة للمصدر المعتمد</span>
          </span>
        </div>

        {/* العنوان البطل الفخم بنمط الجزيرة وسكاي نيوز عربية */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-[var(--text)] leading-tight tracking-tight pt-2">
          {article.titleAr}
        </h1>

        {/* سطر بيانات النشر والمصدر ووقت القراءة */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)] py-3 border-y border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-black text-xs">
              {article.source?.nameAr?.[0] || "و"}
            </div>
            <span className="font-bold text-[var(--text)]">
              المصدر: {article.source?.nameAr || "محرر الوطن اليوم"}
            </span>
          </div>

          <span className="hidden sm:inline text-[var(--border)]">|</span>

          <span className="flex items-center gap-1.5 font-mono">
            <Clock className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>
              نُشر:{" "}
              {new Date(article.publishedAt).toLocaleDateString("ar-EG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              الساعة{" "}
              {new Date(article.publishedAt).toLocaleTimeString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </span>

          <span className="hidden sm:inline text-[var(--border)]">|</span>

          <span className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>وقت القراءة: 2 إلى 3 دقائق</span>
          </span>
        </div>

        {/* شريط المشاركة الاجتماعية الفورية */}
        <div className="pt-1">
          <SocialShareBar title={article.titleAr} url={canonicalUrl} />
        </div>
      </header>

      {/* 4. الصورة الصحفية الرئيسية العريضة الفخمة (Lead Editorial Image) */}
      <figure className="space-y-2">
        <div className="relative aspect-16/9 w-full rounded-3xl overflow-hidden bg-stone-950 border border-[var(--border)] shadow-xl group">
          <img
            src={articleImageUrl}
            alt={article.titleAr}
            loading="eager"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-3 start-4 flex items-center gap-2 text-white/90 text-xs font-medium bg-black/60 backdrop-blur-md px-3 py-1 rounded-xl">
            <Camera className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>توثيق ميداني معتمد · أرشيف «الوطن اليوم»</span>
          </div>
        </div>
        <figcaption className="text-center text-[11px] text-[var(--text-muted)] italic">
          {article.titleAr} — الصورة تعبيرية موثقة من واقع الحدث الصحفي
        </figcaption>
      </figure>

      {/* 5. ملخص الخبر التحريري البارز */}
      {article.summaryAr && (
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-l from-[var(--primary)]/10 via-[var(--surface)] to-[var(--surface)] border-r-4 border-[var(--primary)] text-base sm:text-lg font-bold text-[var(--text)] leading-relaxed shadow-xs">
          {article.summaryAr}
        </div>
      )}

      {/* 6. القارئ الصوتي الذكي للمقال */}
      <AudioReader
        title={article.titleAr}
        summary={article.summaryAr}
        bodyHtml={article.bodyHtml}
      />

      {/* 7. أبرز محاور التغطية الصحفية في نقاط */}
      <KeyTakeaways summary={article.summaryAr} />

      {/* 8. صندوق الشفافية والمسؤولية التحريرية (Transparency Box) */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-xs text-[var(--text-muted)] flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center font-bold text-[var(--primary)] shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
          </div>
          <div>
            <span className="block font-black text-sm text-[var(--text)]">
              المصدر الأصلي: {article.source?.nameAr || "وكالة معتمدة"}
            </span>
            <span className="text-[11px]">
              نُشر لدى المصدر: {article.sourcePublishedAt ? new Date(article.sourcePublishedAt).toLocaleString("ar-EG") : "موثق لدى غرفة الأخبار"}
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
            <span className="bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-xl text-xs font-semibold">
              {article.translatedBy === "machine" ? "🤖 ترجمة آلية مراجعة" : "✍️ ترجمة بشرية معتمدة"}
            </span>
          )}

          {article.sourceUrl && (
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#590018] text-[var(--gold)] font-bold hover:brightness-110 transition-all text-xs shadow-xs"
            >
              <span>قراءة الخبر من المصدر</span>
              <span className="rtl:rotate-180">←</span>
            </a>
          )}
        </div>
      </div>

      {/* 9. جسم المقال حسب سياسة العرض التحريرية (Display Policy) */}
      <div id="article-content-body" className="prose prose-lg dark:prose-invert max-w-none pt-2 leading-relaxed text-[var(--text)]">
        {article.displayPolicy === "LICENSED_FULL" && article.bodyHtml ? (
          <div dangerouslySetInnerHTML={{ __html: article.bodyHtml }} />
        ) : (
          <div className="border border-dashed border-[var(--border)] rounded-2xl p-8 text-center bg-[var(--surface)] space-y-4 shadow-xs">
            <h3 className="font-black text-lg text-[var(--text)]">
              حقوق النشر والاقتباس محفوظة للمصدر الأصلي
            </h3>
            <p className="text-sm text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
              وفقاً لمبادئ منصة «الوطن اليوم» وميثاق الشفافية وحماية الملكية الفكرية، نلخص الحدث ونوفر السياق التحريري والتحقق الجنائي، بينما يتوفر النص الكامل للخبر لدى الناشر الأصلي مباشرة.
            </p>
            {article.sourceUrl && (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-block px-6 py-3 rounded-xl bg-[#590018] text-[var(--gold)] text-xs font-black shadow-md hover:brightness-110 transition-all"
              >
                متابعة قراءة النص الكامل على {article.source?.nameAr} ↗
              </a>
            )}
          </div>
        )}
      </div>

      {/* 10. الوسوم والكلمات المفتاحية (Tags) */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-[var(--border)]">
          <span className="text-xs font-bold text-[var(--text-muted)] flex items-center gap-1">
            <Hash className="w-3.5 h-3.5" />
            <span>الوسوم المرتبطة:</span>
          </span>
          {article.tags.map((tag: any) => (
            <Link
              key={tag.id}
              href={`/tag/${tag.slug}`}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
            >
              #{tag.nameAr}
            </Link>
          ))}
        </div>
      )}

      {/* 11. شريط تفاعلات وانطباعات القراء */}
      <ArticleReactions articleId={article.id} />

      {/* 12. بطاقة يلا سبورت للكيانات الرياضية إن وجدت */}
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

      {/* 13. سجل التصحيحات الشفاف إذا وجد */}
      {article.corrections && article.corrections.length > 0 && (
        <div className="border border-amber-500/30 rounded-2xl p-5 bg-amber-500/5 space-y-2">
          <h4 className="font-bold text-xs text-amber-600 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>سجل التصحيحات والتحديثات التحريرية:</span>
          </h4>
          {article.corrections.map((cor) => (
            <p key={cor.id} className="text-xs text-[var(--text-muted)]">
              • {new Date(cor.createdAt).toLocaleDateString("ar-EG")}: {cor.note}
            </p>
          ))}
        </div>
      )}

      {/* 14. تغطيات أخرى لنفس الحدث من زوايا متعددة مصحوبة بصور */}
      {article.otherCoverages && article.otherCoverages.length > 0 && (
        <div className="border-t border-[var(--border)] pt-8 space-y-4">
          <h3 className="text-xl font-black text-[var(--text)]">
            تغطيات أخرى لنفس الحدث من مصادر متعددة ({article.otherCoverages.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {article.otherCoverages.map((cov) => {
              const covImg = resolveEditorialImage({
                titleAr: cov.titleAr,
                id: cov.id,
                sectionSlug: article.section.slug,
              });
              return (
                <div
                  key={cov.id}
                  className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] hover:shadow-md transition-all flex items-center gap-3.5 group"
                >
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-900 border border-[var(--border)]">
                    <img
                      src={covImg}
                      alt={cov.titleAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-1 flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-[var(--primary)] block">
                      {cov.sourceNameAr}
                    </span>
                    <Link
                      href={`/article/${cov.id}/${cov.slug}`}
                      className="font-bold text-xs sm:text-sm text-[var(--text)] group-hover:text-[var(--primary)] leading-snug line-clamp-2 block transition-colors"
                    >
                      {cov.titleAr}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}
