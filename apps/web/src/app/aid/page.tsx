import Link from "next/link";
import { Metadata } from "next";
import { getAidData, VerifiedAidItem } from "@/lib/dal";
import { ArticleCard } from "@/components/ArticleCard";
import {
  AlertTriangle, ArrowUpRight, BadgeCheck, Building2, CheckCircle2, ChevronLeft,
  Clock, Cross, ExternalLink, Eye, FileCheck2, Filter, Globe, HandHeart,
  HeartHandshake, HeartPulse, Info, KeyRound, Landmark, Link2, Lock, Newspaper,
  PhoneCall, Radio, ShieldAlert, ShieldCheck, Siren, Smartphone, Users,
} from "lucide-react";

export const revalidate = 180; // ISR 3 دقائق

export const metadata: Metadata = {
  title: "بوابة المساعدات الإنسانية ومركز الطوارئ الموثق — الوطن اليوم",
  description:
    "المركز الشامل والمعتمد للمساعدات الإنسانية والإغاثية، أرقام الطوارئ الرسمية، التحقق من الروابط، وبرامج الأونروا وبرنامج الأغذية والتنمية الاجتماعية.",
  alternates: { canonical: "/aid" },
  openGraph: {
    title: "بوابة المساعدات الإنسانية ومركز الطوارئ الموثق — الوطن اليوم",
    description:
      "روابط رسمية موثقة للمساعدات الإغاثية والنقدية والغذائية وأرقام الطوارئ من المصادر المعتمدة مباشرة.",
    type: "website",
  },
};

interface HotlineItem {
  readonly id: string;
  readonly entity: string;
  readonly number: string;
  readonly telHref: string;
  readonly description: string;
  readonly availability: string;
}

interface OrgThemeConfig {
  readonly badgeLabel: string;
  readonly accentBorder: string;
  readonly topStripe: string;
  readonly logoBoxClass: string;
  readonly badgeClass: string;
  readonly buttonClass: string;
  readonly shortCode: string;
}

interface OfficialContactItem {
  readonly id: string;
  readonly nameAr: string;
  readonly shortName: string;
  readonly domain: string;
  readonly officialUrl: string;
  readonly scopeAr: string;
  readonly channelNoteAr: string;
  readonly accentClass: string;
}

const EMERGENCY_HOTLINES: readonly HotlineItem[] = [
  { id: "prcs-101", entity: "الهلال الأحمر الفلسطيني", number: "101", telHref: "tel:101", description: "الإسعاف والطوارئ الطبية ونقل المصابين", availability: "طوارئ 24/7" },
  { id: "civil-defense-102", entity: "الدفاع المدني", number: "102", telHref: "tel:102", description: "الإنقاذ الميداني والإطفاء وإخلاء الحالات الطارئة", availability: "استجابة فورية" },
  { id: "unrwa-1800-100", entity: "خط الطوارئ UNRWA", number: "1800-100", telHref: "tel:1800100", description: "الاستعلام عن خدمات الإغاثة والمأوى والمساعدات", availability: "رقم مجاني" },
] as const;

const FRAUD_INDICATORS: readonly string[] = [
  "أي رسالة أو صفحة تطلب دفع رسوم تسجيل أو عمولة مقابل إدراج الاسم في قوائم المساعدات.",
  "طلب أرقام البطاقات البنكية أو المحافظ الإلكترونية أو رموز التحقق المؤقتة (OTP).",
  "استخدام نطاقات مختصرة أو مجانية غير رسمية مثل (.blogspot أو .xyz أو نماذج غير موثقة).",
  "طلب مشاركة صور شخصية خاصة أو كلمات مرور البريد الإلكتروني وحسابات التواصل.",
  "وعود بصرف مبالغ مالية فورية مقابل إعادة توجيه رابط إلى مجموعات الدردشة.",
] as const;

