import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@awt/db";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArticleDetailPage({ params }: Props) {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      section: true,
      source: true,
      corrections: { orderBy: { createdAt: "desc" } },
      story: true,
    },
  });

  if (!article) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-1">
            <Link href="/articles" className="hover:underline">المقالات</Link>
            <span>/</span>
            <span>{article.id}</span>
          </div>
          <h1 className="text-xl font-bold">تعديل وإدارة المقال الصحفي</h1>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`http://localhost:3000/article/${article.id}/${article.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs font-semibold hover:border-[var(--primary)] flex items-center gap-1"
          >
            <span>معاينة على الموقع العام</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* بطاقة تفاصيل المقال */}
      <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-6">
        <div>
          <label className="block text-xs font-bold text-[var(--text)] mb-2">
            العنوان باللغة العربية
          </label>
          <input
            type="text"
            defaultValue={article.titleAr}
            className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm font-bold text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
          />
        </div>

        {article.titleOriginal && (
          <div>
            <label className="block text-xs font-bold text-[var(--text-muted)] mb-1">
              العنوان الأصلي للمصدر
            </label>
            <p className="text-xs text-[var(--text-muted)] dir-ltr text-start p-2 rounded bg-[var(--bg)] border border-[var(--border)]">
              {article.titleOriginal}
            </p>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-[var(--text)] mb-2">
            الملخص التحريري
          </label>
          <textarea
            rows={4}
            defaultValue={article.summaryAr || ""}
            className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)] leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <span className="block text-xs font-bold text-[var(--text-muted)] mb-1">القسم</span>
            <span className="text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded">
              {article.section.nameAr}
            </span>
          </div>

          <div>
            <span className="block text-xs font-bold text-[var(--text-muted)] mb-1">المصدر</span>
            <span className="text-xs font-semibold text-[var(--text)]">
              {article.source?.nameAr || "محرر أصلي"}
            </span>
          </div>

          <div>
            <span className="block text-xs font-bold text-[var(--text-muted)] mb-1">سياسة العرض</span>
            <span className="text-xs font-mono text-slate-300 bg-slate-800 px-2 py-1 rounded">
              {article.displayPolicy}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border)] flex justify-end">
          <button className="px-5 py-2 rounded-lg bg-[var(--primary)] text-slate-950 font-bold text-xs hover:bg-[var(--primary-hover)] transition-colors">
            حفظ التعديلات التحريرية
          </button>
        </div>
      </div>

      {/* قسم إضافة تصحيح تحريري رسمي */}
      <div className="p-6 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-4">
        <h3 className="font-bold text-sm text-amber-400">إضافة تصحيح تحريري معلن</h3>
        <p className="text-xs text-[var(--text-muted)]">
          وفقاً للسياسة التحريرية، عند تعديل معلومة جوهرية (أرقام، أسماء، سياق)، يُضاف بيان تصحيح يظهر بوضوح في أسفل صفحة الخبر.
        </p>

        <textarea
          rows={2}
          placeholder="مثال: تصحيح: ورد خطأ في التقرير الأول يفيد بأن عدد المصابين 20، والصحيح وفق بيان المستشفى هو 12 مصاباً."
          className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none"
        />

        <button className="px-4 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition-colors">
          نشر التصحيح
        </button>

        {article.corrections.length > 0 && (
          <div className="pt-3 border-t border-[var(--border)]/50 space-y-2">
            <span className="text-xs font-bold text-[var(--text)] block">التصحيحات المسجلة سابقاً:</span>
            {article.corrections.map((cor) => (
              <div key={cor.id} className="text-xs text-[var(--text-muted)] bg-[var(--bg)] p-2.5 rounded border border-[var(--border)]">
                <span className="text-amber-400 font-semibold">{new Date(cor.createdAt).toLocaleString("ar-EG")}:</span> {cor.note}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* قسم سحب المادة كلياً (Withdrawn - 410) */}
      <div className="p-6 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-4">
        <h3 className="font-bold text-sm text-rose-400">سحب المادة الصحفية كلياً (HTTP 410)</h3>
        <p className="text-xs text-[var(--text-muted)]">
          في حال ثبوت عدم صحة الخبر كلياً أو وجود انتهاك حقوق ملكية، يتم سحب المادة وتعيد صفحتها رمز 410 مع إشعار بالسبب.
        </p>

        <div>
          <label className="block text-xs font-bold text-[var(--text)] mb-1">سبب السحب الإلزامي:</label>
          <input
            type="text"
            placeholder="مثال: سُحبت المادة لعدم دقة الأنباء المتداولة وفق نفي الوكالة الرسمية."
            defaultValue={article.withdrawnReason || ""}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none"
          />
        </div>

        <button className="px-4 py-2 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-colors">
          {article.status === "WITHDRAWN" ? "تحديث سبب السحب" : "سحب المادة فورياً"}
        </button>
      </div>
    </div>
  );
}

