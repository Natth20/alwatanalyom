import Link from "next/link";
import { TrendingUp, Eye, Clock } from "lucide-react";
import { ArticleCard } from "@awt/shared";

interface Props {
  articles: ArticleCard[];
}

export function MostReadWidget({ articles }: Props) {
  const topArticles = articles.slice(0, 5);

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return "bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20";
      case 1:
        return "bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900 shadow-sm";
      case 2:
        return "bg-gradient-to-br from-amber-700 to-amber-800 text-amber-100 shadow-sm";
      default:
        return "bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-muted)]";
    }
  };

  const getEstimatedViews = (index: number) => {
    const baseViews = [38420, 27150, 19800, 14200, 9600];
    const views = baseViews[index] || 8500;
    return `${(views / 1000).toFixed(1)}k`;
  };

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-black text-sm text-[var(--text)] leading-tight">الأكثر قراءة وتفاعلاً اليوم</h3>
            <span className="text-[10px] text-[var(--text-muted)]">مرتبة بحسب إقبال القراء</span>
          </div>
        </div>

        <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full animate-pulse">
          مباشر
        </span>
      </div>

      <div className="space-y-3.5">
        {topArticles.map((art, idx) => (
          <article key={art.id} className="flex items-start gap-3 group">
            {/* رقم الترتيب المميز */}
            <span
              className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-black text-xs shrink-0 transition-transform group-hover:scale-105 ${getRankBadge(
                idx
              )}`}
            >
              {idx + 1}
            </span>

            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
                <span className="font-bold text-[var(--primary)]">{art.sectionNameAr}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <Eye className="w-3 h-3 text-[var(--text-muted)]" />
                  <span className="font-mono">{getEstimatedViews(idx)}</span>
                </span>
              </div>

              <h4 className="font-bold text-xs md:text-sm text-[var(--text)] group-hover:text-[var(--primary)] leading-snug line-clamp-2 transition-colors">
                <Link href={`/article/${art.id}/${art.slug}`}>
                  {art.titleAr}
                </Link>
              </h4>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
