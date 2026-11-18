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
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-2 border-[var(--gold)]/50 bg-gradient-to-b from-[#200008] via-[#140005] to-[#0A0002] text-white mt-24 text-sm transition-colors relative overflow-hidden">
      {/* وميض جمالي خلفي خافت */}
      <div className="absolute top-0 inset-x-0 h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-rose-950/20 to-transparent pointer-events-none" />

      {/* 1. قسم محراب النشرة الصباحية الملكية */}
      <div className="border-b border-white/10 py-12 bg-gradient-to-r from-[#2A000B] via-[#3D0010] to-[#2A000B] relative">
        <div className="container-custom flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] animate-ping" />
              <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider">
                إيجاز الصباح الملكي · منصة الوطن اليوم
              </span>
              <span className="text-[10px] bg-white/10 text-white/90 px-2.5 py-0.5 rounded-full font-bold border border-white/10">
                مجاني 100% · بلا إعلانات متطفلة
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
            className="flex flex-col sm:flex-row items-center gap-2.5 w-full max-w-md"
          >
            <input
              type="email"
              required
              placeholder="أدخل بريدك الإلكتروني المعتمد..."
              className="w-full sm:flex-1 px-4 py-3.5 rounded-2xl border border-[var(--gold)]/40 bg-black/50 text-white placeholder-white/40 text-xs focus:outline-hidden focus:border-[var(--gold)] shadow-inner transition-colors backdrop-blur-md"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--gold)] via-[#F5B900] to-[#DCA600] text-[#140005] text-xs font-black hover:shadow-xl hover:shadow-[var(--gold-glow)] transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
              <span>اشتراك فوري</span>
            </button>
          </form>
        </div>
      </div>

      {/* 2. شريط شراكة يلا سبورت الرياضية الحصرية */}
      <div className="border-b border-white/10 py-5 bg-[#082214]/80">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
              ⚽
            </div>
            <div>
              <span className="text-[11px] font-black text-emerald-400 block uppercase tracking-wider">الشريك الرياضي الحصري</span>
              <span className="text-sm sm:text-base font-black text-white">منظومة يلا سبورت (YallaSport) للتغطيات الكروية والمباريات المباشرة</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold">
            <a
              href="https://yallasport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>yallasport.com</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </a>
            <a
              href="https://yallasport1.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>yallasport1.com</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. الأعمدة التحريرية الخمسة الكبرى (The 5 Editorial Pillars) */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* العمود الأول (4 أعمدة): الهوية والسيادة التحريرية */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo variant="header" />
            
            <p className="text-xs text-stone-300 leading-relaxed font-normal pt-2">
              منصة إخبارية رقمية فلسطينية عربية متكاملة، تلتزم بالقاموس الوطني الموحد، وتنسب كافة التغطيات لمصادرها الأصلية المعتمدة وفق ميثاق الشفافية ومكافحة التضليل وسجل التصحيحات العلني.
            </p>

            {/* شارة الشرف والاعتماد الصحفي */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-[var(--gold)]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>ميثاق النزاهة وحماية الملكية الفكرية</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                صفر محتوى وهمي · صفر أرقام مفبركة · التزام كامل بروابط المصادر الأصلية وتوثيق وكالات الأنباء الدولية والمحلية.
              </p>
            </div>

            {/* شارات المتابعة عبر السوشيال ميديا الرسمية */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <a
                href="https://t.me/alwatantoday"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>تلغرام</span>
              </a>
              <a
                href="https://whatsapp.com/channel/alwatantoday"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>واتساب</span>
              </a>
              <a
                href="https://twitter.com/alwatantoday"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>منصة X</span>
              </a>
              <a
                href="https://facebook.com/alwatantoday"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>فيسبوك</span>
              </a>
            </div>
          </div>

          {/* العمود الثاني (2 أعمدة): فلسطين والميدان والخدمات */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-black text-sm text-[var(--gold)] border-b border-white/10 pb-2">
              فلسطين والميدان
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
              <li>
                <Link href="/palestine/gaza" className="hover:text-[var(--gold)] transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>غزة الميدان والتوثيق</span>
                </Link>
              </li>
              <li>
                <Link href="/palestine/jerusalem" className="hover:text-[var(--gold)] transition-colors">
                  القدس والمسجد الأقصى
                </Link>
              </li>
              <li>
                <Link href="/palestine/west-bank" className="hover:text-[var(--gold)] transition-colors">
                  الضفة الغربية والمخيمات
                </Link>
              </li>
              <li>
                <Link href="/aid" className="hover:text-[var(--gold)] transition-colors text-amber-300 font-bold">
                  دليل المساعدات والإغاثة
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-[var(--gold)] transition-colors text-sky-300 font-bold">
                  بوابة الشواغر والوظائف
                </Link>
              </li>
              <li>
                <Link href="/atlas" className="hover:text-[var(--gold)] transition-colors text-emerald-400 font-bold">
                  أطلس فلسطين الجغرافي
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الثالث (2 أعمدة): الأقسام والشبكة الإخبارية */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-black text-sm text-[var(--gold)] border-b border-white/10 pb-2">
              الشبكة الإخبارية
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
              <li>
                <Link href="/sports" className="hover:text-[var(--gold)] transition-colors text-emerald-400 font-bold">
                  ساحة يلا سبورت والملاعب
                </Link>
              </li>
              <li>
                <Link href="/economy" className="hover:text-[var(--gold)] transition-colors">
                  أسواق المال والذهب
                </Link>
              </li>
              <li>
                <Link href="/arab-world" className="hover:text-[var(--gold)] transition-colors">
                  شؤون العالم العربي
                </Link>
              </li>
              <li>
                <Link href="/world" className="hover:text-[var(--gold)] transition-colors">
                  الشؤون الدولية
                </Link>
              </li>
              <li>
                <Link href="/tech" className="hover:text-[var(--gold)] transition-colors">
                  التقنية والذكاء الاصطناعي
                </Link>
              </li>
              <li>
                <Link href="/lifestyle" className="hover:text-[var(--gold)] transition-colors">
                  الصحة ونمط الحياة
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الرابع (2 أعمدة): الصحافة الرقمية والاستقصاء */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-black text-sm text-[var(--gold)] border-b border-white/10 pb-2">
              الصحافة الرقمية
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
              <li>
                <Link href="/fact-check" className="hover:text-[var(--gold)] transition-colors text-red-400 font-bold">
                  رادار الحقيقة ومكافحة التضليل
                </Link>
              </li>
              <li>
                <Link href="/ask" className="hover:text-[var(--gold)] transition-colors text-[var(--gold)] font-bold">
                  اسأل الوطن (الأرشيف الذكي)
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-[var(--gold)] transition-colors">
                  الصحافة المرئية وفيديو الوطن
                </Link>
              </li>
              <li>
                <Link href="/podcast" className="hover:text-[var(--gold)] transition-colors">
                  استوديو البودكاست والموجز
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-[var(--gold)] transition-colors">
                  تجمعات القصص والمصادر
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-[var(--gold)] transition-colors">
                  تحدي الذاكرة الوطنية
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود الخامس (2 أعمدة): الحوكمة والمؤسسة */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-black text-sm text-[var(--gold)] border-b border-white/10 pb-2">
              المؤسسة والشفافية
            </h4>
            <ul className="space-y-2 text-xs text-stone-300 font-medium">
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
                <Link href="/submit-news" className="hover:text-[var(--gold)] transition-colors text-[var(--gold)] font-bold">
                  تقديم بلاغ أو خبر صحفي
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-[var(--gold)] transition-colors">
                  حقوق النشر (DMCA)
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[var(--gold)] transition-colors">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[var(--gold)] transition-colors">
                  شروط الاستخدام
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
      </div>

      {/* 4. شريط الذهب المعتق السفلي وحقوق الملكية الفكرية */}
      <div className="border-t border-white/10 py-6 bg-black/60 text-xs text-stone-400">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
            <span className="font-mono text-white/90 font-bold">
              جميع الحقوق محفوظة لمنصة «الوطن اليوم» © {new Date().getFullYear()}
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="hidden sm:inline text-[var(--gold)] font-mono font-bold">alwatantoday.net</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
            <span>نسخة المنظومة التحريرية v2.0 الملكية</span>
            <span>•</span>
            <span className="text-emerald-400 font-bold">فلسطين عاصمتها القدس الشريف 🇵🇸</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
