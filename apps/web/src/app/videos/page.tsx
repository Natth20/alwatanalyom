import Link from "next/link";
import { Metadata } from "next";
import { getVideosData } from "@/lib/dal";
import { Play, Video, Clock, Film, ShieldCheck } from "lucide-react";

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
    <div className="container-custom py-8 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* مسار التنقل (Breadcrumb) */}
      <nav className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--primary)]">الرئيسية</Link>
        <span>/</span>
        <span className="text-[var(--primary)] font-bold">فيديو</span>
      </nav>

      {/* ترويسة القسم الملكية */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-[var(--primary)] via-[#3e0011] to-[#1a0006] p-6 sm:p-10 text-white shadow-xl border border-[var(--gold)]/20">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 text-[var(--gold)] text-xs font-bold">
            <Film className="w-4 h-4" />
            <span>الصحافة المرئية والتغطيات الميدانية</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            فيديو وتقارير مرئية
          </h1>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
            الحدث بالصورة والصوت. تقارير ميدانية موثقة، إيجازات خبرية سريعة، وتحقيقات مرئية من قلب الميدان تلتزم بأعلى معايير الدقة الصحفية والتحقق الرقمي.
          </p>
        </div>

        <div className="absolute left-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pe-8">
          <Video className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* الفيديو الرئيسي المميز (Hero Video Feature) */}
      {heroVideo && (
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm overflow-hidden space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[var(--primary)] rounded-full" />
            <h2 className="text-xl font-black text-[var(--text)]">
              التقرير المرئي الرئيسي
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 relative rounded-xl overflow-hidden aspect-video bg-black group shadow-md border border-[var(--border)]">
              {/* صورة مصغرة مع زر تشغيل تفاعلي */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                <Link
                  href={`/article/${heroVideo.id}/${heroVideo.slug}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[var(--primary)] text-white flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110 border-2 border-[var(--gold)]"
                  aria-label="تشغيل الفيديو"
                >
                  <Play className="w-8 h-8 fill-current ms-1" />
                </Link>
              </div>

              {/* شارة المدة والتصنيف */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-black/80 text-[var(--gold)] text-xs font-bold border border-white/10 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{heroVideo.duration}</span>
                </span>
                <span className="px-2.5 py-1 rounded bg-[var(--primary)] text-white text-xs font-bold">
                  {heroVideo.sectionNameAr}
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-3">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>مادة مرئية محققة</span>
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-[var(--text)] leading-snug">
                <Link
                  href={`/article/${heroVideo.id}/${heroVideo.slug}`}
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  {heroVideo.titleAr}
                </Link>
              </h3>

              {heroVideo.summaryAr && (
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {heroVideo.summaryAr}
                </p>
              )}

              <div className="pt-2 text-xs text-[var(--text-muted)] flex items-center gap-3">
                <span>المصدر: {heroVideo.sourceNameAr}</span>
                <span>•</span>
                <span>{new Date(heroVideo.publishedAt).toLocaleDateString("ar-EG")}</span>
              </div>

              <div className="pt-2">
                <Link
                  href={`/article/${heroVideo.id}/${heroVideo.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors"
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
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[var(--primary)] rounded-full" />
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text)]">
              أحدث مقاطع الفيديو والتقارير المصورة
            </h2>
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            تحديث مستمر
          </span>
        </div>

        {otherVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherVideos.map((video) => (
              <div
                key={video.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-video bg-stone-900 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-center justify-center">
                      <Link
                        href={`/article/${video.id}/${video.slug}`}
                        className="w-12 h-12 rounded-full bg-[var(--primary)]/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border border-[var(--gold)]/60"
                        aria-label="تشغيل"
                      >
                        <Play className="w-5 h-5 fill-current ms-0.5" />
                      </Link>
                    </div>

                    <div className="absolute bottom-2 right-2 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-black/80 text-[var(--gold)] text-[11px] font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                      </span>
                    </div>

                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-0.5 rounded bg-[var(--primary)]/90 text-white text-[10px] font-bold">
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
                  <span>{video.sourceNameAr}</span>
                  <span>{new Date(video.publishedAt).toLocaleDateString("ar-EG")}</span>
                </div>
              </div>
            ))}
          </div>
        ) : !heroVideo ? (
          <div className="text-center py-16 border border-dashed border-[var(--border)] rounded-xl bg-[var(--surface)]/50">
            <Video className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3 opacity-40" />
            <h3 className="text-base font-bold text-[var(--text)] mb-1">
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

