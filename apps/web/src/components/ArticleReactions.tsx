"use client";

import { useState, useEffect } from "react";

interface Props {
  articleId: string;
}

interface Reaction {
  id: string;
  emoji: string;
  label: string;
  count: number;
}

export function ArticleReactions({ articleId }: Props) {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [reactions, setReactions] = useState<Reaction[]>([
    { id: "solidarity", emoji: "🇵🇸", label: "متضامن", count: 184 },
    { id: "insightful", emoji: "💡", label: "تحليلي مهم", count: 96 },
    { id: "urgent", emoji: "🚨", label: "عاجل ومؤثر", count: 142 },
    { id: "helpful", emoji: "👍", label: "موثق ومفيد", count: 75 },
  ]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`awt_reaction_${articleId}`);
      if (saved) {
        setSelectedReaction(saved);
      }
    } catch {}
  }, [articleId]);

  const handleVote = (reactionId: string) => {
    if (selectedReaction === reactionId) return; // تم التصويت مسبقاً لنفس الخيار

    setReactions((prev) =>
      prev.map((r) => {
        if (r.id === reactionId) {
          return { ...r, count: r.count + 1 };
        }
        if (r.id === selectedReaction) {
          return { ...r, count: Math.max(0, r.count - 1) };
        }
        return r;
      })
    );

    setSelectedReaction(reactionId);
    try {
      localStorage.setItem(`awt_reaction_${articleId}`, reactionId);
    } catch {}
  };

  return (
    <div className="card-hyper-luxury p-5 sm:p-6 space-y-4 my-8 no-print border border-[var(--gold)]/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] animate-pulse" />
          <h4 className="font-black text-sm md:text-base text-[var(--text)]">
            ما هو انطباعك عن هذه التغطية الصحفية؟
          </h4>
        </div>
        <span className="text-[11px] font-bold text-[var(--gold)] bg-[var(--gold)]/10 px-2.5 py-0.5 rounded-full border border-[var(--gold)]/30">
          {reactions.reduce((sum, r) => sum + r.count, 0)} تفاعل موثق
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {reactions.map((r) => {
          const isSelected = selectedReaction === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => handleVote(r.id)}
              className={`p-3 rounded-2xl border flex items-center justify-between transition-all duration-300 cursor-pointer magnetic-btn ${
                isSelected
                  ? "border-[var(--gold)] bg-gradient-to-r from-[var(--gold)]/20 to-[var(--gold)]/10 text-[var(--gold)] font-black scale-105 shadow-md shadow-[var(--gold-glow)]"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)]/50 text-[var(--text)] hover:scale-102"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg leading-none">{r.emoji}</span>
                <span className="text-xs font-bold">{r.label}</span>
              </div>
              <span className="text-xs font-mono font-black opacity-90">{r.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

