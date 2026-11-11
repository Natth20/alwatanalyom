"use client";

import Link from "next/link";
import { ArticleCard as ArticleCardType } from "@awt/shared";
import { Clock, ShieldCheck, Flame, ArrowLeft, ExternalLink } from "lucide-react";

interface Props {
  article: ArticleCardType;
  variant?: "hero" | "medium" | "compact" | "text-only";
}

export function ArticleCard({ article, variant = "medium" }: Props) {
  const publishedDate = new Date(article.publishedAt).toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const coverUrl = (article as any).coverImageUrl || (article as any).coverMedia?.url || null;

  // 1. نمط المادة البطلة (Hero)
  if (variant === "hero") {
    return (
      <article className="group relative rounded-3xl overflow-hidden border border-[var(--border-card)] bg-[var(--surface-card)] card-luxury p-6 md:p-8 hover-luxury transition-all duration-300">
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold mb-4">
          <span className="bg-[var(--primary-light)] text-[var(--primary)] px-3 py-1 rounded-full text-xs font-black border border-[var(--primary)]/20">
            {article.sectionNameAr}
          </span>

          {article.isBreaking && (
            <span className="bg-rose-600 text-white px-2.5 py-0.5 rounded-full text-[11px] font-black flex items-center gap-1 shadow-xs animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>عاجل</span>
            </span>
          )}

          {article.source && (
            <span className="text-[var(--text-muted)] font-semibold flex items-center gap-1 text-[11px] bg-[var(--surface-hover)] px-2.5 py-0.5 rounded-md border border-[var(--border-subtle)]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>المصدر: {article.source.nameAr}</span>
            </span>
          )}

          <span className="text-[var(--text-muted)] font-mono text-[11px] ms-auto flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{publishedDate}</span>
          </span>
        </div>

        {coverUrl && (
          <div className="relative w-full aspect-16/9 rounded-2xl overflow-hidden mb-6 bg-slate-900 shadow-md">
            <img
              src={coverUrl}
              alt={article.titleAr}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        <h2 className="text-2xl md:text-4xl font-black text-[var(--text)] leading-snug editorial-title group-hover:text-[var(--primary)] transition-colors mb-4">
          <Link href={`/article/${article.id}/${article.slug}`}>
            {article.titleAr}
          </Link>
        </h2>

        {article.summaryAr && (
          <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-6 line-clamp-3 font-normal">
            {article.summaryAr}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-[var(--text-muted)]">
              تحقق صحفي مستقل • وثيقة رقم #{article.id.slice(-6)}
            </span>
          </div>

          <Link
            href={`/article/${article.id}/${article.slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--primary-light)] text-[var(--primary)] font-bold hover:bg-[var(--primary)] hover:text-white transition-all text-xs"
          >
            <span>التفاصيل والتغطيات المتعددة</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </article>
    );
  }

  // 2. نمط البطاقة المدمجة للقوائم السريعة (Compact)
  if (variant === "compact") {
    return (
      <article className="group py-3.5 border-b border-[var(--border)] last:border-none flex items-start justify-between gap-3 transition-colors">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
            <span className="font-bold text-[var(--primary)]">{article.sectionNameAr}</span>
            <span>•</span>
            <span className="truncate">{article.source?.nameAr || "مصدر معتمد"}</span>
            <span className="ms-auto font-mono text-[10px]">{publishedDate}</span>
          </div>

          <h4 className="font-bold text-xs sm:text-sm text-[var(--text)] group-hover:text-[var(--primary)] transition-colors leading-snug line-clamp-2">
            <Link href={`/article/${article.id}/${article.slug}`}>
              {article.titleAr}
            </Link>
          </h4>
        </div>

        {coverUrl && (
          <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-[var(--border)]">
            <img
              src={coverUrl}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </article>
    );
  }

  // 3. النمط القياسي المتوسط (Medium)
  return (
    <article className="group rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] card-luxury p-5 flex flex-col justify-between hover-luxury transition-all duration-300 h-full">
      <div>
        {coverUrl && (
          <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden mb-4 bg-slate-900 shadow-xs">
            <img
              src={coverUrl}
              alt={article.titleAr}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {article.isBreaking && (
              <span className="absolute top-2.5 start-2.5 bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs animate-pulse">
                عاجل
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[var(--text-muted)] mb-2.5">
          <span className="text-[var(--primary)] font-bold bg-[var(--primary-light)] px-2 py-0.5 rounded-md text-[11px]">
            {article.sectionNameAr}
          </span>
          <span className="font-mono text-[11px]">{publishedDate}</span>
        </div>

        <h3 className="font-black text-base md:text-lg text-[var(--text)] leading-snug group-hover:text-[var(--primary)] transition-colors mb-2.5 line-clamp-2">
          <Link href={`/article/${article.id}/${article.slug}`}>
            {article.titleAr}
          </Link>
        </h3>

        {article.summaryAr && (
          <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed mb-4">
            {article.summaryAr}
          </p>
        )}
      </div>

      <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)] mt-auto">
        <span className="text-[11px] font-medium flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>{article.source?.nameAr || "مصدر أصلي"}</span>
        </span>

        <Link
          href={`/article/${article.id}/${article.slug}`}
          className="text-[var(--primary)] font-bold hover:underline flex items-center gap-1 text-[11px]"
        >
          <span>التفاصيل</span>
          <ArrowLeft className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}
