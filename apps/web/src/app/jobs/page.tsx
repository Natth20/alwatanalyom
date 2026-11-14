import Link from "next/link";
import { Metadata } from "next";
import { getJobsData } from "@/lib/dal";
import { ArticleCard } from "@/components/ArticleCard";
import { Briefcase, ShieldCheck, MapPin, Calendar, ExternalLink, CheckCircle2, Clock } from "lucide-react";

export const revalidate = 180; // ISR 3 دقائق

export const metadata: Metadata = {
  title: "بوابة الوظائف وفرص العمل الموثقة — الوطن اليوم",
  description: "دليل شواغر العمل والفرص الوظيفية في المنظمات الدولية (الأونروا، الأمم المتحدة)، المؤسسات الحكومية، والعمل الرقمي الحر عن بعد بروابط رسمية موثقة.",
  alternates: {
    canonical: "/jobs",
  },
  openGraph: {
    title: "بوابة الوظائف وفرص العمل الموثقة — الوطن اليوم",
    description: "شواغر عمل وفرص توظيف حقيقية وموثقة من الجهات المشغلة مباشرة.",
    type: "website",
  },
};

export default async function JobsPage() {
  const { articles, verifiedJobs } = await getJobsData();

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
        name: "فرص العمل والوظائف",
        item: "https://alwatantoday.net/jobs",
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
        <span className="text-[var(--primary)] font-bold">فرص العمل والوظائف</span>
      </nav>

      {/* ترويسة القسم الملكية */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-[var(--primary)] via-[#3e0011] to-[#1a0006] p-6 sm:p-10 text-white shadow-xl border border-[var(--gold)]/20">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 text-[var(--gold)] text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>بوابة التوظيف المهني والشواغر المعتمدة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            فرص العمل والوظائف الموثقة
          </h1>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
            منصة الإعلانات الوظيفية الموثقة للكفاءات والباحثين عن عمل في فلسطين والعالم العربي. نوفر روابط التقديم الرسمية لشواغر المنظمات الأممية والشركات والمؤسسات التعليمية والعمل عن بعد.
          </p>
        </div>

        <div className="absolute left-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pe-8">
          <Briefcase className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* تنبيه النزاهة والتقديم المجاني */}
      <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 p-4 sm:p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm text-[var(--text)]">
          <h2 className="font-bold text-sky-600 dark:text-sky-400">
            معايير الأمان والشفافية الوظيفية في «الوطن اليوم»:
          </h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            كافة الشواغر المنشورة يتم تدقيق جهاتها المُعلنة، والتقديم عليها <strong>مجاني بالكامل وبلا أي وسيط</strong>. لا تدفع أي مبالغ تحت بند رسوم توظيف أو استمارات، وتواصل دائماً عبر القنوات الرسمية المثبتة لكل جهة.
          </p>
        </div>
      </div>

      {/* الشواغر والفرص الوظيفية المعتمدة */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[var(--primary)] rounded-full" />
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text)]">
              الشواغر والبوابات الوظيفية المعتمدة
            </h2>
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            روابط تقديم مباشرة
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {verifiedJobs.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 flex flex-col justify-between hover:shadow-lg transition-all border-t-4 border-t-[var(--gold)]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>جهة معتمدة</span>
                  </span>
                  <span className="text-[11px] font-semibold text-[var(--primary)]">
                    {job.organization}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[var(--text)] leading-snug">
                  {job.titleAr}
                </h3>

                <div className="space-y-2 text-xs text-[var(--text-muted)]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[var(--gold)]" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    <span>الموعد النهائي: {job.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span>نوع العمل: {job.employmentType === "REMOTE" ? "عن بعد" : "دوام كامل / تعاقد"}</span>
                  </div>
                </div>

                {job.requirements.length > 0 && (
                  <div className="text-xs text-[var(--text-muted)] pt-2 border-t border-[var(--border)]">
                    <strong className="text-[var(--text)] block mb-1">المؤهلات المطلوبة:</strong>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      {job.requirements.map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border)]">
                <a
                  href={job.officialApplyUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors shadow-sm"
                >
                  <span>تقديم الطلب عبر الموقع الرسمي</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* آخر إعلانات وأخبار الوظائف */}
      <section className="space-y-4 pt-6">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[var(--primary)] rounded-full" />
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text)]">
              آخر أخبار ومستجدات التوظيف وسوق العمل
            </h2>
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            محدثة باستمرار
          </span>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-[var(--border)] rounded-xl bg-[var(--surface)]/50">
            <p className="text-sm text-[var(--text-muted)]">
              يتم تحديث إعلانات التوظيف وفرص العمل فور صدورها من المؤسسات والجهات الرسمية.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

