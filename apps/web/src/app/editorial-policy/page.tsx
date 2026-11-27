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
} from "lucide-react";

interface ConstitutionalArticle {
  num: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  rules: string[];
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
      "حظر النقل عن الحسابات المجهولة في منصات التواصل دون تدقيق جنائي موثق.",
      "تثبيت توقيت الحدث بالساعة والدقيقة بتوقيت القدس الشريف.",
      "الإشارة الواضحة لأي تحديث لاحق يطرأ على البيانات الأولية في صدر المادة.",
    ],
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
      "القدس الشريف هي العاصمة الأبدية والتاريخية لدولة فلسطين.",
      "عدم تبني المصطلحات المضللة للرواية الإسرائيلية في تغطية الحواجز والاقتحامات.",
      "توثيق القرى والبلدات المهجرة بأسمائها العربية الكنعانية الأصيلة في كافة التقارير.",
    ],
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
      "خلو العناوين الإخبارية من الألفاظ التقييمية أو العواطف المسبقة.",
      "إتاحة حق الرد المتكافئ لأي جهة أو شخصية تناولها التحليل السياسي.",
      "حظر الجمع بين مسؤولية كتابة الخبر والتعليق عليه في نفس المادة الصحفية.",
    ],
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
      "المسؤولية القانونية والتحريرية تقع دائماً على رئيس التحرير البشري.",
      "حظر توليد صور أو مقاطع فيديو مصطنعة تزور وقائع ميدانية (Deepfakes).",
      "إخضاع مخرجات الذكاء الاصطناعي لفحص الهلوسة والمطابقة الجنائية مع مصادر الميدان.",
    ],
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
      "تشفير كافة قنوات الاتصال والرسائل الواردة من الميدان ببروتوكولات E2EE.",
      "حظر نشر صور المراسلين في أماكن حساسة قد تعرضهم للاستهداف الميداني.",
      "عدم بث أي مادة قد تلحق أذى بشهود العيان أو عائلاتهم في مناطق النزاع.",
    ],
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
      "مراعاة خصوصية الأطفال والجرحى وذويهم في المستشفيات ومراكز الإيواء.",
      "الامتناع عن نشر أسماء الشهداء قبل إبلاغ عائلاتهم رسمياً من الجهات الصحية المختصة.",
      "الحفاظ على أسلوب صحفي رصين يخاطب العقل ويوثق التاريخ للأجيال القادمة.",
    ],
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
      "الفصل المطلق بين إدارة التحرير وإدارة التسويق والمبيعات.",
      "حظر قبول الهدايا أو الامتيازات التي قد تؤثر على نزاهة وموضوعية الصحفي.",
      "الإفصاح الشفاف عن أي تضارب محتمل في المصالح لدى الكتاب والمحللين.",
    ],
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
      "الالتزام بالأرقام والإحصاءات المعتمدة من الاتحادات الرسمية (UEFA, FIFA).",
      "احترام الحكام واللاعبين والامتناع عن التجريح الشخصي والتشهير الرياضي.",
      "تسليط الضوء على الرياضة كجسر للتضامن الإنساني وصمود الشباب الفلسطيني.",
    ],
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
      "الاستعانة بالخبراء المستقلين في قضايا الأسلحة والانتهاكات البيئية والصحية.",
      "توثيق الأرشيف الرقمي بأرقام تتبع وبصمات تشفيرية لا تقبل التعديل أو التلاعب.",
    ],
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
      "التصحيح خلال أقل من 15 دقيقة من ثبوت عدم دقة المعلومة.",
      "عدم حذف الأخطاء سراً دون بيان صريح لما تم تعديله للقارئ.",
      "تقديم اعتذار مهني للمتضرر في حال كان للخطأ أثر معنوي أو قانوني.",
    ],
    icon: CheckCircle2,
  },
];

const SIGNATORIES = [
  {
    role: "رئيس مجلس الإدارة والتحرير",
    name: "هيئة تحرير صحيفة الوطن اليوم",
    focus: "السياسة العامة والالتزام الوطني",
  },
  {
    role: "مدير التدقيق الجنائي ومكافحة التضليل",
    name: "ديسك الاستقصاء والتحقق الرقمي",
    focus: "فحص مصادر الميدان وتحليل الأقمار الصناعية",
  },
  {
    role: "المستشار القانوني وحقوق النشر",
    name: "الدائرة القانونية وحماية الملكية",
    focus: "المواثيق الدولية والاتفاقيات الصحفية",
  },
  {
    role: "منسق شبكة المراسلين الميدانيين",
    name: "غرفة عمليات القدس وغزة والضفة",
    focus: "سلامة الصحفيين والتوثيق الميداني المباشر",
  },
];

