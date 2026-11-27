import { NextResponse } from "next/server";
import { fetchLiveTelemetry } from "@/lib/live-data/telemetry";

export const revalidate = 1800;

export async function GET() {
  const data = await fetchLiveTelemetry();
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
    },
  });
}
