import { NextResponse } from "next/server";
import { prisma } from "@awt/db";


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await (prisma as any).liveUpdate.findMany({
      where: { coverageId: id },
      orderBy: { publishedAt: "desc" },
      take: 40,
    });

    return NextResponse.json({
      ok: true,
      updates: updates.map((u: any) => ({
        id: u.id,
        title: u.title,
        bodyText: u.bodyText,
        isUrgent: u.isUrgent,
        mediaUrl: u.mediaUrl,
        sourceName: u.sourceName,
        publishedAt: u.publishedAt.toISOString(),
      })),
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

