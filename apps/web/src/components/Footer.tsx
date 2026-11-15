"use client";

import Link from "next/link";
import { SITE_SECTIONS, OFFICIAL_SOCIAL_LINKS } from "@awt/shared";
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
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-2 border-[var(--gold)]/40 bg-gradient-to-b from-[#26000A] via-[#1A0007] to-[#0D0004] text-white mt-20 text-sm transition-colors relative overflow-hidden">
      {/* 1. قسم الاشتراك في النشرة الإخبارية الملكية */}
      <div className="border-b border-white/10 py-12 bg-[#3D0010]/60 relative">
        <div className="container-custom flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] animate-ping" />
              <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider">
                نشرة الوطن اليوم الصباحية
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              ابدأ صباحك بخلاصة الأخبار الأكثر دقة ومصداقية
            </h3>
            <p className="text-xs md:text-sm text-[#E4E7EB]/80 leading-relaxed">
              تصلك أهم التغطيات الميدانية والتحقيقات المنسوبة لمصادرها الأصلية إلى بريدك مباشرة كل صباح، بصفر إعلانات متطفلة وصفر محتوى وهمي.
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
              className="w-full sm:flex-1 px-4 py-3 rounded-xl border border-[var(--gold)]/40 bg-[#1A0007]/90 text-white placeholder-white/40 text-xs focus:outline-hidden focus:border-[var(--gold)] shadow-inner transition-colors"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--gold)] via-[#F5B900] to-[#DCA600] text-[#140106] text-xs font-black hover:shadow-lg hover:shadow-[var(--gold-glow)] transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
              <span>اشتراك فوري</span>
            </button>
          </form>
        </div>
      </div>

      {/* 2. بانرات شراكة يلا سبورت الرياضية الحصرية */}
      <div className="border-b border-white/10 py-5 bg-[#0F2A44]/70">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[var(--gold)] text-[#0F2A44] flex items-center justify-center font-black text-xl shadow-md shrink-0">
              ⚽
            </div>
            <div>
              <span className="text-[11px] font-bold text-[var(--gold)] block">الشريك الرياضي الحصري</span>
              <span className="text-sm font-black text-white">منظومة يلا سبورت (YallaSport) للتغطيات الكروية</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold">
            <a
              href="https://yallasport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-1.5 transition-colors"
            >
              <span>yallasport.com</span>
              <ExternalLink className="w-3 h-3 text-[var(--gold)]" />
            </a>
            <a
              href="https://yallasport1.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-1.5 transition-colors"
            >
              <span>yallasport1.com</span>
              <ExternalLink className="w-3 h-3 text-[var(--gold)]" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. شبكة الروابط التحريرية والأقسام الشاملة */}
      <div className="container-custom py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* العمود 1: هوية المنصة والرسالة */}
          <div className="col-span-2 space-y-4">
            <BrandLogo variant="header" />
            <p className="text-xs text-white/75 leading-relaxed max-w-sm">
              «الوطن اليوم» منصة إخبارية عربية شاملة ملتزمة بأعلى معايير النزاهة الصحفية والسرعة في نقل الحقيقة. نعتمد التوثيق الكامل لكل خبر من مصدره الأصلي بروابطه الصريحة وبصفر اختلاق.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-white/80">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[var(--gold)]" />
                القدس · غزة · رام الله · عواصم العالم
              </span>
            </div>
          </div>

          {/* العمود 2: الأقسام الإخبارية */}
          <div className="space-y-3 text-xs">
            <h4 className="font-black text-sm text-[var(--gold)] border-b border-white/10 pb-2">
              التغطيات الإخبارية
            </h4>
            <ul className="space-y-2 text-white/80">
              <li><Link href="/palestine" className="hover:text-[var(--gold)] transition-colors">🇵🇸 فلسطين أولاً</Link></li>
              <li><Link href="/arab-world" className="hover:text-[var(--gold)] transition-colors">العالم العربي</Link></li>
              <li><Link href="/world" className="hover:text-[var(--gold)] transition-colors">الشؤون الدولية</Link></li>
              <li><Link href="/economy" className="hover:text-[var(--gold)] transition-colors">الاقتصاد وأسواق المال</Link></li>
              <li><Link href="/sports" className="hover:text-[var(--gold)] transition-colors">الرياضة ويلا سبورت</Link></li>
              <li><Link href="/breaking" className="hover:text-red-400 font-bold transition-colors">الأخبار العاجلة</Link></li>
            </ul>
          </div>

          {/* العمود 3: الخدمات المتخصصة */}
          <div className="space-y-3 text-xs">
            <h4 className="font-black text-sm text-[var(--gold)] border-b border-white/10 pb-2">
              الخدمات والمساعدات
            </h4>
            <ul className="space-y-2 text-white/80">
              <li><Link href="/aid" className="hover:text-[var(--gold)] transition-colors">المساعدات والإغاثة</Link></li>
              <li><Link href="/jobs" className="hover:text-[var(--gold)] transition-colors">الوظائف والفرص</Link></li>
              <li><Link href="/lifestyle" className="hover:text-[var(--gold)] transition-colors">نمط الحياة والصحة</Link></li>
              <li><Link href="/tech" className="hover:text-[var(--gold)] transition-colors">التقنية والابتكار</Link></li>
              <li><Link href="/live" className="hover:text-[var(--gold)] transition-colors">البث المباشر والقنوات</Link></li>
            </ul>
          </div>

          {/* العمود 4: الذكاء التحريري والمصداقية */}
          <div className="space-y-3 text-xs">
            <h4 className="font-black text-sm text-[var(--gold)] border-b border-white/10 pb-2">
              الذكاء التحريري
            </h4>
            <ul className="space-y-2 text-white/80">
              <li><Link href="/ask" className="hover:text-[var(--gold)] transition-colors">اسأل الوطن اليوم</Link></li>
              <li><Link href="/fact-check" className="hover:text-[var(--gold)] transition-colors">مرصد رادار الحقيقة</Link></li>
              <li><Link href="/atlas" className="hover:text-[var(--gold)] transition-colors">أطلس فلسطين التاريخي</Link></li>
              <li><Link href="/stories" className="hover:text-[var(--gold)] transition-colors">تجمع القصص والموجزات</Link></li>
              <li><Link href="/podcast" className="hover:text-[var(--gold)] transition-colors">استوديو البودكاست</Link></li>
              <li><Link href="/submit-news" className="hover:text-[var(--gold)] transition-colors">إرسال خبر لغرفة التحرير</Link></li>
            </ul>
          </div>
        </div>

        {/* 4. الشفافية المؤسسية والسياسات التحريرية */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/70">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/about" className="hover:text-white transition-colors">من نحن</Link>
            <Link href="/editorial-policy" className="hover:text-white transition-colors">ميثاق الشرف والنزاهة</Link>
            <Link href="/sources-policy" className="hover:text-white transition-colors">سياسة المصادر</Link>
            <Link href="/how-we-aggregate" className="hover:text-white transition-colors">كيف نجمع الأخبار</Link>
            <Link href="/corrections" className="hover:text-white transition-colors">سجل التصحيحات العلني</Link>
            <Link href="/advertise" className="hover:text-white transition-colors">أعلن معنا</Link>
            <Link href="/contact" className="hover:text-white transition-colors">اتصل بنا</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-white transition-colors">شروط الاستخدام</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/rss.xml" className="text-white/60 hover:text-[var(--gold)] transition-colors" title="RSS Feed">
              <Rss className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 5. حقوق الملكية وشعار الصمود */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/60">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} لمنصة «الوطن اليوم» الإعلامية · Alwatan Today.
          </div>
          <div className="flex items-center gap-1.5 text-[var(--gold)] font-bold">
            <span>🇵🇸 فلسطين في القلب والوجدان · صحافة حرّة ومستقلة</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
