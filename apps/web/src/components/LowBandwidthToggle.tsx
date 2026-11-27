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
      className={`text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer select-none whitespace-nowrap ${
        isLowBandwidth
          ? "px-2 py-0.5 rounded-full bg-amber-400 text-black"
          : "text-white/65 hover:text-[var(--gold)]"
      }`}
      title={
        isLowBandwidth
          ? "وضع الطوارئ وتوفير البيانات مفعّل"
          : "وضع توفير البيانات للإنترنت الضعيف"
      }
    >
      {isLowBandwidth ? (
        <>
          <Zap className="w-3 h-3 fill-current" />
          <span>توفير البيانات: نشط</span>
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3 text-amber-400/80" />
          <span className="hidden sm:inline">توفير البيانات</span>
        </>
      )}
    </button>
  );
}

