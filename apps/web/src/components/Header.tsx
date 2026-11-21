"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { SearchTrigger } from "@/components/SearchTrigger";
import { WeatherWidget } from "@/components/WeatherWidget";
import { TopBarInfo } from "@/components/TopBarInfo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationCenter } from "@/components/NotificationCenter";
import { LowBandwidthToggle } from "@/components/LowBandwidthToggle";
import {
  Flame,
  Radio,
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  Coins,
  ShieldCheck,
  Trophy,
  HeartHandshake,
  Film,
  Sparkles,
  Map,
  Compass,
  FileSearch,
  Activity,
  Headphones,
  Gamepad2,
  ExternalLink,
  Clock,
  Layers,
} from "lucide-react";
import { SavedCounterBadge } from "@/components/SavedCounterBadge";

type ActiveMegaMenu = "palestine" | "world" | "sports" | "economy" | "digital" | null;

export function Header() {
  const pathname = usePathname();
  const [activeMega, setActiveMega] = useState<ActiveMegaMenu>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // إغلاق الميجا منيو عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveMega(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveMega(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  const toggleMega = (menu: ActiveMegaMenu) => {
    setActiveMega((curr) => (curr === menu ? null : menu));
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 shadow-md">
      {/* 0. زر التخطي للمحتوى الرئيسي لتعزيز إمكانية الوصول */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--gold)] focus:text-[#140005] focus:font-black focus:text-xs focus:rounded-xl focus:shadow-xl focus:outline-none"
      >
        تخطي إلى المحتوى الرئيسي
      </a>

      {/* 1. الشريط الرئاسي فائق النحافة (Tier 1: The Presidential Micro-Ribbon) */}
      <div
        className={`border-b border-black/15 dark:border-white/5 bg-gradient-to-r from-[#180006] via-[#2a000c] to-[#180006] text-white/90 text-[11px] transition-all duration-300 ease-in-out ${
          scrolled ? "max-h-0 opacity-0 overflow-hidden py-0 border-none" : "max-h-10 opacity-100 py-1"
        }`}
      >
        <div className="container-custom max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6">
          {/* معلومات التوقيت ومواقيت القدس وغزة والطقس اللحظي */}
          <div className="flex items-center gap-3 text-white/80">
            <TopBarInfo />
            <span className="hidden sm:inline text-white/20">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-white/90">
              <WeatherWidget />
            </div>
          </div>

          {/* البورصة، الأدوات، وبوابة الإدارة */}
          <div className="flex items-center gap-2.5 ms-auto">
            {/* شريط الذهب والعملات المصغر */}
            <Link
              href="/economy"
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white transition-all"
            >
              <Coins className="w-3 h-3 text-[var(--gold)]" />
              <span>الذهب: 2,852$ · دولار/شيكل: 3.72</span>
            </Link>

            <span className="hidden md:inline text-white/20">|</span>

            <LowBandwidthToggle />
            <ThemeToggle />

            {/* بوابة اللغة الإنجليزية */}
            <Link
              href="/en"
              className="px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-bold text-stone-200 transition-colors"
              title="English Edition"
            >
              <span>EN</span>
            </Link>

            {/* بوابة غرفة الأخبار والإدارة للمحررين */}
            <Link
              href="/admin"
              className="px-2.5 py-0.5 rounded-full bg-[var(--gold)]/20 hover:bg-[var(--gold)]/30 text-[10px] font-black text-[var(--gold)] border border-[var(--gold)]/40 transition-all flex items-center gap-1 shadow-xs"
              title="غرفة العمليات التحريرية والإدارة"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>لوحة الإدارة</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. الترويسة الماسية الموحدة (Tier 2: The Unified Architectural Masthead) */}
      <div
        ref={navContainerRef}
        className="border-b border-[var(--border)] bg-[var(--surface-header)]/95 backdrop-blur-2xl transition-all relative w-full"
      >
        <div className="container-custom max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 py-2">
          {/* الشعار الملكي الرسمي المعتمد */}
          <div className="shrink-0">
            <BrandLogo variant="header" />
          </div>

          {/* شريط الأقسام التحريرية المركزي المريح للعين مع أزرار القوائم */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-xs font-bold text-[var(--text)]">
            {/* الرئيسية */}
            <Link
              href="/"
              className={`px-2.5 py-1.5 rounded-xl whitespace-nowrap transition-all font-black ${
                pathname === "/"
                  ? "bg-[var(--maroon)] text-[var(--gold)] shadow-xs"
                  : "hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              الرئيسية
            </Link>

            {/* 1. قائمة فلسطين والميدان المنسدلة العملاقة */}
            <button
              type="button"
              onClick={() => toggleMega("palestine")}
              onMouseEnter={() => setActiveMega("palestine")}
              className={`px-2.5 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1 font-black cursor-pointer ${
                pathname.startsWith("/palestine") || activeMega === "palestine"
                  ? "bg-[#0E472A] text-white border border-emerald-400/40 shadow-xs"
                  : "hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>فلسطين والميدان</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${activeMega === "palestine" ? "rotate-180" : ""}`}
              />
            </button>

            {/* 2. قائمة العالم العربي ودولياً المنسدلة */}
            <button
              type="button"
              onClick={() => toggleMega("world")}
              onMouseEnter={() => setActiveMega("world")}
              className={`px-2.5 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1 font-bold cursor-pointer ${
                pathname === "/arab-world" || pathname === "/world" || activeMega === "world"
                  ? "bg-[var(--maroon)] text-[var(--gold)] shadow-xs"
                  : "hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              <span>عربياً ودولياً</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${activeMega === "world" ? "rotate-180" : ""}`}
              />
            </button>

            {/* 3. قائمة يلا سبورت والملاعب المنسدلة العملاقة */}
            <button
              type="button"
              onClick={() => toggleMega("sports")}
              onMouseEnter={() => setActiveMega("sports")}
              className={`px-2.5 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1 font-black cursor-pointer ${
                pathname === "/sports" || activeMega === "sports"
                  ? "bg-emerald-700 text-white border border-emerald-400/40 shadow-xs"
                  : "hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-emerald-500" />
              <span>يلا سبورت</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${activeMega === "sports" ? "rotate-180" : ""}`}
              />
            </button>

            {/* 4. قائمة الاقتصاد والأسواق المنسدلة العملاقة */}
            <button
              type="button"
              onClick={() => toggleMega("economy")}
              onMouseEnter={() => setActiveMega("economy")}
              className={`px-2.5 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1 font-bold cursor-pointer ${
                pathname === "/economy" || activeMega === "economy"
                  ? "bg-[var(--maroon)] text-[var(--gold)] shadow-xs"
                  : "hover:bg-amber-500/10 text-amber-700 dark:text-amber-400"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>المال والأعمال</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${activeMega === "economy" ? "rotate-180" : ""}`}
              />
            </button>

            {/* المساعدات */}
            <Link
              href="/aid"
              className={`px-2.5 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1 ${
                pathname === "/aid"
                  ? "bg-[var(--maroon)] text-[var(--gold)] shadow-xs"
                  : "hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold"
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-amber-500" />
              <span>المساعدات</span>
            </Link>

            {/* 5. قائمة المنصات الرقمية ورادار الحقيقة المنسدلة */}
            <button
              type="button"
              onClick={() => toggleMega("digital")}
              onMouseEnter={() => setActiveMega("digital")}
              className={`px-2.5 py-1.5 rounded-xl border border-[var(--gold)]/40 bg-gradient-to-r from-[#26000A] to-[#3D0010] text-[var(--gold)] text-xs font-black flex items-center gap-1 transition-all shadow-xs cursor-pointer ${
                activeMega === "digital" ? "ring-2 ring-[var(--gold)]" : "hover:border-[var(--gold)]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>الصحافة الرقمية</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${activeMega === "digital" ? "rotate-180" : ""}`}
              />
            </button>
          </nav>

          {/* أدوات الوصول السريع في الطرف الأيسر */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* زر البحث الفاخر المصغر */}
            <div className="hidden sm:block">
              <SearchTrigger />
            </div>

            {/* زر البث المباشر المضيء */}
            <Link
              href="/live"
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-[10px] sm:text-[11px] font-black flex items-center gap-1.5 shadow-md transition-transform active:scale-95 shrink-0"
            >
              <span className="w-2 h-2 rounded-full bg-white inline-block animate-ping" />
              <span>البث الحي</span>
            </Link>

            <NotificationCenter />
            <SavedCounterBadge />

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

        {/* لوحات الميجا منيو الموحدة: متموضعة بمنتصف الهيدر بدقة وبدون أي خروج عن الشاشة */}

        {/* 1. لوحة فلسطين والميدان المنسدلة */}
        {activeMega === "palestine" && (
          <div
            onMouseLeave={() => setActiveMega(null)}
            className="absolute top-full inset-x-0 mx-auto max-w-5xl z-50 mt-1 rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-b from-[#072415]/98 via-[#0A160F]/95 to-[#050D09]/98 backdrop-blur-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="grid grid-cols-12 gap-6 items-start text-white">
              <div className="col-span-3 space-y-3 border-e border-white/10 pe-4">
                <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider block">
                  غرف الميدان 24/7
                </span>
                <ul className="space-y-1.5 text-xs font-semibold">
                  <li>
                    <Link
                      href="/palestine/gaza"
                      className="block p-2 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between"
                    >
                      <span>قطاع غزة العزة</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/palestine/jerusalem" className="block p-2 rounded-xl hover:bg-white/10 transition-colors">
                      القدس الشريف والأقصى
                    </Link>
                  </li>
                  <li>
                    <Link href="/palestine/west-bank" className="block p-2 rounded-xl hover:bg-white/10 transition-colors">
                      الضفة الغربية والمخيمات
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/atlas"
                      className="block p-2 rounded-xl hover:bg-white/10 text-emerald-300 font-bold flex items-center gap-1.5"
                    >
                      <Map className="w-3.5 h-3.5" />
                      <span>أطلس فلسطين التاريخي</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-9 grid grid-cols-3 gap-4">
                <Link
                  href="/palestine/gaza"
                  className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-emerald-400/60 transition-all"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-emerald-950">
                    <img
                      src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&auto=format&fit=crop&q=80"
                      alt="غزة"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-red-600 text-[10px] font-bold text-white">
                      عاجل
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-emerald-300">
                    المستشفيات الميدانية تواصل العمل تحت القصف وتنسيق مستمر لدخول الوقود
                  </h4>
                </Link>

                <Link
                  href="/palestine/jerusalem"
                  className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-emerald-400/60 transition-all"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-emerald-950">
                    <img
                      src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=400&auto=format&fit=crop&q=80"
                      alt="القدس"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-emerald-600 text-[10px] font-bold text-white">
                      القدس
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-emerald-300">
                    رباط أهالي القدس وتوافد المصلين إلى المسجد الأقصى المبارك
                  </h4>
                </Link>

                <Link
                  href="/atlas"
                  className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-emerald-400/60 transition-all"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-emerald-950">
                    <img
                      src="https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=400&auto=format&fit=crop&q=80"
                      alt="أطلس"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-[var(--gold)] text-[10px] font-bold text-black">
                      أطلس تفاعلي
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-emerald-300">
                    خريطة صمود القرى المهجرة وتوثيق المعالم التاريخية الفلسطينية
                  </h4>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 2. لوحة العالم العربي ودولياً المنسدلة */}
        {activeMega === "world" && (
          <div
            onMouseLeave={() => setActiveMega(null)}
            className="absolute top-full inset-x-0 mx-auto max-w-5xl z-50 mt-1 rounded-3xl border-2 border-rose-900/40 bg-gradient-to-b from-[#180006]/98 via-[#1F020A]/95 to-[#0E0004]/98 backdrop-blur-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="grid grid-cols-12 gap-6 items-start text-white">
              <div className="col-span-3 space-y-3 border-e border-white/10 pe-4">
                <span className="text-[11px] font-black text-[var(--gold)] uppercase tracking-wider block">
                  الأقاليم والملفات الكبرى
                </span>
                <ul className="space-y-1.5 text-xs font-semibold">
                  <li>
                    <Link href="/arab-world" className="block p-2 rounded-xl hover:bg-white/10 transition-colors">
                      الشرق الأوسط والعالم العربي
                    </Link>
                  </li>
                  <li>
                    <Link href="/world" className="block p-2 rounded-xl hover:bg-white/10 transition-colors">
                      عواصم القرار الدولي (واشنطن، لندن، بكين)
                    </Link>
                  </li>
                  <li>
                    <Link href="/stories" className="block p-2 rounded-xl hover:bg-white/10 text-[var(--gold)] font-bold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>تجمعات القصص والخطوط الزمنية</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-9 grid grid-cols-3 gap-4">
                <Link
                  href="/arab-world"
                  className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-[var(--gold)]/60 transition-all"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-stone-900">
                    <img
                      src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&auto=format&fit=crop&q=80"
                      alt="العالم العربي"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-[var(--gold)] text-[10px] font-bold text-black">
                      قمة إقليمية
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-[var(--gold)]">
                    تحركات دبلوماسية مكثفة واجتماعات تشاورية في الرياض والقاهرة
                  </h4>
                </Link>

                <Link
                  href="/world"
                  className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-[var(--gold)]/60 transition-all"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-stone-900">
                    <img
                      src="https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=400&auto=format&fit=crop&q=80"
                      alt="مجلس الأمن"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-blue-600 text-[10px] font-bold text-white">
                      الأمم المتحدة
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-[var(--gold)]">
                    جلسة طارئة لمجلس الأمن الدولي لبحث آليات الهدنة الإنسانية
                  </h4>
                </Link>

                <Link
                  href="/stories"
                  className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-[var(--gold)]/60 transition-all"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-stone-900">
                    <img
                      src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&auto=format&fit=crop&q=80"
                      alt="تحقيقات"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-purple-600 text-[10px] font-bold text-white">
                      ملف خاص
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-[var(--gold)]">
                    المسار الجنائي للعدالة الدولية: متابعة الدعاوى أمام محكمة العدل
                  </h4>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 3. لوحة يلا سبورت والملاعب المنسدلة العملاقة */}
        {activeMega === "sports" && (
          <div
            onMouseLeave={() => setActiveMega(null)}
            className="absolute top-full inset-x-0 mx-auto max-w-5xl z-50 mt-1 rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-b from-[#062414]/98 via-[#091a10]/95 to-[#04120a]/98 backdrop-blur-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="grid grid-cols-12 gap-6 items-start text-white">
              <div className="col-span-3 space-y-3 border-e border-white/10 pe-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider">
                    ملاعب يلا سبورت 24/7
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs font-semibold">
                  <li>
                    <Link href="/sports" className="block p-2 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between">
                      <span>مباريات اليوم الحية</span>
                      <span className="px-2 py-0.5 rounded-full bg-red-600 text-[10px] font-bold text-white">مباشر</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/sports" className="block p-2 rounded-xl hover:bg-white/10 transition-colors">
                      دوري أبطال أوروبا
                    </Link>
                  </li>
                  <li>
                    <Link href="/sports" className="block p-2 rounded-xl hover:bg-white/10 transition-colors">
                      الدوري الإنجليزي الممتاز
                    </Link>
                  </li>
                  <li>
                    <Link href="/sports" className="block p-2 rounded-xl hover:bg-white/10 text-emerald-300 font-bold">
                      الكرة الفلسطينية والعربية ↗
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-9 grid grid-cols-3 gap-4">
                <Link
                  href="/sports"
                  className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-emerald-400/60 transition-all"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-emerald-950">
                    <img
                      src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&auto=format&fit=crop&q=80"
                      alt="دوري الأبطال"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-emerald-600 text-[10px] font-bold text-white">
                      قمة الأسبوع
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-emerald-300">
                    صراع العمالقة نحو نصف نهائي دوري الأبطال.. التشكيل والغيابات
                  </h4>
                </Link>

                <Link
                  href="/sports"
                  className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-emerald-400/60 transition-all"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-emerald-950">
                    <img
                      src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&auto=format&fit=crop&q=80"
                      alt="الكلاسيكو"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-red-600 text-[10px] font-bold text-white">
                      الليغا
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-emerald-300">
                    كلاسيكو الأرض يقترب.. حسابات اللقب في الجولات الحاسمة
                  </h4>
                </Link>

                <Link
                  href="/sports"
                  className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-emerald-400/60 transition-all"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-emerald-950">
                    <img
                      src="https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=400&auto=format&fit=crop&q=80"
                      alt="المنتخب"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-[var(--gold)] text-[10px] font-bold text-black">
                      الفدائي
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-emerald-300">
                    الفدائي يواصل كتابة التاريخ في التصفيات المونديالية بروح الصمود
                  </h4>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 4. لوحة الاقتصاد والأسواق المنسدلة العملاقة */}
        {activeMega === "economy" && (
          <div
            onMouseLeave={() => setActiveMega(null)}
            className="absolute top-full inset-x-0 mx-auto max-w-5xl z-50 mt-1 rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-[#1c1204]/98 via-[#140c02]/95 to-[#0b0701]/98 backdrop-blur-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="grid grid-cols-12 gap-6 items-start text-white">
              <div className="col-span-3 space-y-3 border-e border-white/10 pe-4">
                <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider block">
                  أسواق فلسطين والعالم
                </span>
                <ul className="space-y-1.5 text-xs font-semibold">
                  <li>
                    <Link href="/economy" className="block p-2 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between">
                      <span>حاسبة الذهب والأعيرة</span>
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/economy" className="block p-2 rounded-xl hover:bg-white/10 transition-colors">
                      أسعار صرف العملات اللحظية
                    </Link>
                  </li>
                  <li>
                    <Link href="/economy" className="block p-2 rounded-xl hover:bg-white/10 transition-colors">
                      بورصة القدس وتداول الشركات
                    </Link>
                  </li>
                  <li>
                    <Link href="/economy/instrument/BRENT" className="block p-2 rounded-xl hover:bg-white/10 text-amber-300 font-bold">
                      مؤشرات النفط وبرنت عالمياً ↗
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-9 grid grid-cols-3 gap-4">
                <Link
                  href="/economy"
                  className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-amber-400/60 transition-all"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-amber-950">
                    <img
                      src="https://images.unsplash.com/photo-1610375461246-83df859d849d?w=400&auto=format&fit=crop&q=80"
                      alt="الذهب"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-amber-500 text-[10px] font-bold text-black">
                      قمة قياسية
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-amber-300">
                    أونصة الذهب تكسر حاجز 2,850$ عالمياً وسط تدفقات الصناديق السيادية
                  </h4>
                </Link>

                <Link
                  href="/economy"
                  className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-amber-400/60 transition-all"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-amber-950">
                    <img
                      src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&auto=format&fit=crop&q=80"
                      alt="العملات"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-emerald-600 text-[10px] font-bold text-white">
                      الصرف
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-amber-300">
                    استقرار الدولار والدينار أمام الشيكل في تعاملات السوق الفلسطيني
                  </h4>
                </Link>

                <Link
                  href="/economy/instrument/BRENT"
                  className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-amber-400/60 transition-all"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-amber-950">
                    <img
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=80"
                      alt="النفط"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-blue-600 text-[10px] font-bold text-white">
                      الطاقة
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-amber-300">
                    برنت يتذبذب عند مستويات 76 دولاراً للبرميل مع ترقب قرارات أوبك+
                  </h4>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* 5. لوحة الصحافة الرقمية المنسدلة العملاقة */}
        {activeMega === "digital" && (
          <div
            onMouseLeave={() => setActiveMega(null)}
            className="absolute top-full inset-x-0 mx-auto max-w-5xl z-50 mt-1 rounded-3xl border-2 border-[var(--gold)]/50 bg-gradient-to-b from-[#1a0108]/98 via-[#120005]/95 to-[#080002]/98 backdrop-blur-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="grid grid-cols-12 gap-6 items-start text-white">
              <div className="col-span-4 space-y-3 border-e border-white/10 pe-4">
                <span className="text-[11px] font-black text-[var(--gold)] uppercase tracking-wider block">
                  مختبرات الابتكار الرقمي 2026
                </span>
                <ul className="space-y-2 text-xs font-bold">
                  <li>
                    <Link
                      href="/fact-check"
                      className="p-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2.5 text-rose-300 hover:text-white"
                    >
                      <ShieldCheck className="w-4 h-4 text-rose-400" />
                      <span>رادار الحقيقة ومكافحة التضليل</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ask"
                      className="p-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2.5 text-amber-300 hover:text-white"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>اسأل الوطن (الأرشيف الذكي)</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/videos"
                      className="p-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2.5 text-blue-300 hover:text-white"
                    >
                      <Film className="w-4 h-4 text-blue-400" />
                      <span>استوديو فيديو 4K السينمائي</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/podcast"
                      className="p-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2.5 text-emerald-300 hover:text-white"
                    >
                      <Headphones className="w-4 h-4 text-emerald-400" />
                      <span>استوديو البودكاست والموجز</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/games"
                      className="p-2.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2.5 text-purple-300 hover:text-white"
                    >
                      <Gamepad2 className="w-4 h-4 text-purple-400" />
                      <span>تحدي الذاكرة الوطنية والتراث</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-8 grid grid-cols-2 gap-4">
                <Link
                  href="/fact-check"
                  className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-rose-400/60 transition-all"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-stone-900">
                    <img
                      src="https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&auto=format&fit=crop&q=80"
                      alt="فحص الحقائق"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-rose-600 text-[10px] font-bold text-white">
                      فحص جنائي
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-rose-300">
                    سلايدر مقارنة الصور الجنائي ومختبر OSINT للتحقق من الشائعات الميدانية
                  </h4>
                </Link>

                <Link
                  href="/ask"
                  className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-[var(--gold)]/60 transition-all"
                >
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-stone-900">
                    <img
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80"
                      alt="ذكاء اصطناعي"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-[var(--gold)] text-[10px] font-bold text-black">
                      AI Newsroom
                    </span>
                  </div>
                  <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-[var(--gold)]">
                    محطة الاستقصاء الذكية والبحث في ملايين الوثائق الصحفية المؤرشفة
                  </h4>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. قائمة الهواتف الذكية المنزلقة (Mobile Navigation Overlay) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[var(--surface)] p-5 space-y-5 animate-in slide-in-from-top-4 duration-300 shadow-2xl">
          <SearchTrigger />

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <Link
              href="/palestine"
              className="p-3 rounded-xl bg-[#0E472A]/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>فلسطين والميدان</span>
            </Link>

            <Link
              href="/sports"
              className="p-3 rounded-xl bg-emerald-700/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-emerald-500" />
              <span>يلا سبورت</span>
            </Link>

            <Link
              href="/economy"
              className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>المال والأعمال</span>
            </Link>

            <Link
              href="/aid"
              className="p-3 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)] flex items-center gap-2 text-[var(--text)]"
            >
              <HeartHandshake className="w-4 h-4 text-amber-500" />
              <span>المساعدات</span>
            </Link>

            <Link
              href="/fact-check"
              className="p-3 rounded-xl bg-rose-600/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-rose-500" />
              <span>رادار الحقيقة</span>
            </Link>

            <Link
              href="/ask"
              className="p-3 rounded-xl bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>اسأل الوطن AI</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
            <Link href="/admin" className="font-bold text-[var(--gold)] hover:underline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>كابينة الإدارة التحريرية</span>
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LowBandwidthToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
