"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Layers,
  Sparkles,
  Clock,
  ShieldCheck,
  ChevronUp,
  ChevronDown,
  Share2,
  ExternalLink,
  Check,
  ArrowRight,
  TrendingUp,
  GitBranch,
} from "lucide-react";
import { STORY_CLUSTERS, STORIES_SHORTS, StoryCard, StoryClusterItem } from "@/data/storiesShorts";

export default function StoriesPage() {
  const [activeTab, setActiveTab] = useState<"clusters" | "shorts">("clusters");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const shorts = STORIES_SHORTS;
  const currentShort = shorts[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % shorts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + shorts.length) % shorts.length);
  };

  const handleShare = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container-custom py-8 max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[var(--bg)] border border-[var(--border)] text-[var(--primary)]">
            <Layers className="w-3.5 h-3.5" />
            الذكاء التحريري وتجميع الأحداث
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[var(--text)]">
            تجمع القصص والموجزات الإخبارية المتعددة المصادر
          </h1>
          <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
            منظومة ذكية تجمع تغطيات الحدث الواحد من مصادر متعددة وتظهر التطور الزمني والمقارن لمنع التكرار وتقديم الصورة الكاملة.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab("clusters")}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "clusters"
                ? "bg-[var(--primary)] text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>تجمع القصص (Story Clusters)</span>
          </button>
          <button
            onClick={() => setActiveTab("shorts")}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "shorts"
                ? "bg-[var(--primary)] text-white shadow-sm"
                : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>موجزات بصرية سريعة</span>
          </button>
        </div>
      </div>

      {/* View 1: Story Clusters */}
      {activeTab === "clusters" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] px-1">
            <span className="font-bold">أبرز الأحداث الجارية بتغطية متعددة المصادر ({STORY_CLUSTERS.length} ملفات نشطة)</span>
            <span>مرتبة حسب الأهمية وحداثة التحديث</span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {STORY_CLUSTERS.map((cluster) => (
              <article
                key={cluster.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm hover:border-[var(--primary)]/40 transition-all space-y-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[var(--primary)] text-white font-bold text-[11px]">
                      {cluster.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold text-[11px] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {cluster.sourcesCount} مصادر معتمدة ومطابقة
                    </span>
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    آخر تطور: {cluster.lastUpdated}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-black text-[var(--text)] mb-2">
                    {cluster.headline}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {cluster.summary}
                  </p>
                </div>

                {/* Sources Row */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[var(--text)] block">
                    المصادر المساهمة في بناء التغطية:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cluster.sources.map((src, idx) => (
                      <a
                        key={idx}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)] transition-colors flex items-center justify-between gap-2 group"
                      >
                        <div className="min-w-0">
                          <span className="text-xs font-bold block text-[var(--text)] group-hover:text-[var(--primary)] truncate">
                            {src.headline}
                          </span>
                          <span className="text-[10px] text-[var(--text-muted)]">
                            {src.name} · {src.time}
                          </span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-[var(--text-muted)] group-hover:text-[var(--primary)] shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Chronological Timeline */}
                <div className="pt-4 border-t border-[var(--border)]">
                  <span className="text-xs font-bold text-[var(--text)] flex items-center gap-1.5 mb-3">
                    <Clock className="w-3.5 h-3.5 text-[var(--primary)]" />
                    التسلسل الزمني لتطورات الحدث:
                  </span>
                  <div className="relative pr-4 border-r-2 border-[var(--border)] space-y-3 mr-2 text-xs">
                    {cluster.timeline.map((step, sIdx) => (
                      <div key={sIdx} className="relative">
                        <span className="absolute -right-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[var(--primary)]" />
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[var(--primary)]">{step.time}</span>
                          <span className="text-[var(--text)] font-semibold">{step.event}</span>
                          <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg)] px-2 py-0.5 rounded border border-[var(--border)] mr-auto">
                            المصدر: {step.source}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* View 2: Visual Shorts Card */}
      {activeTab === "shorts" && currentShort && (
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative w-full max-w-md h-[680px] bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl flex flex-col justify-between text-white">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={currentShort.image}
                alt={currentShort.headline}
                className="w-full h-full object-cover opacity-35 scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/70" />
            </div>

            {/* Top Progress Bars */}
            <div className="relative z-10 p-4 pb-2">
              <div className="flex items-center gap-1.5 mb-3">
                {shorts.map((s, idx) => (
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
                  className={`px-3 py-1 rounded-full text-xs font-black shadow-md ${currentShort.categoryColor}`}
                >
                  {currentShort.category}
                </span>
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentShort.timestamp}</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-6 flex-1 flex flex-col justify-center space-y-4">
              {currentShort.statLabel && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 self-start">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-white/90 font-bold">{currentShort.statLabel}</span>
                </div>
              )}

              <h2 className="text-xl md:text-2xl font-black leading-snug drop-shadow-md">
                {currentShort.headline}
              </h2>

              <ul className="space-y-2 text-xs md:text-sm text-white/90 leading-relaxed">
                {currentShort.summaryBullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer with Controls */}
            <div className="relative z-10 p-4 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Link
                  href={currentShort.sourceUrl}
                  className="px-3.5 py-1.5 rounded-xl bg-[var(--primary)] text-white font-bold hover:brightness-110 transition-all flex items-center gap-1.5"
                >
                  <span>التغطية الكاملة</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
                <button
                  onClick={() => handleShare(`${currentShort.headline} — الوطن اليوم`)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  title="مشاركة"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Navigation arrows */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  title="السابق"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <span className="text-white/60 font-mono text-[11px] px-1">
                  {currentIndex + 1} / {shorts.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                  title="التالي"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
