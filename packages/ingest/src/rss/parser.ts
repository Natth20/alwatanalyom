import { XMLParser } from "fast-xml-parser";
import sanitizeHtml from "sanitize-html";
import { canonicalizeUrl } from "@awt/shared";

export interface ParsedRawItem {
  title: string;
  url: string;
  canonicalUrl: string;
  summary?: string;
  publishedAt?: Date;
  externalId?: string;
  imageUrl?: string;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  trimValues: true,
  parseTagValue: false,
});

/**
 * تنظيف نصوص الملخصات وإزالة أي وسوم خطرة
 */
function sanitizeSummary(dirty?: string): string | undefined {
  if (!dirty) return undefined;
  const clean = sanitizeHtml(dirty, {
    allowedTags: ["b", "i", "em", "strong", "p", "br"],
    allowedAttributes: {},
  }).trim();
  return clean || undefined;
}

/**
 * تحليل محتوى XML لـ RSS أو Atom واستخراج العناصر الخام
 */
export function parseFeedXml(xmlContent: string): ParsedRawItem[] {
  const result = parser.parse(xmlContent);
  const items: ParsedRawItem[] = [];

  // التعامل مع خلاصات RSS 2.0 (channel.item)
  const channel = result?.rss?.channel || result?.channel;
  if (channel) {
    const rawItems = Array.isArray(channel.item) ? channel.item : channel.item ? [channel.item] : [];

    for (const raw of rawItems) {
      const title = raw.title?.["#text"] || raw.title;
      const link = raw.link?.["#text"] || raw.link || raw.guid?.["#text"] || raw.guid;
      if (!title || !link || typeof link !== "string") continue;

      const summaryRaw = raw.description?.["#text"] || raw.description || raw["content:encoded"];
      const pubDateRaw = raw.pubDate || raw.date || raw["dc:date"];
      let publishedAt: Date | undefined;
      if (pubDateRaw) {
        const d = new Date(pubDateRaw);
        if (!isNaN(d.getTime())) publishedAt = d;
      }

      const externalId = raw.guid?.["#text"] || raw.guid || link;
      const imageUrl =
        raw.enclosure?.["@_url"] ||
        raw["media:content"]?.["@_url"] ||
        raw["media:thumbnail"]?.["@_url"];

      const canonical = canonicalizeUrl(link);

      items.push({
        title: typeof title === "string" ? title.trim() : String(title),
        url: link,
        canonicalUrl: canonical,
        summary: sanitizeSummary(summaryRaw),
        publishedAt,
        externalId: typeof externalId === "string" ? externalId : undefined,
        imageUrl: typeof imageUrl === "string" ? imageUrl : undefined,
      });
    }

    return items;
  }

  // التعامل مع خلاصات Atom (feed.entry)
  const feed = result?.feed;
  if (feed) {
    const rawEntries = Array.isArray(feed.entry) ? feed.entry : feed.entry ? [feed.entry] : [];

    for (const raw of rawEntries) {
      const title = raw.title?.["#text"] || raw.title;
      let link: string | undefined;

      if (Array.isArray(raw.link)) {
        const alt = raw.link.find((l: any) => l["@_rel"] === "alternate") || raw.link[0];
        link = alt?.["@_href"];
      } else if (raw.link?.["@_href"]) {
        link = raw.link["@_href"];
      } else if (typeof raw.link === "string") {
        link = raw.link;
      }

      if (!title || !link) continue;

      const summaryRaw = raw.summary?.["#text"] || raw.summary || raw.content?.["#text"] || raw.content;
      const pubDateRaw = raw.published || raw.updated;
      let publishedAt: Date | undefined;
      if (pubDateRaw) {
        const d = new Date(pubDateRaw);
        if (!isNaN(d.getTime())) publishedAt = d;
      }

      const externalId = raw.id?.["#text"] || raw.id || link;
      const canonical = canonicalizeUrl(link);

      items.push({
        title: typeof title === "string" ? title.trim() : String(title),
        url: link,
        canonicalUrl: canonical,
        summary: sanitizeSummary(summaryRaw),
        publishedAt,
        externalId: typeof externalId === "string" ? externalId : undefined,
      });
    }
  }

  return items;
}

