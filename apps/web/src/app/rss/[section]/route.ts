import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@awt/db";

export const revalidate = 600; // 10 دقائق

interface Props {
  params: Promise<{
    section: string;
  }>;
}

export async function GET(_request: NextRequest, { params }: Props) {
  const { section: sectionSlug } = await params;
  const baseUrl = "https://alwatantoday.net";

  let sectionName = "الرئيسية";
  let articles: any[] = [];

  try {
    const section = await prisma.section.findUnique({
      where: { slug: sectionSlug },
    });

    if (section) {
      sectionName = section.nameAr;
    }

    articles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        ...(section ? { sectionId: section.id } : {}),
      },
      include: { source: true, section: true },
      orderBy: { publishedAt: "desc" },
      take: 50,
    });
  } catch {
    // fallback
  }

  const itemsXml = articles
    .map((art) => {
      const pubDate = (art.publishedAt || new Date()).toUTCString();
      const titleEscaped = art.titleAr
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      const summaryEscaped = (art.summaryAr || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      return `
    <item>
      <title>${titleEscaped}</title>
      <link>${baseUrl}/article/${art.id}/${art.slug}</link>
      <guid isPermaLink="true">${baseUrl}/article/${art.id}/${art.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${summaryEscaped}</description>
      <source url="${art.sourceUrl || baseUrl}">${art.source?.nameAr || "الوطن اليوم"}</source>
      <category>${art.section.nameAr}</category>
    </item>`;
    })
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>الوطن اليوم — قسم ${sectionName}</title>
    <link>${baseUrl}/${sectionSlug}</link>
    <description>خلاصة الأخبار والتغطيات لقسم ${sectionName} من منصة الوطن اليوم بمصادرها الأصلية</description>
    <language>ar</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss/${sectionSlug}" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60",
    },
  });
}
