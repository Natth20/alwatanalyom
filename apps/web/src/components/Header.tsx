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
  Landmark,
  Flame,
  Cpu,
  Globe,
  Compass,
  Headphones,
  History,
  Gamepad2,
  Activity,
  ChevronLeft,
  Layers,
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

  const [quotes, setQuotes] = useState<InstrumentQuote[]>([]);
  const [megaArticles, setMegaArticles] = useState<Record<string, ArticleCard[]>>({});
  const [megaMatches, setMegaMatches] = useState<LiveMatchItem[]>([]);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    const handleScroll = () => setScrolled(window.scrollY > 24);
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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header
      ref={navContainerRef}
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 no-print ${
        scrolled
          ? "shadow-[0_12px_36px_-10px_rgba(15,0,5,0.75)]"
          : ""
      }`}
    >
      {/* ===================================================================== */}
      {/* 1. الشريط العلوي الهادئ (Collapses smoothly on scroll to keep header sleek) */}
      {/* ===================================================================== */}
      <div
        className={`bg-[#0E0105] text-white/80 transition-all duration-300 ${
          scrolled
            ? "h-0 opacity-0 pointer-events-none overflow-hidden"
            : "h-8 border-b border-white/10 opacity-100"
        }`}
      >
        <div className="container-custom h-full flex items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-3 shrink-0">
            <TopBarInfo />
            <span className="hidden sm:inline text-white/15">|</span>
            <WeatherWidget />
          </div>

          <div className="hidden lg:flex items-center gap-4 text-[11px] font-medium text-white/75">
            {goldQ?.price && (
              <Link href="/economy/instrument/XAUUSD" className="hover:text-[var(--gold)] transition-colors">
                الذهب <strong className="font-mono text-[var(--gold)]">${Number(goldQ.price).toLocaleString("en-US", { maximumFractionDigits: 2 })}</strong>
              </Link>
            )}
            {usdIlsQ?.price && (
              <>
                <span className="text-white/15">·</span>
                <Link href="/economy/instrument/USDILS" className="hover:text-emerald-300 transition-colors">
                  الدولار <strong className="font-mono text-emerald-400">{Number(usdIlsQ.price).toFixed(2)} ₪</strong>
                </Link>
              </>
            )}
            {brentQ?.price && (
              <>
                <span className="text-white/15">·</span>
                <Link href="/economy/instrument/BRENT" className="hover:text-sky-300 transition-colors">
                  برنت <strong className="font-mono text-sky-300">${Number(brentQ.price).toFixed(2)}</strong>
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <LowBandwidthToggle />
            <span className="hidden sm:inline text-white/15">|</span>
            <Link
              href="/live"
              className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-bold text-rose-300 hover:text-rose-200 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span>بث مباشر</span>
            </Link>
            <Link
              href="/en"
              className="hidden md:inline text-[10px] font-bold text-white/60 hover:text-[var(--gold)] transition-colors"
            >
              EN
            </Link>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. شريط القيادة والتنقل الموحد (Sleek 64px Sovereign Masthead & Nav)    */}
      {/* ===================================================================== */}
      <div className="bg-gradient-to-l from-[#2B000C]/98 via-[#3F0012]/98 to-[#1B0007]/98 backdrop-blur-2xl text-white border-b border-[var(--gold)]/25 relative">
        <div className="container-custom h-16 flex items-center justify-between gap-4">
          {/* اليمين: زر القائمة للهاتف + الشعار */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/15 border border-white/15 flex items-center justify-center text-white cursor-pointer"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

            <BrandLogo variant="header" showTagline={false} />
          </div>

          {/* الوسط: التنقل التحريري الصافي بدون حشو أو أيقونات زائدة */}
          <nav
            aria-label="التنقل الرئيسي"
            className="hidden lg:flex items-center justify-center gap-5 xl:gap-7 flex-1 min-w-0"
          >
            <Link
              href="/"
              className={`relative py-1 text-[13px] font-bold transition-colors whitespace-nowrap ${
                isActive("/")
                  ? "text-[var(--gold)] after:absolute after:bottom-0 after:inset-x-0 after:h-[2px] after:bg-[var(--gold)]"
                  : "text-white/85 hover:text-white"
              }`}
            >
              الرئيسية
            </Link>

            <button
              type="button"
              onMouseEnter={() => setActiveMega("palestine")}
              onClick={() => setActiveMega(activeMega === "palestine" ? null : "palestine")}
              className={`relative py-1 text-[13px] font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isActive("/palestine") || activeMega === "palestine"
                  ? "text-emerald-300"
                  : "text-white/90 hover:text-emerald-300"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>فلسطين</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            <Link
              href="/breaking"
              className={`relative py-1 text-[13px] font-bold transition-colors whitespace-nowrap ${
                isActive("/breaking")
                  ? "text-rose-400 after:absolute after:bottom-0 after:inset-x-0 after:h-[2px] after:bg-rose-400"
                  : "text-rose-200 hover:text-rose-300"
              }`}
            >
              عاجل
            </Link>

            <Link
              href="/arab-world"
              className={`relative py-1 text-[13px] font-bold transition-colors whitespace-nowrap ${
                isActive("/arab-world")
                  ? "text-[var(--gold)] after:absolute after:bottom-0 after:inset-x-0 after:h-[2px] after:bg-[var(--gold)]"
                  : "text-white/85 hover:text-white"
              }`}
            >
              العالم العربي
            </Link>

            <Link
              href="/world"
              className={`relative py-1 text-[13px] font-bold transition-colors whitespace-nowrap ${
                isActive("/world")
                  ? "text-[var(--gold)] after:absolute after:bottom-0 after:inset-x-0 after:h-[2px] after:bg-[var(--gold)]"
                  : "text-white/85 hover:text-white"
              }`}
            >
              دولياً
            </Link>

            <button
              type="button"
              onMouseEnter={() => setActiveMega("economy")}
              onClick={() => setActiveMega(activeMega === "economy" ? null : "economy")}
              className={`relative py-1 text-[13px] font-bold transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                isActive("/economy") || activeMega === "economy"
                  ? "text-amber-300"
                  : "text-white/85 hover:text-amber-300"
              }`}
            >
              <span>الاقتصاد</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            <button
              type="button"
              onMouseEnter={() => setActiveMega("sports")}
              onClick={() => setActiveMega(activeMega === "sports" ? null : "sports")}
              className={`relative py-1 text-[13px] font-bold transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                isActive("/sports") || activeMega === "sports"
                  ? "text-emerald-300"
                  : "text-white/85 hover:text-emerald-300"
              }`}
            >
              <span>الرياضة</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            <button
              type="button"
              onMouseEnter={() => setActiveMega("services")}
              onClick={() => setActiveMega(activeMega === "services" ? null : "services")}
              className={`relative py-1 text-[13px] font-bold transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                activeMega === "services"
                  ? "text-[var(--gold)]"
                  : "text-white/85 hover:text-[var(--gold)]"
              }`}
            >
              <span>الخدمات والمنصات</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>
          </nav>

          {/* اليسار: أدوات مدمجة موحدة التناسب */}
          <div className="flex items-center gap-2 shrink-0">
            <SearchTrigger compact />
            <NotificationCenter />
            <SavedCounterBadge />
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            <Link
              href="/ask"
              className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full border border-[var(--gold)]/45 bg-[var(--gold)]/10 hover:bg-[var(--gold)] text-[var(--gold)] hover:text-[#140106] text-xs font-black transition-all shrink-0"
              title="اسأل الوطن AI"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>اسأل الوطن</span>
            </Link>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. القائمة الكبرى المنبثقة الهادئة (Live Luxury Mega Drawer)       */}
        {/* =================================================================== */}
        {activeMega && (
          <div
            onMouseLeave={() => setActiveMega(null)}
            className="absolute top-full inset-x-0 bg-[#140006]/98 border-b border-[var(--gold)]/35 shadow-2xl py-7 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50"
          >
            <div className="container-custom">
              {activeMega === "palestine" && (
                <div className="grid grid-cols-12 gap-8 items-start">
                  <div className="col-span-5 space-y-3">
                    <h4 className="text-xs font-black text-emerald-400 flex items-center gap-2 border-b border-white/10 pb-2">
                      <Landmark className="w-4 h-4" />
                      <span>غرف التغطية في فلسطين</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { href: "/palestine/jerusalem", label: "القدس والأقصى", desc: "التطورات اليومية بالبلدة القديمة" },
                        { href: "/palestine/gaza", label: "قطاع غزة الصامد", desc: "الميدان، الإغاثة والمعابر" },
                        { href: "/palestine/west-bank", label: "الضفة والأغوار", desc: "الأخبار الميدانية والمحافظات" },
                        { href: "/atlas", label: "أطلس فلسطين", desc: "خرائط المدن والقرى والتوثيق" },
                      ].map((hub) => (
                        <Link
                          key={hub.href}
                          href={hub.href}
                          className="p-3 rounded-2xl bg-white/[0.03] hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/35 transition-all"
                        >
                          <span className="font-bold text-xs text-white block">{hub.label}</span>
                          <span className="text-[10px] text-stone-400 block mt-0.5">{hub.desc}</span>
                        </Link>
                      ))}
                    </div>
                    <Link href="/palestine" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:underline pt-1">
                      <span>عرض قسم فلسطين الكامل</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="col-span-7 space-y-3">
                    <h4 className="text-xs font-black text-[var(--gold)] border-b border-white/10 pb-2">
                      أحدث تقارير فلسطين المنشورة
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {(megaArticles["palestine"] || []).slice(0, 3).map((art) => (
                        <Link
                          key={art.id}
                          href={`/article/${art.id}/${art.slug}`}
                          className="group rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden hover:border-[var(--gold)]/40 transition-all"
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
                <div className="grid grid-cols-12 gap-8 items-start">
                  <div className="col-span-5 space-y-3">
                    <h4 className="text-xs font-black text-amber-400 flex items-center gap-2 border-b border-white/10 pb-2">
                      <Coins className="w-4 h-4" />
                      <span>مؤشرات الأسواق الحية</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { href: "/economy/instrument/XAUUSD", label: "الذهب (أونصة)", q: goldQ, prefix: "$" },
                        { href: "/economy/instrument/USDILS", label: "الدولار / الشيكل", q: usdIlsQ, suffix: " ₪" },
                        { href: "/economy/instrument/BRENT", label: "نفط برنت", q: brentQ, prefix: "$" },
                        { href: "/economy", label: "حاسبات الذهب والصرف", q: null },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="p-3 rounded-2xl bg-white/[0.03] hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/35 transition-all"
                        >
                          <span className="text-[11px] text-stone-300 block">{item.label}</span>
                          <strong className="font-mono text-sm font-black text-[var(--gold)] block mt-1">
                            {item.q?.price
                              ? `${item.prefix || ""}${Number(item.q.price).toLocaleString("en-US")}${item.suffix || ""}`
                              : "فتح الأدوات ←"}
                          </strong>
                        </Link>
                      ))}
                    </div>
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
                          className="group rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden hover:border-amber-500/40 transition-all"
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
                <div className="grid grid-cols-12 gap-8 items-start">
                  <div className="col-span-6 space-y-3">
                    <h4 className="text-xs font-black text-emerald-400 flex items-center gap-2 border-b border-white/10 pb-2">
                      <Trophy className="w-4 h-4" />
                      <span>أبرز مباريات الملاعب العالمية</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      {megaMatches.length > 0 ? (
                        megaMatches.map((m) => (
                          <Link
                            key={m.id}
                            href="/sports"
                            className="p-3 rounded-2xl bg-white/[0.03] hover:bg-emerald-500/10 border border-white/10 transition-all space-y-1"
                          >
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-stone-400 truncate max-w-[130px]">{m.leagueNameAr}</span>
                              <span className={m.status === "LIVE" ? "text-red-400 font-black" : "text-emerald-400 font-bold"}>
                                {m.statusDetail}
                              </span>
                            </div>
                            <div className="text-xs font-bold text-white flex items-center justify-between">
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
                          استعرض النتائج وجداول الترتيب في استوديو يلا سبورت ←
                        </div>
                      )}
                    </div>
                    <Link href="/sports" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:underline">
                      <span>دخول استوديو يلا سبورت</span>
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
                          className="group rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden hover:border-emerald-500/40 transition-all"
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
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <h4 className="text-xs font-black text-[var(--gold)] flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>الأقسام الخدمية والمنصات الرقمية</span>
                    </h4>
                    <div className="flex items-center gap-4 text-xs font-bold">
                      <Link href="/aid" className="text-amber-300 hover:underline flex items-center gap-1">
                        <HeartHandshake className="w-3.5 h-3.5" />
                        <span>المساعدات</span>
                      </Link>
                      <Link href="/jobs" className="text-sky-300 hover:underline flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>الوظائف</span>
                      </Link>
                      <Link href="/tech" className="text-indigo-300 hover:underline flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>التقنية</span>
                      </Link>
                      <Link href="/submit-news" className="text-rose-300 hover:underline flex items-center gap-1">
                        <Radio className="w-3.5 h-3.5" />
                        <span>أرسل بلاغاً</span>
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { href: "/fact-check", label: "رادار الحقيقة (OSINT)", desc: "فحص الروابط والشائعات", icon: ShieldCheck },
                      { href: "/pulse", label: "نبض البيانات", desc: "إحصاءات الأرشيف الحي", icon: Activity },
                      { href: "/live-360", label: "تغطية 360°", desc: "متابعة ميدانية وسياسية", icon: Globe },
                      { href: "/atlas", label: "أطلس فلسطين", desc: "المدن والقرى والتغطيات", icon: Compass },
                      { href: "/history", label: "في مثل هذا اليوم", desc: "ذاكرة التاريخ اليومية", icon: History },
                      { href: "/podcast", label: "صوت الوطن", desc: "النشرة الصوتية الحية", icon: Headphones },
                      { href: "/stories", label: "القصص المجمعة", desc: "مقارنة تغطية الوكالات", icon: Layers },
                      { href: "/games", label: "تحديات الذاكرة", desc: "اختبار المعرفة اليومي", icon: Gamepad2 },
                    ].map((srv) => {
                      const Icon = srv.icon;
                      return (
                        <Link
                          key={srv.href}
                          href={srv.href}
                          className="p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[var(--gold)]/40 transition-all flex items-center gap-3"
                        >
                          <div className="w-8 h-8 rounded-xl bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">{srv.label}</span>
                            <span className="text-[10px] text-stone-400 block">{srv.desc}</span>
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

      {/* ===================================================================== */}
      {/* 4. قائمة الهواتف الهادئة (Mobile Drawer)                              */}
      {/* ===================================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[var(--gold)]/20 bg-[#140006]/98 p-5 space-y-4 animate-in slide-in-from-top-3 duration-200 shadow-2xl backdrop-blur-2xl text-white">
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10">
            <SearchTrigger expanded className="flex-1" />
            <ThemeToggle />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            {[
              { href: "/palestine", label: "فلسطين" },
              { href: "/breaking", label: "عاجل" },
              { href: "/arab-world", label: "العالم العربي" },
              { href: "/world", label: "دولياً" },
              { href: "/economy", label: "الاقتصاد والذهب" },
              { href: "/sports", label: "يلا سبورت" },
              { href: "/aid", label: "المساعدات" },
              { href: "/jobs", label: "الوظائف" },
              { href: "/fact-check", label: "رادار الحقيقة" },
              { href: "/ask", label: "اسأل الوطن AI" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-stone-100"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-400">
            <Link href="/submit-news" className="text-rose-300 font-bold hover:underline">
              تقديم بلاغ سري
            </Link>
            <Link href="/admin" className="text-[var(--gold)] font-bold hover:underline">
              غرفة التحرير
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
