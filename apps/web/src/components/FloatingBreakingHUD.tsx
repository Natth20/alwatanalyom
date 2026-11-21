"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, X, ArrowLeft, Radio } from "lucide-react";

interface BreakingToastProps {
  initialTitle?: string;
  initialSlug?: string;
  initialId?: string;
}

export function FloatingBreakingHUD({
  initialTitle = "عاجل: صفارات الإنذار تدوي في الجليل الأعلى بعد رصد صواريخ ومسيرات",
  initialSlug = "breaking-alert-live",
  initialId = "art-hero-1",
}: BreakingToastProps) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    // إظهار الإشعار بعد 3 ثوانٍ من دخول الصفحة للترحيب البصري الذكي
    const timer = setTimeout(() => {
      const isDismissed = sessionStorage.getItem("awt_breaking_dismissed");
      if (!isDismissed) {
        setVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    try {
      sessionStorage.setItem("awt_breaking_dismissed", "true");
    } catch {}
  };

  if (pathname?.startsWith("/admin") || !visible || dismissed) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 start-4 sm:start-6 z-50 max-w-sm sm:max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-400 no-print">
      <div className="glass-hud rounded-3xl p-4 border-2 border-red-500/40 text-white shadow-2xl relative overflow-hidden group">
        {/* شريط وميض علوي */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        <div className="flex items-start gap-3">
          {/* أيقونة النبض العاجل */}
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center shrink-0 shadow-lg shadow-red-900/50 animate-pulse border border-red-400/40">
            <Flame className="w-5 h-5 fill-current" />
          </div>

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/30 border border-red-500/40 text-red-300 text-[10px] font-black uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                تنبيه ميداني عاجل
              </span>

              <button
                onClick={handleDismiss}
                className="text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="إغلاق التنبيه"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-relaxed">
              {initialTitle}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <Link
                href={`/article/${initialId}/${initialSlug}`}
                onClick={handleDismiss}
                className="inline-flex items-center gap-1 text-[11px] font-black text-[var(--gold)] hover:underline"
              >
                <span>متابعة تفاصيل الحدث</span>
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
              </Link>

              <span className="text-white/20">•</span>

              <Link
                href="/live"
                onClick={handleDismiss}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:underline"
              >
                <Radio className="w-3 h-3 animate-pulse" />
                <span>البث الحي 24/7</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
