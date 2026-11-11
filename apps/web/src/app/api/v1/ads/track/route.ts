import { NextResponse } from "next/server";
import { prisma } from "@awt/db";


export async function POST(req: Request) {
  try {
    const { id, event } = await req.json();

    if (!id || (event !== "impression" && event !== "click")) {
      return NextResponse.json({ ok: false, error: "طلب غير صالح" }, { status: 400 });
    }

    if (event === "impression") {
      await prisma.adCampaign.update({
        where: { id },
        data: { impressions: { increment: 1 } },
      });
    } else if (event === "click") {
      await prisma.adCampaign.update({
        where: { id },
        data: { clicks: { increment: 1 } },
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    // إرجاع نجاح حتى لو حدث خطأ لتجنب تعطيل المتصفح
    return NextResponse.json({ ok: true });
  }
}

