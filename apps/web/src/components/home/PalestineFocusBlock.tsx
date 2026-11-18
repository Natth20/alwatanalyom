import Link from "next/link";
import { StorySummary } from "@awt/shared";
import { ArticleCard } from "@/components/ArticleCard";
import { ShieldCheck, ChevronLeft, Flame, Radio } from "lucide-react";

interface Props {
  stories: StorySummary[];
}

export function PalestineFocusBlock({ stories }: Props) {
  if (!stories || stories.length === 0) return null;

  const leadStory = stories[0];
  const otherStories = stories.slice(1, 4);

  return (
    <section className="space-y-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#072415]/30 via-[var(--surface)] to-[var(--surface)] p-6 sm:p-8 shadow-md">
      {/* ترويسة القسم السيادي لفلسطين والميدان */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#0E472A] text-white flex items-center justify-center font-black text-2xl shadow-md border border-emerald-500/30 shrink-0">
            🇵🇸
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight">
                فلسطين أولاً · غرفة الميدان والقدس
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>القاموس الوطني الموحد</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              تغطية ميدانية وتحقق لحظي لكافة المستجدات في غزة والقدس والضفة الغربية من قلب الحدث ومن مصادرها المعتمدة.
            </p>
          </div>
        </div>

        <Link
          href="/palestine"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#590018] text-[var(--gold)] text-xs font-black hover:brightness-110 transition-all border border-[var(--gold)]/30 shrink-0 self-start sm:self-auto shadow-md"
        >
          <span>تغطيات فلسطين الكاملة</span>
          <ChevronLeft className="w-4 h-4 rtl:rotate-0" />
        </Link>
      </div>

      {/* المحتوى المركزي: قصة رئيسية عريضة + 3 قصص مصورة مساندة */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* القصة الميدانية الرئيسية */}
        {leadStory && leadStory.articles[0] && (
          <div className="lg:col-span-7">
            <ArticleCard article={leadStory.articles[0]} variant="hero" />
          </div>
        )}

        {/* القصص الميدانية الفرعية الثلاث مصحوبة بصور دائمة */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-3.5">
            {otherStories.map((story) => {
              const art = story.articles[0];
              if (!art) return null;
              return (
                <ArticleCard key={art.id} article={art} variant="compact" />
              );
            })}
          </div>

          {/* أزرار الوصول السريع لغرف العمليات الميدانية */}
          <div className="pt-3 border-t border-[var(--border)] flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-[var(--text-muted)] text-[11px] font-bold">غرف العمليات:</span>
            <Link
              href="/palestine/gaza"
              className="px-3 py-1.5 rounded-xl bg-emerald-950/20 dark:bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500 text-xs text-emerald-400 font-bold transition-colors"
            >
              غزة الميدان
            </Link>
            <Link
              href="/palestine/jerusalem"
              className="px-3 py-1.5 rounded-xl bg-emerald-950/20 dark:bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500 text-xs text-emerald-400 font-bold transition-colors"
            >
              القدس والأقصى
            </Link>
            <Link
              href="/palestine/west-bank"
              className="px-3 py-1.5 rounded-xl bg-emerald-950/20 dark:bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500 text-xs text-emerald-400 font-bold transition-colors"
            >
              الضفة الغربية
            </Link>
            <Link
              href="/aid"
              className="px-3 py-1.5 rounded-xl bg-amber-950/20 dark:bg-amber-950/40 border border-amber-500/30 hover:border-amber-500 text-xs text-[var(--gold)] font-bold transition-colors"
            >
              المساعدات والإغاثة
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
