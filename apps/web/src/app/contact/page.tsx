import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اتصل بنا وغرفة التحرير — الوطن اليوم",
  description: "قنوات الاتصال المباشرة بهيئة التحرير، الدعم التقني، الإعلانات، والشراكات الإعلامية في الوطن اليوم.",
};

export default function ContactPage() {
  return (
    <div className="container-custom py-12 max-w-3xl mx-auto space-y-8">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="text-3xl font-black text-[var(--text)] mb-3">اتصل بنا وغرفة التحرير</h1>
        <p className="text-base text-[var(--text-muted)] leading-relaxed">
          يسعدنا دائماً استقبال استفساراتكم، وملاحظاتكم التحريرية، والتعاون مع المؤسسات الصحفية والناشرين في العالم العربي.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
          <h3 className="font-bold text-sm text-[var(--text)]">غرفة التحرير والملاحظات الإخبارية</h3>
          <p className="text-xs text-[var(--text-muted)]">
            للتواصل مع المحررين، إرسال البيانات الصحفية، أو الإبلاغ عن تصحيحات:
          </p>
          <code className="text-xs font-bold text-[var(--primary)] block">
            editorial@alwatantoday.net
          </code>
        </div>

        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
          <h3 className="font-bold text-sm text-[var(--text)]">حقوق الملكية وطلبات الإزالة (DMCA)</h3>
          <p className="text-xs text-[var(--text-muted)]">
            للناشرين والوكالات وأصحاب الحقوق لتقديم طلبات الإزالة أو تعديل سياسات العرض:
          </p>
          <code className="text-xs font-bold text-[var(--primary)] block">
            dmca@alwatantoday.net
          </code>
        </div>

        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
          <h3 className="font-bold text-sm text-[var(--text)]">الشراكات والناشرون وتغذية الخلاصات</h3>
          <p className="text-xs text-[var(--text-muted)]">
            للانضمام كشريك إخباري معتمد أو ترخيص المحتوى:
          </p>
          <code className="text-xs font-bold text-[var(--primary)] block">
            partners@alwatantoday.net
          </code>
        </div>

        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
          <h3 className="font-bold text-sm text-[var(--text)]">الدعم الفني والعمليات (Operations)</h3>
          <p className="text-xs text-[var(--text-muted)]">
            للبلاغات التقنية، سلامة الخدمات، وحماية البيانات:
          </p>
          <code className="text-xs font-bold text-[var(--primary)] block">
            ops@alwatantoday.net
          </code>
        </div>
      </div>
    </div>
  );
}

