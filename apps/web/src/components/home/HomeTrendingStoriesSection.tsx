import Link from "next/link";
import type { StorySummary } from "@awt/shared";
import { Flame, Layers, Clock, ChevronLeft, ShieldCheck } from "lucide-react";
import { resolveEditorialImage } from "@/lib/editorial-images";

interface Props {
  stories: StorySummary[];
}

export function HomeTrendingStoriesSection({ stories }: Props) {
  if (!stories || stories.length === 0) return null;

  return (
    <section
      id="trending-stories"
      className="space-y-6 rounded-3xl border border-[var(--border)] dark:border-rose-500/25 bg-[var(--surface)] dark:bg-gradient-to-b dark:from-[#1d050c]/90 dark:to-[#0e0407]/95 p-6 sm:p-8 shadow-xl relative overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-80" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] dark:border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-600 to-[#590018] text-white flex items-center justify-center shadow-lg shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text)]">
                أبرز الملفات والقصص المتصاعدة الآن
              </h2>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30">
                تجميع متعدد المصادر
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              متابعة تطور الأحداث الكبرى عبر ربط تغطيات الوكالات المعتمدة في مسار واحد
            </p>
          </div>
        </div>

        <Link
          href="/stories"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--bg)] dark:bg-white/10 border border-[var(--border)] dark:border-white/15 text-xs font-black text-[var(--primary)] dark:text-[var(--gold)] hover:border-[var(--gold)] transition-all shrink-0 self-start sm:self-auto"
        >
          <span>جميع ملفات القصص</span>
          <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stories.slice(0, 4).map((story, idx) => {
          const lead = story.articles[0];
          const imgUrl = resolveEditorialImage(
            lead || { id: story.id, titleAr: story.headlineAr, sectionSlug: story.sectionSlug }
          );

          return (
            <Link
              key={story.id}
              href={`/story/${story.id}/${story.slug}`}
              className="group rounded-2xl border border-[var(--border)] dark:border-white/10 bg-[var(--bg)] dark:bg-black/40 overflow-hidden hover:border-rose-500/50 dark:hover:border-[var(--gold)]/60 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="relative aspect-16/10 bg-stone-900 overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={story.headlineAr}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  <div className="absolute top-2.5 start-2.5 flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-lg bg-[var(--gold)] text-[#140106] font-mono text-xs font-black flex items-center justify-center shadow-md">
                      {idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-black/65 backdrop-blur-md text-[10px] font-bold text-white border border-white/15 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-[var(--gold)]" />
                      <span>{story.articles.length} مواد</span>
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 end-2.5 text-[10px] font-mono text-white/90 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-[var(--gold)]" />
                    <span>
                      {new Date(story.lastUpdatedAt).toLocaleTimeString("ar-EG", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-black text-sm text-[var(--text)] leading-snug line-clamp-2 group-hover:text-[var(--primary)] dark:group-hover:text-[var(--gold)] transition-colors">
                    {story.headlineAr}
                  </h3>
                  {story.summaryAr && (
                    <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                      {story.summaryAr}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-4 py-2.5 border-t border-[var(--border)] dark:border-white/10 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{story.sources.length || 1} مصادر</span>
                </span>
                <span className="font-black text-[var(--primary)] dark:text-[var(--gold)] flex items-center gap-0.5">
                  <span>الملف الكامل</span>
                  <ChevronLeft className="w-3 h-3 rtl:rotate-0" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
