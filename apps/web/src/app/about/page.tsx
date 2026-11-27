import Link from "next/link";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Building2, Shield, Eye, Scale, Layers, Cpu, Database, Search, BookOpen,
  FileText, Users, Mail, ExternalLink, Sparkles, Award, Target, Globe, Landmark,
} from "lucide-react";
import { InstitutionalNav } from "@/components/InstitutionalNav";

export const metadata: Metadata = {
  title: "من نحن ورؤيتنا — الوطن اليوم | المكان الرئيسي لجميع الأخبار",
  description:
    "البيان التأسيسي والحوكمة التحريرية لمنصة الوطن اليوم: منصة إخبارية عربية ذكية تجمع الأخبار من مصادرها الأصلية مع سياق تحريري مستقل، والتزام صارم بالتحقق وحماية حقوق الملكية.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "من نحن ورؤيتنا — الوطن اليوم",
    description: "المكان الرئيسي لجميع الأخبار بمصادرها الأصلية — أركان النزاهة الأربعة، منهجية الجمع والتنظيم، والبنية التقنية والحوكمة التحريرية.",
    url: "/about",
    type: "website",
    locale: "ar_AR",
  },
};

interface IntegrityPillar {
  number: string; title: string; subtitle: string; description: string;
  commitment: string; icon: LucideIcon; accentGradient: string;
}

interface WorkflowStage {
  step: string; title: string; englishLabel: string; summary: string;
  detail: string; deliverable: string; icon: LucideIcon;
}

interface TechStackItem {
  name: string; role: string; category: string; description: string;
  highlights: readonly string[]; icon: LucideIcon;
}

interface GovernanceDocument {
  href: string; title: string; code: string; summary: string; actionLabel: string; icon: LucideIcon;
}

interface BoardUnit { title: string; mandate: string; icon: LucideIcon; }

interface ConnectRoute {
  href: string; title: string; badge: string; description: string;
  cta: string; icon: LucideIcon; featured?: boolean;
}

interface SocialChannelPlaceholder {
  platform: string; channelRole: string; statusNote: string; icon: LucideIcon;
}

const FOUR_PILLARS: readonly IntegrityPillar[] = [
  {
    number: "01",
    title: "لا خبر بلا مصدر",
    subtitle: "الإسناد الكامل والتحقق من الأصل",
    description: "كل مادة منشورة على «الوطن اليوم» تقترن وجوباً باسم الناشر الأصلي، ورابطه المباشر الصالح، وتوقيت صدورها الدقيق، بما يتيح للقارئ تتبع الخبر إلى منبعه دون تجهيل أو اجتزاء.",
    commitment: "رابط مرجعي صالح وتوقيت دقيق لكل مادة",
    icon: Shield,
    accentGradient: "from-[var(--gold)]/40 via-[var(--primary)]/40 to-transparent",
  },
  {
    number: "02",
    title: "لا أرقام مختلقة",
    subtitle: "صرامة البيانات والمؤشرات الموثقة",
    description: "الأسعار والنتائج الرياضية والإحصاءات الميدانية والاقتصادية تُجلب حصراً من مزودات البيانات المرخصة والجهات الرسمية المعتمدة، ويُمنع عرض أي رقم تخميني أو ملء الفراغات بتقديرات غير موثقة.",
    commitment: "حظر تام للبيانات التقديرية أو غير المسندة",
    icon: Scale,
    accentGradient: "from-amber-400/35 via-[var(--primary)]/35 to-transparent",
  },
  {
    number: "03",
    title: "فلسطين أولاً",
    subtitle: "الهوية السيادية والالتزام الميداني",
    description: "التغطية الفلسطينية هي قلب المنصة وهويتها الأصيلة؛ لذلك تحظى بمعالجة تحريرية أعمق، ومتابعة حية لتطورات القدس وغزة والضفة الغربية، والتزام صارم بالقاموس الوطني الموحد في التسمية والوصف.",
    commitment: "أولوية تحريرية وميدانية للقضية الفلسطينية",
    icon: Landmark,
    accentGradient: "from-[var(--primary)]/70 via-[var(--gold)]/30 to-transparent",
  },
  {
    number: "04",
    title: "حماية حقوق الملكية",
    subtitle: "الشراكة العادلة مع الناشرين",
    description: "نطبق سياسة عرض مبرمجة لكل ناشر (عنوان، مقتطف مصرح به، أو ملخص سياقي)، ولا ننتحل المقالات الكاملة للآخرين، بل نوجه القارئ دوماً عبر زر بارز لقراءة النص الكامل في موقع الناشر الأصلي.",
    commitment: "احترام سياسة العرض وتوجيه القراء للمصدر",
    icon: Award,
    accentGradient: "from-[var(--gold)]/35 via-[#3d0010]/50 to-transparent",
  },
] as const;

