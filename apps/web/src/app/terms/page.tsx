"use client";

import { useState } from "react";
import InstitutionalNav from "@/components/InstitutionalNav";
import {
  FileText,
  Scale,
  ShieldAlert,
  Share2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  BookOpen,
  Gavel,
  Coins,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-24 selection:bg-amber-500/30">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="terms" />

      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] via-[var(--surface)]/60 to-[var(--bg)] py-14 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container-custom max-w-5xl mx-auto px-4 relative z-10 space-y-6 text-center md:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold shadow-sm">
            <Scale className="w-3.5 h-3.5" />
            <span>الميثاق التعاقدي لاستخدام المنصة والخدمات الإخبارية</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-[var(--text)] tracking-tight">
            شروط الاستخدام وأحكام الخدمة المؤسسية
          </h1>

          <p className="text-sm md:text-base text-[var(--text-muted)] max-w-3xl leading-relaxed">
            تنظم هذه الوثيقة العلاقة القانونية بين منصة «الوطن اليوم» وزوارها ومستخدمي خدماتها الرقمية. تم صياغة هذه الشروط لضمان بيئة إعلامية نزيهة، قائمة على حماية الملكية الفكرية، وتشجيع الحوار المسؤول والمستنير.
          </p>

          {/* بطاقات الإحصاء السريع للشفافية القانونية */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-4xl">
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1">
              <span className="text-base md:text-lg font-black text-amber-500 block">CC BY-NC-ND</span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)]">رخصة الاقتباس العادل</span>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1">
              <span className="text-base md:text-lg font-black text-amber-500 block">0 تسامح</span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)]">مع خطاب الكراهية</span>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1">
              <span className="text-base md:text-lg font-black text-amber-500 block">إعلامي فقط</span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)]">طبيعة البيانات المالية</span>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1">
              <span className="text-base md:text-lg font-black text-amber-500 block">تحكيم مهني</span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)]">فض النزاعات التحريرية</span>
            </div>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="container-custom max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* دليل الاقتباس وإعادة النشر التفاعلي (Interactive Syndication & Fair Use Guide) */}
        <section className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 via-[var(--surface)] to-[var(--surface)] p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-[var(--border)]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[var(--text)]">دليل الاستخدام العادل والاقتباس الصحفي</h2>
              <p className="text-xs text-[var(--text-muted)]">ما يسمح للصحفيين والباحثين بنقله مقابل الممارسات المحظورة قانونياً</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* المسموح به */}
            <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>الممارسات المسموحة والمشجعة (Fair Use)</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[var(--text-muted)] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>اقتباس ما لا يتجاوز 150 كلمة من التحليلات والتقارير مع ذكر اسم «الوطن اليوم».</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>وضع رابط تشعبي مباشر (Canonical Follow Link) يشير إلى المقال الأصلي.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>مشاركة الأخبار عبر أزرار التواصل الاجتماعي الرسمية المضمنة في صفحات المنصة.</span>
                </li>
              </ul>
            </div>

            {/* المحظور قانونياً */}
            <div className="p-5 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-3">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs">
                <XCircle className="w-4 h-4" />
                <span>الممارسات المحظورة والموجبة للمساءلة</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[var(--text-muted)] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>الكشط الآلي (Automated Scraping) أو استنساخ قواعد البيانات أو البث دون إذن كتابي.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>إعادة نشر المقالات الكاملة ونسبها لجهات أخرى أو حذف أسماء محرري ومراسلي المنصة.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>استغلال المحتوى في تدريب نماذج الذكاء الاصطناعي التجارية المغلقة دون اتفاقية ترخيص.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* فصول ومواد وثيقة شروط الخدمة */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)]">
            <BookOpen className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-[var(--text)]">الفصول القانونية المنظمة للخدمة</h2>
          </div>

          <div className="space-y-4">
            {/* الفصل الأول: نطاق الخدمة */}
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>الفصل الأول: نطاق الخدمة وطبيعة البث الإخباري</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]">
                  SEC-01/SCOPE
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                «الوطن اليوم» منصة إخبارية ذكية ومستقلة، تقدم تغطيات خبرية وتحليلات سياسية واقتصادية ورياضية وثقافية. دخولك إلى المنصة يعني موافقتك الصريحة ودون قيد على الالتزام بكافة الشروط الواردة في هذه الوثيقة، والتي تسري على جميع الأقسام بما في ذلك تطبيقات الهواتف والخدمات التابعة.
              </p>
            </div>

            {/* الفصل الثاني: إخلاء المسؤولية المالية والاقتصادية */}
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  <Coins className="w-4 h-4" />
                  <span>الفصل الثاني: إخلاء المسؤولية عن البيانات والتحليلات الاقتصادية</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]">
                  SEC-02/FINANCIAL
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                تعتبر أسعار العملات والمعادن ومؤشرات الأسواق المالية المنشورة في أقسام المنصة بيانات إرشادية وتثقيفية مجمعة من مصادر موثوقة لحظياً. لا تشكل هذه البيانات، بأي حال من الأحوال، نصيحة استثمارية أو دعوة للشراء أو البيع أو التداول في الأسواق المالية. يتحمل القارئ المسؤولية الفردية الكاملة عن أي قرارات اقتصادية يتخذها.
              </p>
            </div>

            {/* الفصل الثالث: ميثاق التعليقات والتفاعل المجتمعي */}
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  <MessageSquare className="w-4 h-4" />
                  <span>الفصل الثالث: ميثاق التعليقات وحظر خطاب الكراهية</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]">
                  SEC-03/COMMUNITY
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                نرحب بالآراء ووجهات النظر المتباينة التي تثري النقاش الموضوعي. ويُحظر تماماً نشر أي تعليقات تتضمن سباً أو قذفاً، أو تحريضاً على العنف والتمييز الطائفي أو العرقي، أو الترويج لأي مواد إباحية أو إعلانية مضللة. تحتفظ هيئة التحرير بالحق في حجب أي تعليق يخالف هذه المعايير أو إيقاف حساب صاحبه فوراً.
              </p>
            </div>

            {/* الفصل الرابع: الروابط الخارجية والمصادر الشريكة */}
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>الفصل الرابع: الروابط لمواقع الأطراف الثالثة</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]">
                  SEC-04/EXT-LINKS
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                قد تحتوي موادنا الصحفية على روابط تؤدي إلى مواقع إلكترونية خارجية بهدف التوثيق والإحالة. المنصة لا تملك أي سيطرة على محتوى أو سياسات خصوصية تلك المواقع، وإدراج الرابط لا يعني بالضرورة تبنياً كاملاً لمحتواه بما يتجاوز السياق التوثيقي المحدد.
              </p>
            </div>

            {/* الفصل الخامس: فض النزاعات والقانون الحاكم */}
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  <Gavel className="w-4 h-4" />
                  <span>الفصل الخامس: فض النزاعات والقانون الواجب التطبيق</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]">
                  SEC-05/DISPUTES
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                في حال نشوء أي خلاف حول تفسير أو تطبيق هذه الشروط، يسعى الطرفان لحله ودياً عبر لجنة الشفافية والتحكيم الصحفي التابعة للمنصة خلال 30 يوماً. وفي حال تعذر التسوية الودية، يخضع النزاع للاختصاص القضائي المعترف به وفق مبادئ القانون الدولي لحرية الصحافة والنشر الإلكتروني.
              </p>
            </div>
          </div>
        </section>

        {/* الأسئلة الشائعة حول شروط الاستخدام (FAQ Accordion) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)]">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-[var(--text)]">الأسئلة الشائعة حول الحقوق والشروط</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "هل يمكنني إعادة نشر كاريكاتير أو صورة من تصوير مراسليكم؟",
                a: "المواد البصرية الحصرية المملوكة للمنصة (الصور الميدانية والكاريكاتير والإنفوجرافيك) تتطلب تصريحاً خطياً مسبقاً من إدارة التحرير والشراكات، ولا يشملها الاقتباس النصي التلقائي.",
              },
              {
                q: "كيف أبلغ عن محتوى ينتهك حقوق ملكيتي الفكرية؟",
                a: "يرجى التوجه فوراً إلى صفحة حقوق النشر (DMCA) وتعبئة النموذج المباشر ليتم فحص الرابط وإزالة المحتوى خلال مهلة لا تتجاوز 4 ساعات عمل.",
              },
              {
                q: "هل تتغير شروط الاستخدام دون إشعار مسبق؟",
                a: "نقوم بتحديث هذه الوثيقة لمواكبة التطورات التقنية والتشريعية. يتم نشر تاريخ آخر تعديل في صدارة الصفحة، وتعتبر التعديلات نافذة فور نشرها على الموقع.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 flex items-center justify-between text-right text-xs font-bold text-[var(--text)] hover:text-amber-500 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      openFaq === idx ? "rotate-180 text-amber-500" : "text-[var(--text-muted)]"
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)]/50 bg-[var(--bg)]/40">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* روابط المساندة المؤسسية */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-right">
            <h3 className="text-base font-bold text-[var(--text)]">بحاجة لترخيص محتوى تجاري أو شراكة إعلامية؟</h3>
            <p className="text-xs text-[var(--text-muted)]">فريق الشراكات وتراخيص المحتوى يسعد بالتنسيق معكم لمنح تصاريح البث والنقل.</p>
          </div>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm shrink-0 flex items-center gap-2"
          >
            <span>التواصل مع الإدارة والشراكات</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </section>
      </div>
    </div>
  );
}
