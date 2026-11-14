"use client";

import { useState } from "react";
import { Megaphone, ShieldCheck, Lock, CheckCircle2, Send, AlertTriangle, FileText, MapPin } from "lucide-react";
import Link from "next/link";

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
  const [errorMsg, setErrorMsg] = useState("");

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

      setSent(true);
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ غير متوقع أثناء إرسال الخبر");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-custom py-12 max-w-4xl mx-auto space-y-10">
      {/* الترويسة الرئيسية */}
      <div className="rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-r from-[var(--maroon-dark)] via-[#3D0010] to-[var(--maroon-dark)] text-white p-6 md:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[var(--gold)] text-[var(--maroon-dark)] flex items-center justify-center font-bold shadow-md">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-wider text-[var(--gold)] uppercase">
              قناة المشاركة المجتمعية · عين على الميدان
            </span>
            <h1 className="text-2xl md:text-3xl font-black">
              أرسل خبراً أو توثيقاً لغرفة تحرير «الوطن اليوم»
            </h1>
          </div>
        </div>

        <p className="text-xs md:text-sm text-stone-300 max-w-2xl leading-relaxed">
          نرحب بمشاركات شهود العيان، البلاغات الميدانية، والوثائق ذات الشأن العام. تلتزم هيئة التحرير بحماية مصادر المعلومات وسريتها التامة وفق المعايير الصحفية الدولية.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[var(--gold)]">
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>تشفير كامل وحماية لهوية المصادر</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>تدقيق صحفي إنساني صارم قبل أي نشر</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* نموذج الإرسال */}
        <div className="lg:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-sm">
          {sent ? (
            <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
              <h2 className="text-xl font-black text-[var(--text)]">تم استلام الخبر بنجاح</h2>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-md mx-auto">
                شكراً لمساهمتك وأمانتك الصحفية. تم تحويل البلاغ مباشرة إلى مكتب التحقق والتحرير الميداني لمطابقته وتوثيقه.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSent(false);
                    setTitle("");
                    setDetails("");
                    setLocation("");
                    setAttachmentUrl("");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors"
                >
                  إرسال خبر آخر
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[var(--text)] mb-1.5">
                  عنوان الخبر أو ملخص الحدث <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: قصف مدفعي يستهدف أطراف بلدة خزاعة شرق خان يونس"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--text)] mb-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[var(--primary)]" />
                    <span>مكان الحدث الدقيق</span>
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="المدينة، الحي، أو الشارع"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text)] mb-1.5 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-[var(--primary)]" />
                    <span>صفة المصدر</span>
                  </label>
                  <select
                    value={sourceType}
                    onChange={(e: any) => setSourceType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                  >
                    <option value="eyewitness">شاهد عيان حاضر في المكان</option>
                    <option value="document">وثيقة رسمية أو بيان مكتوب</option>
                    <option value="official_source">مصدر من جهة حكومية أو حقوقية</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text)] mb-1.5">
                  تفاصيل الخبر والوقائع بدقة <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="يرجى ذكر التوقيت، التفاصيل، الخسائر إن وجدت، والجهات المتواجدة بالمكان..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)] leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text)] mb-1.5">
                  رابط مواد موثقة (صور / فيديو / درايف)
                </label>
                <input
                  type="url"
                  value={attachmentUrl}
                  onChange={(e) => setAttachmentUrl(e.target.value)}
                  placeholder="https://drive.google.com/... أو رابط مباشر"
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                />
              </div>

              {/* حماية الخصوصية */}
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded text-[var(--primary)] focus:ring-[var(--primary)]"
                  />
                  <span className="text-xs font-bold text-[var(--text)]">
                    إرسال الخبر كمصدر مجهول تماماً (حجب الاسم والبيانات)
                  </span>
                </label>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[var(--border)]">
                    <div>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="اسمك الكامل (اختياري)"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={senderContact}
                        onChange={(e) => setSenderContact(e.target.value)}
                        placeholder="رقم الهاتف أو المعرّف (تيليغرام/واتساب)"
                        className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submitting ? "جاري الإرسال بأمان..." : "إرسال البلاغ إلى غرفة التحرير"}</span>
              </button>
            </form>
          )}
        </div>

        {/* الشريط الجانبي للإرشادات وميثاق الشرف */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>ميثاق أمانة نقل الأخبار</span>
            </div>
            <ul className="text-xs text-[var(--text-muted)] space-y-2 list-disc list-inside leading-relaxed">
              <li>لا تنشر أي معلومات تؤدي إلى تعريض حياة المدنيين أو الطواقم الطبية للخطر.</li>
              <li>يرجى التأكد من دقة الأرقام والأسماء لتفادي تداول الشائعات.</li>
              <li>جميع المواد المرسلة تخضع للمطابقة عبر فريق التحقق قبل اعتمادها.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
            <h3 className="text-xs font-bold text-[var(--text)]">للتواصل العاجل والمشفر:</h3>
            <p className="text-xs text-[var(--text-muted)]">
              يمكنك أيضاً مراسلة خط التحرير الآمن عبر تيليغرام مباشرة:
            </p>
            <a
              href="https://t.me/alwatanalyawm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[var(--primary)] block hover:underline"
            >
              @alwatanalyawm ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
