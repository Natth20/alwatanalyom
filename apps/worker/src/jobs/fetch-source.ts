import { prisma } from "@awt/db";
import { fetchFeedSafe, parseFeedXml } from "@awt/ingest";
import { computeUrlHash } from "@awt/shared";
import { normalizeQueue } from "../queues/index";

export async function processFetchSource(sourceId: string) {
  const source = await prisma.source.findUnique({
    where: { id: sourceId },
  });

  if (!source || !source.enabled || !source.feedUrl) {
    return;
  }

  const fetchRes = await fetchFeedSafe(source.feedUrl);

  if (!fetchRes.ok || !fetchRes.bodyText) {
    await prisma.source.update({
      where: { id: source.id },
      data: {
        lastError: fetchRes.error || "خطأ أثناء جلب الخلاصة",
        state: "FAILING",
      },
    });
    return;
  }

  // تحديث حالة نجاح المصدر
  await prisma.source.update({
    where: { id: source.id },
    data: {
      lastSuccessAt: new Date(),
      lastError: null,
      state: "OK",
    },
  });

  const parsedItems = parseFeedXml(fetchRes.bodyText);

  for (const raw of parsedItems) {
    const urlHash = computeUrlHash(raw.canonicalUrl);

    // فحص ما إذا كان الرابط قد أُدخل سابقاً
    const existing = await prisma.item.findUnique({
      where: { urlHash },
    });

    if (existing) continue;

    // إنشاء مادة خام جديدة (Item)
    const item = await prisma.item.create({
      data: {
        sourceId: source.id,
        externalId: raw.externalId,
        url: raw.url,
        canonicalUrl: raw.canonicalUrl,
        urlHash,
        titleOriginal: raw.title,
        summaryOrig: raw.summary,
        lang: source.lang,
        publishedAtSource: raw.publishedAt,
        contentHash: "pending",
        status: "NEW",
      },
    });

    // تسجيل الحدث
    await prisma.pipelineEvent.create({
      data: {
        itemId: item.id,
        stage: "fetch",
        decision: "pass",
        reason: `جلب ناجح من المصدر ${source.nameAr}`,
      },
    });

    // تمرير العنصر إلى طابور التطبيع
    await normalizeQueue.add("normalize-item", { itemId: item.id });
  }
}

