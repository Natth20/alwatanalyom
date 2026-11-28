"use client";

import { useState, useEffect } from "react";
import { Play, Pause, Volume2, Gauge } from "lucide-react";

interface Props {
  headlines: string[];
}

export function FrontpageAudioBrief({ headlines }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [list, setList] = useState<string[]>(headlines || []);
  const [speed, setSpeed] = useState<number>(1.0);
  const [activeHeadlineIdx, setActiveHeadlineIdx] = useState<number>(0);

  useEffect(() => {
    if (headlines && headlines.length > 0) {
      setList(headlines);
      return;
    }
    fetch("/api/v1/pulse")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.latestTopics)) {
          setList(data.latestTopics.slice(0, 5).map((t: { titleAr?: string }) => String(t.titleAr || "")).filter(Boolean));
        }
      })
      .catch(() => {});
  }, [headlines]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (list.length === 0) return null;

  const speakIndex = (idx: number, rateOverride?: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const item = list[idx];
    if (!item) {
      setIsPlaying(false);
      return;
    }

    const prefix = idx === 0 ? "أهلاً بكم في الموجز الإخباري الصوتي المباشر من منصة الوطن اليوم. " : "";
    const utterance = new SpeechSynthesisUtterance(`${prefix}${item}`);
    utterance.lang = "ar-SA";
    utterance.rate = rateOverride ?? speed;
    utterance.onend = () => {
      if (idx + 1 < list.length) {
        setActiveHeadlineIdx(idx + 1);
        speakIndex(idx + 1, rateOverride ?? speed);
      } else {
        setIsPlaying(false);
        setActiveHeadlineIdx(0);
      }
    };
    utterance.onerror = () => setIsPlaying(false);

    setActiveHeadlineIdx(idx);
    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleToggle = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }
    speakIndex(activeHeadlineIdx);
  };

  const handleSpeedChange = (nextSpeed: number) => {
    setSpeed(nextSpeed);
    if (isPlaying) {
      speakIndex(activeHeadlineIdx, nextSpeed);
    }
  };

  return (
    <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-[var(--surface)] to-[var(--surface)] dark:from-[#041d15]/90 dark:via-[#14060b]/95 dark:to-[#0e0407]/95 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-70" />

      <div className="relative z-10 flex items-center gap-3.5 min-w-0 flex-1">
        <button
          type="button"
          onClick={handleToggle}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shrink-0 shadow-lg cursor-pointer ${
            isPlaying
              ? "bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/20"
              : "bg-gradient-to-br from-emerald-600 to-teal-700 text-white hover:from-emerald-500 hover:to-teal-600 border border-emerald-400/30"
          }`}
          aria-label={isPlaying ? "إيقاف الموجز" : "استمع لموجز العناوين"}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ms-0.5" />}
        </button>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-black text-[var(--text)] flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>الموجز الصوتي الحي لعناوين الصفحة الأولى</span>
            </span>
            <span className="text-[10px] bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-black px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {list.length} عناوين حية
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-[var(--text-muted)] truncate">
            {isPlaying
              ? `قراءة (${activeHeadlineIdx + 1}/${list.length}): ${list[activeHeadlineIdx]}`
              : "استمع لأبرز عناوين الساعة الموثقة في قاعدة البيانات بنقرة واحدة."}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between md:justify-end gap-3 shrink-0">
        {isPlaying && (
          <div className="flex items-end gap-1 h-5 px-2">
            <span className="w-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:0ms] h-3" />
            <span className="w-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:150ms] h-5" />
            <span className="w-1 bg-teal-400 rounded-full animate-bounce [animation-delay:300ms] h-4" />
            <span className="w-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:75ms] h-2" />
          </div>
        )}

        <div className="flex items-center gap-1 bg-[var(--bg)] dark:bg-black/40 border border-[var(--border)] dark:border-white/10 rounded-xl p-1 text-[10px] font-mono">
          <Gauge className="w-3 h-3 text-emerald-500 mx-1" />
          {[0.9, 1.0, 1.2].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleSpeedChange(r)}
              className={`px-2 py-0.5 rounded-lg font-bold transition-colors cursor-pointer ${
                speed === r
                  ? "bg-emerald-600 text-white"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {r}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
