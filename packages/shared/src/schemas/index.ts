import { z } from "zod";

/**
 * مخطط التحقق من مخرجات نموذج الذكاء الاصطناعي (Claude API)
 */
export const AIOutputSchema = z.object({
  titleAr: z.string().min(5).max(200),
  summaryAr: z.string().min(10).max(1000).nullable(),
  sectionSlug: z.string().min(2),
  subSlug: z.string().nullable().optional(),
  countryCodes: z.array(z.string().length(2)).default([]),
  entities: z.array(
    z.object({
      type: z.enum(["person", "org", "place", "event", "other"]),
      nameAr: z.string(),
      nameEn: z.string().optional(),
    })
  ).default([]),
  kind: z.enum(["NEWS", "BREAKING", "ANALYSIS", "OPINION"]).default("NEWS"),
  isBreaking: z.boolean().default(false),
  importance: z.number().int().min(0).max(100).default(50),
  sensitivity: z.array(z.string()).default([]),
  alsoIn: z.array(z.string()).default([]),
  confidence: z.number().min(0).max(1).default(0.8),
});

export type AIOutput = z.infer<typeof AIOutputSchema>;

/**
 * مخطط التحقق من استعلام البحث العام
 */
export const SearchQuerySchema = z.object({
  q: z.string().min(1).max(150),
  section: z.string().optional(),
  country: z.string().optional(),
  source: z.string().optional(),
  lang: z.enum(["ar", "en"]).default("ar"),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  sort: z.enum(["recent", "relevance"]).default("recent"),
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export type SearchQuery = z.infer<typeof SearchQuerySchema>;

/**
 * مخطط الاشتراك في النشرة البريدية
 */
export const NewsletterSubscribeSchema = z.object({
  email: z.string().email(),
  lists: z.array(z.string()).min(1).default(["general"]),
  turnstileToken: z.string().optional(),
});

export type NewsletterSubscribe = z.infer<typeof NewsletterSubscribeSchema>;

/**
 * مخطط الاشتراك في إشعارات الويب
 */
export const PushSubscribeSchema = z.object({
  endpoint: z.string().url(),
  p256dh: z.string().min(10),
  auth: z.string().min(10),
  topics: z.array(z.string()).default([]),
  countryCodes: z.array(z.string()).default([]),
});

export type PushSubscribe = z.infer<typeof PushSubscribeSchema>;

/**
 * مخطط الإبلاغ عن خطأ في خبر
 */
export const ReportIssueSchema = z.object({
  articleId: z.string().min(1),
  message: z.string().min(10).max(2000),
  email: z.string().email().optional(),
  turnstileToken: z.string().optional(),
});

export type ReportIssue = z.infer<typeof ReportIssueSchema>;

