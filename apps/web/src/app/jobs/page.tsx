import Link from "next/link";
import { Metadata } from "next";
import { getJobsData } from "@/lib/dal";
import { ArticleCard } from "@/components/ArticleCard";
import {
  Briefcase,
  ShieldCheck,
  MapPin,
  Calendar,
  ExternalLink,
  CheckCircle2,
  Clock,
  Building2,
  GraduationCap,
  Laptop,
  HeartHandshake,
  FileText,
  AlertTriangle,
  Globe2,
  Compass,
  Sparkles,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";

export const revalidate = 180; // ISR 3 دقائق

export const metadata: Metadata = {
  title: "بوابة الوظائف وفرص العمل الموثقة — الوطن اليوم",
  description: "دليل شواغر العمل والفرص الوظيفية في المنظمات الدولية (الأونروا، الأمم المتحدة)، المؤسسات الحكومية، والعمل الرقمي الحر عن بعد بروابط رسمية موثقة 100%.",
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

  const SECTOR_LABELS: Record<string, { label: string; icon: any; color: string }> = {
    UN_INGO: { label: "منظمات دولية وأممية", icon: Globe2, color: "text-sky-400 bg-sky-500/15 border-sky-400/30" },
    EDUCATION: { label: "التعليم والتدريب", icon: GraduationCap, color: "text-amber-300 bg-amber-500/15 border-amber-400/30" },
    HEALTHCARE: { label: "الصحة والإغاثة الطبية", icon: HeartHandshake, color: "text-rose-400 bg-rose-500/15 border-rose-400/30" },
    TECH: { label: "التقنية والعمل عن بعد", icon: Laptop, color: "text-emerald-400 bg-emerald-500/15 border-emerald-400/30" },
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* شريط التنقل العلوي الملكي */}
      <div className="border-b border-white/10 bg-gradient-to-r from-black/80 via-[#180309]/80 to-black/80 py-4">
        <div className="container-custom max-w-6xl mx-auto flex items-center justify-between text-xs text-stone-300">
          <nav aria-label="فتات الخبز" className="flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">
              الرئيسية
            </Link>
            <ChevronLeft className="w-3.5 h-3.5 text-stone-500" />
            <span className="text-[var(--gold)] font-bold">بوابة الوظائف وفرص العمل الموثقة</span>
          </nav>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>روابط مباشرة إلى بوابات التشغيل الرسمية</span>
          </span>
        </div>
      </div>

      <div className="container-custom max-w-6xl mx-auto py-10 space-y-12">
        {/* 1. الترويسة الرئاسية الفاخرة للوظائف */}
        <div className="relative rounded-3xl overflow-hidden border border-[var(--gold)]/30 bg-gradient-to-br from-[#1c020b]/95 via-[#120106]/95 to-[#0a0004]/95 p-8 md:p-12 shadow-2xl space-y-6">
          <div className="pointer-events-none absolute -top-32 right-1/4 w-96 h-96 bg-[var(--gold)]/12 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/35 text-[var(--gold)] text-xs font-bold shadow-xs">
              <Briefcase className="w-4 h-4" />
              <span>دليل الشواغر والتوظيف المهني المعتمد لعام 2026</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              بوابة الوظائف وفرص العمل <span className="text-[var(--gold)]">الموثقة</span>
            </h1>

            <p className="text-sm md:text-base text-stone-300 leading-relaxed">
              منصة التوظيف الرقمية المعتمدة للكوادر والمهنيين في فلسطين والعالم العربي. نوفر روابط التقديم الرسمية والمباشرة إلى بوابات الأمم المتحدة، المنظمات الدولية (UNRWA / UNDP)، المؤسسات التعليمية، ومنصات العمل عن بعد الموثوقة دون وسطاء أو رسوم.
            </p>
          </div>

          {/* لوحة المؤشرات السريعة للبوابة */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-[11px] text-stone-400 block">شواغر معتمدة ومفتوحة</span>
              <strong className="font-mono text-xl font-black text-white block">
                {verifiedJobs.length} بوابات رسمية
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-[11px] text-stone-400 block">رسوم التقديم</span>
              <strong className="text-sm font-black text-emerald-400 block">
                مجاني 100% بدون أي رسوم
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-[11px] text-stone-400 block">طبيعة الشواغر</span>
              <strong className="text-sm font-black text-[var(--gold)] block">
                ميداني / إقليمي / عن بُعد
              </strong>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-[11px] text-stone-400 block">معدل التحديث</span>
              <strong className="text-sm font-black text-sky-400 block">
                مراجعة دورية كل 180 ثانية
              </strong>
            </div>
          </div>
        </div>

        {/* 2. تنبيه النزاهة وحماية الباحثين عن عمل */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 sm:p-6 flex items-start gap-4 text-xs sm:text-sm text-stone-200">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1.5 leading-relaxed">
            <h2 className="font-black text-amber-300 text-sm">
              معايير الأمان والشفافية التامة في بوابة الوظائف:
            </h2>
            <p className="text-stone-300">
              كافة الروابط المنشورة تنتهي إلى المواقع الرسمية للجهات المشغلة (`careers.un.org`، `unrwa.org`، إلخ). <strong className="text-white">لا تطلب المنصة ولا أي جهة أممية موثوقة أي مبالغ مالية أو بيانات مصرفية أو كلمات مرور تحت بند رسوم تقديم أو ملفات توظيف.</strong> احذر الصفحات المزيفة وروابط التواصل غير الموثقة.
            </p>
          </div>
        </div>

        {/* 3. الشواغر والفرص الوظيفية المعتمدة */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--gold)]/15 text-[var(--gold)] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  البوابات والفرص الوظيفية المعتمدة
                </h2>
                <span className="text-xs text-stone-400">
                  روابط مباشرة ومحدثة للبوابات الرسمية
                </span>
              </div>
            </div>

            <span className="text-xs font-mono text-[var(--gold)] bg-white/5 border border-white/10 px-3 py-1 rounded-full self-start sm:self-auto">
              {verifiedJobs.length} شواغر متاحة
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verifiedJobs.map((job) => {
              const sectorInfo = SECTOR_LABELS[job.sector] || {
                label: job.sector,
                icon: Briefcase,
                color: "text-stone-300 bg-white/10 border-white/20",
              };
              const SectorIcon = sectorInfo.icon;

              return (
                <article
                  key={job.id}
                  className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-black/60 p-6 flex flex-col justify-between hover:border-[var(--gold)]/40 hover:shadow-xl transition-all space-y-5 group"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${sectorInfo.color}`}>
                        <SectorIcon className="w-3.5 h-3.5" />
                        <span>{sectorInfo.label}</span>
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-400">
                        <Clock className="w-3 h-3 text-[var(--gold)]" />
                        <span>{job.deadline}</span>
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-lg font-black text-white group-hover:text-[var(--gold)] transition-colors leading-snug">
                        {job.titleAr}
                      </h3>
                      <p className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[var(--gold)]" />
                        <span>{job.organization}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{job.location}</span>
                      </span>
                      <span>·</span>
                      <span className="bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/10 font-bold text-white text-[11px]">
                        {job.employmentType === "FULL_TIME"
                          ? "دوام كامل"
                          : job.employmentType === "CONTRACT"
                          ? "عقد سنوي / مشروع"
                          : "عمل عن بعد"}
                      </span>
                    </div>

                    {job.requirements && job.requirements.length > 0 && (
                      <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 space-y-1.5 text-xs">
                        <span className="font-bold text-[var(--gold)] block text-[11px]">
                          المتطلبات الأساسية للتقديم:
                        </span>
                        <ul className="space-y-1 text-stone-300 text-[11px]">
                          {job.requirements.map((req, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-1.5">
                              <span className="text-[var(--gold)] mt-0.5">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] text-stone-500 font-mono">
                      تم التدقيق: {new Date(job.verifiedAt).toLocaleDateString("ar-EG")}
                    </span>

                    <a
                      href={job.officialApplyUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#120004] hover:brightness-110 text-xs font-black transition-all shadow-md shadow-amber-950/20 cursor-pointer"
                    >
                      <span>التقديم عبر البوابة الرسمية</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* 4. دليل التوظيف والعمل الحر عن بعد للكفاءات الفلسطينية */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#120005]/80 to-black/80 p-7 md:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">
                دليل العمل الحر عن بعد (Freelance & Remote Work)
              </h3>
              <p className="text-xs text-stone-400">
                منصات معتمدة ومسارات تحويل مالي آمنة للمستقلين في فلسطين
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <strong className="text-emerald-300 font-bold block text-sm">المنصات العالمية المعتمدة</strong>
              <p className="text-stone-300 leading-relaxed">
                منصات Upwork وFreelancer وMostaql توفر آلاف فرص البرمجة، الترجمة، والتصميم للمستقلين داخل قطاع غزة والضفة الغربية.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <strong className="text-[var(--gold)] font-bold block text-sm">استلام المستحقات المالية</strong>
              <p className="text-stone-300 leading-relaxed">
                يمكن ربط الحسابات عبر بنك فلسطين، البنك العربي، ومحافظ الدفع الإلكتروني المعتمدة من سلطة النقد الفلسطينية.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <strong className="text-sky-300 font-bold block text-sm">معايير السيرة الذاتية (CV)</strong>
              <p className="text-stone-300 leading-relaxed">
                اعتماد النموذج الكندي أو الأوروبي (Europass) مع إرفاق روابط لأعمال حقيقية موثقة ومعتمدة لزيادة فرص القبول.
              </p>
            </div>
          </div>
        </section>

        {/* 5. آخر الأخبار والتحديثات التوظيفية */}
        {articles.length > 0 && (
          <section className="space-y-4 pt-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 bg-[var(--primary)] rounded-full" />
                <h2 className="text-xl font-black text-white">
                  آخر أخبار الوظائف وسوق العمل
                </h2>
              </div>
              <span className="text-xs text-stone-400">
                تغطيات من المصادر المعتمدة مباشرة
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
