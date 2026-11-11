"use client";

import { useState, useRef, useCallback } from "react";
import { MoveHorizontal, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";




interface Props {
  fakeImageUrl?: string;
  realImageUrl?: string;
  claimTitle?: string;
  forensicProof?: string;
}

export function FactCheckSlider({
  fakeImageUrl,
  realImageUrl,
  claimTitle = "صورة مفبركة متداولة تدعي قصف منشأة حيوية حديثاً",
  forensicProof = "كشف البحث العكسي أن الصورة تعود لحريق مستودعات في أمريكا الجنوبية عام 2021 وليست لها علاقة بالأحداث الحالية.",
}: Props) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
      // Right-to-left adjustment for RTL
      setSliderPosition(pos);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-950/20 via-[var(--surface)] to-[var(--surface)] p-6 md:p-8 space-y-6 shadow-md">
      {/* الترويسة الفنية */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
            <span className="text-xs font-black tracking-wider text-rose-600 dark:text-rose-400 uppercase">
              منزلق التحقيق الجنائي البصري (OSINT Slider)
            </span>
            <span className="text-[10px] bg-rose-500/10 text-rose-600 px-2 py-0.5 rounded-full font-bold">
              كشف التزييف الحركي
            </span>
          </div>
          <h3 className="text-xl font-black text-[var(--text)] tracking-tight">
            قارن بنفسك: الوهم المتداول في مواجهة الحقيقة المثبتة
          </h3>
        </div>

        <span className="text-xs text-[var(--text-muted)] font-medium flex items-center gap-1">
          <MoveHorizontal className="w-4 h-4 text-rose-500 animate-pulse" />
          <span>اسحب المقبض يميناً ويساراً للمقارنة</span>
        </span>
      </div>

      {/* المنزلق التفاعلي المزدوج */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden select-none cursor-ew-resize border border-[var(--border)] shadow-inner bg-black"
      >
        {/* الصورة الحقيقية (الخلفية بالكامل) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-950 via-slate-900 to-black text-white p-8">
          {realImageUrl ? (
            <img src={realImageUrl} alt="الحقيقة الأصلية" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center space-y-3">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
              <h4 className="text-xl font-black text-emerald-400">✅ الصورة الحقيقية الأصلية</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                التقطت في سياقها الصحيح ومطابقة لبصمة البيانات الجغرافية والتاريخية المثبتة.
              </p>
            </div>
          )}

          {/* شارة الحقيقة الخضراء */}
          <div className="absolute bottom-4 end-4 px-3 py-1.5 rounded-xl bg-emerald-600/90 text-white text-xs font-black backdrop-blur-md flex items-center gap-1.5 shadow-md pointer-events-none">
            <CheckCircle2 className="w-4 h-4" />
            <span>الصورة الأصلية الموثقة</span>
          </div>
        </div>

        {/* الصورة المزيفة (طبقة مقصوصة حسب موضع المنزلق) */}
        <div
          className="absolute inset-0 h-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-rose-950 via-slate-950 to-black text-white p-8"
          style={{ width: `${sliderPosition}%` }}
        >
          {fakeImageUrl ? (
            <img
              src={fakeImageUrl}
              alt="الصورة المزيفة"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ width: `${containerRef.current?.clientWidth || 800}px`, maxWidth: "none" }}
            />
          ) : (
            <div className="text-center space-y-3" style={{ width: `${containerRef.current?.clientWidth || 800}px` }}>
              <XCircle className="w-16 h-16 text-rose-500 mx-auto" />
              <h4 className="text-xl font-black text-rose-500">❌ المزاعم والتزييف المتداول</h4>
              <p className="text-xs text-rose-200 max-w-md mx-auto leading-relaxed">
                صورة مقتطعة أو مولدة بأدوات الذكاء الاصطناعي مع تحريف مكان وزمان الحدث لخداع الرأي العام.
              </p>
            </div>
          )}

          {/* شارة التزييف الحمراء */}
          <div className="absolute bottom-4 start-4 px-3 py-1.5 rounded-xl bg-rose-600/90 text-white text-xs font-black backdrop-blur-md flex items-center gap-1.5 shadow-md pointer-events-none">
            <XCircle className="w-4 h-4" />
            <span>المحتوى المضلل المتداول</span>
          </div>
        </div>

        {/* خط المنزلق الفاصل مع المقبض الدائري */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-2xl flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center border-2 border-slate-900 font-bold text-xs">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* بطاقة الأدلة الجنائية والإثبات الرقمي */}
      <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] space-y-2 text-xs">
        <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>نتيجة الفحص الجنائي الرقمي لمرصد الوطن اليوم:</span>
        </div>
        <p className="text-[var(--text-muted)] leading-relaxed">
          {forensicProof}
        </p>
      </div>
    </div>
  );
}

