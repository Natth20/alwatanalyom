"use client";

import { Search } from "lucide-react";

export function SearchTrigger() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("awt:open-search"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--text)] flex items-center gap-2 bg-[var(--surface)] transition-colors cursor-pointer select-none"
    >
      <Search className="w-3.5 h-3.5 text-[var(--primary)]" />
      <span>بحث فوري في الأخبار...</span>
      <kbd className="text-[10px] bg-[var(--bg)] px-1.5 py-0.5 rounded border border-[var(--border)] font-mono">
        Ctrl+K
      </kbd>
    </button>
  );
}

