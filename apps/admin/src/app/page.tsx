import Link from "next/link";
import { prisma } from "@awt/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    sourcesCount,
    pendingReviewCount,
    publishedCount,
    recentEvents,
  ] = await Promise.all([
    prisma.source.count({ where: { enabled: true } }),
    prisma.item.count({ where: { status: "REVIEW" } }),
    prisma.article.count({ where: { status: "PUBLISHED" } }),
    prisma.pipelineEvent.findMany({
      orderBy: { at: "desc" },
      take: 8,
      include: { item: true },
    }),
  ]);

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-black mb-1">لوحة القيادة والمراقبة الحية</h1>
        <p className="text-xs text-[var(--text-muted)]">
          متابعة فورية لنشاط غرفة الأخبار، طوابير المعالجة، وسلامة المصادر
        </p>
      </div>

      {/* بطاقات الإحصاءات السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <span className="text-xs text-[var(--text-muted)] block mb-1">المصادر النشطة</span>
          <div className="text-3xl font-black text-emerald-400">{sourcesCount}</div>
          <span className="text-[10px] text-emerald-500/80 mt-1 block">خلاصات RSS / API متصلة</span>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <span className="text-xs text-[var(--text-muted)] block mb-1">تنتظر المراجعة البشرية</span>
          <div className="text-3xl font-black text-amber-400">{pendingReviewCount}</div>
          <Link href="/newsroom/review" className="text-[10px] text-amber-400 hover:underline mt-1 block">
            الانتقال للمراجعة الفورية ←
          </Link>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <span className="text-xs text-[var(--text-muted)] block mb-1">إجمالي المقالات المنشورة</span>
          <div className="text-3xl font-black text-[var(--text)]">{publishedCount}</div>
          <span className="text-[10px] text-[var(--text-muted)] mt-1 block">منشورة ومفهرسة</span>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <span className="text-xs text-[var(--text-muted)] block mb-1">استهلاك Claude API</span>
          <div className="text-3xl font-black text-cyan-400">$0.85</div>
          <span className="text-[10px] text-cyan-500/80 mt-1 block">من أصل سقف $25 اليومي</span>
        </div>
      </div>

      {/* سجل مسار المعالجة الأخير (Pipeline Stream) */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex items-center justify-between mb-4 border-b border-[var(--border)] pb-3">
          <h3 className="font-bold text-sm">آخر أحداث مسار المعالجة (Pipeline Events)</h3>
          <span className="text-[10px] text-[var(--text-muted)]">محدّث لحظياً</span>
        </div>

        <div className="space-y-3">
          {recentEvents.length > 0 ? (
            recentEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)]/60 bg-[var(--bg)] text-xs"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      event.decision === "publish" || event.decision === "published"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : event.decision === "review"
                        ? "bg-amber-500/10 text-amber-400"
                        : event.decision === "duplicate"
                        ? "bg-purple-500/10 text-purple-400"
                        : "bg-slate-500/10 text-slate-400"
                    }`}
                  >
                    {event.stage.toUpperCase()}: {event.decision}
                  </span>
                  <span className="text-[var(--text)] font-medium truncate max-w-md">
                    {event.item?.titleOriginal || event.reason}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)] shrink-0">
                  <span>{new Date(event.at).toLocaleTimeString("ar-EG")}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-xs text-[var(--text-muted)]">
              لا توجد أحداث مسجلة بعد في مسار المعالجة.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

