"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_SECTIONS } from "@awt/shared";
import { BrandLogo } from "@/components/BrandLogo";
import { SearchTrigger } from "@/components/SearchTrigger";
import { TopBarInfo } from "@/components/TopBarInfo";
import { WeatherWidget } from "@/components/WeatherWidget";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SavedCounterBadge } from "@/components/SavedCounterBadge";
import { LowBandwidthToggle } from "@/components/LowBandwidthToggle";
import {
  Flame,
  Radio,
  Menu,
  X,
  Globe2,
  Sparkles,
  ChevronDown,
  Layers,
  HeartHandshake,
  Briefcase,
  Activity,
  Film,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navSections = SITE_SECTIONS.filter((s) => s.showInNav);
  const moreSections = SITE_SECTIONS.filter((s) => !s.showInNav);

  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface-header)] backdrop-blur-xl sticky top-0 z-40 transition-colors shadow-xs">
      {/* 1. الشريط العلوي الرئاسي (Top Utility Bar) */}
      <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-subtle)]/80 text-xs text-[var(--text-muted)] py-1.5">
        <div className="container-custom flex flex-wrap items-center justify-between gap-3">
          {/* معلومات التوقيت، القدس وغزة، والطقس الموثق */}
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
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[var(--border-gold)] bg-[var(--surface)] text-[11px] font-bold text-[var(--text)] hover:border-[var(--gold)] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
              <span>بورصة الذهب والأسواق</span>
            </Link>

            <ThemeToggle />

            <Link
              href="/en"
              className="px-2.5 py-0.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[10px] font-black text-[var(--text)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all flex items-center gap-1"
              title="English Edition"
            >
              <Globe2 className="w-3 h-3" />
              <span>EN</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. الترويسة الرئيسية بهوية الوطن اليوم الجديدة (Royal Masthead) */}
      <div className="container-custom py-4 flex items-center justify-between gap-4 border-b border-[var(--border-subtle)]">
        <BrandLogo variant="header" />

        {/* الإجراءات السريعة: البحث، المحفوظات، وزر النشرة */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <SearchTrigger />
          <SavedCounterBadge />

          <Link
            href="/newsletter"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#590018] via-[#730020] to-[#590018] text-[var(--gold)] border border-[var(--gold)]/40 text-xs font-bold hover:shadow-lg hover:shadow-[var(--gold-glow)] transition-all transform active:scale-95 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span className="text-white">اشترك بالنشرة</span>
          </Link>

          {/* زر القائمة للشاشات الصغيرة */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--gold)] transition-colors"
            aria-label="تبديل القائمة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. شريط الأقسام التحريرية الرئيسي (Navigation Tabs) */}
      <nav className="container-custom hidden lg:flex items-center gap-1 overflow-x-auto py-2 text-xs sm:text-sm font-bold text-[var(--text)] scrollbar-none">
        <Link
          href="/"
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
            pathname === "/"
              ? "bg-[#590018] text-[var(--gold)] border border-[var(--gold)]/40 shadow-xs"
              : "hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text)]"
          }`}
        >
          الرئيسية
        </Link>

        {/* أقسام الهوية الأساسية */}
        {navSections.map((sec) => {
          const isActive = pathname === `/${sec.slug}`;
          const isPalestine = sec.slug === "palestine";
          const isAid = sec.slug === "aid";
          const isJobs = sec.slug === "jobs";

          return (
            <Link
              key={sec.slug}
              href={`/${sec.slug}`}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? "bg-[#590018] text-[var(--gold)] border border-[var(--gold)]/40 shadow-xs"
                  : isPalestine
                  ? "hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-black"
                  : isAid
                  ? "hover:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold"
                  : isJobs
                  ? "hover:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold"
                  : "hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {isPalestine && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
              {isAid && <HeartHandshake className="w-3.5 h-3.5 text-amber-500" />}
              {isJobs && <Briefcase className="w-3.5 h-3.5 text-blue-500" />}
              <span>{sec.nameAr}</span>
            </Link>
          );
        })}

        {/* عاجل وبث مباشر كروابط دائمة */}
        <Link
          href="/breaking"
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            pathname === "/breaking"
              ? "bg-[var(--breaking)] text-white shadow-xs"
              : "hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold"
          }`}
        >
          <Flame className="w-3.5 h-3.5 fill-current" />
          <span>عاجل</span>
        </Link>

        <Link
          href="/live"
          className="ms-auto px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white hover:opacity-90 transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs text-xs font-black"
        >
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>البث المباشر</span>
        </Link>
      </nav>

      {/* قائمة الجوال المنبثقة */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[var(--surface)] p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-[var(--bg-subtle)] text-center hover:bg-[#590018] hover:text-[var(--gold)] transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              href="/palestine"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-center font-black"
            >
              🇵🇸 فلسطين أولاً
            </Link>
            <Link
              href="/breaking"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 text-center font-black flex items-center justify-center gap-1"
            >
              <Flame className="w-3 h-3 fill-current" />
              <span>الأخبار العاجلة</span>
            </Link>
            <Link
              href="/live"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-rose-600 text-white text-center font-black flex items-center justify-center gap-1"
            >
              <Radio className="w-3 h-3 animate-pulse" />
              <span>البث الحي</span>
            </Link>
            {SITE_SECTIONS.filter((s) => s.slug !== "palestine").map((sec) => (
              <Link
                key={sec.slug}
                href={`/${sec.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-xl border border-[var(--border)] text-center hover:border-[var(--gold)] transition-colors"
              >
                {sec.nameAr}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:underline">من نحن</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:underline">اتصل بنا</Link>
            <Link href="/editorial-policy" onClick={() => setMobileMenuOpen(false)} className="hover:underline">ميثاق الشرف</Link>
            <Link href="/privacy" onClick={() => setMobileMenuOpen(false)} className="hover:underline">الخصوصية</Link>
          </div>
        </div>
      )}
    </header>
  );
}
