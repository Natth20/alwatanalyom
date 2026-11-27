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
import { SavedCounterBadge } from "@/components/SavedCounterBadge";
import {
  ChevronDown,
  Menu,
  X,
  Radio,
  ShieldCheck,
  TrendingUp,
  Trophy,
  Sparkles,
  Bot,
  HeartHandshake,
  Briefcase,
  Coins,
  MapPin,
  Landmark,
  Flame,
  Cpu,
  Globe,
  Compass,
  Headphones,
  History,
  Gamepad2,
  Activity,
  UserCircle2,
  Clock,
  ChevronLeft,
} from "lucide-react";
import type { ArticleCard, InstrumentQuote } from "@awt/shared";
import type { LiveMatchItem } from "@/lib/live-data/sports";
import { resolveEditorialImage } from "@/lib/editorial-images";

type ActiveMegaMenu = "palestine" | "economy" | "sports" | "services" | null;

export function Header() {
  const pathname = usePathname();
  const [activeMega, setActiveMega] = useState<ActiveMegaMenu>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Live telemetry state (real quotes + section headlines + sports)
  const [quotes, setQuotes] = useState<InstrumentQuote[]>([]);
  const [megaArticles, setMegaArticles] = useState<Record<string, ArticleCard[]>>({});
  const [megaMatches, setMegaMatches] = useState<LiveMatchItem[]>([]);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    setActiveMega(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setActiveMega(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load real market prices for the telemetry strip
  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    let active = true;

    const loadQuotes = () => {
      fetch("/api/v1/quotes")
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (active && Array.isArray(data?.quotes)) {
            setQuotes(data.quotes);
          }
        })
        .catch(() => {});
    };

    loadQuotes();
    const interval = setInterval(loadQuotes, 90000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [pathname]);

  // Lazy load real headlines / matches when opening a mega menu
  useEffect(() => {
    if (!activeMega || pathname?.startsWith("/admin")) return;

    if (
      (activeMega === "palestine" || activeMega === "economy" || activeMega === "sports") &&
      !megaArticles[activeMega]
    ) {
      fetch(`/api/v1/search?section=${activeMega}&limit=3`)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (Array.isArray(data?.results)) {
            setMegaArticles((prev) => ({ ...prev, [activeMega]: data.results }));
          }
        })
        .catch(() => {});
    }

    if (activeMega === "sports" && megaMatches.length === 0) {
      fetch("/api/v1/sports")
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (Array.isArray(data?.matches)) {
            setMegaMatches(data.matches.slice(0, 4));
          }
        })
        .catch(() => {});
    }
  }, [activeMega, megaArticles, megaMatches.length, pathname]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const getQuote = (sym: string) => quotes.find((q) => q.symbol === sym);
  const goldQ = getQuote("XAUUSD");
  const usdIlsQ = getQuote("USDILS");
  const brentQ = getQuote("BRENT");
  const btcQ = getQuote("BTCUSD");

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header
      ref={navContainerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 no-print ${
        scrolled
          ? "shadow-[0_14px_45px_-12px_rgba(38,0,10,0.85)] border-b border-[var(--gold)]/45"
          : "border-b border-[var(--gold)]/20"
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. الشريط العلوي السيادي (Live Sovereign Telemetry Bar)                   */}
      {/* ========================================================================= */}
      <div className="bg-[#120005] text-white border-b border-white/10 text-[11px]">
        <div className="container-custom h-10 flex items-center justify-between gap-3">
          {/* اليمين: التاريخ الهجري والميلادي ومواقيت الصلاة الحية */}
          <div className="shrink-0">
            <TopBarInfo />
          </div>

          {/* الوسط: كبسولة المؤشرات المالية الحية */}
          <div className="hidden lg:flex items-center justify-center flex-1 min-w-0 px-2">
            <Link
              href="/economy"
              className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[var(--gold)]/50 text-[11px] font-bold transition-all shadow-inner group"
              title="لوحة الأسواق المالية الحية"
            >
              <Coins className="w-3.5 h-3.5 text-[var(--gold)] group-hover:rotate-12 transition-transform shrink-0" />
              {goldQ?.price ? (
                <>
                  <span className="flex items-center gap-1">
                    <span className="text-stone-400">الذهب:</span>
                    <strong className="text-[var(--gold)] font-mono">
                      ${Number(goldQ.price).toLocaleString("en-US", { maximumFractionDigits: 2 })}
                    </strong>
                  </span>
                  <span className="text-white/20">|</span>
                </>
              ) : (
                <span className="text-stone-400">أسعار الأسواق المباشرة</span>
              )}

              {usdIlsQ?.price && (
                <>
                  <span className="flex items-center gap-1">
                    <span className="text-stone-400">الدولار:</span>
                    <strong className="text-emerald-400 font-mono">
                      {Number(usdIlsQ.price).toFixed(2)} ₪
                    </strong>
                  </span>
                  <span className="text-white/20">|</span>
                </>
              )}

              {brentQ?.price && (
                <>
                  <span className="flex items-center gap-1">
                    <span className="text-stone-400">برنت:</span>
                    <strong className="text-sky-300 font-mono">
                      ${Number(brentQ.price).toFixed(2)}
                    </strong>
                  </span>
                  {btcQ?.price && <span className="text-white/20 hidden xl:inline">|</span>}
                </>
              )}

              {btcQ?.price && (
                <span className="hidden xl:flex items-center gap-1">
                  <span className="text-stone-400">بيتكوين:</span>
                  <strong className="text-amber-300 font-mono">
                    ${Number(btcQ.price).toLocaleString("en-US")}
                  </strong>
                </span>
              )}
            </Link>
          </div>

          {/* اليسار: الطقس الحي + البث المباشر + النسخة الإنجليزية */}
          <div className="flex items-center gap-2 shrink-0">
            <WeatherWidget />
            <Link
              href="/live"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/20 hover:bg-red-600/35 border border-red-500/35 text-red-300 font-black text-[10px] transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>بث مباشر</span>
            </Link>
            <Link
              href="/en"
              className="hidden xl:inline-flex items-center px-2.5 py-1 rounded-full bg-white/[0.05] hover:bg-white/15 border border-white/10 text-stone-200 font-bold text-[10px] transition-colors"
            >
              EN
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. شريط الهوية والبحث والأدوات السريعة (Identity & Actions)              */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-l from-[#36000F] via-[#590018] to-[#26000A] text-white border-b border-[var(--gold)]/20">
        <div
          className={`container-custom flex items-center justify-between gap-4 transition-all duration-300 ${
            scrolled ? "py-2.5" : "py-3.5"
          }`}
        >
          {/* اليمين: الشعار الملكي */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white cursor-pointer"
              aria-label="قائمة الأقسام"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <BrandLogo variant="header" showTagline={!scrolled} />
          </div>

          {/* الوسط: محرك البحث الموثق */}
          <div className="hidden md:flex flex-1 justify-center px-4 max-w-lg">
            <SearchTrigger expanded className="w-full" />
          </div>

          {/* اليسار: أزرار الأدوات المتناسقة (بارتفاع موحد h-9 وتباعد مريح gap-2) */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/fact-check"
              className="hidden xl:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/35 border border-rose-400/35 text-rose-100 text-xs font-bold transition-all"
              title="وحدة التحقق الجنائي من الأخبار والشائعات"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-rose-300" />
              <span>رادار الحقيقة</span>
            </Link>

            <Link
              href="/ask"
              className="hidden lg:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#e0a800] text-[#140106] text-xs font-black hover:brightness-110 transition-all shadow-md shadow-amber-950/30"
              title="المساعد الإخباري والبحثي الذكي"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>اسأل الوطن</span>
            </Link>

            <Link
              href="/my-watan"
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all"
              title="مساحتي الشخصية المخصصة"
            >
              <UserCircle2 className="w-4 h-4 text-[var(--gold)]" />
              <span className="hidden xl:inline">وطني</span>
            </Link>

            <SavedCounterBadge />
            <NotificationCenter />
            <div className="hidden sm:flex items-center gap-1.5">
              <LowBandwidthToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. شريط التنقل العائم للأقسام (Tier 3 Floating Editorial Nav)             */}
      {/* ========================================================================= */}
      <div className="hidden lg:block bg-[#1B0007]/95 backdrop-blur-xl text-white border-b border-white/10 relative">
        <div className="container-custom">
          <nav
            aria-label="التنقل الرئيسي بين الأقسام"
            className="flex items-center justify-between gap-1 h-12"
          >
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <Link
                href="/"
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive("/")
                    ? "bg-[var(--gold)] text-[#140106] font-black shadow-md"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                الرئيسية
              </Link>

              {/* فلسطين أولاً (Mega Menu Trigger) */}
              <button
                type="button"
                onMouseEnter={() => setActiveMega("palestine")}
                onClick={() => setActiveMega(activeMega === "palestine" ? null : "palestine")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive("/palestine") || activeMega === "palestine"
                    ? "bg-emerald-600/25 text-emerald-300 border border-emerald-500/40"
                    : "text-emerald-300 hover:bg-emerald-500/15"
                }`}
              >
                <span>🇵🇸</span>
                <span>فلسطين أولاً</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              <Link
                href="/breaking"
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive("/breaking")
                    ? "bg-red-600 text-white shadow-md"
                    : "text-red-300 hover:bg-red-500/15"
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>عاجل</span>
              </Link>

              <Link
                href="/arab-world"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive("/arab-world")
                    ? "bg-[var(--gold)] text-[#140106] font-black"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                العالم العربي
              </Link>

              <Link
                href="/world"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive("/world")
                    ? "bg-[var(--gold)] text-[#140106] font-black"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                دولياً
              </Link>

              {/* الاقتصاد والذهب (Mega Menu Trigger) */}
              <button
                type="button"
                onMouseEnter={() => setActiveMega("economy")}
                onClick={() => setActiveMega(activeMega === "economy" ? null : "economy")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                  isActive("/economy") || activeMega === "economy"
                    ? "bg-amber-500/25 text-amber-300 border border-amber-500/40"
                    : "text-white/85 hover:text-amber-300 hover:bg-white/10"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>الاقتصاد والذهب</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {/* يلا سبورت (Mega Menu Trigger) */}
              <button
                type="button"
                onMouseEnter={() => setActiveMega("sports")}
                onClick={() => setActiveMega(activeMega === "sports" ? null : "sports")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                  isActive("/sports") || activeMega === "sports"
                    ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40"
                    : "text-white/85 hover:text-emerald-300 hover:bg-white/10"
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                <span>يلا سبورت</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              <Link
                href="/aid"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                  isActive("/aid")
                    ? "bg-[var(--gold)] text-[#140106] font-black"
                    : "text-amber-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                <span>المساعدات</span>
              </Link>

              <Link
                href="/jobs"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                  isActive("/jobs")
                    ? "bg-[var(--gold)] text-[#140106] font-black"
                    : "text-sky-200 hover:text-white hover:bg-white/10"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                <span>الوظائف</span>
              </Link>

              <Link
                href="/tech"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                  isActive("/tech")
                    ? "bg-[var(--gold)] text-[#140106] font-black"
                    : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-indigo-300" />
                <span>التقنية</span>
              </Link>

              {/* المنصات والمختبرات (Mega Menu Trigger) */}
              <button
                type="button"
                onMouseEnter={() => setActiveMega("services")}
                onClick={() => setActiveMega(activeMega === "services" ? null : "services")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                  activeMega === "services"
                    ? "bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/40"
                    : "text-[var(--gold)] hover:bg-white/10"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>المختبرات والخدمات</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>
            </div>

            <Link
              href="/submit-news"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/35 border border-red-500/30 text-red-200 text-[11px] font-black shrink-0 transition-colors"
            >
              <Radio className="w-3 h-3" />
              <span>أرسل بلاغاً</span>
            </Link>
          </nav>
        </div>

        {/* ========================================================================= */}
        {/* لوحة القائمة الكبرى الحية (Live Data Mega Menu Panel)                     */}
        {/* ========================================================================= */}
        {activeMega && (
          <div
            onMouseLeave={() => setActiveMega(null)}
            className="absolute top-full inset-x-0 bg-[#150006]/98 border-b-2 border-[var(--gold)]/50 shadow-2xl py-6 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50"
          >
            <div className="container-custom">
              {activeMega === "palestine" && (
                <div className="grid grid-cols-12 gap-6 items-start">
                  <div className="col-span-5 space-y-3">
                    <h4 className="text-xs font-black text-emerald-400 flex items-center gap-2 border-b border-white/10 pb-2">
                      <Landmark className="w-4 h-4" />
                      <span>مكاتب الميدان والتغطية المباشرة في فلسطين</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { href: "/palestine/jerusalem", label: "القدس والمسجد الأقصى", desc: "رصد الاقتحامات والتهويد" },
                        { href: "/palestine/gaza", label: "قطاع غزة الصامد", desc: "الميدان، الإغاثة والمعابر" },
                        { href: "/palestine/west-bank", label: "الضفة الغربية والأغوار", desc: "الاقتحامات والاستيطان" },
                        { href: "/atlas", label: "أطلس فلسطين والقرى", desc: "خرائط الجغرافيا والذاكرة" },
                      ].map((hub) => (
                        <Link
                          key={hub.href}
                          href={hub.href}
                          className="p-3 rounded-2xl bg-white/[0.04] hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-500/40 transition-all"
                        >
                          <span className="font-black text-xs text-white block">{hub.label}</span>
                          <span className="text-[10px] text-stone-400 block mt-0.5">{hub.desc}</span>
                        </Link>
                      ))}
                    </div>
                    <Link href="/palestine" className="inline-flex items-center gap-1 text-xs font-black text-emerald-400 hover:underline pt-1">
                      <span>الدخول لقسم فلسطين الكامل</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="col-span-7 space-y-3">
                    <h4 className="text-xs font-black text-[var(--gold)] border-b border-white/10 pb-2">
                      أحدث التقارير المنشورة الآن في فلسطين
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {(megaArticles["palestine"] || []).slice(0, 3).map((art) => (
                        <Link
                          key={art.id}
                          href={`/article/${art.id}/${art.slug}`}
                          className="group rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden hover:border-[var(--gold)]/50 transition-all"
                        >
                          <div className="aspect-video overflow-hidden bg-black">
                            <img
                              src={resolveEditorialImage(art)}
                              alt={art.titleAr}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-3 space-y-1">
                            <span className="text-[10px] text-emerald-400 font-bold block">
                              {art.source?.nameAr || "الوطن اليوم"}
                            </span>
                            <h5 className="text-xs font-bold text-white line-clamp-2 group-hover:text-[var(--gold)] leading-snug">
                              {art.titleAr}
                            </h5>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeMega === "economy" && (
                <div className="grid grid-cols-12 gap-6 items-start">
                  <div className="col-span-5 space-y-3">
                    <h4 className="text-xs font-black text-amber-400 flex items-center gap-2 border-b border-white/10 pb-2">
                      <Coins className="w-4 h-4" />
                      <span>الأسواق العالمية وأسعار الذهب والعملات الحية</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { href: "/economy/instrument/XAUUSD", label: "الذهب الفوري (أونصة)", q: goldQ, prefix: "$" },
                        { href: "/economy/instrument/USDILS", label: "الدولار / الشيكل", q: usdIlsQ, suffix: " ₪" },
                        { href: "/economy/instrument/BRENT", label: "نفط برنت القياسي", q: brentQ, prefix: "$" },
                        { href: "/economy/instrument/BTCUSD", label: "بيتكوين (BTC)", q: btcQ, prefix: "$" },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="p-3 rounded-2xl bg-white/[0.04] hover:bg-amber-500/15 border border-white/10 hover:border-amber-500/40 transition-all"
                        >
                          <span className="text-[11px] text-stone-300 block">{item.label}</span>
                          <strong className="font-mono text-sm font-black text-[var(--gold)] block mt-1">
                            {item.q?.price
                              ? `${item.prefix || ""}${Number(item.q.price).toLocaleString("en-US")}${item.suffix || ""}`
                              : "بث السوق"}
                          </strong>
                        </Link>
                      ))}
                    </div>
                    <Link href="/economy" className="inline-flex items-center gap-1 text-xs font-black text-amber-400 hover:underline pt-1">
                      <span>لوحة الاقتصاد وحاسبة الذهب والعملات الكاملة</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="col-span-7 space-y-3">
                    <h4 className="text-xs font-black text-[var(--gold)] border-b border-white/10 pb-2">
                      أحدث تقارير المال والأعمال
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {(megaArticles["economy"] || []).slice(0, 3).map((art) => (
                        <Link
                          key={art.id}
                          href={`/article/${art.id}/${art.slug}`}
                          className="group rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden hover:border-amber-500/50 transition-all"
                        >
                          <div className="aspect-video overflow-hidden bg-black">
                            <img
                              src={resolveEditorialImage(art)}
                              alt={art.titleAr}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-3 space-y-1">
                            <span className="text-[10px] text-amber-400 font-bold block">
                              {art.source?.nameAr || "الوطن الاقتصادي"}
                            </span>
                            <h5 className="text-xs font-bold text-white line-clamp-2 group-hover:text-amber-300 leading-snug">
                              {art.titleAr}
                            </h5>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeMega === "sports" && (
                <div className="grid grid-cols-12 gap-6 items-start">
                  <div className="col-span-6 space-y-3">
                    <h4 className="text-xs font-black text-emerald-400 flex items-center gap-2 border-b border-white/10 pb-2">
                      <Trophy className="w-4 h-4" />
                      <span>أبرز مواجهات الملاعب المباشرة والمجدولة (ESPN Live)</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      {megaMatches.length > 0 ? (
                        megaMatches.map((m) => (
                          <Link
                            key={m.id}
                            href="/sports"
                            className="p-3 rounded-2xl bg-white/[0.04] hover:bg-emerald-500/15 border border-white/10 transition-all space-y-1"
                          >
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-stone-400 truncate max-w-[130px]">{m.leagueNameAr}</span>
                              <span className={m.status === "LIVE" ? "text-red-400 font-black" : "text-emerald-400 font-bold"}>
                                {m.statusDetail}
                              </span>
                            </div>
                            <div className="text-xs font-black text-white flex items-center justify-between">
                              <span className="truncate">{m.homeTeam}</span>
                              <span className="font-mono text-[var(--gold)] px-1.5">
                                {m.homeScore !== null ? `${m.homeScore} - ${m.awayScore}` : "vs"}
                              </span>
                              <span className="truncate">{m.awayTeam}</span>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="col-span-2 p-4 rounded-2xl bg-white/[0.03] text-xs text-stone-400">
                          استعرض جداول الترتيب والمباريات الحية في استوديو يلا سبورت ←
                        </div>
                      )}
                    </div>
                    <Link href="/sports" className="inline-flex items-center gap-1 text-xs font-black text-emerald-400 hover:underline">
                      <span>فتح استوديو يلا سبورت الكامل</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="col-span-6 space-y-3">
                    <h4 className="text-xs font-black text-[var(--gold)] border-b border-white/10 pb-2">
                      آخر الأخبار الرياضية
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {(megaArticles["sports"] || []).slice(0, 2).map((art) => (
                        <Link
                          key={art.id}
                          href={`/article/${art.id}/${art.slug}`}
                          className="group rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden hover:border-emerald-500/50 transition-all"
                        >
                          <div className="aspect-video overflow-hidden bg-black">
                            <img
                              src={resolveEditorialImage(art)}
                              alt={art.titleAr}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-3 space-y-1">
                            <span className="text-[10px] text-emerald-400 font-bold block">
                              {art.source?.nameAr || "يلا سبورت"}
                            </span>
                            <h5 className="text-xs font-bold text-white line-clamp-2 group-hover:text-emerald-300 leading-snug">
                              {art.titleAr}
                            </h5>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeMega === "services" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h4 className="text-xs font-black text-[var(--gold)] flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>منصات الاستقصاء والبيانات والخدمات الذكية</span>
                    </h4>
                    <Link href="/admin" className="text-[11px] font-bold text-[var(--gold)] hover:underline">
                      كابينة الإدارة التحريرية ←
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { href: "/pulse", label: "رادار المزاج والبيانات", desc: "تحليل حي لتوزيع الأخبار والكلمات", icon: Activity },
                      { href: "/live-360", label: "تغطية 360° الميدانية", desc: "زاوية ميدانية، سياسية وإنسانية", icon: Globe },
                      { href: "/atlas", label: "أطلس فلسطين الرقمي", desc: "دليل المدن والقرى والتغطيات", icon: Compass },
                      { href: "/history", label: "في مثل هذا اليوم", desc: "أحداث التاريخ اليوم عبر ويكيبيديا", icon: History },
                      { href: "/podcast", label: "صوت الوطن (بودكاست)", desc: "نشرة إخبارية صوتية آلية حية", icon: Headphones },
                      { href: "/games", label: "تحديات الذاكرة اليومية", desc: "اختبر معرفتك بتاريخ وجغرافيا فلسطين", icon: Gamepad2 },
                      { href: "/fact-check", label: "رادار الحقيقة (OSINT)", desc: "فحص الروابط وكشف الشائعات", icon: ShieldCheck },
                      { href: "/stories", label: "القصص المجمعة (Clusters)", desc: "مقارنة تغطية الوكالات للحدث نفسه", icon: Sparkles },
                    ].map((srv) => {
                      const Icon = srv.icon;
                      return (
                        <Link
                          key={srv.href}
                          href={srv.href}
                          className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 hover:border-[var(--gold)]/50 transition-all flex items-start gap-3"
                        >
                          <div className="w-8 h-8 rounded-xl bg-[var(--gold)]/15 text-[var(--gold)] flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-white block">{srv.label}</span>
                            <span className="text-[10px] text-stone-400 block mt-0.5 leading-snug">{srv.desc}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. قائمة الهواتف المنزلقة (Mobile Drawer)                                */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--gold)]/20 bg-[#160006]/98 p-5 space-y-5 animate-in slide-in-from-top-4 duration-200 shadow-2xl backdrop-blur-3xl text-white">
          <SearchTrigger expanded className="w-full" />

          <div className="grid grid-cols-2 gap-2.5 text-xs font-bold">
            <Link href="/palestine" className="p-3 rounded-2xl bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 flex items-center gap-2">
              <span>🇵🇸</span>
              <span>فلسطين والميدان</span>
            </Link>
            <Link href="/breaking" className="p-3 rounded-2xl bg-red-950/50 text-red-300 border border-red-500/30 flex items-center gap-2">
              <Flame className="w-4 h-4" />
              <span>الأخبار العاجلة</span>
            </Link>
            <Link href="/economy" className="p-3 rounded-2xl bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span>الاقتصاد والذهب</span>
            </Link>
            <Link href="/sports" className="p-3 rounded-2xl bg-emerald-800/30 text-emerald-300 border border-emerald-500/30 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>يلا سبورت</span>
            </Link>
            <Link href="/aid" className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2 text-stone-200">
              <HeartHandshake className="w-4 h-4 text-amber-400" />
              <span>المساعدات</span>
            </Link>
            <Link href="/jobs" className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2 text-stone-200">
              <Briefcase className="w-4 h-4 text-sky-400" />
              <span>الوظائف</span>
            </Link>
            <Link href="/fact-check" className="p-3 rounded-2xl bg-rose-600/20 text-rose-300 border border-rose-500/30 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>رادار الحقيقة</span>
            </Link>
            <Link href="/ask" className="p-3 rounded-2xl bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/40 flex items-center gap-2">
              <Bot className="w-4 h-4" />
              <span>اسأل الوطن AI</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-300">
            <Link href="/admin" className="font-bold text-[var(--gold)] hover:underline flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
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
