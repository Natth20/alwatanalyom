import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@awt/db";
import { PushSubscribeSchema } from "@awt/shared";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = PushSubscribeSchema.parse(body);

    const sub = await prisma.pushSubscription.upsert({
      where: { endpoint: parsed.endpoint },
      update: {
        p256dh: parsed.p256dh,
        auth: parsed.auth,
        topics: parsed.topics,
        countryCodes: parsed.countryCodes,
      },
      create: {
        endpoint: parsed.endpoint,
        p256dh: parsed.p256dh,
        auth: parsed.auth,
        topics: parsed.topics,
        countryCodes: parsed.countryCodes,
      },
    });

    return NextResponse.json({ ok: true, id: sub.id }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: { code: "VALIDATION_FAILED", message: err.message } },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body?.endpoint) {
      return NextResponse.json({ error: "Missing endpoint" }, { status: 400 });
    }

    await prisma.pushSubscription.deleteMany({
      where: { endpoint: body.endpoint },
    });

    return new NextResponse(null, { status: 204 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

