import Link from "next/link";
import { StorySummary, ArticleCard as ArticleCardType } from "@awt/shared";
import { Clock, ShieldCheck, Flame, Radio, ArrowLeft, Sparkles, Eye, TrendingUp } from "lucide-react";
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

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 1. الخبر البطل السينمائي الرئاسي (Lead Hero) - يشغل 7 أعمدة بنمط إمبراطوري مهيب */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative group overflow-hidden rounded-3xl bg-[#0D0004] border-2 border-[var(--gold)]/40 shadow-[0_20px_60px_-15px_rgba(89,0,24,0.5)] hover:border-[var(--gold)] transition-all duration-700">
            {/* الصورة السينمائية العريضة */}
            <div className="relative aspect-16/10 sm:aspect-16/9 w-full overflow-hidden bg-stone-950">
              <img
                src={heroImageUrl}
                alt={mainArticle?.titleAr || "خبر رئيسي"}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter brightness-95 contrast-105"
                loading="eager"
              />

              {/* تدرج ظلي مسرحي هائل من الأسفل والأعلى لقراءة العناوين الفخمة */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* شارات التمييز العلوية المذهبة */}
              <div className="absolute top-4 start-4 flex items-center gap-2.5 z-10">
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

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight group-hover:text-[var(--gold)] transition-colors duration-300 drop-shadow-md">
                  <Link href={`/article/${mainArticle?.id}/${mainArticle?.slug}`}>
                    {mainArticle?.titleAr}
                  </Link>
                </h1>

                {mainArticle?.summaryAr && (
                  <p className="text-xs sm:text-sm md:text-base text-stone-200 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-2xl font-normal opacity-95">
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
                        {heroStory.coverageCount} زوايا متابعة ميدانية
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

          {/* تغطيات المتابعة المساندة أسفل الخبر البطل مع صور توثيقية عريضة */}
          {relatedCoverages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {relatedCoverages.map((rel) => {
                const relImg = resolveEditorialImage(rel);
                return (
                  <div
                    key={rel.id}
                    className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] hover:shadow-xl transition-all duration-300 flex items-center gap-3.5 group"
                  >
                    <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-stone-900 border border-[var(--border)] shadow-xs">
                      <img
                        src={relImg}
                        alt={rel.titleAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-black text-[var(--primary)] bg-[var(--primary-light,#59001815)] px-2 py-0.5 rounded-md">
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

        {/* 2. شريط الممر السريع والتدفق الحي (The Live Fast Stream Wire) - أسلوب دنيا الوطن والجزيرة نت - 5 أعمدة */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* ترويسة الممر السريع المباشر الإمبراطورية */}
          <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600 shadow-md" />
              </span>
              <h2 className="font-black text-lg text-[var(--text)] tracking-tight">
                الممر السريع · نبض الأحداث
              </h2>
            </div>
            <span className="text-[11px] font-black text-red-600 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>تحديث دقيقة بدقيقة</span>
            </span>
          </div>

          {/* قائمة الأخبار السريعة مع الصور المصغرة الموثقة الدائمة */}
          <div className="space-y-3">
            {secondaryArticles.slice(0, 5).map((art) => {
              const artImg = resolveEditorialImage(art);
              return (
                <article
                  key={art.id}
                  className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] hover:shadow-lg transition-all duration-300 group flex items-center gap-3.5"
                >
                  {/* الصورة المصغرة لكل خبر بدون استثناء */}
                  <div className="relative w-22 h-20 rounded-xl overflow-hidden shrink-0 bg-stone-900 border border-[var(--border)] shadow-xs">
                    <img
                      src={artImg}
                      alt={art.titleAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {art.isBreaking && (
                      <span className="absolute top-1 start-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md animate-pulse">
                        عاجل
                      </span>
                    )}
                  </div>

                  {/* بيانات الخبر والعنوان */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 text-[10px] text-[var(--text-muted)]">
                      <span className="font-black text-[var(--primary)] bg-[var(--primary-light,#59001815)] px-2 py-0.5 rounded-md">
                        {art.sectionNameAr}
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-2.5 h-2.5 text-[var(--gold)]" />
                        <span>
                          {new Date(art.publishedAt).toLocaleTimeString("ar-EG", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </span>
                    </div>

                    <h3 className="font-bold text-xs sm:text-sm text-[var(--text)] line-clamp-2 group-hover:text-[var(--primary)] transition-colors leading-snug">
                      <Link href={`/article/${art.id}/${art.slug}`}>
                        {art.titleAr}
                      </Link>
                    </h3>

                    <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-0.5">
                      <span className="truncate max-w-[140px] font-medium flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>{art.source?.nameAr || "الوطن اليوم"}</span>
                      </span>
                      <Link
                        href={`/article/${art.id}/${art.slug}`}
                        className="text-[var(--primary)] font-bold hover:underline flex items-center gap-0.5 text-[11px]"
                      >
                        <span>التفاصيل</span>
                        <ArrowLeft className="w-3 h-3 rtl:rotate-0" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
