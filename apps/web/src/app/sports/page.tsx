import Link from "next/link";
import { Metadata } from "next";
import { getSectionFeed } from "@/lib/dal";
import { fetchLiveSports } from "@/lib/live-data/sports";
import { ArticleCard } from "@/components/ArticleCard";
import { TodayMatchesWidget } from "@/components/sports/TodayMatchesWidget";
import { YallaSportBanner } from "@/components/sports/YallaSportBanner";
import { resolveEditorialImage } from "@/lib/editorial-images";
import {
  Trophy,
  ShieldCheck,
  Radio,
  Medal,
  Star,
  Play,
  Film,
  Sparkles,
  Flame,
  Calendar,
  Clock,
  ChevronLeft,
  Award,
  Tv,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "يلا سبورت ودوري أبطال أوروبا — نتائج حية، ترتيب الدوريات، ريلز وأخبار الرياضة",
  description:
    "المدرج الرياضي الأول: تغطية حصرية لدوري أبطال أوروبا، نتائج المباريات لحظة بلحظة، ترتيب الدوريات العالمية عبر ESPN Global Soccer، وفيديوهات الملاعب.",
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

  // استخلاص بيانات دوري أبطال أوروبا الخاصة
  const uclMatches = liveSports.matches.filter((m) => m.leagueSlug === "uefa.champions");
  const uclStanding = liveSports.standings.find((s) => s.leagueSlug === "uefa.champions");
  const otherStandings = liveSports.standings.filter((s) => s.leagueSlug !== "uefa.champions");

  // استخلاص لقطات وفيديوهات وريلز الرياضة من المقالات الحقيقية
  const sportsReels = sportsArticles.slice(0, 4);

  return (
    <div dir="rtl" className="min-h-screen bg-[#040914] text-white selection:bg-[var(--gold)]/30 pb-24">
      {/* شريط الملاحة العلوي السريع للملاعب */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#02050d] via-[#061529] to-[#02050d] py-3.5">
        <div className="container-custom max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-300">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">
              الرئيسية
            </Link>
            <ChevronLeft className="w-3.5 h-3.5 text-stone-500" />
            <span className="text-[var(--gold)] font-black">استوديو يلا سبورت ودوري أبطال أوروبا</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: "ucl-arena", label: "دوري أبطال أوروبا", icon: "⭐" },
              { id: "live-matches", label: "مباريات اليوم", icon: "⚽" },
              { id: "standings", label: "جداول الترتيب", icon: "🏆" },
              { id: "sports-reels", label: "فيديو وريلز", icon: "🎬" },
            ].map((pill) => (
              <a
                key={pill.id}
                href={`#${pill.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-[var(--gold)]/20 border border-white/10 hover:border-[var(--gold)]/40 text-stone-200 hover:text-[var(--gold)] transition-all whitespace-nowrap font-bold"
              >
                <span>{pill.icon}</span>
                <span>{pill.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom max-w-7xl mx-auto py-10 space-y-14">
        {/* 1. ترويسة الملعب الأوروبي الليلي الفاخرة (Champions Stadium Hero) */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#041024] via-[#082438] to-[#041b15] p-8 md:p-12 text-white border border-sky-400/30 shadow-2xl">
          <div className="pointer-events-none absolute -top-24 end-1/4 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 start-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:26px_26px]" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-200 text-xs font-black shadow-xs">
                <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                <span>البث المباشر للنتائج والترتيب الحقيقي ({liveSports.provider})</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                استوديو <span className="text-[var(--gold)]">يلا سبورت</span>{" "}
                <span className="text-sky-300">ودوري أبطال أوروبا</span>
              </h1>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                المدرج الرياضي الأول: تغطية حية لحظة بلحظة لمباريات دوري أبطال أوروبا والدوريات الخمسة الكبرى ودوري روشن، مع جداول الترتيب الرسمية وفيديوهات الملاعب دون أي نتائج تقديرية.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3.5 shrink-0">
              <div className="px-4 py-4 rounded-2xl bg-black/50 border border-white/10 text-center min-w-[100px] backdrop-blur-md">
                <strong className="font-mono text-2xl sm:text-3xl font-black text-[var(--gold)] block">
                  {liveSports.matches.length}
                </strong>
                <span className="text-[11px] text-stone-300 font-bold block mt-1">مباراة مرصودة</span>
              </div>
              <div className="px-4 py-4 rounded-2xl bg-black/50 border border-rose-500/30 text-center min-w-[100px] backdrop-blur-md">
                <strong className="font-mono text-2xl sm:text-3xl font-black text-rose-400 block">
                  {liveCount}
                </strong>
                <span className="text-[11px] text-rose-200 font-bold block mt-1">مباشر الآن</span>
              </div>
              <div className="px-4 py-4 rounded-2xl bg-black/50 border border-sky-400/30 text-center min-w-[100px] backdrop-blur-md">
                <strong className="font-mono text-2xl sm:text-3xl font-black text-sky-300 block">
                  {liveSports.standings.length}
                </strong>
                <span className="text-[11px] text-sky-200 font-bold block mt-1">بطولات كبرى</span>
              </div>
            </div>
          </div>
        </header>

        <YallaSportBanner />

        {/* 2. الجناح الحصري لدوري أبطال أوروبا (UEFA Champions League Spotlight) */}
        <section
          id="ucl-arena"
          className="rounded-3xl border border-sky-400/35 bg-gradient-to-br from-[#06142e]/95 via-[#091b3a]/90 to-[#040c1d]/95 p-6 md:p-10 shadow-2xl space-y-8 relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -top-24 start-0 w-72 h-72 bg-sky-400/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-700 text-white flex items-center justify-center shadow-lg border border-sky-300/40 shrink-0">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    دوري أبطال أوروبا (UEFA Champions League)
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 text-[var(--gold)] text-[10px] font-black">
                    البطولة الأم
                  </span>
                </div>
                <p className="text-xs text-sky-200/80 mt-1">
                  رصد مباشر لمواجهات القمة الأوروبية وترتيب مرحلة الدوري (نظام الـ 36 نادياً) بتحديث فوري من الملاعب.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs bg-black/40 border border-white/10 px-4 py-2 rounded-2xl">
              <Award className="w-4 h-4 text-[var(--gold)]" />
              <span className="text-stone-300">
                الأكثر تتويجاً: <strong className="text-white">ريال مدريد (15 لقباً)</strong>
              </span>
            </div>
          </div>

          {/* مواجهات دوري الأبطال + جدول الترتيب */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* مباريات دوري الأبطال */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-sm font-black text-sky-300 flex items-center gap-2">
                <Tv className="w-4 h-4" />
                <span>مواجهات دوري أبطال أوروبا المرصودة ({uclMatches.length})</span>
              </h3>

              {uclMatches.length > 0 ? (
                <div className="space-y-3">
                  {uclMatches.slice(0, 6).map((m) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-2xl bg-black/50 border border-white/10 hover:border-sky-400/50 transition-all space-y-2.5"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-sky-300 font-bold">{m.venue || "ملعب أوروبي معتمد"}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full font-black ${
                            m.status === "LIVE"
                              ? "bg-rose-600 text-white animate-pulse"
                              : m.status === "FT"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-white/10 text-stone-300"
                          }`}
                        >
                          {m.status === "LIVE" ? `مباشر · ${m.statusDetail}` : m.status === "FT" ? "انتهت" : m.kickoffTime}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 text-xs font-black">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {m.homeLogo && (
                            <img src={m.homeLogo} alt={m.homeTeam} className="w-5 h-5 object-contain shrink-0" />
                          )}
                          <span className="truncate text-white">{m.homeTeam}</span>
                        </div>

                        <div className="px-3 py-1 rounded-xl bg-white/10 font-mono text-sm text-[var(--gold)] shrink-0">
                          {m.homeScore !== null && m.awayScore !== null ? `${m.homeScore} - ${m.awayScore}` : "VS"}
                        </div>

                        <div className="flex items-center justify-end gap-2 flex-1 min-w-0">
                          <span className="truncate text-white text-end">{m.awayTeam}</span>
                          {m.awayLogo && (
                            <img src={m.awayLogo} alt={m.awayTeam} className="w-5 h-5 object-contain shrink-0" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-center space-y-2">
                  <Star className="w-8 h-8 text-sky-400/60 mx-auto" />
                  <p className="text-xs font-bold text-white">لا توجد مباريات جارية في دوري الأبطال اليوم</p>
                  <p className="text-[11px] text-stone-400">
                    تُعرض المواجهات تلقائياً في أيام الجولات الأوروبية (الثلاثاء والأربعاء) مباشرة من الملاعب.
                  </p>
                </div>
              )}
            </div>

            {/* جدول ترتيب دوري أبطال أوروبا */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-[var(--gold)] flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>ترتيب دوري أبطال أوروبا الحي</span>
                </h3>
                <div className="flex items-center gap-3 text-[10px] text-stone-300">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
                    تأهل مباشر (1-8)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sky-400" />
                    ملحق (9-24)
                  </span>
                </div>
              </div>

              {uclStanding ? (
                <div className="rounded-2xl bg-black/50 border border-white/10 overflow-x-auto p-4">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-stone-400 border-b border-white/10 text-[10px]">
                        <th className="py-2 text-start">#</th>
                        <th className="py-2 text-start">النادي</th>
                        <th className="py-2 text-center">لعب</th>
                        <th className="py-2 text-center">ف</th>
                        <th className="py-2 text-center">ت</th>
                        <th className="py-2 text-center">خ</th>
                        <th className="py-2 text-center">فارق</th>
                        <th className="py-2 text-end">النقاط</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {uclStanding.rows.map((row) => {
                        const isDirect = row.rank <= 8;
                        return (
                          <tr key={row.rank} className="hover:bg-white/[0.04]">
                            <td className="py-2.5 font-mono font-black">
                              <span
                                className={`inline-flex w-6 h-6 items-center justify-center rounded-lg text-[11px] ${
                                  isDirect
                                    ? "bg-[var(--gold)]/20 text-[var(--gold)]"
                                    : "bg-sky-500/15 text-sky-300"
                                }`}
                              >
                                {row.rank}
                              </span>
                            </td>
                            <td className="py-2.5 font-bold text-white flex items-center gap-2">
                              {row.teamLogo && (
                                <img src={row.teamLogo} alt={row.team} className="w-4 h-4 object-contain" />
                              )}
                              <span className="truncate max-w-[160px]">{row.team}</span>
                            </td>
                            <td className="py-2.5 text-center font-mono text-stone-300">{row.played}</td>
                            <td className="py-2.5 text-center font-mono text-emerald-400">{row.won}</td>
                            <td className="py-2.5 text-center font-mono text-amber-400">{row.drawn}</td>
                            <td className="py-2.5 text-center font-mono text-rose-400">{row.lost}</td>
                            <td className="py-2.5 text-center font-mono text-stone-300">
                              {row.gd > 0 ? `+${row.gd}` : row.gd}
                            </td>
                            <td className="py-2.5 text-end font-mono font-black text-[var(--gold)]">
                              {row.points}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-black/40 border border-white/10 text-center text-xs text-stone-400">
                  جاري مزامنة جدول ترتيب دوري أبطال أوروبا الرسمي من المزود الرياضي.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3. ويدجت المباريات الحية الشامل لجميع البطولات */}
        <section id="live-matches" className="space-y-4">
          <TodayMatchesWidget matches={liveSports.matches} />
        </section>

        {/* 4. جداول الترتيب الحقيقية للدوريات الكبرى */}
        {otherStandings.length > 0 && (
          <section id="standings" className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-2xl font-black text-white flex items-center gap-2.5">
                <Medal className="w-6 h-6 text-emerald-400" />
                <span>جداول الترتيب الحية للدوريات العالمية والعربية</span>
              </h2>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>محدثة مباشرة من الملاعب</span>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {otherStandings.map((table) => (
                <div
                  key={table.leagueSlug}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-lg overflow-hidden space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h3 className="font-black text-base text-white flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-[var(--gold)]" />
                      <span>{table.leagueNameAr}</span>
                    </h3>
                    <span className="text-[10px] text-stone-400 font-mono bg-white/5 px-2.5 py-0.5 rounded-full">
                      TOP {table.rows.length}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-stone-400 border-b border-white/10 text-[10px]">
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
                      <tbody className="divide-y divide-white/5">
                        {table.rows.map((row) => (
                          <tr key={`${table.leagueSlug}-${row.rank}`} className="hover:bg-white/[0.04]">
                            <td className="py-2.5 font-mono font-black text-stone-400">{row.rank}</td>
                            <td className="py-2.5 font-bold text-white flex items-center gap-2">
                              {row.teamLogo && (
                                <img src={row.teamLogo} alt={row.team} className="w-4 h-4 object-contain" />
                              )}
                              <span className="truncate max-w-[150px]">{row.team}</span>
                            </td>
                            <td className="py-2.5 text-center font-mono text-stone-300">{row.played}</td>
                            <td className="py-2.5 text-center font-mono text-emerald-400">{row.won}</td>
                            <td className="py-2.5 text-center font-mono text-amber-400">{row.drawn}</td>
                            <td className="py-2.5 text-center font-mono text-rose-400">{row.lost}</td>
                            <td className="py-2.5 text-center font-mono text-stone-300">
                              {row.gd > 0 ? `+${row.gd}` : row.gd}
                            </td>
                            <td className="py-2.5 text-end font-mono font-black text-[var(--gold)]">{row.points}</td>
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

        {/* 5. جدارية الفيديوهات والريلز والصور الرياضية الحصرية */}
        {sportsReels.length > 0 && (
          <section
            id="sports-reels"
            className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#041d15]/80 to-[#020c09]/90 p-6 md:p-10 space-y-6 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center">
                  <Film className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    ريلز الملاعب واللقطات المصورة
                  </h2>
                  <span className="text-xs text-stone-400">
                    أبرز اللقطات والتغطيات البصرية من الملاعب العالمية والفلسطينية
                  </span>
                </div>
              </div>

              <Link href="/videos" className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1">
                <span>استوديو الفيديو الكامل</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {sportsReels.map((art) => {
                const img = resolveEditorialImage(art);
                return (
                  <Link
                    key={art.id}
                    href={`/article/${art.id}/${art.slug}`}
                    className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-400/60 transition-all shadow-lg block"
                  >
                    <img
                      src={img}
                      alt={art.titleAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                    <div className="absolute top-3 start-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-[var(--gold)]">
                      <Play className="w-3.5 h-3.5 fill-current ms-0.5" />
                    </div>

                    <div className="absolute bottom-4 inset-x-4 space-y-1.5">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 text-[10px] font-bold">
                        {art.source?.nameAr || "يلا سبورت"}
                      </span>
                      <h3 className="text-xs sm:text-sm font-black text-white leading-snug line-clamp-3 group-hover:text-[var(--gold)] transition-colors">
                        {art.titleAr}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* 6. أخبار الملاعب والتحليلات الكروية */}
        {sportsArticles.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Flame className="w-6 h-6 text-[var(--gold)]" />
                <span>أحدث الأخبار والتقارير الرياضية</span>
              </h2>
              <span className="text-xs text-stone-400">{sportsArticles.length} تقرير رياضي</span>
            </div>

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
    </div>
  );
}
