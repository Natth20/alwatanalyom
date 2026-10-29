"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
    } catch {}
  };

  return (
    <div className="container-custom py-10 max-w-3xl mx-auto space-y-6">
      <div className="border-b border-[var(--border)] pb-4">
        <h1 className="text-2xl font-black text-[var(--text)] mb-1">المواد المحفوظة للقراءة لاحقاً</h1>
        <p className="text-xs text-[var(--text-muted)]">
          محفوظة محلياً على جهازك، ويمكنك العودة إليها وقراءتها في أي وقت حتى دون اتصال.
        </p>
      </div>

      {loaded && savedItems.length > 0 ? (
        <div className="space-y-3">
          {savedItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] text-[var(--primary)] font-bold">{item.section}</span>
                <h3 className="font-bold text-sm text-[var(--text)] hover:text-[var(--primary)]">
                  <Link href={`/article/${item.id}/${item.slug}`}>
                    {item.title}
                  </Link>
                </h3>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-xs text-rose-500 hover:underline shrink-0 p-1"
                title="إزالة من المحفوظات"
              >
                إزالة
              </button>
            </div>
          ))}
        </div>
      ) : loaded ? (
        <div className="p-16 text-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] space-y-3">
          <span className="text-3xl block">🔖</span>
          <p className="text-sm font-semibold">لا توجد مواد محفوظة في قائمتك بعد.</p>
          <p className="text-xs">
            أثناء تصفحك لأي خبر، اضغط على زر الحفظ لحفظه في هذه القائمة والرجوع إليه لاحقاً.
          </p>
          <Link
            href="/"
            className="inline-block mt-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-bold"
          >
            تصفح الأخبار الآن
          </Link>
        </div>
      ) : null}
    </div>
  );
}
