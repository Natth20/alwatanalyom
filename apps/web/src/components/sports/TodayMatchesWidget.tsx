"use client";

import { useState } from "react";
import { Trophy, Clock, Tv, ExternalLink, Calendar, Radio, ChevronLeft, Link } from "lucide-react";

export interface MatchItem {
  id: string;
  tournament: string;
  homeTeam: { name: string; flag?: string; score?: number };
  awayTeam: { name: string; flag?: string; score?: number };
  time: string; // e.g. "21:00" or "الدقيقة 78"
  status: "LIVE" | "UPCOMING" | "FINISHED";
  broadcaster: string;
  yallaSportUrl: string;
}

const DEFAULT_MATCHES: MatchItem[] = [
  {
    id: "m-1",
    tournament: "تصفيات آسيا لكأس العالم 2026",
    homeTeam: { name: "فلسطين (الفدائي)", flag: "🇵🇸", score: 2 },
    awayTeam: { name: "كوريا الجنوبية", flag: "🇰🇷", score: 1 },
    time: "الدقيقة 78",
    status: "LIVE",
    broadcaster: "beIN SPORTS 1 HD",
    yallaSportUrl: "https://yallasport.com/matches/palestine-vs-south-korea",
  },
  {
    id: "m-2",
    tournament: "دوري أبطال أوروبا — الجولة 5",
    homeTeam: { name: "ريال مدريد", flag: "🇪🇸", score: 0 },
    awayTeam: { name: "مانشستر سيتي", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", score: 0 },
    time: "22:00 مكة المكرمة",
    status: "UPCOMING",
    broadcaster: "beIN SPORTS 2 HD",
    yallaSportUrl: "https://yallasport.com/matches/real-madrid-vs-man-city",
  },
  {
    id: "m-3",
    tournament: "دوري روشن السعودي للمحترفين",
    homeTeam: { name: "الهلال", flag: "🇸🇦", score: 3 },
    awayTeam: { name: "النصر", flag: "🇸🇦", score: 1 },
    time: "انتهت",
    status: "FINISHED",
    broadcaster: "SSC SPORT 1 HD",
    yallaSportUrl: "https://yallasport.com/matches/al-hilal-vs-al-nassr",
  },
  {
    id: "m-4",
    tournament: "دوري أبطال إفريقيا — المجموعات",
    homeTeam: { name: "الأهلي المصري", flag: "🇪🇬", score: 2 },
    awayTeam: { name: "الترجي التونسي", flag: "🇹🇳", score: 0 },
    time: "انتهت",
    status: "FINISHED",
    broadcaster: "beIN SPORTS 6 HD",
    yallaSportUrl: "https://yallasport.com/matches/ahly-vs-taraji",
  },
];

interface Props {
  matches?: MatchItem[];
}

export function TodayMatchesWidget({ matches = DEFAULT_MATCHES }: Props) {
  const [filter, setFilter] = useState<"all" | "live" | "upcoming">("all");

  const filtered = matches.filter((m) => {
    if (filter === "live") return m.status === "LIVE";
    if (filter === "upcoming") return m.status === "UPCOMING";
    return true;
  });

  const liveCount = matches.filter((m) => m.status === "LIVE").length;

  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-[#06150D]/70 backdrop-blur-md p-5 space-y-4 shadow-xl">
      {/* 1. رأس ويدجت المباريات */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <Trophy className="w-5 h-5 text-emerald-400" />
          <h3 className="font-black text-sm sm:text-base text-white">مباريات اليوم والنتائج الحية</h3>
        </div>

        {/* الفلاتر السريعة */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              filter === "all"
                ? "bg-emerald-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            الكل ({matches.length})
          </button>
          <button
            onClick={() => setFilter("live")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
              filter === "live"
                ? "bg-rose-600 text-white shadow-sm"
                : "text-rose-400 hover:bg-rose-500/10"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
            <span>مباشر ({liveCount})</span>
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              filter === "upcoming"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            القادمة
          </button>
        </div>
      </div>

      {/* 2. بطاقات المباريات المصممة بنمط شاشات البث */}
      <div className="space-y-3">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="p-3.5 rounded-2xl border border-white/10 bg-black/40 hover:border-emerald-500/40 hover:shadow-lg transition-all space-y-2.5 group"
          >
            {/* سطر البطولة والقناة والوقت */}
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-bold text-emerald-300 truncate max-w-[180px]">{m.tournament}</span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  <Tv className="w-3 h-3 text-slate-400" />
                  <span>{m.broadcaster}</span>
                </span>
                {m.status === "LIVE" ? (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-600 text-white animate-pulse">
                    {m.time}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-400">{m.time}</span>
                )}
              </div>
            </div>

            {/* سطر الفريقين والنتيجة في الوسط */}
            <div className="flex items-center justify-between gap-3 pt-1">
              {/* الفريق المضيف */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xl">{m.homeTeam.flag || "⚽"}</span>
                <span className="font-bold text-xs sm:text-sm text-white truncate">{m.homeTeam.name}</span>
              </div>

              {/* النتيجة */}
              <div className="px-3 py-1 rounded-xl bg-white/10 border border-white/15 font-mono text-sm sm:text-base font-black text-amber-300 shrink-0">
                {m.status === "UPCOMING" ? "VS" : `${m.homeTeam.score} - ${m.awayTeam.score}`}
              </div>

              {/* الفريق الضيف */}
              <div className="flex items-center gap-2 flex-1 min-w-0 justify-end text-end">
                <span className="font-bold text-xs sm:text-sm text-white truncate">{m.awayTeam.name}</span>
                <span className="text-xl">{m.awayTeam.flag || "⚽"}</span>
              </div>
            </div>

            {/* تذييل زر المتابعة عبر يلا سبورت */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
              <span>تغطية حية بالشراكة مع يلا سبورت VIP</span>
              <a
                href={m.yallaSportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold hover:underline flex items-center gap-1 group-hover:text-emerald-300"
              >
                <span>متابعة تفاصيل المباراة</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* 3. زر الانتقال لمدرج الرياضة الكامل */}
      <div className="pt-2 text-center border-t border-white/10">
        <Link
          href="/sports"
          className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1.5 hover:underline"
        >
          <span>عرض كافة مباريات وجداول البطولات الرياضية</span>
          <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
        </Link>
      </div>
    </div>
  );
}
