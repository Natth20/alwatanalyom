import Link from "next/link";
import { Metadata } from "next";
import { getVideosData } from "@/lib/dal";
import { Play, Video, Clock, Film, ShieldCheck, ChevronLeft } from "lucide-react";
import { resolveEditorialImage } from "@/lib/editorial-images";

export const revalidate = 180; // ISR 3 دقائق

export const metadata: Metadata = {
  title: "فيديو وتقارير مرئية — الوطن اليوم",
  description: "المحتوى المرئي والتقارير المصورة، إيجازات الأخبار، وتغطيات الميدان المصورة بدقة وموثوقية من شبكة مراسلي الوطن اليوم ووكالات الأنباء المعتمدة.",
  alternates: {
    canonical: "/videos",
  },
  openGraph: {
    title: "فيديو وتقارير مرئية — الوطن اليوم",
    description: "شاهد أحدث التغطيات المرئية والتقارير الميدانية المصورة.",
    type: "website",
  },
};

export default async function VideosPage() {
  const videos = await getVideosData();
  const heroVideo = videos[0];
  const otherVideos = videos.slice(1);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: "https://alwatantoday.net",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "فيديو",
        item: "https://alwatantoday.net/videos",
      },
    ],
  };

  return (
    <div className="container-custom py-8 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* مسار التنقل (Breadcrumb) */}
      <nav aria-label="فتات الخبز" className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--primary)] transition-colors">الرئيسية</Link>
        <span>/</span>
        <span className="text-[var(--primary)] font-bold">فيديو وتغطيات مرئية</span>
      </nav>

      {/* ترويسة القسم الملكية الفخمة */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-[#590018] via-[#35000e] to-[#140005] p-6 sm:p-10 text-white shadow-2xl border border-[var(--gold)]/30">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 text-[var(--gold)] text-xs font-black">
            <Film className="w-4 h-4" />
            <span>الصحافة المرئية والتغطيات الميدانية بالصوت والصورة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
            فيديو وتقارير مرئية
          </h1>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-normal">
            الحدث بالصورة والصوت. تقارير استقصائية موثقة، إيجازات خبرية سريعة، وتحقيقات مرئية من قلب الميدان تلتزم بأعلى معايير الدقة الصحفية والتحقق الرقمي.
          </p>
        </div>

        <div className="absolute left-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pe-8">
          <Video className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* الفيديو الرئيسي المميز (Hero Video Feature) */}
      {heroVideo && (
        <section className="rounded-3xl border border-[var(--gold)]/20 bg-gradient-to-b from-[#200008] via-[#140005] to-[#0A0002] p-6 sm:p-8 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-6 bg-[var(--gold)] rounded-full" />
              <h2 className="text-xl font-black text-white">
                التقرير المرئي المتصدر
              </h2>
            </div>
            <span className="text-xs text-[var(--gold)] font-bold">بث عالي الدقة</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
            <div className="lg:col-span-8 relative rounded-2xl overflow-hidden aspect-video bg-stone-950 group shadow-2xl border border-white/10">
              {/* صورة الفيديو الحقيقية */}
              <img
                src={resolveEditorialImage({ titleAr: heroVideo.titleAr, id: heroVideo.id, sectionSlug: "videos" })}
                alt={heroVideo.titleAr}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
                loading="eager"
              />

              {/* زر تشغيل فخم في المنتصف */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                <Link
                  href={`/article/${heroVideo.id}/${heroVideo.slug}`}
                  className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[var(--gold)] text-[#140005] flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-115 border-4 border-white/80"
                  aria-label="تشغيل الفيديو"
                >
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-current ms-1 text-[#140005]" />
                </Link>
              </div>

              {/* شارة المدة والتصنيف */}
              <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between">
                <span className="px-3 py-1 rounded-xl bg-black/80 text-[var(--gold)] text-xs font-mono font-bold border border-white/20 backdrop-blur-md flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{heroVideo.duration}</span>
                </span>
                <span className="px-3 py-1 rounded-xl bg-[#590018]/90 text-white text-xs font-black border border-[var(--gold)]/30 backdrop-blur-md">
                  {heroVideo.sectionNameAr}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-xl">
                <ShieldCheck className="w-4 h-4" />
                <span>مادة مرئية محققة وموثقة</span>
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug group-hover:text-[var(--gold)] transition-colors">
                <Link href={`/article/${heroVideo.id}/${heroVideo.slug}`}>
                  {heroVideo.titleAr}
                </Link>
              </h3>

              {heroVideo.summaryAr && (
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                  {heroVideo.summaryAr}
                </p>
              )}

              <div className="pt-2 text-xs text-stone-400 flex items-center gap-3 border-t border-white/10 font-mono">
                <span>المصدر: {heroVideo.sourceNameAr}</span>
                <span>•</span>
                <span>{new Date(heroVideo.publishedAt).toLocaleDateString("ar-EG")}</span>
              </div>

              <div className="pt-2">
                <Link
                  href={`/article/${heroVideo.id}/${heroVideo.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--gold)] text-[#140005] text-xs font-black hover:brightness-110 transition-all shadow-md"
                >
                  <span>مشاهدة التقرير كاملاً</span>
                  <Play className="w-3.5 h-3.5 fill-current" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* شبكة الفيديوهات */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-6 bg-[var(--primary)] rounded-full" />
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text)]">
              أحدث مقاطع الفيديو والتقارير المصورة
            </h2>
          </div>
          <span className="text-xs text-[var(--text-muted)] font-mono">
            {otherVideos.length} تقرير مصور
          </span>
        </div>

        {otherVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherVideos.map((video) => {
              const vImg = resolveEditorialImage({
                titleAr: video.titleAr,
                id: video.id,
                sectionSlug: "videos",
              });
              return (
                <div
                  key={video.id}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm hover:border-[var(--primary)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-video bg-stone-950 overflow-hidden">
                      <img
                        src={vImg}
                        alt={video.titleAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                        <Link
                          href={`/article/${video.id}/${video.slug}`}
                          className="w-13 h-13 rounded-full bg-[var(--gold)] text-[#140005] flex items-center justify-center group-hover:scale-115 transition-transform shadow-xl border-2 border-white"
                          aria-label="تشغيل"
                        >
                          <Play className="w-6 h-6 fill-current ms-0.5 text-[#140005]" />
                        </Link>
                      </div>

                      <div className="absolute bottom-2.5 start-2.5 flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-lg bg-black/80 text-[var(--gold)] text-[11px] font-mono font-bold flex items-center gap-1 backdrop-blur-xs">
                          <Clock className="w-3 h-3" />
                          <span>{video.duration}</span>
                        </span>
                      </div>

                      <div className="absolute top-2.5 end-2.5">
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#590018]/90 text-white text-[10px] font-bold border border-[var(--gold)]/30 backdrop-blur-xs">
                          {video.sectionNameAr}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-sm sm:text-base text-[var(--text)] line-clamp-2 group-hover:text-[var(--primary)] transition-colors leading-snug">
                        <Link href={`/article/${video.id}/${video.slug}`}>
                          {video.titleAr}
                        </Link>
                      </h3>

                      {video.summaryAr && (
                        <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                          {video.summaryAr}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="p-4 pt-0 border-t border-[var(--border)] mt-2 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                    <span className="font-bold">{video.sourceNameAr}</span>
                    <span className="font-mono">{new Date(video.publishedAt).toLocaleDateString("ar-EG")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : !heroVideo ? (
          <div className="text-center py-16 border border-dashed border-[var(--border)] rounded-2xl bg-[var(--surface)]/50 space-y-2">
            <Video className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-2 opacity-40" />
            <h3 className="text-base font-bold text-[var(--text)]">
              يتم تجهيز مكتبة الفيديو والتقارير المرئية
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
              سيتم نشر التقارير المصورة الميدانية فور إتمام تدقيقها الصحفي والفني.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
