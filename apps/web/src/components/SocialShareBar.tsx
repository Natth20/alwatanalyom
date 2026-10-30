"use client";

import { useState } from "react";
import { Share2, Check, Copy, Send, MessageCircle } from "lucide-react";

interface Props {
  title: string;
  url?: string;
}

export function SocialShareBar({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return url || window.location.href;
    }
    return url || "https://alwatantoday.net";
  };

  const currentUrl = getShareUrl();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`${title}\n${currentUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const shareTelegram = () => {
    const text = encodeURIComponent(title);
    const u = encodeURIComponent(currentUrl);
    window.open(`https://t.me/share/url?url=${u}&text=${text}`, "_blank");
  };

  const shareTwitter = () => {
    const text = encodeURIComponent(title);
    const u = encodeURIComponent(currentUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${u}`, "_blank");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-2">
      <span className="text-xs font-bold text-[var(--text-muted)] me-1">
        مشاركة التغطية:
      </span>

      {/* واتساب */}
      <button
        onClick={shareWhatsApp}
        className="px-3 py-1.5 rounded-lg bg-emerald-600/10 hover:bg-emerald-600 text-emerald-700 dark:text-emerald-400 hover:text-white border border-emerald-600/20 text-xs font-bold transition-all flex items-center gap-1.5"
        title="مشاركة عبر واتساب"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>واتساب</span>
      </button>

      {/* تليجرام */}
      <button
        onClick={shareTelegram}
        className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500 text-sky-600 dark:text-sky-400 hover:text-white border border-sky-500/20 text-xs font-bold transition-all flex items-center gap-1.5"
        title="مشاركة عبر تليجرام"
      >
        <Send className="w-3.5 h-3.5" />
        <span>تليجرام</span>
      </button>

      {/* منصة X */}
      <button
        onClick={shareTwitter}
        className="px-3 py-1.5 rounded-lg bg-slate-800/10 hover:bg-slate-900 text-slate-800 dark:text-slate-200 hover:text-white border border-slate-700/20 text-xs font-bold transition-all flex items-center gap-1.5"
        title="مشاركة على منصة X"
      >
        <span className="font-bold text-xs">𝕏</span>
        <span>منصة X</span>
      </button>

      {/* نسخ الرابط */}
      <button
        onClick={handleCopy}
        className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 ${
          copied
            ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
            : "bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] border-[var(--border)]"
        }`}
        title="نسخ رابط المقال"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>تم النسخ!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>نسخ الرابط</span>
          </>
        )}
      </button>
    </div>
  );
}
