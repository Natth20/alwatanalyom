"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Scale, ExternalLink, ShieldCheck } from "lucide-react";

interface ClusterSummary {
  id: string;
  headlineAr: string;
  lastUpdatedAt: string;
  sources: { nameAr: string }[];
  articles: { id: string; slug: string; titleAr: string; source?: { nameAr: string } | null }[];
}

export function PerspectiveMatrix() {
  const [topics, setTopics] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/v1/pulse")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.latestTopics)) {
          setTopics(data.latestTopics.slice(0, 6));
        }
      })
      .catch(() => {});
  }, []);

  if (topics.length === 0) return null;

  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-md space-y-5">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-2.5">
          <Scale className="w-5 h-5 text-indigo-500" />
          <div>
            <h3 className="font-black text-lg text-[var(--text)]">
              مصفوفة مقارنة التغطيات والوكالات الميدانية
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              عينة حية من آخر العناوين الصادرة عن المصادر المعتمدة حالياً
            </p>
          </div>
        </div>

        <Link href="/stories" className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1">
          <span>تصفح القصص المجمعة</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {topics.map((t) => (
          <Link
            key={t.id}
            href={`/article/${t.id}/${t.slug}`}
            className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-indigo-500/40 transition-all space-y-2"
          >
            <div className="flex items-center justify-between text-[10px]">
              <span className="font-black text-indigo-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                <span>{t.sourceNameAr}</span>
              </span>
              <span className="text-[var(--text-muted)]">{t.sectionNameAr}</span>
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-[var(--text)] line-clamp-2 leading-snug">
              {t.titleAr}
            </h4>
          </Link>
        ))}
      </div>
    </section>
  );
}
