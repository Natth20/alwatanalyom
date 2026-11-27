"use client";

import { useState } from "react";
import InstitutionalNav from "@/components/InstitutionalNav";
import {
  Scale,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  BookOpen,
  Gavel,
  Coins,
  MessageSquare,
  Lock,
  Sparkles,
  FileText,
  Search,
  Copy,
  Printer,
  BadgeCheck,
  AlertTriangle,
  Check,
  Share2,
  Bookmark,
  Layers,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface SectionItem {
  id: string;
  num: string;
  title: string;
  category: "access" | "intellectual" | "security" | "community" | "financial" | "legal";
  summary: string;
  details: string[];
  precedentTitle: string;
  precedentDesc: string;
}

const CONTRACT_SECTIONS: SectionItem[] = [
  {
    id: "eligibility",
    num: "01",
    category: "access",
    title: "الأهلية القانونية واستخدام الخدمات الرقمية",
    summary: "شروط النفاذ القانوني للخدمات الإخبارية والأرشيف الرقمي لمنصة «الوطن اليوم».",
    details: [
      "تعتبر زيارة الموقع أو تصفح تحقيقاته وقواعد بياناته بمثابة إقرار صريح بالموافقة على هذه الأحكام دون قيد أو شرط.",
      "المنصة متاحة للاستخدام الإنساني العام والمعرفي؛ ويُحظر استغلالها في أي أغراض تضر بأمن المجتمع أو تنتهك القوانين والأنظمة المعمول بها.",
      "تلتزم المنصة بتوفير الوصول المجاني وغير المشروط للأخبار الميدانية والمساعدات الإنسانية لكافة المواطنين في فلسطين والشتات دون أي جدران دفع.",
    ],
    precedentTitle: "سابقة الاستخدام الإنساني في حالات الطوارئ (2024 - 2026)",
    precedentDesc: "أقرت هيئة التحرير بروتوكول تحييد الأخبار الإغاثية ومناطق النزوح عن أي قيود تقنية أو برمجية، وتوفيرها بصيغة نصية خفيفة للغاية لضمان نفاذ الأهالي إليها حتى مع انقطاع الكهرباء.",
  },
  {
    id: "fair-use",
    num: "02",
    category: "intellectual",
    title: "الاستخدام الصحفي المشروع وحماية الملكية الفكرية",
    summary: "حقوق الاقتباس، النقل الأكاديمي، وإسناد المواد الاستقصائية والصور الحصرية.",
    details: [
      "كافة التقارير الاستقصائية، الخرائط التفاعلية، الصور الميدانية، والبيانات المنشورة تحت اسم «الوطن اليوم» محمية بموجب قوانين الملكية الفكرية الدولية.",
      "يُسمح بالاقتباس الصحفي والأكاديمي بما لا يتجاوز 25% من نص المادة، شريطة العزو الصريح والواضح مع وضع رابط تشعبي نشط (dofollow) يوجه إلى المادة الأصلية.",
      "يُمنع منعاً باتاً استنساخ قواعد بيانات أطلس القرى المهجرة أو محتوى رادار الأسواق اللحظية لأغراض تجارية دون إذن كتابي مسبق من هيئة التحرير.",
    ],
    precedentTitle: "سابقة حماية أطلس القرى المهجرة ورادار الأسعار",
    precedentDesc: "تم رفض طلبات تجارية متعددة لشراء بيانات أطلس القرى المهجرة، مؤكدين أن الذاكرة الجغرافية الفلسطينية وقف وطني معرفي متاح مجاناً للباحثين ومحرم على الاستثمار التجاري.",
  },
  {
    id: "scraping-prohibition",
    num: "03",
    category: "security",
    title: "حظر التعدين الآلي واستخراج البيانات (Anti-Scraping)",
    summary: "الحماية التقنية للبنية التحتية ضد روبوتات الاستخراج التجاري وهجمات الحرمان من الخدمة.",
    details: [
      "يُحظر استخدام أي روبوتات (Web Scrapers) أو برامج تتبع آلي لشفط الأخبار أو مقالات المنصة بهدف إعادة بيعها أو تدريب نماذج ذكاء اصطناعي تجارية دون اتفاقية ترخيص رسمية.",
      "تحتفظ المنصة بالحق في حظر أي نطاق أو خادم يقوم بعمليات طلب مكثفة (Rate Limit Violation) لحماية سرعة التصفح لزوار الموقع البشريين في قطاع غزة ومناطق ضعف الشبكات.",
      "محاولات اختراق واجهات برمجة التطبيقات (APIs) أو كابينة الإدارة تعرض الفاعل للمساءلة الجنائية الدولية وفق اتفاقية بودابست لمكافحة الجرائم السيبرانية.",
    ],
    precedentTitle: "سابقة صد الهجوم السيبراني وحظر روبوتات الذكاء الاصطناعي غير المرخصة",
    precedentDesc: "قامت أنظمة الحماية التلقائية بحجب 18 نطاقاً لخوادم حاولت استخراج 20,000 مادة تحريرية خلال ساعة واحدة، مما وفر سعة نطاق القراءة الحية للمستخدمين في غزة والقدس.",
  },
  {
    id: "integrity-comments",
    num: "04",
    category: "community",
    title: "المساهمات الجماهيرية وميثاق التعليقات النزيهة",
    summary: "معايير المشاركة، إرسال الأخبار العاجلة، والتفاعل مع التغطيات الحية.",
    details: [
      "تخضع كافة المساهمات والرسائل الواردة عبر قنوات الاتصال بالتحرير للتدقيق الجنائي قبل النشر لضمان خلوها من التحريض أو التضليل أو انتهاك كرامة الأفراد.",
      "يتحمل المشارك المسؤولية القانونية الكاملة عن صحة الصور والوثائق الميدانية التي يزود المنصة بها عبر قنوات التسريب.",
      "تلتزم المنصة بالحفاظ الصارم على سرية المصادر وحماية المراسلين الميدانيين والمواطنين الصحفيين في مناطق النزاع بحصانة مهنية مطلقة.",
    ],
    precedentTitle: "سابقة حماية سرية شاهد عيان ميداني في مخيم جنين",
    precedentDesc: "رفضت غرفة التحرير الاستجابة لطلب جهات تحقيق مدنية بكشف مصدر مقطع فيديو يوثق انتهاكاً عسكرياً، مستندة إلى الحصانة المهنية المعتمدة دولياً والمادة 19 من العهد الدولي.",
  },
  {
    id: "corrections-liability",
    num: "05",
    category: "financial",
    title: "حدود المسؤولية وإخلاء الطرف عن مؤشرات الأسواق",
    summary: "سياسة إخلاء المسؤولية عن بيانات الوكالات الخارجية وسرعة تصويب الأخطاء ومؤشرات المال.",
    details: [
      "تعتمد المنصة أعلى معايير الدقة الجنائية، وتقوم بتصحيح أي تحديث يطرأ على البيانات خلال دقائق معدودة عبر «سجل التصحيحات العلني».",
      "المؤشرات المالية، أسعار الذهب والعملات الأجنبية، وأرقام البورصات المنشورة في قسم المال والأعمال هي بيانات استرشادية بحتة لا تشكل نصيحة استثمارية أو مالية ملزمة.",
      "في حال انقطاع الخدمة بسبب ظروف قاهرة في شبكات الاتصال الميدانية أو انقطاع الكوابل البحرية، تبذل الفرق الهندسية أقصى جهد لإعادة البث المباشر فوراً.",
    ],
    precedentTitle: "سابقة إخلاء المسؤولية عن تقلبات أسعار الذهب الفورية",
    precedentDesc: "أكدت الدائرة القانونية أن أسعار الشيكل والذهب استرشادية بحتة تعكس أسواق الصرافة في القدس ورام الله ولا تتحمل المنصة أي تبعات لقرارات مضاربة مالية فردية.",
  },
  {
    id: "jurisdiction",
    num: "06",
    category: "legal",
    title: "الاختصاص القضائي وفض المنازعات المعرفية",
    summary: "القوانين الحاكمة، آليات الوساطة المؤسسية، والتواصل مع الدائرة القانونية.",
    details: [
      "تخضع هذه الشروط وتفسر وفقاً للأعراف والمواثيق الدولية للصحافة الحرة وقوانين المطبوعات والنشر المعتمدة دولياً والمواثيق الحقوقية للأمم المتحدة.",
      "تُحل أي خلافات ناشئة عبر الحوار والوساطة الودية مع المستشار القانوني لهيئة التحرير خلال 30 يوماً من استلام الإشعار الرسمي.",
      "للتواصل الرسمي مع الدائرة القانونية المعتمدة للمنصة: legal@alwatantoday.net.",
    ],
    precedentTitle: "سابقة فض النزاعات الودية المعرفية مع المراكز الأكاديمية",
    precedentDesc: "تمت تسوية 100% من الاستفسارات القانونية والأكاديمية عبر وساطة المستشار الداخلي دون اللجوء للمحاكم، مع الالتزام بأرقى معايير النزاهة والإنصاف الصحفي.",
  },
];

export default function TermsPage() {
  const [openSection, setOpenSection] = useState<string>("eligibility");
  const [activeTab, setActiveTab] = useState<"rights" | "prohibitions" | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [citationFormat, setCitationFormat] = useState<"apa" | "chicago" | "journalism">("apa");

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? "" : id));
  };

  const getCitationText = () => {
    if (citationFormat === "apa") {
      return "هيئة تحرير الوطن اليوم. (2026). ميثاق شروط الاستخدام والخدمات الرقمية وحماية النزاهة الصحفية. القدس الشريف. https://alwatantoday.net/terms";
    }
    if (citationFormat === "chicago") {
      return 'هيئة تحرير الوطن اليوم، "ميثاق شروط الاستخدام والخدمات الرقمية"، الوطن اليوم، تم التحديث في 2026، https://alwatantoday.net/terms.';
    }
    return "المصدر: منصة «الوطن اليوم» — ميثاق شروط الاستخدام والنزاهة المعرفية (وثيقة رسمية منشورة بالقدس 2026).";
  };

  const handleCopyCitation = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(getCitationText());
      setCopiedCitation(true);
      setTimeout(() => setCopiedCitation(false), 3000);
    }
  };

  const filteredSections = CONTRACT_SECTIONS.filter((s) => {
    const matchesSearch =
      s.title.includes(searchQuery) ||
      s.summary.includes(searchQuery) ||
      s.details.some((d) => d.includes(searchQuery)) ||
      s.precedentTitle.includes(searchQuery);

    if (!matchesSearch) return false;
    if (activeTab === "rights") return ["access", "community"].includes(s.category);
    if (activeTab === "prohibitions") return ["intellectual", "security", "financial"].includes(s.category);
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 selection:text-white pb-24">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="terms" />

      {/* 1. Hero Header السينمائي الفاخر */}
      <section className="relative overflow-hidden border-b border-[var(--gold)]/20 bg-gradient-to-b from-[#1b020a] via-[#140006] to-[#0E0407] py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/12 via-rose-950/20 to-transparent pointer-events-none" />

        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-black shadow-lg shadow-amber-950/20">
            <Scale className="w-4 h-4 text-[var(--gold)]" />
            <span>الميثاق التعاقدي والسيادي المنظم لخدمات الصرح الإعلامي</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            شروط الاستخدام والنزاهة الرقمية
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-3xl mx-auto leading-relaxed">
            تنظم هذه الاتفاقية العلاقة القانونية والمهنية بين منصة «الوطن اليوم» وزوارها، باحثيها، وشركائها الإعلاميين. تهدف بنودنا إلى حماية حرية الكلمة وضمان النزاهة المعرفية وصيانة حقوق القراء والمراسلين الميدانيين في فلسطين والعالم العربي.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block me-1.5 animate-pulse" />
              النسخة المعتمدة: إصدار 2026 المؤسسي
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-mono">
              التحديث الأخير: نوفمبر 2026
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* 2. Interactive Dual Mode Explorer & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-[#16060B]/80 border border-white/10 backdrop-blur-xl">
          {/* Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                activeTab === "all"
                  ? "bg-[var(--gold)] text-black shadow-lg shadow-amber-950/30"
                  : "bg-white/5 text-stone-400 hover:text-white"
              }`}
            >
              كافة المواد (6 مواد)
            </button>
            <button
              onClick={() => setActiveTab("rights")}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === "rights"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/30"
                  : "bg-white/5 text-stone-400 hover:text-white"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>حقوق القارئ والباحث</span>
            </button>
            <button
              onClick={() => setActiveTab("prohibitions")}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 ${
                activeTab === "prohibitions"
                  ? "bg-rose-700 text-white shadow-lg shadow-rose-950/30"
                  : "bg-white/5 text-stone-400 hover:text-white"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>المحظورات والمسؤوليات</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في بنود الميثاق والسوابق..."
              className="w-full pr-10 pl-4 py-2 rounded-2xl bg-black/40 border border-white/10 text-white text-xs focus:border-[var(--gold)] focus:outline-none placeholder:text-stone-600"
            />
          </div>
        </div>

        {/* 3. Accordion Clauses with Precedent Explorers */}
        <div className="space-y-4">
          {filteredSections.length === 0 ? (
            <div className="text-center py-12 text-stone-500 text-sm">
              لم يتم العثور على أي بنود تطابق بحثك: «{searchQuery}»
            </div>
          ) : (
            filteredSections.map((section) => {
              const isOpen = openSection === section.id;
              return (
                <div
                  key={section.id}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[var(--gold)]/40 bg-gradient-to-b from-[#1c070e] to-[#120207] shadow-2xl"
                      : "border-white/10 bg-[#16060B]/60 hover:border-white/20"
                  }`}
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-6 sm:p-7 text-right flex items-center justify-between gap-4 select-none"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-black text-sm shrink-0 border transition-colors ${
                          isOpen
                            ? "bg-[var(--gold)] text-black border-[var(--gold)]"
                            : "bg-white/5 text-stone-400 border-white/10"
                        }`}
                      >
                        {section.num}
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-black text-white">{section.title}</h2>
                        <p className="text-xs text-stone-400 mt-0.5">{section.summary}</p>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-stone-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-[var(--gold)]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 sm:px-7 sm:pb-7 space-y-5 border-t border-white/10 pt-5">
                      {/* Legal Details */}
                      <ul className="space-y-3 text-xs sm:text-sm text-stone-300 leading-relaxed">
                        {section.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] mt-2 shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Operational Precedent Card */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                        <div className="flex items-center gap-2 text-amber-300 text-xs font-black">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span>{section.precedentTitle}</span>
                        </div>
                        <p className="text-xs text-stone-300 leading-relaxed">{section.precedentDesc}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* 4. Interactive Citation Generator Tool */}
        <section className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 sm:p-8 space-y-5 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/30 flex items-center justify-center">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  أداة توليد التوثيق الأكاديمي والصحفي (Citation Generator)
                </h3>
                <p className="text-xs text-stone-400">
                  انسخ الاقتباس المعتمد لتوثيق هذا الميثاق في أطروحاتك الجامعية أو مقالاتك الصحفية
                </p>
              </div>
            </div>

            {/* Format Selector */}
            <div className="flex items-center gap-1.5">
              {[
                { id: "apa", label: "APA 7th" },
                { id: "chicago", label: "Chicago" },
                { id: "journalism", label: "صحافة مهنية" },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => setCitationFormat(fmt.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    citationFormat === fmt.id
                      ? "bg-[var(--gold)] text-black"
                      : "bg-white/5 text-stone-400 hover:text-white"
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs text-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="leading-relaxed select-all">{getCitationText()}</span>
            <button
              onClick={handleCopyCitation}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 self-start sm:self-auto"
            >
              {copiedCitation ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCitation ? "تم نسخ التوثيق!" : "نسخ التوثيق"}</span>
            </button>
          </div>
        </section>

        {/* 5. Institutional Governance & Sovereign Arbitration Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 sm:p-7 space-y-3 shadow-xl">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
              <BadgeCheck className="w-5 h-5" />
              <span>التزام المعايير الصحفية الدولية</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              تلتزم شبكة «الوطن اليوم» بمبادئ ميثاق الشرف الصادر عن الاتحاد الدولي للصحفيين (IFJ) وإعلانات اليونسكو بشأن حرية الإعلام، وتخضع منشوراتها للتدقيق الدوري الصارم من هيئة الرقابة التحريرية المستقلة.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 sm:p-7 space-y-3 shadow-xl">
            <div className="flex items-center gap-2.5 text-[var(--gold)] font-bold text-sm">
              <Gavel className="w-5 h-5" />
              <span>ديسك التحكيم والوساطة المعرفية</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              للاستفسارات القانونية المعقدة، طلبات الترخيص للجامعات، أو التظلمات التحريرية، يرجى التنسيق المباشر مع مكتب المستشار القانوني عبر البريد الرسمي: <strong className="text-white">legal@alwatantoday.net</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
