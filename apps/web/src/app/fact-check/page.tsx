import type { Metadata } from "next";
import { getFactChecks } from "@/lib/dal";
import type { FactCheckItem } from "@/data/factChecks";
import { FactCheckClientLab } from "./FactCheckClientLab";
import {
  ShieldCheck, Radar, ScanEye, History, Building2, FileCheck2,
  XCircle, AlertTriangle, CheckCircle2, Clock, Lock, Fingerprint, type LucideIcon,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "رادار الحقيقة ومختبر التحقق (OSINT) — الوطن اليوم",
  description: "وحدة التحقق الجنائي من الأخبار، فحص الروابط والادعاءات المتداولة، وكشف الصور والفيديوهات المضللة.",
  alternates: { canonical: "/fact-check" },
};

type VerdictBucket = "fake" | "misleading" | "out-of-context" | "verified";
interface StatConfig { key: VerdictBucket; label: string; accent: string; icon: LucideIcon }
interface VerifyStep { step: string; title: string; subtitle: string; description: string; icon: LucideIcon }

const VERDICT_STATS: readonly StatConfig[] = [
  { key: "fake", label: "ادعاءات زائفة", accent: "text-rose-400 border-rose-500/35 bg-rose-950/45", icon: XCircle },
  { key: "misleading", label: "مضللة ومجتزأة", accent: "text-amber-300 border-amber-500/35 bg-amber-950/30", icon: AlertTriangle },
  { key: "out-of-context", label: "خارج السياق", accent: "text-orange-300 border-orange-500/35 bg-orange-950/30", icon: Clock },
  { key: "verified", label: "موثقة وصحيحة", accent: "text-emerald-300 border-emerald-500/35 bg-emerald-950/30", icon: CheckCircle2 },
];

const HOW_WE_VERIFY: readonly VerifyStep[] = [
  { step: "01", title: "الفحص الرقمي للبصريات", subtitle: "Digital Forensics", description: "تحليل البيانات الوصفية (EXIF) ومستويات الخطأ الإشعاعي (ELA) وكشف التوليد بالذكاء الاصطناعي.", icon: ScanEye },
  { step: "02", title: "البحث العكسي والأرشيفي", subtitle: "Reverse Search", description: "تجزئة المقاطع إلى إطارات ثابتة ومطابقتها مع الأرشيف الزمني لتحديد تاريخ النشر الأول.", icon: History },
  { step: "03", title: "التأكد من المصادر الرسمية", subtitle: "Official Source Verification", description: "التحقق الميداني والمباشر من البيانات الحكومية والمؤسسات الأممية والجهات المعنية.", icon: Building2 },
  { step: "04", title: "تقرير الحكم النهائي", subtitle: "Final Verdict Report", description: "إصدار تصنيف تحريري موثق بالأدلة الرقمية وروابط المصادر الأولية للجمهور.", icon: FileCheck2 },
];

const normalizeVerdict = (verdict: string): VerdictBucket => {
  if (verdict === "fake") return "fake";
  if (verdict === "misleading") return "misleading";
  if (verdict === "out-of-context" || verdict === "out_of_context") return "out-of-context";
  return "verified";
};

const verdictScore = (v: VerdictBucket): number =>
  v === "fake" ? 1 : v === "misleading" ? 2 : v === "out-of-context" ? 3 : 5;

function buildClaimReviewJsonLd(items: FactCheckItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "رادار الحقيقة ومختبر التحقق (OSINT) — الوطن اليوم",
    url: "https://alwatantoday.net/fact-check",
    description: "تقارير التحقق الجنائي من الأخبار وكشف التضليل وفق منهجية المصادر المفتوحة.",
    numberOfItems: items.length,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        item: {
          "@type": "ClaimReview",
          url: `https://alwatantoday.net/fact-check/${item.slug ?? item.id}`,
          claimReviewed: item.claim,
          datePublished: item.date,
          author: { "@type": "Organization", name: "الوطن اليوم — وحدة التحقق (OSINT)" },
          reviewRating: {
            "@type": "Rating",
            ratingValue: verdictScore(normalizeVerdict(item.verdict)),
            bestRating: 5,
            worstRating: 1,
            alternateName: item.verdictLabel,
          },
        },
      })),
    },
  };
}

