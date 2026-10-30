import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Share2,
  Calendar,
  Eye,
  ExternalLink,
  Search,
  Cpu,
  FileCheck2,
  Send,
  Flag,
} from "lucide-react";
import { FACT_CHECKS } from "@/data/factChecks";
import { Metadata } from "next";

interface FactCheckDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: FactCheckDetailProps): Promise<Metadata> {
  const { id } = await params;
  const item = FACT_CHECKS.find((f) => f.id === id);
  if (!item) {
    return { title: "تقرير التحقق غير موجود — الوطن اليوم" };
  }
  return {
    title: `${item.verdictLabel}: ${item.claim.slice(0, 60)}... — رادار الحقيقة | الوطن اليوم`,
    description: item.summary,
  };
}

export default async function FactCheckDetailPage({ params }: FactCheckDetailProps) {
  const { id } = await params;
  const item = FACT_CHECKS.find((f) => f.id === id);

  if (!item) {
    notFound();
  }

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "fake":
        return {
          icon: XCircle,
          bg: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30",
          stampBg: "bg-red-600 text-white shadow-red-500/20",
          statusName: "زائف ومختلق",
        };
      case "misleading":
        return {
          icon: AlertTriangle,
          bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
          stampBg: "bg-amber-600 text-white shadow-amber-500/20",
          statusName: "مضلل ومجتزأ",
        };
      case "out-of-context":
        return {
          icon: AlertTriangle,
          bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
          stampBg: "bg-blue-600 text-white shadow-blue-500/20",
          statusName: "خارج السياق الزمني",
        };
      default:
        return {
          icon: CheckCircle2,
          bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
          stampBg: "bg-emerald-600 text-white shadow-emerald-500/20",
          statusName: "موثق وصحيح",
        };
    }
  };

  const badge = getVerdictBadge(item.verdict);
  const BadgeIcon = badge.icon;

  return (
    <div className="container-custom py-8 max-w-5xl">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6 text-sm text-[var(--text-muted)] border-b border-[var(--border)] pb-4">
        <Link
          href="/fact-check"
          className="inline-flex items-center gap-1.5 font-bold text-[var(--primary)] hover:underline"
        >
          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          العودة لمرصد رادار الحقيقة
        </Link>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {item.date}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {item.views.toLocaleString()} قراءة
          </span>
        </div>
      </div>

      {/* Hero Header with Stamp */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 mb-8 relative overflow-hidden shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]">
            تصنيف: {item.category}
          </span>
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-black text-sm tracking-wide shadow-md ${badge.stampBg}`}
          >
            <BadgeIcon className="w-4 h-4" />
            <span>حكم المرصد: {item.verdictLabel}</span>
          </div>
        </div>

        {/* Claim Box */}
        <div className="my-4 p-5 rounded-xl bg-[var(--bg)] border-r-4 border-r-red-600 border border-[var(--border)]">
          <span className="block text-xs font-bold text-red-600 dark:text-red-400 mb-1">
            الادعاء الذي خضع للفحص والتحقق:
          </span>
          <h1 className="text-xl md:text-2xl font-black leading-snug">« {item.claim} »</h1>
          <p className="text-xs text-[var(--text-muted)] mt-2">
            <strong>قنوات الانتشار:</strong> {item.claimSource}
          </p>
        </div>

        {/* Summary */}
        <p className="text-base md:text-lg leading-relaxed text-[var(--text)] mt-4 font-medium">
          {item.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Analysis Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Detailed Editorial Analysis */}
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
            <h2 className="text-lg font-black flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
              <ShieldAlert className="w-5 h-5 text-[var(--primary)]" />
              التحليل التحريري المفصل والسياق
            </h2>
            <div className="text-[var(--text)] leading-relaxed space-y-4 text-base">
              <p>{item.fullAnalysis}</p>
            </div>
          </section>

          {/* Forensic Evidence Breakdown */}
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
            <h2 className="text-lg font-black flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
              <Cpu className="w-5 h-5 text-indigo-500" />
              الأدلة الجنائية الرقمية وبراهين الفحص التقني
            </h2>
            <div className="space-y-3">
              {item.evidences.map((ev, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex items-start gap-3"
                >
                  <div
                    className={`p-2 rounded-lg mt-0.5 ${
                      ev.status === "debunked"
                        ? "bg-red-500/10 text-red-600"
                        : "bg-emerald-500/10 text-emerald-600"
                    }`}
                  >
                    <Search className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      {ev.tool}
                    </span>
                    <p className="text-sm font-semibold text-[var(--text)] mt-1">{ev.finding}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Official Sources & Verification Links */}
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
            <h2 className="text-lg font-black flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
              <FileCheck2 className="w-5 h-5 text-emerald-600" />
              المصادر والوثائق الرسمية التي بني عليها الحكم
            </h2>
            <div className="space-y-2">
              {item.officialSources.map((src, idx) => (
                <a
                  key={idx}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--primary)] transition-colors group"
                >
                  <div className="min-w-0">
                    <span className="text-sm font-bold block text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                      {src.name}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">تاريخ الإفادة: {src.date}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info & Action */}
        <aside className="space-y-6">
          {/* Observatory Method Card */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-sm">
            <h3 className="font-black text-sm flex items-center gap-2 mb-2 text-[var(--text)]">
              <ShieldAlert className="w-4 h-4 text-[var(--primary)]" />
              منهجية الفحص في رادار الحقيقة
            </h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              تخضع كافة التقارير لمعيار المراجعة الثلاثية (Triple Verification): الفحص الجنائي للبصريات + مطابقة الأرشيف الرقمي + الاستعلام المباشر من الجهات ذات الاختصاص الميداني والخدماتي.
            </p>
          </div>

          {/* Share & Debunk Spread */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h3 className="font-black text-sm mb-3 text-[var(--text)] flex items-center gap-2">
              <Share2 className="w-4 h-4 text-[var(--primary)]" />
              ساهم في إيقاف انتشار الشائعة
            </h3>
            <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
              شارك هذا الرابط الموثق في المجموعات أو المنصات التي تداولت الادعاء لتصحيح المعلومة وحماية الجمهور.
            </p>
            <button
              onClick={() => {}}
              className="w-full py-2.5 px-4 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              نسخ رابط التحقق والمشاركة
            </button>
          </div>

          {/* Report Related Rumor */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <h3 className="font-black text-sm mb-2 text-[var(--text)] flex items-center gap-2">
              <Flag className="w-4 h-4 text-red-500" />
              هل شاهدت انتشاراً جديداً لهذا الادعاء؟
            </h3>
            <p className="text-xs text-[var(--text-muted)] mb-3 leading-relaxed">
              أرسل رابط المنشور أو الصورة المرفقة لمساعدة فريق المرصد في تحديث نطاق الرصد.
            </p>
            <form className="space-y-2">
              <input
                type="text"
                placeholder="رابط المنشور أو القناة..."
                className="w-full text-xs px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
              />
              <button
                type="button"
                className="w-full py-2 px-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--border)] text-xs font-bold text-[var(--text)] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[var(--primary)]" />
                إرسال الإفادة
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}

