import { prisma } from "../src/index";

async function main() {
  const sections = await prisma.section.findMany({
    select: {
      id: true,
      slug: true,
      nameAr: true,
      _count: {
        select: { articles: true }
      }
    },
    orderBy: { slug: "asc" }
  });
  console.log("Sections count:", sections.length);
  console.table(sections.map(s => ({ slug: s.slug, nameAr: s.nameAr, articles: s._count.articles })));

  const totalArticles = await prisma.article.count();
  console.log("Total articles in DB:", totalArticles);

  const redirects = await prisma.redirect.count();
  console.log("Total redirects in DB:", redirects);

  const itemsByStatus = await prisma.item.groupBy({
    by: ["status"],
    _count: true
  });
  console.log("Items by status:", itemsByStatus);

  const totalSources = await prisma.source.count();
  console.log("Total sources in DB:", totalSources);
}

main().catch(console.error).finally(() => prisma.$disconnect());

