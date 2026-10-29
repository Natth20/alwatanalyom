import { NextRequest, NextResponse } from "next/server";
import { getChannels } from "@/lib/dal";

export const revalidate = 300; // 5 دقائق

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");

  let channels = await getChannels();

  if (category) {
    channels = channels.filter((c) => c.category === category);
  }

  return NextResponse.json(channels, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
    },
  });
}
