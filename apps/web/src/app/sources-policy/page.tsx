import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة المصادر والعرض وحقوق الناشرين — الوطن اليوم",
  description: "سياسة احترام حقوق الملكية الفكرية، وتصنيف سياسات العرض لكل ناشر، وكيفية احترام حقوق الصحافة والوكالات.",
};

export default function SourcesPolicyPage() {
  return (
    <div className="container-custom py-12 max-w-3xl mx-auto space-y-8">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="text-3xl font-black text-[var(--text)] mb-3">سياسة المصادر والعرض وحقوق الناشرين</h1>
        <p className="text-base text-[var(--text-muted)] leading-relaxed">
          نحن في «الوطن اليوم» نؤمن بأن الصحافة المستقلة والوكالات الإخبارية تبذل جهداً استثنائياً في صناعة الأخبار، ومن واجبنا حماية هذه الحقوق ودعم صُنّاع المحتوى بتوجيه القراء إليهم وليس استبدالهم.
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-[var(--text)]">
        <h2 className="text-xl font-bold text-[var(--primary)]">سياسات العرض الأربعة المعتمدة برمجياً</h2>

        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <h3 className="font-bold text-sm text-[var(--text)] mb-1">
              العنوان فقط (TITLE_ONLY)
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              يُعرض عنوان الخبر فقط مع اسم المصدر ورابط مباشر، دون نشر أي مقتطف أو ملخص أو صورة، لضمان انتقال القارئ مباشرة إلى موقع الناشر الأصلي.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <h3 className="font-bold text-sm text-[var(--text)] mb-1">
              المقتطف القصير (EXCERPT)
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              يُعرض سطران فقط مما يتيحه المصدر صراحةً في خلاصات RSS المفتوحة للجمهور، مع زر واضح لقراءة التفاصيل في المصدر.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <h3 className="font-bold text-sm text-[var(--text)] mb-1">
              الملخص التحريري (SUMMARY)
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              يقوم فريقنا التحريري أو أنظمتنا الآلية بصياغة ملخص أصلي وجديد للحدث يضيف سياقاً ولا ينسخ نصوص الناشر، مع الإشارة الدائمة للمصدر ورابطه.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <h3 className="font-bold text-sm text-[var(--text)] mb-1">
              النص الكامل المرخص (LICENSED_FULL)
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              لا يُنشر النص الكامل لأي مادة صحفية إلا إذا كان للمنصة ترخيص تعاقدي رسمي مكتوب مع الوكالة أو الصحيفة المعنية، أو كانت المادة أصيلة ومنتجة من قبل كتاب المنصة.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-[var(--primary)] pt-4">حقوق الناشر وإزالة المحتوى</h2>
        <p>
          يحق لأي ناشر أو مؤسسة إعلامية طلب تعديل سياسة عرض مواده أو إيقاف جلبها كلياً من المنصة، ونلتزم بتنفيذ الطلب فوراً عبر مسار <Link href="/dmca" className="text-[var(--primary)] underline">طلبات الإزالة وحماية الحقوق</Link>.
        </p>
      </div>
    </div>
  );
}

