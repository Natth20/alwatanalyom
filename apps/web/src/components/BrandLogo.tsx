"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface BrandLogoProps {
  variant?: "header" | "footer" | "banner" | "compact";
  className?: string;
  showTagline?: boolean;
}

export function BrandLogo({
  variant = "header",
  className = "",
  showTagline = true,
}: BrandLogoProps) {
  if (variant === "compact") {
    return (
      <Link href="/" className={`inline-flex items-center gap-2 group ${className}`}>
        <div className="relative overflow-hidden rounded-xl border border-[var(--gold)]/40 bg-black/90 p-1 shadow-sm group-hover:border-[var(--gold)] transition-colors">
          <Image
            src="/brand/logo-banner.jpg"
            alt="الوطن اليوم"
            width={120}
            height={36}
            priority
            className="h-7 w-auto object-contain rounded-lg"
          />
        </div>
      </Link>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`space-y-3 ${className}`}>
        <Link href="/" className="inline-block group">
          <div className="relative overflow-hidden rounded-2xl border-2 border-[var(--gold)]/50 bg-[#0d0004] p-2 shadow-2xl group-hover:shadow-[0_0_30px_rgba(245,185,0,0.35)] group-hover:border-[var(--gold)] transition-all">
            <Image
              src="/brand/logo-banner.jpg"
              alt="منصة الوطن اليوم الرسمية"
              width={280}
              height={80}
              priority
              className="h-14 sm:h-16 w-auto object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </Link>
        {showTagline && (
          <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
            صرح إعلامي رقمي سيادي موثق يلتزم بأعلى معايير النزاهة الصحفية وإسناد الأخبار إلى مصادرها الأصلية.
          </p>
        )}
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <Link href="/" className={`inline-block relative overflow-hidden rounded-2xl group ${className}`}>
        <div className="relative overflow-hidden rounded-2xl border-2 border-[var(--gold)]/40 bg-black p-2 shadow-2xl group-hover:border-[var(--gold)] transition-all">
          <Image
            src="/brand/logo-banner.jpg"
            alt="منصة الوطن اليوم — منصة إخبارية متكاملة"
            width={600}
            height={200}
            priority
            className="w-full max-w-md h-auto rounded-xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </Link>
    );
  }

  // الترويسة الرئيسية الفاخرة (Header Masthead)
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 group focus:outline-hidden shrink-0 ${className}`}
      title="منصة الوطن اليوم — الرئيسية"
    >
      <div className="relative overflow-hidden rounded-xl border border-[var(--gold)]/40 bg-gradient-to-b from-[#1c0007] to-[#0a0003] p-1 sm:p-1.5 shadow-md group-hover:border-[var(--gold)] group-hover:shadow-[0_0_20px_rgba(245,185,0,0.4)] transition-all duration-300">
        <Image
          src="/brand/logo-banner.jpg"
          alt="الوطن اليوم — الشعار الرسمي"
          width={160}
          height={44}
          priority
          className="h-8 sm:h-9 md:h-10 w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {/* نقطة النبض الإخباري الحي */}
        <span className="absolute top-1 start-1 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      </div>
    </Link>
  );
}
