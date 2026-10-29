import Link from "next/link";
import { searchArticles } from "@/lib/dal";
import { SITE_SECTIONS } from "@awt/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "البحث الفوري في الأخبار والقصص — الوطن اليوم",
  robots: { index: false, follow: true },
};

interface Props {
  searchParams: Promise<{
    q?: string;
    section?: string;
  }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", section = "" } = await searchParams;
  const results = q.trim() ? await searchArticles(q, section || undefined, 30) : [];

  return (
    <div className="container-custom py-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-[var(--text)] mb-2">
          البحث الفوري في الأخبار والقصص
        </h1>
        <p className="text-xs text-[var(--text-muted)]">
          ابحث في مئات الأخبار المجمعة والمصنفة من مصادرها الأصلية المعتمدة
        </p>
      </div>

      {/* حقل البحث ونماذج الفرز */}
      <form method="GET" action="/search" className="space-y-4">
        <div className="flex gap-2">
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="اكتب كلمة البحث (مثال: غزة، الذهب، الذكاء الاصطناعي)..."
            className="flex-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--primary)] shadow-sm"
            autoFocus
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-bold text-sm hover:bg-[var(--primary-hover)] transition-colors shrink-0 shadow-sm"
          >
            بحث
          </button>
        </div>

        {/* فلاتر الأقسام السريعة */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[var(--text-muted)] font-semibold">تصفية حسب:</span>
          <Link
            href={q ? `/search?q=${encodeURIComponent(q)}` : "/search"}
            className={`px-3 py-1 rounded-full border transition-colors ${
              !section
                ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]"
            }`}
          >
            الكل
          </Link>
          {SITE_SECTIONS.map((sec) => (
            <Link
              key={sec.slug}
              href={`/search?q=${encodeURIComponent(q)}&section=${sec.slug}`}
              className={`px-3 py-1 rounded-full border transition-colors whitespace-nowrap ${
                section === sec.slug
                  ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]"
              }`}
            >
              {sec.nameAr}
            </Link>
          ))}
        </div>
      </form>

      {/* نتائج البحث */}
      <div className="space-y-4 pt-4 border-t border-[var(--border)]">
        {q ? (
          <div>
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-4">
              <span>نتائج البحث عن: &quot;{q}&quot;</span>
              <span>عُثر على {results.length} نتيجة</span>
            </div>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((item) => (
                  <article
                    key={item.id}
                    className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] transition-colors space-y-2"
                  >
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      <span className="text-[var(--primary)] font-semibold">{item.sectionNameAr}</span>
                      <span>•</span>
                      <span>{item.sourceNameAr}</span>
                      <span className="mr-auto">
                        {new Date(item.publishedAt).toLocaleDateString("ar-EG")}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-[var(--text)] hover:text-[var(--primary)]">
                      <Link href={`/article/${item.id}/${item.slug}`}>
                        {item.titleAr}
                      </Link>
                    </h3>

                    {item.summaryAr && (
                      <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                        {item.summaryAr}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-xs text-[var(--text-muted)] rounded-xl border border-[var(--border)]">
                لم يتم العثور على أي نتائج تطابق &quot;{q}&quot;. جرب استخدام كلمات أكثر عمومية أو إزالة علامات التصفية.
              </div>
            )}
          </div>
        ) : (
          <div className="p-12 text-center text-xs text-[var(--text-muted)]">
            أدخل كلمة في مربع البحث أعلاه لبدء استكشاف الأخبار والمواضيع.
          </div>
        )}
      </div>
    </div>
  );
}