const LINK_VERIFICATION_STEPS: readonly { readonly title: string; readonly detail: string }[] = [
  { title: "افحص امتداد النطاق الرسمي بدقة", detail: "تنتهي المواقع الرسمية المعتمدة بامتدادات مؤسسية مثل (.org أو .int أو .gov.ps) مع تطابق اسم الجهة." },
  { title: "تأكد من بروتوكول التشفير HTTPS", detail: "تحقق من ظهور رمز القفل وبداية العنوان بـ https:// قبل إدخال أي رقم هوية أو رقم هاتف." },
  { title: "طابق الإعلان مع الموقع الأصلي", detail: "ادخل مباشرة إلى البوابة الرئيسية للمنظمة من قائمة الروابط الموثقة أدناه بدلاً من الروابط المتداولة." },
  { title: "التسجيل الإغاثي مجاني 100%", detail: "لا تفرض الأمم المتحدة ولا الهلال الأحمر ولا الوزارة أي مقابل مالي للتسجيل أو الاستعلام." },
] as const;

const ORG_THEMES: Record<VerifiedAidItem["orgType"], OrgThemeConfig> = {
  UN: {
    badgeLabel: "منظمة أممية (UN)", accentBorder: "border-sky-500/35 hover:border-sky-400/60",
    topStripe: "from-sky-400 via-blue-500 to-teal-400", logoBoxClass: "bg-sky-500/15 border-sky-400/35 text-sky-300",
    badgeClass: "bg-sky-500/15 text-sky-300 border-sky-400/30", buttonClass: "bg-gradient-to-l from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-sky-950/50", shortCode: "UN",
  },
  RED_CRESCENT: {
    badgeLabel: "الهلال الأحمر والصليب الأحمر", accentBorder: "border-rose-500/35 hover:border-rose-400/60",
    topStripe: "from-rose-500 via-red-500 to-amber-400", logoBoxClass: "bg-rose-500/15 border-rose-400/35 text-rose-300",
    badgeClass: "bg-rose-500/15 text-rose-300 border-rose-400/30", buttonClass: "bg-gradient-to-l from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-rose-950/50", shortCode: "PRCS",
  },
  GOV: {
    badgeLabel: "بوابة حكومية رسمية", accentBorder: "border-emerald-500/35 hover:border-emerald-400/60",
    topStripe: "from-emerald-400 via-teal-400 to-emerald-600", logoBoxClass: "bg-emerald-500/15 border-emerald-400/35 text-emerald-300",
    badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30", buttonClass: "bg-gradient-to-l from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-950/50", shortCode: "GOV",
  },
  NGO: {
    badgeLabel: "مؤسسة إغاثية معتمدة", accentBorder: "border-teal-500/35 hover:border-teal-400/60",
    topStripe: "from-teal-400 via-emerald-400 to-cyan-500", logoBoxClass: "bg-teal-500/15 border-teal-400/35 text-teal-300",
    badgeClass: "bg-teal-500/15 text-teal-300 border-teal-400/30", buttonClass: "bg-gradient-to-l from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white shadow-teal-950/50", shortCode: "NGO",
  },
};

const CATEGORY_LABELS: Record<VerifiedAidItem["category"], string> = {
  CASH: "مساعدات نقدية", FOOD: "قسائم وسلات غذائية", MEDICAL: "طوارئ وإسعاف طبي", SHELTER: "مأوى وإيواء عاجل", WINTER: "إغاثة شتوية",
};

