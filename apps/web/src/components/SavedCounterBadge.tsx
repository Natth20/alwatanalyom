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
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
      title="المواد المحفوظة للقراءة لاحقاً"
    >
      <Bookmark className="w-3.5 h-3.5 text-[var(--primary)]" />
      <span className="hidden md:inline font-medium">المحفوظات</span>
      {count > 0 && (
        <span className="w-4 h-4 rounded-full bg-[var(--primary)] text-white text-[10px] font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
