"use client";

import { useEffect, useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import type { CityPrayerTimings } from "@/lib/live-data/telemetry";

interface PrayerRow {
  key: keyof Pick<CityPrayerTimings, "fajr" | "dhuhr" | "asr" | "maghrib" | "isha">;
  name: string;
}

const PRAYER_LABELS: PrayerRow[] = [
  { key: "fajr", name: "الفجر" },
  { key: "dhuhr", name: "الظهر" },
  { key: "asr", name: "العصر" },
  { key: "maghrib", name: "المغرب" },
  { key: "isha", name: "العشاء" },
];

export function TopBarInfo() {
  const [now, setNow] = useState<Date | null>(null);
  const [cityId, setCityId] = useState<string>("jerusalem");
  const [prayersMap, setPrayersMap] = useState<Record<string, CityPrayerTimings>>({});
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/v1/telemetry")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (active && data?.prayers) setPrayersMap(data.prayers);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const currentCity = prayersMap[cityId] || prayersMap["jerusalem"];

  const dateStr = now
    ? now.toLocaleDateString("ar-EG", {
        timeZone: currentCity?.timezone || "Asia/Jerusalem",
        weekday: "short",
        day: "numeric",
        month: "short",
      })
    : "";

  const timeStr = now
    ? now.toLocaleTimeString("ar-EG", {
        timeZone: currentCity?.timezone || "Asia/Jerusalem",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  let nextPrayer: { name: string; time: string } | null = null;
  if (currentCity && now) {
    const nowParts = new Intl.DateTimeFormat("en-GB", {
      timeZone: currentCity.timezone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);
    const [nh, nm] = nowParts.split(":").map(Number);
    const curMin = (nh || 0) * 60 + (nm || 0);

    for (const row of PRAYER_LABELS) {
      const tVal = currentCity[row.key];
      const [ph, pm] = tVal.split(":").map(Number);
      if (ph !== undefined && pm !== undefined && ph * 60 + pm > curMin) {
        nextPrayer = { name: row.name, time: tVal };
        break;
      }
    }
    if (!nextPrayer) nextPrayer = { name: "الفجر", time: currentCity.fajr };
  }

  return (
    <div className="flex items-center gap-2.5 text-[11px] text-white/75 relative z-40">
      <span className="hidden md:inline font-medium text-white/80">
        {dateStr || "..."}
      </span>
      {currentCity?.hijriDateAr && (
        <span className="hidden xl:inline text-[var(--gold)]/85 font-medium">
          · {currentCity.hijriDateAr}
        </span>
      )}

      <span className="hidden md:inline text-white/20">|</span>

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowDropdown((prev) => !prev)}
          className="inline-flex items-center gap-1.5 text-white/85 hover:text-[var(--gold)] transition-colors cursor-pointer"
          title="التوقيت ومواقيت الصلاة الحية"
        >
          <span className="font-mono font-bold">{timeStr || "--:--"}</span>
          {currentCity && nextPrayer && (
            <span className="hidden sm:inline text-emerald-300/90 font-semibold">
              · {nextPrayer.name} {nextPrayer.time}
            </span>
          )}
          <ChevronDown className="w-3 h-3 opacity-60" />
        </button>

        {showDropdown && Object.keys(prayersMap).length > 0 && (
          <div className="absolute top-full mt-2 start-0 w-72 rounded-2xl bg-[#160208] border border-[var(--gold)]/25 shadow-2xl p-4 space-y-3 z-50 text-white backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[11px] font-black text-[var(--gold)] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>مواقيت الصلاة الحية</span>
              </span>
              <button
                type="button"
                onClick={() => setShowDropdown(false)}
                className="text-[10px] text-white/50 hover:text-white cursor-pointer"
              >
                إغلاق
              </button>
            </div>

            <div className="flex flex-wrap gap-1">
              {Object.values(prayersMap).map((c) => (
                <button
                  key={c.cityId}
                  type="button"
                  onClick={() => setCityId(c.cityId)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                    cityId === c.cityId
                      ? "bg-[var(--gold)] text-[#140106]"
                      : "bg-white/5 text-white/75 hover:bg-white/10"
                  }`}
                >
                  {c.cityAr}
                </button>
              ))}
            </div>

            {currentCity && (
              <div className="grid grid-cols-5 gap-1.5 pt-1 text-center">
                {PRAYER_LABELS.map((row) => (
                  <div
                    key={row.key}
                    className={`p-1.5 rounded-xl border ${
                      nextPrayer?.name === row.name
                        ? "bg-emerald-500/15 border-emerald-500/40"
                        : "bg-white/[0.04] border-white/10"
                    }`}
                  >
                    <span className="block text-[9px] text-white/60">{row.name}</span>
                    <span className="block font-mono text-[11px] font-black text-white mt-0.5">
                      {currentCity[row.key]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
