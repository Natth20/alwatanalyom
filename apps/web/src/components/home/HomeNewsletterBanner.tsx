"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Mail, Send, CheckCircle2, AlertCircle, ShieldCheck, Sparkles, ChevronLeft } from "lucide-react";

export function HomeNewsletterBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes("@")) return;

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/v1/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, lists: ["morning", "economy"] }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error?.message || "تعذر إتمام الاشتراك حالياً.");
      }
      setStatus("success");
      setMessage(json.message || "تم تسجيل اشتراكك! يرجى مراجعة بريدك لتأكيد الاشتراك.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message || "حدث خطأ غير متوقع، حاول مرة أخرى.");
    }
  };

  return (
    <section className="relative rounded-3xl overflow-hidden border border-[var(--gold)]/35 bg-gradient-to-r from-[#24020b] via-[#150208] to-[#0a0104] text-white p-7 sm:p-10 shadow-2xl">
      <div className="pointer-events-none absolute -top-24 start-1/4 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/35 text-[var(--gold)] text-xs font-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span>نشرة «إيجاز الفجر» والملخص الاقتصادي الأسبوعي</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
            ابدأ صباحك بخلاصة <span className="text-[var(--gold)]">الخبر الموثق وأسعار الذهب</span> في بريدك
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-2xl">
            ملخص يومي موجز في 4 دقائق يجمع أهم تطورات فلسطين والعالم وأسعار الصرف والذهب، بدون إعلانات مزعجة وبإلغاء اشتراك بنقرة واحدة.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-stone-400 pt-1">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>تأكيد مزدوج وحماية للخصوصية</span>
            </span>
            <Link href="/newsletter" className="text-[var(--gold)] hover:underline font-bold flex items-center gap-0.5">
              <span>تخصيص النشرات البريدية</span>
              <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-3">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2.5 bg-black/55 border border-[var(--gold)]/35 focus-within:border-[var(--gold)] rounded-2xl p-2 shadow-inner"
          >
            <div className="relative flex-1 flex items-center">
              <Mail className="w-4 h-4 text-[var(--gold)] ms-3 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="بريدك الإلكتروني للاشتراك..."
                className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder:text-stone-500 outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] font-black text-xs hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-60"
            >
              <Send className="w-3.5 h-3.5 rtl:rotate-180" />
              <span>{status === "loading" ? "جارٍ..." : "اشتراك مجاني"}</span>
            </button>
          </form>

          {status === "success" && (
            <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </p>
          )}
          {status === "error" && (
            <p className="text-xs text-rose-400 flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
