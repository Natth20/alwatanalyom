"use client";

import { useState } from "react";
import InstitutionalNav from "@/components/InstitutionalNav";
import {
  FileSearch,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Award,
  Globe,
  Radio,
  FileText,
  Workflow,
  Cpu,
  UserCheck,
  Share2,
  Lock,
  Layers,
  Database,
  Search,
  ChevronRight,
  Eye,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

interface PipelineStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  icon: any;
  techBadge: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    step: "01",
    title: "الالتقاط اللحظي من الوكالات المعتمدة (Ingest)",
    duration: "< 3 ثوانٍ",
    description:
      "سحب البرقيات الإخبارية فور صدورها من 16 مصدراً معتمداً (وفا، رويترز، أ ف ب، الأناضول، بيانات الصحة والهلال الأحمر والدفاع المدني).",
    icon: Radio,
    techBadge: "Webhooks & RSS 2.0 Ingest Engine",
  },
  {
    step: "02",
    title: "الفحص الدلالي وكشف التكرار (AI Deduplication)",
    duration: "< 1.5 ثانية",
    description:
      "خوارزميات الفهرسة الدلالية تقارن الخبر بما تم نشره خلال 24 ساعة، تمنع التكرار الآلي، وتصفي الصياغات الدعائية والترجمات المشبوهة.",
    icon: Cpu,
    techBadge: "Semantic Vector Deduplication",
  },
  {
    step: "03",
    title: "المراجعة والتدقيق التحريري البشري (Human Fact-Check)",
    duration: "دقيقة إلى دقيقتين",
    description:
      "إحالة الأخبار الحساسة لغرفة التحرير الميداني للمطابقة الجنائية مع الصور وشهود العيان على الأرض قبل الإفراج النهائي للنشر.",
    icon: UserCheck,
    techBadge: "Newsroom Review Desk 24/7",
  },
  {
    step: "04",
    title: "العزو الإلزامي وتثبيت رابط التحقق (Attribution)",
    duration: "لحظي وتلقائي",
    description:
      "تثبيت اسم الوكالة الأصلية، ووقت الصدور، ورابط التوثيق في ترويسة المقال لتمكين القارئ من الرجوع للأصل والتحقق المستقل فوراً.",
    icon: ShieldCheck,
    techBadge: "Cryptographic Source Stamp",
  },
];

interface CredibilityTier {
  tier: string;
  percent: string;
  title: string;
  color: string;
  borderColor: string;
  bgColor: string;
  agencies: string[];
  rules: string[];
}

