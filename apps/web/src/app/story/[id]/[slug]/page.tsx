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
    <div className="container-custom py-10 max-w-5xl mx-auto space-y-10">
      {/* مسار التنقل */}
      <nav className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--primary)] font-semibold">الرئيسية</Link>
        <span>/</span>
        <Link href="/stories" className="hover:text-[var(--primary)]">القصص المجمعة</Link>
        <span>/</span>
        <span className="text-[var(--primary)] font-black truncate max-w-xs">{story.headlineAr}</span>
      </nav>

      {/* عنوان القصة والملخص التحريري المتجدد بتصميم صداري فاخر */}
      <header className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-[var(--surface)] to-[var(--surface)] dark:from-[#041d15]/90 dark:via-[#14050a]/95 dark:to-[#0e0407]/95 p-6 md:p-9 shadow-xl space-y-5">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80" />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-black">
              ملف قصة مجمعة
            </span>
            <span className="text-xs font-bold text-[var(--text-muted)]">
              {story.articles.length} تغطيات متكاملة للحدث
            </span>
          </div>
          <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg)] px-3 py-1 rounded-xl border border-[var(--border)]">
            أهمية الملف: {story.importance}/10
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-[var(--text)] leading-tight title-imperial">
          {story.headlineAr}
        </h1>

        {story.summaryAr && (
          <div className="p-5 rounded-2xl bg-[var(--bg)]/80 dark:bg-black/40 border-r-4 border-[var(--primary)] text-sm sm:text-base text-[var(--text)] leading-relaxed shadow-xs">
            <span className="font-black text-xs text-[var(--primary)] block mb-1.5">السياق التحريري الموحد:</span>
            {story.summaryAr}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border)]">
          <span>أول رصد للحدث: <strong className="text-[var(--text)] font-mono">{new Date(story.firstSeenAt).toLocaleString("ar-EG")}</strong></span>
          <span className="opacity-30">•</span>
          <span>آخر تحديث وارد: <strong className="text-[var(--text)] font-mono">{new Date(story.lastUpdatedAt).toLocaleString("ar-EG")}</strong></span>
        </div>
      </header>

      {/* مؤشر توازن وتنوع المصادر المساهمة (Coverage Distribution) */}
      {(() => {
        const sourceMap = new Map<string, number>();
        for (const art of story.articles) {
          const name = art.source?.nameAr || "الوطن اليوم";
          sourceMap.set(name, (sourceMap.get(name) || 0) + 1);
        }
        const total = Math.max(story.articles.length, 1);
        const breakdown = Array.from(sourceMap.entries()).map(([name, count], idx) => ({
          name,
          count,
          pct: Math.round((count / total) * 100),
          color: ["bg-emerald-500", "bg-sky-500", "bg-amber-500", "bg-indigo-500", "bg-rose-500"][idx % 5]!,
        }));
        return (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="font-bold text-sm text-[var(--text)]">توزيع التغطيات حسب الوكالات والمصادر الفعلية</h3>
              </div>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                {sourceMap.size} مصادر مستقلة · {story.articles.length} مواد
              </span>
            </div>

            <div className="space-y-2">
              <div className="h-2.5 rounded-full bg-[var(--bg)] overflow-hidden flex">
                {breakdown.map((b) => (
                  <div
                    key={b.name}
                    className={`${b.color} h-full`}
                    style={{ width: `${Math.max(b.pct, 4)}%` }}
                    title={`${b.name}: ${b.count} (${b.pct}%)`}
                  />
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-[var(--text-muted)] pt-1">
                {breakdown.map((b) => (
                  <div key={b.name} className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${b.color}`} />
                    <span>
                      {b.name} ({b.pct}%)
                    </span>
                  </div>
                ))}
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
        );
      })()}

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

