import { ArticleCard, StorySummary, InstrumentQuote, ChannelCard, SITE_SECTIONS, PALESTINE_SUBSECTIONS } from "@awt/shared";

const now = new Date();
const isoNow = now.toISOString();

export const MOCK_BREAKING: ArticleCard[] = [
  {
    id: "mock-brk-1",
    slug: "صفارات-الانذار-تدوي-في-الجليل-الاعلى",
    titleAr: "صفارات الإنذار تدوي في الجليل الأعلى بعد رصد مسيرات وصواريخ",
    titleOriginal: "Sirens sound in Upper Galilee following rocket fire",
    summaryAr: "دوت صفارات الإنذار في عدة بلدات في الجليل الأعلى وسط أنباء عن اعتراض صواريخ ومسيرات أطلقت من جنوب لبنان.",
    kind: "NEWS",
    publishedAt: isoNow,
    displayPolicy: "LICENSED_FULL",
    isBreaking: true,
    sectionSlug: "palestine",
    sectionNameAr: "فلسطين",
    source: {
      id: "src-jazeera",
      slug: "aljazeera-net",
      nameAr: "الجزيرة نت",
      logoUrl: null,
      homepageUrl: "https://www.aljazeera.net",
    },
  },
  {
    id: "mock-brk-2",
    slug: "اسعار-الذهب-تقفز-لمستويات-قياسية",
    titleAr: "أسعار الذهب تسجل مستوى قياسياً جديداً مع تراجع عوائد السندات",
    titleOriginal: "Gold prices hit fresh record high amid bond yields drop",
    summaryAr: "سجلت أونصة الذهب ارتفاعاً ملحوظاً متجاوزة 2740 دولاراً للأونصة وسط طلب قوي على الملاذات الآمنة.",
    kind: "NEWS",
    publishedAt: isoNow,
    displayPolicy: "LICENSED_FULL",
    isBreaking: true,
    sectionSlug: "economy",
    sectionNameAr: "الاقتصاد",
    source: {
      id: "src-wafa",
      slug: "wafa-ps",
      nameAr: "وكالة الأنباء الفلسطينية (وفا)",
      logoUrl: null,
      homepageUrl: "https://www.wafa.ps",
    },
  },
];

export const MOCK_QUOTES: InstrumentQuote[] = [
  {
    symbol: "BRENT",
    nameAr: "نفط برنت",
    nameEn: "Brent Crude",
    category: "energy",
    price: "74.85",
    change: "+1.20",
    changePct: "+1.63%",
    unit: "برميل",
    currency: "USD",
    status: "LIVE",
    asOf: isoNow,
    provider: "TwelveData Live",
  },
  {
    symbol: "XAUUSD",
    nameAr: "الذهب عالمياً",
    nameEn: "Gold Ounce",
    category: "metals",
    price: "2735.40",
    change: "+18.50",
    changePct: "+0.68%",
    unit: "أونصة",
    currency: "USD",
    status: "LIVE",
    asOf: isoNow,
    provider: "TwelveData Live",
  },
  {
    symbol: "USDILS",
    nameAr: "دولار / شيكل",
    nameEn: "USD to ILS",
    category: "fx",
    price: "3.745",
    change: "-0.015",
    changePct: "-0.40%",
    unit: "1 USD",
    currency: "ILS",
    status: "LIVE",
    asOf: isoNow,
    provider: "PMA Palestine",
  },
  {
    symbol: "EURUSD",
    nameAr: "يورو / دولار",
    nameEn: "EUR to USD",
    category: "fx",
    price: "1.082",
    change: "+0.003",
    changePct: "+0.28%",
    unit: "1 EUR",
    currency: "USD",
    status: "LIVE",
    asOf: isoNow,
    provider: "Forex Live",
  },
  {
    symbol: "BTCUSD",
    nameAr: "بيتكوين",
    nameEn: "Bitcoin",
    category: "crypto",
    price: "68240.00",
    change: "+1420.00",
    changePct: "+2.12%",
    unit: "1 BTC",
    currency: "USD",
    status: "LIVE",
    asOf: isoNow,
    provider: "CoinGecko",
  },
];

