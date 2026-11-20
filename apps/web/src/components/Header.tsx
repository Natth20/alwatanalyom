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
import { NotificationCenter } from "@/components/NotificationCenter";
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
  ExternalLink,
  ChevronLeft,
  Trophy,
  ArrowRight,
  Eye,
  Clock,
  Coins,
} from "lucide-react";

type ActiveMegaMenu = "palestine" | "world" | "sports" | "economy" | "digital" | null;

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<ActiveMegaMenu>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 45);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // إغلاق الميجا منيو عند النقر خارجها أو تغيير المسار
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
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
    <header className="border-b border-[var(--border)] bg-[var(--surface-header)] backdrop-blur-2xl sticky top-0 z-40 transition-colors shadow-lg relative imperial-gold-top">
      {/* 0. زر التخطي للمحتوى الرئيسي لتعزيز إمكانية الوصول */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--gold)] focus:text-[#140005] focus:font-black focus:text-xs focus:rounded-xl focus:shadow-xl focus:outline-none"
      >
        تخطي إلى المحتوى الرئيسي
      </a>

      {/* 1. الشريط العلوي الرئاسي (Tier 1: The Imperial Utility Bar) */}
      <div
        className={`border-b border-black/10 dark:border-white/5 bg-gradient-to-r from-[#200008] via-[#35000e] to-[#200008] text-white/90 text-xs transition-all duration-300 ease-in-out ${
          scrolled ? "max-h-0 opacity-0 overflow-hidden py-0 border-none" : "max-h-16 opacity-100 py-1.5"
        }`}
      >
        <div className="container-custom flex flex-wrap items-center justify-between gap-3">
          {/* معلومات التوقيت ومواقيت القدس وغزة والطقس اللحظي */}
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
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white border border-white/20 transition-all"
            >
              <Coins className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>الذهب: 2,748$ ↑ · دولار/شيكل: 3.72</span>
            </Link>

            {/* زر البث المباشر المضيء */}
            <Link
              href="/live"
              className="px-3 py-1 rounded-full bg-red-600 hover:bg-red-700 text-white text-[11px] font-black flex items-center gap-1.5 shadow-md transition-transform active:scale-95 animate-pulse"
            >
              <span className="w-2 h-2 rounded-full bg-white inline-block" />
              <span>البث الحي</span>
            </Link>

            <span className="text-white/20">|</span>

            <LowBandwidthToggle />
            <ThemeToggle />

            {/* النسخة الإنجليزية */}
            <Link
              href="/en"
              className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-black text-white hover:text-[var(--gold)] transition-colors flex items-center gap-1"
              title="English Edition"
            >
              <Globe2 className="w-3 h-3" />
              <span>EN</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. الترويسة الرئيسية بهوية الوطن اليوم الملكية (Tier 2: The Royal Masthead) */}
      <div
        className={`container-custom flex items-center justify-between gap-4 border-b border-[var(--border)] transition-all duration-300 ease-in-out ${
          scrolled ? "py-2" : "py-3.5"
        }`}
      >
        {/* الشعار الملكي ثلاثي الأبعاد المعتمد */}
        <BrandLogo variant="header" />

        {/* حقل البحث الذكي المركزي للشاشات الكبيرة */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <SearchTrigger />
        </div>

        {/* الإجراءات السريعة: رادار الحقيقة، اسأل الوطن، والنشرة */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/ask"
            className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)] text-xs font-black text-[var(--text)] transition-all shadow-2xs"
          >
            <Bot className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>اسأل الوطن</span>
          </Link>

          <Link
            href="/fact-check"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-red-500/30 bg-red-500/5 hover:bg-red-500/10 text-xs font-black text-red-600 dark:text-red-400 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>رادار الحقيقة</span>
          </Link>

          <NotificationCenter />
          <SavedCounterBadge />

          <Link
            href="/newsletter"
            className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#590018] via-[#730020] to-[#590018] text-[var(--gold)] border border-[var(--gold)]/40 text-xs font-black hover:shadow-lg transition-all active:scale-95 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span className="text-white">النشرة</span>
          </Link>

          {/* زر فتح القائمة للشاشات الصغيرة */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--gold)] transition-colors cursor-pointer"
            aria-label="تبديل القائمة"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. شريط الأقسام التحريرية الماسي مع القوائم المنسدلة العملاقة (Tier 3: The Imperial Mega-Nav) */}
      <nav ref={navRef} className="container-custom relative hidden lg:block py-1 text-xs font-bold text-[var(--text)]">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            {/* زر الرئيسية */}
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all font-black ${
                pathname === "/"
                  ? "bg-[#590018] text-[var(--gold)] border border-[var(--gold)]/40 shadow-xs"
                  : "hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              الرئيسية
            </Link>

            {/* 1. قائمة فلسطين والميدان المنسدلة العملاقة */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => toggleMega("palestine")}
                onMouseEnter={() => setActiveMega("palestine")}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 font-black cursor-pointer ${
                  pathname.startsWith("/palestine") || activeMega === "palestine"
                    ? "bg-[#0E472A] text-white border border-emerald-400/40 shadow-xs"
                    : "hover:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>فلسطين والميدان</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMega === "palestine" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* 2. قائمة العالم العربي ودولياً المنسدلة */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => toggleMega("world")}
                onMouseEnter={() => setActiveMega("world")}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 font-bold cursor-pointer ${
                  pathname === "/arab-world" || pathname === "/world" || activeMega === "world"
                    ? "bg-[#590018] text-[var(--gold)] border border-[var(--gold)]/40 shadow-xs"
                    : "hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <span>شؤون عربية ودولية</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMega === "world" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* 3. قائمة يلا سبورت والملاعب المنسدلة العملاقة */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => toggleMega("sports")}
                onMouseEnter={() => setActiveMega("sports")}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 font-black cursor-pointer ${
                  pathname === "/sports" || activeMega === "sports"
                    ? "bg-emerald-700 text-white border border-emerald-400/40 shadow-xs"
                    : "hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-emerald-500" />
                <span>يلا سبورت والملاعب</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMega === "sports" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* 4. قائمة الاقتصاد والأسواق المنسدلة العملاقة */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => toggleMega("economy")}
                onMouseEnter={() => setActiveMega("economy")}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 font-bold cursor-pointer ${
                  pathname === "/economy" || activeMega === "economy"
                    ? "bg-[#590018] text-[var(--gold)] border border-[var(--gold)]/40 shadow-xs"
                    : "hover:bg-amber-500/10 text-amber-700 dark:text-amber-400"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>المال والأعمال</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMega === "economy" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* روابط سريعة مباشرة */}
            <Link
              href="/aid"
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                pathname === "/aid"
                  ? "bg-[#590018] text-[var(--gold)] border border-[var(--gold)]/40 shadow-xs"
                  : "hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold"
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-amber-500" />
              <span>المساعدات</span>
            </Link>

            <Link
              href="/jobs"
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                pathname === "/jobs"
                  ? "bg-[#590018] text-[var(--gold)] border border-[var(--gold)]/40 shadow-xs"
                  : "hover:bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-sky-500" />
              <span>الوظائف</span>
            </Link>

            <Link
              href="/tech"
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                pathname === "/tech"
                  ? "bg-[#590018] text-[var(--gold)] border border-[var(--gold)]/40 shadow-xs"
                  : "hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text)] font-semibold"
              }`}
            >
              التقنية
            </Link>

            <Link
              href="/videos"
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                pathname === "/videos"
                  ? "bg-[#590018] text-[var(--gold)] border border-[var(--gold)]/40 shadow-xs"
                  : "hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text)] font-semibold"
              }`}
            >
              <Film className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span>فيديو</span>
            </Link>
          </div>

          {/* 5. قائمة المنصات الرقمية ورادار الحقيقة المنسدلة */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMega("digital")}
              onMouseEnter={() => setActiveMega("digital")}
              className={`px-3.5 py-1.5 rounded-xl border border-[var(--gold)]/30 bg-gradient-to-r from-[#26000A] to-[#3D0010] text-[var(--gold)] text-xs font-black flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                activeMega === "digital" ? "ring-2 ring-[var(--gold)]" : "hover:border-[var(--gold)]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>الصحافة الرقمية</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMega === "digital" ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* لوحات الميجا منيو الفخمة المنسدلة (The Grand Floating Mega-Panels) */}

        {/* 1. لوحة فلسطين والميدان المنسدلة */}
        {activeMega === "palestine" && (
          <div
            onMouseLeave={() => setActiveMega(null)}
            className="absolute top-full start-0 end-0 mt-1 z-50 rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-b from-[#072415]/98 via-[#0A160F]/95 to-[#050D09]/98 backdrop-blur-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="grid grid-cols-12 gap-6 items-start text-white">
              {/* العمود الأول: روابط غرف العمليات الميدانية */}
              <div className="col-span-3 space-y-2 border-e border-white/10 pe-4">
                <span className="text-[11px] font-black text-emerald-400 block mb-2 uppercase tracking-wider">
                  غرف المتابعة الميدانية
                </span>
                <Link
                  href="/palestine/gaza"
                  className="p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between transition-colors group block"
                >
                  <span className="font-bold text-sm text-stone-100 group-hover:text-emerald-300">غزة الميدان والتوثيق</span>
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                </Link>
                <Link
                  href="/palestine/jerusalem"
                  className="p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between transition-colors group block"
                >
                  <span className="font-bold text-sm text-stone-100 group-hover:text-emerald-300">القدس والمسجد الأقصى</span>
                  <ChevronLeft className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="/palestine/west-bank"
                  className="p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between transition-colors group block"
                >
                  <span className="font-bold text-sm text-stone-100 group-hover:text-emerald-300">الضفة الغربية والمخيمات</span>
                  <ChevronLeft className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="/palestine"
                  className="pt-2 text-xs font-black text-[var(--gold)] hover:underline inline-flex items-center gap-1 block"
                >
                  <span>كافة تقارير فلسطين أولاً ←</span>
                </Link>
              </div>

              {/* العمود الثاني: خبران بارزان بصور ميدانية */}
              <div className="col-span-6 grid grid-cols-2 gap-4 border-e border-white/10 pe-4">
                <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden group hover:border-emerald-400/50 transition-all">
                  <div className="relative aspect-16/10 bg-stone-900 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=600&q=80"
                      alt="القدس"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 start-2 bg-[#0E472A] text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                      القدس الشريف
                    </span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-black text-xs text-stone-100 line-clamp-2 group-hover:text-emerald-300 leading-snug">
                      <Link href="/palestine/jerusalem">
                        حراك شعبي ودعوات للرباط في باحات المسجد الأقصى المبارك
                      </Link>
                    </h4>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden group hover:border-emerald-400/50 transition-all">
                  <div className="relative aspect-16/10 bg-stone-900 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=600&q=80"
                      alt="غزة"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 start-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md animate-pulse">
                      عاجل غزة
                    </span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-black text-xs text-stone-100 line-clamp-2 group-hover:text-emerald-300 leading-snug">
                      <Link href="/palestine/gaza">
                        تقارير المشافي الميدانية وتحذيرات من تفاقم الوضع الإنساني بشمال القطاع
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>

              {/* العمود الثالث: بطاقة أطلس فلسطين الجغرافي */}
              <div className="col-span-3 space-y-3">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-black/60 border border-emerald-500/30">
                  <div className="flex items-center gap-2 text-emerald-400 font-black text-xs mb-1">
                    <Map className="w-4 h-4" />
                    <span>أطلس فلسطين التفاعلي</span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed mb-3">
                    خريطة الجغرافيا الوطنية الموثقة لكافة المدن والقرى والبلدات والمخيمات الصامدة.
                  </p>
                  <Link
                    href="/atlas"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-colors"
                  >
                    <span>فتح الأطلس الرقمي</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. لوحة شؤون عربية ودولية المنسدلة */}
        {activeMega === "world" && (
          <div
            onMouseLeave={() => setActiveMega(null)}
            className="absolute top-full start-0 end-0 mt-1 z-50 rounded-3xl border-2 border-[var(--gold)]/40 bg-gradient-to-b from-[#26000A]/98 via-[#1C0007]/95 to-[#120004]/98 backdrop-blur-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="grid grid-cols-12 gap-6 items-start text-white">
              <div className="col-span-3 space-y-2 border-e border-white/10 pe-4">
                <span className="text-[11px] font-black text-[var(--gold)] block mb-2 uppercase tracking-wider">
                  العواصم والملفات الساخنة
                </span>
                <Link href="/arab-world" className="p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between font-bold text-sm text-stone-100 hover:text-[var(--gold)] transition-colors block">
                  <span>الخليج العربي والشرق الأوسط</span>
                  <ChevronLeft className="w-4 h-4" />
                </Link>
                <Link href="/arab-world" className="p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between font-bold text-sm text-stone-100 hover:text-[var(--gold)] transition-colors block">
                  <span>مصر وشمال إفريقيا</span>
                  <ChevronLeft className="w-4 h-4" />
                </Link>
                <Link href="/world" className="p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between font-bold text-sm text-stone-100 hover:text-[var(--gold)] transition-colors block">
                  <span>واشنطن والسياسة الأمريكية</span>
                  <ChevronLeft className="w-4 h-4" />
                </Link>
                <Link href="/world" className="p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between font-bold text-sm text-stone-100 hover:text-[var(--gold)] transition-colors block">
                  <span>الشؤون الدولية والأمم المتحدة</span>
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              </div>

              <div className="col-span-9 grid grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden group hover:border-[var(--gold)]/50 transition-all">
                  <div className="relative aspect-16/10 bg-stone-900 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80"
                      alt="دبلوماسية"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-bold text-[var(--gold)] block mb-1">الشؤون الدولية</span>
                    <h4 className="font-bold text-xs text-stone-100 line-clamp-2 group-hover:text-[var(--gold)] leading-snug">
                      حراك دبلوماسي في مجلس الأمن لبحث التطورات في المنطقة
                    </h4>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden group hover:border-[var(--gold)]/50 transition-all">
                  <div className="relative aspect-16/10 bg-stone-900 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80"
                      alt="الخليج"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-bold text-[var(--gold)] block mb-1">الخليج العربي</span>
                    <h4 className="font-bold text-xs text-stone-100 line-clamp-2 group-hover:text-[var(--gold)] leading-snug">
                      قمم اقتصادية ومشاريع تنموية كبرى في العواصم الخليجية
                    </h4>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden group hover:border-[var(--gold)]/50 transition-all">
                  <div className="relative aspect-16/10 bg-stone-900 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=600&q=80"
                      alt="القاهرة"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-bold text-[var(--gold)] block mb-1">العالم العربي</span>
                    <h4 className="font-bold text-xs text-stone-100 line-clamp-2 group-hover:text-[var(--gold)] leading-snug">
                      مباحثات مستمرة لتسهيل تدفق المساعدات الإغاثية والطبية
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. لوحة يلا سبورت والملاعب المنسدلة العملاقة */}
        {activeMega === "sports" && (
          <div
            onMouseLeave={() => setActiveMega(null)}
            className="absolute top-full start-0 end-0 mt-1 z-50 rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-b from-[#082214]/98 via-[#06180E]/95 to-[#041009]/98 backdrop-blur-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="grid grid-cols-12 gap-6 items-start text-white">
              <div className="col-span-3 space-y-2 border-e border-white/10 pe-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-black text-xs">
                    ⚽
                  </div>
                  <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider">
                    شراكة يلا سبورت الحصرية
                  </span>
                </div>
                <Link href="/sports" className="p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between font-bold text-sm text-stone-100 hover:text-emerald-300 transition-colors block">
                  <span>جدول مباريات اليوم والنتائج</span>
                  <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-black animate-pulse">مباشر</span>
                </Link>
                <Link href="/sports" className="p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between font-bold text-sm text-stone-100 hover:text-emerald-300 transition-colors block">
                  <span>دوري أبطال أوروبا</span>
                  <ChevronLeft className="w-4 h-4" />
                </Link>
                <Link href="/sports" className="p-2.5 rounded-xl hover:bg-white/10 flex items-center justify-between font-bold text-sm text-stone-100 hover:text-emerald-300 transition-colors block">
                  <span>الدوري الإسباني والإنجليزي</span>
                  <ChevronLeft className="w-4 h-4" />
                </Link>
                <a
                  href="https://yallasport.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pt-2 text-xs font-black text-emerald-400 hover:underline inline-flex items-center gap-1.5 block"
                >
                  <span>الانتقال لبث yallasport.com المباشر</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* بطاقة مباراة حية مميزة */}
              <div className="col-span-5 p-4 rounded-2xl bg-black/50 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-bold text-emerald-400">مباراة القمة الليلة · يلا سبورت</span>
                  <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black animate-pulse">الدقيقة 78</span>
                </div>

                <div className="flex items-center justify-between py-2 px-3 bg-white/5 rounded-xl">
                  <div className="text-center">
                    <span className="block font-black text-sm text-white">فلسطين (الفدائي)</span>
                    <span className="text-[10px] text-stone-400">تصفيات المونديال</span>
                  </div>
                  <div className="text-xl font-black text-[var(--gold)] px-3 py-1 bg-black/60 rounded-lg border border-white/10">
                    2 - 1
                  </div>
                  <div className="text-center">
                    <span className="block font-black text-sm text-white">كوريا الجنوبية</span>
                    <span className="text-[10px] text-stone-400">beIN SPORTS 1</span>
                  </div>
                </div>

                <div className="text-center pt-1">
                  <a
                    href="https://yallasport.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:underline"
                  >
                    <span>متابعة تفاصيل الأهداف والإحصائيات على يلا سبورت ↗</span>
                  </a>
                </div>
              </div>

              {/* بطاقة خبر رياضي مصور */}
              <div className="col-span-4 rounded-2xl border border-white/10 bg-black/40 overflow-hidden group hover:border-emerald-400/50 transition-all">
                <div className="relative aspect-16/10 bg-stone-900 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80"
                    alt="ملاعب"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 start-2 bg-emerald-700 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                    الملاعب العالمية
                  </span>
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-xs text-stone-100 line-clamp-2 group-hover:text-emerald-300 leading-snug">
                    <Link href="/sports">
                      تحليل شامل لأداء الأندية الكبرى ومواعيد مواجهات الجولة المقبلة
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. لوحة المال والأعمال المنسدلة العملاقة */}
        {activeMega === "economy" && (
          <div
            onMouseLeave={() => setActiveMega(null)}
            className="absolute top-full start-0 end-0 mt-1 z-50 rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-[#201505]/98 via-[#180F03]/95 to-[#100902]/98 backdrop-blur-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="grid grid-cols-12 gap-6 items-start text-white">
              <div className="col-span-4 space-y-2.5 border-e border-white/10 pe-4">
                <span className="text-[11px] font-black text-amber-400 block mb-2 uppercase tracking-wider">
                  مؤشرات الأسواق والسلع اللحظية
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-stone-400 block">أونصة الذهب</span>
                    <span className="font-black text-sm text-[var(--gold)]">2,748.50 $</span>
                    <span className="text-[10px] text-emerald-400 block font-mono">▲ +1.2%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-stone-400 block">الدولار / شيكل</span>
                    <span className="font-black text-sm text-white">3.72 ₪</span>
                    <span className="text-[10px] text-red-400 block font-mono">▼ -0.3%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-stone-400 block">الدينار الأردني</span>
                    <span className="font-black text-sm text-white">5.25 ₪</span>
                    <span className="text-[10px] text-stone-400 block font-mono">ثابت</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-stone-400 block">خام برنت</span>
                    <span className="font-black text-sm text-white">74.20 $</span>
                    <span className="text-[10px] text-emerald-400 block font-mono">▲ +0.8%</span>
                  </div>
                </div>

                <Link href="/economy" className="text-xs font-black text-amber-400 hover:underline inline-flex items-center gap-1 block pt-1">
                  <span>فتح شاشة البورصة والأسواق الكاملة ←</span>
                </Link>
              </div>

              <div className="col-span-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden group hover:border-amber-400/50 transition-all">
                  <div className="relative aspect-16/10 bg-stone-900 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80"
                      alt="ذهب"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-bold text-amber-400 block mb-1">أسواق المعادن</span>
                    <h4 className="font-bold text-xs text-stone-100 line-clamp-2 group-hover:text-amber-300 leading-snug">
                      <Link href="/economy">
                        مستويات قياسية جديدة للذهب مع إقبال المستثمرين على الملاذات الآمنة
                      </Link>
                    </h4>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden group hover:border-amber-400/50 transition-all">
                  <div className="relative aspect-16/10 bg-stone-900 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80"
                      alt="تداول"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-bold text-amber-400 block mb-1">الصيرفة والمصارف</span>
                    <h4 className="font-bold text-xs text-stone-100 line-clamp-2 group-hover:text-amber-300 leading-snug">
                      <Link href="/economy">
                        قرارات البنوك المركزية بشأن أسعار الفائدة وتأثيرها على حركة السيولة
                      </Link>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. لوحة الصحافة الرقمية والذكاء الاصطناعي المنسدلة */}
        {activeMega === "digital" && (
          <div
            onMouseLeave={() => setActiveMega(null)}
            className="absolute top-full start-0 end-0 mt-1 z-50 rounded-3xl border-2 border-[var(--gold)]/40 bg-gradient-to-b from-[#200008]/98 via-[#150005]/95 to-[#0A0002]/98 backdrop-blur-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="grid grid-cols-4 gap-4 text-white">
              {/* رادار الحقيقة */}
              <Link
                href="/fact-check"
                className="p-4 rounded-2xl bg-white/5 border border-red-500/30 hover:border-red-500 hover:bg-white/10 transition-all group block space-y-2"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center font-black">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-black text-sm text-white group-hover:text-red-400">رادار الحقيقة</h4>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  مرصد التحقق الجنائي ودحض الشائعات والمحتوى المفبرك وتصحيح الأخبار بمصادرها.
                </p>
              </Link>

              {/* اسأل الوطن */}
              <Link
                href="/ask"
                className="p-4 rounded-2xl bg-white/5 border border-[var(--gold)]/30 hover:border-[var(--gold)] hover:bg-white/10 transition-all group block space-y-2"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-[var(--gold)] flex items-center justify-center font-black">
                  <Bot className="w-5 h-5" />
                </div>
                <h4 className="font-black text-sm text-white group-hover:text-[var(--gold)]">اسأل الوطن</h4>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  محرك إجابات ذكي يبحث في أرشيف الأخبار والتحقيقات المعتمدة بالذكاء الاصطناعي.
                </p>
              </Link>

              {/* أطلس فلسطين */}
              <Link
                href="/atlas"
                className="p-4 rounded-2xl bg-white/5 border border-emerald-500/30 hover:border-emerald-500 hover:bg-white/10 transition-all group block space-y-2"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                  <Map className="w-5 h-5" />
                </div>
                <h4 className="font-black text-sm text-white group-hover:text-emerald-400">أطلس فلسطين</h4>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  دليل الجغرافيا والتغطيات الميدانية والقرى والبلدات والمعالم الوطنية الصامدة.
                </p>
              </Link>

              {/* استوديو البودكاست */}
              <Link
                href="/podcast"
                className="p-4 rounded-2xl bg-white/5 border border-indigo-500/30 hover:border-indigo-500 hover:bg-white/10 transition-all group block space-y-2"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-black">
                  <Headphones className="w-5 h-5" />
                </div>
                <h4 className="font-black text-sm text-white group-hover:text-indigo-400">بودكاست الوطن</h4>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  حوارات معمقة، قراءات تحليلية، وإيجازات صوتية يومية لأهم قضايا الساعة.
                </p>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* 4. القائمة المنزلقة للشاشات الصغيرة (Mobile Drawer) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--border)] bg-[var(--surface)] p-5 space-y-5 animate-in slide-in-from-top-4 duration-300 shadow-2xl">
          <SearchTrigger />

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <Link
              href="/palestine"
              className="p-3 rounded-xl bg-[#0E472A]/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>فلسطين أولاً</span>
            </Link>
            <Link
              href="/sports"
              className="p-3 rounded-xl bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-emerald-500" />
              <span>يلا سبورت</span>
            </Link>
            <Link
              href="/economy"
              className="p-3 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span>المال والذهب</span>
            </Link>
            <Link
              href="/videos"
              className="p-3 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20 flex items-center gap-2"
            >
              <Film className="w-4 h-4" />
              <span>فيديو الوطن</span>
            </Link>
            <Link
              href="/aid"
              className="p-3 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 flex items-center gap-2"
            >
              <HeartHandshake className="w-4 h-4 text-amber-500" />
              <span>المساعدات</span>
            </Link>
            <Link
              href="/jobs"
              className="p-3 rounded-xl bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4 text-blue-500" />
              <span>الوظائف</span>
            </Link>
            <Link
              href="/fact-check"
              className="p-3 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>رادار الحقيقة</span>
            </Link>
            <Link
              href="/ask"
              className="p-3 rounded-xl bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/30 flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>اسأل الوطن</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-[var(--border)] space-y-1">
            <span className="text-[11px] font-bold text-[var(--text-muted)] block mb-1">كافة الأقسام التحريرية:</span>
            {SITE_SECTIONS.map((sec) => (
              <Link
                key={sec.slug}
                href={`/${sec.slug}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--surface-hover)] text-xs font-semibold text-[var(--text)]"
              >
                <span>{sec.nameAr}</span>
                <ChevronLeft className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
