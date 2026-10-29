import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { normalizeArabicForComparison, generateArabicSlug } from "../utils/arabic.js";
import { canonicalizeUrl, computeUrlHash } from "../utils/url.js";

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

