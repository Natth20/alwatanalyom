"use client";

import { useState } from "react";
import { Sun, CloudSun, CloudRain, Cloud, Wind, ChevronDown } from "lucide-react";

interface CityWeather {
  cityAr: string;
  temp: number;
  condition: string;
  icon: "sun" | "cloud-sun" | "rain" | "cloud";
  humidity: number;
  windSpeed: number;
}

const CITIES_WEATHER: CityWeather[] = [
  { cityAr: "القدس الشريف", temp: 22, condition: "مشمس ومعتدل", icon: "sun", humidity: 48, windSpeed: 14 },
  { cityAr: "غزة", temp: 24, condition: "غائم جزئياً", icon: "cloud-sun", humidity: 62, windSpeed: 18 },
  { cityAr: "رام الله", temp: 21, condition: "مشمس", icon: "sun", humidity: 50, windSpeed: 16 },
  { cityAr: "عمان", temp: 23, condition: "صافٍ", icon: "sun", humidity: 42, windSpeed: 15 },
  { cityAr: "القاهرة", temp: 27, condition: "حار نسبياً", icon: "sun", humidity: 45, windSpeed: 12 },
  { cityAr: "بيروت", temp: 25, condition: "رياح ساحلية", icon: "cloud-sun", humidity: 68, windSpeed: 20 },
];

export function WeatherWidget() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const current = CITIES_WEATHER[selectedIdx];

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "sun":
        return <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />;
      case "cloud-sun":
        return <CloudSun className="w-3.5 h-3.5 text-amber-400" />;
      case "rain":
        return <CloudRain className="w-3.5 h-3.5 text-cyan-400" />;
      default:
        return <Cloud className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="relative inline-block text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors border border-transparent hover:border-[var(--border)]"
        title="انقر لتبديل المدينة"
      >
        {renderIcon(current.icon)}
        <span className="font-semibold text-[var(--text)]">{current.cityAr}</span>
        <span className="font-bold text-[var(--text)] font-mono">{current.temp}°C</span>
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute top-full start-0 mt-1.5 w-56 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="text-[10px] text-[var(--text-muted)] font-bold px-2 py-1 border-b border-[var(--border)] mb-1">
            الأحوال الجوية في المدن
          </div>
          <div className="space-y-1">
            {CITIES_WEATHER.map((city, idx) => (
              <button
                key={city.cityAr}
                onClick={() => {
                  setSelectedIdx(idx);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between p-1.5 rounded-lg text-start transition-colors ${
                  idx === selectedIdx
                    ? "bg-[var(--primary)]/10 text-[var(--primary)] font-bold"
                    : "hover:bg-[var(--surface-hover)] text-[var(--text)]"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {renderIcon(city.icon)}
                  <span>{city.cityAr}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-[11px]">{city.temp}°C</span>
                  <span className="text-[9px] text-[var(--text-muted)]">{city.condition}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-2 pt-1.5 border-t border-[var(--border)] px-2 flex items-center justify-between text-[10px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <Wind className="w-3 h-3 text-[var(--primary)]" />
              <span>الرياح: {current.windSpeed} كم/س</span>
            </span>
            <span>الرطوبة: {current.humidity}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

