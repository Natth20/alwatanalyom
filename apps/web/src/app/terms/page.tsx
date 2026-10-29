import { Metadata } from "next";

export const metadata: Metadata = {
  title: "شروط الاستخدام والخدمة — الوطن اليوم",
  description: "الشروط والأحكام المنظمة لاستخدام منصة الوطن اليوم الإخبارية.",
};

export default function TermsPage() {
  return (
    <div className="container-custom py-12 max-w-3xl mx-auto space-y-8">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="text-3xl font-black text-[var(--text)] mb-3">شروط الاستخدام والخدمة</h1>
        <p className="text-base text-[var(--text-muted)] leading-relaxed">
          باستخدامك لمنصة «الوطن اليوم» (alwatantoday.net)، فإنك تقر وتوافق على الالتزام بالشروط والأحكام الموضحة أدناه.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-[var(--text)]">
        <h2 className="text-xl font-bold text-[var(--primary)]">1. طبيعة الخدمة والروابط الخارجية</h2>
        <p>
          «الوطن اليوم» منصة إخبارية ذكية لتجميع وتنظيم الأخبار وتقديم سياق موضوعي. المنصة تتضمن روابط مباشرة لمواقع وصحف ووكالات خارجية مملوكة لأطراف ثالثة، ولسنا مسؤولين عن المحتوى أو السياسات الخاصة بتلك المواقع المستقلة.
        </p>

        <h2 className="text-xl font-bold text-[var(--primary)]">2. الأمانة المالية وإخلاء المسؤولية</h2>
        <p>
          جميع أسعار العملات، والذهب، والنفط، والأسواق المعروضة في قسم «الوطن الاقتصادي» مقدمة لأغراض إخبارية بحتة، ولا يجوز اعتبارها نصيحة مالية أو دعوة للاستثمار أو التداول. المنصة لا تتحمل أي مسؤولية عن أي قرارات مالية تُتخذ بناءً على هذه البيانات.
        </p>

        <h2 className="text-xl font-bold text-[var(--primary)]">3. حقوق الملكية والاقتباس</h2>
        <p>
          العلامة التجارية لمنصة «الوطن اليوم» وكود المنصة وتصميمها وسياقاتها التحريرية الأصلية محمية بموجب قوانين الملكية الفكرية. يُسمح بمشاركة المقالات عبر الروابط الرسمية للمنصة مع الإشارة الواضحة للمصدر.
        </p>
      </div>
    </div>
  );
}
