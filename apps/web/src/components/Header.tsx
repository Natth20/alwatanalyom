"use client";

import { useState, useEffect, useRef } from "react";
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
  ShieldCheck,
  Bot,
  Map,
  Headphones,
  TrendingUp,
  Award,
  Send,
} from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 45);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // إغلاق القائمة المنسدلة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navSections = SITE_SECTIONS.filter((s) => s.showInNav);

  const moreFeatures = [
    { title: "اسأل الوطن", href: "/ask", icon: Bot, desc: "محرك إجابات صحفي من الأرشيف الموثق", color: "text-[var(--gold)]" },
    { title: "رادار الحقيقة", href: "/fact-check", icon: ShieldCheck, desc: "مرصد دحض الشائعات والتحقق الجنائي", color: "text-rose-500" },
    { title: "أطلس فلسطين", href: "/atlas", icon: Map, desc: "دليل الجغرافيا والتغطيات الميدانية", color: "text-emerald-500" },
    { title: "تجمع القصص", href: "/stories", icon: Layers, desc: "تغطيات الحدث الواحد متعددة المصادر", color: "text-sky-500" },
    { title: "بودكاست الوطن", href: "/podcast", icon: Headphones, desc: "استوديو الموجز الصوتي والتحليل", color: "text-indigo-500" },
    { title: "فيديو وتغطيات", href: "/videos", icon: Film, desc: "التقارير المصورة والإنتاج المرئي", color: "text-purple-500" },
    { title: "تحدي الذاكرة", href: "/games", icon: Award, desc: "مسابقة المعرفة الجغرافية والتاريخية", color: "text-amber-500" },
  ];

  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface-header)] backdrop-blur-xl sticky top-0 z-40 transition-colors shadow-sm">
      {/* 0. زر التخطي للمحتوى الرئيسي لتعزيز إمكانية الوصول (WCAG AA Accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--gold)] focus:text-[var(--maroon-dark)] focus:font-black focus:text-xs focus:rounded-xl focus:shadow-lg focus:outline-none"
      >
        تخطي إلى المحتوى الرئيسي
      </a>

      {/* 1. الشريط العلوي الرئاسي (Tier 1: The Royal Utility Bar) */}
      <div
        className={`border-b border-black/10 dark:border-white/5 bg-[#26000A] text-white/90 text-xs transition-all duration-300 ease-in-out ${
          scrolled ? "max-h-0 opacity-0 overflow-hidden py-0 border-none" : "max-h-16 opacity-100 py-1.5"
        }`}
      >
        <div className="container-custom flex flex-wrap items-center justify-between gap-3">
          {/* معلومات التوقيت والقدس وغزة والطقس اللحظي */}
          <div className="flex items-center gap-3 text-[11px] text-white/80">
            <TopBarInfo />
            <span className="hidden lg:inline text-white/20">|</span>
            <div className="hidden lg:flex items-center gap-1.5 text-white/90">
              <WeatherWidget />
            </div>
          </div>

          {/* البورصة، البث المباشر، وأدوات القارئ */}
          <div className="flex items-center gap-2.5 ms-auto md:ms-0">
            {/* شريط الذهب والأسواق السريع */}
            <Link
              href="/economy"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/15 text-[11px] font-bold text-white border border-white/15 transition-colors"
            >
              <TrendingUp className="w-3 h-3 text-[var(--gold)]" />
              <span>الذهب: 2,748$ ↑ · مؤشر القدس</span>
            </Link>

            {/* زر البث المباشر المضيء */}
            <Link
              href="/live"
              className="px-2.5 py-0.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-[11px] font-black flex items-center gap-1.5 shadow-sm transition-transform active:scale-95"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>البث الحي</span>
            </Link>

            <span className="text-white/20">|</span>

            <LowBandwidthToggle />
            <ThemeToggle />

            {/* النسخة الإنجليزية */}
            <Link
              href="/en"
              className="px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-black text-white hover:text-[var(--gold)] transition-colors flex items-center gap-1"
              title="English Edition"
            >
              <Globe2 className="w-3 h-3" />
              <span>EN</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. الترويسة الرئيسية بهوية الوطن اليوم الجديدة (Tier 2: The Royal Masthead) */}
      <div
        className={`container-custom flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] transition-all duration-300 ease-in-out ${
          scrolled ? "py-2" : "py-3.5"
        }`}
      >
        {/* الشعار الملكي */}
        <BrandLogo variant="header" />

        {/* حقل البحث الذكي المركزي للشاشات الكبيرة */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <SearchTrigger />
        </div>

        {/* الإجراءات السريعة: اسأل الوطن، النشرة، والمحفوظات */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/ask"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)] text-xs font-bold text-[var(--text)] transition-colors"
          >
            <Bot className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>اسأل الوطن</span>
          </Link>

          <Link
            href="/fact-check"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10 text-xs font-bold text-rose-600 dark:text-rose-400 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>رادار الحقيقة</span>
          </Link>

          <SavedCounterBadge />

          <Link
            href="/newsletter"
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#590018] via-[#730020] to-[#590018] text-[var(--gold)] border border-[var(--gold)]/40 text-xs font-bold hover:shadow-md transition-all active:scale-95 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span className="text-white">النشرة</span>
          </Link>

          {/* زر فتح القائمة للشاشات الصغيرة */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--gold)] transition-colors cursor-pointer"
            aria-label="تبديل القائمة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. شريط الأقسام التحريرية الماسي (Tier 3: The Master Editorial Nav) */}
      <nav className="container-custom hidden lg:flex items-center justify-between gap-1 overflow-visible py-1.5 text-xs sm:text-sm font-bold text-[var(--text)]">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
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

          {/* الأقسام الأساسية في الشريط */}
          {navSections.map((sec) => {
            const isActive = pathname === `/${sec.slug}`;
            const isPalestine = sec.slug === "palestine";
            const isAid = sec.slug === "aid";
            const isJobs = sec.slug === "jobs";
            const isSports = sec.slug === "sports";

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
                    : isSports
                    ? "hover:bg-emerald-600/10 text-emerald-600 font-bold"
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

          {/* القائمة المنسدلة: المزيد من الخدمات والمنصات */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer ${
                moreDropdownOpen
                  ? "bg-[var(--surface-hover)] text-[var(--primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]"
              }`}
            >
              <span>المزيد</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {moreDropdownOpen && (
              <div className="absolute top-full start-0 mt-2 w-72 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                {moreFeatures.map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <Link
                      key={idx}
                      href={feat.href}
                      onClick={() => setMoreDropdownOpen(false)}
                      className="p-2.5 rounded-xl hover:bg-[var(--surface-hover)] transition-colors flex items-start gap-3 group"
                    >
                      <div className={`p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] ${feat.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold block text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                          {feat.title}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] line-clamp-1">
                          {feat.desc}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* عاجل والنبض الميداني */}
        <div className="flex items-center gap-2">
          <Link
            href="/breaking"
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              pathname === "/breaking"
                ? "bg-[var(--breaking)] text-white shadow-xs"
                : "hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold"
            }`}
          >
            <Flame className="w-3.5 h-3.5 fill-current animate-pulse text-red-500" />
            <span>الأخبار العاجلة</span>
          </Link>
        </div>
      </nav>

      {/* 4. قائمة الجوال الذكية المنبثقة (Mobile Slide-out Navigation) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[var(--surface)] p-4 space-y-4 animate-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto">
          {/* حقل البحث بالجوال */}
          <div className="pb-2">
            <SearchTrigger />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-[var(--bg-subtle)] text-center hover:bg-[#590018] hover:text-[var(--gold)] transition-colors"
            >
              الرئيسية
            </Link>
            <Link
              href="/palestine"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-center font-black flex items-center justify-center gap-1"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>فلسطين أولاً</span>
            </Link>
            <Link
              href="/breaking"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-rose-500/10 text-rose-600 text-center font-black flex items-center justify-center gap-1"
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>الأخبار العاجلة</span>
            </Link>
            <Link
              href="/live"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-red-600 text-white text-center font-black flex items-center justify-center gap-1"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>البث المباشر</span>
            </Link>

            {/* سائر الأقسام */}
            {navSections.filter((s) => s.slug !== "palestine").map((sec) => (
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

          {/* الخدمات الذكية */}
          <div className="pt-3 border-t border-[var(--border)]">
            <span className="text-xs font-black text-[var(--text-muted)] block mb-2">
              منصات وخدمات استقصائية:
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {moreFeatures.map((feat, idx) => (
                <Link
                  key={idx}
                  href={feat.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center gap-2 hover:border-[var(--gold)] transition-colors"
                >
                  <feat.icon className={`w-3.5 h-3.5 ${feat.color}`} />
                  <span className="font-bold">{feat.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
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
