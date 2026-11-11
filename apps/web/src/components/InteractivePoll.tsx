"use client";

import { useState, useEffect } from "react";
import { Vote, CheckCircle2, Users, BarChart3 } from "lucide-react";

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export function InteractivePoll() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [options, setOptions] = useState<PollOption[]>([
    {
      id: "opt-1",
      text: "التوسع في مشاريع الطاقة الشمسية والاستقلال التام عن شبكات الاحتلال",
      votes: 1420,
    },
    {
      id: "opt-2",
      text: "تعزيز الرقابة وضبط أسعار السلع الاستهلاكية ودعم المنتجات الوطنية",
      votes: 890,
    },
    {
      id: "opt-3",
      text: "إطلاق منصات رقمية لتشغيل الكفاءات والشباب في الأسواق الإقليمية والدولية",
      votes: 1145,
    },
    {
      id: "opt-4",
      text: "تطوير البنية التحتية للمياه والزراعة المستدامة في الأرياف والأغوار",
      votes: 680,
    },
  ]);

  useEffect(() => {
    const savedVote = localStorage.getItem("awt_poll_vote_2026_q1");
    if (savedVote) {
      setSelectedOption(savedVote);
      setHasVoted(true);
    }
  }, []);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = (optionId: string) => {
    if (hasVoted) return;

    setSelectedOption(optionId);
    setHasVoted(true);
    localStorage.setItem("awt_poll_vote_2026_q1", optionId);

    setOptions((prev) =>
      prev.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      )
    );
  };

  return (
    <section className="card-luxury rounded-3xl p-6 md:p-8 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center shadow-md">
            <Vote className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-lg md:text-xl text-[var(--text)]">
                استطلاع رأي قراء «الوطن اليوم»
              </h3>
              <span className="text-[10px] bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold px-2 py-0.5 rounded-full">
                أسبوعي
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              صوتك ورأيك جزء أساسي من تغطيتنا وتوجيه النقاشات التحريرية
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] bg-[var(--bg)] px-3 py-1.5 rounded-lg border border-[var(--border)]">
          <Users className="w-3.5 h-3.5 text-[var(--primary)]" />
          <span>{totalVotes.toLocaleString("ar-EG")} مشارك</span>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="font-bold text-base md:text-lg text-[var(--text)] leading-relaxed">
          ما هي الأولوية الاقتصادية الأكثر إلحاحاً لتعزيز صمود المجتمع الفلسطيني في المرحلة الراهنة؟
        </h4>
      </div>

      <div className="space-y-3">
        {options.map((option) => {
          const percentage = Math.round((option.votes / (totalVotes || 1)) * 100);
          const isSelected = selectedOption === option.id;

          return (
            <div
              key={option.id}
              onClick={() => !hasVoted && handleVote(option.id)}
              className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-200 ${
                hasVoted
                  ? isSelected
                    ? "border-[var(--primary)] bg-[var(--primary)]/5"
                    : "border-[var(--border)] bg-[var(--bg)]"
                  : "border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 cursor-pointer"
              }`}
            >
              {/* شريط النسبة المئوية الخلفي */}
              {hasVoted && (
                <div
                  className="absolute inset-y-0 start-0 bg-[var(--primary)]/10 transition-all duration-700 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              )}

              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                        : "border-[var(--border)]"
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-sm font-semibold text-[var(--text)] leading-snug">
                    {option.text}
                  </span>
                </div>

                {hasVoted && (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-black text-[var(--primary)]">
                      {percentage}%
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)] hidden sm:inline">
                      ({option.votes.toLocaleString("ar-EG")})
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {hasVoted ? (
        <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-muted)] pt-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>تم تسجيل تصويتك بنجاح شكراً لمشاركتك الفاعلة</span>
          </div>
          <span className="text-[11px]">نتائج الاستطلاع تتحدث لحظياً</span>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <BarChart3 className="w-3.5 h-3.5 text-[var(--primary)]" />
          <span>انقر على أحد الخيارات أعلاه للتصويت ومشاهدة نسب النتائج فوراً</span>
        </div>
      )}
    </section>
  );
}

