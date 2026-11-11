import { prisma } from "../src/index";
import path from "node:path";

// تحميل ملف .env من جذر المشروع
try {
  process.loadEnvFile(path.resolve(__dirname, "../../../.env"));
} catch {}

async function main() {
  await prisma.adCampaign.upsert({
    where: { id: "sample-header-ad" },
    update: {},
    create: {
      id: "sample-header-ad",
      name: "رعاية رئيسية - بنك فلسطين",
      type: "CUSTOM_BANNER",
      position: "HEADER_TOP_LEADERBOARD",
      clientName: "بنك فلسطين",
      imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop",
      targetUrl: "https://www.bankofpalestine.com",
      altText: "بنك فلسطين - أول بنك وطني",
      enabled: true,
      impressions: 1420,
      clicks: 86,
    },
  });

  await prisma.adCampaign.upsert({
    where: { id: "sample-breaking-sponsor" },
    update: {},
    create: {
      id: "sample-breaking-sponsor",
      name: "راعي شريط العاجل - شركة جوال",
      type: "CUSTOM_BANNER",
      position: "BREAKING_BAR_SPONSOR",
      clientName: "شركة جوال",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
      targetUrl: "https://www.jawwal.ps",
      altText: "جوال - أقرب إليك دائماً",
      enabled: true,
      impressions: 3100,
      clicks: 215,
    },
  });

  console.log("✓ تم تسجيل الإعلانات التجريبية بنجاح!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
