"use client";

import { useEffect, useState } from "react";
import { Clock, MapPin, ChevronDown } from "lucide-react";

interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

const CITY_PRAYERS: Record<string, PrayerTimes> = {
  jerusalem: { fajr: "04:46", dhuhr: "11:34", asr: "14:42", maghrib: "17:04", isha: "18:24" },
  gaza: { fajr: "04:48", dhuhr: "11:36", asr: "14:44", maghrib: "17:06", isha: "18:26" },
};

export function TopBarInfo() {
  const [mounted, setMounted] = useState(false);
  const [selectedCity, setSelectedCity] = useState<"jerusalem" | "gaza">("jerusalem");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const now = new Date();
  const gregorianStr = now.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let hijriStr = "";
  try {
    hijriStr = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);
  } catch {
    hijriStr = "";
  }

  const prayers = CITY_PRAYERS[selectedCity] || CITY_PRAYERS["jerusalem"]!;

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 text-[11px] text-white/70 whitespace-nowrap">
        <span>الوطن اليوم · المكان الرئيسي للأخبار بمصادرها الأصلية</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] text-white/90 whitespace-nowrap select-none">
      {/* التاريخ الميلادي والهجري */}
      <div className="flex items-center gap-1.5 font-medium">
        <span>{gregorianStr}</span>
        {hijriStr && (
          <>
            <span className="text-white/25">|</span>
            <span className="text-[var(--gold)] font-bold">{hijriStr}</span>
          </>
        )}
      </div>

      <span className="hidden md:inline text-white/20">•</span>

      {/* نافذة مواقيت الصلاة المدمجة الفاخرة */}
      <div className="relative hidden md:inline-flex items-center">
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-[10px] font-semibold text-white/90 hover:border-[var(--gold)] transition-colors cursor-pointer"
          title="مواقيت الصلاة في فلسطين"
        >
          <Clock className="w-3 h-3 text-[var(--gold)]" />
          <span>مواقيت:</span>
          <span className="text-[var(--gold)] font-bold">
            {selectedCity === "jerusalem" ? "القدس" : "غزة"}
          </span>
          <span className="text-white/40">·</span>
          <span>الظهر: <strong className="text-white">{prayers.dhuhr}</strong></span>
          <ChevronDown className={`w-2.5 h-2.5 text-white/60 transition-transform ${showDropdown ? "rotate-180" : ""}`} />
        </button>

        {/* قائمة جدول الصلوات الكامل واختيار المدينة */}
        {showDropdown && (
          <div
            className="absolute top-full start-0 mt-2 z-50 bg-[#160006]/98 border border-[var(--gold)]/30 rounded-2xl shadow-2xl p-3 min-w-[240px] space-y-2.5 backdrop-blur-2xl animate-in fade-in slide-in-from-top-1 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-[10px] font-black text-[var(--gold)] uppercase tracking-wider">
                مواقيت الصلاة اليوم
              </span>
              <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-lg border border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedCity("jerusalem")}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors ${
                    selectedCity === "jerusalem" ? "bg-[var(--gold)] text-black" : "text-white/70 hover:text-white"
                  }`}
                >
                  القدس
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCity("gaza")}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors ${
                    selectedCity === "gaza" ? "bg-[var(--gold)] text-black" : "text-white/70 hover:text-white"
                  }`}
                >
                  غزة
                </button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-1 text-center text-[10px]">
              <div className="p-1.5 rounded-lg bg-white/5">
                <span className="text-white/50 block text-[9px]">الفجر</span>
                <strong className="text-white font-mono">{prayers.fajr}</strong>
              </div>
              <div className="p-1.5 rounded-lg bg-[var(--gold)]/10 border border-[var(--gold)]/30">
                <span className="text-[var(--gold)] block text-[9px] font-bold">الظهر</span>
                <strong className="text-[var(--gold)] font-mono">{prayers.dhuhr}</strong>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5">
                <span className="text-white/50 block text-[9px]">العصر</span>
                <strong className="text-white font-mono">{prayers.asr}</strong>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5">
                <span className="text-white/50 block text-[9px]">المغرب</span>
                <strong className="text-white font-mono">{prayers.maghrib}</strong>
              </div>
              <div className="p-1.5 rounded-lg bg-white/5">
                <span className="text-white/50 block text-[9px]">العشاء</span>
                <strong className="text-white font-mono">{prayers.isha}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
