"use client";

import { useEffect, useState, useCallback } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type ThemeMode = "system" | "dark" | "light";

function resolveAndApplyTheme(mode: ThemeMode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const isDark = mode === "dark" || (mode === "system" && prefersDark);

  if (isDark) {
    root.classList.add("dark");
    root.classList.remove("light");
    root.setAttribute("data-theme", "dark");
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
    root.setAttribute("data-theme", "light");
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [mounted, setMounted] = useState(false);

  const applyMode = useCallback((nextMode: ThemeMode) => {
    setTheme(nextMode);
    try {
      localStorage.setItem("awt_theme", nextMode);
    } catch {
      // ignore storage errors
    }
    resolveAndApplyTheme(nextMode);
  }, []);

  useEffect(() => {
    setMounted(true);
    let saved: ThemeMode = "system";
    try {
      const raw = localStorage.getItem("awt_theme");
      if (raw === "dark" || raw === "light" || raw === "system") {
        saved = raw;
      }
    } catch {
      // ignore
    }
    setTheme(saved);
    resolveAndApplyTheme(saved);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleOsChange = () => {
      try {
        const current = (localStorage.getItem("awt_theme") as ThemeMode | null) || "system";
        if (current === "system") {
          resolveAndApplyTheme("system");
        }
      } catch {
        resolveAndApplyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleOsChange);
    return () => mediaQuery.removeEventListener("change", handleOsChange);
  }, []);

  const cycleTheme = () => {
    const next: ThemeMode =
      theme === "system" ? "dark" : theme === "dark" ? "light" : "system";
    applyMode(next);
  };

  if (!mounted) {
    return (
      <div className="h-8 px-2.5 rounded-full border border-white/15 bg-white/[0.05] text-white/70 flex items-center gap-1.5 text-[11px] font-bold">
        <Monitor className="w-3.5 h-3.5" />
        <span className="hidden xl:inline">تلقائي</span>
      </div>
    );
  }

  const label =
    theme === "dark" ? "داكن" : theme === "light" ? "نهاري" : "تلقائي";
  const nextTitle =
    theme === "dark"
      ? "الوضع الداكن مفعل — انقر للتبديل إلى الوضع النهاري"
      : theme === "light"
      ? "الوضع النهاري مفعل — انقر للتبديل إلى الوضع التلقائي (حسب الجهاز)"
      : "الوضع التلقائي (حسب نظام الجهاز) — انقر للتبديل إلى الوضع الداكن";

  return (
    <button
      type="button"
      onClick={cycleTheme}
      title={nextTitle}
      aria-label={nextTitle}
      className={`h-8 px-2.5 sm:px-3 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer select-none shrink-0 text-[11px] font-bold shadow-xs ${
        theme === "dark"
          ? "border-sky-400/35 bg-sky-500/15 text-sky-200 hover:border-sky-400/60"
          : theme === "light"
          ? "border-amber-400/45 bg-amber-500/20 text-amber-200 hover:border-amber-400/75"
          : "border-white/20 bg-white/[0.06] text-stone-200 hover:border-[var(--gold)]/50 hover:text-[var(--gold)]"
      }`}
    >
      {theme === "dark" ? (
        <Moon className="w-3.5 h-3.5 text-sky-300" />
      ) : theme === "light" ? (
        <Sun className="w-3.5 h-3.5 text-amber-300" />
      ) : (
        <Monitor className="w-3.5 h-3.5 text-[var(--gold)]" />
      )}
      <span className="hidden xl:inline">{label}</span>
    </button>
  );
}
