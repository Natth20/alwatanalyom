import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@/lib/dal";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q") || "";
  const section = searchParams.get("section") || undefined;
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  if (!q.trim()) {
    return NextResponse.json({ results: [], total: 0 });
  }

  const results = await searchArticles(q, section, limit);

  return NextResponse.json({
    results,
    total: results.length,
    query: q,
  });
}