export const MOCK_CHANNELS: ChannelCard[] = [
  {
    id: "ch-1",
    slug: "aljazeera",
    nameAr: "قناة الجزيرة الإخبارية",
    nameEn: "Al Jazeera News",
    category: "arabic",
    countryCode: "QA",
    lang: "AR",
    descriptionAr: "البث الحي لقناة الجزيرة الإخبارية من قطر على مدار الساعة.",
    officialSiteUrl: "https://www.aljazeera.net/live",
    embedAllowed: false,
    status: "AVAILABLE",
  },
  {
    id: "ch-2",
    slug: "alaraby",
    nameAr: "التلفزيون العربي الإخباري",
    nameEn: "Al Araby TV",
    category: "arabic",
    countryCode: "QA",
    lang: "AR",
    descriptionAr: "تغطية إخبارية شاملة للأحداث في غزة والمنطقة العربية.",
    officialSiteUrl: "https://www.alaraby.com/live",
    embedAllowed: false,
    status: "AVAILABLE",
  },
  {
    id: "ch-3",
    slug: "bbc-arabic",
    nameAr: "بي بي سي عربي الإخبارية",
    nameEn: "BBC Arabic TV",
    category: "international",
    countryCode: "GB",
    lang: "AR",
    descriptionAr: "البث المباشر لقناة بي بي سي عربي من لندن بروابط رسمية معتمدة.",
    officialSiteUrl: "https://www.bbc.com/arabic/live",
    embedAllowed: false,
    status: "AVAILABLE",
  },
  {
    id: "ch-4",
    slug: "france24-ar",
    nameAr: "فرانس 24 عربي",
    nameEn: "France 24 Arabic",
    category: "international",
    countryCode: "FR",
    lang: "AR",
    descriptionAr: "البث المباشر لقناة فرانس 24 بالعربية بمصادرها الرسمية.",
    officialSiteUrl: "https://www.france24.com/ar/live",
    embedAllowed: false,
    status: "AVAILABLE",
  },
];

export const MOCK_HERO_STORY: StorySummary = {
  id: "story-gaza-hero",
  slug: "تطورات-العدوان-على-غزة-وصمود-شمال-القطاع",
  headlineAr: "غزة تحت القصف المكثف: صمود أسطوري في شمال القطاع ومنظومة الصحة تحذر من كارثة",
  summaryAr: "تواصل قوات الاحتلال الإسرائيلي محاصرة مستشفيات شمال غزة وقصف الأحياء السكنية في جباليا وبيت لاهيا، وسط مناشدات عاجلة لإدخال الوقود والمستلزمات الطبية.",
  importance: 10,
  trendingScore: 95,
  pinned: true,
  firstSeenAt: isoNow,
  lastUpdatedAt: isoNow,
  sectionSlug: "palestine",
  coverageCount: 4,
  sources: [
    { id: "s1", slug: "wafa-ps", nameAr: "وكالة وفا", logoUrl: null, homepageUrl: "https://www.wafa.ps" },
    { id: "s2", slug: "aljazeera-net", nameAr: "الجزيرة نت", logoUrl: null, homepageUrl: "https://www.aljazeera.net" },
    { id: "s3", slug: "shehab", nameAr: "وكالة شهاب", logoUrl: null, homepageUrl: "https://shehabnews.com" },
  ],
  articles: [
    {
      id: "art-hero-1",
      slug: "استمرار-حصار-مستشفى-كمال-عدوان-في-شمال-غزة",
      titleAr: "استمرار حصار مستشفى كمال عدوان ومناشدات دولية لإنقاذ الجرحى والطواقم الطبية",
      titleOriginal: "Besieged Kamal Adwan Hospital in Northern Gaza warns of total collapse",
      summaryAr: "حذرت إدارة مستشفى كمال عدوان في شمال قطاع غزة من خروج المرفق الطبي بالكامل عن الخدمة جراء الحصار المتواصل ونفاد الأوكسجين والمستلزمات الأساسية.",
      kind: "NEWS",
      publishedAt: isoNow,
      displayPolicy: "LICENSED_FULL",
      isBreaking: true,
      sectionSlug: "palestine",
      sectionNameAr: "فلسطين",
      source: {
        id: "s1",
        slug: "wafa-ps",
        nameAr: "وكالة وفا",
        logoUrl: null,
        homepageUrl: "https://www.wafa.ps",
      },
    },
    {
      id: "art-hero-2",
      slug: "شهداء-وجرحى-في-قصف-مدفعي-على-مخيم-جباليا",
      titleAr: "استشهاد وجرح العشرات في قصف مدفعي استهدف مراكز الإيواء في جباليا",
      titleOriginal: "Casualties reported in artillery strikes hitting shelter centres in Jabalia",
      summaryAr: "استهدفت مدفعية الاحتلال مراكز تؤوي آلاف النازحين في مخيم جباليا مما أسفر عن ارتقاء عدد من الشهداء وإصابة العشرات بجروح خطيرة.",
      kind: "NEWS",
      publishedAt: isoNow,
      displayPolicy: "LICENSED_FULL",
      isBreaking: false,
      sectionSlug: "palestine",
      sectionNameAr: "فلسطين",
      source: {
        id: "s2",
        slug: "aljazeera-net",
        nameAr: "الجزيرة نت",
        logoUrl: null,
        homepageUrl: "https://www.aljazeera.net",
      },
    },
  ],
};

