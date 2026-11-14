import { PrismaClient, Role, SourceType, IngestMethod, DisplayPolicy, ConnectionState, ChannelStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // 1. المسؤول الأساسي
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@alwatantoday.net" },
    update: {},
    create: {
      email: "admin@alwatantoday.net",
      name: "مدير النظام",
      role: Role.ADMIN,
      twoFactorOn: false,
      active: true,
    },
  });
  console.log(`👤 Admin user: ${adminUser.email}`);

  // 2. الأقسام الرئيسية
  const sections = [
    { slug: "palestine", nameAr: "فلسطين", nameEn: "Palestine", sortOrder: 1, showInNav: true },
    { slug: "arab-world", nameAr: "العالم العربي", nameEn: "Arab World", sortOrder: 2, showInNav: true },
    { slug: "world", nameAr: "دولياً", nameEn: "World", sortOrder: 3, showInNav: true },
    { slug: "economy", nameAr: "الاقتصاد", nameEn: "Economy", sortOrder: 4, showInNav: true },
    { slug: "aid", nameAr: "المساعدات", nameEn: "Aid", sortOrder: 5, showInNav: true },
    { slug: "jobs", nameAr: "الوظائف", nameEn: "Jobs", sortOrder: 6, showInNav: true },
    { slug: "sports", nameAr: "الرياضة", nameEn: "Sports", sortOrder: 7, showInNav: true },
    { slug: "tech", nameAr: "التقنية والابتكار", nameEn: "Technology", sortOrder: 8, showInNav: true },
    { slug: "lifestyle", nameAr: "نمط الحياة والصحة", nameEn: "Lifestyle", sortOrder: 9, showInNav: true },
    { slug: "videos", nameAr: "فيديو", nameEn: "Videos", sortOrder: 10, showInNav: false },
    { slug: "opinion", nameAr: "الرأي والتحليل", nameEn: "Opinion", sortOrder: 11, showInNav: false },
    { slug: "society", nameAr: "المجتمع والحياة", nameEn: "Society", sortOrder: 12, showInNav: false },
    { slug: "arts", nameAr: "الفن والمشاهير", nameEn: "Arts", sortOrder: 13, showInNav: false },
    { slug: "cars", nameAr: "السيارات", nameEn: "Cars", sortOrder: 14, showInNav: false },
  ];

  const createdSections: Record<string, string> = {};

  for (const sec of sections) {
    const s = await prisma.section.upsert({
      where: { slug: sec.slug },
      update: { nameAr: sec.nameAr, nameEn: sec.nameEn, sortOrder: sec.sortOrder, showInNav: sec.showInNav },
      create: sec,
    });
    createdSections[sec.slug] = s.id;
  }
  console.log(`📁 Seeded ${sections.length} main sections`);

  // 3. الأقسام الفرعية لفلسطين
  const palestineId = createdSections["palestine"];
  if (palestineId) {
    const palestineSubs = [
      { slug: "gaza", nameAr: "غزة", nameEn: "Gaza", sortOrder: 1 },
      { slug: "west-bank", nameAr: "الضفة الغربية", nameEn: "West Bank", sortOrder: 2 },
      { slug: "jerusalem", nameAr: "القدس", nameEn: "Jerusalem", sortOrder: 3 },
      { slug: "humanitarian", nameAr: "مساعدات وإنسانيات", nameEn: "Humanitarian", sortOrder: 4 },
      { slug: "reconstruction", nameAr: "إعمار", nameEn: "Reconstruction", sortOrder: 5 },
    ];

    for (const sub of palestineSubs) {
      await prisma.section.upsert({
        where: { slug: `palestine-${sub.slug}` },
        update: { nameAr: sub.nameAr, nameEn: sub.nameEn, parentId: palestineId, sortOrder: sub.sortOrder },
        create: {
          slug: `palestine-${sub.slug}`,
          nameAr: sub.nameAr,
          nameEn: sub.nameEn,
          parentId: palestineId,
          sortOrder: sub.sortOrder,
          showInNav: false,
        },
      });
    }
    console.log(`🇵🇸 Seeded Palestine sub-sections`);
  }

  // 4. مصادر الأخبار الأولية
  const initialSources = [
    {
      slug: "aljazeera-net",
      nameAr: "الجزيرة نت",
      nameEn: "Al Jazeera Net",
      homepageUrl: "https://www.aljazeera.net",
      feedUrl: "https://www.aljazeera.net/aljazeerarss/a7c6e2fb-b7f7-4228-839f-108a8ff74e14/73d0e1b4-532f-45ef-b135-bfdff8b8cab9",
      type: SourceType.CHANNEL,
      method: IngestMethod.RSS,
      pollSeconds: 300,
      displayPolicy: DisplayPolicy.TITLE_ONLY,
      allowImages: false,
      trustLevel: 4,
      countryCode: "QA",
    },
    {
      slug: "wafa-ps",
      nameAr: "وكالة الأنباء الفلسطينية (وفا)",
      nameEn: "WAFA Palestinian News Agency",
      homepageUrl: "https://www.wafa.ps",
      feedUrl: "https://www.wafa.ps/ar/Rss",
      type: SourceType.AGENCY,
      method: IngestMethod.RSS,
      pollSeconds: 300,
      displayPolicy: DisplayPolicy.EXCERPT,
      allowImages: false,
      trustLevel: 5,
      countryCode: "PS",
    },
    {
      slug: "bbc-arabic",
      nameAr: "بي بي سي عربي",
      nameEn: "BBC News Arabic",
      homepageUrl: "https://www.bbc.com/arabic",
      feedUrl: "https://feeds.bbci.co.uk/arabic/rss.xml",
      type: SourceType.AGENCY,
      method: IngestMethod.RSS,
      pollSeconds: 600,
      displayPolicy: DisplayPolicy.TITLE_ONLY,
      allowImages: false,
      trustLevel: 4,
      countryCode: "GB",
    },
  ];

  for (const src of initialSources) {
    await prisma.source.upsert({
      where: { slug: src.slug },
      update: src,
      create: {
        ...src,
        state: ConnectionState.OK,
        enabled: true,
      },
    });
  }
  console.log(`📡 Seeded initial news sources`);

  // 5. المؤشرات الاقتصادية المبدئية
  const instruments = [
    { symbol: "BRENT", nameAr: "نفط برنت", nameEn: "Brent Crude", category: "energy", unit: "برميل", currency: "USD", providerKey: "mock" },
    { symbol: "XAUUSD", nameAr: "الذهب عالمياً", nameEn: "Gold Ounce", category: "metals", unit: "أونصة", currency: "USD", providerKey: "mock" },
    { symbol: "USDILS", nameAr: "دولار / شيكل", nameEn: "USD to ILS", category: "fx", unit: "1 USD", currency: "ILS", providerKey: "mock" },
    { symbol: "EURUSD", nameAr: "يورو / دولار", nameEn: "EUR to USD", category: "fx", unit: "1 EUR", currency: "USD", providerKey: "mock" },
    { symbol: "BTCUSD", nameAr: "بيتكوين", nameEn: "Bitcoin", category: "crypto", unit: "1 BTC", currency: "USD", providerKey: "mock" },
  ];

  for (const inst of instruments) {
    await prisma.instrument.upsert({
      where: { symbol: inst.symbol },
      update: inst,
      create: {
        ...inst,
        enabled: true,
      },
    });
  }
  console.log(`📈 Seeded financial instruments`);

  // 6. قنوات البث الحي التمهيدية
  const channels = [
    {
      slug: "aljazeera",
      nameAr: "قناة الجزيرة الإخبارية",
      nameEn: "Al Jazeera TV",
      category: "arabic",
      countryCode: "QA",
      descriptionAr: "البث الحي لقناة الجزيرة الإخبارية من قطر",
      officialSiteUrl: "https://www.aljazeera.net/live",
      embedAllowed: false,
      status: ChannelStatus.AVAILABLE,
    },
    {
      slug: "alarabiya",
      nameAr: "قناة العربية",
      nameEn: "Al Arabiya",
      category: "arabic",
      countryCode: "SA",
      descriptionAr: "البث الحي لقناة العربية الإخبارية",
      officialSiteUrl: "https://www.alarabiya.net/live-stream",
      embedAllowed: false,
      status: ChannelStatus.AVAILABLE,
    },
  ];

  for (const ch of channels) {
    await prisma.channel.upsert({
      where: { slug: ch.slug },
      update: ch,
      create: ch,
    });
  }
  console.log(`📺 Seeded initial live channels`);

  // 7. سياسة النشر الافتراضية
  await prisma.publishPolicy.upsert({
    where: { id: "default-policy" },
    update: {},
    create: {
      id: "default-policy",
      name: "سياسة النشر القياسية",
      enabled: true,
      rules: {
        autoPublishMinConfidence: 0.85,
        autoPublishMinTrustLevel: 3,
        autoPublishAllowedPolicies: ["TITLE_ONLY", "EXCERPT", "SUMMARY"],
        sensitiveCategoriesForceReview: ["casualties", "accusations", "war_crimes", "financial_advice"],
        maxTitleLength: 150,
      },
    },
  });
  console.log(`⚖️ Default publish policy set`);

  console.log("✅ Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

