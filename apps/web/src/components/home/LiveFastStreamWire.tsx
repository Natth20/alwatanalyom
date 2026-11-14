import Link from "next/link";
import { ArticleCard as ArticleCardType } from "@awt/shared";
import { Radio, Clock, ChevronLeft } from "lucide-react";

interface Props {
  articles: ArticleCardType[];
}

export function LiveFastStreamWire({ articles }: Props) {
  if (!articles || articles.length === 0) return null;

  return (
    <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm space-y-4">
      {/* ترويسة الممر السريع */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600" />
          </span>
          <h2 className="font-black text-base text-[var(--text)]">
            الممر السريع · التدفق اللحظي
          </h2>
        </div>
        <span className="text-[11px] font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>مباشر</span>
        </span>
      </div>

      {/* قائمة الأخبار اللحظية */}
      <div className="divide-y divide-[var(--border)]/60 max-h-[580px] overflow-y-auto pe-1 scrollbar-thin">
        {articles.slice(0, 10).map((art) => (
          <article key={art.id} className="py-3.5 space-y-1.5 group">
            <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
              <span className="font-bold text-[var(--primary)] px-2 py-0.5 rounded bg-[var(--primary)]/10 text-[10px]">
                {art.sectionNameAr}
              </span>
              <span className="flex items-center gap-1 font-mono text-[10px]">
                <Clock className="w-3 h-3" />
                <span>
                  {new Date(art.publishedAt).toLocaleTimeString("ar-EG", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </span>
            </div>

            <h3 className="font-bold text-xs sm:text-sm text-[var(--text)] line-clamp-2 leading-snug group-hover:text-[var(--primary)] transition-colors">
              <Link href={`/article/${art.id}/${art.slug}`}>
                {art.titleAr}
              </Link>
            </h3>

            <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-0.5">
              <span>المصدر: {art.source?.nameAr || "الوطن اليوم"}</span>
              <Link
                href={`/article/${art.id}/${art.slug}`}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--primary)] flex items-center gap-0.5 font-bold"
              >
                <span>تفاصيل</span>
                <ChevronLeft className="w-3 h-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* رابط الأرشيف الكامل */}
      <div className="pt-2 border-t border-[var(--border)] text-center">
        <Link
          href="/breaking"
          className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
        >
          <span>عرض كافة الأخبار والتغطيات اللحظية ←</span>
        </Link>
      </div>
    </aside>
  );
}
