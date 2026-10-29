import { NextResponse } from "next/server";
import { prisma } from "@awt/db";

export const revalidate = 900; // 15 دقيقة

export async function GET() {
  const baseUrl = "https://alwatantoday.net";
  const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

  let articles: any[] = [];
  try {
    articles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        publishedAt: { gte: fortyEightHoursAgo },
        displayPolicy: { in: ["EXCERPT", "SUMMARY", "LICENSED_FULL"] },
      },
      select: {
        id: true,
        slug: true,
        titleAr: true,
        publishedAt: true,
        lang: true,
      },
      orderBy: { publishedAt: "desc" },
      take: 1000,
    });
  } catch {
    // تجاهل في حالة عدم توفر الاتصال
  }

  const xmlEntries = articles
    .map((art) => {
      const pubDate = (art.publishedAt || new Date()).toISOString();
      const titleEscaped = art.titleAr
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");

      return `
  <url>
    <loc>${baseUrl}/article/${art.id}/${art.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>الوطن اليوم</news:name>
        <news:language>${art.lang.toLowerCase()}</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${titleEscaped}</news:title>
    </news:news>
  </url>`;
    })
    .join("");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${xmlEntries}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=60",
    },
  });
}
