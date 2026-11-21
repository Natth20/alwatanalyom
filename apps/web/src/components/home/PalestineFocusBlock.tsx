import Link from "next/link";
import { StorySummary } from "@awt/shared";
import { ArticleCard } from "@/components/ArticleCard";
import { ShieldCheck, ChevronLeft, MapPin, Landmark, HeartHandshake, Eye } from "lucide-react";

interface Props {
  stories: StorySummary[];
}

export function PalestineFocusBlock({ stories }: Props) {
  if (!stories || stories.length === 0) return null;

  const leadStory = stories[0];
  const otherStories = stories.slice(1, 4);

  return (
    <section className="space-y-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#041F12] via-[#03150C] to-[#010B06] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* لمسة إشعاعية خضراء في زاوية السكشن */}
      <div className="absolute top-0 end-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. ترويسة القسم السيادي لفلسطين والميدان */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0E472A] to-[#062415] text-white flex items-center justify-center font-black text-2xl shadow-xl border border-emerald-400/30 shrink-0">
            🇵🇸
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                صرح فلسطين أولاً · غرفة الميدان والقدس
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>القاموس الوطني الموحد</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              تغطية ميدانية ورصد لحظي لكافة المستجدات في القدس المحتلة، غزة، الضفة الغربية، وشؤون الأسرى.
            </p>
          </div>
        </div>

        <Link
          href="/palestine"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--burgundy-hover)] text-[var(--gold)] text-xs font-black hover:brightness-110 transition-all border border-[var(--gold)]/40 shrink-0 shadow-lg shadow-rose-950/40"
        >
          <span>تغطيات فلسطين الكاملة</span>
          <ChevronLeft className="w-4 h-4 rtl:rotate-0" />
        </Link>
      </div>

      {/* 2. بوابات غرف العمليات الأربع الفاخرة */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 relative z-10">
        <Link
          href="/palestine/jerusalem"
          className="p-3.5 rounded-2xl border border-emerald-500/20 bg-white/[0.03] hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black text-white group-hover:text-emerald-300 transition-colors">
              القدس العاصمة والأقصى
            </span>
            <Landmark className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-[10px] text-slate-400">رصد الاقتحامات والتهويد</p>
        </Link>

        <Link
          href="/palestine/gaza"
          className="p-3.5 rounded-2xl border border-rose-500/20 bg-white/[0.03] hover:bg-rose-500/10 hover:border-rose-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black text-white group-hover:text-rose-300 transition-colors">
              غزة الصمود والميدان
            </span>
            <MapPin className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-[10px] text-slate-400">تطورات الإغاثة والإعمار</p>
        </Link>

        <Link
          href="/palestine/west-bank"
          className="p-3.5 rounded-2xl border border-amber-500/20 bg-white/[0.03] hover:bg-amber-500/10 hover:border-amber-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black text-white group-hover:text-amber-300 transition-colors">
              الضفة والأغوار
            </span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-[10px] text-slate-400">مواجهات ومخططات الاستيطان</p>
        </Link>

        <Link
          href="/palestine/prisoners"
          className="p-3.5 rounded-2xl border border-sky-500/20 bg-white/[0.03] hover:bg-sky-500/10 hover:border-sky-500/40 transition-all group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-black text-white group-hover:text-sky-300 transition-colors">
              الأسرى والشهداء
            </span>
            <HeartHandshake className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-[10px] text-slate-400">سجل التوثيق وحقوق المعتقلين</p>
        </Link>
      </div>

      {/* 3. المحتوى التحريري: قصة رئيسية عريضة + 3 كروت مساندة */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
        {/* القصة الميدانية الرئيسية */}
        {leadStory && leadStory.articles[0] && (
          <div className="lg:col-span-7">
            <ArticleCard article={leadStory.articles[0]} variant="hero" />
          </div>
        )}

        {/* القصص الميدانية الفرعية الثلاث */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
          <div className="space-y-3">
            {otherStories.map((story) => {
              const art = story.articles[0];
              if (!art) return null;
              return (
                <ArticleCard key={art.id} article={art} variant="compact" />
              );
            })}
          </div>

          <div className="p-4 rounded-2xl border border-white/10 bg-black/40 text-xs text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold">المراسلون في الميدان:</span>
              <span className="text-slate-400">رصد على مدار الساعة</span>
            </div>
            <Link href="/pulse" className="text-emerald-400 font-bold hover:underline flex items-center gap-1">
              <span>برقيات عاجلة</span>
              <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
