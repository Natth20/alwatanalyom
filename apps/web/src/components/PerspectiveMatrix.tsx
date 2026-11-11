"use client";

import { useState } from "react";
import { Sparkles, Scale } from "lucide-react";




interface Perspective {
  id: "palestine" | "arab" | "western" | "hebrew" | "un";
  title: string;
  badge: string;
  badgeColor: string;
  source: string;
  headline: string;
  spinNote: string;
  biasRating: string;
  quote: string;
  coverageRatio: number; // percentage
}

const DEFAULT_PERSPECTIVES: Perspective[] = [
  {
    id: "palestine",
    title: "الرواية الفلسطينية والميدانية",
    badge: "الميدان الوطني",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    source: "وكالة الأنباء الفلسطينية (وفا) ومصادر الهلال الأحمر",
    headline: "عشرات الشهداء والمصابين في قصف مدفعي طال مراكز إيواء النازحين واستهداف مباشر لمركبات الإسعاف",
    spinNote: "تركيز على الجرائم الإنسانية، رصد أسماء الشهداء والجرحى، وتأكيد الحصار وانقطاع المستلزمات الطبية.",
    biasRating: "توثيق وطني ميداني",
    quote: "المنظومة الصحية في شمال غزة تعمل تحت الصفر، وكل تأخير في إدخال الوقود يعني استشهاد أطفال الخدج وغرف العناية المركزة.",
    coverageRatio: 96,
  },
  {
    id: "arab",
    title: "الرواية العربية والإقليمية",
    badge: "إقليمي عربي",
    badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30",
    source: "الجزيرة نت، الشرق للأخبار، الأناضول",
    headline: "إدانات عربية واسعة لتوسيع العمليات العسكرية ومطالبات بفتح مسارات إغاثية فورية وإلزام إسرائيل بالقرارات الدولية",
    spinNote: "إبراز الحراك الدبلوماسي العربي والوساطات الإقليمية ومواقف القمم والجامعة العربية.",
    biasRating: "تضامن عربي ودبلوماسي",
    quote: "حراك مكثف في مجلس الأمن لاستصدار قرار ملزم بوقف إطلاق النار وإنفاذ المساعدات دون عوائق.",
    coverageRatio: 88,
  },
  {
    id: "western",
    title: "الرواية الغربية والدولية",
    badge: "وكالات دولية",
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30",
    source: "Reuters, Associated Press, AFP, BBC News",
    headline: "تصاعد المخاوف الدولية بشأن الوضع الإنساني وسط استمرار العمليات وتأكيدات واشنطن على ضرورة تجنب المدنيين",
    spinNote: "استخدام صيغ المبني للمجهول (قُتلوا بدلاً من استُشهدوا)، وربط الحدث بمزاعم استهداف مسلحين، مع نقل بيانات الجيش دون تدقيق أولي.",
    biasRating: "انحياز للمصطلحات الرسمية الغربية",
    quote: "المسؤولون الأمريكيون يحثون على إتاحة ممرات إنسانية ولكن يؤكدون حق إسرائيل في الدفاع عن نفسها.",
    coverageRatio: 74,
  },
  {
    id: "hebrew",
    title: "رصد الإعلام العبري المترجم",
    badge: "إعلام الاحتلال (مترجم)",
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    source: "هآرتس، يديعوت أحرونوت، القناة 12 العبرية",
    headline: "الجيش الإسرائيلي يعلن استهداف مجمعات قيادية ومسلحين في إطار توسيع الطوق الأمني شمال القطاع",
    spinNote: "تعتيم عسكري ومراقبة تحريرية عسكرية صارمة (Censorship)، تبرير استهداف الأعيان المدنية باتهامات استخدامها كدروع.",
    biasRating: "بروباغندا خاضعة للرقابة العسكرية",
    quote: "المتحدث باسم الجيش يزعم أن القوات تعمل بدقة استناداً لمعلومات استخباراتية في مناطق تواجد خلايا مسلحة.",
    coverageRatio: 82,
  },
  {
    id: "un",
    title: "الموقف الحقوقي والأممي",
    badge: "القانون الدولي",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    source: "الأمم المتحدة، محكمة العدل الدولية، أمنستي، الصليب الأحمر",
    headline: "تحذيرات أممية من خطر التجويع الشامل وانتهاك أحكام اتفاقية جنيف الرابعة وقرارات العدل الدولية",
    spinNote: "توثيق انتهاكات القانون الدولي الإنساني، التأكيد على عدم شرعية استهداف المرافق الطبية وموظفي الإغاثة.",
    biasRating: "قانون دولي وحقوق إنسان",
    quote: "لا يوجد مكان آمن في غزة، وتجويع المدنيين كوسيلة حرب يرقى إلى جريمة حرب محرمة وفق المادة 54 من البروتوكول الإضافي الأول.",
    coverageRatio: 91,
  },
];

