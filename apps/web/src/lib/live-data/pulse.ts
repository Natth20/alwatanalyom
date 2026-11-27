import { prisma } from "@awt/db";

const ARABIC_STOPWORDS = new Set([
  "من",
  "في",
  "على",
  "إلى",
  "الى",
  "عن",
  "مع",
  "بعد",
  "قبل",
  "بين",
  "عند",
  "منذ",
  "خلال",
  "حول",
  "ضد",
  "نحو",
  "فوق",
  "تحت",
  "أمام",
  "عبر",
  "حتى",
  "هذا",
  "هذه",
  "ذلك",
  "تلك",
  "التي",
  "الذي",
  "الذين",
  "اللتان",
  "ما",
  "لا",
  "لم",
  "لن",
  "قد",
  "إن",
  "أن",
  "كان",
  "كانت",
  "يكون",
  "تكون",
  "هو",
  "هي",
  "هم",
  "اليوم",
  "الوطن",
  "عاجل",
  "أخبار",
  "اخبار",
  "جديد",
  "جديدة",
  "اكثر",
  "أكثر",
  "بسبب",
  "أثناء",
  "وفق",
  "حسب",
  "حيث",
  "كما",
  "و",
  "او",
  "أو",
  "ثم",
]);

export interface PulseAnalyticsPayload {
  totalPublishedArticles: number;
  last24hArticles: number;
  breakingCount: number;
  activeSourcesCount: number;
  sectionBreakdown: {
    slug: string;
    nameAr: string;
    count: number;
    pct: number;
  }[];
  topSources: {
    nameAr: string;
    count: number;
  }[];
  topKeywords: {
    keyword: string;
    count: number;
  }[];
  latestTopics: {
    id: string;
    slug: string;
    titleAr: string;
    sectionNameAr: string;
    sectionSlug: string;
    sourceNameAr: string;
    publishedAt: string;
    readCount: number;
    isBreaking: boolean;
  }[];
  generatedAt: string;
}

export async function computeLivePulseAnalytics(): Promise<PulseAnalyticsPayload> {
  const empty: PulseAnalyticsPayload = {
    totalPublishedArticles: 0,
    last24hArticles: 0,
    breakingCount: 0,
    activeSourcesCount: 0,
    sectionBreakdown: [],
    topSources: [],
    topKeywords: [],
    latestTopics: [],
    generatedAt: new Date().toISOString(),
  };

  if (!prisma) return empty;

  try {
    const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [totalPublishedArticles, last24hArticles, breakingCount, activeSourcesCount, recentArticles] =
      await Promise.all([
        prisma.article.count({ where: { status: "PUBLISHED" } }),
        prisma.article.count({
          where: { status: "PUBLISHED", publishedAt: { gte: since24h } },
        }),
        prisma.article.count({
          where: { status: "PUBLISHED", isBreaking: true },
        }),
        prisma.source.count({ where: { enabled: true } }),
        prisma.article.findMany({
          where: { status: "PUBLISHED" },
          orderBy: { publishedAt: "desc" },
          take: 120,
          select: {
            id: true,
            slug: true,
            titleAr: true,
            isBreaking: true,
            readCount: true,
            publishedAt: true,
            section: { select: { slug: true, nameAr: true } },
            source: { select: { nameAr: true } },
          },
        }),
      ]);

    const sectionCounts = new Map<string, { slug: string; nameAr: string; count: number }>();
    const sourceCounts = new Map<string, number>();
    const wordCounts = new Map<string, number>();

    for (const art of recentArticles) {
      const secSlug = art.section?.slug || "general";
      const secName = art.section?.nameAr || "عام";
      const curSec = sectionCounts.get(secSlug) || { slug: secSlug, nameAr: secName, count: 0 };
      curSec.count += 1;
      sectionCounts.set(secSlug, curSec);

      const srcName = art.source?.nameAr || "هيئة التحرير";
      sourceCounts.set(srcName, (sourceCounts.get(srcName) || 0) + 1);

      const cleanedTitle = art.titleAr.replace(/[^\u0600-\u06FF\s]/g, " ");
      const words = cleanedTitle.split(/\s+/);
      for (const w of words) {
        if (w.length >= 3 && !ARABIC_STOPWORDS.has(w)) {
          wordCounts.set(w, (wordCounts.get(w) || 0) + 1);
        }
      }
    }

    const totalSample = Math.max(recentArticles.length, 1);

    const sectionBreakdown = Array.from(sectionCounts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)
      .map((s) => ({
        ...s,
        pct: Math.round((s.count / totalSample) * 100),
      }));

    const topSources = Array.from(sourceCounts.entries())
      .map(([nameAr, count]) => ({ nameAr, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const topKeywords = Array.from(wordCounts.entries())
      .filter(([, count]) => count >= 2)
      .map(([keyword, count]) => ({ keyword, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 16);

    const latestTopics = recentArticles.slice(0, 10).map((art) => ({
      id: art.id,
      slug: art.slug,
      titleAr: art.titleAr,
      sectionNameAr: art.section?.nameAr || "أخبار",
      sectionSlug: art.section?.slug || "palestine",
      sourceNameAr: art.source?.nameAr || "الوطن اليوم",
      publishedAt: (art.publishedAt || new Date()).toISOString(),
      readCount: art.readCount,
      isBreaking: art.isBreaking,
    }));

    return {
      totalPublishedArticles,
      last24hArticles,
      breakingCount,
      activeSourcesCount,
      sectionBreakdown,
      topSources,
      topKeywords,
      latestTopics,
      generatedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.warn("[LiveData/pulse] Failed:", (err as Error)?.message ?? err);
    return empty;
  }
}
