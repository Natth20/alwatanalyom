"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Award } from "lucide-react";

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
  // الختم الملكي السيادي المتجه (Sovereign Gold Crest)
  const RoyalCrest = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
    const dim = size === "lg" ? "w-12 h-12" : size === "md" ? "w-10 h-10" : "w-8 h-8";
    return (
      <div className={`relative ${dim} shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2a000d] via-[#1a0007] to-[#0a0003] border border-[var(--gold)]/50 shadow-md shadow-amber-950/40 group-hover:border-[var(--gold)] group-hover:shadow-[0_0_20px_rgba(245,185,0,0.4)] transition-all duration-300`}>
        {/* رسم شعار القبة والزيتون الذهبي المتجه */}
        <svg viewBox="0 0 36 36" fill="none" className="w-6 h-6 text-[var(--gold)] drop-shadow-sm">
          {/* إطار النجمة الثمانية الإسلامية */}
          <path
            d="M18 2L22 7.5L29 7L28.5 14L34 18L28.5 22L29 29L22 28.5L18 34L14 28.5L7 29L7.5 22L2 18L7.5 14L7 7L14 7.5L18 2Z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="currentColor"
            fillOpacity="0.12"
          />
          {/* قبة الصخرة / الهلال والمنارة السيادية */}
          <path
            d="M18 9C14.5 9 12 12.5 12 16H24C24 12.5 21.5 9 18 9Z"
            fill="currentColor"
          />
          <path
            d="M11 16H25V23H11V16Z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="currentColor"
            fillOpacity="0.2"
          />
          {/* أعمدة القبة */}
          <line x1="14" y1="17" x2="14" y2="22" stroke="currentColor" strokeWidth="1" />
          <line x1="18" y1="17" x2="18" y2="22" stroke="currentColor" strokeWidth="1" />
          <line x1="22" y1="17" x2="22" y2="22" stroke="currentColor" strokeWidth="1" />
          {/* الهلال العلوي */}
          <circle cx="18" cy="7.5" r="1" fill="currentColor" />
        </svg>

        {/* نبضة البث المباشر */}
        <span className="absolute -top-1 -end-1 flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-[#0d0004]" />
        </span>
      </div>
    );
  };

  // 1. النسخة المدمجة للأشرطة الضيقة (Compact Variant)
  if (variant === "compact") {
    return (
      <Link
        href="/"
        className={`inline-flex items-center gap-2.5 group focus:outline-hidden ${className}`}
        title="منصة الوطن اليوم — الرئيسية"
      >
        <RoyalCrest size="sm" />
        <div className="flex flex-col text-right leading-none">
          <span className="font-serif font-black text-sm tracking-tight bg-gradient-to-l from-[#ffe07a] via-[#f5b900] to-[#dca600] bg-clip-text text-transparent group-hover:brightness-110 transition-all">
            الوطن اليوم
          </span>
          <span className="text-[9px] text-stone-400 font-medium mt-0.5">
            صوت فلسطين والعروبة
          </span>
        </div>
      </Link>
    );
  }

  // 2. ترويسة الفوتر الفاخرة (Footer Masthead)
  if (variant === "footer") {
    return (
      <div className={`space-y-3 ${className}`}>
        <Link
          href="/"
          className="inline-flex items-center gap-3.5 group focus:outline-hidden"
          title="منصة الوطن اليوم الرسمية"
        >
          <RoyalCrest size="lg" />
          <div className="flex flex-col text-right">
            <div className="flex items-center gap-2">
              <span className="font-serif font-black text-2xl sm:text-3xl tracking-tight bg-gradient-to-l from-[#fff0b3] via-[#f5b900] to-[#dca600] bg-clip-text text-transparent group-hover:brightness-110 transition-all drop-shadow-sm">
                الوطن اليوم
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                فلسطين أولاً
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              {/* شريط العلم الفلسطيني المصغر */}
              <div className="flex h-1.5 w-7 rounded-full overflow-hidden border border-white/20">
                <span className="w-1/3 bg-black" />
                <span className="w-1/3 bg-white" />
                <span className="w-1/3 bg-emerald-600" />
              </div>
              <span className="text-xs text-stone-300 font-bold tracking-wide">
                الصحيفة الرقمية السيادية المستقلة · تأسست لتوثيق الحقيقة
              </span>
            </div>
          </div>
        </Link>
        {showTagline && (
          <p className="text-xs text-stone-300 leading-relaxed max-w-md">
            صرح إعلامي رقمي عربي مستقل يلتزم بأعلى معايير النزاهة والتدقيق الجنائي، وإسناد الأخبار إلى مصادرها الأصلية، وصون الرواية الوطنية الفلسطينية.
          </p>
        )}
      </div>
    );
  }

  // 3. نسخة البانر الواسعة (Banner Variant)
  if (variant === "banner") {
    return (
      <Link
        href="/"
        className={`inline-flex items-center gap-4 group p-4 rounded-2xl bg-gradient-to-r from-[#20000a] via-[#2d000f] to-[#140006] border border-[var(--gold)]/40 shadow-xl ${className}`}
      >
        <RoyalCrest size="lg" />
        <div className="text-right">
          <span className="font-serif font-black text-2xl bg-gradient-to-l from-[#ffe07a] via-[#f5b900] to-[#dca600] bg-clip-text text-transparent block">
            الوطن اليوم
          </span>
          <span className="text-xs text-stone-300 block mt-0.5">
            منظومة الصحافة الرقمية الميدانية الشاملة
          </span>
        </div>
      </Link>
    );
  }

  // 4. الترويسة الرئيسية للهيدر الملكي (Header Variant)
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 sm:gap-3 group focus:outline-hidden shrink-0 ${className}`}
      title="منصة الوطن اليوم — الرئيسية"
    >
      <RoyalCrest size="md" />

      <div className="flex flex-col text-right leading-none select-none">
        <div className="flex items-baseline gap-1.5">
          <span className="font-serif font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-l from-[#ffffff] via-[#ffdf79] to-[var(--gold)] bg-clip-text text-transparent group-hover:brightness-125 transition-all">
            الوطن اليوم
          </span>
        </div>

        <div className="flex items-center gap-1.5 mt-1">
          {/* شريط العلم الفلسطيني المنمنم */}
          <div className="flex h-1 w-5 rounded-full overflow-hidden opacity-90">
            <span className="w-1/3 bg-black" />
            <span className="w-1/3 bg-white" />
            <span className="w-1/3 bg-emerald-500" />
          </div>
          <span className="text-[10px] text-stone-300 group-hover:text-stone-100 transition-colors font-medium">
            صوت فلسطين والعروبة
          </span>
        </div>
      </div>
    </Link>
  );
}

export default BrandLogo;
