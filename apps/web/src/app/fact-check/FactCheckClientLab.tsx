"use client";

import { useState } from "react";
import Link from "next/link";
import type { FactCheckItem } from "@/data/factChecks";
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Loader2,
  Globe,
  FileSearch,
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

export function FactCheckClientLab({ initialItems }: { initialItems: FactCheckItem[] }) {
  const [filterVerdict, setFilterVerdict] = useState<string>("all");
  const [queryInput, setQueryInput] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<OsintVerifyResult | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);

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
      if (res.ok) {
        setVerifyResult(json);
      } else {
        setVerifyError(json?.error || "تعذر إجراء الفحص الآن.");
      }
    } catch {
      setVerifyError("تعذر الاتصال بخادم التحقق.");
    } finally {
      setVerifying(false);
    }
  };

  const filtered =
    filterVerdict === "all"
      ? initialItems
      : initialItems.filter((it) => it.verdict === filterVerdict);

  const verdictStyle = (verdict: string) => {
    if (verdict === "fake") {
      return { icon: XCircle, badge: "bg-red-500/15 text-red-500 border-red-500/30" };
    }
    if (verdict === "misleading" || verdict === "out-of-context" || verdict === "out_of_context") {
      return { icon: AlertTriangle, badge: "bg-amber-500/15 text-amber-500 border-amber-500/30" };
    }
    return { icon: CheckCircle2, badge: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30" };
  };

  return (
    <div className="space-y-12">
      {/* 1. مختبر الفحص الحقيقي (OSINT URL & Archive Check) */}
      <section className="rounded-3xl border border-rose-500/30 bg-[var(--surface)] p-6 md:p-8 shadow-lg space-y-6">
        <div className="space-y-1.5">
          <h2 className="text-xl font-black text-[var(--text)] flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-rose-500" />
            <span>مختبر الفحص المباشر للروابط والادعاءات</span>
          </h2>
          <p className="text-xs text-[var(--text-muted)]">
            أدخل رابط خبر أو نص ادعاء ليقوم النظام بمطابقته لحظياً مع قاعدة بيانات تقارير التحقق وأرشيف المصادر المعتمدة، أو فحص النطاق والعنوان الفعلي للرابط.
          </p>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute start-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="ألصق رابطاً (https://...) أو اكتب كلمة من الخبر المراد فحصه..."
              className="w-full ps-11 pe-4 py-3.5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text)] focus:border-rose-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={verifying || queryInput.trim().length < 4}
            className="px-7 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
          >
            {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
            <span>{verifying ? "جارٍ الفحص الفعلي..." : "ابدأ الفحص المباشر"}</span>
          </button>
        </form>

        {verifyError && (
          <p className="text-xs font-bold text-rose-500">{verifyError}</p>
        )}

        {verifyResult && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 space-y-5 animate-in fade-in duration-200">
            {verifyResult.urlInspection && (
              <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-indigo-500">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    <span>نتيجة فحص الخادم والنطاق الفعلي للرابط</span>
                  </span>
                  <span className="font-mono">
                    HTTP {verifyResult.urlInspection.status ?? "N/A"}
                  </span>
                </div>
                <div className="text-xs text-[var(--text)] space-y-1">
                  <p><strong>النطاق (Domain):</strong> {verifyResult.urlInspection.domain || "غير معروف"}</p>
                  <p>
                    <strong>الحالة:</strong>{" "}
                    {verifyResult.urlInspection.reachable ? "الرابط متاح ويستجيب" : "تعذر الوصول للرابط"}
                  </p>
                  {verifyResult.urlInspection.title && (
                    <p><strong>العنوان المستخرج من الصفحة:</strong> {verifyResult.urlInspection.title}</p>
                  )}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-xs font-black text-rose-500">
                  التطابقات في سجل تقارير التحقق ({verifyResult.matchedFactChecks.length})
                </h3>
                {verifyResult.matchedFactChecks.length > 0 ? (
                  verifyResult.matchedFactChecks.map((fc) => (
                    <Link
                      key={fc.id}
                      href={`/fact-check/${fc.slug}`}
                      className="block p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-rose-500/40 space-y-1"
                    >
                      <span className="text-[10px] font-black text-rose-500">{fc.verdictLabel}</span>
                      <p className="text-xs font-bold text-[var(--text)] line-clamp-2">{fc.claim}</p>
                    </Link>
                  ))
                ) : (
                  <p className="text-xs text-[var(--text-muted)]">لا يوجد تقرير تحقق سابق مطابق تماماً في السجل.</p>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-black text-emerald-500">
                  المواد الموثقة ذات الصلة بالأرشيف ({verifyResult.matchedArticles.length})
                </h3>
                {verifyResult.matchedArticles.length > 0 ? (
                  verifyResult.matchedArticles.map((art) => (
                    <Link
                      key={art.id}
                      href={`/article/${art.id}/${art.slug}`}
                      className="block p-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-emerald-500/40 space-y-1"
                    >
                      <span className="text-[10px] font-bold text-emerald-500">{art.sourceName}</span>
                      <p className="text-xs font-bold text-[var(--text)] line-clamp-2">{art.titleAr}</p>
                    </Link>
                  ))
                ) : (
                  <p className="text-xs text-[var(--text-muted)]">لم يتم العثور على مواد منشورة بهذه الكلمات.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2. أرشيف تقارير التحقق المعتمدة */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
          <h2 className="text-2xl font-black text-[var(--text)] flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-600" />
            <span>سجل تقارير التحقق وكشف التضليل ({filtered.length})</span>
          </h2>

          <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
            {[
              { id: "all", label: "الكل" },
              { id: "fake", label: "زائف" },
              { id: "misleading", label: "مضلل" },
              { id: "out-of-context", label: "خارج السياق" },
              { id: "true", label: "موثق" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterVerdict(f.id)}
                className={`px-3 py-1.5 rounded-xl cursor-pointer transition-colors ${
                  filterVerdict === f.id
                    ? "bg-rose-600 text-white"
                    : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => {
            const st = verdictStyle(item.verdict);
            const Icon = st.icon;
            return (
              <article
                key={item.id}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${st.badge}`}>
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.verdictLabel}</span>
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">{item.date}</span>
                  </div>

                  <h3 className="font-black text-base text-[var(--text)] leading-snug">
                    {item.claim}
                  </h3>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)]">المدقق: {item.reviewedBy}</span>
                  <Link
                    href={`/fact-check/${item.slug}`}
                    className="font-black text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>تقرير التحقيق الكامل</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
