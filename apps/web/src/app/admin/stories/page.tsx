import Link from "next/link";
import { prisma } from "@awt/db";

export const dynamic = "force-dynamic";

export default async function StoriesAdminPage() {
  const stories = await prisma.story.findMany({
    include: {
      section: true,
      articles: {
        include: { source: true },
      },
    },
    orderBy: [{ pinned: "desc" }, { lastUpdatedAt: "desc" }],
    take: 30,
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="text-xl font-bold">إدارة القصص والتغطيات المجمعة</h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            دمج وفك دمج التغطيات، وتثبيت القصص الأهم في وحدة البطل (Hero) بالصفحة الرئيسية
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-4 hover:border-[var(--primary)]/60 transition-colors"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                {story.pinned ? (
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded font-bold">
                    📌 مثبتة في البطل بالرئيسية
                  </span>
                ) : (
                  <span className="text-[var(--text-muted)]">ترتيب خوارزمي</span>
                )}
                <span className="font-semibold text-[var(--primary)]">
                  {story.section?.nameAr || "عام"}
                </span>
                <span>•</span>
                <span className="text-[var(--text-muted)]">
                  {story.articles.length} تغطيات صحفية
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                  رواج: {story.trendingScore.toFixed(1)} | أهمية: {story.importance}/100
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-[var(--text)] mb-1">
                {story.headlineAr}
              </h2>
              {story.summaryAr && (
                <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                  {story.summaryAr}
                </p>
              )}
            </div>

            {/* المصادر المغطية لهذه القصة */}
            <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)]/60 space-y-2">
              <span className="text-[10px] text-[var(--text-muted)] font-bold block">
                التغطيات المربوطة حالياً بهذه القصة:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {story.articles.map((art) => (
                  <Link
                    key={art.id}
                    href={`/articles/${art.id}`}
                    className="px-2.5 py-1 rounded bg-[var(--surface)] border border-[var(--border)] text-[11px] hover:border-[var(--primary)] flex items-center gap-1.5"
                  >
                    <span className="text-[var(--primary)] font-semibold">{art.source?.nameAr || "مصدر"}:</span>
                    <span className="truncate max-w-[200px]">{art.titleAr}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-[10px] text-[var(--text-muted)]">
                آخر تحديث: {new Date(story.lastUpdatedAt).toLocaleString("ar-EG")}
              </span>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1 rounded bg-[var(--bg)] border border-[var(--border)] text-xs font-semibold hover:border-[var(--primary)]">
                  {story.pinned ? "إلغاء التثبيت" : "تثبيت في بطل الرئيسية"}
                </button>
                <button className="px-3 py-1 rounded bg-[var(--bg)] border border-[var(--border)] text-xs text-rose-400 hover:bg-rose-500/10">
                  فك دمج التغطيات
                </button>
              </div>
            </div>
          </div>
        ))}

        {stories.length === 0 && (
          <div className="p-12 text-center text-xs text-[var(--text-muted)] rounded-xl border border-[var(--border)]">
            لا توجد قصص مجمعة بعد.
          </div>
        )}
      </div>
    </div>
  );
}

