"use client";

import { Search, Command } from "lucide-react";

interface SearchTriggerProps {
  compact?: boolean;
  className?: string;
}

export function SearchTrigger({ compact = false, className = "" }: SearchTriggerProps) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("awt:open-search"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-full border border-white/15 hover:border-[var(--gold)]/70 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-between transition-all duration-200 cursor-pointer shadow-xs group backdrop-blur-md select-none shrink-0 ${
        compact
          ? "p-2 w-9 h-9 justify-center"
          : "px-3 py-1.5 w-36 lg:w-44 xl:w-52"
      } ${className}`}
      aria-label="ابحث في الأخبار والتحقيقات"
      title="البحث السريع في الأرشيف الموثق (Ctrl + K)"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Search className="w-3.5 h-3.5 text-[var(--gold)] group-hover:scale-110 transition-transform shrink-0" />
        {!compact && (
          <span className="font-medium text-[11px] truncate text-stone-300 group-hover:text-white">
            بحث موثق...
          </span>
        )}
      </div>
      {!compact && (
        <kbd className="hidden xl:inline-flex items-center gap-0.5 text-[9px] bg-black/40 text-stone-300 px-1.5 py-0.5 rounded border border-white/10 font-mono">
          <Command className="w-2.5 h-2.5" /> K
        </kbd>
      )}
    </button>
  );
}
