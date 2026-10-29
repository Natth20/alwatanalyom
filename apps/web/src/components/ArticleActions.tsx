"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, Share2, Check, Copy } from "lucide-react";

interface Props {
  article: {
    id: string;
    slug: string;
    titleAr: string;
    sectionNameAr: string;
  };
}

export function ArticleActions({ article }: Props) {
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    try {
      const data = localStorage.getItem("awt_saved_articles");
      if (data) {
        const items = JSON.parse(data);
        if (Array.isArray(items) && items.some((it: any) => it.id === article.id)) {
          setIsSaved(true);
        }
      }
    } catch {}
  }, [article.id]);

  const toggleSave = () => {
    try {
      const data = localStorage.getItem("awt_saved_articles");
      let items: any[] = data ? JSON.parse(data) : [];
      if (!Array.isArray(items)) items = [];

      if (isSaved) {
        items = items.filter((it: any) => it.id !== article.id);
        setIsSaved(false);
      } else {
        items.unshift({
          id: article.id,
          slug: article.slug,
          title: article.titleAr,
          section: article.sectionNameAr,
          savedAt: new Date().toISOString(),
        });
        setIsSaved(true);
      }

      localStorage.setItem("awt_saved_articles", JSON.stringify(items));
    } catch {}
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.titleAr,
          text: `الوطن اليوم: ${article.titleAr}`,
          url: shareUrl,
        });
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleSave}
        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
          isSaved
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
            : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)]"
        }`}
        title={isSaved ? "إلغاء الحفظ" : "حفظ المادة للقراءة لاحقاً"}
      >
        {isSaved ? (
          <>
            <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>محفوظ</span>
          </>
        ) : (
          <>
            <Bookmark className="w-3.5 h-3.5" />
            <span>حفظ</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handleShare}
        className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)] flex items-center gap-1.5 transition-colors cursor-pointer"
        title="مشاركة الخبر"
      >
        {isCopied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-bold">تم النسخ</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5" />
            <span>مشاركة</span>
          </>
        )}
      </button>
    </div>
  );
}

