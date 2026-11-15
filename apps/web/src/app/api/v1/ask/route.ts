import { NextRequest, NextResponse } from "next/server";
import { queryAskNewsroom } from "@/lib/dal";
import { AskQuestionSchema } from "@awt/shared";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = AskQuestionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: "INVALID_QUESTION",
            message: parsed.error.issues[0]?.message || "سؤال غير صالح",
          },
        },
        { status: 400 }
      );
    }

    const result = await queryAskNewsroom(parsed.data.question);

    return NextResponse.json({
      ok: true,
      data: result,
    });
  } catch (error: any) {
    console.error("Ask API Route Error:", error);
    return NextResponse.json(
      {
        error: {
          code: "INTERNAL_ERROR",
          message: "حدث خطأ غير متوقع أثناء معالجة السؤال الإخباري",
        },
      },
      { status: 500 }
    );
  }
}
