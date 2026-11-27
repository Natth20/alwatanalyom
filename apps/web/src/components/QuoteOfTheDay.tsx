import Link from "next/link";
import { MessageSquareQuote, ArrowLeft } from "lucide-react";

interface Props {
  quoteText?: string;
  speaker?: string;
  speakerRole?: string;
  sourceUrl?: string;
}

export function QuoteOfTheDay({
  quoteText,
  speaker,
  speakerRole,
  sourceUrl = "/palestine",
}: Props) {
  if (!quoteText || !speaker) return null;

  return (
    <div className="card-luxury relative rounded-3xl overflow-hidden p-6 md:p-8 bg-gradient-to-l from-emerald-950/35 via-[var(--surface-elevated)] to-[var(--surface)] border border-emerald-500/30 shadow-lg">
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-black text-emerald-500">
            <MessageSquareQuote className="w-4 h-4" />
            <span>تصريح وموقف اليوم</span>
          </div>

          <blockquote className="text-base md:text-xl font-black text-[var(--text)] leading-relaxed">
            &ldquo;{quoteText}&rdquo;
          </blockquote>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[var(--text)]">{speaker}</span>
            {speakerRole && (
              <>
                <span className="text-[var(--text-muted)]">|</span>
                <span className="text-[var(--text-muted)]">{speakerRole}</span>
              </>
            )}
          </div>
        </div>

        <Link
          href={sourceUrl}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0"
        >
          <span>متابعة سياق التصريح</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
