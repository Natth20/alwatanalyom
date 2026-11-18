import Link from "next/link";
import { getActiveBreaking } from "@/lib/dal";
import { Radio, Flame, ArrowLeft, ShieldCheck, Clock } from "lucide-react";
import { Metadata } from "next";
import { resolveEditorialImage } from "@/lib/editorial-images";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "شريط العواجل والتحديثات الفورية — الوطن اليوم",
  description: "متابعة لحظية للأخبار العاجلة والتطورات الميدانية في فلسطين والعالم بمصادرها الأصلية.",
};

export default async function BreakingPage() {
  const breakingNews = await getActiveBreaking();

  return (
    <div className="container-custom py-8 max-w-4xl mx-auto space-y-8">
      {/* الترويسة الرئيسية لغرفة العواجل */}
      <div className="relative rounded-3xl overflow-hidden border border-red-500/30 bg-gradient-to-r from-red-950/40 via-[var(--surface)] to-[var(--surface)] p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
              <span className="text-xs font-black text-red-500 uppercase tracking-wider">
                مباشر · تدفق ميداني مستمر
              </span>
              <span className="text-[10px] bg-red-500/10 text-red-600 px-2.5 py-0.5 rounded-full font-bold border border-red-500/20">
                تحديث تلقائي لحظة بلحظة
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-[var(--text)]">
              شريط الأخبار العاجلة والتحديثات الميدانية
            </h1>

            <p className="text-xs md:text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
              رصد دقيق دقيقة بدقيقة لكافة التطورات والأحداث الطارئة في غزة، القدس الشريف، الضفة الغربية، والساحتين الإقليمية والدولية.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-5 py-2.5 rounded-2xl bg-red-600 text-white text-xs font-black flex items-center gap-2 shadow-lg animate-pulse">
              <Radio className="w-4 h-4" />
              <span>{breakingNews.length} عواجل نشطة</span>
            </div>
          </div>
        </div>
      </div>

      {/* قائمة العواجل الزمنية مع صور صحفية مصغرة */}
      <div className="space-y-3.5">
        {breakingNews.length > 0 ? (
          breakingNews.map((news) => {
            const timeStr = new Date(news.publishedAt).toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
            });
            const newsImg = resolveEditorialImage(news);

            return (
              <article
                key={news.id}
                className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-red-500/50 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* شريط تمييز جانبي ملون */}
                <div className="absolute top-0 bottom-0 start-0 w-1.5 rounded-s-2xl bg-gradient-to-b from-red-600 to-[#590018]" />

                <div className="flex items-center gap-3.5 ps-2 min-w-0 flex-1">
                  {/* صورة مصغرة لكل خبر عاجل */}
                  <div className="relative w-20 h-18 rounded-xl overflow-hidden shrink-0 bg-stone-900 border border-[var(--border)]">
                    <img
                      src={newsImg}
                      alt={news.titleAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <span className="absolute top-1 start-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                      عاجل
                    </span>
                  </div>

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono font-black text-red-600 bg-red-500/10 px-2.5 py-0.5 rounded-lg text-[11px] flex items-center gap-1 border border-red-500/20">
                        <Clock className="w-3 h-3" />
                        <span>{timeStr}</span>
                      </span>
                      <span className="font-bold text-[var(--primary)] bg-[var(--primary-light,#59001815)] px-2 py-0.5 rounded-md text-[11px]">
                        {news.sectionNameAr}
                      </span>
                      <span className="text-[var(--text-muted)] font-medium text-[11px] flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        <span>{news.source?.nameAr || "وكالة معتمدة"}</span>
                      </span>
                    </div>

                    <h3 className="text-sm md:text-base font-black text-[var(--text)] leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2">
                      <Link href={`/article/${news.id}/${news.slug}`}>
                        {news.titleAr}
                      </Link>
                    </h3>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 ps-2 sm:ps-0">
                  <Link
                    href={`/article/${news.id}/${news.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-xs font-bold text-[var(--text)] hover:bg-[#590018] hover:text-[var(--gold)] hover:border-[#590018] transition-all shadow-xs group/btn"
                  >
                    <span>التفاصيل</span>
                    <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-0 transform group-hover/btn:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })
        ) : (
          <div className="p-12 text-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] space-y-2">
            <p className="font-bold text-base text-[var(--text)]">لا توجد بلاغات عاجلة في هذه الدقيقة</p>
            <p className="text-xs">غرفة المتابعة ترصد الأحداث على مدار الساعة وستبث التحديثات فور وقوعها.</p>
          </div>
        )}
      </div>
    </div>
  );
}
