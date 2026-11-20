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
} from "lucide-react";

export function InstitutionalNav({ current }: { current?: string } = {}) {
  const pathname = usePathname();

  const links = [
    { href: "/editorial-policy", label: "ميثاق الشرف", icon: FileCheck2 },
    { href: "/corrections", label: "سجل التصحيحات", icon: Scale },
    { href: "/sources-policy", label: "عزو المصادر", icon: FileSearch },
    { href: "/submit-news", label: "تقديم بلاغ سري", icon: Radio, highlight: true },
    { href: "/dmca", label: "حقوق النشر (DMCA)", icon: ShieldCheck },
    { href: "/privacy", label: "الخصوصية والبيانات", icon: Lock },
    { href: "/terms", label: "شروط الاستخدام", icon: FileText },
    { href: "/contact", label: "اتصل بهيئة التحرير", icon: Mail },
  ];

  return (
    <div className="w-full bg-[#0a0507] text-white border-b border-white/10 relative z-20 py-3 px-4 shadow-xl">
      {/* سطر الشهادة المؤسسية والختم الرقمي */}
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 pb-3 mb-2 border-b border-white/5 text-xs text-white/70">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[var(--gold)]/20 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)]">
            <Award className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-white tracking-wide">
            منظومة الشفافية والمساءلة المؤسسية — صحافة حرة، مستقلة، ومسؤولة
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-[var(--gold)]">
            <Sparkles className="w-3 h-3" />
            <span>معتمدة بالختم التحريري لعام 2026</span>
          </span>
          <span className="text-white/30 hidden sm:inline">•</span>
          <Link
            href="/"
            className="text-white/60 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>العودة للرئيسية</span>
            <ChevronLeft className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* شريط الأقسام الكبسولي الفاخر بتأثير الزجاج الداكن واللمعان الذهبي */}
      <nav
        aria-label="التنقل بين الوثائق المؤسسية"
        className="flex items-center gap-2 overflow-x-auto scrollbar-none py-2 px-1 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md"
      >
        {links.map((link) => {
          const isActive = pathname === link.href || current === link.href.replace("/", "");
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 shrink-0 ${
                isActive
                  ? "bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] font-black shadow-lg shadow-[var(--gold-glow)] scale-102"
                  : link.highlight
                  ? "bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default InstitutionalNav;
