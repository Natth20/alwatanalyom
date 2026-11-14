import { NextResponse, type NextRequest } from "next/server";
import { LEGACY_CATEGORY_REDIRECT_MAP, SITE_SECTIONS } from "@awt/shared";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. فحص تحويلات تصنيفات ووردبريس القديمة (مثل: /category/أخبار-اليوم/ أو /category/اخبار-اليوم)
  if (pathname.startsWith("/category/") || pathname.startsWith("/category")) {
    const rawCategory = pathname
      .replace(/^\/category\/?/, "")
      .replace(/\/+$/, "");

    let decodedCategory = rawCategory;
    try {
      decodedCategory = decodeURIComponent(rawCategory);
    } catch {
      // تجاهل أخطاء فك الترميز غير الصالحة
    }

    // مطابقة من خريطة تحويلات التصنيفات المعتمدة
    const targetSection =
      LEGACY_CATEGORY_REDIRECT_MAP[rawCategory] ||
      LEGACY_CATEGORY_REDIRECT_MAP[decodedCategory];

    if (targetSection) {
      const url = request.nextUrl.clone();
      url.pathname = targetSection;
      return NextResponse.redirect(url, { status: 301 });
    }

    // إذا كان التصنيف يطابق اسماً أو slug لأي قسم حديث
    const matchedSection = SITE_SECTIONS.find(
      (s) => s.slug === decodedCategory || s.slug === rawCategory
    );
    if (matchedSection) {
      const url = request.nextUrl.clone();
      url.pathname = `/${matchedSection.slug}`;
      return NextResponse.redirect(url, { status: 301 });
    }

    // تحويل أي تصنيف قديم مجهول إلى الصفحة الرئيسية لمنع الـ 404
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url, { status: 301 });
  }

  // 2. تصحيح الروابط القديمة الشائعة لصفحات المعلومات والمؤسسة
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
    // تجاهل أخطاء فك الترميز
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

    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/category/:path*",
    "/category",
    "/من-نحن/:path*",
    "/من-نحن",
    "/about-us/:path*",
    "/about-us",
    "/اتصل-بنا/:path*",
    "/اتصل-بنا",
    "/contact-us/:path*",
    "/contact-us",
    "/سياسة-الخصوصية/:path*",
    "/سياسة-الخصوصية",
    "/privacy-policy/:path*",
    "/privacy-policy",
    "/شروط-الخدمة/:path*",
    "/شروط-الخدمة",
    "/terms-of-service/:path*",
    "/terms-of-service",
  ],
};
