import Link from "next/link";
import { Metadata } from "next";
import { getSectionFeed } from "@/lib/dal";
import { ArticleCard } from "@/components/ArticleCard";
import { TodayMatchesWidget } from "@/components/sports/TodayMatchesWidget";
import { YallaSportBanner } from "@/components/sports/YallaSportBanner";
import {
  Trophy,
  Flame,
  ChevronLeft,
  Tv,
  Calendar,
  ExternalLink,
  Medal,
  Award,
  Radio,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "يلا سبورت — نتائج المباريات، ترتيب الدوريات، وأخبار الرياضة المباشرة",
  description: "المدرج الرياضي الأول في فلسطين والعالم العربي: نتائج حية، ترتيب الدوريات الأوروبية والعربية، أهداف المباريات وتغطيات الفدائي الفلسطيني بالشراكة مع يلا سبورت.",
  alternates: {
    canonical: "/sports",
  },
};

// جداول ترتيب الدوريات الحية المعتمدة
const LEAGUE_STANDINGS = [
  {
    league: "الدوري الإنجليزي الممتاز (Premier League)",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    teams: [
      { rank: 1, name: "ليفربول", played: 12, won: 10, drawn: 1, lost: 1, points: 31, form: "W-W-W-D-W" },
      { rank: 2, name: "مانشستر سيتي", played: 12, won: 7, drawn: 2, lost: 3, points: 23, form: "L-L-L-W-W" },
      { rank: 3, name: "تشيلسي", played: 12, won: 6, drawn: 4, lost: 2, points: 22, form: "W-D-D-W-W" },
      { rank: 4, name: "أرسنال", played: 12, won: 6, drawn: 4, lost: 2, points: 22, form: "W-D-L-D-W" },
      { rank: 5, name: "برايتون", played: 12, won: 6, drawn: 4, lost: 2, points: 22, form: "D-W-W-D-L" },
    ],
  },
  {
    league: "دوري روشن السعودي للمحترفين",
    flag: "🇸🇦",
    teams: [
      { rank: 1, name: "الهلال", played: 11, won: 9, drawn: 1, lost: 1, points: 28, form: "L-W-W-W-D" },
      { rank: 2, name: "الاتحاد", played: 11, won: 10, drawn: 0, lost: 1, points: 30, form: "W-W-W-W-W" },
      { rank: 3, name: "النصر", played: 11, won: 6, drawn: 4, lost: 1, points: 22, form: "L-W-D-W-D" },
      { rank: 4, name: "القادسية", played: 11, won: 7, drawn: 1, lost: 3, points: 22, form: "W-W-W-W-L" },
      { rank: 5, name: "الشباب", played: 11, won: 7, drawn: 1, lost: 3, points: 22, form: "L-W-W-W-L" },
    ],
  },
  {
    league: "الدوري الإسباني (La Liga)",
    flag: "🇪🇸",
    teams: [
      { rank: 1, name: "برشلونة", played: 14, won: 11, drawn: 1, lost: 2, points: 34, form: "D-L-W-W-W" },
      { rank: 2, name: "ريال مدريد", played: 13, won: 9, drawn: 3, lost: 1, points: 30, form: "W-W-L-W-W" },
      { rank: 3, name: "أتلتيكو مدريد", played: 14, won: 8, drawn: 5, lost: 1, points: 29, form: "W-W-W-W-D" },
      { rank: 4, name: "فياريال", played: 12, won: 7, drawn: 3, lost: 2, points: 24, form: "D-W-W-D-W" },
    ],
  },
];

// هدافو الدوريات الكبرى
const TOP_SCORERS = [
  { name: "إيرلينغ هالاند", team: "مانشستر سيتي", goals: 12, assists: 0, flag: "🇳🇴" },
  { name: "روبرت ليفاندوفسكي", team: "برشلونة", goals: 15, assists: 2, flag: "🇵🇱" },
  { name: "محمد صلاح", team: "ليفربول", goals: 10, assists: 6, flag: "🇪🇬" },
  { name: "ألكسندر ميتروفيتش", team: "الهلال", goals: 11, assists: 1, flag: "🇷🇸" },
  { name: "كريستيانو رونالدو", team: "النصر", goals: 7, assists: 2, flag: "🇵🇹" },
  { name: "فينيسيوس جونيور", team: "ريال مدريد", goals: 8, assists: 4, flag: "🇧🇷" },
];

