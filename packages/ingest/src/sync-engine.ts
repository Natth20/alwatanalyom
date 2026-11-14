import { fetchFeedSafe } from "./rss/fetcher";
import { parseFeedXml } from "./rss/parser";
import { computeUrlHash, generateArabicSlug } from "@awt/shared";


interface IngestReport {
  timestamp: string;
  sourcesProcessed: number;
  totalNewArticles: number;
  totalReviewItems?: number;
  errors: { sourceSlug: string; error: string }[];
  details: { sourceName: string; count: number; reviewCount?: number }[];
}

function classifySection(title: string, summary: string | undefined, hints: string[]): string {
  const text = `${title} ${summary || ""}`.toLowerCase();

  // 1. فلسطين وملفاتها
  if (
    /فلسطين|غزة|الضفة|القدس|رفح|خان يونس|نابلس|جنين|طولكرم|الأقصى|الاحتلال|حماس|جهاد|شهيد|شهداء|قصف|هدنة|مستوطن/.test(
      text
    )
  ) {
    if (/غزة|رفح|خان يونس|الشمال|جباليا/.test(text)) return "palestine-gaza";
    if (/القدس|الأقصى|سلوان|الشيخ جراح/.test(text)) return "palestine-jerusalem";
    if (/الضفة|جنين|نابلس|رام الله|الخليل|طولكرم/.test(text)) return "palestine-west-bank";
    return "palestine";
  }

  // 2. الاقتصاد
  if (
    hints.includes("economy") ||
    /اقتصاد|نفط|برنت|أسعار|تضخم|دولار|ذهب|فضة|بورصة|أسهم|مركزي|فائدة|بيتكوين|عملات|سوق المال/.test(
      text
    )
  ) {
    return "economy";
  }

  // 3. الرياضة
  if (
    hints.includes("sports") ||
    /رياضة|دوري|أبطال|مباراة|نادي|ريال مدريد|برشلونة|ليفربول|مانشستر|الأهلي|الزمالك|كأس|فيفا|هدف|مهاجم|لاعب|مدرب/.test(
      text
    )
  ) {
    return "sports";
  }

  // 4. التقنية والابتكار
  if (
    hints.includes("tech") ||
    /تقنية|تكنولوجيا|ذكاء اصطناعي|آبل|غوغل|جوجل|مايكروسوفت|سامسونج|أندرويد|آيفون|أوبن إيه آي|معالج|أمن سيبراني|تطبيق/.test(
      text
    )
  ) {
    return "tech";
  }

  // 5. العالم العربي والدولي
  if (
    /سعودية|مصر|إمارات|قطر|أردن|لبنان|سوريا|عراق|يمن|سودان|جامعة الدول|عمان|كويت|بحرين|مغرب|جزائر|تونس/.test(
      text
    )
  ) {
    return "arab-world";
  }

  // المصادر العالمية الافتراضية
  if (hints.includes("world")) return "world";

  return hints[0] || "world";
}

function checkIsBreaking(title: string): boolean {
  return /عاجل|أنباء أولية|الآن|في هذه الأثناء|تطورات عاجلة|بيان عاجل/.test(title);
}

