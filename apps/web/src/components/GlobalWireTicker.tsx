"use client";

import { useState } from "react";
import Link from "next/link";
import { Radio, Clock, ChevronLeft } from "lucide-react";


interface WireItem {
  id: string;
  agency: string;
  agencyColor: string;
  time: string;
  text: string;
  category: string;
  urgent: boolean;
  url: string;
}

const LIVE_WIRES: WireItem[] = [
  {
    id: "w-1",
    agency: "وفا",
    agencyColor: "bg-emerald-600 text-white",
    time: "منذ دقيقة",
    text: "وزارة الصحة الفلسطينية: طواقم الإسعاف تتمكن من إجلاء 14 مصاباً بعد قصف محيط مدرسة إيواء في جباليا.",
    category: "فلسطين",
    urgent: true,
    url: "/breaking",
  },
  {
    id: "w-2",
    agency: "Reuters",
    agencyColor: "bg-amber-600 text-white",
    time: "منذ دقيقتين",
    text: "أسعار النفط تقفز بنسبة 2.1% إثر مخاوف تعطل الإمدادات في ممرات الملاحة الدولية في البحر الأحمر.",
    category: "اقتصاد",
    urgent: false,
    url: "/economy",
  },
  {
    id: "w-3",
    agency: "AP",
    agencyColor: "bg-indigo-600 text-white",
    time: "منذ 4 دقائق",
    text: "مجلس الأمن يعقد جلسة إحاطة طارئة بطلب جزائري لمناقشة تدهور الأوضاع الإنسانية في شمال غزة.",
    category: "دولي",
    urgent: true,
    url: "/world",
  },
  {
    id: "w-4",
    agency: "الجزيرة",
    agencyColor: "bg-sky-600 text-white",
    time: "منذ 6 دقائق",
    text: "صفارات الإنذار تدوي في نهاريا ومحيطها بالقطاع الغربي للحدود بعد رصد إطلاق مقذوفات.",
    category: "عاجل",
    urgent: true,
    url: "/breaking",
  },
  {
    id: "w-5",
    agency: "الأناضول",
    agencyColor: "bg-teal-600 text-white",
    time: "منذ 8 دقائق",
    text: "الرئاسة التركية: استمرار الاتصالات مع الوسطاء لضمان مسار إغاثي إنساني مستدام ودائم للقطاع.",
    category: "سياسة",
    urgent: false,
    url: "/arab-world",
  },
];

export function GlobalWireTicker() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = LIVE_WIRES.filter((wire) => {
    if (activeFilter === "all") return true;
    return wire.agency.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-6 shadow-sm space-y-4">
      {/* الترويسة وأدوات الفلترة */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
          <h3 className="font-black text-sm text-[var(--text)] flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-rose-600" />
            <span>برقيات الوكالات المباشرة (Global Wire)</span>
          </h3>
          <span className="text-[10px] bg-rose-500/10 text-rose-600 px-2 py-0.5 rounded-full font-bold">
            بث لحظي
          </span>
        </div>

        {/* فلاتر الوكالات */}
        <div className="flex items-center gap-1.5 text-xs font-bold overflow-x-auto">
          {["all", "وفا", "Reuters", "AP", "الجزيرة", "الأناضول"].map((ag) => (
            <button
              key={ag}
              onClick={() => setActiveFilter(ag)}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-[11px] ${
                activeFilter === ag
                  ? "bg-[var(--primary)] text-white shadow-xs"
                  : "bg-[var(--surface-card)] text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {ag === "all" ? "جميع الوكالات" : ag}
            </button>
          ))}
        </div>
      </div>

      {/* شريط تدفق البرقيات اللحظي */}
      <div className="space-y-2.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] hover:border-[var(--primary)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-black shrink-0 ${item.agencyColor}`}>
                {item.agency}
              </span>
              <span className="text-[11px] font-mono text-[var(--text-muted)] shrink-0 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{item.time}</span>
              </span>
              <p className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors line-clamp-1 flex-1">
                {item.text}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <Link
                href={item.url}
                className="text-[11px] font-bold text-[var(--primary)] hover:underline flex items-center gap-1"
              >
                <span>المتابعة الكاملة</span>
                <ChevronLeft className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

