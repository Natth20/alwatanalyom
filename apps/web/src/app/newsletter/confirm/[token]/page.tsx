import Link from "next/link";
import { prisma } from "@awt/db";

interface Props {
  params: Promise<{
    token: string;
  }>;
}

export default async function ConfirmNewsletterPage({ params }: Props) {
  const { token } = await params;

  let success = false;
  let email = "";

  try {
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { token },
    });

    if (subscriber) {
      await prisma.newsletterSubscriber.update({
        where: { id: subscriber.id },
        data: { confirmedAt: new Date() },
      });
      success = true;
      email = subscriber.email;
    }
  } catch {
    // fallback
  }

  return (
    <div className="container-custom py-20 max-w-md mx-auto text-center space-y-6">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl font-bold ${
        success ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
      }`}>
        {success ? "✓" : "✕"}
      </div>

      <h1 className="text-2xl font-black text-[var(--text)]">
        {success ? "تم تأكيد اشتراكك بنجاح!" : "رابط التأكيد غير صالح أو منتهي الصلاحية"}
      </h1>

      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
        {success
          ? `شكراً لك! تم تفعيل اشتراك البريد (${email}) في نشرات «الوطن اليوم». ستصلك أول نشرة في الصباح الباكر.`
          : "تعذر التحقق من رمز التأكيد. قد يكون الرابط قد تم استخدامه مسبقاً أو انتهت مهلته. يرجى إعادة إدخال بريدك في صفحة النشرة."}
      </p>

      <div className="pt-4">
        <Link
          href="/"
          className="px-6 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors inline-block"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
