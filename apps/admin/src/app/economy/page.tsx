import { prisma } from "@awt/db";

export const dynamic = "force-dynamic";

export default async function EconomyAdminPage() {
  const instruments = await prisma.instrument.findMany({
    include: {
      quotes: {
        orderBy: { asOf: "desc" },
        take: 1,
      },
    },
    orderBy: { category: "asc" },
  });

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="text-xl font-bold">مراقبة المؤشرات وبيانات الأسواق الاقتصادية</h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            متابعة حية لسلامة مزودي الأسعار، توقيت آخر تحديث، وحالة المؤشرات (LIVE / DELAYED / UNAVAILABLE)
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
        <table className="w-full text-start text-xs">
          <thead className="bg-[var(--bg)] border-b border-[var(--border)] text-[var(--text-muted)]">
            <tr>
              <th className="py-3 px-4 text-start font-semibold">الرمز والمؤشر</th>
              <th className="py-3 px-4 text-start font-semibold">الفئة</th>
              <th className="py-3 px-4 text-start font-semibold">آخر سعر مسجل</th>
              <th className="py-3 px-4 text-start font-semibold">التغير</th>
              <th className="py-3 px-4 text-start font-semibold">حالة البيانات</th>
              <th className="py-3 px-4 text-start font-semibold">المزود</th>
              <th className="py-3 px-4 text-start font-semibold">توقيت السعر</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]/60">
            {instruments.map((inst) => {
              const q = inst.quotes[0];
              return (
                <tr key={inst.id} className="hover:bg-[var(--surface-hover)]">
                  <td className="py-3 px-4">
                    <span className="font-bold text-[var(--text)] block">{inst.nameAr}</span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">{inst.symbol}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px]">
                      {inst.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-black font-mono text-[var(--text)]">
                    {q ? `${q.price} ${inst.currency || ""}` : "بانتظار البيانات"}
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold">
                    {q?.changePct ? `${q.changePct}%` : "—"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        q?.status === "LIVE"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : q?.status === "DELAYED"
                          ? "bg-amber-500/10 text-amber-400"
                          : "bg-rose-500/10 text-rose-400"
                      }`}
                    >
                      {q?.status || "UNAVAILABLE"}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px] text-[var(--text-muted)]">
                    {inst.providerKey}
                  </td>
                  <td className="py-3 px-4 text-[10px] text-[var(--text-muted)]">
                    {q ? new Date(q.asOf).toLocaleTimeString("ar-EG") : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
