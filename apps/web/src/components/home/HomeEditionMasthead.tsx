import Link from "next/link";
import {
  Compass,
  Flame,
  Coins,
  Film,
  Trophy,
  Globe2,
  History,
  Sparkles,
  Landmark,
  Calendar,
} from "lucide-react";

interface Props {
  totalBreaking: number;
  totalStories: number;
  totalQuotes: number;
}

const SECTION_ANCHORS = [
  { href: "#trending-stories", label: "القصص المتصاعدة", icon: Flame },
  { href: "#palestine-citadel", label: "فلسطين والميدان", icon: Landmark },
  { href: "#gold-markets", label: "الذهب والعملات", icon: Coins },
  { href: "#cinema-reels", label: "فيديو وريلز", icon: Film },
  { href: "#sports-arena", label: "دوري الأبطال والرياضة", icon: Trophy },
  { href: "#global-matrix", label: "العربي والدولي", icon: Globe2 },
  { href: "#culture-history", label: "الصوت والتاريخ", icon: History },
  { href: "#smart-hubs", label: "المراكز الذكية", icon: Sparkles },
] as const;

export function HomeEditionMasthead({ totalBreaking, totalStories, totalQuotes }: Props) {
  const now = new Date();
  const arabicDate = now.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Jerusalem",
  });

  return (
    <section className="relative rounded-3xl overflow-hidden border border-[var(--border)] dark:border-[var(--gold)]/30 bg-[var(--surface)] dark:bg-gradient-to-r dark:from-[#1f030b]/95 dark:via-[#140207]/95 dark:to-[#0c0205]/95 p-5 sm:p-7 shadow-xl space-y-5">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-85" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--border)] dark:border-white/10 pb-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary)]/10 dark:bg-[var(--gold)]/15 text-[var(--primary)] dark:text-[var(--gold)] border border-[var(--primary)]/20 dark:border-[var(--gold)]/35 font-black">
              <Compass className="w-3.5 h-3.5" />
              <span>طبعة القدس الرقمية الشاملة</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)] font-semibold">
              <Calendar className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>{arabicDate}</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[var(--text)] tracking-tight title-imperial">
            الواجهة الرئيسية الشاملة —{" "}
            <span className="text-[var(--primary)] dark:text-[var(--gold)]">
              كل الأخبار، الميدان، الأسواق، والملاعب في مكان واحد
            </span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0 text-xs">
          <Link
            href="/breaking"
            className="px-3.5 py-2 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-300 font-black flex items-center gap-1.5 hover:bg-rose-500/20 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>{totalBreaking} عواجل نشطة</span>
          </Link>

          <Link
            href="/stories"
            className="px-3.5 py-2 rounded-2xl bg-[var(--bg)] dark:bg-white/5 border border-[var(--border)] dark:border-white/10 text-[var(--text)] font-bold"
          >
            <strong className="font-mono text-[var(--primary)] dark:text-[var(--gold)] me-1">
              {totalStories}
            </strong>
            <span>ملف قصة حية</span>
          </Link>

          <Link
            href="/economy"
            className="px-3.5 py-2 rounded-2xl bg-[var(--bg)] dark:bg-white/5 border border-[var(--border)] dark:border-white/10 text-[var(--text)] font-bold"
          >
            <strong className="font-mono text-emerald-600 dark:text-emerald-400 me-1">
              {totalQuotes}
            </strong>
            <span>مؤشرات مالية</span>
          </Link>
        </div>
      </div>

      {/* شريط التنقل السريع بين طوابق الصفحة الرئيسية */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5 text-xs font-bold">
        <span className="text-[11px] text-[var(--text-muted)] shrink-0 ms-1">تصفح الأقسام:</span>
        {SECTION_ANCHORS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--bg)] dark:bg-white/[0.04] border border-[var(--border)] dark:border-white/10 hover:border-[var(--primary)] dark:hover:border-[var(--gold)]/60 text-[var(--text)] hover:text-[var(--primary)] dark:hover:text-[var(--gold)] transition-all whitespace-nowrap shrink-0"
            >
              <Icon className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
