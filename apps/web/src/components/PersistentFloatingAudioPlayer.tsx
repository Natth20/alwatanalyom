"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Volume2, Play, Pause, SkipForward, X, Radio } from "lucide-react";

interface BriefItem {
  id: string;
  titleAr: string;
}

export function PersistentFloatingAudioPlayer() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [items, setItems] = useState<BriefItem[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    fetch("/api/v1/pulse")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.latestTopics)) {
          setItems(
            data.latestTopics.slice(0, 6).map((t: any) => ({
              id: String(t.id),
              titleAr: String(t.titleAr),
            }))
          );
        }
      })
      .catch(() => {});
  }, [pathname]);

  const stopSpeech = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  }, []);

  const speakAt = useCallback(
    (index: number) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window) || items.length === 0) {
        return;
      }
      const safeIdx = index % items.length;
      const item = items[safeIdx];
      if (!item) return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `من منصة الوطن اليوم: ${item.titleAr}`
      );
      utterance.lang = "ar-SA";
      utterance.rate = 1.0;
      utterance.onend = () => {
        if (safeIdx + 1 < items.length) {
          setCurrentIdx(safeIdx + 1);
          speakAt(safeIdx + 1);
        } else {
          setIsPlaying(false);
        }
      };
      utterance.onerror = () => setIsPlaying(false);

      setCurrentIdx(safeIdx);
      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    },
    [items]
  );

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (pathname?.startsWith("/admin") || items.length === 0) {
    return null;
  }

  const currentItem = items[currentIdx] || items[0]!;

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="hidden md:flex fixed bottom-5 end-5 z-40 items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#590018] to-[#3B0010] border border-[var(--gold)]/40 text-white text-xs font-black shadow-2xl hover:border-[var(--gold)] hover:scale-105 transition-all cursor-pointer"
        title="استمع للموجز الإخباري الصوتي المباشر"
      >
        <Radio className="w-4 h-4 text-[var(--gold)] animate-pulse" />
        <span>الموجز الصوتي الحي</span>
      </button>
    );
  }

  return (
    <div className="hidden md:flex fixed bottom-5 end-5 z-40 w-80 rounded-2xl bg-[#180208]/95 border border-[var(--gold)]/40 text-white p-3.5 shadow-2xl backdrop-blur-xl flex-col gap-2.5">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="text-[11px] font-black text-[var(--gold)] flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5" />
          <span>نشرة الوطن الصوتية ({currentIdx + 1}/{items.length})</span>
        </span>
        <button
          type="button"
          onClick={() => {
            stopSpeech();
            setIsOpen(false);
          }}
          className="text-white/50 hover:text-white cursor-pointer"
          aria-label="إغلاق المشغل الصوتي"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-xs font-bold leading-snug line-clamp-2 text-stone-100">
        {currentItem.titleAr}
      </p>

      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => (isPlaying ? stopSpeech() : speakAt(currentIdx))}
            className="w-8 h-8 rounded-full bg-[var(--gold)] text-[#140106] flex items-center justify-center hover:brightness-110 transition-all cursor-pointer"
            aria-label={isPlaying ? "إيقاف القراءة" : "تشغيل القراءة"}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ms-0.5" />}
          </button>
          <button
            type="button"
            onClick={() => speakAt((currentIdx + 1) % items.length)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="الخبر التالي"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        <span className="text-[10px] text-white/60">
          {isPlaying ? "جاري الإذاعة الآن..." : "اضغط للاستماع الآلي"}
        </span>
      </div>
    </div>
  );
}
