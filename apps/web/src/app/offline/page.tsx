import Link from "next/link";
import { Metadata } from "next";
import { WifiOff, Bookmark, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "أنت تتصفح دون اتصال بالإنترنت — الوطن اليوم",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div dir="rtl" className="container-custom py-16 md:py-24 max-w-lg mx-auto">
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/35 bg-[var(--surface)] dark:bg-gradient-to-b dark:from-[#1b1104]/90 dark:to-[#0e0407]/95 p-8 md:p-10 text-center shadow-2xl space-y-6">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-80" />

        <div className="w-20 h-20 rounded-3xl bg-amber-500/15 text-amber-500 border border-amber-500/35 flex items-center justify-center mx-auto shadow-lg">
          <WifiOff className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-[var(--text)] title-imperial">
            تعذر الاتصال بالشبكة حالياً
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
            يبدو أنك تتصفح دون اتصال بالإنترنت. يمكنك فتح خزنة المواد المحفوظة مسبقاً على جهازك، وسيعاود الموقع التحديث تلقائياً فور عودة الشبكة.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/saved"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] text-xs font-black shadow-md hover:brightness-110 transition-all"
          >
            <Bookmark className="w-4 h-4" />
            <span>خزنة المحفوظات الأوفلاين</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs font-bold text-[var(--text)] hover:border-[var(--gold)] transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>إعادة المحاولة</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
