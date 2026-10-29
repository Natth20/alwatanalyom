import Link from "next/link";
import { ArticleCard } from "@awt/shared";

export function BreakingBar({ articles }: { articles: ArticleCard[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-[var(--breaking)] text-white text-sm font-medium py-2 px-4 shadow-sm">
      <div className="container-custom flex items-center gap-3">
        <span className="bg-white/20 text-white px-2 py-0.5 rounded text-xs font-bold animate-pulse flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
          عاجل
        </span>

        <div className="flex-1 overflow-hidden whitespace-nowrap">
          {articles.map((item) => (
            <Link
              key={item.id}
              href={`/article/${item.id}/${item.slug}`}
              className="inline-flex items-center gap-2 hover:underline me-8 text-white/95"
            >
              <span>{item.titleAr}</span>
              {item.source && (
                <span className="text-white/70 text-xs">({item.source.nameAr})</span>
              )}
            </Link>
          ))}
        </div>

        <Link
          href="/breaking"
          className="text-xs text-white/80 hover:text-white underline underline-offset-2 shrink-0"
        >
          كل العاجل ←
        </Link>
      </div>
    </div>
  );
}

