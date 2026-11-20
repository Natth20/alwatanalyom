"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Share2,
  RotateCcw,
  BookOpen,
  MapPin,
  Award,
  AlertCircle,
  Clock,
  Check,
  ShieldCheck,
  Compass,
  Star,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  category: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  city: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "ما هي المدينة الفلسطينية التاريخية المعروفة بلقب «عروس البحر الأبيض المتوسط» وتشتهر ببيارات البرتقال الشموطي ومينائها العريق؟",
    category: "جغرافيا وتاريخ",
    options: ["عكا", "يافا", "حيفا", "غزة"],
    correctIndex: 1,
    explanation: "يافا هي عروس البحر وواحدة من أقدم مدن العالم وموانئ البحر المتوسط، وعُرفت عالمياً ببرتقال «يافا الشموطي» الذي كان يُصدر لكل قارات العالم.",
    city: "يافا المحتلة",
  },
  {
    id: 2,
    question: "ما اسم الباب الشهير في أسوار البلدة القديمة بالقدس الذي يُعرف أيضاً باسم «باب دمشق» ويعد المدخل الرئيسي المؤدي إلى المسجد الأقصى وأسواق المدينة؟",
    category: "معالم القدس",
    options: ["باب الخليل", "باب الساهرة", "باب العامود", "باب الأسباط"],
    correctIndex: 2,
    explanation: "باب العامود هو أعظم أبواب القدس وأفخمها عمارة، شيده السلطان العثماني سليمان القانوني عام 1537م فوق بقايا بوابات رومانية قديمة.",
    city: "القدس الشريف",
  },
  {
    id: 3,
    question: "ما اسم القصر الأثري التاريخي في أريحا الذي يحتوي على واحدة من أضخم وأجمل لوحات الفسيفساء المتصلة في العالم (شجرة الحياة)؟",
    category: "آثار وعمارة",
    options: ["قصر هشام بن عبد الملك", "قلعة بيسان", "قصر الباشا", "خان العمدان"],
    correctIndex: 0,
    explanation: "قصر هشام في أريحا يعود للعهد الأموي ويضم سجادة فسيفساء بديعة تبلغ مساحتها 827 متراً مربعاً تزين قاعة الحمام الملكي الشهيرة بـ«شجرة الحياة».",
    city: "أريحا",
  },
  {
    id: 4,
    question: "أي مدينة فلسطينية تشتهر بلقب «مدينة الخليل الرحمن» وتضم الحرم الإبراهيمي الشريف وأسواق صناعة الخزف والزجاج اليدوي؟",
    category: "تراث وهوية",
    options: ["نابلس", "بيت لحم", "الخليل", "جنين"],
    correctIndex: 2,
    explanation: "الخليل هي رابع أقدس مدن الإسلام التاريخية بعد مكة والمدينة والقدس، وتضم مقام خليل الله إبراهيم عليه السلام وزوجته سارة في الحرم الإبراهيمي.",
    city: "الخليل",
  },
  {
    id: 5,
    question: "ما هو الجبل المشهور في نابلس الذي يقابله جبل عيبال، وتُلقب المدينة بسببهما بحاضنة الجبلين؟",
    category: "جغرافيا وتضاريس",
    options: ["جبل الشيخ", "جبل جرزيم", "جبل المكبر", "جبل الكرمل"],
    correctIndex: 1,
    explanation: "تقع مدينة نابلس (دمشق الصغرى) في وادٍ خصب بين جبلي جرزيم جنوباً وعيبال شمالاً، وتضم طائفة السامريين العريقة.",
    city: "نابلس جبل النار",
  },
  {
    id: 6,
    question: "ما هو العام الذي شهد اندلاع «ثورة البراق» المباركة دفاعاً عن الحائط الغربي للمسجد الأقصى المبارك ضد الانتداب والتهويد؟",
    category: "محطات النضال",
    options: ["1929م", "1936م", "1948م", "1920م"],
    correctIndex: 0,
    explanation: "اندلعت ثورة البراق في أغسطس 1929م دفاعاً عن إسلامية حائط البراق، وأسفرت عن استشهاد قادة الثلاثاء الحمراء (محمد جمجوم وفؤاد حجازي وعطا الزير).",
    city: "القدس والخليل وصفد",
  },
];