const STATUS_LABELS: Record<VerifiedAidItem["status"], { readonly label: string; readonly className: string }> = {
  OPEN: { label: "متاح على مدار الساعة", className: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
  UPDATING: { label: "تحديث بيانات نشط", className: "bg-amber-500/15 text-amber-300 border-amber-400/30" },
  VERIFIED_INFO: { label: "بوابة استعلام معتمدة", className: "bg-teal-500/15 text-teal-300 border-teal-400/30" },
};

const OFFICIAL_CONTACTS: readonly OfficialContactItem[] = [
  { id: "contact-unrwa", nameAr: "وكالة غوث وتشغيل اللاجئين (UNRWA)", shortName: "UNRWA", domain: "unrwa.org", officialUrl: "https://www.unrwa.org/ar", scopeAr: "تحديث سجلات اللاجئين، الإغاثة الطارئة، والخدمات الصحية والتعليمية.", channelNoteAr: "خط الطوارئ المجاني: 1800-100", accentClass: "border-sky-500/30 hover:border-sky-400/60 text-sky-300" },
  { id: "contact-wfp", nameAr: "برنامج الأغذية العالمي (WFP)", shortName: "WFP", domain: "wfp.org", officialUrl: "https://ar.wfp.org", scopeAr: "الطرود الغذائية، القسائم الإلكترونية، وتنسيق الأمن الغذائي.", channelNoteAr: "إشعارات الصرف عبر SMS الرسمية فقط", accentClass: "border-teal-500/30 hover:border-teal-400/60 text-teal-300" },
  { id: "contact-prcs", nameAr: "جمعية الهلال الأحمر الفلسطيني", shortName: "الهلال الأحمر", domain: "palestinercs.org", officialUrl: "https://www.palestinercs.org/ar", scopeAr: "خدمات الإسعاف، الإخلاء الطبي، المستشفيات الميدانية، والإغاثة العاجلة.", channelNoteAr: "الرقم الوطني للطوارئ: 101", accentClass: "border-rose-500/30 hover:border-rose-400/60 text-rose-300" },
  { id: "contact-mosa", nameAr: "وزارة التنمية الاجتماعية", shortName: "التنمية الاجتماعية", domain: "mosa.gov.ps", officialUrl: "http://www.mosa.gov.ps", scopeAr: "السجل الاجتماعي الموحد، المساعدات النقدية، ورعاية الأسر الأشد احتياجاً.", channelNoteAr: "الاستعلام عبر نظام الدخول الموحد", accentClass: "border-emerald-500/30 hover:border-emerald-400/60 text-emerald-300" },
] as const;

const PHYSICAL_SAFETY_GUIDELINES: readonly string[] = [
  "اعتمد فقط نقاط التوزيع المعتمدة والمعلنة عبر الرسائل النصية الرسمية أو بيانات الجهات الإغاثية.",
  "احتفظ بالوثائق الثبوتية الأساسية (الهوية الشخصية وبطاقة التسجيل) في حافظة مقاومة للماء.",
  "تجنب التجمهر العشوائي عند المراكز والتزم بتعليمات فرق السلامة والمتطوعين الميدانيين.",
  "أبلغ الجهات المختصة فوراً عن أي محاولة استغلال أو اشتراط مقابل مادي للحصول على المساعدة.",
] as const;

const DIGITAL_SECURITY_GUIDELINES: readonly string[] = [
  "استخدم متصفحاً محدثاً ولا تحفظ بياناتك الحساسة على أجهزة عامة أو هواتف مشتركة.",
  "لا تشارك رمز التحقق المرسل عبر SMS (OTP) مع أي شخص يدعي تمثيل جهة إغاثية.",
  "فعّل قفل الشاشة برمز سري قوي لحماية رسائل القسائم الغذائية والمعلومات العائلية.",
  "تحقق من عنوان الموقع في شريط المتصفح مباشرة قبل إدخال رقم الهوية أو رقم الهاتف.",
] as const;

function renderOrgIcon(orgType: VerifiedAidItem["orgType"]) {
  if (orgType === "UN") return <Globe className="w-6 h-6" />;
  if (orgType === "RED_CRESCENT") return <Cross className="w-6 h-6" />;
  if (orgType === "GOV") return <Landmark className="w-6 h-6" />;
  return <Building2 className="w-6 h-6" />;
}

export default async function AidPage() {
  const { articles, verifiedPrograms } = await getAidData();
  const breakingCount = articles.filter((article) => article.isBreaking).length;
  const uniqueSections = Array.from(new Map(articles.map((a) => [a.sectionSlug, a.sectionNameAr])).entries());
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: "https://alwatantoday.net" },
      { "@type": "ListItem", position: 2, name: "المساعدات الإنسانية", item: "https://alwatantoday.net/aid" },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0E0407] text-[var(--text)]">
      <div className="container-custom py-8 sm:py-10 space-y-10">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

        <nav aria-label="مسار التنقل" className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link href="/" className="hover:text-emerald-400 transition-colors">الرئيسية</Link>
          <ChevronLeft className="w-3.5 h-3.5 text-emerald-500/60" />
          <span className="text-emerald-400 font-bold">بوابة المساعدات الإنسانية والطوارئ</span>
        </nav>

        {/* SECTION 1 — EMERGENCY HERO */}
        <section className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-bl from-[#062E24] via-[#0E0407] to-[#3B0010] p-6 sm:p-10 shadow-2xl">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-[var(--gold)] to-teal-400 opacity-85" />
          <div className="absolute -top-24 -end-24 w-72 h-72 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -start-24 w-72 h-72 rounded-full bg-[#590018]/40 blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-black">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                  </span>
                  <Radio className="w-4 h-4 text-emerald-300" />
                  <span>مركز استجابة إغاثية موثق · تحديث مستمر</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#590018]/70 border border-[var(--gold)]/35 text-[var(--gold)] text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>روابط رسمية 100% بلا وسطاء</span>
                </span>
              </div>
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 items-center justify-center shrink-0 shadow-lg shadow-emerald-950/50">
                  <HeartHandshake className="w-8 h-8" />
                </div>
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">مركز المساعدات الإنسانية والطوارئ الموثق</h1>
                  <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl">
                    الدليل الخدمي المعتمد في «الوطن اليوم» للوصول الآمن إلى بوابات الإغاثة النقدية، القسائم
                    الغذائية، خدمات الإسعاف، وتحديث بيانات المستفيدين عبر الروابط الحكومية والأممية الرسمية مباشرة.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a href="#verified-programs" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-l from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-emerald-950/60">
                  <FileCheck2 className="w-4 h-4" />
                  <span>استعراض البوابات المعتمدة</span>
                </a>
                <a href="#fraud-warning" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#16060B]/90 border border-[var(--gold)]/35 hover:border-[var(--gold)] text-[var(--gold)] font-bold text-xs sm:text-sm transition-all">
                  <ShieldAlert className="w-4 h-4" />
                  <span>دليل فحص الروابط والأمان</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-3xl border border-emerald-400/25 bg-[#16060B]/90 backdrop-blur-xl p-5 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Siren className="w-5 h-5 text-rose-400 animate-pulse" />
                  <h2 className="text-sm sm:text-base font-black text-white">أرقام الطوارئ والنجدة الفورية</h2>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-rose-500/15 text-rose-300 border border-rose-500/30">اتصال مباشر</span>
              </div>
              <div className="space-y-3">
                {EMERGENCY_HOTLINES.map((line) => (
                  <a key={line.id} href={line.telHref} className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0E0407]/85 hover:border-emerald-400/50 hover:bg-emerald-950/30 p-3.5 transition-all">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm text-white group-hover:text-emerald-300 transition-colors">{line.entity}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 font-bold">{line.availability}</span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] truncate">{line.description}</p>
                    </div>
                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 font-black text-base font-mono shrink-0 group-hover:bg-emerald-500 group-hover:text-stone-950 transition-colors">
                      <PhoneCall className="w-4 h-4" />
                      <span dir="ltr">{line.number}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — FRAUD WARNING (enhanced) */}
        <section id="fraud-warning" className="rounded-3xl border border-amber-500/35 bg-gradient-to-br from-[#231207] via-[#16060B] to-[#0E0407] p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-black text-amber-300">بروتوكول الحماية من الاحتيال الإلكتروني</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">تنبيه أمني هام: احذر روابط المساعدات الوهمية وصفحات التصيّد</h2>
              </div>
            </div>
            <span className="self-start md:self-center px-3.5 py-1.5 rounded-2xl bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-black">التسجيل الرسمي مجاني بالكامل</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-rose-500/25 bg-[#0E0407]/85 p-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-black text-rose-300">علامات تحذيرية تكشف الروابط المزيفة:</h3>
              </div>
              <ul className="space-y-3">
                {FRAUD_INDICATORS.map((indicator, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-200 leading-relaxed">
                    <span className="w-5 h-5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-black">!</span>
                    <span>{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-500/25 bg-[#0E0407]/85 p-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <BadgeCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-black text-emerald-300">كيف تتحقق من شرعية رابط المساعدات قبل استخدامه؟</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LINK_VERIFICATION_STEPS.map((step, idx) => (
                  <div key={idx} className="rounded-2xl border border-emerald-500/20 bg-[#16060B]/90 p-3.5 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-black text-emerald-300">
                      <Lock className="w-3.5 h-3.5 shrink-0" />
                      <span>{step.title}</span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{step.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — VERIFIED PROGRAMS (enhanced) */}
        <section id="verified-programs" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-emerald-500/20 pb-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>سجل البرامج الموثقة والمفحوصة نطاقياً</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">البوابات والبرامج الإغاثية المعتمدة</h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <span className="px-3 py-1 rounded-xl bg-sky-500/10 text-sky-300 border border-sky-500/25 font-bold">أمم المتحدة</span>
              <span className="px-3 py-1 rounded-xl bg-rose-500/10 text-rose-300 border border-rose-500/25 font-bold">الهلال الأحمر</span>
              <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 font-bold">حكومي</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {verifiedPrograms.map((prog) => {
              const theme = ORG_THEMES[prog.orgType] ?? ORG_THEMES.NGO;
              const statusInfo = STATUS_LABELS[prog.status];
              const verifiedDate = new Date(prog.verifiedAt).toLocaleString("ar-EG", { year: "numeric", month: "short", day: "numeric" });
              return (
                <article key={prog.id} className={`relative overflow-hidden rounded-3xl border bg-[#16060B] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl ${theme.accentBorder}`}>
                  <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${theme.topStripe}`} />
                  <div className="space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`w-14 h-14 rounded-2xl border flex flex-col items-center justify-center shrink-0 shadow-inner ${theme.logoBoxClass}`}>
                          {renderOrgIcon(prog.orgType)}
                          <span className="text-[9px] font-black tracking-wider mt-0.5">{theme.shortCode}</span>
                        </div>
                        <div className="space-y-1 min-w-0">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xl text-[11px] font-bold border ${theme.badgeClass}`}>{theme.badgeLabel}</span>
                          <p className="text-xs font-bold text-[var(--text-muted)] truncate">{prog.organization}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold border ${statusInfo.className}`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{statusInfo.label}</span>
                        </span>
                        <span className="text-[11px] font-semibold text-[var(--gold)]">{CATEGORY_LABELS[prog.category]}</span>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white leading-snug">{prog.titleAr}</h3>
                    <div className="rounded-2xl border border-white/10 bg-[#0E0407]/85 p-4 space-y-2.5 text-xs sm:text-sm">
                      <div className="flex items-start gap-2 text-[var(--text-muted)]">
                        <Users className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <p><strong className="text-white">الفئات المستهدفة: </strong>{prog.targetAudience}</p>
                      </div>
                      <div className="flex items-start gap-2 text-[var(--text-muted)]">
                        <Info className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" />
                        <p><strong className="text-white">آلية التقديم: </strong>{prog.notesAr}</p>
                      </div>
                    </div>
                    {prog.requirements.length > 0 && (
                      <div className="rounded-2xl border border-emerald-500/15 bg-emerald-950/15 p-4 space-y-2.5">
                        <h4 className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                          <FileCheck2 className="w-4 h-4" />
                          <span>المتطلبات والوثائق الأساسية:</span>
                        </h4>
                        <ul className="space-y-1.5">
                          {prog.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-stone-200">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="pt-5 mt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      <span>آخر تحقق: {verifiedDate}</span>
                    </div>
                    <a href={prog.officialUrl} target="_blank" rel="noopener noreferrer nofollow" className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black transition-all shadow-lg ${theme.buttonClass}`}>
                      <span>الانتقال إلى البوابة الرسمية</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* SECTION 4 — EMERGENCY CONTACTS */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-emerald-500/20 pb-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400">
                <Globe className="w-4 h-4" />
                <span>دليل الجهات الرسمية والنطاقات المعتمدة</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">جهات الاتصال والمنصات الإغاثية المباشرة</h2>
            </div>
            <span className="text-xs text-[var(--text-muted)]">نطاقات موثقة بدون روابط وسيطة</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {OFFICIAL_CONTACTS.map((contact) => (
              <div key={contact.id} className={`rounded-3xl border bg-[#16060B]/75 backdrop-blur-xl p-5 flex flex-col justify-between gap-4 transition-all shadow-xl ${contact.accentClass}`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-2xl bg-white/5 border border-white/10 text-xs font-black text-white">{contact.shortName}</span>
                    <span dir="ltr" className="inline-flex items-center gap-1 text-xs font-mono font-bold text-emerald-300">
                      <Link2 className="w-3.5 h-3.5" />
                      {contact.domain}
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white leading-snug">{contact.nameAr}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{contact.scopeAr}</p>
                </div>
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <p className="text-[11px] font-bold text-[var(--gold)] flex items-center gap-1.5">
                    <HeartPulse className="w-3.5 h-3.5 shrink-0" />
                    <span>{contact.channelNoteAr}</span>
                  </p>
                  <a href={contact.officialUrl} target="_blank" rel="noopener noreferrer nofollow" className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black transition-colors">
                    <span>زيارة الموقع الرسمي</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5 — LATEST AID NEWS */}
        <section className="space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <Newspaper className="w-4 h-4" />
                <span>التغطية الإخبارية والبيانات الميدانية</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">آخر أخبار وبيانات المساعدات الإنسانية</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-black">
                <Filter className="w-3.5 h-3.5" />
                <span>الكل ({articles.length})</span>
              </span>
              <Link href="/breaking" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#16060B] border border-rose-500/30 hover:border-rose-400 text-rose-300 text-xs font-bold transition-colors">
                <Radio className="w-3.5 h-3.5" />
                <span>التغطية العاجلة ({breakingCount})</span>
              </Link>
              {uniqueSections.map(([slug, nameAr]) => (
                <Link key={slug} href={`/${slug}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#16060B] border border-white/10 hover:border-emerald-400/50 text-stone-200 hover:text-emerald-300 text-xs font-bold transition-colors">
                  <span>{nameAr}</span>
                </Link>
              ))}
            </div>
          </div>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-emerald-500/30 bg-[#16060B]/70 p-10 text-center space-y-2">
              <HandHeart className="w-10 h-10 text-emerald-400 mx-auto opacity-80" />
              <p className="text-sm font-bold text-white">يتم رصد ونشر أحدث بيانات المساعدات فور صدورها من الوكالات الرسمية</p>
              <p className="text-xs text-[var(--text-muted)]">يمكنك متابعة الروابط المعتمدة أعلاه أو زيارة صفحة العواجل للحصول على التحديثات الميدانية المباشرة.</p>
            </div>
          )}
        </section>

        {/* SECTION 6 — PROTECTION GUIDELINES */}
        <section className="space-y-6">
          <div className="space-y-1 border-b border-emerald-500/20 pb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>السلامة الميدانية والوقاية الرقمية</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">إرشادات الحماية والوصول الآمن للمساعدات</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-emerald-500/25 bg-[#16060B] p-6 sm:p-7 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 flex items-center justify-center shrink-0">
                  <HandHeart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">إرشادات السلامة أثناء استلام المساعدات</h3>
                  <p className="text-xs text-[var(--text-muted)]">توصيات وقائية لحماية المستفيدين في نقاط التوزيع الميدانية</p>
                </div>
              </div>
              <ul className="space-y-3">
                {PHYSICAL_SAFETY_GUIDELINES.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#0E0407]/80 p-3.5 text-xs sm:text-sm text-stone-200 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-teal-500/25 bg-[#16060B] p-6 sm:p-7 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-teal-500/15 border border-teal-400/30 text-teal-300 flex items-center justify-center shrink-0">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">نصائح الأمان الرقمي وحماية الهوية</h3>
                  <p className="text-xs text-[var(--text-muted)]">حماية بياناتك الشخصية وأرقام القسائم أثناء التصفح والتسجيل</p>
                </div>
              </div>
              <ul className="space-y-3">
                {DIGITAL_SECURITY_GUIDELINES.map((advice, idx) => (
                  <li key={idx} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#0E0407]/80 p-3.5 text-xs sm:text-sm text-stone-200 leading-relaxed">
                    <span className="text-teal-400 shrink-0 mt-0.5">
                      {idx % 2 === 0 ? <Smartphone className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </span>
                    <span>{advice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}