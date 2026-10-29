import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "السياسة التحريرية وقواعد النشر — الوطن اليوم",
  description: "المعايير التحريرية، والحياد الإخباري، والتحقق، والسياسة المعتمدة في تغطية الشأن الفلسطيني في الوطن اليوم.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="container-custom py-12 max-w-3xl mx-auto space-y-8">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="text-3xl font-black text-[var(--text)] mb-3">السياسة التحريرية وقواعد النشر</h1>
        <p className="text-base text-[var(--text-muted)] leading-relaxed">
          تعتمد «الوطن اليوم» ميثاقاً تحريرياً صارماً يرتكز على الدقة، وسرعة التصحيح، وفصل الخبر عن الرأي، والالتزام بالحقوق، مع خصوصية مهنية وأخلاقية عميقة في التغطية الفلسطينية.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-[var(--text)]">
        <h2 className="text-xl font-bold text-[var(--primary)]">1. التحقق والدقة التحريرية</h2>
        <p>
          نلتزم بعدم نشر أي ادعاء أو خبر رئيسي ما لم يصدر عن وكالة رسمية، أو جهة موثوقة ذات رصيد مهني، أو يتطابق مع تغطيتين مستقلتين على الأقل في القضايا العاجلة. الأخبار المشبوهة أو الشائعات المتداولة تخضع لفريق التحقق قبل أي نشر.
        </p>

        <h2 className="text-xl font-bold text-[var(--primary)]">2. سياسة الشأن الفلسطيني والمصطلحات</h2>
        <p>
          انطلاقاً من مبدأ «فلسطين أولاً»، تعتمد المنصة دليلاً معيارياً للمصطلحات الإخبارية:
        </p>
        <ul className="list-disc list-inside space-y-2 pr-2 text-[var(--text-muted)]">
          <li>تسمية القدس باسمها العربي الكامل أو «القدس المحتلة».</li>
          <li>استخدام مصطلح «الشهداء» لضحايا القصف والعمليات العسكرية الإسرائيلية، وتوثيق أسمائهم وأعمارهم متى توفرت.</li>
          <li>التمييز التام بين «المستوطنات» والأراضي المحتلة وبين الأراضي المصنفة دولياً.</li>
          <li>الحذر والتدقيق المضاعف عند التعامل مع مصادر الإعلام العسكري الإسرائيلي، ووضع وسم صريح يوضح مصدر الرواية.</li>
        </ul>

        <h2 className="text-xl font-bold text-[var(--primary)]">3. فصل الرأي عن الخبر</h2>
        <p>
          تُوسم مقالات الرأي والتحليلات بعلامة واضحة («رأي») تفصلها عن الأخبار المجردة، ولا تُعامل آراء الكتاب على أنها تمثل الموقف التحريري للمنصة.
        </p>

        <h2 className="text-xl font-bold text-[var(--primary)]">4. سياسة التصحيح المفتوح</h2>
        <p>
          عند حدوث أي خطأ في اسم، أو رقم، أو سياق، تلتزم المنصة بتصحيح الخبر فوراً مع إضافة ملاحظة واضحة في أسفل المقال توضح تاريخ التصحيح والمحتوى المعدل، وتسجيل ذلك في <Link href="/corrections" className="text-[var(--primary)] underline">سجل التصحيحات العلني</Link>.
        </p>

        <div className="pt-8 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
          <Link href="/sources-policy" className="text-[var(--primary)] font-semibold hover:underline">
            سياسة المصادر والعرض ←
          </Link>
          <Link href="/corrections" className="text-[var(--primary)] font-semibold hover:underline">
            سجل التصحيحات ←
          </Link>
        </div>
      </div>
    </div>
  );
}
