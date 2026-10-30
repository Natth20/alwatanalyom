import Link from "next/link";
import { getActiveBreaking } from "@/lib/dal";
import { Radio, Bell, Flame, ShieldAlert, ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 15; // ISR 15 ثانية

export const metadata: Metadata = {
  title: "شريط العواجل والتحديثات الفورية — الوطن اليوم",
  description: "متابعة لحظية للأخبار العاجلة والتطورات الميدانية في فلسطين والعالم بمصادرها الأصلية.",
};

export default async function BreakingPage() {
  const breakingNews = await getActiveBreaking();

  return (
    <div className="container-custom py-8 max-w-4xl mx-auto space-y-8">
      {/* الترويسة الرئيسية لغرفة العواجل */}
      <div className="relative rounded-2xl overflow-hidden border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-[var(--surface)] to-[var(--surface)] p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                مباشر · تدفق مستمر
              </span>
              <span className="text-[10px] bg-rose-500/10 text-rose-600 px-2 py-0.5 rounded-full font-bold">
                تحديث تلقائي كل 15 ثانية
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
            <div className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold flex items-center gap-2 shadow-md">
              <Radio className="w-4 h-4 animate-pulse" />
              <span>{breakingNews.length} عواجل نشطة</span>
            </div>
          </div>
        </div>
      </div>

      {/* قائمة العواجل الزمنية */}
      <div className="space-y-4">
        {breakingNews.length > 0 ? (
          breakingNews.map((news, index) => {
            const timeStr = new Date(news.publishedAt).toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <article
                key={news.id}
                className="group relative rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-rose-500/40 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* شريط تمييز جانبي ملون */}
                <div className="absolute top-0 bottom-0 start-0 w-1.5 rounded-s-xl bg-gradient-to-b from-rose-600 to-rose-800" />

                <div className="space-y-2 ps-2 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-rose-600 bg-rose-500/10 px-2.5 py-0.5 rounded-md text-[11px] flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      <span>{timeStr}</span>
                    </span>
                    <span className="text-[var(--text-muted)]">•</span>
                    <span className="font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded text-[11px]">
                      {news.sectionNameAr}
                    </span>
                    <span className="text-[var(--text-muted)]">•</span>
                    <span className="text-[var(--text-muted)] font-semibold text-[11px]">
                      المصدر: {news.source?.nameAr || "وكالة معتمدة"}
                    </span>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-[var(--text)] leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    <Link href={`/article/${news.id}/${news.slug}`}>
                      {news.titleAr}
                    </Link>
                  </h3>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <Link
                    href={`/article/${news.id}/${news.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-xs font-bold text-[var(--text)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all shadow-sm group/btn"
                  >
                    <span>التفاصيل الكاملة</span>
                    <ArrowLeft className="w-3.5 h-3.5 transform group-hover/btn:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })
        ) : (
          <div className="p-16 text-center text-[var(--text-muted)] rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <ShieldAlert className="w-10 h-10 mx-auto text-[var(--primary)] opacity-40" />
            <h3 className="font-bold text-base text-[var(--text)]">الهدوء الميداني يسود الآن</h3>
            <p className="text-xs max-w-sm mx-auto">
              لا توجد تنبيهات عاجلة مسجلة خلال الدقائق الأخيرة. غرف المتابعة ترصد المصادر الرسمية على مدار الساعة.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
