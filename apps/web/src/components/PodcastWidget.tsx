"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Headphones, Play, Pause, Radio, Clock } from "lucide-react";

interface LiveEpisodeItem {
  id: string;
  title: string;
  section: string;
  publishedAt: string;
}

export function PodcastWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [headlines, setHeadlines] = useState<LiveEpisodeItem[]>([]);

  useEffect(() => {
    fetch("/api/v1/pulse")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.latestTopics)) {
          setHeadlines(
            data.latestTopics.slice(0, 5).map((t: any) => ({
              id: t.id,
              title: t.titleAr,
              section: t.sectionNameAr,
              publishedAt: t.publishedAt,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  if (headlines.length === 0) return null;

  const togglePlay = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const script =
      "صوت الوطن اليوم يقدم موجز الأخبار المباشر من غرفة التحرير. " +
      headlines.map((h) => h.title).join(" . . ");
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = "ar-SA";
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section className="relative rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-slate-950 via-emerald-950/70 to-slate-950 text-white p-6 md:p-8 shadow-xl">
      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span>صوت الوطن · النشرة الصوتية الحية</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-300 font-mono">
              <Clock className="w-3 h-3" />
              {new Date(headlines[0]!.publishedAt).toLocaleTimeString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-white leading-snug line-clamp-2">
            {headlines[0]!.title}
          </h3>

          <p className="text-xs text-slate-300">
            قراءة صوتية آلية لأحدث {headlines.length} تقارير منشورة في قاعدة بيانات المنصة
          </p>

          <Link href="/podcast" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:underline">
            <Headphones className="w-3.5 h-3.5" />
            <span>الدخول لاستوديو البودكاست الكامل ←</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={togglePlay}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
          aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل النشرة"}
        >
          {isPlaying ? <Pause className="w-7 h-7 fill-slate-950" /> : <Play className="w-7 h-7 fill-slate-950 ms-1" />}
        </button>
      </div>
    </section>
  );
}
