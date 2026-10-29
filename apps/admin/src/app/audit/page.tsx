import { prisma } from "@awt/db";

export const dynamic = "force-dynamic";

export default async function AuditLogAdminPage() {
  const logs = await prisma.auditLog.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="text-xl font-bold">سجل التدقيق والمراقبة التحريرية (Audit Log)</h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            سجل غير قابل للتعديل يوثق كل إجراء إداري أو تحريري (نشر، سحب، تعديل مصادر، تغيير سياسات)
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
        <table className="w-full text-start text-xs">
          <thead className="bg-[var(--bg)] border-b border-[var(--border)] text-[var(--text-muted)]">
            <tr>
              <th className="py-3 px-4 text-start font-semibold">المستخدم والمسؤول</th>
              <th className="py-3 px-4 text-start font-semibold">الإجراء (Action)</th>
              <th className="py-3 px-4 text-start font-semibold">الكيان والهدف</th>
              <th className="py-3 px-4 text-start font-semibold">عنوان IP</th>
              <th className="py-3 px-4 text-start font-semibold">التاريخ والوقت</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]/60">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-[var(--surface-hover)]">
                <td className="py-3 px-4">
                  <span className="font-bold text-[var(--text)] block">{log.user?.name || "نظام آلي"}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">{log.user?.email || "system@internal"}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded text-[10px]">
                    {log.action}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="font-medium">{log.entityType}</span>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono block">
                    ID: {log.entityId}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-[10px] text-[var(--text-muted)]">
                  {log.ip || "127.0.0.1"}
                </td>
                <td className="py-3 px-4 text-[10px] text-[var(--text-muted)]">
                  {new Date(log.createdAt).toLocaleString("ar-EG")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {logs.length === 0 && (
          <div className="p-12 text-center text-xs text-[var(--text-muted)]">
            ✅ لا توجد عمليات تدقيق مسجلة بعد. تُسجل جميع الإجراءات التحريرية تلقائياً فور بدء التشغيل.
          </div>
        )}
      </div>
    </div>
  );
}
