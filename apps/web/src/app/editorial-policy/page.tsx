"use client";

import { useState } from "react";
import Link from "next/link";
import { InstitutionalNav } from "@/components/InstitutionalNav";
import {
  FileCheck2,
  ShieldCheck,
  Scale,
  Sparkles,
  ChevronDown,
  Award,
  CheckCircle2,
  AlertTriangle,
  Bot,
  HeartHandshake,
  Lock,
  Globe,
  BookOpen,
  Search,
  Copy,
  Printer,
  FileText,
  BadgeCheck,
  Users,
  Compass,
  ArrowRight,
  Fingerprint,
  Check,
  HelpCircle,
  Volume2,
  Play,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

interface ConstitutionalArticle {
  num: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  rules: string[];
  citationCode: string;
  icon: any;
}

const ARTICLES: ConstitutionalArticle[] = [
  {
    num: "المادة 01",
    title: "قاعدة التثبت المزدوج ونزاهة الرواية الإخبارية",
    category: "التحقق الميداني",
    summary: "حظر نشر أي خبر عاجل ما لم يكن موثقاً من مصدرين مستقلين على الأقل.",
    content:
      "تلتزم منصة «الوطن اليوم» بعدم نشر أي خبر عاجل أو ادعاء رئيسي يمس الشأن العام ما لم يكن موثقاً من مصدرين مستقلين على الأقل، أو صادراً عن جهة حكومية أو أممية أو حقوقية معتمدة برصيد مهني موثوق. تخضع كافة المواد العاجلة لبروتوكول التدقيق اللحظي لمنع نشر الشائعات أو الأخبار غير المكتملة.",
    rules: [
      "حظر النقل عن الحسابات المجهولة في منصات التواصل دون تدقيق جنائي موثق ومطابقة جغرافية.",
      "تثبيت توقيت الحدث بالساعة والدقيقة بتوقيت القدس الشريف في صدر التغطية المباشرة.",
      "الإشارة الواضحة لأي تحديث لاحق يطرأ على البيانات الأولية في صدر المادة لمنع التضليل.",
    ],
    citationCode: "AWT-CONST-01-VERIFY",
    icon: Scale,
  },
  {
    num: "المادة 02",
    title: "القاموس الوطني الفلسطيني الموحد ومعايير التسمية",
    category: "الهوية السيادية",
    summary: "الالتزام بالمصطلحات الوطنية الموحدة: القدس عاصمة فلسطين، الشهداء، والأراضي المحتلة.",
    content:
      "انطلاقاً من مبدأ «فلسطين أولاً»، تعتمد المنصة دليلاً معيارياً ملزماً لكافة المحررين والمراسلين: تسمية عاصمة فلسطين بـ «القدس المحتلة»، إطلاق صفة «الشهداء» على ضحايا العمليات العسكرية وقصف الاحتلال مع توثيق أسمائهم وأعمارهم وسيرهم الإنسانية، التمييز التام بين «المستوطنات» والأراضي المحتلة، والتعامل بحذر وتدقيق مضاعف مع إعلام الاحتلال بوضع وسم صريح يوضح روايته.",
    rules: [
      "القدس الشريف هي العاصمة الأبدية والتاريخية غير القابلة للتفريط لدولة فلسطين.",
      "عدم تبني المصطلحات المضللة للرواية الإسرائيلية في تغطية الحواجز والاقتحامات والاعتقالات.",
      "توثيق القرى والبلدات المهجرة بأسمائها العربية الكنعانية الأصيلة في كافة التقارير وأطلس فلسطين.",
    ],
    citationCode: "AWT-CONST-02-LEXICON",
    icon: ShieldCheck,
  },
  {
    num: "المادة 03",
    title: "الفصل الصارم والواضح بين الخبر والرأي والتحليل",
    category: "النزاهة التحريرية",
    summary: "تمييز بصري وتحريري مطلق بين الخبر المجرد ومقالات الرأي والافتتاحيات.",
    content:
      "تلتزم المنصة بالفصل البصري والتحريري التام بين المادة الإخبارية المجردة ومقالات الرأي والتحليلات السياسية. توسم مقالات الرأي بوسم واضح («رأي وتحليل») مع إبراز اسم الكاتب وصورته وصفته، والتنويه بأن المقال يعبر عن وجهة نظر صاحبه ولا يمثل بالضرورة الموقف التحريري لمنصة الوطن اليوم.",
    rules: [
      "خلو العناوين الإخبارية من الألفاظ التقييمية أو العواطف المسبقة أو الأحكام القيمية.",
      "إتاحة حق الرد المتكافئ لأي جهة أو شخصية تناولها التحليل السياسي أو التقرير الاستقصائي.",
      "حظر الجمع بين مسؤولية كتابة الخبر والتعليق عليه في نفس المادة الصحفية تحت أي ظرف.",
    ],
    citationCode: "AWT-CONST-03-INTEGRITY",
    icon: FileCheck2,
  },
  {
    num: "المادة 04",
    title: "أخلاقيات الذكاء الاصطناعي ومكافحة التوليد الوهمي",
    category: "التكنولوجيا المسؤولة",
    summary: "استخدام الذكاء الاصطناعي كأداة تدقيق مساعدة تحت الإشراف البشري الكامل.",
    content:
      "تستخدم منصة «الوطن اليوم» خوارزميات الذكاء الاصطناعي التوليدي كأداة للمساعدة في الفهرسة الدلالية، والترجمة، وتلخيص البيانات المعقدة، والتحقق من التكرار. يُحظر حظراً باتاً صياغة أي مادة إخبارية بالذكاء الاصطناعي دون مراجعة واعتماد بشري كامل، مع وضع إشعار صريح للقارئ في حال احتوت المادة على رسوم بيانية مولدة آلياً.",
    rules: [
      "المسؤولية القانونية والتحريرية تقع دائماً على رئيس التحرير البشري والديسك المعتمد.",
      "حظر توليد صور أو مقاطع فيديو مصطنعة تزور وقائع ميدانية (Deepfakes) حظراً جنائياً قاطعاً.",
      "إخضاع مخرجات الذكاء الاصطناعي لفحص الهلوسة والمطابقة الجنائية مع مصادر الميدان الموثقة.",
    ],
    citationCode: "AWT-CONST-04-AI-ETHICS",
    icon: Bot,
  },
  {
    num: "المادة 05",
    title: "حماية المصادر السرية وسلامة الشهود والمراسلين",
    category: "الحصانة المهنية",
    summary: "سرية تامة لهوية المصادر الميدانية وحماية الصحفيين في خطوط النار.",
    content:
      "تضمن المنصة الحماية الكاملة لسرية المصادر التي تزود الصحفيين بمعلومات حساسة، وتلتزم بعدم الكشف عن هويتها تحت أي ضغط قضائي أو سياسي، إلا إذا ثبت تعمد المصدر تضليل الرأي العام. كما تولي المنصة أولوية قصوى لسلامة المراسلين والمصورين في قطاع غزة والضفة الغربية على حساب السبق الصحفي.",
    rules: [
      "تشفير كافة قنوات الاتصال والرسائل الواردة من الميدان ببروتوكولات E2EE وPGP العسكرية.",
      "حظر نشر صور المراسلين في أماكن حساسة قد تعرضهم للاستهداف الميداني أو القصف المعادي.",
      "عدم بث أي مادة قد تلحق أذى بشهود العيان أو عائلاتهم في مناطق النزاع والمداهمات.",
    ],
    citationCode: "AWT-CONST-05-IMMUNITY",
    icon: Lock,
  },
  {
    num: "المادة 06",
    title: "مراعاة الكرامة الإنسانية وحظر نشر المشاهد الصادمة",
    category: "المعايير الإنسانية",
    summary: "احترام كرامة الشهداء والضحايا ووضع تحذير مسبق على المواد البصرية الحساسة.",
    content:
      "تلتزم المنصة بصون كرامة الضحايا وأسرهم، وتمنع نشر صور الجثامين المشوهة أو المشاهد الدموية المقربة إلا بعد معالجة بصرية تحجب التفاصيل القاسية وتضع تحذيراً تحريرياً صريحاً («محتوى حساس»). نهدف إلى توثيق الجريمة والانتهاك دون ابتذال المأساة أو استغلال دماء الأبرياء لجلب المشاهدات.",
    rules: [
      "مراعاة خصوصية الأطفال والجرحى وذويهم في المستشفيات ومراكز الإيواء والمخيمات.",
      "الامتناع عن نشر أسماء الشهداء قبل إبلاغ عائلاتهم رسمياً من الجهات الصحية المختصة.",
      "الحفاظ على أسلوب صحفي رصين يخاطب العقل ويوثق التاريخ للأجيال القادمة دون ابتذال.",
    ],
    citationCode: "AWT-CONST-06-HUMANITY",
    icon: HeartHandshake,
  },
  {
    num: "المادة 07",
    title: "استقلالية الخط التحريري عن المصالح المالية والسياسية",
    category: "السيادة التحريرية",
    summary: "حظر تأثير المعلنين أو الرعاة على محتوى التحقيقات أو الخط التحريري.",
    content:
      "تتمتع هيئة تحرير «الوطن اليوم» بالاستقلال التام عن أي توجيه خارجي أو ضغوط تمويلية. يُمنع منعاً باتاً تدخل المعلنين أو الجهات الراعية في المحتوى التحريري، وتخضع المواد الإعلانية والتسويقية للتمييز البصري الكامل عبر وسوم واضحة («مادة إعلانية» أو «رعاية تجارية»).",
    rules: [
      "الفصل المطلق بين إدارة التحرير وإدارة التسويق والمبيعات والإعلانات.",
      "حظر قبول الهدايا أو الامتيازات التي قد تؤثر على نزاهة وموضوعية ومصداقية الصحفي.",
      "الإفصاح الشفاف عن أي تضارب محتمل في المصالح لدى الكتاب والمحللين المستقلين.",
    ],
    citationCode: "AWT-CONST-07-SOVEREIGNTY",
    icon: Award,
  },
  {
    num: "المادة 08",
    title: "النزاهة والروح الرياضية في منصة «يلا سبورت»",
    category: "الصحافة الرياضية",
    summary: "تغطية رياضية احترافية، نبذ التعصب، والاحتفاء بإنجازات الرياضة الفلسطينية والعربية.",
    content:
      "يلتزم ديسك «يلا سبورت» بنقل وقائع المباريات والبطولات بحيادية تامة ومهنية عالية، مع نبذ التعصب الكروي ومكافحة خطاب الكراهية في الرياضة. تفرد المنصة مساحة خاصة لدعم مشاركات الفدائي والمنتخبات والأندية الفلسطينية والعربية في المحافل القارية والدولية.",
    rules: [
      "الالتزام بالأرقام والإحصاءات المعتمدة من الاتحادات الرسمية (UEFA, FIFA, AFC).",
      "احترام الحكام واللاعبين والامتناع عن التجريح الشخصي والتشهير الرياضي المسيء.",
      "تسليط الضوء على الرياضة كجسر للتضامن الإنساني وصمود الشباب والرياضيين في غزة والقدس.",
    ],
    citationCode: "AWT-CONST-08-SPORTS",
    icon: Globe,
  },
  {
    num: "المادة 09",
    title: "التدقيق الجنائي للتحقيقات الاستقصائية ومصادر OSINT",
    category: "الصحافة الاستقصائية",
    summary: "إخضاع كافة الصور والأقمار الصناعية لبروتوكول التحقق الرقمي الجنائي.",
    content:
      "تخضع كافة التحقيقات الاستقصائية المنشورة على المنصة لبروتوكول التدقيق الجنائي المتقدم (Forensic OSINT). يتم فحص الصور الجوية، بيانات الموقع الجغرافي (Geolocation)، وتوقيت الظلال، لمطابقة الادعاءات مع الوقائع الملموسة قبل النشر.",
    rules: [
      "إتاحة المنهجية الجنائية والأدلة المفتوحة للقراء لتمكينهم من إعادة الفحص المستقل.",
      "الاستعانة بالخبراء المستقلين في قضايا الأسلحة والانتهاكات البيئية والصحية الميدانية.",
      "توثيق الأرشيف الرقمي بأرقام تتبع وبصمات تشفيرية لا تقبل التعديل أو التلاعب اللاحق.",
    ],
    citationCode: "AWT-CONST-09-FORENSICS",
    icon: Sparkles,
  },
  {
    num: "المادة 10",
    title: "الالتزام الفوري بسجل التصحيحات والاعتذار المهني",
    category: "المسؤولية الأخلاقية",
    summary: "نشر أي تصحيح فورياً في صدر المقال وفي السجل العلني دون مواربة.",
    content:
      "تعتبر المنصة أن الاعتراف بالخطأ والمسارعة إلى تصويبه ركن أساسي من أركان المصداقية. في حال حدوث أي خطأ في معلومة أو رقم أو اسم، يلتزم ديسك التحرير بتعديل المقال فوراً مع وضع تنويه تصحيحي واضح، وإدراج تفاصيل التعديل في «سجل التصحيحات العلني» المفتوح لكافة القراء.",
    rules: [
      "التصحيح خلال أقل من 15 دقيقة من ثبوت عدم دقة المعلومة بموجب بروتوكول SLA الصارم.",
      "عدم حذف الأخطاء سراً دون بيان صريح لما تم تعديله للقارئ وللرأي العام.",
      "تقديم اعتذار مهني للمتضرر في حال كان للخطأ أثر معنوي أو قانوني مثبت.",
    ],
    citationCode: "AWT-CONST-10-CORRECTIONS",
    icon: CheckCircle2,
  },
];

const SIGNATORIES = [
  {
    role: "رئيس مجلس الإدارة والتحرير",
    name: "هيئة تحرير صحيفة الوطن اليوم",
    focus: "السياسة العامة والالتزام الوطني والسيادة الصحفية",
    stampCode: "SIG-AWT-CHAIR-2026",
  },
  {
    role: "مدير التدقيق الجنائي ومكافحة التضليل",
    name: "ديسك الاستقصاء والتحقق الرقمي (OSINT)",
    focus: "فحص مصادر الميدان وتحليل الأقمار الصناعية والأدلة المرئية",
    stampCode: "SIG-AWT-FACT-2026",
  },
  {
    role: "المستشار القانوني وحقوق النشر",
    name: "الدائرة القانونية وحماية الملكية الفكرية",
    focus: "المواثيق الدولية والاتفاقيات الصحفية وبروتوكولات DMCA",
    stampCode: "SIG-AWT-LEGAL-2026",
  },
  {
    role: "منسق شبكة المراسلين الميدانيين",
    name: "غرفة عمليات القدس وغزة والضفة الغربية",
    focus: "سلامة الصحفيين والتوثيق الميداني المباشر من خطوط النار",
    stampCode: "SIG-AWT-FIELD-2026",
  },
];

export default function EditorialPolicyPage() {
  const [openArticle, setOpenArticle] = useState<string>("المادة 01");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedLexicon, setCopiedLexicon] = useState<string | null>(null);
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"articles" | "lexicon" | "signatures" | "simulator">("articles");

  // محاكي فحص النزاهة التحريرية التفاعلي
  const [auditStep, setAuditStep] = useState<number>(0);
  const [auditScore, setAuditScore] = useState<number>(100);
  const [auditVerdict, setAuditVerdict] = useState<string | null>(null);

  const runAuditSimulation = (penalty: number, stepVerdict: string) => {
    const nextStep = auditStep + 1;
    const nextScore = Math.max(0, auditScore - penalty);
    setAuditStep(nextStep);
    setAuditScore(nextScore);
    if (nextStep >= 3) {
      if (nextScore >= 90) {
        setAuditVerdict("مادة مستوفية لكافة المعايير الدستورية ومجازة للنشر الفوري بدرجة امتياز ✓");
      } else if (nextScore >= 70) {
        setAuditVerdict("تتطلب مراجعة ثانية من رئيس الديسك والتحقق من مصدر إضافي قبل الإفراج ⚠️");
      } else {
        setAuditVerdict("محظورة من النشر: خرق صريح لقاعدة التثبت المزدوج أو القاموس الوطني ✕");
      }
    }
  };

  const resetAuditSimulation = () => {
    setAuditStep(0);
    setAuditScore(100);
    setAuditVerdict(null);
  };

  const toggleArticle = (num: string) => {
    setOpenArticle((prev) => (prev === num ? "" : num));
  };

  const handleCopyTerm = (term: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(term);
      setCopiedLexicon(term);
      setTimeout(() => setCopiedLexicon(null), 2500);
    }
  };

  const handleCopySpecificCitation = (art: ConstitutionalArticle) => {
    const citation = `ميثاق الشرف التحريري لمنصة الوطن اليوم (2026) — ${art.num}: ${art.title} [رمز التوثيق: ${art.citationCode}].`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(citation);
      setCopiedCitation(art.num);
      setTimeout(() => setCopiedCitation(null), 3000);
    }
  };

  const categories = [
    { id: "all", label: "كافة المواد (10)" },
    { id: "التحقق الميداني", label: "التحقق الميداني" },
    { id: "الهوية السيادية", label: "الهوية والقدس" },
    { id: "النزاهة التحريرية", label: "النزاهة والمصادر" },
    { id: "التكنولوجيا المسؤولة", label: "الذكاء الاصطناعي" },
    { id: "الصحافة الاستقصائية", label: "الاستقصاء الجنائي" },
  ];

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCat = selectedCategory === "all" || art.category === selectedCategory;
    const matchesQuery =
      art.title.includes(searchQuery) ||
      art.content.includes(searchQuery) ||
      art.category.includes(searchQuery) ||
      art.num.includes(searchQuery);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 selection:text-white pb-24">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="editorial-policy" />

      {/* 1. Hero Header الملكي السينمائي الفاخر */}
      <section className="relative overflow-hidden border-b border-[var(--gold)]/20 bg-gradient-to-b from-[#1c020a] via-[#140006] to-[#0E0407] py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/12 via-rose-950/20 to-transparent pointer-events-none" />

        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-black shadow-lg shadow-amber-950/20 animate-pulse">
            <BadgeCheck className="w-4 h-4 text-[var(--gold)]" />
            <span>المرجع الدستوري الأعلى للسياسة التحريرية وأخلاقيات المهنة الصحفية لعام 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            ميثاق الشرف التحريري والسياسة المعيارية
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-3xl mx-auto leading-relaxed">
            المرجع الدستوري الحاكم لكافة صحفيي، مراسلي، ومحرري مؤسسة «الوطن اليوم». نلتزم بنقل الحقيقة كما هي، صون الكرامة الإنسانية، ترسيخ الهوية الوطنية الفلسطينية، وإخضاع أعمالنا لأعلى معايير الرقابة الجنائية والتدقيق الأخلاقي والشفافية التامة أمام الجمهور.
          </p>

          {/* شريط التبويبات التفاعلي العلوي السريع */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: "articles", label: "المواد الدستورية (10)", icon: BookOpen },
              { id: "lexicon", label: "القاموس الوطني الموحد", icon: ShieldCheck },
              { id: "simulator", label: "محاكي فحص النزاهة التفاعلي", icon: SlidersHorizontal },
              { id: "signatures", label: "مجلس التحرير والاعتماد", icon: Fingerprint },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#120004] font-black shadow-md shadow-amber-950/20 scale-[1.02]"
                      : "bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* محرك البحث التفاعلي في مواد الميثاق */}
          {activeTab === "articles" && (
            <div className="max-w-xl mx-auto pt-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في نصوص الميثاق، القواعد، أو المصطلحات المعتمدة..."
                  className="w-full px-4 py-3.5 ps-11 rounded-2xl border border-white/15 bg-black/60 text-white placeholder-white/40 text-xs focus:outline-hidden focus:border-[var(--gold)] shadow-inner transition-colors backdrop-blur-md"
                />
                <Search className="w-4 h-4 text-[var(--gold)] absolute top-4 start-4" />
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* =================================================================== */}
        {/* TAB 1: المواد الدستورية العشر التفاعلية                             */}
        {/* =================================================================== */}
        {activeTab === "articles" && (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider block">
                  المواد المعيارية الملزمة
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  المواد الدستورية العشر المعتمدة
                </h2>
              </div>

              {/* أزرار الفلترة السريعة للمواد */}
              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedCategory === c.id
                        ? "bg-[var(--gold)] text-[#120004] font-black shadow-md shadow-amber-950/20"
                        : "bg-white/5 text-stone-300 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredArticles.map((art) => {
                const Icon = art.icon;
                const isOpen = openArticle === art.num;

                return (
                  <article
                    key={art.num}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-[var(--gold)]/70 bg-gradient-to-b from-[#20020c] via-[#160107] to-[#100004] shadow-2xl shadow-amber-950/30"
                        : "border-white/10 bg-[#16060B]/70 hover:border-white/20"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleArticle(art.num)}
                      className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-right cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 transition-all ${
                            isOpen
                              ? "bg-gradient-to-br from-[var(--gold)] to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25"
                              : "bg-white/5 text-stone-300 border border-white/10"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-[var(--gold)]">
                              {art.num}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-stone-400 border border-white/10">
                              {art.category}
                            </span>
                          </div>
                          <h3 className="font-bold text-base sm:text-lg text-white mt-1">
                            {art.title}
                          </h3>
                          <p className="text-xs text-stone-400 mt-1 line-clamp-1">
                            {art.summary}
                          </p>
                        </div>
                      </div>

                      <ChevronDown
                        className={`w-5 h-5 text-stone-400 transition-transform duration-300 shrink-0 ${
                          isOpen ? "rotate-180 text-[var(--gold)]" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10 space-y-5 animate-in fade-in duration-200">
                        <div className="p-4 rounded-xl bg-black/50 border border-white/5 leading-relaxed text-xs sm:text-sm text-stone-200">
                          {art.content}
                        </div>

                        <div className="space-y-2.5">
                          <span className="text-xs font-black text-[var(--gold)] flex items-center gap-2">
                            <Compass className="w-4 h-4" />
                            <span>الضوابط التحريرية والتطبيق الإلزامي:</span>
                          </span>
                          <ul className="space-y-2 text-xs text-stone-300">
                            {art.rules.map((rule, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                                <span className="leading-relaxed">{rule}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                          <button
                            type="button"
                            onClick={() => handleCopySpecificCitation(art)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-stone-200 text-xs font-bold transition-all cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5 text-[var(--gold)]" />
                            <span>
                              {copiedCitation === art.num
                                ? "تم نسخ توثيق هذه المادة!"
                                : `نسخ اقتباس المادة (${art.num})`}
                            </span>
                          </button>

                          <span className="font-mono text-[10px] text-stone-400">
                            {art.citationCode}
                          </span>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* TAB 2: القاموس الوطني الفلسطيني الموحد ومعجم التسميات السيادية      */}
        {/* =================================================================== */}
        {activeTab === "lexicon" && (
          <section className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-[#062013]/90 via-[#0a1810]/90 to-[#040c07]/90 backdrop-blur-xl p-6 sm:p-9 space-y-6 shadow-2xl animate-in fade-in duration-300">
            <div className="border-b border-emerald-500/20 pb-4 space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
                <BookOpen className="w-4 h-4" />
                <span>معجم التحرير السيادي الملزم لكافة المكاتب والمراسلين</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                القاموس الوطني الفلسطيني الموحد ومعايير التسمية
              </h3>
              <p className="text-xs text-stone-300">
                دليل المصطلحات المعتمد لمواجهة التضليل اللغوي وترسيخ الرواية الأصيلة (انقر على أي مصطلح لنسخه مباشرة ومشاركته).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {[
                { wrong: "النزاع الإسرائيلي الفلسطيني", correct: "قضية الشعب الفلسطيني والاحتلال", why: "ليس نزاعاً متكافئاً بل احتلال غير شرعي لشعب أعزل." },
                { wrong: "المعابر الإسرائيلية", correct: "معابر قطاع غزة المحاصرة", why: "معابر فلسطينية تفرض عليها سلطة الاحتلال حصاراً عسكرياً." },
                { wrong: "قتلى الغارات", correct: "شهداء القصف والعدوان", why: "صون صفة الشهادة لكافة ضحايا الاستهداف العسكري الصهيوني." },
                { wrong: "حاجز أمني", correct: "حاجز عسكري استيطاني", why: "حواجز لتقطيع أوصال المدن والقرى وليست إجراءات أمنية." },
                { wrong: "القدس الشرقية", correct: "القدس المحتلة عاصمة فلسطين", why: "القدس وحدة واحدة غير قابلة للتجزئة وهي العاصمة الأبدية." },
                { wrong: "مستوطنة شرعية", correct: "مستوطنة استعمارية غير شرعية", why: "كافة المستوطنات باطلة ومخالفة لاتفاقية جنيف الرابعة." },
                { wrong: "وزارة الدفاع الإسرائيلية", correct: "وزارة جيش الاحتلال الإسرائيلي", why: "جيش يمارس الاحتلال والعدوان ولا يدافع عن حدود قانونية." },
                { wrong: "أعمال شغب", correct: "احتجاجات ومواجهات شعبية مشروعة", why: "حق مقاومة الاحتلال مكفول بموجب القانون الدولي والشرائع." },
                { wrong: "الجدار الفاصل", correct: "جدار الفصل والتوسع العنصري", why: "وفق فتوى محكمة العدل الدولية في لاهاي عام 2004." },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCopyTerm(item.correct)}
                  className="p-4 rounded-2xl bg-black/50 border border-emerald-500/20 hover:border-emerald-500/50 transition-all cursor-pointer space-y-2.5 group"
                  title="انقر لنسخ المصطلح المعتمد"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-rose-400 line-through opacity-80">{item.wrong}</span>
                    <span className="text-emerald-400 font-bold group-hover:scale-105 transition-transform flex items-center gap-1">
                      <Copy className="w-3 h-3" />
                      <span>{copiedLexicon === item.correct ? "تم النسخ!" : "نسخ"}</span>
                    </span>
                  </div>
                  <div className="text-xs font-black text-emerald-300 leading-snug">
                    ✓ {item.correct}
                  </div>
                  <p className="text-[10px] text-stone-400 leading-tight border-t border-white/5 pt-1.5">
                    {item.why}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =================================================================== */}
        {/* TAB 3: محاكي فحص النزاهة التحريرية التفاعلي                          */}
        {/* =================================================================== */}
        {activeTab === "simulator" && (
          <section className="rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-b from-[#1c020a] via-[#140006] to-[#0E0407] p-6 sm:p-9 space-y-6 shadow-2xl animate-in fade-in duration-300">
            <div className="border-b border-white/10 pb-4 space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--gold)]">
                <SlidersHorizontal className="w-4 h-4 text-[var(--gold)]" />
                <span>المحاكي التفاعلي لغرفة التحرير 2026</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                محاكي فحص النزاهة قبل الإفراج عن المادة للنشر
              </h3>
              <p className="text-xs text-stone-400">
                اختبر بنفسك كيف تطبق غرفة أخبار الوطن اليوم معايير الميثاق بدقة جنائية قبل ظهور الخبر للجمهور
              </p>
            </div>

            {/* شريط مؤشر النزاهة الحي */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-400 block font-medium">مؤشر الامتثال للميثاق الدستوري:</span>
                <span className="text-lg font-black text-white">{auditScore}% درجة النزاهة</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetAuditSimulation}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة الضبط</span>
                </button>
              </div>
            </div>

            {/* خطوات الاختبار التفاعلية */}
            {auditStep === 0 && (
              <div className="p-6 rounded-2xl bg-[#1f020d] border border-white/10 space-y-4">
                <span className="text-xs font-bold text-[var(--gold)]">المرحلة 1 من 3: التحقق الميداني</span>
                <h4 className="text-base font-bold text-white">وصل خبر عاجل عن استهداف ميداني نقلاً عن قناة تليغرام غير رسمية:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => runAuditSimulation(40, "خرق قاعدة التثبت المزدوج")}
                    className="p-4 rounded-xl bg-black/50 hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/40 text-right text-xs transition-all space-y-1"
                  >
                    <span className="font-bold text-rose-300 block">نشر الخبر فوراً لكسب السبق الصحفي</span>
                    <span className="text-[10px] text-stone-400 block">يخصم 40 نقطة (مخالفة المادة 01)</span>
                  </button>

                  <button
                    onClick={() => runAuditSimulation(0, "امتثال كامل للمادة 01")}
                    className="p-4 rounded-xl bg-black/50 hover:bg-emerald-950/40 border border-white/10 hover:border-emerald-500/40 text-right text-xs transition-all space-y-1"
                  >
                    <span className="font-bold text-emerald-300 block">إحالة الخبر للمراسل الميداني للتحقق من مصدرين</span>
                    <span className="text-[10px] text-stone-400 block">امتثال دستوري كامل 100%</span>
                  </button>
                </div>
              </div>
            )}

            {auditStep === 1 && (
              <div className="p-6 rounded-2xl bg-[#1f020d] border border-white/10 space-y-4 animate-in fade-in">
                <span className="text-xs font-bold text-[var(--gold)]">المرحلة 2 من 3: تدقيق القاموس الوطني</span>
                <h4 className="text-base font-bold text-white">أورد التقرير الأولي مصطلح "النزاع الإسرائيلي الفلسطيني" في متن الخبر:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => runAuditSimulation(30, "خرق القاموس الوطني")}
                    className="p-4 rounded-xl bg-black/50 hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/40 text-right text-xs transition-all space-y-1"
                  >
                    <span className="font-bold text-rose-300 block">الإبقاء على الصياغة كما وردت في الوكالة الأجنبية</span>
                    <span className="text-[10px] text-stone-400 block">يخصم 30 نقطة (مخالفة المادة 02)</span>
                  </button>

                  <button
                    onClick={() => runAuditSimulation(0, "تطبيق القاموس الوطني")}
                    className="p-4 rounded-xl bg-black/50 hover:bg-emerald-950/40 border border-white/10 hover:border-emerald-500/40 text-right text-xs transition-all space-y-1"
                  >
                    <span className="font-bold text-emerald-300 block">تصويب المصطلح فوراً إلى «قضية الشعب الفلسطيني والاحتلال»</span>
                    <span className="text-[10px] text-stone-400 block">تطبيق ملزم للقاموس الوطني</span>
                  </button>
                </div>
              </div>
            )}

            {auditStep === 2 && (
              <div className="p-6 rounded-2xl bg-[#1f020d] border border-white/10 space-y-4 animate-in fade-in">
                <span className="text-xs font-bold text-[var(--gold)]">المرحلة 3 من 3: أخلاقيات الصورة والمشاهد الحساسة</span>
                <h4 className="text-base font-bold text-white">وصلت صور حصرية لقصف مستشفى تضم مشاهد دموية قاسية ومؤلمة:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => runAuditSimulation(30, "خرق الكرامة الإنسانية")}
                    className="p-4 rounded-xl bg-black/50 hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/40 text-right text-xs transition-all space-y-1"
                  >
                    <span className="font-bold text-rose-300 block">نشر الصور كاملة دون معالجة لجلب تعاطف أكبر</span>
                    <span className="text-[10px] text-stone-400 block">يخصم 30 نقطة (مخالفة المادة 06)</span>
                  </button>

                  <button
                    onClick={() => runAuditSimulation(0, "صون الكرامة والتحذير المسبق")}
                    className="p-4 rounded-xl bg-black/50 hover:bg-emerald-950/40 border border-white/10 hover:border-emerald-500/40 text-right text-xs transition-all space-y-1"
                  >
                    <span className="font-bold text-emerald-300 block">حجب المشاهد القاسية بتمويه وقور ووضع وسم «محتوى حساس»</span>
                    <span className="text-[10px] text-stone-400 block">صون كامل للكرامة الإنسانية</span>
                  </button>
                </div>
              </div>
            )}

            {auditVerdict && (
              <div className="p-6 rounded-2xl bg-black/70 border border-[var(--gold)] space-y-3 text-center animate-in zoom-in-95">
                <Award className="w-12 h-12 text-[var(--gold)] mx-auto" />
                <h4 className="text-lg font-black text-white">{auditVerdict}</h4>
                <p className="text-xs text-stone-300">
                  نتيجة المحاكاة تعكس دقة المعايير التي يمر بها كل حرف وصورة قبل ظهورها على شاشتك في «الوطن اليوم».
                </p>
                <button
                  onClick={resetAuditSimulation}
                  className="px-5 py-2 rounded-xl bg-[var(--gold)] text-[#120004] font-black text-xs hover:brightness-110"
                >
                  إجراء محاكاة جديدة
                </button>
              </div>
            )}
          </section>
        )}

        {/* =================================================================== */}
        {/* TAB 4: مجلس التحرير والجهات الموقعة والختم الرقمي                   */}
        {/* =================================================================== */}
        {activeTab === "signatures" && (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider block">
                الاعتماد المؤسسي الرسمي
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                مجلس التحرير والجهات الموقعة على الميثاق لعام 2026
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SIGNATORIES.map((sig, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl space-y-3 shadow-lg hover:border-[var(--gold)]/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold)] flex items-center justify-center font-bold">
                      <Fingerprint className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-white/5 text-[var(--gold)] border border-white/10">
                      معتمد
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[var(--gold)] font-bold block">
                      {sig.role}
                    </span>
                    <h4 className="text-xs font-bold text-white">{sig.name}</h4>
                    <p className="text-[11px] text-stone-400 leading-relaxed">{sig.focus}</p>
                  </div>
                  <div className="pt-2 border-t border-white/5 font-mono text-[9px] text-stone-500">
                    {sig.stampCode}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

