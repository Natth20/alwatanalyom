"use client";

import { useState } from "react";
import Link from "next/link";
import { Flame, Check, Copy, ArrowLeft, ShieldAlert } from "lucide-react";
import type { ArticleCard } from "@awt/shared";



interface Props {
  initialNews: ArticleCard[];
}

export function BreakingInteractiveList({ initialNews }: Props) {
  const [filterSection, setFilterSection] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const sections = [
    { id: "all", label: "جميع العواجل" },
    { id: "palestine", label: "فلسطين وغزة" },
    { id: "arab-world", label: "العالم العربي" },
    { id: "world", label: "دولياً" },
  ];

  const filtered = initialNews.filter((item) => {
    if (filterSection === "all") return true;
    return item.sectionSlug === filterSection;
  });

  const handleCopy = (item: ArticleCard) => {
    const text = `🚨 عاجل | ${item.titleAr}\nالمصدر: ${item.source?.nameAr || "الوطن اليوم"}\nالتفاصيل: https://alwatantoday.net/article/${item.id}/${item.slug}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* شريط الفلاتر السريعة */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setFilterSection(sec.id)}
            className={`px-4 py-2 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
              filterSection === sec.id
                ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text)] hover:border-[var(--primary)]"
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* قائمة العواجل */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map((news) => {
            const timeStr = new Date(news.publishedAt).toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <article
                key={news.id}
                className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-6 hover:border-rose-500/40 hover-lift transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
              >
                {/* شريط تمييز جانبي ملون */}
                <div className="absolute top-0 bottom-0 start-0 w-1.5 rounded-s-2xl bg-gradient-to-b from-rose-600 via-rose-500 to-amber-600" />

                <div className="space-y-2 ps-2 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-rose-600 bg-rose-500/10 px-2.5 py-0.5 rounded-lg text-[11px] flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{timeStr}</span>
                    </span>
                    <span className="text-[var(--text-muted)]">•</span>
                    <span className="font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-lg text-[11px]">
                      {news.sectionNameAr}
                    </span>
                    <span className="text-[var(--text-muted)]">•</span>
                    <span className="text-[var(--text-muted)] font-semibold text-[11px]">
                      المصدر: {news.source?.nameAr || "وكالة معتمدة"}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-black text-[var(--text)] leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    <Link href={`/article/${news.id}/${news.slug}`}>
                      {news.titleAr}
                    </Link>
                  </h3>
                </div>

                <div className="shrink-0 flex items-center gap-2 self-end md:self-auto">
                  {/* زر النسخ الفوري للنشر */}
                  <button
                    onClick={() => handleCopy(news)}
                    className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-card)] hover:border-rose-500 text-[var(--text-muted)] hover:text-rose-600 transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    title="نسخ نص الخبر بصيغة جاهزة للواتساب وتليجرام"
                  >
                    {copiedId === news.id ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-500 text-[11px]">تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-[11px] hidden sm:inline">نسخ للنشر</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/article/${news.id}/${news.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-all shadow-xs"
                  >
                    <span>التفاصيل</span>
                    <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                  </Link>
                </div>
              </article>
            );
          })
        ) : (
          <div className="p-16 text-center text-[var(--text-muted)] rounded-3xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <ShieldAlert className="w-12 h-12 mx-auto text-[var(--primary)] opacity-40" />
            <h3 className="font-bold text-base text-[var(--text)]">الهدوء الميداني يسود الآن</h3>
            <p className="text-xs max-w-sm mx-auto">
              لا توجد تنبيهات عاجلة مسجلة في هذا التصنيف حالياً. غرفة الرصد تتابع المصادر الرسمية على مدار الساعة.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