export default async function SportsPage() {
  const feed = await getSectionFeed("sports");
  const articles = feed?.articles || [];
  const heroArticle = articles[0];
  const remainingArticles = articles.slice(1);

  return (
    <div className="container-custom py-8 space-y-10">
      {/* 1. ترويسة مدرج يلا سبورت الملكي */}
      <div className="card-imperial bg-gradient-to-r from-[#041a0e] via-[#092a18] to-[#041a0e] p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden border border-emerald-500/40">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

        <nav aria-label="فتات الخبز" className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-emerald-400 transition-colors">الرئيسية</Link>
          <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0 text-emerald-400" />
          <span className="text-emerald-400 font-black">يلا سبورت والملاعب</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-pulse" />
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center gap-2">
                <span>يلا سبورت</span>
                <span className="text-emerald-400 font-mono text-xl sm:text-2xl font-normal">| YALLA SPORT</span>
              </h1>
            </div>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              المدرج الرياضي التفاعلي الشامل: مواعيد ونتائج المباريات الحية، أهداف دوري أبطال أوروبا، ترتيب الدوريات العربية والعالمية، وتغطية استثنائية لمشاركات منتخب فلسطين (الفدائي).
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
            <a
              href="https://yallasport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all flex items-center gap-2 shadow-lg hover:scale-105"
            >
              <Trophy className="w-4 h-4" />
              <span>زيارة شبكة يلا سبورت الرسمية</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* كبسولات سريعة للبطولات */}
        <div className="flex items-center gap-2.5 overflow-x-auto pt-2 scrollbar-none text-xs">
          <span className="text-slate-400 font-bold shrink-0">البطولات الكبرى:</span>
          {[
            "تصفيات كأس العالم 2026",
            "دوري أبطال أوروبا",
            "دوري روشن السعودي",
            "الدوري الإنجليزي الممتاز",
            "الدوري الإسباني (لا ليغا)",
            "دوري أبطال إفريقيا",
          ].map((b) => (
            <span
              key={b}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold whitespace-nowrap"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* 2. ويدجت مباريات اليوم الحية الشامل */}
      <TodayMatchesWidget />

      {/* 3. بانر يلا سبورت العريض للبث المباشر */}
      <YallaSportBanner variant="leaderboard" />

      {/* 4. جداول ترتيب الدوريات العالمية وهدافو القارة */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* جداول ترتيب الفرق (8 أعمدة) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <h2 className="text-xl font-black text-[var(--text)] flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>جداول ترتيب الدوريات الكبرى</span>
            </h2>
            <span className="text-xs text-[var(--text-muted)]">محدث مع نهاية كل جولة</span>
          </div>

          <div className="space-y-6">
            {LEAGUE_STANDINGS.map((lg) => (
              <div
                key={lg.league}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-3 shadow-md"
              >
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{lg.flag}</span>
                    <h3 className="font-bold text-sm text-[var(--text)]">{lg.league}</h3>
                  </div>
                  <span className="text-[11px] text-emerald-500 font-bold">المراكز الأولى</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-right">
                    <thead>
                      <tr className="text-slate-400 border-b border-white/5">
                        <th className="pb-2 font-bold w-10 text-center">#</th>
                        <th className="pb-2 font-bold">الفريق</th>
                        <th className="pb-2 font-bold text-center">لعب</th>
                        <th className="pb-2 font-bold text-center">فوز</th>
                        <th className="pb-2 font-bold text-center">تعادل</th>
                        <th className="pb-2 font-bold text-center">خسارة</th>
                        <th className="pb-2 font-bold text-center">نقاط</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {lg.teams.map((t) => (
                        <tr key={t.name} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-2.5 text-center font-bold font-mono">
                            <span
                              className={`w-6 h-6 rounded-full inline-flex items-center justify-center text-[10px] ${
                                t.rank <= 4
                                  ? "bg-emerald-500/20 text-emerald-400 font-black"
                                  : "bg-white/5 text-slate-400"
                              }`}
                            >
                              {t.rank}
                            </span>
                          </td>
                          <td className="py-2.5 font-bold text-white">{t.name}</td>
                          <td className="py-2.5 text-center font-mono text-slate-300">{t.played}</td>
                          <td className="py-2.5 text-center font-mono text-emerald-400">{t.won}</td>
                          <td className="py-2.5 text-center font-mono text-slate-400">{t.drawn}</td>
                          <td className="py-2.5 text-center font-mono text-rose-400">{t.lost}</td>
                          <td className="py-2.5 text-center font-mono font-black text-amber-400 text-sm">
                            {t.points}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* قائمة الهدافين والبانر الجانبي (4 أعمدة) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-[var(--surface)] to-[var(--surface)] p-5 space-y-4 shadow-lg">
            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3">
              <Medal className="w-5 h-5 text-amber-400" />
              <h3 className="font-black text-sm text-[var(--text)]">سباق هدافي الموسم</h3>
            </div>

            <div className="space-y-3">
              {TOP_SCORERS.map((sc, i) => (
                <div
                  key={sc.name}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-black/30 border border-white/5 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-black text-amber-400 text-sm w-4">{i + 1}</span>
                    <div>
                      <span className="font-bold text-white block">{sc.name}</span>
                      <span className="text-[10px] text-slate-400">{sc.team}</span>
                    </div>
                  </div>

                  <div className="text-left font-mono">
                    <span className="text-base font-black text-emerald-400">{sc.goals}</span>
                    <span className="text-[10px] text-slate-400 block">هدف</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* بطاقة يلا سبورت الجانبية */}
          <YallaSportBanner variant="card" />
        </div>
      </div>

      {/* 5. شبكة مقالات وأخبار الرياضة المباشرة */}
      <section className="space-y-6 pt-4 border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-[var(--text)] flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-500" />
            <span>آخر الأخبار والتقارير الرياضية</span>
          </h2>
          <span className="text-xs text-[var(--text-muted)] font-mono">{articles.length} مادة</span>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <ArticleCard key={art.id} article={art} variant="medium" />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)]">
            <p className="font-bold">جاري تحديث التغطيات الرياضية عبر مراسلي يلا سبورت...</p>
          </div>
        )}
      </section>
    </div>
  );
}
