import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { LEGACY_CATEGORY_REDIRECT_MAP, SITE_SECTIONS } from "../constants/index.js";

/**
 * دالة محاكاة معالجة الروابط في الـ Middleware للتحقق الصارم من سلوك 301 Redirects
 */
function simulateMiddlewareRedirect(pathname: string): { redirect: boolean; target?: string; status?: number } {
  // 1. فحص تحويلات تصنيفات ووردبريس القديمة
  if (pathname.startsWith("/category/") || pathname.startsWith("/category")) {
    const rawCategory = pathname
      .replace(/^\/category\/?/, "")
      .replace(/\/+$/, "");

    let decodedCategory = rawCategory;
    try {
      decodedCategory = decodeURIComponent(rawCategory);
    } catch {
      // ignore
    }

    const targetSection =
      LEGACY_CATEGORY_REDIRECT_MAP[rawCategory] ||
      LEGACY_CATEGORY_REDIRECT_MAP[decodedCategory];

    if (targetSection) {
      return { redirect: true, target: targetSection, status: 301 };
    }

    const matchedSection = SITE_SECTIONS.find(
      (s) => s.slug === decodedCategory || s.slug === rawCategory
    );
    if (matchedSection) {
      return { redirect: true, target: `/${matchedSection.slug}`, status: 301 };
    }

    return { redirect: true, target: "/", status: 301 };
  }

  // 2. تصحيح الروابط القديمة الشائعة لصفحات المعلومات
  const directMappings: Record<string, string> = {
    "/من-نحن": "/about",
    "/من-نحن/": "/about",
    "/about-us": "/about",
    "/about-us/": "/about",
    "/اتصل-بنا": "/contact",
    "/اتصل-بنا/": "/contact",
    "/contact-us": "/contact",
    "/contact-us/": "/contact",
    "/سياسة-الخصوصية": "/privacy",
    "/سياسة-الخصوصية/": "/privacy",
    "/privacy-policy": "/privacy",
    "/privacy-policy/": "/privacy",
    "/شروط-الخدمة": "/terms",
    "/شروط-الخدمة/": "/terms",
    "/terms-of-service": "/terms",
    "/terms-of-service/": "/terms",
  };

  let decodedPath = pathname;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    // ignore
  }

  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const normalizedDecodedPath = decodedPath.replace(/\/+$/, "") || "/";

  if (
    directMappings[pathname] ||
    directMappings[decodedPath] ||
    directMappings[normalizedPath] ||
    directMappings[normalizedDecodedPath]
  ) {
    const target =
      directMappings[pathname] ||
      directMappings[decodedPath] ||
      directMappings[normalizedPath] ||
      directMappings[normalizedDecodedPath];

    return { redirect: true, target, status: 301 };
  }

  return { redirect: false };
}

