import { NextResponse } from "next/server";
import { prisma } from "@awt/db";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updated = await (prisma as any).liveCoverage.update({
      where: { id },
      data: {
        ...(body.isActive !== undefined && { isActive: Boolean(body.isActive) }),
        ...(body.pinned !== undefined && { pinned: Boolean(body.pinned) }),
        ...(body.title !== undefined && { title: body.title }),
        ...(body.streamUrl !== undefined && { streamUrl: body.streamUrl }),
        ...(body.summary !== undefined && { summary: body.summary }),
      },
    });

    return NextResponse.json({ ok: true, coverage: updated });
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

    await (prisma as any).liveCoverage.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

