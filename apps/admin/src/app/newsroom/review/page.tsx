import { prisma } from "@awt/db";

export const dynamic = "force-dynamic";

export default async function NewsroomReviewPage() {
  const reviewItems = await prisma.item.findMany({
    where: { status: "REVIEW" },
    include: { source: true },
    orderBy: { fetchedAt: "desc" },
    take: 20,
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span>قائمة المراجعة البشرية</span>
            <span className="bg-amber-500/10 text-amber-400 text-xs px-2 py-0.5 rounded-full font-bold">
              {reviewItems.length} مواد
            </span>
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            الأخبار التي تضمنت علامات حساسية أو كانت نسبة ثقة الترجمة منخفضة، وتتطلب مراجعة المحرر البشري قبل النشر.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {reviewItems.length > 0 ? (
          reviewItems.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-4"
            >
              {/* شريط حالة وسبب التحويل */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--text)]">{item.source.nameAr}</span>
                  <span>•</span>
                  <span className="text-[var(--text-muted)]">
                    {item.publishedAtSource ? new Date(item.publishedAtSource).toLocaleString("ar-EG") : "تاريخ غير محدد"}
                  </span>
                </div>
                <div className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[11px] font-semibold">
                  سبب المراجعة: {item.rejectReason || "حساسية المحتوى / ثقة منخفضة"}
                </div>
              </div>

              {/* المقارنة جنباً إلى جنب (Side-by-Side) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]/60">
                {/* الجانب الأيمن: المقترح المترجم والمصنف */}
                <div className="space-y-2 border-l border-[var(--border)]/50 pl-4">
                  <span className="text-[10px] text-emerald-400 font-bold block">
                    المقترح الآلي باللغة العربية
                  </span>
                  <h3 className="font-bold text-sm text-[var(--text)]">
                    {item.titleAr || item.titleOriginal}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
                    <span>القسم المقترح: {item.sectionGuess || "عام"}</span>
                    {item.isBreaking && (
                      <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.2 rounded font-bold">عاجل</span>
                    )}
                  </div>
                </div>

                {/* الجانب الأيسر: النص والمصدر الأصلي */}
                <div className="space-y-2 pr-2">
                  <span className="text-[10px] text-slate-400 font-bold block">
                    المادة الخام الأصلية لدى المصدر
                  </span>
                  <h4 className="font-bold text-sm text-slate-300">
                    {item.titleOriginal}
                  </h4>
                  {item.summaryOrig && (
                    <p className="text-xs text-[var(--text-muted)] line-clamp-3">
                      {item.summaryOrig}
                    </p>
                  )}
                  <a
                    href={item.canonicalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-cyan-400 hover:underline inline-block mt-1"
                  >
                    فتح رابط المصدر الأصلي ↗
                  </a>
                </div>
              </div>

              {/* أزرار الإجراء التحريري */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-[10px] text-[var(--text-muted)]">
                  معرّف المادة: {item.id}
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-rose-400 hover:bg-rose-500/10 transition-colors font-medium">
                    رفض المادة
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors font-medium">
                    تعديل قبل النشر
                  </button>
                  <button className="px-4 py-1.5 rounded-lg bg-[var(--primary)] text-slate-950 font-bold text-xs hover:bg-[var(--primary-hover)] transition-colors">
                    اعتماد ونشر فوري
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-xs text-[var(--text-muted)] rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            ✅ لا توجد مواد تنتظر المراجعة البشرية حالياً. غرفة الأخبار تعمل بكفاءة.
          </div>
        )}
      </div>
    </div>
  );
}