const WORKFLOW_STAGES: readonly WorkflowStage[] = [
  {
    step: "01", title: "الجمع", englishLabel: "INGESTION",
    summary: "استقبال منظم من المصادر المعتمدة",
    detail: "استقبال الأخبار فور صدورها من عشرات الوكالات والصحف والقنوات الرسمية عبر خلاصات RSS وواجهات API المعتمدة، مع احترام معايير الشبكة وملفات robots.txt.",
    deliverable: "التقاط لحظي متعدد المصادر", icon: Globe,
  },
  {
    step: "02", title: "التنظيم", englishLabel: "CLUSTERING",
    summary: "منع التكرار وبناء القصص الموحدة",
    detail: "تنظيف الروابط وتطبيق خوارزميات كشف التشابه والبصمات الرقمية لدمج التغطيات المتعددة للحدث الواحد في «قصة» متكاملة بدلاً من إغراق القارئ بعشرات النسخ المكررة.",
    deliverable: "تجميع ذكي للروايات المتقابلة", icon: Layers,
  },
  {
    step: "03", title: "السياق", englishLabel: "CONTEXT & REVIEW",
    summary: "خلاصة تحريرية وإشراف بشري",
    detail: "تقديم ملخص تحريري أصلي، وخط زمني لتطور الحدث، ومقارنة التغطيات بين المصادر، مع إحالة أي مادة حساسة أو منخفضة الثقة إلى غرفة المراجعة البشرية قبل النشر.",
    deliverable: "مراجعة بشرية وخط زمني موثق", icon: Eye,
  },
  {
    step: "04", title: "الوصول", englishLabel: "DISCOVERY",
    summary: "بحث فوري وتجربة قراءة فائقة",
    detail: "إتاحة بحث عربي فوري، وتنبيهات للأخبار العاجلة، ونشرات بريدية، وخلاصات RSS، مع دعم وضع النطاق الترددي المنخفض لتسهيل الوصول في الظروف الميدانية الصعبة.",
    deliverable: "وصول سريع وميسّر للجميع", icon: Search,
  },
] as const;

const TECH_STACK: readonly TechStackItem[] = [
  {
    name: "Next.js 15", role: "محرك العرض ومعمارية الويب", category: "App Router & SSR",
    description: "اعتماد معمارية App Router ومكونات الخادم (Server Components) لتقديم صفحات فائقة السرعة، وتقليل حجم الشيفرة المرسلة للمتصفح، وضمان أرشفة مثالية لمحركات البحث.",
    highlights: ["تصيير خادم سريع", "دعم كامل للاتجاه RTL", "بنية صفحات معيارية"], icon: Globe,
  },
  {
    name: "Prisma", role: "طبقة النمذجة وقواعد البيانات", category: "Type-Safe ORM",
    description: "إدارة صارمة وآمنة لأنواع البيانات عبر مخطط علائقي موحد يربط المقالات والقصص والمصادر والأقسام وسجلات التصحيحات بسلامة مرجعية كاملة.",
    highlights: ["ترابط علائقي محكم", "حماية من أخطاء الأنواع", "توثيق سلاسل المصادر"], icon: Database,
  },
  {
    name: "Meilisearch", role: "محرك البحث الفوري المتقدم", category: "Instant Search",
    description: "فهرسة فورية للمحتوى العربي تتيح البحث في العناوين والقصص والوسوم والمصادر خلال أجزاء من الثانية مع مراعاة الفروقات الإملائية العربية.",
    highlights: ["استجابة بحث فورية", "معالجة ذكية للعربية", "فرز حسب الحداثة والصلة"], icon: Search,
  },
  {
    name: "AI / ML", role: "الذكاء التحريري المساعد", category: "Semantic Assistance",
    description: "توظيف نماذج التصنيف الدلالي وكشف التشابه والترجمة المساعدة لتنظيم تدفق الأخبار وبناء السياق، تحت قاعدة حاكمة: الذكاء الاصطناعي يقترح والإنسان يعتمد.",
    highlights: ["منع التكرار الدلالي", "حارس دمج للأرقام", "إشراف بشري إلزامي"], icon: Cpu,
  },
] as const;

