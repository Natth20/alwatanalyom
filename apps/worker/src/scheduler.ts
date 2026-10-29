import { prisma } from "@awt/db";
import { fetchSourceQueue } from "./queues/index";

/**
 * جدولة جلب المصادر الدورية بناءً على pollSeconds لكل مصدر
 */
export async function runScheduler() {
  const sources = await prisma.source.findMany({
    where: {
      enabled: true,
      feedUrl: { not: null },
      state: { in: ["OK", "NEEDS_CHECK"] },
    },
  });

  console.log(`⏱️ Scheduler checking ${sources.length} active sources...`);

  const now = Date.now();

  for (const source of sources) {
    const pollMs = (source.pollSeconds || 300) * 1000;
    const lastSuccess = source.lastSuccessAt ? source.lastSuccessAt.getTime() : 0;

    if (now - lastSuccess >= pollMs) {
      await fetchSourceQueue.add(
        `fetch-${source.slug}`,
        { sourceId: source.id },
        {
          jobId: `poll-${source.id}-${Math.floor(now / pollMs)}`,
          removeOnComplete: true,
        }
      );
    }
  }
}

