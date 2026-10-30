"use client";

import { useEffect, useState } from "react";

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const percentage = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setProgress(percentage);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (progress <= 0) return null;

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="شريط تقدم قراءة المقال"
      className="fixed top-0 start-0 end-0 h-1 z-50 pointer-events-none bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-emerald-500 via-[var(--primary)] to-emerald-400 transition-all duration-150 ease-out shadow-[0_0_8px_rgba(11,93,59,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

