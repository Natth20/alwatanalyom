"use client";

import { useState } from "react";
import { History, Calendar, Bookmark, ChevronRight, ChevronLeft, Landmark, Sparkles } from "lucide-react";

interface HistoricalEvent {
  year: number;
  title: string;
  category: "palestine" | "arab" | "world" | "culture";
  description: string;
  location: string;
  impact: string;
}

const TODAY_EVENTS: HistoricalEvent[] = [
  {
    year: 1917,
    title: "معركة بئر السبع وبداية التحول التاريخي في جنوب فلسطين",
    category: "palestine",
    description: "قوات الحلفاء تشن هجوماً واسعاً على خطوط الدفاع العثمانية في بئر السبع، وهي إحدى أهم المحطات العسكرية التي مهدت لاحتلال القدس وصدور وعد بلفور المشؤوم.",
    location: "بئر السبع، النقب الفلسطيني",
    impact: "حدث مفصلي في تاريخ السيطرة الاستعمارية على بلاد الشام",
  },
  {
    year: 1956,
    title: "مقاومة العدوان الثلاثي وبداية الصمود الشعبي في قطاع غزة وسيناء",
    category: "arab",
    description: "اندلاع شرارة المقاومة الوطنية والتصدي الشعبي المشترك في خان يونس ورفح وبورسعيد إبان العدوان الثلاثي على مصر، وتشكيل أولى لجان الفدائيين.",
    location: "خان يونس وغزة وبورسعيد",
    impact: "ترسيخ وحدة المصير العربي وبداية مرحلة العمل الفدائي المنظم",
  },
  {
    year: 1974,
    title: "مؤتمر القمة العربية في الرباط وإعلان م.ت.ف ممثلاً شرعياً ووحيداً",
    category: "palestine",
    description: "القادة العرب يقررون بالإجماع الاعتراف بمنظمة التحرير الفلسطينية ممثلاً شرعياً ووحيداً للشعب الفلسطيني، في انتصار دبلوماسي كبير قاد لإلقاء خطاب غصن الزيتون في الأمم المتحدة.",
    location: "الرباط، المغرب",
    impact: "انتزاع الاعتراف بالهوية والتمثيل السياسي الفلسطيني عالمياً",
  },
  {
    year: 1991,
    title: "انطلاق مؤتمر مدريد للسلام في الشرق الأوسط",
    category: "world",
    description: "افتتاح مؤتمر مدريد الدولي برعاية أمريكية وسوفيتية بمشاركة وفد فلسطيني ضمن وفد مشترك، والذي دشن مرحلة جديدة من المفاوضات الإقليمية.",
    location: "مدريد، إسبانيا",
    impact: "تدشين أول مفاوضات مباشرة علنية في الساحة الدولية",
  },
];

export function HistoryTodayWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentEvent = TODAY_EVENTS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TODAY_EVENTS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TODAY_EVENTS.length) % TODAY_EVENTS.length);
  };

  return (
    <section className="card-luxury relative rounded-3xl p-6 md:p-8 overflow-hidden shadow-lg">
      <div className="absolute top-0 end-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* الترويسة الرئيسية */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-700 to-amber-500 text-white flex items-center justify-center shadow-md">
            <History className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black text-[var(--text)]">
                في مثل هذا اليوم · ذاكرة الوطن والتاريخ
              </h2>
              <span className="text-[10px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 px-2.5 py-0.5 rounded-full">
                أرشيف الوطن
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              محطات مضيئة وتواريخ لا تُنسى صنعت ملامح القضية وهوية الأمة
            </p>
          </div>
        </div>

        {/* أزرار التنقل بين الأحداث */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-[var(--text-muted)]">
            {currentIndex + 1} / {TODAY_EVENTS.length}
          </span>
          <div className="flex items-center gap-1 bg-[var(--surface)] p-1 rounded-xl border border-[var(--border)]">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text)] hover:bg-[var(--bg)] transition-colors"
              aria-label="الحدث السابق"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text)] hover:bg-[var(--bg)] transition-colors"
              aria-label="الحدث التالي"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* عرض الحدث التاريخي */}
      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        {/* السنة والأثر */}
        <div className="md:col-span-1 text-center md:text-start p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
            عام الحادثة
          </span>
          <span className="text-4xl md:text-5xl font-black text-[var(--text)] font-mono tracking-tight block">
            {currentEvent.year}
          </span>
          <span className="text-[11px] text-[var(--text-muted)] mt-2 block">
            قبل {new Date().getFullYear() - currentEvent.year} عاماً
          </span>
          <div className="mt-3 pt-3 border-t border-[var(--border)] text-[10px] text-[var(--text-muted)] font-medium">
            📍 {currentEvent.location}
          </div>
        </div>

        {/* التفاصيل والشرح التاريخي */}
        <div className="md:col-span-3 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
              {currentEvent.category === "palestine" ? "تاريخ فلسطين" : "التاريخ العربي والدولي"}
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-[var(--text)] leading-snug">
            {currentEvent.title}
          </h3>

          <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
            {currentEvent.description}
          </p>

          <div className="p-3 rounded-lg bg-[var(--surface)]/80 border-s-2 border-amber-500 text-xs text-[var(--text)] font-medium">
            <strong>الأثر الاستراتيجي:</strong> {currentEvent.impact}
          </div>
        </div>
      </div>
    </section>
  );
}

