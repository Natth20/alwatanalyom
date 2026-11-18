/**
 * محرك صور الصحافة والتوثيق الميداني (Editorial Image Engine)
 * يضمن عدم ظهور أي بطاقة أو مادة إخبارية بدون صورة صحفية فائقة الجودة
 */

const SECTION_DEFAULT_IMAGES: Record<string, string[]> = {
  palestine: [
    "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=1200&q=80", // القدس وقبة الصخرة المشرفة
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80", // معالم فلسطين التاريخية
    "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=1200&q=80", // الميدان والتغطية الحية
    "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=80", // أسوار البلدة القديمة بالقدس
    "https://images.unsplash.com/photo-1512958789358-4dac206b12a0?auto=format&fit=crop&w=1200&q=80", // سماء فلسطين
  ],
  "arab-world": [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80", // دبي والخليج العربي
    "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=80", // القاهرة والنيل
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80", // قصر ومقر المؤتمرات
    "https://images.unsplash.com/photo-1580837119756-563d608dd119?auto=format&fit=crop&w=1200&q=80", // الرياض والعاصمة
  ],
  world: [
    "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80", // البيت الأبيض والدبلوماسية الدولية
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80", // قاعات الأمم المتحدة
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80", // العواصم الأوروبية
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80", // الكوكب والعلاقات الجيوسياسية
  ],
  economy: [
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80", // شاشات التداول وأسواق المال
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80", // سبائك الذهب والعملات العالمية
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80", // البورصة وحركة الأسهم
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80", // البنوك المركزية والمصارف
  ],
  sports: [
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80", // أضواء الملعب وجماهير كرة القدم
    "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=1200&q=80", // شباك المرمى وكرة القدم
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80", // الميدان الرياضي الأخضر
    "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80", // لحظات التتويج والمنافسة
  ],
  aid: [
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80", // المساعدات الإنسانية والطفولة
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80", // العمل الإغاثي وتوزيع المؤن
    "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=1200&q=80", // أيادي العطاء والتطوع
  ],
  jobs: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80", // بيئة العمل والتوظيف
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80", // مقابلات وفرص مهنية
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80", // العمل الرقمي الحديث
  ],
  tech: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80", // الشرائح والذكاء الاصطناعي
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80", // الأمن السيبراني
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80", // التكنولوجيا والحواسيب
  ],
  lifestyle: [
    "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80", // الصحة والعافية
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80", // الرياضة ونمط الحياة
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80", // التغذية السليمة
  ],
  videos: [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80", // الكاميرا والاستوديو الصحفي
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80", // تصوير وثائقي احترافي
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80", // استوديو الأخبار والمونتاج
  ],
  default: [
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80", // غرفة الأخبار والمؤتمر الصحفي
    "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80", // الصحافة العاجلة والميكروفونات
    "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80", // الصحف المطبوعة والأخبار
  ],
};

export function resolveEditorialImage(article?: {
  coverImageUrl?: string | null;
  coverMedia?: { url?: string } | null;
  sectionSlug?: string;
  titleAr?: string;
  id?: string;
} | null): string {
  if (!article) {
    return SECTION_DEFAULT_IMAGES.default![0]!;
  }

  // 1. إذا كان للمقال صورة مرفوعة أو معينة أصلاً
  if (article.coverImageUrl && article.coverImageUrl.startsWith("http")) {
    return article.coverImageUrl;
  }
  if (article.coverMedia?.url && article.coverMedia.url.startsWith("http")) {
    return article.coverMedia.url;
  }

  // 2. مطابقة الكلمات الدلالية في العنوان لاختيار أدق صورة
  const title = article.titleAr || "";
  if (title.includes("غزة") || title.includes("القدس") || title.includes("فلسطين") || title.includes("الضفة") || title.includes("شهيد") || title.includes("قصف") || title.includes("الأقصى")) {
    const list = SECTION_DEFAULT_IMAGES.palestine!;
    const idx = Math.abs(hashString(article.id || title)) % list.length;
    return list[idx]!;
  }
  if (title.includes("ذهب") || title.includes("دولار") || title.includes("بورصة") || title.includes("شيكل") || title.includes("أسهم") || title.includes("نفط") || title.includes("بنك")) {
    const list = SECTION_DEFAULT_IMAGES.economy!;
    const idx = Math.abs(hashString(article.id || title)) % list.length;
    return list[idx]!;
  }
  if (title.includes("مباراة") || title.includes("ريال") || title.includes("برشلونة") || title.includes("دوري") || title.includes("هدف") || title.includes("كأس") || title.includes("كرة")) {
    const list = SECTION_DEFAULT_IMAGES.sports!;
    const idx = Math.abs(hashString(article.id || title)) % list.length;
    return list[idx]!;
  }
  if (title.includes("مساعدات") || title.includes("إغاث") || title.includes("شاحن") || title.includes("طحين") || title.includes("تكية") || title.includes("إنساني")) {
    const list = SECTION_DEFAULT_IMAGES.aid!;
    const idx = Math.abs(hashString(article.id || title)) % list.length;
    return list[idx]!;
  }
  if (title.includes("وظائف") || title.includes("وظيفة") || title.includes("توظيف") || title.includes("شاغرة") || title.includes("أونروا") || title.includes("شاغر")) {
    const list = SECTION_DEFAULT_IMAGES.jobs!;
    const idx = Math.abs(hashString(article.id || title)) % list.length;
    return list[idx]!;
  }
  if (title.includes("ذكاء") || title.includes("هاتف") || title.includes("آبل") || title.includes("سامسونغ") || title.includes("تقنية") || title.includes("سيبراني")) {
    const list = SECTION_DEFAULT_IMAGES.tech!;
    const idx = Math.abs(hashString(article.id || title)) % list.length;
    return list[idx]!;
  }

  // 3. مطابقة تصنيف القسم
  const sectionKey = (article.sectionSlug || "").toLowerCase();
  const sectionList = SECTION_DEFAULT_IMAGES[sectionKey] || SECTION_DEFAULT_IMAGES.default!;
  
  // اختيار متسق مبني على معرّف المقال لثبات الصورة عبر التحديثات
  const idx = Math.abs(hashString(article.id || title || "awt")) % sectionList.length;
  return sectionList[idx] || SECTION_DEFAULT_IMAGES.default![0]!;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
