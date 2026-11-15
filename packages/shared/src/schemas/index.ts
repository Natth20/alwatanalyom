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

/**
 * مخطط نموذج التواصل العام
 */
export const ContactFormSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب (حرفان على الأقل)").max(100),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  department: z.enum(["editorial", "opinion", "technical", "advertising", "management"]).default("editorial"),
  subject: z.string().min(3).max(200).optional(),
  message: z.string().min(10, "الرسالة قصيرة جداً (10 أحرف على الأقل)").max(4000),
  phone: z.string().max(30).optional(),
  turnstileToken: z.string().optional(),
});

export type ContactForm = z.infer<typeof ContactFormSchema>;

/**
 * مخطط إرسال خبر أو تسريب لغرفة التحرير
 */
export const SubmitNewsTipSchema = z.object({
  title: z.string().min(5, "عنوان الخبر مطلوب").max(200),
  details: z.string().min(20, "تفاصيل الخبر يجب ألا تقل عن 20 حرفاً").max(5000),
  location: z.string().min(2).max(100).optional(),
  sourceType: z.enum(["eyewitness", "document", "official_source", "other"]).default("eyewitness"),
  attachmentUrl: z.string().url().optional(),
  isAnonymous: z.boolean().default(false),
  senderName: z.string().max(100).optional(),
  senderContact: z.string().max(150).optional(),
  turnstileToken: z.string().optional(),
});

export type SubmitNewsTip = z.infer<typeof SubmitNewsTipSchema>;

/**
 * مخطط استعلام «اسأل الوطن» من الأرشيف الصحفي
 */
export const AskQuestionSchema = z.object({
  question: z.string().min(2, "السؤال قصير جداً").max(400, "السؤال طويل جداً"),
});

export type AskQuestion = z.infer<typeof AskQuestionSchema>;


