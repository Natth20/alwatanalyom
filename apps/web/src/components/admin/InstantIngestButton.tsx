"use client";

import { useState } from "react";
import { Zap, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export function InstantIngestButton() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleSync = async () => {
    if (loading) return;
    setLoading(true);
    setMessage(null);
    setIsError(false);

    try {
      const res = await fetch("/api/ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ limit: 8 }),
      });

      const data = await res.json();
      if (data.ok) {
        setMessage(data.message || `تم جلب الأخبار بنجاح!`);
        setIsError(false);
        router.refresh();
      } else {
        setMessage(data.error || "فشل الجلب");
        setIsError(true);
      }
    } catch {
      setMessage("فشل الاتصال بالخادم");
      setIsError(true);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage(null);
      }, 7000);
    }
  };

  return (
    <div className="relative flex items-center">
      <button
        onClick={handleSync}
        disabled={loading}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all shadow-xs ${
          loading
            ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 cursor-wait"
            : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:shadow-emerald-500/20 hover:scale-[1.02]"
        }`}
        title="جلب أحدث الأخبار من كافة المصادر المعتمدة ونشرها فوراً"
      >
        {loading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>جاري سحب الأخبار الحية...</span>
          </>
        ) : (
          <>
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>جلب الأخبار الحية الآن</span>
          </>
        )}
      </button>

      {message && (
        <div
          className={`absolute left-0 top-full mt-2 z-50 whitespace-nowrap px-3 py-1.5 rounded-lg border text-xs font-semibold shadow-lg animate-in fade-in slide-in-from-top-1 ${
            isError
              ? "bg-rose-950/90 text-rose-200 border-rose-800"
              : "bg-emerald-950/90 text-emerald-200 border-emerald-800"
          }`}
        >
          <div className="flex items-center gap-1.5">
            {isError ? (
              <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            )}
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