export const MOCK_PALESTINE_STORIES: StorySummary[] = [
  {
    id: "story-pal-1",
    slug: "اقتحامات-مستمرة-في-الضفة-الغربية-وجنين",
    headlineAr: "اشتباكات مسلحة واقتحامات واسعة لقوات الاحتلال في جنين ومخيمها",
    summaryAr: "اندلعت اشتباكات عنيفة فجر اليوم عقب اقتحام آليات الاحتلال العسكرية لمدينة جنين ومخيمها وتدمير البنية التحتية.",
    importance: 8,
    trendingScore: 78,
    pinned: false,
    firstSeenAt: isoNow,
    lastUpdatedAt: isoNow,
    sectionSlug: "palestine",
    coverageCount: 3,
    sources: [{ id: "s1", slug: "wafa-ps", nameAr: "وكالة وفا", logoUrl: null, homepageUrl: "https://www.wafa.ps" }],
    articles: [
      {
        id: "art-pal-1",
        slug: "اشتباكات-عنيفة-في-جنين-وتدمير-البنية-التحتية",
        titleAr: "اشتباكات مسلحة وتجريف واسع لشوارع جنين ومخيمها وسط تصدي المقاومين",
        titleOriginal: null,
        summaryAr: "جرفت جرافات الاحتلال شوارع رئيسية في جنين ودمرت شبكات المياه والكهرباء وسط إطلاق نار كثيف.",
        kind: "NEWS",
        publishedAt: isoNow,
        displayPolicy: "LICENSED_FULL",
        isBreaking: false,
        sectionSlug: "palestine",
        sectionNameAr: "فلسطين",
        source: { id: "s1", slug: "wafa-ps", nameAr: "وكالة وفا", logoUrl: null, homepageUrl: "https://www.wafa.ps" },
      },
    ],
  },
  {
    id: "story-pal-2",
    slug: "مستعمرون-يقتحمون-باحات-المسجد-الاقصى",
    headlineAr: "عشرات المستعمرين يقتحمون باحات المسجد الأقصى المبارك بحماية شرطة الاحتلال",
    summaryAr: "أدى مقتحمون طقوساً تلمودية في باحات الأقصى في وقت فرضت فيه قوات الاحتلال قيوداً مشددة على دخول المصلين.",
    importance: 8,
    trendingScore: 72,
    pinned: false,
    firstSeenAt: isoNow,
    lastUpdatedAt: isoNow,
    sectionSlug: "palestine",
    coverageCount: 2,
    sources: [{ id: "s2", slug: "aljazeera-net", nameAr: "الجزيرة نت", logoUrl: null, homepageUrl: "https://www.aljazeera.net" }],
    articles: [
      {
        id: "art-pal-2",
        slug: "اقتحام-باحات-المسجد-الاقصى-بحماية-الاحتلال",
        titleAr: "مستعمرون يقتحمون باحات الأقصى المبارك ويؤدون جولات استفزازية",
        titleOriginal: null,
        summaryAr: "شهد المسجد الأقصى المبارك اقتحامات جديدة وسط إغلاق لعدد من أبواب البلدة القديمة في القدس المحتلة.",
        kind: "NEWS",
        publishedAt: isoNow,
        displayPolicy: "LICENSED_FULL",
        isBreaking: false,
        sectionSlug: "palestine",
        sectionNameAr: "فلسطين",
        source: { id: "s2", slug: "aljazeera-net", nameAr: "الجزيرة نت", logoUrl: null, homepageUrl: "https://www.aljazeera.net" },
      },
    ],
  },
];

