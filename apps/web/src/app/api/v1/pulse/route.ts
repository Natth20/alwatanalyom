import { NextResponse } from "next/server";
import { computeLivePulseAnalytics } from "@/lib/live-data/pulse";

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = await computeLivePulseAnalytics();
  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
    },
  });
}
