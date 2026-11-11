import { NextRequest, NextResponse } from "next/server";
import { prisma, ArticleKind, ArticleStatus } from "@awt/db";
import { generateArabicSlug } from "@awt/shared";
import { searchClient } from "@awt/search";
import { getSessionUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("awt_session")?.value;
    const session = await getSessionUser(token);

    if (!session) {
      return NextResponse.json({ error: "غير مصرح لك بإجراء هذه العملية التحريرية" }, { status: 401 });
    }

    const body = await request.json();
    const { itemId, action, rejectReason, modifiedTitle, modifiedSummary } = body;

    if (!itemId) {
      return NextResponse.json({ error: "معرّف المادة مطلوب" }, { status: 400 });
    }

    const item = await prisma.item.findUnique({
      where: { id: itemId },
      include: { source: true },
    });

    if (!item) {
      return NextResponse.json({ error: "المادة غير موجودة" }, { status: 404 });
    }

    const now = new Date();

    if (action === "approve") {
      // 1. تحديد العنوان والملخص النهائي
      const finalTitle = modifiedTitle?.trim() || item.titleAr || item.titleOriginal;
      const finalSummary = modifiedSummary?.trim() || item.summaryOrig || finalTitle;

      // 2. ربط أو إنشاء القسم
      let section = null;
      if (item.sectionGuess) {
        section = await prisma.section.findUnique({ where: { slug: item.sectionGuess } });
      }
      if (!section) {
        section = await prisma.section.findUnique({ where: { slug: "palestine" } }) || await prisma.section.findFirst();
      }

      if (!section) {
        return NextResponse.json({ error: "تعذر العثور على قسم لنشر المادة" }, { status: 400 });
      }

      // 3. إدارة القصة المجمعة (Story)
      let storyId = item.storyId;
      if (!storyId) {
        const storySlug = generateArabicSlug(finalTitle, 60);
        const story = await prisma.story.create({
          data: {
            slug: `${storySlug}-${Date.now().toString(36)}`,
            headlineAr: finalTitle,
            summaryAr: finalSummary,
            importance: 7,
            trendingScore: 10,
            firstSeenAt: item.publishedAtSource || now,
            lastUpdatedAt: now,
            sectionId: section.id,
          },
        });
        storyId = story.id;
      }

      // 4. إنشاء المقال المنشور
      const articleSlug = generateArabicSlug(finalTitle);
      const article = await prisma.article.create({
        data: {
          slug: `${articleSlug}-${Date.now().toString(36)}`,
          titleAr: finalTitle,
          titleOriginal: item.titleOriginal,
          summaryAr: finalSummary,
          kind: ArticleKind.NEWS,
          status: ArticleStatus.PUBLISHED,
          displayPolicy: item.source.displayPolicy,
          translatedBy: "human",
          sourceId: item.sourceId,
          itemId: item.id,
          sourceUrl: item.canonicalUrl,
          storyId: storyId,
          sectionId: section.id,
          isBreaking: item.isBreaking,
          breakingUntil: item.isBreaking ? new Date(now.getTime() + 60 * 60 * 1000) : null,
          publishedAt: now,
          sourcePublishedAt: item.publishedAtSource,
        },
      });

      // 5. تحديث حالة العنصر
      await prisma.item.update({
        where: { id: item.id },
        data: {
          status: "PUBLISHED",
          storyId,
          titleAr: finalTitle,
        },
      });

      // 6. الفهرسة في محرك البحث
      searchClient.indexArticles([
        {
          id: article.id,
          slug: article.slug,
          titleAr: article.titleAr,
          titleOriginal: article.titleOriginal,
          summaryAr: article.summaryAr,
          sectionSlug: section.slug,
          sectionNameAr: section.nameAr,
          sourceNameAr: item.source.nameAr,
          sourceSlug: item.source.slug,
          isBreaking: article.isBreaking,
          publishedAt: now.toISOString(),
          publishedAtTimestamp: now.getTime(),
          importance: 7,
        },
      ]).catch(console.warn);

      // 7. توثيق في سجل التدقيق
      await prisma.auditLog.create({
        data: {
          userId: session.id,
          action: "APPROVE_REVIEW_ITEM",
          entityType: "Item",
          entityId: item.id,
          after: { articleId: article.id, titleAr: finalTitle, status: "PUBLISHED" },
        },
      });

      return NextResponse.json({
        success: true,
        message: "تم اعتماد ونشر المادة بنجاح",
        articleId: article.id,
      });
    } else if (action === "reject") {
      await prisma.item.update({
        where: { id: item.id },
        data: {
          status: "REJECTED",
          rejectReason: rejectReason || "مرفوضة بقرار المحرر البشري",
        },
      });

      await prisma.auditLog.create({
        data: {
          userId: session.id,
          action: "REJECT_REVIEW_ITEM",
          entityType: "Item",
          entityId: item.id,
          after: { status: "REJECTED", reason: rejectReason },
        },
      });

      return NextResponse.json({
        success: true,
        message: "تم رفض واستبعاد المادة",
      });
    }

    return NextResponse.json({ error: "الإجراء غير صالح" }, { status: 400 });
  } catch (error) {
    console.error("Failed to process review item:", error);
    return NextResponse.json({ error: "حدث خطأ غير متوقع أثناء معالجة المادة" }, { status: 500 });
  }
}

