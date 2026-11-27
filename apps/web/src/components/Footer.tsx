"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { OFFICIAL_SOCIAL_LINKS } from "@awt/shared";
import { BrandLogo } from "@/components/BrandLogo";
import {
  ShieldCheck,
  Radio,
  Sparkles,
  CheckCircle2,
  Scale,
  FileCheck2,
  FileSearch,
  Lock,
  FileText,
  Mail,
  Clock,
  Globe2,
  ChevronLeft,
  Megaphone,
  Headphones,
  Compass,
  Activity,
  Gamepad2,
  History,
  Send,
  AlertCircle,
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
        if (data?.prayers?.jerusalem) {
          setPrayers(data.prayers.jerusalem);
        }
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
          message: json?.error?.message || "تعذر تسجيل البريد الإلكتروني، يرجى التأكد من صحته.",
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
    { href: "/submit-news", label: "تقديم بلاغ سري", icon: Radio, urgent: true },
    { href: "/dmca", label: "حقوق النشر (DMCA)", icon: ShieldCheck },
    { href: "/privacy", label: "الخصوصية والبيانات", icon: Lock },
    { href: "/terms", label: "شروط الاستخدام", icon: FileText },
    { href: "/contact", label: "اتصل بهيئة التحرير", icon: Mail },
  ];

  const socialItems = [
    { label: "فيسبوك", href: OFFICIAL_SOCIAL_LINKS.facebook, badge: "FB" },
    { label: "إكس (تويتر)", href: OFFICIAL_SOCIAL_LINKS.twitter, badge: "X" },
    { label: "إنستغرام", href: OFFICIAL_SOCIAL_LINKS.instagram, badge: "IG" },
    { label: "تيليغرام", href: OFFICIAL_SOCIAL_LINKS.telegram, badge: "TG" },
    { label: "يوتيوب", href: OFFICIAL_SOCIAL_LINKS.youtube, badge: "YT" },
  ];

  return (
    <footer className="relative bg-[#0B0104] text-white border-t border-[var(--gold)]/30 mt-20 overflow-hidden no-print">
      {/* خط الإضاءة الذهبي العلوي */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--gold)]/80 to-transparent" />
      <div className="absolute -top-40 end-1/4 w-[520px] h-[520px] bg-[var(--primary)]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* 1. شريط التوقيت الإقليمي ومواقيت الصلاة الحية */}
      <div className="border-b border-white/10 bg-[#140107]/90 backdrop-blur-md">
        <div className="container-custom py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-stone-300">
            <span className="inline-flex items-center gap-1.5 text-[var(--gold)] font-black">
              <Clock className="w-3.5 h-3.5" />
              <span>التوقيت الإقليمي الحي:</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-stone-400">القدس:</span>
              <strong className="font-mono text-white">{times.jerusalem || "--:--"}</strong>
            </span>
            <span className="text-white/20">|</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="text-stone-400">غزة:</span>
              <strong className="font-mono text-white">{times.gaza || "--:--"}</strong>
            </span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <span className="text-stone-400">عمّان:</span>
              <strong className="font-mono text-white">{times.amman || "--:--"}</strong>
            </span>
            <span className="text-white/20 hidden md:inline">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5">
              <span className="text-stone-400">القاهرة:</span>
              <strong className="font-mono text-white">{times.cairo || "--:--"}</strong>
            </span>
          </div>

          {prayers && (
            <div className="flex flex-wrap items-center gap-2.5 text-[11px] bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10">
              <span className="text-emerald-400 font-black">مواقيت القدس:</span>
              <span>الفجر <strong className="font-mono text-white">{prayers.fajr}</strong></span>
              <span className="text-white/20">·</span>
              <span>الظهر <strong className="font-mono text-white">{prayers.dhuhr}</strong></span>
              <span className="text-white/20">·</span>
              <span>العصر <strong className="font-mono text-white">{prayers.asr}</strong></span>
              <span className="text-white/20">·</span>
              <span>المغرب <strong className="font-mono text-white">{prayers.maghrib}</strong></span>
              <span className="text-white/20">·</span>
              <span>العشاء <strong className="font-mono text-white">{prayers.isha}</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* 2. الشبكة المعمارية الرئيسية للفوتر */}
      <div className="container-custom py-14 space-y-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* الجناح الأول: الهوية والرسالة والتوثيق (4 أعمدة) */}
          <div className="lg:col-span-4 space-y-5">
            <BrandLogo variant="footer" />

            <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed max-w-sm">
              منصة إعلامية رقمية عربية مستقلة تضع <strong className="text-white">فلسطين أولاً</strong>، وتجمع بين التغطية الميدانية الدقيقة، التحقق الجنائي (OSINT)، ومؤشرات الأسواق الحية تحت سقف المهنية والشفافية.
            </p>

            {/* بطاقة الإحصاءات الحية لغرفة الأخبار */}
            {pulseStats && (
              <div className="inline-flex flex-wrap items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/10 text-[11px]">
                <span className="flex items-center gap-1.5 text-emerald-400 font-black">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{pulseStats.activeSourcesCount.toLocaleString("ar-EG")} مصدر معتمد</span>
                </span>
                <span className="text-white/20">•</span>
                <span className="text-stone-300 font-bold">
                  {pulseStats.totalPublishedArticles.toLocaleString("ar-EG")} مادة موثقة بالأرشيف
                </span>
              </div>
            )}

            {/* حسابات التواصل الرسمية */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {socialItems.map((soc) => (
                <a
                  key={soc.badge}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-[var(--gold)] hover:text-[#140106] border border-white/10 hover:border-[var(--gold)] text-[11px] font-bold transition-all duration-200"
                  title={soc.label}
                >
                  {soc.label}
                </a>
              ))}
            </div>
          </div>

          {/* الجناح الثاني: الأقسام التحريرية (2 أعمدة) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-black text-[var(--gold)] tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-2.5">
              <Globe2 className="w-3.5 h-3.5" />
              <span>الأقسام التحريرية</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-300">
              {[
                { href: "/palestine", label: "فلسطين والميدان" },
                { href: "/arab-world", label: "العالم العربي" },
                { href: "/world", label: "الشؤون الدولية" },
                { href: "/economy", label: "المال والأعمال والذهب" },
                { href: "/sports", label: "استوديو يلا سبورت" },
                { href: "/aid", label: "بوابة المساعدات الموثقة" },
                { href: "/jobs", label: "شواغر وفرص عمل" },
                { href: "/tech", label: "التقنية والذكاء الاصطناعي" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[var(--gold)] transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <ChevronLeft className="w-3 h-3 text-white/30 group-hover:text-[var(--gold)] transition-colors" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* الجناح الثالث: المختبرات والخدمات التفاعلية (3 أعمدة) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-black text-[var(--gold)] tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>المنصات والمختبرات الرقمية</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 text-xs text-stone-300">
              <li>
                <Link href="/live" className="hover:text-[var(--gold)] flex items-center gap-2 transition-colors">
                  <Radio className="w-3.5 h-3.5 text-red-400" />
                  <span>غرفة التغطية المباشرة والفضائيات</span>
                </Link>
              </li>
              <li>
                <Link href="/live-360" className="hover:text-[var(--gold)] flex items-center gap-2 transition-colors">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span>البث الميداني الشامل 360°</span>
                </Link>
              </li>
              <li>
                <Link href="/fact-check" className="hover:text-[var(--gold)] flex items-center gap-2 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                  <span>رادار الحقيقة ومكافحة الشائعات</span>
                </Link>
              </li>
              <li>
                <Link href="/pulse" className="hover:text-[var(--gold)] flex items-center gap-2 transition-colors">
                  <Activity className="w-3.5 h-3.5 text-sky-400" />
                  <span>رادار المزاج العام والبيانات</span>
                </Link>
              </li>
              <li>
                <Link href="/atlas" className="hover:text-[var(--gold)] flex items-center gap-2 transition-colors">
                  <Compass className="w-3.5 h-3.5 text-amber-400" />
                  <span>أطلس القرى والمدن الفلسطينية</span>
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-[var(--gold)] flex items-center gap-2 transition-colors">
                  <History className="w-3.5 h-3.5 text-amber-300" />
                  <span>في مثل هذا اليوم · ذاكرة الوطن</span>
                </Link>
              </li>
              <li>
                <Link href="/podcast" className="hover:text-[var(--gold)] flex items-center gap-2 transition-colors">
                  <Headphones className="w-3.5 h-3.5 text-emerald-300" />
                  <span>صوت الوطن · البودكاست الإخباري</span>
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-[var(--gold)] flex items-center gap-2 transition-colors">
                  <Gamepad2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>تحديات الذاكرة والتاريخ اليومية</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* الجناح الرابع: النشرة البريدية الملكية والشراكات (3 أعمدة) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="rounded-3xl border border-[var(--gold)]/30 bg-gradient-to-br from-[#23030D] to-[#110105] p-5 space-y-4 shadow-xl">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-[var(--gold)] bg-[var(--gold)]/10 px-2.5 py-0.5 rounded-full">
                  <Mail className="w-3 h-3" />
                  <span>نشرة إيجاز الفجر</span>
                </span>
                <h4 className="font-black text-sm text-white pt-1">
                  اشترك في الموجز الصباحي الموثق
                </h4>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  ملخص تحريري يومي لأهم الأحداث، أسعار الذهب والعملات، وفرص المساعدات الموثقة.
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 focus:border-[var(--gold)] text-xs text-white placeholder:text-stone-500 outline-none"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus.type === "loading"}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] text-xs font-black hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60 shadow-lg shadow-amber-950/30"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {newsletterStatus.type === "loading" ? "جارٍ التسجيل..." : "تأكيد الاشتراك المجاني"}
                  </span>
                </button>
              </form>

              {newsletterStatus.type === "success" && (
                <div className="flex items-start gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{newsletterStatus.message}</span>
                </div>
              )}

              {newsletterStatus.type === "error" && (
                <div className="flex items-start gap-1.5 text-[11px] text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl p-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{newsletterStatus.message}</span>
                </div>
              )}

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                <Link href="/advertise" className="text-stone-300 hover:text-[var(--gold)] flex items-center gap-1 font-bold">
                  <Megaphone className="w-3.5 h-3.5 text-[var(--gold)]" />
                  <span>أعلن معنا</span>
                </Link>
                <Link href="/about" className="text-stone-300 hover:text-white font-bold">
                  عن المنصة ←
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 3. شريط منظومة الشفافية والمواثيق المؤسسية الثمانية */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
            <span className="font-black text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
              <span>منظومة المواثيق المهنية والشفافية المؤسسية:</span>
            </span>
            <span className="text-stone-500">التزام كامل بمعايير الصحافة المستقلة لعام 2026</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {institutionalLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                    item.urgent
                      ? "bg-red-600/20 border border-red-500/30 text-red-300 hover:bg-red-600/30"
                      : "bg-white/[0.04] border border-white/10 text-stone-300 hover:text-[var(--gold)] hover:border-[var(--gold)]/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 4. السطر الختامي والحقوق */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <p className="text-center sm:text-start">
            © {new Date().getFullYear()} منصة <strong className="text-white">الوطن اليوم (Al-Watan Today)</strong>. جميع الحقوق محفوظة — فلسطين والوطن العربي.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/en" className="hover:text-[var(--gold)] font-bold transition-colors">
              English Edition
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/how-we-aggregate" className="hover:text-white transition-colors">
              منهجية الرصد الآلي
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/rss.xml" className="hover:text-white transition-colors font-mono">
              RSS Feed
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/admin" className="text-[var(--gold)]/80 hover:text-[var(--gold)] font-bold transition-colors">
              غرفة التحرير
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
