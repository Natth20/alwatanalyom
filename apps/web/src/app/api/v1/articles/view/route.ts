import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@awt/db";

export async function POST(req: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  try {
    const body = await req.json();
    const articleId = typeof body?.articleId === "string" ? body.articleId.trim() : "";
    if (!articleId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await prisma.article.updateMany({
      where: { id: articleId, status: "PUBLISHED" },
      data: { readCount: { increment: 1 } },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
