import { prisma } from "@awt/db";
import { AddSourceModal } from "./AddSourceModal";
import { SourceRowActions } from "./SourceRowActions";

export const dynamic = "force-dynamic";

export default async function AdminSourcesPage() {
  const sources = await prisma.source.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="text-xl font-bold">إدارة المصادر وخلاصات الأخبار (RSS & APIs)</h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            التحكم في المصادر المعتمدة، سياسات العرض لكل ناشر، ومعدل تكرار الجلب.
          </p>
        </div>

        {/* زر ومودال إضافة مصدر جديد */}
        <AddSourceModal />
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm">
        <table className="w-full text-start text-xs">
          <thead className="bg-[var(--bg)] border-b border-[var(--border)] text-[var(--text-muted)]">
            <tr>
              <th className="py-3 px-4 text-start font-semibold">المصدر</th>
              <th className="py-3 px-4 text-start font-semibold">النوع والوسيلة</th>
              <th className="py-3 px-4 text-start font-semibold">سياسة العرض</th>
              <th className="py-3 px-4 text-start font-semibold">مستوى الثقة</th>
              <th className="py-3 px-4 text-start font-semibold">التكرار</th>
              <th className="py-3 px-4 text-start font-semibold">الحالة</th>
              <th className="py-3 px-4 text-start font-semibold">آخر جلب</th>
              <th className="py-3 px-4 text-start font-semibold">إجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]/60">
            {sources.map((src) => (
              <tr key={src.id} className="hover:bg-[var(--surface-hover)]">
                <td className="py-3 px-4">
                  <span className="font-bold text-[var(--text)] block">{src.nameAr}</span>
                  <a
                    href={src.feedUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-[var(--text-muted)] hover:text-cyan-400 font-mono truncate max-w-xs block"
                  >
                    {src.feedUrl}
                  </a>
                </td>
                <td className="py-3 px-4">
                  <span className="text-[11px] block">{src.type}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">{src.method}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-mono">
                    {src.displayPolicy}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-amber-400">★ {src.trustLevel}/5</span>
                </td>
                <td className="py-3 px-4">
                  <span>كل {src.pollSeconds} ثانية</span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      src.enabled && src.state === "OK"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {src.enabled ? src.state : "PAUSED"}
                  </span>
                </td>
                <td className="py-3 px-4 text-[10px] text-[var(--text-muted)]">
                  {src.lastSuccessAt ? new Date(src.lastSuccessAt).toLocaleTimeString("ar-EG") : "لم يبدأ بعد"}
                </td>
                <td className="py-3 px-4">
                  <SourceRowActions sourceId={src.id} enabled={src.enabled} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
