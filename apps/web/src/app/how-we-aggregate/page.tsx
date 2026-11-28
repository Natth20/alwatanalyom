import Link from "next/link";
import { Metadata } from "next";
import { InstitutionalNav } from "@/components/InstitutionalNav";
import {
  Cpu,
  ShieldCheck,
  Layers,
  Fingerprint,
  Bot,
  Scale,
  Radio,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  FileSearch,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "كيف نجمع الأخبار والبيانات (مسار المعالجة الشفاف) — الوطن اليوم",
  description:
    "الشفافية التامة في مسار استقبال الأخبار، والتطبيع، وإزالة التكرار، ودور الذكاء الاصطناعي والمراجعة البشرية في منصة الوطن اليوم.",
  alternates: { canonical: "/how-we-aggregate" },
};

const PIPELINE_STAGES = [
  {
    num: "01",
    title: "الجلب والاستقبال الآمن (Ingestion)",
    badge: "RSS / Official APIs",
    icon: Radio,
    accent: "text-emerald-400 border-emerald-500/35 bg-emerald-500/15",
    summary:
      "الاتصال بخلاصات RSS وواجهات API الرسمية للمصادر المعتمدة وفق فترات زمنية منضبطة.",
    details: [
      "الالتزام الكامل بملفات robots.txt وبروتوكولات الويب القياسية (ETag و If-Modified-Since) لحماية خوادم الناشرين.",
      "التعريف الصريح بهوية البوت المؤسسي المعتمد (AlWatanTodayBot) دون انتحال أو تجاوز قيود الوصول.",
      "استبعاد المصادر المجهولة أو المواقع التي تفتقر إلى سجل تحريري موثوق.",
    ],
  },
  {
    num: "02",
    title: "التطبيع وكشف التكرار (Deduplication)",
    badge: "Simhash & Trigram Guard",
    icon: Fingerprint,
    accent: "text-sky-400 border-sky-500/35 bg-sky-500/15",
    summary:
      "تنظيف الروابط من وسوم التتبع وحساب بصمات رقمية مشفرة لمنع تكرار الأخبار المتطابقة.",
    details: [
      "تطبيق «حارس الدمج» الصارم الذي يمنع دمج أي خبرين إذا تباينت الأرقام الجوهرية (أعداد الضحايا، الأسعار، أو التواريخ).",
      "توحيد التنسيق الزمني للحدث بدقة الساعة والدقيقة بتوقيت القدس الشريف.",
      "حفظ الرابط الأصلي الكامل للمادة المرجعية مع تاريخ النشر الأولي لدى الناشر.",
    ],
  },
  {
    num: "03",
    title: "التجميع الذكي في قصص (Story Clustering)",
    badge: "Multi-Source Timeline",
    icon: Layers,
    accent: "text-[var(--gold)] border-amber-500/35 bg-amber-500/15",
    summary:
      "دمج تغطيات الصحف والوكالات المختلفة للحدث الواحد في ملف قصة متكامل بزمن واحد.",
    details: [
      "بدلاً من عرض 20 خبراً مكرراً عن نفس الحدث، يشاهد القارئ خيطاً زمنياً موحداً يجمع زوايا الوكالات.",
      "إبراز السبق الصحفي الأول وأحدث متابعة ميدانية مع نسبة مساهمة كل مصدر بشفافية.",
      "الربط المباشر ببطاقات التحقق الجنائي في حال ظهور روايات متعارضة.",
    ],
  },
  {
    num: "04",
    title: "بوابة الذكاء الاصطناعي والمراجعة البشرية",
    badge: "Human-in-the-Loop",
    icon: Bot,
    accent: "text-indigo-400 border-indigo-500/35 bg-indigo-500/15",
    summary:
      "يقترح الذكاء الاصطناعي التصنيف والترجمة والملخص التحريري، بينما يظل القرار النهائي بشرياً في القضايا الحساسة.",
    details: [
      "يُحظر تماماً تأليف أخبار أو اختلاق أرقام عبر النماذج التوليدية.",
      "أي خبر يتضمن ضحايا، اتهامات، أو انخفاضاً في ثقة الترجمة يُحال تلقائياً لقائمة المراجعة البشرية في غرفة الأخبار.",
      "تطبيق القاموس الوطني الفلسطيني الموحد (القدس، الشهداء، الأراضي المحتلة) في كافة الصياغات.",
    ],
  },
  {
    num: "05",
    title: "حماية حقوق الملكية وسياسة العرض",
    badge: "Publisher Rights",
    icon: Scale,
    accent: "text-rose-400 border-rose-500/35 bg-rose-500/15",
    summary:
      "لكل ناشر سياسة عرض مبرمجة بدقة (عنوان، مقتطف، أو ملخص تحريري) مع توجيه صريح لقراءة الأصل.",
    details: [
      "عدم نشر النص الكامل لمواد الناشرين دون ترخيص صريح.",
      "إبراز اسم الناشر الأصلي وشارة توثيق واضحة ورابط مباشر في صدر وتذييل كل مادة.",
      "تطبيق بروتوكول سحب أو تعديل فوري عبر نظام حقوق النشر (DMCA) وسجل التصحيحات العلني.",
    ],
  },
];

