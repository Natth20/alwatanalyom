import { NextResponse } from "next/server";
import { runLiveIngest } from "@awt/ingest";
import { prisma } from "@awt/db";

export const maxDuration = 60; // 60 seconds max

export async function POST(req: Request) {
  try {
    let sourceId: string | undefined;
    let limitPerSource = 10;

    try {
      const body = await req.json();
      if (body.sourceId) sourceId = body.sourceId;
      if (body.limit) limitPerSource = body.limit;
    } catch {
      // no body or json parsing skipped
    }

    const report = await runLiveIngest(prisma, { sourceId, limitPerSource });

    // تتبع النشاط في AuditLog
    await prisma.auditLog.create({
      data: {
        action: "manual_live_ingest",
        entityType: "IngestReport",
        entityId: report.timestamp,
        after: report as any,
      },
    });

    return NextResponse.json({
      ok: true,
      message: `تم جلب ${report.totalNewArticles} خبراً جديداً بنجاح من ${report.sourcesProcessed} مصدراً`,
      report,
    });
  } catch (error: any) {
    console.error("خطأ أثناء تشغيل الجلب اللحظي:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error.message || "فشل الجلب اللحظي",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const totalArticles = await prisma.article.count();
    const totalSources = await prisma.source.count({ where: { enabled: true } });
    const lastArticle = await prisma.article.findFirst({
      orderBy: { publishedAt: "desc" },
      select: { publishedAt: true, titleAr: true },
    });

    return NextResponse.json({
      ok: true,
      stats: {
        totalArticles,
        totalSources,
        lastArticleTime: lastArticle?.publishedAt,
        lastArticleTitle: lastArticle?.titleAr,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
