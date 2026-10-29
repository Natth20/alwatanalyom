/**
 * حارس الدمج (Merge Guard):
 * يمنع دمج أي خبرين إذا اختلفت الأرقام الجوهرية (ضحايا، أسعار، نسب، نتائج)
 * حتى لو كان التشابه النصي مرتفعاً جداً.
 */

const NUMBERS_REGEX = /\b\d+(?:\.\d+)?\b/g;

export interface MergeGuardResult {
  canMerge: boolean;
  reason?: string;
  conflictingNumbers?: {
    numbersA: number[];
    numbersB: number[];
  };
}

/**
 * فحص أمان الدمج بين نصين إخباريين
 */
export function checkMergeSafety(
  titleA: string,
  titleB: string,
  countryCodesA?: string[],
  countryCodesB?: string[]
): MergeGuardResult {
  // 1. فحص تعارض الدول إذا كانت محددة
  if (countryCodesA?.length && countryCodesB?.length) {
    const hasSharedCountry = countryCodesA.some((c) => countryCodesB.includes(c));
    if (!hasSharedCountry) {
      return {
        canMerge: false,
        reason: `تعارض الدول المنسوبة للخبر (${countryCodesA.join(", ")} مقابل ${countryCodesB.join(", ")})`,
      };
    }
  }

  // 2. استخراج الأرقام من كلا العنوانين
  const rawNumsA = (titleA.match(NUMBERS_REGEX) || []).map(Number);
  const rawNumsB = (titleB.match(NUMBERS_REGEX) || []).map(Number);

  // إذا احتوى كلا العنوانين على أرقام جوهرية مختلفة كلياً
  if (rawNumsA.length > 0 && rawNumsB.length > 0) {
    // تصفية أرقام السنوات الشائعة (مثل 2026، 2025)
    const significantA = rawNumsA.filter((n) => n < 1900 || n > 2100);
    const significantB = rawNumsB.filter((n) => n < 1900 || n > 2100);

    if (significantA.length > 0 && significantB.length > 0) {
      const hasCommonNumber = significantA.some((numA) => significantB.includes(numA));
      if (!hasCommonNumber) {
        return {
          canMerge: false,
          reason: `اختلاف في الأرقام الجوهرية في العنوانين (${significantA.join(", ")} مقابل ${significantB.join(", ")})`,
          conflictingNumbers: {
            numbersA: significantA,
            numbersB: significantB,
          },
        };
      }
    }
  }

  return { canMerge: true };
}

