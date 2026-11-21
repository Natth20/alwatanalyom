"use client";

import { useState, useEffect } from "react";
import {
  Radio,
  Plus,
  Send,
  Flame,
  Trash2,
  ExternalLink,
} from "lucide-react";

interface CoverageItem {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  isActive: boolean;
  pinned: boolean;
  streamUrl: string | null;
  startedAt: string;
  _count?: { updates: number };
}

export default function AdminLivePage() {
  const [coverages, setCoverages] = useState<CoverageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoverageId, setSelectedCoverageId] = useState<string>("");
  const [newCoverageModal, setNewCoverageModal] = useState(false);

  // Form: New Live Update
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateBody, setUpdateBody] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [sourceName, setSourceName] = useState("مراسل الوطن اليوم");
  const [mediaUrl, setMediaUrl] = useState("");
  const [submittingUpdate, setSubmittingUpdate] = useState(false);

  // Form: New Coverage
  const [coverageTitle, setCoverageTitle] = useState("");
  const [coverageSummary, setCoverageSummary] = useState("");
  const [streamUrl, setStreamUrl] = useState("");
  const [creatingCoverage, setCreatingCoverage] = useState(false);

  const fetchCoverages = async () => {
    try {
      const res = await fetch("/api/live");
      const data = await res.json();
      if (data.ok) {
        setCoverages(data.coverages);
        if (data.coverages.length > 0 && !selectedCoverageId) {
          setSelectedCoverageId(data.coverages[0].id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoverages();
  }, []);

  const handlePostUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCoverageId || !updateBody.trim()) return;

    setSubmittingUpdate(true);
    try {
      const res = await fetch("/api/live/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coverageId: selectedCoverageId,
          title: updateTitle || null,
          bodyText: updateBody,
          isUrgent,
          sourceName,
          mediaUrl: mediaUrl || null,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setUpdateTitle("");
        setUpdateBody("");
        setMediaUrl("");
        setIsUrgent(false);
        fetchCoverages();
        alert("✓ تم بث التحديث اللحظي ونشره على الموقع فوراً!");
      } else {
        alert(data.error || "فشل إرسال التحديث");
      }
    } catch {
      alert("فشل الاتصال بالخادم");
    } finally {
      setSubmittingUpdate(false);
    }
  };

  const handleCreateCoverage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverageTitle.trim()) return;

    setCreatingCoverage(true);
    try {
      const res = await fetch("/api/live", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: coverageTitle,
          summary: coverageSummary || null,
          streamUrl: streamUrl || null,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setNewCoverageModal(false);
        setCoverageTitle("");
        setCoverageSummary("");
        setStreamUrl("");
        fetchCoverages();
      } else {
        alert(data.error || "فشل إنشاء التغطية");
      }
    } catch {
      alert("فشل الاتصال بالخادم");
    } finally {
      setCreatingCoverage(false);
    }
  };

  const toggleStatus = async (id: string, currentActive: boolean) => {
    try {
      await fetch(`/api/live/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentActive }),
      });
      fetchCoverages();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCoverage = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه التغطية وجميع تحديثاتها؟")) return;
    try {
      await fetch(`/api/live/${id}`, { method: "DELETE" });
      fetchCoverages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl">
      {/* رأس الصفحة */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[var(--text)]">غرفة التغطيات المباشرة اللحظية</h1>
              <p className="text-xs text-[var(--text-muted)]">
                بث التحديثات دقيقة بدقيقة ومتابعة الأحداث العاجلة مثل الجزيرة مباشر
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setNewCoverageModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء تغطية مباشرة جديدة</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* العمود الأيمن: نموذج بث التحديث اللحظي الفوري */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-rose-500" />
                <h2 className="font-bold text-sm text-[var(--text)]">بث تحديث لحظي جديد دقيقة بدقيقة</h2>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">
                يظهر للقراء فوراً دون تحديث
              </span>
            </div>

            <form onSubmit={handlePostUpdate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[var(--text)] mb-1">اختر ملف التغطية المباشرة *</label>
                <select
                  value={selectedCoverageId}
                  onChange={(e) => setSelectedCoverageId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)] font-semibold"
                >
                  {coverages.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.isActive ? "🟢 [نشطة] " : "⚪ [منتهية] "}
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[var(--text)] mb-1">عنوان التحديث (اختياري)</label>
                <input
                  type="text"
                  placeholder="مثال: غارة جوية على محيط المستشفى الإندونيسي"
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)] font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--text)] mb-1">نص التحديث الميداني *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="اكتب التحديث بالتفصيل هنا..."
                  value={updateBody}
                  onChange={(e) => setUpdateBody(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)] leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[var(--text)] mb-1">المصدر الصحفي</label>
                  <input
                    type="text"
                    value={sourceName}
                    onChange={(e) => setSourceName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[var(--text)] mb-1">رابط صورة التحديث (اختياري)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-[var(--text)]">
                  <input
                    type="checkbox"
                    checked={isUrgent}
                    onChange={(e) => setIsUrgent(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span className="flex items-center gap-1 text-rose-500">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>تمييز كخبر عاجل بلون أحمر ونغمة تنبيه</span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={submittingUpdate}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors disabled:opacity-50 shadow-xs"
                >
                  {submittingUpdate ? "جاري البث..." : "بث التحديث الآن 🚀"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* العمود الأيسر: قائمة ملفات التغطية الحية وحالتها */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-3 shadow-xs">
            <h2 className="font-bold text-sm text-[var(--text)] border-b border-[var(--border)] pb-2.5">
              ملفات التغطية المسجلة ({coverages.length})
            </h2>

            {loading ? (
              <div className="p-8 text-center text-xs text-[var(--text-muted)]">جاري التحميل...</div>
            ) : coverages.length === 0 ? (
              <div className="p-8 text-center text-xs text-[var(--text-muted)]">
                لا توجد تغطيات مباشرة حالياً
              </div>
            ) : (
              <div className="space-y-3">
                {coverages.map((c) => (
                  <div
                    key={c.id}
                    className={`p-4 rounded-xl border transition-all ${
                      selectedCoverageId === c.id
                        ? "border-rose-500 bg-rose-500/5 shadow-xs"
                        : "border-[var(--border)] bg-[var(--surface-hover)]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        {c.isActive ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-black animate-pulse">
                            مباشر الآن
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-500/10 text-slate-400 text-[10px] font-bold">
                            تغطية مغلقة
                          </span>
                        )}
                        <span className="text-[11px] text-[var(--text-muted)]">
                          {c._count?.updates || 0} تحديث
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleStatus(c.id, c.isActive)}
                          className="px-2 py-1 rounded bg-[var(--surface)] text-[10px] font-bold border border-[var(--border)] hover:bg-[var(--surface-hover)]"
                        >
                          {c.isActive ? "إنهاء" : "تفعيل"}
                        </button>
                        <button
                          onClick={() => deleteCoverage(c.id)}
                          className="p-1 rounded text-rose-400 hover:bg-rose-500/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-bold text-xs text-[var(--text)] line-clamp-2 mb-2">
                      {c.title}
                    </h3>

                    <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                      <span>بدأت: {new Date(c.startedAt).toLocaleDateString("ar-EG")}</span>
                      <a
                        href="http://localhost:3000/live"
                        target="_blank"
                        className="text-rose-400 hover:underline flex items-center gap-1 font-bold"
                      >
                        <span>معاينة حية</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* مودال إنشاء تغطية جديدة */}
      {newCoverageModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <h3 className="font-bold text-sm text-[var(--text)]">فتح ملف تغطية مباشرة جديدة</h3>
              <button
                onClick={() => setNewCoverageModal(false)}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                ✕ إغلاق
              </button>
            </div>

            <form onSubmit={handleCreateCoverage} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[var(--text)] mb-1">عنوان التغطية المباشرة *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: تغطية مباشرة: مؤتمر القمة العربية الطارئة"
                  value={coverageTitle}
                  onChange={(e) => setCoverageTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)] font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--text)] mb-1">مقدمة أو ملخص التغطية</label>
                <textarea
                  rows={3}
                  placeholder="وصف مختصر للحدث والسياق الميداني..."
                  value={coverageSummary}
                  onChange={(e) => setCoverageSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)]"
                />
              </div>

              <div>
                <label className="block font-bold text-[var(--text)] mb-1">
                  رابط تضمين البث الحي (YouTube Embed URL اختياري)
                </label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/embed/..."
                  value={streamUrl}
                  onChange={(e) => setStreamUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)] font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setNewCoverageModal(false)}
                  className="px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--text-muted)]"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={creatingCoverage}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold"
                >
                  {creatingCoverage ? "جاري الإنشاء..." : "بدء التغطية المباشرة"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

