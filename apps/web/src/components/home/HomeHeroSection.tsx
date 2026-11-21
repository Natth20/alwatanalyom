import Link from "next/link";
import { StorySummary, ArticleCard as ArticleCardType } from "@awt/shared";
import {
  Clock,
  ShieldCheck,
  Flame,
  Radio,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Coins,
  MapPin,
  FileText,
  AlertCircle,
  ChevronLeft,
} from "lucide-react";
import { resolveEditorialImage } from "@/lib/editorial-images";

interface Props {
  heroStory?: StorySummary;
  heroArticle?: ArticleCardType;
  secondaryArticles?: ArticleCardType[];
}

export function HomeHeroSection({ heroStory, heroArticle, secondaryArticles = [] }: Props) {
  if (!heroArticle && !heroStory) return null;

  const mainArticle = heroArticle || heroStory?.articles[0];
  const relatedCoverages = heroStory?.articles.slice(1, 3) || [];
  const heroImageUrl = resolveEditorialImage(mainArticle);

  // تقسيم المواد الثانوية: بطاقتان للتحقيقات والملفات + الباقي لبرقيات الممر السريع
  const investigativeArticles = secondaryArticles.slice(0, 2);
  const fastStreamWire = secondaryArticles.slice(2, 6);

  return (
    <section className="space-y-6">
      {/* 0. رادار الأرقام والميدان السيادي اللحظي (Live Sovereign Field Radar Bar) */}
      <div className="rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-r from-black/80 via-[#1A0007]/90 to-black/80 p-3 sm:p-4 backdrop-blur-xl shadow-lg flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
          <span className="text-xs font-black text-[var(--gold)] tracking-wide">
            رادار الميدان اللحظي:
          </span>
        </div>

        {/* المؤشرات والإحصاءات الحية */}
        <div className="flex items-center gap-3 sm:gap-6 text-xs text-stone-200 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-[11px] text-slate-300">القدس والأقصى:</span>
            <strong className="text-white font-black">اقتحامات متجددة</strong>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px]">المعابر البرية:</span>
            <strong className="font-bold">قيود مشددة</strong>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px]">الذهب اللحظي (أونصة):</span>
            <strong className="font-mono font-black text-amber-400">$3,515.40</strong>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-300">
            <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[11px]">الدولار / الشيكل:</span>
            <strong className="font-mono font-black text-sky-400">3.35 ₪</strong>
          </div>
        </div>

        <Link
          href="/pulse"
          className="shrink-0 text-[11px] font-bold text-[var(--gold)] hover:underline inline-flex items-center gap-1 ms-auto"
        >
          <span>نبض الميدان</span>
          <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
        </Link>
      </div>

      {/* 1. جدارية البطل الثلاثي الرئاسي (Tri-Pillar Hero Wall) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* العمود الأول: الخبر السيادي البطل (يشغل 7 أعمدة) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          <div className="relative group overflow-hidden rounded-3xl bg-[#0D0004] border-2 border-[var(--gold)]/40 shadow-[0_20px_60px_-15px_rgba(89,0,24,0.5)] hover:border-[var(--gold)] transition-all duration-700 h-full flex flex-col justify-between">
            {/* الصورة السينمائية العريضة بنسبة 16:9 */}
            <div className="relative aspect-16/10 sm:aspect-16/9 w-full overflow-hidden bg-stone-950">
              <img
                src={heroImageUrl}
                alt={mainArticle?.titleAr || "خبر رئيسي"}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-95 contrast-105"
                loading="eager"
              />

              {/* تدرج مسرحي غني يضمن وضوح النص بأي درجة إضاءة */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* الشارات العلوية المذهبة والسيادية */}
              <div className="absolute top-4 start-4 flex items-center gap-2.5 z-10 flex-wrap">
                {mainArticle?.isBreaking ? (
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white shadow-xl animate-pulse border border-red-400/50">
                    <Flame className="w-4 h-4 fill-current" />
                    <span>عاجل الميدان</span>
                  </span>
                ) : (
                  <span className="px-4 py-1.5 rounded-xl text-xs font-black bg-[#590018]/95 text-[var(--gold)] border border-[var(--gold)]/60 shadow-xl backdrop-blur-xl">
                    {mainArticle?.sectionNameAr || "تغطية سيادية خاصة"}
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-xl shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>موثق بمصدر رسمي</span>
                </span>
              </div>

              {/* تفاصيل المادة البطلة في أسفل الصورة */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 space-y-3.5 z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black/60 border border-[var(--gold)]/30 backdrop-blur-md text-[var(--gold)] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>الحدث المتصدر الآن</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight group-hover:text-[var(--gold)] transition-colors duration-300 drop-shadow-md">
                  <Link href={`/article/${mainArticle?.id}/${mainArticle?.slug}`}>
                    {mainArticle?.titleAr}
                  </Link>
                </h1>

                {mainArticle?.summaryAr && (
                  <p className="text-xs sm:text-sm md:text-base text-stone-200 line-clamp-2 leading-relaxed max-w-2xl font-normal opacity-95">
                    {mainArticle.summaryAr}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300 pt-3 border-t border-white/20">
                  <span className="font-black text-[var(--gold)] bg-[#590018]/80 px-2.5 py-0.5 rounded-md border border-[var(--gold)]/30">
                    {mainArticle?.source?.nameAr || "الوطن اليوم"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-stone-200">
                    <Clock className="w-3.5 h-3.5 text-[var(--gold)]" />
                    <span>
                      {new Date(mainArticle?.publishedAt || Date.now()).toLocaleTimeString("ar-EG", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </span>
                  {heroStory && heroStory.coverageCount > 1 && (
                    <>
                      <span>•</span>
                      <span className="text-[var(--gold)] font-bold text-[11px] bg-black/60 px-2.5 py-0.5 rounded-md border border-white/10">
                        {heroStory.coverageCount} زوايا متابعة
                      </span>
                    </>
                  )}
                  <span className="ms-auto flex items-center gap-1 text-[var(--gold)] font-bold text-xs group-hover:translate-x-[-4px] transition-transform">
                    <span>قراءة التقرير الكامل</span>
                    <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* تغطيات المتابعة المساندة أسفل الخبر البطل */}
          {relatedCoverages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedCoverages.map((rel) => {
                const relImg = resolveEditorialImage(rel);
                return (
                  <div
                    key={rel.id}
                    className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] hover:shadow-xl transition-all duration-300 flex items-center gap-3.5 group"
                  >
                    <div className="relative w-22 h-20 rounded-xl overflow-hidden shrink-0 bg-stone-900 border border-[var(--border)] shadow-xs">
                      <img
                        src={relImg}
                        alt={rel.titleAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-black text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded-md">
                          {rel.source?.nameAr || "متابعة"}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] font-mono">
                          {new Date(rel.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-[var(--text)] line-clamp-2 group-hover:text-[var(--primary)] transition-colors leading-snug">
                        <Link href={`/article/${rel.id}/${rel.slug}`}>
                          {rel.titleAr}
                        </Link>
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* العمود الثاني والثالث المدمجان: التحقيقات وملف الممر السريع (يشغلان 5 أعمدة) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* قسم التحقيقات والملفات الخاصة (Deep Investigations) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b-2 border-amber-500/40 pb-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <h2 className="font-black text-sm text-[var(--text)]">
                  تحقيقات وملفات خاصة
                </h2>
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                عمق استقصائي
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {investigativeArticles.map((art) => {
                const img = resolveEditorialImage(art);
                return (
                  <article
                    key={art.id}
                    className="p-3 rounded-2xl border border-white/10 bg-[var(--surface)] hover:border-amber-500/40 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-2 bg-stone-900 border border-white/10">
                      <img
                        src={img}
                        alt={art.titleAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-1.5 start-1.5 text-[9px] font-bold px-2 py-0.5 rounded bg-black/80 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                        {art.sectionNameAr}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-[var(--text)] line-clamp-2 group-hover:text-amber-400 transition-colors leading-snug">
                        <Link href={`/article/${art.id}/${art.slug}`}>
                          {art.titleAr}
                        </Link>
                      </h3>
                      <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] mt-2 pt-2 border-t border-[var(--border)]">
                        <span>{art.source?.nameAr || "هيئة التحرير"}</span>
                        <span className="text-amber-400 font-bold flex items-center gap-0.5">
                          <span>قراءة</span>
                          <ChevronLeft className="w-3 h-3 rtl:rotate-0" />
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* ممر التدفق السلكي السريع المباشر (The Rapid Wire Stream) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
                </span>
                <h2 className="font-black text-sm text-[var(--text)]">
                  الممر السريع · نبض الأحداث
                </h2>
              </div>
              <span className="text-[10px] font-black text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                بث دقيقة بدقيقة
              </span>
            </div>

            <div className="space-y-2.5">
              {fastStreamWire.map((art) => {
                const artImg = resolveEditorialImage(art);
                return (
                  <article
                    key={art.id}
                    className="p-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] hover:shadow-md transition-all duration-300 group flex items-center gap-3"
                  >
                    <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-stone-900 border border-[var(--border)]">
                      <img
                        src={artImg}
                        alt={art.titleAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 text-[9px] text-[var(--text-muted)] mb-0.5">
                        <span className="font-bold text-[var(--primary)]">{art.sectionNameAr}</span>
                        <span className="font-mono text-slate-400">
                          {new Date(art.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-[var(--text)] truncate group-hover:text-[var(--primary)] transition-colors">
                        <Link href={`/article/${art.id}/${art.slug}`}>
                          {art.titleAr}
                        </Link>
                      </h4>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
