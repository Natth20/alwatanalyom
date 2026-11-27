"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, X, ChevronLeft, Clock } from "lucide-react";

interface BreakingAlert {
  id: string;
  slug: string;
  titleAr: string;
  publishedAt: string;
}

export function FloatingBreakingHUD() {
  const pathname = usePathname();
  const [alertItem, setAlertItem] = useState<BreakingAlert | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    const loadLatest = async () => {
      try {
        const res = await fetch("/api/v1/breaking");
        if (!res.ok) return;
        const data = await res.json();
        const first = Array.isArray(data?.items) ? data.items[0] : null;
        if (first?.id && first?.titleAr) {
          setAlertItem({
            id: first.id,
            slug: first.slug,
            titleAr: first.titleAr,
            publishedAt: first.publishedAt,
          });
        }
      } catch {}
    };

    loadLatest();
    const timer = setInterval(loadLatest, 45000);
    return () => clearInterval(timer);
  }, [pathname]);

  if (pathname?.startsWith("/admin") || dismissed || !alertItem) {
    return null;
  }

  const timeFormatted = new Date(alertItem.publishedAt).toLocaleTimeString("ar-EG", {
    timeZone: "Asia/Jerusalem",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="hidden md:flex fixed bottom-5 start-5 z-40 max-w-sm glass-hud rounded-2xl p-3.5 border border-red-500/40 shadow-2xl bg-[#1C0108]/95 text-white items-start gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md">
        <Flame className="w-4 h-4 animate-pulse" />
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-center justify-between gap-2 text-[10px]">
          <span className="font-black text-red-400">عاجل · بث مباشر</span>
          <span className="text-white/60 flex items-center gap-1 font-mono">
            <Clock className="w-2.5 h-2.5" />
            {timeFormatted}
          </span>
        </div>
        <Link
          href={`/article/${alertItem.id}/${alertItem.slug}`}
          className="block text-xs font-bold text-white hover:text-[var(--gold)] transition-colors line-clamp-2 leading-snug"
        >
          {alertItem.titleAr}
        </Link>
        <Link
          href={`/article/${alertItem.id}/${alertItem.slug}`}
          className="inline-flex items-center gap-1 text-[10px] font-bold text-[var(--gold)] hover:underline"
        >
          <span>قراءة التفاصيل</span>
          <ChevronLeft className="w-3 h-3" />
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="text-white/40 hover:text-white p-1 cursor-pointer shrink-0"
        aria-label="إغلاق التنبيه العاجل"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
