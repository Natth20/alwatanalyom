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
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-3.5 my-8 no-print">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-xs md:text-sm text-[var(--text)]">
          ما هو انطباعك عن هذه التغطية الصحفية؟
        </h4>
        <span className="text-[11px] text-[var(--text-muted)]">
          {reactions.reduce((sum, r) => sum + r.count, 0)} تفاعل من القراء
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {reactions.map((r) => {
          const isSelected = selectedReaction === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => handleVote(r.id)}
              className={`p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                isSelected
                  ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)] font-bold scale-[1.02] shadow-sm"
                  : "border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)]/50 hover:bg-[var(--surface-hover)] text-[var(--text)]"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-base">{r.emoji}</span>
                <span className="text-xs">{r.label}</span>
              </div>
              <span className="text-xs font-mono font-bold opacity-80">{r.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
