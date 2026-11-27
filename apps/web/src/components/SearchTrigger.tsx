"use client";

import { Search, Command } from "lucide-react";

interface SearchTriggerProps {
  compact?: boolean;
  expanded?: boolean;
  className?: string;
}

export function SearchTrigger({
  compact = false,
  expanded = false,
  className = "",
}: SearchTriggerProps) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("awt:open-search"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-full border border-white/15 hover:border-[var(--gold)]/55 bg-white/[0.05] hover:bg-white/15 text-white/85 hover:text-[var(--gold)] flex items-center transition-all duration-200 cursor-pointer group select-none shrink-0 ${
        compact
          ? "w-8 h-8 justify-center"
          : expanded
          ? "px-4 py-2 w-full justify-between"
          : "px-3 py-1.5 w-40 justify-between"
      } ${className}`}
      aria-label="ابحث في الأخبار والتحقيقات"
      title="البحث السريع في الأرشيف الموثق (Ctrl + K)"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Search className="w-3.5 h-3.5 text-[var(--gold)] group-hover:scale-105 transition-transform shrink-0" />
        {!compact && (
          <span className="font-medium text-xs truncate text-stone-300 group-hover:text-white">
            {expanded
              ? "ابحث في الأخبار والوثائق والأرشيف الموثق..."
              : "بحث موثق..."}
          </span>
        )}
      </div>
      {!compact && (
        <div className="hidden sm:inline-flex items-center gap-1 text-[10px] bg-black/50 text-[var(--gold)] px-2 py-0.5 rounded-full border border-[var(--gold)]/30 font-mono shadow-xs">
          <Command className="w-3 h-3" />
          <span>K</span>
        </div>
      )}
    </button>
  );
}
