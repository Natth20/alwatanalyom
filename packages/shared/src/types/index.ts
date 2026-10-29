export type Role = "ADMIN" | "EDITOR" | "REVIEWER" | "TECH";
export type SourceType = "AGENCY" | "NEWSPAPER" | "CHANNEL" | "OFFICIAL" | "ECONOMIC" | "SPORTS";
export type IngestMethod = "RSS" | "API" | "LICENSED";
export type DisplayPolicy = "TITLE_ONLY" | "EXCERPT" | "SUMMARY" | "LICENSED_FULL";
export type ConnectionState = "OK" | "PAUSED" | "NEEDS_CHECK" | "FAILING";
export type ItemStatus = "NEW" | "DUPLICATE" | "REJECTED" | "QUEUED" | "REVIEW" | "PUBLISHED" | "WITHDRAWN";
export type ArticleKind = "NEWS" | "BREAKING" | "ANALYSIS" | "OPINION" | "FACTCHECK" | "LIVE" | "VIDEO" | "PHOTO" | "INFOGRAPHIC";
export type ArticleStatus = "DRAFT" | "REVIEW" | "SCHEDULED" | "PUBLISHED" | "WITHDRAWN";
export type DataStatus = "LIVE" | "DELAYED" | "CLOSE" | "UNAVAILABLE";
export type ChannelStatus = "AVAILABLE" | "UNAVAILABLE" | "UNVERIFIED";
export type Lang = "AR" | "EN";

export interface SourceBrief {
  id: string;
  nameAr: string;
  slug: string;
  logoUrl: string | null;
  homepageUrl: string;
}

export interface ArticleCard {
  id: string;
  slug: string;
  titleAr: string;
  titleOriginal?: string | null;
  summaryAr?: string | null;
  kind: ArticleKind;
  publishedAt: string; // ISO date string
  sourcePublishedAt?: string | null;
  displayPolicy: DisplayPolicy;
  isBreaking: boolean;
  coverImageUrl?: string | null;
  sectionSlug: string;
  sectionNameAr: string;
  source?: SourceBrief | null;
  translatedBy?: string | null;
  readingTimeMin?: number;
}

export interface ArticleFull extends ArticleCard {
  bodyHtml?: string | null;
  sourceUrl?: string | null;
  storyId?: string | null;
  author?: {
    id: string;
    nameAr: string;
    slug: string;
  } | null;
  tags: { id: string; nameAr: string; slug: string }[];
  countries: string[];
  corrections?: { id: string; note: string; createdAt: string }[];
  relatedArticles?: ArticleCard[];
  sportsLinks?: {
    entityId: string;
    nameAr: string;
    kind: string;
    urlPath?: string | null;
  }[];
}

export interface StorySummary {
  id: string;
  slug: string;
  headlineAr: string;
  summaryAr?: string | null;
  importance: number;
  trendingScore: number;
  pinned: boolean;
  firstSeenAt: string;
  lastUpdatedAt: string;
  sectionSlug?: string | null;
  coverImageUrl?: string | null;
  coverageCount: number;
  sources: SourceBrief[];
  articles: ArticleCard[];
}

export interface InstrumentQuote {
  symbol: string;
  nameAr: string;
  nameEn: string;
  category: "energy" | "metals" | "fx" | "crypto" | "index" | "stock";
  price: string | null;
  change?: string | null;
  changePct?: string | null;
  unit?: string | null;
  currency?: string | null;
  status: DataStatus;
  asOf: string | null; // ISO
  provider: string;
}

export interface ChannelCard {
  id: string;
  slug: string;
  nameAr: string;
  nameEn?: string | null;
  logoUrl?: string | null;
  countryCode?: string | null;
  lang: Lang;
  category: "arabic" | "international";
  descriptionAr?: string | null;
  officialSiteUrl: string;
  officialStreamUrl?: string | null;
  embedAllowed: boolean;
  status: ChannelStatus;
  lastCheckedAt?: string | null;
}

