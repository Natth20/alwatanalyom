import { SearchArticleDocument, SearchOptions, SearchResult } from "./types";

const MEILI_HOST = process.env["MEILISEARCH_HOST"] || process.env["MEILI_HOST"] || "http://127.0.0.1:7700";
const MEILI_KEY = process.env["MEILISEARCH_KEY"] || process.env["MEILI_MASTER_KEY"] || "alwatantoday-meili-master-key-2026";
const INDEX_NAME = "articles";

export class SearchClient {
  private host: string;
  private apiKey: string;

  constructor(host = MEILI_HOST, apiKey = MEILI_KEY) {
    this.host = host.replace(/\/$/, "");
    this.apiKey = apiKey;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T | null> {
    const url = `${this.host}${path}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);

    try {
      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
          ...(options.headers || {}),
        },
      });

      if (!res.ok) {
        return null;
      }

      return (await res.json()) as T;
    } catch {
      return null;
    } finally {
      clearTimeout(timeout);
    }
  }

  /**
   * فحص جاهزية محرك Meilisearch
   */
  async isAvailable(): Promise<boolean> {
    try {
      const res = await this.request<{ status: string }>("/health");
      return res?.status === "available";
    } catch {
      return false;
    }
  }

  /**
   * ضبط إعدادات الفهرس وقواعد الترتيب واللغة العربية
   */
  async configureIndex(): Promise<boolean> {
    // 1. إنشاء الفهرس إن لم يكن موجوداً
    await this.request<{ taskUid: number }>(`/indexes`, {
      method: "POST",
      body: JSON.stringify({ uid: INDEX_NAME, primaryKey: "id" }),
    });

    // 2. ضبط الحقول القابلة للبحث والفلترة والترتيب
    const settings = {
      searchableAttributes: ["titleAr", "summaryAr", "titleOriginal", "sectionNameAr", "sourceNameAr"],
      filterableAttributes: ["sectionSlug", "isBreaking", "publishedAtTimestamp"],
      sortableAttributes: ["publishedAtTimestamp", "importance"],
      rankingRules: ["words", "typo", "proximity", "attribute", "sort", "exactness"],
      typoTolerance: {
        enabled: true,
        minWordSizeForTypos: {
          oneTypo: 4,
          twoTypos: 8,
        },
      },
      synonyms: {
        غزة: ["القطاع", "خان يونس", "رفح"],
        القدس: ["بيت المقدس", "المسجد الأقصى", "العاصمة المحتلة"],
        الضفة: ["الضفة الغربية", "رام الله", "نابلس", "جنين"],
        الذهب: ["المعدن الأصفر", "أسعار الذهب", "أونصة"],
        الدولار: ["العملة الأمريكية", "سعر الصرف", "الدولار الأمريكي"],
      },
    };

    const res = await this.request<{ taskUid: number }>(`/indexes/${INDEX_NAME}/settings`, {
      method: "PATCH",
      body: JSON.stringify(settings),
    });

    return !!res;
  }

  /**
   * فهرسة دفعة من المقالات
   */
  async indexArticles(documents: SearchArticleDocument[]): Promise<boolean> {
    if (documents.length === 0) return true;

    const res = await this.request<{ taskUid: number }>(`/indexes/${INDEX_NAME}/documents`, {
      method: "POST",
      body: JSON.stringify(documents),
    });

    return !!res;
  }

  /**
   * حذف مقال من الفهرس عند السحب أو الحذف
   */
  async removeArticle(articleId: string): Promise<boolean> {
    const res = await this.request<{ taskUid: number }>(`/indexes/${INDEX_NAME}/documents/${articleId}`, {
      method: "DELETE",
    });

    return !!res;
  }

  /**
   * بحث سريع متقدم مع معالجة الكلمات العربية وتسامح الأخطاء
   */
  async search(query: string, options: SearchOptions = {}): Promise<SearchResult | null> {
    const cleanQuery = query.trim();
    if (!cleanQuery) {
      return { hits: [], total: 0, query, processingTimeMs: 0 };
    }

    const filters: string[] = [];
    if (options.sectionSlug) {
      filters.push(`sectionSlug = "${options.sectionSlug}"`);
    }
    if (options.filterBreaking !== undefined) {
      filters.push(`isBreaking = ${options.filterBreaking}`);
    }

    const filterString = filters.length > 0 ? filters.join(" AND ") : undefined;

    const body: Record<string, any> = {
      q: cleanQuery,
      limit: options.limit || 20,
      offset: options.offset || 0,
      sort: ["publishedAtTimestamp:desc"],
      attributesToHighlight: ["titleAr", "summaryAr"],
      highlightPreTag: "<mark class=\"bg-amber-100 text-amber-900 rounded px-1\">",
      highlightPostTag: "</mark>",
    };

    if (filterString) {
      body["filter"] = filterString;
    }

    const startTime = Date.now();
    const data = await this.request<{
      hits: SearchArticleDocument[];
      estimatedTotalHits: number;
      processingTimeMs: number;
    }>(`/indexes/${INDEX_NAME}/search`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!data) {
      return null; // محرك Meilisearch غير متاح، يتم التحويل لـ Database fallback
    }

    return {
      hits: data.hits || [],
      total: data.estimatedTotalHits || (data.hits ? data.hits.length : 0),
      query: cleanQuery,
      processingTimeMs: data.processingTimeMs || (Date.now() - startTime),
      isFallback: false,
    };
  }
}

export const searchClient = new SearchClient();
