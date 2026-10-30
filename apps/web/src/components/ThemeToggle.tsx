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
      className="p-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--primary)] transition-colors flex items-center gap-1 text-xs cursor-pointer select-none"
    >
      {theme === "dark" ? (
        <Moon className="w-3.5 h-3.5 text-sky-400" />
      ) : theme === "light" ? (
        <Sun className="w-3.5 h-3.5 text-amber-500" />
      ) : (
        <Laptop className="w-3.5 h-3.5 text-[var(--text-muted)]" />
      )}
      <span className="hidden sm:inline font-mono text-[10px]">
        {theme === "dark" ? "داكن" : theme === "light" ? "فاتح" : "تلقائي"}
      </span>
    </button>
  );
}
