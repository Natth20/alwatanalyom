import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";

interface BrandLogoProps {
  variant?: "header" | "footer" | "banner" | "compact";
  className?: string;
}

export function BrandLogo({ variant = "header", className = "" }: BrandLogoProps) {
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
    <Link href="/" className={`flex items-center gap-3 group focus:outline-hidden ${className}`}>
      {/* 1. الكرة الأرضية الذهبية المتوهجة ثلاثية الأبعاد */}
      <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#730020] via-[#590018] to-[#26000A] border-2 border-[var(--gold)] flex items-center justify-center shadow-lg group-hover:shadow-[var(--gold-glow)] group-hover:scale-105 transition-all duration-300 shrink-0">
        <div className="relative w-7 h-7 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--gold)] fill-none stroke-current" strokeWidth="6">
            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" />
            <ellipse cx="50" cy="50" rx="44" ry="18" stroke="currentColor" strokeWidth="4" />
            <ellipse cx="50" cy="50" rx="18" ry="44" stroke="currentColor" strokeWidth="4" />
            <line x1="6" y1="50" x2="94" y2="50" stroke="currentColor" strokeWidth="4" />
          </svg>
        </div>
        {/* نقطة النبض الحي */}
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--breaking)] border-2 border-white animate-ping" />
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--breaking)] border-2 border-white" />
      </div>

      {/* 2. كبسولة الشعار الرسمية المطابقة للهوية */}
      <div className="flex flex-col justify-center space-y-0.5">
        <div className="flex items-center gap-1.5">
          {/* الكبسولة البصرية ذات الإطار الذهبي */}
          <div className="inline-flex items-center rounded-2xl bg-gradient-to-r from-[#26000A] via-[#3D0010] to-[#1F0008] p-1 px-3 border-2 border-[var(--gold)] shadow-md">
            {/* الوطن: بخط أبيض عريض داخل وسادة خضراء زمردية ملكية */}
            <span className="px-2.5 py-0.5 rounded-xl bg-gradient-to-r from-[#0E472A] to-[#0A361F] text-white text-lg sm:text-xl font-black tracking-tight border border-emerald-400/30 ms-1 shadow-xs">
              الوطن
            </span>
            {/* اليوم: باللون الذهبي الملكي البارز */}
            <span className="text-xl sm:text-2xl font-black text-[var(--gold)] tracking-tight px-1 drop-shadow-xs">
              اليوم
            </span>
          </div>

          <span className="hidden xl:inline-block px-2.5 py-1 rounded-xl bg-[var(--gold)]/15 text-[var(--gold)] text-[10px] font-black border border-[var(--gold)]/40 whitespace-nowrap">
            منصة إخبارية متكاملة
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
