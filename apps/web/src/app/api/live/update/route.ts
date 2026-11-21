import { NextResponse } from "next/server";
import { prisma } from "@awt/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { coverageId, title, bodyText, isUrgent, mediaUrl, sourceName } = body;

    if (!coverageId || !bodyText) {
      return NextResponse.json({ ok: false, error: "معرف التغطية ونص التحديث مطلوبان" }, { status: 400 });
    }

    const update = await (prisma as any).liveUpdate.create({
      data: {
        coverageId,
        title: title || null,
        bodyText,
        isUrgent: Boolean(isUrgent),
        mediaUrl: mediaUrl || null,
        sourceName: sourceName || null,
        publishedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true, update });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

