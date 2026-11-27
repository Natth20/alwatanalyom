"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { MoveHorizontal, CheckCircle2, ShieldAlert, ShieldCheck, ExternalLink, Search } from "lucide-react";

interface Props {
  claimTitle?: string;
  forensicProof?: string;
}

export function FactCheckSlider({
  claimTitle = "منهجية وحدة التحقق البصري في مواجهة الصور المفبركة والبيانات المضللة",
  forensicProof = "تعتمد غرفة الأخبار فحص البيانات الوصفية (EXIF)، مطابقة المعالم الجغرافية عبر صور الأقمار الصناعية، والبحث العكسي قبل اعتماد أي لقطة ميدانية.",
}: Props) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(pos);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-950/15 via-[var(--surface)] to-[var(--surface)] p-6 md:p-8 space-y-6 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
            <span className="text-xs font-black tracking-wider text-rose-600 dark:text-rose-400 uppercase">
              مقارنة التحقيق الجنائي البصري (OSINT)
            </span>
          </div>
          <h3 className="text-xl font-black text-[var(--text)] tracking-tight">
            {claimTitle}
          </h3>
        </div>

        <span className="text-xs text-[var(--text-muted)] font-medium flex items-center gap-1.5">
          <MoveHorizontal className="w-4 h-4 text-rose-500 animate-pulse" />
          <span>اسحب الفاصل للمقارنة بين مؤشرات التضليل وبروتوكول التحقق</span>
        </span>
      </div>

      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden select-none cursor-ew-resize border border-[var(--border)] shadow-inner bg-slate-950"
      >
        {/* طبقة التوثيق المثبت (الخلفية الكاملة) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-950 via-slate-900 to-black text-white p-8">
          <div className="text-center space-y-3 max-w-md">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-black text-emerald-300">بروتوكول التثبت المزدوج والمصدر الأصيل</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              تطابق الإحداثيات الجغرافية والبيانات الرسمية الصادرة عن الجهات الميدانية المعتمدة مع سلسلة النشر الأولي.
            </p>
          </div>
          <div className="absolute bottom-4 end-4 px-3 py-1.5 rounded-xl bg-emerald-600/90 text-white text-xs font-black flex items-center gap-1.5 pointer-events-none">
            <CheckCircle2 className="w-4 h-4" />
            <span>مسار التوثيق العلمي</span>
          </div>
        </div>

        {/* طبقة علامات التضليل والشائعات (المنزلقة) */}
        <div
          className="absolute inset-y-0 start-0 overflow-hidden bg-gradient-to-br from-rose-950 via-[#2a040e] to-black text-white flex items-center justify-center p-8"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="text-center space-y-3 min-w-[280px] max-w-md">
            <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto" />
            <h4 className="text-lg font-black text-rose-300">علامات المحتوى المجتزأ أو المفبرك</h4>
            <p className="text-xs text-rose-100/80 leading-relaxed">
              مقاطع منزوعة من سياقها الزمني أو منشورة عبر حسابات مجهولة دون تاريخ تصوير أو إحداثيات موثقة.
            </p>
          </div>
          <div className="absolute bottom-4 start-4 px-3 py-1.5 rounded-xl bg-rose-600/90 text-white text-xs font-black flex items-center gap-1.5 pointer-events-none">
            <ShieldAlert className="w-4 h-4" />
            <span>رصد الشائعات</span>
          </div>
        </div>

        {/* مقبض السحب */}
        <div
          className="absolute inset-y-0 w-1 bg-[var(--gold)] shadow-[0_0_20px_rgba(245,185,0,0.8)] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[var(--gold)] text-[#140106] flex items-center justify-center shadow-xl border-2 border-white">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="text-xs text-[var(--text-muted)] leading-relaxed flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>{forensicProof}</span>
        </p>

        <Link
          href="/fact-check"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shrink-0 transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>افحص رابطاً أو خبراً في مختبر الحقيقة</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
