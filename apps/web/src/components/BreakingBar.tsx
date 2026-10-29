"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArticleCard } from "@awt/shared";
import { ChevronLeft } from "lucide-react";

interface Props {
  articles: ArticleCard[];
}

export function BreakingBar({ articles: initialArticles }: Props) {
  const [articles, setArticles] = useState<ArticleCard[]>(initialArticles);

  useEffect(() => {
    // استطلاع دوري فوري لتحديث شريط الأخبار العاجلة كل 25 ثانية
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/v1/breaking");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.items)) {
            setArticles(data.items);
          }
        }
      } catch {
        // تجاهل أخطاء الشبكة المؤقتة
      }
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-[var(--breaking)] text-white text-sm font-medium py-2 px-4 shadow-sm border-b border-rose-700/30">
      <div className="container-custom flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          <span className="bg-white/20 text-white px-2.5 py-0.5 rounded text-xs font-black animate-pulse flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-white inline-block" />
            <span>عاجل</span>
          </span>

          <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
            {articles.map((item) => (
              <Link
                key={item.id}
                href={`/article/${item.id}/${item.slug}`}
                className="inline-flex items-center gap-2 hover:underline me-8 text-white/95 text-xs md:text-sm font-semibold transition-opacity hover:opacity-90"
              >
                <span>{item.titleAr}</span>
                {item.source && (
                  <span className="text-white/70 text-[11px] font-normal">
                    ({item.source.nameAr})
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/breaking"
          className="text-xs text-white/90 hover:text-white underline underline-offset-2 shrink-0 flex items-center gap-1 font-bold"
        >
          <span>كل العاجل</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
