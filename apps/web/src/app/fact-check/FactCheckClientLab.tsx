"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { FactCheckEvidence, FactCheckItem } from "@/data/factChecks";
import {
  Activity, AlertOctagon, AlertTriangle, Check, CheckCircle2, ChevronDown,
  ChevronUp, Clock, Database, ExternalLink, Eye, FileCheck2, FileSearch,
  Globe, Link2, Loader2, Lock, Microscope, Radar, Search, Share2,
  ShieldAlert, ShieldCheck, Sparkles, Tag, Unlock, XCircle,
} from "lucide-react";

interface OsintVerifyResult {
  query: string;
  isUrl: boolean;
  urlInspection?: {
    reachable: boolean;
    status: number | null;
    domain: string | null;
    title: string | null;
    contentType: string | null;
  } | null;
  matchedFactChecks: {
    id: string;
    slug: string;
    claim: string;
    verdict: string;
    verdictLabel: string;
    summary: string;
  }[];
  matchedArticles: {
    id: string;
    slug: string;
    titleAr: string;
    publishedAt: string;
    sourceName: string;
  }[];
  checkedAt: string;
}

interface VerdictStyle {
  icon: typeof CheckCircle2;
  badge: string;
  glow: string;
  accentBar: string;
}

interface DomainReputation {
  label: string;
  toneClass: string;
  barClass: string;
  fillPercent: number;
  isHttps: boolean;
}

const INVESTIGATION_STEPS: ReadonlyArray<{ id: number; label: string; detail: string }> = [
  { id: 1, label: "تحليل المدخل", detail: "تفكيك الكلمات المفتاحية وبنية الرابط" },
  { id: 2, label: "فحص النطاق والخادم", detail: "التحقق من استجابة المصدر ورأس الصفحة" },
  { id: 3, label: "مطابقة الأرشيف", detail: "مقارنة سجل التحقق والمصادر المعتمدة" },
];

const VERDICT_FILTERS: ReadonlyArray<{ id: string; label: string }> = [
  { id: "all", label: "الكل" },
  { id: "fake", label: "زائف" },
  { id: "misleading", label: "مضلل" },
  { id: "out-of-context", label: "خارج السياق" },
  { id: "true", label: "موثق" },
];