export default function GamesMemoryPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timer, setTimer] = useState(25);

  const currentQ = QUESTIONS[currentIdx];

  // عداد الوقت التنازلي التفاعلي
  useEffect(() => {
    if (isAnswered || isFinished) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // انتهاء الوقت واحتساب إجابة خاطئة
          handleOptionSelect(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [currentIdx, isAnswered, isFinished]);

  const handleOptionSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    if (optionIdx === currentQ.correctIndex) {
      const addedPoints = 100 + streak * 25;
      setScore((prev) => prev + addedPoints);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimer(25);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setIsAnswered(false);
    setIsFinished(false);
    setTimer(25);
  };

  const handleShareCertificate = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(
        `حققتُ ${score} نقطة في تحدي الذاكرة الوطنية الفلسطينية على منصة «الوطن اليوم»! اختبر معلوماتك التاريخية الآن: ${window.location.href}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-24 selection:bg-[var(--gold)]/30">
      {/* 1. الترويسة الرئيسية لتحدي الذاكرة */}
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[#1c0008]/20 via-[var(--surface)] to-[var(--bg)] py-12 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[var(--gold)]/15 via-transparent to-transparent pointer-events-none" />

        <div className="container-custom max-w-4xl mx-auto px-4 relative z-10 space-y-4 text-center md:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-bold shadow-sm">
            <Trophy className="w-4 h-4 animate-bounce" />
            <span>تحدي الذاكرة الوطنية وصون التراث الفلسطيني 2026</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-[var(--text)] tracking-tight">
            تحدي الذاكرة الوطنية · حراس الجذور والتاريخ
          </h1>

          <p className="text-sm md:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
            اختبر معرفتك بعروس البحر، معالم القدس الشريف، القرى المهجرة، ومحطات النضال التاريخي. صون الرواية أمانة تبدأ من المعرفة.
          </p>
        </div>
      </div>

      <div className="container-custom max-w-4xl mx-auto px-4 py-8 space-y-8">
        {!isFinished ? (
          /* واجهة التحدي أثناء اللعب */
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-10 space-y-8 shadow-xl relative overflow-hidden">
            {/* شريط الإحصاءات الحية (النقاط، التتابع، والوقت) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[var(--text-muted)]">
                  السؤال {currentIdx + 1} من {QUESTIONS.length}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--primary-light)] text-[var(--primary)] text-xs font-bold">
                  {currentQ.category}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                {/* عداد التتابع Streak */}
                {streak > 1 && (
                  <div className="flex items-center gap-1 text-amber-500 font-bold animate-pulse">
                    <Flame className="w-4 h-4 fill-current" />
                    <span>تتابع x{streak}</span>
                  </div>
                )}

                {/* مؤقت الثواني */}
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border ${
                  timer <= 5 ? "border-rose-500 bg-rose-500/10 text-rose-500 animate-pulse font-bold" : "border-[var(--border)] bg-[var(--bg)] text-[var(--text)]"
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  <span>{timer} ثانية</span>
                </div>

                {/* مجموع النقاط */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] font-black shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{score} نقطة</span>
                </div>
              </div>
            </div>

            {/* نص السؤال التراثي التاريخي */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-[var(--gold)] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>نطاق السؤال: {currentQ.city}</span>
              </span>
              <h2 className="text-lg md:text-2xl font-black text-[var(--text)] leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* الخيارات الأربعة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === currentQ.correctIndex;

                let btnStyle = "border-[var(--border)] bg-[var(--bg)] hover:border-[var(--gold)] text-[var(--text)]";
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold shadow-md";
                  } else if (isSelected) {
                    btnStyle = "border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300 font-bold";
                  } else {
                    btnStyle = "border-[var(--border)] bg-[var(--bg)] opacity-40";
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleOptionSelect(optIdx)}
                    disabled={isAnswered}
                    className={`p-4 rounded-2xl border text-right text-xs md:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* بطاقة التفسير التوثيقي التاريخي بعد الإجابة */}
            {isAnswered && (
              <div className="p-5 rounded-2xl border border-[var(--gold)]/40 bg-[var(--gold)]/10 space-y-2 animate-fade-in">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--gold-deep,var(--gold))]">
                  <BookOpen className="w-4 h-4" />
                  <span>التوثيق والشاهد التاريخي:</span>
                </div>
                <p className="text-xs md:text-sm text-[var(--text)] leading-relaxed">
                  {currentQ.explanation}
                </p>
                <div className="pt-3 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] font-black text-xs hover:brightness-110 active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{currentIdx + 1 === QUESTIONS.length ? "مشاهدة وسام الشرف" : "السؤال التالي"}</span>
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* وسام الشرف الوطني عند الانتهاء (Digital Certificate of Honor) */
          <div className="rounded-3xl border-2 border-[var(--gold)] bg-gradient-to-br from-[#1c020b] via-[#120106] to-[#0a0004] p-8 md:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden animate-fade-in">
            {/* ختم الذهب المائي الخلفي */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--gold)] to-[#dca600] text-[#140106] flex items-center justify-center mx-auto shadow-2xl shadow-[var(--gold-glow)]">
              <Award className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[var(--gold)] tracking-widest uppercase">
                وثيقة التقدير والامتياز التراثي 2026
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-white">
                وسام حارس الذاكرة الوطنية الفلسطينية
              </h2>
              <p className="text-xs md:text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
                تمنح منصة «الوطن اليوم» هذا الوسام تقديراً لتمسكك بالرواية التاريخية الموثقة وصون معالم وجغرافيا فلسطين من النسيان.
              </p>
            </div>

            {/* لوحة نتيجة التحدي */}
            <div className="inline-grid grid-cols-2 gap-6 p-5 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto text-center">
              <div>
                <span className="text-xs text-white/50 block">مجموع النقاط</span>
                <span className="text-3xl font-black text-[var(--gold)] font-mono">{score}</span>
              </div>
              <div>
                <span className="text-xs text-white/50 block">نسبة المعرفة التاريخية</span>
                <span className="text-3xl font-black text-emerald-400 font-mono">
                  {Math.round((score / (QUESTIONS.length * 100)) * 100)}%
                </span>
              </div>
            </div>

            {/* إجراءات المشاركة وإعادة المحاولة */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={handleShareCertificate}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] font-black text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? "تم نسخ نص المشاركة!" : "مشاركة الوسام على السوشيال ميديا"}</span>
              </button>

              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة خوض التحدي</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
