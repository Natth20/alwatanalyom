import { prisma } from "@awt/db";
import { ArticleCard, StorySummary, InstrumentQuote, ChannelCard } from "@awt/shared";

/**
 * جلب شريط الأخبار العاجلة النشطة (آخر 60 دقيقة)
 */
export async function getActiveBreaking(): Promise<ArticleCard[]> {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        isBreaking: true,
        breakingUntil: { gte: new Date() },
      },
      include: {
        section: true,
        source: true,
      },
      orderBy: { publishedAt: "desc" },
      take: 5,
    });

    return articles.map((a) => ({
      id: a.id,
      slug: a.slug,
      titleAr: a.titleAr,
      titleOriginal: a.titleOriginal,
      summaryAr: a.summaryAr,
      kind: a.kind as any,
      publishedAt: a.publishedAt?.toISOString() || new Date().toISOString(),
      sourcePublishedAt: a.sourcePublishedAt?.toISOString(),
      displayPolicy: a.displayPolicy as any,
      isBreaking: a.isBreaking,
      sectionSlug: a.section.slug,
      sectionNameAr: a.section.nameAr,
      source: a.source
        ? {
            id: a.source.id,
            slug: a.source.slug,
            nameAr: a.source.nameAr,
            logoUrl: a.source.logoUrl,
            homepageUrl: a.source.homepageUrl,
          }
        : null,
    }));
  } catch {
    return [];
  }
}

/**
 * جلب بيانات الصفحة الرئيسية مع الوحدات العشر وتطبيق قاعدة عدم التكرار (shownStoryIds)
 */
export async function getHomeFeed() {
  const shownStoryIds = new Set<string>();

  try {
    // 1. شريط العاجل
    const breaking = await getActiveBreaking();

    // 2. قصص البطل (Hero) والأهم
    const heroStoriesRaw = await prisma.story.findMany({
      where: {
        articles: { some: { status: "PUBLISHED" } },
      },
      include: {
        section: true,
        articles: {
          where: { status: "PUBLISHED" },
          include: { source: true, section: true },
          take: 4,
        },
      },
      orderBy: [{ pinned: "desc" }, { importance: "desc" }, { lastUpdatedAt: "desc" }],
      take: 5,
    });

    for (const s of heroStoriesRaw) {
      shownStoryIds.add(s.id);
    }

    // 3. يتصدر الآن (Trending)
    const trendingStoriesRaw = await prisma.story.findMany({
      where: {
        id: { notIn: Array.from(shownStoryIds) },
        articles: { some: { status: "PUBLISHED" } },
      },
      include: {
        section: true,
        articles: {
          where: { status: "PUBLISHED" },
          include: { source: true, section: true },
          take: 2,
        },
      },
      orderBy: { trendingScore: "desc" },
      take: 4,
    });

    for (const s of trendingStoriesRaw) {
      shownStoryIds.add(s.id);
    }

    // 4. قصص فلسطين
    const palestineStoriesRaw = await prisma.story.findMany({
      where: {
        id: { notIn: Array.from(shownStoryIds) },
        section: { slug: "palestine" },
        articles: { some: { status: "PUBLISHED" } },
      },
      include: {
        section: true,
        articles: {
          where: { status: "PUBLISHED" },
          include: { source: true, section: true },
          take: 3,
        },
      },
      orderBy: { lastUpdatedAt: "desc" },
      take: 6,
    });

    for (const s of palestineStoriesRaw) {
      shownStoryIds.add(s.id);
    }

    // 5. العالم العربي والعالم
    const arabWorldArticles = await getSectionArticles("arab-world", 5, shownStoryIds);
    const worldArticles = await getSectionArticles("world", 5, shownStoryIds);
    const economyArticles = await getSectionArticles("economy", 4, shownStoryIds);
    const techArticles = await getSectionArticles("tech", 4, shownStoryIds);
    const sportsArticles = await getSectionArticles("sports", 4, shownStoryIds);

    // 6. أسعار المؤشرات لنافذة الاقتصاد
    const quotes = await getLatestQuotes(["BRENT", "XAUUSD", "USDILS", "BTCUSD"]);

    return {
      breaking,
      heroStories: heroStoriesRaw.map(mapStoryToSummary),
      trendingStories: trendingStoriesRaw.map(mapStoryToSummary),
      palestineStories: palestineStoriesRaw.map(mapStoryToSummary),
      arabWorldArticles,
      worldArticles,
      economyArticles,
      techArticles,
      sportsArticles,
      quotes,
    };
  } catch (error) {
    console.error("Failed to load home feed:", error);
    return {
      breaking: [],
      heroStories: [],
      trendingStories: [],
      palestineStories: [],
      arabWorldArticles: [],
      worldArticles: [],
      economyArticles: [],
      techArticles: [],
      sportsArticles: [],
      quotes: [],
    };
  }
}

/**
 * جلب مقال كامل بواسطة معرّفه
 */
