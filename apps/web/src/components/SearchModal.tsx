"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Flame, Newspaper, ArrowLeft, Loader2 } from "lucide-react";

interface SearchHit {
  id: string;
  slug: string;
  titleAr: string;
  summaryAr?: string;
  sectionNameAr?: string;
  sectionSlug?: string;
  sourceNameAr?: string;
  publishedAt?: string;
}

export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // الاستماع لاختصار لوحة المفاتيح Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // الاستماع لحدث فتح البحث من عناصر الواجهة
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("awt:open-search", handleOpenEvent);
    return () => window.removeEventListener("awt:open-search", handleOpenEvent);
  }, []);

  // التركيز التلقائي على حقل البحث عند الفتح
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // البحث المباشر مع تأخير ذكي (Debounce 250ms)
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/v1/search?q=${encodeURIComponent(query.trim())}&limit=8`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
          setSelectedIndex(0);
        }
      } catch {
        // تجاهل أخطاء الشبكة المؤقتة
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  // التنقل بالأسهم واختيار النتيجة بزر Enter
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        const target = results[selectedIndex];
        setIsOpen(false);
        router.push(`/article/${target.id}/${target.slug}`);
      } else if (query.trim()) {
        setIsOpen(false);
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const handleSelectArticle = (hit: SearchHit) => {
    setIsOpen(false);
    router.push(`/article/${hit.id}/${hit.slug}`);
  };

  const setSuggestedTopic = (topic: string) => {
    setQuery(topic);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-start justify-center pt-16 md:pt-24 p-4 animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* شريط الإدخال */}
        <div className="p-4 border-b border-[var(--border)] flex items-center gap-3 bg-[var(--bg)]">
          <Search className="w-5 h-5 text-[var(--primary)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyNavigation}
            placeholder="ابحث فوراً في جميع الأخبار والمصادر الموثقة..."
            className="w-full bg-transparent text-sm md:text-base font-bold text-[var(--text)] focus:outline-none placeholder:text-[var(--text-muted)]"
          />
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-[var(--primary)] shrink-0" />
          ) : query ? (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="text-[10px] text-[var(--text-muted)] bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--border)]">
              ESC
            </kbd>
          )}
        </div>

        {/* الكلمات المفتاحية المقترحة السريعة */}
        {!query && (
          <div className="p-4 border-b border-[var(--border)]/50 bg-[var(--surface)]/50">
            <span className="text-[11px] font-bold text-[var(--text-muted)] block mb-2">
              موضوعات رائجة الآن:
            </span>
            <div className="flex flex-wrap gap-2">
              {["غزة", "القدس", "أسعار الذهب", "سعر الدولار", "الضفة الغربية", "النفط"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSuggestedTopic(tag)}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--bg)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors flex items-center gap-1 text-[var(--text)]"
                >
                  <Flame className="w-3 h-3 text-[var(--primary)]" />
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* نتائج البحث */}
        <div className="overflow-y-auto p-2 divide-y divide-[var(--border)]/40 flex-1">
          {results.length > 0 ? (
            results.map((hit, idx) => (
              <div
                key={hit.id}
                onClick={() => handleSelectArticle(hit)}
                className={`p-3 rounded-xl cursor-pointer transition-colors flex items-start justify-between gap-4 ${
                  selectedIndex === idx
                    ? "bg-[var(--primary)]/10 text-[var(--text)] border-r-4 border-[var(--primary)]"
                    : "hover:bg-[var(--surface-hover)]"
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
                    {hit.sectionNameAr && (
                      <span className="text-[var(--primary)] font-bold">{hit.sectionNameAr}</span>
                    )}
                    {hit.sourceNameAr && (
                      <>
                        <span>•</span>
                        <span>{hit.sourceNameAr}</span>
                      </>
                    )}
                  </div>
                  <h4 className="text-xs md:text-sm font-bold leading-snug line-clamp-2">
                    {hit.titleAr}
                  </h4>
                  {hit.summaryAr && (
                    <p className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                      {hit.summaryAr}
                    </p>
                  )}
                </div>
                <ArrowLeft className="w-4 h-4 text-[var(--text-muted)] shrink-0 mt-2 self-center" />
              </div>
            ))
          ) : query && !isLoading ? (
            <div className="p-8 text-center text-xs text-[var(--text-muted)]">
              <Newspaper className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="font-bold">لم نجد نتائج مطابقة لـ &quot;{query}&quot;</p>
              <p className="mt-1">جرب كلمات بحث أخرى أو تصفح الأقسام الرئيسية.</p>
            </div>
          ) : null}
        </div>

        {/* شريط الإرشادات السفلي */}
        <div className="p-3 bg-[var(--bg)] border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="bg-[var(--surface)] px-1 py-0.5 rounded border border-[var(--border)]">↑</kbd>{" "}
              <kbd className="bg-[var(--surface)] px-1 py-0.5 rounded border border-[var(--border)]">↓</kbd> للتنقل
            </span>
            <span>
              <kbd className="bg-[var(--surface)] px-1.5 py-0.5 rounded border border-[var(--border)]">Enter</kbd> للفتح
            </span>
          </div>
          {query.trim() && (
            <button
              onClick={() => {
                setIsOpen(false);
                router.push(`/search?q=${encodeURIComponent(query.trim())}`);
              }}
              className="text-[var(--primary)] font-bold hover:underline"
            >
              عرض صفحة النتائج الكاملة ←
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

