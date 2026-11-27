"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  ShieldAlert,
  Map,
  Radio,
  Trophy,
  Sparkles,
  ChevronLeft,
  Compass,
  Activity,
  Flame,
} from "lucide-react";

export interface HubsNavProps {
  current?: string;
}

export function HubsNav({ current }: HubsNavProps = {}) {
  const pathname = usePathname();

  const hubs = [
    {
      href: "/ask",
      label: "اسأل الوطن AI",
      subLabel: "الأرشيف الصحفي والاستقصاء",
      icon: Bot,
      badge: "AI 2026",
      accent: "from-amber-500/20 to-[#f5b900]/10",
      activeBorder: "border-[#f5b900]",
      badgeColor: "bg-[#f5b900]/20 text-[#f5b900] border-[#f5b900]/40",
    },
    {
      href: "/fact-check",
      label: "رادار الحقيقة",
      subLabel: "مختبر كشف التضليل OSINT",
      icon: ShieldAlert,
      badge: "OSINT Lab",
      accent: "from-rose-500/20 to-red-600/10",
      activeBorder: "border-rose-500",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    },
    {
      href: "/atlas",
      label: "أطلس فلسطين",
      subLabel: "الجغرافيا والذاكرة والمدن",
      icon: Map,
      badge: "أطلس حي",
      accent: "from-emerald-500/20 to-teal-600/10",
      activeBorder: "border-emerald-500",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    },
    {
      href: "/podcast",
      label: "بودكاست الوطن",
      subLabel: "البث الصوتي والمؤشرات الحية",
      icon: Radio,
      badge: "بث مباشر",
      accent: "from-teal-500/20 to-emerald-600/10",
      activeBorder: "border-teal-400",
      badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
    },
    {
      href: "/games",
      label: "ألعاب المعرفة",
      subLabel: "تحدي الذاكرة وصون التراث",
      icon: Trophy,
      badge: "15 سؤالاً",
      accent: "from-[#f5b900]/20 to-amber-700/10",
      activeBorder: "border-[#f5b900]",
      badgeColor: "bg-[#f5b900]/20 text-[#f5b900] border-[#f5b900]/40",
    },
  ];

  return (
    <nav
      aria-label="المراكز التفاعلية الذكية"
      className="w-full bg-[#0a0205]/95 text-white border-b border-[var(--gold)]/20 shadow-2xl backdrop-blur-2xl relative z-30"
    >
      {/* 1. الشريط العلوي: تصريح المنظومة التفاعلية */}
      <div className="border-b border-white/5 bg-gradient-to-r from-black/80 via-[#180309]/90 to-black/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[var(--gold)]/30 to-amber-600/20 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] shadow-xs">
              <Compass className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-black text-white text-xs tracking-tight">
                المراكز التفاعلية والرقمية الذكية
              </span>
              <span className="hidden sm:inline-block text-[10px] text-stone-400">
                · استقصاء وتحقق وتوثيق صوتي وجغرافي وتراثي مباشر
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold">
              <Activity className="w-3 h-3 animate-pulse text-emerald-400" />
              <span>5 مختبرات تفاعلية نشطة</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-stone-400">
              <span>تحديث البيانات: لحظي</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. شريط الكبسولات التفاعلية الخمس الفاخرة */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1">
          {hubs.map((hub) => {
            const isActive = current
              ? current === hub.href
              : pathname === hub.href || pathname?.startsWith(`${hub.href}/`);
            const Icon = hub.icon;

            return (
              <Link
                key={hub.href}
                href={hub.href}
                className={`group relative flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-2xl border transition-all duration-300 shrink-0 select-none ${
                  isActive
                    ? `bg-gradient-to-br ${hub.accent} ${hub.activeBorder} shadow-lg shadow-black/60`
                    : "bg-[#140409]/70 border-white/10 hover:border-[var(--gold)]/40 hover:bg-[#1a060d] text-stone-300 hover:text-white"
                }`}
              >
                {/* شريط الإضاءة السفلي للكبسولة النشطة */}
                {isActive && (
                  <div className="absolute -bottom-px inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
                )}

                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                    isActive
                      ? "bg-gradient-to-br from-[var(--gold)] to-amber-600 text-[#140106] shadow-md shadow-[var(--gold)]/20"
                      : "bg-white/5 text-[var(--gold)] border border-white/10 group-hover:border-[var(--gold)]/40"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs sm:text-sm font-black transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-stone-200 group-hover:text-white"
                      }`}
                    >
                      {hub.label}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${hub.badgeColor}`}
                    >
                      {hub.badge}
                    </span>
                  </div>
                  <span className="hidden sm:block text-[10px] text-stone-400 group-hover:text-stone-300 truncate max-w-[140px]">
                    {hub.subLabel}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
