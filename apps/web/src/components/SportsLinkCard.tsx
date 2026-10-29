import Link from "next/link";

interface SportsLinkItem {
  entityId: string;
  nameAr: string;
  kind: string;
  urlPath?: string | null;
}

interface Props {
  links: SportsLinkItem[];
}

export function SportsLinkCard({ links }: Props) {
  if (!links || links.length === 0) return null;

  return (
    <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 my-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            تابع التغطية الرياضية على يلا سبورت
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          إحصاءات وجداول وترتيب الكيانات المذكورة في هذا الخبر
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {links.map((link) => (
          <a
            key={link.entityId}
            href={`https://yallasport.com${link.urlPath || `/entity/${link.entityId}`}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-[var(--surface)] text-xs font-bold text-[var(--text)] hover:border-emerald-500 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span>⚽ {link.nameAr}</span>
            <span className="text-[10px] text-emerald-500">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
