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
} from "lucide-react";

export default function SubmitNewsPage() {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [location, setLocation] = useState("");
  const [sourceType, setSourceType] = useState<"eyewitness" | "document" | "official_source" | "other">("eyewitness");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [senderName, setSenderName] = useState("");
  const [senderContact, setSenderContact] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !details) return;
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/v1/submit-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          details,
          location: location || undefined,
          sourceType,
          attachmentUrl: attachmentUrl || undefined,
          isAnonymous,
          senderName: isAnonymous ? undefined : senderName,
          senderContact: isAnonymous ? undefined : senderContact,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error?.message || "تعذر إرسال الخبر، يرجى المحاولة لاحقاً.");
      }

      const generatedId = `AWT-REP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setTrackingId(generatedId);
      setSent(true);
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ غير متوقع أثناء إرسال الخبر");
    } finally {
      setSubmitting(false);
    }
  };

  const copyTracking = () => {
    if (!trackingId) return;
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container-custom py-10 space-y-10">
      <InstitutionalNav />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* نموذج الإرسال المشفر الرئيسي (8 أعمدة) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="card-hyper-luxury p-6 sm:p-8 space-y-4 border border-[var(--gold)]/30">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 via-rose-700 to-[#26000A] text-white flex items-center justify-center font-black shadow-md border border-red-500/40">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-red-400 uppercase font-bold">
                  بوابة المراسلة الميدانية المشفرة · Secure Newsroom Drop
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight">
                  أرسل خبراً، توثيقاً، أو بلاغاً لغرفة التحرير
                </h1>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed font-medium">
              نؤمن في «الوطن اليوم» بأن كل مواطن في الميدان هو شاهد عيان على الحقيقة. نتيح لك هذه القناة المشفرة بالكامل لإرسال الوثائق، الصور، مقاطع الفيديو، أو الإبلاغ عن الأحداث العاجلة مع ضمان السرية وحماية الهوية التامة بموجب ميثاق الشرف التحريري.
            </p>
          </div>

          {sent ? (
            /* بطاقة نجاح الإرسال وتوليد كود التتبع */
            <div className="rounded-3xl glass-hud p-8 text-center space-y-6 border-2 border-emerald-500/50 shadow-2xl animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">تم استلام بلاغك بنجاح في ديسك الأخبار</h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto leading-relaxed">
                  أحيلت المادة فوراً إلى فريق التحقق والتحرير الميداني. سيتم مطابقتها مع مصادرنا المعتمدة قبل اتخاذ قرار النشر.
                </p>
              </div>

              {/* كود التتبع الرقمي */}
              <div className="p-4 rounded-2xl bg-black/60 border border-[var(--gold)]/40 max-w-md mx-auto space-y-2">
                <span className="text-[10px] text-white/50 block font-bold">كود المتابعة والتحقق الخاص بالبلاغ:</span>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl font-mono font-black text-[var(--gold)] tracking-wider">
                    {trackingId}
                  </span>
                  <button
                    onClick={copyTracking}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    title="نسخ كود التتبع"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {copied && <span className="text-[10px] text-emerald-400 font-bold block">تم النسخ بنجاح!</span>}
              </div>

              <button
                onClick={() => {
                  setSent(false);
                  setTitle("");
                  setDetails("");
                  setLocation("");
                  setAttachmentUrl("");
                }}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                إرسال بلاغ أو مادة أخرى
              </button>
            </div>
          ) : (
            /* نموذج الإرسال المتطور */
            <form onSubmit={handleSubmit} className="card-hyper-luxury p-6 sm:p-8 space-y-6 border border-[var(--border)]">
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* اختيار نوع المادة المرسلة */}
              <div className="space-y-2">
                <label className="text-xs font-black text-[var(--text)] block">
                  1. حدد نوع المادة أو البلاغ الصحفي:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: "eyewitness", label: "🚨 شهادة ميدانية عاجلة" },
                    { id: "document", label: "📑 تسريب أو وثيقة رسمية" },
                    { id: "official_source", label: "📢 بيان أو تصريح حصري" },
                    { id: "other", label: "🔍 بلاغ عن شائعة كاذبة" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSourceType(cat.id as any)}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center cursor-pointer ${
                        sourceType === cat.id
                          ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)] font-black scale-102 shadow-xs"
                          : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)]/40 text-[var(--text-muted)]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* عنوان البلاغ */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-[var(--text)] block">
                  2. عنوان الخبر أو خلاصة الحدث: *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: اقتحام جديد في محيط مخيم جنين وإطلاق نار متقطع..."
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-all"
                />
              </div>

              {/* الموقع الجغرافي الدقيق */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-[var(--text)] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span>3. الموقع الجغرافي للحدث (المحافظة / الحي / المعلم):</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="مثال: قطاع غزة — دير البلح — بالقرب من مستشفى شهداء الأقصى"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-all"
                />
              </div>

              {/* تفاصيل المادة */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-[var(--text)] block">
                  4. تفاصيل الحدث والوقائع المشاهدة: *
                </label>
                <textarea
                  required
                  rows={5}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="اكتب كل التفاصيل بدقة: ماذا حدث؟ متى بالضبط؟ هل هناك جهات إسعافية متواجدة؟ أي شهود آخرين؟..."
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-all leading-relaxed"
                />
              </div>

              {/* رابط الصور أو مقاطع الفيديو */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-[var(--text)] flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5 text-[var(--gold)]" />
                  <span>5. رابط الملفات المرفقة (صور / فيديو / مستندات على درايف أو تليجرام):</span>
                </label>
                <input
                  type="url"
                  value={attachmentUrl}
                  onChange={(e) => setAttachmentUrl(e.target.value)}
                  placeholder="https://drive.google.com/... أو رابط مباشر للملف"
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)] transition-all font-mono"
                />
              </div>

              {/* خيار الحماية التامة للمبلغ (Whistleblower Protection) */}
              <div className="p-4 rounded-2xl glass-hud border border-[var(--gold)]/30 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded text-[var(--gold)] focus:ring-[var(--gold)] accent-[var(--gold)] cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-black text-white block">
                      تفعيل وضع «المصدر السري والمبلغ المحمي (Anonymous Protection)»
                    </span>
                    <span className="text-[11px] text-stone-300">
                      لن يتم الكشف عن اسمك أو وسيلة اتصالك إطلاقاً وسيتم تشفير البلاغ بموجب ميثاق الشرف.
                    </span>
                  </div>
                </label>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10 animate-in fade-in">
                    <div>
                      <span className="text-[10px] text-white/70 block mb-1">اسمك أو صفتك (اختياري):</span>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="الاسم الصحفي أو الشخصي"
                        className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-white/70 block mb-1">وسيلة التواصل (واتساب / هاتف / بريد):</span>
                      <input
                        type="text"
                        value={senderContact}
                        onChange={(e) => setSenderContact(e.target.value)}
                        placeholder="059xxxxxxx أو email@..."
                        className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* زر الإرسال */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-sm shadow-xl shadow-red-950/40 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? "جاري الإرسال والتشفير..." : "إرسال البلاغ فورياً إلى غرفة الأخبار"}</span>
              </button>
            </form>
          )}
        </div>

        {/* الشريط الجانبي: ميثاق حماية المبلغين (4 أعمدة) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card-hyper-luxury p-6 space-y-4 border border-[var(--gold)]/30">
            <div className="flex items-center gap-2 font-black text-sm text-[var(--text)] border-b border-[var(--border)] pb-3">
              <Lock className="w-5 h-5 text-emerald-400" />
              <span>ميثاق الحماية والسرية التامة</span>
            </div>

            <ul className="space-y-3 text-xs text-[var(--text-muted)]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>تشفير كامل:</strong> لا نقوم بتسجيل عناوين الـ IP أو بيانات الأجهزة للمبلغين السريين.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>حق حماية المصدر:</strong> نحمي هوية الشهود وفقاً للمادة 5 من ميثاق الشرف التحريري.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>فحص جنائي دقيق:</strong> تخضع المواد للتحقق بواسطة رادار الحقيقة لمنع تمرير الشائعات.</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
              <span>للبيانات بالغة الحساسية، يمكنك التواصل عبر بريدنا المشفر بتقنية PGP:</span>
              <code className="block mt-1 p-2 rounded-lg bg-black/40 text-[var(--gold)] font-mono text-[10px] break-all">
                secure-desk@alwatantoday.net
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
