"use client";

import Link from "next/link";
import { ArticleCard as ArticleCardType } from "@awt/shared";
import { Clock, ShieldCheck, Flame, ArrowLeft, ExternalLink } from "lucide-react";
import { resolveEditorialImage } from "@/lib/editorial-images";

interface Props {
  article: ArticleCardType;
  variant?: "hero" | "medium" | "compact" | "text-only";
}

export function ArticleCard({ article, variant = "medium" }: Props) {
  const publishedDate = new Date(article.publishedAt).toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dateStr = new Date(article.publishedAt).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' });

  const readingTime = Math.max(1, Math.round((article.summaryAr?.split(' ').length || 50) / 200));

  const imageUrl = resolveEditorialImage(article);

  // 1. نمط المادة البطلة المسرحية (Hero - أسلوب الجزيرة نت الفخم)
  if (variant === "hero") {
    return (
      <article className="group relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#26000A] via-[#1A0007] to-[#120005] p-6 md:p-8 hover:border-[var(--gold)]/40 transition-all duration-500 shadow-xl card-imperial">
        {/* شريط ذهبي أعلى البطاقة */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-80" />

        {/* الصورة الرئيسية العريضة الفخمة */}
        <div className="relative w-full aspect-16/9 rounded-2xl overflow-hidden mb-6 bg-stone-950 shadow-2xl">
          <img
            src={imageUrl}
            alt={article.titleAr}
            loading="eager"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* تدرج ظلي متقن ومسرحي (Cinematic Vignette) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

          {/* الشارات العلوية فوق الصورة */}
          <div className="absolute top-4 start-4 flex items-center gap-2">
            <span className="bg-[#590018]/90 text-[var(--gold)] px-3.5 py-1 rounded-xl text-xs font-black border border-[var(--gold)]/40 shadow-md backdrop-blur-md">
              {article.sectionNameAr}
            </span>

            {article.isBreaking && (
              <span className="bg-red-600 text-white px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md animate-pulse">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>عاجل</span>
              </span>
            )}
          </div>

          {/* وقت النشر والمصدر فوق الصورة من الأسفل */}
          <div className="absolute bottom-4 start-4 end-4 flex items-center justify-between text-xs text-white/90 z-10">
            <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/15 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{article.source?.nameAr || "مراسل الوطن اليوم"}</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-lg text-[11px] font-mono text-white/80">
                <Clock className="w-3 h-3 text-[var(--gold)]" />{readingTime} د قراءة
              </span>
              <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/15 font-mono text-[11px]">
                <Clock className="w-3 h-3 text-[var(--gold)]" />
                <span>{publishedDate}</span>
              </span>
            </div>
          </div>
        </div>

        {/* عنوان المانشيت الصداري العريض (Cairo Black Typography) */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-4 group-hover:text-[var(--gold)] transition-colors">
          <Link href={`/article/${article.id}/${article.slug}`}>
            {article.titleAr}
          </Link>
        </h2>

        {/* ملخص المادة */}
        {article.summaryAr && (
          <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6 line-clamp-2 font-normal">
            {article.summaryAr}
          </p>
        )}

        {/* السطر السفلي */}
        <div className="flex items-center justify-between text-xs pt-4 border-t border-white/10 text-white/70">
          <span className="text-[11px] font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            تغطية ميدانية وتحقق مستمر
          </span>

          <Link
            href={`/article/${article.id}/${article.slug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#DCA600] text-[#140106] font-black hover:shadow-xl hover:shadow-[var(--gold-glow)] hover:scale-105 transition-all text-xs tracking-wide"
          >
            <span>التفاصيل والتغطية الكاملة</span>
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
          </Link>
        </div>
      </article>
    );
  }

  // 2. نمط البطاقة المدمجة للقوائم السريعة (Compact - نمط دنيا الوطن الإخباري عالي الكثافة)
  if (variant === "compact") {
    return (
      <article className="group py-3 border-b border-[var(--border)] last:border-none flex items-center justify-between gap-3.5 transition-all ps-2 border-s-2 border-s-[var(--primary)]/0 hover:border-s-[var(--gold)]">
        {/* الصورة المصغرة لكل خبر (Thumb Photo) */}
        <Link
          href={`/article/${article.id}/${article.slug}`}
          className="relative w-20 h-16 sm:w-24 sm:h-18 overflow-hidden shrink-0 bg-stone-900 rounded-xl shadow-md border border-[var(--gold)]/10"
        >
          <img
            src={imageUrl}
            alt={article.titleAr}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          {article.isBreaking && (
            <span className="absolute top-1 start-1 w-2 h-2 rounded-full bg-red-600 animate-ping" />
          )}
        </Link>

        {/* النصوص والعنوان */}
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
            <span className="font-black text-[var(--gold)] bg-[#590018]/60 px-2 py-0.5 rounded-md border border-[var(--gold)]/20">{article.sectionNameAr}</span>
            <span>•</span>
            <span className="truncate">{article.source?.nameAr || "مصدر أصلي"}</span>
            <span className="ms-auto font-mono">{publishedDate}</span>
          </div>

          <h4 className="font-bold text-xs sm:text-sm text-[var(--text)] line-clamp-2 leading-snug group-hover:text-[var(--primary)] transition-colors">
            <Link href={`/article/${article.id}/${article.slug}`}>
              {article.titleAr}
            </Link>
          </h4>
        </div>
      </article>
    );
  }

  // 3. النمط القياسي المتوسط للشبكات (Medium - بطاقة غنية ومجسمة)
  return (
    <article className="group card-imperial bg-[var(--surface)] p-4 flex flex-col justify-between hover:border-[var(--primary)]/50 hover:shadow-lg transition-all duration-300 h-full">
      <div>
        {/* صورة البطاقة الدائمة */}
        <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden mb-3.5 bg-stone-900 shadow-sm border border-[var(--border)]">
          <img
            src={imageUrl}
            alt={article.titleAr}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* شريط ذهبي أعلى الصورة بالداخل */}
          <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-70" />

          {/* شارة القسم والعاجل */}
          <div className="absolute top-2 start-2 flex items-center gap-1.5">
            <span className="bg-[#590018]/90 text-[var(--gold)] text-[10px] font-black px-2.5 py-0.5 rounded-lg border border-[var(--gold)]/30 backdrop-blur-xs">
              {article.sectionNameAr}
            </span>
            {article.isBreaking && (
              <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-xs animate-pulse">
                عاجل
              </span>
            )}
          </div>

          {/* الوقت في أسفل الصورة + reading time */}
          <div className="absolute bottom-2 start-2 end-2 flex items-center justify-between">
            <span className="text-[10px] text-white/90 font-mono bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-[var(--gold)]" /> {readingTime}د
            </span>
            <span className="text-[10px] text-white/90 font-mono bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
              {publishedDate}
            </span>
          </div>
        </div>

        {/* العنوان */}
        <h3 className="font-black text-sm sm:text-base text-[var(--text)] leading-snug group-hover:text-[var(--primary)] transition-colors mb-2 line-clamp-2">
          <Link href={`/article/${article.id}/${article.slug}`}>
            {article.titleAr}
          </Link>
        </h3>

        {/* الملخص المقتضب */}
        {article.summaryAr && (
          <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed mb-3">
            {article.summaryAr}
          </p>
        )}
      </div>

      {/* التذييل للمصدر والتفاصيل */}
      <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)] mt-auto">
        <span className="text-[11px] font-medium flex items-center gap-1 truncate max-w-[150px]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>{article.source?.nameAr || "مصدر معتمد"}</span>
        </span>

        <Link
          href={`/article/${article.id}/${article.slug}`}
          className="text-[var(--gold)] font-black hover:underline flex items-center gap-1 text-[11px] shrink-0 group-hover:gap-2 transition-all"
        >
          <span>التفاصيل</span>
          <ArrowLeft className="w-3 h-3 rtl:rotate-0" />
        </Link>
      </div>
    </article>
  );
}
