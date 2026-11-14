import Link from "next/link";
import { Metadata } from "next";
import { getAidData } from "@/lib/dal";
import { ArticleCard } from "@/components/ArticleCard";
import { ShieldCheck, AlertTriangle, ExternalLink, HeartHandshake, CheckCircle2, Info, Building2 } from "lucide-react";

export const revalidate = 180; // ISR 3 دقائق

export const metadata: Metadata = {
  title: "بوابة المساعدات الإنسانية والروابط الرسمية الموثقة — الوطن اليوم",
  description: "الدليل المعتمد للمساعدات الإنسانية والإغاثية، فحص الأسماء، وتحديث بيانات الأونروا وبرنامج الأغذية والتنمية الاجتماعية بروابط رسمية موثقة 100%.",
  alternates: {
    canonical: "/aid",
  },
  openGraph: {
    title: "بوابة المساعدات الإنسانية والروابط الرسمية الموثقة — الوطن اليوم",
    description: "روابط رسمية موثقة للمساعدات الإغاثية والنقدية والغذائية من المصادر المعتمدة مباشرة.",
    type: "website",
  },
};

export default async function AidPage() {
  const { articles, verifiedPrograms } = await getAidData();

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
        name: "المساعدات الإنسانية",
        item: "https://alwatantoday.net/aid",
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
        <span className="text-[var(--primary)] font-bold">المساعدات الإنسانية</span>
      </nav>

      {/* ترويسة القسم الملكية */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-[var(--primary)] via-[#3e0011] to-[#1a0006] p-6 sm:p-10 text-white shadow-xl border border-[var(--gold)]/20">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 text-[var(--gold)] text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>بوابة التوثيق الرسمي للمساعدات والإغاثة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            المساعدات الإنسانية والروابط الرسمية المعتمدة
          </h1>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
            دليل «الوطن اليوم» الخدمي المعتمد للمساعدات النقدية، السلات الغذائية، وتحديث بيانات اللاجئين والمتضررين. كافة الروابط المضمنة أدناه تنتهي إلى البوابات الرسمية الحكومية والدولية مباشرة بدون وسطاء.
          </p>
        </div>

        {/* خلفية زخرفية ناعمة */}
        <div className="absolute left-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pe-8">
          <HeartHandshake className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* صندوق تنبيه أمني ضد الروابط المشبوهة والاحتيال (قواعد النزاهة وحماية المواطن) */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm text-[var(--text)]">
          <h2 className="font-bold text-amber-600 dark:text-amber-400">
            تنبيه أمني وإرشادي هام لجميع المواطنين:
          </h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            جميع روابط التسجيل وفحص الأسماء المدرجة في هذه الصفحة هي <strong>روابط رسمية ومجانية بالكامل</strong> تابعة للأمم المتحدة، الهلال الأحمر، والوزارات الرسمية.
            <strong className="text-[var(--primary)]"> لا تطلب المنصة ولا الجهات الرسمية أي مبالغ مالية أو أرقام بطاقات بنكية أو كلمات مرور تحت أي مسمى.</strong> احذر الصفحات المزيفة والروابط غير الموثقة على وسائل التواصل الاجتماعي.
          </p>
        </div>
      </div>

      {/* البرامج الرسمية الموثقة (Official Verified Programs) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[var(--primary)] rounded-full" />
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text)]">
              البوابات والبرامج الإغاثية المعتمدة
            </h2>
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            مُدققة ومحدّثة لحظياً
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {verifiedPrograms.map((prog) => (
            <div
              key={prog.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 flex flex-col justify-between hover:shadow-lg transition-all border-r-4 border-r-[var(--gold)]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>رابط رسمي موثق</span>
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{prog.organization}</span>
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[var(--text)] leading-snug">
                  {prog.titleAr}
                </h3>

                <div className="text-xs text-[var(--text-muted)] space-y-1.5 bg-[var(--surface-muted,#f8fafc)] dark:bg-stone-900/60 p-3 rounded-lg border border-[var(--border)]">
                  <p>
                    <strong className="text-[var(--text)]">الفئات المستهدفة:</strong> {prog.targetAudience}
                  </p>
                  <p>
                    <strong className="text-[var(--text)]">ملاحظة التقديم:</strong> {prog.notesAr}
                  </p>
                  {prog.requirements.length > 0 && (
                    <div className="pt-1">
                      <strong className="text-[var(--text)] block mb-1">المتطلبات الأساسية:</strong>
                      <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                        {prog.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                  <Info className="w-3.5 h-3.5 text-[var(--primary)]" />
                  <span>التحقق: {new Date(prog.verifiedAt).toLocaleDateString("ar-EG")}</span>
                </div>

                <a
                  href={prog.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors shadow-sm"
                >
                  <span>الذهاب للبوابة الرسمية</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* آخر الأخبار والتحديثات الميدانية الإغاثية */}
      <section className="space-y-4 pt-6">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[var(--primary)] rounded-full" />
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text)]">
              آخر أخبار وبيانات المساعدات الإنسانية
            </h2>
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            مأخوذة من المصادر المعتمدة مباشرة
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
              يتم رصد ونشر أحدث أخبار المساعدات لحظياً فور صدورها من الوكالات والمنظمات الرسمية.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

