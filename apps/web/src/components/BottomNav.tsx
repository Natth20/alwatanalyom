"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Zap, TrendingUp, Search, Bookmark, Sparkles, Bot } from "lucide-react";

export function BottomNav() {
  const pathname = usePathname();

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent("awt:open-search"));
  };

  const navItems = [
    { label: "الرئيسية", href: "/", icon: Home },
    { label: "عاجل", href: "/breaking", icon: Zap, isBreaking: true },
    { label: "ستوري", href: "/stories", icon: Sparkles, isStory: true },
    { label: "أطلس", href: "/atlas", icon: null, isPalestine: true },
    { label: "اسأل الوطن", href: "/ask", icon: Bot, isAi: true },
    { label: "محفوظاتي", href: "/saved", icon: Bookmark },
  ];

  return (
    <nav className="md:hidden fixed bottom-3 inset-x-3 sm:inset-x-6 z-40 glass-dock rounded-3xl py-2 px-3 shadow-2xl border border-[var(--gold)]/30 no-print animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isPalestine) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl text-[10px] font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-950/60 text-emerald-400 font-black border border-emerald-500/40 shadow-xs scale-105"
                    : "text-white/70 hover:text-white"
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
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl text-[10px] font-bold transition-all duration-300 relative ${
                isActive
                  ? item.isBreaking
                    ? "bg-red-950/60 text-red-400 border border-red-500/40 shadow-xs scale-105 font-black"
                    : "bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/40 shadow-xs scale-105 font-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {Icon && <Icon className="w-4 h-4 mb-0.5" />}
              {item.isBreaking && (
                <span className="absolute top-1 end-2 w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              )}
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* زر البحث الفوري المنبثق */}
        <button
          type="button"
          onClick={handleOpenSearch}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl text-[10px] font-bold text-white/70 hover:text-[var(--gold)] transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4 mb-0.5" />
          <span>بحث</span>
        </button>
      </div>
    </nav>
  );
}

