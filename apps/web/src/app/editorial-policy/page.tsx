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
  CheckCircle,
  Copy,
  Printer,
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
    content: "تلتزم منصة «الوطن اليوم» بعدم نشر أي خبر عاجل أو ادعاء رئيسي يمس الشأن العام ما لم يكن موثقاً من مصدرين مستقلين على الأقل، أو صادراً عن جهة حكومية أو أممية أو حقوقية معتمدة برصيد مهني موثوق. تخضع كافة المواد العاجلة لبروتوكول التدقيق اللحظي لمنع نشر الشائعات أو الأخبار غير المكتملة.",
    rules: [
      "حظر النقل عن الحسابات المجهولة في منصات التواصل دون تحقق جنائي.",
      "تثبيت توقيت الحدث بالساعة والدقيقة بتوقيت القدس الشريف.",
      "الإشارة الواضحة لأي تحديث لاحق يطرأ على البيانات الأولية.",
    ],
    icon: Scale,
  },
  {
    num: "المادة 02",
    title: "القاموس الوطني الفلسطيني الموحد ومعايير التسمية",
    category: "الهوية السيادية",
    summary: "الالتزام بالمصطلحات الوطنية الموحدة: القدس عاصمة فلسطين، الشهداء، والأراضي المحتلة.",
    content: "انطلاقاً من مبدأ «فلسطين أولاً»، تعتمد المنصة دليلاً معيارياً ملزماً لكافة المحررين والمراسلين: تسمية عاصمة فلسطين بـ «القدس المحتلة»، إطلاق صفة «الشهداء» على ضحايا العمليات العسكرية وقصف الاحتلال مع توثيق أسمائهم وأعمارهم وسيرهم الإنسانية، التمييز التام بين «المستوطنات» والأراضي المحتلة، والتعامل بحذر وتدقيق مضاعف مع إعلام الاحتلال بوضع وسم صريح يوضح روايته.",
    rules: [
      "القدس الشريف هي العاصمة الأبدية والتاريخية لدولة فلسطين.",
      "عدم تبني المصطلحات المضللة للرواية الإسرائيلية في تغطية الحواجز والاقتحامات.",
      "توثيق القرى والبلدات المهجرة بأسمائها العربية الكنعانية الأصيلة.",
    ],
    icon: ShieldCheck,
  },
  {
    num: "المادة 03",
    title: "الفصل الصارم والواضح بين الخبر والرأي والتحليل",
    category: "النزاهة التحريرية",
    summary: "تمييز بصري وتحريري مطلق بين الخبر المجرد ومقالات الرأي والافتتاحيات.",
    content: "تلتزم المنصة بالفصل البصري والتحريري التام بين المادة الإخبارية المجردة ومقالات الرأي والتحليلات السياسية. توسم مقالات الرأي بوسم واضح («رأي وتحليل») مع إبراز اسم الكاتب وصورته وصفته، والتنويه بأن المقال يعبر عن وجهة نظر صاحبه ولا يمثل بالضرورة الموقف التحريري لمنصة الوطن اليوم.",
    rules: [
      "خلو العناوين الإخبارية من الألفاظ التقييمية أو العواطف المسبقة.",
      "إتاحة حق الرد المتكافئ لأي جهة أو شخصية تناولها التحليل السياسي.",
      "حظر الجمع بين مسؤولية كتابة الخبر والتعليق عليه في نفس المادة.",
    ],
    icon: FileCheck2,
  },
  {
    num: "المادة 04",
    title: "أخلاقيات الذكاء الاصطناعي الصحفي ومكافحة التوليد الوهمي",
    category: "التكنولوجيا المسؤولة",
    summary: "استخدام الذكاء الاصطناعي كأداة تدقيق مساعدة تحت الإشراف البشري الكامل.",
    content: "تستخدم منصة «الوطن اليوم» خوارزميات الذكاء الاصطناعي التوليدي كأداة للمساعدة في الفهرسة الدلالية، والترجمة، وتلخيص البيانات المعقدة، والتحقق من التكرار. يُحظر حظراً باتاً صياغة أي مادة إخبارية بالذكاء الاصطناعي دون مراجعة واعتماد بشري كامل، مع وضع إشعار صريح للقارئ في حال احتوت المادة على رسوم بيانية مولدة آلياً.",
    rules: [
      "المسؤولية القانونية والتحريرية تقع دائماً على رئيس التحرير البشري.",
      "حظر توليد صور أو مقاطع فيديو مصطنعة تزور وقائع ميدانية (Deepfakes).",
      "إخضاع مخرجات الذكاء الاصطناعي لفحص الهلوسة والمطابقة الجنائية.",
    ],
    icon: Bot,
  },
  {
    num: "المادة 05",
    title: "حماية المصادر السرية وسلامة الشهود والمراسلين",
    category: "الحصانة المهنية",
    summary: "سرية تامة لهوية المصادر الميدانية وحماية الصحفيين في خطوط النار.",
    content: "تضمن المنصة الحماية الكاملة لسرية المصادر التي تزود الصحفيين بمعلومات حساسة، وتلتزم بعدم الكشف عن هويتها تحت أي ضغط قضائي أو سياسي، إلا إذا ثبت تعمد المصدر تضليل الرأي العام. كما تولي المنصة أولوية قصوى لسلامة المراسلين والمصورين في قطاع غزة والضفة الغربية على حساب السبق الصحفي.",
    rules: [
      "تشفير كافة قنوات الاتصال والرسائل الواردة من الميدان.",
      "حظر نشر صور المراسلين في أماكن حساسة قد تعرضهم للاستهداف الميداني.",
      "عدم بث أي مادة قد تلحق أذى بشهود العيان أو عائلاتهم.",
    ],
    icon: Lock,
  },
  {
    num: "المادة 06",
    title: "مراعاة الكرامة الإنسانية وحظر نشر الصور الصادمة",
    category: "المعايير الإنسانية",
    summary: "احترام كرامة الشهداء والضحايا ووضع تحذير مسبق على المواد البصرية الحساسة.",
    content: "تلتزم المنصة بصون كرامة الضحايا وأسرهم، وتمنع نشر صور الجثامين المشوهة أو المشاهد الدموية المقربة إلا بعد معالجة بصرية تحجب التفاصيل القاسية وتضع تحذيراً تحريرياً صريحاً («محتوى حساس»). نهدف إلى توثيق الجريمة والانتهاك دون ابتذال المأساة أو استغلال دماء الأبرياء لجلب المشاهدات.",
    rules: [
      "مراعاة خصوصية الأطفال والجرحى وذويهم في المستشفيات ومراكز الإيواء.",
      "الامتناع عن نشر أسماء الشهداء قبل إبلاغ عائلاتهم رسمياً من الجهات الصحية.",
      "الحفاظ على أسلوب صحفي رصين يخاطب العقل ويوثق التاريخ.",
    ],
    icon: HeartHandshake,
  },
  {
    num: "المادة 07",
    title: "استقلالية الخط التحريري عن المصالح المالية والسياسية",
    category: "السيادة التحريرية",
    summary: "حظر تأثير المعلنين أو الرعاة على محتوى التحقيقات أو الخط التحريري.",
    content: "تتمتع هيئة تحرير «الوطن اليوم» بالاستقلال التام عن أي توجيه خارجي أو ضغوط تمويلية. يُمنع منعاً باتاً تدخل المعلنين أو الجهات الراعية في المحتوى التحريري، وتخضع المواد الإعلانية والتسويقية للتمييز البصري الكامل عبر وسوم واضحة («مادة إعلانية» أو «رعاية تجارية»).",
    rules: [
      "الفصل المطلق بين إدارة التحرير وإدارة التسويق والمبيعات.",
      "حظر قبول الهدايا أو الامتيازات التي قد تؤثر على نزاهة الصحفي.",
      "الإفصاح الشفاف عن أي تضارب محتمل في المصالح لدى الكتاب والمحللين.",
    ],
    icon: Award,
  },
  {
    num: "المادة 08",
    title: "النزاهة والروح الرياضية في منصة «يلا سبورت»",
    category: "الصحافة الرياضية",
    summary: "تغطية رياضية احترافية، نبذ التعصب، والاحتفاء بإنجازات الرياضة الفلسطينية والعربية.",
    content: "يلتزم ديسك «يلا سبورت» بنقل وقائع المباريات والبطولات بحيادية تامة ومهنية عالية، مع نبذ التعصب الكروي ومكافحة خطاب الكراهية في الرياضة. تفرد المنصة مساحة خاصة لدعم مشاركات الفدائي والمنتخبات والأندية الفلسطينية والعربية في المحافل القارية والدولية.",
    rules: [
      "الالتزام بالأرقام والإحصاءات المعتمدة من الاتحادات الرسمية (UEFA, FIFA).",
      "احترام الحكام واللاعبين والامتناع عن التجريح الشخصي.",
      "تسليط الضوء على الرياضة كجسر للتضامن الإنساني وصمود الشباب.",
    ],
    icon: Globe,
  },
  {
    num: "المادة 09",
    title: "التدقيق الجنائي للتحقيقات الاستقصائية ومصادر OSINT",
    category: "الصحافة الاستقصائية",
    summary: "إخضاع كافة الصور والأقمار الصناعية لبروتوكول التحقق الرقمي الجنائي.",
    content: "تخضع كافة التحقيقات الاستقصائية المنشورة على المنصة لبروتوكول التدقيق الجنائي المتقدم (Forensic OSINT). يتم فحص الصور الجوية، بيانات الموقع الجغرافي (Geolocation)، وتوقيت الظلال، لمطابقة الادعاءات مع الوقائع الملموسة قبل النشر.",
    rules: [
      "إتاحة المنهجية الجنائية والأدلة المفتوحة للقراء لتمكينهم من إعادة الفحص.",
      "الاستعانة بالخبراء المستقلين في قضايا الأسلحة والانتهاكات البيئية والصحية.",
      "توثيق الأرشيف الرقمي بأرقام تتبع لا تقبل التعديل أو التلاعب اللاحق.",
    ],
    icon: Sparkles,
  },
  {
    num: "المادة 10",
    title: "الالتزام الفوري بسجل التصحيحات والاعتذار المهني",
    category: "المسؤولية الأخلاقية",
    summary: "نشر أي تصحيح فورياً في صدر المقال وفي السجل العلني دون مواربة.",
    content: "تعتبر المنصة أن الاعتراف بالخطأ والمسارعة إلى تصويبه ركن أساسي من أركان المصداقية. في حال حدوث أي خطأ في معلومة أو رقم أو اسم، يلتزم ديسك التحرير بتعديل المقال فوراً مع وضع تنويه تصحيحي واضح، وإدراج تفاصيل التعديل في «سجل التصحيحات العلني» المفتوح لكافة القراء.",
    rules: [
      "التصحيح خلال أقل من 12 دقيقة من ثبوت عدم دقة المعلومة.",
      "عدم حذف الأخطاء سراً دون بيان ما تم تعديله للقارئ.",
      "تقديم اعتذار صريح للمتضرر في حال كان للخطأ أثر معنوي أو قانوني.",
    ],
    icon: CheckCircle2,
  },
];

