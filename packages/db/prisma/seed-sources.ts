import { PrismaClient, SourceType, IngestMethod, DisplayPolicy, ConnectionState } from "@prisma/client";

const prisma = new PrismaClient();

export const VERIFIED_SOURCES = [
  {
    slug: "aljazeera-net",
    nameAr: "الجزيرة نت",
    nameEn: "Al Jazeera Net",
    homepageUrl: "https://www.aljazeera.net",
    countryCode: "QA",
    type: SourceType.CHANNEL,
    method: IngestMethod.RSS,
    feedUrl: "https://www.aljazeera.net/aljazeerarss/a7c6e2fb-b7f7-4228-839f-108a8ff74e14/73d0e1b4-532f-45ef-b135-bfdff8b8cab9",
    sectionHints: ["world", "arab-world", "palestine"],
    pollSeconds: 300,
    displayPolicy: DisplayPolicy.TITLE_ONLY,
    trustLevel: 5,
  },
  {
    slug: "bbc-arabic",
    nameAr: "بي بي سي عربي",
    nameEn: "BBC News Arabic",
    homepageUrl: "https://www.bbc.com/arabic",
    countryCode: "GB",
    type: SourceType.AGENCY,
    method: IngestMethod.RSS,
    feedUrl: "https://feeds.bbci.co.uk/arabic/rss.xml",
    sectionHints: ["world", "arab-world"],
    pollSeconds: 300,
    displayPolicy: DisplayPolicy.TITLE_ONLY,
    trustLevel: 5,
  },
  {
    slug: "rt-arabic",
    nameAr: "روسيا اليوم",
    nameEn: "RT Arabic",
    homepageUrl: "https://arabic.rt.com",
    countryCode: "RU",
    type: SourceType.CHANNEL,
    method: IngestMethod.RSS,
    feedUrl: "https://arabic.rt.com/rss/",
    sectionHints: ["world", "arab-world"],
    pollSeconds: 300,
    displayPolicy: DisplayPolicy.TITLE_ONLY,
    trustLevel: 4,
  },
  {
    slug: "france24-arabic",
    nameAr: "فرانس 24 عربي",
    nameEn: "France 24 Arabic",
    homepageUrl: "https://www.france24.com/ar",
    countryCode: "FR",
    type: SourceType.CHANNEL,
    method: IngestMethod.RSS,
    feedUrl: "https://www.france24.com/ar/rss",
    sectionHints: ["world", "arab-world"],
    pollSeconds: 300,
    displayPolicy: DisplayPolicy.TITLE_ONLY,
    trustLevel: 4,
  },
  {
    slug: "dw-arabic",
    nameAr: "دويتشه فيله (DW)",
    nameEn: "Deutsche Welle Arabic",
    homepageUrl: "https://www.dw.com/ar",
    countryCode: "DE",
    type: SourceType.AGENCY,
    method: IngestMethod.RSS,
    feedUrl: "https://rss.dw.com/rdf/rss-ar-all",
    sectionHints: ["world", "tech"],
    pollSeconds: 300,
    displayPolicy: DisplayPolicy.TITLE_ONLY,
    trustLevel: 4,
  },
  {
    slug: "anadolu-arabic",
    nameAr: "وكالة الأناضول",
    nameEn: "Anadolu Agency Arabic",
    homepageUrl: "https://www.aa.com.tr/ar",
    countryCode: "TR",
    type: SourceType.AGENCY,
    method: IngestMethod.RSS,
    feedUrl: "https://www.aa.com.tr/ar/rss/default?cat=live",
    sectionHints: ["world", "arab-world", "palestine"],
    pollSeconds: 300,
    displayPolicy: DisplayPolicy.TITLE_ONLY,
    trustLevel: 5,
  },
  {
    slug: "safa-ps",
    nameAr: "وكالة الصحافة الفلسطينية (صفا)",
    nameEn: "Safa Palestinian Press Agency",
    homepageUrl: "https://safa.ps",
    countryCode: "PS",
    type: SourceType.AGENCY,
    method: IngestMethod.RSS,
    feedUrl: "https://safa.ps/rss",
    sectionHints: ["palestine", "palestine-gaza", "palestine-west-bank"],
    pollSeconds: 180,
    displayPolicy: DisplayPolicy.EXCERPT,
    trustLevel: 5,
  },
  {
    slug: "maan-news",
    nameAr: "وكالة معاً الإخبارية",
    nameEn: "Maan News Agency",
    homepageUrl: "https://www.maannews.net",
    countryCode: "PS",
    type: SourceType.AGENCY,
    method: IngestMethod.RSS,
    feedUrl: "https://www.maannews.net/rss",
    sectionHints: ["palestine", "palestine-jerusalem", "palestine-west-bank"],
    pollSeconds: 180,
    displayPolicy: DisplayPolicy.EXCERPT,
    trustLevel: 5,
  },
  {
    slug: "quds-network",
    nameAr: "شبكة قدس الإخبارية",
    nameEn: "Quds News Network",
    homepageUrl: "https://qudsn.co",
    countryCode: "PS",
    type: SourceType.NEWSPAPER,
    method: IngestMethod.RSS,
    feedUrl: "https://qudsn.co/feed/",
    sectionHints: ["palestine", "palestine-jerusalem", "palestine-gaza"],
    pollSeconds: 180,
    displayPolicy: DisplayPolicy.EXCERPT,
    trustLevel: 5,
  },
  {
    slug: "cnn-arabic",
    nameAr: "سي إن إن بالعربية",
    nameEn: "CNN Arabic",
    homepageUrl: "https://arabic.cnn.com",
    countryCode: "US",
    type: SourceType.CHANNEL,
    method: IngestMethod.RSS,
    feedUrl: "https://arabic.cnn.com/api/v1/rss/rss.xml",
    sectionHints: ["world", "economy", "tech"],
    pollSeconds: 300,
    displayPolicy: DisplayPolicy.TITLE_ONLY,
    trustLevel: 4,
  },
  {
    slug: "skynews-arabic",
    nameAr: "سكاي نيوز عربية",
    nameEn: "Sky News Arabia",
    homepageUrl: "https://www.skynewsarabia.com",
    countryCode: "AE",
    type: SourceType.CHANNEL,
    method: IngestMethod.RSS,
    feedUrl: "https://www.skynewsarabia.com/rss.xml",
    sectionHints: ["world", "arab-world", "economy"],
    pollSeconds: 180,
    displayPolicy: DisplayPolicy.TITLE_ONLY,
    trustLevel: 4,
  },
  {
    slug: "argaam-economy",
    nameAr: "أرقام الاقتصادية",
    nameEn: "Argaam Financial News",
    homepageUrl: "https://www.argaam.com",
    countryCode: "SA",
    type: SourceType.ECONOMIC,
    method: IngestMethod.RSS,
    feedUrl: "https://www.argaam.com/ar/rss",
    sectionHints: ["economy"],
    pollSeconds: 300,
    displayPolicy: DisplayPolicy.TITLE_ONLY,
    trustLevel: 5,
  },
  {
    slug: "filgoal-sports",
    nameAr: "في الجول (FilGoal)",
    nameEn: "FilGoal Sports",
    homepageUrl: "https://www.filgoal.com",
    countryCode: "EG",
    type: SourceType.SPORTS,
    method: IngestMethod.RSS,
    feedUrl: "https://www.filgoal.com/rss",
    sectionHints: ["sports"],
    pollSeconds: 300,
    displayPolicy: DisplayPolicy.TITLE_ONLY,
    trustLevel: 4,
  },
  {
    slug: "aitnews-tech",
    nameAr: "البوابة العربية للأخبار التقنية",
    nameEn: "AIT News Tech",
    homepageUrl: "https://aitnews.com",
    countryCode: "AE",
    type: SourceType.NEWSPAPER,
    method: IngestMethod.RSS,
    feedUrl: "https://aitnews.com/feed/",
    sectionHints: ["tech"],
    pollSeconds: 600,
    displayPolicy: DisplayPolicy.TITLE_ONLY,
    trustLevel: 5,
  },
];

