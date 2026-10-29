import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اشترك في النشرة الإخبارية — الوطن اليوم",
  description: "ملخص يومي لأهم الأحداث وتطورات فلسطين والعالم العربي في بريدك كل صباح.",
};

export default function NewsletterPage() {
  return (
    <div className="container-custom py-16 max-w-xl mx-auto space-y-6 text-center">
      <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mx-auto font-black text-2xl">
        ✉️
      </div>

      <h1 className="text-3xl font-black text-[var(--text)]">
        النشرة الإخبارية من «الوطن اليوم»
      </h1>
      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
        احصل على ملخص تحريري مركز لأبرز أحداث فلسطين والمنطقة والعالم مع روابط المصادر الموثقة، مباشرة في صندوق بريدك كل صباح.
      </p>

      <form className="space-y-4 pt-4 text-start">
        <div>
          <label htmlFor="email" className="block text-xs font-bold text-[var(--text)] mb-2">
            عنوان بريدك الإلكتروني
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="name@example.com"
            className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm focus:outline-none focus:border-[var(--primary)]"
          />
        </div>

        <div className="space-y-2 text-xs text-[var(--text-muted)]">
          <span className="font-bold text-[var(--text)] block">حدد المواضيع التي تهمك:</span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[var(--primary)]" />
            <span>حصاد فلسطين اليومي (غزة، الضفة، والقدس)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-[var(--primary)]" />
            <span>نشرة الوطن الاقتصادي وأسعار الأسواق والذهب</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded text-[var(--primary)]" />
            <span>مستجدات التقنية والابتكار والذكاء الاصطناعي</span>
          </label>
        </div>

        <button
          type="button"
          className="w-full py-3.5 rounded-xl bg-[var(--primary)] text-white font-bold text-sm hover:bg-[var(--primary-hover)] transition-colors shadow-sm"
        >
          تأكيد الاشتراك في النشرة
        </button>

        <p className="text-[11px] text-[var(--text-muted)] text-center">
          🔒 نحترم خصوصيتك بالكامل. لا رسائل مزعجة، ويمكنك إلغاء الاشتراك بنقرة واحدة في أي وقت.
        </p>
      </form>
    </div>
  );
}

