import { prisma } from "@awt/db";
import { ArticleCard, StorySummary, InstrumentQuote, InstrumentDetail, ChannelCard, isMockDataAllowed } from "@awt/shared";
import { searchClient } from "@awt/search";
import { FACT_CHECKS, FactCheckItem } from "@/data/factChecks";
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
          fastStreamArticles,
          videoArticles,
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
 * جلب تفاصيل أداة مالية وسجل أسعارها
 */
export async function getInstrumentDetails(symbol: string): Promise<InstrumentDetail | null> {
  const normSymbol = symbol.trim().toUpperCase();
  try {
    const inst = await prisma.instrument.findUnique({
      where: { symbol: normSymbol },
      include: {
        quotes: {
          orderBy: { asOf: "desc" },
          take: 30,
        },
      },
    });

    if (inst) {
      const q = inst.quotes[0];
      const now = Date.now();
      let status = (q?.status as any) || "UNAVAILABLE";

      // قاعدة 5: إذا تأخر التحديث تظهر حالة "متأخر" بدل "مباشر"
      if (q?.asOf && status === "LIVE") {
        const diffMinutes = (now - new Date(q.asOf).getTime()) / (1000 * 60);
        if (diffMinutes > 20) {
          status = "DELAYED";
        }
      }

      const prices = inst.quotes.map((item) => Number(item.price)).filter((p) => !isNaN(p));
      const high24h = prices.length > 0 ? Math.max(...prices) : null;
      const low24h = prices.length > 0 ? Math.min(...prices) : null;

      const history = inst.quotes
        .slice()
        .reverse()
        .map((item) => ({
          time: item.asOf.toISOString(),
          price: Number(item.price),
        }));

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
        status,
        asOf: q?.asOf ? q.asOf.toISOString() : null,
        provider: inst.providerKey,
        providerTermsUrl: inst.termsUrl,
        history,
        high24h,
        low24h,
      };
    }

    if (isMockDataAllowed()) {
      const mock = MOCK_QUOTES.find((m) => m.symbol.toUpperCase() === normSymbol);
      if (mock) {
        const basePrice = mock.price ? parseFloat(mock.price) : 100;
        return {
          ...mock,
          history: [
            { time: new Date(Date.now() - 3600000 * 4).toISOString(), price: Number((basePrice * 0.98).toFixed(2)) },
            { time: new Date(Date.now() - 3600000 * 3).toISOString(), price: Number((basePrice * 0.99).toFixed(2)) },
            { time: new Date(Date.now() - 3600000 * 2).toISOString(), price: Number((basePrice * 0.985).toFixed(2)) },
            { time: new Date(Date.now() - 3600000 * 1).toISOString(), price: Number((basePrice * 1.01).toFixed(2)) },
            { time: new Date().toISOString(), price: basePrice },
          ],
          high24h: Number((basePrice * 1.02).toFixed(2)),
          low24h: Number((basePrice * 0.97).toFixed(2)),
        };
      }
    }

    return null;
  } catch {
    if (isMockDataAllowed()) {
      const mock = MOCK_QUOTES.find((m) => m.symbol.toUpperCase() === normSymbol);
      if (mock) {
        return {
          ...mock,
          history: [],
          high24h: null,
          low24h: null,
        };
      }
    }
    return null;
  }
}

/**
 * جلب قنوات دليل البث الرسمي (إخفاء القنوات المعطلة وفق متطلبات المرحلة 5)
 */
