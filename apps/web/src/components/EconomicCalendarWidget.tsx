"use client";

import { useState, useEffect } from "react";
import { Globe2, Clock, TrendingUp, Coins } from "lucide-react";
import type { InstrumentQuote } from "@awt/shared";

interface MarketExchangeSession {
  id: string;
  nameAr: string;
  city: string;
  timezone: string;
  openHour: number;
  openMin: number;
  closeHour: number;
  closeMin: number;
  closedDays: number[]; // 0=Sun..6=Sat
}

const GLOBAL_EXCHANGES: MarketExchangeSession[] = [
  {
    id: "pex",
    nameAr: "بورصة فلسطين (PEX)",
    city: "نابلس / القدس",
    timezone: "Asia/Jerusalem",
    openHour: 10,
    openMin: 0,
    closeHour: 13,
    closeMin: 0,
    closedDays: [5, 6], // Fri-Sat
  },
  {
    id: "lse",
    nameAr: "بورصة لندن والمعادن (LSE)",
    city: "لندن",
    timezone: "Europe/London",
    openHour: 8,
    openMin: 0,
    closeHour: 16,
    closeMin: 30,
    closedDays: [0, 6],
  },
  {
    id: "nyse",
    nameAr: "بورصة نيويورك ووول ستريت",
    city: "نيويورك",
    timezone: "America/New_York",
    openHour: 9,
    openMin: 30,
    closeHour: 16,
    closeMin: 0,
    closedDays: [0, 6],
  },
  {
    id: "tadawul",
    nameAr: "تداول السعودية",
    city: "الرياض",
    timezone: "Asia/Riyadh",
    openHour: 10,
    openMin: 0,
    closeHour: 15,
    closeMin: 0,
    closedDays: [5, 6],
  },
];

function computeSessionState(ex: MarketExchangeSession, now: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: ex.timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);
  const weekdayStr = parts.find((p) => p.type === "weekday")?.value || "Mon";
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const dayNum = dayMap[weekdayStr] ?? 1;
  const h = Number(parts.find((p) => p.type === "hour")?.value || 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value || 0);
  const localClock = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;

  const curTotal = h * 60 + m;
  const openTotal = ex.openHour * 60 + ex.openMin;
  const closeTotal = ex.closeHour * 60 + ex.closeMin;
  const isOpen = !ex.closedDays.includes(dayNum) && curTotal >= openTotal && curTotal < closeTotal;

  return { isOpen, localClock };
}

export function EconomicCalendarWidget() {
  const [now, setNow] = useState<Date | null>(null);
  const [benchmarks, setBenchmarks] = useState<InstrumentQuote[]>([]);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60000);
    fetch("/api/v1/quotes")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.quotes)) {
          setBenchmarks(
            data.quotes.filter((q: InstrumentQuote) =>
              ["SP500", "NASDAQ", "XAUUSD", "BRENT"].includes(q.symbol)
            )
          );
        }
      })
      .catch(() => {});
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-md space-y-5">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
            <Globe2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-black text-sm text-[var(--text)]">حالة البورصات والمؤشرات العالمية الآن</h3>
            <span className="text-[10px] text-[var(--text-muted)]">محسوبة لحظياً حسب التوقيت المحلي لكل سوق</span>
          </div>
        </div>
      </div>

      {/* حالة البورصات الحية */}
      <div className="space-y-2.5">
        {GLOBAL_EXCHANGES.map((ex) => {
          const state = now ? computeSessionState(ex, now) : { isOpen: false, localClock: "--:--" };
          return (
            <div
              key={ex.id}
              className="flex items-center justify-between p-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] text-xs"
            >
              <div>
                <span className="font-black text-[var(--text)] block">{ex.nameAr}</span>
                <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>التوقيت المحلي في {ex.city}: {state.localClock}</span>
                </span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                  state.isOpen
                    ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                    : "bg-stone-500/10 text-[var(--text-muted)] border border-[var(--border)]"
                }`}
              >
                {state.isOpen ? "مفتوحة للتداول" : "خارج أوقات التداول"}
              </span>
            </div>
          );
        })}
      </div>

      {/* لمحة سريعة عن السلع والمؤشرات */}
      {benchmarks.length > 0 && (
        <div className="pt-2 border-t border-[var(--border)] space-y-2">
          <span className="text-[11px] font-black text-[var(--primary)] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>أسعار الإغلاق والتداول اللحظي</span>
          </span>
          <div className="grid grid-cols-2 gap-2">
            {benchmarks.map((b) => (
              <div key={b.symbol} className="p-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
                <span className="text-[10px] text-[var(--text-muted)] block truncate">{b.nameAr}</span>
                <div className="flex items-center justify-between mt-1 font-mono">
                  <strong className="text-xs font-black text-[var(--text)]">
                    {b.price ? Number(b.price).toLocaleString("en-US") : "—"}
                  </strong>
                  {b.changePct && (
                    <span
                      className={`text-[10px] font-bold ${
                        b.changePct.startsWith("+") ? "text-emerald-500" : "text-rose-500"
                      }`}
                    >
                      {b.changePct}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
