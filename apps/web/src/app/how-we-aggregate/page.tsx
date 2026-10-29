import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "كيف نجمع الأخبار والبيانات — الوطن اليوم",
  description: "الشفافية التامة في مسار استقبال الأخبار، والتطبيع، وإزالة التكرار، ودور الذكاء الاصطناعي والمراجعة البشرية في منصة الوطن اليوم.",
};

export default function HowWeAggregatePage() {
  return (
    <div className="container-custom py-12 max-w-3xl mx-auto space-y-8">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="text-3xl font-black text-[var(--text)] mb-3">كيف نجمع الأخبار وننظمها؟</h1>
        <p className="text-base text-[var(--text-muted)] leading-relaxed">
          التزاماً بالشفافية التامة أمام قرائنا وشركائنا الناشرين، توضح هذه الصفحة المسار التقني والتحريري الدقيق الذي يمر به أي خبر منذ لحظة صدوره لدى مصدره وحتى ظهوره على المنصة.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-[var(--text)]">
        <h2 className="text-xl font-bold text-[var(--primary)]">مراحل مسار الأخبار (Pipeline)</h2>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <h3 className="font-bold text-base text-[var(--text)] mb-1">1. الجلب والاستقبال الآمن (Ingestion)</h3>
            <p className="text-xs text-[var(--text-muted)]">
              يقوم نظام المعالجة بالاتصال بخلاصات RSS وواجهات API الرسمية للمصادر المعتمدة وفق فترات زمنية محددة. يراعي النظام ملفات robots.txt ويحترم معايير استهلاك الموارد (ETag و If-Modified-Since)، ويستخدم هوية واضحة للروبوت (AlWatanTodayBot).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <h3 className="font-bold text-base text-[var(--text)] mb-1">2. التطبيع وكشف التكرار (Deduplication)</h3>
            <p className="text-xs text-[var(--text-muted)]">
              يتم تنظيف الروابط من وسوم التتبع وحساب بصمات رقمية مشفرة (Simhash و Trigram). كما يطبق النظام «حارس الدمج» الصارم الذي يمنع دمج أي خبرين إذا تباينت الأرقام الجوهرية (مثل أعداد الضحايا، الأسعار، أو التواريخ).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <h3 className="font-bold text-base text-[var(--text)] mb-1">3. التجميع في قصص (Clustering)</h3>
            <p className="text-xs text-[var(--text-muted)]">
              بدلاً من عرض 20 خبراً مكرراً عن نفس الغارة أو الحدث، يدمج النظام تغطيات الصحف والوكالات المختلفة في صفحة قصة واحدة تتيح للقارئ مقارنة التناول الصحفي ومتابعة الخط الزمني أولاً بأول.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <h3 className="font-bold text-base text-[var(--text)] mb-1">4. دور الذكاء الاصطناعي والمراجعة البشرية</h3>
            <p className="text-xs text-[var(--text-muted)]">
              الذكاء الاصطناعي يقترح تصنيف القسم، ويترجم العناوين الأجنبية بدقة، ويصيغ ملخصاً تحريرياً مقتضباً يضيف سياقاً ولا ينسخ حرفياً.
              <br /><br />
              <strong>المراجعة البشرية الإلزامية:</strong> أي خبر يتضمن قضايا حساسة (ضحايا ونزاعات، اتهامات سياسية، أو ادعاءات غير مؤكدة) أو كانت نسبة ثقة الترجمة منخفضة، يُحال فوراً لقائمة المراجعة البشرية في غرفة الأخبار ولا يُنشر آلياً.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <h3 className="font-bold text-base text-[var(--text)] mb-1">5. احترام حقوق الملكية وسياسة العرض</h3>
            <p className="text-xs text-[var(--text-muted)]">
              لكل مصدر ناشر سياسة عرض مسجلة برمجياً (عنوان فقط، مقتطف، أو ملخص). نحن لا ننشر النص الكامل لمقالات الناشرين دون ترخيص صريح، ونضع دائماً زراً بارزاً ينقل القارئ إلى صفحة الناشر لقراءة المادة الكاملة.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
          <Link href="/sources-policy" className="text-[var(--primary)] font-semibold hover:underline">
            سياسة المصادر والعرض ←
          </Link>
          <Link href="/editorial-policy" className="text-[var(--primary)] font-semibold hover:underline">
            السياسة التحريرية وقواعد النشر ←
          </Link>
        </div>
      </div>
    </div>
  );
}
