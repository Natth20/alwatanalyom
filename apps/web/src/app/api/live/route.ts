import { NextResponse } from "next/server";
import { prisma } from "@awt/db";
import { generateArabicSlug } from "@awt/shared";

export async function GET() {
  try {
    const coverages = await (prisma as any).liveCoverage.findMany({
      include: {
        _count: {
          select: { updates: true },
        },
      },
      orderBy: [{ pinned: "desc" }, { startedAt: "desc" }],
    });

    return NextResponse.json({ ok: true, coverages });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, summary, streamUrl, coverImage } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json({ ok: false, error: "عنوان التغطية مطلوب" }, { status: 400 });
    }

    const slug = `${generateArabicSlug(title, 50)}-${Date.now().toString(36)}`;

    const coverage = await (prisma as any).liveCoverage.create({
      data: {
        title,
        slug,
        summary: summary || null,
        streamUrl: streamUrl || null,
        coverImage: coverImage || null,
        isActive: true,
        pinned: true,
      },
    });

    return NextResponse.json({ ok: true, coverage });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

