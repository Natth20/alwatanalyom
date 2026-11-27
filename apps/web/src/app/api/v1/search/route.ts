import { NextRequest, NextResponse } from "next/server";
import { searchArticles, getSectionFeed } from "@/lib/dal";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q") || "";
  const section = searchParams.get("section") || undefined;
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "20", 10) || 20, 1), 40);

  if (!q.trim() && !section) {
    return NextResponse.json({ results: [], total: 0 });
  }

  if (!q.trim() && section) {
    const feed = await getSectionFeed(section);
    const items = (feed?.articles || []).slice(0, limit);
    return NextResponse.json({
      results: items,
      total: items.length,
      section,
    });
  }

  const results = await searchArticles(q, section, limit);

  return NextResponse.json({
    results,
    total: results.length,
    query: q,
  });
}
