import Link from "next/link";
import { prisma } from "@awt/db";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{
    status?: string;
    sourceId?: string;
  }>;
}

export default async function NewsroomPage({ searchParams }: Props) {
  const { status, sourceId } = await searchParams;

  const [items, sources, counts] = await Promise.all([
    prisma.item.findMany({
      where: {
        ...(status ? { status: status as any } : {}),
        ...(sourceId ? { sourceId } : {}),
      },
      include: {
        source: true,
        story: true,
        article: true,
      },
      orderBy: { fetchedAt: "desc" },
      take: 40,
    }),
    prisma.source.findMany({
      select: { id: true, nameAr: true },
      orderBy: { nameAr: "asc" },
    }),
    prisma.item.groupBy({
      by: ["status"],
      _count: true,
    }),
  ]);

  const countByStatus: Record<string, number> = {};
  for (const c of counts) {
    countByStatus[c.status] = c._count;
  }

  const tabs = [
    { key: "", label: "الكل", count: items.length },
    { key: "NEW", label: "جديد", count: countByStatus["NEW"] || 0 },
    { key: "REVIEW", label: "قيد المراجعة", count: countByStatus["REVIEW"] || 0 },
    { key: "PUBLISHED", label: "منشور", count: countByStatus["PUBLISHED"] || 0 },
    { key: "DUPLICATE", label: "مكرر", count: countByStatus["DUPLICATE"] || 0 },
    { key: "REJECTED", label: "مرفوض", count: countByStatus["REJECTED"] || 0 },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="text-xl font-bold">غرفة الأخبار ومسار المعالجة الآلي</h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            متابعة حية لجميع المواد الخام الواردة من المصادر ومراحل التدقيق والتصنيف
          </p>
        </div>
        <Link
          href="/newsroom/review"
          className="px-4 py-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold hover:bg-amber-500/20 transition-colors flex items-center gap-2"
        >
          <span>قائمة المراجعة الفورية</span>
          <span className="bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px]">
            {countByStatus["REVIEW"] || 0}
          </span>
        </Link>
      </div>

      {/* تبويبات الفرز حسب الحالة */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs border-b border-[var(--border)] pb-2">
        {tabs.map((tab) => {
          const isActive = (status || "") === tab.key;
          return (
            <Link
              key={tab.key}
              href={tab.key ? `/newsroom?status=${tab.key}` : "/newsroom"}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-2 transition-colors ${
                isActive
                  ? "bg-[var(--primary)] text-slate-950 font-bold"
                  : "bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive ? "bg-slate-950/20 text-slate-950" : "bg-[var(--bg)] text-[var(--text-muted)]"
              }`}>
                {tab.count}
              </span>
            </Link>
          );
        })}
      </div>

      {/* جدول المواد */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
        <table className="w-full text-start text-xs">
          <thead className="bg-[var(--bg)] border-b border-[var(--border)] text-[var(--text-muted)]">
            <tr>
              <th className="py-3 px-4 text-start font-semibold">المادة والعنوان</th>
              <th className="py-3 px-4 text-start font-semibold">المصدر</th>
              <th className="py-3 px-4 text-start font-semibold">القسم المقترح</th>
              <th className="py-3 px-4 text-start font-semibold">الأهمية</th>
              <th className="py-3 px-4 text-start font-semibold">الحالة</th>
              <th className="py-3 px-4 text-start font-semibold">وقت الجلب</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]/60">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-[var(--surface-hover)]">
                <td className="py-3 px-4 max-w-md">
                  <span className="font-bold text-[var(--text)] block truncate">
                    {item.titleAr || item.titleOriginal}
                  </span>
                  {item.titleAr && item.titleOriginal !== item.titleAr && (
                    <span className="text-[10px] text-[var(--text-muted)] block truncate dir-ltr text-start">
                      {item.titleOriginal}
                    </span>
                  )}
                  {item.article && (
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
                      ✓ نُشر برقم: {item.article.id}
                    </span>
                  )}
                  {item.rejectReason && (
                    <span className="text-[10px] text-rose-400 block mt-0.5">
                      سبب الرفض/المراجعة: {item.rejectReason}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className="font-semibold block">{item.source.nameAr}</span>
                  <a
                    href={item.canonicalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-cyan-400 hover:underline block"
                  >
                    الرابط الأصلي ↗
                  </a>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px]">
                    {item.sectionGuess || "عام"}
                  </span>
                  {item.isBreaking && (
                    <span className="text-[10px] text-rose-400 font-bold block mt-1">عاجل</span>
                  )}
                </td>
                <td className="py-3 px-4 font-mono">
                  {item.importance !== null ? `${item.importance}/100` : "—"}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === "PUBLISHED"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : item.status === "REVIEW"
                        ? "bg-amber-500/10 text-amber-400"
                        : item.status === "DUPLICATE"
                        ? "bg-purple-500/10 text-purple-400"
                        : "bg-slate-500/10 text-slate-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-[10px] text-[var(--text-muted)]">
                  {new Date(item.fetchedAt).toLocaleTimeString("ar-EG")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="p-12 text-center text-xs text-[var(--text-muted)]">
            لا توجد مواد تطابق هذا الفلتر حالياً.
          </div>
        )}
      </div>
    </div>
  );
}

