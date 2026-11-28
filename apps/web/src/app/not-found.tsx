import Link from "next/link";
import { Home, Radio, Search, Compass, ShieldAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div dir="rtl" className="container-custom py-16 md:py-24 max-w-2xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden border border-[var(--gold)]/30 bg-[var(--surface)] dark:bg-gradient-to-b dark:from-[#1b050b]/95 dark:to-[#0e0407]/95 p-8 md:p-12 text-center shadow-2xl space-y-7">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-80" />

        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#590018] to-[#26000a] text-[var(--gold)] border-2 border-[var(--gold)]/50 flex items-center justify-center mx-auto text-3xl font-black font-mono shadow-xl">
          404
        </div>

        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30 text-xs font-black">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>مسار غير متوفر في الأرشيف الحالي</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[var(--text)] title-imperial">
            الصفحة غير موجودة أو تم نقلها
          </h1>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-md mx-auto">
            عذراً، الرابط الذي تحاول الوصول إليه قد انتهت صلاحيته أو تم تحديث عنوانه. يمكنك البحث مباشرة في الأرشيف أو الانتقال لأهم الأقسام الحية.
          </p>
        </div>

        {/* بحث سريع مباشر */}
        <form action="/search" method="GET" className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute start-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              name="q"
              placeholder="ابحث عن خبر، مدينة، أو موضوع..."
              className="w-full ps-10 pe-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:border-[var(--gold)] outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white dark:bg-[var(--gold)] dark:text-[#140106] text-xs font-black hover:brightness-110 transition-all cursor-pointer shrink-0"
          >
            بحث
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 border-t border-[var(--border)]">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#590018] to-[#3d0010] text-[var(--gold)] border border-[var(--gold)]/40 text-xs font-black hover:brightness-110 transition-all shadow-md flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>الصفحة الرئيسية</span>
          </Link>

          <Link
            href="/breaking"
            className="px-5 py-2.5 rounded-xl border border-rose-500/35 bg-rose-500/10 text-rose-600 dark:text-rose-300 text-xs font-black hover:bg-rose-500/20 transition-all flex items-center gap-2"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            <span>شريط العواجل</span>
          </Link>

          <Link
            href="/palestine"
            className="px-5 py-2.5 rounded-xl border border-emerald-500/35 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-black hover:bg-emerald-500/20 transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>فلسطين والميدان</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
