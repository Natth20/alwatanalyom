import Link from "next/link";
import { Metadata } from "next";
import { InstitutionalNav } from "@/components/InstitutionalNav";
import {
  Scale,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  ExternalLink,
  ShieldCheck,
  Send,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "سجل التصحيحات العلني والشفافية التحريرية — الوطن اليوم",
  description: "سجل مفتوح وشفاف يوثق كافة التصحيحات والتعديلات التي طرأت على المواد الإخبارية في منصة الوطن اليوم التزاماً بالأمانة والمصداقية.",
};

interface CorrectionEntry {
  id: string;
  articleTitle: string;
  articleUrl: string;
  date: string;
  time: string;
  category: string;
  originalText: string;
  correctedText: string;
  reason: string;
  handledBy: string;
}

export default function CorrectionsPage() {
  const correctionLogs: CorrectionEntry[] = [
    {
      id: "corr-101",
      articleTitle: "تحديث حصيلة الشهداء والإصابات جراء القصف الأخير في شمال غزة",
      articleUrl: "/article/art-hero-1/gaza-health-system-resilience",
      date: "19 نوفمبر 2026",
      time: "الساعة 14:22 بتوقيت القدس",
      category: "فلسطين والميدان",
      originalText: "ذكر التقرير الأولي ارتقاء 18 شهيداً وإصابة 40 آخرين.",
      correctedText: "تم تعديل الحصيلة الرسمية إلى ارتقاء 15 شهيداً وإصابة 47 آخرين وفق البيان المحين لوزارة الصحة الفلسطينية.",
      reason: "تحديث رسمي صادر عن مدير عام المستشفيات الميدانية بوزارة الصحة بعد استكمال عمليات الفرز الجنائي والتعرف على الجثامين.",
      handledBy: "ديسك التحرير الميداني · قسم التدقيق",
    },
    {
      id: "corr-102",
      articleTitle: "تقرير مؤشرات أسعار المحروقات والغاز المنزلي لشهر نوفمبر في محافظات الضفة",
      articleUrl: "/economy",
      date: "18 نوفمبر 2026",
      time: "الساعة 10:15 بتوقيت القدس",
      category: "الاقتصاد والأسواق",
      originalText: "سعر أسطوانة الغاز 12 كغم 72.00 شيكل.",
      correctedText: "سعر أسطوانة الغاز 12 كغم 70.00 شيكل في مراكز التوزيع الرسمية بدون خدمة التوصيل.",
      reason: "تصحيح توضيحي استناداً للتعميمة الرسمية المعتمدة الصادرة عن الإدارة العامة للبترول في وزارة المالية الفلسطينية.",
      handledBy: "محرر الشؤون الاقتصادية",
    },
    {
      id: "corr-103",
      articleTitle: "بيان اجتماع الفصائل واللجان الشعبية في مخيم جنين",
      articleUrl: "/palestine",
      date: "16 نوفمبر 2026",
      time: "الساعة 19:40 بتوقيت القدس",
      category: "فلسطين والميدان",
      originalText: "الاجتماع انعقد في قاعة البلدية المركزية.",
      correctedText: "الاجتماع انعقد في مقر مركز الخدمات المجتمعي بمخيم جنين.",
      reason: "تصحيح موقع انعقاد اللقاء بناءً على تنبيه مقدم من مراسلنا الميداني في جنين.",
      handledBy: "ديسك المتابعة الإخبارية",
    },
  ];

  return (
    <div className="container-custom py-10 space-y-10">
      <InstitutionalNav />

      {/* ترويسة سجل التصحيحات ومؤشرات الشفافية */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* المحتوى الرئيسي (8 أعمدة) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="card-hyper-luxury p-6 sm:p-8 space-y-4 border border-[var(--gold)]/30">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#730020] via-[#590018] to-[#26000A] text-[var(--gold)] flex items-center justify-center font-black shadow-md border border-[var(--gold)]/40">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[var(--gold)] uppercase font-bold">
                  سجل الأمانة والشفافية · Public Audit Log
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight">
                  سجل التصحيحات التحريرية العلني 2026
                </h1>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed font-medium">
              الخطأ وارد في العمل الصحفي السريع في ظل كثافة الأحداث والتوتر الميداني، لكن الشجاعة والأمانة تقتضيان الاعتراف به وتصحيحه علناً وفورياً دون مواربة أو إخفاء. نضع بين أيدي قرائنا سجلاً تفصيلياً شفافاً لكافة التصحيحات التي تمت على موادنا الصحفية.
            </p>
          </div>

          {/* لوحة إحصائيات سرعة التصحيح */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl glass-hud border border-white/10 text-center space-y-1">
              <span className="text-[10px] text-stone-300 font-bold">متوسط زمن المعالجة</span>
              <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">18 دقيقة</p>
              <span className="text-[10px] text-white/50">من تاريخ استلام البلاغ</span>
            </div>

            <div className="p-4 rounded-2xl glass-hud border border-white/10 text-center space-y-1">
              <span className="text-[10px] text-stone-300 font-bold">نسبة الشفافية العلنية</span>
              <p className="text-xl sm:text-2xl font-black text-[var(--gold)] font-mono">100%</p>
              <span className="text-[10px] text-white/50">توثيق مفتوح لكافة القراء</span>
            </div>

            <div className="p-4 rounded-2xl glass-hud border border-white/10 text-center space-y-1">
              <span className="text-[10px] text-stone-300 font-bold">إجمالي تصحيحات الشهر</span>
              <p className="text-xl sm:text-2xl font-black text-sky-400 font-mono">3 تصحيحات</p>
              <span className="text-[10px] text-white/50">من أصل 4,820 مادة منشورة</span>
            </div>
          </div>

          {/* جدول وبطاقات سجل التصحيحات التفصيلي */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-[var(--text)] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)]" />
              <span>سجل التعديلات والبيانات المصححة حديثاً</span>
            </h2>

            {correctionLogs.map((log) => (
              <div
                key={log.id}
                className="card-hyper-luxury p-6 space-y-4 border border-[var(--border)] hover:border-[var(--gold)]/40 transition-all duration-300"
              >
                {/* ترويسة بطاقة التصحيح */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold border border-[var(--primary)]/20">
                      {log.category}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[var(--gold)]" />
                      {log.date} · {log.time}
                    </span>
                  </div>

                  <Link
                    href={log.articleUrl}
                    className="text-xs font-bold text-[var(--gold)] hover:underline inline-flex items-center gap-1"
                  >
                    <span>رابط المادة الصحفية</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                <h3 className="text-base font-black text-[var(--text)]">
                  {log.articleTitle}
                </h3>

                {/* مقارنة النص القديم بالجديد */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* النص قبل التصحيح */}
                  <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 space-y-1">
                    <span className="text-[10px] font-black text-red-400 block uppercase">
                      النص المنشور سابقاً (غير الدقيق):
                    </span>
                    <p className="line-through text-stone-400 leading-relaxed font-serif">
                      {log.originalText}
                    </p>
                  </div>

                  {/* النص المعتمد المصحح */}
                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                    <span className="text-[10px] font-black text-emerald-400 block uppercase">
                      التصحيح المعتمد النهائي:
                    </span>
                    <p className="text-emerald-200 font-bold leading-relaxed font-serif">
                      {log.correctedText}
                    </p>
                  </div>
                </div>

                {/* سبب التصحيح والجهة المسؤولة */}
                <div className="pt-2 text-xs text-[var(--text-muted)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[var(--border)]">
                  <span><strong>سبب التصحيح:</strong> {log.reason}</span>
                  <span className="text-[11px] font-mono text-[var(--gold)] font-bold shrink-0">
                    بإشراف: {log.handledBy}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* الشريط الجانبي: بوابة الإبلاغ عن خطأ (4 أعمدة) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card-hyper-luxury p-6 space-y-4 border border-[var(--gold)]/30">
            <div className="flex items-center gap-2 font-black text-sm text-[var(--text)] border-b border-[var(--border)] pb-3">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <span>كيف تبلّغ عن خطأ تحريري؟</span>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              إذا لاحظت أي خطأ في اسم، رقم، موقع جغرافي، أو اقتباس في أي مادة منشورة على منصة «الوطن اليوم»، نرجو منك إخطارنا فوراً عبر القنوات الرسمية التالية:
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
                <span className="text-[10px] text-[var(--gold)] font-bold block">1. بريد التصحيحات المباشر</span>
                <code className="text-stone-200 font-mono text-[11px]">corrections@alwatantoday.net</code>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5 space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold block">2. زر الإبلاغ في كل خبر</span>
                <span className="text-stone-300">موجود أسفل كل مقال لنقل الرابط وتفاصيل الخطأ آلياً.</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[var(--border)]">
              <Link
                href="/submit-news"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 text-white font-black text-xs hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>إرسال طلب تصحيح أو إشعار فوري</span>
              </Link>
            </div>
          </div>

          {/* التزام الشفافية والمعايير */}
          <div className="p-5 rounded-2xl glass-hud border border-white/10 text-xs text-stone-300 space-y-2.5">
            <div className="flex items-center gap-2 text-[var(--gold)] font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>سياسة السحب الكلي للمواد (HTTP 410)</span>
            </div>
            <p className="leading-relaxed text-[11px] text-stone-400">
              في الحالات الاستثنائية التي يتبين فيها أن مادة صحفية بنيت على أساس مضلل بالكامل، تلتزم المنصة بسحبها وعرض صفحة سحب دائمة تبيّن سبب السحب وتاريخه التزاماً بالأمانة التاريخية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
