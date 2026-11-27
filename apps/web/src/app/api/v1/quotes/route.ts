import { NextResponse } from "next/server";
import { getLatestQuotes } from "@/lib/dal";
import { fetchAllLiveQuotes, derivePalestineGoldTable } from "@/lib/live-data/markets";

export const revalidate = 60;

export async function GET() {
  const [liveQuotes, dbQuotes] = await Promise.all([
    fetchAllLiveQuotes(),
    getLatestQuotes().catch(() => []),
  ]);

  // Merge live real market quotes with DB quotes, preferring real live market feeds over mock/stale rows
  const bySymbol = new Map<string, (typeof liveQuotes)[number]>();

  for (const dq of dbQuotes) {
    if (dq.provider !== "mock" && dq.provider !== "mock-provider") {
      bySymbol.set(dq.symbol, dq);
    }
  }
  for (const lq of liveQuotes) {
    bySymbol.set(lq.symbol, lq);
  }

  const quotes = Array.from(bySymbol.values());
  const xau = quotes.find((q) => q.symbol === "XAUUSD")?.price;
  const usdIls = quotes.find((q) => q.symbol === "USDILS")?.price;
  const usdJod = quotes.find((q) => q.symbol === "USDJOD")?.price;

  const goldKarats = derivePalestineGoldTable(
    xau ? parseFloat(xau) : null,
    usdIls ? parseFloat(usdIls) : null,
    usdJod ? parseFloat(usdJod) : null
  );

  return NextResponse.json(
    {
      quotes,
      goldKarats,
      asOf: new Date().toISOString(),
      source: liveQuotes.length > 0 ? "live-markets" : "database",
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=180",
      },
    }
  );
}
