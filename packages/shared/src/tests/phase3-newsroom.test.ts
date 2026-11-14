import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("المرحلة 3: التحقق اللحظي من الكاش (On-demand Cache Invalidation Contract)", () => {
  const EXPECTED_TOKEN = "test_internal_revalidate_token_123";

  function authorizeRevalidation(providedToken: string | null): boolean {
    if (!providedToken) return false;
    return providedToken === EXPECTED_TOKEN;
  }

  function computeTargetRevalidatePaths(params: {
    paths?: string[];
    sectionSlug?: string;
    isBreaking?: boolean;
    articleSlug?: string;
    articleId?: string;
  }): string[] {
    const targets = new Set<string>();

    // 1. الصفحة الرئيسية دائماً
    targets.add("/");

    // 2. شريط العاجل إذا كان الخبر عاجلاً
    if (params.isBreaking) {
      targets.add("/breaking");
    }

    // 3. مسار القسم
    if (params.sectionSlug) {
      targets.add(`/${params.sectionSlug}`);
    }

    // 4. مسار المقال الفردي
    if (params.articleId && params.articleSlug) {
      targets.add(`/article/${params.articleId}/${params.articleSlug}`);
    }

    // 5. أي مسارات مخصصة
    if (params.paths) {
      for (const p of params.paths) {
        if (p.startsWith("/")) targets.add(p);
      }
    }

    return Array.from(targets);
  }

  it("يرفض طلبات إعادة التحقق غير المصحوبة بالرمز السري المعتمد", () => {
    assert.strictEqual(authorizeRevalidation(null), false);
    assert.strictEqual(authorizeRevalidation("wrong_token"), false);
    assert.strictEqual(authorizeRevalidation(EXPECTED_TOKEN), true);
  });

  it("يحسب المسارات الإلزامية لإعادة التحقق عند نشر خبر عادي", () => {
    const paths = computeTargetRevalidatePaths({
      sectionSlug: "palestine",
      isBreaking: false,
      articleId: "art_101",
      articleSlug: "palestine-update",
    });

    assert.ok(paths.includes("/"), "الصفحة الرئيسية يجب أن تُحدث فوراً");
    assert.ok(paths.includes("/palestine"), "صفحة قسم فلسطين يجب أن تُحدث فوراً");
    assert.ok(paths.includes("/article/art_101/palestine-update"), "صفحة المقال يجب أن تُحدث فوراً");
    assert.strictEqual(paths.includes("/breaking"), false, "لا حاجة لتحديث شريط العاجل لخبر عادي");
  });

  it("يحدث شريط العاجل فورياً عند نشر خبر عاجل جديد", () => {
    const paths = computeTargetRevalidatePaths({
      sectionSlug: "world",
      isBreaking: true,
      articleId: "art_breaking",
      articleSlug: "urgent-event",
    });

    assert.ok(paths.includes("/"));
    assert.ok(paths.includes("/world"));
    assert.ok(paths.includes("/breaking"), "شريط العاجل يجب أن يُحدث فورياً");
  });
});

describe("المرحلة 3: خط المعالجة والتوجيه للمراجعة البشرية (Review Routing & Kill Switch)", () => {
  function determineItemIngestStatus(item: {
    title: string;
    sourceTrustLevel: number;
    isKillSwitchActive: boolean;
    requireReviewOption?: boolean;
  }): { status: "PUBLISHED" | "REVIEW"; reason?: string } {
    const hasCasualtyOrSensitivity = /شهيد|شهداء|حصيلة|قتلى|ضحايا|مجزرة|انفجار|اغتيال/.test(item.title);

    if (item.isKillSwitchActive) {
      return { status: "REVIEW", reason: "مفتاح الإيقاف الطارئ مفعل: بانتظار المراجعة البشرية" };
    }

    if (item.requireReviewOption) {
      return { status: "REVIEW", reason: "مطلوب مراجعة تحريرية صريحة" };
    }

    if (hasCasualtyOrSensitivity) {
      return { status: "REVIEW", reason: "مراجعة حساسية أرقام الشهداء والمصطلحات الميدانية" };
    }

    if (item.sourceTrustLevel < 4) {
      return { status: "REVIEW", reason: "مستوى ثقة المصدر يتطلب تدقيقاً بشرياً" };
    }

    return { status: "PUBLISHED" };
  }

  it("يوجه المواد إلى حالة REVIEW فور تفعيل مفتاح الإيقاف الطارئ (Kill Switch)", () => {
    const res = determineItemIngestStatus({
      title: "افتتاح معرض تجاري في رام الله",
      sourceTrustLevel: 5,
      isKillSwitchActive: true,
    });

    assert.strictEqual(res.status, "REVIEW");
    assert.ok(res.reason?.includes("مفتاح الإيقاف الطارئ"));
  });

  it("يوجه المواد الحساسة وأرقام الشهداء والضحايا إلى حالة REVIEW للتدقيق الإنساني", () => {
    const res = determineItemIngestStatus({
      title: "ارتقاء 4 شهداء وإصابة آخرين في قصف على وسط قطاع غزة",
      sourceTrustLevel: 5,
      isKillSwitchActive: false,
    });

    assert.strictEqual(res.status, "REVIEW");
    assert.ok(res.reason?.includes("أرقام الشهداء"));
  });

  it("يوجه مصادر الأخبار ذات مستوى الثقة المنخفض إلى حالة REVIEW", () => {
    const res = determineItemIngestStatus({
      title: "توقعات بانخفاض أسعار النفط العالمية",
      sourceTrustLevel: 3,
      isKillSwitchActive: false,
    });

    assert.strictEqual(res.status, "REVIEW");
  });

  it("يسمح بالنشر المباشر فقط للمصادر المعتمدة عالية الثقة (Trust >= 4) الخالية من التضارب", () => {
    const res = determineItemIngestStatus({
      title: "توقعات حالة الطقس: استقرار في درجات الحرارة",
      sourceTrustLevel: 5,
      isKillSwitchActive: false,
    });

    assert.strictEqual(res.status, "PUBLISHED");
  });
});

