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
  title: "غرفة التحرير والإدارة — الوطن اليوم",
  robots: { index: false, follow: false },
};

const NAV_GROUPS = [
  {
    title: "العمليات والميدان",
    items: [
      { href: "/admin", label: "📊 لوحة القيادة والمراقبة", highlight: "default" },
      { href: "/admin/excellence", label: "🎯 مؤشرات التميز الخمسة", highlight: "gold" },
      { href: "/admin/ads", label: "📢 إدارة الإعلانات والرعايات", highlight: "amber" },
      { href: "/admin/live", label: "🔴 التغطيات المباشرة اللحظية", highlight: "rose" },
      { href: "/admin/newsroom", label: "📰 غرفة الأخبار والمسار", highlight: "default" },
      { href: "/admin/newsroom/review", label: "⏳ قائمة المراجعة البشرية", highlight: "rose-text" },
    ],
  },
  {
    title: "المحتوى والمصادر",
    items: [
      { href: "/admin/articles", label: "📝 المقالات والتصحيحات", highlight: "default" },
      { href: "/admin/stories", label: "📂 القصص المجمعة", highlight: "default" },
      { href: "/admin/sources", label: "📡 المصادر وخلاصات RSS", highlight: "default" },
      { href: "/admin/economy", label: "📈 مراقبة الأسعار", highlight: "default" },
      { href: "/admin/sportslink", label: "⚽ تكامل يلا سبورت", highlight: "default" },
    ],
  },
  {
    title: "الحوكمة والسياسات",
    items: [
      { href: "/admin/policies", label: "⚖️ سياسات النشر الآلي", highlight: "default" },
      { href: "/admin/audit", label: "📜 سجل التدقيق (Audit)", highlight: "default" },
      { href: "/admin/users", label: "👥 المستخدمون والصلاحيات", highlight: "default" },
    ],
  },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="min-h-screen bg-[#0E0407] text-slate-100 flex flex-col md:flex-row antialiased selection:bg-[var(--gold)]/30 selection:text-white"
      dir="rtl"
    >
      {/* 1. الشريط الجانبي الثابت — مطابقة تامة للصورة الرسمية */}
      <aside className="w-full md:w-64 lg:w-72 border-b md:border-b-0 md:border-s border-white/10 bg-[#16060B]/95 backdrop-blur-xl flex flex-col justify-between shrink-0 z-30">
        <div className="p-4 space-y-5">
          {/* رأس الشريط الجانبي: شعار وطن واسم الغرفة */}
          <div className="flex items-center gap-3 px-2 py-1 border-b border-white/10 pb-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-slate-950 font-black flex items-center justify-center text-base shadow-lg shadow-rose-950/40">
              وطن
            </div>
            <div>
              <span className="font-bold text-sm text-white block">غرفة التحرير والإدارة</span>
              <span className="text-[10px] text-slate-400 font-mono">admin.alwatantoday.net</span>
            </div>
          </div>

          {/* روابط التنقل الـ 14 */}
          <nav className="space-y-4 text-xs font-semibold">
            {NAV_GROUPS.map((group) => (
              <div key={group.title} className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400/70 px-3">
                  {group.title}
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    let styleClass = "text-slate-300 hover:text-white hover:bg-white/5";
                    if (item.highlight === "gold") {
                      styleClass = "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 font-bold border border-amber-500/20";
                    } else if (item.highlight === "amber") {
                      styleClass = "text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 font-bold border border-amber-500/20";
                    } else if (item.highlight === "rose") {
                      styleClass = "text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 font-bold border border-rose-500/20";
                    } else if (item.highlight === "rose-text") {
                      styleClass = "text-rose-400 hover:bg-rose-500/10 font-medium";
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all ${styleClass}`}
                      >
                        <span>{item.label}</span>
                        <ChevronLeft className="w-3.5 h-3.5 opacity-30 shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* بطاقة المشرف والعودة للموقع */}
        <div className="p-4 border-t border-white/10 bg-black/40 space-y-3">
          <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="font-bold text-xs text-white block">رئيس التحرير التنفيذي</span>
                <span className="text-[10px] text-slate-400">جلسة مشفرة</span>
              </div>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
              2FA مفعل
            </span>
          </div>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[var(--primary)] to-[var(--burgundy-hover)] text-white text-xs font-black shadow-md hover:brightness-110 transition-all border border-amber-500/20"
          >
            <span>زيارة الموقع العام للزوار</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* 2. مساحة العمل ومحتوى الصفحات */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* الشريط العلوي للوحة القيادة — مطابقة تامة لشريط الرأس في الصورة */}
        <header className="h-16 border-b border-white/10 bg-[#16060B]/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
          {/* الجانب الأيمن / الأوسط: حالة النظام والمصادر الحية */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              متصل بالمصادر الحية
            </span>
            <span className="hidden sm:inline-block text-xs text-slate-400">
              نظام المعالجة المستمر: يعمل بصحة جيدة
            </span>
          </div>

          {/* الجانب الأيسر: مفتاح الإيقاف الطارئ + جلب الأخبار الحية الآن */}
          <div className="flex items-center gap-2.5">
            <InstantIngestButton />
            <KillSwitchButton />
          </div>
        </header>

        {/* جسم الصفحة */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
