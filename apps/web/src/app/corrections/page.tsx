import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة التصحيح وسجل التصحيحات التحريرية — الوطن اليوم",
  description: "سجل مفتوح وشفاف للتصحيحات التحريرية والتعديلات التي تمت على المواد المنشورة على منصة الوطن اليوم.",
};

export default function CorrectionsPage() {
  return (
    <div className="container-custom py-12 max-w-3xl mx-auto space-y-8">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="text-3xl font-black text-[var(--text)] mb-3">سجل التصحيحات والشفافية التحريرية</h1>
        <p className="text-base text-[var(--text-muted)] leading-relaxed">
          الخطأ وارد في العمل الصحفي السريع، لكن الأمانة تقتضي الاعتراف به وتصحيحه علناً وفورياً، وإبراز ما تم تعديله للقارئ دون أي مواربة.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-[var(--text)]">
        <h2 className="text-xl font-bold text-[var(--primary)]">سياسة التصحيح المتبعة</h2>
        <ul className="list-disc list-inside space-y-2 pr-2 text-[var(--text-muted)]">
          <li><strong>الأخطاء الطفيفة (إملاء أو طباعة):</strong> تُصحح فوراً دون الحاجة لإشعار تصحيح رسمي ما لم يغير الخطأ المعنى.</li>
          <li><strong>الأخطاء الجوهرية (أسماء، أرقام، ضحايا، نسب، أو سياق):</strong> يُصحح الخبر مع إضافة صندوق ملاحظة بارز في أسفل المادة بعنوان «تصحيح» يتضمن تاريخ ووقت التصحيح وتوضيح ما تم تعديله.</li>
          <li><strong>المواد المسحوبة كلياً:</strong> عند تبين عدم صحة خبر أو انتهاكه الصريح لحقوق نشر، تُسحب المادة وتُعرض صفحة بحالة (HTTP 410) تشرح للقارئ سبب السحب وتاريخه.</li>
        </ul>

        <h2 className="text-xl font-bold text-[var(--primary)] pt-4">كيف تبلّغ عن خطأ؟</h2>
        <p>
          نرحب دائماً بملاحظات القراء والزملاء الصحفيين. يمكنك الإبلاغ عن أي خطأ بالضغط على زر «إبلاغ عن خطأ في هذا الخبر» الموجود في صفحة أي مادة، أو عبر مراسلتنا مباشرة على بريد التحرير: <code className="bg-[var(--surface)] px-2 py-0.5 rounded text-[var(--primary)]">editorial@alwatantoday.net</code>.
        </p>

        <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] mt-8 text-center text-xs text-[var(--text-muted)]">
          ✅ لا توجد تصحيحات جوهرية مسجلة خلال الأربع والعشرين ساعة الماضية.
        </div>
      </div>
    </div>
  );
}
