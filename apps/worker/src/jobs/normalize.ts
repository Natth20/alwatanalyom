import { prisma } from "@awt/db";
import { normalizeArabicForComparison, computeContentHash } from "@awt/shared";
import { computeSimhash } from "@awt/dedupe";
import { dedupeQueue } from "../queues/index";

export async function processNormalize(itemId: string) {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
  });

  if (!item) return;

  const rawText = `${item.titleOriginal} ${item.summaryOrig || ""}`;
  const normalized = normalizeArabicForComparison(rawText);
  const contentHash = computeContentHash(normalized);
  const simhash = computeSimhash(normalized);

  await prisma.item.update({
    where: { id: item.id },
    data: {
      contentHash,
      simhash,
    },
  });

  await prisma.pipelineEvent.create({
    data: {
      itemId: item.id,
      stage: "normalize",
      decision: "pass",
      reason: "تم تطبيع النص وحساب بصمات Simhash و ContentHash بنجاح",
    },
  });

  // تمرير إلى طابور كشف التكرار
  await dedupeQueue.add("dedupe-item", { itemId: item.id });
}

