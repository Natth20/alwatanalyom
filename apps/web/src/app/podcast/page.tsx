"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Share2,
  Clock,
  Sparkles,
  Radio,
  Download,
  Users2,
  Check,
} from "lucide-react";
import { PODCAST_EPISODES, PodcastEpisode, PodcastDialogueLine } from "@/data/podcast";

export default function PodcastPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLineIdx, setActiveLineIdx] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  const episode = PODCAST_EPISODES[0];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setActiveLineIdx((prev) => {
          if (prev + 1 < episode.dialogue.length) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return 0;
          }
        });
      }, 5000 / playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, playbackSpeed, episode.dialogue.length]);

  const togglePlay = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      if (!isPlaying) {
        window.speechSynthesis.cancel();
        const currentLine = episode.dialogue[activeLineIdx];
        const utterance = new SpeechSynthesisUtterance(currentLine.text);
        utterance.lang = "ar-SA";
        utterance.rate = currentLine.speaker.includes("نور") ? 1.05 * playbackSpeed : 0.95 * playbackSpeed;
        utterance.pitch = currentLine.speaker.includes("نور") ? 1.2 : 0.85;
        window.speechSynthesis.speak(utterance);
      } else {
        window.speechSynthesis.cancel();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setActiveLineIdx(0);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `استمع إلى بودكاست «الوطن اليوم»: ${episode.title} — ${window.location.href}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container-custom py-8 max-w-4xl">
      {/* Header */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 mb-8 text-center relative overflow-hidden shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[var(--bg)] border border-[var(--border)] text-[var(--primary)] mb-3">
          <Headphones className="w-3.5 h-3.5 text-indigo-500" />
          استوديو الوطن الصوتي · بودكاست الحوار الثنائي
        </div>
        <h1 className="text-2xl md:text-4xl font-black mb-3">
          بودكاست «حوار الوطن»
        </h1>
        <p className="text-sm md:text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
          حوار يومي مركز في 4 دقائق بين مذيعي الاستوديو الافتراضي (نور وأحمد)، يحلل ما وراء أخبار اليوم بعيداً عن صخب الشائعات.
        </p>

        {/* Hosts Visual Badges */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="w-8 h-8 rounded-full bg-pink-500/10 text-pink-600 flex items-center justify-center text-sm border border-pink-500/30">
              👩‍💼
            </span>
            <div className="text-right">
              <span className="block text-[var(--text)]">نور الحامد</span>
              <span className="text-[10px] text-[var(--text-muted)]">تقديم وتحقيق</span>
            </div>
          </div>

          <div className="w-px h-8 bg-[var(--border)]" />

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center text-sm border border-blue-500/30">
              👨‍💼
            </span>
            <div className="text-right">
              <span className="block text-[var(--text)]">أحمد النجار</span>
              <span className="text-[10px] text-[var(--text-muted)]">تحليل استراتيجي</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Player Card */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <img
            src={episode.coverImage}
            alt={episode.title}
            className="w-32 h-32 rounded-2xl object-cover shadow-md shrink-0"
          />
          <div className="flex-1 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[var(--primary)] mb-1">
              <Radio className="w-3.5 h-3.5 animate-pulse text-red-500" />
              <span>{episode.category} · {episode.date}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[var(--text)] mb-2">
              {episode.title}
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
              {episode.subtitle}
            </p>
          </div>
        </div>

        {/* Audio Player Controls */}
        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-3.5 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white shadow-md transition-all cursor-pointer flex items-center justify-center"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 rtl:translate-x-[-1px]" />}
            </button>
            <button
              onClick={handleRestart}
              className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:text-[var(--primary)] transition-colors cursor-pointer text-[var(--text-muted)]"
              title="إعادة من البداية"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Dynamic Waveform Visualizer */}
          <div className="flex items-center gap-1 h-8 flex-1 max-w-xs justify-center">
            {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75].map((h, i) => (
              <span
                key={i}
                style={{ height: isPlaying ? `${h}%` : "20%" }}
                className={`w-1 rounded-full transition-all duration-300 ${
                  isPlaying ? "bg-[var(--primary)]" : "bg-[var(--border)]"
                }`}
              />
            ))}
          </div>

          {/* Speed & Share */}
          <div className="flex items-center gap-2 text-xs font-bold">
            <button
              onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.25 : s === 1.25 ? 1.5 : 1))}
              className="px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--primary)] transition-colors cursor-pointer"
            >
              {playbackSpeed}x السرعة
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
              title="مشاركة الحلقة"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Live Dialogue Transcript */}
        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-black text-[var(--text)] flex items-center gap-2 pb-2 border-b border-[var(--border)]">
            <Users2 className="w-4 h-4 text-[var(--primary)]" />
            النص الحواري المتزامن للحلقة
          </h3>

          <div className="space-y-3">
            {episode.dialogue.map((line, idx) => {
              const isActive = idx === activeLineIdx;
              const isFemale = line.speaker.includes("نور");

              return (
                <div
                  key={idx}
                  onClick={() => setActiveLineIdx(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isActive
                      ? "bg-[var(--bg)] border-[var(--primary)] shadow-sm scale-[1.01]"
                      : "bg-[var(--surface)] border-[var(--border)] opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className="text-2xl shrink-0 mt-0.5">{line.avatar}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        className={`text-xs font-black ${
                          isFemale ? "text-pink-600 dark:text-pink-400" : "text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {line.speaker}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono">
                        {line.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text)] leading-relaxed font-medium">
                      {line.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
