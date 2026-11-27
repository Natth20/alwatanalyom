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
  ArrowUpRight,
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
    const handleScroll = () => setScrolled(window.scrollY > 30);
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
    const interval = setInterval(loadQuotes, 60000);
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
          ? "shadow-[0_16px_40px_-12px_rgba(20,0,8,0.85)]"
          : "shadow-md"
      }`}
    >
      {/* ===================================================================== */}
      {/* 1. الشريط العلوي السيادي (Sovereign Telemetry Strip - h-9)              */}
      {/* ===================================================================== */}
      <div className="bg-[#0b0104] text-white/85 border-b border-white/10 text-[11px] relative z-20">
        <div className="container-custom h-9 flex items-center justify-between gap-4">
          {/* اليمين: التاريخ الهجري والميلادي والطقس في القدس وغزة */}
          <div className="flex items-center gap-3 shrink-0">
            <TopBarInfo />
            <span className="hidden sm:inline text-white/20">|</span>
            <WeatherWidget />
          </div>

          {/* الوسط: كبسولة المؤشرات المالية الحية اللحظية (ذهب، دولار، نفط) */}
          <div className="hidden lg:flex items-center justify-center gap-2">
            <Link
              href="/economy"
              className="inline-flex items-center gap-3.5 px-4 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[var(--gold)]/40 transition-all text-xs font-medium text-white/80 shadow-inner"
              title="رادار الأسواق والمؤشرات المالية الحية"
            >
              <div className="flex items-center gap-1.5 text-[var(--gold)] font-bold text-[11px]">
                <Coins className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>الأسواق الحية:</span>
              </div>

              {goldQ?.price && (
                <span className="flex items-center gap-1 text-[11px]">
                  <span className="text-stone-300">الذهب</span>
                  <strong className="font-mono text-[var(--gold)] font-bold">
                    ${Number(goldQ.price).toLocaleString("en-US", { maximumFractionDigits: 1 })}
                  </strong>
                </span>
              )}

              {usdIlsQ?.price && (
                <span className="flex items-center gap-1 text-[11px]">
                  <span className="text-white/20">·</span>
                  <span className="text-stone-300">الدولار</span>
                  <strong className="font-mono text-emerald-400 font-bold">
                    {Number(usdIlsQ.price).toFixed(2)} ₪
                  </strong>
                </span>
              )}

              {brentQ?.price && (
                <span className="flex items-center gap-1 text-[11px]">
                  <span className="text-white/20">·</span>
                  <span className="text-stone-300">برنت</span>
                  <strong className="font-mono text-sky-300 font-bold">
                    ${Number(brentQ.price).toFixed(1)}
                  </strong>
                </span>
              )}
            </Link>
          </div>

          {/* اليسار: أدوات سريعة (البيانات المنخفضة، البث المباشر، الإدارة، اللغة) */}
          <div className="flex items-center gap-3 shrink-0 text-[11px]">
            <LowBandwidthToggle />

            <span className="hidden sm:inline text-white/15">|</span>

            <Link
              href="/live"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/15 border border-red-500/30 text-rose-300 hover:text-white text-[10px] font-bold transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span>بث مباشر</span>
            </Link>

            <Link
              href="/admin"
              className="hidden md:inline-flex items-center gap-1 text-[11px] text-[var(--gold)]/90 hover:text-white transition-colors font-bold"
              title="غرفة التحرير والإدارة"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>الإدارة</span>
            </Link>

            <span className="hidden md:inline text-white/15">|</span>

            <Link
              href="/en"
              className="hidden sm:inline text-[10px] font-bold font-mono text-stone-400 hover:text-[var(--gold)] transition-colors"
            >
              English
            </Link>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. ترويسة القيادة والملاحة الرئيسية (Sovereign Masthead Bar - h-18)     */}
      {/* ===================================================================== */}
      <div className="bg-gradient-to-r from-[#170005]/98 via-[#2a000e]/98 to-[#170005]/98 backdrop-blur-2xl text-white border-b border-[var(--gold)]/30 relative">
        <div className="container-custom h-18 flex items-center justify-between gap-4">
          {/* الجانب الأيمن: زر القائمة للهواتف + الشعار الملكي */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden w-9 h-9 rounded-xl bg-white/[0.06] hover:bg-white/15 border border-white/15 flex items-center justify-center text-white cursor-pointer transition-colors"
              aria-label="القائمة الرئيسية"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <BrandLogo variant="header" showTagline={false} />
          </div>

          {/* الوسط: شريط التبويبات الكبسولي الفاخر متناسق المسافات */}
          <nav
            aria-label="التنقل التحريري الرئيسي"
            className="hidden lg:flex items-center justify-center gap-1 xl:gap-1.5 flex-1 min-w-0"
          >
            {/* 1. الرئيسية */}
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive("/")
                  ? "bg-[var(--gold)] text-[#120004] font-black shadow-md shadow-amber-950/20"
                  : "text-stone-200 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              الرئيسية
            </Link>

            {/* 2. فلسطين والميدان */}
            <button
              type="button"
              onMouseEnter={() => setActiveMega("palestine")}
              onClick={() => setActiveMega(activeMega === "palestine" ? null : "palestine")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                isActive("/palestine") || activeMega === "palestine"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "text-stone-200 hover:text-emerald-300 hover:bg-white/[0.06]"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>فلسطين والميدان</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {/* 3. عاجل */}
            <Link
              href="/breaking"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                isActive("/breaking")
                  ? "bg-rose-600 text-white font-black shadow-md shadow-rose-950/20"
                  : "text-rose-300 hover:text-rose-200 hover:bg-rose-500/10"
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>عاجل</span>
            </Link>

            {/* 4. العالم العربي */}
            <Link
              href="/arab-world"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive("/arab-world")
                  ? "bg-white/15 text-[var(--gold)] font-black"
                  : "text-stone-200 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              العالم العربي
            </Link>

            {/* 5. دولياً */}
            <Link
              href="/world"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive("/world")
                  ? "bg-white/15 text-[var(--gold)] font-black"
                  : "text-stone-200 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              دولياً
            </Link>

            {/* 6. المال والأعمال */}
            <button
              type="button"
              onMouseEnter={() => setActiveMega("economy")}
              onClick={() => setActiveMega(activeMega === "economy" ? null : "economy")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                isActive("/economy") || activeMega === "economy"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "text-stone-200 hover:text-amber-300 hover:bg-white/[0.06]"
              }`}
            >
              <span>المال والأعمال</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {/* 7. يلا سبورت */}
            <button
              type="button"
              onMouseEnter={() => setActiveMega("sports")}
              onClick={() => setActiveMega(activeMega === "sports" ? null : "sports")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                isActive("/sports") || activeMega === "sports"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "text-stone-200 hover:text-emerald-300 hover:bg-white/[0.06]"
              }`}
            >
              <span>يلا سبورت</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {/* 8. المنصات والخدمات */}
            <button
              type="button"
              onMouseEnter={() => setActiveMega("services")}
              onClick={() => setActiveMega(activeMega === "services" ? null : "services")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                activeMega === "services"
                  ? "bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/40"
                  : "text-stone-200 hover:text-[var(--gold)] hover:bg-white/[0.06]"
              }`}
            >
              <span>المنصات</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>
          </nav>

          {/* الجانب الأيسر: مجمع أدوات التفاعل المتناسقة (Unified Action Cluster) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* البحث السريع */}
            <SearchTrigger compact />

            {/* جرس الإشعارات */}
            <NotificationCenter />

            {/* عداد المقالات المحفوظة أوفلاين */}
            <SavedCounterBadge />

            {/* محول المظهر الليلي/النهاري */}
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* كبسولة اسأل الوطن AI الفاخرة */}
            <Link
              href="/ask"
              className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-[var(--gold)]/50 bg-gradient-to-r from-[var(--gold)]/15 via-amber-500/10 to-[var(--gold)]/20 hover:from-[var(--gold)] hover:to-[#dca600] text-[var(--gold)] hover:text-[#120004] text-xs font-black transition-all shadow-md shadow-amber-950/20 shrink-0 group"
              title="اسأل الوطن AI — المساعد الصحفي الذكي"
            >
              <Bot className="w-4 h-4 text-[var(--gold)] group-hover:text-[#120004] transition-colors" />
              <span className="hidden sm:inline">اسأل الوطن</span>
            </Link>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. القوائم الكبرى المنبثقة السينمائية (Live Luxury Mega Drawers)    */}
        {/* =================================================================== */}
        {activeMega && (
          <div
            onMouseLeave={() => setActiveMega(null)}
            className="absolute top-full inset-x-0 bg-[#120005]/98 border-b border-[var(--gold)]/35 shadow-2xl py-7 backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-white"
          >
            <div className="container-custom">
              {/* ميجا منيو: فلسطين */}
              {activeMega === "palestine" && (
                <div className="grid grid-cols-12 gap-8 items-start">
                  <div className="col-span-5 space-y-3">
                    <h4 className="text-xs font-black text-emerald-400 flex items-center gap-2 border-b border-white/10 pb-2">
                      <Landmark className="w-4 h-4" />
                      <span>غرف التغطية الميدانية في فلسطين</span>
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
                    <Link
                      href="/palestine"
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:underline pt-1"
                    >
                      <span>عرض تغطية فلسطين الكاملة</span>
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

              {/* ميجا منيو: الاقتصاد والأسواق */}
              {activeMega === "economy" && (
                <div className="grid grid-cols-12 gap-8 items-start">
                  <div className="col-span-5 space-y-3">
                    <h4 className="text-xs font-black text-amber-400 flex items-center gap-2 border-b border-white/10 pb-2">
                      <Coins className="w-4 h-4" />
                      <span>مؤشرات الأسواق الحية والذهب</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        { href: "/economy/instrument/XAUUSD", label: "الذهب (أونصة)", q: goldQ, prefix: "$" },
                        { href: "/economy/instrument/USDILS", label: "الدولار / الشيكل", q: usdIlsQ, suffix: " ₪" },
                        { href: "/economy/instrument/BRENT", label: "نفط برنت", q: brentQ, prefix: "$" },
                        { href: "/economy", label: "حاسبات الذهب والعملات", q: null },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="p-3 rounded-2xl bg-white/[0.03] hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/35 transition-all"
                        >
                          <span className="font-bold text-xs text-white block">{item.label}</span>
                          {item.q?.price ? (
                            <span className="font-mono text-xs font-black text-amber-300 block mt-1">
                              {item.prefix}{Number(item.q.price).toFixed(2)}{item.suffix}
                            </span>
                          ) : (
                            <span className="text-[10px] text-stone-400 block mt-0.5">أدوات التحويل الفورية</span>
                          )}
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="/economy"
                      className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline pt-1"
                    >
                      <span>مركز المال والأعمال الكامل</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="col-span-7 space-y-3">
                    <h4 className="text-xs font-black text-[var(--gold)] border-b border-white/10 pb-2">
                      تقارير الاقتصاد وأسواق الطاقة
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
                              {art.source?.nameAr || "الاقتصاد"}
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

              {/* ميجا منيو: يلا سبورت */}
              {activeMega === "sports" && (
                <div className="grid grid-cols-12 gap-8 items-start">
                  <div className="col-span-6 space-y-3">
                    <h4 className="text-xs font-black text-emerald-400 flex items-center gap-2 border-b border-white/10 pb-2">
                      <Trophy className="w-4 h-4" />
                      <span>مباريات اليوم الحية من ESPN</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      {megaMatches.length === 0 ? (
                        <div className="col-span-2 p-4 rounded-xl bg-white/[0.02] border border-white/10 text-center text-xs text-stone-400">
                          لا توجد مباريات جارية حالياً — انقر لاستعراض جدول الجولة
                        </div>
                      ) : (
                        megaMatches.map((m) => (
                          <div
                            key={m.id}
                            className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5"
                          >
                            <span className="text-[10px] text-stone-400 font-mono block truncate">
                              {m.leagueNameAr} · {m.statusDetail || m.status}
                            </span>
                            <div className="flex items-center justify-between text-xs font-bold text-white">
                              <span className="truncate max-w-[90px]">{m.homeTeam}</span>
                              <span className="font-mono text-emerald-400 font-black px-1.5 py-0.5 rounded-md bg-black/40">
                                {m.homeScore ?? "-"} : {m.awayScore ?? "-"}
                              </span>
                              <span className="truncate max-w-[90px]">{m.awayTeam}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <Link
                      href="/sports"
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:underline pt-1"
                    >
                      <span>عرض ديسك يلا سبورت والترتيب الكامل</span>
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="col-span-6 space-y-3">
                    <h4 className="text-xs font-black text-[var(--gold)] border-b border-white/10 pb-2">
                      أحدث أخبار الملاعب والبطولات
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
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

              {/* ميجا منيو: المنصات والخدمات */}
              {activeMega === "services" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h4 className="text-xs font-black text-[var(--gold)] flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      <span>منظومة المنصات والأدوات التفاعلية المستقلة</span>
                    </h4>
                    <Link
                      href="/about"
                      className="text-xs text-stone-400 hover:text-white flex items-center gap-1"
                    >
                      <span>دليل خدمات الصرح الصحفي</span>
                      <ChevronLeft className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                      { href: "/ask", label: "اسأل الوطن AI", desc: "المساعد الإخباري الذكي", icon: Bot },
                      { href: "/fact-check", label: "رادار الحقيقة", desc: "فحص الشائعات والأدلة OSINT", icon: ShieldCheck },
                      { href: "/atlas", label: "أطلس فلسطين", desc: "خرائط القرى والمدن والتوثيق", icon: Landmark },
                      { href: "/aid", label: "منصة المساعدات", desc: "دليل الإغاثة والمستشفيات", icon: HeartHandshake },
                      { href: "/jobs", label: "سوق الوظائف", desc: "فرص العمل في فلسطين", icon: Briefcase },
                      { href: "/games", label: "ألعاب المعرفة", desc: "اختبر معلوماتك التاريخية", icon: Gamepad2 },
                    ].map((srv) => {
                      const Icon = srv.icon;
                      return (
                        <Link
                          key={srv.href}
                          href={srv.href}
                          className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[var(--gold)]/40 transition-all flex flex-col justify-between space-y-2 group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-[var(--gold)]/10 group-hover:bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-black text-white block group-hover:text-[var(--gold)] transition-colors">
                              {srv.label}
                            </span>
                            <span className="text-[10px] text-stone-400 block mt-0.5 leading-snug">
                              {srv.desc}
                            </span>
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
      {/* 4. قائمة الهواتف المنزلقة الفاخرة (Mobile Navigation Drawer)               */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--gold)]/20 bg-[#140006]/98 p-5 space-y-5 animate-in slide-in-from-top-4 duration-200 shadow-2xl backdrop-blur-3xl text-white">
          <SearchTrigger expanded className="w-full" />

          <div className="grid grid-cols-2 gap-2.5 text-xs font-bold">
            <Link
              href="/palestine"
              className="p-3 rounded-2xl bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 flex items-center gap-2"
            >
              <span>🇵🇸</span>
              <span>فلسطين والميدان</span>
            </Link>
            <Link
              href="/breaking"
              className="p-3 rounded-2xl bg-red-950/50 text-red-300 border border-red-500/30 flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-rose-400" />
              <span>الأخبار العاجلة</span>
            </Link>
            <Link
              href="/economy"
              className="p-3 rounded-2xl bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>المال والأعمال</span>
            </Link>
            <Link
              href="/sports"
              className="p-3 rounded-2xl bg-emerald-800/30 text-emerald-300 border border-emerald-500/30 flex items-center gap-2"
            >
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span>يلا سبورت</span>
            </Link>
            <Link
              href="/arab-world"
              className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2 text-stone-200"
            >
              <Globe className="w-4 h-4 text-[var(--gold)]" />
              <span>العالم العربي</span>
            </Link>
            <Link
              href="/world"
              className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2 text-stone-200"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span>شؤون دولية</span>
            </Link>
            <Link
              href="/fact-check"
              className="p-3 rounded-2xl bg-rose-600/20 text-rose-300 border border-rose-500/30 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>رادار الحقيقة</span>
            </Link>
            <Link
              href="/ask"
              className="p-3 rounded-2xl bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/40 flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>اسأل الوطن AI</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-300">
            <Link
              href="/admin"
              className="font-bold text-[var(--gold)] hover:underline flex items-center gap-1.5"
            >
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

export default Header;
