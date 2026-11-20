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
} from "lucide-react";

export default function DmcaPage() {
  const [claimantName, setClaimantName] = useState("");
  const [claimantEmail, setClaimantEmail] = useState("");
  const [infringingUrl, setInfringingUrl] = useState("");
  const [originalWorkUrl, setOriginalWorkUrl] = useState("");
  const [requestedAction, setRequestedAction] = useState("takedown");
  const [statementChecked, setStatementChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statementChecked) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="container-custom py-10 space-y-10">
      <InstitutionalNav />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* المحتوى الرئيسي (8 أعمدة) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="card-hyper-luxury p-6 sm:p-8 space-y-4 border border-[var(--gold)]/30">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#730020] via-[#590018] to-[#26000A] text-[var(--gold)] flex items-center justify-center font-black shadow-md border border-[var(--gold)]/40">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[var(--gold)] uppercase font-bold">
                  حماية الملكية الفكرية الدولية · DMCA & Copyright Compliance
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight">
                  حقوق الملكية الفكرية وطلبات إزالة المحتوى (DMCA)
                </h1>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed font-medium">
              تلتزم منصة «الوطن اليوم» بالامتثال التام لقوانين حماية حقوق المؤلف الدولية، بما في ذلك قانون الألفية الرقمية الأمريكي (DMCA) ومعاهدات المنظمة العالمية للملكية الفكرية (WIPO). نحترم حقوق الصحفيين والمصورين والناشرين، ونطبق بروتوكول استجابة فورية وحاسمة لأي إشعار انتهاك قانوني موثق.
            </p>
          </div>

          {/* بروتوكول الإشعار والإزالة السريعة (4-Hour Protocol) */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-[var(--text)] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)]" />
              <span>بروتوكول الإشعار والإزالة الفورية (Notice & Takedown Protocol)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl glass-hud border border-white/10 space-y-2 text-center">
                <span className="w-8 h-8 rounded-full bg-red-600/30 text-red-400 border border-red-500/40 flex items-center justify-center mx-auto text-xs font-black">
                  1
                </span>
                <h3 className="text-xs font-black text-white">الاستلام والتجميد الفوري</h3>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  تجميد المادة المدعى عليها مؤقتاً خلال 4 ساعات كحد أقصى لحين استكمال الفحص القانوني.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-hud border border-white/10 space-y-2 text-center">
                <span className="w-8 h-8 rounded-full bg-amber-600/30 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto text-xs font-black">
                  2
                </span>
                <h3 className="text-xs font-black text-white">إخطار الناشر والمحرر</h3>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  مراسلة محرر المادة لفحص مصدر المحتوى وسند الترخيص أو الاستخدام العادل الصحفي.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass-hud border border-white/10 space-y-2 text-center">
                <span className="w-8 h-8 rounded-full bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-xs font-black">
                  3
                </span>
                <h3 className="text-xs font-black text-white">السحب أو التسوية الدائمة</h3>
                <p className="text-[11px] text-stone-300 leading-relaxed">
                  الحذف النهائي، تصحيح العزو والرابط، أو الرد القانوني الرسمي خلال أقل من 24 ساعة.
                </p>
              </div>
            </div>
          </div>

          {/* نموذج تقديم طلب الإزالة التفاعلي */}
          <div className="card-hyper-luxury p-6 sm:p-8 space-y-6 border border-[var(--border)]">
            <div className="flex items-center gap-2 font-black text-base text-[var(--text)] border-b border-[var(--border)] pb-3">
              <FileText className="w-5 h-5 text-[var(--primary)]" />
              <span>تقديم إشعار رسمي بانتهاك حقوق الملكية الفكرية</span>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl glass-hud border border-emerald-500/40 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-black text-white">تم تسجيل طلب الإزالة وإحالته للدائرة القانونية</h3>
                <p className="text-xs text-stone-300 max-w-md mx-auto leading-relaxed">
                  تم إرسال نسخة من الإشعار إلى <code className="text-[var(--gold)] font-mono">dmca@alwatantoday.net</code>. سيتم تجميد المادة فوراً والرد عليك رسمياً خلال أقل من 24 ساعة.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-[var(--text)] block">
                      اسم المالك القانوني أو الوكيل المفوض: *
                    </label>
                    <input
                      type="text"
                      required
                      value={claimantName}
                      onChange={(e) => setClaimantName(e.target.value)}
                      placeholder="اسم المؤسسة أو المالك الفردي"
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-xs focus:outline-none focus:border-[var(--gold)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-black text-[var(--text)] block">
                      البريد الإلكتروني الرسمي للتواصل: *
                    </label>
                    <input
                      type="email"
                      required
                      value={claimantEmail}
                      onChange={(e) => setClaimantEmail(e.target.value)}
                      placeholder="legal@yourdomain.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-xs focus:outline-none focus:border-[var(--gold)] font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-[var(--text)] block">
                    رابط المادة المعنية على منصة «الوطن اليوم»: *
                  </label>
                  <input
                    type="url"
                    required
                    value={infringingUrl}
                    onChange={(e) => setInfringingUrl(e.target.value)}
                    placeholder="https://alwatantoday.net/article/..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-xs focus:outline-none focus:border-[var(--gold)] font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-[var(--text)] block">
                    رابط العمل الأصلي أو سند الملكية الفكرية: *
                  </label>
                  <input
                    type="url"
                    required
                    value={originalWorkUrl}
                    onChange={(e) => setOriginalWorkUrl(e.target.value)}
                    placeholder="رابط التقرير أو الصورة في موقعكم الأصلي"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-xs focus:outline-none focus:border-[var(--gold)] font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-[var(--text)] block">
                    الإجراء القانوني المطلوب تنفيذه:
                  </label>
                  <select
                    value={requestedAction}
                    onChange={(e) => setRequestedAction(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] text-xs focus:outline-none focus:border-[var(--gold)] cursor-pointer"
                  >
                    <option value="takedown">حذف وسحب المادة بالكامل من المنصة (HTTP 410)</option>
                    <option value="attribute">تعديل المادة ووضع عزو صريح ورابط مباشر للمصدر</option>
                    <option value="rss-stop">إيقاف استيراد الخلاصات نهائياً من موقعنا</option>
                  </select>
                </div>

                {/* الإقرار القانوني الملزم */}
                <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={statementChecked}
                      onChange={(e) => setStatementChecked(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-[var(--gold)] accent-[var(--gold)]"
                    />
                    <span className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                      أقر بحسن نية بأنني المالك الحصري لحقوق الطبع والنشر أو مفوض رسمياً بالتصرف نيابة عنه، وأن استخدام المحتوى لم يُرخص به من قبلي، وأتحمل المسؤولية القانونية الكاملة عن صحة هذه البيانات بموجب أحكام DMCA.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#590018] to-[#730020] text-[var(--gold)] font-black text-xs border border-[var(--gold)]/40 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "جاري تسجيل الإشعار..." : "إرسال إشعار الإزالة القانوني الرسمي"}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* الشريط الجانبي: المسؤول القانوني (4 أعمدة) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card-hyper-luxury p-6 space-y-4 border border-[var(--gold)]/30">
            <div className="flex items-center gap-2 font-black text-sm text-[var(--text)] border-b border-[var(--border)] pb-3">
              <Scale className="w-5 h-5 text-[var(--gold)]" />
              <span>مكتب الامتثال والمسؤول القانوني</span>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              للمراسلات المباشرة من الإدارات القانونية والوكالات الإخبارية، يرجى التوجيه إلى وكيل الـ DMCA المعتمد لدى المنصة:
            </p>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-white/50 block">البريد القانوني الرسمي:</span>
                <code className="text-emerald-400 font-mono text-xs font-bold">dmca@alwatantoday.net</code>
              </div>
              <div>
                <span className="text-[10px] text-white/50 block">المهلة القصوى للبت:</span>
                <span className="text-stone-200 font-bold">24 ساعة عمل رسمية</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border)]">
              <Link
                href="/terms"
                className="text-xs font-black text-[var(--gold)] hover:underline inline-flex items-center gap-1"
              >
                <span>مراجعة شروط الاستخدام والترخيص ←</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