const GOVERNANCE_DOCS: readonly GovernanceDocument[] = [
  {
    href: "/editorial-policy", title: "ميثاق الشرف التحريري", code: "CHARTER · 10 ARTICLES",
    summary: "المرجع الدستوري الحاكم لغرفة الأخبار: قاعدة التثبت المزدوج، القاموس الوطني الفلسطيني الموحد، وضوابط الذكاء الاصطناعي.",
    actionLabel: "استعراض الميثاق التحريري", icon: FileText,
  },
  {
    href: "/corrections", title: "سجل التصحيحات العلني", code: "PUBLIC AUDIT LOG",
    summary: "التزام مؤسسي بنشر أي تعديل أو تصويب يطرأ على خبر أو رقم في صدر المادة وفي السجل العلني المفتوح دون حذف صامت.",
    actionLabel: "مراجعة سجل التصحيحات", icon: Scale,
  },
  {
    href: "/sources-policy", title: "سياسة عزو المصادر والعرض", code: "ATTRIBUTION PROTOCOL",
    summary: "تصنيف درجات الموثوقية، وآلية العزو الصريح للوكالات والصحف، وبروتوكول حماية حقوق النشر لكل شريك إعلامي.",
    actionLabel: "قراءة سياسة المصادر", icon: Eye,
  },
] as const;

const EDITORIAL_BOARD_UNITS: readonly BoardUnit[] = [
  { title: "رئاسة التحرير والموجه العام", mandate: "صيانة الخط التحريري المستقل والفصل التام بين غرف الأخبار وأي تأثيرات تجارية أو تمويلية.", icon: Landmark },
  { title: "ديسك التدقيق والتحقق", mandate: "فحص الأخبار العاجلة والحساسة ومطابقة الأرقام والتصريحات قبل الإجازة النهائية للنشر.", icon: Shield },
  { title: "وحدة الرصد الميداني والشؤون الفلسطينية", mandate: "متابعة التغطية الحية في القدس وغزة والضفة وتطبيق معايير القاموس الوطني الموحد.", icon: Target },
  { title: "لجنة الامتثال وحقوق الملكية", mandate: "مراجعة سياسات عرض الناشرين، ومعالجة طلبات التصحيح، وصون معايير النزاهة الرقمية.", icon: Users },
] as const;

const CONNECT_ROUTES: readonly ConnectRoute[] = [
  {
    href: "/contact", title: "الاتصال بهيئة التحرير والإدارة", badge: "قنوات مباشرة",
    description: "للتواصل الرسمي مع غرفة التحرير، أو الاستفسارات المؤسسية، أو قضايا حقوق الملكية والردود والتوضيحات، أو شراكات المحتوى.",
    cta: "الانتقال إلى صفحة الاتصال", icon: Mail, featured: true,
  },
  {
    href: "/submit-news", title: "إرسال خبر أو بلاغ ميداني", badge: "إحالة للتحقق",
    description: "بوابة مخصصة لاستقبال المواد الميدانية، والبيانات الرسمية، والمعلومات القابلة للتحقق لإحالتها مباشرة إلى ديسك التدقيق والمراجعة.",
    cta: "تقديم خبر أو بلاغ", icon: Sparkles,
  },
] as const;

