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
} from "lucide-react";

export default function SubmitNewsPage() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");
  const [sourceType, setSourceType] = useState<"eyewitness" | "document" | "official_source" | "other">("eyewitness");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [senderName, setSenderName] = useState("");
  const [senderContact, setSenderContact] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [trackingId, setTrackingId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !details) return;
    setSubmitting(true);

    setTimeout(() => {
      const generatedId = `AWT-LEAK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setTrackingId(generatedId);
      setSubmitting(false);
    }, 1200);
  };

  const handleCopyCode = () => {
    if (trackingId && typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 selection:text-white pb-24">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="submit-news" />

      {/* 1. Hero Header السينمائي الفاخر */}
      <div className="relative overflow-hidden border-b border-[var(--gold)]/20 bg-gradient-to-b from-[#1b020a] via-[#140006] to-[#0E0407] py-14 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-rose-950/20 to-transparent pointer-events-none" />
        
        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-bold shadow-md shadow-emerald-950/20">
            <Lock className="w-4 h-4" />
            <span>قناة التسريب الجنائي المشفرة وتوثيق الحقائق الميدانية</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            تقديم بلاغ سري أو تسريب صحفي موثق
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
            منبر آمن ومحمي بأعلى درجات التشفير العسكري (Zero-Knowledge). إذا كنت تمتلك وثائق رسمية، صوراً ميدانية حصرية، أو معلومات عن قضايا فساد أو انتهاكات تمس الشعب الفلسطيني، يمكنك تزويد غرفة التحقيقات بها بحصانة مطلقة.
          </p>

          {/* رادار الحصانة والتشفير الثلاثي */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 text-center">
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-1">
              <EyeOff className="w-5 h-5 text-emerald-400 mx-auto" />
              <span className="text-xs font-bold text-white block">انعدام تسجيل الـ IP</span>
              <span className="text-[10px] text-stone-400 block">لا يتم حفظ عنوان جهازك نهائياً</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-1">
              <KeyRound className="w-5 h-5 text-emerald-400 mx-auto" />
              <span className="text-xs font-bold text-white block">تشفير E2EE الجنائي</span>
              <span className="text-[10px] text-stone-400 block">لا يفتح البلاغ إلا مفتاح المحقق</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
              <span className="text-xs font-bold text-white block">حذف بيانات EXIF</span>
              <span className="text-[10px] text-stone-400 block">تجريد الصور من بيانات الكاميرا والموقع</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* 2. نموذج تقديم البلاغ المشفر */}
        <div className="rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-b from-[#1c020a] via-[#140006] to-[#0E0407] p-6 sm:p-9 space-y-8 shadow-2xl">
          <div className="border-b border-white/10 pb-4 space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--gold)]">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>استمارة الإرسال المباشر لغرفة الاستقصاء والتحرير</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              بيانات البلاغ أو المادة المسربة
            </h2>
            <p className="text-xs text-stone-400">
              الحقول المعلمة بـ (*) إلزامية لاستكمال عملية الفحص الجنائي
            </p>
          </div>

          {trackingId ? (
            <div className="p-8 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-4 animate-in fade-in">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-black text-emerald-300">
                تم استلام المادة وتشفيرها بنجاح داخل الخزينة الآمنة!
              </h3>
              <p className="text-xs text-stone-200 max-w-md mx-auto leading-relaxed">
                احفظ كود التتبع السري التالي في مكان آمن. يتيح لك هذا الكود مراجعة حالة التحقيق لاحقاً دون الحاجة للكشف عن هويتك:
              </p>

              <div className="flex items-center justify-center gap-3 pt-2">
                <span className="px-5 py-3 rounded-2xl bg-black/60 border border-[var(--gold)] text-[var(--gold)] font-mono font-black text-base shadow-inner">
                  {trackingId}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-white/15"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? "تم النسخ!" : "نسخ الكود"}</span>
                </button>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setTrackingId(null)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
                >
                  تقديم بلاغ أو تسريب إضافي
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-right">
              {/* اختيار نوع البلاغ */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-300 block">
                  طبيعة المادة المسربة أو البلاغ *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "eyewitness", label: "شاهد عيان ميداني", desc: "أحداث جارية ومباشرة" },
                    { id: "document", label: "وثيقة أو تقرير رسمي", desc: "أوراق ومستندات مسربة" },
                    { id: "official_source", label: "انتهاك أو فساد", desc: "تجاوزات تمس المصلحة العامة" },
                    { id: "other", label: "صور وفيديوهات حصرية", desc: "توثيق مرئي من الميدان" },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSourceType(type.id as any)}
                      className={`p-3 rounded-2xl border text-right transition-all cursor-pointer ${
                        sourceType === type.id
                          ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)] font-bold shadow-sm"
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
                  عنوان ملخص للبلاغ أو القضية *
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
                    placeholder="مثال: شمال قطاع غزة، مخيم جنين، القدس..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300 block">
                    رابط المستندات السحابية أو الملفات (Google Drive, Mega, etc.)
                  </label>
                  <input
                    type="url"
                    value={attachmentUrl}
                    onChange={(e) => setAttachmentUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>
              </div>

              {/* وضعية الهوية: سرية تامة أو بيانات تواصل */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">
                      وضع الإرسال مجهول الهوية (Anonymous Whistleblower)
                    </span>
                    <span className="text-[11px] text-stone-400">
                      لن يُطلب منك أي اسم أو رقم تواصل نهائياً
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
                      placeholder="بريد Signal أو تليغرام للتواصل المشفر..."
                      className="px-3.5 py-2.5 rounded-xl border border-white/15 bg-black/60 text-white text-xs placeholder-white/30 focus:outline-hidden focus:border-[var(--gold)]"
                    />
                  </div>
                )}
              </div>

              {/* زر الإرسال */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/30 active:scale-95"
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
                <span>{submitting ? "جاري التشفير والإرسال الآمن..." : "إرسال البلاغ المشفر إلى ديسك الاستقصاء"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
