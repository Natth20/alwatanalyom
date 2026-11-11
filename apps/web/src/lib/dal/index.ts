import { prisma } from "@awt/db";
import { ArticleCard, StorySummary, InstrumentQuote, ChannelCard } from "@awt/shared";
import { searchClient } from "@awt/search";
import {
  MOCK_BREAKING,
  MOCK_QUOTES,
  MOCK_CHANNELS,
  MOCK_HERO_STORY,
  MOCK_PALESTINE_STORIES,
  MOCK_SECTION_ARTICLES,
  getMockArticleById,
  getMockSectionFeed,
  getMockStoryById,
} from "./mock-data";

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

    const mapped = articles.map((a) => ({
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

    return mapped.length > 0 ? mapped : MOCK_BREAKING;
  } catch {
    return MOCK_BREAKING;
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

    if (heroStoriesRaw.length === 0 && palestineStoriesRaw.length === 0) {
      return {
        breaking: breaking.length > 0 ? breaking : MOCK_BREAKING,
        heroStories: [MOCK_HERO_STORY],
        trendingStories: MOCK_PALESTINE_STORIES,
        palestineStories: MOCK_PALESTINE_STORIES,
        arabWorldArticles: MOCK_SECTION_ARTICLES.arabWorld,
        worldArticles: MOCK_SECTION_ARTICLES.world,
        economyArticles: MOCK_SECTION_ARTICLES.economy,
        techArticles: MOCK_SECTION_ARTICLES.tech,
        sportsArticles: MOCK_SECTION_ARTICLES.sports,
        quotes: quotes.length > 0 ? quotes : MOCK_QUOTES,
      };
    }

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
    return {
      breaking: MOCK_BREAKING,
      heroStories: [MOCK_HERO_STORY],
      trendingStories: MOCK_PALESTINE_STORIES,
      palestineStories: MOCK_PALESTINE_STORIES,
      arabWorldArticles: MOCK_SECTION_ARTICLES.arabWorld,
      worldArticles: MOCK_SECTION_ARTICLES.world,
      economyArticles: MOCK_SECTION_ARTICLES.economy,
      techArticles: MOCK_SECTION_ARTICLES.tech,
      sportsArticles: MOCK_SECTION_ARTICLES.sports,
      quotes: MOCK_QUOTES,
    };
  }
}

/**
 * جلب مقالات وقصص قسم محدد مع الترقيم بمؤشر
 */
export async function getSectionFeed(
  sectionSlug: string,
  subSlug?: string,
  cursor?: string,
  limit = 15
) {
  try {
    const section = await prisma.section.findUnique({
      where: { slug: subSlug ? `${sectionSlug}-${subSlug}` : sectionSlug },
      include: {
        children: true,
        parent: true,
      },
    });

    if (!section) return getMockSectionFeed(sectionSlug, subSlug);

    // جلب المقالات التابعة للقسم أو أقسامه الفرعية
    const sectionIds = [section.id, ...section.children.map((c) => c.id)];

    const articles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        sectionId: { in: sectionIds },
      },
      include: {
        section: true,
        source: true,
      },
      orderBy: { publishedAt: "desc" },
      take: limit + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    });

    let nextCursor: string | null = null;
    if (articles.length > limit) {
      const nextItem = articles.pop();
      nextCursor = nextItem?.id || null;
    }

    return {
      section: {
        id: section.id,
        slug: section.slug,
        nameAr: section.nameAr,
        nameEn: section.nameEn,
        descriptionAr: section.descriptionAr,
        children: section.children.map((c) => ({
          id: c.id,
          slug: c.slug.replace(`${sectionSlug}-`, ""),
          nameAr: c.nameAr,
        })),
      },
      articles: articles.map((a) => ({
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
      })),
      nextCursor,
    };
  } catch (error) {
    console.error("Failed to load section feed, returning mock fallback:", error);
    return getMockSectionFeed(sectionSlug, subSlug);
  }
}

/**
 * جلب قصة مجمعة وتغطياتها المتعددة
 */
export async function getStoryById(id: string) {
  try {
    const story = await prisma.story.findUnique({
      where: { id },
      include: {
        section: true,
        articles: {
          where: { status: "PUBLISHED" },
          include: { source: true, section: true },
          orderBy: { publishedAt: "asc" },
        },
      },
    });

    if (!story) return getMockStoryById(id);

    return {
      id: story.id,
      slug: story.slug,
      headlineAr: story.headlineAr,
      summaryAr: story.summaryAr,
      importance: story.importance,
      trendingScore: story.trendingScore,
      firstSeenAt: story.firstSeenAt.toISOString(),
      lastUpdatedAt: story.lastUpdatedAt.toISOString(),
      section: story.section ? { slug: story.section.slug, nameAr: story.section.nameAr } : null,
      articles: story.articles.map((a) => ({
        id: a.id,
        slug: a.slug,
        titleAr: a.titleAr,
        titleOriginal: a.titleOriginal,
        summaryAr: a.summaryAr,
        publishedAt: a.publishedAt?.toISOString() || "",
        sourceUrl: a.sourceUrl,
        displayPolicy: a.displayPolicy,
        source: a.source
          ? {
              id: a.source.id,
              slug: a.source.slug,
              nameAr: a.source.nameAr,
              logoUrl: a.source.logoUrl,
              homepageUrl: a.source.homepageUrl,
            }
          : null,
      })),
    };
  } catch {
    return getMockStoryById(id);
  }
}

