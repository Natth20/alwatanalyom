"use client";

import { useState } from "react";
import { StorySummary } from "@awt/shared";
import { Flame, Play, X, ChevronRight, ChevronLeft, ShieldCheck, Clock, ExternalLink } from "lucide-react";

interface StoryItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  imageUrl: string;
  source: string;
  time: string;
  isBreaking?: boolean;
}

const DEFAULT_STORIES: StoryItem[] = [
  {
    id: "st-1",
    category: "فلسطين أولاً",
    title: "صمود المنظومة الصحية في شمال غزة وسط مناشدات دولية عاجلة لتأمين الوقود للمستشفيات",
    summary: "طواقم الدفاع المدني والإسعاف تواصل عملها لإخلاء الجرحى مع استمرار الحصار ونفاد مخزون الوقود.",
    imageUrl: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=800&q=80",
    source: "وزارة الصحة · وفا",
    time: "منذ 10 دقائق",
    isBreaking: true,
  },
  {
    id: "st-2",
    category: "القدس والأقصى",
    title: "توافد آلاف المصلين إلى المسجد الأقصى المبارك لأداء صلوات الجماعة وسط انتظام الحلقات",
    summary: "دائرة الأوقاف تؤكد انتظام الصلوات ومرابطة طواقم المتطوعين والإسعاف الميداني لخدمة المصلين.",
    imageUrl: "https://images.unsplash.com/photo-1579888944880-d98341245702?auto=format&fit=crop&w=800&q=80",
    source: "دائرة الأوقاف بالقدس",
    time: "منذ نصف ساعة",
  },
  {
    id: "st-3",
    category: "يلا سبورت",
    title: "مواجهات حاسمة الليلة في دوري أبطال أوروبا وسط ترقب جماهيري عربي واسع",
    summary: "تحليلات فنية وجداول المواجهات المرتقبة مع تغطية حية لحظة بلحظة عبر منصة يلا سبورت.",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    source: "يلا سبورت الشريك الرسمي",
    time: "منذ ساعة",
  },
  {
    id: "st-4",
    category: "الذهب والأسواق",
    title: "أونصة الذهب تسجل مستوى قياسياً جديداً عند 2,748 دولاراً والطلب يتضاعف",
    summary: "خبراء الاقتصاد يؤكدون استمرار جاذبية المعدن الأصفر كملاذ آمن في ظل التقلبات العالمية.",
    imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80",
    source: "بلومبرغ الشرق · الأسواق",
    time: "منذ ساعتين",
  },
  {
    id: "st-5",
    category: "رادار الحقيقة",
    title: "تفنيد وتفكيك شائعة منسوبة لمصادر مجهولة بشأن أزمة الطحين في المحافظات",
    summary: "وحدة الرصد والتحقق تؤكد انتظام تدفق الشحنات وتنشر الوثائق الرسمية الصادرة عن التموين.",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
    source: "رادار الحقيقة · الوطن اليوم",
    time: "منذ 3 ساعات",
  },
];

export function NewsStoriesBar() {
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);

  const openStory = (index: number) => {
    setActiveStoryIdx(index);
  };

  const closeStory = () => {
    setActiveStoryIdx(null);
  };

  const nextStory = () => {
    if (activeStoryIdx !== null && activeStoryIdx < DEFAULT_STORIES.length - 1) {
      setActiveStoryIdx(activeStoryIdx + 1);
    } else {
      closeStory();
    }
  };

  const prevStory = () => {
    if (activeStoryIdx !== null && activeStoryIdx > 0) {
      setActiveStoryIdx(activeStoryIdx - 1);
    }
  };

  const activeStory = activeStoryIdx !== null ? DEFAULT_STORIES[activeStoryIdx] : null;

  return (
    <div className="py-2">
      {/* شريط الدوائر السريع (Stories Rail) */}
      <div className="flex items-center gap-3.5 sm:gap-5 overflow-x-auto scrollbar-none py-2 px-1">
        {DEFAULT_STORIES.map((story, idx) => (
          <button
            key={story.id}
            onClick={() => openStory(idx)}
            className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer focus:outline-hidden"
          >
            {/* الدائرة المتوهجة */}
            <div
              className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 transition-transform duration-300 group-hover:scale-105 active:scale-95 ${
                story.isBreaking ? "story-ring-active" : "p-[2px] bg-gradient-to-tr from-[var(--gold)] via-[#dca600] to-[#590018]"
              }`}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-stone-900 border-2 border-black/80 relative">
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors" />

                {/* أيقونة التشغيل الخافتة */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-6 h-6 rounded-full bg-black/60 backdrop-blur-xs text-[var(--gold)] flex items-center justify-center">
                    <Play className="w-3 h-3 fill-current ms-0.5" />
                  </span>
                </div>
              </div>

              {/* نقطة النبض للقصة العاجلة */}
              {story.isBreaking && (
                <span className="absolute -top-0.5 -end-0.5 w-4 h-4 rounded-full bg-red-600 border-2 border-[var(--surface)] flex items-center justify-center text-[8px] text-white font-black animate-pulse">
                  <Flame className="w-2.5 h-2.5 fill-current" />
                </span>
              )}
            </div>

            {/* تصنيف القصة تحت الدائرة */}
            <span className="text-[11px] font-black text-[var(--text)] group-hover:text-[var(--gold)] transition-colors text-center line-clamp-1 max-w-[70px] sm:max-w-[80px]">
              {story.category}
            </span>
          </button>
        ))}
      </div>

      {/* نافذة عرض القصة التفاعلية المنبثقة (Story Modal) */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* كرت القصة الرأسي بنمط الهاتف المحمول الفاخر */}
          <div className="relative w-full max-w-sm sm:max-w-md h-[580px] sm:h-[640px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[var(--gold)]/40 flex flex-col justify-between bg-stone-950">
            {/* صورة القصة مع التدرج السينمائي */}
            <div className="absolute inset-0">
              <img
                src={activeStory.imageUrl}
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
            </div>

            {/* خطوط التقدم الزمنية في أعلى القصة */}
            <div className="relative z-10 p-4 space-y-3">
              <div className="flex items-center gap-1.5">
                {DEFAULT_STORIES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full flex-1 transition-all duration-300 ${
                      i === activeStoryIdx
                        ? "bg-[var(--gold)] shadow-[0_0_8px_var(--gold)]"
                        : i < (activeStoryIdx || 0)
                        ? "bg-white/80"
                        : "bg-white/20"
                    }`}
                  />
                ))}
              </div>

              {/* بيانات القصة العلوية وزر الإغلاق */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-[#590018] to-[#730020] text-[var(--gold)] font-black text-xs border border-[var(--gold)]/40">
                    {activeStory.category}
                  </span>
                  <span className="text-[11px] text-white/70 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[var(--gold)]" />
                    {activeStory.time}
                  </span>
                </div>

                <button
                  onClick={closeStory}
                  className="w-8 h-8 rounded-full bg-black/60 text-white/80 hover:text-white flex items-center justify-center border border-white/20 cursor-pointer"
                  aria-label="إغلاق القصة"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* تفاصيل القصة في الأسفل */}
            <div className="relative z-10 p-6 space-y-3.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{activeStory.source}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {activeStory.title}
              </h3>

              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal">
                {activeStory.summary}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={nextStory}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] font-black text-xs hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>القصة التالية</span>
                  <ChevronLeft className="w-4 h-4 rtl:rotate-0" />
                </button>

                {activeStoryIdx && activeStoryIdx > 0 ? (
                  <button
                    onClick={prevStory}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    السابق
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
