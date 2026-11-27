"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { OFFICIAL_SOCIAL_LINKS } from "@awt/shared";
import { BrandLogo } from "@/components/BrandLogo";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Scale,
  FileCheck2,
  FileSearch,
  Radio,
  Lock,
  FileText,
  Mail,
  Clock,
  Landmark,
  Coins,
  Trophy,
  Bot,
  HeartHandshake,
  Compass,
  ArrowUpRight,
  Fingerprint,
  ChevronLeft,
  Sparkles,
  Award,
  Globe2,
} from "lucide-react";
import type { CityPrayerTimings } from "@/lib/live-data/telemetry";

export function Footer() {
  const pathname = usePathname();
  const [times, setTimes] = useState({
    jerusalem: "",
    gaza: "",
    amman: "",
    cairo: "",
  });
  const [prayers, setPrayers] = useState<CityPrayerTimings | null>(null);
  const [pulseStats, setPulseStats] = useState<{
    totalPublishedArticles: number;
    activeSourcesCount: number;
  } | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    const updateClocks = () => {
      const now = new Date();
      const opts: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };
      setTimes({
        jerusalem: now.toLocaleTimeString("ar-EG", { ...opts, timeZone: "Asia/Jerusalem" }),
        gaza: now.toLocaleTimeString("ar-EG", { ...opts, timeZone: "Asia/Gaza" }),
        amman: now.toLocaleTimeString("ar-EG", { ...opts, timeZone: "Asia/Amman" }),
        cairo: now.toLocaleTimeString("ar-EG", { ...opts, timeZone: "Africa/Cairo" }),
      });
    };

    updateClocks();
    const timer = setInterval(updateClocks, 30000);

    fetch("/api/v1/telemetry")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.prayers?.jerusalem) setPrayers(data.prayers.jerusalem);
      })
      .catch(() => {});

    fetch("/api/v1/pulse")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && typeof data.totalPublishedArticles === "number") {
          setPulseStats({
            totalPublishedArticles: data.totalPublishedArticles,
            activeSourcesCount: data.activeSourcesCount || 0,
          });
        }
      })
      .catch(() => {});

    return () => clearInterval(timer);
  }, [pathname]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newsletterEmail.trim();
    if (!trimmed) return;

    setNewsletterStatus({ type: "loading" });
    try {
      const res = await fetch("/api/v1/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, lists: ["daily"] }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setNewsletterStatus({
          type: "success",
          message: json.message || "تم تسجيل اشتراكك في إيجاز الفجر الإخباري بنجاح.",
        });
        setNewsletterEmail("");
      } else {
        setNewsletterStatus({
          type: "error",
          message: json?.error?.message || "يرجى التأكد من صحة البريد الإلكتروني.",
        });
      }
    } catch {
      setNewsletterStatus({
        type: "error",
        message: "تعذر الاتصال بالخادم حالياً.",
      });
    }
  };

  const institutionalLinks = [
    { href: "/editorial-policy", label: "ميثاق الشرف", icon: FileCheck2 },
    { href: "/corrections", label: "سجل التصحيحات", icon: Scale },
    { href: "/sources-policy", label: "عزو المصادر", icon: FileSearch },
    { href: "/submit-news", label: "تقديم بلاغ سري", icon: Radio, highlight: true },
    { href: "/dmca", label: "حقوق النشر (DMCA)", icon: ShieldCheck },
    { href: "/privacy", label: "الخصوصية والبيانات", icon: Lock },
    { href: "/terms", label: "شروط الاستخدام", icon: FileText },
    { href: "/contact", label: "اتصل بهيئة التحرير", icon: Mail },
  ];

  const socialItems = [
    { label: "فيسبوك", href: OFFICIAL_SOCIAL_LINKS.facebook },
    { label: "إكس", href: OFFICIAL_SOCIAL_LINKS.twitter },
    { label: "إنستغرام", href: OFFICIAL_SOCIAL_LINKS.instagram },
    { label: "تيليغرام", href: OFFICIAL_SOCIAL_LINKS.telegram },
    { label: "يوتيوب", href: OFFICIAL_SOCIAL_LINKS.youtube },
  ];

  return (
    <footer className="bg-[#070002] text-white border-t border-[var(--gold)]/30 mt-20 relative overflow-hidden no-print">
      {/* إضاءة خلفية هادئة */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[var(--gold)]/5 via-rose-950/10 to-transparent pointer-events-none" />

      <div className="container-custom pt-14 pb-10 space-y-12 relative z-10">
        {/* ===================================================================== */}
        {/* 1. الجناح السيادي الرئاسي: الهوية + الساعات + النشرة البريدية          */}
        {/* ===================================================================== */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#140006]/90 via-[#0e0004]/90 to-[#080002]/90 backdrop-blur-xl p-6 sm:p-9 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* الشعار والنبذة السيادية */}
            <div className="lg:col-span-5 space-y-3">
              <BrandLogo variant="footer" showTagline={false} />
              <p className="text-xs text-stone-300 leading-relaxed max-w-md">
                صرح إعلامي رقمي مستقل يلتزم بأعلى معايير النزاهة والتدقيق الجنائي، وإسناد الأخبار إلى مصادرها الأصلية، وصون الرواية الوطنية الفلسطينية.
              </p>
              {pulseStats && (
                <div className="flex items-center gap-3 text-[11px] text-stone-400 pt-1">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>{pulseStats.activeSourcesCount.toLocaleString("ar-EG")} مصدراً معتمداً</span>
                  </span>
                  <span className="text-white/20">·</span>
                  <span>{pulseStats.totalPublishedArticles.toLocaleString("ar-EG")} مادة موثقة</span>
                </div>
              )}
            </div>

            {/* ساعات العواصم ومواقيت الصلاة الحية */}
            <div className="lg:col-span-3 space-y-3 border-y lg:border-y-0 lg:border-x border-white/10 py-4 lg:py-0 lg:px-6">
              <span className="text-[10px] font-mono text-[var(--gold)] font-bold uppercase tracking-wider block">
                توقيت العواصم الحية
              </span>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[10px] text-stone-400 block">القدس الشريف</span>
                  <strong className="font-mono text-white text-xs block mt-0.5">
                    {times.jerusalem || "--:--"}
                  </strong>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[10px] text-stone-400 block">غزة الصامدة</span>
                  <strong className="font-mono text-white text-xs block mt-0.5">
                    {times.gaza || "--:--"}
                  </strong>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[10px] text-stone-400 block">عمان</span>
                  <strong className="font-mono text-stone-300 text-xs block mt-0.5">
                    {times.amman || "--:--"}
                  </strong>
                </div>

                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <span className="text-[10px] text-stone-400 block">القاهرة</span>
                  <strong className="font-mono text-stone-300 text-xs block mt-0.5">
                    {times.cairo || "--:--"}
                  </strong>
                </div>
              </div>

              {prayers && (
                <div className="pt-1 text-[11px] text-stone-400 flex items-center justify-between">
                  <span>صلاة الفجر: <strong className="font-mono text-white">{prayers.fajr}</strong></span>
                  <span>المغرب: <strong className="font-mono text-white">{prayers.maghrib}</strong></span>
                </div>
              )}
            </div>

            {/* نموذج النشرة البريدية الخفيف البيضاوي الفاخر */}
            <div className="lg:col-span-4 space-y-2.5">
              <div>
                <span className="text-xs font-bold text-white block">نشرة «إيجاز الفجر» الإخبارية</span>
                <span className="text-[11px] text-stone-400 block">
                  خلاصة التطورات الميدانية والتحقيقات الحصرية يومياً في بريدك
                </span>
              </div>

              <form
                onSubmit={handleNewsletterSubmit}
                className="flex items-center rounded-full border border-[var(--gold)]/35 focus-within:border-[var(--gold)] bg-black/70 p-1.5 shadow-inner transition-colors"
              >
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني..."
                  className="flex-1 bg-transparent px-4 py-2 text-xs text-white placeholder:text-stone-500 outline-none min-w-0"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus.type === "loading"}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#120004] hover:brightness-110 text-xs font-black transition-all flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-60 shadow-md shadow-amber-950/20"
                >
                  <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                  <span>{newsletterStatus.type === "loading" ? "جارٍ..." : "انضم مجاناً"}</span>
                </button>
              </form>

              {newsletterStatus.type === "success" && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1.5 px-3">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{newsletterStatus.message}</span>
                </p>
              )}
              {newsletterStatus.type === "error" && (
                <p className="text-[11px] text-rose-400 flex items-center gap-1.5 px-3">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{newsletterStatus.message}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 2. أجنحة الأقسام الخمسة المنحوتة معمارياً (5 Architectural Pavilions)  */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4.5 text-xs">
          {/* الجناح 1: فلسطين والقدس والميدان */}
          <div className="p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#06180e]/60 to-[#020b06]/60 backdrop-blur-md space-y-4 shadow-lg hover:border-emerald-500/50 transition-all">
            <div className="flex items-center gap-2.5 border-b border-emerald-500/20 pb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
                <Landmark className="w-4 h-4" />
              </div>
              <h4 className="font-black text-white text-xs">فلسطين والميدان</h4>
            </div>
            <ul className="space-y-2.5 text-stone-300">
              <li>
                <Link href="/palestine/jerusalem" className="hover:text-emerald-300 transition-colors flex items-center justify-between">
                  <span>القدس والمسجد الأقصى</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/palestine/gaza" className="hover:text-emerald-300 transition-colors flex items-center justify-between">
                  <span>قطاع غزة الصامد</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/palestine/west-bank" className="hover:text-emerald-300 transition-colors flex items-center justify-between">
                  <span>الضفة والأغوار</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/atlas" className="hover:text-emerald-300 transition-colors flex items-center justify-between">
                  <span>أطلس القرى المهجرة</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/aid" className="hover:text-emerald-300 transition-colors flex items-center justify-between">
                  <span>دليل الإغاثة والمساعدات</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* الجناح 2: المال والأعمال والطاقة */}
          <div className="p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#1c1203]/60 to-[#0d0701]/60 backdrop-blur-md space-y-4 shadow-lg hover:border-amber-500/50 transition-all">
            <div className="flex items-center gap-2.5 border-b border-amber-500/20 pb-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
                <Coins className="w-4 h-4" />
              </div>
              <h4 className="font-black text-white text-xs">المال والأعمال</h4>
            </div>
            <ul className="space-y-2.5 text-stone-300">
              <li>
                <Link href="/economy/instrument/XAUUSD" className="hover:text-amber-300 transition-colors flex items-center justify-between">
                  <span>أسعار الذهب والعيارات</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/economy/instrument/USDILS" className="hover:text-amber-300 transition-colors flex items-center justify-between">
                  <span>أسعار العملات والصرف</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/economy/instrument/BRENT" className="hover:text-amber-300 transition-colors flex items-center justify-between">
                  <span>مؤشرات نفط برنت</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/economy" className="hover:text-amber-300 transition-colors flex items-center justify-between">
                  <span>رادار الأسواق التفاعلي</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-amber-300 transition-colors flex items-center justify-between">
                  <span>سوق الوظائف والفرص</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* الجناح 3: ديسك يلا سبورت الدولي */}
          <div className="p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#081814]/60 to-[#030d0a]/60 backdrop-blur-md space-y-4 shadow-lg hover:border-emerald-500/50 transition-all">
            <div className="flex items-center gap-2.5 border-b border-emerald-500/20 pb-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
                <Trophy className="w-4 h-4" />
              </div>
              <h4 className="font-black text-white text-xs">يلا سبورت</h4>
            </div>
            <ul className="space-y-2.5 text-stone-300">
              <li>
                <Link href="/sports" className="hover:text-emerald-300 transition-colors flex items-center justify-between">
                  <span>دوري أبطال أوروبا</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-emerald-300 transition-colors flex items-center justify-between">
                  <span>الدوريات الأوروبية الكبرى</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-emerald-300 transition-colors flex items-center justify-between">
                  <span>مشاركات منتخب الفدائي</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-emerald-300 transition-colors flex items-center justify-between">
                  <span>جدول المباريات المباشرة</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-emerald-300 transition-colors flex items-center justify-between">
                  <span>ترتيب الدوريات والهدافين</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* الجناح 4: المنصات الذكية والتفاعلية */}
          <div className="p-5 rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-b from-[#180a00]/60 to-[#0d0500]/60 backdrop-blur-md space-y-4 shadow-lg hover:border-[var(--gold)]/50 transition-all">
            <div className="flex items-center gap-2.5 border-b border-[var(--gold)]/20 pb-3">
              <div className="w-8 h-8 rounded-xl bg-[var(--gold)]/15 text-[var(--gold)] flex items-center justify-center font-bold">
                <Bot className="w-4 h-4" />
              </div>
              <h4 className="font-black text-white text-xs">المنصات الذكية</h4>
            </div>
            <ul className="space-y-2.5 text-stone-300">
              <li>
                <Link href="/ask" className="hover:text-[var(--gold)] transition-colors flex items-center justify-between font-bold">
                  <span>اسأل الوطن AI</span>
                  <Sparkles className="w-3 h-3 text-[var(--gold)]" />
                </Link>
              </li>
              <li>
                <Link href="/fact-check" className="hover:text-[var(--gold)] transition-colors flex items-center justify-between">
                  <span>رادار الحقيقة (OSINT)</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/atlas" className="hover:text-[var(--gold)] transition-colors flex items-center justify-between">
                  <span>أطلس فلسطين التفاعلي</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/podcast" className="hover:text-[var(--gold)] transition-colors flex items-center justify-between">
                  <span>بودكاست الوطن الصوتي</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-[var(--gold)] transition-colors flex items-center justify-between">
                  <span>ألعاب المعرفة والثقافة</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* الجناح 5: منظومة المواثيق المهنية والشفافية */}
          <div className="p-5 rounded-2xl border border-rose-500/30 bg-gradient-to-b from-[#1f000b]/60 to-[#0e0004]/60 backdrop-blur-md space-y-4 shadow-lg hover:border-rose-500/50 transition-all">
            <div className="flex items-center gap-2.5 border-b border-rose-500/20 pb-3">
              <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-black text-white text-xs">المواثيق والشفافية</h4>
            </div>
            <ul className="space-y-2.5 text-stone-300">
              <li>
                <Link href="/editorial-policy" className="hover:text-[var(--gold)] transition-colors flex items-center justify-between">
                  <span>ميثاق الشرف التحريري</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/corrections" className="hover:text-[var(--gold)] transition-colors flex items-center justify-between">
                  <span>سجل التصحيحات العلني</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/sources-policy" className="hover:text-[var(--gold)] transition-colors flex items-center justify-between">
                  <span>سياسة عزو المصادر</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
              <li>
                <Link href="/submit-news" className="text-emerald-400 hover:underline font-bold flex items-center justify-between">
                  <span>قناة التسريبات المشفرة</span>
                  <Lock className="w-3 h-3 text-emerald-400" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--gold)] transition-colors flex items-center justify-between">
                  <span>الاتصال بهيئة التحرير</span>
                  <ChevronLeft className="w-3 h-3 text-stone-500" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3. شريط كبسولات الشفافية المؤسسية الدستورية                            */}
        {/* ===================================================================== */}
        <div className="rounded-2xl border border-white/10 bg-black/50 p-4 flex flex-wrap items-center justify-between gap-3 text-xs shadow-inner">
          <div className="flex items-center gap-2.5 text-stone-300">
            <Fingerprint className="w-4 h-4 text-[var(--gold)] shrink-0" />
            <span className="font-bold text-white">الوثائق الدستورية الثماني المعتمدة لعام 2026:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {institutionalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                  item.highlight
                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30"
                    : "bg-white/[0.04] border border-white/8 text-stone-300 hover:text-white hover:border-white/20"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 4. السطر السيادي وشبكات التواصل الرقمية                                */}
        {/* ===================================================================== */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <p>
              © {new Date().getFullYear()} صرح <strong className="text-white">الوطن اليوم (Al-Watan Today)</strong>. جميع الحقوق محفوظة — فلسطين والوطن العربي.
            </p>
            <span className="text-white/20 hidden sm:inline">·</span>
            <span className="text-stone-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>تشفير سيادي <strong className="font-mono text-emerald-400">TLS 1.3</strong></span>
            </span>
            <span className="text-white/20 hidden sm:inline">·</span>
            <Link href="/admin" className="text-[var(--gold)]/90 hover:text-white font-bold transition-colors">
              كابينة الإدارة
            </Link>
          </div>

          {/* شبكات التواصل الاجتماعي الرسمية */}
          <div className="flex items-center gap-2">
            {socialItems.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-[var(--gold)]/15 hover:border-[var(--gold)]/40 hover:text-[var(--gold)] text-stone-300 transition-all font-bold text-xs"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
