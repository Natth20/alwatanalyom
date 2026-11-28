import Link from "next/link";
import { Metadata } from "next";
import { getChannels } from "@/lib/dal";
import { LiveChannelsFilter } from "@/components/LiveChannelsFilter";
import { Radio, Tv, ShieldCheck, Globe2, ChevronLeft, Compass, Film } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "دليل البث المباشر المعتمد — الوطن اليوم",
  description:
    "دليل شامل وموثق لقنوات البث الإخباري الحي العربية والعالمية بروابط رسمية مفحوصة دورياً.",
  alternates: { canonical: "/live" },
};

export default async function LiveDirectoryPage() {
  const channels = await getChannels();
  const activeCount = channels.filter((c) => c.status === "AVAILABLE").length || channels.length;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-20">
      <div className="container-custom py-10 max-w-7xl space-y-10">
        {/* مسار التنقل */}
        <nav aria-label="فتات الخبز" className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">
            الرئيسية
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-[var(--gold)]/60 rtl:rotate-0" />
          <span className="text-[var(--primary)] font-black">غرفة البث الفضائي المباشر</span>
        </nav>

        {/* ترويسة غرفة التحكم الفضائي الملكية */}
        <header className="relative rounded-3xl overflow-hidden border border-rose-500/35 bg-gradient-to-br from-[#230109] via-[#130106] to-[#060002] text-white p-8 md:p-11 shadow-2xl space-y-6">
          <div className="pointer-events-none absolute -top-24 end-0 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl" />
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-80" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600 text-white text-xs font-black shadow-lg">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>بث فضائي وإخباري معتمد 24/7</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[11px] font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>روابط رسمية مفحوصة دورياً</span>
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                غرفة البث <span className="text-[var(--gold)]">الفضائي المباشر</span>
              </h1>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                دليل رسمي موحد لأبرز القنوات الإخبارية العربية والفلسطينية والدولية. نوجّه القارئ مباشرة إلى منصات البث المصرّح بها رسمياً من أصحاب البث دون وسطاء.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 text-center min-w-[120px]">
                <strong className="font-mono text-2xl font-black text-[var(--gold)] block">
                  {activeCount}
                </strong>
                <span className="text-[11px] text-stone-300 block mt-0.5">قناة بث معتمدة</span>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/live-360"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-black text-white transition-all"
                >
                  <Compass className="w-3.5 h-3.5 text-[var(--gold)]" />
                  <span>عدسة التغطية 360°</span>
                </Link>
                <Link
                  href="/videos"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[var(--gold)]/15 hover:bg-[var(--gold)]/25 border border-[var(--gold)]/35 text-xs font-black text-[var(--gold)] transition-all"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>استوديو الفيديو 4K</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* مكوّن التصفية التفاعلي وشبكة القنوات */}
        <LiveChannelsFilter channels={channels} />
      </div>
    </div>
  );
}
