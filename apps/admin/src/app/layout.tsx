import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { KillSwitchButton } from "@/components/KillSwitchButton";
import { InstantIngestButton } from "@/components/InstantIngestButton";

export const metadata: Metadata = {
  title: "غرفة الأخبار والتحرير — الوطن اليوم",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex">
        {/* الشريط الجانبي الثابت */}
        <aside className="w-64 border-s border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between p-4 shrink-0">
          <div className="space-y-6">
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] text-slate-950 font-black flex items-center justify-center text-sm">
                وطن
              </div>
              <div>
                <span className="font-bold text-sm block">غرفة التحرير والإدارة</span>
                <span className="text-[10px] text-[var(--text-muted)]">admin.alwatantoday.net</span>
              </div>
            </div>

            <nav className="space-y-1 text-xs font-semibold">
              <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--text)]">
                📊 لوحة القيادة
              </Link>
              <Link href="/excellence" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--gold,#F5B900)] bg-[var(--gold,#F5B900)]/10 font-bold">
                🎯 مؤشرات التميز الخمسة
              </Link>
              <Link href="/ads" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] text-amber-400 bg-amber-500/10 font-bold">
                📢 إدارة الإعلانات والرعايات
              </Link>
              <Link href="/live" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] text-rose-400 bg-rose-500/10 font-bold">
                🔴 التغطيات المباشرة اللحظية
              </Link>
              <Link href="/newsroom" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--text)]">
                📰 غرفة الأخبار والمسار
              </Link>
              <Link href="/newsroom/review" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] text-rose-400">
                ⏳ قائمة المراجعة البشرية
              </Link>
              <Link href="/articles" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--text)]">
                📝 المقالات والتصحيحات
              </Link>
              <Link href="/stories" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--text)]">
                📂 القصص المجمعة
              </Link>
              <Link href="/sources" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--text)]">
                📡 المصادر وخلاصات RSS
              </Link>
              <Link href="/economy" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--text)]">
                📈 مراقبة الأسعار
              </Link>
              <Link href="/sportslink" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--text)]">
                ⚽ تكامل يلا سبورت
              </Link>
              <Link href="/policies" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--text)]">
                ⚖️ سياسات النشر الآلي
              </Link>
              <Link href="/audit" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--text)]">
                📜 سجل التدقيق (Audit)
              </Link>
              <Link href="/users" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--surface-hover)] text-[var(--text)]">
                👥 المستخدمون والصلاحيات
              </Link>
            </nav>
          </div>

          <div className="p-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text-muted)]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[var(--text)]">محرر مناوب</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
            <p className="text-[10px]">admin@alwatantoday.net</p>
            <p className="text-[10px] text-emerald-400 mt-1">2FA مفعل</p>
          </div>
        </aside>

        {/* مساحة العمل الرئيسية */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* الشريط العلوي للوحة */}
          <header className="h-14 border-b border-[var(--border)] bg-[var(--surface)] px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs text-[var(--text-muted)]">نظام المعالجة المستمر: يعمل بصحة جيدة</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                متصل بالمصادر الحية
              </span>
            </div>
            <div className="flex items-center gap-3">
              <InstantIngestButton />
              <div className="h-4 w-px bg-[var(--border)]" />
              <KillSwitchButton />
            </div>
          </header>

          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}

