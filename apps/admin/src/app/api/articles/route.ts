import { NextRequest, NextResponse } from "next/server";
import { prisma, ArticleKind, ArticleStatus, DisplayPolicy } from "@awt/db";
import { generateArabicSlug } from "@awt/shared";
import { searchClient } from "@awt/search";
import { getSessionUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("awt_session")?.value;
    const session = await getSessionUser(token);

    if (!session) {
      return NextResponse.json({ error: "غير مصرح لك بتنفيذ هذه العملية" }, { status: 401 });
    }

    const body = await request.json();
    const {
      titleAr,
      sectionSlug = "palestine",
      kind = "NEWS",
      summaryAr = "",
      isBreaking = false,
      status = "PUBLISHED",
      authorName,
    } = body;

    if (!titleAr || !titleAr.trim()) {
      return NextResponse.json({ error: "عنوان المقال مطلوب" }, { status: 400 });
    }

    // 1. تحديد القسم
    let section = await prisma.section.findUnique({
      where: { slug: sectionSlug },
    });

    if (!section) {
      section = await prisma.section.findFirst();
    }

    if (!section) {
      return NextResponse.json({ error: "لا يوجد قسم صالح لربط المقال" }, { status: 400 });
    }

    // 2. توليد الرابط اللطيف الفريد
    const baseSlug = generateArabicSlug(titleAr);
    const slug = `${baseSlug}-${Date.now().toString(36)}`;
    const now = new Date();

    // 3. إنشاء أو ربط كاتب تحريري
    let authorId: string | undefined = undefined;
    if (authorName && authorName.trim()) {
      const authorSlug = generateArabicSlug(authorName);
      const author = await prisma.author.upsert({
        where: { slug: authorSlug },
        update: { nameAr: authorName },
        create: {
          slug: authorSlug,
          nameAr: authorName,
          bioAr: "محرر في فريق الوطن اليوم",
        },
      });
      authorId = author.id;
    }

    // 4. إنشاء المقال
    const article = await prisma.article.create({
      data: {
        slug,
        titleAr: titleAr.trim(),
        titleOriginal: titleAr.trim(),
        summaryAr: summaryAr.trim() || titleAr.trim(),
        kind: (kind as ArticleKind) || "NEWS",
        status: (status as ArticleStatus) || "PUBLISHED",
        displayPolicy: DisplayPolicy.LICENSED_FULL,
        isBreaking: !!isBreaking,
        breakingUntil: isBreaking ? new Date(now.getTime() + 60 * 60 * 1000) : null,
        publishedAt: status === "PUBLISHED" ? now : null,
        sectionId: section.id,
        authorId: authorId,
        translatedBy: "human",
      },
      include: {
        section: true,
      },
    });

    // 5. الفهرسة في محرك البحث عند النشر المباشر
    if (article.status === "PUBLISHED") {
      searchClient.indexArticles([
        {
          id: article.id,
          slug: article.slug,
          titleAr: article.titleAr,
          titleOriginal: article.titleOriginal,
          summaryAr: article.summaryAr,
          sectionSlug: section.slug,
          sectionNameAr: section.nameAr,
          sourceNameAr: authorName || "هيئة التحرير",
          sourceSlug: "editorial-team",
          isBreaking: article.isBreaking,
          publishedAt: now.toISOString(),
          publishedAtTimestamp: now.getTime(),
          importance: isBreaking ? 9 : 7,
        },
      ]).catch((err) => {
        console.warn("⚠️ Meilisearch indexing warning:", err);
      });
    }

    // 6. تسجيل في سجل التدقيق
    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: "CREATE_ARTICLE",
        entityType: "Article",
        entityId: article.id,
        after: {
          titleAr: article.titleAr,
          sectionSlug: section.slug,
          status: article.status,
          isBreaking: article.isBreaking,
        },
      },
    });

    return NextResponse.json({
      success: true,
      id: article.id,
      slug: article.slug,
    });
  } catch (error) {
    console.error("Failed to create article:", error);
    return NextResponse.json({ error: "حدث خطأ غير متوقع أثناء حفظ المقال" }, { status: 500 });
  }
}
