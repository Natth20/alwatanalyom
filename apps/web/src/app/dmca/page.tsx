"use client";

import { useState } from "react";
import Link from "next/link";
import { InstitutionalNav } from "@/components/InstitutionalNav";
import {
  ShieldCheck,
  Scale,
  FileText,
  AlertCircle,
  CheckCircle2,
  Send,
  Mail,
  Clock,
  ExternalLink,
  Award,
  Lock,
  Gavel,
  BookOpen,
  AlertTriangle,
  FileCheck2,
  HelpCircle,
  Sparkles,
  Info,
} from "lucide-react";

export default function DmcaPage() {
  const [claimantName, setClaimantName] = useState("");
  const [claimantEmail, setClaimantEmail] = useState("");
  const [infringingUrl, setInfringingUrl] = useState("");
  const [originalWorkUrl, setOriginalWorkUrl] = useState("");
  const [requestedAction, setRequestedAction] = useState("takedown");
  const [statementChecked, setStatementChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statementChecked) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/v1/dmca", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          claimantName,
          claimantEmail,
          infringingUrl,
          originalWorkUrl,
          requestedAction,
        }),
      });
      const json = await res.json();
      if (res.ok && json.ticketCode) {
        setSubmittedTicket(json.ticketCode);
        setClaimantName("");
        setClaimantEmail("");
        setInfringingUrl("");
        setOriginalWorkUrl("");
        setStatementChecked(false);
      } else {
        setSubmitError(
          json?.error?.message ||
            "تعذر إرسال الإشعار، يرجى التحقق من صحة الروابط والبريد الإلكتروني."
        );
      }
    } catch {
      setSubmitError("تعذر الاتصال بالدائرة القانونية حالياً. يرجى المحاولة لاحقاً.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 selection:text-white pb-24">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="dmca" />

      {/* 1. Hero Header السينمائي الفاخر */}
      <section className="relative overflow-hidden border-b border-[var(--gold)]/20 bg-gradient-to-b from-[#1b020a] via-[#140006] to-[#0E0407] py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/12 via-rose-950/20 to-transparent pointer-events-none" />

        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-black shadow-lg shadow-amber-950/20">
            <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
            <span>حماية الملكية الفكرية الرقمية وميثاق الحقوق المعرفية</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            حقوق النشر والملكية الفكرية (DMCA)
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-3xl mx-auto leading-relaxed">
            نحترم حقوق المؤلفين، المصورين، والوكالات الإخبارية في كل مكان. إذا كنت تعتقد بحسن نية أن مادة منشورة على منصة «الوطن اليوم» تنتهك حقوقك الفكرية، يرجى تقديم إشعار رسمي لنقوم بالتحقق الفوري والبت فيه بحيادية خلال أقل من 24 ساعة عمل.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block me-1.5 animate-pulse" />
              SLA الاستجابة القانونية: أقل من 24 ساعة
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-mono">
              البريد المعتمد: legal@alwatantoday.net
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* 2. دليل الاستخدام الصحفي المشروع وتعهد البت القانوني السريع */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/40">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">دليل الاستخدام الصحفي المشروع (Fair Use)</h3>
                <span className="text-[11px] text-stone-400">معايير الاقتباس المصرح بها قانونياً</span>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-stone-300 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>يجوز للمؤسسات التعليمية والباحثين الاستشهاد بالتقارير دون إذن مسبق مع العزو الصريح ورابط المادة.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>الصور التي تحمل وسم «الوطن اليوم» أو أسماء مصورينا في غزة والقدس تخضع لترخيص النشر المعتمد ولا يجوز بيعها.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>يُحظر الاستخدام التجاري للخرائط الرقمية وقواعد بيانات أطلس القرى المهجرة ورادار الأسواق دون موافقة كتابية.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/40">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">بروتوكول البت والتدقيق السريع</h3>
                <span className="text-[11px] text-stone-400">آلية الاستجابة القانونية المنضبطة</span>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-stone-300 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>مراجعة الطلب من قبل المستشار القانوني لهيئة التحرير فور استلام الإشعار عبر النظام الآمن.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>حجب المادة موقتاً كإجراء احترازي فوري أثناء التحقق من ملكية المصنف الأصلي في حال وجود شبهة انتهاك.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span>الرد النهائي الرسمي مع بيان الإجراء المتخذ إلى البريد المعتمد خلال موعد أقصاه 24 ساعة عمل.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. شروط الإشعار القانوني الرسمي */}
        <div className="p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/10 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--gold)]">
            <Info className="w-4 h-4" />
            <span>الشروط الإلزامية لصحة إشعار DMCA وفق القوانين المعمول بها</span>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            يجب أن يشتمل الإشعار على: تحديد دقيق للعمل المحمي، الرابط المتنازع عليه على موقعنا، وسيلة اتصال رسمية بصاحب الحق، وتصريح بحسن النية بأن استخدام المادة غير مصرح به من المالك أو وكيله أو القانون.
          </p>
        </div>

        {/* 4. استمارة تقديم إشعار انتهاك DMCA الإلكتروني المشفر */}
        <section className="rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-b from-[#1c020a] via-[#140006] to-[#0E0407] p-6 sm:p-9 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4 space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--gold)]">
              <Gavel className="w-4 h-4" />
              <span>النموذج القانوني الموحد لإخطارات الألفية الرقمية</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              تقديم إشعار انتهاك حقوق الملكية الفكرية
            </h3>
            <p className="text-xs text-stone-400">
              يرجى تعبئة كافة الحقول بدقة لتسريع التحقق والبت القانوني من هيئة التحرير
            </p>
          </div>

          {submittedTicket ? (
            <div className="p-8 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-4 animate-in fade-in">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-black text-emerald-300">
                تم استلام إشعار DMCA بنجاح وتوليد رقم الملف القانوني!
              </h4>
              <p className="text-xs text-stone-200 max-w-md mx-auto leading-relaxed">
                رقم الملف القانوني المولد: <strong className="text-[var(--gold)] font-mono text-base">{submittedTicket}</strong>. تم تحويل الملف إلى المستشار القانوني وسيتواصل معك عبر بريدك الإلكتروني خلال 24 ساعة عمل.
              </p>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer hover:brightness-110 transition-all"
              >
                تقديم إشعار جديد
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-right">
              {submitError && (
                <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">
                    الاسم الكامل لصاحب الحق أو الوكيل القانوني *
                  </label>
                  <input
                    type="text"
                    required
                    value={claimantName}
                    onChange={(e) => setClaimantName(e.target.value)}
                    placeholder="الاسم الرسمي أو اسم المؤسسة / الوكالة..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">
                    البريد الإلكتروني المهني للتواصل *
                  </label>
                  <input
                    type="email"
                    required
                    value={claimantEmail}
                    onChange={(e) => setClaimantEmail(e.target.value)}
                    placeholder="legal@organization.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">
                    رابط المادة المتنازع عليها على موقعنا *
                  </label>
                  <input
                    type="url"
                    required
                    value={infringingUrl}
                    onChange={(e) => setInfringingUrl(e.target.value)}
                    placeholder="https://alwatantoday.net/article/..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">
                    رابط المصنف الأصلي أو دليل إثبات الملكية *
                  </label>
                  <input
                    type="url"
                    required
                    value={originalWorkUrl}
                    onChange={(e) => setOriginalWorkUrl(e.target.value)}
                    placeholder="رابط المصنف الأصلي على موقع صاحب الحق..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300">
                  الإجراء المطلوب من هيئة التحرير
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "takedown", label: "حذف المادة بالكامل" },
                    { id: "attribute", label: "تعديل الإسناد والعزو باسم المصدر" },
                    { id: "replace", label: "استبدال الصورة أو المرفق فقط" },
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-2 p-3.5 rounded-xl border cursor-pointer text-xs transition-colors ${
                        requestedAction === opt.id
                          ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)] font-bold shadow-xs"
                          : "border-white/10 bg-black/40 text-stone-300 hover:bg-white/5"
                      }`}
                    >
                      <input
                        type="radio"
                        name="action"
                        value={opt.id}
                        checked={requestedAction === opt.id}
                        onChange={() => setRequestedAction(opt.id)}
                        className="accent-[var(--gold)]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="statement"
                  checked={statementChecked}
                  onChange={(e) => setStatementChecked(e.target.checked)}
                  className="mt-1 accent-[var(--gold)] w-4 h-4 rounded cursor-pointer shrink-0"
                />
                <label
                  htmlFor="statement"
                  className="text-xs text-stone-300 leading-relaxed cursor-pointer"
                >
                  أقر بأنني المالك القانوني للمصنف الأصلي أو المفوض رسمياً للتصرف نيابة عنه، وأن جميع البيانات المدخلة صحيحة وتحت طائلة المسؤولية القانونية الكاملة.
                </label>
              </div>

              <button
                type="submit"
                disabled={!statementChecked || submitting}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-950/20 ${
                  statementChecked && !submitting
                    ? "bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-slate-950 hover:brightness-110 active:scale-95"
                    : "bg-white/10 text-stone-500 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
                <span>{submitting ? "جاري تشفير الإشعار وإرساله..." : "إرسال إشعار DMCA المعتمد"}</span>
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
