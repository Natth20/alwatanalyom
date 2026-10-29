import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { computeSimhash, hammingDistance } from "../simhash.js";
import { trigramSimilarity } from "../trigram.js";
import { checkMergeSafety } from "../merge-guard.js";

describe("Simhash & Trigram Deduplication", () => {
  it("detects identical texts with hamming distance 0", () => {
    const text1 = "غارات جوية مكثفة على مخيم النصيرات وسط قطاع غزة";
    const text2 = "غارات جوية مكثفة على مخيم النصيرات وسط قطاع غزة";
    const h1 = computeSimhash(text1);
    const h2 = computeSimhash(text2);
    assert.strictEqual(hammingDistance(h1, h2), 0);
  });

  it("detects near-duplicates with very low hamming distance on article summaries", () => {
    const text1 = "غارات جوية مكثفة يشنها طيران الاحتلال على مخيم النصيرات وسط قطاع غزة ما أسفر عن أضرار مادية واستشهاد وإصابة مواطنين وتدمير منازل";
    const text2 = "قصف جوي مكثف شنه طيران الاحتلال على مخيم النصيرات وسط قطاع غزة ما أسفر عن أضرار بالغة واستشهاد وإصابة مواطنين وهدم منازل";
    const h1 = computeSimhash(text1);
    const h2 = computeSimhash(text2);
    const dist = hammingDistance(h1, h2);
    assert.ok(dist <= 15, `Expected low distance <= 15, got ${dist}`);
  });

  it("calculates high trigram similarity for similar Arabic headlines", () => {
    const titleA = "ارتفاع حصيلة الشهداء في غزة";
    const titleB = "ارتفاع حصيلة شهداء غزة";
    const sim = trigramSimilarity(titleA, titleB);
    assert.ok(sim > 0.6, `Expected similarity > 0.6, got ${sim}`);
  });
});

describe("Merge Guard Safety", () => {
  it("blocks merging when casualty counts conflict", () => {
    const titleA = "استشهاد 15 فلسطينياً في قصف على رفح";
    const titleB = "استشهاد 45 فلسطينياً في قصف على رفح";
    const safety = checkMergeSafety(titleA, titleB, ["PS"], ["PS"]);
    assert.strictEqual(safety.canMerge, false);
    assert.ok(safety.reason?.includes("الأرقام الجوهرية"));
  });

  it("blocks merging when countries conflict", () => {
    const titleA = "انفجار داخل منشأة صناعية";
    const titleB = "انفجار داخل منشأة صناعية";
    const safety = checkMergeSafety(titleA, titleB, ["EG"], ["GB"]);
    assert.strictEqual(safety.canMerge, false);
    assert.ok(safety.reason?.includes("تعارض الدول"));
  });

  it("permits merging when numbers and contexts match", () => {
    const titleA = "استشهاد 12 مواطناً في قصف على جباليا";
    const titleB = "مقتل 12 شخصاً إثر غارة على مخيم جباليا";
    const safety = checkMergeSafety(titleA, titleB, ["PS"], ["PS"]);
    assert.strictEqual(safety.canMerge, true);
  });
});
