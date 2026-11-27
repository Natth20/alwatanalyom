"use client";

import { useState } from "react";
import Link from "next/link";
import InstitutionalNav from "@/components/InstitutionalNav";
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
  Check,
  Calculator,
  ArrowRight,
  RefreshCw,
  Copy,
} from "lucide-react";

export default function DmcaPage() {
  // Fair Use Calculator Interactive State
  const [calcPurpose, setCalcPurpose] = useState<"academic" | "news_critique" | "commercial">("academic");
  const [calcAttribution, setCalcAttribution] = useState<"full_link" | "name_only" | "none">("full_link");
  const [calcQuota, setCalcQuota] = useState<"under15" | "15to25" | "over25">("under15");
  const [calcContentType, setCalcContentType] = useState<"text" | "photo" | "database">("text");

  // Multi-step DMCA Filing Wizard
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [claimantName, setClaimantName] = useState("");
  const [claimantEmail, setClaimantEmail] = useState("");
  const [claimantRole, setClaimantRole] = useState("owner");
  const [infringingUrl, setInfringingUrl] = useState("");
  const [originalWorkUrl, setOriginalWorkUrl] = useState("");
  const [requestedAction, setRequestedAction] = useState("takedown");
  const [statementChecked, setStatementChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

  // Calculate Fair-Use Score
  const calculateFairUse = () => {
    let score = 0;
    if (calcPurpose === "academic") score += 35;
    else if (calcPurpose === "news_critique") score += 25;
    else score += 0;

    if (calcAttribution === "full_link") score += 30;
    else if (calcAttribution === "name_only") score += 15;
    else score += 0;

    if (calcQuota === "under15") score += 25;
    else if (calcQuota === "15to25") score += 15;
    else score += 0;

    if (calcContentType === "text") score += 10;
    else if (calcContentType === "photo") score -= 10;
    else if (calcContentType === "database") score -= 30;

    return Math.max(0, Math.min(100, score));
  };

  const fairUseScore = calculateFairUse();

  const getVerdict = () => {
    if (calcContentType === "database") {
      return {
        status: "prohibited",
        label: "محظور قطعياً",
        color: "text-rose-400 bg-rose-500/10 border-rose-500/30",
        desc: "قواعد بيانات أطلس القرى ورادار الأسعار محمية بحقوق سيادية خاصة ولا يجوز نسخها أو كشطها آلياً دون ترخيص كتابي مسبق.",
      };
    }
    if (fairUseScore >= 75) {
      return {
        status: "allowed",
        label: "استخدام مشروع ومصرح به (Fair Use)",
        color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
        desc: "المادة متوافقة تماماً مع معايير الاقتباس النزيه بموجب المادة 7 من ميثاق الملكية الفكرية، ولا تتطلب إشعارات إزالة.",
      };
    }
    if (fairUseScore >= 45) {
      return {
        status: "conditional",
        label: "مشروط بالتعديل الفوري",
        color: "text-amber-400 bg-amber-500/10 border-amber-500/30",
        desc: "يلزمك استكمال عزو المصدر الصريح ووضع رابط تشعبي نشط للمادة الأصلية وتقليص نسبة النص المقتبس إلى أقل من 25%.",
      };
    }
    return {
      status: "violation",
      label: "انتهاك صريح لحقوق الملكية الفكرية",
      color: "text-rose-400 bg-rose-500/10 border-rose-500/30",
      desc: "هذا الاستخدام يتجاوز حدود الاقتباس الصحفي المشروع ويخضع لإجراءات الإزالة الفورية والمطالبة بالتعويض القانوني.",
    };
  };

  const verdict = getVerdict();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statementChecked) {
      setSubmitError("يرجى الإقرار بصحة البيانات المقدمة تحت طائلة المسؤولية القانونية.");
      return;
    }
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

  const handleCopyTicket = () => {
    if (submittedTicket && typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(submittedTicket);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 3000);
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
            نحترم حقوق المؤلفين، المصورين، والوكالات الإخبارية في كل مكان. إذا كنت تعتقد بحسن نية أن مادة منشورة على منصة «الوطن اليوم» تنتهك حقوقك الفكرية، يرجى استخدام المعالج الرقمي أدناه لتقديم إشعار رسمي لنقوم بالتحقق الفوري والبت فيه بحيادية تامة.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>SLA الاستجابة والبت القانوني: أقل من 24 ساعة</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-mono">
              البريد المعتمد: legal@alwatantoday.net
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* 2. Interactive Fair-Use Diagnostic Decision Engine */}
        <section className="rounded-3xl border border-[var(--gold)]/30 bg-[#16060B]/80 backdrop-blur-xl p-6 sm:p-9 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/40 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-white">
                  حاسبة الاستخدام العادل التفاعلية (Fair-Use Diagnostic Engine)
                </h2>
                <p className="text-xs text-stone-400">
                  حدد معايير اقتباسك لاختبار توافقه الفوري مع القوانين الصحفية وتراخيص النشر المعتمدة
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-left font-mono">
                <div className="text-[10px] text-stone-400">درجة التوافق القانوني</div>
                <div className="text-xl font-black text-[var(--gold)]">{fairUseScore}%</div>
              </div>
            </div>
          </div>

          {/* Interactive Diagnostic Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Purpose */}
            <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <label className="text-xs font-black text-stone-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>1. الغرض من الاستخدام</span>
              </label>
              <div className="space-y-1.5 pt-1">
                {[
                  { id: "academic", label: "بحثي أو أكاديمي غير ربحي" },
                  { id: "news_critique", label: "تغطية صحفية أو نقدية" },
                  { id: "commercial", label: "تجاري أو ترويجي مدفوع" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCalcPurpose(item.id as any)}
                    className={`w-full text-right p-2.5 rounded-xl text-xs transition-all ${
                      calcPurpose === item.id
                        ? "bg-[var(--gold)]/20 border border-[var(--gold)]/50 text-white font-bold"
                        : "bg-white/[0.03] text-stone-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Attribution */}
            <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <label className="text-xs font-black text-stone-300 flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>2. عزو المصدر والرابط</span>
              </label>
              <div className="space-y-1.5 pt-1">
                {[
                  { id: "full_link", label: "عزو صريح مع رابط نشط" },
                  { id: "name_only", label: "ذكر الاسم دون رابط" },
                  { id: "none", label: "بدون ذكر المصدر" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCalcAttribution(item.id as any)}
                    className={`w-full text-right p-2.5 rounded-xl text-xs transition-all ${
                      calcAttribution === item.id
                        ? "bg-[var(--gold)]/20 border border-[var(--gold)]/50 text-white font-bold"
                        : "bg-white/[0.03] text-stone-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Quota */}
            <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <label className="text-xs font-black text-stone-300 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>3. نسبة الاقتباس</span>
              </label>
              <div className="space-y-1.5 pt-1">
                {[
                  { id: "under15", label: "أقل من 15% من النص" },
                  { id: "15to25", label: "بين 15% إلى 25%" },
                  { id: "over25", label: "أكثر من 25% أو نسخ كامل" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCalcQuota(item.id as any)}
                    className={`w-full text-right p-2.5 rounded-xl text-xs transition-all ${
                      calcQuota === item.id
                        ? "bg-[var(--gold)]/20 border border-[var(--gold)]/50 text-white font-bold"
                        : "bg-white/[0.03] text-stone-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Content Type */}
            <div className="space-y-2 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <label className="text-xs font-black text-stone-300 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>4. نوع المصنف المقتبس</span>
              </label>
              <div className="space-y-1.5 pt-1">
                {[
                  { id: "text", label: "تقرير أو مقال تحريري" },
                  { id: "photo", label: "صورة ميدانية حصرية" },
                  { id: "database", label: "خريطة أطلس أو رادار أسعار" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCalcContentType(item.id as any)}
                    className={`w-full text-right p-2.5 rounded-xl text-xs transition-all ${
                      calcContentType === item.id
                        ? "bg-[var(--gold)]/20 border border-[var(--gold)]/50 text-white font-bold"
                        : "bg-white/[0.03] text-stone-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnostic Result Banner */}
          <div className={`p-5 rounded-2xl border ${verdict.color} space-y-2 transition-all`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {verdict.status === "allowed" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                )}
                <span className="font-black text-sm">{verdict.label}</span>
              </div>
              <span className="text-xs font-mono font-bold">مؤشر النزاهة: {fairUseScore}/100</span>
            </div>
            <p className="text-xs leading-relaxed text-stone-200">{verdict.desc}</p>
          </div>
        </section>

        {/* 3. Multi-Step DMCA Notice Filing Wizard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Wizard (8 Cols) */}
          <div className="lg:col-span-8 rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 sm:p-9 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-[var(--gold)]" />
                  <span>معالج إشعار الانتهاك القانوني الرسمي</span>
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  إيداع مذكرة رسمية بموجب قانون الألفية للملكية الفكرية والتشريعات الدولية
                </p>
              </div>

              {/* Step indicator */}
              {!submittedTicket && (
                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        wizardStep === s
                          ? "bg-[var(--gold)] text-black font-black"
                          : wizardStep > s
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-white/5 text-stone-500"
                      }`}
                    >
                      {wizardStep > s ? "✓" : s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {submitError && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {submittedTicket ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">تم قيد إشعار الانتهاك في السجل القانوني!</h3>
                <p className="text-xs text-stone-300 max-w-lg mx-auto leading-relaxed">
                  تم تسجيل إشعارك برقم مرجعي رسمي لدى مستشار الهيئة القانوني. سنقوم بمراجعة الروابط المعنية واتخاذ الإجراء اللازم وإشعارك بالبريد الإلكتروني خلال أقل من 24 ساعة عمل.
                </p>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <div className="px-5 py-3 rounded-xl bg-black/60 border border-emerald-500/50 text-emerald-300 font-mono text-base font-black tracking-wider">
                    {submittedTicket}
                  </div>
                  <button
                    onClick={handleCopyTicket}
                    className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                    title="نسخ كود التذكرة"
                  >
                    {copiedTicket ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmittedTicket(null);
                      setWizardStep(1);
                    }}
                    className="text-xs text-stone-400 hover:text-white underline transition-all"
                  >
                    تقديم إشعار جديد
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Claimant Info */}
                {wizardStep === 1 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-stone-300">
                      <strong>الخطوة 1:</strong> حدد صفتك القانونية وبيانات الاتصال المعتمدة لمتابعة الشكوى.
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-300">صفتك القانونية</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setClaimantRole("owner")}
                          className={`p-3 rounded-xl border text-xs text-center font-bold transition-all ${
                            claimantRole === "owner"
                              ? "border-[var(--gold)] bg-[var(--gold)]/10 text-white"
                              : "border-white/10 bg-white/[0.02] text-stone-400 hover:text-white"
                          }`}
                        >
                          مالك الحق الفكري الأصلي
                        </button>
                        <button
                          type="button"
                          onClick={() => setClaimantRole("agent")}
                          className={`p-3 rounded-xl border text-xs text-center font-bold transition-all ${
                            claimantRole === "agent"
                              ? "border-[var(--gold)] bg-[var(--gold)]/10 text-white"
                              : "border-white/10 bg-white/[0.02] text-stone-400 hover:text-white"
                          }`}
                        >
                          وكيل قانوني أو ممثل رسمي مفوض
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-300">الاسم الكامل أو اسم المؤسسة *</label>
                        <input
                          type="text"
                          required
                          value={claimantName}
                          onChange={(e) => setClaimantName(e.target.value)}
                          placeholder="مثال: وكالة الصحافة المصورة / أحمد خليل"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[var(--gold)] focus:outline-none placeholder:text-stone-600"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-stone-300">البريد الإلكتروني الرسمي *</label>
                        <input
                          type="email"
                          required
                          value={claimantEmail}
                          onChange={(e) => setClaimantEmail(e.target.value)}
                          placeholder="legal@yourdomain.org"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[var(--gold)] focus:outline-none placeholder:text-stone-600 font-mono text-left"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="button"
                        disabled={!claimantName || !claimantEmail}
                        onClick={() => setWizardStep(2)}
                        className="px-6 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[#d49e00] text-black font-black text-xs transition-all flex items-center gap-2 disabled:opacity-40"
                      >
                        <span>متابعة لتحديد الروابط المنتهكة</span>
                        <ArrowRight className="w-4 h-4 rotate-180" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Infringing & Original Work URLs */}
                {wizardStep === 2 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-stone-300">
                      <strong>الخطوة 2:</strong> حدد رابط المادة على «الوطن اليوم» ورابط إثبات ملكيتك للمصنف الأصلي.
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-300">رابط المادة المنتهكة على منصة الوطن اليوم *</label>
                      <input
                        type="url"
                        required
                        value={infringingUrl}
                        onChange={(e) => setInfringingUrl(e.target.value)}
                        placeholder="https://alwatantoday.net/news/article-slug..."
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[var(--gold)] focus:outline-none placeholder:text-stone-600 font-mono text-left"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-stone-300">رابط العمل الأصلي أو إثبات الملكية الفكرية *</label>
                      <input
                        type="url"
                        required
                        value={originalWorkUrl}
                        onChange={(e) => setOriginalWorkUrl(e.target.value)}
                        placeholder="https://yourportfolio.com/original-work..."
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[var(--gold)] focus:outline-none placeholder:text-stone-600 font-mono text-left"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-300">الإجراء القانوني المطلوب</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {[
                          { id: "takedown", label: "إزالة المادة فورياً (Takedown)" },
                          { id: "credit", label: "تعديل المادة وعزو المصدر" },
                          { id: "license", label: "تسوية ترخيص النشر" },
                        ].map((action) => (
                          <button
                            key={action.id}
                            type="button"
                            onClick={() => setRequestedAction(action.id)}
                            className={`p-3 rounded-xl border text-xs text-center font-bold transition-all ${
                              requestedAction === action.id
                                ? "border-[var(--gold)] bg-[var(--gold)]/10 text-white"
                                : "border-white/10 bg-white/[0.02] text-stone-400 hover:text-white"
                            }`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setWizardStep(1)}
                        className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-300 text-xs font-bold transition-all"
                      >
                        العودة للسابق
                      </button>
                      <button
                        type="button"
                        disabled={!infringingUrl || !originalWorkUrl}
                        onClick={() => setWizardStep(3)}
                        className="px-6 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[#d49e00] text-black font-black text-xs transition-all flex items-center gap-2 disabled:opacity-40"
                      >
                        <span>متابعة للإقرار القانوني والتوقيع</span>
                        <ArrowRight className="w-4 h-4 rotate-180" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Legal Affirmation & Submit */}
                {wizardStep === 3 && (
                  <div className="space-y-5">
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
                      <strong>الخطوة 3 والأخيرة:</strong> الإقرار القانوني بالتصريح تحت طائلة المسؤولية المدنية والجنائية الدولية.
                    </div>

                    <label className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10 cursor-pointer hover:border-white/20 transition-all">
                      <input
                        type="checkbox"
                        checked={statementChecked}
                        onChange={(e) => setStatementChecked(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-stone-600 bg-black/60 text-[var(--gold)] focus:ring-[var(--gold)]"
                      />
                      <span className="text-xs text-stone-300 leading-relaxed">
                        أقر وأشهد بحسن نية بأنني المالك الحصري أو الوكيل القانوني المخول للمصنف المذكور، وأن استخدام هذه المادة بالطريقة المشكو منها غير مصرح به من قبل المالك أو وكيله أو القانون، وأتحمل المسؤولية القانونية الكاملة عن أي ادعاء كيدي أو غير دقيق.
                      </span>
                    </label>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setWizardStep(2)}
                        className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-300 text-xs font-bold transition-all"
                      >
                        العودة للسابق
                      </button>
                      <button
                        type="submit"
                        disabled={submitting || !statementChecked}
                        className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-700 to-rose-900 hover:from-rose-600 hover:to-rose-800 text-white font-black text-xs transition-all shadow-xl shadow-rose-950/40 flex items-center gap-2 disabled:opacity-40"
                      >
                        {submitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>جارٍ قيد الإشعار في السجل القانوني...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>إرسال الإشعار وتوليد التذكرة القانونية</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Right Rail: Institutional Protocols (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Speed & SLA Protocol */}
            <div className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                <Clock className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">جدول الاستجابة القانونية</h3>
              </div>

              <div className="space-y-3 text-xs text-stone-300">
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-stone-400">استلام وقيد الإشعار</span>
                  <span className="font-mono text-emerald-400 font-bold">فوري (&lt; 5 دقائق)</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-stone-400">فحص الرابط ومقارنة الملكية</span>
                  <span className="font-mono text-stone-200">خلال 6 ساعات</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-stone-400">إجراء الإزالة أو التصويب</span>
                  <span className="font-mono text-amber-300 font-bold">أقل من 24 ساعة</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-400">مهلة إشعار المعارضة للمحرر</span>
                  <span className="font-mono text-stone-200">10 أيام عمل</span>
                </div>
              </div>
            </div>

            {/* Counter Notice Clause */}
            <div className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-stone-200 text-xs font-bold">
                <Scale className="w-4 h-4 text-[var(--gold)]" />
                <span>حق إشعار المعارضة (Counter-Notice)</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                إذا اعتقد المحرر أو الكاتب أن المادة أزيلت عن طريق الخطأ أو نتيجة تحديد خاطئ للملكية، يحق له تقديم إشعار معارضة رسمي بموجب المادة 512(g) من القانون لإعادة نشر المادة خلال 10 إلى 14 يوم عمل ما لم يرفع صاحب الشكوى دعوى قضائية.
              </p>
            </div>

            {/* Open Access Licensing */}
            <div className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
                <Award className="w-4 h-4" />
                <span>الترخيص المفتوح للجامعات والأبحاث</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                تمنح منصة «الوطن اليوم» ترخيصاً مفتوحاً حراً (CC BY-NC-ND 4.0) للجامعات ومراكز الدراسات الفلسطينية والعربية لإعادة استخدام التحليلات التاريخية وأرقام رادار الأسواق في الأطروحات العلمية مع العزو الصريح.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
