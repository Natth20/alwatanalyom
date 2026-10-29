import { prisma } from "@awt/db";
import { generateArabicSlug, AIOutput } from "@awt/shared";

export async function processPublish(itemId: string, aiResult: AIOutput) {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
    include: { source: true },
  });

  if (!item) return;

  // 1. تحديد القسم
  let section = await prisma.section.findUnique({
    where: { slug: aiResult.sectionSlug },
  });

  if (!section) {
    // fallback إلى فلسطين إن لم يوجد
    section = await prisma.section.findUnique({ where: { slug: "palestine" } });
  }

  if (!section) {
    throw new Error("لا يوجد قسم صالح لربط المقال");
  }

  // 2. إدارة القصة (Story)
  let storyId = item.storyId;
  if (!storyId) {
    const storySlug = generateArabicSlug(aiResult.titleAr, 60);
    const story = await prisma.story.create({
      data: {
        slug: `${storySlug}-${Date.now().toString(36)}`,
        headlineAr: aiResult.titleAr,
        summaryAr: aiResult.summaryAr,
        importance: aiResult.importance,
        trendingScore: aiResult.importance * 1.5,
        firstSeenAt: item.publishedAtSource || new Date(),
        lastUpdatedAt: new Date(),
        sectionId: section.id,
      },
    });
    storyId = story.id;

    await prisma.item.update({
      where: { id: item.id },
      data: { storyId: story.id },
    });
  }

  // 3. إنشاء المقال المنشور (Article)
  const articleSlug = generateArabicSlug(aiResult.titleAr);
  const now = new Date();

  const article = await prisma.article.create({
    data: {
      slug: articleSlug,
      titleAr: aiResult.titleAr,
      titleOriginal: item.titleOriginal,
      summaryAr: aiResult.summaryAr,
      kind: aiResult.kind as any,
      status: "PUBLISHED",
      displayPolicy: item.source.displayPolicy,
      translatedBy: "machine",
      sourceId: item.sourceId,
      itemId: item.id,
      sourceUrl: item.canonicalUrl,
      storyId: storyId,
      sectionId: section.id,
      isBreaking: aiResult.isBreaking,
      breakingUntil: aiResult.isBreaking ? new Date(now.getTime() + 60 * 60 * 1000) : null,
      publishedAt: now,
      sourcePublishedAt: item.publishedAtSource,
    },
  });

  // تحديث حالة العنصر
  await prisma.item.update({
    where: { id: item.id },
    data: { status: "PUBLISHED" },
  });

  // تسجيل الحدث
  await prisma.pipelineEvent.create({
    data: {
      itemId: item.id,
      stage: "publish",
      decision: "published",
      reason: `تم النشر بنجاح: Article ID ${article.id}`,
    },
  });

  console.log(`📰 Article published: [${section.slug}] ${article.titleAr} (${article.id})`);
}

