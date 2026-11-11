import { prisma } from "../src/index";
import path from "node:path";

try {
  process.loadEnvFile(path.resolve(__dirname, "../../../.env"));
} catch {}

async function main() {
  const coverage = await prisma.liveCoverage.upsert({
    where: { slug: "palestine-live-updates" },
    update: {},
    create: {
      slug: "palestine-live-updates",
      title: "تغطية مباشرة لحظية: تطورات الأوضاع الميدانية والإنسانية في قطاع غزة والضفة الغربية",
      summary: "متابعة دقيقة بدقيقة لآخر المستجدات الميدانية، تحركات الجهود الدبلوماسية، والتقارير الإنسانية من مراسلي وكالات الأنباء المعتمدة.",
      isActive: true,
      pinned: true,
      coverImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop",
      streamUrl: "https://www.youtube.com/embed/bNyUyrR0PHo", // Al Jazeera Live Embed
    },
  });

  const updatesCount = await prisma.liveUpdate.count({ where: { coverageId: coverage.id } });

  if (updatesCount === 0) {
    await prisma.liveUpdate.createMany({
      data: [
        {
          coverageId: coverage.id,
          title: "اتصالات دبلوماسية مكثفة لتثبيت المساعدات الإنسانية ودخول قوافل الإغاثة",
          bodyText: "أفادت مصادر دبلوماسية متطابقة باستمرار الجهود الإقليمية والدولية للتنسيق بشأن ممرات الإغاثة الطارئة ودخول الإمدادات الطبية والوقود إلى المستشفيات في قطاع غزة.",
          isUrgent: false,
          sourceName: "وكالة الأنباء الفلسطينية",
          publishedAt: new Date(Date.now() - 10 * 60 * 1000),
        },
        {
          coverageId: coverage.id,
          title: "بيان عاجل من الهلال الأحمر الفلسطيني بشأن الوضع الصحي",
          bodyText: "طواقم الإسعاف تواصل تقديم خدمات الرعاية الطارئة في مختلف المحافظات وسط نداءات متكررة لتوفير المستلزمات الجراحية والمحاليل الوريدية للمستشفيات العاملة.",
          isUrgent: true,
          sourceName: "الهلال الأحمر الفلسطيني",
          publishedAt: new Date(Date.now() - 25 * 60 * 1000),
        },
        {
          coverageId: coverage.id,
          title: "تحديث ميداني لحركة المعابر والمنافذ",
          bodyText: "استمرار تدفق الشاحنات التجارية والإغاثية عبر المنافذ المحددة بالتنسيق مع وكالات الأمم المتحدة (الأونروا) وبرنامج الأغذية العالمي.",
          isUrgent: false,
          sourceName: "مراسل الوطن اليوم",
          publishedAt: new Date(Date.now() - 45 * 60 * 1000),
        },
      ],
    });
  }

  console.log("✓ تم تسجيل التغطية المباشرة والتحديثات اللحظية بنجاح!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

