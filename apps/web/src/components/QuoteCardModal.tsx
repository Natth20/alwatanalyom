"use client";

import { useState, useRef } from "react";
import { Quote, Download, Copy, Check, X, Share2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultQuote: string;
  articleTitle: string;
  sourceName?: string;
  articleUrl: string;
}

export function QuoteCardModal({
  isOpen,
  onClose,
  defaultQuote,
  articleTitle,
  sourceName = "الوطن اليوم",
  articleUrl,
}: Props) {
  const [quoteText, setQuoteText] = useState(defaultQuote);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleCopyText = async () => {
    const fullShareText = `"${quoteText}"\n\nمن مقال: ${articleTitle}\nالمصدر: ${sourceName} عبر «الوطن اليوم»\n${articleUrl}`;
    await navigator.clipboard.writeText(fullShareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadImage = () => {
    setIsExporting(true);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setIsExporting(false);
      return;
    }

    // مقاس بطاقة الاقتباس 1200x675 (16:9 مثالي لمواقع التواصل)
    canvas.width = 1200;
    canvas.height = 675;

    // الخلفية والتدرج
    const gradient = ctx.createLinearGradient(0, 0, 1200, 675);
    gradient.addColorStop(0, "#062b1b");
    gradient.addColorStop(0.5, "#0b5d3b");
    gradient.addColorStop(1, "#03170e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 675);

    // حدود البطاقة
    ctx.strokeStyle = "rgba(52, 211, 153, 0.3)";
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 1140, 615);

    // زخرفة علامة الاقتباس الكبرى بالخلفية
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.font = "bold 280px sans-serif";
    ctx.textAlign = "start";
    ctx.fillText("”", 100, 300);

    // ترويسة البطاقة: الشعار
    ctx.direction = "rtl";
    ctx.textAlign = "right";

    // نقطة الهوية
    ctx.fillStyle = "#e11d48";
    ctx.beginPath();
    ctx.arc(1100, 100, 12, 0, Math.PI * 2);
    ctx.fill();

    // اسم المنصة
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 38px sans-serif";
    ctx.fillText("الوطن اليوم", 1070, 112);

    // تصنيف المنصة
    ctx.fillStyle = "rgba(167, 243, 208, 0.8)";
    ctx.font = "20px sans-serif";
    ctx.fillText("المنصة الإخبارية المستقلة · التغطية الموثقة", 1100, 145);

    // نص الاقتباس مع التفاف الأسطر
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 34px sans-serif";
    const maxWidth = 1000;
    const lineHeight = 56;
    const x = 1100;
    let y = 260;

    const words = quoteText.split(" ");
    let line = "";

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
        if (y > 480) {
          line += "...";
          break;
        }
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);

    // عنوان المقال الأصلي
    ctx.fillStyle = "rgba(209, 213, 219, 0.75)";
    ctx.font = "italic 22px sans-serif";
    ctx.fillText(`— نقلاً عن: ${articleTitle.slice(0, 80)}`, 1100, 540);

    // تذييل البطاقة
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText("alwatantoday.net · حرية، مهنية، وتحقق", 1100, 600);

    // رابط المصدر أسفل اليسار
    ctx.direction = "ltr";
    ctx.textAlign = "left";
    ctx.fillStyle = "#34d399";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(sourceName, 80, 600);

    // تصدير الصورة وتحميلها
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `alwatantoday-quote-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
    setIsExporting(false);
  };

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `"${quoteText}"\n\n${articleTitle}\n${articleUrl}`
  )}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${quoteText.slice(0, 180)}..."`
  )}&url=${encodeURIComponent(articleUrl)}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-6">
        {/* ترويسة المودال */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
              <Quote className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">بطاقة اقتباس للنشر والمشاركة</h3>
              <p className="text-[11px] text-[var(--text-muted)]">
                خصص نص الاقتباس وشاركه كصورة أو نص على شبكات التواصل
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* حقل تحرير الاقتباس */}
        <div className="space-y-1.5 text-xs">
          <label className="font-bold text-[var(--text)] block">
            نص الاقتباس (يمكنك تعديله أو انتقاء فقرة محددة):
          </label>
          <textarea
            rows={3}
            value={quoteText}
            onChange={(e) => setQuoteText(e.target.value)}
            className="w-full p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)] leading-relaxed"
          />
        </div>

        {/* المعاينة الحية لبطاقة الاقتباس */}
        <div
          ref={cardRef}
          className="relative rounded-2xl p-6 overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white border border-emerald-500/30 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="font-black text-sm tracking-tight">الوطن اليوم</span>
            </div>
            <span className="text-[11px] text-emerald-300 font-semibold">{sourceName}</span>
          </div>

          <div className="my-4 relative">
            <span className="text-4xl text-white/20 font-serif absolute -top-4 -start-2">“</span>
            <p className="text-sm md:text-base font-bold leading-relaxed pe-4 relative z-10">
              {quoteText || "أدخل نص الاقتباس..."}
            </p>
          </div>

          <div className="flex items-center justify-between text-[10px] text-emerald-200/70 pt-3 border-t border-white/10">
            <span className="truncate max-w-[280px]">{articleTitle}</span>
            <span className="font-mono">alwatantoday.net</span>
          </div>
        </div>

        {/* أزرار الإجراءات والمشاركة */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors inline-flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>واتساب</span>
            </a>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 hover:bg-black text-white text-xs font-bold transition-colors inline-flex items-center gap-1"
            >
              <span>منصة X</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-lg border border-[var(--border)] hover:bg-[var(--surface-hover)] text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "تم النسخ" : "نسخ النص"}</span>
            </button>
            <button
              onClick={handleDownloadImage}
              disabled={isExporting}
              className="px-4 py-1.5 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExporting ? "جاري التوليد..." : "تحميل كصورة (PNG)"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

