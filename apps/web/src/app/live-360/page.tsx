"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Radio,
  Eye,
  Clock,
  MapPin,
  Globe2,
  HeartHandshake,
  ShieldCheck,
  Share2,
  Volume2,
  Layers,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { LIVE_360_EVENT, PerspectiveUpdate } from "@/data/live360";

export default function Live360Page() {
  const [activeTab, setActiveTab] = useState<"all" | "field" | "geopolitical" | "humanitarian">("all");

  const ev = LIVE_360_EVENT;

  return (
    <div className="container-custom py-6 max-w-7xl">
      {/* Hero Live Header */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 mb-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white animate-pulse">
              <Radio className="w-3.5 h-3.5" />
              تغطية حية متزامنة 360°
            </span>
            <span className="text-xs text-[var(--text-muted)] font-bold flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {ev.activeViewers.toLocaleString()} يتابعون الآن
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <Clock className="w-3.5 h-3.5" />
            <span>آخر تحديث: {ev.lastUpdate}</span>
          </div>
        </div>

        <h1 className="text-xl md:text-3xl font-black text-[var(--text)] mb-3 leading-snug">
          {ev.title}
        </h1>

        <p className="text-sm md:text-base text-[var(--text)] leading-relaxed max-w-3xl">
          {ev.summary}
        </p>

        {/* View Switcher for mobile & preference */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === "all"
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
              }`}
            >
              <Layers className="w-3.5 h-3.5 inline ml-1.5" />
              العرض الثلاثي الشامل
            </button>
            <button
              onClick={() => setActiveTab("field")}
              className={`px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === "field"
                  ? "bg-red-600 text-white"
                  : "bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 inline ml-1.5 text-red-500" />
              نبض الميدان والمحاور ({ev.fieldPerspective.length})
            </button>
            <button
              onClick={() => setActiveTab("geopolitical")}
              className={`px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === "geopolitical"
                  ? "bg-indigo-600 text-white"
                  : "bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
              }`}
            >
              <Globe2 className="w-3.5 h-3.5 inline ml-1.5 text-indigo-500" />
              التحرك السياسي والدولي ({ev.geopoliticalPerspective.length})
            </button>
            <button
              onClick={() => setActiveTab("humanitarian")}
              className={`px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer ${
                activeTab === "humanitarian"
                  ? "bg-emerald-600 text-white"
                  : "bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 inline ml-1.5 text-emerald-500" />
              شريان الإغاثة والصحة ({ev.humanitarianPerspective.length})
            </button>
          </div>

          <Link
            href="/live"
            className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
          >
            الانتقال لغرفة متابعة الميدان
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>

      {/* 360 Grid Columns */}
      <div
        className={`grid gap-6 ${
          activeTab === "all" ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1 max-w-4xl mx-auto"
        }`}
      >
        {/* Column 1: Field Perspective */}
        {(activeTab === "all" || activeTab === "field") && (
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm flex flex-col">
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-red-500/20">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-500/10 text-red-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black text-[var(--text)]">زاوية الميدان والمصادر المحلية</h2>
                  <span className="text-[11px] text-[var(--text-muted)]">رصد مباشر من الأرض والمراسلين</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-red-600">
                مباشر
              </span>
            </div>

            <div className="space-y-4 flex-1">
              {ev.fieldPerspective.map((item) => (
                <article
                  key={item.id}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-red-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                    <span className="font-bold text-red-600 dark:text-red-400">{item.timestamp}</span>
                    {item.keyMetric && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-600 border border-red-500/20">
                        {item.keyMetric}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-black text-[var(--text)] mb-2 leading-snug">
                    {item.headline}
                  </h3>
                  <p className="text-xs text-[var(--text)] leading-relaxed mb-3">
                    {item.body}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-2 border-t border-[var(--border)]">
                    <span className="font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      المصدر: {item.source}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Column 2: Geopolitical Perspective */}
        {(activeTab === "all" || activeTab === "geopolitical") && (
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm flex flex-col">
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-indigo-500/20">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black text-[var(--text)]">زاوية التحليل الجيوسياسي</h2>
                  <span className="text-[11px] text-[var(--text-muted)]">حراك العواصم ومجلس الأمن</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-600">
                دبلوماسي
              </span>
            </div>

            <div className="space-y-4 flex-1">
              {ev.geopoliticalPerspective.map((item) => (
                <article
                  key={item.id}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-indigo-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{item.timestamp}</span>
                    {item.keyMetric && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-600 border border-indigo-500/20">
                        {item.keyMetric}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-black text-[var(--text)] mb-2 leading-snug">
                    {item.headline}
                  </h3>
                  <p className="text-xs text-[var(--text)] leading-relaxed mb-3">
                    {item.body}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-2 border-t border-[var(--border)]">
                    <span className="font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      المصدر: {item.source}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Column 3: Humanitarian Perspective */}
        {(activeTab === "all" || activeTab === "humanitarian") && (
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm flex flex-col">
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-emerald-500/20">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black text-[var(--text)]">الزاوية الإنسانية والحقوقية</h2>
                  <span className="text-[11px] text-[var(--text-muted)]">شاحنات الإغاثة والوضع الطبي</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600">
                إنساني
              </span>
            </div>

            <div className="space-y-4 flex-1">
              {ev.humanitarianPerspective.map((item) => (
                <article
                  key={item.id}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{item.timestamp}</span>
                    {item.keyMetric && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        {item.keyMetric}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-black text-[var(--text)] mb-2 leading-snug">
                    {item.headline}
                  </h3>
                  <p className="text-xs text-[var(--text)] leading-relaxed mb-3">
                    {item.body}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-2 border-t border-[var(--border)]">
                    <span className="font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      المصدر: {item.source}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
