"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Cookie, Check, X } from "lucide-react";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("awt_cookie_consent");
      if (!consent) {
        setVisible(true);
      }
    } catch {}
  }, []);

  const handleConsent = (type: "all" | "essential") => {
    try {
      localStorage.setItem("awt_cookie_consent", type);
      if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: "consent_update",
          consent_type: type,
          analytics_storage: type === "all" ? "granted" : "denied",
          ad_storage: type === "all" ? "granted" : "denied",
        });
      }
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="إشعار ملفات تعريف الارتباط والخصوصية"
      className="fixed bottom-4 inset-x-4 md:inset-x-auto md:start-6 md:max-w-md z-50 animate-slide-up"
    >
      <div className="rounded-2xl border border-[var(--gold)]/30 bg-[var(--maroon-dark)]/95 text-white p-5 shadow-2xl backdrop-blur-md space-y-3">
        <div className="flex items-center gap-2">
          <Cookie className="w-4 h-4 text-[var(--gold)] shrink-0" />
          <h3 className="text-xs font-bold text-[var(--gold)]">
            الشفافية في استخدام ملفات تعريف الارتباط (Cookies)
          </h3>
        </div>

        <p className="text-[11px] text-stone-200 leading-relaxed">
          نستخدم ملفات الارتباط وتقنيات القياس (بما فيها Google Tag Manager) لتحسين سرعة التصفح وقياس تفاعل القراء بأمان. يمكنك قراءة التفاصيل في{" "}
          <Link href="/privacy" className="underline hover:text-[var(--gold)] font-bold">
            سياسة الخصوصية
          </Link>.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleConsent("all")}
            className="flex-1 px-3 py-2 rounded-xl bg-[var(--gold)] text-[var(--maroon-dark)] font-black text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>قبول الكل</span>
          </button>

          <button
            type="button"
            onClick={() => handleConsent("essential")}
            className="px-3 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-stone-200 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>الأساسية فقط</span>
          </button>
        </div>
      </div>
    </div>
  );
}
