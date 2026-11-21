import { prisma } from "@awt/db";

export const dynamic = "force-dynamic";

export default async function SportsLinkAdminPage() {
  const [entities, links] = await Promise.all([
    prisma.sportsEntity.findMany({
      take: 20,
    }),
    prisma.sportsLink.findMany({
      include: {
        article: true,
        entity: true,
      },
      orderBy: { confidence: "asc" },
      take: 20,
    }),
  ]);

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="text-xl font-bold">تكامل يلا سبورت ومطابقة الكيانات الرياضية</h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            إدارة الربط الذكي بين الأخبار الرياضية على «الوطن اليوم» وصفحات الأندية والمباريات على yallasport.com
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <span className="text-xs text-[var(--text-muted)] block mb-1">الكيانات الرياضية المتزامنة</span>
          <div className="text-2xl font-black text-[var(--text)]">{entities.length}</div>
          <span className="text-[10px] text-[var(--text-muted)] mt-1 block">أندية، بطولات، ولاعبون</span>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <span className="text-xs text-[var(--text-muted)] block mb-1">الروابط النشطة</span>
          <div className="text-2xl font-black text-emerald-400">{links.length}</div>
          <span className="text-[10px] text-emerald-500/80 mt-1 block">مطابقة بثقة عالية</span>
        </div>

        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
          <span className="text-xs text-[var(--text-muted)] block mb-1">تحتاج مراجعة (ثقة منخفضة)</span>
          <div className="text-2xl font-black text-amber-400">0</div>
          <span className="text-[10px] text-amber-500/80 mt-1 block">تتطلب تدقيق المحرر الرياضي</span>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4">
        <h3 className="font-bold text-sm text-[var(--text)]">ضوابط التكامل الرياضي</h3>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          وفقاً للوثيقة التقنية (القسم 12)، لا تُعرض أي بطاقة مباراة أو موعد ما لم يُتحقق من وجود معرّف ثابت (externalId) لدى يلا سبورت، ولا يُعرض أكثر من 3 روابط لكل خبر رياضي حفاظاً على هدوء التصميم.
        </p>
      </div>
    </div>
  );
}

