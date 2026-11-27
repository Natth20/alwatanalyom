import Link from "next/link";
import { TrendingUp, Eye, Clock, ShieldCheck } from "lucide-react";
import type { ArticleCard } from "@awt/shared";

interface Props {
  articles: (ArticleCard & { readCount?: number })[];
}

export function MostReadWidget({ articles }: Props) {
  const topArticles = articles.slice(0, 5);
  if (topArticles.length === 0) return null;

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

  return (
    <div className="card-luxury rounded-3xl p-5 space-y-4 shadow-md">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-black text-sm text-[var(--text)] leading-tight">
              الأكثر متابعة وقراءة اليوم
            </h3>
            <span className="text-[10px] text-[var(--text-muted)]">
              ترتيب حي حسب القراءات المسجلة فعلياً
            </span>
          </div>
        </div>

        <span className="text-[10px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full">
          مباشر
        </span>
      </div>

      <div className="space-y-3.5">
        {topArticles.map((art, idx) => (
          <article key={art.id} className="flex items-start gap-3 group">
            <span
              className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono font-black text-xs shrink-0 transition-transform group-hover:scale-105 ${getRankBadge(
                idx
              )}`}
            >
              {idx + 1}
            </span>

            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
                <span className="font-bold text-[var(--primary)]">{art.sectionNameAr}</span>
                <span>•</span>
                {typeof art.readCount === "number" && art.readCount > 0 ? (
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-[var(--text-muted)]" />
                    <span className="font-mono">{art.readCount.toLocaleString("ar-EG")} قراءة</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[var(--text-muted)]" />
                    <span>
                      {new Date(art.publishedAt).toLocaleTimeString("ar-EG", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </span>
                )}
              </div>

              <h4 className="font-bold text-xs md:text-sm text-[var(--text)] group-hover:text-[var(--primary)] leading-snug line-clamp-2 transition-colors">
                <Link href={`/article/${art.id}/${art.slug}`}>{art.titleAr}</Link>
              </h4>

              {art.source?.nameAr && (
                <span className="text-[10px] text-emerald-500 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{art.source.nameAr}</span>
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
