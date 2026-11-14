import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { normalizeArabicForComparison, generateArabicSlug } from "../utils/arabic.js";
import { canonicalizeUrl, computeUrlHash } from "../utils/url.js";
import { isMockDataAllowed, assertNoMockInProduction } from "../utils/mock-guard.js";
import { BRAND_COLORS, SITE_SECTIONS, LEGACY_CATEGORY_REDIRECT_MAP, OFFICIAL_SOCIAL_LINKS, TRACKING_IDS } from "../constants/index.js";

describe("Arabic Normalization & Slug Generation", () => {
  it("normalizes alef variants and strips diacritics", () => {
    const raw = "عَاجِلٌ: أزمةٌ إنسانيةٌ فِي إِقْلِيمِ غَزَّةَ!";
    const normalized = normalizeArabicForComparison(raw);
    assert.strictEqual(normalized, "ازمه انسانيه في اقليم غزه");
  });

  it("normalizes eastern digits to western digits", () => {
    const raw = "شهداء ١٢ ومصابون ٤٥ في خان يونس";
    const normalized = normalizeArabicForComparison(raw);
    assert.strictEqual(normalized, "شهداء 12 ومصابون 45 في خان يونس");
  });

  it("generates clean URL slugs in Arabic", () => {
    const title = "ارتفاع أسعار الذهب في فلسطين اليوم بنسبة 2.5%";
    const slug = generateArabicSlug(title);
    assert.ok(slug.includes("ارتفاع-اسعار-الذهب-في-فلسطين-اليوم-بنسبه-25"));
  });
});

describe("URL Canonicalization & Hashing", () => {
  it("strips tracking parameters and hashes reliably", () => {
    const urlWithTracking = "https://www.aljazeera.net/news/2026/10/article/?utm_source=fb&utm_medium=cpc&fbclid=123#header";
    const cleanUrl = canonicalizeUrl(urlWithTracking);
    assert.strictEqual(cleanUrl, "https://www.aljazeera.net/news/2026/10/article");

    const hash1 = computeUrlHash(urlWithTracking);
    const hash2 = computeUrlHash("https://www.aljazeera.net/news/2026/10/article");
    assert.strictEqual(hash1, hash2);
  });
});

describe("Brand Identity Tokens & Color Matrix", () => {
  it("includes official 60/25/10/5 brand colors", () => {
    assert.strictEqual(BRAND_COLORS.maroon, "#590018");
    assert.strictEqual(BRAND_COLORS.gold, "#F5B900");
    assert.strictEqual(BRAND_COLORS.white, "#FFFFFF");
    assert.strictEqual(BRAND_COLORS.beige, "#D9C6A3");
    assert.strictEqual(BRAND_COLORS.navy, "#0F2A44");
    assert.strictEqual(BRAND_COLORS.coralRed, "#E84A5F");
  });

  it("verifies all required new and legacy sections exist", () => {
    const slugs = SITE_SECTIONS.map((s) => s.slug);
    assert.ok(slugs.includes("palestine"));
    assert.ok(slugs.includes("aid"), "Missing aid section");
    assert.ok(slugs.includes("jobs"), "Missing jobs section");
    assert.ok(slugs.includes("lifestyle"), "Missing lifestyle section");
    assert.ok(slugs.includes("videos"), "Missing videos section");
    assert.ok(slugs.includes("economy"));
    assert.ok(slugs.includes("sports"));
  });

  it("preserves correct tracking and official social links", () => {
    assert.strictEqual(TRACKING_IDS.gtm, "GTM-WJ6X5PD");
    assert.strictEqual(TRACKING_IDS.siteName, "الوطن اليوم");
    assert.ok(OFFICIAL_SOCIAL_LINKS.facebook.includes("alwatanalyoum1"));
    assert.ok(OFFICIAL_SOCIAL_LINKS.twitter.includes("alwatanalyawm5"));
    assert.ok(OFFICIAL_SOCIAL_LINKS.telegram.includes("alwatanalyawm"));
    assert.ok(OFFICIAL_SOCIAL_LINKS.youtube.includes("alwatantodaynet"));
  });
});

describe("Legacy WordPress Redirect Map", () => {
  it("maps all legacy categories to valid new targets", () => {
    assert.strictEqual(LEGACY_CATEGORY_REDIRECT_MAP["أخبار-اليوم"], "/palestine");
    assert.strictEqual(LEGACY_CATEGORY_REDIRECT_MAP["فيديوهات-اليوم"], "/videos");
    assert.strictEqual(LEGACY_CATEGORY_REDIRECT_MAP["مساعدات-اليوم"], "/aid");
    assert.strictEqual(LEGACY_CATEGORY_REDIRECT_MAP["الفهرس-اليوم"], "/jobs");
    assert.strictEqual(LEGACY_CATEGORY_REDIRECT_MAP["الملاعب-اليوم"], "/sports");
    assert.strictEqual(LEGACY_CATEGORY_REDIRECT_MAP["اقتصاد-اليوم"], "/economy");
    assert.strictEqual(LEGACY_CATEGORY_REDIRECT_MAP["ستايل-اليوم"], "/lifestyle");
    assert.strictEqual(LEGACY_CATEGORY_REDIRECT_MAP["تكنولوجيا-اليوم"], "/tech");
    assert.strictEqual(LEGACY_CATEGORY_REDIRECT_MAP["مشاهير-اليوم"], "/arts");
    assert.strictEqual(LEGACY_CATEGORY_REDIRECT_MAP["المجتمع-اليوم"], "/society");
  });
});

describe("Mock Guard & Production Integrity Rule (Section 2)", () => {
  it("blocks mock data when NODE_ENV is production", () => {
    const originalEnv = process.env.NODE_ENV;
    try {
      (process.env as any).NODE_ENV = "production";
      assert.strictEqual(isMockDataAllowed(), false);
      assert.throws(() => {
        assertNoMockInProduction("test-production-check");
      }, /INTEGRITY_VIOLATION/);
    } finally {
      (process.env as any).NODE_ENV = originalEnv;
    }
  });

  it("blocks mock data by default in development unless explicit flag is set", () => {
    const originalEnv = process.env.NODE_ENV;
    const originalFlag = process.env.ENABLE_MOCK_DATA;
    try {
      (process.env as any).NODE_ENV = "development";
      delete process.env.ENABLE_MOCK_DATA;
      assert.strictEqual(isMockDataAllowed(), false);

      process.env.ENABLE_MOCK_DATA = "true";
      assert.strictEqual(isMockDataAllowed(), true);
    } finally {
      (process.env as any).NODE_ENV = originalEnv;
      if (originalFlag !== undefined) process.env.ENABLE_MOCK_DATA = originalFlag;
      else delete process.env.ENABLE_MOCK_DATA;
    }
  });
});