export async function seedSources() {
  console.log("🚀 جاري إدراج وتحديث المصادر الإخبارية المعتمدة...");

  for (const src of VERIFIED_SOURCES) {
    const existing = await prisma.source.findUnique({
      where: { slug: src.slug },
    });

    if (existing) {
      await prisma.source.update({
        where: { slug: src.slug },
        data: {
          feedUrl: src.feedUrl,
          enabled: true,
          state: ConnectionState.OK,
          nameAr: src.nameAr,
          nameEn: src.nameEn,
          homepageUrl: src.homepageUrl,
          sectionHints: src.sectionHints,
          pollSeconds: src.pollSeconds,
          displayPolicy: src.displayPolicy,
          trustLevel: src.trustLevel,
        },
      });
      console.log(`✓ تم تحديث المصدر: ${src.nameAr}`);
    } else {
      await prisma.source.create({
        data: {
          slug: src.slug,
          nameAr: src.nameAr,
          nameEn: src.nameEn,
          homepageUrl: src.homepageUrl,
          countryCode: src.countryCode,
          type: src.type,
          method: src.method,
          feedUrl: src.feedUrl,
          sectionHints: src.sectionHints,
          pollSeconds: src.pollSeconds,
          displayPolicy: src.displayPolicy,
          trustLevel: src.trustLevel,
          state: ConnectionState.OK,
          enabled: true,
        },
      });
      console.log(`+ تم إنشاء المصدر: ${src.nameAr}`);
    }
  }

  console.log("🎉 اكتمل تسجيل جميع المصادر بنجاح!");
}

if (require.main === module) {
  seedSources()
    .catch((err) => {
      console.error("خطأ أثناء إدراج المصادر:", err);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}