const CREDIBILITY_TIERS: CredibilityTier[] = [
  {
    tier: "المستوى الأول · الثقة السيادية والميدانية",
    percent: "100%",
    title: "الوكالات الرسمية والمنظمات الإنسانية والطبية الميدانية",
    color: "text-emerald-400",
    borderColor: "border-emerald-500/40",
    bgColor: "from-[#062013]/90 to-[#031008]/90",
    agencies: [
      "وكالة الأنباء الفلسطينية الرسمية (وفا)",
      "بيانات وزارة الصحة الفلسطينية الرسمية",
      "جمعية الهلال الأحمر الفلسطيني",
      "وكالة غوث وتشغيل اللاجئين (الأونروا)",
      "جهاز الدفاع المدني الفلسطيني",
      "نقابة الصحفيين الفلسطينيين",
    ],
    rules: [
      "ذكر المصدر في مقدمة الخبر أو كبسولة الاعتماد الرئاسية في صدر الصفحة.",
      "توثيق تاريخ وساعة صدور البيان بدقة متناهية بتوقيت القدس الشريف.",
      "نشر صور الأقمار الصناعية والإحداثيات الجغرافية الموثقة للمواقع المنكوبة.",
    ],
  },
  {
    tier: "المستوى الثاني · الثقة الدولية المعتمدة",
    percent: "95%",
    title: "وكالات الأنباء الدولية والصحافة الاستقصائية العالمية",
    color: "text-sky-400",
    borderColor: "border-sky-500/40",
    bgColor: "from-[#061826]/90 to-[#020b12]/90",
    agencies: [
      "وكالة رويترز للأنباء (Reuters)",
      "وكالة الصحافة الفرنسية (AFP)",
      "وكالة أسوشيتد برس (Associated Press)",
      "وكالة الأناضول (Anadolu Agency)",
      "شبكة الجزيرة الإخبارية",
      "بي بي سي عربي (BBC Arabic)",
    ],
    rules: [
      "النسب الصريح لاسم الوكالة الدولية في سياق الخبر وعنوانه الفرعي.",
      "التدقيق الصارم في الترجمة العربية للمصطلحات لضمان عدم تزييف السياق.",
      "مراعاة القاموس الوطني الفلسطيني المعتمد عند ترجمة تقارير الوكالات الغربية.",
    ],
  },
  {
    tier: "المستوى الثالث · التحقيقات مفتوحة المصدر (Forensic OSINT)",
    percent: "90%",
    title: "المختبرات الجنائية الرقمية وفحص الأقمار الصناعية",
    color: "text-amber-400",
    borderColor: "border-amber-500/40",
    bgColor: "from-[#201504]/90 to-[#100a02]/90",
    agencies: [
      "صور الأقمار الصناعية التجارية (Sentinel, Planet Labs)",
      "مختبرات فحص الأدلة الجنائية المرئية (Visual Forensics)",
      "سجلات الطيران ومراقبة الملاحة الجوية والبحرية الدولية",
      "أرشيفات الويب المستقلة (Wayback Machine, Perma.cc)",
    ],
    rules: [
      "نشر منهجية التحقيق بالتفصيل مع الصور قبل وبعد التكبير والتدقيق.",
      "إتاحة الروابط الخام للجمهور لتمكينه من إعادة التحقق بشكل مستقل.",
      "الإشارة الواضحة لأي هامش احتمالي أو نقص في البيانات الجغرافية.",
    ],
  },
  {
    tier: "المستوى الرابع · منصات التواصل والبلاغات العامة",
    percent: "خاضع للفحص الجنائي",
    title: "حسابات التواصل الاجتماعي والمحتوى المولد من المستخدمين",
    color: "text-rose-400",
    borderColor: "border-rose-500/40",
    bgColor: "from-[#24040a]/90 to-[#120104]/90",
    agencies: [
      "مقاطع الفيديو المنشورة على تليغرام وإكس وتيك توك",
      "شهادات المواطنين الصحفيين عبر تطبيق واتساب وسيغنال",
      "صور متداولة على مجموعات الإسعاف والطوارئ الأهلية",
    ],
    rules: [
      "حظر النشر الفوري دون فحص جنائي لمطابقة الظلال وتاريخ الالتقاط وموقع الحدث.",
      "التواصل المباشر مع صاحب المقطع أو شاهد ميداني موثوق للتأكد من السياق.",
      "وضع وسم تحذيري («قيد التحقق الجنائي») في حال اقتضت المصلحة العامة النشر التنويهي.",
    ],
  },
];

