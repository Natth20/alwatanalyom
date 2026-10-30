"use client";

import { useState } from "react";
import { ShieldAlert, Search, CheckCircle2, XCircle, AlertTriangle, Send, Sparkles } from "lucide-react";

interface FactCheckItem {
  id: string;
  claim: string;
  verdict: "fake" | "misleading" | "verified";
  verdictText: string;
  explanation: string;
  sourceProof: string;
  date: string;
}

const RECENT_FACT_CHECKS: FactCheckItem[] = [
  {
    id: "fc-1",
    claim: "مزاعم متداولة عن اتفاق وشيك لفتح دائم لكافة المعابر دون شروط",
    verdict: "misleading",
    verdictText: "مضلل ومجتزأ",
    explanation: "المفاوضات لا تزال في أروقة الوسطاء ولم يصدر أي بيان رسمي عن الأطراف المعنية، والنص المتداول يعود لمسودة قديمة غير معتمدة.",
    sourceProof: "بيانات وزارة الخارجية المصرية والوسطاء الرسميين",
    date: "اليوم",
  },
  {
    id: "fc-2",
    claim: "صورة متداولة على وسائل التواصل تزعم أنها لاحتراق محطة كهرباء رئيسية بالقدس",
    verdict: "fake",
    verdictText: "زائف ومولد بالذكاء الاصطناعي",
    explanation: "الفحص التقني لصورة الحريق أثبت أنها مولدة عبر برامج التوليد الصوري (AI Generated)، ولم تسجل طواقم الدفاع المدني أو شركة الكهرباء أي حادث يذكر.",
    sourceProof: "الفحص الرقمي لمعاملات الصورة — وحدة التحقق في الوطن اليوم",
    date: "أمس",
  },
];

export function AskNewsroomWidget() {
  const [claimText, setClaimText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimText.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-rose-700 text-white flex items-center justify-center shadow-md">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black text-[var(--text)]">
                رادار الحقيقة · كشف الشائعات وفحص الأخبار
              </h2>
              <span className="text-[10px] font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400 px-2.5 py-0.5 rounded-full">
                مكافحة التضليل
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              وحدة رصد متقدمة لفحص صحة الأخبار والصور المتداولة وتقديم الإثباتات الموثقة
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* قائمة أحدث المواد المفحوصة */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[var(--text-muted)] block mb-1">
            أحدث الشائعات التي تم دحضها بالأدلة:
          </span>

          {RECENT_FACT_CHECKS.map((fc) => (
            <div
              key={fc.id}
              className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-2.5 hover:border-rose-500/40 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                    fc.verdict === "fake"
                      ? "bg-rose-500/15 text-rose-600"
                      : "bg-amber-500/15 text-amber-600"
                  }`}
                >
                  {fc.verdict === "fake" ? (
                    <XCircle className="w-3 h-3" />
                  ) : (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                  <span>{fc.verdictText}</span>
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">{fc.date}</span>
              </div>

              <h3 className="font-bold text-sm text-[var(--text)] leading-snug">
                «{fc.claim}»
              </h3>

              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {fc.explanation}
              </p>

              <div className="pt-2 border-t border-[var(--border)]/70 text-[10px] text-[var(--primary)] font-semibold">
                الإثبات المعتمد: {fc.sourceProof}
              </div>
            </div>
          ))}
        </div>

        {/* نموذج إرسال شائعة للتدقيق */}
        <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg)] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-base text-[var(--text)]">
                وصلتك معلومة أو منشور مشكوك فيه؟
              </h3>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
              أرسل نص الخبر أو الرابط المشبوه لفريق التحقق والتدقيق الصحفي لفحصه ونشر بيان رسمي موثق حوله.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-sm text-[var(--text)]">تم استلام طلب التحقق</h4>
                <p className="text-xs text-[var(--text-muted)]">
                  شكراً لمساهمتك في حماية الفضاء العام من التضليل. يقوم محررونا بالتحقق من المصادر الآن.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <textarea
                  rows={4}
                  required
                  value={claimText}
                  onChange={(e) => setClaimText(e.target.value)}
                  placeholder="انسخ نص المنشور أو الخبر المشبوه هنا..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)] resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إرسال للتحقق الفوري لدى التحرير</span>
                </button>
              </form>
            )}
          </div>

          <div className="pt-3 border-t border-[var(--border)] text-[10px] text-[var(--text-muted)]">
            🔒 كافة البلاغات مجهولة المصدر ويتم التعامل معها وفق أعلى معايير الخصوصية.
          </div>
        </div>
      </div>
    </section>
  );
}