export interface ArticleDetail {
  id: string;
  slug: string;
  titleAr: string;
  titleOriginal: string | null;
  summaryAr: string | null;
  bodyHtml: string | null;
  kind: string;
  status: string;
  displayPolicy: string;
  translatedBy: string | null;
  sourceUrl: string | null;
  publishedAt: string;
  sourcePublishedAt?: string | null;
  updatedAtPub?: string | null;
  withdrawnReason?: string | null;
  isBreaking: boolean;
  section: {
    id: string;
    slug: string;
    nameAr: string;
  };
  source: {
    id: string;
    slug: string;
    nameAr: string;
    logoUrl: string | null;
    homepageUrl: string;
  } | null;
  author: {
    id?: string;
    nameAr: string;
    slug: string;
  } | null;
  tags: { id: string; nameAr: string; slug: string }[];
  countries: string[];
  corrections: { id: string; note: string; createdAt: string | Date }[];
  otherCoverages: {
    id: string;
    slug: string;
    titleAr: string;
    publishedAt: string;
    sourceNameAr: string;
    sourceUrl: string | null;
  }[];
  sportsLinks?: any[];
}

export const MOCK_SECTION_ARTICLES = {
  arabWorld: [
    {
      id: "art-arab-1",
      slug: "قمة-عربية-طارئة-لبحث-وقف-اطلاق-النار",
      titleAr: "مشاورات دبلوماسية مكثفة لعقد قمة عربية طارئة لبحث وقف العدوان على غزة ولبنان",
      titleOriginal: null,
      summaryAr: "تتسارع الاتصالات الدبلوماسية بين العواصم العربية لتنسيق موقف موحد يطالب مجلس الأمن الدولي بفرض وقف فوري لإطلاق النار.",
      kind: "NEWS" as const,
      publishedAt: isoNow,
      displayPolicy: "LICENSED_FULL" as const,
      isBreaking: false,
      sectionSlug: "arab-world",
      sectionNameAr: "العالم العربي",
      source: { id: "s1", slug: "aljazeera-net", nameAr: "الجزيرة نت", logoUrl: null, homepageUrl: "https://www.aljazeera.net" },
    },
    {
      id: "art-arab-2",
      slug: "مساعدات-انسانية-عربية-تصل-بيروت",
      titleAr: "جسر جوي عربي لنقل المساعدات الطبية والإغاثية العاجلة إلى مطار بيروت",
      titleOriginal: null,
      summaryAr: "وصلت طائرات إغاثة تحمل أطناناً من الأدوية والمواد الغذائية لدعم النازحين في مختلف المناطق اللبنانية.",
      kind: "NEWS" as const,
      publishedAt: isoNow,
      displayPolicy: "LICENSED_FULL" as const,
      isBreaking: false,
      sectionSlug: "arab-world",
      sectionNameAr: "العالم العربي",
      source: { id: "s2", slug: "wafa-ps", nameAr: "وكالة وفا", logoUrl: null, homepageUrl: "https://www.wafa.ps" },
    },
  ],
  world: [
    {
      id: "art-world-1",
      slug: "محكمة-العدل-الدولية-تستمع-لمرافعات-جديدة",
      titleAr: "محكمة العدل الدولية: جلسات استماع جديدة حول الإبادة الجماعية ومسؤولية الدول الداعمة",
      titleOriginal: "ICJ hearings on genocide and state responsibilities",
      summaryAr: "تواصل المحكمة مداولاتها بشأن التدابير الاحترازية الإلزامية لوقف الممارسات الإجرامية بحق المدنيين في قطاع غزة.",
      kind: "ANALYSIS" as const,
      publishedAt: isoNow,
      displayPolicy: "LICENSED_FULL" as const,
      isBreaking: false,
      sectionSlug: "world",
      sectionNameAr: "دولياً",
      source: { id: "s3", slug: "bbc-arabic", nameAr: "بي بي سي عربي", logoUrl: null, homepageUrl: "https://www.bbc.com/arabic" },
    },
  ],
  economy: [
    {
      id: "art-econ-1",
      slug: "تذبذب-اسعار-النفط-وسط-توترات-الشرق-الاوسط",
      titleAr: "خام برنت يقترب من 75 دولاراً للبرميل وسط ترقب الأسواق لردود الفعل الإقليمية",
      titleOriginal: "Brent crude nears $75 on Middle East geopolitical tensions",
      summaryAr: "تتأرجح أسعار النفط العالمية بين مخاوف تباطؤ الطلب الصيني وتصاعد التوترات الجيوسياسية في مضيق هرمز وباب المندب.",
      kind: "NEWS" as const,
      publishedAt: isoNow,
      displayPolicy: "LICENSED_FULL" as const,
      isBreaking: false,
      sectionSlug: "economy",
      sectionNameAr: "الاقتصاد",
      source: { id: "s1", slug: "aljazeera-net", nameAr: "الجزيرة نت", logoUrl: null, homepageUrl: "https://www.aljazeera.net" },
    },
  ],
  tech: [
    {
      id: "art-tech-1",
      slug: "ثورة-الذكاء-الاصطناعي-التوليدي-في-الصحافة",
      titleAr: "كيف يعيد الذكاء الاصطناعي رسم غرف الأخبار دون المساس بمصداقية المصادر؟",
      titleOriginal: "How Generative AI is reshaping newsrooms while protecting source integrity",
      summaryAr: "تقرير يرصد تجارب المنصات الإخبارية الرائدة في استخدام نماذج اللغة الكبيرة لمساعدة المحررين وفرز الخلاصات دون نسخ المحتوى الأصلي.",
      kind: "ANALYSIS" as const,
      publishedAt: isoNow,
      displayPolicy: "LICENSED_FULL" as const,
      isBreaking: false,
      sectionSlug: "tech",
      sectionNameAr: "التقنية والابتكار",
      source: { id: "s1", slug: "alwatantoday", nameAr: "محرر الوطن اليوم", logoUrl: null, homepageUrl: "https://alwatantoday.net" },
    },
  ],
  sports: [
    {
      id: "art-sports-1",
      slug: "دوري-ابطال-اوروبا-مباريات-حاسمة-الليلة",
      titleAr: "دوري أبطال أوروبا: ريال مدريد وبرشلونة ومانشستر سيتي في مواجهات ملتهبة الليلة",
      titleOriginal: "Champions League: decisive clashes tonight",
      summaryAr: "تنطلق الليلة الجولة المرتقبة من دوري أبطال أوروبا وسط تنافس محتدم على صدارة المجموعة.",
      kind: "NEWS" as const,
      publishedAt: isoNow,
      displayPolicy: "LICENSED_FULL" as const,
      isBreaking: false,
      sectionSlug: "sports",
      sectionNameAr: "الرياضة",
      source: { id: "s2", slug: "yallasport", nameAr: "يلا سبورت", logoUrl: null, homepageUrl: "https://yallasport.com" },
    },
  ],
};