export function FactCheckClientLab({ initialItems }: { initialItems: FactCheckItem[] }) {
  const [filterVerdict, setFilterVerdict] = useState<string>("all");
  const [queryInput, setQueryInput] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<OsintVerifyResult | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!verifying) return;
    setActiveStep(1);
    const t2 = setTimeout(() => setActiveStep(2), 450);
    const t3 = setTimeout(() => setActiveStep(3), 950);
    return () => { clearTimeout(t2); clearTimeout(t3); };
  }, [verifying]);

  const { stats, filterCounts } = useMemo(() => {
    const counts: Record<string, number> = { all: initialItems.length, fake: 0, misleading: 0, "out-of-context": 0, true: 0 };
    for (const item of initialItems) {
      const v = String(item.verdict);
      if (v === "fake") counts.fake += 1;
      else if (v === "misleading") counts.misleading += 1;
      else if (v === "out-of-context" || v === "out_of_context") counts["out-of-context"] += 1;
      else if (v === "true" || v === "verified") counts.true += 1;
    }
    return {
      filterCounts: counts,
      stats: { total: initialItems.length, fakeCount: counts.fake, misleadingCount: counts.misleading + counts["out-of-context"], verifiedCount: counts.true },
    };
  }, [initialItems]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (queryInput.trim().length < 4) return;
    setVerifying(true);
    setVerifyError(null);
    setVerifyResult(null);
    try {
      const res = await fetch("/api/v1/osint/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryInput.trim() }),
      });
      const json = await res.json();
      if (res.ok) { setVerifyResult(json); setActiveStep(3); }
      else { setVerifyError(json?.error || "تعذر إجراء الفحص الآن."); setActiveStep(0); }
    } catch {
      setVerifyError("تعذر الاتصال بخادم التحقق.");
      setActiveStep(0);
    } finally {
      setVerifying(false);
    }
  };

  const toggleExpanded = (id: string) => setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleShareReport = async (item: FactCheckItem) => {
    const reportPath = `/fact-check/${item.slug || item.id}`;
    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${reportPath}` : reportPath;
    const shareText = `${item.claim} — [${item.verdictLabel}] ${shareUrl}`;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) await navigator.clipboard.writeText(shareText);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId((cur) => (cur === item.id ? null : cur)), 2400);
    } catch {
      setCopiedId(null);
    }
  };

  const filtered = useMemo(() => {
    if (filterVerdict === "all") return initialItems;
    return initialItems.filter((it) => {
      const v = String(it.verdict);
      if (filterVerdict === "true") return v === "true" || v === "verified";
      if (filterVerdict === "out-of-context") return v === "out-of-context" || v === "out_of_context";
      return v === filterVerdict;
    });
  }, [filterVerdict, initialItems]);

  const verdictStyle = (verdict: string): VerdictStyle => {
    if (verdict === "fake") {
      return { icon: XCircle, badge: "bg-rose-500/15 text-rose-400 border-rose-500/40", glow: "shadow-[0_0_20px_-4px_rgba(244,63,94,0.55)]", accentBar: "from-rose-600 via-red-500 to-rose-400" };
    }
    if (verdict === "misleading" || verdict === "out-of-context" || verdict === "out_of_context") {
      return { icon: AlertTriangle, badge: "bg-amber-500/15 text-amber-400 border-amber-500/40", glow: "shadow-[0_0_20px_-4px_rgba(245,185,0,0.45)]", accentBar: "from-amber-500 via-[var(--gold)] to-orange-500" };
    }
    return { icon: CheckCircle2, badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40", glow: "shadow-[0_0_20px_-4px_rgba(16,185,129,0.45)]", accentBar: "from-emerald-500 via-teal-400 to-emerald-400" };
  };

  const evidenceStatusMeta = (status: FactCheckEvidence["status"]) => {
    if (status === "debunked") return { label: "مكشوف التضليل", icon: AlertOctagon, badge: "bg-rose-500/15 text-rose-400 border-rose-500/30" };
    if (status === "verified") return { label: "مؤكد وموثق", icon: CheckCircle2, badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" };
    return { label: "قيد التحليل", icon: Microscope, badge: "bg-amber-500/15 text-amber-400 border-amber-500/30" };
  };

  const getDomainReputation = (inspection: NonNullable<OsintVerifyResult["urlInspection"]>, query: string): DomainReputation => {
    const isHttps = /^https:\/\//i.test(query.trim());
    if (inspection.reachable && isHttps && inspection.status && inspection.status < 400) {
      return { label: "نطاق مستجيب ومؤمّن (HTTPS)", toneClass: "text-emerald-400 border-emerald-500/35 bg-emerald-500/10", barClass: "bg-gradient-to-l from-emerald-400 to-teal-500", fillPercent: 90, isHttps };
    }
    if (inspection.reachable) {
      return { label: "نطاق مستجيب دون تشفير HTTPS", toneClass: "text-amber-400 border-amber-500/35 bg-amber-500/10", barClass: "bg-gradient-to-l from-amber-400 to-orange-500", fillPercent: 55, isHttps };
    }
    return { label: "النطاق لا يستجيب أو محجوب الفحص", toneClass: "text-rose-400 border-rose-500/35 bg-rose-500/10", barClass: "bg-gradient-to-l from-rose-500 to-red-600", fillPercent: 20, isHttps };
  };

  const statCards = [
    { label: "إجمالي تقارير الرصد", sub: "ملف تحقق موثق في السجل", value: stats.total, icon: Database, iconClass: "text-[var(--gold)]", cardClass: "border-[var(--border)] bg-[var(--surface)]/90 text-[var(--text)]", barClass: "from-[#590018] via-rose-500 to-[var(--gold)]", subClass: "text-[var(--text-muted)]" },
    { label: "ادعاءات زائفة", sub: "تزوير أو توليد اصطناعي", value: stats.fakeCount, icon: XCircle, iconClass: "text-rose-400", cardClass: "border-rose-500/35 bg-gradient-to-br from-[#16060B]/95 to-[#0E0407]/95 text-white", barClass: "from-rose-600 to-red-400", subClass: "text-rose-200/75" },
    { label: "مضللة وخارج السياق", sub: "مجتزأة أو معاد تدويرها", value: stats.misleadingCount, icon: AlertTriangle, iconClass: "text-amber-500", cardClass: "border-amber-500/30 bg-[var(--surface)]/90 text-[var(--text)]", barClass: "from-amber-500 to-[var(--gold)]", subClass: "text-[var(--text-muted)]" },
    { label: "ادعاءات موثقة", sub: "مطابقة للمصادر الرسمية", value: stats.verifiedCount, icon: ShieldCheck, iconClass: "text-emerald-500", cardClass: "border-emerald-500/30 bg-[var(--surface)]/90 text-[var(--text)]", barClass: "from-emerald-500 to-teal-400", subClass: "text-[var(--text-muted)]" },
  ];

  return (
    <div dir="rtl" className="space-y-10">
      <style>{`
        @keyframes osintScanLine { 0% { transform: translateY(-100%); opacity: 0; } 15%, 85% { opacity: 0.9; } 100% { transform: translateY(520%); opacity: 0; } }
        @keyframes forensicReveal { 0% { opacity: 0; transform: translateY(10px) scale(0.99); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes radarSweep { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes radarPulse { 0%, 100% { transform: scale(0.94); opacity: 0.55; } 50% { transform: scale(1.06); opacity: 0.18; } }
        .osint-scan-beam { animation: osintScanLine 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        .forensic-reveal { animation: forensicReveal 0.36s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .radar-sweep { animation: radarSweep 3.2s linear infinite; }
        .radar-pulse { animation: radarPulse 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .osint-scan-beam, .forensic-reveal, .radar-sweep, .radar-pulse { animation: none !important; } }
      `}</style>

      {/* 0. لوحة إحصاءات الرصد الجنائي */}
      <section aria-label="إحصاءات تقارير التحقق" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const CardIcon = card.icon;
          return (
            <div key={card.label} className={`rounded-3xl border backdrop-blur-md p-5 shadow-lg relative overflow-hidden ${card.cardClass}`}>
              <div className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-l ${card.barClass}`} />
              <div className="flex items-center justify-between text-xs font-bold opacity-90">
                <span>{card.label}</span>
                <CardIcon className={`w-4 h-4 ${card.iconClass}`} />
              </div>
              <p className="mt-3 text-3xl font-black tabular-nums">{card.value}</p>
              <p className={`mt-1 text-[11px] ${card.subClass}`}>{card.sub}</p>
            </div>
          );
        })}
      </section>

      {/* 1. مختبر الفحص الحقيقي (OSINT URL & Archive Check) */}
      <section className="relative overflow-hidden rounded-3xl border border-rose-500/35 bg-[var(--surface)]/95 backdrop-blur-xl p-6 md:p-8 shadow-2xl space-y-6">
        {verifying && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-3xl">
            <div className="osint-scan-beam h-14 w-full bg-gradient-to-b from-transparent via-rose-500/20 to-transparent border-b-2 border-rose-500/70 shadow-[0_0_24px_rgba(244,63,94,0.45)]" />
          </div>
        )}

        <div className="relative z-20 flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 text-[11px] font-black">
              <Activity className="w-3.5 h-3.5" />
              <span>محرك الفحص الاستقصائي المباشر · OSINT</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[var(--text)] flex items-center gap-2.5">
              <FileSearch className="w-6 h-6 text-rose-500" />
              <span>مختبر الفحص المباشر للروابط والادعاءات</span>
            </h2>
            <p className="text-xs text-[var(--text-muted)] max-w-2xl leading-relaxed">
              أدخل رابط خبر أو نص ادعاء ليقوم النظام بمطابقته لحظياً مع قاعدة بيانات تقارير التحقق وأرشيف المصادر المعتمدة، أو فحص النطاق والعنوان الفعلي للرابط.
            </p>
          </div>
          {verifyResult && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border border-rose-500/25 bg-[var(--bg)] text-[11px] font-mono text-[var(--text-muted)]">
              <Clock className="w-3.5 h-3.5 text-rose-500" />
              <span>{new Date(verifyResult.checkedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}</span>
            </span>
          )}
        </div>

        <form onSubmit={handleVerify} className="relative z-20 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-rose-500/70 absolute start-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="ألصق رابطاً (https://...) أو اكتب كلمة من الخبر المراد فحصه..."
              className="w-full ps-11 pe-4 py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text)] focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={verifying || queryInput.trim().length < 4}
            className="px-7 py-3.5 rounded-2xl bg-gradient-to-l from-[#590018] via-rose-700 to-rose-600 hover:from-[#730020] hover:to-rose-500 text-white text-xs font-black flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0 shadow-[0_8px_24px_-6px_rgba(225,29,72,0.5)] transition-all"
          >
            {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />}
            <span>{verifying ? "جارٍ المسح الجنائي..." : "ابدأ الفحص المباشر"}</span>
          </button>
        </form>

        {(verifying || verifyResult) && (
          <div className="relative z-20 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {INVESTIGATION_STEPS.map((step) => {
              const isCompleted = !verifying && verifyResult !== null ? true : activeStep > step.id;
              const isCurrent = verifying && activeStep === step.id;
              return (
                <div key={step.id} className={`rounded-2xl border p-3.5 transition-all duration-300 flex items-start gap-3 ${isCompleted ? "border-emerald-500/35 bg-emerald-500/10" : isCurrent ? "border-rose-500/50 bg-rose-500/10 shadow-[0_0_16px_-4px_rgba(244,63,94,0.35)]" : "border-[var(--border)] bg-[var(--bg)]/60 opacity-65"}`}>
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-black ${isCompleted ? "bg-emerald-500 text-white" : isCurrent ? "bg-rose-600 text-white" : "bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)]"}`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : isCurrent ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : step.id}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black text-[var(--text)]">{step.label}</p>
                    <p className="text-[11px] text-[var(--text-muted)] leading-snug mt-0.5">{step.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {verifyError && (
          <div className="relative z-20 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-xs font-bold text-rose-400 flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 shrink-0" />
            <span>{verifyError}</span>
          </div>
        )}

        {verifyResult && (
          <div className="relative z-20 rounded-2xl border border-rose-500/25 bg-[var(--bg)]/95 p-5 md:p-6 space-y-5 forensic-reveal">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
              <div className="flex items-center gap-2 text-xs font-black text-[var(--text)]">
                <Sparkles className="w-4 h-4 text-[var(--gold)]" />
                <span>نتائج التحليل الفوري للاستعلام:</span>
                <span className="font-mono text-rose-400 break-all">{verifyResult.query}</span>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)]">
                {verifyResult.isUrl ? "فحص رابط خارجي" : "بحث نصي في السجل"}
              </span>
            </div>

            {verifyResult.urlInspection && (() => {
              const inspection = verifyResult.urlInspection;
              const rep = getDomainReputation(inspection, verifyResult.query);
              const ProtocolIcon = rep.isHttps ? Lock : Unlock;
              return (
                <div className="p-4 md:p-5 rounded-2xl border border-rose-500/30 bg-gradient-to-br from-[#16060B] to-[#0E0407] text-white space-y-4 shadow-inner">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-xs font-black text-rose-300">
                      <Globe className="w-4 h-4 text-[var(--gold)]" />
                      <span>بطاقة فحص النطاق واستجابة الخادم الفعلي</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl border text-[11px] font-bold ${rep.toneClass}`}>
                        <ProtocolIcon className="w-3 h-3" /><span>{rep.label}</span>
                      </span>
                      <span className="font-mono text-xs font-black px-2.5 py-1 rounded-xl bg-white/10 border border-white/15">HTTP {inspection.status ?? "N/A"}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-stone-300">
                      <span>مؤشر الجاهزية والبروتوكول الأمني للنطاق</span>
                      <span className="font-mono font-bold text-[var(--gold)]">{rep.fillPercent}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-700 ${rep.barClass}`} style={{ width: `${rep.fillPercent}%` }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-3 space-y-1">
                      <span className="text-[11px] text-stone-400 block">النطاق (Domain)</span>
                      <span className="font-mono font-bold text-white break-all">{inspection.domain || "غير معروف"}</span>
                    </div>
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-3 space-y-1">
                      <span className="text-[11px] text-stone-400 block">حالة الاتصال ونوع المحتوى</span>
                      <span className="font-bold text-white">
                        {inspection.reachable ? "الرابط متاح ويستجيب" : "تعذر الوصول للرابط"}
                        {inspection.contentType ? ` · ${inspection.contentType.split(";")[0]}` : ""}
                      </span>
                    </div>
                  </div>
                  {inspection.title && (
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-3 text-xs space-y-1">
                      <span className="text-[11px] text-[var(--gold)] font-bold block">العنوان المستخرج من الصفحة:</span>
                      <p className="font-bold text-stone-100 leading-relaxed">{inspection.title}</p>
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <h3 className="text-xs font-black text-rose-500 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>التطابقات في سجل تقارير التحقق ({verifyResult.matchedFactChecks.length})</span>
                </h3>
                {verifyResult.matchedFactChecks.length > 0 ? verifyResult.matchedFactChecks.map((fc) => (
                  <Link key={fc.id} href={`/fact-check/${fc.slug}`} className="block p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-rose-500/50 transition-all space-y-1.5 group">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-500 border border-rose-500/30">{fc.verdictLabel}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-rose-500 transition-colors" />
                    </div>
                    <p className="text-xs font-black text-[var(--text)] line-clamp-2">{fc.claim}</p>
                    <p className="text-[11px] text-[var(--text-muted)] line-clamp-2">{fc.summary}</p>
                  </Link>
                )) : (
                  <div className="p-4 rounded-2xl border border-dashed border-[var(--border)] text-xs text-[var(--text-muted)]">لا يوجد تقرير تحقق سابق مطابق تماماً في السجل.</div>
                )}
              </div>

              <div className="space-y-2.5">
                <h3 className="text-xs font-black text-emerald-500 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4" />
                  <span>المواد الموثقة ذات الصلة بالأرشيف ({verifyResult.matchedArticles.length})</span>
                </h3>
                {verifyResult.matchedArticles.length > 0 ? verifyResult.matchedArticles.map((art) => (
                  <Link key={art.id} href={`/article/${art.id}/${art.slug}`} className="block p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-emerald-500/50 transition-all space-y-1.5 group">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">{art.sourceName}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <p className="text-xs font-black text-[var(--text)] line-clamp-2">{art.titleAr}</p>
                  </Link>
                )) : (
                  <div className="p-4 rounded-2xl border border-dashed border-[var(--border)] text-xs text-[var(--text-muted)]">لم يتم العثور على مواد منشورة بهذه الكلمات.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2. أرشيف تقارير التحقق المعتمدة */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
          <h2 className="text-2xl font-black text-[var(--text)] flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-rose-500" />
            <span>سجل تقارير التحقق وكشف التضليل ({filtered.length})</span>
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            {VERDICT_FILTERS.map((f) => {
              const isActive = filterVerdict === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilterVerdict(f.id)}
                  className={`px-3.5 py-2 rounded-2xl cursor-pointer transition-all duration-200 inline-flex items-center gap-1.5 ${
                    isActive ? "bg-gradient-to-l from-[#590018] to-rose-600 text-white shadow-[0_6px_18px_-4px_rgba(225,29,72,0.55)] scale-[1.02]" : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:border-rose-500/40 hover:text-[var(--text)]"
                  }`}
                >
                  <span>{f.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-[var(--bg)] text-[var(--text-muted)]"}`}>
                    {filterCounts[f.id] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-rose-500/25 bg-[var(--surface)]/80 backdrop-blur-md p-12 text-center space-y-4">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="radar-pulse absolute inset-0 rounded-full border border-rose-500/40" />
              <div className="absolute inset-3 rounded-full border border-rose-500/25" />
              <div className="radar-sweep absolute inset-1 rounded-full bg-[conic-gradient(from_0deg,rgba(244,63,94,0.35),transparent_55%)]" />
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-[#16060B] border border-rose-500/40 flex items-center justify-center shadow-lg">
                <Radar className="w-6 h-6 text-rose-400" />
              </div>
            </div>
            <div className="space-y-1.5 max-w-md mx-auto">
              <p className="font-black text-base text-[var(--text)]">لا توجد تقارير تحقق منشورة ضمن هذا التصنيف في قاعدة البيانات حالياً</p>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">يمكنك استخدام مختبر الفحص المباشر أعلاه لتحليل أي رابط خارجي أو البحث في الأرشيف الموثق فوراً.</p>
            </div>
          </div>
        ) : (
          <div key={filterVerdict} className="grid grid-cols-1 lg:grid-cols-2 gap-6 forensic-reveal">
            {filtered.map((item) => {
              const st = verdictStyle(item.verdict);
              const Icon = st.icon;
              const isExpanded = Boolean(expandedIds[item.id]);
              const isCopied = copiedId === item.id;

              return (
                <article key={item.id} className="group relative overflow-hidden rounded-3xl border border-[var(--border)] hover:border-rose-500/45 bg-[var(--surface)]/85 backdrop-blur-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between gap-5">
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-l ${st.accentBar} opacity-80`} />
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${st.badge} ${st.glow}`}>
                          <Icon className="w-3.5 h-3.5" /><span>{item.verdictLabel}</span>
                        </span>
                        {item.category && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]">
                            <Tag className="w-3 h-3 text-rose-500" /><span>{item.category}</span>
                          </span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[11px] font-mono text-[var(--text-muted)]">
                        <Clock className="w-3 h-3 text-[var(--gold)]" /><span>{item.date}</span>
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-black text-base md:text-lg text-[var(--text)] leading-snug">{item.claim}</h3>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.summary}</p>
                    </div>

                    {item.evidences && item.evidences.length > 0 && (
                      <div className="rounded-2xl border border-rose-500/20 bg-[var(--bg)]/80 p-4 space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] font-black text-rose-500">
                          <span className="flex items-center gap-1.5"><Microscope className="w-3.5 h-3.5" /><span>أدلة الفحص الجنائي ({item.evidences.length})</span></span>
                          <span className="text-[var(--text-muted)] font-bold">منهجية OSINT</span>
                        </div>
                        <div className="space-y-2">
                          {item.evidences.map((ev, idx) => {
                            const evMeta = evidenceStatusMeta(ev.status);
                            const EvIcon = evMeta.icon;
                            return (
                              <div key={`${item.id}-ev-${idx}`} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-3 space-y-1.5">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="text-[11px] font-black text-[var(--text)]">{ev.tool}</span>
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black border ${evMeta.badge}`}>
                                    <EvIcon className="w-3 h-3" /><span>{evMeta.label}</span>
                                  </span>
                                </div>
                                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{ev.finding}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {item.fullAnalysis && (
                      <div className="space-y-3">
                        <button type="button" onClick={() => toggleExpanded(item.id)} aria-expanded={isExpanded} className="w-full px-4 py-2.5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-rose-500/40 text-xs font-black text-[var(--text)] flex items-center justify-between cursor-pointer transition-colors">
                          <span className="flex items-center gap-2"><Eye className="w-3.5 h-3.5 text-rose-500" /><span>{isExpanded ? "إخفاء التحليل الكامل" : "عرض التحليل الجنائي الكامل"}</span></span>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-rose-500" /> : <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />}
                        </button>
                        {isExpanded && (
                          <div className="rounded-2xl border border-rose-500/25 bg-[var(--bg)]/90 p-4 space-y-3 forensic-reveal text-xs">
                            <p className="text-[var(--text)] leading-relaxed whitespace-pre-line">{item.fullAnalysis}</p>
                            {item.claimSource && <p className="text-[11px] text-[var(--text-muted)]"><strong className="text-[var(--text)]">مصدر تداول الادعاء:</strong> {item.claimSource}</p>}
                            {item.sourceProof && <p className="text-[11px] text-[var(--text-muted)]"><strong className="text-[var(--text)]">المرجع التحققي:</strong> {item.sourceProof}</p>}
                          </div>
                        )}
                      </div>
                    )}

                    {item.officialSources && item.officialSources.length > 0 && (
                      <div className="space-y-2">
                        <span className="text-[11px] font-black text-[var(--text-muted)] flex items-center gap-1.5">
                          <Link2 className="w-3.5 h-3.5 text-[var(--gold)]" /><span>المصادر والمراجع الرسمية</span>
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {item.officialSources.map((src, idx) =>
                            /^https?:\/\//i.test(src.url) ? (
                              <a key={`${item.id}-src-${idx}`} href={src.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--gold)]/60 text-[11px] font-bold text-[var(--text)] transition-colors">
                                <ExternalLink className="w-3 h-3 text-[var(--gold)] shrink-0" /><span>{src.name}</span>
                                {src.date && <span className="text-[10px] text-[var(--text-muted)]">({src.date})</span>}
                              </a>
                            ) : (
                              <Link key={`${item.id}-src-${idx}`} href={src.url} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-rose-500/50 text-[11px] font-bold text-[var(--text)] transition-colors">
                                <FileCheck2 className="w-3 h-3 text-rose-500 shrink-0" /><span>{src.name}</span>
                                {src.date && <span className="text-[10px] text-[var(--text-muted)]">({src.date})</span>}
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3.5 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-[11px] text-[var(--text-muted)] truncate max-w-[260px]">المدقق: {item.reviewedBy}</span>
                    <div className="flex items-center gap-2 ms-auto">
                      <button type="button" onClick={() => handleShareReport(item)} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-[11px] font-black cursor-pointer transition-all ${isCopied ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400" : "border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:border-rose-500/40 hover:text-[var(--text)]"}`}>
                        {isCopied ? <><Check className="w-3.5 h-3.5" /><span>تم النسخ</span></> : <><Share2 className="w-3.5 h-3.5" /><span>مشاركة التقرير</span></>}
                      </button>
                      <Link href={`/fact-check/${item.slug || item.id}`} className="font-black text-rose-500 hover:text-rose-400 hover:underline inline-flex items-center gap-1">
                        <span>تقرير التحقيق الكامل</span><ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}