export default function EditorialPolicyPage() {
  const [openArticle, setOpenArticle] = useState<string>("المادة 01");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [copiedLexicon, setCopiedLexicon] = useState<string | null>(null);
  const [copiedCitation, setCopiedCitation] = useState(false);

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

  const handleCopyCitation = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        "منصة الوطن اليوم — ميثاق الشرف التحريري والسياسة المعيارية المعتمدة لعام 2026. الميثاق الدستوري للإعلام الفلسطيني المستقل."
      );
      setCopiedCitation(true);
      setTimeout(() => setCopiedCitation(false), 3000);
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
    const matchesCat =
      selectedCategory === "all" || art.category === selectedCategory;
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-black shadow-lg shadow-amber-950/20">
            <BadgeCheck className="w-4 h-4 text-[var(--gold)]" />
            <span>المرجع الدستوري الأعلى للسياسة التحريرية وأخلاقيات المهنة الصحفية</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            ميثاق الشرف التحريري والسياسة المعيارية
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-3xl mx-auto leading-relaxed">
            المرجع الدستوري الحاكم لكافة صحفيي، مراسلي، ومحرري مؤسسة «الوطن اليوم». نلتزم بنقل الحقيقة كما هي، صون الكرامة الإنسانية، ترسيخ الهوية الوطنية الفلسطينية، وإخضاع أعمالنا لأعلى معايير الرقابة الجنائية والتدقيق الأخلاقي والشفافية التامة أمام الجمهور.
          </p>

          {/* شريط الأدوات السريعة: البحث والنسخ والطباعة */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={handleCopyCitation}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-stone-200 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Copy className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>{copiedCitation ? "تم نسخ الاقتباس الدستوري!" : "نسخ الاقتباس الدستوري"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") window.print();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-stone-200 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>طباعة الوثيقة الرسمية</span>
            </button>
          </div>

          {/* محرك البحث التفاعلي في مواد الميثاق */}
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
        </div>
      </section>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* 2. المواد الدستورية العشر التفاعلية (The 10 Constitutional Articles) */}
        <section className="space-y-6">
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
                      ? "bg-[var(--gold)] text-[#120005] font-black shadow-md shadow-amber-950/20"
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
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* 3. القاموس الوطني الفلسطيني الموحد ومعجم التسميات السيادية */}
        <section className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-[#062013]/90 via-[#0a1810]/90 to-[#040c07]/90 backdrop-blur-xl p-6 sm:p-9 space-y-6 shadow-2xl">
          <div className="border-b border-emerald-500/20 pb-4 space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
              <BookOpen className="w-4 h-4" />
              <span>معجم التحرير السيادي الملزم لكافة المكاتب والمراسلين</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              القاموس الوطني الفلسطيني الموحد ومعايير التسمية
            </h3>
            <p className="text-xs text-stone-300">
              دليل المصطلحات المعتمد لمواجهة التضليل اللغوي وترسيخ الرواية الأصيلة (انقر على أي مصطلح لنسخه مباشرة).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[
              { wrong: "النزاع الإسرائيلي الفلسطيني", correct: "قضية الشعب الفلسطيني والاحتلال" },
              { wrong: "المعابر الإسرائيلية", correct: "معابر قطاع غزة المحاصرة" },
              { wrong: "قتلى الغارات", correct: "شهداء القصف والعدوان" },
              { wrong: "حاجز أمني", correct: "حاجز عسكري استيطاني" },
              { wrong: "القدس الشرقية", correct: "القدس المحتلة عاصمة فلسطين" },
              { wrong: "مستوطنة شرعية", correct: "مستوطنة استعمارية غير شرعية" },
              { wrong: "وزارة الدفاع الإسرائيلية", correct: "وزارة جيش الاحتلال الإسرائيلي" },
              { wrong: "أعمال شغب", correct: "احتجاجات ومواجهات شعبية مشروعة" },
              { wrong: "الجدار الفاصل", correct: "جدار الفصل والتوسع العنصري" },
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
              </div>
            ))}
          </div>
        </section>

        {/* 4. الهيئة المعتمدة ومجلس التحرير الموقع على الميثاق */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider block">
              الاعتماد المؤسسي الرسمي
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              مجلس التحرير والجهات الموقعة على الميثاق
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SIGNATORIES.map((sig, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl space-y-2.5 shadow-lg"
              >
                <div className="w-9 h-9 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold)] flex items-center justify-center font-bold">
                  <Fingerprint className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[var(--gold)] font-bold block">
                    {sig.role}
                  </span>
                  <h4 className="text-xs font-bold text-white">{sig.name}</h4>
                  <p className="text-[11px] text-stone-400 leading-relaxed">{sig.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. بطاقة الختام الملكية والتوجيه لسجل التصحيحات والبلاغات */}
        <section className="rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-r from-[#200008] via-[#2d000c] to-[#200008] p-6 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--gold)]">
              <Award className="w-4 h-4" />
              <span>ميثاق شرف ملزم.. أمانة تاريخية.. وكلمة مسؤولة</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              عهد المصداقية أمام الشعب الفلسطيني والعالم
            </h3>
            <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
              يلتزم كل صحفي ومراسل ينتمي لأسرة «الوطن اليوم» ببنود هذا الميثاق. في حال ملاحظة أي خرق أو خطأ، نوفر سجل تصحيحات علنياً مفتوحاً وقناة تسريبات مشفرة لحماية الحقيقة.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              href="/corrections"
              className="px-5 py-2.5 rounded-xl border border-[var(--gold)]/40 bg-[var(--gold)]/10 hover:bg-[var(--gold)]/20 text-[var(--gold)] text-xs font-bold transition-all shadow-xs"
            >
              سجل التصحيحات العلني ←
            </Link>
            <Link
              href="/submit-news"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-slate-950 text-xs font-black hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-950/20"
            >
              قناة التسريبات المشفرة ←
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