export async function getChannels(): Promise<ChannelCard[]> {
  try {
    const channels = await prisma.channel.findMany({
      where: {
        status: { notIn: ["OFFICIAL_DOWN", "UNAVAILABLE"] as any },
      },
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

/**
 * فحص دوري لسلامة رابط بث القناة وتحديث حالتها في قاعدة البيانات
 */
export async function verifyChannelHealth(channelId: string, url: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: { "User-Agent": "AlwatanToday-HealthCheck/1.0" },
    });
    clearTimeout(timeout);
    const ok = res.status < 400;

    await prisma.channelCheck.create({
      data: {
        channelId,
        ok,
        httpStatus: res.status,
        note: ok ? "رابط البث الرسمي متاح ويعمل بنجاح" : `خطأ استجابة الخادم: ${res.status}`,
      },
    });

    await prisma.channel.update({
      where: { id: channelId },
      data: {
        status: ok ? ("AVAILABLE" as any) : ("UNAVAILABLE" as any),
        lastCheckedAt: new Date(),
      },
    });

    return ok;
  } catch (err: any) {
    try {
      await prisma.channelCheck.create({
        data: {
          channelId,
          ok: false,
          note: err?.message || "انتهت مهلة الاتصال أو فشل الرابط",
        },
      });
      await prisma.channel.update({
        where: { id: channelId },
        data: {
          status: "UNAVAILABLE" as any,
          lastCheckedAt: new Date(),
        },
      });
    } catch {}
    return false;
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

/**
 * =========================================================================
 * المرحلة السابعة: الميزات التفاعلية والذكاء التحريري (Editorial Intelligence)
 * =========================================================================
 */

/**
 * جلب تقارير مرصد رادار الحقيقة ومكافحة الشائعات
 */
export async function getFactChecks(): Promise<FactCheckItem[]> {
  try {
    const records = await prisma.factCheck.findMany({
      orderBy: { publishedAt: "desc" },
      include: { reviewedBy: true },
    });

    if (records.length > 0) {
      return records.map((r) => ({
        id: r.id,
        slug: r.slug,
        claim: r.claim,
        claimSource: r.claimSource,
        verdict: r.verdict as any,
        verdictLabel: r.verdictLabel,
        summary: r.summary,
        fullAnalysis: r.fullAnalysis,
        sourceProof: r.sourceProof || "فحص تقني معتمد · مرصد رادار الحقيقة",
        officialSources: (r.officialSources as any) || [],
        evidences: (r.evidences as any) || [],
        category: "تحقق استقصائي",
        date: r.publishedAt.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" }),
        reviewedBy: r.reviewedBy?.name || "فريق التحقق والتدقيق الصحفي — الوطن اليوم",
      }));
    }

    return isMockDataAllowed() ? FACT_CHECKS : [];
  } catch (error) {
    console.warn("Failed to fetch fact checks from database, using fallback:", error);
    return isMockDataAllowed() ? FACT_CHECKS : [];
  }
}

/**
 * جلب تفاصيل تقرير تحقق مفرد بالمعرف أو المعرف اللطيف
 */
export async function getFactCheckBySlug(slug: string): Promise<FactCheckItem | null> {
  try {
    const record = await prisma.factCheck.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
      include: { reviewedBy: true },
    });

    if (record) {
      return {
        id: record.id,
        slug: record.slug,
        claim: record.claim,
        claimSource: record.claimSource,
        verdict: record.verdict as any,
        verdictLabel: record.verdictLabel,
        summary: record.summary,
        fullAnalysis: record.fullAnalysis,
        sourceProof: record.sourceProof || "فحص تقني معتمد · مرصد رادار الحقيقة",
        officialSources: (record.officialSources as any) || [],
        evidences: (record.evidences as any) || [],
        category: "تحقق استقصائي",
        date: record.publishedAt.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" }),
        reviewedBy: record.reviewedBy?.name || "فريق التحقق والتدقيق الصحفي — الوطن اليوم",
      };
    }

    if (isMockDataAllowed()) {
      return FACT_CHECKS.find((f) => f.id === slug || f.slug === slug) || null;
    }
    return null;
  } catch (error) {
    console.warn(`Failed to fetch fact check ${slug} from DB:`, error);
    if (isMockDataAllowed()) {
      return FACT_CHECKS.find((f) => f.id === slug || f.slug === slug) || null;
    }
    return null;
  }
}

/**
 * جلب التغطيات الإخبارية المنشورة المرتبطة بمدينة أو قضاء في أطلس فلسطين
 */
export async function getArticlesByDistrictOrCity(placeName: string, limit = 6): Promise<ArticleCard[]> {
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        OR: [
          { titleAr: { contains: placeName, mode: "insensitive" } },
          { summaryAr: { contains: placeName, mode: "insensitive" } },
          { tags: { some: { tag: { nameAr: { contains: placeName } } } } },
        ],
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
  } catch (error) {
    console.warn(`Failed to fetch articles for place ${placeName}:`, error);
    return [];
  }
}

