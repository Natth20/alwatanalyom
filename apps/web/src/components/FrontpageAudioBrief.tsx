"use client";

import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

interface Props {
  headlines: string[];
}

export function FrontpageAudioBrief({ headlines }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [list, setList] = useState<string[]>(headlines || []);

  useEffect(() => {
    if (headlines && headlines.length > 0) {
      setList(headlines);
      return;
    }
    fetch("/api/v1/pulse")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.latestTopics)) {
          setList(data.latestTopics.slice(0, 5).map((t: any) => String(t.titleAr)));
        }
      })
      .catch(() => {});
  }, [headlines]);

  if (list.length === 0) return null;

  const handleToggle = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead =
      "أهلاً بكم في الموجز الإخباري الصوتي المباشر من منصة الوطن اليوم. " + list.join(" ... ");
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = "ar-SA";
    utterance.rate = 1.0;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  return (
    <div className="relative rounded-2xl border border-emerald-500/25 bg-gradient-to-r from-emerald-950/20 via-[var(--surface-elevated)] to-[var(--surface)] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 flex items-center gap-3">
        <button
          type="button"
          onClick={handleToggle}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shrink-0 shadow-lg cursor-pointer ${
            isPlaying
              ? "bg-rose-600 text-white animate-pulse"
              : "bg-gradient-to-br from-emerald-600 to-teal-700 text-white hover:from-emerald-500 hover:to-teal-600 border border-emerald-400/30"
          }`}
          aria-label={isPlaying ? "إيقاف الموجز" : "استمع لموجز العناوين"}
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ms-0.5" />}
        </button>

        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-black text-[var(--text)]">
              الموجز الصوتي الحي لعناوين الصفحة الأولى
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
              {list.length} عناوين حية
            </span>
          </div>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
            {isPlaying
              ? "يتم الآن قراءة أبرز العناوين المنشورة آلياً..."
              : "استمع لأبرز عناوين الساعة الموثقة في قاعدة البيانات بنقرة واحدة."}
          </p>
        </div>
      </div>

      {isPlaying && (
        <div className="relative z-10 flex items-end gap-1 h-5 pe-2">
          <span className="w-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:0ms] h-3" />
          <span className="w-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:150ms] h-5" />
          <span className="w-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:300ms] h-4" />
          <span className="w-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:75ms] h-2" />
        </div>
      )}
    </div>
  );
}