export function getMockArticleById(id: string): ArticleDetail {
  return {
    id,
    slug: "استمرار-حصار-مستشفى-كمال-عدوان-في-شمال-غزة",
    titleAr: "استمرار حصار مستشفى كمال عدوان ومناشدات دولية لإنقاذ الجرحى والطواقم الطبية في شمال غزة",
    titleOriginal: "Besieged Kamal Adwan Hospital in Northern Gaza warns of total collapse",
    summaryAr: "حذرت وزارة الصحة وإدارة مستشفى كمال عدوان في شمال قطاع غزة من خروج المرفق الطبي بالكامل عن الخدمة جراء الحصار المتواصل ونفاد الأوكسجين والمستلزمات الأساسية، مع منع وصول مركبات الإسعاف.",
    bodyHtml: `
      <p>أكدت مصادر طبية فلسطينية أن قوات الاحتلال الإسرائيلي تواصل فرض حصار خانق ومطبق على مستشفى كمال عدوان في بلدة بيت لاهيا شمال قطاع غزة، مع استهداف مباشر للمباني ومحطات توليد الطاقة والأكسجين.</p>
      <h3>شهادات من داخل المرفق الطبي</h3>
      <p>وأفاد مدير المستشفى بأن الطواقم الطبية تجري العمليات الجراحية للمصابين في ظروف قاسية للغاية وبأبسط الأدوات المتوفرة ودون تخدير في بعض الأحيان، مناشداً الصليب الأحمر الدولي ومنظمة الصحة العالمية التدخل العاجل لفتح ممر إنساني آمن لإجلاء الحالات الحرجة.</p>
      <blockquote>"المستشفى يضم عشرات الأطفال الخدج والمصابين بحروق وإصابات بالغة، وتوقف المولدات الكهربائية يعني حكماً بالإعدام على من تبقى على قيد الحياة."</blockquote>
      <p>وتشير المعطيات الميدانية إلى أن مناطق شمال قطاع غزة تخضع لعملية تهجير قسري وتجويع ممنهج منذ أكثر من ثلاثة أسابيع، حيث تم تدمير آبار المياه ومحطات ضخ الصرف الصحي، في محاولة لعزل المنطقة بالكامل.</p>
    `,
    kind: "NEWS",
    status: "PUBLISHED",
    displayPolicy: "LICENSED_FULL",
    translatedBy: "human",
    sourceUrl: "https://www.wafa.ps/Pages/Details/102941",
    publishedAt: isoNow,
    sourcePublishedAt: isoNow,
    updatedAtPub: isoNow,
    withdrawnReason: null,
    isBreaking: true,
    section: {
      id: "sec-pal",
      slug: "palestine",
      nameAr: "فلسطين",
    },
    source: {
      id: "src-wafa",
      slug: "wafa-ps",
      nameAr: "وكالة الأنباء الفلسطينية (وفا)",
      logoUrl: null,
      homepageUrl: "https://www.wafa.ps",
    },
    author: {
      id: "auth-1",
      nameAr: "محرر التغطية الميدانية",
      slug: "field-editor",
    },
    tags: [
      { id: "t1", nameAr: "غزة", slug: "gaza" },
      { id: "t2", nameAr: "شمال غزة", slug: "north-gaza" },
      { id: "t3", nameAr: "كمال عدوان", slug: "kamal-adwan" },
      { id: "t4", nameAr: "وزارة الصحة", slug: "moh" },
      { id: "t5", nameAr: "حصار", slug: "siege" },
    ],
    countries: ["فلسطين"],
    corrections: [],
    otherCoverages: [
      {
        id: "art-hero-2",
        slug: "شهداء-وجرحى-في-قصف-مدفعي-على-مخيم-جباليا",
        titleAr: "استشهاد وجرح العشرات في قصف مدفعي استهدف مراكز الإيواء في جباليا",
        publishedAt: isoNow,
        sourceNameAr: "الجزيرة نت",
        sourceUrl: "https://www.aljazeera.net",
      },
    ],
    sportsLinks: [],
  };
}

