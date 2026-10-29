import { NextRequest, NextResponse } from "next/server";
import { getLatestQuotes } from "@/lib/dal";

export const revalidate = 30; // 30 ثانية

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const symbolsParam = searchParams.get("symbols");
  const symbols = symbolsParam ? symbolsParam.split(",").map((s) => s.trim().toUpperCase()) : undefined;

  const quotes = await getLatestQuotes(symbols);

  return NextResponse.json(quotes, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=10",
    },
  });
}
