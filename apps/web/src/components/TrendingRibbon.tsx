"use client";

import Link from "next/link";
import { Flame, Sparkles } from "lucide-react";

const TRENDING_TOPICS = [
  { tag: "غزة الصامدة", href: "/palestine/gaza", isHot: true },
  { tag: "القدس المحتلة", href: "/palestine/jerusalem", isHot: true },
  { tag: "الضفة الغربية", href: "/palestine/west-bank", isHot: false },
  { tag: "أسعار الذهب والدولار", href: "/economy", isHot: true },
  { tag: "قمة عربية طارئة", href: "/arab-world", isHot: false },
  { tag: "محكمة العدل الدولية", href: "/world", isHot: false },
  { tag: "دوري أبطال أوروبا", href: "/sports", isHot: false },
  { tag: "الذكاء الاصطناعي", href: "/tech", isHot: false },
];

export function TrendingRibbon() {
  return (
    <div className="border-b border-[var(--border)] bg-gradient-to-r from-[var(--surface)] via-[var(--surface-elevated)] to-[var(--surface)] py-2">
      <div className="container-custom flex items-center gap-3 overflow-hidden text-xs">
        <div className="flex items-center gap-1.5 text-rose-500 font-black shrink-0 bg-rose-500/10 dark:bg-rose-950/40 px-3 py-1 rounded-full border border-rose-500/30 shadow-xs">
          <Flame className="w-3.5 h-3.5 fill-current animate-pulse text-rose-500" />
          <span className="tracking-wide">المتصدر الآن:</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
          {TRENDING_TOPICS.map((topic, idx) => (
            <Link
              key={topic.tag}
              href={topic.href}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                topic.isHot
                  ? "bg-[var(--surface)] text-[var(--text)] border-rose-500/40 hover:border-rose-500 hover:text-rose-500 hover:shadow-sm"
                  : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--text)]"
              }`}
            >
              <span className="text-[10px] font-mono text-[var(--primary)] bg-[var(--primary)]/10 rounded-full w-4 h-4 flex items-center justify-center font-black">
                {idx + 1}
              </span>
              {topic.isHot && <Sparkles className="w-3 h-3 text-amber-500" />}
              <span>#{topic.tag}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