export default function HowWeAggregatePage() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 pb-24">
      <InstitutionalNav current="how-we-aggregate" />

      {/* 1. ترويسة الشفافية التقنية الملكية */}
      <section className="relative overflow-hidden border-b border-[var(--gold)]/20 bg-gradient-to-b from-[#1c020a] via-[#130106] to-[#0E0407] py-14 sm:py-20">
        <div className="pointer-events-none absolute -top-24 start-1/3 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl" />

        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-6">
          <nav className="flex items-center gap-2 text-xs text-stone-400">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-3.5 h-3.5 text-stone-600" />
            <Link href="/about" className="hover:text-[var(--gold)] transition-colors">من نحن</Link>
            <ChevronLeft className="w-3.5 h-3.5 text-stone-600" />
            <span className="text-[var(--gold)] font-bold">كيف نجمع الأخبار ونتحقق منها</span>
          </nav>

          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-black">
              <Cpu className="w-4 h-4" />
              <span>بروتوكول الشفافية الهندسية والتحريرية (Data Pipeline)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight title-imperial">
              كيف نجمع الأخبار <span className="text-[var(--gold)]">وننظمها ونوثقها؟</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
              التزاماً بالشفافية التامة أمام قرائنا وشركائنا الناشرين، نكشف المسار التقني والتحريري الدقيق الذي يمر به كل خبر منذ لحظة صدوره لدى مصدره الأصلي وحتى ظهوره في غرفة الأخبار.
            </p>
          </div>
        </div>
      </section>

      {/* 2. المراحل الخمس للمعالجة الموثقة */}
      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="space-y-6 relative before:hidden md:before:block before:absolute before:inset-y-6 before:start-7 before:w-0.5 before:bg-gradient-to-b before:from-[var(--gold)]/50 before:via-emerald-500/40 before:to-rose-500/40">
          {PIPELINE_STAGES.map((stage) => {
            const Icon = stage.icon;
            return (
              <article key={stage.num} className="relative md:ps-20">
                {/* شارة الرقم في الخط الزمني */}
                <div className="hidden md:flex absolute start-1 top-6 w-12 h-12 rounded-2xl bg-[#16060B] border-2 border-[var(--gold)]/50 text-[var(--gold)] font-mono text-sm font-black items-center justify-center shadow-lg">
                  {stage.num}
                </div>

                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#16060B]/95 to-[#0b0205]/95 p-6 sm:p-8 shadow-xl hover:border-[var(--gold)]/40 transition-all space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${stage.accent}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="md:hidden text-[10px] font-mono text-[var(--gold)] font-black block">
                          المرحلة {stage.num}
                        </span>
                        <h2 className="text-lg sm:text-xl font-black text-white">
                          {stage.title}
                        </h2>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-stone-300">
                      {stage.badge}
                    </span>
                  </div>

                  <p className="text-sm text-stone-200 leading-relaxed font-medium">
                    {stage.summary}
                  </p>

                  <ul className="space-y-2.5 text-xs text-stone-300">
                    {stage.details.map((d, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* 3. روابط الحوكمة ذات الصلة */}
        <div className="rounded-3xl border border-[var(--gold)]/30 bg-gradient-to-r from-[#21040c]/90 via-[#16060B] to-[#0e0407] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-start">
            <h3 className="text-base font-black text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[var(--gold)]" />
              <span>هل ترغب بمراجعة الضوابط القانونية والتحريرية؟</span>
            </h3>
            <p className="text-xs text-stone-400">
              تصفح سياسة عزو المصادر وميثاق الشرف التحريري المعتمد لعام 2026.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/sources-policy"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all"
            >
              سياسة المصادر والعرض
            </Link>
            <Link
              href="/editorial-policy"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] text-xs font-black hover:brightness-110 transition-all shadow-md"
            >
              ميثاق الشرف التحريري ←
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
