"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bookmark, Trash2, ArrowLeft, BookOpen, Clock } from "lucide-react";

interface SavedArticle {
  id: string;
  slug: string;
  title: string;
  section: string;
  savedAt: string;
}

export default function SavedArticlesPage() {
  const [savedItems, setSavedItems] = useState<SavedArticle[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const data = localStorage.getItem("awt_saved_articles");
      if (data) {
        setSavedItems(JSON.parse(data));
      }
    } catch {
      // تجاهل أخطاء التخزين المحلي
    } finally {
      setLoaded(true);
    }
  }, []);

  const handleRemove = (id: string) => {
    const updated = savedItems.filter((item) => item.id !== id);
    setSavedItems(updated);
    try {
      localStorage.setItem("awt_saved_articles", JSON.stringify(updated));
      window.dispatchEvent(new Event("storage"));
    } catch {}
  };

  const handleClearAll = () => {
    if (confirm("هل أنت متأكد من رغبتك في إفراغ قائمة المحفوظات بالكامل؟")) {
      setSavedItems([]);
      try {
        localStorage.removeItem("awt_saved_articles");
        window.dispatchEvent(new Event("storage"));
      } catch {}
    }
  };

  return (
    <div className="container-custom py-10 max-w-4xl mx-auto space-y-8">
      {/* الترويسة الرئيسية */}
      <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-r from-[var(--surface)] to-[var(--bg)] p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-black text-[var(--text)]">
              قائمة القراءة والمواد المحفوظة
            </h1>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            محفوظة بأمان محلياً على جهازك لقراءتها في أي وقت بدون انترنت
          </p>
        </div>

        {savedItems.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1.5 rounded-lg">
              {savedItems.length} مقالات محفوظة
            </span>
            <button
              onClick={handleClearAll}
              className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 font-semibold border border-rose-500/20 px-3 py-1.5 rounded-lg hover:bg-rose-500/5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>إفراغ الكل</span>
            </button>
          </div>
        )}
      </div>

      {loaded && savedItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedItems.map((item) => {
            const savedDateStr = item.savedAt
              ? new Date(item.savedAt).toLocaleDateString("ar-EG", {
                  month: "short",
                  day: "numeric",
                })
              : "";

            return (
              <div
                key={item.id}
                className="group relative rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-[var(--primary)]/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded">
                      {item.section}
                    </span>
                    {savedDateStr && (
                      <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>حفظ في {savedDateStr}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-[var(--text)] group-hover:text-[var(--primary)] transition-colors leading-snug line-clamp-3 mb-4">
                    <Link href={`/article/${item.id}/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h3>
                </div>

                <div className="pt-3 border-t border-[var(--border)]/70 flex items-center justify-between text-xs">
                  <Link
                    href={`/article/${item.id}/${item.slug}`}
                    className="font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>متابعة القراءة</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 transition-colors p-1"
                    title="إزالة من القائمة"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : loaded ? (
        <div className="p-16 text-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-[var(--text)]">قائمة القراءة فارغة حالياً</h3>
            <p className="text-xs max-w-sm mx-auto leading-relaxed">
              عند قراءة أي مقال أو تقرير، يمكنك النقر على أيقونة الإشارة المرجعية 🔖 لحفظه هنا والرجوع إليه في أي وقت.
            </p>
          </div>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors shadow-sm"
            >
              <span>تصفح الصفحة الرئيسية</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
