import { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية وحماية البيانات — الوطن اليوم",
  description: "سياسة الخصوصية الصارمة، خلو المنصة من ملفات التتبع المتطفلة، وحماية بيانات المشتركين.",
};

export default function PrivacyPage() {
  return (
    <div className="container-custom py-12 max-w-3xl mx-auto space-y-8">
      <div className="border-b border-[var(--border)] pb-6">
        <h1 className="text-3xl font-black text-[var(--text)] mb-3">سياسة الخصوصية وحماية البيانات</h1>
        <p className="text-base text-[var(--text-muted)] leading-relaxed">
          نحن في «الوطن اليوم» نعتبر خصوصية القارئ حقاً أصيلاً لا يقبل المساومة. تم تصميم موقعنا وبنيتنا التقنية بالكامل وفق مبدأ «الخصوصية أولاً» (Privacy by Design).
        </p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-[var(--text)]">
        <h2 className="text-xl font-bold text-[var(--primary)]">1. لا ملفات تتبع عبر المواقع (No Cross-Site Trackers)</h2>
        <p>
          نحن لا نستخدم أدوات التتبع الإعلانية التطفلية، ولا نبيع أو نشارك أي بيانات تصفح مع أي طرف ثالث. تُدار تحليلات الموقع عبر أنظمة إحصاء عامة مجمعة لا تعتمد على ملفات تعريف الارتباط (Cookies) ولا تخزن عناوين IP الكاملة للزوار.
        </p>

        <h2 className="text-xl font-bold text-[var(--primary)]">2. النشرات البريدية (Double Opt-in)</h2>
        <p>
          عند الاشتراك في النشرة الإخبارية، نطلب فقط عنوان بريدك الإلكتروني. لا يُفعّل الاشتراك إلا بعد تأكيدك عبر رسالة تحقق في صندوق بريدك، وتحتوي كل رسالة نرسلها على رابط مباشر للإلغاء الفوري دون أي قيود.
        </p>

        <h2 className="text-xl font-bold text-[var(--primary)]">3. المحفوظات وتفضيلات القراءة المحلية</h2>
        <p>
          قائمة الأخبار المحفوظة وتفضيلات القراءة (كالوضع الليلي وحجم الخط) تُخزن محلياً داخل متصفحك (Local Storage) ولا تُرسل إلى خوادمنا.
        </p>

        <h2 className="text-xl font-bold text-[var(--primary)]">4. حق الحذف والنسيان</h2>
        <p>
          يحق لأي مستخدم في أي وقت طلب حذف بريده من سجلات النشرات أو حذف بيانات اشتراك الإشعارات، ويمكن ذلك إما برابط الإلغاء أو بمراسلتنا على: <code className="bg-[var(--surface)] px-2 py-0.5 rounded text-[var(--primary)]">privacy@alwatantoday.net</code>.
        </p>
      </div>
    </div>
  );
}
