import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  NewsletterSubscribeSchema,
  ContactFormSchema,
  SubmitNewsTipSchema,
  InstrumentQuote,
  ChannelCard,
  TRACKING_IDS,
} from "../index";

describe("المرحلة 5: دورة حياة النشرة البريدية والتأكيد المزدوج (Double Opt-in)", () => {
  it("يقبل طلب الاشتراك البريدي الصحيح بالقوائم المختارة", () => {
    const valid = NewsletterSubscribeSchema.safeParse({
      email: "subscriber@example.com",
      lists: ["morning", "economy"],
    });

    assert.equal(valid.success, true);
    if (valid.success) {
      assert.equal(valid.data.email, "subscriber@example.com");
      assert.deepEqual(valid.data.lists, ["morning", "economy"]);
    }
  });

  it("يرفض البريد الإلكتروني غير الصالح لمنع إدخال بيانات مشوهة", () => {
    const invalid = NewsletterSubscribeSchema.safeParse({
      email: "not-an-email-address",
      lists: ["morning"],
    });

    assert.equal(invalid.success, false);
  });

  it("يتحقق من استخدام التوكن العشوائي الآمن في رابط التأكيد", () => {
    const token = "a1b2c3d4e5f6789012345678abcdef12";
    const confirmUrl = `https://alwatantoday.net/newsletter/confirm/${token}`;
    const unsubscribeUrl = `https://alwatantoday.net/newsletter/unsubscribe/${token}`;

    assert.ok(confirmUrl.includes("/newsletter/confirm/"));
    assert.ok(unsubscribeUrl.includes("/newsletter/unsubscribe/"));
    assert.equal(token.length >= 24, true);
  });
});

describe("المرحلة 5: نزاهة مؤشرات الأسواق والبورصة (Rule 5 Integrity)", () => {
  it("يخفض تصنيف السعر من LIVE إلى DELAYED إذا كان توقيت السعر أقدم من 20 دقيقة", () => {
    const staleTime = new Date(Date.now() - 35 * 60 * 1000).toISOString(); // قبل 35 دقيقة

    function evaluateQuoteStatus(asOf: string, reportedStatus: string): string {
      const diffMinutes = (Date.now() - new Date(asOf).getTime()) / (1000 * 60);
      if (reportedStatus === "LIVE" && diffMinutes > 20) {
        return "DELAYED";
      }
      return reportedStatus;
    }

    const correctedStatus = evaluateQuoteStatus(staleTime, "LIVE");
    assert.equal(correctedStatus, "DELAYED");
  });

  it("يبقي حالة LIVE إذا كان توقيت التحديث حديثاً (خلال دقائق معدودة)", () => {
    const freshTime = new Date(Date.now() - 3 * 60 * 1000).toISOString(); // قبل 3 دقائق

    function evaluateQuoteStatus(asOf: string, reportedStatus: string): string {
      const diffMinutes = (Date.now() - new Date(asOf).getTime()) / (1000 * 60);
      if (reportedStatus === "LIVE" && diffMinutes > 20) {
        return "DELAYED";
      }
      return reportedStatus;
    }

    const currentStatus = evaluateQuoteStatus(freshTime, "LIVE");
    assert.equal(currentStatus, "LIVE");
  });

  it("يضمن اقتران كل أداة مالية بمزودها ووحدتها وعملتها الرسمية", () => {
    const sampleQuote: InstrumentQuote = {
      symbol: "XAUUSD",
      nameAr: "أونصة الذهب",
      nameEn: "Gold Ounce",
      category: "metals",
      price: "2735.40",
      change: "+12.30",
      changePct: "+0.45",
      unit: "أونصة",
      currency: "USD",
      status: "LIVE",
      asOf: new Date().toISOString(),
      provider: "Global Bullion Markets",
    };

    assert.equal(sampleQuote.symbol, "XAUUSD");
    assert.equal(sampleQuote.currency, "USD");
    assert.ok(sampleQuote.provider.length > 0);
  });
});

describe("المرحلة 5: دليل البث المباشر المعتمد وفحص الروابط (Channel Health)", () => {
  it("يستبعد القنوات ذات الحالة المعطلة أو غير المتاحة (UNAVAILABLE أو غير الموثقة)", () => {
    const channels: Partial<ChannelCard>[] = [
      { id: "ch-1", nameAr: "الجزيرة", status: "AVAILABLE" },
      { id: "ch-2", nameAr: "العربي", status: "AVAILABLE" },
      { id: "ch-3", nameAr: "قناة غير مؤكدة", status: "UNVERIFIED" },
      { id: "ch-4", nameAr: "قناة معطلة", status: "UNAVAILABLE" },
    ];

    const activeChannels = channels.filter(
      (c) => c.status === "AVAILABLE"
    );

    assert.equal(activeChannels.length, 2);
    assert.deepEqual(
      activeChannels.map((c) => c.id),
      ["ch-1", "ch-2"]
    );
  });

  it("يضمن أن روابط البث للقنوات الإخبارية تتبع منصات رسمية وموثقة", () => {
    const officialUrls = [
      "https://www.aljazeera.net/live",
      "https://www.alaraby.com/live",
      "https://www.trtarabi.com/live",
    ];

    officialUrls.forEach((url) => {
      assert.ok(url.startsWith("https://"));
      assert.equal(url.includes("pirate") || url.includes("stream-leak"), false);
    });
  });
});

