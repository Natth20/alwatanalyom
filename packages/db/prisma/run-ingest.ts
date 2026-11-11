import { prisma } from "../src/index";
import { runLiveIngest } from "@awt/ingest";


async function main() {
  console.log("⚡ بدء جلب الأخبار الحية من المصادر المعتمدة...");
  const report = await runLiveIngest(prisma, { limitPerSource: 6 });
  console.log("تقرير الجلب الحقيقي:", JSON.stringify(report, null, 2));

  const total = await prisma.article.count();
  console.log(`📊 إجمالي المقالات الحية في قاعدة البيانات الآن: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
