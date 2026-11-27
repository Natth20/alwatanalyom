"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Radio, Clock } from "lucide-react";

interface WireTopic {
  id: string;
  slug: string;
  titleAr: string;
  sectionNameAr: string;
  sourceNameAr: string;
  publishedAt: string;
  isBreaking: boolean;
}

export function GlobalWireTicker() {
  const [wires, setWires] = useState<WireTopic[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/v1/pulse")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.latestTopics)) {
          setWires(data.latestTopics);
        }
      })
      .catch(() => {});
  }, []);

  if (wires.length === 0) return null;

  const sources = Array.from(new Set(wires.map((w) => w.sourceNameAr))).slice(0, 5);
  const filtered =
    activeFilter === "all"
      ? wires
      : wires.filter((w) => w.sourceNameAr === activeFilter);

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
          <h3 className="font-black text-sm text-[var(--text)] flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-rose-600" />
            <span>برقيات الوكالات المباشرة من قاعدة البيانات</span>
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveFilter("all")}
            className={`px-2.5 py-1 rounded-lg cursor-pointer ${
              activeFilter === "all" ? "bg-[var(--primary)] text-white" : "bg-[var(--bg)] text-[var(--text-muted)]"
            }`}
          >
            الكل
          </button>
          {sources.map((src) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveFilter(src)}
              className={`px-2.5 py-1 rounded-lg cursor-pointer whitespace-nowrap ${
                activeFilter === src ? "bg-[var(--primary)] text-white" : "bg-[var(--bg)] text-[var(--text-muted)]"
              }`}
            >
              {src}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-[var(--border)]">
        {filtered.map((w) => (
          <div key={w.id} className="py-3 flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 text-[10px]">
                <span className="font-black px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[var(--primary)]">
                  {w.sourceNameAr}
                </span>
                <span className="text-[var(--text-muted)]">{w.sectionNameAr}</span>
              </div>
              <Link
                href={`/article/${w.id}/${w.slug}`}
                className="block text-xs sm:text-sm font-bold text-[var(--text)] hover:text-[var(--primary)] leading-snug"
              >
                {w.titleAr}
              </Link>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] font-mono shrink-0 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(w.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
