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
          message: json.message || "تم تسجيل اشتراكك في إيجاز الصباح بنجاح.",
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
    <footer className="bg-[#080103] text-white border-t border-[var(--gold)]/25 mt-20 no-print">
      <div className="container-custom pt-14 pb-10 space-y-12">
        {/* ===================================================================== */}
        {/* 1. الشريط الشرفي الملكي والاشتراك الذكي                                */}
        {/* ===================================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 max-w-2xl">
            <BrandLogo variant="footer" showTagline={false} />
            <div className="space-y-1.5">
              <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed">
                صرح إعلامي رقمي عربي يضع <strong className="text-white">فلسطين أولاً</strong> — تغطية ميدانية موثقة، تحقيقات استقصائية، ومؤشرات أسواق حية على مدار الساعة.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400">
                {pulseStats && (
                  <>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>{pulseStats.activeSourcesCount.toLocaleString("ar-EG")} مصدراً معتمداً</span>
                    </span>
                    <span className="text-white/20">·</span>
                    <span>{pulseStats.totalPublishedArticles.toLocaleString("ar-EG")} مادة موثقة</span>
                  </>
                )}
                {times.jerusalem && (
                  <>
                    <span className="text-white/20">·</span>
                    <span>القدس الشريف <strong className="font-mono text-white/90">{times.jerusalem}</strong></span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* نموذج النشرة البريدية الخفيف البيضاوي الفاخر */}
          <div className="w-full lg:max-w-md space-y-2">
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex items-center rounded-full border border-[var(--gold)]/30 focus-within:border-[var(--gold)] bg-black/60 p-1.5 shadow-inner transition-colors"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="اشترك في إيجاز الفجر الإخباري ببريدك..."
                className="flex-1 bg-transparent px-4 py-2 text-xs text-white placeholder:text-stone-500 outline-none min-w-0"
              />
              <button
                type="submit"
                disabled={newsletterStatus.type === "loading"}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] hover:brightness-110 text-xs font-black transition-all flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-60 shadow-md shadow-amber-950/20"
              >
                <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{newsletterStatus.type === "loading" ? "جارٍ..." : "اشترك مجاناً"}</span>
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

        {/* ===================================================================== */}
        {/* 2. شبكة الأعمدة الخمسة المتوازنة للصحيفة السيادية                      */}
        {/* ===================================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-xs">
          {/* العمود 1: فلسطين والقدس والميدان */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs flex items-center gap-2 border-b border-white/10 pb-2">
              <Landmark className="w-4 h-4 text-emerald-400" />
              <span>فلسطين والميدان</span>
            </h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <Link href="/palestine/jerusalem" className="hover:text-[var(--gold)] transition-colors">
                  القدس والمسجد الأقصى
                </Link>
              </li>
              <li>
                <Link href="/palestine/gaza" className="hover:text-[var(--gold)] transition-colors">
                  قطاع غزة الصامد
                </Link>
              </li>
              <li>
                <Link href="/palestine/west-bank" className="hover:text-[var(--gold)] transition-colors">
                  الضفة الغربية والأغوار
                </Link>
              </li>
              <li>
                <Link href="/atlas" className="hover:text-[var(--gold)] transition-colors">
                  أطلس القرى والمدن المهجرة
                </Link>
              </li>
              <li>
                <Link href="/aid" className="hover:text-[var(--gold)] transition-colors">
                  دليل الإغاثة والمساعدات
                </Link>
              </li>
              <li>
                <Link href="/breaking" className="text-rose-400 hover:underline font-bold flex items-center gap-1">
                  <span>الأخبار العاجلة</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود 2: المال والأعمال */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs flex items-center gap-2 border-b border-white/10 pb-2">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>المال والأعمال</span>
            </h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <Link href="/economy/instrument/XAUUSD" className="hover:text-[var(--gold)] transition-colors">
                  أسعار الذهب (أونصة وعيارات)
                </Link>
              </li>
              <li>
                <Link href="/economy/instrument/USDILS" className="hover:text-[var(--gold)] transition-colors">
                  أسعار العملات والصرف (شيكل/دينار)
                </Link>
              </li>
              <li>
                <Link href="/economy/instrument/BRENT" className="hover:text-[var(--gold)] transition-colors">
                  مؤشرات الطاقة ونفط برنت
                </Link>
              </li>
              <li>
                <Link href="/economy" className="hover:text-[var(--gold)] transition-colors">
                  رادار الأسواق التفاعلي
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-[var(--gold)] transition-colors">
                  سوق الوظائف والفرص المهنية
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود 3: يلا سبورت الرياضي */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs flex items-center gap-2 border-b border-white/10 pb-2">
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span>يلا سبورت</span>
            </h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <Link href="/sports" className="hover:text-emerald-300 transition-colors">
                  دوري أبطال أوروبا
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-emerald-300 transition-colors">
                  الدوري الإسباني والإنجليزي
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-emerald-300 transition-colors">
                  مشاركات منتخب الفدائي
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-emerald-300 transition-colors">
                  جدول المباريات والنتائج الحية
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-emerald-300 transition-colors">
                  ترتيب الدوريات الأوروبية والعربية
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود 4: المنصات التفاعلية والذكاء الاصطناعي */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs flex items-center gap-2 border-b border-white/10 pb-2">
              <Bot className="w-4 h-4 text-[var(--gold)]" />
              <span>المنصات التفاعلية</span>
            </h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <Link href="/ask" className="hover:text-[var(--gold)] font-bold transition-colors">
                  اسأل الوطن AI (المساعد الذكي)
                </Link>
              </li>
              <li>
                <Link href="/fact-check" className="hover:text-[var(--gold)] transition-colors">
                  رادار الحقيقة (التحقق OSINT)
                </Link>
              </li>
              <li>
                <Link href="/atlas" className="hover:text-[var(--gold)] transition-colors">
                  أطلس فلسطين التاريخي
                </Link>
              </li>
              <li>
                <Link href="/podcast" className="hover:text-[var(--gold)] transition-colors">
                  بودكاست الوطن الصوتي
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-[var(--gold)] transition-colors">
                  ألعاب المعرفة والثقافة الوطنية
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود 5: منظومة الشفافية والمواثيق المؤسسية */}
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <h4 className="font-bold text-white text-xs flex items-center gap-2 border-b border-white/10 pb-2">
              <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
              <span>المواثيق والشفافية</span>
            </h4>
            <ul className="space-y-2 text-stone-300">
              <li>
                <Link href="/editorial-policy" className="hover:text-[var(--gold)] transition-colors">
                  ميثاق الشرف التحريري
                </Link>
              </li>
              <li>
                <Link href="/corrections" className="hover:text-[var(--gold)] transition-colors">
                  سجل التصحيحات العلني
                </Link>
              </li>
              <li>
                <Link href="/sources-policy" className="hover:text-[var(--gold)] transition-colors">
                  سياسة عزو المصادر
                </Link>
              </li>
              <li>
                <Link href="/submit-news" className="text-emerald-400 hover:underline font-bold flex items-center gap-1">
                  <span>قناة التسريبات المشفرة</span>
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-[var(--gold)] transition-colors">
                  الملكية الفكرية (DMCA)
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[var(--gold)] transition-colors">
                  الخصوصية وأمان البيانات
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[var(--gold)] transition-colors">
                  شروط الاستخدام والخدمة
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--gold)] transition-colors">
                  الاتصال بهيئة التحرير
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3. شريط كبسولات الشفافية المؤسسية السريعة                               */}
        {/* ===================================================================== */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-300">
            <Fingerprint className="w-4 h-4 text-[var(--gold)] shrink-0" />
            <span className="font-bold text-white">الوثائق المؤسسية الثماني المعتمدة:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {institutionalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  item.highlight
                    ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25"
                    : "bg-white/[0.04] border border-white/5 text-stone-300 hover:text-white hover:border-white/20"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 4. السطر الختامي والسيادة الرقمية وشبكات التواصل                        */}
        {/* ===================================================================== */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <p>
              © {new Date().getFullYear()} صرح <strong className="text-white">الوطن اليوم (Al-Watan Today)</strong>. جميع الحقوق محفوظة — فلسطين والوطن العربي.
            </p>
            <span className="text-white/20 hidden sm:inline">·</span>
            <span className="text-stone-400">
              تشفير اتصال سيادي <strong className="font-mono text-emerald-400">TLS 1.3</strong>
            </span>
          </div>

          {/* شبكات التواصل الاجتماعي الرسمية */}
          <div className="flex items-center gap-2">
            {socialItems.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-[var(--gold)]/10 hover:border-[var(--gold)]/40 hover:text-[var(--gold)] text-stone-300 transition-all font-bold text-[11px]"
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
