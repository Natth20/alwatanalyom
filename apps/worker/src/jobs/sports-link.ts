import { prisma } from "@awt/db";
import { normalizeArabicForComparison } from "@awt/shared";

export async function processSportsLink(articleId: string) {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    include: { section: true },
  });

  if (!article || article.section.slug !== "sports") {
    return;
  }

  // جلب كافة الكيانات الرياضية المسجلة (فرق، بطولات، لاعبين)
  const entities = await prisma.sportsEntity.findMany();
  if (entities.length === 0) return;

  const titleNormalized = normalizeArabicForComparison(article.titleAr);
  const summaryNormalized = normalizeArabicForComparison(article.summaryAr || "");
  const fullText = `${titleNormalized} ${summaryNormalized}`;

  const matchedEntities: { entityId: string; confidence: number }[] = [];

  for (const ent of entities) {
    const nameNorm = normalizeArabicForComparison(ent.nameAr);
    let matched = false;
    let confidence = 0.7;

    // 1. فحص الاسم المباشر
    if (fullText.includes(nameNorm)) {
      matched = true;
      confidence = titleNormalized.includes(nameNorm) ? 0.95 : 0.8;
    }

    // 2. فحص الأسماء البديلة (Aliases)
    if (!matched && ent.aliases.length > 0) {
      for (const alias of ent.aliases) {
        const aliasNorm = normalizeArabicForComparison(alias);
        if (fullText.includes(aliasNorm)) {
          matched = true;
          confidence = 0.75;
          break;
        }
      }
    }

    if (matched) {
      matchedEntities.push({ entityId: ent.id, confidence });
    }
  }

  // أقصى 3 روابط لكل خبر رياضي وفقاً للبند 12.3
  const top3 = matchedEntities.sort((a, b) => b.confidence - a.confidence).slice(0, 3);

  for (const match of top3) {
    await prisma.sportsLink.upsert({
      where: {
        articleId_entityId: {
          articleId: article.id,
          entityId: match.entityId,
        },
      },
      update: { confidence: match.confidence },
      create: {
        articleId: article.id,
        entityId: match.entityId,
        confidence: match.confidence,
      },
    });
  }

  if (top3.length > 0) {
    console.log(`⚽ Linked ${top3.length} YallaSport entities to article: ${article.titleAr}`);
  }
}

