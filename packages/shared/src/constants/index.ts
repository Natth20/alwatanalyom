export const BRAND_COLORS = {
  // اللون الأساسي للهوية والخلفيات الملكية (60%)
  maroon: "#590018",
  maroonDeep: "#3D0010",
  maroonDarkest: "#26000A",
  maroonGlow: "rgba(89, 0, 24, 0.35)",

  // الذهبي / الأصفر الملكي للعناوين والأيقونات وإبراز المهم (10%)
  gold: "#F5B900",
  goldHover: "#DCA600",
  goldLight: "#FFF7D6",
  goldGlow: "rgba(245, 185, 0, 0.3)",

  // الأبيض الصريح للنصوص وسهولة القراءة (25%)
  white: "#FFFFFF",

  // الألوان المساعدة والتفاصيل (5%)
  beige: "#D9C6A3",
  beigeAlt: "#D9BFA0",
  navy: "#0F2A44",
  navyAlt: "#263B52",
  silverGray: "#E4E7EB",
  silverGrayAlt: "#C9D2DC",

  // الأحداث العاجلة والنبض
  coralRed: "#E84A5F",
  breakingRed: "#E84A5F",
} as const;

export const SITE_SECTIONS = [
  { slug: "palestine", nameAr: "فلسطين", nameEn: "Palestine", order: 1, showInNav: true },
  { slug: "arab-world", nameAr: "العالم العربي", nameEn: "Arab World", order: 2, showInNav: true },
  { slug: "world", nameAr: "دولياً", nameEn: "World", order: 3, showInNav: true },
  { slug: "economy", nameAr: "الاقتصاد", nameEn: "Economy", order: 4, showInNav: true },
  { slug: "aid", nameAr: "المساعدات", nameEn: "Aid", order: 5, showInNav: true },
  { slug: "jobs", nameAr: "الوظائف", nameEn: "Jobs", order: 6, showInNav: true },
  { slug: "sports", nameAr: "الرياضة", nameEn: "Sports", order: 7, showInNav: true },
  { slug: "tech", nameAr: "التقنية والابتكار", nameEn: "Tech", order: 8, showInNav: true },
  { slug: "lifestyle", nameAr: "نمط الحياة والصحة", nameEn: "Lifestyle", order: 9, showInNav: true },
  { slug: "videos", nameAr: "فيديو", nameEn: "Videos", order: 10, showInNav: false },
  { slug: "opinion", nameAr: "الرأي والتحليل", nameEn: "Opinion", order: 11, showInNav: false },
  { slug: "society", nameAr: "المجتمع والحياة", nameEn: "Society", order: 12, showInNav: false },
  { slug: "arts", nameAr: "الفن والمشاهير", nameEn: "Arts", order: 13, showInNav: false },
  { slug: "cars", nameAr: "السيارات", nameEn: "Cars", order: 14, showInNav: false },
] as const;

export const PALESTINE_SUBSECTIONS = [
  { slug: "gaza", nameAr: "غزة" },
  { slug: "west-bank", nameAr: "الضفة الغربية" },
  { slug: "jerusalem", nameAr: "القدس" },
  { slug: "humanitarian", nameAr: "مساعدات وإنسانيات" },
  { slug: "reconstruction", nameAr: "إعمار" },
  { slug: "affairs", nameAr: "شؤون سياسية" },
  { slug: "economy", nameAr: "اقتصاد فلسطين" },
] as const;

/**
 * خريطة تحويل مسارات وتصنيفات الموقع القديم (WordPress) إلى الجديد (Next.js)
 */
export const LEGACY_CATEGORY_REDIRECT_MAP: Record<string, string> = {
  // التصنيفات العربية القديمة
  "أخبار-اليوم": "/palestine",
  "اخبار-اليوم": "/palestine",
  "فيديوهات-اليوم": "/videos",
  "اقتصاد-اليوم": "/economy",
  "الملاعب-اليوم": "/sports",
  "مساعدات-اليوم": "/aid",
  "ستايل-اليوم": "/lifestyle",
  "مشاهير-اليوم": "/arts",
  "المجتمع-اليوم": "/society",
  "الفهرس-اليوم": "/jobs",
  "تكنولوجيا-اليوم": "/tech",

  // الترميز الإنجليزي أو اللاتيني المحتمل لووردبريس
  "akhbar-alyom": "/palestine",
  "videos-alyom": "/videos",
  "eqtisad-alyom": "/economy",
  "al-malaeb-alyom": "/sports",
  "mosaadat-alyom": "/aid",
  "style-alyom": "/lifestyle",
  "mashahir-alyom": "/arts",
  "al-mujtama-alyom": "/society",
  "al-fehrs-alyom": "/jobs",
  "technology-alyom": "/tech",
};

/**
 * حسابات التواصل الاجتماعي الرسمية للمنصة المستخلصة من الموقع السابق
 */
export const OFFICIAL_SOCIAL_LINKS = {
  facebook: "https://facebook.com/alwatanalyoum1",
  twitter: "https://x.com/alwatanalyawm5",
  instagram: "https://instagram.com/alwatan.sport",
  telegram: "https://t.me/alwatanalyawm",
  youtube: "https://youtube.com/@alwatantodaynet",
  tumblr: "https://alwatanalyawm.tumblr.com",
} as const;

/**
 * معرفات التتبع الرسمية
 */
export const TRACKING_IDS = {
  gtm: "GTM-WJ6X5PD",
  siteName: "الوطن اليوم",
} as const;
