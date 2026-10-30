"use client";

import { useEffect, useState } from "react";
import { AlertOctagon, CheckCircle, ShieldAlert, Loader2 } from "lucide-react";

export function KillSwitchButton() {
  const [isKilled, setIsKilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // جلب حالة مفتاح الإيقاف الطارئ
    fetch("/api/killswitch")
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.isKilled === "boolean") {
          setIsKilled(data.isKilled);
        }
      })
      .catch(() => {});
  }, []);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/killswitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kill: !isKilled }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setIsKilled(data.isKilled);
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || "فشل تنفيذ العملية");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
          isKilled
            ? "bg-rose-600 text-white animate-pulse border border-rose-400"
            : "bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20"
        }`}
      >
        <AlertOctagon className="w-3.5 h-3.5" />
        <span>
          {isKilled ? "🚨 النشر معطل (Kill Switch نشط)" : "🛑 مفتاح الإيقاف الطارئ"}
        </span>
      </button>

      {/* نافذة التأكيد لمنع الضغط بالخطأ */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="w-full max-w-md bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl p-6 space-y-4 animate-in fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <h3>
                {isKilled
                  ? "إلغاء وضع الطوارئ واستئناف النشر الآلي؟"
                  : "تفعيل مفتاح الإيقاف الطارئ (Master Kill Switch)؟"}
              </h3>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {isKilled
                ? "سيتم استئناف دورة النشر الآلي للأخبار المعتمدة في غرفة الأخبار وتحويل المقالات المقبولة مباشرة إلى البوابة العامة."
                : "سيتم فوراً إيقاف كافة عمليات النشر الآلي على الموقع، وحجز كافة الأخبار الواردة في طابور المراجعة البشرية حتى إشعار آخر."}
            </p>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-[var(--border)] text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                إلغاء
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={handleToggle}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer text-white shadow-sm ${
                  isKilled ? "bg-emerald-600 hover:bg-emerald-500" : "bg-rose-600 hover:bg-rose-500"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : isKilled ? (
                  <CheckCircle className="w-3.5 h-3.5" />
                ) : (
                  <AlertOctagon className="w-3.5 h-3.5" />
                )}
                <span>{isKilled ? "نعم، استئناف النشر الآلي" : "نعم، تفعيل الإيقاف الطارئ الآن"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