export async function runLiveIngest(
  prisma: any,
  options?: {
    sourceId?: string;
    limitPerSource?: number;
    requireReview?: boolean;
  }
): Promise<IngestReport> {
  const limit = options?.limitPerSource || 15;
  const whereClause = options?.sourceId ? { id: options.sourceId } : { enabled: true };

  // فحص حالة مفتاح الإيقاف التحريري العام (Kill Switch)
  let isKillSwitchActive = false;
  try {
    const killPolicy = await prisma.publishPolicy.findFirst({
      where: { name: "MASTER_KILL_SWITCH" },
    });
    if (killPolicy && !killPolicy.enabled) {
      isKillSwitchActive = true;
    }
  } catch {
    // ignore
  }

  const sources = await prisma.source.findMany({
    where: whereClause,
  });

  const report: IngestReport = {
    timestamp: new Date().toISOString(),
    sourcesProcessed: 0,
    totalNewArticles: 0,
    totalReviewItems: 0,
    errors: [],
    details: [],
  };

  // جلب كافة الأقسام النشطة لربط المقالات بها
  const sections: Array<{ id: string; slug: string }> = await prisma.section.findMany();
  const sectionMap = new Map(sections.map((s: { id: string; slug: string }) => [s.slug, s.id]));
  const defaultSectionId = sectionMap.get("world") || sections[0]?.id;

  for (const source of sources) {
    if (!source.feedUrl) continue;

    report.sourcesProcessed++;

    try {
      const fetchResult = await fetchFeedSafe(source.feedUrl);

      if (!fetchResult.ok || !fetchResult.bodyText) {
        await prisma.source.update({
          where: { id: source.id },
          data: {
            state: "FAILING",
            lastError: fetchResult.error || "فشل تحميل الخلاصة",
          },
        });
        report.errors.push({
          sourceSlug: source.slug,
          error: fetchResult.error || "فشل الاتصال بالخلاصة",
        });
        continue;
      }

      // تحديث حالة المصدر بالنجاح
      await prisma.source.update({
        where: { id: source.id },
        data: {
          state: "OK",
          lastSuccessAt: new Date(),
          lastError: null,
        },
      });

      const parsedItems = parseFeedXml(fetchResult.bodyText);
      const itemsToProcess = parsedItems.slice(0, limit);
      let newCount = 0;
      let reviewCount = 0;

      for (const raw of itemsToProcess) {
        if (!raw.title || !raw.canonicalUrl) continue;

        const urlHash = computeUrlHash(raw.canonicalUrl);

        // التحقق من التكرار
        const existingItem = await prisma.item.findUnique({
          where: { urlHash },
        });

        if (existingItem) continue;

        // تصنيف القسم والمؤشرات
        const targetSectionSlug = classifySection(raw.title, raw.summary, source.sectionHints);
        const sectionId = sectionMap.get(targetSectionSlug) || defaultSectionId;
        const isBreaking = checkIsBreaking(raw.title);
        const now = new Date();
        const publishedDate = raw.publishedAt || now;

        // فحص معايير المراجعة البشرية المزدوجة
        const hasSensitivity = /شهيد|شهداء|حصيلة|قتلى|ضحايا|مجزرة|انفجار|اغتيال/.test(raw.title);
        const needsReview =
          isKillSwitchActive ||
          options?.requireReview ||
          (source.trustLevel && source.trustLevel < 4) ||
          hasSensitivity;

        if (needsReview) {
          // المادة المجمعة تسجل بحالة REVIEW للمراجعة التحريرية مع نسبة صحيحة للمصدر
          await prisma.item.create({
            data: {
              sourceId: source.id,
              externalId: raw.externalId,
              url: raw.url,
              canonicalUrl: raw.canonicalUrl,
              urlHash,
              titleOriginal: raw.title,
              titleAr: raw.title,
              summaryOrig: raw.summary,
              lang: source.lang,
              publishedAtSource: publishedDate,
              contentHash: urlHash,
              sectionGuess: targetSectionSlug,
              isBreaking,
              status: "REVIEW",
              rejectReason: isKillSwitchActive
                ? "مفتاح الإيقاف الطارئ مفعل: بانتظار المراجعة البشرية"
                : hasSensitivity
                ? "مراجعة حساسية أرقام الشهداء والمصطلحات الميدانية"
                : "مراجعة تحريرية دورية",
            },
          });

          reviewCount++;
          report.totalReviewItems = (report.totalReviewItems || 0) + 1;
          continue;
        }

        // إنشاء صورة الغلاف إن وجدت
        let coverMediaId: string | null = null;
        if (raw.imageUrl && raw.imageUrl.startsWith("http")) {
          const media = await prisma.media.create({
            data: {
              url: raw.imageUrl,
              kind: "image",
              credit: source.nameAr,
              altAr: raw.title,
            },
          });
          coverMediaId = media.id;
        }

        // إنشاء المادة الخام (Item)
        const item = await prisma.item.create({
          data: {
            sourceId: source.id,
            externalId: raw.externalId,
            url: raw.url,
            canonicalUrl: raw.canonicalUrl,
            urlHash,
            titleOriginal: raw.title,
            titleAr: raw.title,
            summaryOrig: raw.summary,
            lang: source.lang,
            publishedAtSource: publishedDate,
            contentHash: urlHash,
            sectionGuess: targetSectionSlug,
            isBreaking,
            status: "PUBLISHED",
          },
        });

        // إنشاء القصة التجميعية (Story)
        const storySlug = `${generateArabicSlug(raw.title, 50)}-${Date.now().toString(36)}`;
        const story = await prisma.story.create({
          data: {
            slug: storySlug,
            headlineAr: raw.title,
            summaryAr: raw.summary || raw.title,
            importance: isBreaking ? 90 : 50,
            trendingScore: isBreaking ? 95 : 40,
            firstSeenAt: publishedDate,
            lastUpdatedAt: now,
            sectionId: sectionId,
          },
        });

        // ربط العنصر بالقصة
        await prisma.item.update({
          where: { id: item.id },
          data: { storyId: story.id },
        });

        // إنشاء المقال المنشور الحقيقي (Article)
        const articleSlug = `${generateArabicSlug(raw.title, 60)}-${Math.random().toString(36).slice(2, 6)}`;
        await prisma.article.create({
          data: {
            slug: articleSlug,
            titleAr: raw.title,
            titleOriginal: raw.title,
            summaryAr: raw.summary || raw.title,
            kind: isBreaking ? "BREAKING" : "NEWS",
            status: "PUBLISHED",
            displayPolicy: source.displayPolicy,
            translatedBy: "source",
            sourceId: source.id,
            itemId: item.id,
            storyId: story.id,
            sourceUrl: raw.canonicalUrl,
            sectionId: sectionId,
            coverMediaId,
            isBreaking,
            breakingUntil: isBreaking ? new Date(now.getTime() + 60 * 60 * 1000) : null,
            publishedAt: publishedDate,
            sourcePublishedAt: publishedDate,
          },
        });

        newCount++;
        report.totalNewArticles++;
      }

      report.details.push({
        sourceName: source.nameAr,
        count: newCount,
        reviewCount,
      });
    } catch (err: any) {
      report.errors.push({
        sourceSlug: source.slug,
        error: err.message || "خطأ غير متوقع أثناء المعالجة",
      });
    }
  }

  return report;
}
