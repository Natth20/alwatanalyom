import Link from "next/link";
import { SITE_SECTIONS } from "@awt/shared";
import { SearchTrigger } from "@/components/SearchTrigger";
import { TopBarInfo } from "@/components/TopBarInfo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SavedCounterBadge } from "@/components/SavedCounterBadge";

export function Header() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--bg)] sticky top-0 z-40">
      {/* الشريط العلوي */}
      <div className="container-custom py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)]/50 text-xs text-[var(--text-muted)]">
        <TopBarInfo />

        <div className="flex items-center gap-2.5 sm:gap-3 ms-auto md:ms-0">
          <Link href="/live" className="hover:text-[var(--text)] hidden sm:inline">دليل البث</Link>
          <span className="hidden sm:inline text-[var(--border)]">•</span>
          <Link href="/economy" className="hover:text-[var(--text)] hidden sm:inline">الوطن الاقتصادي</Link>
          <span className="hidden sm:inline text-[var(--border)]">•</span>
          <Link href="/newsletter" className="hover:text-[var(--text)]">النشرة البريدية</Link>
          <span className="text-[var(--border)]">•</span>
          <ThemeToggle />
          <Link
            href="/en"
            className="px-2 py-0.5 rounded border border-[var(--border)] text-[10px] font-bold text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
          >
            EN
          </Link>
        </div>
      </div>

      {/* الشعار وشريط الأدوات */}
      <div className="container-custom py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center font-black text-xl shadow-sm">
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
          <SearchTrigger />
          <SavedCounterBadge />
          <Link
            href="/newsletter"
            className="hidden sm:inline-flex px-4 py-1.5 rounded-lg bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors shadow-sm"
          >
            اشترك بالنشرة
          </Link>
        </div>
      </div>

      {/* شريط الأقسام الرئيسي */}
      <nav className="container-custom flex items-center gap-1 overflow-x-auto py-2 text-sm font-semibold text-[var(--text)] scrollbar-none">
        <Link href="/" className="px-3 py-1.5 rounded-md hover:bg-[var(--surface)] text-[var(--primary)] whitespace-nowrap">
          الرئيسية
        </Link>
        <Link href="/breaking" className="px-3 py-1.5 rounded-md hover:bg-[var(--surface)] text-[var(--breaking)] flex items-center gap-1 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--breaking)] animate-pulse"></span>
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
        <Link href="/live" className="px-3 py-1.5 rounded-md hover:bg-[var(--surface)] text-[var(--primary)] whitespace-nowrap">
          البث الحي
        </Link>
      </nav>
    </header>
  );
}
