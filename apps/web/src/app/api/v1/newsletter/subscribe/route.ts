import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@awt/db";
import { NewsletterSubscribeSchema } from "@awt/shared";
import { randomBytes } from "node:crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = NewsletterSubscribeSchema.parse(body);

    const token = randomBytes(24).toString("hex");

    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.email },
      update: {
        lists: parsed.lists,
        token,
      },
      create: {
        email: parsed.email,
        lists: parsed.lists,
        token,
      },
    });

    // في الإنتاج: إرسال بريد التأكيد المزدوج (Double Opt-in)
    return NextResponse.json(
      {
        ok: true,
        message: "تم تسجيل اشتراكك بنجاح. يرجى مراجعة بريدك الإلكتروني لتأكيد الاشتراك.",
        subscriberId: subscriber.id,
      },
      { status: 202 }
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

