"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, Sparkles } from "lucide-react";

interface KeywordEntry {
  keyword: string;
  count: number;
}

export function TrendingRibbon() {
  const [keywords, setKeywords] = useState<KeywordEntry[]>([]);

  useEffect(() => {
    fetch("/api/v1/pulse")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.topKeywords)) {
          setKeywords(data.topKeywords.slice(0, 10));
        }
      })
      .catch(() => {});
  }, []);

  if (keywords.length === 0) return null;

  return (
    <div className="border-b border-[var(--border)] bg-gradient-to-r from-[var(--surface)] via-[var(--surface-elevated)] to-[var(--surface)] py-2">
      <div className="container-custom flex items-center gap-3 overflow-hidden text-xs">
        <div className="flex items-center gap-1.5 text-rose-500 font-black shrink-0 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/30">
          <Flame className="w-3.5 h-3.5 fill-current animate-pulse text-rose-500" />
          <span>الأكثر تداولاً بالبيانات:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar py-0.5">
          {keywords.map((kw, idx) => (
            <Link
              key={kw.keyword}
              href={`/search?q=${encodeURIComponent(kw.keyword)}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--primary)] transition-all"
            >
              <span className="text-[10px] font-mono text-[var(--primary)] bg-[var(--primary)]/10 rounded-full w-4 h-4 flex items-center justify-center font-black">
                {idx + 1}
              </span>
              {idx < 3 && <Sparkles className="w-3 h-3 text-amber-500" />}
              <span>#{kw.keyword}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
