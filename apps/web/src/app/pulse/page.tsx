"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  BarChart3,
  Globe2,
  PieChart,
  Activity,
  ArrowUpRight,
  Sparkles,
  Share2,
  Filter,
  CheckCircle2,
  AlertCircle,
  Hash,
} from "lucide-react";
import { SENTIMENT_METRICS, TRENDING_TOPICS } from "@/data/sentiment";

const KEYWORD_CLOUD = [
  { text: "غزة", size: "text-3xl font-black text-[var(--primary)]" },
  { text: "المعابر", size: "text-2xl font-black text-emerald-600" },
  { text: "المساعدات", size: "text-xl font-bold text-amber-600" },
  { text: "القدس", size: "text-3xl font-black text-[var(--text)]" },
  { text: "الهلال الأحمر", size: "text-lg font-bold text-red-600" },
  { text: "محكمة العدل", size: "text-xl font-bold text-indigo-600" },
  { text: "الأونروا", size: "text-lg font-bold text-sky-600" },
  { text: "الدفاع المدني", size: "text-base font-semibold text-rose-600" },
  { text: "وقف إطلاق النار", size: "text-2xl font-black text-teal-600" },
  { text: "الصمود الشعبي", size: "text-xl font-bold text-[var(--text)]" },
  { text: "بورصة فلسطين", size: "text-base font-semibold text-zinc-500" },
  { text: "رادار الحقيقة", size: "text-lg font-bold text-amber-500" },
];

export default function PulsePage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  return (
    <div className="container-custom py-8 max-w-6xl">
      {/* Header */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 mb-8 text-center relative overflow-hidden shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[var(--bg)] border border-[var(--border)] text-[var(--primary)] mb-3">
          <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          صحافة البيانات · مرصد نبض الرأي العام والترند
        </div>
        <h1 className="text-2xl md:text-4xl font-black mb-3">
          رادار المزاج العام ونبض البيانات
        </h1>
        <p className="text-sm md:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
          تحليل كمي ونوعي مدعوم بالذكاء الاصطناعي يرصد مسار التغطيات الإعلامية العالمية، نبرة المنصات الدولية، والكلمات الأكثر صعوداً في الفضاء الرقمي.
        </p>

        <div className="mt-6 inline-flex items-center gap-4 text-xs font-bold text-[var(--text-muted)]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            تحليل 1.8 مليون تدوينة ومقال خلال الـ 24 ساعة الماضية
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Media Sentiment Radar */}
        <div className="lg:col-span-2 space-y-6">
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
            <h2 className="text-lg font-black text-[var(--text)] mb-2 flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-indigo-500" />
              مؤشر نبرة الإعلام العالمي والإقليمي
            </h2>
            <p className="text-xs text-[var(--text-muted)] mb-6">
              قياس نسبة المحتوى المتعاطف والحيادي والمنحاز في التغطيات الصحفية الكبرى
            </p>

            <div className="space-y-6">
              {SENTIMENT_METRICS.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-black text-[var(--text)]">{metric.category}</h3>
                    <div className="flex items-center gap-3 text-xs font-bold">
                      <span className="text-emerald-600">متضامن {metric.positive}%</span>
                      <span className="text-zinc-500">حيادي {metric.neutral}%</span>
                      <span className="text-red-600">منحاز {metric.negativeOrBiased}%</span>
                    </div>
                  </div>

                  {/* Multi-segment Progress Bar */}
                  <div className="h-3 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 flex overflow-hidden">
                    <div
                      style={{ width: `${metric.positive}%` }}
                      className="h-full bg-emerald-500 transition-all duration-500"
                      title={`متضامن: ${metric.positive}%`}
                    />
                    <div
                      style={{ width: `${metric.neutral}%` }}
                      className="h-full bg-zinc-400 dark:bg-zinc-600 transition-all duration-500"
                      title={`حيادي: ${metric.neutral}%`}
                    />
                    <div
                      style={{ width: `${metric.negativeOrBiased}%` }}
                      className="h-full bg-red-500 transition-all duration-500"
                      title={`منحاز: ${metric.negativeOrBiased}%`}
                    />
                  </div>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed pt-1">
                    {metric.summary}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Word Cloud / Dominant Terms */}
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
            <h2 className="text-lg font-black text-[var(--text)] mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              سحابة المصطلحات الأكثر تداولاً اليوم
            </h2>
            <p className="text-xs text-[var(--text-muted)] mb-5">
              ترتيب الكلمات المفتاحية بحسب كثافة النشر والبحث عبر وسائل الإعلام ومواقع التواصل
            </p>

            <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex flex-wrap items-center justify-center gap-4 sm:gap-6 py-8">
              {KEYWORD_CLOUD.map((word, idx) => (
                <span
                  key={idx}
                  className={`${word.size} hover:scale-110 transition-transform cursor-pointer select-none`}
                >
                  {word.text}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Trending Topics & Editorial Memo */}
        <div className="space-y-6">
          {/* Trending Topics List */}
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
            <h2 className="text-base font-black text-[var(--text)] mb-1 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              الوسوم الأكثر تفاعلاً
            </h2>
            <p className="text-[11px] text-[var(--text-muted)] mb-4">
              محدث آلياً كل 15 دقيقة
            </p>

            <div className="space-y-3">
              {TRENDING_TOPICS.map((topic) => (
                <div
                  key={topic.rank}
                  className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-[var(--text)] flex items-center gap-1">
                      <span className="text-[var(--text-muted)] text-[10px]">#{topic.rank}</span>
                      <strong className="text-[var(--primary)]">{topic.tag}</strong>
                    </span>
                    <span className="text-[11px] font-semibold text-[var(--text-muted)]">
                      {topic.mentions.toLocaleString()} تدوينة
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-1.5 border-t border-[var(--border)]">
                    <span>النبرة: {topic.dominantTone}</span>
                    <span className="font-bold text-emerald-600">{topic.sentimentScore}% تضامن</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Research & Editorial Memo */}
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
            <h3 className="text-sm font-black text-[var(--text)] mb-2 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[var(--primary)]" />
              مذكرة وحدة الرصد الاستراتيجي
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">
              تشير خوارزميات رصد «الوطن اليوم» إلى أن التركيز الإعلامي العالمي تحول بنسبة 45% من البيانات العسكرية إلى التبعات الإنسانية والقرارات القضائية الدولية، مما يعزز حضور الرواية الحقوقية الفلسطينية في النقاشات الأكاديمية وصناع القرار.
            </p>
            <Link
              href="/contact"
              className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
            >
              طلب تقرير بيانات مفصل للمراكز البحثية
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
