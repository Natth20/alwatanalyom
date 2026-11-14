import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@awt/db";
import { SubmitNewsTipSchema } from "@awt/shared";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = SubmitNewsTipSchema.parse(body);

    // تسجيل الخبر المرسل في سجل التدقيق لغرفة التحرير مع حماية خصوصية المصدر
    await prisma.auditLog.create({
      data: {
        action: "news_tip_submission",
        entityType: "NewsTip",
        entityId: `tip-${Date.now()}`,
        before: {
          title: parsed.title,
          details: parsed.details,
          location: parsed.location || "غير محدد",
          sourceType: parsed.sourceType,
          attachmentUrl: parsed.attachmentUrl,
          isAnonymous: parsed.isAnonymous,
          senderName: parsed.isAnonymous ? "مصدر مجهول (محمي)" : parsed.senderName,
          senderContact: parsed.isAnonymous ? null : parsed.senderContact,
        },
        ip: parsed.isAnonymous ? "ANONYMOUS" : request.headers.get("x-forwarded-for") || "127.0.0.1",
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "تم إرسال الخبر والتفاصيل إلى غرفة التحرير بنجاح وبسرية تامة. شكراً لمساهمتك في نقل الحقيقة.",
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        error: {
          code: "VALIDATION_FAILED",
          message: err.message || "البيانات المدخلة غير صحيحة",
        },
      },
      { status: 400 }
    );
  }
}
