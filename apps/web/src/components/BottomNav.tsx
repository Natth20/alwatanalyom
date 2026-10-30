"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Zap, TrendingUp, Search, Bookmark } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("awt:open-search"));
  };

  const navItems = [
    { label: "الرئيسية", href: "/", icon: Home },
    { label: "عاجل", href: "/breaking", icon: Zap, isBreaking: true },
    { label: "فلسطين", href: "/palestine", icon: null, isPalestine: true },
    { label: "الاقتصاد", href: "/economy", icon: TrendingUp },
    { label: "محفوظاتي", href: "/saved", icon: Bookmark },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--surface)]/95 backdrop-blur-md border-t border-[var(--border)] px-2 py-1.5 shadow-lg no-print">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isPalestine) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-bold transition-colors ${
                  isActive
                    ? "text-emerald-500 font-black"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <span className="text-base leading-none mb-0.5">🇵🇸</span>
                <span>فلسطين</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors relative ${
                isActive
                  ? item.isBreaking
                    ? "text-[var(--breaking)] font-bold"
                    : "text-[var(--primary)] font-bold"
                  : "text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {Icon && <Icon className="w-4 h-4 mb-0.5" />}
              {item.isBreaking && (
                <span className="absolute top-1 end-2 w-1.5 h-1.5 rounded-full bg-[var(--breaking)] animate-ping" />
              )}
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* زر البحث الفوري المنبثق */}
        <button
          type="button"
          onClick={handleOpenSearch}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-semibold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4 mb-0.5" />
          <span>بحث</span>
        </button>
      </div>
    </nav>
  );
}
