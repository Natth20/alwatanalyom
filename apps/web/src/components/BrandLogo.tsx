import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";
import { useState } from "react";

interface BrandLogoProps {
  variant?: "header" | "footer" | "banner" | "compact";
  className?: string;
}

export function BrandLogo({ variant = "header", className = "" }: BrandLogoProps) {
  const [hovered, setHovered] = useState(false);

  if (variant === "banner") {
    return (
      <Link href="/" className={`inline-block relative overflow-hidden rounded-2xl ${className}`}>
        <Image
          src="/brand/logo-banner.jpg"
          alt="منصة الوطن اليوم — منصة إخبارية متكاملة"
          width={800}
          height={400}
          priority
          className="w-full max-w-xl h-auto rounded-2xl shadow-xl border border-[var(--gold)]/30 hover:brightness-105 transition-all"
        />
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href="/" className={`flex items-center gap-2 group ${className}`}>
        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#590018] via-[#3D0010] to-[#26000A] border border-[var(--gold)]/50 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
          <span className="text-[var(--gold)] font-black text-sm">وطن</span>
          <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-[var(--breaking)] animate-ping" />
          <span className="absolute -top-1 -end-1 w-2.5 h-2.5 rounded-full bg-[var(--breaking)]" />
        </div>
        <span className="font-black text-lg text-[var(--text)] group-hover:text-[var(--gold)] transition-colors">
          الوطن اليوم
        </span>
      </Link>
    );
  }

  // الترويسة الرئيسية الفاخرة (Header Masthead - المطابقة لصورة الهوية الرسمية)
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 group focus:outline-hidden ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 1. الكرة الأرضية الذهبية المتوهجة ثلاثية الأبعاد */}
      <div
        className={`relative w-12 h-12 rounded-full bg-gradient-to-br from-[#730020] via-[#590018] to-[#26000A] border-2 border-[var(--gold)] flex items-center justify-center shadow-lg transition-all duration-300 shrink-0 ${
          hovered
            ? "shadow-[0_0_24px_rgba(245,185,0,0.6)] scale-105 border-[#ffd043]"
            : "group-hover:shadow-[var(--gold-glow)]"
        }`}
      >
        <div className="relative w-7 h-7 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none" strokeWidth="6">
            <defs>
              <radialGradient id="globeGoldGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffd043" />
                <stop offset="60%" stopColor="#f5b900" />
                <stop offset="100%" stopColor="#dca600" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="44" stroke="url(#globeGoldGrad)" strokeWidth="6" />
            <ellipse cx="50" cy="50" rx="44" ry="18" stroke="#f5b900" strokeWidth="3.5" strokeOpacity="0.85" />
            <ellipse cx="50" cy="50" rx="18" ry="44" stroke="#f5b900" strokeWidth="3.5" strokeOpacity="0.85" />
            <line x1="6" y1="50" x2="94" y2="50" stroke="#f5b900" strokeWidth="3.5" strokeOpacity="0.85" />
          </svg>
        </div>
        {/* نقطة النبض الحي الإخباري */}
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--breaking)] border-2 border-white animate-ping" />
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--breaking)] border-2 border-white shadow-xs" />
      </div>

      {/* 2. كبسولة الشعار الرسمية المطابقة للهوية */}
      <div className="flex flex-col justify-center space-y-0.5">
        <div className="flex items-center gap-1.5">
          {/* الكبسولة البصرية ذات الإطار الذهبي المتلألئ */}
          <div className="inline-flex items-center rounded-2xl bg-gradient-to-r from-[#26000A] via-[#3D0010] to-[#1F0008] p-1 px-3 border-2 border-[var(--gold)] shadow-md group-hover:border-[#ffd043] transition-colors">
            {/* الوطن: بخط أبيض عريض داخل وسادة خضراء زمردية ملكية */}
            <span className="px-2.5 py-0.5 rounded-xl bg-gradient-to-r from-[#0E472A] to-[#0A361F] text-white text-lg sm:text-xl font-black tracking-tight border border-emerald-400/30 ms-1 shadow-xs">
              الوطن
            </span>
            {/* اليوم: باللون الذهبي الملكي البارز */}
            <span className="text-xl sm:text-2xl font-black text-[var(--gold)] tracking-tight px-1 drop-shadow-xs">
              اليوم
            </span>
          </div>

          <span className="hidden xl:inline-block px-2.5 py-1 rounded-xl bg-[var(--gold)]/15 text-[var(--gold)] text-[10px] font-black border border-[var(--gold)]/40 whitespace-nowrap shadow-xs">
            منصة إخبارية متكاملة
          </span>

          <span className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[9px] font-black border border-red-400/30 animate-pulse ms-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            مباشر
          </span>
        </div>

        {/* سطر النطاق والشعار التحريري */}
        <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] font-medium ps-1">
          <span className="flex items-center gap-1 font-mono text-[var(--gold)] font-bold">
            <Globe className="w-2.5 h-2.5" />
            alwatantoday.net
          </span>
          <span className="hidden sm:inline text-[var(--border)]">|</span>
          <span className="hidden sm:inline line-clamp-1">المكان الرئيسي لجميع الأخبار بمصادرها</span>
        </div>
      </div>
    </Link>
  );
}
