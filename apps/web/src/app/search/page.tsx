import Link from "next/link";
import { searchArticles } from "@/lib/dal";
import { SITE_SECTIONS } from "@awt/shared";
import { Metadata } from "next";
import { Search, Sparkles, Filter, ArrowLeft, Clock } from "lucide-react";

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

const TRENDING_KEYWORDS = [
  "غزة",
  "القدس الشريف",
  "أسعار الذهب",
  "الدولار والشيكل",
  "الضفة الغربية",
  "الذكاء الاصطناعي",
  "يلا سبورت",
];

export default async function SearchPage({ searchParams }: Props) {
  const { q = "", section = "" } = await searchParams;
  const results = q.trim() ? await searchArticles(q, section || undefined, 30) : [];

  return (
    <div className="container-custom py-8 max-w-4xl mx-auto space-y-8">
      {/* الترويسة الرئيسية */}
      <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-r from-[var(--surface)] to-[var(--bg)] p-6 md:p-8 space-y-2 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center">
            <Search className="w-4 h-4" />
          </div>
          <h1 className="text-2xl font-black text-[var(--text)]">
            محرك البحث الذكي في منصة «الوطن اليوم»
          </h1>
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          ابحث بدقة في مئات التغطيات الإخبارية والقصص المجمعة والمصنفة من مصادرها الرسمية الموثقة.
        </p>
      </div>

      {/* حقل البحث ونماذج الفرز */}
      <form method="GET" action="/search" className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute start-4 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="اكتب كلمة البحث (مثال: غزة، الذهب، القدس، النفط)..."
              className="w-full ps-11 pe-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--primary)] shadow-sm"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-[var(--primary)] text-white font-bold text-sm hover:bg-[var(--primary-hover)] transition-colors shrink-0 shadow-sm flex items-center gap-2"
          >
            <span>بحث</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* الكلمات والوسوم الشائعة */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)] pt-1">
          <span className="flex items-center gap-1 font-semibold text-[var(--text)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>عمليات البحث الشائعة:</span>
          </span>
          {TRENDING_KEYWORDS.map((kw) => (
            <Link
              key={kw}
              href={`/search?q=${encodeURIComponent(kw)}`}
              className="px-2.5 py-1 rounded-lg bg-[var(--surface)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] border border-[var(--border)] text-[11px] transition-colors"
            >
              #{kw}
            </Link>
          ))}
        </div>

        {/* فلاتر الأقسام السريعة */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs pt-2 scrollbar-none">
          <span className="text-[var(--text-muted)] font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>تصفية:</span>
          </span>
          <Link
            href={q ? `/search?q=${encodeURIComponent(q)}` : "/search"}
            className={`px-3.5 py-1.5 rounded-xl border font-bold transition-colors ${
              !section
                ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm"
                : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            الكل
          </Link>
          {SITE_SECTIONS.map((sec) => (
            <Link
              key={sec.slug}
              href={`/search?q=${encodeURIComponent(q)}&section=${sec.slug}`}
              className={`px-3.5 py-1.5 rounded-xl border font-bold transition-colors whitespace-nowrap ${
                section === sec.slug
                  ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] text-[var(--text-muted)] hover:text-[var(--text)]"
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
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-4 bg-[var(--surface)] p-3 rounded-xl border border-[var(--border)]">
              <span>
                نتائج البحث عن كلمة: <strong className="text-[var(--text)]">&quot;{q}&quot;</strong>
              </span>
              <span className="font-bold text-[var(--primary)]">
                عُثر على {results.length} نتيجة
              </span>
            </div>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((item) => (
                  <article
                    key={item.id}
                    className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 hover:shadow-md transition-all duration-200 space-y-2.5"
                  >
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      <span className="text-[var(--primary)] font-bold bg-[var(--primary)]/10 px-2 py-0.5 rounded text-[11px]">
                        {item.sectionNameAr}
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-[11px]">{item.sourceNameAr}</span>
                      <span className="mr-auto text-[11px] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(item.publishedAt).toLocaleDateString("ar-EG")}</span>
                      </span>
                    </div>

                    <h3 className="font-bold text-base md:text-lg text-[var(--text)] hover:text-[var(--primary)] transition-colors leading-snug">
                      <Link href={`/article/${item.id}/${item.slug}`}>
                        {item.titleAr}
                      </Link>
                    </h3>

                    {item.summaryAr && (
                      <p className="text-xs md:text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                        {item.summaryAr}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <div className="p-16 text-center text-xs text-[var(--text-muted)] rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
                <Search className="w-8 h-8 mx-auto opacity-30 text-[var(--primary)]" />
                <p className="font-bold text-sm text-[var(--text)]">لم نعثر على نتائج تطابق &quot;{q}&quot;</p>
                <p>جرب استخدام كلمات بحث أكثر عمومية أو إزالة تصفية الأقسام الحالية.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-16 text-center text-xs text-[var(--text-muted)] rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
            <Search className="w-10 h-10 mx-auto opacity-20" />
            <p className="font-bold text-sm text-[var(--text)]">ابدأ البحث الفوري الآن</p>
            <p>أدخل أي كلمة أو انقر على أحد الموضوعات الشائعة أعلاه للاطلاع على التغطيات.</p>
          </div>
        )}
      </div>
    </div>
  );
}
