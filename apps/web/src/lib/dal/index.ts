import { prisma } from "@awt/db";
import { ArticleCard, StorySummary, InstrumentQuote, ChannelCard, isMockDataAllowed } from "@awt/shared";
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

    if (mapped.length > 0) return mapped;
    return isMockDataAllowed() ? MOCK_BREAKING : [];
  } catch {
    return isMockDataAllowed() ? MOCK_BREAKING : [];
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

    // 7. التدفق اللحظي المباشر لأحدث الأخبار (Fast-Stream Wire)
    const fastStreamArticles = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      include: { section: true, source: true },
      orderBy: { publishedAt: "desc" },
      take: 15,
    }).then((list) => list.map(mapArticleToCard));

    // 8. تقارير الفيديو الصحفية
    const videoArticles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { kind: "VIDEO" },
          { section: { slug: "videos" } },
        ],
      },
      include: { section: true, source: true },
      orderBy: { publishedAt: "desc" },
      take: 6,
    }).then((list) => list.map(mapArticleToCard));

    if (heroStoriesRaw.length === 0 && palestineStoriesRaw.length === 0) {
      if (isMockDataAllowed()) {
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
        heroStories: [],
        trendingStories: [],
        palestineStories: [],
        arabWorldArticles,
        worldArticles,
        economyArticles,
        techArticles,
        sportsArticles,
        quotes,
        fastStreamArticles,
        videoArticles,
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
      fastStreamArticles,
      videoArticles,
    };
  } catch (error) {
    if (isMockDataAllowed()) {
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
        fastStreamArticles: [],
        videoArticles: [],
      };
    }
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
      fastStreamArticles: [],
      videoArticles: [],
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

    if (!section) return isMockDataAllowed() ? getMockSectionFeed(sectionSlug, subSlug) : null;

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
    console.error("Failed to load section feed:", error);
    return isMockDataAllowed() ? getMockSectionFeed(sectionSlug, subSlug) : null;
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

    if (!story) return isMockDataAllowed() ? getMockStoryById(id) : null;

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
    return isMockDataAllowed() ? getMockStoryById(id) : null;
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

    if (!article) return isMockDataAllowed() ? getMockArticleById(id) : null;

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
    return isMockDataAllowed() ? getMockArticleById(id) : null;
  }
}

/**
 * تحويل كائن المقال من بريزما إلى بطاقة مقال قياسية (ArticleCard)
 */