const SOCIAL_PLACEHOLDERS: readonly SocialChannelPlaceholder[] = [
  {
    platform: "منصة النشر السريع (X)", channelRole: "موجز العواجل والتحديثات اللحظية",
    statusNote: "القناة الرسمية قيد التوحيد المؤسسي — تُعتمد القنوات الموثقة عبر تذييل المنصة وصفحة الاتصال", icon: Globe,
  },
  {
    platform: "قناة التغطية الميدانية (تيليغرام)", channelRole: "التنبيهات الميدانية العاجلة وملخصات القصص",
    statusNote: "مساحة مخصصة للتنبيهات السريعة — يُرجى عدم اعتماد أي قناة خارج التوثيق الرسمي للمنصة", icon: Layers,
  },
  {
    platform: "المنصة المرئية والوثائقية (يوتيوب)", channelRole: "التقارير المصورة واللقاءات السياقية",
    statusNote: "مساحة مخصصة للأرشيف المرئي — تُنشر الروابط المعتمدة فور إتاحتها رسمياً في التذييل", icon: BookOpen,
  },
  {
    platform: "النشرات والمجتمع الرقمي", channelRole: "إيجاز الصباح وملخصات نهاية اليوم",
    statusNote: "مساحة مخصصة للتفاعل المجتمعي — أبواب التواصل المباشر مفتوحة عبر بوابة الاتصال المؤسسي", icon: Users,
  },
] as const;

