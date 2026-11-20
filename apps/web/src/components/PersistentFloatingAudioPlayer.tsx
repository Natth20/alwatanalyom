"use client";

import { useState } from "react";
import { Radio, Play, Pause, Volume2, VolumeX, Minimize2, Maximize2, Sparkles, ChevronUp, ChevronDown } from "lucide-react";

export function PersistentFloatingAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [station, setStation] = useState<"live-radio" | "audio-brief">("live-radio");
  const [playbackSpeed, setPlaybackSpeed] = useState<"1x" | "1.25x" | "1.5x">("1x");

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleSpeed = () => {
    if (playbackSpeed === "1x") setPlaybackSpeed("1.25x");
    else if (playbackSpeed === "1.25x") setPlaybackSpeed("1.5x");
    else setPlaybackSpeed("1x");
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 end-4 sm:end-6 z-40 no-print">
      {/* 1. المشغل في وضع التصغير (Pill Badge) */}
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-hud text-white border border-[var(--gold)]/40 hover:border-[var(--gold)] shadow-xl cursor-pointer hover:scale-105 transition-all group"
          title="فتح إذاعة صوت الوطن والموجز الصوتي"
        >
          <div className="relative flex items-center justify-center">
            <Radio className="w-4 h-4 text-[var(--gold)] group-hover:rotate-12 transition-transform" />
            {isPlaying && (
              <span className="absolute -top-1 -end-1 w-2 h-2 rounded-full bg-red-500 animate-ping" />
            )}
          </div>

          <div className="flex flex-col text-start">
            <span className="text-[11px] font-black text-white group-hover:text-[var(--gold)] transition-colors">
              إذاعة صوت الوطن
            </span>
            <span className="text-[9px] text-emerald-400 font-mono">
              {isPlaying ? "بث مباشر الآن" : "انقر للاستماع"}
            </span>
          </div>

          {/* موجات صوتية مصغرة */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3.5 ps-1">
              <span className="w-0.5 bg-[var(--gold)] rounded-full wave-bar-1" />
              <span className="w-0.5 bg-[var(--gold)] rounded-full wave-bar-2" />
              <span className="w-0.5 bg-[var(--gold)] rounded-full wave-bar-3" />
              <span className="w-0.5 bg-[var(--gold)] rounded-full wave-bar-4" />
            </div>
          )}

          <ChevronUp className="w-3.5 h-3.5 text-white/50" />
        </button>
      ) : (
        /* 2. المشغل الموسع (Expanded Floating Audio Dock) */
        <div className="w-72 sm:w-80 rounded-3xl glass-hud p-4 text-white border border-[var(--gold)]/40 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* الترويسة وأزرار التحكم بالنافذة */}
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-xs font-black text-[var(--gold)]">
                الاستوديو الإذاعي الرقمي
              </span>
            </div>

            <button
              onClick={() => setIsMinimized(true)}
              className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              title="تصغير المشغل"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* تبديل القناة: الراديو الحي أو الموجز الذكي */}
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10 mb-3 text-xs font-bold">
            <button
              onClick={() => setStation("live-radio")}
              className={`py-1.5 rounded-xl transition-all ${
                station === "live-radio"
                  ? "bg-gradient-to-r from-[#590018] to-[#730020] text-[var(--gold)] shadow-xs"
                  : "text-white/60 hover:text-white"
              }`}
            >
              إذاعة الوطن 24/7
            </button>

            <button
              onClick={() => setStation("audio-brief")}
              className={`py-1.5 rounded-xl transition-all ${
                station === "audio-brief"
                  ? "bg-gradient-to-r from-[#590018] to-[#730020] text-[var(--gold)] shadow-xs"
                  : "text-white/60 hover:text-white"
              }`}
            >
              موجز الـ 60 ثانية
            </button>
          </div>

          {/* محتوى المحطة وشريط الصوت */}
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 space-y-3 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">
                  {station === "live-radio" ? "البث المباشر الميداني" : "الموجز الإخباري الذكي"}
                </p>
                <p className="text-[10px] text-white/50">
                  {station === "live-radio" ? "تغطية على مدار الساعة من غزة والقدس" : "ملخص آلي موثق من غرفة التحرير"}
                </p>
              </div>

              {/* موجات صوتية حية */}
              <div className="flex items-end gap-1 h-6">
                <span className={`w-1 bg-[var(--gold)] rounded-full ${isPlaying ? "wave-bar-1" : "h-1"}`} />
                <span className={`w-1 bg-[var(--gold)] rounded-full ${isPlaying ? "wave-bar-2" : "h-1"}`} />
                <span className={`w-1 bg-[var(--gold)] rounded-full ${isPlaying ? "wave-bar-3" : "h-1"}`} />
                <span className={`w-1 bg-[var(--gold)] rounded-full ${isPlaying ? "wave-bar-4" : "h-1"}`} />
              </div>
            </div>
          </div>

          {/* أزرار التحكم بالتشغيل والسرعة */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={toggleSpeed}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-mono text-[var(--gold)] font-bold transition-colors cursor-pointer"
              title="تغيير سرعة الصوت"
            >
              {playbackSpeed}
            </button>

            <button
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] flex items-center justify-center shadow-lg shadow-[var(--gold-glow)] hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ms-0.5" />}
            </button>

            <div className="flex items-center gap-1 text-[10px] text-white/50">
              <Volume2 className="w-3.5 h-3.5 text-white/70" />
              <span>مباشر</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
