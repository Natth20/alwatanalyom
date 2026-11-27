"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark } from "lucide-react";

export function SavedCounterBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      try {
        const data = localStorage.getItem("awt_saved_articles");
        if (data) {
          const items = JSON.parse(data);
          setCount(Array.isArray(items) ? items.length : 0);
        } else {
          setCount(0);
        }
      } catch {}
    };

    updateCount();
    window.addEventListener("storage", updateCount);
    return () => window.removeEventListener("storage", updateCount);
  }, []);

  return (
    <Link
      href="/saved"
      className="relative w-8 h-8 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/15 hover:border-[var(--gold)]/50 text-white/85 hover:text-[var(--gold)] flex items-center justify-center transition-all shrink-0"
      title="المواد المحفوظة للقراءة لاحقاً"
      aria-label="المواد المحفوظة"
    >
      <Bookmark className="w-3.5 h-3.5" />
      {count > 0 && (
        <span className="absolute -top-1 -end-1 min-w-[15px] h-[15px] px-1 rounded-full bg-[var(--gold)] text-[#140106] text-[9px] font-black flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
