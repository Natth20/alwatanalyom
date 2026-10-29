import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "أنت تتصفح دون اتصال بالإنترنت — الوطن اليوم",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="container-custom py-20 text-center max-w-md mx-auto space-y-4">
      <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto text-2xl font-bold">
        📡
      </div>

      <h1 className="text-2xl font-bold text-[var(--text)]">
        تعذر الاتصال بالشبكة
      </h1>

      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
        يبدو أنك غير متصل بالإنترنت حالياً. يمكنك تصفح المواد التي قمت بحفظها مسبقاً، وسيعاود الموقع التحديث فور عودة الاتصال.
      </p>

      <div className="pt-4 flex items-center justify-center gap-3">
        <Link
          href="/saved"
          className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-bold"
        >
          الانتقال للمحفوظات
        </Link>
        <Link
          href="/"
          className="px-4 py-2 rounded-lg border border-[var(--border)] text-xs font-semibold hover:bg-[var(--surface)]"
        >
          إعادة المحاولة
        </Link>
      </div>
    </div>
  );
}