export function mapArticleToCard(a: any): ArticleCard {
  return {
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
    sectionSlug: a.section?.slug || "world",
    sectionNameAr: a.section?.nameAr || "أخبار",
    source: a.source
      ? {
          id: a.source.id,
          slug: a.source.slug,
          nameAr: a.source.nameAr,
          logoUrl: a.source.logoUrl,
          homepageUrl: a.source.homepageUrl,
        }
      : null,
  };
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

  return articles.map(mapArticleToCard);
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

    if (mapped.length > 0) return mapped;
    return isMockDataAllowed() ? MOCK_QUOTES : [];
  } catch {
    return isMockDataAllowed() ? MOCK_QUOTES : [];
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

    if (mapped.length > 0) return mapped;
    return isMockDataAllowed() ? MOCK_CHANNELS : [];
  } catch {
    return isMockDataAllowed() ? MOCK_CHANNELS : [];
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

/**
 * =========================================================================
 * دوال المرحلة 2: الأقسام المتخصصة (المساعدات، الوظائف، الفيديو، الوسوم، الكتّاب)
 * =========================================================================
 */

export interface VerifiedAidItem {
  id: string;
  titleAr: string;
  organization: string;
  orgType: "UN" | "GOV" | "NGO" | "RED_CRESCENT";
  category: "CASH" | "FOOD" | "MEDICAL" | "SHELTER" | "WINTER";
  targetAudience: string;
  status: "OPEN" | "UPDATING" | "VERIFIED_INFO";
  officialUrl: string;
  verifiedAt: string;
  notesAr: string;
  requirements: string[];
}

/**
 * جلب بيانات بوابة المساعدات الإنسانية والروابط الرسمية الموثقة
 */
export async function getAidData() {
  try {
    // 1. جلب المقالات الإخبارية المرتبطة بالمساعدات الإنسانية
    const articles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { section: { slug: { in: ["aid", "palestine-humanitarian"] } } },
          { titleAr: { contains: "مساعدات", mode: "insensitive" } },
          { titleAr: { contains: "إغاث", mode: "insensitive" } },
          { titleAr: { contains: "أونروا", mode: "insensitive" } },
        ],
      },
      include: {
        section: true,
        source: true,
      },
      orderBy: { publishedAt: "desc" },
      take: 12,
    });

    // 2. قائمة الأدلة والروابط الرسمية الموثقة للجهات الإغاثية المعتمدة
    // جميع الروابط تنتهي بنطاقات رسمية معتمدة (.org, .int, .gov.ps) بدون أي روابط وسيطة
    const verifiedOfficialPrograms: VerifiedAidItem[] = [
      {
        id: "unrwa-cash-verification",
        titleAr: "بوابة الأونروا: تحديث بيانات المستفيدين وتدقيق المساعدات النقدية الطارئة",
        organization: "وكالة غوث وتشغيل اللاجئين الفلسطينيين (UNRWA)",
        orgType: "UN",
        category: "CASH",
        targetAudience: "اللاجئون والأسر المتضررة والنازحة المسجلة في سجلات الوكالة",
        status: "UPDATING",
        officialUrl: "https://www.unrwa.org/ar",
        verifiedAt: new Date().toISOString(),
        notesAr: "التسجيل وتحديث البيانات يتم حصراً عبر المنظومة الرسمية للوكالة مجاناً دون أي وسيط.",
        requirements: ["رقم بطاقة التسجيل (كرت المؤن)", "الرقم الوطني / الهوية", "رقم هاتف فعّال لاستقبال رسائل SMS"],
      },
      {
        id: "wfp-food-assistance",
        titleAr: "برنامج الأغذية العالمي (WFP): منصة التحقق من القسائم الغذائية والطرود",
        organization: "برنامج الأغذية العالمي التابع للأمم المتحدة",
        orgType: "UN",
        category: "FOOD",
        targetAudience: "الأسر المصنفة تحت خط انعدام الأمن الغذائي الحاد",
        status: "VERIFIED_INFO",
        officialUrl: "https://ar.wfp.org",
        verifiedAt: new Date().toISOString(),
        notesAr: "تُصرف المساعدات والطرود عبر نقاط التوزيع المعتمدة ونظام الرسائل النصية القصيرة.",
        requirements: ["الهوية الشخصية لمستلم الرسالة", "رمز القسيمة المستلم عبر SMS الرسمي"],
      },
      {
        id: "prcs-emergency-medical",
        titleAr: "جمعية الهلال الأحمر الفلسطيني: خدمات الإسعاف والإغاثة والتحويلات الطبية",
        organization: "جمعية الهلال الأحمر الفلسطيني (PRCS)",
        orgType: "RED_CRESCENT",
        category: "MEDICAL",
        targetAudience: "المصابون والمرضى والحالات الإنسانية الحرجة",
        status: "OPEN",
        officialUrl: "https://www.palestinercs.org/ar",
        verifiedAt: new Date().toISOString(),
        notesAr: "الخط الساخن الوطني للطوارئ: 101. الإسعاف والإغاثة الطبية متواصلة مجاناً على مدار الساعة.",
        requirements: ["التواصل المباشر مع غرفة العمليات المركزية", "تحديد الموقع بدقة"],
      },
      {
        id: "mops-social-registry",
        titleAr: "وزارة التنمية الاجتماعية: البوابة الموحدة للمساعدات النقدية والطارئة",
        organization: "وزارة التنمية الاجتماعية",
        orgType: "GOV",
        category: "CASH",
        targetAudience: "أسر الشهداء، ذوو الإعاقة، والأسر الأشد فقراً",
        status: "VERIFIED_INFO",
        officialUrl: "http://www.mosa.gov.ps",
        verifiedAt: new Date().toISOString(),
        notesAr: "الاستعلام يتم عبر نظام الدخول الموحد الحكومي المعتمد.",
        requirements: ["حساب الدخول الموحد الحكومي", "رقم الهوية وتاريخ الميلاد"],
      },
    ];

    return {
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
      verifiedPrograms: verifiedOfficialPrograms,
    };
  } catch (error) {
    console.error("Failed to fetch aid data:", error);
    return { articles: [], verifiedPrograms: [] };
  }
}