describe("المرحلة 2: تدقيق واختبار تحويلات الروابط القديمة 301 (Legacy Redirects Verification)", () => {
  const legacySectionsExpectations = [
    { oldPath: "/category/أخبار-اليوم/", expected: "/palestine" },
    { oldPath: "/category/اخبار-اليوم/", expected: "/palestine" },
    { oldPath: "/category/اقتصاد-اليوم/", expected: "/economy" },
    { oldPath: "/category/الملاعب-اليوم/", expected: "/sports" },
    { oldPath: "/category/تكنولوجيا-اليوم/", expected: "/tech" },
    { oldPath: "/category/مشاهير-اليوم/", expected: "/arts" },
    { oldPath: "/category/المجتمع-اليوم/", expected: "/society" },
    { oldPath: "/category/ستايل-اليوم/", expected: "/lifestyle" },
    { oldPath: "/category/مساعدات-اليوم/", expected: "/aid" },
    { oldPath: "/category/الفهرس-اليوم/", expected: "/jobs" },
    { oldPath: "/category/فيديوهات-اليوم/", expected: "/videos" },
  ];

  it("يضمن تحويل كافة تصنيفات ووردبريس العربية القديمة إلى الأقسام الجديدة بـ 301 فوري", () => {
    for (const item of legacySectionsExpectations) {
      const res = simulateMiddlewareRedirect(item.oldPath);
      assert.strictEqual(res.redirect, true, `فشل التحويل للمسار: ${item.oldPath}`);
      assert.strictEqual(res.status, 301, `كود التحويل ليس 301 للمسار: ${item.oldPath}`);
      assert.strictEqual(res.target, item.expected, `وجهة التحويل خاطئة للمسار: ${item.oldPath}`);
    }
  });

  it("يدعم الروابط المشفرة بـ URI Encoding لكافة التصنيفات العربية القديمة", () => {
    for (const item of legacySectionsExpectations) {
      const encodedPath = encodeURI(item.oldPath);
      const res = simulateMiddlewareRedirect(encodedPath);
      assert.strictEqual(res.redirect, true, `فشل التحويل للمسار المشفر: ${encodedPath}`);
      assert.strictEqual(res.status, 301);
      assert.strictEqual(res.target, item.expected);
    }
  });

  it("يدعم الروابط بدون سلاش ختامي (No Trailing Slash)", () => {
    for (const item of legacySectionsExpectations) {
      const pathWithoutSlash = item.oldPath.replace(/\/$/, "");
      const res = simulateMiddlewareRedirect(pathWithoutSlash);
      assert.strictEqual(res.redirect, true);
      assert.strictEqual(res.status, 301);
      assert.strictEqual(res.target, item.expected);
    }
  });

  it("يحول صفحات المعلومات والمؤسسة القديمة إلى الوجهات الجديدة الصحيحة بـ 301", () => {
    const staticPages = [
      { oldPath: "/من-نحن/", expected: "/about" },
      { oldPath: "/من-نحن", expected: "/about" },
      { oldPath: "/about-us/", expected: "/about" },
      { oldPath: "/about-us", expected: "/about" },
      { oldPath: "/اتصل-بنا/", expected: "/contact" },
      { oldPath: "/contact-us/", expected: "/contact" },
      { oldPath: "/سياسة-الخصوصية/", expected: "/privacy" },
      { oldPath: "/privacy-policy/", expected: "/privacy" },
      { oldPath: "/شروط-الخدمة/", expected: "/terms" },
      { oldPath: "/terms-of-service/", expected: "/terms" },
    ];

    for (const item of staticPages) {
      const res = simulateMiddlewareRedirect(item.oldPath);
      assert.strictEqual(res.redirect, true, `فشل تحويل الصفحة: ${item.oldPath}`);
      assert.strictEqual(res.status, 301);
      assert.strictEqual(res.target, item.expected);
    }
  });

  it("يحول أي تصنيف مجهول أو عام إلى الصفحة الرئيسية لمنع روابط 404 الميتة في محركات البحث", () => {
    const unknownPath = "/category/random-old-tag-that-does-not-exist/";
    const res = simulateMiddlewareRedirect(unknownPath);
    assert.strictEqual(res.redirect, true);
    assert.strictEqual(res.status, 301);
    assert.strictEqual(res.target, "/");
  });
});

describe("المرحلة 2: تدقيق وجود وتكامل الأقسام الجديدة الإلزامية في المنظومة", () => {
  it("يتأكد من تسجيل أقسام (المساعدات، الوظائف، فيديو، نمط الحياة) في مصفوفة SITE_SECTIONS", () => {
    const aidSection = SITE_SECTIONS.find((s) => s.slug === "aid");
    const jobsSection = SITE_SECTIONS.find((s) => s.slug === "jobs");
    const videosSection = SITE_SECTIONS.find((s) => s.slug === "videos");
    const lifestyleSection = SITE_SECTIONS.find((s) => s.slug === "lifestyle");

    assert.ok(aidSection, "قسم المساعدات (aid) مفقود");
    assert.strictEqual(aidSection.nameAr, "المساعدات");

    assert.ok(jobsSection, "قسم الوظائف (jobs) مفقود");
    assert.strictEqual(jobsSection.nameAr, "الوظائف");

    assert.ok(videosSection, "قسم فيديو (videos) مفقود");
    assert.strictEqual(videosSection.nameAr, "فيديو");

    assert.ok(lifestyleSection, "قسم نمط الحياة والصحة (lifestyle) مفقود");
    assert.strictEqual(lifestyleSection.nameAr, "نمط الحياة والصحة");
  });
});

