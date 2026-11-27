"use client";

import { useEffect, useState } from "react";
import { Sun, CloudSun, Cloud, CloudRain, CloudLightning, Droplets, Wind, ChevronDown } from "lucide-react";
import type { CityWeatherTelemetry } from "@/lib/live-data/telemetry";

function WeatherIcon({ kind }: { kind: CityWeatherTelemetry["conditionKind"] }) {
  switch (kind) {
    case "sun":
      return <Sun className="w-3.5 h-3.5 text-amber-400" />;
    case "cloud":
      return <Cloud className="w-3.5 h-3.5 text-slate-300" />;
    case "rain":
      return <CloudRain className="w-3.5 h-3.5 text-sky-400" />;
    case "storm":
      return <CloudLightning className="w-3.5 h-3.5 text-amber-300" />;
    default:
      return <CloudSun className="w-3.5 h-3.5 text-amber-300" />;
  }
}

export function WeatherWidget() {
  const [cities, setCities] = useState<CityWeatherTelemetry[]>([]);
  const [selectedId, setSelectedId] = useState<string>("jerusalem");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/v1/telemetry")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (active && Array.isArray(data?.weather)) setCities(data.weather);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (cities.length === 0) return null;

  const activeCity = cities.find((c) => c.id === selectedId) || cities[0]!;

  return (
    <div className="relative z-40">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-white/80 hover:text-[var(--gold)] transition-colors cursor-pointer"
        title="أحوال الطقس الحية"
      >
        <WeatherIcon kind={activeCity.conditionKind} />
        <span className="hidden sm:inline">{activeCity.cityAr}</span>
        <span className="font-mono font-bold text-[var(--gold)]">{activeCity.tempC}°C</span>
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>

      {open && (
        <div className="absolute top-full mt-2 end-0 w-72 rounded-2xl bg-[#160208] border border-[var(--gold)]/25 shadow-2xl p-4 space-y-2.5 z-50 text-white backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[11px] font-black text-[var(--gold)]">الطقس الحي</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[10px] text-white/50 hover:text-white cursor-pointer"
            >
              إغلاق
            </button>
          </div>

          <div className="space-y-1.5 max-h-60 overflow-y-auto">
            {cities.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelectedId(c.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                  c.id === activeCity.id
                    ? "bg-[var(--gold)]/15 border border-[var(--gold)]/35 text-white"
                    : "bg-white/[0.03] hover:bg-white/[0.08] border border-transparent text-white/80"
                }`}
              >
                <div className="flex items-center gap-2">
                  <WeatherIcon kind={c.conditionKind} />
                  <div className="text-start">
                    <span className="font-bold block">{c.cityAr}</span>
                    <span className="text-[10px] text-white/50">{c.conditionAr}</span>
                  </div>
                </div>
                <div className="text-end">
                  <span className="font-mono font-black text-[var(--gold)] block">{c.tempC}°C</span>
                  <span className="text-[9px] text-white/50 flex items-center gap-1.5">
                    <Droplets className="w-2.5 h-2.5 inline" />
                    {c.humidityPct}%
                    <Wind className="w-2.5 h-2.5 inline" />
                    {c.windKmh}كم
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
