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
          if (Array.isArray(items)) {
            setCount(items.length);
          }
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
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-[var(--gold)]/70 text-xs text-white/90 transition-all cursor-pointer shadow-xs select-none shrink-0"
      title="المواد المحفوظة للقراءة لاحقاً"
    >
      <Bookmark className="w-3.5 h-3.5 text-[var(--gold)]" />
      <span className="hidden xl:inline text-[11px] font-bold">المحفوظات</span>
      {count > 0 && (
        <span className="w-4 h-4 rounded-full bg-[var(--gold)] text-black text-[9px] font-black flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}

