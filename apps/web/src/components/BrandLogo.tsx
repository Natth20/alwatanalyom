import Image from "next/image";
import Link from "next/link";

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

  // الترويسة الرئيسية الفاخرة (Header Masthead)
  return (
    <Link href="/" className={`flex items-center gap-3.5 group focus:outline-hidden ${className}`}>
      {/* أيقونة الكرة الأرضية الملكية ثلاثية الأبعاد */}
      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#590018] via-[#3D0010] to-[#1A0007] border-2 border-[var(--gold)]/60 flex items-center justify-center shadow-lg group-hover:shadow-[var(--gold-glow)] group-hover:scale-105 transition-all duration-300">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[var(--gold)] fill-none stroke-current" strokeWidth="6">
            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6" />
            <ellipse cx="50" cy="50" rx="44" ry="18" stroke="currentColor" strokeWidth="4" />
            <ellipse cx="50" cy="50" rx="18" ry="44" stroke="currentColor" strokeWidth="4" />
            <line x1="6" y1="50" x2="94" y2="50" stroke="currentColor" strokeWidth="4" />
          </svg>
        </div>
        {/* نقطة النبض العاجل */}
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[var(--breaking)] border-2 border-[var(--surface)] animate-ping" />
        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[var(--breaking)] border-2 border-[var(--surface)]" />
      </div>

      {/* كتابة الشعار بالكبسولة المعتمدة في الهوية */}
      <div className="space-y-0.5">
        <div className="flex items-center gap-1.5">
          <div className="inline-flex items-center rounded-xl bg-gradient-to-l from-[#590018] via-[#3D0010] to-[#26000A] p-1 px-3 border border-[var(--gold)]/40 shadow-inner">
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight ms-1">
              الوطن
            </span>
            <span className="text-xl sm:text-2xl font-black text-[var(--gold)] tracking-tight">
              اليوم
            </span>
          </div>
          <span className="hidden md:inline-block px-2 py-0.5 rounded-md bg-[var(--gold)]/15 text-[var(--gold)] text-[10px] font-black border border-[var(--gold)]/30">
            منصة إخبارية متكاملة
          </span>
        </div>
        <div className="text-[10px] text-[var(--text-muted)] font-medium tracking-wide">
          المكان الرئيسي لجميع الأخبار بمصادرها الأصلية
        </div>
      </div>
    </Link>
  );
}

