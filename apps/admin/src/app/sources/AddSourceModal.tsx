"use client";

import { useState } from "react";
import { Plus, X, ShieldAlert, CheckCircle2, Loader2, Rss } from "lucide-react";
import { useRouter } from "next/navigation";

export function AddSourceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [nameAr, setNameAr] = useState("");
  const [homepageUrl, setHomepageUrl] = useState("");
  const [feedUrl, setFeedUrl] = useState("");
  const [type, setType] = useState("NEWSPAPER");
  const [displayPolicy, setDisplayPolicy] = useState("TITLE_ONLY");
  const [pollSeconds, setPollSeconds] = useState(300);
  const [trustLevel, setTrustLevel] = useState(4);
  const [countryCode, setCountryCode] = useState("PS");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr.trim() || !feedUrl.trim()) {
      setError("يرجى إدخال اسم المصدر ورابط الخلاصة");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/sources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nameAr,
          homepageUrl,
          feedUrl,
          type,
          displayPolicy,
          pollSeconds,
          trustLevel,
          countryCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "فشل حفظ المصدر");
      }

      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء فحص أو إضافة المصدر");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIsOpen(true);
          setError(null);
          setSuccess(false);
        }}
        className="px-3.5 py-1.5 rounded-lg bg-[var(--primary)] text-slate-950 font-bold text-xs hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>إضافة مصدر إخباري جديد</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-2xl overflow-hidden p-6 space-y-5 animate-in fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div className="flex items-center gap-2">
                <Rss className="w-4 h-4 text-[var(--primary)]" />
                <h3 className="font-bold text-sm text-[var(--text)]">
                  إضافة مصدر وخلاصة RSS مع الفحص الآمن
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>تم التحقق من سلامة الرابط وإضافة المصدر بنجاح!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[var(--text)] mb-1">اسم المصدر أو الوكالة *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: وكالة معا الإخبارية"
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--text)] mb-1">
                  رابط الخلاصة (RSS / Atom Feed URL) *
                </label>
                <input
                  type="url"
                  required
                  dir="ltr"
                  placeholder="https://example.com/rss.xml"
                  value={feedUrl}
                  onChange={(e) => setFeedUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)] text-start font-mono"
                />
                <span className="text-[10px] text-[var(--text-muted)] mt-1 block">
                  سيتم فحص الرابط تلقائياً عبر درع حماية SSRF ومنع طلب العناوين الخاصة أو الداخلية.
                </span>
              </div>

              <div>
                <label className="block font-bold text-[var(--text)] mb-1">رابط الموقع الرسمي (Homepage)</label>
                <input
                  type="url"
                  dir="ltr"
                  placeholder="https://example.com"
                  value={homepageUrl}
                  onChange={(e) => setHomepageUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)] text-start font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[var(--text-muted)] mb-1">سياسة العرض</label>
                  <select
                    value={displayPolicy}
                    onChange={(e) => setDisplayPolicy(e.target.value)}
                    className="w-full px-2 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                  >
                    <option value="TITLE_ONLY">العنوان فقط (Title Only)</option>
                    <option value="EXCERPT">مقتطف قصير (Excerpt)</option>
                    <option value="SUMMARY">ملخص تحريري (Summary)</option>
                    <option value="LICENSED_FULL">مرخص بالكامل (Licensed Full)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[var(--text-muted)] mb-1">دورة الجلب</label>
                  <select
                    value={pollSeconds}
                    onChange={(e) => setPollSeconds(parseInt(e.target.value, 10))}
                    className="w-full px-2 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                  >
                    <option value="120">كل دقيقتين (120 ثانية)</option>
                    <option value="300">كل 5 دقائق (300 ثانية)</option>
                    <option value="600">كل 10 دقائق (600 ثانية)</option>
                    <option value="1800">كل نصف ساعة (1800 ثانية)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[var(--text-muted)] mb-1">نوع المصدر</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-2 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                  >
                    <option value="NEWSPAPER">صحيفة أو موقع إخباري</option>
                    <option value="AGENCY">وكالة أنباء رسمية</option>
                    <option value="CHANNEL">قناة تلفزيونية</option>
                    <option value="OFFICIAL">مؤسسة رسمية</option>
                    <option value="ECONOMIC">مصدر اقتصادي</option>
                    <option value="SPORTS">مصدر رياضي</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[var(--text-muted)] mb-1">مستوى الثقة (Trust)</label>
                  <select
                    value={trustLevel}
                    onChange={(e) => setTrustLevel(parseInt(e.target.value, 10))}
                    className="w-full px-2 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
                  >
                    <option value="5">5 نجوم (موثوقية قصوى)</option>
                    <option value="4">4 نجوم (موثوق)</option>
                    <option value="3">3 نجوم (متوسط - يحال للمراجعة)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-1.5 rounded-lg bg-[var(--primary)] text-slate-950 font-bold hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {isLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>فحص واعتماد المصدر</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

