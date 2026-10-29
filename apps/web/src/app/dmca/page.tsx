import { Metadata } from "next";

export const metadata: Metadata = {
  title: "طلبات إزالة المحتوى وحقوق الملكية الفكرية (DMCA) — الوطن اليوم",
  description: "المسار الرسمي للناشرين وأصحاب الحقوق لتقديم طلبات إزالة المحتوى أو تعديل سياسات الجلب والعرض.",
};

export default function DmcaPage() {
  return (
    <div className="container-custom py-12 max-w-3xl mx-auto space-y-8">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="text-3xl font-black text-[var(--text)] mb-3">طلبات إزالة المحتوى وحماية الحقوق (DMCA)</h1>
        <p className="text-base text-[var(--text-muted)] leading-relaxed">
          تحترم «الوطن اليوم» حقوق الملكية الفكرية وتلتزم بالاستجابة الفورية لطلبات الناشرين وأصحاب الحقوق الشرعيين بخصوص إزالة أي مادة أو صورة أو إيقاف جلب الخلاصات.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-[var(--text)]">
        <h2 className="text-xl font-bold text-[var(--primary)]">آلية تقديم الطلب</h2>
        <p>
          إذا كنت صاحب حق أو ممثلاً رسمياً لمؤسسة إعلامية وترى أن هناك مادة منشورة على المنصة تنتهك حقوقك، يرجى تزويدنا بالبيانات التالية عبر البريد الإلكتروني المخصص:
        </p>

        <ul className="list-disc list-inside space-y-2 pr-2 text-[var(--text-muted)]">
          <li>اسم الجهة أو الناشر، وصفة مقدم الطلب.</li>
          <li>رابط المادة المعنية على منصة «الوطن اليوم».</li>
          <li>رابط المادة الأصلية على موقعكم أو وثيقة إثبات الملكية.</li>
          <li>الإجراء المطلوب: (تعديل سياسة العرض إلى عنوان فقط / إزالة المادة كلياً / إيقاف جلب الخلاصات بشكل دائم).</li>
        </ul>

        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
          <h3 className="font-bold text-base text-[var(--text)]">قناة الاتصال المباشرة للمسؤول القانوني</h3>
          <p className="text-xs text-[var(--text-muted)]">
            البريد الرسمي المعتمد لطلبات الحقوق والإزالة:
          </p>
          <code className="text-sm font-bold text-[var(--primary)] block">
            dmca@alwatantoday.net
          </code>
          <p className="text-[11px] text-[var(--text-muted)] mt-2">
            مهلة الاستجابة القصوى: 24 ساعة من تاريخ استلام الإشعار، مع سحب المادة فورياً وإبطال كاش الصفحة وإزالتها من الفهرس.
          </p>
        </div>
      </div>
    </div>
  );
}
