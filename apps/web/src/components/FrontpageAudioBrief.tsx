"use client";

import { useState } from "react";
import { Volume2, VolumeX, Play, Pause, Radio, Sparkles, Check } from "lucide-react";

interface Props {
  headlines: string[];
}

export function FrontpageAudioBrief({ headlines }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const fallbackHeadlines = [
    "صفارات الإنذار تدوي في الجليل الأعلى بعد رصد مسيرات وصواريخ وفق الإعلام العبري.",
    "أسعار الذهب تسجل مستويات قياسية وسط تراجع عوائد السندات والتوترات الجيوسياسية.",
    "صمود المنظومة الصحية في شمال غزة ومناشدات دولية عاجلة لتأمين الوقود للمستشفيات.",
    "بورصة فلسطين تشهد استقراراً في تداولات أسهم القطاع المصرفي والاتصالات.",
  ];

  const list = headlines && headlines.length > 0 ? headlines : fallbackHeadlines;

  const handleToggle = () => {
    if (isPlaying) {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
      return;
    }

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      const textToRead = "أهلاً بكم في الموجز الصوتي السريع من منصة الوطن اليوم. " + list.join(" ... ");
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = "ar-SA";
      utterance.rate = 1.0;

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    } else {
      alert("متصفحك لا يدعم القراءة الصوتية الآلية المباشرة.");
    }
  };

  return (
    <div className="relative rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-emerald-950/20 via-[var(--surface-elevated)] to-[var(--surface)] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md overflow-hidden">
      {/* هالة تدرج خفيفة */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex items-center gap-3">
        <button
          onClick={handleToggle}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shrink-0 shadow-lg ${
            isPlaying
              ? "bg-rose-600 text-white animate-pulse"
              : "bg-gradient-to-br from-emerald-600 to-teal-700 text-white hover:from-emerald-500 hover:to-teal-600 border border-emerald-400/30"
          }`}
          aria-label={isPlaying ? "إيقاف الموجز" : "استمع لموجز الجريدة"}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ms-0.5" />}
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-[var(--text)] flex items-center gap-1.5">
              <span>🎧</span>
              <span>الموجز الإذاعي الصوتي · في 3 دقائق</span>
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              بث فوري ذكي
            </span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
            {isPlaying
              ? "جارٍ الآن بث الموجز الإذاعي لأهم العناوين والتطورات الميدانية..."
              : "قراءة صوتية ذكية لأبرز عناوين الساعة بصوت واضح وبدون إعلانات."}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-3 shrink-0">
        {isPlaying && (
          <div className="flex items-end gap-1 h-5 pe-2">
            <span className="w-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:0ms] h-3" />
            <span className="w-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:150ms] h-5" />
            <span className="w-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:300ms] h-4" />
            <span className="w-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:75ms] h-2" />
          </div>
        )}
        <span className="text-xs font-mono font-semibold text-[var(--text-muted)] hidden md:inline">
          1.0x
        </span>
        <button
          onClick={handleToggle}
          className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-bold text-[var(--text)] hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
        >
          {isPlaying ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-rose-500" />
              <span>إيقاف البث</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[var(--primary)] fill-current" />
              <span>▶ استمع الآن</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

