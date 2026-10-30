"use client";

import { useState } from "react";
import { Headphones, Play, Pause, Radio, Clock, Sparkles } from "lucide-react";

interface Episode {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  releaseTime: string;
}

const EPISODES: Episode[] = [
  {
    id: "ep-1",
    title: "إيجاز الصباح: تطورات الميدان في غزة ومسارات التهدئة والجهود الدبلوماسية",
    subtitle: "إعداد وتقديم: غرفة أخبار الوطن اليوم",
    duration: "7:45 د",
    releaseTime: "اليوم 07:30 ص",
  },
  {
    id: "ep-2",
    title: "بودكاست زاوية اقتصادية: بورصة الذهب وتوقعات الفائدة ومستقبل الشيكل",
    subtitle: "حوار خاص مع الخبير الاقتصادي د. سامر شاهين",
    duration: "14:20 د",
    releaseTime: "أمس 06:00 م",
  },
];

export function PodcastWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeEp, setActiveEp] = useState<Episode>(EPISODES[0]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative rounded-2xl overflow-hidden border border-[var(--border)] bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 text-white p-6 md:p-8 shadow-lg">
      <div className="absolute top-0 end-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* الترويسة والمعلومات */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span>صوت الوطن · بودكاست</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-300">
              <Clock className="w-3 h-3" />
              <span>{activeEp.releaseTime}</span>
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-white leading-snug mb-2 line-clamp-2">
            {activeEp.title}
          </h3>

          <p className="text-xs text-slate-300 mb-4">
            {activeEp.subtitle} • المدة: {activeEp.duration}
          </p>

          {/* موجات الصوت التفاعلية */}
          <div className="flex items-center gap-1 h-6">
            {[40, 75, 20, 90, 60, 30, 85, 100, 45, 70, 95, 35, 80, 50, 65, 85, 40, 90, 30].map(
              (height, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying
                      ? "bg-emerald-400 animate-pulse"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(20, (height * (i % 2 === 0 ? 1 : 0.6)))}%` : "25%",
                    animationDelay: `${i * 60}ms`,
                  }}
                />
              )
            )}
          </div>
        </div>

        {/* زر التشغيل والتحكم التفاعلي */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل الحلقة"}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-slate-950" />
            ) : (
              <Play className="w-7 h-7 fill-slate-950 ms-1" />
            )}
          </button>
        </div>
      </div>

      {/* قائمة الحلقات المتاحة */}
      <div className="relative mt-6 pt-5 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-3">
        {EPISODES.map((ep) => (
          <div
            key={ep.id}
            onClick={() => {
              setActiveEp(ep);
              setIsPlaying(true);
            }}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              activeEp.id === ep.id
                ? "bg-white/10 border-emerald-400/50"
                : "bg-white/5 border-white/5 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
              <span>{ep.releaseTime}</span>
              <span className="font-semibold text-emerald-300">{ep.duration}</span>
            </div>
            <h4 className="text-xs font-bold text-white line-clamp-1">
              {ep.title}
            </h4>
          </div>
        ))}
      </div>
    </section>
  );
}

