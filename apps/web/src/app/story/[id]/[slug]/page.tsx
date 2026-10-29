import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getStoryById } from "@/lib/dal";

export const revalidate = 60; // ISR 60 ثانية

interface Props {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const story = await getStoryById(id);

  if (!story) {
    return { title: "القصة غير موجودة — الوطن اليوم" };
  }

  return {
    title: `${story.headlineAr} (ملف تغطيات متكامل) — الوطن اليوم`,
    description: story.summaryAr || story.headlineAr,
    alternates: {
      canonical: `/story/${story.id}/${story.slug}`,
    },
  };
}

export default async function StoryPage({ params }: Props) {
  const { id } = await params;
  const story = await getStoryById(id);

  if (!story) {
    notFound();
  }

  return (
    <div className="container-custom py-8 max-w-4xl mx-auto space-y-8">
      {/* مسار التنقل */}
      <nav className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--primary)]">الرئيسية</Link>
        <span>/</span>
        <span>قصص مجمعة وتغطيات متكاملة</span>
        <span>/</span>
        <span className="text-[var(--primary)] font-semibold truncate max-w-xs">{story.headlineAr}</span>
      </nav>

      {/* عنوان القصة والملخص التحريري المتجدد */}
      <div className="space-y-4 border-b border-[var(--border)] pb-6">
        <div className="flex items-center gap-3">
          <span className="bg-emerald-500/10 text-emerald-600 px-2.5 py-0.5 rounded text-xs font-bold">
            قصة مجمعة
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            {story.articles.length} مصادر ووكالات تغطي الحدث
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-[var(--text)] leading-tight">
          {story.headlineAr}
        </h1>

        {story.summaryAr && (
          <div className="p-4 rounded-xl bg-[var(--surface)] border-r-4 border-[var(--primary)] text-base text-[var(--text)] leading-relaxed">
            <span className="font-bold text-xs text-[var(--primary)] block mb-1">السياق التحريري الموحد:</span>
            {story.summaryAr}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--text-muted)] pt-2">
          <span>أول ظهور للخبر: {new Date(story.firstSeenAt).toLocaleString("ar-EG")}</span>
          <span>•</span>
          <span>آخر تحديث وارد: {new Date(story.lastUpdatedAt).toLocaleString("ar-EG")}</span>
        </div>
      </div>

      {/* جدول التغطيات الصحفية والخط الزمني */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--text)]">
            الخط الزمني وتغطيات المصادر الأصلية للحدث
          </h2>
        </div>

        <div className="space-y-4 relative before:absolute before:inset-0 before:right-4 before:w-0.5 before:bg-[var(--border)]">
          {story.articles.map((art) => (
            <div key={art.id} className="relative pr-9">
              <span className="absolute right-2.5 top-3 w-3 h-3 rounded-full bg-[var(--primary)] border-2 border-[var(--bg)]"></span>

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2 hover:border-[var(--primary)] transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[var(--primary)]">
                    {art.source?.nameAr || "مصدر"}
                  </span>
                  <span className="text-[var(--text-muted)]">
                    {new Date(art.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>

                <h3 className="font-bold text-base text-[var(--text)]">
                  <Link href={`/article/${art.id}/${art.slug}`} className="hover:text-[var(--primary)]">
                    {art.titleAr}
                  </Link>
                </h3>

                {art.summaryAr && (
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                    {art.summaryAr}
                  </p>
                )}

                <div className="pt-2 flex items-center justify-between text-xs">
                  <Link href={`/article/${art.id}/${art.slug}`} className="text-[var(--primary)] font-semibold hover:underline">
                    تفاصيل التغطية ←
                  </Link>
                  {art.sourceUrl && (
                    <a
                      href={art.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text)]"
                    >
                      رابط الناشر الأصلي ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
