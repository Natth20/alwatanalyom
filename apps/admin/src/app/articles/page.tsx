import Link from "next/link";
import { prisma } from "@awt/db";

export const dynamic = "force-dynamic";

export default async function ArticlesAdminPage() {
  const articles = await prisma.article.findMany({
    include: {
      section: true,
      source: true,
      corrections: true,
    },
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="text-xl font-bold">إدارة المقالات والأخبار المنشورة</h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            التحكم في المقالات، تعديلها، إضافة التصحيحات التحريرية، أو سحب المواد المخالفة
          </p>
        </div>
        <Link
          href="/articles/new"
          className="px-4 py-2 rounded-lg bg-[var(--primary)] text-slate-950 font-bold text-xs hover:bg-[var(--primary-hover)] transition-colors"
        >
          + كتابة مقال أصلي جديد
        </Link>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
        <table className="w-full text-start text-xs">
          <thead className="bg-[var(--bg)] border-b border-[var(--border)] text-[var(--text-muted)]">
            <tr>
              <th className="py-3 px-4 text-start font-semibold">المقال</th>
              <th className="py-3 px-4 text-start font-semibold">القسم</th>
              <th className="py-3 px-4 text-start font-semibold">المصدر / الكاتب</th>
              <th className="py-3 px-4 text-start font-semibold">سياسة العرض</th>
              <th className="py-3 px-4 text-start font-semibold">الحالة</th>
              <th className="py-3 px-4 text-start font-semibold">تاريخ النشر</th>
              <th className="py-3 px-4 text-start font-semibold">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]/60">
            {articles.map((art) => (
              <tr key={art.id} className="hover:bg-[var(--surface-hover)]">
                <td className="py-3 px-4 max-w-md">
                  <span className="font-bold text-[var(--text)] block truncate">
                    {art.titleAr}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    {art.isBreaking && (
                      <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.2 rounded text-[10px] font-bold">عاجل</span>
                    )}
                    {art.corrections.length > 0 && (
                      <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.2 rounded text-[10px]">
                        {art.corrections.length} تصحيح
                      </span>
                    )}
                    <span className="text-[10px] text-[var(--text-muted)]">معرّف: {art.id}</span>
                  </div>
                </td>
                <td className="py-3 px-4 font-semibold text-[var(--primary)]">
                  {art.section.nameAr}
                </td>
                <td className="py-3 px-4">
                  <span>{art.source?.nameAr || "محرر المنصة"}</span>
                </td>
                <td className="py-3 px-4 font-mono text-[10px]">
                  {art.displayPolicy}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      art.status === "PUBLISHED"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : art.status === "WITHDRAWN"
                        ? "bg-rose-500/10 text-rose-400"
                        : "bg-slate-500/10 text-slate-400"
                    }`}
                  >
                    {art.status}
                  </span>
                  {art.withdrawnReason && (
                    <span className="text-[10px] text-rose-400 block mt-1">
                      {art.withdrawnReason}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-[10px] text-[var(--text-muted)]">
                  {art.publishedAt ? new Date(art.publishedAt).toLocaleDateString("ar-EG") : "—"}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/articles/${art.id}`}
                      className="px-2.5 py-1 rounded bg-[var(--bg)] border border-[var(--border)] text-[11px] font-medium hover:border-[var(--primary)]"
                    >
                      تعديل / سحب
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {articles.length === 0 && (
          <div className="p-12 text-center text-xs text-[var(--text-muted)]">
            لا توجد مقالات منشورة بعد.
          </div>
        )}
      </div>
    </div>
  );
}

