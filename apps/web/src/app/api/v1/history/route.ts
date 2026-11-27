import { NextResponse } from "next/server";
import { fetchWikipediaOnThisDay } from "@/lib/live-data/history-events";

export const revalidate = 3600;

export async function GET() {
  const data = await fetchWikipediaOnThisDay();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
    },
  });
}
