import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@awt/db";

export async function GET() {
  if (!prisma) {
    return NextResponse.json({ corrections: [] });
  }
  try {
    const rows = await prisma.correction.findMany({
      orderBy: { createdAt: "desc" },
      take: 25,
      include: {
        article: {
          select: {
            id: true,
            slug: true,
            titleAr: true,
            section: { select: { nameAr: true } },
          },
        },
      },
    });
    return NextResponse.json({
      corrections: rows.map((r) => ({
        id: r.id,
        note: r.note,
        createdAt: r.createdAt.toISOString(),
        articleTitle: r.article.titleAr,
        articleUrl: `/article/${r.article.id}/${r.article.slug}`,
        category: r.article.section?.nameAr || "تصحيح تحريري",
      })),
    });
  } catch {
    return NextResponse.json({ corrections: [] });
  }
}

export async function POST(req: NextRequest) {
  if (!prisma) {
    return NextResponse.json(
      { error: { message: "خدمة استلام طلبات التصحيح غير متاحة مؤقتاً" } },
      { status: 503 }
    );
  }
  try {
    const body = await req.json();
    const articleUrl = String(body?.articleUrl || "").trim();
    const detail = String(body?.detail || "").trim();
    const sourceUrl = String(body?.sourceUrl || "").trim();

    if (articleUrl.length < 3 || detail.length < 5) {
      return NextResponse.json(
        { error: { message: "يرجى إدخال رابط المادة وتوضيح التصحيح المطلوب" } },
        { status: 400 }
      );
    }

    const ticketCode = `AWT-CORR-${Date.now().toString().slice(-6)}`;
    await prisma.auditLog.create({
      data: {
        action: "correction_request",
        entityType: "CorrectionRequest",
        entityId: ticketCode,
        before: { articleUrl, detail, sourceUrl },
        ip: req.headers.get("x-forwarded-for") || "unknown",
      },
    });

    return NextResponse.json({ ok: true, ticketCode }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: { message: "تعذر إرسال طلب التصحيح" } },
      { status: 400 }
    );
  }
}
