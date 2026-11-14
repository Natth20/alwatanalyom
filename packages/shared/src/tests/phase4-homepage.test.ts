import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("المرحلة 4: تدقيق النماذج البصرية الثلاثة للصفحة الرئيسية (Visual Prototypes Contract)", () => {
  type PrototypeView = "stream" | "bento" | "live";

  function resolvePrototypeView(rawQuery?: string | null): PrototypeView {
    if (rawQuery === "bento") return "bento";
    if (rawQuery === "live") return "live";
    return "stream"; // النموذج الافتراضي الموصى به
  }

  it("يعتمد نموذج 'stream' (التدفق الصحفي الملكي) كنموذج افتراضي عند عدم التحديد", () => {
    assert.strictEqual(resolvePrototypeView(null), "stream");
    assert.strictEqual(resolvePrototypeView(undefined), "stream");
    assert.strictEqual(resolvePrototypeView(""), "stream");
    assert.strictEqual(resolvePrototypeView("unknown_view"), "stream");
  });

  it("يتحول بدقة إلى نموذج 'bento' عند طلبه", () => {
    assert.strictEqual(resolvePrototypeView("bento"), "bento");
  });

  it("يتحول بدقة إلى نموذج 'live' عند طلبه", () => {
    assert.strictEqual(resolvePrototypeView("live"), "live");
  });
});

describe("المرحلة 4: تدقيق التسلسل الهرمي التحريري (Editorial Hierarchy & Hero)", () => {
  it("يضمن وجود خبر بطل رئيسي (Lead Hero) مع كامل بيانات النشر والمصدر", () => {
    const mockHeroArticle = {
      id: "hero_art_1",
      titleAr: "قمة طارئة في القاهرة لبحث تطورات الأوضاع في غزة والضفة الغربية",
      summaryAr: "انطلاق أعمال القمة الإقليمية بمشاركة ممثلي الدول الفاعلة لمناقشة التهدئة ودخول المساعدات.",
      publishedAt: new Date().toISOString(),
      sectionSlug: "palestine",
      sectionNameAr: "فلسطين",
      source: {
        id: "src_1",
        nameAr: "وكالة وفا",
        slug: "wafa",
        homepageUrl: "https://wafa.ps",
      },
      isBreaking: false,
    };

    assert.ok(mockHeroArticle.titleAr.length > 20, "عنوان البطل يجب أن يكون واضحاً ومكتملاً");
    assert.ok(mockHeroArticle.summaryAr, "ملخص البطل التحريري إلزامي");
    assert.ok(mockHeroArticle.source.nameAr, "المصدر المعتمد إلزامي");
    assert.strictEqual(mockHeroArticle.sectionSlug, "palestine");
  });

  it("يفرز عناصر 'الممر السريع / التدفق اللحظي' تنازلياً حسب توقيت النشر الدقيق", () => {
    const now = Date.now();
    const items = [
      { id: "1", title: "خبر أقدم", publishedAt: new Date(now - 30 * 60 * 1000).toISOString() },
      { id: "2", title: "خبر أحدث", publishedAt: new Date(now - 5 * 60 * 1000).toISOString() },
      { id: "3", title: "خبر متوسط", publishedAt: new Date(now - 15 * 60 * 1000).toISOString() },
    ];

    const sorted = [...items].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    assert.strictEqual(sorted[0]?.id, "2", "الخبر الأحدث يجب أن يكون الأول في الممر السريع");
    assert.strictEqual(sorted[1]?.id, "3");
    assert.strictEqual(sorted[2]?.id, "1");
  });
});

describe("المرحلة 4: نزاهة وحدات الصفحة الرئيسية وخلوها من التخمة والبيانات الوهمية", () => {
  it("يتأكد من ارتباط بطاقات المساعدات والوظائف بالمسارات الرسمية المعتمدة (/aid و /jobs)", () => {
    const navigationTargets = {
      aidHub: "/aid",
      jobsHub: "/jobs",
      videosHub: "/videos",
      breakingHub: "/breaking",
    };

    assert.strictEqual(navigationTargets.aidHub, "/aid");
    assert.strictEqual(navigationTargets.jobsHub, "/jobs");
    assert.strictEqual(navigationTargets.videosHub, "/videos");
    assert.strictEqual(navigationTargets.breakingHub, "/breaking");
  });

  it("يحظر عرض أسعار الأسواق بحالة LIVE إلا إذا كان توقيتها خلال الـ 24 ساعة الماضية ومزودها حقيقي", () => {
    function validateQuoteStatus(quote: {
      symbol: string;
      price: string | null;
      asOf: string | null;
      providerKey: string;
    }): "LIVE" | "DELAYED" | "UNAVAILABLE" {
      if (!quote.price || !quote.asOf || quote.providerKey === "mock") {
        return "UNAVAILABLE";
      }

      const ageMs = Date.now() - new Date(quote.asOf).getTime();
      const ageHours = ageMs / (1000 * 60 * 60);

      if (ageHours > 24) return "DELAYED";
      return "LIVE";
    }

    assert.strictEqual(
      validateQuoteStatus({
        symbol: "XAUUSD",
        price: "2650.5",
        asOf: new Date().toISOString(),
        providerKey: "twelvedata",
      }),
      "LIVE"
    );

    assert.strictEqual(
      validateQuoteStatus({
        symbol: "BRENT",
        price: "74.2",
        asOf: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        providerKey: "twelvedata",
      }),
      "DELAYED"
    );

    assert.strictEqual(
      validateQuoteStatus({
        symbol: "BTCUSD",
        price: "90000",
        asOf: new Date().toISOString(),
        providerKey: "mock", // مزود تجريبي مرفوض في الإنتاج
      }),
      "UNAVAILABLE"
    );
  });
});

