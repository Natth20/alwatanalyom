"use client";

import Link from "next/link";
import { SITE_SECTIONS } from "@awt/shared";
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
} from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--bg)] mt-20 text-sm text-[var(--text-muted)] transition-colors">
      {/* 1. قسم الاشتراك السريع في النشرة الصباحية */}
      <div className="border-b border-[var(--border)]/70 py-10 bg-[var(--surface-hover)]/30">
        <div className="container-custom flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-black text-[var(--primary)] uppercase tracking-wider">
                النشرة الإخبارية الذكية
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-[var(--text)] tracking-tight">
              ابدأ صباحك بخلاصة الأحداث العالمية الأكثر دقة
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              نرسل لك أهم 5 تحليلات وعواجل ميدانية مع التحقق من المصادر الأصلية مباشرة إلى بريدك الإلكتروني كل صباح، بلا إعلانات متطفلة.
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
              className="flex-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-xs focus:outline-hidden focus:border-[var(--primary)] shadow-inner transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white text-xs font-bold hover:shadow-lg hover:shadow-[var(--primary-glow)] transition-all flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>اشتراك فوري</span>
            </button>
          </form>
        </div>
      </div>

      {/* 2. الأعمدة التحريرية الشاملة */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* العمود 1: هوية الصرح */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center font-black text-xl shadow-md border border-emerald-400/30">
                وطن
              </div>
              <div className="space-y-0.5">
                <span className="text-2xl font-black text-[var(--text)] block leading-none editorial-title">
                  الوطن اليوم
                </span>
                <span className="text-[10px] text-[var(--text-muted)] tracking-wider block">
                  ALWATAN TODAY · الصرح الإخباري المستقل
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed max-w-sm">
              المنصة الإخبارية العربية الأولى التي تعيد تعريف استهلاك الأخبار؛ نجمع ونحلل التغطيات الميدانية من كبرى الوكالات العالمية، ونكشف زوايا الانحياز الصحفي بمصادر موثقة وشفافية كاملة.
            </p>

            <div className="p-3.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>ميثاق الشرف والنزاهة الرقمية:</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                «لا خبر بلا مصدر أصلي • لا أرقام مفبركة • فلسطين أولاً وقضية مركزية • احترام كامل لحقوق الملكية الفكرية والاقتباس»
              </p>
            </div>
          </div>

          {/* العمود 2: الأقسام الإخبارية */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
              <span>الأقسام الرئيسية</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/palestine" className="hover:text-[var(--primary)] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>فلسطين وغزة</span>
                </Link>
              </li>
              <li>
                <Link href="/breaking" className="hover:text-[var(--breaking)] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  <span>شريط العواجل</span>
                </Link>
              </li>
              {SITE_SECTIONS.filter((s) => s.slug !== "palestine").map((sec) => (
                <li key={sec.slug}>
                  <Link href={`/${sec.slug}`} className="hover:text-[var(--primary)] transition-colors">
                    {sec.nameAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود 3: الأدوات والميزات الحصرية */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>الميزات والمختبرات</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/live" className="hover:text-[var(--primary)] flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                  <span>غرفة العمليات والبث الحي</span>
                </Link>
              </li>
              <li>
                <Link href="/economy" className="hover:text-[var(--primary)] flex items-center gap-1.5">
                  <span className="text-amber-500 font-bold">$</span>
                  <span>الوطن الاقتصادي والذهب</span>
                </Link>
              </li>
              <li>
                <Link href="/fact-check" className="hover:text-[var(--primary)] flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>رادار الحقيقة والـ Fact-Check</span>
                </Link>
              </li>
              <li>
                <Link href="/ask" className="hover:text-[var(--primary)]">
                  🤖 اسأل غرفة الأخبار (AI)
                </Link>
              </li>
              <li>
                <Link href="/atlas" className="hover:text-[var(--primary)]">
                  🗺️ أطلس فلسطين والعالم
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-[var(--primary)]">
                  📱 موجز الستوري والشورتس
                </Link>
              </li>
              <li>
                <Link href="/podcast" className="hover:text-[var(--primary)]">
                  🎙️ استوديو البودكاست
                </Link>
              </li>
              <li>
                <Link href="/games" className="hover:text-[var(--primary)]">
                  🧠 تحدي المعلومات اليومي
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود 4: الشفافية والسياسات الرسمية */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[var(--text)] flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500" />
              <span>الشفافية والحقوق</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-[var(--primary)]">من نحن والرسالة التحريرية</Link></li>
              <li><Link href="/how-we-aggregate" className="hover:text-[var(--primary)]">كيف نجمع الأخبار ونتحقق منها</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-[var(--primary)]">ميثاق الشرف ومعجم المصطلحات</Link></li>
              <li><Link href="/sources-policy" className="hover:text-[var(--primary)]">سياسة المصادر وحقوق الاقتباس</Link></li>
              <li><Link href="/corrections" className="hover:text-[var(--primary)]">سجل التصحيحات والشفافية</Link></li>
              <li><Link href="/dmca" className="hover:text-[var(--primary)]">إزالة المحتوى والملكية (DMCA)</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--primary)]">الخصوصية وانعدام التتبع</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--primary)]">شروط الاستخدام والخدمة</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--primary)] font-bold text-[var(--primary)]">اتصل بغرفة التحرير والإدارة ↗</Link></li>
            </ul>
          </div>
        </div>

        {/* 3. الشريط القانوني السفلي */}
        <div className="border-t border-[var(--border)] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} منصة «الوطن اليوم» (alwatantoday.net).</span>
            <span className="text-[var(--text-muted)]">كافة الحقوق محفوظة للناشرين والوكالات الأصلية.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            <Link href="/news-sitemap.xml" className="hover:text-[var(--primary)] flex items-center gap-1">
              <Rss className="w-3.5 h-3.5" />
              <span>خلاصات الأخبار</span>
            </Link>
            <span>•</span>
            <Link href="/sitemap.xml" className="hover:text-[var(--primary)]">
              خريطة الموقع (Sitemap)
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1 text-[var(--primary)] font-bold">
              <Heart className="w-3 h-3 fill-current text-rose-500" />
              <span>فلسطين في القلب والوجدان دائماً</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
