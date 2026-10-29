import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@awt/db";
import { ReportIssueSchema } from "@awt/shared";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ReportIssueSchema.parse(body);

    const article = await prisma.article.findUnique({
      where: { id: parsed.articleId },
      select: { id: true, titleAr: true },
    });

    if (!article) {
      return NextResponse.json({ error: "المقال غير موجود" }, { status: 404 });
    }

    // تسجيل البلاغ في سجل التدقيق المباشر لإشعار المحرر
    await prisma.auditLog.create({
      data: {
        action: "reader_report",
        entityType: "Article",
        entityId: article.id,
        before: { userReport: parsed.message, contactEmail: parsed.email },
        ip: request.headers.get("x-forwarded-for") || "127.0.0.1",
      },
    });

    return NextResponse.json(
      {
        ok: true,
        message: "شكراً لاهتمامك. تم استلام البلاغ وسيتم مراجعته من قبل هيئة التحرير فوراً.",
      },
      { status: 202 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: { code: "VALIDATION_FAILED", message: err.message } },
      { status: 400 }
    );
  }
}
