import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { prisma } from "@awt/db";

const DEFAULT_EDITORIAL_POLL = {
  slug: "watan-priority-coverage-2026",
  question: "ما الملف الإخباري والخدمي الذي تمنحه الأولوية القصوى في متابعتك اليومية عبر «الوطن اليوم»؟",
  description: "استطلاع رأي تفاعلي مباشر مسجّل في قاعدة البيانات — صوت كل قارئ يُحسب فورياً بشفافية.",
  options: [
    "التطورات الميدانية والإنسانية في غزة والقدس والضفة",
    "مؤشرات أسعار الذهب والعملات والوضع المعيشي",
    "دليل المساعدات الإغاثية الرسمية وفرص العمل",
    "وحدة التحقق من الشائعات والتغطية الرياضية والسياسية",
  ],
};

function getVoterHash(req: NextRequest): string {
  const cookieToken = req.cookies.get("awt_voter")?.value || "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const ua = req.headers.get("user-agent") || "ua";
  return createHash("sha256").update(`${cookieToken}|${ip}|${ua}`).digest("hex").slice(0, 32);
}

export async function GET(req: NextRequest) {
  if (!prisma) {
    return NextResponse.json({ poll: null, dbUnavailable: true }, { status: 200 });
  }

  try {
    let poll = await prisma.poll.findFirst({
      where: { active: true },
      orderBy: { createdAt: "desc" },
      include: {
        options: {
          orderBy: { sortOrder: "asc" },
          include: {
            _count: { select: { votes: true } },
          },
        },
        _count: { select: { votes: true } },
      },
    });

    if (!poll) {
      poll = await prisma.poll.create({
        data: {
          slug: DEFAULT_EDITORIAL_POLL.slug,
          question: DEFAULT_EDITORIAL_POLL.question,
          description: DEFAULT_EDITORIAL_POLL.description,
          active: true,
          options: {
            create: DEFAULT_EDITORIAL_POLL.options.map((text, idx) => ({
              text,
              sortOrder: idx,
            })),
          },
        },
        include: {
          options: {
            orderBy: { sortOrder: "asc" },
            include: {
              _count: { select: { votes: true } },
            },
          },
          _count: { select: { votes: true } },
        },
      });
    }

    const voterHash = getVoterHash(req);
    const existingVote = await prisma.pollVote.findFirst({
      where: { pollId: poll.id, voterHash },
      select: { optionId: true },
    });

    return NextResponse.json({
      poll: {
        id: poll.id,
        slug: poll.slug,
        question: poll.question,
        description: poll.description,
        totalVotes: poll._count.votes,
        votedOptionId: existingVote?.optionId || null,
        options: poll.options.map((o) => ({
          id: o.id,
          text: o.text,
          votes: o._count.votes,
        })),
      },
    });
  } catch (err) {
    console.warn("[API/polls] Failed:", (err as Error)?.message ?? err);
    return NextResponse.json({ poll: null, error: "POLL_FETCH_FAILED" }, { status: 200 });
  }
}
