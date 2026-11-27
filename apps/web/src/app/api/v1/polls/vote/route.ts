import { NextRequest, NextResponse } from "next/server";
import { createHash, randomUUID } from "node:crypto";
import { prisma } from "@awt/db";

export async function POST(req: NextRequest) {
  if (!prisma) {
    return NextResponse.json(
      { error: { code: "DB_UNAVAILABLE", message: "خدمة التصويت غير متاحة مؤقتاً" } },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const pollId = String(body?.pollId || "");
    const optionId = String(body?.optionId || "");

    if (!pollId || !optionId) {
      return NextResponse.json(
        { error: { code: "INVALID_INPUT", message: "بيانات التصويت غير مكتملة" } },
        { status: 400 }
      );
    }

    let cookieToken = req.cookies.get("awt_voter")?.value || "";
    const shouldSetCookie = !cookieToken;
    if (!cookieToken) {
      cookieToken = randomUUID();
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const ua = req.headers.get("user-agent") || "ua";
    const voterHash = createHash("sha256")
      .update(`${cookieToken}|${ip}|${ua}`)
      .digest("hex")
      .slice(0, 32);

    const option = await prisma.pollOption.findFirst({
      where: { id: optionId, pollId },
      select: { id: true },
    });

    if (!option) {
      return NextResponse.json(
        { error: { code: "OPTION_NOT_FOUND", message: "الخيار المطلوب غير موجود" } },
        { status: 404 }
      );
    }

    const existing = await prisma.pollVote.findFirst({
      where: { pollId, voterHash },
      select: { id: true, optionId: true },
    });

    if (!existing) {
      await prisma.pollVote.create({
        data: { pollId, optionId, voterHash },
      });
    }

    const updated = await prisma.poll.findUnique({
      where: { id: pollId },
      include: {
        options: {
          orderBy: { sortOrder: "asc" },
          include: { _count: { select: { votes: true } } },
        },
        _count: { select: { votes: true } },
      },
    });

    const response = NextResponse.json({
      ok: true,
      alreadyVoted: Boolean(existing),
      votedOptionId: existing?.optionId || optionId,
      poll: updated
        ? {
            id: updated.id,
            slug: updated.slug,
            question: updated.question,
            description: updated.description,
            totalVotes: updated._count.votes,
            votedOptionId: existing?.optionId || optionId,
            options: updated.options.map((o) => ({
              id: o.id,
              text: o.text,
              votes: o._count.votes,
            })),
          }
        : null,
    });

    if (shouldSetCookie) {
      response.cookies.set("awt_voter", cookieToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    }

    return response;
  } catch (err) {
    console.warn("[API/polls/vote] Failed:", (err as Error)?.message ?? err);
    return NextResponse.json(
      { error: { code: "VOTE_FAILED", message: "تعذر تسجيل الصوت" } },
      { status: 500 }
    );
  }
}
