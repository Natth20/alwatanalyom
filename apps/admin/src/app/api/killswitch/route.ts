import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@awt/db";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const policy = await prisma.publishPolicy.findFirst({
      where: { name: "MASTER_KILL_SWITCH" },
    });

    const isKilled = policy ? !policy.enabled : false;

    return NextResponse.json({
      isKilled,
      updatedAt: policy?.updatedAt || null,
    });
  } catch {
    return NextResponse.json({ isKilled: false });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("awt_session")?.value;
    const session = await getSessionUser(token);

    if (!session) {
      return NextResponse.json({ error: "غير مصرح لك بتشغيل مفتاح الإيقاف الطارئ" }, { status: 401 });
    }

    const body = await request.json();
    const { kill } = body; // true to engage kill switch, false to resume

    const policy = await prisma.publishPolicy.upsert({
      where: { id: "master-kill-switch" },
      update: {
        enabled: !kill, // enabled=false means killed
      },
      create: {
        id: "master-kill-switch",
        name: "MASTER_KILL_SWITCH",
        enabled: !kill,
        rules: { description: "Master Kill Switch for newsroom automation pipeline" },
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: kill ? "ENGAGE_KILL_SWITCH" : "DISENGAGE_KILL_SWITCH",
        entityType: "PublishPolicy",
        entityId: policy.id,
        after: { isKilled: kill },
      },
    });

    return NextResponse.json({
      success: true,
      isKilled: !policy.enabled,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "فشل تغيير حالة مفتاح الإيقاف" }, { status: 500 });
  }
}

