"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Info,
  Layers,
  FileCheck2,
  Share2,
  RotateCcw,
  ShieldAlert,
  Lock,
  Scale,
  Mail,
} from "lucide-react";


export const INSTITUTIONAL_LINKS = [
  { href: "/about", label: "من نحن ورؤيتنا التحريرية", icon: Info, tag: "الهوية" },
  { href: "/how-we-aggregate", label: "كيف نجمع الأخبار ونتحقق منها", icon: Layers, tag: "التقنية والتدقيق" },
  { href: "/editorial-policy", label: "ميثاق الشرف ومعجم المصطلحات", icon: FileCheck2, tag: "المعايير الصحفية" },
  { href: "/sources-policy", label: "سياسة المصادر وبوابة الناشرين", icon: Share2, tag: "حقوق الاقتباس" },
  { href: "/corrections", label: "سجل التصحيحات والشفافية", icon: RotateCcw, tag: "المصداقية العامة" },
  { href: "/dmca", label: "إزالة المحتوى وحماية الملكية (DMCA)", icon: ShieldAlert, tag: "الملكية الفكرية" },
  { href: "/privacy", label: "الخصوصية والأمان الرقمي", icon: Lock, tag: "انعدام التتبع" },
  { href: "/terms", label: "شروط الاستخدام والخدمة", icon: Scale, tag: "الضوابط القانونية" },
  { href: "/contact", label: "اتصل بغرفة التحرير والإدارة", icon: Mail, tag: "التواصل 24/7" },
];

export function InstitutionalNav() {
  const pathname = usePathname();

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-xs space-y-5 hover:border-emerald-500/30 transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <div>
            <h3 className="font-black text-base text-[var(--text)]">
              بوابة الشفافية والسياسات المؤسسية المعتمدة
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              الدليل الرسمي المرجعي لميثاق النزاهة وحقوق الناشرين والخصوصية في صرح «الوطن اليوم»
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[11px] px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 font-mono">
            9 وثائق مؤسسية
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3 text-xs">
        {INSTITUTIONAL_LINKS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group p-3.5 rounded-2xl border transition-all duration-200 ease-out flex flex-col justify-between gap-2.5 select-none hover:-translate-y-0.5 ${
                isActive
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20 font-bold scale-[1.01]"
                  : "bg-[var(--surface-card)] border-[var(--border)] text-[var(--text)] hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${
                      isActive ? "bg-white/20 text-white" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-bold line-clamp-1">{item.label}</span>
                </div>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] group-hover:border-emerald-500/40"
                  }`}
                >
                  {item.tag}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
