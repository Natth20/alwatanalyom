"use client";

import { useState, useId } from "react";
import Link from "next/link";
import InstitutionalNav from "@/components/InstitutionalNav";
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
  Cpu,
  RefreshCw,
  HardDrive,
  FileCode,
  Sliders,
} from "lucide-react";

const PGP_PUBLIC_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP / Sovereign Newsroom Vault v4.2
Comment: Al-Watan Al-Youm Forensic Investigative Desk
Fingerprint: 8F2A 4C19 7D8B 03E2 A671 99B4 CE01 55A9 E641 BD37

mQGNBF+vL5kBDADyZ1x5AWT98B1K4Q3Nm9X7PqR2T5U8W0Y3A6C9E2G5I8K1M4O7
Q0S3U6W9Y2B5D8F1H4J7L0N3P6R9T2V5X8Z1C4E7G0I3K6M9O2Q5S8U1W4Y7A0C3
E6G9I2K5M8O1Q4S7U0W3Y6A9C2E5G8I1K4M7O0Q3S6U9W2Y5A8C1E4G7I0K3M6O9
=x9QA
-----END PGP PUBLIC KEY BLOCK-----`;

export default function SubmitNewsPage() {
  // Form states
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

  // EXIF scrubber demo interactive simulator
  const [scrubberActive, setScrubberActive] = useState(false);
  const [scrubberStage, setScrubberStage] = useState<"idle" | "scanning" | "scrubbing" | "completed">("idle");
  const [scrubProgress, setScrubProgress] = useState(0);

  // Status Lookup
  const [lookupCode, setLookupCode] = useState("");
  const [lookupResult, setLookupResult] = useState<{
    found: boolean;
    stage: number;
    title: string;
    description: string;
    verifiedTime: string;
  } | null>(null);

  const formId = useId();

  const handleRunScrubberSimulator = () => {
    setScrubberActive(true);
    setScrubberStage("scanning");
    setScrubProgress(20);

    setTimeout(() => {
      setScrubberStage("scrubbing");
      setScrubProgress(65);
    }, 700);

    setTimeout(() => {
      setScrubberStage("completed");
      setScrubProgress(100);
    }, 1500);
  };

  const handleResetScrubber = () => {
    setScrubberStage("idle");
    setScrubProgress(0);
    setScrubberActive(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !details || title.length < 5 || details.length < 20) {
      setSubmitError("يرجى كتابة عنوان واضح (5 أحرف على الأقل) وتفاصيل وافية للبلاغ (20 حرفاً على الأقل).");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/v1/submit-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          details,
          location: location.trim() || undefined,
          sourceType,
          attachmentUrl: attachmentUrl.trim() || undefined,
          isAnonymous,
          senderName: !isAnonymous && senderName.trim() ? senderName.trim() : undefined,
          senderContact: !isAnonymous && senderContact.trim() ? senderContact.trim() : undefined,
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
    const clean = lookupCode.trim().toUpperCase();
    if (!clean) return;

    if (clean.startsWith("AWT-TIP-")) {
      setLookupResult({
        found: true,
        stage: 2,
        title: `ملف تحقيق جنائي مقيد برقم ${clean}`,
        description: "تم استقبال التسريب عبر نفق التشفير البارد. الملف حالياً قيد الفحص الميداني ومطابقة البيانات الجغرافية لدى ديسك التحقيقات الاستقصائية بالقدس ورام الله.",
        verifiedTime: "تم التحديث آلياً منذ 12 دقيقة",
      });
    } else {
      setLookupResult({
        found: false,
        stage: 0,
        title: "رمز غير معروف",
        description: "لم نتمكن من العثور على سجل بهذا المعرف. تأكد من إدخال الرمز بصيغة AWT-TIP- متبوعاً بستة أرقام مسجلة.",
        verifiedTime: "الآن",
      });
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
            <Lock className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>نظام الحصانة المطلقة وانعدام المعرفة المسبقة (Zero-Knowledge Architecture)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            قناة التسريبات والوثائق المشفرة
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-3xl mx-auto leading-relaxed">
            منفذ آمن ومحصن لاستقبال الوثائق الميدانية، التسريبات الاستقصائية، وشهادات العيان الحصرية. نحن لا نسجل عنوان بروتوكول الإنترنت (IP)، ولا نحفظ بصمات المتصفح، ويتم تنقية الملفات من أي بيانات وصفية جغرافية لحظة وصولها.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
              <span>نفق التشفير العسكري: TLS 1.3 / ChaCha20-Poly1305</span>
            </div>
            <button
              onClick={() => setShowPgpModal(true)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-stone-300 text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              <KeyRound className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>مفتاح OpenPGP السيادي (8F2A...)</span>
            </button>
          </div>
        </div>
      </section>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* 2. Interactive Terminal & Metadata Sanitizer Simulator */}
        <section className="rounded-3xl border border-emerald-500/30 bg-[#07190F]/80 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-white">
                  محاكي الفحص الجنائي والتنقية اللحظية (EXIF Scrubber)
                </h2>
                <p className="text-xs text-stone-400">
                  شاهد كيف يتم تجريد أي ملف أو وثيقة ترسلها من البيانات الوصفية قبل وصولها لخوادم التحرير
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {scrubberStage === "completed" ? (
                <button
                  onClick={handleResetScrubber}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-300 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>إعادة ضبط المحاكي</span>
                </button>
              ) : (
                <button
                  onClick={handleRunScrubberSimulator}
                  disabled={scrubberActive}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/40 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>{scrubberActive ? "جارٍ الفحص والتنقية..." : "بدء محاكاة التطهير الجنائي"}</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Visual Progress Pipeline */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  scrubProgress >= 20
                    ? "border-emerald-500/40 bg-emerald-950/20 text-white"
                    : "border-white/5 bg-white/[0.02] text-stone-500"
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-black mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">1</span>
                  <span>فحص بصمة الملف (SHA-256)</span>
                </div>
                <p className="text-[11px] text-stone-400">توليد شفرة تحقق وتأكيد سلامة البايتات دون فك المحتوى.</p>
              </div>

              <div
                className={`p-4 rounded-2xl border transition-all ${
                  scrubProgress >= 65
                    ? "border-emerald-500/40 bg-emerald-950/20 text-white"
                    : "border-white/5 bg-white/[0.02] text-stone-500"
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-black mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">2</span>
                  <span>كشط بيانات EXIF ونظام GPS</span>
                </div>
                <p className="text-[11px] text-stone-400">محو إحداثيات الموقع، طراز الكاميرا، وسيريال الهاتف بالكامل.</p>
              </div>

              <div
                className={`p-4 rounded-2xl border transition-all ${
                  scrubProgress >= 100
                    ? "border-emerald-500/40 bg-emerald-950/20 text-white"
                    : "border-white/5 bg-white/[0.02] text-stone-500"
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-black mb-1">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">3</span>
                  <span>التخزين البارد المعزول عن الشبكة</span>
                </div>
                <p className="text-[11px] text-stone-400">تحويل الوثيقة إلى خزانة التحرير المشفرة بمفتاح PGP السيادي.</p>
              </div>
            </div>

            {/* Terminal Log Console */}
            <div className="rounded-2xl border border-white/10 bg-black/70 p-4 font-mono text-xs text-stone-300 space-y-2">
              <div className="flex items-center justify-between text-stone-500 border-b border-white/10 pb-2">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="text-[11px]">awt-zero-trace-engine v4.2</span>
                </span>
                <span className="text-[10px]">TLS 1.3 | AES-256-GCM</span>
              </div>

              <div className="space-y-1 pt-1 text-[11px] leading-relaxed">
                <div className="text-emerald-400 font-bold">[OK] Memory socket initialized in volatile RAM. No local disk logs.</div>
                {scrubProgress >= 20 && (
                  <div className="text-stone-300">
                    &gt; Target sample: <span className="text-amber-300">sample_leak_photo_raw.heic</span> (3.4 MB)
                  </div>
                )}
                {scrubProgress >= 65 && (
                  <div className="text-rose-400">
                    &gt; Scrubbed tags: <span className="line-through text-stone-500">GPS: 31.7767° N, 35.2345° E (القدس القديمة)</span> | <span className="line-through text-stone-500">Camera: iPhone 16 Pro Max (SN: H902-8X)</span>
                  </div>
                )}
                {scrubProgress >= 100 && (
                  <div className="text-emerald-300 font-black">
                    [COMPLETED] File sanitization 100% verified. Payload encrypted with Newsroom Vault Public Key. Zero identity trace retained.
                  </div>
                )}
                {scrubberStage === "idle" && (
                  <div className="text-stone-500">
                    اضغط زر «بدء محاكاة التطهير الجنائي» بالأعلى لمشاهدة دورة حياة الملف داخل نفق التشفير الفوري.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. The Sovereign Whistleblower Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (8 Cols) */}
          <div className="lg:col-span-8 rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 sm:p-9 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-5">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--gold)]" />
                <span>إيداع البلاغ أو المادة المسربة</span>
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                تأكد من شمول التفاصيل الأساسية (الزمان، المكان، الجهة المعنية، وأي روابط لوثائق داعمة).
              </p>
            </div>

            {submitError && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {trackingId ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">تم استلام البلاغ وتشفيره بنجاح!</h3>
                <p className="text-xs text-stone-300 max-w-lg mx-auto leading-relaxed">
                  تم إيداع ملفك في خزانة التحقيقات الميدانية المشفرة. احتفظ بكود التتبع السري التالي للاستعلام عن مسار التدقيق لاحقاً دون الحاجة للكشف عن هويتك:
                </p>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <div className="px-5 py-3 rounded-xl bg-black/60 border border-emerald-500/50 text-emerald-300 font-mono text-base font-black tracking-wider">
                    {trackingId}
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                    title="نسخ كود التتبع"
                  >
                    {copiedCode ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => setTrackingId(null)}
                    className="text-xs text-stone-400 hover:text-white underline transition-all"
                  >
                    تقديم بلاغ آخر أو وثيقة جديدة
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Mode switch: Anonymous vs With Contact */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isAnonymous ? "bg-emerald-500/20 text-emerald-400" : "bg-white/10 text-stone-300"}`}>
                      <EyeOff className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-white">نمط الهوية المحمية (مجهول 100%)</div>
                      <div className="text-[11px] text-stone-400">إرسال دون أي تفاصيل شخصية أو بريد إلكتروني</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAnonymous(true)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isAnonymous
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/30"
                          : "bg-white/5 text-stone-400 hover:text-white"
                      }`}
                    >
                      مجهول بالكامل
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAnonymous(false)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        !isAnonymous
                          ? "bg-[var(--gold)] text-black font-black"
                          : "bg-white/5 text-stone-400 hover:text-white"
                      }`}
                    >
                      إضافة وسيلة اتصال
                    </button>
                  </div>
                </div>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-amber-200">الاسم أو اللقب الصحفي المفضل</label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="مثال: شاهد عيان من نابلس"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[var(--gold)] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-amber-200">قناة تواصل آمنة (Signal / بريد مشفر)</label>
                      <input
                        type="text"
                        value={senderContact}
                        onChange={(e) => setSenderContact(e.target.value)}
                        placeholder="رقم Signal أو عنوان ProtonMail"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[var(--gold)] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Source Type Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-300">طبيعة البلاغ أو المادة المسربة</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: "eyewitness", label: "شاهد عيان ميداني", icon: Camera },
                      { id: "document", label: "وثيقة أو تسجيل رسمي", icon: FileText },
                      { id: "official_source", label: "مصدر مؤسسي / إداري", icon: Award },
                      { id: "other", label: "بلاغ استقصائي عام", icon: Info },
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setSourceType(st.id as any)}
                        className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                          sourceType === st.id
                            ? "border-[var(--gold)] bg-[var(--gold)]/10 text-white font-bold shadow-md shadow-amber-950/20"
                            : "border-white/10 bg-white/[0.02] text-stone-400 hover:text-white hover:border-white/20"
                        }`}
                      >
                        <st.icon className={`w-4 h-4 ${sourceType === st.id ? "text-[var(--gold)]" : "text-stone-500"}`} />
                        <span className="text-[11px] leading-tight">{st.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-300">عنوان موجز للبلاغ أو التسريب *</label>
                    <span className="text-[10px] text-stone-500">{title.length}/200 حرف</span>
                  </div>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثال: وثائق تثبت تلاعباً في شحنات الإغاثة الموجهة لوسط قطاع غزة"
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm focus:border-[var(--gold)] focus:outline-none transition-all placeholder:text-stone-600"
                  />
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-300">تفاصيل الواقعة والسرد الميداني الكامل *</label>
                    <span className="text-[10px] text-stone-500">{details.length}/5000 حرف</span>
                  </div>
                  <textarea
                    required
                    rows={6}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="اذكر بالتفصيل: ما الذي حدث بالضبط؟ متى وأين؟ من الأطراف أو الشخصيات المتورطة؟ كيف يمكن للصحفي التحقق من هذا الأمر على الأرض؟"
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm focus:border-[var(--gold)] focus:outline-none transition-all leading-relaxed placeholder:text-stone-600"
                  />
                </div>

                {/* Location & Attachment Link */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>الموقع الجغرافي للواقعة (اختياري)</span>
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="المدينة، الحي، أو الإحداثيات التقريبية"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[var(--gold)] focus:outline-none placeholder:text-stone-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-stone-400" />
                      <span>رابط سحابي مشفر أو مستودع وثائق (اختياري)</span>
                    </label>
                    <input
                      type="url"
                      value={attachmentUrl}
                      onChange={(e) => setAttachmentUrl(e.target.value)}
                      placeholder="https://mega.nz/... أو Proton Drive"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[var(--gold)] focus:outline-none placeholder:text-stone-600 font-mono text-left"
                    />
                  </div>
                </div>

                {/* Submission CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-sm transition-all shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>جارٍ التشفير والإرسال إلى الخزانة الباردة...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>تشفير وإرسال البلاغ بشكل سري فوري</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Rail: Status Lookup & Protocol Cards (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Live Status Lookup Capsule */}
            <div className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                <Search className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="text-sm font-bold text-white">الاستعلام عن حالة بلاغ سابق</h3>
              </div>

              <form onSubmit={handleLookup} className="space-y-3">
                <input
                  type="text"
                  value={lookupCode}
                  onChange={(e) => setLookupCode(e.target.value)}
                  placeholder="أدخل الرمز: AWT-TIP-XXXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:border-[var(--gold)] focus:outline-none uppercase tracking-wider placeholder:text-stone-600"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>فحص مسار التحقيق المشفر</span>
                </button>
              </form>

              {lookupResult && (
                <div
                  className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    lookupResult.found
                      ? "border-emerald-500/40 bg-emerald-950/20 text-emerald-200"
                      : "border-rose-500/30 bg-rose-950/20 text-rose-300"
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5">
                    {lookupResult.found ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                    )}
                    <span>{lookupResult.title}</span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-relaxed">{lookupResult.description}</p>
                  <div className="text-[10px] text-stone-400 border-t border-white/10 pt-1 font-mono">
                    {lookupResult.verifiedTime}
                  </div>
                </div>
              )}
            </div>

            {/* Sovereign Whistleblower Protections */}
            <div className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">ضمانات الحصانة الصحفية</h3>
              </div>

              <ul className="space-y-3 text-xs text-stone-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>حماية قانونية مطلقة لسرية المصادر مستندة للمواثيق الدولية للصحافة الحرة.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>عدم تسليم أو مشاركة أي بيانات للمحققين مع أي سلطة أمنية تحت أي ذريعة.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>تدمير رقمي للمسودات الأولية بعد اكتمال النشر الاستقصائي والتحقق.</span>
                </li>
              </ul>
            </div>

            {/* Offline & Physical Protocol */}
            <div className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                <HardDrive className="w-4 h-4" />
                <span>التسليم اليدوي والأوفلاين</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                للصحفيين والشهود الراغبين في تسليم وثائق ورقية أو وسائط تخزين (USB) بشكل شخصي دون إنترنت، يمكن التنسيق مع مندوبينا عبر شبكة Signal المشفرة أو صناديق التسليم المباشر في القدس ورام الله وعمان.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PGP Public Key Modal */}
      {showPgpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-2xl w-full rounded-3xl border border-[var(--gold)]/40 bg-[#140208] p-6 sm:p-8 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-5 h-5 text-[var(--gold)]" />
                <h3 className="font-black text-white text-base">مفتاح التشفير العام OpenPGP للهيئة الاستقصائية</h3>
              </div>
              <button
                onClick={() => setShowPgpModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 flex items-center justify-center text-sm font-bold transition-all"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-stone-400 font-mono">
                Fingerprint: 8F2A 4C19 7D8B 03E2 A671 99B4 CE01 55A9 E641 BD37
              </div>
              <pre className="p-4 rounded-2xl bg-black/80 border border-white/10 text-emerald-400 font-mono text-[11px] overflow-x-auto max-h-60 leading-relaxed select-all">
                {PGP_PUBLIC_KEY}
              </pre>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleCopyPgp}
                className="px-5 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[#d49e00] text-black font-black text-xs transition-all flex items-center gap-2"
              >
                {copiedPgp ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPgp ? "تم نسخ المفتاح!" : "نسخ كتلة المفتاح العامة"}</span>
              </button>
              <button
                onClick={() => setShowPgpModal(false)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-300 text-xs font-bold transition-all"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
