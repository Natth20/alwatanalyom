"use client";

import { useState } from "react";
import { Pause, Play, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  sourceId: string;
  enabled: boolean;
}

export function SourceRowActions({ sourceId, enabled: initialEnabled }: Props) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/sources", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: sourceId,
          enabled: !enabled,
        }),
      });

      if (!res.ok) throw new Error();

      setEnabled(!enabled);
      router.refresh();
    } catch {
      alert("تعذر تعديل حالة المصدر");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isLoading}
      title={enabled ? "إيقاف جلب الخلاصات مؤقتاً" : "استئناف جلب الخلاصات"}
      className={`px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
        enabled
          ? "border border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30"
      }`}
    >
      {isLoading ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : enabled ? (
        <>
          <Pause className="w-3 h-3" />
          <span>إيقاف</span>
        </>
      ) : (
        <>
          <Play className="w-3 h-3" />
          <span>تشغيل</span>
        </>
      )}
    </button>
  );
}

