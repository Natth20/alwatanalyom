import Link from "next/link";
import { SITE_SECTIONS } from "@awt/shared";

export function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg)] sticky top-0 z-40">
      {/* الشريط العلوي */}
      <div className="container-custom py-3 flex items-center justify-between border-b border-[var(--border)]/50 text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-4">
          <span>{new Date().toLocaleDateString("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
          <span>•</span>
          <span className="text-[var(--primary)] font-semibold">المكان الرئيسي لجميع الأخبار بمصادرها الأصلية</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/live" className="hover:text-[var(--text)]">دليل البث</Link>
          <span>•</span>
          <Link href="/economy" className="hover:text-[var(--text)]">الوطن الاقتصادي</Link>
          <span>•</span>
          <Link href="/newsletter" className="hover:text-[var(--text)]">النشرة البريدية</Link>
        </div>
      </div>

      {/* الشعار وشريط الأدوات */}
      <div className="container-custom py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center font-black text-xl shadow-sm">
            وطن
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-[var(--text)] block leading-none">
              الوطن اليوم
            </span>
            <span className="text-[10px] text-[var(--text-muted)] tracking-wider">
              ALWATAN TODAY · منصة الأخبار والتحقق
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="px-3 py-1.5 rounded-md border border-[var(--border)] text-sm text-[var(--text-muted)] hover:border-[var(--primary)] flex items-center gap-2 bg-[var(--surface)]"
          >
            <span>بحث فوري في الأخبار...</span>
            <kbd className="text-[10px] bg-[var(--bg)] px-1.5 py-0.5 rounded border border-[var(--border)]">Ctrl+K</kbd>
          </Link>
          <Link
            href="/newsletter"
            className="px-4 py-1.5 rounded-md bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-hover)] transition-colors"
          >
            اشترك بالنشرة
          </Link>
        </div>
      </div>

      {/* شريط الأقسام الرئيسي */}
      <nav className="container-custom flex items-center gap-1 overflow-x-auto py-2 text-sm font-semibold text-[var(--text)]">
        <Link href="/" className="px-3 py-1.5 rounded-md hover:bg-[var(--surface)] text-[var(--primary)]">
          الرئيسية
        </Link>
        <Link href="/breaking" className="px-3 py-1.5 rounded-md hover:bg-[var(--surface)] text-[var(--breaking)] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--breaking)]"></span>
          عاجل
        </Link>
        {SITE_SECTIONS.map((sec) => (
          <Link
            key={sec.slug}
            href={`/${sec.slug}`}
            className="px-3 py-1.5 rounded-md hover:bg-[var(--surface)] whitespace-nowrap"
          >
            {sec.nameAr}
          </Link>
        ))}
        <Link href="/live" className="px-3 py-1.5 rounded-md hover:bg-[var(--surface)] text-[var(--primary)]">
          البث الحي
        </Link>
      </nav>
    </header>
  );
}

