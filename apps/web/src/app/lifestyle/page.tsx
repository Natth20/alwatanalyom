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

      {/* ترويسة القسم الملكية */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-[var(--primary)] via-[#3e0011] to-[#1a0006] p-6 sm:p-10 text-white shadow-xl border border-[var(--gold)]/20">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 text-[var(--gold)] text-xs font-bold">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>الصحة وجودة الحياة بمرجعية علمية</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            نمط الحياة والصحة
          </h1>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
            مساحتكم الإخبارية والتوعوية للصحة الجسدية والنفسية، التغذية السليمة، والأسرة. نلتزم بنشر المواد الطبية المستندة إلى دراسات علمية محكّمة وبيانات الهيئات الصحية الرسمية.
          </p>
        </div>

        <div className="absolute left-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pe-8">
          <Activity className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* تنبيه النزاهة الطبية */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-center gap-3 text-xs sm:text-sm text-[var(--text)]">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <p className="text-[var(--text-muted)] leading-relaxed">
          <strong className="text-[var(--text)]">ميثاق التحرير الصحي في «الوطن اليوم»:</strong> لا نروّج للعلاجات الشعبية غير المثبتة أو الإشاعات الطبية. كافة المعلومات التوعوية تخضع للتدقيق وفقاً لإرشادات منظمة الصحة العالمية والمراجع الطبية المعتمدة.
        </p>
      </div>

      {/* محاور القسم */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, idx) => {
          const IconComponent = cat.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)] hover:shadow-md transition-all text-start"
            >
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-2">
                <IconComponent className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-[var(--text)] mb-1">{cat.name}</h3>
              <p className="text-[11px] text-[var(--text-muted)] leading-snug">{cat.desc}</p>
            </div>
          );
        })}
      </div>

      {/* محتوى المقالات */}
      <section className="space-y-6 pt-4">
        {heroArticle && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-6 bg-[var(--gold)] rounded-full" />
              <h2 className="text-xl font-black text-[var(--text)]">
                التقرير الرئيسي
              </h2>
            </div>
            <ArticleCard article={heroArticle} />
          </div>
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

