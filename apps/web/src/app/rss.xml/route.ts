import { NextResponse } from "next/server";
import { getGlobalRssArticles } from "@/lib/dal";

export const revalidate = 900; // 15 دقيقة

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await getGlobalRssArticles(50);
  const siteUrl = "https://alwatantoday.net";

  const itemsXml = articles
    .map((article) => {
      const articleUrl = `${siteUrl}/article/${article.id}/${article.slug}`;
      const pubDate = new Date(article.publishedAt).toUTCString();

      return `
    <item>
      <title>${escapeXml(article.titleAr)}</title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(article.summaryAr)}</description>
      <category>${escapeXml(article.sectionNameAr)}</category>
      <source url="${siteUrl}/rss.xml">الوطن اليوم</source>
      ${article.authorNameAr ? `<author>${escapeXml(article.authorNameAr)}</author>` : ""}
    </item>`;
    })
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>الوطن اليوم — منصة إخبارية متكاملة</title>
    <link>${siteUrl}</link>
    <description>تغطية إخبارية شاملة وموثوقة على مدار الساعة، تركز على فلسطين والعالم العربي والدولي.</description>
    <language>ar</language>
    <copyright>© ${new Date().getFullYear()} الوطن اليوم. جميع الحقوق محفوظة.</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=900, stale-while-revalidate=300",
    },
  });
}

