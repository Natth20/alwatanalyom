import { NextRequest, NextResponse } from "next/server";
import { prisma, SourceType, IngestMethod, DisplayPolicy, ConnectionState } from "@awt/db";
import { assertSafeUrl } from "@awt/ingest";
import { generateArabicSlug } from "@awt/shared";
import { getSessionUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("awt_session")?.value;
    const session = await getSessionUser(token);

    if (!session) {
      return NextResponse.json({ error: "غير مصرح لك بإضافة مصادر" }, { status: 401 });
    }

    const body = await request.json();
    const {
      nameAr,
      nameEn = "",
      homepageUrl,
      feedUrl,
      type = SourceType.NEWSPAPER,
      displayPolicy = DisplayPolicy.TITLE_ONLY,
      pollSeconds = 300,
      trustLevel = 4,
      countryCode = "PS",
    } = body;

    if (!nameAr || !feedUrl) {
      return NextResponse.json({ error: "اسم المصدر ورابط الخلاصة مطلوبان" }, { status: 400 });
    }

    // 1. فحص الحماية من ثغرات SSRF
    try {
      assertSafeUrl(feedUrl);
      if (homepageUrl) assertSafeUrl(homepageUrl);
    } catch (err: any) {
      return NextResponse.json({ error: `الرابط غير آمن (SSRF Block): ${err.message}` }, { status: 400 });
    }

    // 2. فحص استجابة الرابط فعلياً (Ping feed URL)
    try {
      const pingRes = await fetch(feedUrl, {
        headers: { "User-Agent": "AlWatanToday-Bot/1.0 (+https://alwatantoday.net)" },
        signal: AbortSignal.timeout(6000),
      });

      if (!pingRes.ok) {
        return NextResponse.json(
          { error: `الرابط أعاد رمز خطأ من الخادم البعيد (${pingRes.status})` },
          { status: 400 }
        );
      }
    } catch (err: any) {
      return NextResponse.json(
        { error: `تعذر الاتصال برابط الخلاصة: ${err.message || "انتهت مهلة الاتصال"}` },
        { status: 400 }
      );
    }

    // 3. توليد slug فريد
    const baseSlug = generateArabicSlug(nameAr, 30);
    const slug = `${baseSlug}-${Date.now().toString(36)}`;

    // 4. حفظ المصدر
    const source = await prisma.source.create({
      data: {
        slug,
        nameAr: nameAr.trim(),
        nameEn: nameEn.trim() || undefined,
        homepageUrl: homepageUrl?.trim() || feedUrl.trim(),
        feedUrl: feedUrl.trim(),
        type: type as SourceType,
        method: IngestMethod.RSS,
        displayPolicy: displayPolicy as DisplayPolicy,
        pollSeconds: parseInt(pollSeconds, 10) || 300,
        trustLevel: parseInt(trustLevel, 10) || 4,
        countryCode: countryCode.toUpperCase(),
        state: ConnectionState.OK,
        enabled: true,
      },
    });

    // 5. توثيق العملية في سجل التدقيق
    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: "ADD_SOURCE",
        entityType: "Source",
        entityId: source.id,
        after: { slug: source.slug, nameAr: source.nameAr, feedUrl: source.feedUrl },
      },
    });

    return NextResponse.json({ success: true, source });
  } catch (error: any) {
    console.error("Failed to add source:", error);
    return NextResponse.json({ error: error.message || "فشل إضافة المصدر" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const token = request.cookies.get("awt_session")?.value;
    const session = await getSessionUser(token);

    if (!session) {
      return NextResponse.json({ error: "غير مصرح لك بتعديل المصادر" }, { status: 401 });
    }

    const body = await request.json();
    const { id, enabled } = body;

    if (!id) {
      return NextResponse.json({ error: "معرّف المصدر مطلوب" }, { status: 400 });
    }

    const source = await prisma.source.update({
      where: { id },
      data: {
        enabled: !!enabled,
        state: enabled ? ConnectionState.OK : ConnectionState.PAUSED,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.id,
        action: enabled ? "RESUME_SOURCE" : "PAUSE_SOURCE",
        entityType: "Source",
        entityId: source.id,
        after: { enabled: source.enabled, state: source.state },
      },
    });

    return NextResponse.json({ success: true, source });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "فشل تعديل المصدر" }, { status: 500 });
  }
}

