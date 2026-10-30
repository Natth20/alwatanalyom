"use client";

import { useState, useEffect } from "react";
import { Gamepad2, Trophy, Sparkles, CheckCircle2, RotateCcw, Share2, HelpCircle } from "lucide-react";

interface Question {
  clue: string;
  answer: string;
  category: string;
  fact: string;
}

const DAILY_CHALLENGE: Question = {
  clue: "مدينة فلسطينية تاريخية ساحلية، عُرفت بأسوارها العتيدة التي تحطمت عليها أحلام نابليون بونابرت عام 1799؟",
  answer: "عكا",
  category: "تاريخ وجغرافيا فلسطين",
  fact: "صمدت أسوار عكا بقيادة أحمد باشا الجزار ومساعدة الأسطول العثماني، مما اضطر نابليون للانسحاب قائلاً: «يا عكا.. لقد ضيعتِ عليّ مستقبلي».",
};

export function DailyMindGames() {
  const [guess, setGuess] = useState("");
  const [hasWon, setHasWon] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(3);

  useEffect(() => {
    const savedState = localStorage.getItem("awt_daily_game_solved");
    if (savedState) {
      setHasWon(true);
    }
  }, []);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim()) return;

    const normalizedGuess = guess.trim().replace(/[إأآا]/g, "ا");
    const normalizedAnswer = DAILY_CHALLENGE.answer.replace(/[إأآا]/g, "ا");

    if (normalizedGuess === normalizedAnswer) {
      setHasWon(true);
      localStorage.setItem("awt_daily_game_solved", "true");
    } else {
      setAttempts((prev) => prev + 1);
      if (attempts >= 1) {
        setShowHint(true);
      }
    }
  };

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black text-[var(--text)]">
                تحدي اليوم الذكي · ثقافة وذاكرة
              </h2>
              <span className="text-[10px] font-bold bg-purple-500/15 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-full">
                لعبة يومية
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              اختبر معلوماتك التاريخية والجغرافية في دقيقة واحدة يومياً مع قراء «الوطن اليوم»
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold bg-[var(--bg)] px-3 py-1.5 rounded-xl border border-[var(--border)]">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>سلسلة إنجازاتك: <strong>{streak} أيام متتالية</strong></span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="p-5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] space-y-3">
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
            {DAILY_CHALLENGE.category}
          </span>
          <h3 className="text-base md:text-lg font-bold text-[var(--text)] leading-relaxed">
            {DAILY_CHALLENGE.clue}
          </h3>
          <span className="text-[11px] text-[var(--text-muted)] block font-mono">
            عدد الحروف: ({DAILY_CHALLENGE.answer.length} أحرف)
          </span>
        </div>

        {hasWon ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-black text-lg text-emerald-700 dark:text-emerald-400">
              إجابة صحيحة وممتازة! 🎉 الإجابة هي: «{DAILY_CHALLENGE.answer}»
            </h4>
            <p className="text-xs text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
              {DAILY_CHALLENGE.fact}
            </p>
            <div className="pt-2 text-xs text-[var(--text-muted)]">
              موعد التحدي القادم: الليلة عند منتصف الليل بتوقيت القدس الشريف.
            </div>
          </div>
        ) : (
          <form onSubmit={handleCheck} className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="اكتب إجابتك هنا..."
                className="flex-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm font-bold text-[var(--text)] focus:outline-none focus:border-purple-600 text-center tracking-widest shadow-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition-colors shadow-md"
              >
                تحقق
              </button>
            </div>

            {attempts > 0 && !hasWon && (
              <p className="text-xs text-rose-500 text-center">
                إجابة غير صحيحة، حاول مجدداً! (المحاولة رقم {attempts})
              </p>
            )}

            {showHint && !hasWon && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>تلميح مساعد: أول حرف من اسم المدينة هو «{DAILY_CHALLENGE.answer[0]}».</span>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

