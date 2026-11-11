"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_SECTIONS } from "@awt/shared";
import { SearchTrigger } from "@/components/SearchTrigger";
import { TopBarInfo } from "@/components/TopBarInfo";
import { WeatherWidget } from "@/components/WeatherWidget";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SavedCounterBadge } from "@/components/SavedCounterBadge";
import { LowBandwidthToggle } from "@/components/LowBandwidthToggle";
import {
  Flame,
  Radio,
  TrendingUp,
  Sparkles,
  Compass,
  FileCheck2,
  Bot,
  Layers,
  Headphones,
  Award,
  Globe2,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();

  const FEATURE_HUBS = [
    { href: "/live", label: "غرفة العمليات", icon: Radio, pulse: true, color: "text-rose-600 dark:text-rose-400 border-rose-500/30 bg-rose-500/5" },
    { href: "/fact-check", label: "رادار الحقيقة", icon: FileCheck2, pulse: false, color: "text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/5" },
    { href: "/economy", label: "الوطن الاقتصادي", icon: TrendingUp, pulse: false, color: "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/5" },
    { href: "/ask", label: "اسأل غرفة الأخبار AI", icon: Bot, pulse: false, color: "text-purple-600 dark:text-purple-400 border-purple-500/30 bg-purple-500/5" },
    { href: "/live-360", label: "تغطية 360°", icon: Layers, pulse: false, color: "text-blue-600 dark:text-blue-400 border-blue-500/30 bg-blue-500/5" },
    { href: "/atlas", label: "أطلس فلسطين", icon: Compass, pulse: false, color: "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/5" },
    { href: "/stories", label: "موجز الستوري", icon: Sparkles, pulse: false, color: "text-pink-600 dark:text-pink-400 border-pink-500/30 bg-pink-500/5" },
    { href: "/podcast", label: "استوديو البودكاست", icon: Headphones, pulse: false, color: "text-indigo-600 dark:text-indigo-400 border-indigo-500/30 bg-indigo-500/5" },
    { href: "/games", label: "تحدي الذاكرة", icon: Award, pulse: false, color: "text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/5" },
  ];

  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface-header)] backdrop-blur-xl sticky top-0 z-40 transition-colors shadow-xs">
      {/* 1. الشريط العلوي الرئاسي (Top Utility Bar) */}
      <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/70 text-xs text-[var(--text-muted)] py-1.5">
        <div className="container-custom flex flex-wrap items-center justify-between gap-3">
          {/* معلومات التوقيت، القدس وغزة، والطقس */}
          <div className="flex items-center gap-3">
            <TopBarInfo />
            <span className="hidden lg:inline text-[var(--border)]">|</span>
            <div className="hidden lg:block">
              <WeatherWidget />
            </div>
          </div>

          {/* أدوات الزائر: وضع الطوارئ، العملات، النسخة الإنجليزية والوضع الليلي */}
          <div className="flex items-center gap-2.5 ms-auto md:ms-0">
            <LowBandwidthToggle />

            <Link
              href="/economy"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[11px] font-bold text-[var(--text)] hover:border-amber-500 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>بورصة الذهب والعملات</span>
            </Link>

            <ThemeToggle />

            <Link
              href="/en"
              className="px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[10px] font-black text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all flex items-center gap-1"
              title="English Edition"
            >
              <Globe2 className="w-3 h-3" />
              <span>EN</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. الترويسة الملكية الرئيسية (Royal Masthead) */}
      <div className="container-custom py-4.5 flex items-center justify-between gap-4 border-b border-[var(--border-subtle)]">
        {/* اللوجو والوسم التحريري الفاخر */}
        <Link href="/" className="group flex items-center gap-3.5 focus:outline-hidden">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white flex items-center justify-center font-black text-2xl shadow-lg border border-emerald-400/30 group-hover:scale-105 group-hover:shadow-emerald-500/25 transition-all duration-300">
            <span className="relative z-10 font-bold tracking-tighter">وطن</span>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-[var(--surface)] animate-ping" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-[var(--surface)]" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight editorial-title group-hover:text-[var(--primary)] transition-colors">
                الوطن اليوم
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-[var(--primary-light)] text-[var(--primary)] text-[10px] font-black border border-[var(--primary)]/20">
                الواجهة الإخبارية المستقلة
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] font-medium tracking-wide">
              ALWATAN TODAY · الصرح الإخباري الشامل وتحليلات الرأي والتحقق الميداني
            </p>
          </div>
        </Link>

        {/* الإجراءات السريعة: البحث التفاعلي، المحفوظات، وزر النشرة */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <SearchTrigger />
          <SavedCounterBadge />

          <Link
            href="/newsletter"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white text-xs font-bold hover:shadow-lg hover:shadow-[var(--primary-glow)] transition-all transform active:scale-95 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>اشترك بالنشرة</span>
          </Link>
        </div>
      </div>

      {/* 3. شريط الأقسام التحريرية الرئيسي (Editorial Navigation Tabs) */}
      <nav className="container-custom flex items-center gap-1 overflow-x-auto py-2 text-xs sm:text-sm font-bold text-[var(--text)] scrollbar-none border-b border-[var(--border)]/40">
        <Link
          href="/"
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
            pathname === "/"
              ? "bg-[var(--primary)] text-white shadow-xs"
              : "hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text)]"
          }`}
        >
          الرئيسية
        </Link>

        <Link
          href="/palestine"
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            pathname === "/palestine"
              ? "bg-emerald-600 text-white shadow-xs"
              : "hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>فلسطين وغزة</span>
        </Link>

        <Link
          href="/breaking"
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            pathname === "/breaking"
              ? "bg-rose-600 text-white shadow-xs"
              : "hover:bg-rose-500/10 text-rose-600 dark:text-rose-400"
          }`}
        >
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>شريط العواجل</span>
        </Link>

        {SITE_SECTIONS.filter((s) => s.slug !== "palestine").map((sec) => {
          const isActive = pathname === `/${sec.slug}`;
          return (
            <Link
              key={sec.slug}
              href={`/${sec.slug}`}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                isActive
                  ? "bg-[var(--primary)] text-white shadow-xs"
                  : "hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {sec.nameAr}
            </Link>
          );
        })}

        <Link
          href="/live"
          className="ms-auto px-3.5 py-1.5 rounded-xl bg-rose-600/10 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white transition-all flex items-center gap-1.5 whitespace-nowrap border border-rose-500/30 text-xs font-black"
        >
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>البث المباشر</span>
        </Link>
      </nav>

      {/* 4. شريط المنصات النوعية والميزات الحصرية (Feature Ribbon) */}
      <div className="bg-[var(--surface)]/80 border-b border-[var(--border-subtle)] py-1.5 overflow-hidden">
        <div className="container-custom flex items-center gap-2 overflow-x-auto text-xs font-bold scrollbar-none py-0.5">
          {FEATURE_HUBS.map((hub) => {
            const Icon = hub.icon;
            const isActive = pathname === hub.href;
            return (
              <Link
                key={hub.href}
                href={hub.href}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-[11px] font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-xs"
                    : `${hub.color} hover:shadow-xs hover:scale-102`
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${hub.pulse ? "animate-pulse" : ""}`} />
                <span>{hub.label}</span>
              </Link>
            );
          })}

          <Link
            href="/my-watan"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--primary-light)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white border border-[var(--primary)]/20 whitespace-nowrap transition-all text-[11px] font-black ms-auto"
          >
            <span>👤 مساحتي الخاصة</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
