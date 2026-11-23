"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"system" | "dark" | "light">("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("awt_theme") as "system" | "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (target: "system" | "dark" | "light") => {
    const root = document.documentElement;
    if (target === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");
    } else if (target === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
      root.setAttribute("data-theme", "light");
    } else {
      root.classList.remove("dark");
      root.classList.remove("light");
      root.removeAttribute("data-theme");
    }
  };

  const cycleTheme = () => {
    let next: "system" | "dark" | "light";
    if (theme === "system") next = "dark";
    else if (theme === "dark") next = "light";
    else next = "system";

    setTheme(next);
    localStorage.setItem("awt_theme", next);
    applyTheme(next);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="تغيير المظهر"
        className="w-8 h-8 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] flex items-center justify-center text-xs"
      >
        <Sun className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      title={
        theme === "dark"
          ? "المظهر: داكن (انقر للتبديل إلى فاتح)"
          : theme === "light"
          ? "المظهر: فاتح (انقر للتبديل إلى تلقائي)"
          : "المظهر: تلقائي حسب النظام (انقر للتبديل إلى داكن)"
      }
      className="px-2 py-0.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white hover:border-[var(--gold)] transition-colors flex items-center gap-1 text-[10px] cursor-pointer select-none whitespace-nowrap"
    >
      {theme === "dark" ? (
        <Moon className="w-3 h-3 text-sky-300" />
      ) : theme === "light" ? (
        <Sun className="w-3 h-3 text-amber-400" />
      ) : (
        <Laptop className="w-3 h-3 text-white/60" />
      )}
      <span className="hidden sm:inline font-sans text-[10px] font-bold">
        {theme === "dark" ? "داكن" : theme === "light" ? "فاتح" : "تلقائي"}
      </span>
    </button>
  );
}

