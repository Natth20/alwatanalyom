import Link from "next/link";
import { StorySummary, ArticleCard as ArticleCardType } from "@awt/shared";
import { Clock, ShieldCheck, Flame, Radio, ArrowLeft } from "lucide-react";
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
        {/* 1. الخبر البطل السينمائي الرئاسي (Lead Hero) - يشغل 7 أعمدة */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative group overflow-hidden rounded-3xl bg-[#120005] border border-[var(--gold)]/30 shadow-2xl hover:border-[var(--gold)] transition-all duration-500">
            {/* الصورة السينمائية العريضة */}
            <div className="relative aspect-16/10 sm:aspect-16/9 w-full overflow-hidden bg-stone-950">
              <img
                src={heroImageUrl}
                alt={mainArticle?.titleAr || "خبر رئيسي"}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="eager"
              />

              {/* تدرج ظلي دراماتيكي مسرحي لقراءة مثالية للعناوين */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

              {/* شارات التمييز العلوية */}
              <div className="absolute top-4 start-4 flex items-center gap-2 z-10">
                {mainArticle?.isBreaking ? (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-xl text-xs font-black bg-red-600 text-white shadow-lg animate-pulse">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>عاجل</span>
                  </span>
                ) : (
                  <span className="px-3.5 py-1 rounded-xl text-xs font-black bg-[#590018]/90 text-[var(--gold)] border border-[var(--gold)]/40 shadow-lg backdrop-blur-md">
                    {mainArticle?.sectionNameAr || "تغطية خاصة"}
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[11px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>موثق بمصدر</span>
                </span>
              </div>

              {/* تفاصيل المادة البطلة في أسفل الصورة */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 space-y-3 z-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-snug tracking-tight group-hover:text-[var(--gold)] transition-colors">
                  <Link href={`/article/${mainArticle?.id}/${mainArticle?.slug}`}>
                    {mainArticle?.titleAr}
                  </Link>
                </h1>

                {mainArticle?.summaryAr && (
                  <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 leading-relaxed max-w-2xl font-normal opacity-90">
                    {mainArticle.summaryAr}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300 pt-2 border-t border-white/15">
                  <span className="font-bold text-[var(--gold)]">
                    {mainArticle?.source?.nameAr || "الوطن اليوم"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Clock className="w-3 h-3 text-[var(--gold)]" />
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
                      <span className="text-[var(--gold)] font-bold text-[11px]">
                        {heroStory.coverageCount} زوايا متابعة
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* تغطيات المتابعة المساندة أسفل الخبر البطل مع صور توثيقية */}
          {relatedCoverages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {relatedCoverages.map((rel) => {
                const relImg = resolveEditorialImage(rel);
                return (
                  <div
                    key={rel.id}
                    className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] hover:shadow-md transition-all flex items-center gap-3 group"
                  >
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-900 border border-[var(--border)]">
                      <img
                        src={relImg}
                        alt={rel.titleAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-[var(--primary)] block">
                        {rel.source?.nameAr || "متابعة"}
                      </span>
                      <h3 className="font-bold text-xs sm:text-sm text-[var(--text)] line-clamp-2 group-hover:text-[var(--primary)] leading-snug">
                        <Link href={`/article/${rel.id}/${rel.slug}`}>
                          {rel.titleAr}
                        </Link>
                      </h3>
                      <span className="text-[10px] text-[var(--text-muted)] font-mono block">
                        {new Date(rel.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. شريط الممر السريع والتدفق الحي (The Live Fast Stream Wire) - أسلوب دنيا الوطن والجزيرة نت - 5 أعمدة */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* ترويسة الممر السريع المباشر */}
          <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-2.5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600" />
              </span>
              <h2 className="font-black text-base text-[var(--text)]">
                الممر السريع · نبض الأحداث
              </h2>
            </div>
            <span className="text-[11px] font-bold text-red-600 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>لحظة بلحظة</span>
            </span>
          </div>

          {/* قائمة الأخبار السريعة مع الصور المصغرة الموثقة الدائمة */}
          <div className="space-y-3">
            {secondaryArticles.slice(0, 5).map((art) => {
              const artImg = resolveEditorialImage(art);
              return (
                <article
                  key={art.id}
                  className="p-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/60 hover:shadow-md transition-all group flex items-center gap-3.5"
                >
                  {/* الصورة المصغرة لكل خبر بدون استثناء */}
                  <div className="relative w-22 h-20 rounded-xl overflow-hidden shrink-0 bg-stone-900 border border-[var(--border)]">
                    <img
                      src={artImg}
                      alt={art.titleAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                        <Clock className="w-2.5 h-2.5" />
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
                      <span className="truncate max-w-[140px]">
                        {art.source?.nameAr || "الوطن اليوم"}
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
