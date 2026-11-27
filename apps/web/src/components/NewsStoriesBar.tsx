"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ArticleCard, StorySummary } from "@awt/shared";
import { Flame, Play, X, ChevronRight, ChevronLeft, ShieldCheck, Clock, ExternalLink } from "lucide-react";
import { resolveEditorialImage } from "@/lib/editorial-images";

interface StorySlide {
  id: string;
  slug: string;
  category: string;
  title: string;
  summary: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  isBreaking?: boolean;
}

interface Props {
  stories?: StorySummary[];
  articles?: ArticleCard[];
}

function mapToSlides(stories?: StorySummary[], articles?: ArticleCard[]): StorySlide[] {
  const slides: StorySlide[] = [];
  const seen = new Set<string>();

  if (Array.isArray(stories)) {
    for (const st of stories) {
      const lead = st.articles[0];
      if (!lead || seen.has(lead.id)) continue;
      seen.add(lead.id);
      slides.push({
        id: lead.id,
        slug: lead.slug,
        category: lead.sectionNameAr || "قصة رئيسية",
        title: st.headlineAr || lead.titleAr,
        summary: st.summaryAr || lead.summaryAr || lead.titleAr,
        imageUrl: resolveEditorialImage(lead),
        source: lead.source?.nameAr || "الوطن اليوم",
        publishedAt: lead.publishedAt,
        isBreaking: lead.isBreaking,
      });
    }
  }

  if (Array.isArray(articles)) {
    for (const art of articles) {
      if (seen.has(art.id)) continue;
      seen.add(art.id);
      slides.push({
        id: art.id,
        slug: art.slug,
        category: art.sectionNameAr,
        title: art.titleAr,
        summary: art.summaryAr || art.titleAr,
        imageUrl: resolveEditorialImage(art),
        source: art.source?.nameAr || "الوطن اليوم",
        publishedAt: art.publishedAt,
        isBreaking: art.isBreaking,
      });
    }
  }

  return slides.slice(0, 10);
}

export function NewsStoriesBar({ stories, articles }: Props) {
  const initialSlides = mapToSlides(stories, articles);
  const [slides, setSlides] = useState<StorySlide[]>(initialSlides);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  useEffect(() => {
    if (initialSlides.length > 0) {
      setSlides(initialSlides);
      return;
    }

    fetch("/api/v1/pulse")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.latestTopics)) {
          const loaded: StorySlide[] = data.latestTopics.slice(0, 8).map((t: any) => ({
            id: t.id,
            slug: t.slug,
            category: t.sectionNameAr,
            title: t.titleAr,
            summary: t.titleAr,
            imageUrl: resolveEditorialImage({ id: t.id, titleAr: t.titleAr, sectionSlug: t.sectionSlug }),
            source: t.sourceNameAr,
            publishedAt: t.publishedAt,
            isBreaking: t.isBreaking,
          }));
          setSlides(loaded);
        }
      })
      .catch(() => {});
  }, [initialSlides.length]);

  if (slides.length === 0) return null;

  const activeSlide = activeIdx !== null ? slides[activeIdx] : null;

  return (
    <div className="py-1">
      <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2 px-1">
        {slides.map((story, idx) => (
          <button
            key={story.id}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className="flex flex-col items-center gap-2 shrink-0 w-24 group cursor-pointer focus:outline-none"
          >
            <div
              className={`relative w-18 h-18 rounded-full p-[3px] transition-transform duration-300 group-hover:scale-105 ${
                story.isBreaking
                  ? "bg-gradient-to-tr from-red-600 via-rose-500 to-[var(--gold)]"
                  : "bg-gradient-to-tr from-[var(--primary)] via-[var(--gold)] to-amber-300"
              }`}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-[var(--bg)] bg-black">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {story.isBreaking && (
                <span className="absolute -bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-black shadow-md flex items-center gap-0.5">
                  <Flame className="w-2.5 h-2.5" />
                  <span>عاجل</span>
                </span>
              )}
            </div>
            <span className="text-[11px] font-bold text-[var(--text)] line-clamp-2 text-center leading-tight group-hover:text-[var(--primary)] transition-colors">
              {story.category}
            </span>
          </button>
        ))}
      </div>

      {/* عارض الستوري الكامل */}
      {activeSlide && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-3xl overflow-hidden bg-[#160108] border border-[var(--gold)]/40 shadow-2xl text-white">
            {/* شريط التقدم */}
            <div className="flex gap-1 p-3 pb-1">
              {slides.map((s, i) => (
                <div
                  key={s.id}
                  className={`h-1 flex-1 rounded-full ${
                    i <= (activeIdx || 0) ? "bg-[var(--gold)]" : "bg-white/20"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between px-4 py-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-black text-[var(--gold)]">{activeSlide.category}</span>
                <span className="text-white/40">•</span>
                <span className="text-white/70 flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" />
                  {new Date(activeSlide.publishedAt).toLocaleTimeString("ar-EG", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveIdx(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer"
                aria-label="إغلاق القصة"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-[4/3] bg-black overflow-hidden">
              <img
                src={activeSlide.imageUrl}
                alt={activeSlide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160108] via-transparent to-transparent" />
            </div>

            <div className="p-6 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{activeSlide.source}</span>
              </span>
              <h3 className="text-lg font-black leading-snug text-white">
                {activeSlide.title}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                {activeSlide.summary}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : slides.length - 1))
                    }
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer"
                    aria-label="السابق"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIdx((prev) =>
                        prev !== null && prev + 1 < slides.length ? prev + 1 : 0
                      )
                    }
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer"
                    aria-label="التالي"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>

                <Link
                  href={`/article/${activeSlide.id}/${activeSlide.slug}`}
                  onClick={() => setActiveIdx(null)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--gold)] text-[#140106] text-xs font-black hover:brightness-110 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>فتح المادة الكاملة</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
