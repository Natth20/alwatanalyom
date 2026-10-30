"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  ChevronUp,
  ChevronDown,
  Share2,
  ExternalLink,
  Clock,
  ShieldCheck,
  Check,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { STORIES_SHORTS, StoryCard } from "@/data/storiesShorts";

export default function StoriesPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const stories = STORIES_SHORTS;
  const current = stories[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `موجز سريع من «الوطن اليوم»: ${current.headline} — اقرأ المزيد: ${window.location.origin}${current.sourceUrl}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-40 bg-black flex items-center justify-center pt-16 pb-16">
      {/* Container simulating a vertical mobile story card */}
      <div className="relative w-full max-w-md h-full max-h-[780px] bg-zinc-950 rounded-2xl md:border md:border-zinc-800 overflow-hidden shadow-2xl flex flex-col justify-between text-white">
        {/* Background Image with Cinematic Dark Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={current.image}
            alt={current.headline}
            className="w-full h-full object-cover opacity-35 scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/70" />
        </div>

        {/* Top Progress Bars (Instagram/TikTok style) */}
        <div className="relative z-10 p-4 pb-2">
          <div className="flex items-center gap-1.5 mb-3">
            {stories.map((s, idx) => (
              <div
                key={s.id}
                className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden"
              >
                <div
                  className={`h-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "bg-white w-full"
                      : idx < currentIndex
                      ? "bg-white w-full"
                      : "w-0"
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span
              className={`px-3 py-1 rounded-full text-xs font-black shadow-md ${current.categoryColor}`}
            >
              {current.category}
            </span>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Clock className="w-3.5 h-3.5" />
              <span>{current.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="relative z-10 p-6 flex-1 flex flex-col justify-center space-y-4">
          {/* Key Stat Badge if present */}
          {current.statNumber && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 self-start">
              <span className="text-xl font-black text-amber-400">{current.statNumber}</span>
              <span className="text-xs text-white/80 font-medium">{current.statLabel}</span>
            </div>
          )}

          <h1 className="text-xl md:text-2xl font-black leading-snug drop-shadow-md">
            {current.headline}
          </h1>

          {/* Bullet Points */}
          <div className="space-y-2.5 pt-2">
            {current.summaryBullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-white/90">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <p className="leading-relaxed font-medium">{bullet}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs text-white/60 flex items-center gap-1 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>المصدر المعتمد: {current.sourceName}</span>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="relative z-10 p-4 border-t border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between gap-3">
          <Link
            href={current.sourceUrl}
            className="flex-1 py-3 px-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
          >
            <span>اقرأ التغطية والوثائق الكاملة</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleShare}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="مشاركة الستوري"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Vertical Navigation Floating Buttons */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-sm border border-white/10"
            title="السابق"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white transition-all cursor-pointer backdrop-blur-sm border border-white/10"
            title="التالي"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

