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
  Search,
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
      setScrolled(window.scrollY > 40);
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
    <header className="sticky top-0 z-40 transition-all duration-300 shadow-md">
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
        <div className="container-custom max-w-7xl mx-auto flex items-center justify-between gap-4 px-4">
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
              <span>الذهب: 2,748$ · دولار/شيكل: 3.72</span>
            </Link>

            <span className="hidden md:inline text-white/20">|</span>

            <LowBandwidthToggle />
            <ThemeToggle />

            {/* النسخة الإنجليزية */}
            <Link
              href="/en"
              className="px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-black text-white hover:text-[var(--gold)] transition-colors flex items-center gap-1"
              title="English Edition"
            >
              <Globe2 className="w-2.5 h-2.5" />
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
      <div className="border-b border-[var(--border)] bg-[var(--surface-header)]/95 backdrop-blur-2xl transition-all relative">
        <div className="container-custom max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 py-2.5">
          {/* الشعار الملكي */}
          <div className="shrink-0">
            <BrandLogo variant="header" />
          </div>

          {/* شريط الأقسام التحريرية المركزي المريح للعين مع القوائم المنسدلة */}
          <nav
            ref={navRef}
            className="hidden lg:flex items-center gap-1 text-xs font-bold text-[var(--text)] relative"
          >
            {/* الرئيسية */}
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all font-black ${
                pathname === "/"
                  ? "bg-[var(--maroon)] text-[var(--gold)] shadow-xs"
                  : "hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              الرئيسية
            </Link>

            {/* 1. قائمة فلسطين والميدان المنسدلة العملاقة */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleMega("palestine")}
                onMouseEnter={() => setActiveMega("palestine")}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 font-black cursor-pointer ${
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
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleMega("world")}
                onMouseEnter={() => setActiveMega("world")}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 font-bold cursor-pointer ${
                  pathname === "/arab-world" || pathname === "/world" || activeMega === "world"
                    ? "bg-[var(--maroon)] text-[var(--gold)] shadow-xs"
                    : "hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <span>شؤون عربية ودولية</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMega === "world" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* 3. قائمة يلا سبورت والملاعب المنسدلة العملاقة */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleMega("sports")}
                onMouseEnter={() => setActiveMega("sports")}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 font-black cursor-pointer ${
                  pathname === "/sports" || activeMega === "sports"
                    ? "bg-emerald-700 text-white border border-emerald-400/40 shadow-xs"
                    : "hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-emerald-500" />
                <span>يلا سبورت</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMega === "sports" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* 4. قائمة الاقتصاد والأسواق المنسدلة العملاقة */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleMega("economy")}
                onMouseEnter={() => setActiveMega("economy")}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 font-bold cursor-pointer ${
                  pathname === "/economy" || activeMega === "economy"
                    ? "bg-[var(--maroon)] text-[var(--gold)] shadow-xs"
                    : "hover:bg-amber-500/10 text-amber-700 dark:text-amber-400"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>المال والأعمال</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMega === "economy" ? "rotate-180" : ""}`} />
              </button>
            </div>

            <Link
              href="/aid"
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                pathname === "/aid"
                  ? "bg-[var(--maroon)] text-[var(--gold)] shadow-xs"
                  : "hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold"
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-amber-500" />
              <span>المساعدات</span>
            </Link>

            <Link
              href="/videos"
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                pathname === "/videos"
                  ? "bg-[var(--maroon)] text-[var(--gold)] shadow-xs"
                  : "hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text)] font-semibold"
              }`}
            >
              <Film className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span>فيديو</span>
            </Link>

            {/* 5. قائمة المنصات الرقمية ورادار الحقيقة المنسدلة */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleMega("digital")}
                onMouseEnter={() => setActiveMega("digital")}
                className={`px-3 py-1.5 rounded-xl border border-[var(--gold)]/40 bg-gradient-to-r from-[#26000A] to-[#3D0010] text-[var(--gold)] text-xs font-black flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                  activeMega === "digital" ? "ring-2 ring-[var(--gold)]" : "hover:border-[var(--gold)]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>الصحافة الرقمية</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMega === "digital" ? "rotate-180" : ""}`} />
              </button>
            </div>

            {/* لوحات الميجا منيو الفخمة المنسدلة بكامل بياناتها الأصلية دون أي مساس */}

            {/* 1. لوحة فلسطين والميدان المنسدلة */}
            {activeMega === "palestine" && (
              <div
                onMouseLeave={() => setActiveMega(null)}
                className="absolute top-full start-0 end-0 mt-2 z-50 rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-b from-[#072415]/98 via-[#0A160F]/95 to-[#050D09]/98 backdrop-blur-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
                style={{ width: "880px", maxWidth: "90vw" }}
              >
                <div className="grid grid-cols-12 gap-6 items-start text-white">
                  <div className="col-span-3 space-y-3 border-e border-white/10 pe-4">
                    <span className="text-[11px] font-black text-emerald-400 uppercase tracking-wider block">
                      غرف الميدان 24/7
                    </span>
                    <ul className="space-y-1.5 text-xs font-semibold">
                      <li>
                        <Link href="/palestine/gaza" className="block p-2 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-between">
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
                        <Link href="/atlas" className="block p-2 rounded-xl hover:bg-white/10 text-emerald-300 font-bold flex items-center gap-1.5">
                          <Map className="w-3.5 h-3.5" />
                          <span>أطلس فلسطين التاريخي</span>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="col-span-9 grid grid-cols-3 gap-4">
                    <Link href="/palestine/gaza" className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-emerald-400/60 transition-all">
                      <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-emerald-950">
                        <img src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&auto=format&fit=crop&q=80" alt="غزة" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-red-600 text-[10px] font-bold text-white">عاجل</span>
                      </div>
                      <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-emerald-300">
                        المستشفيات الميدانية تواصل العمل تحت القصف وتنسيق مستمر لدخول الوقود
                      </h4>
                    </Link>

                    <Link href="/palestine/jerusalem" className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-emerald-400/60 transition-all">
                      <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-emerald-950">
                        <img src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=400&auto=format&fit=crop&q=80" alt="القدس" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-emerald-600 text-[10px] font-bold text-white">القدس</span>
                      </div>
                      <h4 className="text-xs font-bold leading-snug line-clamp-2 text-white group-hover:text-emerald-300">
                        رباط أهالي القدس وتوافد المصلين إلى المسجد الأقصى المبارك
                      </h4>
                    </Link>

                    <Link href="/atlas" className="group rounded-2xl bg-white/5 border border-white/10 p-3 hover:border-emerald-400/60 transition-all">
                      <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-emerald-950">
                        <img src="https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=400&auto=format&fit=crop&q=80" alt="أطلس" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <span className="absolute top-2 start-2 px-2 py-0.5 rounded bg-[var(--gold)] text-[10px] font-bold text-black">أطلس تفاعلي</span>
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
                className="absolute top-full start-0 end-0 mt-2 z-50 rounded-3xl border-2 border-white/15 bg-gradient-to-b from-[#1C0008]/98 via-[#120005]/95 to-[#0A0003]/98 backdrop-blur-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
                style={{ width: "880px", maxWidth: "90vw" }}
              >
                <div className="grid grid-cols-12 gap-6 items-start text-white">
                  <div className="col-span-3 space-y-3 border-e border-white/10 pe-4">
                    <span className="text-[11px] font-black text-[var(--gold)] uppercase tracking-wider block">
                      التغطيات الإقليمية
                    </span>
                    <ul className="space-y-1.5 text-xs font-semibold">
                      <li><Link href="/arab-world" className="block p-2 rounded-xl hover:bg-white/10">العالم العربي والشرق الأوسط</Link></li>
                      <li><Link href="/world" className="block p-2 rounded-xl hover:bg-white/10">الشؤون الدولية والأمم المتحدة</Link></li>
                      <li><Link href="/editorial-policy" className="block p-2 rounded-xl hover:bg-white/10 text-white/60">ميثاق التغطية الدولية</Link></li>
                    </ul>
                  </div>

                  <div className="col-span-9 grid grid-cols-3 gap-4">
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-3 space-y-2">
                      <span className="text-[10px] font-bold text-amber-400">لاهاي · محكمة العدل الدولية</span>
                      <h4 className="text-xs font-bold leading-snug">جلسات الاستماع والتدابير الاحترازية وقرارات الشرعية الدولية</h4>
                      <span className="text-[10px] text-white/50 block">متابعة دبلوماسية مستمرة</span>
                    </div>
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-3 space-y-2">
                      <span className="text-[10px] font-bold text-cyan-400">نيويورك · مجلس الأمن</span>
                      <h4 className="text-xs font-bold leading-snug">مداولات مغلقة ومشاريع قرارات لوقف إطلاق النار وتسهيل المساعدات</h4>
                      <span className="text-[10px] text-white/50 block">مراسلو المنظمة في الأمم المتحدة</span>
                    </div>
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-3 space-y-2">
                      <span className="text-[10px] font-bold text-rose-400">العواصم العربية</span>
                      <h4 className="text-xs font-bold leading-snug">حراك الوساطة في القاهرة وعمان والدوحة لدعم صمود الشعب الفلسطيني</h4>
                      <span className="text-[10px] text-white/50 block">تغطية خاصة</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. لوحة يلا سبورت والملاعب المنسدلة */}
            {activeMega === "sports" && (
              <div
                onMouseLeave={() => setActiveMega(null)}
                className="absolute top-full start-0 end-0 mt-2 z-50 rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-b from-[#082214]/98 via-[#06180E]/95 to-[#041009]/98 backdrop-blur-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
                style={{ width: "880px", maxWidth: "90vw" }}
              >
                <div className="grid grid-cols-12 gap-6 items-start text-white">
                  <div className="col-span-4 space-y-3 border-e border-white/10 pe-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black">⚽</div>
                      <div>
                        <span className="text-xs font-black text-emerald-400 block">يلا سبورت (YallaSport)</span>
                        <span className="text-[10px] text-white/60">بث ونتائج المباريات الحية</span>
                      </div>
                    </div>
                    <ul className="space-y-1.5 text-xs font-semibold pt-2">
                      <li><Link href="/sports" className="block p-2 rounded-xl hover:bg-white/10 flex items-center justify-between"><span>مباريات اليوم المباشرة</span><span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /></Link></li>
                      <li><Link href="/sports" className="block p-2 rounded-xl hover:bg-white/10">دوري أبطال أوروبا</Link></li>
                      <li><Link href="/sports" className="block p-2 rounded-xl hover:bg-white/10">الدوريات الأوروبية الخمسة الكبرى</Link></li>
                      <li><Link href="/sports" className="block p-2 rounded-xl hover:bg-white/10">المنتخب الفدائي الفلسطيني</Link></li>
                    </ul>
                  </div>

                  <div className="col-span-8 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider block">قمة اليوم المرتقبة</span>
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>ريال مدريد</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs">22:00</span>
                        <span>مانشستر سيتي</span>
                      </div>
                      <span className="text-[10px] text-white/60 block text-center">دوري أبطال أوروبا · ذهاب ربع النهائي</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                      <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider block">الفدائي الفلسطيني</span>
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>فلسطين</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs">مباشر</span>
                        <span>أستراليا</span>
                      </div>
                      <span className="text-[10px] text-white/60 block text-center">تصفيات كأس العالم 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. لوحة الاقتصاد والأسواق المنسدلة */}
            {activeMega === "economy" && (
              <div
                onMouseLeave={() => setActiveMega(null)}
                className="absolute top-full start-0 end-0 mt-2 z-50 rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-[#1C1400]/98 via-[#120D00]/95 to-[#0A0700]/98 backdrop-blur-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
                style={{ width: "880px", maxWidth: "90vw" }}
              >
                <div className="grid grid-cols-12 gap-6 items-start text-white">
                  <div className="col-span-4 space-y-3 border-e border-white/10 pe-4">
                    <div className="flex items-center gap-2">
                      <Coins className="w-5 h-5 text-[var(--gold)]" />
                      <span className="text-xs font-black text-[var(--gold)]">بورصة المال والذهب اللحظية</span>
                    </div>
                    <ul className="space-y-1 text-xs font-semibold pt-1">
                      <li><Link href="/economy" className="block p-2 rounded-xl hover:bg-white/10">أسعار الذهب والمعادن الثمينة</Link></li>
                      <li><Link href="/economy" className="block p-2 rounded-xl hover:bg-white/10">سعر الدولار والدينار مقابل الشيكل</Link></li>
                      <li><Link href="/economy" className="block p-2 rounded-xl hover:bg-white/10">مؤشرات الأسواق والنفط الخام</Link></li>
                    </ul>
                  </div>

                  <div className="col-span-8 grid grid-cols-3 gap-3 text-center">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[10px] text-white/50 block">الذهب (أونصة)</span>
                      <span className="text-lg font-black text-[var(--gold)] font-mono">$2,748.50</span>
                      <span className="text-[10px] text-emerald-400 font-bold block">+0.85% ↑</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[10px] text-white/50 block">دولار / شيكل</span>
                      <span className="text-lg font-black text-white font-mono">₪3.725</span>
                      <span className="text-[10px] text-rose-400 font-bold block">-0.15% ↓</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[10px] text-white/50 block">دينار أردني / شيكل</span>
                      <span className="text-lg font-black text-white font-mono">₪5.250</span>
                      <span className="text-[10px] text-emerald-400 font-bold block">مستقر ↔</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. لوحة الصحافة الرقمية والذكاء التحريري المنسدلة */}
            {activeMega === "digital" && (
              <div
                onMouseLeave={() => setActiveMega(null)}
                className="absolute top-full start-0 end-0 mt-2 z-50 rounded-3xl border-2 border-[var(--gold)]/40 bg-gradient-to-b from-[#180008]/98 via-[#0F0005]/95 to-[#080002]/98 backdrop-blur-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
                style={{ width: "880px", maxWidth: "90vw" }}
              >
                <div className="grid grid-cols-3 gap-4 text-white">
                  <Link href="/fact-check" className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 hover:border-rose-500 transition-all space-y-2 group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-rose-400">رادار الحقيقة ومكافحة التضليل</span>
                      <ShieldCheck className="w-4 h-4 text-rose-400" />
                    </div>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      سلايدر الفحص الجنائي، كشف الشائعات، والتحقق من الصور المولدة بالذكاء الاصطناعي.
                    </p>
                  </Link>

                  <Link href="/ask" className="p-4 rounded-2xl bg-white/5 border border-[var(--gold)]/30 hover:border-[var(--gold)] transition-all space-y-2 group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-[var(--gold)]">اسأل الوطن · الأرشيف الذكي</span>
                      <Bot className="w-4 h-4 text-[var(--gold)]" />
                    </div>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      استقصاء الأرشيف الصحفي بالذكاء التحريري مع إسناد فوري للوثائق والتقارير.
                    </p>
                  </Link>

                  <Link href="/videos" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all space-y-2 group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white">الصحافة المرئية وفيديو الوطن</span>
                      <Film className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      استوديو المشاهدة السينمائي 4K، وفصول الفيديو التفاعلية، وتغطيات الميدان.
                    </p>
                  </Link>

                  <Link href="/podcast" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all space-y-2 group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white">استوديو البودكاست والموجز</span>
                      <Headphones className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      محلل الترددات الصوتية الحي، وتتبع النص الحواري التفاعلي كلمة بكلمة.
                    </p>
                  </Link>

                  <Link href="/stories" className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all space-y-2 group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white">تجمعات القصص والخط الزمني</span>
                      <Layers className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      الخط الزمني المتفرع متعدد الوكالات، وموجزات القصص البصرية السريعة (Reels).
                    </p>
                  </Link>

                  <Link href="/games" className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 hover:border-amber-500 transition-all space-y-2 group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-400">تحدي الذاكرة الوطنية</span>
                      <Trophy className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                      مسابقة تاريخية تفاعلية للقرى والمعالم، والحصول على وسام حارس الذاكرة.
                    </p>
                  </Link>
                </div>
              </div>
            )}
          </nav>

          {/* شريط الأدوات الذكي الأيسر (The Smart Utility Dock) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* زر البحث الفاخر المصغر */}
            <div className="hidden sm:block">
              <SearchTrigger />
            </div>

            {/* زر البث المباشر المضيء */}
            <Link
              href="/live"
              className="px-3 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-[11px] font-black flex items-center gap-1.5 shadow-md transition-transform active:scale-95"
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

          {/* بوابة الإدارة للمحررين في قائمة الهواتف */}
          <div className="pt-2 border-t border-[var(--border)]">
            <Link
              href="/admin"
              className="w-full p-3 rounded-2xl bg-gradient-to-r from-[var(--maroon)] to-[#200008] text-[var(--gold)] border border-[var(--gold)]/30 font-black text-xs flex items-center justify-between shadow-md"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
                <span>غرفة الأخبار ولوحة الإدارة (Admin Portal)</span>
              </div>
              <ChevronLeft className="w-4 h-4 text-[var(--gold)]" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
