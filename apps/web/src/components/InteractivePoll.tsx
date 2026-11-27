"use client";

import { useState, useEffect } from "react";
import { BarChart3, CheckCircle2, Users, Loader2, ShieldCheck } from "lucide-react";

interface PollOptionDTO {
  id: string;
  text: string;
  votes: number;
}

interface PollDTO {
  id: string;
  slug: string;
  question: string;
  description?: string | null;
  totalVotes: number;
  votedOptionId: string | null;
  options: PollOptionDTO[];
}

export function InteractivePoll() {
  const [poll, setPoll] = useState<PollDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/v1/polls")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.poll) {
          setPoll(data.poll);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleVote = async (optionId: string) => {
    if (!poll || poll.votedOptionId || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/v1/polls/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pollId: poll.id, optionId }),
      });
      const json = await res.json();
      if (res.ok && json.poll) {
        setPoll(json.poll);
      } else {
        setErrorMsg(json?.error?.message || "تعذر تسجيل صوتك.");
      }
    } catch {
      setErrorMsg("تعذر الاتصال بقاعدة البيانات لتسجيل الصوت.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="card-luxury rounded-3xl p-6 space-y-4 shadow-md animate-pulse">
        <div className="h-5 bg-[var(--border)] rounded w-2/3" />
        <div className="space-y-2.5">
          <div className="h-10 bg-[var(--border)] rounded-xl" />
          <div className="h-10 bg-[var(--border)] rounded-xl" />
          <div className="h-10 bg-[var(--border)] rounded-xl" />
        </div>
      </div>
    );
  }

  if (!poll) {
    return null;
  }

  const hasVoted = Boolean(poll.votedOptionId);

  return (
    <div className="card-luxury rounded-3xl p-6 space-y-5 shadow-md border border-[var(--border)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-black text-sm text-[var(--text)]">استطلاع رأي القراء</h3>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>تصويت حقيقي مسجّل لحظياً</span>
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm font-black text-[var(--text)] leading-snug">{poll.question}</p>

      <div className="space-y-2.5">
        {poll.options.map((opt) => {
          const pct =
            poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
          const isSelected = poll.votedOptionId === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              disabled={hasVoted || submitting}
              onClick={() => handleVote(opt.id)}
              className={`w-full relative rounded-2xl border p-3.5 text-start transition-all overflow-hidden ${
                isSelected
                  ? "border-[var(--primary)] bg-[var(--primary)]/10"
                  : hasVoted
                    ? "border-[var(--border)] bg-[var(--bg)]"
                    : "border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)]/60 cursor-pointer"
              }`}
            >
              {hasVoted && (
                <div
                  className={`absolute inset-y-0 start-0 transition-all duration-500 ${
                    isSelected ? "bg-[var(--primary)]/20" : "bg-stone-500/10"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              )}

              <div className="relative z-10 flex items-center justify-between gap-2 text-xs font-bold">
                <span className="flex items-center gap-2 text-[var(--text)] leading-snug">
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0" />}
                  <span>{opt.text}</span>
                </span>
                {hasVoted && (
                  <span className="font-mono font-black text-[var(--primary)] shrink-0">
                    {pct}% ({opt.votes})
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {errorMsg && (
        <p className="text-[11px] text-rose-500 font-bold">{errorMsg}</p>
      )}

      <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
        <span className="flex items-center gap-1.5 font-bold">
          <Users className="w-3.5 h-3.5 text-[var(--primary)]" />
          <span>إجمالي المشاركين: {poll.totalVotes.toLocaleString("ar-EG")}</span>
        </span>
        {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--primary)]" />}
        {!hasVoted && !submitting && <span>اضغط على خيارك للتصويت</span>}
      </div>
    </div>
  );
}