export default function SourcesPolicyPage() {
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);
  const [searchAgency, setSearchAgency] = useState("");

  const filteredTiers = CREDIBILITY_TIERS.map((tier) => ({
    ...tier,
    agencies: tier.agencies.filter((a) =>
      a.toLowerCase().includes(searchAgency.toLowerCase())
    ),
  }));

  return (
    <div className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 selection:text-white pb-24">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="sources-policy" />

      {/* 1. Hero Header السينمائي الفاخر */}
      <section className="relative overflow-hidden border-b border-[var(--gold)]/20 bg-gradient-to-b from-[#1b020a] via-[#140006] to-[#0E0407] py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/12 via-rose-950/20 to-transparent pointer-events-none" />

        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-black shadow-md shadow-amber-950/20">
            <FileSearch className="w-4 h-4 text-[var(--gold)]" />
            <span>بروتوكول التدقيق الجنائي الرباعي وإسناد الأخبار لمصادرها</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            سياسة عزو المصادر والاعتماد الصحفي
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-3xl mx-auto leading-relaxed">
            الصحافة النزيهة لا تخترع الأخبار ولا تنسب لنفسها جهود الآخرين. في «الوطن اليوم»، نلتزم بميثاق العزو الإلزامي الصارم، حيث يُسند كل خبر لبرقيته الأصلية ووكالته المعتمدة فوراً وبشفافية لا تقبل الشك، مع إتاحة روابط التدقيق لكافة القراء.
          </p>

          {/* محرك البحث عن الوكالات المعتمدة */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <input
                type="text"
                value={searchAgency}
                onChange={(e) => setSearchAgency(e.target.value)}
                placeholder="ابحث عن وكالة أو مصدر معتمد..."
                className="w-full px-4 py-3 ps-10 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
              />
              <Search className="w-4 h-4 text-[var(--gold)] absolute top-3.5 start-3.5" />
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* 2. مسار التحقق الجنائي التفاعلي (Interactive Ingestion Flowchart) */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider block">
              هندسة المعالجة التحريرية الآمنة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              مسار التحقق الجنائي الرباعي قبل نشر أي مادة
            </h2>
            <p className="text-xs text-stone-400 max-w-xl mx-auto">
              انقر على أي مرحلة لاستعراض البروتوكول التقني والتحريري المطبق بها
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PIPELINE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activePipelineStep === idx;

              return (
                <div
                  key={step.step}
                  onClick={() => setActivePipelineStep(idx)}
                  className={`rounded-2xl border p-5 transition-all duration-300 cursor-pointer text-right flex flex-col justify-between ${
                    isActive
                      ? "border-[var(--gold)] bg-gradient-to-b from-[#24000a] via-[#1a0007] to-[#120005] shadow-xl shadow-amber-950/30 scale-[1.02]"
                      : "border-white/10 bg-[#16060B]/70 hover:border-white/20"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[var(--gold)]">
                        المرحلة {step.step}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono text-stone-300">
                        {step.duration}
                      </span>
                    </div>

                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-[var(--gold)] text-slate-950 shadow-md shadow-amber-500/20"
                          : "bg-white/5 border border-white/10 text-[var(--gold)]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="font-bold text-sm text-white leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs text-stone-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 mt-4">
                    <span className="text-[10px] font-mono text-[var(--gold)] block truncate font-bold">
                      {step.techBadge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. هرم تصنيف موثوقية المصادر المعتمدة (Source Credibility Hierarchy) */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider block">
              هرم الثقة والاعتماد المؤسسي
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              مصفوفة تصنيف المصادر وقواعد الإسناد الإلزامية
            </h2>
          </div>

          <div className="space-y-6">
            {filteredTiers.map((tier) => (
              <div
                key={tier.tier}
                className={`rounded-3xl border ${tier.borderColor} bg-gradient-to-b ${tier.bgColor} backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-5`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-bold text-stone-400 block">{tier.tier}</span>
                    <h3 className={`text-lg sm:text-xl font-black ${tier.color} mt-0.5`}>
                      {tier.title}
                    </h3>
                  </div>
                  <span className={`text-xl sm:text-2xl font-black ${tier.color} font-mono`}>
                    {tier.percent}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* قائمة الوكالات المعتمدة */}
                  <div className="lg:col-span-5 space-y-2.5">
                    <span className="text-xs font-bold text-white block">
                      الوكالات والجهات المعتمدة في هذا المستوى:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {tier.agencies.length === 0 ? (
                        <span className="text-xs text-stone-400">لا توجد وكالات تطابق البحث.</span>
                      ) : (
                        tier.agencies.map((agency) => (
                          <span
                            key={agency}
                            className="px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs text-stone-200"
                          >
                            {agency}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  {/* القواعد والضوابط التحريرية */}
                  <div className="lg:col-span-7 space-y-2.5">
                    <span className="text-xs font-bold text-white block">
                      الضوابط التحريرية الملزمة لهذا المستوى:
                    </span>
                    <ul className="space-y-2 text-xs text-stone-300">
                      {tier.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className={`w-4 h-4 ${tier.color} mt-0.5 shrink-0`} />
                          <span className="leading-relaxed">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. تعهد النزاهة الرقمي والختم الرسمي */}
        <section className="rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-r from-[#200008] via-[#2d000c] to-[#200008] p-6 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Award className="w-4 h-4" />
              <span>ختم الاعتماد والنزاهة الصحفية لعام 2026</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              تعهد الأمانة: لا خبر مجهول المصدر في «الوطن اليوم»
            </h3>
            <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
              تلتزم هيئة التحرير بحظر استخدام صياغات "أفادت مصادر مطلعة" إلا في أضيق الحدود الاستقصائية المحمية قانونياً، مع التزامنا التام بتوفير رابط التحقق لكل قارئ.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/editorial-policy"
              className="px-5 py-2.5 rounded-xl border border-[var(--gold)]/40 bg-[var(--gold)]/10 hover:bg-[var(--gold)]/20 text-[var(--gold)] text-xs font-bold transition-all shadow-xs"
            >
              ميثاق الشرف التحريري ←
            </Link>
            <Link
              href="/corrections"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-slate-950 text-xs font-black hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-950/20"
            >
              سجل التصحيحات العلني ←
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
