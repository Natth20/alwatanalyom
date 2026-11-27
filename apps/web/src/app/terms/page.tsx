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
} from "lucide-react";
import Link from "next/link";

interface SectionItem {
  id: string;
  num: string;
  title: string;
  summary: string;
  details: string[];
  icon: any;
}

const CONTRACT_SECTIONS: SectionItem[] = [
  {
    id: "eligibility",
    num: "01",
    title: "الأهلية القانونية واستخدام الخدمات الرقمية",
    summary: "شروط النفاذ القانوني للخدمات الإخبارية والأرشيف الرقمي لمنصة «الوطن اليوم».",
    icon: Gavel,
    details: [
      "تعتبر زيارة الموقع أو تصفح تحقيقاته وقواعد بياناته بمثابة إقرار صريح بالموافقة على هذه الأحكام دون قيد أو شرط.",
      "المنصة متاحة للاستخدام الإنساني العام والمعرفي؛ ويُحظر استغلالها في أي أغراض تضر بأمن المجتمع أو تنتهك القوانين والأنظمة المعمول بها.",
      "تلتزم المنصة بتوفير الوصول المجاني وغير المشروط للأخبار الميدانية والمساعدات الإنسانية لكافة المواطنين في فلسطين والشتات دون أي جدران دفع.",
    ],
  },
  {
    id: "fair-use",
    num: "02",
    title: "الاستخدام الصحفي المشروع وحماية الملكية الفكرية",
    summary: "حقوق الاقتباس، النقل الأكاديمي، وإسناد المواد الاستقصائية والصور الحصرية.",
    icon: BookOpen,
    details: [
      "كافة التقارير الاستقصائية، الخرائط التفاعلية، الصور الميدانية، والبيانات المنشورة تحت اسم «الوطن اليوم» محمية بموجب قوانين الملكية الفكرية الدولية.",
      "يُسمح بالاقتباس الصحفي والأكاديمي بما لا يتجاوز 25% من نص المادة، شريطة العزو الصريح والواضح مع وضع رابط تشعبي نشط (dofollow) يوجه إلى المادة الأصلية.",
      "يُمنع منعاً باتاً استنساخ قواعد بيانات أطلس القرى المهجرة أو محتوى رادار الأسواق اللحظية لأغراض تجارية دون إذن كتابي مسبق من هيئة التحرير.",
    ],
  },
  {
    id: "scraping-prohibition",
    num: "03",
    title: "حظر التعدين الآلي واستخراج البيانات (Anti-Scraping)",
    summary: "الحماية التقنية للبنية التحتية ضد روبوتات الاستخراج التجاري وهجمات الحرمان من الخدمة.",
    icon: Lock,
    details: [
      "يُحظر استخدام أي روبوتات (Web Scrapers) أو برامج تتبع آلي لشفط الأخبار أو مقالات المنصة بهدف إعادة بيعها أو تدريب نماذج ذكاء اصطناعي تجارية دون اتفاقية ترخيص رسمية.",
      "تحتفظ المنصة بالحق في حظر أي نطاق أو خادم يقوم بعمليات طلب مكثفة (Rate Limit Violation) لحماية سرعة التصفح لزوار الموقع البشريين في قطاع غزة ومناطق ضعف الشبكات.",
      "محاولات اختراق واجهات برمجة التطبيقات (APIs) أو كابينة الإدارة تعرض الفاعل للمساءلة الجنائية الدولية وفق اتفاقية بودابست لمكافحة الجرائم السيبرانية.",
    ],
  },
  {
    id: "integrity-comments",
    num: "04",
    title: "المساهمات الجماهيرية وميثاق التعليقات النزيهة",
    summary: "معايير المشاركة، إرسال الأخبار العاجلة، والتفاعل مع التغطيات الحية.",
    icon: MessageSquare,
    details: [
      "تخضع كافة المساهمات والرسائل الواردة عبر قنوات الاتصال بالتحرير للتدقيق الجنائي قبل النشر لضمان خلوها من التحريض أو التضليل أو انتهاك كرامة الأفراد.",
      "يتحمل المشارك المسؤولية القانونية الكاملة عن صحة الصور والوثائق الميدانية التي يزود المنصة بها عبر قنوات التسريب.",
      "تلتزم المنصة بالحفاظ الصارم على سرية المصادر وحماية المراسلين الميدانيين والمواطنين الصحفيين في مناطق النزاع بحصانة مهنية مطلقة.",
    ],
  },
  {
    id: "corrections-liability",
    num: "05",
    title: "حدود المسؤولية وإخلاء الطرف عن مؤشرات الأسواق",
    summary: "سياسة إخلاء المسؤولية عن بيانات الوكالات الخارجية وسرعة تصويب الأخطاء ومؤشرات المال.",
    icon: Scale,
    details: [
      "تعتمد المنصة أعلى معايير الدقة الجنائية، وتقوم بتصحيح أي تحديث يطرأ على البيانات خلال دقائق معدودة عبر «سجل التصحيحات العلني».",
      "المؤشرات المالية، أسعار الذهب والعملات الأجنبية، وأرقام البورصات المنشورة في قسم المال والأعمال هي بيانات استرشادية بحتة لا تشكل نصيحة استثمارية أو مالية ملزمة.",
      "في حال انقطاع الخدمة بسبب ظروف قاهرة في شبكات الاتصال الميدانية أو انقطاع الكوابل البحرية، تبذل الفرق الهندسية أقصى جهد لإعادة البث المباشر فوراً.",
    ],
  },
  {
    id: "jurisdiction",
    num: "06",
    title: "الاختصاص القضائي وفض المنازعات المعرفية",
    summary: "القوانين الحاكمة، آليات الوساطة المؤسسية، والتواصل مع الدائرة القانونية.",
    icon: Coins,
    details: [
      "تخضع هذه الشروط وتفسر وفقاً للأعراف والمواثيق الدولية للصحافة الحرة وقوانين المطبوعات والنشر المعتمدة دولياً والمواثيق الحقوقية للأمم المتحدة.",
      "تُحل أي خلافات ناشئة عبر الحوار والوساطة الودية مع المستشار القانوني لهيئة التحرير خلال 30 يوماً من استلام الإشعار الرسمي.",
      "للتواصل الرسمي مع الدائرة القانونية المعتمدة للمنصة: legal@alwatantoday.net.",
    ],
  },
];

