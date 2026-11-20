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
  BookOpen,
  Filter,
  Eye,
  Calendar,
} from "lucide-react";
import { STORY_CLUSTERS, STORIES_SHORTS, StoryCard, StoryClusterItem } from "@/data/storiesShorts";

export default function StoriesPage() {
  const [activeTab, setActiveTab] = useState<"clusters" | "shorts">("clusters");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [expandedClusterId, setExpandedClusterId] = useState<string>(STORY_CLUSTERS[0]?.id || "");

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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-24 selection:bg-[var(--gold)]/30">
      {/* 1. الترويسة الرئيسية */}
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--primary)]/10 via-[var(--surface)] to-[var(--bg)] py-12 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--gold)]/15 via-transparent to-transparent pointer-events-none" />

        <div className="container-custom max-w-6xl mx-auto px-4 relative z-10 space-y-4 text-center md:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-bold shadow-sm">
            <GitBranch className="w-4 h-4" />
            <span>محرك التجميع الذكي ورسم الخط الزمني للحدث (Multi-Source Clusters)</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-[var(--text)] tracking-tight">
            تجمعات القصص والخط الزمني المقارن
          </h1>

          <p className="text-sm md:text-base text-[var(--text-muted)] max-w-3xl leading-relaxed">
            منظومة ذكية تجمع تغطيات الحدث الواحد من كافة الوكالات والمصادر الميدانية المعتمدة، لترسم خريطة زمنية ومقارنة دقيقة تمنع التكرار وتقدم لك الحقيقة الكاملة من كل الزوايا.
          </p>

          {/* محول الأنماط (تجمعات الأحداث vs قصص ريلز سريعة) */}
          <div className="pt-2 flex justify-center md:justify-start">
            <div className="inline-flex p-1.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm">
              <button
                onClick={() => setActiveTab("clusters")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "clusters"
                    ? "bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] font-black shadow-md"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>تجمعات القصص والخط الزمني ({STORY_CLUSTERS.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("shorts")}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === "shorts"
                    ? "bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] font-black shadow-md"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>الموجزات البصرية (Reels) ({shorts.length})</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom max-w-6xl mx-auto px-4 py-8 space-y-10">
        {/* ========================================================================= */}
        {/* النمط الأول: تجمعات القصص والخط الزمني المقارن */}
        {/* ========================================================================= */}
        {activeTab === "clusters" && (
          <div className="space-y-8 animate-fade-in">
            {STORY_CLUSTERS.map((cluster) => {
              const isExpanded = expandedClusterId === cluster.id;
              return (
                <div
                  key={cluster.id}
                  className={`rounded-3xl border transition-all overflow-hidden ${
                    isExpanded
                      ? "border-[var(--gold)] bg-[var(--surface)] shadow-xl"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-white/30"
                  }`}
                >
                  {/* رأس التجمع */}
                  <div
                    onClick={() => setExpandedClusterId(isExpanded ? "" : cluster.id)}
                    className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                  >
                    <div className="space-y-3 max-w-3xl">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-3 py-1 rounded-full bg-[var(--primary-light)] text-[var(--primary)] font-bold">
                          {cluster.category}
                        </span>
                        <span className="text-[var(--text-muted)] font-mono">{cluster.lastUpdated}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20">
                          {cluster.sourcesCount} وكالات متطابقة
                        </span>
                      </div>

                      <h2 className="text-xl md:text-2xl font-black text-[var(--text)] leading-snug">
                        {cluster.headline}
                      </h2>

                      <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                        {cluster.summary}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-3">
                      <div className="text-center p-3 rounded-2xl bg-[var(--bg)] border border-[var(--border)]">
                        <span className="text-xl font-black text-[var(--gold)] block">{cluster.importance}%</span>
                        <span className="text-[10px] text-[var(--text-muted)] font-bold">مؤشر الأهمية</span>
                      </div>
                      <button className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text)]">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* الجزء التفاعلي الممتد: الخط الزمني ومقارنة الوكالات */}
                  {isExpanded && (
                    <div className="p-6 md:p-8 pt-0 border-t border-[var(--border)] bg-[var(--bg)]/40 space-y-8 animate-fade-in">
                      {/* 1. الخط الزمني المتسلسل للأحداث */}
                      <div className="space-y-4 pt-6">
                        <h3 className="font-black text-sm text-[var(--text)] flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[var(--gold)]" />
                          <span>الخط الزمني الموثق لتسلسل الأحداث:</span>
                        </h3>

                        <div className="relative ps-6 border-s-2 border-[var(--gold)]/40 space-y-4">
                          {cluster.timeline.map((item, tIdx) => (
                            <div key={tIdx} className="relative group">
                              <span className="absolute -start-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[var(--gold)] border-4 border-[var(--surface)] shadow" />
                              <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="font-mono font-bold text-[var(--primary)]">{item.time}</span>
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg)] font-bold text-[var(--text-muted)]">
                                    المصدر: {item.source}
                                  </span>
                                </div>
                                <p className="text-xs text-[var(--text)] font-semibold leading-relaxed">
                                  {item.event}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 2. جدول مقارنة روايات المصادر والوكالات */}
                      <div className="space-y-3">
                        <h3 className="font-black text-sm text-[var(--text)] flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-[var(--primary)]" />
                          <span>روايات وعناوين الوكالات المشتركة في التغطية:</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {cluster.sources.map((src, sIdx) => (
                            <a
                              key={sIdx}
                              href={src.url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)] transition-all flex items-start justify-between gap-3 group"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-xs text-[var(--primary)]">{src.name}</span>
                                  <span className="font-mono text-[10px] text-[var(--text-muted)]">{src.time}</span>
                                </div>
                                <h4 className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--gold)] transition-colors">
                                  {src.headline}
                                </h4>
                              </div>
                              <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--gold)] shrink-0 mt-1" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ========================================================================= */}
        {/* النمط الثاني: الموجزات البصرية السريعة (Story Reels) */}
        {/* ========================================================================= */}
        {activeTab === "shorts" && currentShort && (
          <div className="max-w-md mx-auto space-y-4 animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-black text-white h-[580px] flex flex-col justify-between p-6 select-none">
              <img
                src={currentShort.image}
                alt={currentShort.headline}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />

              {/* شريط المؤشر العلوي لعدد القصص */}
              <div className="relative z-10 space-y-3">
                <div className="flex gap-1">
                  {shorts.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        idx === currentIndex ? "bg-[var(--gold)]" : idx < currentIndex ? "bg-white" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md font-bold">
                    {currentShort.category}
                  </span>
                  <span className="font-mono text-white/70">{currentShort.timestamp}</span>
                </div>
              </div>

              {/* متن القصة ونقاط الإيجاز */}
              <div className="relative z-10 space-y-4">
                {currentShort.statNumber && (
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 w-fit">
                    <span className="text-2xl font-black text-[var(--gold)] block font-mono">
                      {currentShort.statNumber}
                    </span>
                    <span className="text-[11px] text-white/80 font-bold">{currentShort.statLabel}</span>
                  </div>
                )}

                <h2 className="text-lg md:text-xl font-black text-white leading-snug">
                  {currentShort.headline}
                </h2>

                <ul className="space-y-1.5 text-xs text-white/90">
                  {currentShort.summaryBullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs text-white/70">
                  <span>المصدر: <strong>{currentShort.sourceName}</strong></span>
                  <button
                    onClick={() => handleShare(currentShort.headline)}
                    className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* أزرار التنقل بين القصص السريعة */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handlePrev}
                className="flex-1 py-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-xs font-bold hover:border-[var(--gold)] transition-colors text-center cursor-pointer"
              >
                ← القصة السابقة
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-2xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors text-center cursor-pointer shadow-md"
              >
                القصة التالية →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