/**
 * بحث سريع في المقالات المنشورة
 */
export async function searchArticles(query: string, sectionSlug?: string, limit = 20) {
  try {
    if (!query.trim()) return [];

    // 1. محاولة البحث السريع عبر Meilisearch
    try {
      const meiliResult = await searchClient.search(query, { sectionSlug, limit });
      if (meiliResult && meiliResult.hits.length > 0) {
        return meiliResult.hits.map((h) => ({
          id: h.id,
          slug: h.slug,
          titleAr: h.titleAr,
          summaryAr: h.summaryAr,
          publishedAt: h.publishedAt,
          sectionNameAr: h.sectionNameAr,
          sectionSlug: h.sectionSlug,
          sourceNameAr: h.sourceNameAr,
        }));
      }
    } catch {
      // إكمال البحث عبر قاعدة البيانات إذا كان Meilisearch غير متاح
    }

    // 2. الرجوع التلقائي إلى قاعدة البيانات (Database Full-text / Trigram Fallback)
    const articles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { titleAr: { contains: query, mode: "insensitive" } },
          { titleOriginal: { contains: query, mode: "insensitive" } },
          { summaryAr: { contains: query, mode: "insensitive" } },
        ],
        ...(sectionSlug ? { section: { slug: sectionSlug } } : {}),
      },
      include: {
        section: true,
        source: true,
      },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });

    return articles.map((a) => ({
      id: a.id,
      slug: a.slug,
      titleAr: a.titleAr,
      summaryAr: a.summaryAr,
      publishedAt: a.publishedAt?.toISOString() || new Date().toISOString(),
      sectionNameAr: a.section.nameAr,
      sectionSlug: a.section.slug,
      sourceNameAr: a.source?.nameAr || "مصدر",
    }));
  } catch {
    return [];
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

    if (!article) return getMockArticleById(id);

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
    return getMockArticleById(id);
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

    const mapped = instruments.map((inst) => {
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

    return mapped.length > 0 ? mapped : MOCK_QUOTES;
  } catch {
    return MOCK_QUOTES;
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

    const mapped = channels.map((c) => ({
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

    return mapped.length > 0 ? mapped : MOCK_CHANNELS;
  } catch {
    return MOCK_CHANNELS;
  }
}

function safeIso(val: unknown, fallback?: string): string {
  if (!val) return fallback || new Date().toISOString();
  if (val instanceof Date) return val.toISOString();
  if (typeof val === "string") return val;
  try {
    const d = new Date(val as any);
    return isNaN(d.getTime()) ? (fallback || new Date().toISOString()) : d.toISOString();
  } catch {
    return fallback || new Date().toISOString();
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
    firstSeenAt: safeIso(s.firstSeenAt),
    lastUpdatedAt: safeIso(s.lastUpdatedAt),
    sectionSlug: s.section?.slug,
    coverImageUrl: s.articles[0]?.coverMedia?.url || null,
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
      publishedAt: safeIso(a.publishedAt, ""),
      displayPolicy: a.displayPolicy,
      isBreaking: a.isBreaking,
      coverImageUrl: a.coverMedia?.url || null,
      sectionSlug: a.section?.slug || "",
      sectionNameAr: a.section?.nameAr || "",
      source: a.source ? { id: a.source.id, slug: a.source.slug, nameAr: a.source.nameAr, logoUrl: a.source.logoUrl, homepageUrl: a.source.homepageUrl } : null,
    })),
  };
}

/**
 * جلب الحملة الإعلانية الفعالة لموقع محدد
 */
export async function getAdCampaign(position: string) {
  try {
    const campaign = await (prisma as any).adCampaign.findFirst({
      where: {
        position,
        enabled: true,
        startsAt: { lte: new Date() },
        OR: [{ endsAt: null }, { endsAt: { gte: new Date() } }],
      },
      orderBy: { createdAt: "desc" },
    });

    if (!campaign) return null;

    return {
      id: campaign.id,
      name: campaign.name,
      type: campaign.type as "GOOGLE_ADSENSE" | "CUSTOM_BANNER" | "HTML_SCRIPT" | "SPONSORED_POST",
      position: campaign.position,
      clientName: campaign.clientName,
      imageUrl: campaign.imageUrl,
      targetUrl: campaign.targetUrl,
      altText: campaign.altText,
      scriptCode: campaign.scriptCode,
    };
  } catch {
    return null;
  }
}

/**
 * جلب التغطية الحية المباشرة للأحداث وتحديثاتها اللحظية
 */
export async function getActiveLiveCoverage() {
  try {
    const coverage = await (prisma as any).liveCoverage.findFirst({
      where: { isActive: true },
      include: {
        updates: {
          orderBy: { publishedAt: "desc" },
          take: 30,
        },
      },
      orderBy: [{ pinned: "desc" }, { startedAt: "desc" }],
    });

    if (!coverage) return null;

    return {
      id: coverage.id,
      slug: coverage.slug,
      title: coverage.title,
      summary: coverage.summary,
      streamUrl: coverage.streamUrl,
      coverImage: coverage.coverImage,
      startedAt: safeIso(coverage.startedAt),
      updates: coverage.updates.map((u: any) => ({
        id: u.id,
        title: u.title,
        bodyText: u.bodyText,
        isUrgent: u.isUrgent,
        mediaUrl: u.mediaUrl,
        sourceName: u.sourceName,
        publishedAt: safeIso(u.publishedAt),
      })),
    };
  } catch {
    return null;
  }
}