export async function getArticleById(id: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { id },
      include: {
        section: true,
        source: true,
        author: true,
        tags: { include: { tag: true } },
        countries: true,
        corrections: { orderBy: { createdAt: "desc" } },
        story: {
          include: {
            articles: {
              where: { id: { not: id }, status: "PUBLISHED" },
              include: { source: true, section: true },
              take: 5,
            },
          },
        },
        sportsLinks: {
          include: { entity: true },
        },
      },
    });

    if (!article) return null;

    return {
      ...article,
      publishedAt: article.publishedAt?.toISOString() || new Date().toISOString(),
      sourcePublishedAt: article.sourcePublishedAt?.toISOString(),
      tags: article.tags.map((t) => ({ id: t.tag.id, nameAr: t.tag.nameAr, slug: t.tag.slug })),
      countries: article.countries.map((c) => c.countryCode),
      otherCoverages: article.story?.articles.map((a) => ({
        id: a.id,
        slug: a.slug,
        titleAr: a.titleAr,
        publishedAt: a.publishedAt?.toISOString() || "",
        sourceNameAr: a.source?.nameAr || "مصدر",
        sourceUrl: a.sourceUrl,
      })) || [],
    };
  } catch {
    return null;
  }
}

/**
 * جلب مقالات قسم محدد
 */
async function getSectionArticles(sectionSlug: string, take: number, shownStoryIds: Set<string>): Promise<ArticleCard[]> {
  const articles = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      section: { slug: sectionSlug },
      storyId: { notIn: Array.from(shownStoryIds) },
    },
    include: {
      section: true,
      source: true,
    },
    orderBy: { publishedAt: "desc" },
    take,
  });

  return articles.map((a) => ({
    id: a.id,
    slug: a.slug,
    titleAr: a.titleAr,
    titleOriginal: a.titleOriginal,
    summaryAr: a.summaryAr,
    kind: a.kind as any,
    publishedAt: a.publishedAt?.toISOString() || new Date().toISOString(),
    sourcePublishedAt: a.sourcePublishedAt?.toISOString(),
    displayPolicy: a.displayPolicy as any,
    isBreaking: a.isBreaking,
    sectionSlug: a.section.slug,
    sectionNameAr: a.section.nameAr,
    source: a.source
      ? {
          id: a.source.id,
          slug: a.source.slug,
          nameAr: a.source.nameAr,
          logoUrl: a.source.logoUrl,
          homepageUrl: a.source.homepageUrl,
        }
      : null,
  }));
}

/**
 * جلب أحدث أسعار المؤشرات
 */
export async function getLatestQuotes(symbols?: string[]): Promise<InstrumentQuote[]> {
  try {
    const instruments = await prisma.instrument.findMany({
      where: {
        enabled: true,
        ...(symbols ? { symbol: { in: symbols } } : {}),
      },
      include: {
        quotes: {
          orderBy: { asOf: "desc" },
          take: 1,
        },
      },
    });

    return instruments.map((inst) => {
      const q = inst.quotes[0];
      return {
        symbol: inst.symbol,
        nameAr: inst.nameAr,
        nameEn: inst.nameEn,
        category: inst.category as any,
        price: q ? q.price.toString() : null,
        change: q?.change ? q.change.toString() : null,
        changePct: q?.changePct ? q.changePct.toString() : null,
        unit: inst.unit,
        currency: inst.currency,
        status: q ? (q.status as any) : "UNAVAILABLE",
        asOf: q?.asOf ? q.asOf.toISOString() : null,
        provider: inst.providerKey,
      };
    });
  } catch {
    return [];
  }
}

/**
 * جلب قنوات دليل البث
 */
export async function getChannels(): Promise<ChannelCard[]> {
  try {
    const channels = await prisma.channel.findMany({
      orderBy: { nameAr: "asc" },
    });

    return channels.map((c) => ({
      id: c.id,
      slug: c.slug,
      nameAr: c.nameAr,
      nameEn: c.nameEn,
      logoUrl: c.logoUrl,
      countryCode: c.countryCode,
      lang: c.lang as any,
      category: c.category as any,
      descriptionAr: c.descriptionAr,
      officialSiteUrl: c.officialSiteUrl,
      officialStreamUrl: c.officialStreamUrl,
      embedAllowed: c.embedAllowed,
      status: c.status as any,
      lastCheckedAt: c.lastCheckedAt?.toISOString(),
    }));
  } catch {
    return [];
  }
}

function mapStoryToSummary(s: any): StorySummary {
  return {
    id: s.id,
    slug: s.slug,
    headlineAr: s.headlineAr,
    summaryAr: s.summaryAr,
    importance: s.importance,
    trendingScore: s.trendingScore,
    pinned: s.pinned,
    firstSeenAt: s.firstSeenAt.toISOString(),
    lastUpdatedAt: s.lastUpdatedAt.toISOString(),
    sectionSlug: s.section?.slug,
    coverageCount: s.articles.length,
    sources: s.articles.map((a: any) => ({
      id: a.source?.id || "",
      slug: a.source?.slug || "",
      nameAr: a.source?.nameAr || "",
      logoUrl: a.source?.logoUrl || null,
      homepageUrl: a.source?.homepageUrl || "",
    })),
    articles: s.articles.map((a: any) => ({
      id: a.id,
      slug: a.slug,
      titleAr: a.titleAr,
      kind: a.kind,
      publishedAt: a.publishedAt?.toISOString() || "",
      displayPolicy: a.displayPolicy,
      isBreaking: a.isBreaking,
      sectionSlug: a.section?.slug || "",
      sectionNameAr: a.section?.nameAr || "",
      source: a.source ? { id: a.source.id, slug: a.source.slug, nameAr: a.source.nameAr, logoUrl: a.source.logoUrl, homepageUrl: a.source.homepageUrl } : null,
    })),
  };
}

