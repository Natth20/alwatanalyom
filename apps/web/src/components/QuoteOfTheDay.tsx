import Link from "next/link";
import { MessageSquareQuote, ArrowLeft } from "lucide-react";

interface Props {
  quoteText?: string;
  speaker?: string;
  speakerRole?: string;
  sourceUrl?: string;
}

export function QuoteOfTheDay({
  quoteText = "شعبنا في قطاع غزة والقدس والضفة لن ينكسر، ومستشفياتنا ستظل شاهدة على أسطورة الصمود والتمسك بالأرض والهوية.",
  speaker = "الدكتور حسام أبو صفية",
  speakerRole = "مدير مستشفى كمال عدوان — شمال غزة",
  sourceUrl = "/palestine",
}: Props) {
  return (
    <div className="relative rounded-2xl overflow-hidden p-6 md:p-8 bg-gradient-to-l from-emerald-950 via-[var(--surface)] to-[var(--surface)] border border-emerald-500/30 shadow-md">
      {/* علامة الاقتباس المائية بالخلفية */}
      <span className="absolute -top-6 start-4 text-8xl text-emerald-500/10 font-serif select-none pointer-events-none">
        “
      </span>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquareQuote className="w-4 h-4" />
              <span>تصريح وموقف اليوم</span>
            </span>
          </div>

          <blockquote className="text-base md:text-xl font-black text-[var(--text)] leading-relaxed italic">
            &ldquo;{quoteText}&rdquo;
          </blockquote>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[var(--text)]">{speaker}</span>
            <span className="text-[var(--text-muted)]">|</span>
            <span className="text-[var(--text-muted)]">{speakerRole}</span>
          </div>
        </div>

        <div className="shrink-0">
          <Link
            href={sourceUrl}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md hover:gap-3"
          >
            <span>متابعة سياق التصريح</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

