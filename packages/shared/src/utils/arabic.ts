/**
 * أدوات معالجة وتطبيع النصوص العربية للبصمات والبحث والمقارنة
 */

const DIACRITICS_REGEX = /[\u064B-\u065F\u0670]/g;
const TATWEEL_REGEX = /\u0640/g;
const EASTERN_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

// كلمات زائدة تُزال فقط عند حساب البصمة والمقارنة
const BUZZWORDS_REGEX = /^(عاجل|بالفيديو|شاهد|خاص|حصرياً|هام|متابعة|تحديث)\s*[:：\-–—]\s*/gi;

/**
 * تطبيع النص العربي لأغراض المقارنة وكشف التكرار (لا يُعرض للمستخدم)
 */
export function normalizeArabicForComparison(text: string): string {
  if (!text) return "";

  let result = text
    .replace(DIACRITICS_REGEX, "") // إزالة التشكيل
    .replace(TATWEEL_REGEX, "") // إزالة التطويل
    .replace(BUZZWORDS_REGEX, "") // إزالة الكلمات الاستهلالية الشائعة
    .trim();

  // توحيد الألف
  result = result.replace(/[أإآٱ]/g, "ا");

  // توحيد الياء والألف المقصورة
  result = result.replace(/ى/g, "ي");

  // توحيد التاء المربوطة
  result = result.replace(/ة/g, "ه");

  // تحويل الأرقام المشرقية إلى غربية
  for (let i = 0; i < 10; i++) {
    const digit = EASTERN_DIGITS[i];
    if (digit) {
      result = result.replace(new RegExp(digit, "g"), i.toString());
    }
  }

  // تنظيف المسافات والرموز الزائدة
  result = result.replace(/[^\p{L}\p{N}\s]/gu, " ");
  result = result.replace(/\s+/g, " ").trim();

  return result.toLowerCase();
}

/**
 * إنشاء Slug عربي نظيف وآمن لعناوين URL
 */
export function generateArabicSlug(text: string, maxLength = 80): string {
  if (!text) return "post";

  let slug = text
    .replace(DIACRITICS_REGEX, "")
    .replace(TATWEEL_REGEX, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .trim()
    .toLowerCase();

  // إزالة الحروف غير الأبجدية والرقمية (مع الحفاظ على الحروف العربية واللاتينية)
  slug = slug.replace(/[^\p{L}\p{N}\s-]/gu, "");

  // استبدال المسافات والشرطات المتعددة بشرطة واحدة
  slug = slug.replace(/[\s_]+/g, "-");
  slug = slug.replace(/-+/g, "-");
  slug = slug.replace(/^-+|-+$/g, "");

  if (slug.length > maxLength) {
    slug = slug.slice(0, maxLength);
    // عدم قطع الكلمة من المنتصف إذا أمكن
    const lastDash = slug.lastIndexOf("-");
    if (lastDash > 40) {
      slug = slug.slice(0, lastDash);
    }
  }

  return slug || "post";
}

