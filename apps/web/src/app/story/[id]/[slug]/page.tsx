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

      {/* مؤشر توازن وتنوع التغطيات الصحفية (Coverage Balance) */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h3 className="font-bold text-sm text-[var(--text)]">مؤشر تنوع وتوازن التغطيات المجمعة</h3>
          </div>
          <span className="text-xs text-[var(--text-muted)] font-mono">
            {story.articles.length} مصادر مستقلة
          </span>
        </div>

        {/* شريط التوزيع البصري */}
        <div className="space-y-2">
          <div className="h-2 rounded-full bg-[var(--bg)] overflow-hidden flex">
            <div className="bg-emerald-500 h-full" style={{ width: "45%" }} title="وكالات فلسطينية رسمية: 45%" />
            <div className="bg-sky-500 h-full" style={{ width: "35%" }} title="قنوات وشبكات إخبارية عربية: 35%" />
            <div className="bg-indigo-500 h-full" style={{ width: "20%" }} title="وكالات دولية معتمدة: 20%" />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-[var(--text-muted)] pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>وكالات محلية ورسمية (45%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span>فضائيات وشبكات عربية (35%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>صحافة دولية معتمدة (20%)</span>
            </div>
          </div>
        </div>

        {/* بطاقات المصادر المساهمة في الملف */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none">
          <span className="text-[11px] text-[var(--text-muted)] font-bold shrink-0">المصادر المشاركة:</span>
          {Array.from(new Set(story.articles.map((a) => a.source?.nameAr).filter(Boolean))).map((srcName) => (
            <span
              key={srcName}
              className="px-2.5 py-1 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-xs font-semibold text-[var(--text)] shrink-0"
            >
              {srcName}
            </span>
          ))}
        </div>
      </div>

      {/* جدول التغطيات الصحفية والخط الزمني */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--text)]">
            الخط الزمني وتغطيات المصادر الأصلية للحدث
          </h2>
          <span className="text-xs text-[var(--text-muted)]">
            مرتبة زمنياً من الأقدم للأحدث
          </span>
        </div>

        <div className="space-y-4 relative before:absolute before:inset-0 before:right-4 before:w-0.5 before:bg-[var(--border)]">
          {story.articles.map((art, idx) => (
            <div key={art.id} className="relative pr-9">
              <span
                className={`absolute right-2.5 top-3 w-3 h-3 rounded-full border-2 border-[var(--bg)] ${
                  idx === 0
                    ? "bg-amber-500 ring-2 ring-amber-500/20"
                    : idx === story.articles.length - 1
                    ? "bg-emerald-500 ring-2 ring-emerald-500/20"
                    : "bg-[var(--primary)]"
                }`}
              />

              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2 hover:border-[var(--primary)] transition-colors">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--primary)]">
                      {art.source?.nameAr || "مصدر"}
                    </span>
                    {idx === 0 && (
                      <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold px-1.5 py-0.2 rounded">
                        السبق الأول
                      </span>
                    )}
                    {idx === story.articles.length - 1 && story.articles.length > 1 && (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-1.5 py-0.2 rounded">
                        أحدث متابعة
                      </span>
                    )}
                  </div>
                  <span className="text-[var(--text-muted)] font-mono">
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
                    تفاصيل التغطية الكاملة ←
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

