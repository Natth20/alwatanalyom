"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck, Share2, Check, Printer, ZoomIn, ZoomOut, RotateCcw, Clock } from "lucide-react";

interface Props {
  article: {
    id: string;
    slug: string;
    titleAr: string;
    sectionNameAr: string;
    wordCount?: number;
  };
}

export function ReadingToolbar({ article }: Props) {
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0); // -1 (small), 0 (normal), 1 (large), 2 (huge)

  const words = article.wordCount || 250;
  const minutes = Math.max(1, Math.ceil(words / 180));

  useEffect(() => {
    try {
      const data = localStorage.getItem("awt_saved_articles");
      if (data) {
        const items = JSON.parse(data);
        if (Array.isArray(items) && items.some((it: any) => it.id === article.id)) {
          setIsSaved(true);
        }
      }
      const savedZoom = localStorage.getItem("awt_article_zoom");
      if (savedZoom !== null) {
        const zoom = parseInt(savedZoom, 10);
        setFontSizeLevel(zoom);
        applyFontSize(zoom);
      }
    } catch {}
  }, [article.id]);

  const applyFontSize = (level: number) => {
    const articleBody = document.getElementById("article-content-body");
    if (!articleBody) return;

    if (level === -1) {
      articleBody.style.fontSize = "0.95rem";
      articleBody.style.lineHeight = "1.8";
    } else if (level === 1) {
      articleBody.style.fontSize = "1.25rem";
      articleBody.style.lineHeight = "2.1";
    } else if (level === 2) {
      articleBody.style.fontSize = "1.45rem";
      articleBody.style.lineHeight = "2.3";
    } else {
      articleBody.style.fontSize = "1.125rem";
      articleBody.style.lineHeight = "2.0";
    }
  };

  const changeFontSize = (delta: number) => {
    const next = Math.max(-1, Math.min(2, fontSizeLevel + delta));
    setFontSizeLevel(next);
    localStorage.setItem("awt_article_zoom", next.toString());
    applyFontSize(next);
  };

  const resetFontSize = () => {
    setFontSizeLevel(0);
    localStorage.setItem("awt_article_zoom", "0");
    applyFontSize(0);
  };

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-sm no-print mb-6">
      {/* وقت القراءة والتحكم بحجم الخط */}
      <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
        <span className="flex items-center gap-1 font-medium">
          <Clock className="w-3.5 h-3.5 text-[var(--primary)]" />
          <span>قراءة في {minutes} {minutes === 1 ? "دقيقة" : minutes === 2 ? "دقيقتين" : "دقائق"}</span>
        </span>

        <span className="text-[var(--border)]">•</span>

        <div className="flex items-center gap-1">
          <span className="text-[11px] font-semibold text-[var(--text-muted)] ms-1">حجم الخط:</span>
          <button
            type="button"
            onClick={() => changeFontSize(-1)}
            disabled={fontSizeLevel <= -1}
            title="تصغير الخط"
            className="p-1 rounded hover:bg-[var(--bg)] disabled:opacity-40 text-[var(--text)] transition-colors"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={resetFontSize}
            title="الخط الافتراضي"
            className="px-1.5 py-0.5 rounded text-[10px] font-bold font-mono hover:bg-[var(--bg)] text-[var(--text)]"
          >
            A
          </button>
          <button
            type="button"
            onClick={() => changeFontSize(1)}
            disabled={fontSizeLevel >= 2}
            title="تكبير الخط"
            className="p-1 rounded hover:bg-[var(--bg)] disabled:opacity-40 text-[var(--text)] transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* أزرار الحفظ والمشاركة والطباعة */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePrint}
          title="طباعة نسخة نظيفة"
          className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)] transition-colors text-xs flex items-center gap-1"
        >
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">طباعة</span>
        </button>

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
    </div>
  );
}
