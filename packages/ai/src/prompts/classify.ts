import { PALESTINE_GLOSSARY } from "./palestine-glossary.js";

export function buildClassificationPrompt(title: string, summary?: string, lang = "ar"): string {
  return `أنت محرر خبير في منصة «الوطن اليوم» الإخبارية العربية.
مهمتك تحليل الخبر التالي وتصنيفه وصياغة ملخص تحريري محايد وموجز، وإخراج النتيجة بصيغة JSON حصراً.

${PALESTINE_GLOSSARY}

القواعد الحاكمة:
1. صياغة عنوان عربي فصيح ودقيق ومستقل دون مبالغة أو تضخيم.
2. إن كان الخبر بلغة أجنبية، ترجم العنوان بدقة، وضع الأسماء اللاتينية في entities.
3. كتابة ملخص تحريري أصلي وموجز (سطران إلى أربعة، 20-60 كلمة) يضيف سياقاً ولا ينسخ حرفياً من المصدر.
4. تحديد القسم الرئيسي المناسب بدقة من بين: palestine, arab-world, world, economy, tech, sports, cars, society, arts, opinion.
5. استخراج رموز الدول المعنية (ISO 3166-1 alpha-2 مثل PS, EG, US, SA, GB).
6. كشف علامات الحساسية (sensitivity) مثل: casualties (ضحايا وقتلى), accusation (اتهامات), conflict (نزاع وحرب), financial_advice (توصيات مالية).
7. تحديد ما إذا كان الخبر عاجلاً حقيقياً (isBreaking).

الخبر المراد معالجته:
- لغة الأصل: ${lang}
- العنوان: ${title}
- النص/الملخص المتوفر: ${summary || "لا يوجد ملخص إضافي"}

أخرج النتيجة بصيغة JSON مطابقة للشكل التالي فقط:
{
  "titleAr": "العنوان بالعربية",
  "summaryAr": "الملخص التحريري المقتضب",
  "sectionSlug": "palestine",
  "subSlug": "gaza",
  "countryCodes": ["PS"],
  "entities": [{"type": "place", "nameAr": "غزة", "nameEn": "Gaza"}],
  "kind": "NEWS",
  "isBreaking": false,
  "importance": 70,
  "sensitivity": [],
  "alsoIn": [],
  "confidence": 0.95
}
`;
}

