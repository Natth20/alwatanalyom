import { NextRequest, NextResponse } from "next/server";
import { getArticlesByDistrictOrCity } from "@/lib/dal";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const place = searchParams.get("place") || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "6", 10), 20);

  if (!place.trim()) {
    return NextResponse.json(
      { error: { code: "MISSING_PLACE", message: "يرجى تحديد المدينة أو القضاء" } },
      { status: 400 }
    );
  }

  const articles = await getArticlesByDistrictOrCity(place, limit);

  return NextResponse.json({
    ok: true,
    place,
    count: articles.length,
    articles,
  });
}

