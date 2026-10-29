import Link from "next/link";
import { prisma } from "@awt/db";

interface Props {
  params: Promise<{
    token: string;
  }>;
}

export default async function UnsubscribeNewsletterPage({ params }: Props) {
  const { token } = await params;

  let unsubscribed = false;

  try {
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { token },
    });

    if (subscriber) {
      await prisma.newsletterSubscriber.update({
        where: { id: subscriber.id },
        data: { unsubscribedAt: new Date() },
      });
      unsubscribed = true;
    }
  } catch {
    // fallback
  }

  return (
    <div className="container-custom py-20 max-w-md mx-auto text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-slate-500/10 text-[var(--text-muted)] flex items-center justify-center mx-auto text-2xl font-bold">
        🔕
      </div>

      <h1 className="text-2xl font-black text-[var(--text)]">
        {unsubscribed ? "تم إلغاء اشتراكك" : "تعذر العثور على الاشتراك"}
      </h1>

      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
        {unsubscribed
          ? "نأسف لمغادرتك. تم حذف بريدك الإلكتروني من قوائم الإرسال الدورية ولن تستلم أي رسائل أخرى."
          : "الرابط غير صالح أو تم إلغاء الاشتراك مسبقاً."}
      </p>

      <div className="pt-4">
        <Link
          href="/"
          className="px-6 py-2.5 rounded-xl border border-[var(--border)] text-xs font-bold hover:bg-[var(--surface)] transition-colors inline-block"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
