import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@awt/db";

export async function POST(req: NextRequest) {
  if (!prisma) {
    return NextResponse.json(
      { error: { message: "خدمة استلام إشعارات الملكية الفكرية غير متاحة مؤقتاً" } },
      { status: 503 }
    );
  }
  try {
    const body = await req.json();
    const claimantName = String(body?.claimantName || "").trim();
    const claimantEmail = String(body?.claimantEmail || "").trim();
    const infringingUrl = String(body?.infringingUrl || "").trim();
    const originalWorkUrl = String(body?.originalWorkUrl || "").trim();
    const requestedAction = String(body?.requestedAction || "takedown");

    if (!claimantName || !claimantEmail || !infringingUrl) {
      return NextResponse.json(
        { error: { message: "يرجى استكمال الاسم والبريد والرابط المعني" } },
        { status: 400 }
      );
    }

    const ticketCode = `AWT-DMCA-${Date.now().toString().slice(-6)}`;
    await prisma.auditLog.create({
      data: {
        action: "dmca_notice",
        entityType: "DMCA",
        entityId: ticketCode,
        before: {
          claimantName,
          claimantEmail,
          infringingUrl,
          originalWorkUrl,
          requestedAction,
        },
        ip: req.headers.get("x-forwarded-for") || "unknown",
      },
    });

    return NextResponse.json({ ok: true, ticketCode }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: { message: "تعذر تسجيل إشعار DMCA" } },
      { status: 400 }
    );
  }
}
