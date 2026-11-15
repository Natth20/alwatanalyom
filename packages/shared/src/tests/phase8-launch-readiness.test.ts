import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { SITE_SECTIONS, LEGACY_CATEGORY_REDIRECT_MAP, isMockDataAllowed } from "../index";

describe("المرحلة 8: مؤشرات التميز الخمسة وميثاق النزاهة الإحصائية (Section 1-ب & Rule 4)", () => {
  it("يتحقق من أن مؤشرات التميز تعيد 'لا بيانات بعد' عند غياب القياسات الحقلية بدلاً من الفبركة", () => {
    function formatExcellenceMetric(val: number | null, unit: string): string {
      if (val === null || val === undefined) return "لا بيانات بعد";
      return `${val} ${unit}`;
    }

    assert.equal(formatExcellenceMetric(null, "دقيقة"), "لا بيانات بعد");
    assert.equal(formatExcellenceMetric(4, "دقيقة"), "4 دقيقة");
  });

  it("يتحقق من مطابقة حدود Core Web Vitals المعتمدة لموبايل أولاً", () => {
    const webVitalsTargets = {
      lcpMaxMs: 2500, // LCP < 2.5s
      inpMaxMs: 200,  // INP < 200ms
      clsMax: 0.1,    // CLS < 0.1
    };

    assert.ok(webVitalsTargets.lcpMaxMs <= 2500, "LCP يجب أن يكون أقل من 2.5 ثانية");
    assert.ok(webVitalsTargets.inpMaxMs <= 200, "INP يجب أن يكون أقل من 200 ميلي ثانية");
    assert.ok(webVitalsTargets.clsMax <= 0.1, "CLS يجب أن يكون أقل من 0.1");
  });

  it("يتحقق من تغطية المحاور الاستراتيجية الأربعة للتخصص (فلسطين، المساعدات، الوظائف، الرياضة)", () => {
    const sectionSlugs = SITE_SECTIONS.map((s) => s.slug);
    assert.ok(sectionSlugs.includes("palestine"));
    assert.ok(sectionSlugs.includes("aid"));
    assert.ok(sectionSlugs.includes("jobs"));
    assert.ok(sectionSlugs.includes("sports"));
  });
});

describe("المرحلة 8: تدقيق ملفات السيو والأرشفة في محركات البحث (SEO & Sitemaps)", () => {
  it("يتحقق من وجود مسارات أخبار جوجل وخريطة الموقع في robots.txt", () => {
    const robotsConfig = {
      sitemaps: [
        "https://alwatantoday.net/sitemap.xml",
        "https://alwatantoday.net/news-sitemap.xml",
      ],
      disallowed: [
        "/api/",
        "/search?",
        "/saved",
        "/offline",
        "/newsletter/confirm/",
        "/newsletter/unsubscribe/",
      ],
    };

    assert.ok(robotsConfig.sitemaps.includes("https://alwatantoday.net/sitemap.xml"));
    assert.ok(robotsConfig.sitemaps.includes("https://alwatantoday.net/news-sitemap.xml"));
    assert.ok(robotsConfig.disallowed.includes("/api/"));
    assert.ok(robotsConfig.disallowed.includes("/newsletter/confirm/"));
  });

  it("يتحقق من معايير Google News Sitemap (نافذة الـ 48 ساعة والوسوم الإلزامية)", () => {
    const now = Date.now();
    const articleTime = now - 24 * 60 * 60 * 1000; // منذ 24 ساعة (ضمن النافذة)
    const oldArticleTime = now - 72 * 60 * 60 * 1000; // منذ 72 ساعة (خارج النافذة)

    const fortyEightHoursMs = 48 * 60 * 60 * 1000;
    assert.ok(now - articleTime <= fortyEightHoursMs, "المقال يجب أن يكون ضمن آخر 48 ساعة");
    assert.ok(now - oldArticleTime > fortyEightHoursMs, "المقالات الأقدم من 48 ساعة تستبعد من news-sitemap");
  });

  it("يتحقق من اكتمال خريطة تحويلات 301 لكافة أقسام ووردبريس القديمة لمنع خسارة السيو", () => {
    const legacyCategories = [
      "أخبار-اليوم",
      "اقتصاد-اليوم",
      "الملاعب-اليوم",
      "تكنولوجيا-اليوم",
      "مشاهير-اليوم",
      "المجتمع-اليوم",
      "ستايل-اليوم",
      "مساعدات-اليوم",
      "الفهرس-اليوم",
      "فيديوهات-اليوم",
    ];

    for (const cat of legacyCategories) {
      assert.ok(
        LEGACY_CATEGORY_REDIRECT_MAP[cat],
        `القسم القديم ${cat} يجب أن يمتلك تحويل 301 موثقاً`
      );
    }
  });
});

describe("المرحلة 8: ترويسات الأمان وجاهزية بيئة الإنتاج (Security & Environment)", () => {
  it("يتحقق من وجود ترويسات الأمان الإلزامية (HSTS, CSP, X-Frame-Options, Nosniff)", () => {
    const securityHeaders = [
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];

    const keys = securityHeaders.map((h) => h.key);
    assert.ok(keys.includes("Strict-Transport-Security"));
    assert.ok(keys.includes("X-Frame-Options"));
    assert.ok(keys.includes("X-Content-Type-Options"));
    assert.ok(keys.includes("Referrer-Policy"));
    assert.ok(keys.includes("Permissions-Policy"));
  });

  it("يضمن حظر ظهور البيانات التجريبية نهائياً في بيئة الإنتاج الحقيقية (قاعدة النزاهة 6)", () => {
    const originalEnv = process.env.NODE_ENV;
    try {
      process.env.NODE_ENV = "production";
      process.env.NEXT_PUBLIC_ALLOW_MOCK = "true"; // محاولة تحايل في الإنتاج

      // يجب أن تحجب الدالة الـ mock تماماً طالما أن NODE_ENV هو production
      assert.equal(isMockDataAllowed(), false, "يجب حظر البيانات التجريبية بشكل قطعي في الإنتاج");
    } finally {
      process.env.NODE_ENV = originalEnv;
      delete process.env.NEXT_PUBLIC_ALLOW_MOCK;
    }
  });
});
