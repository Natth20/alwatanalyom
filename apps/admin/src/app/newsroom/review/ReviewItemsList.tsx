"use client";

import { useState } from "react";
import { Check, X, Edit3, ExternalLink, Sparkles, Loader2, AlertCircle } from "lucide-react";

interface ReviewItem {
  id: string;
  titleOriginal: string;
  titleAr?: string | null;
  summaryOrig?: string | null;
  canonicalUrl: string;
  publishedAtSource?: Date | string | null;
  sectionGuess?: string | null;
  isBreaking: boolean;
  rejectReason?: string | null;
  source: {
    nameAr: string;
    slug: string;
  };
}

interface Props {
  initialItems: ReviewItem[];
}

export function ReviewItemsList({ initialItems }: Props) {
  const [items, setItems] = useState<ReviewItem[]>(initialItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ id: string; text: string; type: "success" | "error" } | null>(null);

  const startEdit = (item: ReviewItem) => {
    setEditingId(item.id);
    setEditedTitle(item.titleAr || item.titleOriginal);
  };

  const handleAction = async (item: ReviewItem, action: "approve" | "reject") => {
    setLoadingId(item.id);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: item.id,
          action,
          modifiedTitle: editingId === item.id ? editedTitle : undefined,
          rejectReason: action === "reject" ? "مرفوضة يدوياً من قائمة المراجعة التحريرية" : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "فشل تنفيذ الإجراء");
      }

      setStatusMessage({
        id: item.id,
        text: action === "approve" ? "✅ تم اعتماد ونشر المادة بنجاح!" : "❌ تم رفض واستبعاد المادة",
        type: action === "approve" ? "success" : "error",
      });

      // إزالة العنصر من القائمة بتأثير تدريجي
      setTimeout(() => {
        setItems((prev) => prev.filter((it) => it.id !== item.id));
        setEditingId(null);
        setStatusMessage(null);
      }, 700);
    } catch (err: any) {
      alert(err.message || "حدث خطأ غير متوقع");
    } finally {
      setLoadingId(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="p-12 text-center text-xs text-[var(--text-muted)] rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
        <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-2 opacity-60" />
        <p className="font-bold text-sm text-[var(--text)]">لا توجد مواد تنتظر المراجعة البشرية حالياً</p>
        <p>غرفة الأخبار تعمل بكفاءة تامة وكافة المواد الواردة إما نُشرت أو صُنفت آلياً.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const isEditing = editingId === item.id;
        const isLoading = loadingId === item.id;

        return (
          <div
            key={item.id}
            className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-4 transition-all"
          >
            {/* رأس البطاقة */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[var(--text)]">{item.source.nameAr}</span>
                <span>•</span>
                <span className="text-[var(--text-muted)]">
                  {item.publishedAtSource
                    ? new Date(item.publishedAtSource).toLocaleString("ar-EG")
                    : "تاريخ غير محدد"}
                </span>
              </div>
              <div className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded text-[11px] font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>سبب المراجعة: {item.rejectReason || "حساسية المحتوى / ثقة النموذج"}</span>
              </div>
            </div>

            {/* المقارنة المزدوجة (جنباً إلى جنب) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg bg-[var(--bg)] border border-[var(--border)]/60">
              {/* الجانب الأيمن: المقترح الآلي بالعربية */}
              <div className="space-y-2 border-l border-[var(--border)]/50 pl-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 font-bold block">
                    المقترح الآلي باللغة العربية
                  </span>
                  {!isEditing && (
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      className="text-[10px] text-[var(--text-muted)] hover:text-emerald-400 flex items-center gap-1 transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>تعديل الصياغة</span>
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full px-3 py-1.5 rounded border border-[var(--border)] bg-[var(--surface)] text-xs font-bold text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="px-2 py-0.5 rounded border border-[var(--border)] text-[10px] text-[var(--text-muted)]"
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                ) : (
                  <h3 className="font-bold text-sm text-[var(--text)] leading-snug">
                    {item.titleAr || item.titleOriginal}
                  </h3>
                )}

                <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
                  <span className="bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--border)]">
                    القسم: {item.sectionGuess || "عام"}
                  </span>
                  {item.isBreaking && (
                    <span className="bg-rose-500/10 text-rose-400 px-1.5 py-0.2 rounded font-bold">عاجل</span>
                  )}
                </div>
              </div>

              {/* الجانب الأيسر: المادة الخام الأصلية */}
              <div className="space-y-2 pr-2">
                <span className="text-[10px] text-slate-400 font-bold block">
                  المادة الخام الأصلية لدى المصدر
                </span>
                <h4 className="font-bold text-sm text-slate-300 dir-ltr text-start">
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
                  className="text-[10px] text-cyan-400 hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <span>فتح رابط المصدر الأصلي</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* شريط الإجراءات التحريرية */}
            <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]/40">
              <div className="text-[10px] text-[var(--text-muted)] font-mono">
                معرّف المادة: {item.id}
              </div>

              <div className="flex items-center gap-2">
                {statusMessage && statusMessage.id === item.id ? (
                  <span className="text-xs font-bold text-emerald-400 animate-in fade-in">
                    {statusMessage.text}
                  </span>
                ) : (
                  <>
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleAction(item, "reject")}
                      className="px-3 py-1.5 rounded-lg border border-rose-500/30 text-xs text-rose-400 hover:bg-rose-500/10 transition-colors font-semibold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>رفض المادة</span>
                    </button>

                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleAction(item, "approve")}
                      className="px-4 py-1.5 rounded-lg bg-[var(--primary)] text-slate-950 font-bold text-xs hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      {isLoading ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                      <span>اعتماد ونشر فوري</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

