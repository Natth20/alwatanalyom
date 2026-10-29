import { NextResponse } from "next/server";
import { getActiveBreaking } from "@/lib/dal";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const breakingArticles = await getActiveBreaking();

    return NextResponse.json(
      {
        timestamp: new Date().toISOString(),
        count: breakingArticles.length,
        items: breakingArticles,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch breaking news:", error);
    return NextResponse.json({ count: 0, items: [] }, { status: 500 });
  }
}
