"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import {
  Globe2,
  ShieldCheck,
  Radio,
  FileCheck2,
  Mail,
  Send,
  Sparkles,
  Heart,
  Rss,
  Lock,
  ExternalLink,
  PhoneCall,
  Megaphone,
  MapPin,
  Bot,
  Award,
  ChevronLeft,
  HeartHandshake,
  Briefcase,
  TrendingUp,
  Trophy,
  Map,
  Film,
  Headphones,
  Bell,
  Scale,
  CheckCircle2,
  ArrowUp,
  Clock,
  Layers,
  FileSearch,
  Coins,
  Compass,
} from "lucide-react";

export function Footer() {
  const pathname = usePathname();

  // عدم عرض فوتر الموقع العام في كابينة الإدارة
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const [times, setTimes] = useState({
    jerusalem: "",
    mecca: "",
    cairo: "",
    london: "",
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimes({
        jerusalem: now.toLocaleTimeString("ar-EG", { timeZone: "Asia/Jerusalem", hour: "2-digit", minute: "2-digit" }),
        mecca: now.toLocaleTimeString("ar-EG", { timeZone: "Asia/Riyadh", hour: "2-digit", minute: "2-digit" }),
        cairo: now.toLocaleTimeString("ar-EG", { timeZone: "Africa/Cairo", hour: "2-digit", minute: "2-digit" }),
        london: now.toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" }),
      });
    };
    updateTimes();
    const interval = setInterval(updateTimes, 30000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t-2 border-[var(--gold)]/40 bg-gradient-to-b from-[#180006] via-[#100004] to-[#080002] text-white mt-24 text-sm transition-colors relative overflow-hidden">
      {/* هالة أورورا ضوئية خافتة خلف الفوتر */}
      <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-[var(--maroon)]/20 to-transparent pointer-events-none" />

      {/* 1. محراب إيجاز الصباح الملكي (The Royal Newsletter Sanctuary) */}
      <div className="border-b border-white/10 py-12 bg-gradient-to-r from-[#220009] via-[#35000e] to-[#220009] relative">
        <div className="container-custom max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8 px-4 sm:px-6 relative z-10">
          <div className="space-y-2.5 max-w-2xl text-center lg:text-right">
            <div className="inline-flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] animate-ping" />
              <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider">
                إيجاز الصباح الملكي · منصة «الوطن اليوم»
              </span>
              <span className="text-[10px] bg-white/10 text-white/90 px-2.5 py-0.5 rounded-full font-bold border border-white/10">
                مجاني 100% · معتمد بمصادره الأصلية
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              ابدأ صباحك بخلاصة الأخبار الأكثر دقة ومصداقية
            </h3>
            <p className="text-xs md:text-sm text-stone-300 leading-relaxed">
              تصلك أهم التغطيات الميدانية، والتحليلات السياسية، ومؤشرات الذهب والأسواق المنسوبة لمصادرها الأصلية مباشرة إلى بريدك الإلكتروني كل صباح.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/newsletter";
            }}
            className="flex flex-col sm:flex-row items-center gap-2.5 w-full max-w-md mx-auto lg:mx-0"
          >
            <input
              type="email"
              required
              placeholder="أدخل بريدك الإلكتروني المهني المعتمد..."
              className="w-full sm:flex-1 px-4 py-3.5 rounded-2xl border border-[var(--gold)]/40 bg-black/50 text-white placeholder-white/40 text-xs focus:outline-hidden focus:border-[var(--gold)] shadow-inner transition-colors backdrop-blur-md"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140005] text-xs font-black hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-lg shadow-[var(--gold-glow)]"
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
              <span>اشتراك فوري</span>
            </button>
          </form>
        </div>
      </div>

      {/* 2. شريط شراكة يلا سبورت ومؤشرات العواصم الإقليمية */}
      <div className="border-b border-white/10 py-3 bg-[#082214]/80 backdrop-blur-md">
        <div className="container-custom max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black text-base shadow-md shrink-0">
              ⚡
            </div>
            <div>
              <span className="font-black text-xs text-emerald-400 block">يلا سبورت · الشريك الرياضي الرسمي</span>
              <span className="text-[11px] text-stone-300">تغطيات مباريات اليوم الحية، دوري أبطال أوروبا، وتحليلات الكرة العالمية</span>
            </div>
          </div>

          {/* ساعات العواصم الحية */}
          <div className="flex items-center gap-4 text-xs font-mono text-stone-300">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>القدس: {times.jerusalem || "12:00"}</span>
            </span>
            <span className="text-white/20">·</span>
            <span>مكة: {times.mecca || "12:00"}</span>
            <span className="text-white/20">·</span>
            <span>القاهرة: {times.cairo || "11:00"}</span>
            <span className="text-white/20">·</span>
            <span>لندن: {times.london || "09:00"}</span>
          </div>
        </div>
      </div>

      {/* 3. الأروقة الخمسة المهيبة لصرح الوطن اليوم (The Five Architectural Wings) */}
      <div className="container-custom max-w-7xl mx-auto py-16 px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* الرواق الأول: هوية الصرح والشعار الماسي الرسمي (4 أعمدة) */}
          <div className="lg:col-span-4 space-y-6 border-b lg:border-b-0 lg:border-e border-white/10 pb-8 lg:pb-0 lg:pe-8">
            <BrandLogo variant="footer" />

            <div className="space-y-2 text-xs text-stone-300 leading-relaxed">
              <p>
                صحافة رقمية سيادية تستند للتحقق الجنائي وتلتزم بعزو الأخبار إلى وكالاتها ومصادرها المعتمدة، لتقديم الحقيقة الكاملة دون تحريف أو تزييف.
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>مرخصة ومسجلة رسميًا · اعتماد النزاهة 2026</span>
              </div>
            </div>

            {/* روابط المنصات الرسمية */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-stone-300 hover:text-[var(--gold)] transition-colors"
                title="منصة X / تويتر"
              >
                𝕏
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-stone-300 hover:text-[var(--gold)] transition-colors"
                title="قناة تيليجرام الإخبارية"
              >
                ✈
              </a>
              <a
                href="/rss.xml"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-stone-300 hover:text-amber-500 transition-colors"
                title="خلاصة RSS الإخبارية المعتمدة"
              >
                <Rss className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="px-3.5 py-2 rounded-xl bg-[var(--maroon)] hover:bg-[#730020] border border-[var(--gold)]/30 text-[var(--gold)] text-xs font-black transition-colors ms-auto flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>اتصل بهيئة التحرير</span>
              </Link>
            </div>
          </div>

          {/* الأروقة الأربعة التحريرية (8 أعمدة) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {/* الرواق 2: فلسطين والميدان */}
            <div className="space-y-3">
              <h4 className="font-black text-sm text-emerald-400 border-b border-emerald-500/30 pb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>فلسطين والميدان</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-300">
                <li>
                  <Link href="/palestine/gaza" className="hover:text-[var(--gold)] transition-colors block">
                    قطاع غزة العزة
                  </Link>
                </li>
                <li>
                  <Link href="/palestine/jerusalem" className="hover:text-[var(--gold)] transition-colors block">
                    القدس الشريف والأقصى
                  </Link>
                </li>
                <li>
                  <Link href="/palestine/west-bank" className="hover:text-[var(--gold)] transition-colors block">
                    الضفة والمخيمات
                  </Link>
                </li>
                <li>
                  <Link href="/atlas" className="hover:text-[var(--gold)] transition-colors block text-emerald-300 font-bold">
                    أطلس القرى المهجرة
                  </Link>
                </li>
                <li>
                  <Link href="/aid" className="hover:text-[var(--gold)] transition-colors block text-amber-300 font-bold">
                    المساعدات والإغاثة
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="hover:text-[var(--gold)] transition-colors block">
                    بوابة فرص العمل والتمكين
                  </Link>
                </li>
              </ul>
            </div>

            {/* الرواق 3: الشؤون الكبرى والرياضة */}
            <div className="space-y-3">
              <h4 className="font-black text-sm text-[var(--gold)] border-b border-[var(--gold)]/30 pb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
                <span>أقاليم وملاعب</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-300">
                <li>
                  <Link href="/arab-world" className="hover:text-[var(--gold)] transition-colors block">
                    العالم العربي والشرق الأوسط
                  </Link>
                </li>
                <li>
                  <Link href="/world" className="hover:text-[var(--gold)] transition-colors block">
                    عواصم القرار الدولي
                  </Link>
                </li>
                <li>
                  <Link href="/sports" className="hover:text-[var(--gold)] transition-colors block text-emerald-400 font-bold">
                    يلا سبورت والملاعب
                  </Link>
                </li>
                <li>
                  <Link href="/sports" className="hover:text-[var(--gold)] transition-colors block">
                    دوري أبطال أوروبا
                  </Link>
                </li>
                <li>
                  <Link href="/stories" className="hover:text-[var(--gold)] transition-colors block text-amber-300 font-bold">
                    تجمعات القصص والخطوط الزمنية
                  </Link>
                </li>
                <li>
                  <Link href="/breaking" className="hover:text-red-400 transition-colors block text-red-400 font-bold">
                    رادار العاجل 24/7
                  </Link>
                </li>
              </ul>
            </div>

            {/* الرواق 4: الاقتصاد والأسواق */}
            <div className="space-y-3">
              <h4 className="font-black text-sm text-amber-400 border-b border-amber-500/30 pb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>المال والأعمال</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-300">
                <li>
                  <Link href="/economy" className="hover:text-[var(--gold)] transition-colors block font-bold text-amber-300">
                    بورصة الأسواق والذهب
                  </Link>
                </li>
                <li>
                  <Link href="/economy" className="hover:text-[var(--gold)] transition-colors block">
                    حاسبة صرف العملات اللحظية
                  </Link>
                </li>
                <li>
                  <Link href="/economy" className="hover:text-[var(--gold)] transition-colors block">
                    أسعار المحروقات والسلع
                  </Link>
                </li>
                <li>
                  <Link href="/economy/instrument/BRENT" className="hover:text-[var(--gold)] transition-colors block">
                    نفط برنت والطاقة
                  </Link>
                </li>
                <li>
                  <Link href="/economy" className="hover:text-[var(--gold)] transition-colors block">
                    بورصة القدس للشركات
                  </Link>
                </li>
                <li>
                  <Link href="/tech" className="hover:text-[var(--gold)] transition-colors block">
                    التقنية والذكاء الاصطناعي
                  </Link>
                </li>
              </ul>
            </div>

            {/* الرواق 5: الصحافة الرقمية والشفافية */}
            <div className="space-y-3">
              <h4 className="font-black text-sm text-purple-400 border-b border-purple-500/30 pb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>الصحافة والشفافية</span>
              </h4>
              <ul className="space-y-2 text-xs text-stone-300">
                <li>
                  <Link href="/fact-check" className="hover:text-rose-400 transition-colors block font-bold text-rose-300">
                    رادار الحقيقة ومكافحة التضليل
                  </Link>
                </li>
                <li>
                  <Link href="/ask" className="hover:text-[var(--gold)] transition-colors block font-bold text-amber-300">
                    اسأل الوطن (الأرشيف الذكي AI)
                  </Link>
                </li>
                <li>
                  <Link href="/videos" className="hover:text-[var(--gold)] transition-colors block">
                    استوديو فيديو 4K السينمائي
                  </Link>
                </li>
                <li>
                  <Link href="/podcast" className="hover:text-[var(--gold)] transition-colors block">
                    استوديو البودكاست والموجز
                  </Link>
                </li>
                <li>
                  <Link href="/games" className="hover:text-[var(--gold)] transition-colors block text-purple-300 font-bold">
                    تحدي الذاكرة الوطنية والتراث
                  </Link>
                </li>
                <li>
                  <Link href="/editorial-policy" className="hover:text-[var(--gold)] transition-colors block">
                    ميثاق الشرف التحريري
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 4. شريط السيادة والاعتماد القانوني النهائي (The Sovereign Legal Bar) */}
      <div className="border-t border-white/10 bg-black/60 py-6 text-xs text-stone-400 relative z-10">
        <div className="container-custom max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px]">
            <span>© 2026 منصة «الوطن اليوم». كافة الحقوق محفوظة.</span>
            <span className="text-white/20">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              شروط الاستخدام
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              الخصوصية وأمان البيانات
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/sources-policy" className="hover:text-white transition-colors">
              سياسة عزو المصادر
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/corrections" className="hover:text-white transition-colors">
              سجل التصحيحات العلني
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/dmca" className="hover:text-white transition-colors">
              حقوق النشر (DMCA)
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/advertise" className="hover:text-[var(--gold)] font-bold transition-colors">
              الإعلان والرعاية
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-stone-300 hover:text-[var(--gold)] border border-white/10 transition-colors text-xs cursor-pointer shrink-0 shadow-xs"
            title="العودة لأعلى الصفحة"
          >
            <span>أعلى الصفحة</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
