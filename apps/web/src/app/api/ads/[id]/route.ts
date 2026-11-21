import { NextResponse } from "next/server";
import { prisma } from "@awt/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await prisma.adCampaign.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.type !== undefined && { type: body.type }),
        ...(body.position !== undefined && { position: body.position }),
        ...(body.enabled !== undefined && { enabled: Boolean(body.enabled) }),
        ...(body.clientName !== undefined && { clientName: body.clientName }),
        ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
        ...(body.targetUrl !== undefined && { targetUrl: body.targetUrl }),
        ...(body.altText !== undefined && { altText: body.altText }),
        ...(body.scriptCode !== undefined && { scriptCode: body.scriptCode }),
        ...(body.targetSections !== undefined && { targetSections: body.targetSections }),
        ...(body.startsAt !== undefined && { startsAt: new Date(body.startsAt) }),
        ...(body.endsAt !== undefined && { endsAt: body.endsAt ? new Date(body.endsAt) : null }),
        ...(body.maxImpressions !== undefined && { maxImpressions: body.maxImpressions ? parseInt(body.maxImpressions, 10) : null }),
        ...(body.maxClicks !== undefined && { maxClicks: body.maxClicks ? parseInt(body.maxClicks, 10) : null }),
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "update_ad_campaign",
        entityType: "AdCampaign",
        entityId: id,
        after: updated as any,
      },
    });

    return NextResponse.json({ ok: true, campaign: updated });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.adCampaign.delete({
      where: { id },
    });

    await prisma.auditLog.create({
      data: {
        action: "delete_ad_campaign",
        entityType: "AdCampaign",
        entityId: id,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