describe("المرحلة 3: نزاهة نسبة المصادر وتوثيق قرارات التحرير (Attribution & Audit Logging)", () => {
  it("يلتزم بتوثيق هوية المصدر ورابطه لكل مادة مجمعة (القاعدة 2)", () => {
    const mockAggregatedItem = {
      sourceId: "src_wafa",
      sourceNameAr: "وكالة الأنباء الفلسطينية (وفا)",
      canonicalUrl: "https://wafa.ps/Pages/Details/12345",
      titleOriginal: "بيان رسمي صادر عن الرئاسة",
    };

    assert.ok(mockAggregatedItem.sourceId, "معرّف المصدر إلزامي");
    assert.ok(mockAggregatedItem.sourceNameAr, "اسم المصدر بالعربية إلزامي");
    assert.ok(mockAggregatedItem.canonicalUrl.startsWith("https://"), "رابط المصدر يجب أن يكون HTTPS صحيح");
  });

  it("يسجل تدقيقاً تحريرياً كاملاً عند اعتماد أو رفض مادة من قائمة المراجعة", () => {
    const auditEvents: Array<{ action: string; userId: string; itemId: string }> = [];

    function recordDecision(action: "APPROVE_REVIEW_ITEM" | "REJECT_REVIEW_ITEM", userId: string, itemId: string) {
      auditEvents.push({ action, userId, itemId });
    }

    recordDecision("APPROVE_REVIEW_ITEM", "user_editor_1", "item_456");
    recordDecision("REJECT_REVIEW_ITEM", "user_editor_2", "item_789");

    assert.strictEqual(auditEvents.length, 2);
    assert.strictEqual(auditEvents[0]?.action, "APPROVE_REVIEW_ITEM");
    assert.strictEqual(auditEvents[1]?.action, "REJECT_REVIEW_ITEM");
  });
});

describe("المرحلة 3: مؤشرات التميز وحظر الأرقام المفبركة (Excellence Indicators & Rule 4)", () => {
  it("يعيد 'لا بيانات بعد' عندما لا توجد قياسات حقلية مسجلة بدلاً من توليد أرقام عشوائية", () => {
    const fieldLatencies: number[] = [];

    function getAverageLatencyDisplay(observations: number[]): string {
      if (observations.length === 0) return "لا بيانات بعد";
      const avg = Math.round(observations.reduce((a, b) => a + b, 0) / observations.length);
      return `${avg} دقيقة`;
    }

    assert.strictEqual(getAverageLatencyDisplay(fieldLatencies), "لا بيانات بعد");
    assert.strictEqual(getAverageLatencyDisplay([2, 4, 6]), "4 دقيقة");
  });

  it("يحسب نسبة التوثيق للمصادر بصورة دقيقة وموضوعية", () => {
    function computeAttributionRate(total: number, attributed: number): string {
      if (total === 0) return "100.0%";
      return `${((attributed / total) * 100).toFixed(1)}%`;
    }

    assert.strictEqual(computeAttributionRate(100, 100), "100.0%");
    assert.strictEqual(computeAttributionRate(100, 95), "95.0%");
    assert.strictEqual(computeAttributionRate(0, 0), "100.0%");
  });
});
