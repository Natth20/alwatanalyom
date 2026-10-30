import { prisma } from "@awt/db";
import { ReviewItemsList } from "./ReviewItemsList";

export const dynamic = "force-dynamic";

export default async function NewsroomReviewPage() {
  const reviewItems = await prisma.item.findMany({
    where: { status: "REVIEW" },
    include: { source: true },
    orderBy: { fetchedAt: "desc" },
    take: 30,
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span>قائمة المراجعة التحريرية المزدوجة</span>
            <span className="bg-amber-500/10 text-amber-400 text-xs px-2.5 py-0.5 rounded-full font-bold">
              {reviewItems.length} مواد تنتظر المراجعة
            </span>
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            الأخبار التي تضمنت علامات حساسية أو كانت نسبة ثقة الترجمة منخفضة، وتتطلب مراجعة المحرر البشري قبل النشر.
          </p>
        </div>
      </div>

      {/* قائمة المراجعة التفاعلية */}
      <ReviewItemsList initialItems={reviewItems} />
    </div>
  );
}