/**
 * واجهة نتيجة البحث والاستعلام في الأرشيف الصحفي لـ «اسأل الوطن»
 */
export interface AskNewsroomResponse {
  answered: boolean;
  answer: string;
  sources: { title: string; url: string; date: string }[];
  suggestedTopics?: string[];
  disclaimer: string;
}

/**
 * معالجة استعلام «اسأل الوطن» استناداً حصرياً إلى الأرشيف المنشور (قواعد القسم 2 و11)
 */
export async function queryAskNewsroom(question: string): Promise<AskNewsroomResponse> {
  const trimmed = question.trim();
  if (!trimmed || trimmed.length < 3) {
    return {
      answered: false,
      answer: "يرجى كتابة سؤال محدد للبحث في أرشيف الأخبار والتحقيقات الصحفية.",
      sources: [],
      disclaimer: "الإجابات مستمدة حصراً من المواد المنشورة والموثقة في سجلات المنصة.",
    };
  }

  // تنظيف السؤال من كلمات الاستفهام الشائعة لاستخلاص الكلمات الدلالية الأساسية
  const stopWords = new Set([
    "ما", "ماذا", "من", "هل", "أين", "كيف", "متى", "لماذا", "كم", "أي",
    "عن", "في", "على", "إلى", "مع", "هذا", "هذه", "ذلك", "تلك", "هو",
    "هي", "هم", "كان", "كانت", "أو", "ثم", "بل", "لكن", "كل", "جميع",
    "حول", "بشأن", "بخصوص", "أبرز", "حقيقة", "تفاصيل", "لخص", "لي"
  ]);

  const tokens = trimmed
    .replace(/[؟?.,!،;:()\[\]"']/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));

  const searchKeyword = tokens.slice(0, 3).join(" ") || trimmed;

  try {
    // 1. البحث في المقالات المنشورة
    const matchingArticles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        OR: tokens.length > 0
          ? tokens.map((token) => ({
              OR: [
                { titleAr: { contains: token, mode: "insensitive" } },
                { summaryAr: { contains: token, mode: "insensitive" } },
              ],
            }))
          : [{ titleAr: { contains: trimmed, mode: "insensitive" } }],
      },
      include: {
        section: true,
        source: true,
      },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });

    // 2. البحث في تقارير مرصد رادار الحقيقة
    const matchingFactChecks = await prisma.factCheck.findMany({
      where: {
        OR: tokens.length > 0
          ? tokens.map((token) => ({
              OR: [
                { claim: { contains: token, mode: "insensitive" } },
                { summary: { contains: token, mode: "insensitive" } },
              ],
            }))
          : [{ claim: { contains: trimmed, mode: "insensitive" } }],
      },
      take: 2,
    });

    const sources: { title: string; url: string; date: string }[] = [];

    matchingArticles.forEach((a) => {
      sources.push({
        title: a.titleAr,
        url: a.sourceUrl && a.displayPolicy === "TITLE_ONLY" ? a.sourceUrl : `/article/${a.slug}`,
        date: a.publishedAt ? a.publishedAt.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" }) : "منشور",
      });
    });

    matchingFactChecks.forEach((fc) => {
      sources.push({
        title: `مرصد الحقيقة: ${fc.claim}`,
        url: `/fact-check/${fc.slug}`,
        date: fc.publishedAt ? fc.publishedAt.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" }) : "تحقيق معتمد",
      });
    });

    // إذا لم نجد أي مادة في قاعدة البيانات، نتحقق من البيانات التجريبية المصرح بها فقط عند السماح بالـ Mock
    if (sources.length === 0 && isMockDataAllowed()) {
      // فحص بيانات مرصد الحقيقة التجريبية الموثقة
      const fallbackFactChecks = FACT_CHECKS.filter((fc) =>
        tokens.some((t) => fc.claim.includes(t) || fc.summary.includes(t) || fc.category.includes(t))
      );

      if (fallbackFactChecks.length > 0) {
        const top = fallbackFactChecks[0];
        return {
          answered: true,
          answer: `استناداً إلى تحقيقات مرصد «رادار الحقيقة» المنشورة: ${top.summary} حكم المرصد: (${top.verdictLabel}) استناداً إلى: ${top.sourceProof}.`,
          sources: [
            { title: top.claim, url: `/fact-check/${top.id}`, date: top.date },
            ...top.officialSources.slice(0, 2).map((s) => ({ title: s.name, url: s.url, date: s.date })),
          ],
          disclaimer: "مستخرج آلياً بالاعتماد حصراً على تحقيقات مرصد الحقيقة والمصادر الموثقة.",
        };
      }
    }

    if (sources.length === 0) {
      return {
        answered: false,
        answer: "لم نجد تغطية كافية لهذا السؤال في أرشيف «الوطن اليوم» حتى الآن. التزاماً بقواعد النزاهة التحريرية، نمتنع عن تقديم إجابات غير مستندة إلى مواد موثقة ومنشورة في سجلاتنا.",
        sources: [],
        suggestedTopics: ["فلسطين", "المساعدات الإنسانية", "الاقتصاد", "القدس الشريف", "رادار الحقيقة"],
        disclaimer: "نحرص على صفر اختلاق: إما مواد حقيقية بمصادرها، أو إعلان عدم توفر التغطية.",
      };
    }

    // صياغة خلاصة الإجابة من المواد المنشورة المعتمدة
    const primaryTitle = matchingArticles[0]?.titleAr || matchingFactChecks[0]?.claim;
    const primarySummary = matchingArticles[0]?.summaryAr || matchingFactChecks[0]?.summary;
    const sourceName = matchingArticles[0]?.source?.nameAr || "أرشيف الوطن اليوم";

    const answer = `بناءً على التغطية المنشورة في «الوطن اليوم» نقلاً عن (${sourceName}): ${primarySummary || primaryTitle}. يمكنك الاطلاع على التفاصيل الكاملة عبر الروابط الموثقة أدناه.`;

    return {
      answered: true,
      answer,
      sources: sources.slice(0, 3),
      disclaimer: "مستخلص من الأرشيف المنشور ومصادر الأخبار المعتمدة فقط دون أي إضافات توليدية غير موثقة.",
    };
  } catch (error) {
    console.error("AskNewsroom error:", error);
    return {
      answered: false,
      answer: "حدث خطأ أثناء فحص الأرشيف الإخباري. يرجى المحاولة لاحقاً.",
      sources: [],
      disclaimer: "نظام الاستعلام الصحفي الموثق.",
    };
  }
}

