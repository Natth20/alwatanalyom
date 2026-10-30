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
  ramallah: { fajr: "04:46", dhuhr: "11:34", asr: "14:42", maghrib: "17:04", isha: "18:24" },
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
      <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
        <span>المكان الرئيسي لجميع الأخبار بمصادرها الأصلية</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-[var(--text-muted)]">
      {/* التاريخ الميلادي والهجري */}
      <div className="flex items-center gap-1.5 font-medium">
        <span>{gregorianStr}</span>
        {hijriStr && (
          <>
            <span className="text-[var(--border)]">|</span>
            <span className="text-[var(--text)] font-semibold">{hijriStr}</span>
          </>
        )}
      </div>

      <span className="hidden lg:inline text-[var(--border)]">•</span>

      {/* نافذة مواقيت الصلاة في القدس وغزة */}
      <div className="relative hidden md:flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)] text-[11px] font-semibold text-[var(--text)] hover:border-[var(--primary)] transition-colors cursor-pointer"
        >
          <Clock className="w-3 h-3 text-[var(--primary)]" />
          <span>مواقيت الصلاة:</span>
          <span className="text-[var(--primary)] font-bold">
            {selectedCity === "jerusalem" ? "القدس الشريف" : "غزة العزة"}
          </span>
          <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />
        </button>

        {/* أوقات الصلاة السريعة */}
        <div className="hidden xl:flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
          <span>الفجر: <strong className="text-[var(--text)]">{prayers.fajr}</strong></span>
          <span>الظهر: <strong className="text-[var(--text)]">{prayers.dhuhr}</strong></span>
          <span>العصر: <strong className="text-[var(--text)]">{prayers.asr}</strong></span>
          <span>المغرب: <strong className="text-amber-500 font-bold">{prayers.maghrib}</strong></span>
          <span>العشاء: <strong className="text-[var(--text)]">{prayers.isha}</strong></span>
        </div>

        {/* قائمة اختيار المدينة */}
        {showDropdown && (
          <div
            className="absolute top-full start-0 mt-1 z-50 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xl p-2 min-w-[200px] space-y-1 animate-in fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[10px] font-bold text-[var(--text-muted)] px-2 py-1 block">
              اختر المدينة لعرض المواقيت:
            </span>
            <button
              type="button"
              onClick={() => {
                setSelectedCity("jerusalem");
                setShowDropdown(false);
              }}
              className={`w-full text-start px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                selectedCity === "jerusalem"
                  ? "bg-[var(--primary)]/10 text-[var(--primary)] font-bold"
                  : "hover:bg-[var(--bg)] text-[var(--text)]"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                <span>القدس الشريف</span>
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">المسجد الأقصى</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCity("gaza");
                setShowDropdown(false);
              }}
              className={`w-full text-start px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                selectedCity === "gaza"
                  ? "bg-[var(--primary)]/10 text-[var(--primary)] font-bold"
                  : "hover:bg-[var(--bg)] text-[var(--text)]"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                <span>غزة</span>
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">قطاع غزة</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
