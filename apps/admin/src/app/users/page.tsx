import { prisma } from "@awt/db";

export const dynamic = "force-dynamic";

export default async function UsersAdminPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="text-xl font-bold">إدارة المستخدمين ومصفوفة الصلاحيات</h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            إدارة حسابات المحررين والمراجعين والمشرفين التقنيين مع إلزامية المصادقة الثنائية (2FA)
          </p>
        </div>
        <button className="px-4 py-2 rounded-lg bg-[var(--primary)] text-slate-950 font-bold text-xs hover:bg-[var(--primary-hover)] transition-colors">
          + دعوة محرر جديد
        </button>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
        <table className="w-full text-start text-xs">
          <thead className="bg-[var(--bg)] border-b border-[var(--border)] text-[var(--text-muted)]">
            <tr>
              <th className="py-3 px-4 text-start font-semibold">المستخدم</th>
              <th className="py-3 px-4 text-start font-semibold">الدور (Role)</th>
              <th className="py-3 px-4 text-start font-semibold">المصادقة الثنائية (2FA)</th>
              <th className="py-3 px-4 text-start font-semibold">الحالة</th>
              <th className="py-3 px-4 text-start font-semibold">تاريخ الانضمام</th>
              <th className="py-3 px-4 text-start font-semibold">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]/60">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-[var(--surface-hover)]">
                <td className="py-3 px-4">
                  <span className="font-bold text-[var(--text)] block">{u.name}</span>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">{u.email}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                    u.role === "ADMIN"
                      ? "bg-rose-500/10 text-rose-400"
                      : u.role === "EDITOR"
                      ? "bg-amber-500/10 text-amber-400"
                      : u.role === "TECH"
                      ? "bg-cyan-500/10 text-cyan-400"
                      : "bg-slate-500/10 text-slate-400"
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {u.twoFactorOn ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span>✓</span> مفعلة
                    </span>
                  ) : (
                    <span className="text-amber-400 font-medium">مطلوب تفعيلها</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    u.active ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                  }`}>
                    {u.active ? "نشط" : "معطل"}
                  </span>
                </td>
                <td className="py-3 px-4 text-[10px] text-[var(--text-muted)]">
                  {new Date(u.createdAt).toLocaleDateString("ar-EG")}
                </td>
                <td className="py-3 px-4">
                  <button className="px-2.5 py-1 rounded bg-[var(--bg)] border border-[var(--border)] text-[11px] hover:border-[var(--primary)]">
                    تعديل الصلاحيات
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