export default function TermsPage() {
  const [openSection, setOpenSection] = useState<string>("eligibility");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCitation, setCopiedCitation] = useState(false);

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? "" : id));
  };

  const handleCopyCitation = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        "منصة الوطن اليوم — شروط الاستخدام والخدمات الرقمية 2026. الميثاق السيادي المنظم لحرية الكلمة والنزاهة المعرفية."
      );
      setCopiedCitation(true);
      setTimeout(() => setCopiedCitation(false), 3000);
    }
  };

  const filteredSections = CONTRACT_SECTIONS.filter(
    (s) =>
      s.title.includes(searchQuery) ||
      s.summary.includes(searchQuery) ||
      s.details.some((d) => d.includes(searchQuery))
  );

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
            شروط الاستخدام وأحكام الخدمة المؤسسية
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-3xl mx-auto leading-relaxed">
            تنظم هذه الوثيقة العلاقة القانونية والمهنية بين صرح «الوطن اليوم» وجمهور القراء والباحثين والمؤسسات. صممت هذه الشروط لضمان بيئة إعلامية نزيهة قائمة على حماية الحقيقة، سيادة المعرفة الحرة، والمسؤولية الأخلاقية.
          </p>

          {/* محرك البحث السريع في البنود */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في بنود وأبواب الاتفاقية..."
                className="w-full px-4 py-3 ps-10 rounded-2xl border border-white/15 bg-black/60 text-white placeholder-white/40 text-xs focus:outline-hidden focus:border-[var(--gold)] shadow-inner transition-colors backdrop-blur-md"
              />
              <Search className="w-4 h-4 text-[var(--gold)] absolute top-3.5 start-3.5" />
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* 2. مصفوفة المسموح والمحظور التفاعلية */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider block">
              الشفافية التعاقدية المباشرة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              مصفوفة الحقوق والواجبات: المسموح والمحظور
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* عمود المسموح (أخضر زمردي فاخر) */}
            <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-[#062013]/90 to-[#041009]/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-5">
              <div className="flex items-center gap-3 border-b border-emerald-500/20 pb-4">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/40 shadow-xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-emerald-300 text-base">ما نضمنه لك كقارئ وباحث</h3>
                  <span className="text-[11px] text-emerald-400/80">حقوق أصيلة ومحمية للجميع دون قيد</span>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs text-stone-200">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>وصول حر وغير مشروط:</strong> قراءة كامل الأخبار، والتحقيقات، وأطلس القرى المهجرة دون اشتراكات مالية أو جدران دفع.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>حرية الاقتباس الصحفي:</strong> نقل حتى 25% من التقارير لأغراض البحث والدراسة مع ذكر «الوطن اليوم» ورابط المصدر.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>تصفح مشفر وخالٍ من التعقب:</strong> حماية كاملة لخصوصيتك دون زرع ملفات تتبع إعلانية خارجية أو بيع بياناتك.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>حق طلب التصحيح:</strong> إمكانية التبليغ عن أي خطأ محتمل مع التزامنا بالتحقيق الجنائي الفوري والتصويب في السجل العلني.
                  </span>
                </li>
              </ul>
            </div>

            {/* عمود المحظور (ياقوتي صارم) */}
            <div className="rounded-3xl border border-rose-500/40 bg-gradient-to-b from-[#26050e]/90 to-[#140006]/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl space-y-5">
              <div className="flex items-center gap-3 border-b border-rose-500/20 pb-4">
                <div className="w-11 h-11 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold border border-rose-500/40 shadow-xs">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-rose-300 text-base">المحظورات الصارمة</h3>
                  <span className="text-[11px] text-rose-400/80">تستوجب الإيقاف الفوري والملاحقة القانونية</span>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs text-stone-200">
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>التعدين الآلي وشفط المحتوى:</strong> استخدام البوتات لسحب مقالات المنصة أو استنساخ قواعد بياناتها تجارياً دون ترخيص.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>التلاعب بالاقتباسات:</strong> اقتطاع نصوص التقارير من سياقها الأصلي لتمرير روايات مضللة أو تشويه الوقائع التاريخية.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>الهجمات السيبرانية:</strong> محاولة تجاوز ضوابط الوصول لكابينة الإدارة أو تعطيل خوادم البث المباشر.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>
                    <strong>انتحال الهوية الصحفية:</strong> التحدث باسم مراسلي أو هيئة تحرير «الوطن اليوم» لجمع أموال أو إطلاق شائعات.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. أبواب الاتفاقية التعاقدية الستة */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider block">
                التفاصيل التعاقدية الرسمية
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                أبواب وثيقة الاستخدام الستة المعتمدة
              </h2>
            </div>
            <span className="text-xs text-stone-400">
              {filteredSections.length} من {CONTRACT_SECTIONS.length} أبواب
            </span>
          </div>

          <div className="space-y-4">
            {filteredSections.map((sec) => {
              const Icon = sec.icon;
              const isOpen = openSection === sec.id;

              return (
                <article
                  key={sec.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[var(--gold)]/70 bg-gradient-to-b from-[#20020c] via-[#160107] to-[#100004] shadow-2xl shadow-amber-950/25"
                      : "border-white/10 bg-[#16060B]/70 hover:border-white/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleSection(sec.id)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-right cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 transition-all ${
                          isOpen
                            ? "bg-gradient-to-br from-[var(--gold)] to-amber-600 text-slate-950 shadow-md shadow-amber-500/20"
                            : "bg-white/5 text-stone-300 border border-white/10"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[var(--gold)]">
                            الباب {sec.num}
                          </span>
                        </div>
                        <h3 className="font-bold text-base sm:text-lg text-white mt-0.5">
                          {sec.title}
                        </h3>
                        <p className="text-xs text-stone-400 mt-1 line-clamp-1">
                          {sec.summary}
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
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-white/10 space-y-3 animate-in fade-in duration-200">
                      <div className="bg-black/50 rounded-xl p-5 border border-white/5 space-y-3">
                        {sec.details.map((detail, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-200 leading-relaxed"
                          >
                            <span className="w-2 h-2 rounded-full bg-[var(--gold)] mt-1.5 shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* 4. درع الميثاق الأخلاقي والاعتماد */}
        <section className="rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-r from-[#200008] via-[#2d000c] to-[#200008] p-6 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>ميثاق الشرف والسيادة الصحفية 2026</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              حرية الكلمة.. أمانة النقل.. سيادة الحقيقة
            </h3>
            <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
              تخضع منصة الوطن اليوم لأعلى معايير الرقابة الذاتية والنزاهة المهنية، ونلتزم بحماية حق الجمهور في المعرفة الشفافة دون إملاء أو تحيز.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={handleCopyCitation}
              className="px-4 py-2.5 rounded-xl border border-[var(--gold)]/40 bg-[var(--gold)]/10 hover:bg-[var(--gold)]/20 text-[var(--gold)] text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>{copiedCitation ? "تم نسخ صيغة الاقتباس!" : "نسخ صيغة الاقتباس المعتمدة"}</span>
            </button>
            <Link
              href="/editorial-policy"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-slate-950 text-xs font-black hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-950/20"
            >
              ميثاق الشرف التحريري ←
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
