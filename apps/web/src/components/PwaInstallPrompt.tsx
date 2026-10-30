"use client";

import { useEffect, useState } from "react";
import { Download, X, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);

  useEffect(() => {
    // تحقق إذا كان التطبيق مثبتاً ويعمل بوضع standalone
    if (typeof window === "undefined") return;

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) return;

    // فحص الإغلاق السابق (عدم الإزعاج لمدة 7 أيام)
    const dismissedAt = localStorage.getItem("awt_pwa_dismissed");
    if (dismissedAt) {
      const elapsedDays = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (elapsedDays < 7) {
        return;
      }
    }

    // فحص ما إذا كان الجهاز iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isAppleIos = /iphone|ipad|ipod/.test(ua) && !(window as any).MSStream;
    if (isAppleIos) {
      setIsIos(true);
      // تأخير بسيط لإظهار العرض برفق
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }

    // مستمع لحدث beforeinstallprompt في أندرويد وكروم
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosInstructions(true);
      return;
    }

    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowPrompt(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowIosInstructions(false);
    try {
      localStorage.setItem("awt_pwa_dismissed", Date.now().toString());
    } catch {
      // تجاهل أخطاء التخزين
    }
  };

  if (!showPrompt) return null;

  return (
    <aside
      aria-label="تثبيت تطبيق الوطن اليوم"
      className="fixed bottom-20 md:bottom-6 start-4 end-4 md:start-auto md:end-6 md:w-96 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="rounded-2xl border border-emerald-500/30 bg-[var(--surface)]/95 backdrop-blur-md p-4 shadow-2xl text-[var(--text)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold leading-tight flex items-center gap-1.5">
                تطبيق «الوطن اليوم»
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                  مباشر
                </span>
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5 leading-snug">
                أضف المنصة لشاشتك الرئيسية لتصفح أسرع وتنبيهات العاجل
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            aria-label="إغلاق التنبيه"
            className="text-[var(--text-muted)] hover:text-[var(--text)] p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {showIosInstructions ? (
          <div className="mt-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed border border-emerald-500/20">
            لتثبيت التطبيق على جهازك: اضغط على زر المشاركة{" "}
            <span className="inline-block px-1 py-0.5 bg-black/10 dark:bg-white/10 rounded font-mono font-bold">
              Share ⎋
            </span>{" "}
            أسفل متصفح Safari، ثم اختر{" "}
            <strong>«إضافة إلى الشاشة الرئيسية» (Add to Home Screen)</strong>.
          </div>
        ) : (
          <div className="flex items-center justify-end gap-2 mt-3 pt-2 border-t border-[var(--border)]">
            <button
              onClick={handleDismiss}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition-colors"
            >
              لاحقاً
            </button>
            <button
              onClick={handleInstallClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold shadow transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تثبيت التطبيق</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

