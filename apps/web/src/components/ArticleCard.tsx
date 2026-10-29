import Link from "next/link";
import { ArticleCard as ArticleCardType } from "@awt/shared";

interface Props {
  article: ArticleCardType;
  variant?: "hero" | "medium" | "compact" | "text-only";
}

export function ArticleCard({ article, variant = "medium" }: Props) {
  const publishedDate = new Date(article.publishedAt).toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (variant === "hero") {
    return (
      <article className="group relative rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface)] p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--primary)] mb-3">
          <span className="bg-[var(--primary)]/10 px-2 py-0.5 rounded">
            {article.sectionNameAr}
          </span>
          {article.isBreaking && (
            <span className="bg-[var(--breaking)] text-white px-2 py-0.5 rounded text-[11px] font-bold">
              عاجل
            </span>
          )}
          {article.source && (
            <span className="text-[var(--text-muted)] font-normal">
              المصدر: {article.source.nameAr}
            </span>
          )}
          <span className="text-[var(--text-muted)] font-normal mr-auto">
            {publishedDate}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-[var(--text)] leading-snug group-hover:text-[var(--primary)] transition-colors mb-4">
          <Link href={`/article/${article.id}/${article.slug}`}>
            {article.titleAr}
          </Link>
        </h2>

        {article.summaryAr && (
          <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-4 line-clamp-3">
            {article.summaryAr}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
            {article.translatedBy && (
              <span className="bg-[var(--surface)] border border-[var(--border)] px-1.5 py-0.5 rounded text-[10px]">
                {article.translatedBy === "machine" ? "مترجم آلياً" : "ترجمة مراجعة"}
              </span>
            )}
          </div>
          <Link
            href={`/article/${article.id}/${article.slug}`}
            className="text-[var(--primary)] font-semibold hover:underline flex items-center gap-1"
          >
            <span>اقرأ التفاصيل والمصدر الأصلي</span>
            <span>←</span>
          </Link>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="border-b border-[var(--border)] pb-3 mb-3 last:border-none">
        <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] mb-1">
          <span className="font-semibold text-[var(--primary)]">{article.sectionNameAr}</span>
          <span>•</span>
          <span>{article.source?.nameAr || "مصدر"}</span>
          <span className="mr-auto">{publishedDate}</span>
        </div>
        <h4 className="font-bold text-sm text-[var(--text)] hover:text-[var(--primary)] leading-snug">
          <Link href={`/article/${article.id}/${article.slug}`}>
            {article.titleAr}
          </Link>
        </h4>
      </article>
    );
  }

  // medium default
  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 flex flex-col justify-between hover:border-[var(--primary)] transition-colors">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] mb-2">
          <span className="text-[var(--primary)]">{article.sectionNameAr}</span>
          <span>•</span>
          <span>{article.source?.nameAr || "مصدر"}</span>
          <span className="mr-auto text-[11px]">{publishedDate}</span>
        </div>
        <h3 className="font-bold text-base text-[var(--text)] leading-snug hover:text-[var(--primary)] transition-colors mb-2">
          <Link href={`/article/${article.id}/${article.slug}`}>
            {article.titleAr}
          </Link>
        </h3>
        {article.summaryAr && (
          <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed mb-3">
            {article.summaryAr}
          </p>
        )}
      </div>

      <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs">
        <Link
          href={`/article/${article.id}/${article.slug}`}
          className="text-[var(--primary)] font-semibold hover:underline"
        >
          تفاصيل الخبر ←
        </Link>
      </div>
    </article>
  );
}

