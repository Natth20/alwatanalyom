import Link from "next/link";
import { Metadata } from "next";
import { getSectionFeed } from "@/lib/dal";
import { fetchLiveSports } from "@/lib/live-data/sports";
import { ArticleCard } from "@/components/ArticleCard";
import { TodayMatchesWidget } from "@/components/sports/TodayMatchesWidget";
import { YallaSportBanner } from "@/components/sports/YallaSportBanner";
import { Trophy, ShieldCheck, Radio, Medal } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "يلا سبورت — نتائج المباريات، ترتيب الدوريات، وأخبار الرياضة المباشرة",
  description: "المدرج الرياضي الأول: نتائج حية، ترتيب الدوريات الأوروبية والعربية المباشر عبر ESPN Global Soccer وأحدث الأخبار الرياضية.",
  alternates: { canonical: "/sports" },
};

export default async function SportsPage() {
  const [sportsFeed, liveSports] = await Promise.all([
    getSectionFeed("sports"),
    fetchLiveSports(),
  ]);

  const sportsArticles = sportsFeed?.articles || [];
  const leadArticle = sportsArticles[0];
  const restArticles = sportsArticles.slice(1);
  const liveCount = liveSports.matches.filter((m) => m.status === "LIVE").length;

  return (
    <div className="container-custom py-10 space-y-12">
      {/* 1. ترويسة المدرج الرياضي */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#042318] via-[#0B3B28] to-[#04140E] p-7 md:p-10 text-white border border-emerald-500/30 shadow-2xl">
        <div className="absolute -bottom-16 end-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/35 text-emerald-300 text-xs font-black">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>بث النتائج والترتيب الحقيقي ({liveSports.provider})</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">
              استوديو <span className="text-[var(--gold)]">يلا سبورت</span> الرياضي
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
              تغطية حية لحظة بلحظة لأقوى البطولات العالمية والعربية، جداول المباريات الرسمية، وترتيب الأندية المحدث مباشرة من الملاعب دون أي نتائج تقديرية.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-center min-w-[110px]">
              <strong className="font-mono text-2xl font-black text-[var(--gold)] block">
                {liveSports.matches.length}
              </strong>
              <span className="text-[11px] text-emerald-200">مباراة مرصودة</span>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-center min-w-[110px]">
              <strong className="font-mono text-2xl font-black text-red-400 block">
                {liveCount}
              </strong>
              <span className="text-[11px] text-emerald-200">مباشر الآن</span>
            </div>
          </div>
        </div>
      </header>

      <YallaSportBanner />

      {/* 2. ويدجت المباريات الحية */}
      <TodayMatchesWidget matches={liveSports.matches} />

      {/* 3. جداول الترتيب الحقيقية للدوريات */}
      {liveSports.standings.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <h2 className="text-2xl font-black text-[var(--text)] flex items-center gap-2">
              <Medal className="w-6 h-6 text-emerald-500" />
              <span>جداول الترتيب الحية للدوريات الكبرى</span>
            </h2>
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>محدثة مباشرة</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {liveSports.standings.map((table) => (
              <div
                key={table.leagueSlug}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-md overflow-hidden space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                  <h3 className="font-black text-sm text-[var(--text)] flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[var(--gold)]" />
                    <span>{table.leagueNameAr}</span>
                  </h3>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    TOP {table.rows.length}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-[var(--text-muted)] border-b border-[var(--border)] text-[10px]">
                        <th className="py-2 text-start">#</th>
                        <th className="py-2 text-start">الفريق</th>
                        <th className="py-2 text-center">لعب</th>
                        <th className="py-2 text-center">ف</th>
                        <th className="py-2 text-center">ت</th>
                        <th className="py-2 text-center">خ</th>
                        <th className="py-2 text-center">فارق</th>
                        <th className="py-2 text-end">النقاط</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]/50">
                      {table.rows.map((row) => (
                        <tr key={`${table.leagueSlug}-${row.rank}`} className="hover:bg-[var(--bg)]/70">
                          <td className="py-2.5 font-mono font-black text-[var(--text-muted)]">{row.rank}</td>
                          <td className="py-2.5 font-bold text-[var(--text)] flex items-center gap-2">
                            {row.teamLogo && (
                              <img src={row.teamLogo} alt={row.team} className="w-4 h-4 object-contain" />
                            )}
                            <span className="truncate max-w-[140px]">{row.team}</span>
                          </td>
                          <td className="py-2.5 text-center font-mono">{row.played}</td>
                          <td className="py-2.5 text-center font-mono text-emerald-500">{row.won}</td>
                          <td className="py-2.5 text-center font-mono text-amber-500">{row.drawn}</td>
                          <td className="py-2.5 text-center font-mono text-rose-500">{row.lost}</td>
                          <td className="py-2.5 text-center font-mono">{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                          <td className="py-2.5 text-end font-mono font-black text-[var(--primary)]">{row.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. أخبار الملاعب والرياضة */}
      {sportsArticles.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-[var(--text)] border-b border-[var(--border)] pb-3">
            أحدث الأخبار والتقارير الرياضية
          </h2>

          {leadArticle && (
            <div className="mb-6">
              <ArticleCard article={leadArticle} variant="hero" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restArticles.map((art) => (
              <ArticleCard key={art.id} article={art} variant="medium" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
