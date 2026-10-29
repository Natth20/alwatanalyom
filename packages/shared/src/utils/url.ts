import { createHash } from "node:crypto";

const TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "fbclid",
  "gclid",
  "mc_cid",
  "mc_eid",
  "_ga",
  "ref",
];

/**
 * تنظيف الرابط وإزالة وسوم التتبع وتوحيد الصيغة
 */
export function canonicalizeUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl.trim());

    // توحيد البروتوكول واسم النطاق إلى أحرف صغيرة
    url.protocol = url.protocol.toLowerCase();
    url.hostname = url.hostname.toLowerCase();

    // حذف وسوم التتبع المعروفة
    for (const param of TRACKING_PARAMS) {
      url.searchParams.delete(param);
    }

    // إزالة الشرطة المائلة الأخيرة من المسار إذا لم يكن الجذر
    if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
      url.pathname = url.pathname.slice(0, -1);
    }

    // فرز المعاملات المتبقية لضمان توحيد الرابط
    url.searchParams.sort();

    // إزالة الـ hash (المرساة الداخلية)
    url.hash = "";

    return url.toString();
  } catch {
    return rawUrl.trim();
  }
}

/**
 * حساب sha256 hash للرابط
 */
export function computeUrlHash(url: string): string {
  const canonical = canonicalizeUrl(url);
  return createHash("sha256").update(canonical).digest("hex");
}

/**
 * حساب sha256 hash للمحتوى المطبّع
 */
export function computeContentHash(normalizedText: string): string {
  return createHash("sha256").update(normalizedText).digest("hex");
}

