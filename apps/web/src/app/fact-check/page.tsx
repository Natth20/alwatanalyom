import Link from "next/link";
import { ShieldAlert, CheckCircle2, XCircle, AlertTriangle, Search, Filter, Sparkles, ArrowLeft, Send, Check } from "lucide-react";
import { Metadata } from "next";
import { FACT_CHECKS, FactCheckItem } from "@/data/factChecks";

export const metadata: Metadata = {
  title: "رادار الحقيقة · مرصد مكافحة الشائعات والتضليل — الوطن اليوم",
  description: "المرصد الرقمي المعتمد لكشف الأخبار المضللة، الصور المزيفة والمولدة بالذكاء الاصطناعي، وتقديم الأدلة والبراهين الموثقة.",
};

export default function FactCheckIndexPage() {
  return (
    <div className="container-custom py-10 max-w-5xl mx-auto space-y-10">
      {/* الترويسة الرئيسية للمرصد */}
      <div className="relative rounded-2xl overflow-hidden border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-[var(--surface)] to-[var(--surface)] p-6 md:p-10 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-600 animate-pulse" />
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                مرصد مكافحة التضليل الصحفي
              </span>
              <span className="text-[10px] bg-rose-500/10 text-rose-600 px-2.5 py-0.5 rounded-full font-bold">
                تحقق رقمي مستقل
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-[var(--text)] tracking-tight">
              رادار الحقيقة · مرصد «الوطن اليوم» لفحص الأخبار والشائعات
            </h1>

            <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
              وحدة رصد رقمية وتقنية تعتمد على التحقيق بالاستعانة بمصادر مفتوحة (OSINT) والبحث العكسي وفحص البيانات الأصلية لحماية المجتمع من التضليل.
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-2">
            <div className="px-5 py-3 rounded-xl bg-rose-600 text-white text-xs font-bold text-center shadow-md">
              <ShieldAlert className="w-5 h-5 mx-auto mb-1" />
              <span>أكثر من 340 شائعة تم دحضها بالأدلة</span>
            </div>
          </div>
        </div>
      </div>

      {/* معايير وأختام التحقق */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/5 flex items-center gap-2.5">
          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <div>
            <strong className="block text-[var(--text)]">خبر زائف كلياً</strong>
            <span className="text-[10px] text-[var(--text-muted)]">معلومات مختلقة لا أساس لها</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <strong className="block text-[var(--text)]">مضلل ومجتزأ</strong>
            <span className="text-[10px] text-[var(--text-muted)]">صحيح جزئياً مع تحريف السياق</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-blue-500/30 bg-blue-500/5 flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
          <div>
            <strong className="block text-[var(--text)]">مولد بالذكاء الاصطناعي</strong>
            <span className="text-[10px] text-[var(--text-muted)]">صور ومقاطع مركبة رقمياً</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-purple-500/30 bg-purple-500/5 flex items-center gap-2.5">
          <Filter className="w-5 h-5 text-purple-600 shrink-0" />
          <div>
            <strong className="block text-[var(--text)]">خارج السياق الزمني</strong>
            <span className="text-[10px] text-[var(--text-muted)]">أحداث قديمة يُعاد تدويرها</span>
          </div>
        </div>
      </div>

      {/* قائمة المواد المفحوصة والمحققة */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <h2 className="text-xl font-bold text-[var(--text)]">
            أحدث التحقيقات وتقارير دحض الشائعات
          </h2>
          <span className="text-xs text-[var(--text-muted)]">
            مرتبة حسب الأحدث
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FACT_CHECKS.map((item) => (
            <article
              key={item.id}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-rose-500/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span
                    className={`px-3 py-1 rounded-full font-bold text-[11px] flex items-center gap-1.5 ${
                      item.verdict === "fake"
                        ? "bg-rose-500/15 text-rose-600 border border-rose-500/20"
                        : item.verdict === "misleading"
                        ? "bg-amber-500/15 text-amber-600 border border-amber-500/20"
                        : "bg-purple-500/15 text-purple-600 border border-purple-500/20"
                    }`}
                  >
                    {item.verdict === "fake" && <XCircle className="w-3.5 h-3.5" />}
                    {item.verdict === "misleading" && <AlertTriangle className="w-3.5 h-3.5" />}
                    {item.verdict === "out-of-context" && <Filter className="w-3.5 h-3.5" />}
                    <span>{item.verdictLabel}</span>
                  </span>

                  <span className="text-[11px] text-[var(--text-muted)] font-mono">
                    {item.date}
                  </span>
                </div>

                <h3 className="font-bold text-base md:text-lg text-[var(--text)] group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors leading-snug">
                  <Link href={`/fact-check/${item.id}`}>
                    «{item.claim}»
                  </Link>
                </h3>

                <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[var(--text-muted)] truncate max-w-[200px]">
                  الإثبات: {item.sourceProof}
                </span>

                <Link
                  href={`/fact-check/${item.id}`}
                  className="font-bold text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1 shrink-0"
                >
                  <span>تقرير التحقق الكامل</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
