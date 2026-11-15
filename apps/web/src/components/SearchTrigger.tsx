"use client";

import { Search, Command } from "lucide-react";

export function SearchTrigger() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("awt:open-search"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full px-4 py-2 rounded-xl border border-[var(--border)] text-xs text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--text)] flex items-center justify-between bg-[var(--surface)] transition-all cursor-pointer shadow-xs group"
      aria-label="ابحث في الأخبار والتحقيقات"
    >
      <div className="flex items-center gap-2">
        <Search className="w-3.5 h-3.5 text-[var(--gold)] group-hover:scale-110 transition-transform" />
        <span className="font-medium">ابحث في الأخبار والأرشيف الموثق...</span>
      </div>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] bg-[var(--bg)] text-[var(--text-muted)] px-2 py-0.5 rounded-md border border-[var(--border)] font-mono">
        <Command className="w-2.5 h-2.5" /> K
      </kbd>
    </button>
  );
}
