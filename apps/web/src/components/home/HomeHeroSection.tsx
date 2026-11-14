import Link from "next/link";
import { StorySummary, ArticleCard as ArticleCardType } from "@awt/shared";
import { Clock, ShieldCheck, Flame } from "lucide-react";

interface Props {
  heroStory?: StorySummary;
  heroArticle?: ArticleCardType;
  secondaryArticles?: ArticleCardType[];
}

export function HomeHeroSection({ heroStory, heroArticle, secondaryArticles = [] }: Props) {
  if (!heroArticle && !heroStory) return null;

  const mainArticle = heroArticle || heroStory?.articles[0];
  const relatedCoverages = heroStory?.articles.slice(1) || [];

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* الخبر البطل الرئيسي (Lead Hero) - يشغل 7 أعمدة */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative group overflow-hidden rounded-2xl bg-stone-950 border border-[var(--gold)]/20 shadow-xl transition-all hover:border-[var(--gold)]/40">
            {/* الصورة أو الخلفية المتدرجة الفخمة */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-gradient-to-t from-[#26000a] via-[#3d0010] to-[#590018]">
              {mainArticle?.coverImageUrl ? (
                <img
                  src={mainArticle.coverImageUrl}
                  alt={mainArticle.titleAr}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-30">
                  <span className="text-8xl font-black text-[var(--gold)]">وطن</span>
                </div>
              )}

              {/* تدرج عنابي ملكي سفلي لقراءة مريحة للنصوص */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0006] via-[#26000a]/80 to-transparent" />

              {/* شارات التمييز في أعلى البطاقة */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                {mainArticle?.isBreaking ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-[var(--coral-red,#E84A5F)] text-white shadow-lg animate-pulse">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>عاجل</span>
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#590018]/90 text-[var(--gold)] border border-[var(--gold)]/40 shadow-md">
                    {mainArticle?.sectionNameAr || "تغطية خاصة"}
                  </span>
                )}

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  <span>موثق بمصدر</span>
                </span>
              </div>

              {/* محتوى الخبر البطل */}
              <div className="absolute bottom-0 right-0 left-0 p-5 sm:p-8 space-y-3">
                <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight group-hover:text-[var(--gold)] transition-colors">
                  <Link href={`/article/${mainArticle?.id}/${mainArticle?.slug}`}>
                    {mainArticle?.titleAr}
                  </Link>
                </h1>

                {mainArticle?.summaryAr && (
                  <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-2xl font-medium">
                    {mainArticle.summaryAr}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-3 text-xs text-stone-300 pt-2 border-t border-white/10">
                  <span className="font-bold text-[var(--gold)]">
                    {mainArticle?.source?.nameAr || "الوطن اليوم"}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(mainArticle?.publishedAt || Date.now()).toLocaleDateString("ar-EG")}</span>
                  </span>
                  {heroStory && heroStory.coverageCount > 1 && (
                    <>
                      <span>•</span>
                      <span className="text-[var(--gold)] font-semibold">
                        {heroStory.coverageCount} تغطيات مرتبطة
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* تغطيات مرتبطة بالحدث الرئيسي إن وجدت */}
          {relatedCoverages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {relatedCoverages.slice(0, 2).map((rel) => (
                <div
                  key={rel.id}
                  className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-[var(--primary)] block">
                      {rel.source?.nameAr || "متابعة"}
                    </span>
                    <h3 className="font-bold text-xs sm:text-sm text-[var(--text)] line-clamp-2 hover:text-[var(--primary)] leading-snug">
                      <Link href={`/article/${rel.id}/${rel.slug}`}>
                        {rel.titleAr}
                      </Link>
                    </h3>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] pt-2 mt-1 border-t border-[var(--border)]/50">
                    {new Date(rel.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* شبكة الأخبار الثانوية المتصدرة - تشغل 5 أعمدة */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-2.5">
            <h2 className="font-black text-lg text-[var(--text)] flex items-center gap-2">
              <span className="w-2 h-4 bg-[var(--gold)] rounded-sm" />
              <span>مستجدات رئيسية</span>
            </h2>
            <span className="text-xs text-[var(--text-muted)]">محدّثة لحظياً</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            {secondaryArticles.slice(0, 4).map((art, idx) => (
              <div
                key={art.id}
                className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)] hover:shadow-md transition-all group flex gap-3.5 items-start"
              >
                <div className="w-7 h-7 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] font-black text-xs flex items-center justify-center shrink-0 border border-[var(--primary)]/20">
                  {idx + 1}
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
                    <span className="font-bold text-[var(--primary)]">{art.sectionNameAr}</span>
                    <span>•</span>
                    <span>{art.source?.nameAr || "الوطن اليوم"}</span>
                  </div>

                  <h3 className="font-bold text-sm text-[var(--text)] line-clamp-2 group-hover:text-[var(--primary)] transition-colors leading-snug">
                    <Link href={`/article/${art.id}/${art.slug}`}>
                      {art.titleAr}
                    </Link>
                  </h3>

                  <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] pt-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(art.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

