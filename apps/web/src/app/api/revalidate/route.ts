import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

/**
 * نقطة نهاية إعادة التحقق اللحظي عند النشر من لوحة الإدارة (On-demand Cache Invalidation)
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-revalidate-token");
    const queryToken = request.nextUrl.searchParams.get("token");
    const token = authHeader || queryToken;

    const expectedToken = process.env.REVALIDATE_TOKEN || "internal_cache_revalidate_token_change_me";

    if (!token || token !== expectedToken) {
      return NextResponse.json(
        { ok: false, error: "رمز إعادة التحقق غير مصرح به (Unauthorized)" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { paths = [], sectionSlug, isBreaking } = body;

    const targetPaths = new Set<string>();

    // 1. إعادة التحقق الإلزامية للصفحة الرئيسية
    targetPaths.add("/");

    // 2. إذا كان الخبر عاجلاً
    if (isBreaking) {
      targetPaths.add("/breaking");
    }

    // 3. إعادة التحقق للقسم التابع له الخبر
    if (sectionSlug) {
      targetPaths.add(`/${sectionSlug}`);
    }

    // 4. أي مسارات إضافية مرسلة صراحة
    if (Array.isArray(paths)) {
      for (const p of paths) {
        if (typeof p === "string" && p.startsWith("/")) {
          targetPaths.add(p);
        }
      }
    }

    // تطبيق إعادة التحقق الفوري على المسارات المستهدفة
    const revalidatedList: string[] = [];
    for (const path of targetPaths) {
      revalidatePath(path, "page");
      revalidatedList.push(path);
    }

    return NextResponse.json({
      ok: true,
      message: `تم تحديث الكاش وإعادة التحقق اللحظي فورياً لـ ${revalidatedList.length} مسارات`,
      revalidatedPaths: revalidatedList,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("فشل في معالجة إعادة التحقق اللحظي:", error);
    return NextResponse.json(
      { ok: false, error: error.message || "حدث خطأ غير متوقع أثناء إعادة التحقق" },
      { status: 500 }
    );
  }
}

