"use client";

import { useState } from "react";
import InstitutionalNav from "@/components/InstitutionalNav";
import {
  Mail,
  Send,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PhoneCall,
  MapPin,
  Globe,
  Radio,
  FileText,
  User,
  AtSign,
  Phone,
  Sparkles,
  Lock,
  ExternalLink,
  MessageSquare,
  BadgeAlert,
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [dept, setDept] = useState<"editorial" | "opinion" | "technical" | "advertising" | "management">("editorial");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const departments = [
    {
      id: "editorial",
      title: "غرفة التحرير والميدان",
      sla: "خلال 15 - 30 دقيقة",
      desc: "لتغطية الأخبار العاجلة، التصحيحات الصحفية، والبيانات الرسمية من الميدان.",
      email: "editorial@alwatantoday.net",
    },
    {
      id: "opinion",
      title: "منبر الرأي والتحليلات",
      sla: "خلال 12 - 24 ساعة",
      desc: "لاستقبال مقالات الكتّاب، والدراسات الفكرية والاستراتيجية المستقلة.",
      email: "opinion@alwatantoday.net",
    },
    {
      id: "technical",
      title: "الدعم التقني وأمن المعلومات",
      sla: "خلال ساعتين",
      desc: "للإبلاغ عن أعطال المنصة، مشاكل التصفح، واستفسارات التشفير والحسابات.",
      email: "support@alwatantoday.net",
    },
    {
      id: "advertising",
      title: "الإعلانات والرعايات التجارية",
      sla: "خلال 4 ساعات عمل",
      desc: "لحملات الإعلان السياقي، رعاية البث، وشراكات منصة «يلا سبورت».",
      email: "ads@alwatantoday.net",
    },
    {
      id: "management",
      title: "الإدارة العامة والشؤون القانونية",
      sla: "خلال 24 ساعة عمل",
      desc: "للتراخيص والمراسلات السيادية وقضايا التحكيم وحقوق الملكية.",
      email: "management@alwatantoday.net",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          subject: subject || undefined,
          department: dept,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error?.message || "تعذر إرسال الرسالة، يرجى التحقق من البيانات المدخلة.");
      }

      const generatedCode = `AWT-TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setTrackingCode(generatedCode);
      setSent(true);
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-24 selection:bg-cyan-500/30">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="contact" />

      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] via-[var(--surface)]/60 to-[var(--bg)] py-14 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container-custom max-w-5xl mx-auto px-4 relative z-10 space-y-6 text-center md:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold shadow-sm">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>غرفة العمليات المركزية والاتصال المؤسسي المباشر</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-[var(--text)] tracking-tight">
            الاتصال بهيئة التحرير والإدارة العامة
          </h1>

          <p className="text-sm md:text-base text-[var(--text-muted)] max-w-3xl leading-relaxed">
            قنوات تواصل مفتوحة على مدار الساعة لخدمة القارئ والباحث والناشر. نلتزم بالرد السريع والمهني على كافة الاستفسارات، الشراكات الإعلامية، والبيانات الصحفية عبر مكاتبنا الميدانية وغرف التحرير المركزية.
          </p>

          {/* لوحة مؤشرات زمن الاستجابة والشفافية */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-4xl">
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1">
              <span className="text-xl md:text-2xl font-black text-cyan-500 block">24/7</span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)]">جاهزية غرفة الأخبار</span>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1">
              <span className="text-xl md:text-2xl font-black text-cyan-500 block">&lt; 30 دقيقة</span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)]">متوسط استجابة التحرير</span>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1">
              <span className="text-xl md:text-2xl font-black text-cyan-500 block">5 أقسام</span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)]">توجيه آلي تخصصي</span>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1">
              <span className="text-xl md:text-2xl font-black text-cyan-500 block">100% مشفر</span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)]">سرية المراسلات</span>
            </div>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="container-custom max-w-5xl mx-auto px-4 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* النموذج المؤسسي المتقدم (7 أعمدة) */}
          <div className="lg:col-span-7 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-500" />
                <h2 className="text-lg font-black text-[var(--text)]">إرسال برقية مباشرة إلى القسم المختص</h2>
              </div>
              <span className="text-[11px] text-[var(--text-muted)]">تذكرة متابعة تلقائية</span>
            </div>

            {sent ? (
              <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-[var(--text)]">تم استلام بريدكم بنجاح</h3>
                  <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
                    سُجلت رسالتك رسمياً في نظام التذاكر التحريرية وأُحيلت لرئيس القسم المعني. سيصلك إشعار بالرد على بريدك الإلكتروني.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-emerald-500/20 bg-[var(--bg)] max-w-xs mx-auto text-center">
                  <span className="text-[10px] text-[var(--text-muted)] block">رقم المتابعة المؤسسي (Tracking Ticket):</span>
                  <code className="text-sm font-black font-mono text-emerald-500">{trackingCode}</code>
                </div>

                <button
                  onClick={() => {
                    setSent(false);
                    setMessage("");
                    setSubject("");
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm"
                >
                  إرسال مراسلة جديدة
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-500" />
                      <span>الاسم الكامل *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="مثال: يوسف المقدسي"
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1.5 flex items-center gap-1.5">
                      <AtSign className="w-3.5 h-3.5 text-cyan-500" />
                      <span>البريد الإلكتروني للرد *</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-cyan-500" />
                      <span>رقم الهاتف / واتساب (اختياري)</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+970 / +962 / +971 ..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--text)] mb-1.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-cyan-500" />
                      <span>القسم الموجه إليه *</span>
                    </label>
                    <select
                      value={dept}
                      onChange={(e) => setDept(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-cyan-500 transition-colors cursor-pointer"
                    >
                      <option value="editorial">غرفة التحرير والميدان (عاجل وملاحظات)</option>
                      <option value="opinion">منبر الرأي والتحليلات الفكرية</option>
                      <option value="technical">الدعم التقني وأمن المعلومات</option>
                      <option value="advertising">الإعلانات والرعايات التجارية</option>
                      <option value="management">الإدارة العامة والشؤون القانونية</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text)] mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-500" />
                    <span>موضوع الرسالة (اختياري)</span>
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="عنوان موجز يوضح فحوى المراسلة..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-[var(--text)] flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-cyan-500" />
                      <span>نص المراسلة أو البيان *</span>
                    </label>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {message.length}/4000 حرف (الحد الأدنى 10 أحرف)
                    </span>
                  </div>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب رسالتك، استفسارك، أو تفاصيل الملاحظة هنا بكل وضوح وتفصيل..."
                    className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-cyan-500 transition-colors leading-relaxed"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 text-xs font-bold flex items-center gap-2">
                    <BadgeAlert className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || message.length < 10}
                  className="w-full py-3 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "جاري الإرسال وتوثيق التذكرة..." : "إرسال الرسالة إلى إدارة المنصة"}</span>
                </button>
              </form>
            )}
          </div>

          {/* معلومات الأقسام والمكاتب الميدانية (5 أعمدة) */}
          <div className="lg:col-span-5 space-y-6">
            {/* بطاقة توجيه الأقسام وسرعة الاستجابة */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4">
              <h3 className="font-bold text-sm text-[var(--text)] pb-2 border-b border-[var(--border)] flex items-center justify-between">
                <span>سرعة استجابة الأقسام المباشرة</span>
                <Clock className="w-4 h-4 text-cyan-500" />
              </h3>

              <div className="space-y-3">
                {departments.map((d) => (
                  <div
                    key={d.id}
                    className={`p-3 rounded-xl border transition-all text-xs space-y-1 ${
                      dept === d.id
                        ? "border-cyan-500/40 bg-cyan-500/5"
                        : "border-[var(--border)] bg-[var(--bg)]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[var(--text)]">{d.title}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--surface)] text-cyan-600 dark:text-cyan-400 font-bold border border-[var(--border)]">
                        {d.sla}
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)]">{d.desc}</p>
                    <a
                      href={`mailto:${d.email}`}
                      className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 hover:underline block pt-0.5"
                    >
                      {d.email}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* شبكة مكاتب ومراسلي الوطن اليوم الميدانية */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4">
              <h3 className="font-bold text-sm text-[var(--text)] pb-2 border-b border-[var(--border)] flex items-center justify-between">
                <span>المكاتب الميدانية وغرف الأخبار الإقليمية</span>
                <MapPin className="w-4 h-4 text-emerald-500" />
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--text)]">مكتب القدس وفلسطين</span>
                    <span className="text-[10px] text-emerald-500 font-bold">بث مباشر 24/7</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    تغطية الميدان، المستجدات العاجلة، وشبكة المراسلين في القدس والضفة الغربية وقطاع غزة.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[var(--text)]">مكتب العواصم الإقليمية</span>
                    <span className="text-[10px] text-cyan-500 font-bold">عمان • القاهرة • دبي</span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    التنسيق الدبلوماسي والإخباري الإقليمي وشبكة وكالات الأنباء الشريكة في الوطن العربي.
                  </p>
                </div>
              </div>
            </div>

            {/* بطاقة الاتصال المشفر والمصادر السرية (Whistleblower PGP Box) */}
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 space-y-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
                <Lock className="w-4 h-4" />
                <span>للتسريبات والاتصال الصحفي فائق السرية</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                إذا كنت مصدراً صحفياً أو مبلغاً ترغب في إرسال مستندات حساسة دون الكشف عن هويتك، يرجى استخدام بوابة التسريبات المشفرة مباشرة:
              </p>
              <Link
                href="/submit-news"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-1"
              >
                <span>الانتقال لبوابة تقديم البلاغات المشفرة</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
