"use client";

import { useState, useEffect } from "react";
import { History, ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";
import type { OnThisDayEvent } from "@/lib/live-data/history-events";

export function HistoryTodayWidget() {
  const [dateLabel, setDateLabel] = useState("");
  const [events, setEvents] = useState<OnThisDayEvent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/api/v1/history")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.dateLabelAr) setDateLabel(data.dateLabelAr);
        if (Array.isArray(data?.events)) setEvents(data.events);
      })
      .catch(() => {});
  }, []);

  if (events.length === 0) return null;

  const currentEvent = events[currentIndex] || events[0]!;

  return (
    <section className="card-luxury relative rounded-3xl p-6 md:p-8 overflow-hidden shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-700 to-amber-500 text-white flex items-center justify-center shadow-md">
            <History className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black text-[var(--text)]">
                في مثل هذا اليوم {dateLabel ? `(${dateLabel})` : ""}
              </h2>
              <span className="text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 px-2.5 py-0.5 rounded-full">
                بث حي من أرشيف ويكيبيديا
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[var(--text-muted)]">
            {currentIndex + 1} / {events.length}
          </span>
          <div className="flex items-center gap-1 bg-[var(--surface)] p-1 rounded-xl border border-[var(--border)]">
            <button
              type="button"
              onClick={() => setCurrentIndex((p) => (p - 1 + events.length) % events.length)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text)] hover:bg-[var(--bg)] cursor-pointer"
              aria-label="الحدث السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentIndex((p) => (p + 1) % events.length)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text)] hover:bg-[var(--bg)] cursor-pointer"
              aria-label="الحدث التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-mono text-sm font-black">
            عام {currentEvent.year}
          </span>
          {currentEvent.wikiUrl && (
            <a
              href={currentEvent.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
            >
              <span>المصدر الموسوعي</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
        <h3 className="text-lg font-black text-[var(--text)]">{currentEvent.title}</h3>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
          {currentEvent.description}
        </p>
      </div>
    </section>
  );
}
