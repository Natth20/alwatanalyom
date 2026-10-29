import { MetadataRoute } from "next";
import { prisma } from "@awt/db";
import { SITE_SECTIONS } from "@awt/shared";

export const revalidate = 3600; // إعادة التوليد كل ساعة

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://alwatantoday.net";

  // الصفحات الثابتة
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "always", priority: 1.0 },
    { url: `${baseUrl}/breaking`, lastModified: new Date(), changeFrequency: "always", priority: 0.9 },
    { url: `${baseUrl}/economy`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.8 },
    { url: `${baseUrl}/live`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/how-we-aggregate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/editorial-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/sources-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/corrections`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.5 },
  ];

  // صفحات الأقسام
  const sectionRoutes: MetadataRoute.Sitemap = SITE_SECTIONS.map((sec) => ({
    url: `${baseUrl}/${sec.slug}`,
    lastModified: new Date(),
    changeFrequency: "hourly",
    priority: sec.slug === "palestine" ? 0.9 : 0.8,
  }));

  // أحدث 500 مقال منشور
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await prisma.article.findMany({
      where: {
        status: "PUBLISHED",
        displayPolicy: { not: "TITLE_ONLY" }, // استبعاد TITLE_ONLY من الفهرسة لتجنب الصفحات الرقيقة
      },
      select: {
        id: true,
        slug: true,
        publishedAt: true,
        updatedAtPub: true,
      },
      orderBy: { publishedAt: "desc" },
      take: 500,
    });

    articleRoutes = articles.map((art) => ({
      url: `${baseUrl}/article/${art.id}/${art.slug}`,
      lastModified: art.updatedAtPub || art.publishedAt || new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    }));
  } catch {
    // في حال عدم توفر اتصال قاعدة البيانات وقت البناء
  }

  return [...staticRoutes, ...sectionRoutes, ...articleRoutes];
}

