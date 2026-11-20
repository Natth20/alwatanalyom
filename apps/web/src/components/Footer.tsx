"use client";

import Link from "next/link";
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
} from "lucide-react";

export function Footer() {
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
        <div className="container-custom max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8 px-4 relative z-10">
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

      {/* 2. شريط شراكة يلا سبورت الرياضية الحصرية */}
      <div className="border-b border-white/10 py-4 bg-[#082214]/80 backdrop-blur-md">
        <div className="container-custom max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
              ⚽
            </div>
            <div>
              <span className="text-[10px] font-black text-emerald-400 block uppercase tracking-wider">الشريك الرياضي الحصري</span>
              <span className="text-xs sm:text-sm font-black text-white">منظومة يلا سبورت (YallaSport) للتغطيات الكروية والمباريات المباشرة</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold">
            <Link
              href="/sports"
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>جدول مباريات اليوم</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 3. الصرح الرئيسي للأروقة الخمسة (The 5 Imperial Pillars) */}
      <div className="container-custom max-w-7xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 items-start">
          {/* العمود الأول: الهوية الكبرى، الختم الرقمي، وساعات العواصم */}
          <div className="lg:col-span-4 space-y-6">
            <BrandLogo variant="footer" />

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              المنصة الإخبارية الوطنية الرائدة لتجميع وتنظيم وبث الأخبار بالذكاء الصحفي المتقدم. نلتزم بأعلى معايير الدقة والأمانة التحريرية ونسبة كل حرف إلى مصدره المعتمد.
            </p>

            {/* ساعات العواصم الإقليمية اللحظية */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-wider block flex items-center gap-1.5">
                <Clock className="w-3 h-3" />
                <span>ساعات العواصم الإخبارية الحية:</span>
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-white/50 block">القدس</span>
                  <span className="font-mono font-bold text-white text-xs">مباشر</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-white/50 block">عمان/القاهرة</span>
                  <span className="font-mono font-bold text-white text-xs">مباشر</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-white/50 block">لندن/UTC</span>
                  <span className="font-mono font-bold text-[var(--gold)] text-xs">GMT</span>
                </div>
              </div>
            </div>

            {/* ختم التحقق المؤسسي لعام 2026 */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[var(--maroon)]/40 border border-[var(--gold)]/30">
              <Award className="w-7 h-7 text-[var(--gold)] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-white block">معتمد بالختم التحريري لعام 2026</span>
                <span className="text-[10px] text-[var(--gold)]">عضوية مبادئ النزاهة الصحفية المفتوحة المصدر</span>
              </div>
            </div>
          </div>

          {/* العمود الثاني: فلسطين والميدان والقدس */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-black text-sm text-[var(--gold)] border-b border-white/10 pb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>فلسطين والميدان</span>
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
              <li><Link href="/palestine/gaza" className="hover:text-[var(--gold)] transition-colors">قطاع غزة العزة</Link></li>
              <li><Link href="/palestine/jerusalem" className="hover:text-[var(--gold)] transition-colors">القدس الشريف والأقصى</Link></li>
              <li><Link href="/palestine/west-bank" className="hover:text-[var(--gold)] transition-colors">الضفة الغربية والمخيمات</Link></li>
              <li><Link href="/atlas" className="hover:text-[var(--gold)] transition-colors text-emerald-400 font-bold">أطلس فلسطين التاريخي</Link></li>
              <li><Link href="/aid" className="hover:text-[var(--gold)] transition-colors">دليل المساعدات والإغاثة</Link></li>
              <li><Link href="/history" className="hover:text-[var(--gold)] transition-colors">الذاكرة والقرى المهجرة</Link></li>
            </ul>
          </div>

          {/* العمود الثالث: الصحافة الرقمية والاستقصاء */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-black text-sm text-[var(--gold)] border-b border-white/10 pb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[var(--gold)]" />
              <span>الصحافة الرقمية</span>
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
              <li><Link href="/fact-check" className="hover:text-rose-400 transition-colors text-rose-400 font-bold">رادار الحقيقة (Fact-Check)</Link></li>
              <li><Link href="/ask" className="hover:text-[var(--gold)] transition-colors text-[var(--gold)] font-bold">اسأل الوطن · الأرشيف الذكي</Link></li>
              <li><Link href="/videos" className="hover:text-[var(--gold)] transition-colors">الصحافة المرئية وفيديو 4K</Link></li>
              <li><Link href="/podcast" className="hover:text-[var(--gold)] transition-colors">استوديو البودكاست والموجز</Link></li>
              <li><Link href="/stories" className="hover:text-[var(--gold)] transition-colors">تجمعات القصص والخط الزمني</Link></li>
              <li><Link href="/games" className="hover:text-[var(--gold)] transition-colors">تحدي الذاكرة الوطنية</Link></li>
            </ul>
          </div>

          {/* العمود الرابع: المؤسسة والشفافية (الـ 8 صفحات المؤسسية بالكامل) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-black text-sm text-[var(--gold)] border-b border-white/10 pb-2 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>المؤسسة والشفافية</span>
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
              <li><Link href="/editorial-policy" className="hover:text-[var(--gold)] transition-colors">ميثاق الشرف التحريري</Link></li>
              <li><Link href="/corrections" className="hover:text-[var(--gold)] transition-colors">سجل التصحيحات العلني</Link></li>
              <li><Link href="/sources-policy" className="hover:text-[var(--gold)] transition-colors">سياسة عزو المصادر</Link></li>
              <li><Link href="/submit-news" className="hover:text-[var(--gold)] transition-colors text-[var(--gold)] font-bold">تقديم بلاغ سري (Whistleblower)</Link></li>
              <li><Link href="/dmca" className="hover:text-[var(--gold)] transition-colors">حقوق النشر (DMCA)</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--gold)] transition-colors">سياسة الخصوصية والبيانات</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--gold)] transition-colors">شروط وأحكام الاستخدام</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--gold)] transition-colors">الاتصال بهيئة التحرير</Link></li>
            </ul>
          </div>

          {/* العمود الخامس: غرف العمليات ولوحة الإدارة والتطبيقات */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-black text-sm text-[var(--gold)] border-b border-white/10 pb-2 flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-red-500" />
              <span>غرفة العمليات والإدارة</span>
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
              <li>
                <Link href="/admin" className="p-2.5 rounded-xl bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--gold)] hover:bg-[var(--gold)]/25 transition-all block font-black flex items-center justify-between">
                  <span>لوحة الإدارة والتحكم</span>
                  <ShieldCheck className="w-4 h-4" />
                </Link>
              </li>
              <li><Link href="/live" className="hover:text-red-400 transition-colors flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /><span>البث المباشر 24/7</span></Link></li>
              <li><Link href="/rss.xml" className="hover:text-[var(--gold)] transition-colors flex items-center gap-1"><Rss className="w-3.5 h-3.5 text-amber-500" /><span>خلاصة الأخبار (RSS)</span></Link></li>
              <li><Link href="/newsletter" className="hover:text-[var(--gold)] transition-colors">إدارة اشتراك النشرة</Link></li>
              <li><Link href="/advertise" className="hover:text-[var(--gold)] transition-colors">الإعلانات والرعايات التجارية</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. السطر السيادي الأخير وحقوق الملكية وزر الصعود */}
      <div className="border-t border-white/10 py-6 bg-black/70 text-xs text-stone-400">
        <div className="container-custom max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-center md:text-right">
            <span className="w-2 h-2 rounded-full bg-[var(--gold)] inline-block" />
            <span className="font-bold text-white/90">
              جميع الحقوق محفوظة لمنصة «الوطن اليوم» © {new Date().getFullYear()}
            </span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="text-[var(--gold)] font-mono font-bold">alwatantoday.net</span>
            <span className="text-white/20 hidden sm:inline">•</span>
            <span className="text-white/60">تشفير اتصالات TLS 1.3 معزز</span>
          </div>

          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
            title="العودة لأعلى الصفحة"
          >
            <span>العودة للأعلى</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
