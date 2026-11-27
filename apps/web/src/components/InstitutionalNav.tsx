"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldCheck,
  Scale,
  FileCheck2,
  FileSearch,
  Radio,
  Lock,
  FileText,
  Mail,
  Award,
  Sparkles,
  ChevronLeft,
  ArrowUpRight,
  Fingerprint,
} from "lucide-react";

export interface InstitutionalNavProps {
  current?: string;
}

export function InstitutionalNav({ current }: InstitutionalNavProps = {}) {
  const pathname = usePathname();

  const links = [
    {
      href: "/editorial-policy",
      label: "ميثاق الشرف التحريري",
      shortLabel: "ميثاق الشرف",
      icon: FileCheck2,
      badge: "دستوري",
    },
    {
      href: "/corrections",
      label: "سجل التصحيحات العلني",
      shortLabel: "التصحيحات",
      icon: Scale,
      badge: "شفافية",
    },
    {
      href: "/sources-policy",
      label: "سياسة عزو المصادر",
      shortLabel: "عزو المصادر",
      icon: FileSearch,
      badge: "تحقق جنائي",
    },
    {
      href: "/submit-news",
      label: "قناة التسريبات المشفرة",
      shortLabel: "تسريب سري",
      icon: Radio,
      badge: "Zero-Trace",
      highlight: true,
    },
    {
      href: "/dmca",
      label: "حقوق النشر (DMCA)",
      shortLabel: "الملكية الفكرية",
      icon: ShieldCheck,
      badge: "حماية",
    },
    {
      href: "/privacy",
      label: "الخصوصية وأمان البيانات",
      shortLabel: "الخصوصية",
      icon: Lock,
      badge: "لا تتبع",
    },
    {
      href: "/terms",
      label: "شروط الاستخدام والنزاهة",
      shortLabel: "شروط الاستخدام",
      icon: FileText,
      badge: "قانوني",
    },
    {
      href: "/contact",
      label: "الاتصال بهيئة التحرير",
      shortLabel: "الاتصال المباشر",
      icon: Mail,
      badge: "24/7",
    },
  ];

  return (
    <header className="w-full bg-[#090204]/95 text-white border-b border-[var(--gold)]/20 relative z-30 shadow-2xl backdrop-blur-xl">
      {/* 1. الشريط العلوي الملكي: ختم الشفافية والمساءلة المؤسسية */}
      <div className="border-b border-white/5 bg-gradient-to-r from-black/60 via-[#18040a]/80 to-black/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* الجانب الأيمن: الختم المؤسسي والتصريح الرسمي */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[var(--gold)]/25 to-amber-700/20 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] shadow-xs">
              <Award className="w-4 h-4" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-black text-white text-xs tracking-tight">
                منظومة المواثيق المهنية والشفافية المؤسسية
              </span>
              <span className="hidden md:inline text-[11px] text-[var(--gold)]/80 font-medium">
                · صرح الوطن اليوم الصحفي المستقل
              </span>
            </div>
          </div>

          {/* الجانب الأيسر: شارات الحصانة والعودة للرئيسية */}
          <div className="flex items-center gap-3 text-[11px]">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>غرفة التحرير متصلة 24/7</span>
            </div>

            <div className="flex items-center gap-1 text-[var(--gold)]/90">
              <Fingerprint className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span className="font-mono text-[10px]">الاعتماد التحريري 2026</span>
            </div>

            <span className="text-white/20 hidden sm:inline">|</span>

            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-[var(--gold)]/15 border border-white/10 hover:border-[var(--gold)]/40 text-stone-300 hover:text-white transition-all duration-200 text-xs font-bold"
            >
              <span>الرئيسية</span>
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-[var(--gold)]" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. شريط الكبسولات الفاخر للتنقل بين الوثائق الثماني */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <nav
          aria-label="التنقل بين الوثائق المؤسسية الثماني"
          className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 px-1 rounded-2xl bg-black/40 border border-white/10 shadow-inner backdrop-blur-md"
        >
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (current && (current === link.href.replace("/", "") || current === link.href));
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 shrink-0 border ${
                  isActive
                    ? "bg-gradient-to-r from-[var(--gold)] via-amber-400 to-[#dca600] text-[#120005] border-[var(--gold)] font-black shadow-lg shadow-[var(--gold-glow)] scale-[1.02]"
                    : link.highlight
                    ? "bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border-emerald-500/30 hover:border-emerald-500/50"
                    : "text-stone-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border-white/5 hover:border-white/15"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                    isActive
                      ? "text-[#120005]"
                      : link.highlight
                      ? "text-emerald-400"
                      : "text-[var(--gold)] group-hover:scale-110"
                  }`}
                />
                <span className="hidden sm:inline">{link.label}</span>
                <span className="inline sm:hidden">{link.shortLabel}</span>

                {/* شارة التميز الصغيرة */}
                {link.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                      isActive
                        ? "bg-[#120005]/20 text-[#120005] font-black"
                        : link.highlight
                        ? "bg-emerald-400/20 text-emerald-300"
                        : "bg-white/10 text-stone-400 group-hover:text-stone-200"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default InstitutionalNav;
