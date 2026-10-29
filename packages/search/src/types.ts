export interface SearchArticleDocument {
  id: string;
  slug: string;
  titleAr: string;
  titleOriginal?: string | null;
  summaryAr?: string | null;
  sectionSlug: string;
  sectionNameAr: string;
  sourceNameAr: string;
  sourceSlug: string;
  isBreaking: boolean;
  publishedAt: string;
  publishedAtTimestamp: number;
  importance: number;
}

export interface SearchOptions {
  sectionSlug?: string;
  limit?: number;
  offset?: number;
  filterBreaking?: boolean;
}

export interface SearchResult {
  hits: SearchArticleDocument[];
  total: number;
  query: string;
  processingTimeMs: number;
  isFallback?: boolean;
}
