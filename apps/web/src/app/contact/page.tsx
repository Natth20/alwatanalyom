"use client";

import { useState } from "react";
import { Mail, MessageSquare, Shield, CheckCircle2, Send, PhoneCall, Building2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("editorial");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
  };

  return (
    <div className="container-custom py-12 max-w-4xl mx-auto space-y-12">
      {/* الترويسة الرئيسية */}
      <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-r from-[var(--surface)] to-[var(--bg)] p-6 md:p-8 space-y-2 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary)] text-white flex items-center justify-center">
            <Mail className="w-4 h-4" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[var(--text)]">
            اتصل بهيئة التحرير وإدارة «الوطن اليوم»
          </h1>
        </div>
        <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed max-w-2xl">
          يسعدنا استقبال مقترحات القراء، البيانات الصحفية، طلبات التصحيح والشفافية، والشراكات المؤسسية مع الوكالات والناشرين في العالم العربي.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* نموذج المراسلة المباشر */}
        <div className="lg:col-span-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-[var(--text)] mb-4 pb-2 border-b border-[var(--border)]">
            أرسل رسالة مباشرة إلى القسم المختص
          </h2>

          {sent ? (
            <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h3 className="font-bold text-base text-[var(--text)]">تم استلام رسالتك بنجاح</h3>
              <p className="text-xs text-[var(--text-muted)]">
                شكراً لتواصلك معنا. سيقوم الفريق المختص بمراجعة رسالتك والرد على بريدك الإلكتروني في أقرب وقت.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setMessage("");
                }}
                className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-bold"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[var(--text)] mb-1.5">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: أحمد الفلسطيني"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[var(--text)] mb-1.5">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text)] mb-1.5">
                  القسم الموجه إليه
                </label>
                <select
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                >
                  <option value="editorial">غرفة التحرير والأخبار</option>
                  <option value="corrections">طلب تصحيح أو تدقيق مادة</option>
                  <option value="dmca">حقوق النشر والملكية الفكرية (DMCA)</option>
                  <option value="partnerships">الشراكات الإعلامية وتغذية الخلاصات</option>
                  <option value="tech">الدعم التقني والعمليات</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[var(--text)] mb-1.5">
                  نص الرسالة أو الملاحظة
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب تفاصيل رسالتك أو استفسارك هنا بكل وضوح..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>إرسال الرسالة إلى التحرير</span>
              </button>
            </form>
          )}
        </div>

        {/* بطاقات قنوات الاتصال الرسمية */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
            <div className="flex items-center gap-2 text-[var(--primary)] font-bold text-xs">
              <MessageSquare className="w-4 h-4" />
              <span>غرفة التحرير والملاحظات</span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              لإرسال البيانات والتصحيحات والتواصل التحريري:
            </p>
            <code className="text-xs font-bold text-[var(--primary)] block font-mono">
              editorial@alwatantoday.net
            </code>
          </div>

          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs">
              <Shield className="w-4 h-4" />
              <span>حقوق الملكية الفكرية (DMCA)</span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              للناشرين وأصحاب الحقوق لطلبات الإزالة والتنسيق:
            </p>
            <code className="text-xs font-bold text-[var(--primary)] block font-mono">
              dmca@alwatantoday.net
            </code>
          </div>

          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-xs">
              <Building2 className="w-4 h-4" />
              <span>الشراكات وتراخيص المحتوى</span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              لربط الخلاصات والتعاون المؤسسي:
            </p>
            <code className="text-xs font-bold text-[var(--primary)] block font-mono">
              partners@alwatantoday.net
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
