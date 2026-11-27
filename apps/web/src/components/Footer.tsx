"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { OFFICIAL_SOCIAL_LINKS } from "@awt/shared";
import { BrandLogo } from "@/components/BrandLogo";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
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

  const socialItems = [
    { label: "فيسبوك", href: OFFICIAL_SOCIAL_LINKS.facebook },
    { label: "إكس", href: OFFICIAL_SOCIAL_LINKS.twitter },
    { label: "إنستغرام", href: OFFICIAL_SOCIAL_LINKS.instagram },
    { label: "تيليغرام", href: OFFICIAL_SOCIAL_LINKS.telegram },
    { label: "يوتيوب", href: OFFICIAL_SOCIAL_LINKS.youtube },
  ];

  return (
    <footer className="bg-[#090103] text-white border-t border-[var(--gold)]/25 mt-20 no-print">
      <div className="container-custom pt-14 pb-10 space-y-12">
        {/* 1. الشريط الافتتاحي المرن: الهوية الهادئة + اشتراك إيجاز الفجر المدمج */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 max-w-2xl">
            <BrandLogo variant="compact" />
            <div className="space-y-1">
              <p className="text-xs sm:text-[13px] text-stone-300 leading-relaxed">
                منصة إعلامية رقمية عربية تضع <strong className="text-white">فلسطين أولاً</strong> — تغطية ميدانية موثقة ومؤشرات أسواق حية على مدار الساعة.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-400">
                {pulseStats && (
                  <>
                    <span className="text-emerald-400 font-bold">
                      ● {pulseStats.activeSourcesCount.toLocaleString("ar-EG")} مصدر معتمد
                    </span>
                    <span className="text-white/20">·</span>
                    <span>{pulseStats.totalPublishedArticles.toLocaleString("ar-EG")} مادة موثقة</span>
                  </>
                )}
                {times.jerusalem && (
                  <>
                    <span className="text-white/20">·</span>
                    <span>القدس <strong className="font-mono text-white/80">{times.jerusalem}</strong></span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* نموذج النشرة البريدية الخفيف بدون صندوق متضخم */}
          <div className="w-full lg:max-w-md space-y-2">
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex items-center rounded-full border border-white/15 focus-within:border-[var(--gold)]/60 bg-white/[0.03] p-1 transition-colors"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="اشترك في نشرة إيجاز الصباح ببريدك..."
                className="flex-1 bg-transparent px-4 py-2 text-xs text-white placeholder:text-stone-500 outline-none min-w-0"
              />
              <button
                type="submit"
                disabled={newsletterStatus.type === "loading"}
                className="px-5 py-2 rounded-full bg-[var(--gold)] hover:brightness-110 text-[#140106] text-xs font-black transition-all flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-60"
              >
                <Send className="w-3 h-3" />
                <span>{newsletterStatus.type === "loading" ? "جارٍ..." : "اشترك"}</span>
              </button>
            </form>

            {newsletterStatus.type === "success" && (
              <p className="text-[11px] text-emerald-400 flex items-center gap-1.5 px-2">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{newsletterStatus.message}</span>
              </p>
            )}
            {newsletterStatus.type === "error" && (
              <p className="text-[11px] text-rose-400 flex items-center gap-1.5 px-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{newsletterStatus.message}</span>
              </p>
            )}
          </div>
        </div>

        {/* 2. خريطة الموقع الصافية (4 أعمدة متناسقة بدون أيقونات أو إطارات زائدة) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-xs">
          <div className="space-y-4">
            <h3 className="font-black text-[var(--gold)] tracking-wide text-[11px] uppercase">
              التغطية الإخبارية
            </h3>
            <ul className="space-y-2.5 text-stone-300">
              {[
                { href: "/palestine", label: "فلسطين والميدان" },
                { href: "/breaking", label: "البث العاجل" },
                { href: "/arab-world", label: "العالم العربي" },
                { href: "/world", label: "الشؤون الدولية" },
                { href: "/economy", label: "الاقتصاد والذهب" },
                { href: "/sports", label: "استوديو يلا سبورت" },
                { href: "/aid", label: "بوابة المساعدات" },
                { href: "/jobs", label: "شواغر وفرص عمل" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[var(--gold)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-black text-[var(--gold)] tracking-wide text-[11px] uppercase">
              المختبرات والمنصات
            </h3>
            <ul className="space-y-2.5 text-stone-300">
              {[
                { href: "/live", label: "البث التلفزيوني المباشر" },
                { href: "/live-360", label: "عدسة التغطية 360°" },
                { href: "/fact-check", label: "رادار الحقيقة (OSINT)" },
                { href: "/pulse", label: "نبض البيانات الحية" },
                { href: "/atlas", label: "أطلس فلسطين الرقمي" },
                { href: "/history", label: "في مثل هذا اليوم" },
                { href: "/podcast", label: "صوت الوطن (بودكاست)" },
                { href: "/stories", label: "ملفات القصص المجمعة" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[var(--gold)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-black text-[var(--gold)] tracking-wide text-[11px] uppercase">
              المواثيق والشفافية
            </h3>
            <ul className="space-y-2.5 text-stone-300">
              {[
                { href: "/editorial-policy", label: "ميثاق الشرف التحريري" },
                { href: "/corrections", label: "سجل التصحيحات العلني" },
                { href: "/sources-policy", label: "سياسة عزو المصادر" },
                { href: "/submit-news", label: "تقديم بلاغ سري" },
                { href: "/dmca", label: "حقوق النشر (DMCA)" },
                { href: "/privacy", label: "الخصوصية والبيانات" },
                { href: "/terms", label: "شروط الاستخدام" },
                { href: "/contact", label: "اتصل بهيئة التحرير" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[var(--gold)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-black text-[var(--gold)] tracking-wide text-[11px] uppercase">
              المؤسسة والتواصل
            </h3>
            <ul className="space-y-2.5 text-stone-300">
              {[
                { href: "/about", label: "عن منصة الوطن اليوم" },
                { href: "/how-we-aggregate", label: "منهجية الرصد والتحقق" },
                { href: "/advertise", label: "أعلن معنا والرعايات" },
                { href: "/my-watan", label: "مساحتي الخاصة (وطني)" },
                { href: "/ask", label: "اسأل الوطن AI" },
                { href: "/en", label: "English Edition" },
                { href: "/admin", label: "كابينة غرفة التحرير" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[var(--gold)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-stone-400">
              {socialItems.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 3. السطر الختامي ومواقيت القدس الهادئة */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <p>
            © {new Date().getFullYear()} <strong className="text-white/90">الوطن اليوم</strong> — جميع الحقوق محفوظة.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {prayers && (
              <span className="text-stone-400">
                صلاة القدس: الفجر <strong className="font-mono text-white/80">{prayers.fajr}</strong> · الظهر <strong className="font-mono text-white/80">{prayers.dhuhr}</strong> · العصر <strong className="font-mono text-white/80">{prayers.asr}</strong> · المغرب <strong className="font-mono text-white/80">{prayers.maghrib}</strong> · العشاء <strong className="font-mono text-white/80">{prayers.isha}</strong>
              </span>
            )}
            <Link href="/rss.xml" className="hover:text-[var(--gold)] font-mono transition-colors">
              RSS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
