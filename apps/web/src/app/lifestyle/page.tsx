import Link from "next/link";
import { Metadata } from "next";
import { getSectionFeed } from "@/lib/dal";
import { ArticleCard } from "@/components/ArticleCard";
import { Heart, Activity, Apple, Sparkles, ShieldCheck } from "lucide-react";

export const revalidate = 180; // ISR 3 دقائق

export const metadata: Metadata = {
  title: "نمط الحياة والصحة — الوطن اليوم",
  description: "أحدث التقارير والمقالات الموثقة في الصحة العامة، التغذية السليمة، جودة الحياة، والصحة النفسية والأسرة بمرجعية علمية وطبية معتمدة.",
  alternates: {
    canonical: "/lifestyle",
  },
  openGraph: {
    title: "نمط الحياة والصحة — الوطن اليوم",
    description: "دليلك لحياة صحية ومتوازنة بتقارير طبية وعلمية موثقة.",
    type: "website",
  },
};

export default async function LifestylePage() {
  const feed = await getSectionFeed("lifestyle");
  const articles = feed?.articles || [];
  const heroArticle = articles[0];
  const secondaryArticles = articles.slice(1);

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
        name: "نمط الحياة والصحة",
        item: "https://alwatantoday.net/lifestyle",
      },
    ],
  };

  const categories = [
    { name: "صحة وتغذية", icon: Apple, desc: "نصائح غذائية وحميات علمية موثقة" },
    { name: "صحة نفسية وجودة حياة", icon: Heart, desc: "التوازن النفسي والتعامل مع الضغوط" },
    { name: "وقاية وطب عام", icon: Activity, desc: "إرشادات منظمة الصحة العالمية والوزارات المعتمدة" },
    { name: "الأسرة والطفل", icon: Sparkles, desc: "رعاية الطفل والبيئة الأسرية السليمة" },
  ];

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
        <span className="text-[var(--primary)] font-bold">نمط الحياة والصحة</span>
      </nav>

      {/* ترويسة القسم الملكية المحدثة */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2b0410] via-[#3e0011] to-[#120106] p-7 sm:p-11 text-white shadow-2xl border border-[var(--gold)]/30">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-85" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 text-[var(--gold)] text-xs font-black">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>الصحة وجودة الحياة بمرجعية علمية موثقة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight title-imperial">
            مجلة نمط الحياة <span className="text-[var(--gold)]">والصحة والمجتمع</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
            مساحتكم المعرفية للصحة الجسدية والنفسية، التغذية السليمة، والتوازن الأسري. نلتزم بنشر المواد الطبية المستندة إلى دراسات علمية محكّمة وبيانات الهيئات الصحية الرسمية.
          </p>
        </div>

        <div className="absolute left-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pe-8">
          <Activity className="w-64 h-64 text-white" />
        </div>
      </header>

      {/* تنبيه النزاهة الطبية */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 sm:p-5 flex items-center gap-3 text-xs sm:text-sm text-[var(--text)]">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <p className="text-[var(--text-muted)] leading-relaxed">
          <strong className="text-[var(--text)]">ميثاق التحرير الصحي في «الوطن اليوم»:</strong> لا نروّج للعلاجات غير المثبتة أو الشائعات الطبية. كافة المواد التوعوية تخضع للتدقيق وفق إرشادات منظمة الصحة العالمية والمراجع الطبية المعتمدة.
        </p>
      </div>

      {/* محاور القسم */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, idx) => {
          const IconComponent = cat.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] dark:bg-gradient-to-b dark:from-[#1b050b]/95 dark:to-[#0e0407]/95 hover:border-[var(--gold)]/60 hover:-translate-y-0.5 hover:shadow-lg transition-all text-start space-y-2"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 dark:bg-[var(--gold)]/15 text-[var(--primary)] dark:text-[var(--gold)] border border-[var(--primary)]/20 dark:border-[var(--gold)]/30 flex items-center justify-center">
                <IconComponent className="w-5 h-5" />
              </div>
              <h3 className="font-black text-sm text-[var(--text)]">{cat.name}</h3>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{cat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* محتوى المقالات */}
      <section className="space-y-8 pt-4">
        {heroArticle && (
          <ArticleCard article={heroArticle} variant="hero" />
        )}

        {secondaryArticles.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 bg-[var(--primary)] rounded-full" />
                <h2 className="text-xl sm:text-2xl font-black text-[var(--text)]">
                  أحدث التقارير الصحية والحياتية
                </h2>
              </div>
              <span className="text-xs text-[var(--text-muted)]">
                تحديث دوري
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondaryArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        )}

        {articles.length === 0 && (
          <div className="text-center py-16 border border-dashed border-[var(--border)] rounded-xl bg-[var(--surface)]/50">
            <Heart className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3 opacity-40" />
            <h3 className="text-base font-bold text-[var(--text)] mb-1">
              يتم إعداد تقارير قسم نمط الحياة والصحة
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
              سيتم نشر أحدث المقالات التوعوية والدراسات الطبية المحققة فور استكمال مراجعتها التحريرية.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