export function getMockSectionFeed(sectionSlug: string, subSlug?: string) {
  const secMeta = SITE_SECTIONS.find((s) => s.slug === sectionSlug);
  if (!secMeta) {
    return null;
  }

  const children =
    sectionSlug === "palestine"
      ? PALESTINE_SUBSECTIONS.map((sub, idx) => ({
          id: `sub-${idx}`,
          slug: sub.slug,
          nameAr: sub.nameAr,
        }))
      : [];

  let articles: ArticleCard[] = [];
  if (sectionSlug === "palestine") {
    articles = [
      ...MOCK_HERO_STORY.articles,
      ...MOCK_PALESTINE_STORIES.flatMap((s) => s.articles),
    ];
  } else if (sectionSlug === "arab-world") {
    articles = MOCK_SECTION_ARTICLES.arabWorld;
  } else if (sectionSlug === "world") {
    articles = MOCK_SECTION_ARTICLES.world;
  } else if (sectionSlug === "economy") {
    articles = MOCK_SECTION_ARTICLES.economy;
  } else if (sectionSlug === "tech") {
    articles = MOCK_SECTION_ARTICLES.tech;
  } else if (sectionSlug === "sports") {
    articles = MOCK_SECTION_ARTICLES.sports;
  } else {
    articles = [
      {
        id: `mock-${sectionSlug}-1`,
        slug: `تغطية-شاملة-لقسم-${sectionSlug}`,
        titleAr: `تغطية خاصة ومستجدات قسم ${secMeta.nameAr} — متابعة مستمرة على مدار الساعة`,
        titleOriginal: `Comprehensive coverage on ${secMeta.nameEn}`,
        summaryAr: `رصد شامل وتحليلات دقيقة لأهم الأحداث والتطورات المتعلقة بقسم ${secMeta.nameAr} من مختلف المصادر والوكالات الإخبارية المعتمدة.`,
        kind: "NEWS",
        publishedAt: isoNow,
        displayPolicy: "LICENSED_FULL",
        isBreaking: false,
        sectionSlug: secMeta.slug,
        sectionNameAr: secMeta.nameAr,
        source: {
          id: "src-wafa",
          slug: "wafa-ps",
          nameAr: "الوطن اليوم",
          logoUrl: null,
          homepageUrl: "https://alwatantoday.net",
        },
      },
    ];
  }

  return {
    section: {
      id: `sec-${secMeta.slug}`,
      slug: secMeta.slug,
      nameAr: secMeta.nameAr,
      nameEn: secMeta.nameEn,
      descriptionAr: `تغطية شاملة ومباشرة لكافة أخبار وتقارير ومستجدات ${secMeta.nameAr} وفق أعلى معايير الدقة والنزاهة الصحفية.`,
      children,
    },
    articles,
    nextCursor: null,
  };
}

export function getMockStoryById(id: string) {
  const allStories = [MOCK_HERO_STORY, ...MOCK_PALESTINE_STORIES];
  const found = allStories.find((s) => s.id === id) || MOCK_HERO_STORY;

  return {
    id: found.id,
    slug: found.slug,
    headlineAr: found.headlineAr,
    summaryAr: found.summaryAr,
    importance: found.importance,
    trendingScore: found.trendingScore,
    firstSeenAt: found.firstSeenAt,
    lastUpdatedAt: found.lastUpdatedAt,
    section: { slug: found.sectionSlug, nameAr: "فلسطين" },
    articles: found.articles.map((a) => ({
      id: a.id,
      slug: a.slug,
      titleAr: a.titleAr,
      titleOriginal: a.titleOriginal,
      summaryAr: a.summaryAr,
      publishedAt: a.publishedAt,
      sourceUrl: "https://www.wafa.ps",
      displayPolicy: "LICENSED_FULL",
      source: a.source,
    })),
  };
}
