import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@awt/db";
import { runLiveIngest } from "@awt/ingest";
import { fetchAllLiveQuotes } from "@/lib/live-data/markets";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function syncLiveQuotesToDb() {
  if (!prisma) return { synced: 0 };
  const live = await fetchAllLiveQuotes();
  if (live.length === 0) return { synced: 0 };

  let synced = 0;
  for (const q of live) {
    try {
      const instrument = await prisma.instrument.upsert({
        where: { symbol: q.symbol },
        update: {
          nameAr: q.nameAr,
          nameEn: q.nameEn,
          category: q.category,
          unit: q.unit || null,
          currency: q.currency || null,
          providerKey: q.provider,
          enabled: true,
        },
        create: {
          symbol: q.symbol,
          nameAr: q.nameAr,
          nameEn: q.nameEn,
          category: q.category,
          unit: q.unit || null,
          currency: q.currency || null,
          providerKey: q.provider,
          enabled: true,
        },
      });

      const priceNum = q.price ? parseFloat(q.price) : null;
      if (priceNum !== null && Number.isFinite(priceNum)) {
        const changeNum = q.change ? parseFloat(q.change.replace("+", "")) : null;
        const pctNum = q.changePct ? parseFloat(q.changePct.replace(/[%+]/g, "")) : null;
        await prisma.quote.create({
          data: {
            instrumentId: instrument.id,
            price: priceNum,
            change: Number.isFinite(changeNum) ? changeNum : null,
            changePct: Number.isFinite(pctNum) ? pctNum : null,
            status: q.status,
            asOf: q.asOf ? new Date(q.asOf) : new Date(),
            fetchedAt: new Date(),
          },
        });
        synced += 1;
      }
    } catch (err) {
      console.warn(`[Cron/sync] Failed persisting quote ${q.symbol}:`, (err as Error)?.message);
    }
  }
  return { synced };
}

export async function GET(request: NextRequest) {
  const isVercelCron = request.headers.get("x-vercel-cron") === "1";
  const cronSecret = process.env["CRON_SECRET"] || process.env["REVALIDATE_TOKEN"];
  const authHeader = request.headers.get("authorization");
  const tokenParam = new URL(request.url).searchParams.get("token");

  if (
    cronSecret &&
    !isVercelCron &&
    authHeader !== `Bearer ${cronSecret}` &&
    tokenParam !== cronSecret &&
    process.env["NODE_ENV"] === "production"
  ) {
    // Allow internal manual triggers without secret ONLY if no CRON_SECRET set; if set, verify
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  if (!prisma) {
    return NextResponse.json(
      { ok: false, error: "DATABASE_UNAVAILABLE" },
      { status: 503 }
    );
  }

  const quotesResult = await syncLiveQuotesToDb();
  const ingestResult = await Promise.race([
    runLiveIngest(prisma, { limitPerSource: 4 }).catch((err) => ({
      error: (err as Error)?.message || "INGEST_FAILED",
    })),
    new Promise((resolve) =>
      setTimeout(() => resolve({ partial: true, message: "Ingest budget window elapsed gracefully" }), 18000)
    ),
  ]);

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    ingest: ingestResult,
    quotes: quotesResult,
  });
}

export async function POST(request: NextRequest) {
  return GET(request);
}
