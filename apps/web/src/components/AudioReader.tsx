"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, RotateCcw, FastForward } from "lucide-react";

interface Props {
  title: string;
  summary?: string | null;
  bodyHtml?: string | null;
}

export function AudioReader({ title, summary, bodyHtml }: Props) {
  const [isSupported, setIsSupported] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // استخراج النص الصافي من المحتوى
  const getCleanText = () => {
    let clean = title + ".\n";
    if (summary) clean += summary + ".\n";
    if (bodyHtml) {
      // تفريغ وسوم HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = bodyHtml;
      clean += tempDiv.textContent || tempDiv.innerText || "";
    }
    // تنظيف المسافات الزائدة
    return clean.replace(/\s+/g, " ").trim();
  };

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);
    }
  }, []);

  // تنظيف الصوت عند مغادرة الصفحة
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isSupported) return null;

  const handlePlay = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const fullText = getCleanText();
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "ar-SA";
    utterance.rate = rate;

    // محاولة انتقاء صوت عربي إن وجد
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find((v) => v.lang.startsWith("ar"));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleRateChange = () => {
    const nextRate = rate === 1 ? 1.25 : rate === 1.25 ? 1.5 : 1;
    setRate(nextRate);
    if (isPlaying) {
      // إعادة التشغيل بالمعدل الجديد
      handleStop();
      setTimeout(handlePlay, 100);
    }
  };

  return (
    <div
      aria-label="القارئ الصوتي الذكي للخبر"
      className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-3 text-xs"
    >
      <div className="flex items-center gap-2.5">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-all ${
            isPlaying
              ? "bg-emerald-600 text-white animate-pulse"
              : "bg-[var(--primary)]/10 text-[var(--primary)]"
          }`}
        >
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-70" />}
        </div>
        <div>
          <span className="font-bold text-[var(--text)] block leading-tight">
            الاستماع الصوتي للخبر
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">
            {isPlaying ? "جاري القراءة بصوت عربي..." : isPaused ? "القراءة متوقفة مؤقتاً" : "استمع للملخص والتقرير كاملاً"}
          </span>
        </div>
      </div>

      {/* عناصر التحكم التفاعلية */}
      <div className="flex items-center gap-1.5">
        {/* مؤشر الموجة الصوتية التفاعلية */}
        {isPlaying && (
          <div className="flex items-center gap-0.5 me-2 h-4 px-1" aria-hidden="true">
            <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-3" />
            <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-4 [animation-delay:0.15s]" />
            <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-2 [animation-delay:0.3s]" />
          </div>
        )}

        <button
          onClick={handleRateChange}
          title="تغيير سرعة القراءة"
          className="px-2 py-1 rounded-md border border-[var(--border)] hover:border-[var(--primary)] text-[11px] font-mono font-bold transition-colors text-[var(--text)]"
        >
          {rate}x
        </button>

        {!isPlaying ? (
          <button
            onClick={handlePlay}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold transition-colors shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isPaused ? "متابعة" : "تشغيل"}</span>
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold transition-colors"
          >
            <Pause className="w-3.5 h-3.5 fill-current" />
            <span>إيقاف مؤقت</span>
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button
            onClick={handleStop}
            title="إعادة تعيين القراءة"
            className="p-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