export function PerspectiveMatrix() {
  const [activeTab, setActiveTab] = useState<Perspective["id"]>("palestine");

  const current = DEFAULT_PERSPECTIVES.find((p) => p.id === activeTab) || DEFAULT_PERSPECTIVES[0];

  return (
    <section className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[var(--surface-card)] via-[var(--surface)] to-[var(--surface)] p-6 md:p-8 shadow-md space-y-6">
      {/* الترويسة الرئيسية للويدجيت */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-black tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
              محرك «جراوند نيوز» العربي الأول
            </span>
            <span className="text-[10px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full font-bold">
              تعدد الزوايا وكشف الانحياز
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-black text-[var(--text)] tracking-tight">
            مصفوفة الروايات المتعددة: قصة واحدة بكافة الزوايا الدولية
          </h2>
          <p className="text-xs md:text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
            لا تعتمد على وجهة نظر واحدة. تقارن منصة «الوطن اليوم» كيف تناولت كبرى الوكالات العالمية والإقليمية نفس الحدث مع كشف التلاعب اللفظي.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-4 py-2 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-xs font-bold text-center">
            <span className="block text-[10px] text-[var(--text-muted)]">الروايات المرصودة</span>
            <span className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono">5 زوايا دولية</span>
          </div>
        </div>
      </div>

      {/* ألسنة التبديل بين الزوايا الخمس */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
        {DEFAULT_PERSPECTIVES.map((p) => {
          const isActive = p.id === activeTab;
          return (
            <button
              key={p.id}
              onClick={() => setActiveTab(p.id)}
              className={`px-4 py-2.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm scale-102"
                  : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text)] hover:border-[var(--primary)]"
              }`}
            >
              <span>{p.title}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${isActive ? "bg-white/20 text-white" : "text-[var(--text-muted)]"}`}>
                {p.coverageRatio}%
              </span>
            </button>
          );
        })}
      </div>

      {/* بطاقة العرض المقارن للرواية المختارة */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 space-y-6 shadow-xs relative overflow-hidden">
        {/* شريط حالة الزاوية والوسم */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${current.badgeColor}`}>
              {current.badge}
            </span>
            <span className="text-xs font-bold text-[var(--text)]">
              المصادر: {current.source}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[var(--text-muted)]">مقياس التغطية العالمية:</span>
            <div className="w-24 h-2 rounded-full bg-[var(--border)] overflow-hidden">
              <div
                className="h-full bg-[var(--primary)] transition-all duration-500"
                style={{ width: `${current.coverageRatio}%` }}
              />
            </div>
            <span className="font-mono font-bold text-[var(--text)]">{current.coverageRatio}%</span>
          </div>
        </div>

        {/* العنوان المصاغ لدى هذه الزاوية */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
            صياغة العنوان المعتمدة لدى هذا الاتجاه:
          </span>
          <h3 className="text-xl md:text-2xl font-black text-[var(--text)] leading-snug">
            «{current.headline}»
          </h3>
        </div>

        {/* الاقتباس المباشر */}
        <div className="p-4 rounded-xl bg-[var(--surface-card)] border-s-4 border-[var(--primary)] text-sm leading-relaxed text-[var(--text)] italic">
          &ldquo;{current.quote}&rdquo;
        </div>

        {/* كاشف التلاعب اللفظي والانحياز (Spin Inspector) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 space-y-1 text-xs">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>تحليل الصياغة والانحياز اللفظي:</span>
            </span>
            <p className="text-[var(--text-muted)] leading-relaxed">
              {current.spinNote}
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 space-y-1 text-xs">
            <span className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              <span>تقييم النزاهة والمطابقة الميدانية:</span>
            </span>
            <p className="text-[var(--text-muted)] leading-relaxed">
              {current.biasRating}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

