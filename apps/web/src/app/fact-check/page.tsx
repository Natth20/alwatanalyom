import { Metadata } from "next";
import { getFactChecks } from "@/lib/dal";
import { FactCheckClientLab } from "./FactCheckClientLab";
import { ShieldCheck } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "رادار الحقيقة ومختبر التحقق (OSINT) — الوطن اليوم",
  description: "وحدة التحقق الجنائي من الأخبار، فحص الروابط والادعاءات المتداولة، وكشف الصور والفيديوهات المضللة.",
  alternates: { canonical: "/fact-check" },
};

export default async function FactCheckPage() {
  const factChecks = await getFactChecks();

  return (
    <div className="container-custom py-10 max-w-6xl space-y-10">
      <header className="relative rounded-3xl overflow-hidden border border-rose-500/35 bg-gradient-to-br from-[#2B030E] via-[#170209] to-[#080103] text-white p-8 md:p-10 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-600/20 border border-rose-400/35 text-rose-300 text-xs font-black">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>وحدة التدقيق والصحافة الاستقصائية المفتوحة (OSINT)</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black tracking-tight">
          رادار الحقيقة <span className="text-[var(--gold)]">وكشف التضليل</span>
        </h1>

        <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
          نتحقق من الادعاءات المتداولة وفق منهجية علمية موثقة، ونتيح للقراء فحص الروابط والنصوص مباشرة مقابل أرشيفنا الرقمي.
        </p>
      </header>

      <FactCheckClientLab initialItems={factChecks} />
    </div>
  );
}
