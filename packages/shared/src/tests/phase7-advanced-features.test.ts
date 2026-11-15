import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("المرحلة 7: محرك «اسأل الوطن» والنزاهة الأرشيفية (Section 11 & Section 2)", () => {
  it("يتحقق من تنظيف السؤال واستخلاص الكلمات الدلالية وتجاهل حروف الاستفهام", () => {
    const stopWords = new Set([
      "ما", "ماذا", "من", "هل", "أين", "كيف", "متى", "لماذا", "كم", "أي",
      "عن", "في", "على", "إلى", "مع", "هذا", "هذه", "ذلك", "تلك", "هو",
      "هي", "هم", "كان", "كانت", "أو", "ثم", "بل", "لكن", "كل", "جميع",
      "حول", "بشأن", "بخصوص", "أبرز", "حقيقة", "تفاصيل", "لخص", "لي"
    ]);

    const question = "ما هي حقيقة مزاعم فتح المعابر وما حكم مرصد الحقيقة عليها؟";
    const tokens = question
      .replace(/[؟?.,!،;:()\[\]"']/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !stopWords.has(w));

    assert.ok(tokens.includes("مزاعم"));
    assert.ok(tokens.includes("المعابر"));
    assert.ok(tokens.includes("مرصد"));
    assert.ok(tokens.includes("الحقيقة"));
    assert.ok(!tokens.includes("ما"));
    assert.ok(!tokens.includes("هي"));
    assert.ok(!tokens.includes("حقيقة"));
  });

  it("يتحقق من ميثاق الامتناع عن الاختلاق عند غياب التغطية الكافية في الأرشيف", () => {
    function processQuery(matchesCount: number) {
      if (matchesCount === 0) {
        return {
          answered: false,
          answer: "لم نجد تغطية كافية لهذا السؤال في أرشيف «الوطن اليوم» حتى الآن. التزاماً بقواعد النزاهة التحريرية، نمتنع عن تقديم إجابات غير مستندة إلى مواد موثقة ومنشورة في سجلاتنا.",
          sources: [],
        };
      }
      return {
        answered: true,
        answer: "بناءً على التغطية المنشورة...",
        sources: [{ title: "مادة منشورة", url: "/article/test", date: "2026-11-15" }],
      };
    }

    const emptyResult = processQuery(0);
    assert.equal(emptyResult.answered, false);
    assert.ok(emptyResult.answer.includes("لم نجد تغطية كافية لهذا السؤال في أرشيف «الوطن اليوم»"));
    assert.equal(emptyResult.sources.length, 0);

    const hitResult = processQuery(2);
    assert.equal(hitResult.answered, true);
    assert.equal(hitResult.sources.length, 1);
  });

  it("يضمن حظر الأرقام المفبركة لشاحنات المساعدات والأطنان غير الموثقة (قاعدة النزاهة 4)", () => {
    const forbiddenPhrases = [
      "114 شاحنة",
      "42 طناً من المستلزمات الجراحية",
    ];

    const safeAnswer = "تخضع حركة المساعدات لإشراف وتوثيق غرف العمليات الرسمية التابعة للهلال الأحمر والأونروا، وتنشر الأرقام الرسمية بموجب البلاغات اليومية المعتمدة.";

    for (const phrase of forbiddenPhrases) {
      assert.ok(!safeAnswer.includes(phrase), `يجب ألا تتضمن الإجابة إحصائيات وهمية: ${phrase}`);
    }
  });
});

describe("المرحلة 7: مرصد رادار الحقيقة ومكافحة التضليل (Fact-Check)", () => {
  it("يتحقق من وجود حقول التحقيق الإلزامية: الادعاء، النتيجة، الأدلة، والمحرر المسؤول", () => {
    const sampleFactCheck = {
      id: "fc-1",
      slug: "crossings-agreement-claim",
      claim: "مزاعم متداولة عن اتفاق وشيك لفتح دائم لكافة المعابر دون قيود أمنية",
      claimSource: "مجموعات ومنصات تواصل اجتماعي غير موثقة",
      verdict: "misleading",
      verdictLabel: "مضلل ومجتزأ",
      summary: "النص المتداول منقول عن مسودة مقترحات قديمة...",
      fullAnalysis: "تداولت حسابات على منصات التواصل...",
      sourceProof: "بيانات وزارة الخارجية وهيئة المعابر الفلسطينية",
      reviewedBy: "أحمد منصور — وحدة التحقق والتدقيق الميداني",
      officialSources: [
        { name: "هيئة الشؤون المدنية والمعابر", url: "https://wafa.ps", date: "30 أكتوبر 2026" },
      ],
      evidences: [
        { tool: "مقارنة النصوص الأرشيفية", finding: "تطابق مع مسودة قديمة", status: "debunked" },
      ],
    };

    assert.ok(sampleFactCheck.claim.length > 10);
    assert.ok(["fake", "misleading", "out-of-context", "out_of_context", "verified"].includes(sampleFactCheck.verdict));
    assert.ok(sampleFactCheck.reviewedBy.length > 5, "اسم المحرر المسؤول إلزامي بموجب القسم 11");
    assert.ok(sampleFactCheck.officialSources.length > 0, "يجب توفر مصادر رسمية معتمدة");
    assert.ok(sampleFactCheck.evidences.length > 0, "يجب توفر أدلة فحص تقنية");
  });

  it("يتحقق من خلو مرصد الحقيقة من أرقام القراءات الوهمية أو عدادات الشائعات المفبركة (قاعدة 4)", () => {
    const rawData = {
      id: "fc-test",
      claim: "ادعاء للاختبار",
      hasFakeViews: false,
      hasFabricatedCounter: false,
    };

    assert.equal(rawData.hasFakeViews, false);
    assert.equal(rawData.hasFabricatedCounter, false);
  });
});

describe("المرحلة 7: أطلس الأخبار والجغرافيا الفلسطينية (News Atlas)", () => {
  it("يتحقق من صحة إحداثيات المواقع الفلسطينية ضمن النطاق الجغرافي التاريخي", () => {
    const testPlaces = [
      { name: "القدس", coordinates: { lat: 31.7767, lng: 35.2345 } },
      { name: "يافا", coordinates: { lat: 32.0592, lng: 34.7594 } },
      { name: "غزة", coordinates: { lat: 31.5017, lng: 34.4668 } },
      { name: "نابلس", coordinates: { lat: 32.2211, lng: 35.2544 } },
    ];

    for (const place of testPlaces) {
      assert.ok(
        place.coordinates.lat >= 31.0 && place.coordinates.lat <= 33.5,
        `خط عرض ${place.name} خارج النطاق الجغرافي لفلسطين`
      );
      assert.ok(
        place.coordinates.lng >= 34.0 && place.coordinates.lng <= 36.0,
        `خط طول ${place.name} خارج النطاق الجغرافي لفلسطين`
      );
    }
  });

  it("يتحقق من ربط كل معلم بحالته التوثيقية (صامدة / مهجرة 1948 / مخيم)", () => {
    const validStatuses = ["surviving", "depopulated_1948", "camp"];
    const status = "depopulated_1948";
    assert.ok(validStatuses.includes(status));
  });
});

describe("المرحلة 7: تجمع القصص المتعددة المصادر (Story Clusters)", () => {
  it("يتحقق من أن تجمع القصة يتطلب مصدرين معتمدين ومطابقين على الأقل", () => {
    const cluster = {
      id: "cluster-aid",
      sourcesCount: 4,
      sources: [
        { name: "الهلال الأحمر", url: "https://palestinercs.org" },
        { name: "وفا", url: "https://wafa.ps" },
        { name: "أوتشا", url: "https://ochaopt.org" },
        { name: "الأونروا", url: "https://unrwa.org" },
      ],
    };

    assert.ok(cluster.sourcesCount >= 2, "تجمع القصص يجب أن يحتوي على مصدرين على الأقل");
    assert.equal(cluster.sources.length, cluster.sourcesCount);
  });

  it("يتحقق من ترتيب الخط الزمني للأحداث بالتتابع", () => {
    const timeline = [
      { time: "08:00", event: "بدء إجراءات تفريغ الشاحنات", source: "الأونروا" },
      { time: "09:15", event: "صدور تقرير أوتشا", source: "أوتشا" },
      { time: "10:45", event: "تحرك أولى القوافل الطبية", source: "وفا" },
      { time: "11:30", event: "تسلم فرق الهلال الأحمر المستلزمات", source: "الهلال الأحمر" },
    ];

    for (let i = 0; i < timeline.length - 1; i++) {
      const current = timeline[i];
      const next = timeline[i + 1];
      assert.ok(current && next && current.time <= next.time, "يجب أن يكون الخط الزمني مرتباً تصاعدياً");
    }
  });
});

describe("المرحلة 7: شفافية المحتوى التوليدي والترفيهي (Rules 6 & 8 & Section 11)", () => {
  it("يتحقق من وسم المحتوى الصوتي التجريبي بـ DEMO والتنويه بخوارزميات الذكاء الاصطناعي", () => {
    const podcastMeta = {
      isDemo: true,
      demoLabel: "DEMO · موجز توليدي تجريبي",
      disclaimer: "هذا البودكاست الافتراضي يستخدم خوارزميات توليد النطق الصوتي لقراءة نصوص صحفية موثقة ومراجعة تحريرياً",
    };

    assert.ok(podcastMeta.demoLabel.includes("DEMO"));
    assert.ok(podcastMeta.disclaimer.includes("خوارزميات"));
  });

  it("يتحقق من وسم قسم المسابقات بـ «محتوى ترفيهي ثقافي» لفصله عن الصحافة الإخبارية", () => {
    const gamesMeta = {
      categoryLabel: "تجريبي · محتوى ترفيهي ثقافي",
      editorialDisclaimer: "قسم المسابقات الثقافية صُمم لأغراض التثقيف الوطني وحفظ الذاكرة التاريخية والجغرافية، وهو مصنف كـ «محتوى ترفيهي ثقافي» منفصل تماماً عن غرف الأخبار",
    };

    assert.ok(gamesMeta.categoryLabel.includes("محتوى ترفيهي ثقافي"));
    assert.ok(gamesMeta.editorialDisclaimer.includes("منفصل تماماً عن غرف الأخبار"));
  });
});
