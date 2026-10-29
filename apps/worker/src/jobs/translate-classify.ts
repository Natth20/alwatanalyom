import { prisma } from "@awt/db";
import { AIClient } from "@awt/ai";
import { publishQueue } from "../queues/index";

const aiClient = new AIClient();

export async function processTranslateClassify(itemId: string) {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
    include: { source: true },
  });

  if (!item) return;

  const aiResult = await aiClient.classifyAndTranslate(
    item.titleOriginal,
    item.summaryOrig || undefined,
    item.lang.toLowerCase()
  );

  // تحديث بيانات العنصر في قاعدة البيانات
  await prisma.item.update({
    where: { id: item.id },
    data: {
      titleAr: aiResult.titleAr,
      sectionGuess: aiResult.sectionSlug,
      countryCodes: aiResult.countryCodes,
      isBreaking: aiResult.isBreaking,
      importance: aiResult.importance,
    },
  });

  // فحص سياسة النشر لمعرفة ما إذا كان يذهب للنشر الآلي أو المراجعة البشرية
  const isSensitive = aiResult.sensitivity.length > 0;
  const isLowConfidence = aiResult.confidence < 0.85;
  const sourceNeedsReview = item.source.trustLevel < 3;

  if (isSensitive || isLowConfidence || sourceNeedsReview) {
    const reasons: string[] = [];
    if (isSensitive) reasons.push(`محتوى حساس: ${aiResult.sensitivity.join(", ")}`);
    if (isLowConfidence) reasons.push(`ثقة منخفضة (${aiResult.confidence})`);
    if (sourceNeedsReview) reasons.push(`مستوى ثقة المصدر يحتاج تدقيق (${item.source.trustLevel})`);

    await prisma.item.update({
      where: { id: item.id },
      data: {
        status: "REVIEW",
        rejectReason: reasons.join(" | "),
      },
    });

    await prisma.pipelineEvent.create({
      data: {
        itemId: item.id,
        stage: "decide",
        decision: "review",
        reason: reasons.join(" | "),
        meta: aiResult as any,
      },
    });
    return;
  }

  // اجتاز الفحوصات ويستحق النشر الآلي
  await prisma.pipelineEvent.create({
    data: {
      itemId: item.id,
      stage: "decide",
      decision: "publish",
      reason: "اجتاز شروط النشر الآلي",
      meta: aiResult as any,
    },
  });

  await publishQueue.add("publish-item", {
    itemId: item.id,
    aiResult,
  });
}

