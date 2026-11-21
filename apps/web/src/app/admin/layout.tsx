import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { KillSwitchButton } from "@/components/admin/KillSwitchButton";
import { InstantIngestButton } from "@/components/admin/InstantIngestButton";
import {
  LayoutDashboard,
  Award,
  Megaphone,
  Radio,
  Newspaper,
  Clock,
  FileText,
  Layers,
  Rss,
  TrendingUp,
  Trophy,
  Scale,
  ShieldCheck,
  Users,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";

export const metadata: Metadata = {
  title: "غرفة الأخبار والإدارة المتكاملة — الوطن اليوم",
  robots: { index: false, follow: false },
};

const NAV_GROUPS = [
  {
    title: "العمليات والميدان",
    items: [
      { href: "/admin", label: "لوحة القيادة والمراقبة", icon: LayoutDashboard },
      { href: "/admin/excellence", label: "مؤشرات التميز الخمسة", icon: Award, highlight: "gold" },
      { href: "/admin/live", label: "التغطيات المباشرة اللحظية", icon: Radio, highlight: "rose" },
      { href: "/admin/newsroom", label: "غرفة الأخبار والمسار", icon: Newspaper },
      { href: "/admin/newsroom/review", label: "قائمة المراجعة البشرية", icon: Clock, highlight: "amber" },
    ],
  },
  {
    title: "إدارة المحتوى والمصادر",
    items: [
      { href: "/admin/articles", label: "المقالات والتصحيحات", icon: FileText },
      { href: "/admin/stories", label: "القصص المجمعة", icon: Layers },
      { href: "/admin/sources", label: "المصادر وخلاصات RSS", icon: Rss },
      { href: "/admin/economy", label: "مراقبة أسعار الأسواق", icon: TrendingUp },
      { href: "/admin/sportslink", label: "تكامل يلا سبورت", icon: Trophy },
    ],
  },
  {
    title: "الرعايات والحوكمة",
    items: [
      { href: "/admin/ads", label: "إدارة الإعلانات والرعايات", icon: Megaphone, highlight: "emerald" },
      { href: "/admin/policies", label: "سياسات النشر الآلي", icon: Scale },
      { href: "/admin/audit", label: "سجل التدقيق الأمني", icon: ShieldCheck },
      { href: "/admin/users", label: "المستخدمون والصلاحيات", icon: Users },
    ],
  },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col md:flex-row antialiased selection:bg-[var(--gold)]/30 selection:text-white" dir="rtl">
      {/* 1. الشريط الجانبي الثابت والفاخر */}
      <aside className="w-full md:w-72 lg:w-80 border-b md:border-b-0 md:border-s border-white/10 bg-[#0B0F17]/95 backdrop-blur-xl flex flex-col justify-between shrink-0 z-30">
        <div className="p-4 sm:p-5 space-y-6">
          {/* هوية الصرح واللوغو الرسمي */}
          <div className="pb-4 border-b border-white/10">
            <div className="p-2.5 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
              <BrandLogo variant="compact" />
            </div>
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="text-xs font-black text-white/90">كابينة التحكم والسيادة</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                متصل بالنواة
              </span>
            </div>
          </div>

          {/* روابط التنقل المصنفة */}
          <nav className="space-y-6 text-xs font-medium">
            {NAV_GROUPS.map((group) => (
              <div key={group.title} className="space-y-1.5">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400/80 px-3">
                  {group.title}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    let styleClass = "text-slate-300 hover:text-white hover:bg-white/5";
                    if (item.highlight === "gold") {
                      styleClass = "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 font-bold border border-amber-500/20";
                    } else if (item.highlight === "rose") {
                      styleClass = "text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 font-bold border border-rose-500/20";
                    } else if (item.highlight === "amber") {
                      styleClass = "text-amber-300 hover:bg-amber-500/10";
                    } else if (item.highlight === "emerald") {
                      styleClass = "text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 font-bold border border-emerald-500/20";
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${styleClass}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 shrink-0" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronLeft className="w-3.5 h-3.5 opacity-40 shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* بطاقة المستخدم والتحكم أسفل الشريط الجانبي */}
        <div className="p-4 border-t border-white/10 bg-black/40 space-y-3">
          <div className="p-3 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-bold text-xs text-white">رئيس التحرير التنفيذي</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">admin@alwatantoday.net</p>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
              2FA مفعل
            </span>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--burgundy-hover)] text-white text-xs font-black shadow-lg hover:brightness-110 transition-all border border-amber-500/20"
          >
            <span>العودة للموقع العام للزوار</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* 2. مساحة العمل ومحتوى الصفحات */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* الشريط العلوي للوحة */}
        <header className="h-16 border-b border-white/10 bg-[#0B0F17]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs text-slate-400">محرك المعالجة والذكاء التحريري:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                متصل بـ 5 وكالات دولية
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* أزرار الإجراءات الفورية */}
            <InstantIngestButton />
            <KillSwitchButton />
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <span>الموقع المباشر</span>
              <ExternalLink className="w-3 h-3 text-[var(--gold)]" />
            </Link>
          </div>
        </header>

        {/* جسم الصفحة */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
