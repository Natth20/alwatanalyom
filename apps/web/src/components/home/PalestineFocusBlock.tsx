import Link from "next/link";
import { StorySummary } from "@awt/shared";
import { ArticleCard } from "@/components/ArticleCard";
import { ShieldCheck, ChevronLeft } from "lucide-react";

interface Props {
  stories: StorySummary[];
}

export function PalestineFocusBlock({ stories }: Props) {
  if (!stories || stories.length === 0) return null;

  const leadStory = stories[0];
  const otherStories = stories.slice(1, 4);

  return (
    <section className="space-y-6 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-950/10 via-[var(--surface)] to-[var(--surface)] p-6 sm:p-8 shadow-sm">
      {/* ترويسة القسم */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🇵🇸</span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight">
                فلسطين أولاً
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3" />
                <span>القاموس الوطني الموحد</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              تغطية ميدانية وتحقق لحظي لكافة المستجدات في غزة والقدس والضفة الغربية من قلب الحدث.
            </p>
          </div>
        </div>

        <Link
          href="/palestine"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#590018] text-[var(--gold)] text-xs font-bold hover:opacity-90 transition-opacity border border-[var(--gold)]/30 shrink-0 self-start sm:self-auto"
        >
          <span>تغطيات فلسطين الكاملة</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* المحتوى المركزي */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* القصة الرئيسية لفلسطين */}
        {leadStory && leadStory.articles[0] && (
          <div className="lg:col-span-7">
            <ArticleCard article={leadStory.articles[0]} variant="hero" />
          </div>
        )}

        {/* القصص الفرعية الثلاث */}
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

          {/* روابط وصول سريعة للأقسام الفرعية */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="text-[var(--text-muted)] text-[11px]">ملفات عاجلة:</span>
            <Link
              href="/palestine/gaza"
              className="px-2.5 py-1 rounded-lg bg-[var(--surface-muted,#f8fafc)] dark:bg-stone-900 border border-[var(--border)] hover:border-emerald-500 text-[11px] hover:text-emerald-400 transition-colors"
            >
              غزة الميدان
            </Link>
            <Link
              href="/palestine/jerusalem"
              className="px-2.5 py-1 rounded-lg bg-[var(--surface-muted,#f8fafc)] dark:bg-stone-900 border border-[var(--border)] hover:border-emerald-500 text-[11px] hover:text-emerald-400 transition-colors"
            >
              القدس والأقصى
            </Link>
            <Link
              href="/palestine/west-bank"
              className="px-2.5 py-1 rounded-lg bg-[var(--surface-muted,#f8fafc)] dark:bg-stone-900 border border-[var(--border)] hover:border-emerald-500 text-[11px] hover:text-emerald-400 transition-colors"
            >
              الضفة الغربية
            </Link>
            <Link
              href="/aid"
              className="px-2.5 py-1 rounded-lg bg-[var(--surface-muted,#f8fafc)] dark:bg-stone-900 border border-[var(--border)] hover:border-[var(--gold)] text-[11px] hover:text-[var(--gold)] transition-colors"
            >
              المساعدات والإغاثة
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
