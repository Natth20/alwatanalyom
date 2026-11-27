"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ArticleCard } from "@awt/shared";
import { PenTool, ArrowLeft } from "lucide-react";

export function OpinionSection() {
  const [articles, setArticles] = useState<ArticleCard[]>([]);

  useEffect(() => {
    fetch("/api/v1/search?section=opinion&limit=3")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.results)) {
          setArticles(data.results.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center">
            <PenTool className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-black text-[var(--text)]">الرأي والتحليلات الاستراتيجية</h2>
        </div>

        <Link href="/opinion" className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1">
          <span>قسم الرأي والتحليل</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {articles.map((art) => (
          <Link
            key={art.id}
            href={`/article/${art.id}/${art.slug}`}
            className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)]/50 transition-all space-y-2.5"
          >
            <span className="text-[11px] font-bold text-[var(--primary)] block">
              {art.source?.nameAr || "ملف التحليل"}
            </span>
            <h3 className="font-black text-sm text-[var(--text)] line-clamp-3 leading-snug">
              {art.titleAr}
            </h3>
            {art.summaryAr && (
              <p className="text-xs text-[var(--text-muted)] line-clamp-2">{art.summaryAr}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