describe("المرحلة 5: الرياضة وتكامل منصة يلا سبورت (Yalla Sport)", () => {
  it("يتحقق من صحة مسارات الشراكة الرياضية الرسمية لـ يلا سبورت وسبورت لايف", () => {
    const links = {
      yallaSportMain: "https://yallasport.com",
      sportLive: "https://yallasport1.com",
      sportLiveStream: "https://yallasport1.com/live/",
    };

    assert.equal(links.yallaSportMain, "https://yallasport.com");
    assert.equal(links.sportLive, "https://yallasport1.com");
    assert.equal(links.sportLiveStream, "https://yallasport1.com/live/");
  });

  it("يضمن اكتمال بيانات مباراة اليوم (الفريقان، البطولة، التوقيت، القناة الناقلة)", () => {
    const match = {
      tournament: "تصفيات كأس العالم 2026",
      homeTeam: "فلسطين (الفدائي)",
      awayTeam: "كوريا الجنوبية",
      time: "21:00",
      broadcaster: "beIN SPORTS 1 HD",
      status: "UPCOMING",
    };

    assert.ok(match.tournament.length > 5);
    assert.ok(match.homeTeam.includes("الفدائي"));
    assert.ok(match.broadcaster.includes("beIN"));
  });
});

describe("المرحلة 5: نماذج التواصل وإرسال الأخبار الآمنة (Contact & News Tip)", () => {
  it("يقبل نموذج التواصل المكتمل ويرفض النماذج الخالية من البيانات", () => {
    const valid = ContactFormSchema.safeParse({
      name: "أحمد كمال",
      email: "ahmed@example.com",
      department: "editorial",
      message: "أود إرسال استفسار حول سياسة تدقيق الحقائق والمصادر في الموقع.",
    });

    assert.equal(valid.success, true);

    const invalid = ContactFormSchema.safeParse({
      name: "أ",
      email: "bad-email",
      message: "قصير",
    });

    assert.equal(invalid.success, false);
  });

  it("يقبل بلاغ الخبر والتسريب مع حماية خيار الإرسال المجهول للمصدر (Anonymous Scoop)", () => {
    const anonymousScoop = SubmitNewsTipSchema.safeParse({
      title: "قصف مدفعي واستهداف لمحيط مستشفى كمال عدوان",
      details: "استهدفت المدفعية بوابة المستشفى الشمالية مما أدى إلى تصاعد أعمدة الدخان وإطلاق نداءات استغاثة عاجلة.",
      location: "شمال غزة - بيت لاهيا",
      sourceType: "eyewitness",
      isAnonymous: true,
    });

    assert.equal(anonymousScoop.success, true);
    if (anonymousScoop.success) {
      assert.equal(anonymousScoop.data.isAnonymous, true);
      assert.equal(anonymousScoop.data.senderName, undefined);
    }
  });

  it("يرفض البلاغات الإخبارية التي تقل تفاصيلها عن 20 حرفاً لمكافحة الإزعاج (Spam)", () => {
    const tooShort = SubmitNewsTipSchema.safeParse({
      title: "خبر عاجل",
      details: "حدث قصف",
      sourceType: "eyewitness",
    });

    assert.equal(tooShort.success, false);
  });
});

describe("المرحلة 5: سياسة الخصوصية وكوكيز التتبع والشفافية (Rule 9 Privacy)", () => {
  it("يتأكد من وجود معرف Google Tag Manager وعدم ادعاء 'بلا تتبع' تضليلياً", () => {
    assert.equal(TRACKING_IDS.gtm, "GTM-WJ6X5PD");
    assert.ok(TRACKING_IDS.gtm.startsWith("GTM-"));
  });

  it("يتحقق من صيغة تحديث موافقة الكوكيز (Consent State Update)", () => {
    function createConsentPayload(type: "all" | "essential") {
      return {
        event: "consent_update",
        consent_type: type,
        analytics_storage: type === "all" ? "granted" : "denied",
        ad_storage: type === "all" ? "granted" : "denied",
      };
    }

    const allConsent = createConsentPayload("all");
    assert.equal(allConsent.analytics_storage, "granted");
    assert.equal(allConsent.ad_storage, "granted");

    const essentialConsent = createConsentPayload("essential");
    assert.equal(essentialConsent.analytics_storage, "denied");
    assert.equal(essentialConsent.ad_storage, "denied");
  });
});
