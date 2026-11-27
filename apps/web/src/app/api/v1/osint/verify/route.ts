import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@awt/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = String(body?.query || "").trim();

    if (input.length < 2) {
      return NextResponse.json(
        { error: "يرجى إدخال نص ادعاء أو رابط كامل (حرفين على الأقل)." },
        { status: 400 }
      );
    }

    const isUrl = /^https?:\/\/.+/i.test(input);
    let urlInspection: {
      reachable: boolean;
      status: number | null;
      domain: string | null;
      title: string | null;
      contentType: string | null;
    } | null = null;

    if (isUrl) {
      try {
        const parsed = new URL(input);
        const res = await fetch(parsed.toString(), {
          method: "GET",
          headers: { "User-Agent": "AlWatanTodayBot/1.0 (+https://alwatantoday.net)" },
          redirect: "follow",
          signal: AbortSignal.timeout(6000),
        });
        const contentType = res.headers.get("content-type") || null;
        let extractedTitle: string | null = null;
        if (contentType?.includes("text/html")) {
          const text = await res.text();
          const titleMatch = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
          if (titleMatch?.[1]) {
            extractedTitle = titleMatch[1].replace(/\s+/g, " ").trim().slice(0, 180);
          }
        }
        urlInspection = {
          reachable: res.ok,
          status: res.status,
          domain: parsed.hostname,
          title: extractedTitle,
          contentType,
        };
      } catch {
        let hostname: string | null = null;
        try {
          hostname = new URL(input).hostname;
        } catch {}
        urlInspection = {
          reachable: false,
          status: null,
          domain: hostname,
          title: null,
          contentType: null,
        };
      }
    }

    const keywords = input
      .replace(/^https?:\/\//i, "")
      .split(/[\s/?&=._-]+/)
      .filter((w) => w.length >= 3)
      .slice(0, 4);

    let matchedFactChecks: {
      id: string;
      slug: string;
      claim: string;
      verdict: string;
      verdictLabel: string;
      summary: string;
    }[] = [];

    let matchedArticles: {
      id: string;
      slug: string;
      titleAr: string;
      publishedAt: string;
      sourceName: string;
    }[] = [];

    if (prisma && keywords.length > 0) {
      const orClause = keywords.map((kw) => ({
        claim: { contains: kw, mode: "insensitive" as const },
      }));
      const articleOr = keywords.map((kw) => ({
        titleAr: { contains: kw, mode: "insensitive" as const },
      }));

      const [fcs, arts] = await Promise.all([
        prisma.factCheck.findMany({
          where: { OR: orClause },
          take: 5,
          orderBy: { publishedAt: "desc" },
          select: {
            id: true,
            slug: true,
            claim: true,
            verdict: true,
            verdictLabel: true,
            summary: true,
          },
        }),
        prisma.article.findMany({
          where: { status: "PUBLISHED", OR: articleOr },
          take: 5,
          orderBy: { publishedAt: "desc" },
          select: {
            id: true,
            slug: true,
            titleAr: true,
            publishedAt: true,
            source: { select: { nameAr: true } },
          },
        }),
      ]);

      matchedFactChecks = fcs;
      matchedArticles = arts.map((a) => ({
        id: a.id,
        slug: a.slug,
        titleAr: a.titleAr,
        publishedAt: (a.publishedAt || new Date()).toISOString(),
        sourceName: a.source?.nameAr || "الوطن اليوم",
      }));
    }

    return NextResponse.json({
      ok: true,
      query: input,
      isUrl,
      urlInspection,
      matchedFactChecks,
      matchedArticles,
      checkedAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error)?.message || "فشل تنفيذ الفحص المباشر" },
      { status: 500 }
    );
  }
}
