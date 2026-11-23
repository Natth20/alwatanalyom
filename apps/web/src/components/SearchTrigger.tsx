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
      className={`rounded-full border border-white/20 hover:border-[var(--gold)]/80 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white flex items-center justify-between transition-all duration-200 cursor-pointer shadow-inner group backdrop-blur-md select-none shrink-0 ${
        compact
          ? "p-2 w-9 h-9 justify-center"
          : expanded
          ? "px-4 py-2 w-full max-w-md lg:max-w-lg xl:max-w-xl"
          : "px-3 py-1.5 w-36 lg:w-44 xl:w-52"
      } ${className}`}
      aria-label="ابحث في الأخبار والتحقيقات"
      title="البحث السريع في الأرشيف الموثق (Ctrl + K)"
    >
      <div className="flex items-center gap-2.5 overflow-hidden">
        <Search className="w-4 h-4 text-[var(--gold)] group-hover:scale-110 transition-transform shrink-0" />
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
