import Link from "next/link";
import { ArticleCard as ArticleCardType } from "@awt/shared";
import { Radio, Clock, ChevronLeft, ShieldCheck } from "lucide-react";
import { resolveEditorialImage } from "@/lib/editorial-images";

interface Props {
  articles: ArticleCardType[];
}

export function LiveFastStreamWire({ articles }: Props) {
  if (!articles || articles.length === 0) return null;

  return (
    <aside className="rounded-3xl border border-[var(--border)] dark:border-rose-500/25 bg-[var(--surface)] dark:bg-gradient-to-b dark:from-[#1a050b]/95 dark:to-[#0e0407]/95 p-5 shadow-md space-y-4">
      {/* ترويسة الممر السريع */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
          </span>
          <h2 className="font-black text-base text-[var(--text)]">
            البث اللحظي · التحديث الميداني
          </h2>
        </div>
        <span className="text-[11px] font-bold text-red-600 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>مباشر</span>
        </span>
      </div>

      {/* قائمة الأخبار اللحظية عالية الكثافة بصور صحفية مصغرة */}
      <div className="divide-y divide-[var(--border)]/60 max-h-[620px] overflow-y-auto pe-1 scrollbar-thin space-y-1">
        {articles.slice(0, 8).map((art) => {
          const imgUrl = resolveEditorialImage(art);
          return (
            <article key={art.id} className="pt-3 pb-3 flex items-center gap-3 group">
              {/* صورة مصغرة لكل خبر */}
              <div className="relative w-18 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-900 border border-[var(--border)]">
                <img
                  src={imgUrl}
                  alt={art.titleAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* التفاصيل والعنوان */}
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                  <span className="font-bold text-[var(--primary)] px-2 py-0.5 rounded-md bg-[var(--primary)]/10 text-[10px]">
                    {art.sectionNameAr}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px]">
                    <Clock className="w-3 h-3 text-[var(--gold)]" />
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
                  <span className="truncate max-w-[120px] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>{art.source?.nameAr || "الوطن اليوم"}</span>
                  </span>
                  <Link
                    href={`/article/${art.id}/${art.slug}`}
                    className="text-[var(--primary)] flex items-center gap-0.5 font-bold text-[11px] hover:underline"
                  >
                    <span>تفاصيل</span>
                    <ChevronLeft className="w-3 h-3 rtl:rotate-0" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* رابط الأرشيف الكامل */}
      <div className="pt-2 border-t border-[var(--border)] text-center">
        <Link
          href="/breaking"
          className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
        >
          <span>عرض شريط التغطيات اللحظية الشامل ←</span>
        </Link>
      </div>
    </aside>
  );
}
