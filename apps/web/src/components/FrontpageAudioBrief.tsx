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
    <div className="rounded-2xl border border-[var(--primary)]/30 bg-gradient-to-r from-[var(--primary)]/10 via-[var(--surface)] to-[var(--surface)] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shrink-0 shadow-md ${
            isPlaying
              ? "bg-rose-600 text-white animate-pulse"
              : "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
          }`}
          aria-label={isPlaying ? "إيقاف الموجز" : "استمع لموجز الجريدة"}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ms-0.5" />}
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-[var(--text)] flex items-center gap-1.5">
              <span>🎧</span>
              <span>اسمع أهم أخبار اليوم في 3 دقائق</span>
            </span>
            <span className="text-[10px] bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full">
              بث صوتي فوري
            </span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
            {isPlaying
              ? "جارٍ بث الموجز الإذاعي لأهم العناوين والتطورات..."
              : "قراءة صوتية ذكية لأبرز 5 عناوين في الصفحة الرئيسية مباشرة دون عناء القراءة."}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs font-semibold text-[var(--text-muted)] hidden md:inline">
          سرعة البث: 1.0x
        </span>
        <button
          onClick={handleToggle}
          className="px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs font-bold text-[var(--text)] hover:border-[var(--primary)] transition-colors flex items-center gap-1.5 shadow-sm"
        >
          {isPlaying ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-rose-500" />
              <span>إيقاف البث</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-[var(--primary)] fill-[var(--primary)]" />
              <span>▶ استمع الآن</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

