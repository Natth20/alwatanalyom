import { prisma } from "@awt/db";

export const dynamic = "force-dynamic";

export default async function PoliciesAdminPage() {
  const policy = await prisma.publishPolicy.findFirst({
    where: { enabled: true },
  });

  const rules = (policy?.rules as any) || {
    autoPublishMinConfidence: 0.85,
    autoPublishMinTrustLevel: 3,
    autoPublishAllowedPolicies: ["TITLE_ONLY", "EXCERPT", "SUMMARY"],
    sensitiveCategoriesForceReview: ["casualties", "accusations", "war_crimes", "financial_advice"],
    maxTitleLength: 150,
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="text-xl font-bold">سياسات النشر الآلي ومفاتيح التحكم</h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            قواعد محرك القرار الآلي لتحديد ما يُنشر مباشرة، وما يُحال إلزامياً لقائمة المراجعة البشرية
          </p>
        </div>
      </div>

      {/* بطاقة مفتاح الإيقاف الطارئ (Emergency Kill Switch) */}
      <div className="p-6 rounded-xl border border-rose-500/30 bg-rose-500/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-sm text-rose-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>مفتاح الإيقاف الطارئ العام (Master Kill Switch)</span>
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              الحالة الحالية: <strong className="text-emerald-400">النشر الآلي يعمل بشكل طبيعي</strong>.
              عند الضغط، يتوقف النشر التلقائي فوراً وتتحول جميع المواد القادمة للمراجعة البشرية دون استثناء.
            </p>
          </div>
          <button className="px-5 py-2.5 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-colors shadow">
            تفعيل الإيقاف الطارئ
          </button>
        </div>
      </div>

      {/* نموذج تعديل قواعد النشر */}
      <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-6">
        <h3 className="font-bold text-sm border-b border-[var(--border)] pb-3">
          شروط ومعايير النشر الآلي المشروط (Conditional Auto-Publish)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-[var(--text)] mb-2">
              الحد الأدنى لثقة الذكاء الاصطناعي (Confidence Threshold)
            </label>
            <input
              type="number"
              step="0.05"
              min="0.5"
              max="1.0"
              defaultValue={rules.autoPublishMinConfidence}
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none"
            />
            <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
              أي مادة تنخفض ثقتها عن هذه النسبة تُحال للمراجعة فوراً.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--text)] mb-2">
              الحد الأدنى لدرجة ثقة المصدر (Source Trust Level)
            </label>
            <input
              type="number"
              min="1"
              max="5"
              defaultValue={rules.autoPublishMinTrustLevel}
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none"
            />
            <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
              من 1 إلى 5 نجوم. المصادر الأقل تُراجع موادها يدوياً.
            </span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[var(--text)] mb-2">
            علامات الحساسية التي تفرض المراجعة البشرية الإلزامية:
          </label>
          <div className="flex flex-wrap gap-2">
            {rules.sensitiveCategoriesForceReview.map((cat: string) => (
              <span
                key={cat}
                className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-xs font-mono"
              >
                {cat}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-[var(--text-muted)] mt-2">
            يشمل: أعداد الشهداء والضحايا، الاتهامات السياسية المتبادلة، جرائم الحرب، والتوصيات المالية.
          </p>
        </div>

        <div className="pt-4 border-t border-[var(--border)] flex justify-end">
          <button className="px-5 py-2 rounded-lg bg-[var(--primary)] text-slate-950 font-bold text-xs hover:bg-[var(--primary-hover)] transition-colors">
            تحديث سياسة النشر
          </button>
        </div>
      </div>
    </div>
  );
}
