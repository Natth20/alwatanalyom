import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "من نحن ورؤيتنا — الوطن اليوم",
  description: "الوطن اليوم هي منصة إخبارية ذكية متكاملة تجمع الأخبار من مصادرها الأصلية وتقدم سياقاً تحريرياً وتحققاً موضوعياً.",
};

export default function AboutPage() {
  return (
    <div className="container-custom py-12 max-w-3xl mx-auto space-y-8">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="text-3xl font-black text-[var(--text)] mb-3">من نحن ورؤيتنا</h1>
        <p className="text-base text-[var(--text-muted)] leading-relaxed">
          «الوطن اليوم» هي المنصة الإخبارية العربية الذكية التي تجمع شتات الأخبار من مئات المصادر المعتمدة في مكان واحد، لتضع القارئ العربي في قلب الحدث مع رابط المصدر الأصلي وسياق تحريري مستقل.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-[var(--text)]">
        <h2 className="text-xl font-bold text-[var(--primary)]">ما معنى «المكان الرئيسي لجميع الأخبار»؟</h2>
        <p>
          نحن لا ننسخ مقالات الآخرين ولا نعيد صياغتها بلا قيمة؛ بل نؤدي أربع وظائف محورية معاً:
        </p>
        <ul className="list-disc list-inside space-y-2 pr-2 text-[var(--text-muted)]">
          <li><strong>الجمع:</strong> استقبال الأخبار من عشرات الوكالات والصحف والقنوات المعتمدة فور صدورها.</li>
          <li><strong>التنظيم:</strong> دمج التغطيات المتعددة للحدث الواحد في «قصة» متكاملة، بدلاً من تكرار عشرات الأخبار المتشابهة.</li>
          <li><strong>السياق:</strong> تقديم ملخص تحريري أصلي، وخط زمني لتطورات الحدث، ومقارنة التغطيات بين المصادر.</li>
          <li><strong>الوصول:</strong> بحث فوري ذكي، وتنبيهات لحظية، ونشرات بريدية، وتطبيق ويب فائق السرعة.</li>
        </ul>

        <h2 className="text-xl font-bold text-[var(--primary)] pt-4">مبادئنا الحاكمة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <h3 className="font-bold mb-1 text-[var(--text)]">1. لا خبر بلا مصدر</h3>
            <p className="text-xs text-[var(--text-muted)]">كل مادة منشورة تتضمن اسم الناشر الأصلي، ورابطاً مباشراً صالحاً، ووقت النشر الدقيق.</p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <h3 className="font-bold mb-1 text-[var(--text)]">2. لا أرقام مختلقة</h3>
            <p className="text-xs text-[var(--text-muted)]">الأسعار والنتائج والإحصاءات تأتي حصراً من مزودات بيانات مرخصة، ولا يُعرض أي رقم تخميني.</p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <h3 className="font-bold mb-1 text-[var(--text)]">3. فلسطين أولاً</h3>
            <p className="text-xs text-[var(--text-muted)]">التغطية الفلسطينية هي هوية المنصة وقلبها، ولها معالجة تحريرية أعمق ومتابعة حية للميدان.</p>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <h3 className="font-bold mb-1 text-[var(--text)]">4. حماية حقوق الملكية</h3>
            <p className="text-xs text-[var(--text-muted)]">نطبق سياسة عرض صارمة لكل ناشر، ونوجه القارئ دائماً للمصدر الأصلي لقراءة النص الكامل.</p>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
          <Link href="/how-we-aggregate" className="text-[var(--primary)] font-semibold hover:underline">
            اقرأ كيف نجمع الأخبار ونتحقق منها ←
          </Link>
          <Link href="/contact" className="hover:underline">
            اتصل بفريق التحرير والإدارة
          </Link>
        </div>
      </div>
    </div>
  );
}
