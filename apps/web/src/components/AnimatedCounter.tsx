"use client";

import { useEffect, useState } from "react";

interface Props {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  duration = 1000,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}: Props) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // احترام تفضيل تقليل الحركة الصارم للمستخدم
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setCount(target);
        return;
      }
    }

    let startTimestamp: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing curve (easeOutCubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (target - startValue) * easeOut;

      setCount(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [target, duration]);

  const formatted =
    decimals > 0
      ? count.toFixed(decimals)
      : Math.round(count).toLocaleString("en-US");

  return (
    <span className={`font-mono font-bold ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

