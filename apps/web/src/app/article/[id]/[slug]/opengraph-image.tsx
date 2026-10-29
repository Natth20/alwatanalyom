import { ImageResponse } from "next/og";
import { getArticleById } from "@/lib/dal";

export const runtime = "nodejs";
export const alt = "الوطن اليوم — بطاقة الخبر الصحفي";
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
  const article = await getArticleById(id);

  const title = article?.titleAr || "الوطن اليوم — المنصة الإخبارية المستقلة";
  const section = article?.section.nameAr || "أخبار";
  const source = article?.source?.nameAr || "محرر الوطن اليوم";

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
          backgroundColor: "#090d16",
          backgroundImage:
            "radial-gradient(circle at 90% 10%, rgba(225, 29, 72, 0.2), transparent 45%), radial-gradient(circle at 10% 90%, rgba(245, 158, 11, 0.15), transparent 45%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          direction: "rtl",
        }}
      >
        {/* رأس البطاقة والشعار */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "#e11d48" }} />
            <span style={{ fontSize: "32px", fontWeight: "900", letterSpacing: "-0.5px" }}>
              الوطن اليوم
            </span>
          </div>
          <div
            style={{
              padding: "8px 24px",
              borderRadius: "9999px",
              backgroundColor: "rgba(225, 29, 72, 0.2)",
              border: "1px solid rgba(225, 29, 72, 0.4)",
              color: "#fb7185",
              fontSize: "22px",
              fontWeight: "700",
            }}
          >
            {section}
          </div>
        </div>

        {/* عنوان الخبر البارز */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px", marginBottom: "24px" }}>
          <div
            style={{
              fontSize: title.length > 70 ? "46px" : "56px",
              fontWeight: "900",
              lineHeight: 1.35,
              color: "#f8fafc",
            }}
          >
            {title}
          </div>
        </div>

        {/* تذييل البطاقة والمصدر والمصداقية */}
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
            <span>المصدر الموثق:</span>
            <span style={{ color: "#f1f5f9", fontWeight: "700" }}>{source}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "22px", color: "#64748b" }}>
            <span style={{ color: "#e11d48", fontWeight: "bold" }}>●</span>
            <span>alwatantoday.net</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
