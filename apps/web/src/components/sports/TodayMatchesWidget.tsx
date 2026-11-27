"use client";

import { useState, useEffect } from "react";
import { Trophy, Clock, Calendar, RefreshCw } from "lucide-react";
import type { LiveMatchItem } from "@/lib/live-data/sports";

interface Props {
  matches?: LiveMatchItem[];
}

export function TodayMatchesWidget({ matches: initialMatches }: Props) {
  const [matches, setMatches] = useState<LiveMatchItem[]>(initialMatches || []);
  const [loading, setLoading] = useState(!initialMatches);
  const [leagueFilter, setLeagueFilter] = useState<string>("all");

  const refreshMatches = () => {
    setLoading(true);
    fetch("/api/v1/sports")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.matches)) {
          setMatches(data.matches);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!initialMatches) {
      refreshMatches();
    }
    const timer = setInterval(refreshMatches, 90000);
    return () => clearInterval(timer);
  }, [initialMatches]);

  const leagues = Array.from(
    new Map(matches.map((m) => [m.leagueSlug, m.leagueNameAr])).entries()
  );

  const filtered =
    leagueFilter === "all"
      ? matches
      : matches.filter((m) => m.leagueSlug === leagueFilter);

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-6 shadow-md space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-black text-base text-[var(--text)]">
              مركز نتائج ومباريات الملاعب العالمية المباشر
            </h3>
            <span className="text-[10px] text-emerald-500 font-bold">
              بث بيانات حي ومعتمد عبر ESPN Global Soccer
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={refreshMatches}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-xs font-bold text-[var(--text)] hover:border-emerald-500/50 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-500 ${loading ? "animate-spin" : ""}`} />
          <span>تحديث النتائج</span>
        </button>
      </div>

      {leagues.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setLeagueFilter("all")}
            className={`px-3 py-1.5 rounded-xl shrink-0 cursor-pointer transition-colors ${
              leagueFilter === "all"
                ? "bg-emerald-600 text-white"
                : "bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]"
            }`}
          >
            كافة البطولات ({matches.length})
          </button>
          {leagues.map(([slug, name]) => (
            <button
              key={slug}
              type="button"
              onClick={() => setLeagueFilter(slug)}
              className={`px-3 py-1.5 rounded-xl shrink-0 cursor-pointer transition-colors ${
                leagueFilter === slug
                  ? "bg-emerald-600 text-white"
                  : "bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {loading && matches.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 rounded-2xl bg-[var(--bg)] border border-[var(--border)] animate-pulse" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filtered.slice(0, 14).map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl border p-4 transition-all space-y-2.5 ${
                m.status === "LIVE"
                  ? "border-red-500/40 bg-red-500/[0.04]"
                  : "border-[var(--border)] bg-[var(--bg)]"
              }`}
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-[var(--text-muted)]">{m.leagueNameAr}</span>
                <span
                  className={`px-2 py-0.5 rounded-full font-black flex items-center gap-1 ${
                    m.status === "LIVE"
                      ? "bg-red-600 text-white animate-pulse"
                      : m.status === "FT"
                        ? "bg-emerald-500/15 text-emerald-500"
                        : "bg-amber-500/15 text-amber-500"
                  }`}
                >
                  {m.status === "NS" && <Clock className="w-2.5 h-2.5" />}
                  <span>{m.statusDetail}</span>
                </span>
              </div>

              <div className="grid grid-cols-12 items-center gap-2 text-xs sm:text-sm font-black text-[var(--text)]">
                <div className="col-span-5 flex items-center justify-end gap-2 text-end min-w-0">
                  <span className="truncate">{m.homeTeam}</span>
                  {m.homeLogo && (
                    <img src={m.homeLogo} alt={m.homeTeam} className="w-5 h-5 object-contain shrink-0" />
                  )}
                </div>

                <div className="col-span-2 text-center font-mono">
                  {m.homeScore !== null ? (
                    <span className="px-2 py-1 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm">
                      {m.homeScore} - {m.awayScore}
                    </span>
                  ) : (
                    <span className="text-[11px] text-[var(--text-muted)]">vs</span>
                  )}
                </div>

                <div className="col-span-5 flex items-center justify-start gap-2 text-start min-w-0">
                  {m.awayLogo && (
                    <img src={m.awayLogo} alt={m.awayTeam} className="w-5 h-5 object-contain shrink-0" />
                  )}
                  <span className="truncate">{m.awayTeam}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center space-y-2 text-xs text-[var(--text-muted)]">
          <Calendar className="w-8 h-8 mx-auto text-[var(--text-muted)]/50" />
          <p className="font-bold text-[var(--text)]">لا توجد مباريات مجدولة ضمن هذه البطولة في هذه النافذة</p>
          <p>يتم تحديث جداول الدوري الأوروبي، الإنجليزي، الإسباني والسعودي تلقائياً حال صدور الجولة.</p>
        </div>
      )}
    </div>
  );
}