/** Shared institutional section heading with gold eyebrow and description. */
function SectionHeading({
  id, eyebrow, title, description, icon: Icon,
}: {
  id: string; eyebrow: string; title: string; description: string; icon: LucideIcon;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-black text-[var(--gold)]">
          <Icon className="w-4 h-4" />
          <span>{eyebrow}</span>
        </div>
        <h2 id={id} className="text-2xl sm:text-4xl font-black text-[var(--text)]">{title}</h2>
      </div>
      <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md leading-relaxed">{description}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-24 selection:bg-[var(--gold)]/30 selection:text-white [--bg:#0E0407] [--surface:#16060B] [--primary:#590018] [--gold:#f5b900] [--text:#ffffff] [--text-muted:#b8a8ae] [--border:rgba(245,185,0,0.22)]"
    >
      <InstitutionalNav current="about" />

      {/* SECTION 1 — FOUNDING MANIFESTO HERO */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[#26000a] via-[#170208] to-[var(--bg)] py-16 sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 pattern-imperial opacity-60 pointer-events-none" />
        <div
          aria-hidden="true"
          className="absolute -top-24 inset-x-0 mx-auto h-80 max-w-4xl rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(245,185,0,0.16)_0%,_rgba(89,0,24,0.38)_45%,_transparent_75%)] blur-3xl pointer-events-none"
        />

        <div className="container-custom max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-4 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[var(--primary)]/60 text-[var(--gold)] text-xs font-black shadow-lg shadow-black/40 backdrop-blur-md">
              <Landmark className="w-4 h-4 text-[var(--gold)]" />
              <span>البيان التأسيسي · مؤسسة «الوطن اليوم» الإعلامية</span>
              <span className="text-white/30">|</span>
              <span className="font-mono text-[11px] text-amber-200">الميثاق المؤسسي 2026</span>
            </div>

            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl border border-[var(--gold)]/35 bg-gradient-to-r from-[var(--primary)]/85 via-[#3d0010]/90 to-[var(--primary)]/85 shadow-xl shadow-black/50">
              <Sparkles className="w-4 h-4 text-[var(--gold)] shrink-0" />
              <span className="text-sm sm:text-base font-black tracking-wide text-[var(--gold)]">«المكان الرئيسي لجميع الأخبار»</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[var(--text)] tracking-tight leading-[1.2] max-w-4xl">
              صرحُ الصحافة العربية الذكية <span className="imperial-shimmer">والعزو الأمين للمصادر</span>
            </h1>

            <p className="text-sm sm:text-lg text-stone-200 max-w-3xl leading-relaxed font-medium">
              «الوطن اليوم» منصة إخبارية عربية متكاملة صُممت لتجمع شتات الأخبار من مئات المصادر المعتمدة في مكان واحد، فتضع القارئ في قلب الحدث مع رابط المصدر الأصلي، وسياق تحريري مستقل، وتحقق موضوعي لا يساوم على الحقيقة.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl p-6 sm:p-9 shadow-2xl shadow-black/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-black text-[var(--gold)]">
                  <Target className="w-4 h-4" />
                  <span>الرسالة التأسيسية للمنصة</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[var(--text)]">لا ننسخ مقالات الآخرين — بل نصنع السياق ونُعيد القارئ إلى الأصل</h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  انطلقت الرؤية المؤسسية لـ «الوطن اليوم» لمعالجة فوضى التكرار والتضليل في الفضاء الرقمي العربي؛ فنحن لا نعيد صياغة عمل الصحفيين بلا قيمة مضافة، بل نجمع الروايات المتعددة للحدث الواحد، ونوثّق الخط الزمني لتطوره، ونصون حق الناشر الأصلي عبر إحالة القارئ إليه دائماً.
                </p>
              </div>

              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/45 p-4 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--gold)]">
                    <Building2 className="w-4 h-4" />
                    <span>تاريخ التأسيس والاعتماد المؤسسي</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">غرفة أخبار وهندسة تحريرية رقمية مستقلة، مُعتمدة وفق الميثاق المعياري لعام 2026.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/45 p-4 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--gold)]">
                    <Award className="w-4 h-4" />
                    <span>بوصلة التغطية المستمرة</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">رصد إخباري متواصل على مدار الساعة، مع أولوية تحريرية مطلقة لفلسطين وقضايا الأمة.</p>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-3" aria-hidden="true">
              <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/5">
                <div className="absolute inset-y-0 w-1/2 rounded-full bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent animate-pulse" />
              </div>
              <div className="divider-gold" />
            </div>
          </div>
        </div>
      </section>

      <main className="container-custom max-w-6xl mx-auto px-4 sm:px-6 pt-16 space-y-20">
        {/* SECTION 2 — THE FOUR PILLARS (أركان النزاهة الأربعة) */}
        <section aria-labelledby="pillars-heading" className="space-y-8">
          <SectionHeading
            id="pillars-heading"
            eyebrow="المبادئ الدستورية غير القابلة للتنازل"
            title="أركان النزاهة الأربعة"
            description="أربع قواعد صارمة تحكم كل مادة إخبارية، وتمنع النشر العشوائي أو الانتحال أو التلاعب بالأرقام والوقائع."
            icon={Shield}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FOUR_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.number}
                  className="group relative rounded-3xl border border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/50 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/60 overflow-hidden"
                >
                  <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-l ${pillar.accentGradient}`} />
                  <div aria-hidden="true" className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-[var(--primary)]/25 blur-2xl group-hover:bg-[var(--gold)]/10 transition-colors pointer-events-none" />
                  <div className="relative z-10 space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[#26000a] border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] shadow-lg shadow-black/40 shrink-0 group-hover:scale-105 transition-transform">
                          <Icon className="w-7 h-7" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-[var(--gold)]/90 block">{pillar.subtitle}</span>
                          <h3 className="text-xl sm:text-2xl font-black text-[var(--text)] mt-0.5">{pillar.title}</h3>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-mono font-black shrink-0">{pillar.number}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">{pillar.description}</p>
                    <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-3 flex items-center justify-between gap-3 text-xs">
                      <span className="text-[var(--text-muted)] font-medium">الالتزام التطبيقي:</span>
                      <span className="font-bold text-[var(--gold)]">{pillar.commitment}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* SECTION 3 — HOW WE WORK (الجمع -> التنظيم -> السياق -> الوصول) */}
        <section aria-labelledby="workflow-heading" className="space-y-8">
          <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[#1a050c] via-[var(--surface)] to-[var(--bg)] p-6 sm:p-10 shadow-2xl space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-white/10 pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-black text-[var(--gold)]">
                  <Layers className="w-4 h-4" />
                  <span>خط الإنتاج التحريري والتقني</span>
                </div>
                <h2 id="workflow-heading" className="text-2xl sm:text-4xl font-black text-[var(--text)]">كيف نعمل · من الخبر الخام إلى القصة الموثقة</h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
                  تمر كل مادة بأربع مراحل مترابطة تجمع بين الانضباط الهندسي والمراجعة التحريرية: الجمع، ثم التنظيم، فالسياق، وصولاً إلى القارئ.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl border border-[var(--gold)]/30 bg-black/50 text-xs font-bold text-[var(--gold)] shrink-0">
                <span>الجمع</span><span aria-hidden="true">←</span><span>التنظيم</span><span aria-hidden="true">←</span><span>السياق</span><span aria-hidden="true">←</span><span>الوصول</span>
              </div>
            </div>

            <div className="relative">
              <div aria-hidden="true" className="hidden lg:block absolute top-11 inset-x-16 h-0.5 bg-gradient-to-l from-[var(--gold)]/70 via-[var(--primary)] to-[var(--gold)]/70" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {WORKFLOW_STAGES.map((stage) => {
                  const Icon = stage.icon;
                  return (
                    <div key={stage.step} className="relative rounded-3xl border border-white/10 bg-[var(--bg)]/95 p-6 flex flex-col justify-between gap-5 hover:border-[var(--gold)]/50 transition-colors shadow-xl">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[#b88600] text-[#140005] flex items-center justify-center shadow-lg shadow-amber-950/40">
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="text-left">
                            <span className="font-mono text-xs font-black text-[var(--gold)] block">STEP {stage.step}</span>
                            <span className="font-mono text-[10px] text-[var(--text-muted)] tracking-wider">{stage.englishLabel}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-[var(--text)]">{stage.title}</h3>
                          <p className="text-xs font-bold text-[var(--gold)]/90 mt-0.5">{stage.summary}</p>
                        </div>
                        <p className="text-xs text-stone-300 leading-relaxed">{stage.detail}</p>
                      </div>
                      <div className="rounded-2xl border border-[var(--gold)]/20 bg-[var(--primary)]/25 px-3.5 py-2.5 text-[11px] font-bold text-amber-200 flex items-center justify-between gap-2">
                        <span>{stage.deliverable}</span>
                        <Sparkles className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-black/50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[var(--primary)]/60 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[var(--text)]">هل ترغب في الاطلاع على البروتوكول التقني الكامل للجمع ومنع التكرار؟</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">نشرح بالتفصيل آلية فحص البصمات الرقمية، وحارس دمج الأرقام، وقواعد الإحالة للمراجعة البشرية.</p>
                </div>
              </div>
              <Link href="/how-we-aggregate" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[var(--gold)] hover:bg-[#ffd043] text-[#140005] text-xs font-black transition-colors shrink-0">
                <span>اقرأ مسار الجمع والتحقق</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 4 — TECHNOLOGY & TRANSPARENCY */}
        <section aria-labelledby="tech-heading" className="space-y-8">
          <SectionHeading
            id="tech-heading"
            eyebrow="الشفافية الهندسية والموثوقية البرمجية"
            title="البنية التقنية وأخلاقيات التكنولوجيا"
            description="تعتمد «الوطن اليوم» على منظومة برمجية حديثة ومفتوحة المعايير توازن بين سرعة الوصول، دقة البحث العربي، وحماية الخصوصية."
            icon={Cpu}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TECH_STACK.map((tech) => {
              const Icon = tech.icon;
              return (
                <article key={tech.name} className="rounded-3xl border border-white/10 bg-[var(--surface)]/90 p-6 flex flex-col justify-between gap-5 hover:border-[var(--gold)]/45 transition-all shadow-xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-[var(--primary)]/60 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-full border border-white/10 bg-black/50 text-stone-300">{tech.category}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[var(--text)]">{tech.name}</h3>
                      <span className="text-xs font-bold text-[var(--gold)] block mt-0.5">{tech.role}</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">{tech.description}</p>
                  </div>
                  <ul className="space-y-1.5 pt-3 border-t border-white/10">
                    {tech.highlights.map((item) => (
                      <li key={item} className="rounded-2xl bg-black/40 border border-white/5 px-3 py-1.5 text-[11px] text-stone-200 font-medium">• {item}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-l from-[#1e040c] via-[var(--surface)] to-[var(--bg)] p-6 sm:p-8 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--gold)]/35 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-black">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>الالتزام بالمعايير المفتوحة والخصوصية الصارمة</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[var(--text)]">تعهّد البرمجيات المفتوحة وشفافية الخوارزميات</h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  تُبنى منصتنا فوق ركائز مفتوحة المصدر ومعايير ويب قياسية موثقة — من بروتوكولات خلاصات الأخبار (RSS 2.0) وبيانات الصحافة الدلالية (Schema.org NewsMediaOrganization)، إلى احترام ملفات robots.txt وقواعد عدم التتبع التطفلي. نؤمن أن الشفافية التقنية امتداد طبيعي للنزاهة الصحفية.
                </p>
              </div>
              <div className="lg:col-span-4 grid grid-cols-1 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/45 p-4 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[var(--gold)] shrink-0" />
                  <div className="text-xs">
                    <span className="font-black text-[var(--text)] block">لا تزييف ولا توليد صوري</span>
                    <span className="text-[var(--text-muted)]">حظر مطلق للمشاهد المصطنعة (Deepfakes)</span>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/45 p-4 flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-[var(--gold)] shrink-0" />
                  <div className="text-xs">
                    <span className="font-black text-[var(--text)] block">شفافية المنهجية</span>
                    <span className="text-[var(--text-muted)]">توثيق علني لدور الخوارزميات والمحررين</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5 — EDITORIAL GOVERNANCE */}
        <section aria-labelledby="governance-heading" className="space-y-8">
          <SectionHeading
            id="governance-heading"
            eyebrow="المساءلة المؤسسية والضبط المهني"
            title="الحوكمة التحريرية ومجلس التحرير"
            description="تعمل هيئة التحرير باستقلال مؤسسي تام، وتخضع منظومة النشر لدينا لوثائق مرجعية منشورة ومُلزمة أمام الجمهور."
            icon={Scale}
          />

          <div className="rounded-3xl border border-white/10 bg-[var(--surface)]/90 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[#26000a] border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[var(--text)]">هيئة التحرير المستقلة ومجالس الرقابة المهنية</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">فصل هيكلي صارم بين القرار الصحفي وإدارة الإعلانات والرعايات التجارية</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--gold)]/35 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-black self-start sm:self-auto">
                <Building2 className="w-3.5 h-3.5" />
                <span>حوكمة تحريرية مستقلة</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {EDITORIAL_BOARD_UNITS.map((unit) => {
                const Icon = unit.icon;
                return (
                  <div key={unit.title} className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-2.5">
                    <div className="flex items-center gap-2.5 text-[var(--gold)]">
                      <Icon className="w-4 h-4 shrink-0" />
                      <h4 className="text-sm font-black text-[var(--text)] leading-snug">{unit.title}</h4>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed">{unit.mandate}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {GOVERNANCE_DOCS.map((doc) => {
              const Icon = doc.icon;
              return (
                <Link key={doc.href} href={doc.href} className="group rounded-3xl border border-[var(--border)] bg-[var(--surface)]/85 hover:bg-[#1e060e] hover:border-[var(--gold)]/60 p-6 flex flex-col justify-between gap-5 transition-all shadow-xl">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-[var(--primary)]/60 border border-[var(--gold)]/35 flex items-center justify-center text-[var(--gold)]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/10 bg-black/50 text-stone-300">{doc.code}</span>
                    </div>
                    <h3 className="text-lg font-black text-[var(--text)] group-hover:text-[var(--gold)] transition-colors">{doc.title}</h3>
                    <p className="text-xs text-stone-300 leading-relaxed">{doc.summary}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/45 px-4 py-2.5 flex items-center justify-between text-xs font-black text-[var(--gold)]">
                    <span>{doc.actionLabel}</span>
                    <ExternalLink className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="rounded-3xl border border-[var(--gold)]/35 bg-gradient-to-r from-[var(--primary)]/35 via-[var(--surface)] to-[var(--primary)]/25 p-6 sm:p-8 shadow-2xl">
            <div className="rounded-2xl border border-white/10 bg-black/45 p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 text-xs font-black text-[var(--gold)]">
                  <Award className="w-4 h-4" />
                  <span>تعهد المساءلة والشفافية أمام الجمهور</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  نقرّ بأن حق القارئ في المعرفة الصحيحة يعلو فوق السبق الصحفي؛ لذا نلتزم بتصحيح أي خطأ واقعي أو رقمي فور ثبوته مع إثبات سجل التعديل علناً، وإتاحة حق الرد والتوضيح، وعدم حذف المواد المصححة خفيةً أو تغيير الوقائع بأثر رجعي.
                </p>
              </div>
              <Link href="/corrections" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-[var(--gold)]/45 bg-[var(--gold)]/15 hover:bg-[var(--gold)] text-[var(--gold)] hover:text-[#140005] text-xs font-black transition-all shrink-0">
                <Scale className="w-4 h-4" />
                <span>افتح سجل التصحيحات العلني</span>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 6 — CONNECT WITH US */}
        <section aria-labelledby="connect-heading" className="space-y-8">
          <SectionHeading
            id="connect-heading"
            eyebrow="قنوات التواصل والمشاركة المباشرة"
            title="تواصل معنا"
            description="نستقبل ملاحظات القراء، وطلبات التصحيح، وشراكات الناشرين، والبلاغات الميدانية عبر بواباتنا الرسمية."
            icon={Mail}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONNECT_ROUTES.map((route) => {
              const Icon = route.icon;
              return (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`group rounded-3xl border p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all shadow-2xl ${
                    route.featured
                      ? "border-[var(--gold)]/45 bg-gradient-to-br from-[#2b030f] via-[var(--surface)] to-[var(--bg)] hover:border-[var(--gold)]"
                      : "border-white/15 bg-[var(--surface)]/90 hover:border-[var(--gold)]/55"
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-black">{route.badge}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl sm:text-2xl font-black text-[var(--text)] group-hover:text-[var(--gold)] transition-colors">{route.title}</h3>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{route.description}</p>
                    </div>
                  </div>
                  <div
                    className={`rounded-2xl px-5 py-3 flex items-center justify-between text-xs font-black transition-colors ${
                      route.featured ? "bg-[var(--gold)] text-[#140005] group-hover:bg-[#ffd043]" : "border border-[var(--gold)]/35 bg-black/50 text-[var(--gold)] group-hover:bg-[var(--gold)]/15"
                    }`}
                  >
                    <span>{route.cta}</span>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="rounded-3xl border border-white/10 bg-[var(--surface)]/80 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-xs font-black text-[var(--gold)]">
                  <Globe className="w-4 h-4" />
                  <span>بوابات الحضور الرقمي والمنصات الاجتماعية</span>
                </div>
                <h3 className="text-lg font-black text-[var(--text)]">قنوات النشر الاجتماعي الموثقة</h3>
              </div>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full border border-white/10 bg-black/50 text-stone-300 self-start sm:self-auto">
                مساحات تعريفية · بدون روابط خارجية غير موثقة
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SOCIAL_PLACEHOLDERS.map((channel) => {
                const Icon = channel.icon;
                return (
                  <div key={channel.platform} className="rounded-2xl border border-white/10 bg-black/45 p-4 flex flex-col justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5 text-[var(--gold)]">
                        <Icon className="w-4 h-4 shrink-0" />
                        <h4 className="text-xs font-black text-[var(--text)]">{channel.platform}</h4>
                      </div>
                      <p className="text-[11px] font-bold text-[var(--gold)]/90">{channel.channelRole}</p>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed border-t border-white/5 pt-2.5">{channel.statusNote}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}