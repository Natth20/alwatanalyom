import { ImageResponse } from "next/og";
import { getStoryById } from "@/lib/dal";

export const runtime = "nodejs";
export const alt = "الوطن اليوم — قصة خبرية مجمعة وتغطية شاملة";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export default async function Image({ params }: Props) {
  const { id } = await params;
  const story = await getStoryById(id);

  const headline = story?.headlineAr || "ملف إخباري وقصة مجمعة";
  const section = story?.section?.nameAr || "تغطية مجمعة";
  const articlesCount = story?.articles?.length || 1;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          backgroundColor: "#0b0f19",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(14, 165, 233, 0.2), transparent 45%), radial-gradient(circle at 15% 85%, rgba(225, 29, 72, 0.15), transparent 45%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          direction: "rtl",
        }}
      >
        {/* رأس البطاقة */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#0284c7" }} />
            <span style={{ fontSize: "32px", fontWeight: "900", letterSpacing: "-0.5px" }}>
              الوطن اليوم
            </span>
          </div>
          <div
            style={{
              padding: "8px 24px",
              borderRadius: "9999px",
              backgroundColor: "rgba(14, 165, 233, 0.2)",
              border: "1px solid rgba(14, 165, 233, 0.4)",
              color: "#38bdf8",
              fontSize: "22px",
              fontWeight: "700",
            }}
          >
            قصة مجمعة · {section}
          </div>
        </div>

        {/* عنوان القصة */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "20px", marginBottom: "20px" }}>
          <div
            style={{
              fontSize: headline.length > 70 ? "46px" : "56px",
              fontWeight: "900",
              lineHeight: 1.35,
              color: "#f8fafc",
            }}
          >
            {headline}
          </div>
        </div>

        {/* التذييل */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.14)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "22px", color: "#94a3b8" }}>
            <span>تغطية متكاملة تضم</span>
            <span style={{ color: "#38bdf8", fontWeight: "bold" }}>{articlesCount} مصادر وتحديثات</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "22px", color: "#64748b" }}>
            <span style={{ color: "#0284c7", fontWeight: "bold" }}>●</span>
            <span>alwatantoday.net</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
