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
    description: "سحب البرقيات الإخبارية فور صدورها من 16 مصدراً معتمداً (وفا، رويترز، أ ف ب، الأناضول، بيانات الصحة والهلال الأحمر).",
    icon: Radio,
    techBadge: "Webhooks & RSS 2.0 Engine",
  },
  {
    step: "02",
    title: "الفحص الدلالي وكشف التكرار (AI Deduplication)",
    duration: "< 1.5 ثانية",
    description: "خوارزمية ذكاء اصطناعي تحلل سياق الخبر، تقارنه بما تم نشره خلال 24 ساعة، وتمنع التكرار وتصفي الصياغات الدعائية.",
    icon: Cpu,
    techBadge: "Gemini 2.5 Flash / Semantic Vector",
  },
  {
    step: "03",
    title: "المراجعة والتدقيق التحريري البشري (Human Fact-Check)",
    duration: "دقيقة إلى دقيقتين",
    description: "إحالة الأخبار الحساسة لغرفة التحرير الميداني للمطابقة الجنائية مع الصور والشهود على الأرض قبل الإفراج للنشر.",
    icon: UserCheck,
    techBadge: "Newsroom Review Desk 24/7",
  },
  {
    step: "04",
    title: "العزو الإلزامي وتثبيت رابط التحقق (Attribution)",
    duration: "لحظي",
    description: "تثبيت اسم الوكالة الأصلية، ووقت الصدور، ورابط التوثيق في ترويسة المقال لتمكين القارئ من الرجوع للأصل فوراً.",
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
    title: "الوكالات الرسمية والمنظمات الإنسانية الميدانية",
    color: "text-emerald-400",
    borderColor: "border-emerald-500/40",
    bgColor: "from-[#062013]/90 to-[#031008]/90",
    agencies: [
      "وكالة الأنباء الفلسطينية الرسمية (وفا)",
      "بيانات وزارة الصحة الفلسطينية",
      "جمعية الهلال الأحمر الفلسطيني",
      "وكالة غوث وتشغيل اللاجئين (الأونروا)",
      "الدفاع المدني الفلسطيني",
    ],
    rules: [
      "ذكر المصدر في مقدمة الخبر أو كبسولة الاعتماد الرئاسية.",
      "توثيق تاريخ وساعة صدور البيان بدقة متناهية.",
      "نشر صور الأقمار الصناعية والإحداثيات الجغرافية الموثقة.",
    ],
  },
  {
    tier: "المستوى الثاني · الثقة الدولية المعتمدة",
    percent: "90%",
    title: "وكالات الأنباء الدولية والصحافة الاستقصائية العالمية",
    color: "text-sky-400",
    borderColor: "border-sky-500/40",
    bgColor: "from-[#061826]/90 to-[#020b12]/90",
    agencies: [
      "وكالة رويترز للأنباء (Reuters)",
      "وكالة الصحافة الفرنسية (AFP)",
      "وكالة أسوشيتد برس (AP)",
      "وكالة الأناضول (Anadolu)",
      "شبكة الجزيرة نت",
    ],
    rules: [
      "النسب الصريح لاسم الوكالة الدولية في سياق الخبر.",
      "التدقيق في الترجمة العربية للمصطلحات لضمان عدم تزييف السياق.",
      "مراعاة القاموس الوطني الفلسطيني المعتمد عند ترجمة تقارير الوكالات الغربية.",
    ],
  },
  {
    tier: "المستوى الثالث · التحقيقات مفتوحة المصدر (OSINT)",
    percent: "85%",
    title: "المختبرات الجنائية الرقمية وفحص الأقمار الصناعية",
    color: "text-amber-400",
    borderColor: "border-amber-500/40",
    bgColor: "from-[#201504]/90 to-[#100a02]/90",
    agencies: [
      "صور الأقمار الصناعية التجارية (Sentinel, Planet)",
      "مختبرات فحص الأدلة الجنائية المرئية",
      "سجلات الطيران ومراقبة الملاحة الجوية والبحرية",
    ],
    rules: [
      "نشر منهجية التحقيق بالتفصيل مع الصور قبل وبعد التكبير.",
      "إتاحة الروابط الخام للجمهور لتمكينه من إعادة التحقق بشكل مستقل.",
      "الإشارة الواضحة لأي هامش احتمالي في التحليل.",
    ],
  },
];

