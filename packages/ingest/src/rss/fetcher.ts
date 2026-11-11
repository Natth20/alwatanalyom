import { assertSafeUrl } from "../ssrf/guard";

export interface FetchFeedResult {
  ok: boolean;
  status: number;
  bodyText?: string;
  etag?: string | null;
  lastModified?: string | null;
  notModified?: boolean;
  error?: string;
}

const BOT_USER_AGENT = "AlWatanTodayBot/1.0 (+https://alwatantoday.net/bot; ops@alwatantoday.net)";
const TIMEOUT_MS = 6000; // 6 ثوانٍ كحد أقصى لكل خلاصة
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * جلب آمن لخلاصة الأخبار مع احترام ETag و If-Modified-Since
 */
export async function fetchFeedSafe(
  feedUrl: string,
  options?: { etag?: string | null; lastModified?: string | null }
): Promise<FetchFeedResult> {
  let timeoutId: NodeJS.Timeout | undefined;
  try {
    const validatedUrl = await assertSafeUrl(feedUrl);

    const headers: Record<string, string> = {
      "User-Agent": BOT_USER_AGENT,
      Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
    };

    if (options?.etag) {
      headers["If-None-Match"] = options.etag;
    }
    if (options?.lastModified) {
      headers["If-Modified-Since"] = options.lastModified;
    }

    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const response = await fetch(validatedUrl.toString(), {
      method: "GET",
      headers,
      signal: controller.signal,
      redirect: "follow",
    });

    // إذا لم تتغير البيانات
    if (response.status === 304) {
      return {
        ok: true,
        status: 304,
        notModified: true,
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: `HTTP ${response.status} ${response.statusText}`,
      };
    }

    // التحقق من حجم الاستجابة
    const contentLength = response.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_BYTES) {
      return {
        ok: false,
        status: response.status,
        error: `تجاوز الحد الأقصى لحجم الخلاصة (${MAX_BYTES} بايت)`,
      };
    }

    const bodyText = await response.text();
    if (bodyText.length > MAX_BYTES) {
      return {
        ok: false,
        status: response.status,
        error: "حجم النص المستلم يتجاوز الحد الأقصى",
      };
    }

    return {
      ok: true,
      status: response.status,
      bodyText,
      etag: response.headers.get("etag"),
      lastModified: response.headers.get("last-modified"),
      notModified: false,
    };
  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      error: err.name === "AbortError" ? "انتهت مهلة الطلب (6 ثوانٍ)" : err.message || "فشل الجلب غير المعروف",
    };
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}