export interface VerifiedJobItem {
  id: string;
  titleAr: string;
  organization: string;
  sector: "UN_INGO" | "GOV" | "TECH" | "HEALTH" | "EDUCATION";
  location: string;
  employmentType: "FULL_TIME" | "CONTRACT" | "REMOTE" | "PART_TIME";
  deadline: string;
  officialApplyUrl: string;
  verifiedAt: string;
  requirements: string[];
}

/**
 * جلب بيانات بوابة الوظائف وفرص العمل الموثقة
 */
export async function getJobsData() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { section: { slug: "jobs" } },
          { titleAr: { contains: "وظائف", mode: "insensitive" } },
          { titleAr: { contains: "وظيفة", mode: "insensitive" } },
          { titleAr: { contains: "فرص عمل", mode: "insensitive" } },
          { titleAr: { contains: "شواغر", mode: "insensitive" } },
        ],
      },
      include: {
        section: true,
        source: true,
      },
      orderBy: { publishedAt: "desc" },
      take: 12,
    });

    const verifiedJobs: VerifiedJobItem[] = [
      {
        id: "un-careers-portal",
        titleAr: "بوابة التوظيف الموحدة للأمم المتحدة (UN Careers) في الشرق الأوسط",
        organization: "الأمم المتحدة (United Nations)",
        sector: "UN_INGO",
        location: "فلسطين / الأردن / إقليمياً",
        employmentType: "FULL_TIME",
        deadline: "تحديث أسبوعي مستمر",
        officialApplyUrl: "https://careers.un.org",
        verifiedAt: new Date().toISOString(),
        requirements: ["شهادة جامعية معتمدة في التخصص المطلوب", "إتقان اللغتين العربية والإنجليزية", "خبرة عملية موثقة في العمل الإنساني"],
      },
      {
        id: "unrwa-careers",
        titleAr: "شواغر وكالة الغوث (الأونروا) في التعليم والصحة والخدمات الإغاثية",
        organization: "وكالة الأمم المتحدة لإغاثة وتشغيل اللاجئين (UNRWA)",
        sector: "EDUCATION",
        location: "الضفة الغربية وغزة والأردن",
        employmentType: "CONTRACT",
        deadline: "حسب إعلان كل وظيفة عبر Inspira",
        officialApplyUrl: "https://www.unrwa.org/careers",
        verifiedAt: new Date().toISOString(),
        requirements: ["تقديم الطلب عبر منصة Inspira الرسمية", "اجتياز اختبارات الكفاءة والمقابلة المهنية"],
      },
      {
        id: "remote-tech-careers",
        titleAr: "مبادرات التوظيف الرقمي والعمل الحر عن بعد للكفاءات الفلسطينية والعربية",
        organization: "مبادرات التمكين الرقمي ومنصات العمل الحر الدولية",
        sector: "TECH",
        location: "عن بعد (Remote)",
        employmentType: "REMOTE",
        deadline: "متاح ومحدث باستمرار",
        officialApplyUrl: "https://alwatantoday.net/jobs",
        verifiedAt: new Date().toISOString(),
        requirements: ["إتقان مهارات البرمجة أو التصميم أو الترجمة", "معرض أعمال (Portfolio) احترافي", "حساب دفع إلكتروني دولي معتمد"],
      },
    ];

    return {
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
      verifiedJobs,
    };
  } catch (error) {
    console.error("Failed to fetch jobs data:", error);
    return { articles: [], verifiedJobs: [] };
  }
}