export default function SourcesPolicyPage() {
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);

  return (
    <div className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 selection:text-white pb-24">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="sources-policy" />

      {/* 1. Hero Header السينمائي الفاخر */}
      <div className="relative overflow-hidden border-b border-[var(--gold)]/20 bg-gradient-to-b from-[#1b020a] via-[#140006] to-[#0E0407] py-14 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-rose-950/20 to-transparent pointer-events-none" />
        
        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-bold shadow-md shadow-amber-950/20">
            <FileSearch className="w-4 h-4" />
            <span>بروتوكول التدقيق الجنائي الرباعي وإسناد الأخبار لمصادرها</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            سياسة عزو المصادر وحماية النزاهة الصحفية
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
            الصحافة النزيهة لا تخترع الأخبار ولا تنسب لنفسها ما لا تملكه. في «الوطن اليوم»، نلتزم بميثاق العزو الإلزامي، حيث يُسند كل خبر لبرقيته الأصلية ووكالته المعتمدة فوراً وبشفافية لا تقبل الشك.
          </p>
        </div>
      </div>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-14">
        {/* 2. مخطط مسار التحقق الجنائي التفاعلي (Interactive Ingestion Flowchart) */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider">
              هندسة المعالجة التحريرية 2026
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              مسار التحقق الجنائي الرباعي قبل نشر أي مادة
            </h2>
          </div>

          {/* خطوات المسار التفاعلية */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {PIPELINE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activePipelineStep === idx;

              return (
                <div
                  key={step.step}
                  onClick={() => setActivePipelineStep(idx)}
                  className={`rounded-2xl border p-5 transition-all duration-300 cursor-pointer text-right flex flex-col justify-between ${
                    isActive
                      ? "border-[var(--gold)] bg-gradient-to-b from-[#24000a] to-[#120005] shadow-xl shadow-amber-950/30 scale-[1.02]"
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

                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--gold)]">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="font-bold text-sm text-white leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-xs text-stone-300 leading-relaxed line-clamp-3">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 mt-4">
                    <span className="text-[10px] font-mono text-stone-400 block truncate">
                      {step.techBadge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. هرم تصنيف موثوقية المصادر المعتمدة (Source Credibility Hierarchy) */}
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider block">
              هرم الثقة المؤسسي
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              تصنيف المصادر المعتمدة ومعايير إسنادها
            </h2>
          </div>

          <div className="space-y-6">
            {CREDIBILITY_TIERS.map((tier) => (
              <div
                key={tier.tier}
                className={`rounded-3xl border ${tier.borderColor} bg-gradient-to-b ${tier.bgColor} backdrop-blur-xl p-6 sm:p-7 shadow-xl space-y-5`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-bold text-stone-400 block">{tier.tier}</span>
                    <h3 className={`text-lg font-black ${tier.color} mt-0.5`}>
                      {tier.title}
                    </h3>
                  </div>
                  <span className={`text-2xl font-black ${tier.color} font-mono`}>
                    {tier.percent}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* قائمة الوكالات المعتمدة */}
                  <div className="lg:col-span-5 space-y-2">
                    <span className="text-xs font-bold text-white block">أبرز الشركاء والوكالات المعتمدة:</span>
                    <div className="flex flex-wrap gap-2">
                      {tier.agencies.map((agency) => (
                        <span
                          key={agency}
                          className="px-2.5 py-1 rounded-xl bg-black/40 border border-white/10 text-xs text-stone-200"
                        >
                          {agency}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* القواعد والضوابط التحريرية */}
                  <div className="lg:col-span-7 space-y-2">
                    <span className="text-xs font-bold text-white block">قواعد النشر الإلزامية:</span>
                    <ul className="space-y-2 text-xs text-stone-300">
                      {tier.rules.map((rule, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 ${tier.color} mt-0.5 shrink-0`} />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. تعهد النزاهة الرقمي والختم الرسمي */}
        <div className="rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-r from-[#200008] via-[#2d000c] to-[#200008] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Award className="w-4 h-4" />
              <span>ختم الاعتماد والنزاهة الصحفية 2026</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              تعهد الأمانة: لا خبر مجهول المصدر في «الوطن اليوم»
            </h3>
            <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
              تلتزم هيئة التحرير بحظر استخدام صياغات "أفادت مصادر مطلعة" إلا في أضيق الحدود الاستقصائية المحمية قانونياً، مع التزامنا التام بتوفير رابط التحقق لكل قارئ.
            </p>
          </div>

          <Link
            href="/corrections"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-slate-950 text-xs font-black hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-950/20 shrink-0"
          >
            سجل التصحيحات العلني ←
          </Link>
        </div>
      </div>
    </div>
  );
}
