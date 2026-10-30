"use client";

import { useState } from "react";
import { Mail, CheckCircle2, Sparkles, Clock, ShieldCheck, ArrowLeft, Users, Bell } from "lucide-react";

interface NewsletterEdition {
  id: string;
  title: string;
  time: string;
  description: string;
  badge: string;
}

const EDITIONS: NewsletterEdition[] = [
  {
    id: "morning",
    title: "إيجاز الصباح التحريري",
    time: "يومياً عند الساعة 07:30 صباحاً",
    description: "ملخص مكثف في 4 دقائق يضعك في قلب أهم أحداث غزة، القدس، العالم العربي، والعناوين الدولية.",
    badge: "الأكثر اشتراكاً",
  },
  {
    id: "economy",
    title: "إيجاز الوطن الاقتصادي والذهب",
    time: "كل جمعة عند الساعة 04:00 عصراً",
    description: "رصد لأسعار الصرف (شيكل ودولار ودينار)، أعيرة الذهب في فلسطين، وتوقعات الأسواق وسوق العمل.",
    badge: "تخصصي مالي",
  },
  {
    id: "investigations",
    title: "كواليس التحقيقات والتحقق",
    time: "كل إثنين عند الساعة 12:00 ظهراً",
    description: "تحقيقات استقصائية حصرية وكشف الأخبار المضللة مع إثباتات المصادر وحقائق الميدان.",
    badge: "تحقيقات معمقة",
  },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [selectedEditions, setSelectedEditions] = useState<string[]>(["morning", "economy"]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const toggleEdition = (id: string) => {
    if (selectedEditions.includes(id)) {
      if (selectedEditions.length > 1) {
        setSelectedEditions(selectedEditions.filter((e) => e !== id));
      }
    } else {
      setSelectedEditions([...selectedEditions, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <div className="container-custom py-12 max-w-4xl mx-auto space-y-12">
      {/* الترويسة الفاخرة */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center mx-auto shadow-lg">
          <Mail className="w-8 h-8" />
        </div>

        <div className="flex items-center justify-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>نشرات «الوطن اليوم» الذكية</span>
          </span>
          <span className="flex items-center gap-1 text-xs text-[var(--text-muted)] bg-[var(--surface)] px-3 py-1 rounded-full border border-[var(--border)]">
            <Users className="w-3.5 h-3.5 text-emerald-500" />
            <span>أكثر من 28,400 مشترك</span>
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-[var(--text)] tracking-tight">
          الخبر الصادق والسياق الكامل في بريدك
        </h1>

        <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
          انضم إلى آلاف القراء والمتابعين الذين يبدأون يومهم مع خلاصاتنا التحريرية الموثقة بروابط المصادر الأصلية دون ضجيج أو تهويل.
        </p>
      </div>

      {status === "success" ? (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 md:p-12 text-center max-w-xl mx-auto space-y-4 shadow-sm animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[var(--text)]">
            أهلاً بك في أسرة قراء الوطن اليوم!
          </h2>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            تم تسجيل بريدك <strong>{email}</strong> بنجاح. أرسلنا لك رسالة ترحيبية قصيرة لتأكيد الاشتراك. ستصلك أول نشرة في الموعد المحدد.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
          {/* اختيار النشرات المفضلة */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-[var(--text)] mb-1">
              اختر النشرات التي تود استلامها في بريدك:
            </label>

            <div className="grid grid-cols-1 gap-3">
              {EDITIONS.map((ed) => {
                const isSelected = selectedEditions.includes(ed.id);

                return (
                  <div
                    key={ed.id}
                    onClick={() => toggleEdition(ed.id)}
                    className={`rounded-xl border p-4 cursor-pointer transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? "border-[var(--primary)] bg-[var(--primary)]/5 ring-1 ring-[var(--primary)]/30"
                        : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/40"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                          : "border-[var(--border)] bg-[var(--bg)]"
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-bold text-sm text-[var(--text)]">
                          {ed.title}
                        </h3>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--bg)] text-[var(--primary)] border border-[var(--border)]">
                          {ed.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-2">
                        {ed.description}
                      </p>
                      <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[var(--primary)]" />
                        <span>{ed.time}</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* حقل إدخال البريد الإلكتروني وزر الاشتراك */}
          <div className="space-y-3 pt-2">
            <label htmlFor="email" className="block text-xs font-bold text-[var(--text)]">
              عنوان بريدك الإلكتروني المفضل:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="flex-1 px-4 py-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)] shadow-sm"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="px-8 py-3.5 rounded-xl bg-[var(--primary)] text-white font-bold text-sm hover:bg-[var(--primary-hover)] transition-all shadow-md shrink-0 flex items-center justify-center gap-2"
              >
                {status === "submitting" ? (
                  <span>جارٍ التسجيل...</span>
                ) : (
                  <>
                    <span>اشتراك مجاني فوري</span>
                    <ArrowLeft className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-[var(--border)] flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>خصوصيتك مضمونة 100%. بدون إعلانات مزعجة، وإلغاء الاشتراك متاح بنقرة واحدة دائماً.</span>
          </div>
        </form>
      )}
    </div>
  );
}
