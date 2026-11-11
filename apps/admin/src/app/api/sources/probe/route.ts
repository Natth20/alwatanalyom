import { NextResponse } from "next/server";
import { fetchFeedSafe, parseFeedXml } from "@awt/ingest";

export async function POST(req: Request) {
  try {
    const { feedUrl } = await req.json();

    if (!feedUrl || typeof feedUrl !== "string") {
      return NextResponse.json(
        { ok: false, error: "يرجى تزويد رابط خلاصة صالح" },
        { status: 400 }
      );
    }

    const fetchResult = await fetchFeedSafe(feedUrl);

    if (!fetchResult.ok || !fetchResult.bodyText) {
      return NextResponse.json({
        ok: false,
        error: fetchResult.error || "تعذر قراءة محتوى الرابط",
      });
    }

    const items = parseFeedXml(fetchResult.bodyText);

    return NextResponse.json({
      ok: true,
      totalFound: items.length,
      sampleItems: items.slice(0, 5),
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message || "حدث خطأ أثناء فحص الرابط" },
      { status: 500 }
    );
  }
}

