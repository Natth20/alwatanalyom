import { NextResponse } from "next/server";
import { prisma, AdSlotPosition, AdType } from "@awt/db";


export async function GET() {
  try {
    const campaigns = await prisma.adCampaign.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      ok: true,
      campaigns,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      type,
      position,
      clientName,
      imageUrl,
      targetUrl,
      altText,
      scriptCode,
      targetSections,
      startsAt,
      endsAt,
      maxImpressions,
      maxClicks,
    } = body;

    if (!name || !position) {
      return NextResponse.json(
        { ok: false, error: "اسم الحملة وموقع المساحة الإعلانية مطلوبان" },
        { status: 400 }
      );
    }

    const campaign = await prisma.adCampaign.create({
      data: {
        name,
        type: (type as AdType) || AdType.GOOGLE_ADSENSE,
        position: position as AdSlotPosition,
        clientName: clientName || null,
        imageUrl: imageUrl || null,
        targetUrl: targetUrl || null,
        altText: altText || null,
        scriptCode: scriptCode || null,
        targetSections: Array.isArray(targetSections) ? targetSections : [],
        startsAt: startsAt ? new Date(startsAt) : new Date(),
        endsAt: endsAt ? new Date(endsAt) : null,
        maxImpressions: maxImpressions ? parseInt(maxImpressions, 10) : null,
        maxClicks: maxClicks ? parseInt(maxClicks, 10) : null,
        enabled: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "create_ad_campaign",
        entityType: "AdCampaign",
        entityId: campaign.id,
        after: campaign as any,
      },
    });

    return NextResponse.json({
      ok: true,
      campaign,
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
