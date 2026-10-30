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
];

export default function GamesPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [streak, setStreak] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const savedStreak = localStorage.getItem("awt_daily_streak");
      if (savedStreak) {
        setStreak(parseInt(savedStreak, 10));
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);

    if (idx === QUESTIONS[currentIdx].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      const newStreak = streak + 1;
      setStreak(newStreak);
      try {
        localStorage.setItem("awt_daily_streak", newStreak.toString());
      } catch {
        // LocalStorage fallback
      }
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const handleShare = () => {
    const text = `أكملت تحدي المعرفة اليومي في «الوطن اليوم» بنتيجة ${score}/${QUESTIONS.length}! سلسلة الأيام المتتالية: 🔥 ${streak} يوم. جرب التحدي الآن: ${window.location.href}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const q = QUESTIONS[currentIdx];

  return (
    <div className="container-custom py-8 max-w-4xl">
      {/* Header */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 mb-8 text-center relative overflow-hidden shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[var(--bg)] border border-[var(--border)] text-[var(--primary)] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          ألعاب العقل وتحدي المعرفة الفلسطينية
        </div>
        <h1 className="text-2xl md:text-4xl font-black mb-3">
          تحدي اليوم الثقافي والجغرافي
        </h1>
        <p className="text-sm md:text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
          اختبر معلوماتك اليومية عن مدن وقرى وتاريخ ومعالم فلسطين، واحتفظ بسلسلة إنجازك اليومية مع آلاف القراء.
        </p>

        {/* Stats Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-amber-500">
            <Flame className="w-4 h-4 fill-amber-500" />
            <span>السلسلة الحالية: {streak} يوم</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--primary)]">
            <Trophy className="w-4 h-4" />
            <span>النقاط: {score} / {QUESTIONS.length}</span>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-sm">
          {/* Question Progress Header */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-[var(--border)] text-xs text-[var(--text-muted)] font-bold">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              المحطة: {q.city} ({q.category})
            </span>
            <span>
              السؤال {currentIdx + 1} من {QUESTIONS.length}
            </span>
          </div>

          {/* Question Box */}
          <h2 className="text-lg md:text-xl font-black text-[var(--text)] mb-6 leading-relaxed">
            {q.question}
          </h2>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {q.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === q.correctIndex;

              let btnStyle =
                "bg-[var(--bg)] border-[var(--border)] hover:border-[var(--primary)] text-[var(--text)]";

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-600 font-bold";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "bg-red-500/10 border-red-500 text-red-600 font-bold";
                } else {
                  btnStyle = "bg-[var(--bg)] border-[var(--border)] opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-xl border text-sm font-semibold text-right transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && (
            <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] mb-6 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--primary)]">
                <BookOpen className="w-4 h-4" />
                <span>المعلومة والتوثيق التاريخي:</span>
              </div>
              <p className="text-xs md:text-sm text-[var(--text)] leading-relaxed">
                {q.explanation}
              </p>
            </div>
          )}

          {/* Next / Finish Button */}
          {isAnswered && (
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <span>{currentIdx + 1 < QUESTIONS.length ? "السؤال التالي" : "عرض النتيجة النهائية"}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Completion Screen */
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center shadow-sm space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-[var(--text)] mb-2">
              تهانينا! أنهيت تحدي المعرفة اليومي
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              أجبت بشكل صحيح على {score} من أصل {QUESTIONS.length} أسئلة!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] max-w-sm mx-auto text-xs font-bold text-[var(--text)] space-y-1">
            <span className="block text-amber-500 text-sm">🔥 سلسلة إنجازك: {streak} يوم متواصل!</span>
            <span className="text-[var(--text-muted)] font-normal">
              عد غداً صباحاً لتحدٍ جديد ومعالم فلسطينية أخرى لحفظ ذاكرتنا المشتركة.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleShare}
              className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? "تم نسخ النتيجة!" : "مشاركة النتيجة مع الأصدقاء"}</span>
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] hover:bg-[var(--border)] text-xs font-bold text-[var(--text)] flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة التحدي</span>
            </button>
          </div>
        </div>
      )}

      {/* Cultural Fact Box */}
      <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 flex items-start gap-4">
        <div className="p-2 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] shrink-0">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-black text-[var(--text)] mb-1">
            لماذا نبني «ألعاب العقل وتحدي المعرفة» في الوطن اليوم؟
          </h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            لأن الحفاظ على الهوية الوطنية الفلسطينية وأسماء القرى المهجرة وتاريخ المعالم ليس مجرد قراءة أخبار عاجلة، بل معرفة حية تنتقل بين الأجيال بطريقة تفاعلية وممتعة تثبت الحق والحقيقة.
          </p>
        </div>
      </div>
    </div>
  );
}

