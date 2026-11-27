"use client";

import { useState, useEffect } from "react";
import { Gamepad2, Trophy, CheckCircle2, RotateCcw } from "lucide-react";

interface Question {
  clue: string;
  answer: string;
  category: string;
  fact: string;
}

const QUESTION_BANK: Question[] = [
  {
    clue: "مدينة فلسطينية تاريخية ساحلية عُرفت بأسوارها التي تحطمت عليها حملة نابليون بونابرت عام 1799؟",
    answer: "عكا",
    category: "تاريخ وجغرافيا فلسطين",
    fact: "صمدت أسوار عكا أمام الحصار بفضل تحصيناتها وموقعها البحري ومناعتها التاريخية.",
  },
  {
    clue: "أقدم مدن العالم المأهولة وتقع في غور الأردن وتشتهر بقصر هشام الأثري؟",
    answer: "أريحا",
    category: "جغرافيا وآثار",
    fact: "تُعد أريحا أقدم مدينة مأهولة متواصلة التاريخ وأكثرها انخفاضاً عن سطح البحر.",
  },
  {
    clue: "باب من أشهر أبواب المسجد الأقصى والبلدة القديمة في القدس ويعرف أيضاً بباب دمشق؟",
    answer: "باب العامود",
    category: "معالم القدس",
    fact: "يمثل باب العامود المدخل الشمالي الأبرز للبلدة القديمة وساحة التجمع التاريخية للمقدسيين.",
  },
];

export function DailyMindGames() {
  const dayIndex = new Date().getDate() % QUESTION_BANK.length;
  const challenge = QUESTION_BANK[dayIndex] || QUESTION_BANK[0]!;
  const storageKey = `awt_daily_solved_${new Date().toISOString().slice(0, 10)}`;

  const [guess, setGuess] = useState("");
  const [hasWon, setHasWon] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    try {
      const savedWon = localStorage.getItem(storageKey);
      if (savedWon === "true") setHasWon(true);
      const savedStreak = parseInt(localStorage.getItem("awt_game_streak") || "0", 10);
      if (!isNaN(savedStreak)) setStreak(savedStreak);
    } catch {}
  }, [storageKey]);

  const normalizeArabic = (str: string) =>
    str.trim().replace(/[إأآا]/g, "ا").replace(/ة/g, "ه");

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim()) return;

    if (normalizeArabic(guess) === normalizeArabic(challenge.answer)) {
      setHasWon(true);
      try {
        if (localStorage.getItem(storageKey) !== "true") {
          localStorage.setItem(storageKey, "true");
          const next = streak + 1;
          setStreak(next);
          localStorage.setItem("awt_game_streak", String(next));
        }
      } catch {}
    } else {
      setAttempts((p) => p + 1);
    }
  };

  return (
    <section className="card-luxury relative rounded-3xl p-6 md:p-8 shadow-lg overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[var(--text)]">تحدي الذاكرة والجغرافيا اليومي</h2>
            <p className="text-xs text-[var(--text-muted)]">اختبار معرفي تفاعلي يتجدد كل يوم</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold bg-[var(--bg)] px-3 py-1.5 rounded-xl border border-[var(--border)]">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>سلسلتك المسجلة محلياً: <strong>{streak}</strong></span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-5">
        <div className="p-5 rounded-2xl bg-[var(--bg)] border border-[var(--border)] space-y-2">
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
            {challenge.category}
          </span>
          <h3 className="text-base md:text-lg font-bold text-[var(--text)] leading-relaxed">
            {challenge.clue}
          </h3>
        </div>

        {hasWon ? (
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
            <div className="flex items-center gap-2 font-black text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <span>أحسنت! الإجابة: {challenge.answer}</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{challenge.fact}</p>
          </div>
        ) : (
          <form onSubmit={handleCheck} className="flex gap-2">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="اكتب الإجابة..."
              className="flex-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text)] focus:border-purple-500 outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black cursor-pointer"
            >
              تحقق
            </button>
          </form>
        )}

        {attempts > 0 && !hasWon && (
          <p className="text-xs text-rose-500 font-bold flex items-center gap-1">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>حاول مرة أخرى — تلميح: عدد حروف الإجابة {challenge.answer.length} أحرف.</span>
          </p>
        )}
      </div>
    </section>
  );
}