/**
 * جلب تقارير الفيديو والمحتوى المرئي الصحفي
 */
export async function getVideosData() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { kind: "VIDEO" },
          { section: { slug: "videos" } },
          { coverMedia: { kind: "video-embed" } },
        ],
      },
      include: {
        section: true,
        source: true,
        coverMedia: true,
      },
      orderBy: { publishedAt: "desc" },
      take: 24,
    });

    return articles.map((a) => ({
      id: a.id,
      slug: a.slug,
      titleAr: a.titleAr,
      summaryAr: a.summaryAr,
      publishedAt: a.publishedAt?.toISOString() || new Date().toISOString(),
      sectionSlug: a.section.slug,
      sectionNameAr: a.section.nameAr,
      videoUrl: a.coverMedia?.url || a.sourceUrl || "",
      thumbnailUrl: (a as any).coverImageUrl || "https://alwatantoday.net/brand/brand-palette.jpg",
      duration: "02:45",
      sourceNameAr: a.source?.nameAr || "الوطن اليوم",
    }));
  } catch (error) {
    console.error("Failed to fetch videos data:", error);
    return [];
  }
}

/**
 * جلب مقالات وسم محدد
 */
export async function getTagFeed(tagSlug: string, limit = 20) {
  try {
    const tag = await prisma.tag.findUnique({
      where: { slug: tagSlug },
      include: {
        articles: {
          where: { article: { status: "PUBLISHED" } },
          include: {
            article: {
              include: {
                section: true,
                source: true,
              },
            },
          },
          take: limit,
        },
      },
    });

    if (!tag) return null;

    return {
      tag: {
        id: tag.id,
        slug: tag.slug,
        nameAr: tag.nameAr,
        nameEn: tag.nameEn,
      },
      articles: tag.articles.map((item) => {
        const a = item.article;
        return {
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
        };
      }),
    };
  } catch (error) {
    console.error(`Failed to fetch tag feed for ${tagSlug}:`, error);
    return null;
  }
}

/**
 * جلب مقالات كاتب محدد
 */
export async function getAuthorFeed(authorSlug: string, limit = 20) {
  try {
    const author = await prisma.author.findUnique({
      where: { slug: authorSlug },
      include: {
        articles: {
          where: { status: "PUBLISHED" },
          include: {
            section: true,
            source: true,
          },
          orderBy: { publishedAt: "desc" },
          take: limit,
        },
      },
    });

    if (!author) return null;

    return {
      author: {
        id: author.id,
        slug: author.slug,
        nameAr: author.nameAr,
        bioAr: author.bioAr,
      },
      articles: author.articles.map((a) => ({
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
    };
  } catch (error) {
    console.error(`Failed to fetch author feed for ${authorSlug}:`, error);
    return null;
  }
}

/**
 * جلب أحدث المقالات المنشورة لتغذية خلاصة RSS الرئيسية
 */
export async function getGlobalRssArticles(limit = 50) {
  try {
    const articles = await prisma.article.findMany({
      where: { status: "PUBLISHED" },
      include: {
        section: true,
        source: true,
        author: true,
      },
      orderBy: { publishedAt: "desc" },
      take: limit,
    });

    return articles.map((a) => ({
      id: a.id,
      slug: a.slug,
      titleAr: a.titleAr,
      summaryAr: a.summaryAr || "",
      publishedAt: a.publishedAt || new Date(),
      sectionNameAr: a.section.nameAr,
      sectionSlug: a.section.slug,
      sourceNameAr: a.source?.nameAr || "الوطن اليوم",
      authorNameAr: a.author?.nameAr,
      sourceUrl: a.sourceUrl,
    }));
  } catch (error) {
    console.error("Failed to fetch global RSS articles:", error);
    return [];
  }
}


