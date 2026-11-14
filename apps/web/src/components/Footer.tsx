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
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-gradient-to-b from-[#24050E] via-[#1A0208] to-[#140106] text-white mt-20 text-sm transition-colors">
      {/* 1. قسم الاشتراك في النشرة الإخبارية */}
      <div className="border-b border-white/10 py-10 bg-[#3D0010]/50">
        <div className="container-custom flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] animate-ping" />
              <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider">
                نشرة الوطن اليوم الذكية
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
              ابدأ صباحك بخلاصة الأحداث الأكثر دقة ومصداقية
            </h3>
            <p className="text-xs text-[#E4E7EB]/80 leading-relaxed">
              نرسل لك أهم التغطيات والتحليلات المنسوبة لمصادرها الأصلية إلى بريدك الإلكتروني كل صباح، بلا إعلانات متطفلة.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/newsletter";
            }}
            className="flex items-center gap-2 w-full max-w-md"
          >
            <input
              type="email"
              required
              placeholder="أدخل بريدك الإلكتروني..."
              className="flex-1 px-4 py-3 rounded-xl border border-[var(--border-gold)] bg-[#26000A]/80 text-white placeholder-[#E4E7EB]/50 text-xs focus:outline-hidden focus:border-[var(--gold)] shadow-inner transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#DCA600] text-[#140106] text-xs font-black hover:shadow-lg hover:shadow-[var(--gold-glow)] transition-all flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>اشتراك فوري</span>
            </button>
          </form>
        </div>
      </div>

      {/* 2. بانرات شراكة يلا سبورت الرياضية الرسمية */}
      <div className="border-b border-white/10 py-6 bg-[#0F2A44]/60">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--gold)] text-[#0F2A44] flex items-center justify-center font-black text-lg shadow-md">
              ⚽
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--gold)] block">الشريك الرياضي الحصري</span>
              <span className="text-sm font-black text-white">منصة يلا سبورت (YallaSport) وسبورت لايف</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
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
            <a
              href="https://yallasport1.com/live/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5 transition-colors font-black"
            >
              <Radio className="w-3 h-3 animate-pulse" />
              <span>بث المباريات مباشر</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. الأعمدة التحريرية الشاملة */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* العمود 1: هوية الصرح والنزاهة الصحفية */}
          <div className="space-y-4 lg:col-span-2">
            <BrandLogo variant="compact" />

            <p className="text-xs text-[#E4E7EB]/80 leading-relaxed max-w-sm">
              «الوطن اليوم» منصة إخبارية عربية شاملة تعيد بناء تجربة استهلاك الأخبار بمصداقية مطلقة؛ نجمع ونحلل التغطيات من كبرى الوكالات والمصادر الرسمية، بلا محتوى مضلل وبشفافية كاملة.
            </p>

            {/* ميثاق الشرف والنزاهة */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-[var(--border-gold)] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[var(--gold)] font-bold text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>قواعد النزاهة الصحفية غير القابلة للتفاوض:</span>
              </div>
              <p className="text-[11px] text-[#E4E7EB]/80 leading-relaxed">
                «لا خبر بلا مصدر • لا أرقام مفبركة • نسبة كاملة للمصادر مع روابطها • فلسطين أولاً وقضية مركزية • احترام تام لحقوق الملكية الفكرية»
              </p>
            </div>

            {/* حسابات التواصل الاجتماعي الرسمية للموقع السابق */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-[var(--gold)] block">تابعنا عبر منصاتنا الرسمية:</span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={OFFICIAL_SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-[#1877F2] text-xs font-semibold transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={OFFICIAL_SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-black text-xs font-semibold transition-colors"
                >
                  X (Twitter)
                </a>
                <a
                  href={OFFICIAL_SOCIAL_LINKS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-[#229ED9] text-xs font-semibold transition-colors"
                >
                  Telegram
                </a>
                <a
                  href={OFFICIAL_SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-[#FF0000] text-xs font-semibold transition-colors"
                >
                  YouTube
                </a>
                <a
                  href={OFFICIAL_SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-[#E4405F] text-xs font-semibold transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={OFFICIAL_SOCIAL_LINKS.tumblr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-[#34526f] text-xs font-semibold transition-colors"
                >
                  Tumblr
                </a>
              </div>
            </div>
          </div>

          {/* العمود 2: الأقسام الإخبارية (القديمة والجديدة) */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[var(--gold)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
              <span>الأقسام الرئيسية</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/palestine" className="hover:text-[var(--gold)] font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>فلسطين (أخبار اليوم)</span>
                </Link>
              </li>
              <li>
                <Link href="/aid" className="hover:text-[var(--gold)] font-bold text-amber-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>المساعدات (مساعدات اليوم)</span>
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-[var(--gold)] font-bold text-blue-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>الوظائف (الفهرس اليوم)</span>
                </Link>
              </li>
              <li>
                <Link href="/economy" className="hover:text-[var(--gold)] transition-colors">
                  الاقتصاد (اقتصاد اليوم)
                </Link>
              </li>
              <li>
                <Link href="/sports" className="hover:text-[var(--gold)] transition-colors">
                  الرياضة (الملاعب اليوم)
                </Link>
              </li>
              <li>
                <Link href="/tech" className="hover:text-[var(--gold)] transition-colors">
                  التقنية (تكنولوجيا اليوم)
                </Link>
              </li>
              <li>
                <Link href="/lifestyle" className="hover:text-[var(--gold)] transition-colors">
                  نمط الحياة (ستايل اليوم)
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-[var(--gold)] transition-colors">
                  فيديو (فيديوهات اليوم)
                </Link>
              </li>
              <li>
                <Link href="/society" className="hover:text-[var(--gold)] transition-colors">
                  المجتمع (المجتمع اليوم)
                </Link>
              </li>
              <li>
                <Link href="/arts" className="hover:text-[var(--gold)] transition-colors">
                  الفن والمشاهير (مشاهير اليوم)
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود 3: خدمات القراء وغرفة الأخبار */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[var(--gold)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--gold)]" />
              <span>الخدمات والتغطيات</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/live" className="hover:text-[var(--gold)] flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                  <span>البث المباشر المعتمد</span>
                </Link>
              </li>
              <li>
                <Link href="/breaking" className="hover:text-[var(--gold)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--breaking)] animate-ping" />
                  <span>شريط العواجل والتحديثات</span>
                </Link>
              </li>
              <li>
                <Link href="/economy" className="hover:text-[var(--gold)] flex items-center gap-1.5">
                  <span className="text-[var(--gold)] font-bold">$</span>
                  <span>أسواق الذهب والعملات والنفط</span>
                </Link>
              </li>
              <li>
                <Link href="/submit-news" className="hover:text-[var(--gold)] font-bold text-[var(--gold)] flex items-center gap-1">
                  <Megaphone className="w-3.5 h-3.5" />
                  <span>أرسل خبر لغرفة التحرير</span>
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="hover:text-[var(--gold)] flex items-center gap-1">
                  <span>للإعلان معنا والرعايات</span>
                </Link>
              </li>
              <li>
                <Link href="/design" className="hover:text-[var(--gold)] text-amber-200">
                  🎨 دليل نظام التصميم والهوية
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود 4: الشفافية والسياسات المؤسسية */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[var(--gold)] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[var(--gold)]" />
              <span>الشفافية والحقوق</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-[var(--gold)]">من نحن والرسالة التحريرية</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-[var(--gold)]">ميثاق الشرف الصحفي</Link></li>
              <li><Link href="/sources-policy" className="hover:text-[var(--gold)]">سياسة المصادر وحقوق الاقتباس</Link></li>
              <li><Link href="/how-we-aggregate" className="hover:text-[var(--gold)]">كيف نجمع الأخبار وندققها</Link></li>
              <li><Link href="/corrections" className="hover:text-[var(--gold)]">سجل الشفافية والتصحيحات</Link></li>
              <li><Link href="/dmca" className="hover:text-[var(--gold)]">حقوق الملكية الفكرية (DMCA)</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--gold)]">سياسة الخصوصية والبيانات</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--gold)]">اتفاقية شروط الخدمة</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--gold)] font-bold text-[var(--gold)]">اتصل بغرفة التحرير والإدارة ↗</Link></li>
            </ul>
          </div>
        </div>

        {/* 4. الشريط القانوني والسيو السفلي */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs gap-4 text-[#E4E7EB]/70">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} منصة «الوطن اليوم» (alwatantoday.net).</span>
            <span>كافة الحقوق محفوظة للمصادر والناشرين الأصليين.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <Link href="/news-sitemap.xml" className="hover:text-[var(--gold)] flex items-center gap-1">
              <Rss className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>خلاصات الأخبار (Google News)</span>
            </Link>
            <span>•</span>
            <Link href="/sitemap.xml" className="hover:text-[var(--gold)]">
              خريطة الموقع (Sitemap)
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1 text-[var(--gold)] font-bold">
              <Heart className="w-3 h-3 fill-current text-[var(--breaking)]" />
              <span>فلسطين في القلب والوجدان دائماً</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