/**
 * جلب تجمعات القصص الإخبارية المتعددة المصادر (Story Clusters)
 */
export async function getStoryClusters(limit = 6) {
  try {
    const stories = await prisma.story.findMany({
      include: {
        section: true,
        articles: {
          where: { status: "PUBLISHED" },
          include: { source: true, section: true },
          orderBy: { publishedAt: "asc" },
        },
      },
      orderBy: { lastUpdatedAt: "desc" },
      take: limit,
    });

    return stories.map((s) => ({
      id: s.id,
      slug: s.slug,
      headlineAr: s.headlineAr,
      summaryAr: s.summaryAr,
      importance: s.importance,
      trendingScore: s.trendingScore,
      firstSeenAt: s.firstSeenAt.toISOString(),
      lastUpdatedAt: s.lastUpdatedAt.toISOString(),
      section: s.section ? { slug: s.section.slug, nameAr: s.section.nameAr } : null,
      sourcesCount: new Set(s.articles.map((a) => a.sourceId).filter(Boolean)).size,
      articlesCount: s.articles.length,
      timeline: s.articles.map((a) => ({
        id: a.id,
        slug: a.slug,
        titleAr: a.titleAr,
        publishedAt: a.publishedAt?.toISOString() || "",
        sourceNameAr: a.source?.nameAr || "مراسل الوطن",
        sourceUrl: a.sourceUrl,
      })),
    }));
  } catch (error) {
    console.warn("Failed to fetch story clusters from DB:", error);
    return [];
  }
}



