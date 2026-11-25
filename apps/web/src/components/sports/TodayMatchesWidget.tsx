"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Clock,
  Tv,
  ExternalLink,
  Calendar,
  Radio,
  ChevronLeft,
  Flame,
  CheckCircle,
  PlayCircle,
} from "lucide-react";

export interface MatchItem {
  id: string;
  tournament: string;
  round?: string;
  homeTeam: { name: string; flag?: string; score?: number };
  awayTeam: { name: string; flag?: string; score?: number };
  time: string; // e.g. "الدقيقة 78" or "22:00 مكة"
  dateCategory: "live" | "today" | "yesterday" | "tomorrow";
  status: "LIVE" | "UPCOMING" | "FINISHED";
  broadcaster: string;
  commentator?: string;
  yallaSportUrl: string;
}

const DEFAULT_MATCHES: MatchItem[] = [
  {
    id: "m-1",
    tournament: "تصفيات آسيا لكأس العالم 2026",
    round: "المرحلة الحاسمة · الجولة 6",
    homeTeam: { name: "فلسطين (الفدائي)", flag: "🇵🇸", score: 2 },
    awayTeam: { name: "كوريا الجنوبية", flag: "🇰🇷", score: 1 },
    time: "الدقيقة 84' 🔴",
    dateCategory: "live",
    status: "LIVE",
    broadcaster: "beIN SPORTS 1 HD",
    commentator: "عصام الشوالي",
    yallaSportUrl: "https://yallasport.com/matches/palestine-vs-south-korea",
  },
  {
    id: "m-2",
    tournament: "دوري أبطال أوروبا — مرحلة الدوري",
    round: "قمة الجولة 5",
    homeTeam: { name: "ريال مدريد", flag: "🇪🇸", score: 0 },
    awayTeam: { name: "مانشستر سيتي", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", score: 0 },
    time: "22:00 مكة المكرمة",
    dateCategory: "today",
    status: "UPCOMING",
    broadcaster: "beIN SPORTS 2 HD",
    commentator: "حفيظ دراجي",
    yallaSportUrl: "https://yallasport.com/matches/real-madrid-vs-man-city",
  },
  {
    id: "m-3",
    tournament: "دوري روشن السعودي للمحترفين",
    round: "ديربي الرياض الكبير",
    homeTeam: { name: "الهلال", flag: "🇸🇦", score: 3 },
    awayTeam: { name: "النصر", flag: "🇸🇦", score: 1 },
    time: "انتهت (90+6')",
    dateCategory: "yesterday",
    status: "FINISHED",
    broadcaster: "SSC SPORT 1 HD",
    commentator: "فارس عوض",
    yallaSportUrl: "https://yallasport.com/matches/al-hilal-vs-al-nassr",
  },
  {
    id: "m-4",
    tournament: "دوري أبطال إفريقيا — المجموعات",
    round: "الجولة الثالثة",
    homeTeam: { name: "الأهلي المصري", flag: "🇪🇬", score: 2 },
    awayTeam: { name: "الترجي التونسي", flag: "🇹🇳", score: 0 },
    time: "انتهت",
    dateCategory: "yesterday",
    status: "FINISHED",
    broadcaster: "beIN SPORTS 6 HD",
    commentator: "علي محمد علي",
    yallaSportUrl: "https://yallasport.com/matches/ahly-vs-taraji",
  },
  {
    id: "m-5",
    tournament: "الدوري الإسباني (لا ليغا)",
    round: "الجولة 14",
    homeTeam: { name: "برشلونة", flag: "🇪🇸", score: 0 },
    awayTeam: { name: "أتلتيكو مدريد", flag: "🇪🇸", score: 0 },
    time: "غداً 21:45 مكة",
    dateCategory: "tomorrow",
    status: "UPCOMING",
    broadcaster: "beIN SPORTS 3 HD",
    commentator: "خليل البلوشي",
    yallaSportUrl: "https://yallasport.com/matches/barca-vs-atletico",
  },
  {
    id: "m-6",
    tournament: "الدوري الإنجليزي الممتاز (البريميرليغ)",
    round: "الجولة 13",
    homeTeam: { name: "ليفربول", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", score: 1 },
    awayTeam: { name: "أرسنال", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", score: 1 },
    time: "الدقيقة 62' 🔴",
    dateCategory: "live",
    status: "LIVE",
    broadcaster: "beIN 1 Premium",
    commentator: "يوسف سيف",
    yallaSportUrl: "https://yallasport.com/matches/liverpool-vs-arsenal",
  },
];

interface Props {
  matches?: MatchItem[];
}

export function TodayMatchesWidget({ matches = DEFAULT_MATCHES }: Props) {
  const [filter, setFilter] = useState<"all" | "live" | "today" | "yesterday">("all");

  const filtered = matches.filter((m) => {
    if (filter === "live") return m.status === "LIVE";
    if (filter === "today") return m.dateCategory === "today" || m.status === "LIVE";
    if (filter === "yesterday") return m.dateCategory === "yesterday";
    return true;
  });

  const liveMatches = matches.filter((m) => m.status === "LIVE");

  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-[#06150D]/85 backdrop-blur-xl p-5 space-y-4 shadow-2xl relative overflow-hidden">
      {/* 1. رأس ويدجت المباريات مع شراكة يلا سبورت VIP */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-sm sm:text-base text-white flex items-center gap-2">
              <span>مباريات اليوم والملاعب الحية</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                يلا سبورت VIP
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              تغطية حية لحظة بلحظة للقمم العربية والعالمية وتوقيت القدس الشريف
            </p>
          </div>
        </div>

        {/* الفلاتر السريعة الأربعة */}
        <div className="flex items-center gap-1.5 text-xs bg-black/40 p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              filter === "all"
                ? "bg-emerald-500 text-slate-950 shadow-sm font-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            الكل ({matches.length})
          </button>
          <button
            onClick={() => setFilter("live")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
              filter === "live"
                ? "bg-rose-600 text-white shadow-sm font-black"
                : "text-rose-400 hover:bg-rose-500/10"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
            <span>مباشر ({liveMatches.length})</span>
          </button>
          <button
            onClick={() => setFilter("today")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              filter === "today"
                ? "bg-emerald-500 text-slate-950 shadow-sm font-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            اليوم
          </button>
          <button
            onClick={() => setFilter("yesterday")}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
              filter === "yesterday"
                ? "bg-emerald-500 text-slate-950 shadow-sm font-black"
                : "text-slate-400 hover:text-white"
            }`}
          >
            نتائج الأمس
          </button>
        </div>
      </div>

      {/* 2. بطاقات المباريات المصممة بنمط شاشات البث الميداني */}
      <div className="space-y-3">
        {filtered.map((m) => (
          <div
            key={m.id}
            className="p-3.5 rounded-2xl border border-white/10 bg-black/40 hover:border-emerald-500/40 hover:shadow-xl transition-all space-y-2.5 group relative overflow-hidden"
          >
            {/* مؤشر البث المباشر المضيء على الحافة */}
            {m.status === "LIVE" && (
              <div className="absolute top-0 start-0 w-1 h-full bg-rose-500 animate-pulse" />
            )}

            {/* سطر البطولة والقناة والمعلق */}
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-emerald-300 truncate max-w-[200px]">{m.tournament}</span>
                {m.round && <span className="text-[10px] text-slate-400 hidden sm:inline">· {m.round}</span>}
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[10px] bg-white/5 px-2 py-0.5 rounded-lg border border-white/10">
                  <Tv className="w-3 h-3 text-emerald-400" />
                  <span>{m.broadcaster}</span>
                </span>
                {m.status === "LIVE" ? (
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-rose-600 text-white animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>{m.time}</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded-lg">
                    {m.time}
                  </span>
                )}
              </div>
            </div>

            {/* سطر الفريقين والنتيجة في الوسط */}
            <div className="flex items-center justify-between gap-3 pt-1">
              {/* الفريق المضيف */}
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <span className="text-2xl drop-shadow-sm">{m.homeTeam.flag || "⚽"}</span>
                <span className="font-bold text-xs sm:text-sm text-white truncate">{m.homeTeam.name}</span>
              </div>

              {/* النتيجة بالمنتصف */}
              <div className="px-3.5 py-1 rounded-xl bg-white/10 border border-white/15 font-mono text-sm sm:text-base font-black text-amber-300 shrink-0 shadow-inner">
                {m.status === "UPCOMING" ? "VS" : `${m.homeTeam.score} - ${m.awayTeam.score}`}
              </div>

              {/* الفريق الضيف */}
              <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-end text-end">
                <span className="font-bold text-xs sm:text-sm text-white truncate">{m.awayTeam.name}</span>
                <span className="text-2xl drop-shadow-sm">{m.awayTeam.flag || "⚽"}</span>
              </div>
            </div>

            {/* تذييل: المعلق وزر المتابعة عبر يلا سبورت */}
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-[10px]">
                {m.commentator ? `المعلق: ${m.commentator}` : "تغطية حية مستمرة"}
              </span>

              <a
                href={m.yallaSportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-bold hover:underline flex items-center gap-1 group-hover:text-emerald-300 text-[10px]"
              >
                <span>متابعة تفاصيل المباراة والأهداف</span>
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
          <span>عرض كافة مباريات وجداول وترتيب الدوريات في يلا سبورت VIP</span>
          <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
        </Link>
      </div>
    </div>
  );
}
