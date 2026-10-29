import { prisma } from "@awt/db";

export async function processChannelCheck() {
  const channels = await prisma.channel.findMany();

  for (const channel of channels) {
    let ok = false;
    let httpStatus: number | null = null;
    let note: string | null = null;

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(channel.officialSiteUrl, {
        method: "HEAD",
        signal: controller.signal,
        headers: {
          "User-Agent": "AlWatanTodayBot/1.0 (+https://alwatantoday.net/live; ops@alwatantoday.net)",
        },
      });

      clearTimeout(timeout);
      httpStatus = res.status;
      ok = res.ok;

      // فحص إمكانية التضمين عبر الرؤوس الأمنية
      const xFrame = res.headers.get("x-frame-options");
      const csp = res.headers.get("content-security-policy");

      if (xFrame || (csp && csp.includes("frame-ancestors"))) {
        note = `رؤوس الحماية تمنع التضمين: x-frame=${xFrame || "none"}, csp=${csp ? "present" : "none"}`;
      }
    } catch (err: any) {
      ok = false;
      note = err.message || "فشل الاتصال برابط القناة الرسمي";
    }

    // تسجيل نتيجة الفحص
    await prisma.channelCheck.create({
      data: {
        channelId: channel.id,
        ok,
        httpStatus,
        note,
      },
    });

    // تحديث حالة القناة وتاريخ الفحص
    await prisma.channel.update({
      where: { id: channel.id },
      data: {
        status: ok ? "AVAILABLE" : "UNAVAILABLE",
        lastCheckedAt: new Date(),
      },
    });
  }

  console.log(`📺 Finished checking ${channels.length} live broadcast channels.`);
}