export default function EditorialPolicyPage() {
  const [openArticle, setOpenArticle] = useState<string>("المادة 01");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedLexicon, setCopiedLexicon] = useState<string | null>(null);

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

  const filteredArticles = ARTICLES.filter(
    (art) =>
      art.title.includes(searchQuery) ||
      art.content.includes(searchQuery) ||
      art.category.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 selection:text-white pb-24">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="editorial-policy" />

      {/* 1. Hero Header السينمائي الفاخر */}
      <div className="relative overflow-hidden border-b border-[var(--gold)]/20 bg-gradient-to-b from-[#1b020a] via-[#140006] to-[#0E0407] py-14 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-rose-950/20 to-transparent pointer-events-none" />
        
        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-bold shadow-md shadow-amber-950/20">
            <FileCheck2 className="w-4 h-4" />
            <span>الوثيقة الدستورية الرسمية للسياسة التحريرية وأخلاقيات المهنة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            ميثاق الشرف التحريري والسياسة المعيارية 2026
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
            المرجع الدستوري الأعلى لكافة صحفيي، مراسلي، ومحرري «الوطن اليوم». نلتزم بنقل الحقيقة كما هي، ونعتز بالهوية الوطنية الفلسطينية، ونخضع أعمالنا لأعلى معايير الرقابة الجنائية والتدقيق الأخلاقي.
          </p>

          {/* محرك البحث في مواد الميثاق */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في مواد الميثاق العشر..."
                className="w-full px-4 py-3 ps-10 rounded-2xl border border-white/15 bg-black/60 text-white placeholder-white/40 text-xs focus:outline-hidden focus:border-[var(--gold)] shadow-inner transition-colors backdrop-blur-md"
              />
              <Search className="w-4 h-4 text-[var(--gold)] absolute top-3.5 start-3.5" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-14">
        {/* 2. المواد الدستورية العشر التفاعلية (10 Constitutional Articles) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider block">
                الدستور الصحفي للمنصة
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                المواد الدستورية العشر المعتمدة
              </h2>
            </div>
            <span className="text-xs text-stone-400">
              {filteredArticles.length} من {ARTICLES.length} مواد
            </span>
          </div>

          <div className="space-y-3.5">
            {filteredArticles.map((art) => {
              const Icon = art.icon;
              const isOpen = openArticle === art.num;

              return (
                <div
                  key={art.num}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[var(--gold)]/60 bg-gradient-to-b from-[#1e020a] to-[#120005] shadow-xl shadow-amber-950/20"
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
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 transition-colors ${
                          isOpen
                            ? "bg-[var(--gold)] text-slate-950 shadow-md shadow-amber-500/20"
                            : "bg-white/5 text-stone-300 border border-white/10"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-[var(--gold)]">
                            {art.num}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-stone-400 border border-white/10">
                            {art.category}
                          </span>
                        </div>
                        <h3 className="font-bold text-sm sm:text-base text-white mt-0.5">
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
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10 space-y-4 animate-in fade-in duration-200">
                      <p className="text-xs sm:text-sm text-stone-200 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/5">
                        {art.content}
                      </p>

                      <div className="space-y-2">
                        <span className="text-xs font-bold text-[var(--gold)] block">
                          القواعد والضوابط التحريرية الإلزامية:
                        </span>
                        <ul className="space-y-2 text-xs text-stone-300">
                          {art.rules.map((rule, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. القاموس الوطني الفلسطيني الموحد (The Unified National Lexicon) */}
        <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-[#062013]/90 via-[#0a1810]/90 to-[#040c07]/90 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-emerald-500/20 pb-4 space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
              <BookOpen className="w-4 h-4" />
              <span>معجم التحرير السيادي الملزم</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              القاموس الوطني الفلسطيني الموحد
            </h3>
            <p className="text-xs text-stone-300">
              دليل المصطلحات المعتمد لمواجهة التضليل اللغوي وترسيخ الرواية الأصيلة
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { wrong: "النزاع الإسرائيلي الفلسطيني", correct: "قضية الشعب الفلسطيني والاحتلال" },
              { wrong: "المعابر الإسرائيلية", correct: "معابر قطاع غزة المحاصرة" },
              { wrong: "قتلى الغارات", correct: "شهداء القصف والعدوان" },
              { wrong: "حاجز أمني", correct: "حاجز عسكري استيطاني" },
              { wrong: "القدس الشرقية", correct: "القدس المحتلة عاصمة فلسطين" },
              { wrong: "مستوطنة شرعية", correct: "مستوطنة استعمارية غير شرعية" },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleCopyTerm(item.correct)}
                className="p-3.5 rounded-2xl bg-black/40 border border-emerald-500/20 hover:border-emerald-500/50 transition-all cursor-pointer space-y-2 group"
                title="انقر لنسخ المصطلح المعتمد"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-rose-400 line-through">{item.wrong}</span>
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
        </div>

        {/* 4. ختم النزاهة الصحفية والاعتماد الرسمي */}
        <div className="rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-r from-[#200008] via-[#2d000c] to-[#200008] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Award className="w-4 h-4" />
              <span>شهادة الالتزام والاعتماد المؤسسي 2026</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              دستور ملزم.. أمانة تاريخية.. وكلمة مسؤولة
            </h3>
            <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
              يوقع على هذا الميثاق كل صحفي ومراسل ينضم لأسرة منصة «الوطن اليوم»، ويعد خرقه موجباً للمساءلة التحريرية والتصحيح العلني أمام الجمهور.
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
              تقديم بلاغ سري مشفر ←
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
