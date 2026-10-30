import { CheckCircle2, BookmarkCheck } from "lucide-react";

interface Props {
  summary?: string | null;
  items?: string[];
}

export function KeyTakeaways({ summary, items }: Props) {
  // توليد محاور رئيسية من الملخص إذا لم تُمرر بنود محددة
  const defaultItems = items || (summary ? summary.split(/[.،]\s+/).filter((s) => s.trim().length > 15).slice(0, 3) : []);

  if (defaultItems.length === 0) return null;

  return (
    <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-950/20 p-4 space-y-2.5 my-6">
      <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
        <BookmarkCheck className="w-4 h-4" />
        <span>أبرز محاور هذه التغطية الصحفية:</span>
      </div>

      <ul className="space-y-1.5 text-xs text-[var(--text)] leading-relaxed">
        {defaultItems.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>{item.trim().replace(/[.،]$/, "")}.</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