export default async function FactCheckPage() {
  const factChecks = await getFactChecks();
  const counts = factChecks.reduce<Record<VerdictBucket, number>>(
    (acc, item) => {
      acc[normalizeVerdict(item.verdict)] += 1;
      return acc;
    },
    { fake: 0, misleading: 0, "out-of-context": 0, verified: 0 }
  );

  return (
    <div dir="rtl" className="container-custom py-10 max-w-6xl space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildClaimReviewJsonLd(factChecks)) }} />
      <style>{`@keyframes osintScan{0%{transform:translateY(-100%);opacity:0}15%{opacity:.9}85%{opacity:.9}100%{transform:translateY(520%);opacity:0}}.osint-scan-beam{animation:osintScan 5.5s linear infinite}`}</style>

      <header className="relative rounded-3xl overflow-hidden border border-rose-500/40 bg-gradient-to-br from-[#0E0407] via-[#590018]/75 to-[#16060B] text-white p-7 md:p-11 shadow-2xl space-y-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.24),transparent_48%),radial-gradient(circle_at_bottom_right,rgba(245,185,0,0.14),transparent_45%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-20 bg-[linear-gradient(to_right,rgba(244,63,94,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(244,63,94,0.18)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="pointer-events-none osint-scan-beam absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-rose-500/20 to-transparent border-b border-rose-400/50" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-600/25 border border-rose-400/40 text-rose-200 text-xs font-black">
            <Radar className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>وحدة التدقيق والصحافة الاستقصائية المفتوحة (OSINT)</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16060B]/85 border border-[var(--gold)]/45 text-[var(--gold)] text-[11px] font-black">
              <ShieldCheck className="w-3.5 h-3.5" /><span>منهجية علمية موثقة</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16060B]/85 border border-rose-500/40 text-rose-200 text-[11px] font-black">
              <Lock className="w-3.5 h-3.5 text-rose-400" /><span>فحص جنائي مستقل</span>
            </span>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              مختبر <span className="text-rose-400">رادار الحقيقة</span> <span className="text-[var(--gold)]">وكشف التضليل</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-200/90 max-w-2xl leading-relaxed">
              غرفة عمليات رقمية تفحص الادعاءات المتداولة والصور والمقاطع المجهولة وفق منهجية علمية موثقة، مع مطابقة مباشرة لأرشيفنا الرقمي والمصادر الرسمية.
            </p>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-rose-500/35 bg-[#16060B]/85 backdrop-blur-md p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-2.5">
              <span className="text-xs font-black text-rose-200 flex items-center gap-1.5">
                <Fingerprint className="w-4 h-4 text-rose-400" /><span>إحصائيات السجل الموثق</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#590018]/80 border border-[var(--gold)]/40 text-xs font-black text-[var(--gold)] tabular-nums">
                {factChecks.length} تقرير
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {VERDICT_STATS.map(({ key, label, accent, icon: Icon }) => (
                <div key={key} className={`rounded-2xl border p-2.5 flex items-center justify-between ${accent}`}>
                  <span className="text-[11px] font-bold flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 shrink-0" /><span>{label}</span>
                  </span>
                  <span className="text-sm font-black tabular-nums">{counts[key]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section aria-labelledby="osint-methodology-heading" className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-lg space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 id="osint-methodology-heading" className="text-xl md:text-2xl font-black text-[var(--text)] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-rose-500" /><span>كيف نتحقق؟ منهجية الفحص الجنائي في 4 مراحل</span>
            </h2>
            <p className="text-xs text-[var(--text-muted)]">يمر كل ادعاء ببروتوكول تدقيق رقمي وميداني صارم قبل إصدار الحكم النهائي.</p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-black">
            <Radar className="w-3.5 h-3.5" /><span>منهجية علمية موثقة</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOW_WE_VERIFY.map(({ step, title, subtitle, description, icon: Icon }) => (
            <article key={step} className="rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#16060B]/95 to-[#0E0407] backdrop-blur-md p-5 text-white space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-rose-600/20 border border-rose-400/35 flex items-center justify-center text-rose-400">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-black font-mono text-[var(--gold)] bg-[#590018]/70 border border-[var(--gold)]/35 px-2.5 py-1 rounded-2xl">{step}</span>
              </div>
              <div className="space-y-0.5">
                <h3 className="text-sm font-black text-white">{title}</h3>
                <p className="text-[11px] font-mono text-rose-300/80">{subtitle}</p>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <FactCheckClientLab initialItems={factChecks} />
    </div>
  );
}