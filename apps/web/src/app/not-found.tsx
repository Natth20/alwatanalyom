import Link from "next/link";
import { Home, Radio } from "lucide-react";


export default function NotFound() {
  return (
    <div className="container-custom py-24 text-center max-w-xl mx-auto space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mx-auto text-3xl font-black shadow-inner">
        404
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-[var(--text)]">
          الصفحة غير موجودة أو تم نقلها
        </h1>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-md mx-auto">
          عذراً، الرابط الذي تحاول الوصول إليه غير متوفر حالياً. ربما تم تعديل عنوان المادة أو أرشفة الخبر.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-all shadow-md flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </Link>

        <Link
          href="/breaking"
          className="px-6 py-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-500/20 transition-all flex items-center gap-2"
        >
          <Radio className="w-4 h-4 animate-pulse" />
          <span>شريط العواجل</span>
        </Link>
      </div>
    </div>
  );
}

