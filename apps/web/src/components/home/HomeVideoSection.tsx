import Link from "next/link";
import { ArticleCard as ArticleCardType } from "@awt/shared";
import { Play, Film, Clock, ChevronLeft } from "lucide-react";

interface Props {
  articles: ArticleCardType[];
}

export function HomeVideoSection({ articles }: Props) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="space-y-5 rounded-3xl border border-[var(--border)] bg-[#1a0006]/50 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)] text-[var(--gold)] flex items-center justify-center">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              الصحافة المرئية · فيديو الوطن
            </h2>
            <p className="text-xs text-stone-300">
              تقارير مصورة وإيجازات ميدانية بالصوت والصورة
            </p>
          </div>
        </div>

        <Link
          href="/videos"
          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-white/10 text-[var(--gold)] hover:bg-white/20 text-xs font-bold transition-colors border border-[var(--gold)]/30"
        >
          <span>قسم الفيديو كامل</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-white/10 bg-black/40 overflow-hidden group hover:border-[var(--gold)]/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video bg-stone-900 overflow-hidden">
                {/* خلفية أو صورة */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                  <Link
                    href={`/article/${item.id}/${item.slug}`}
                    className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl border border-[var(--gold)]"
                    aria-label="تشغيل"
                  >
                    <Play className="w-5 h-5 fill-current ms-0.5 text-[var(--gold)]" />
                  </Link>
                </div>

                <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-black/80 text-[var(--gold)] text-[10px] font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>02:45</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[var(--primary)] text-white text-[10px] font-bold">
                    {item.sectionNameAr}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <h3 className="font-bold text-sm text-white line-clamp-2 group-hover:text-[var(--gold)] transition-colors leading-snug">
                  <Link href={`/article/${item.id}/${item.slug}`}>
                    {item.titleAr}
                  </Link>
                </h3>
              </div>
            </div>

            <div className="p-4 pt-0 text-[10px] text-stone-400 flex items-center justify-between border-t border-white/5 mt-2">
              <span>{item.source?.nameAr || "الوطن اليوم"}</span>
              <span>{new Date(item.publishedAt).toLocaleDateString("ar-EG")}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

