"use client";

import { useState } from "react";
import { Trophy, Clock, Tv, ExternalLink, Calendar, Radio } from "lucide-react";

export interface MatchItem {
  id: string;
  tournament: string;
  homeTeam: { name: string; logo?: string; score?: number };
  awayTeam: { name: string; logo?: string; score?: number };
  time: string; // e.g. "21:00" or "الدقيقة 67"
  status: "LIVE" | "UPCOMING" | "FINISHED";
  broadcaster: string;
  yallaSportUrl: string;
}

const DEFAULT_MATCHES: MatchItem[] = [
  {
    id: "m-1",
    tournament: "تصفيات كأس العالم 2026 — آسيا",
    homeTeam: { name: "فلسطين (الفدائي)", score: 2 },
    awayTeam: { name: "كوريا الجنوبية", score: 1 },
    time: "الدقيقة 78",
    status: "LIVE",
    broadcaster: "beIN SPORTS 1 HD",
    yallaSportUrl: "https://yallasport.com/matches/palestine-vs-south-korea",
  },
  {
    id: "m-2",
    tournament: "دوري أبطال أوروبا — مرحلة المجموعات",
    homeTeam: { name: "ريال مدريد", score: 0 },
    awayTeam: { name: "مانشستر سيتي", score: 0 },
    time: "22:00 مكة المكرمة",
    status: "UPCOMING",
    broadcaster: "beIN SPORTS 2 HD",
    yallaSportUrl: "https://yallasport.com/matches/real-madrid-vs-man-city",
  },
  {
    id: "m-3",
    tournament: "دوري روشن السعودي للمحترفين",
    homeTeam: { name: "الهلال", score: 3 },
    awayTeam: { name: "النصر", score: 1 },
    time: "انتهت",
    status: "FINISHED",
    broadcaster: "SSC SPORT 1 HD",
    yallaSportUrl: "https://yallasport.com/matches/al-hilal-vs-al-nassr",
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

  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[var(--surface)] to-[var(--bg)] p-6 shadow-sm space-y-4">
      {/* الترويسة وشعار الشراكة مع يلا سبورت */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-[var(--text)]">
                جدول مباريات اليوم والنتائج المباشرة
              </h2>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                بث وتغطية يلا سبورت
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)]">
              تحديث لحظي لنتائج الأهداف، التشكيلات، ومواعيد البث المباشر
            </p>
          </div>
        </div>

        {/* أزرار التصفية */}
        <div className="flex items-center gap-1.5 bg-[var(--bg)] p-1 rounded-xl border border-[var(--border)] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              filter === "all" ? "bg-emerald-600 text-white shadow-xs" : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            الكل
          </button>
          <button
            type="button"
            onClick={() => setFilter("live")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
              filter === "live" ? "bg-rose-600 text-white shadow-xs" : "text-[var(--text-muted)] hover:text-rose-500"
            }`}
          >
            <Radio className="w-3 h-3 animate-pulse" />
            <span>مباشر الآن</span>
          </button>
          <button
            type="button"
            onClick={() => setFilter("upcoming")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
              filter === "upcoming" ? "bg-emerald-600 text-white shadow-xs" : "text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            القادمة
          </button>
        </div>
      </div>

      {/* قائمة المباريات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filtered.map((match) => {
          const isLive = match.status === "LIVE";
          const isFinished = match.status === "FINISHED";

          return (
            <div
              key={match.id}
              className={`p-4 rounded-2xl border transition-all space-y-3 ${
                isLive
                  ? "border-rose-500/40 bg-rose-500/5 shadow-sm"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-emerald-500/40"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pb-2 border-b border-[var(--border)]/60">
                <span className="font-bold truncate max-w-[170px]">{match.tournament}</span>
                {isLive ? (
                  <span className="flex items-center gap-1 text-rose-600 font-bold bg-rose-500/10 px-2 py-0.5 rounded-full animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                    <span>{match.time}</span>
                  </span>
                ) : isFinished ? (
                  <span className="text-slate-500 font-bold bg-slate-500/10 px-2 py-0.5 rounded-full">
                    انتهت
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[var(--text-muted)] font-mono">
                    <Clock className="w-3 h-3 text-emerald-500" />
                    <span>{match.time}</span>
                  </span>
                )}
              </div>

              {/* الفريقان والنتيجة */}
              <div className="space-y-2 py-1">
                <div className="flex items-center justify-between font-bold text-xs text-[var(--text)]">
                  <span className="truncate">{match.homeTeam.name}</span>
                  <span className="font-mono text-sm px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)]">
                    {match.homeTeam.score !== undefined ? match.homeTeam.score : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between font-bold text-xs text-[var(--text)]">
                  <span className="truncate">{match.awayTeam.name}</span>
                  <span className="font-mono text-sm px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)]">
                    {match.awayTeam.score !== undefined ? match.awayTeam.score : "-"}
                  </span>
                </div>
              </div>

              {/* القناة الناقلة ورابط المتابعة */}
              <div className="pt-2 border-t border-[var(--border)]/60 flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-1 text-[var(--text-muted)] truncate max-w-[140px]">
                  <Tv className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span className="truncate">{match.broadcaster}</span>
                </span>

                <a
                  href={match.yallaSportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-600 hover:text-emerald-500 flex items-center gap-1 transition-colors"
                >
                  <span>التغطية</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* رابط يلا سبورت الشامل في الأسفل */}
      <div className="pt-2 flex items-center justify-between text-xs text-[var(--text-muted)] border-t border-[var(--border)]">
        <span>شريك الرياضة الرسمي: <strong>يلا سبورت (Yalla Sport)</strong></span>
        <a
          href="https://yallasport.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-emerald-600 hover:underline flex items-center gap-1"
        >
          <span>تصفح كافة مباريات وجداول اليوم ↗</span>
        </a>
      </div>
    </div>
  );
}
