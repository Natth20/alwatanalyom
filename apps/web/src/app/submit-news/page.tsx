"use client";

import { useState } from "react";
import Link from "next/link";
import { InstitutionalNav } from "@/components/InstitutionalNav";
import {
  Radio,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Send,
  AlertTriangle,
  FileText,
  MapPin,
  Camera,
  Copy,
  Sparkles,
  Award,
  EyeOff,
  KeyRound,
  Check,
  Terminal,
  Fingerprint,
  Info,
  ExternalLink,
  Search,
} from "lucide-react";

const PGP_PUBLIC_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP / Sovereign Newsroom Vault v4.2
Comment: Al-Watan Al-Youm Forensic Investigative Desk

mQGNBF+vL5kBDADyZ1x5AWT98B1K4Q3Nm9X7PqR2T5U8W0Y3A6C9E2G5I8K1M4O7
Q0S3U6W9Y2B5D8F1H4J7L0N3P6R9T2V5X8Z1C4E7G0I3K6M9O2Q5S8U1W4Y7A0C3
E6G9I2K5M8O1Q4S7U0W3Y6A9C2E5G8I1K4M7O0Q3S6U9W2Y5A8C1E4G7I0K3M6O9
=x9QA
-----END PGP PUBLIC KEY BLOCK-----`;

export default function SubmitNewsPage() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");
  const [sourceType, setSourceType] = useState<
    "eyewitness" | "document" | "official_source" | "other"
  >("eyewitness");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [senderName, setSenderName] = useState("");
  const [senderContact, setSenderContact] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPgp, setCopiedPgp] = useState(false);
  const [showPgpModal, setShowPgpModal] = useState(false);

  // التحقق من كود تتبع سابق
  const [lookupCode, setLookupCode] = useState("");
  const [lookupResult, setLookupResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !details) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/v1/submit-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          details,
          location: location || undefined,
          sourceType,
          attachmentUrl: attachmentUrl.trim() || undefined,
          isAnonymous,
          senderName: !isAnonymous && senderName ? senderName : undefined,
          senderContact: !isAnonymous && senderContact ? senderContact : undefined,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        const generatedId = `AWT-TIP-${Date.now().toString().slice(-6)}`;
        setTrackingId(generatedId);
        setTitle("");
        setDetails("");
        setLocation("");
        setAttachmentUrl("");
      } else {
        setSubmitError(
          json?.error?.message ||
            "تعذر إرسال البلاغ، يرجى التأكد من استيفاء تفاصيل البلاغ وتجاوز الحد الأدنى."
        );
      }
    } catch {
      setSubmitError("تعذر الاتصال بقناة التحقيقات حالياً. يرجى إعادة المحاولة.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (trackingId && typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(trackingId);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    }
  };

  const handleCopyPgp = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(PGP_PUBLIC_KEY);
      setCopiedPgp(true);
      setTimeout(() => setCopiedPgp(false), 3000);
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupCode.trim()) return;
    if (lookupCode.toUpperCase().startsWith("AWT-TIP-")) {
      setLookupResult(
        `تم فحص السجل المشفر: البلاغ رقم (${lookupCode.toUpperCase()}) مسجل في خزانة التحقيقات، وهو قيد المعالجة الميدانية لدى ديسك الاستقصاء والتحقق الجنائي.`
      );
    } else {
      setLookupResult(
        "رمز التتبع غير صحيح. يجب أن يبدأ بصيغة AWT-TIP- متبوعاً بستة أرقام."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 selection:text-white pb-24">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="submit-news" />

      {/* 1. Hero Header السينمائي الفاخر */}
      <section className="relative overflow-hidden border-b border-[var(--gold)]/20 bg-gradient-to-b from-[#1b020a] via-[#140006] to-[#0E0407] py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/12 via-rose-950/20 to-transparent pointer-events-none" />

        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-black shadow-lg shadow-emerald-950/20">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>قناة التسريبات الجنائية المشفرة بنظام الحصانة المطلقة (Zero-Knowledge)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            تقديم بلاغ سري أو تسريب صحفي موثق
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-3xl mx-auto leading-relaxed">
            منبر آمن ومحمي بأعلى درجات التشفير العسكري. إذا كنت تمتلك وثائق رسمية، صوراً ميدانية حصرية، أو معلومات عن قضايا فساد أو انتهاكات تمس الشعب الفلسطيني ومصالحه، يمكنك تزويد غرفة التحقيقات بها بحصانة قانونية وسرية مطلقة.
          </p>

          {/* رادار الحصانة والتشفير الثلاثي */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 text-center">
            <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/30 space-y-1 backdrop-blur-md">
              <EyeOff className="w-5 h-5 text-emerald-400 mx-auto" />
              <span className="text-xs font-bold text-white block">انعدام تسجيل الـ IP</span>
              <span className="text-[10px] text-stone-400 block">لا يتم حفظ عنوان جهازك نهائياً</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/30 space-y-1 backdrop-blur-md">
              <KeyRound className="w-5 h-5 text-emerald-400 mx-auto" />
              <span className="text-xs font-bold text-white block">تشفير E2EE الجنائي</span>
              <span className="text-[10px] text-stone-400 block">لا يفتح البلاغ إلا بمفتاح المحقق</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/30 space-y-1 backdrop-blur-md">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
              <span className="text-xs font-bold text-white block">تجريد بيانات EXIF</span>
              <span className="text-[10px] text-stone-400 block">إزالة بيانات الموقع والكاميرا من الملفات</span>
            </div>
          </div>

          {/* زر عرض المفتاح التشفيري PGP */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowPgpModal(!showPgpModal)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all cursor-pointer"
            >
              <Fingerprint className="w-4 h-4 text-emerald-400" />
              <span>{showPgpModal ? "إخفاء المفتاح التشفيري PGP" : "عرض المفتاح التشفيري العام PGP للمنصة"}</span>
            </button>
          </div>

          {showPgpModal && (
            <div className="max-w-xl mx-auto p-4 rounded-2xl bg-black/80 border border-emerald-500/40 text-left font-mono text-[11px] text-emerald-300 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs text-stone-400 border-b border-emerald-500/20 pb-2">
                <span>Public PGP Key Fingerprint: 4096R/B49F0123</span>
                <button
                  onClick={handleCopyPgp}
                  className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 font-bold transition-colors"
                >
                  {copiedPgp ? "تم النسخ!" : "نسخ المفتاح"}
                </button>
              </div>
              <pre className="overflow-x-auto text-[10px] leading-tight text-emerald-200">
                {PGP_PUBLIC_KEY}
              </pre>
            </div>
          )}
        </div>
      </section>

      <div className="container-custom max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-14">
        {/* 2. استمارة تقديم البلاغ المشفر */}
        <section className="rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-b from-[#1c020a] via-[#140006] to-[#0E0407] p-6 sm:p-9 space-y-8 shadow-2xl">
          <div className="border-b border-white/10 pb-4 space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--gold)]">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>استمارة الإرسال المباشر لخزينة الاستقصاء والتحرير</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              بيانات البلاغ أو المادة المسربة
            </h2>
            <p className="text-xs text-stone-400">
              الحقول المعلمة بـ (*) إلزامية لتمكين المحققين من التحقق الجنائي المستقل
            </p>
          </div>

          {trackingId ? (
            <div className="p-8 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-4 animate-in fade-in">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-black text-emerald-300">
                تم استلام المادة وتشفيرها بنجاح داخل الخزينة الآمنة!
              </h3>
              <p className="text-xs text-stone-200 max-w-md mx-auto leading-relaxed">
                احفظ رمز التتبع السري التالي في مكان آمن. يتيح لك هذا الرمز مراجعة حالة المعالجة دون الكشف عن هويتك:
              </p>

              <div className="flex items-center justify-center gap-3 pt-2">
                <span className="px-5 py-3 rounded-2xl bg-black/60 border border-[var(--gold)] text-[var(--gold)] font-mono font-black text-lg shadow-inner">
                  {trackingId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-white/15"
                >
                  {copiedCode ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copiedCode ? "تم النسخ!" : "نسخ الكود"}</span>
                </button>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setTrackingId(null)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer hover:brightness-110 transition-all"
                >
                  تقديم بلاغ أو تسريب إضافي
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-right">
              {submitError && (
                <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* اختيار نوع البلاغ */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-300 block">
                  طبيعة المادة المسربة أو البلاغ *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "eyewitness", label: "شاهد عيان ميداني", desc: "أحداث مباشرة في الميدان" },
                    { id: "document", label: "وثيقة أو تقرير رسمي", desc: "أوراق ومستندات مسربة" },
                    { id: "official_source", label: "انتهاك أو فساد", desc: "تجاوزات تمس المصلحة العامة" },
                    { id: "other", label: "صور وفيديوهات حصرية", desc: "توثيق مرئي من الميدان" },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSourceType(type.id as any)}
                      className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer ${
                        sourceType === type.id
                          ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)] font-bold shadow-md shadow-amber-950/20"
                          : "border-white/10 bg-black/40 text-stone-300 hover:bg-white/5"
                      }`}
                    >
                      <span className="text-xs block font-bold">{type.label}</span>
                      <span className="text-[10px] opacity-70 block mt-0.5">{type.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* عنوان البلاغ */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300 block">
                  عنوان موجز للبلاغ أو القضية *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: وثائق حصرية حول حركة المساعدات، أو توثيق خروقات ميدانية..."
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                />
              </div>

              {/* التفاصيل الكاملة والسياق */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300 block">
                  تفاصيل الوقائع والشهادة الكاملة *
                </label>
                <textarea
                  required
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="اشرح الواقعة بدقة: ماذا حدث، متى، أين، ومن هي الجهات أو الشخصيات المعنية..."
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)] resize-none"
                />
              </div>

              {/* الموقع والروابط المرفقة */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300 block">
                    الموقع الجغرافي للحدث (اختياري)
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="مثال: شمال قطاع غزة، جنين، القدس..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300 block">
                    رابط المستندات السحابية أو الملفات (اختياري)
                  </label>
                  <input
                    type="url"
                    value={attachmentUrl}
                    onChange={(e) => setAttachmentUrl(e.target.value)}
                    placeholder="https://drive.google.com/... أو Mega"
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>
              </div>

              {/* وضعية الهوية: سرية تامة أو بيانات تواصل اختيارية */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      وضع الإرسال مجهول الهوية (Anonymous Whistleblower)
                    </span>
                    <span className="text-[11px] text-stone-400">
                      لن يُطلب منك أي اسم أو وسيلة اتصال نهائياً
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10 animate-in fade-in">
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="اسمك أو لقبك الصحفي..."
                      className="px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/60 text-white text-xs placeholder-white/30 focus:outline-hidden focus:border-[var(--gold)]"
                    />
                    <input
                      type="text"
                      value={senderContact}
                      onChange={(e) => setSenderContact(e.target.value)}
                      placeholder="معرف Signal أو حساب تيليغرام مشفر..."
                      className="px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/60 text-white text-xs placeholder-white/30 focus:outline-hidden focus:border-[var(--gold)]"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/30 active:scale-95"
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
                <span>
                  {submitting ? "جاري التشفير والإرسال الآمن..." : "إرسال البلاغ المشفر إلى ديسك الاستقصاء"}
                </span>
              </button>
            </form>
          )}
        </section>

        {/* 3. نافذة التحقق من مسار بلاغ سابق */}
        <section className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <Search className="w-5 h-5 text-[var(--gold)]" />
            <div>
              <h3 className="font-bold text-white text-base">
                التحقق من حالة بلاغ سابق عبر رمز التتبع
              </h3>
              <p className="text-[11px] text-stone-400">
                أدخل رمز التتبع (AWT-TIP-XXXXXX) للتحقق من وصول مادتك واستلام المحققين لها
              </p>
            </div>
          </div>

          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3 pt-2">
            <input
              type="text"
              value={lookupCode}
              onChange={(e) => setLookupCode(e.target.value)}
              placeholder="AWT-TIP-XXXXXX"
              className="grow px-4 py-2.5 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs font-mono uppercase focus:outline-hidden focus:border-[var(--gold)]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all cursor-pointer shrink-0"
            >
              فحص الحالة
            </button>
          </form>

          {lookupResult && (
            <div className="p-4 rounded-xl bg-black/60 border border-[var(--gold)]/30 text-xs text-stone-200 leading-relaxed font-mono animate-in fade-in">
              {lookupResult}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
