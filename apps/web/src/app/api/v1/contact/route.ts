import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@awt/db";
import { ContactFormSchema } from "@awt/shared";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ContactFormSchema.parse(body);

    // تسجيل رسالة التواصل في سجل التدقيق وإشعار الإدارة
    await prisma.auditLog.create({
      data: {
        action: "contact_submission",
        entityType: "Contact",
        entityId: `contact-${Date.now()}`,
        before: {
          name: parsed.name,
          email: parsed.email,
          department: parsed.department,
          subject: parsed.subject || "رسالة عامة",
          message: parsed.message,
          phone: parsed.phone,
        },
        ip: request.headers.get("x-forwarded-for") || "127.0.0.1",
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "تم استلام رسالتك بنجاح، وسيقوم الفريق المختص بمراجعتها والرد في أقرب وقت.",
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
