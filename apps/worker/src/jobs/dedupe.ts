import { prisma } from "@awt/db";
import { hammingDistance, checkMergeSafety } from "@awt/dedupe";
import { translateClassifyQueue } from "../queues/index";

export async function processDedupe(itemId: string) {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
  });

  if (!item || !item.simhash) return;

  // البحث عن مواد مشابهة خلال الـ 48 ساعة الأخيرة
  const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

  const candidates = await prisma.item.findMany({
    where: {
      id: { not: item.id },
      fetchedAt: { gte: fortyEightHoursAgo },
      status: { in: ["NEW", "QUEUED", "REVIEW", "PUBLISHED"] },
      simhash: { not: null },
    },
    select: {
      id: true,
      titleOriginal: true,
      simhash: true,
      storyId: true,
      contentHash: true,
      countryCodes: true,
    },
  });

  let duplicateOfId: string | null = null;
  let candidateStoryId: string | null = null;

  for (const candidate of candidates) {
    if (candidate.contentHash === item.contentHash) {
      duplicateOfId = candidate.id;
      candidateStoryId = candidate.storyId;
      break;
    }

    if (candidate.simhash) {
      const dist = hammingDistance(item.simhash, candidate.simhash);
      if (dist <= 3) {
        // التحقق من حارس الدمج (Merge Guard) لمنع دمج الأرقام المتضاربة
        const guard = checkMergeSafety(
          item.titleOriginal,
          candidate.titleOriginal,
          item.countryCodes,
          candidate.countryCodes
        );

        if (guard.canMerge) {
          duplicateOfId = candidate.id;
          candidateStoryId = candidate.storyId;
          break;
        }
      }
    }
  }

  if (duplicateOfId) {
    await prisma.item.update({
      where: { id: item.id },
      data: {
        status: "DUPLICATE",
        duplicateOfId,
        storyId: candidateStoryId,
      },
    });

    await prisma.pipelineEvent.create({
      data: {
        itemId: item.id,
        stage: "dedupe",
        decision: "duplicate",
        reason: `تطابق مكرر مع العنصر ${duplicateOfId}`,
      },
    });
    return;
  }

  // إذا كان العنصر فريداً، ينتقل إلى مرحلة التصنيف والذكاء الاصطناعي
  await prisma.item.update({
    where: { id: item.id },
    data: { status: "QUEUED" },
  });

  await prisma.pipelineEvent.create({
    data: {
      itemId: item.id,
      stage: "dedupe",
      decision: "pass",
      reason: "عنصر فريد - اجتاز فحص التكرار",
    },
  });

  await translateClassifyQueue.add("translate-classify-item", { itemId: item.id });
}

