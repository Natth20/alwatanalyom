import { NextResponse } from "next/server";
import { prisma } from "@awt/db";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    if (!prisma) {
      return NextResponse.json({ ok: true, ads: [] });
    }

    const { searchParams } = new URL(req.url);
    const position = searchParams.get("position");

    const whereClause: any = {
      enabled: true,
    };

    if (position) {
      whereClause.position = position;
    }

    const ads = await prisma.adCampaign.findMany({
      where: whereClause,
      orderBy: { startsAt: "desc" },
      take: 10,
    });

    return NextResponse.json({ ok: true, ads });
  } catch {
    return NextResponse.json({ ok: true, ads: [] });
  }
}
