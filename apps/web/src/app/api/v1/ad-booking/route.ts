import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@awt/db";

export async function POST(req: NextRequest) {
  if (!prisma) {
    return NextResponse.json(
      { error: { message: "خدمة حجز المساحات الإعلانية غير متاحة مؤقتاً" } },
      { status: 503 }
    );
  }
  try {
    const body = await req.json();
    const clientName = String(body?.clientName || "").trim();
    const clientCompany = String(body?.clientCompany || "").trim();
    const clientEmail = String(body?.clientEmail || "").trim();
    const clientPhone = String(body?.clientPhone || "").trim();
    const selectedPlacement = String(body?.selectedPlacement || "");
    const selectedAudience = String(body?.selectedAudience || "");
    const budget = Number(body?.budget || 0);
    const bookingNotes = String(body?.bookingNotes || "").trim();

    if (!clientName || !clientEmail) {
      return NextResponse.json(
        { error: { message: "يرجى إدخال الاسم والبريد الإلكتروني" } },
        { status: 400 }
      );
    }

    const ticketCode = `AWT-ADV-${Date.now().toString().slice(-6)}`;
    await prisma.auditLog.create({
      data: {
        action: "ad_booking_request",
        entityType: "AdBooking",
        entityId: ticketCode,
        before: {
          clientName,
          clientCompany,
          clientEmail,
          clientPhone,
          selectedPlacement,
          selectedAudience,
          budget,
          bookingNotes,
        },
        ip: req.headers.get("x-forwarded-for") || "unknown",
      },
    });

    return NextResponse.json({ ok: true, ticketCode }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: { message: "تعذر إرسال طلب الحجز الإعلاني" } },
      { status: 400 }
    );
  }
}
