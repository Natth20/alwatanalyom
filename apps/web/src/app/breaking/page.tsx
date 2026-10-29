import Link from "next/link";
import { getActiveBreaking } from "@/lib/dal";

export const revalidate = 15; // ISR 15 ثانية

export default async function BreakingPage() {
  const breakingNews = await getActiveBreaking();

  return (
    <div className="container-custom py-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 border-b-2 border-[var(--breaking)] pb-3 mb-6">
        <span className="w-3 h-3 rounded-full bg-[var(--breaking)] animate-ping"></span>
        <h1 className="text-2xl font-black text-[var(--text)]">الأخبار العاجلة والتحديثات الفورية</h1>
        <span className="text-xs bg-[var(--breaking)] text-white px-2 py-0.5 rounded-full font-bold">
          مباشر
        </span>
      </div>

      <div className="space-y-4">
        {breakingNews.length > 0 ? (
          breakingNews.map((news) => (
            <article
              key={news.id}
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--breaking)] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[var(--breaking)]">
                    {new Date(news.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <span>•</span>
                  <span className="font-semibold text-[var(--text-muted)]">{news.source?.nameAr || "مصدر معتمد"}</span>
                  <span>•</span>
                  <span className="text-[var(--primary)]">{news.sectionNameAr}</span>
                </div>
                <h3 className="text-lg font-bold text-[var(--text)] hover:text-[var(--primary)]">
                  <Link href={`/article/${news.id}/${news.slug}`}>
                    {news.titleAr}
                  </Link>
                </h3>
              </div>

              <Link
                href={`/article/${news.id}/${news.slug}`}
                className="shrink-0 px-3 py-1.5 rounded-md border border-[var(--border)] text-xs font-semibold hover:bg-[var(--primary)] hover:text-white transition-colors text-center"
              >
                التفاصيل والمصدر ←
              </Link>
            </article>
          ))
        ) : (
          <div className="p-12 text-center text-[var(--text-muted)] rounded-xl border border-[var(--border)]">
            لا توجد أخبار عاجلة نشطة خلال الستين دقيقة الأخيرة.
          </div>
        )}
      </div>
    </div>
  );
}

