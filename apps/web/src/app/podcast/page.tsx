"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Share2,
  Clock,
  Sparkles,
  Radio,
  Download,
  Users2,
  Check,
  AlertCircle,
  Mic,
  Disc3,
  Sliders,
  ChevronLeft,
  Calendar,
} from "lucide-react";
import { PODCAST_EPISODES, PodcastEpisode, PodcastDialogueLine } from "@/data/podcast";

export default function PodcastPage() {
  const [selectedEpIndex, setSelectedEpIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLineIdx, setActiveLineIdx] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  // حلقة إضافية اقتصادية وموجز صباحي لثراء المحتوى
  const extendedEpisodes: PodcastEpisode[] = [
    ...PODCAST_EPISODES,
    {
      id: "ep-2",
      title: "موجز الوطن الصباحي · قفزة الذهب وتحركات الدولار والأسواق",
      subtitle: "إيجاز اقتصادي صوتي مدته 3 دقائق يحلل أسعار المعادن والعملات وتوقعات الأسواق",
      durationMinutes: 3,
      date: "اليوم · 20 نوفمبر 2026",
      category: "موجز اقتصادي وتحليلي",
      coverImage: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80",
      dialogue: [
        {
          speaker: "نور (المذيعة)",
          speakerRole: "تقديم وتحقيق",
          avatar: "👩‍💼",
          text: "صباح الخير من غرفة أخبار «الوطن اليوم». نلخص لكم في هذا الموجز السريع أهم تحركات أسواق المال والذهب والمعادن الثمينة لليوم.",
          timestamp: "00:10",
        },
        {
          speaker: "أحمد (المحلل)",
          speakerRole: "تحليل سياسي واستراتيجي",
          avatar: "👨‍💼",
          text: "الذهب يسجل رقماً قياسياً جديداً فوق 2740 دولار للأونصة متأثراً بالتوترات الجيوسياسية وخفض الفائدة. أما في السوق المحلي فاستقر الدولار مقابل الشيكل عند 3.72.",
          timestamp: "00:45",
        },
        {
          speaker: "نور (المذيعة)",
          speakerRole: "تقديم وتحقيق",
          avatar: "👩‍💼",
          text: "شكراً أحمد، وننبه دائماً إلى أن تفاصيل الأسعار اللحظية متوفرة في قسم الوطن الاقتصادي على مدار الساعة.",
          timestamp: "01:20",
        },
      ],
    },
  ];

  const episode = extendedEpisodes[selectedEpIndex] || extendedEpisodes[0];

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
        if (currentLine) {
          const utterance = new SpeechSynthesisUtterance(currentLine.text);
          utterance.lang = "ar-SA";
          utterance.rate = currentLine.speaker.includes("نور") ? 1.05 * playbackSpeed : 0.95 * playbackSpeed;
          utterance.pitch = currentLine.speaker.includes("نور") ? 1.2 : 0.85;
          window.speechSynthesis.speak(utterance);
        }
      } else {
        window.speechSynthesis.cancel();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-24 selection:bg-[var(--gold)]/30">
      {/* 1. الترويسة الرئيسية للاستوديو الصوتي */}
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[#1c0008]/20 via-[var(--surface)] to-[var(--bg)] py-12 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--maroon)]/15 via-transparent to-transparent pointer-events-none" />

        <div className="container-custom max-w-5xl mx-auto px-4 relative z-10 space-y-4 text-center md:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-bold shadow-sm">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>استوديو الصوتيات والبودكاست الإخباري المباشر 2026</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-[var(--text)] tracking-tight">
            استوديو البودكاست وموجز الوطن الصوتي
          </h1>

          <p className="text-sm md:text-base text-[var(--text-muted)] max-w-3xl leading-relaxed">
            استمع لأدق التحليلات والحوارات الصحفية الميدانية، والموجزات الإخبارية الصباحية والمسائية بصوت نخبة من مذيعي ومحللي «الوطن اليوم».
          </p>
        </div>
      </div>

      <div className="container-custom max-w-5xl mx-auto px-4 py-8 space-y-10">
        {/* 2. استوديو البث الصوتي التفاعلي الفاخر (Audio Station HUD) */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#1c020b] via-[#120106] to-[#0a0004] p-6 md:p-10 shadow-2xl text-white relative overflow-hidden">
          {/* إضاءة خلفية دائرية متوهجة */}
          <div className="absolute top-0 end-0 w-80 h-80 bg-[var(--gold)]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* أسطوانة وصورة البودكاست مع تأثير الدوران */}
            <div className="md:col-span-4 flex flex-col items-center justify-center space-y-4">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-2xl border border-white/20 group">
                <img
                  src={episode.coverImage}
                  alt={episode.title}
                  className={`w-full h-full object-cover transition-transform duration-1000 ${isPlaying ? 'scale-105' : ''}`}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`}>
                    <Disc3 className="w-8 h-8 text-[var(--gold)]" />
                  </div>
                </div>
              </div>

              <span className="text-[11px] text-[var(--gold)] font-bold tracking-wide">
                {episode.category} · {episode.durationMinutes} دقائق
              </span>
            </div>

            {/* تفاصيل الحلقة وأدوات التحكم ومحلل الترددات */}
            <div className="md:col-span-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs text-white/50 block font-mono">{episode.date}</span>
                <h2 className="text-xl md:text-2xl font-black text-white leading-snug">
                  {episode.title}
                </h2>
                <p className="text-xs text-white/70 leading-relaxed">
                  {episode.subtitle}
                </p>
              </div>

              {/* محلل الترددات الصوتية التفاعلي (Live Spectrum Visualizer) */}
              <div className="p-4 rounded-2xl border border-white/10 bg-black/40 space-y-2">
                <div className="flex items-center justify-between text-[11px] text-white/50">
                  <span className="flex items-center gap-1.5 text-[var(--gold)] font-bold">
                    <Mic className="w-3.5 h-3.5" />
                    <span>محلل الترددات الصوتية الحي (Spectrum)</span>
                  </span>
                  <span className="font-mono text-emerald-400">48 kHz · High Fidelity</span>
                </div>

                <div className="flex items-end justify-between h-12 gap-1 px-1">
                  {Array.from({ length: 32 }).map((_, i) => {
                    const randomH = isPlaying ? Math.floor(Math.sin(i + activeLineIdx) * 35 + 50) : 12;
                    return (
                      <div
                        key={i}
                        className={`w-full rounded-full transition-all duration-200 ${
                          i % 2 === 0 ? "bg-[var(--gold)]" : "bg-red-500"
                        }`}
                        style={{ height: `${randomH}%` }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* أزرار التحكم بالتشغيل والسرعة */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] font-black text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[var(--gold-glow)] flex items-center gap-2 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isPlaying ? "إيقاف مؤقت" : "تشغيل البودكاست"}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (typeof window !== "undefined" && "speechSynthesis" in window) {
                        window.speechSynthesis.cancel();
                      }
                      setActiveLineIdx(0);
                      setIsPlaying(false);
                    }}
                    className="p-3 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                    title="إعادة من البداية"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* خيارات السرعة والمشاركة */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10 text-xs">
                    {[1, 1.25, 1.5].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setPlaybackSpeed(spd)}
                        className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-all cursor-pointer ${
                          playbackSpeed === spd ? "bg-[var(--gold)] text-[#140106]" : "text-white/60 hover:text-white"
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                    title="مشاركة الحلقة"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. شاشة الحوار التحريري الثنائي المتزامن مع الصوت (Live Dialogue Transcript) */}
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Users2 className="w-5 h-5 text-[var(--primary)]" />
              <h3 className="font-black text-base text-[var(--text)]">
                النص الحواري التفاعلي (Interactive Live Transcript)
              </h3>
            </div>
            <span className="text-[11px] text-[var(--text-muted)]">
              انقر على أي جملة للاستماع إليها مباشرة
            </span>
          </div>

          <div className="space-y-3">
            {episode.dialogue.map((line, idx) => {
              const isCurrent = activeLineIdx === idx;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveLineIdx(idx);
                    if (!isPlaying) togglePlay();
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 items-start ${
                    isCurrent
                      ? "border-[var(--gold)] bg-[var(--gold)]/10 shadow-md scale-[1.01]"
                      : "border-[var(--border)] bg-[var(--bg)]/50 hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-lg shrink-0 shadow-2xs">
                    {line.avatar}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[var(--text)]">{line.speaker}</span>
                        <span className="text-[10px] text-[var(--text-muted)]">({line.speakerRole})</span>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--text-muted)]">{line.timestamp}</span>
                    </div>

                    <p className={`text-xs md:text-sm leading-relaxed ${isCurrent ? "font-bold text-[var(--text)]" : "text-[var(--text-muted)]"}`}>
                      {line.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. مكتبة الحلقات الصوتية الأخرى */}
        <div className="space-y-4">
          <h3 className="font-black text-lg text-[var(--text)]">كافة حلقات الاستوديو الإخباري</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {extendedEpisodes.map((ep, idx) => (
              <div
                key={ep.id}
                onClick={() => {
                  setSelectedEpIndex(idx);
                  setActiveLineIdx(0);
                  setIsPlaying(false);
                  window.scrollTo({ top: 120, behavior: "smooth" });
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex gap-4 items-center ${
                  selectedEpIndex === idx
                    ? "border-[var(--primary)] bg-[var(--primary)]/5 shadow-md"
                    : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)]"
                }`}
              >
                <img
                  src={ep.coverImage}
                  alt={ep.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="space-y-1 flex-1">
                  <span className="text-[10px] font-bold text-[var(--gold)]">{ep.category}</span>
                  <h4 className="font-bold text-xs md:text-sm text-[var(--text)] line-clamp-2 leading-snug">
                    {ep.title}
                  </h4>
                  <span className="text-[11px] text-[var(--text-muted)] block font-mono">{ep.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
