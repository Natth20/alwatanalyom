import Link from "next/link";
import { Metadata } from "next";
import { fetchWikipediaOnThisDay } from "@/lib/live-data/history-events";
import { History, Calendar, ExternalLink, Landmark, BookOpen, Sparkles } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "ذاكرة الوطن · في مثل هذا اليوم عبر التاريخ — الوطن اليوم",
  description: "استعراض حي لأحداث مثل هذا اليوم التاريخية عبر موسوعة ويكيبيديا العربية، مع إبراز المحطات الفلسطينية والعربية.",
  alternates: { canonical: "/history" },
};

export default async function HistoryPage() {
  const snapshot = await fetchWikipediaOnThisDay();

  return (
    <div className="container-custom py-10 max-w-5xl space-y-10">
      {/* ترويسة الأرشيف التاريخي باللون البرونزي والذهبي الملكي */}
      <header className="relative rounded-3xl overflow-hidden border border-amber-500/35 bg-gradient-to-br from-[#211505] via-[#190B07] to-[#0B0402] text-white p-8 md:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/35 text-amber-300 text-xs font-black">
          <Calendar className="w-3.5 h-3.5" />
          <span>سجل اليوم الحقيقي: {snapshot.dateLabelAr}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          في مثل هذا اليوم · <span className="text-[var(--gold)]">ذاكرة التاريخ</span>
        </h1>

        <p className="text-xs sm:text-sm text-amber-100/80 max-w-2xl leading-relaxed">
          سجل يومي متجدد تلقائياً يجلب أحداث <strong className="text-white">{snapshot.dateLabelAr}</strong> الموثقة مباشرة من {snapshot.source}.
        </p>
      </header>

      {/* قائمة الأحداث الموثقة لليوم */}
      {snapshot.events.length > 0 ? (
        <div className="space-y-5 relative before:absolute before:inset-y-4 before:start-5 before:w-0.5 before:bg-amber-500/25">
          {snapshot.events.map((ev, idx) => (
            <article
              key={`${ev.year}-${idx}`}
              className="relative ps-14"
            >
              <div className="absolute start-1.5 top-5 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-[#140106] font-mono text-[10px] font-black flex items-center justify-center shadow-md border-2 border-[var(--bg)]">
                {String(ev.year).slice(-2)}
              </div>

              <div
                className={`rounded-3xl border p-6 space-y-3 shadow-sm ${
                  ev.isPalestineOrArab
                    ? "border-emerald-500/40 bg-emerald-950/10"
                    : "border-[var(--border)] bg-[var(--surface)]"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-mono text-xs font-black">
                      عام {ev.year}
                    </span>
                    {ev.isPalestineOrArab && (
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 text-[10px] font-black inline-flex items-center gap-1">
                        <Landmark className="w-3 h-3" />
                        <span>محطة عربية / فلسطينية</span>
                      </span>
                    )}
                  </div>

                  {ev.wikiUrl && (
                    <a
                      href={ev.wikiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
                    >
                      <span>اقرأ المرجع الموسوعي</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <h2 className="text-base md:text-lg font-black text-[var(--text)] leading-snug">
                  {ev.title}
                </h2>

                {ev.description !== ev.title && (
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {ev.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-amber-500 mx-auto opacity-60" />
          <p className="text-sm font-bold text-[var(--text)]">
            تعذر الاتصال بأرشيف ويكيبيديا العربية لحظياً — يرجى إعادة المحاولة بعد قليل.
          </p>
          <Link href="/atlas" className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>استكشف أطلس فلسطين التاريخي</span>
          </Link>
        </div>
      )}
    </div>
  );
}
