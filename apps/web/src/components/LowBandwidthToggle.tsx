"use client";

import { useState, useEffect } from "react";
import { Zap, WifiOff } from "lucide-react";

export function LowBandwidthToggle() {
  const [isLowBandwidth, setIsLowBandwidth] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("awt_low_bandwidth");
      if (saved === "true") {
        setIsLowBandwidth(true);
        document.documentElement.classList.add("low-bandwidth-mode");
      }
    } catch {}
  }, []);

  const toggleMode = () => {
    const next = !isLowBandwidth;
    setIsLowBandwidth(next);
    try {
      localStorage.setItem("awt_low_bandwidth", next ? "true" : "false");
      if (next) {
        document.documentElement.classList.add("low-bandwidth-mode");
      } else {
        document.documentElement.classList.remove("low-bandwidth-mode");
      }
      window.dispatchEvent(new CustomEvent("awt:low-bandwidth-changed", { detail: next }));
    } catch {}
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggleMode}
      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer border select-none ${
        isLowBandwidth
          ? "bg-amber-500 text-slate-950 border-amber-400 shadow-xs animate-pulse"
          : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400"
      }`}
      title={
        isLowBandwidth
          ? "وضع الطوارئ وتوفير البيانات مفعّل (إيقاف الصور والفيديوهات الثقيلة)"
          : "تفعيل وضع الطوارئ لغزة والميدان (توفير 95% من استهلاك الإنترنت الضعيف)"
      }
    >
      {isLowBandwidth ? (
        <>
          <Zap className="w-3 h-3 fill-current" />
          <span>وضع الطوارئ (مفعّل)</span>
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3 text-amber-500" />
          <span className="hidden sm:inline">نت ضعيف</span>
        </>
      )}
    </button>
  );
}

