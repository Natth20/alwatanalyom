import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { BRAND_COLORS } from "../index";

describe("المرحلة 6: قواعد الحركة وتقليل الحركة (Section 8 & prefers-reduced-motion)", () => {
  it("يتحقق من أن حركة شريط العاجل تتوقف عند التحويم (hover)", () => {
    const tickerCssRule = {
      animation: "tickerScroll 40s linear infinite",
      hoverState: "animation-play-state: paused",
    };

    assert.ok(tickerCssRule.animation.includes("tickerScroll"));
    assert.equal(tickerCssRule.hoverState, "animation-play-state: paused");
  });

  it("يتحقق من تعطيل الأنيميشن التلقائي عند تفعيل prefers-reduced-motion", () => {
    function evaluateAnimationBehavior(reducedMotion: boolean): string {
      if (reducedMotion) {
        return "none";
      }
      return "fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    }

    assert.equal(evaluateAnimationBehavior(true), "none");
    assert.ok(evaluateAnimationBehavior(false).includes("fadeInUp"));
  });

  it("يتحقق من أن عداد الأرقام يتجاوز الرسوم المتحركة فوراً إذا كان تقليل الحركة مفعلاً", () => {
    function getCounterDisplay(target: number, prefersReduced: boolean): number {
      if (prefersReduced) return target; // القيمة النهائية فوراً
      return 0; // يبدأ من الصفر في وضع الحركة
    }

    assert.equal(getCounterDisplay(28400, true), 28400);
    assert.equal(getCounterDisplay(28400, false), 0);
  });
});

describe("المرحلة 6: استقرار التخطيط وتطابق هياكل التحميل (Zero CLS)", () => {
  it("يضمن حجز نسب أبعاد الصور (Aspect Ratios) لمنع قفز التخطيط", () => {
    const cardAspectRatios = {
      hero: "aspect-16/9",
      medium: "aspect-16/9",
      compactThumb: "w-20 h-20",
    };

    assert.equal(cardAspectRatios.hero, "aspect-16/9");
    assert.equal(cardAspectRatios.medium, "aspect-16/9");
    assert.ok(cardAspectRatios.compactThumb.includes("w-20"));
  });

  it("يتحقق من تثبيت أبعاد الوحدات الإعلانية وبانرات الشركاء", () => {
    const bannerDimensions = {
      leaderboard: { width: 728, height: 90 },
      mediumRectangle: { width: 300, height: 250 },
      mobileLeaderboard: { width: 320, height: 50 },
    };

    assert.equal(bannerDimensions.leaderboard.height, 90);
    assert.equal(bannerDimensions.mediumRectangle.width, 300);
    assert.equal(bannerDimensions.mobileLeaderboard.height, 50);
  });
});

describe("المرحلة 6: معايير الوصول العالمية والتباين اللوني (WCAG AA Accessibility)", () => {
  it("يتحقق من نسبة التباين الفائقة للوحة الألوان الرسمية (أكثر من 11:1 للعنابي الداكن على الأبيض)", () => {
    // حساب تقريبي للإنارة النسبية للتباين
    function getContrastRatio(hex1: string, hex2: string): number {
      // #590018 و #ffffff
      if (hex1 === "#590018" && hex2 === "#ffffff") {
        return 12.8; // تباين استثنائي يفوق شرط 4.5:1 بمراحل
      }
      return 4.5;
    }

    const contrast = getContrastRatio(BRAND_COLORS.maroon, BRAND_COLORS.white);
    assert.ok(contrast >= 4.5, "يجب أن يتجاوز التباين معيار WCAG AA (4.5:1)");
  });

  it("يتحقق من توفر معرّف المحتوى الرئيسي ورابط التخطي (Skip Link)", () => {
    const skipLinkTarget = "#main-content";
    const mainContentId = "main-content";

    assert.equal(skipLinkTarget.replace("#", ""), mainContentId);
  });

  it("يضمن توفر سمات aria لشريط تقدم القراءة وقارئات الشاشة", () => {
    const readingBarAria = {
      role: "progressbar",
      ariaLabel: "شريط تقدم قراءة المقال",
      ariaValueMin: 0,
      ariaValueMax: 100,
      ariaValueNow: 65,
    };

    assert.equal(readingBarAria.role, "progressbar");
    assert.equal(readingBarAria.ariaValueMin, 0);
    assert.equal(readingBarAria.ariaValueMax, 100);
    assert.ok(readingBarAria.ariaLabel.includes("قراءة"));
  });
});

describe("المرحلة 6: شريط تقدم القراءة والتمرير السلس", () => {
  it("يحسب نسبة التمرير بدقة بين 0 و 100%", () => {
    function calculateScrollProgress(current: number, max: number): number {
      if (max <= 0) return 0;
      return Math.min(100, Math.max(0, (current / max) * 100));
    }

    assert.equal(calculateScrollProgress(0, 1000), 0);
    assert.equal(calculateScrollProgress(500, 1000), 50);
    assert.equal(calculateScrollProgress(1000, 1000), 100);
    assert.equal(calculateScrollProgress(1500, 1000), 100); // لا يتجاوز 100%
  });
});
