"use client";

import { useState, useEffect } from "react";
import {
  Megaphone,
  Plus,
  Play,
  Pause,
  Trash2,
  Eye,
  MousePointer,
  Sparkles,
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  type: "GOOGLE_ADSENSE" | "CUSTOM_BANNER" | "HTML_SCRIPT" | "SPONSORED_POST";
  position: string;
  enabled: boolean;
  clientName: string | null;
  imageUrl: string | null;
  targetUrl: string | null;
  scriptCode: string | null;
  impressions: number;
  clicks: number;
  startsAt: string;
  endsAt: string | null;
}

const POSITION_LABELS: Record<string, string> = {
  HEADER_TOP_LEADERBOARD: "أعلى الهيدر (970x90 / 728x90)",
  BREAKING_BAR_SPONSOR: "راعي شريط الأخبار العاجلة",
  BETWEEN_HOMEPAGE_SECTIONS: "بين أقسام الصفحة الرئيسية",
  IN_ARTICLE_PARAGRAPH_3: "داخل المقال (بعد الفقرة 3)",
  IN_ARTICLE_PARAGRAPH_6: "داخل المقال (بعد الفقرة 6)",
  SIDEBAR_TOP_RECTANGLE: "أعلى الشريط الجانبي (300x250)",
  SIDEBAR_STICKY_SKYSCRAPER: "الشريط الجانبي العائم (300x600)",
  STICKY_MOBILE_FOOTER: "أسفل شاشة الهاتف الثابت (320x50)",
  STORY_TIMELINE_BANNER: "ملف القصة المجمعة",
};

export default function AdsManagementPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [type, setType] = useState<"GOOGLE_ADSENSE" | "CUSTOM_BANNER" | "HTML_SCRIPT">("CUSTOM_BANNER");
  const [position, setPosition] = useState("HEADER_TOP_LEADERBOARD");
  const [clientName, setClientName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [scriptCode, setScriptCode] = useState("");

  const fetchCampaigns = async () => {
    try {
      const res = await fetch("/api/ads");
      const data = await res.json();
      if (data.ok) {
        setCampaigns(data.campaigns);
      }
    } catch (err) {
      console.error("فشل جلب الحملات:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    try {
      const res = await fetch("/api/ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          type,
          position,
          clientName: clientName || null,
          imageUrl: imageUrl || null,
          targetUrl: targetUrl || null,
          altText: altText || null,
          scriptCode: scriptCode || null,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setModalOpen(false);
        // إعادة تعيين الحقول
        setName("");
        setClientName("");
        setImageUrl("");
        setTargetUrl("");
        setScriptCode("");
        fetchCampaigns();
      } else {
        alert(data.error || "حدث خطأ أثناء الحفظ");
      }
    } catch {
      alert("فشل الاتصال بالخادم");
    } finally {
      setSaving(false);
    }
  };

  const toggleCampaign = async (id: string, currentEnabled: boolean) => {
    try {
      await fetch(`/api/ads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !currentEnabled }),
      });
      fetchCampaigns();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCampaign = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الحملة الإعلانية؟")) return;
    try {
      await fetch(`/api/ads/${id}`, { method: "DELETE" });
      fetchCampaigns();
    } catch (err) {
      console.error(err);
    }
  };

  const totalImpressions = campaigns.reduce((acc, c) => acc + c.impressions, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const activeCount = campaigns.filter((c) => c.enabled).length;

  return (
    <div className="space-y-8">
      {/* رأس الصفحة والمؤشرات */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[var(--text)]">إدارة الإعلانات والرعايات</h1>
              <p className="text-xs text-[var(--text-muted)]">
                التحكم الكامل في مساحات Google AdSense، البنرات المباشرة، ورعاة الأقسام والعواجل
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] text-slate-950 font-bold text-xs hover:opacity-90 transition-opacity shadow-xs"
          >
            <Plus className="w-4 h-4" />
            إضافة حملة / مساحة إعلانية جديدة
          </button>
        </div>
      </div>

      {/* بطاقات المؤشرات الأربعة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="text-xs font-semibold text-[var(--text-muted)] mb-1">الحملات النشطة</div>
          <div className="text-2xl font-black text-emerald-500 flex items-center gap-2">
            <span>{activeCount}</span>
            <span className="text-xs font-normal text-[var(--text-muted)]">من أصل {campaigns.length}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="text-xs font-semibold text-[var(--text-muted)] mb-1">إجمالي المشاهدات (Impressions)</div>
          <div className="text-2xl font-black text-[var(--text)] flex items-center gap-2">
            <Eye className="w-5 h-5 text-sky-400" />
            <span>{totalImpressions.toLocaleString("ar-EG")}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="text-xs font-semibold text-[var(--text-muted)] mb-1">إجمالي النقرات (Clicks)</div>
          <div className="text-2xl font-black text-[var(--text)] flex items-center gap-2">
            <MousePointer className="w-5 h-5 text-indigo-400" />
            <span>{totalClicks.toLocaleString("ar-EG")}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="text-xs font-semibold text-[var(--text-muted)] mb-1">متوسط نسبة النقر (CTR)</div>
          <div className="text-2xl font-black text-amber-400">
            {totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0.00"}%
          </div>
        </div>
      </div>

      {/* جدول الحملات الإعلانية */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
        <div className="p-5 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="font-bold text-sm text-[var(--text)]">قائمة المساحات والحملات الإعلانية المبرمجة</h2>
          <span className="text-xs text-[var(--text-muted)]">{campaigns.length} حملة مسجلة</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-[var(--text-muted)]">جاري تحميل بيانات الإعلانات...</div>
        ) : campaigns.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--surface-hover)] text-[var(--text-muted)] flex items-center justify-center mx-auto">
              <Megaphone className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[var(--text)]">لا توجد حملات إعلانية مضافة بعد</p>
            <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto">
              ابدأ الآن بإنشاء مساحة إعلانية لأعلى الموقع أو داخل المقالات، أو قم بربط شفرة Google AdSense.
            </p>
            <button
              onClick={() => setModalOpen(true)}
              className="mt-3 px-4 py-2 rounded-xl bg-[var(--primary)] text-slate-950 font-bold text-xs"
            >
              إضافة أول إعلان
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[var(--surface-hover)] text-[var(--text-muted)] border-b border-[var(--border)] font-semibold">
                <tr>
                  <th className="p-4">اسم الحملة / العميل</th>
                  <th className="p-4">النوع والموقع</th>
                  <th className="p-4">المشاهدات</th>
                  <th className="p-4">النقرات</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4 text-center">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {campaigns.map((c) => (
                  <tr key={c.id} className="hover:bg-[var(--surface-hover)] transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-sm text-[var(--text)]">{c.name}</div>
                      <div className="text-[11px] text-[var(--text-muted)]">
                        {c.clientName ? `العميل: ${c.clientName}` : "حملة شبكية عامة"}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-1.5 mb-1">
                        {c.type === "GOOGLE_ADSENSE" ? (
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold text-[10px]">
                            Google AdSense
                          </span>
                        ) : c.type === "CUSTOM_BANNER" ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">
                            بانر مباشر
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-bold text-[10px]">
                            كود خارجي
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)]">
                        {POSITION_LABELS[c.position] || c.position}
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-[var(--text)]">
                      {c.impressions.toLocaleString("ar-EG")}
                    </td>

                    <td className="p-4 font-semibold text-[var(--text)]">
                      {c.clicks.toLocaleString("ar-EG")}
                    </td>

                    <td className="p-4">
                      {c.enabled ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          نشطة وتظهر للزوار
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-500/10 text-slate-400 text-[11px] font-bold">
                          متوقفة مؤقتاً
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => toggleCampaign(c.id, c.enabled)}
                          title={c.enabled ? "إيقاف مؤقت" : "تشغيل"}
                          className={`p-2 rounded-lg border transition-colors ${
                            c.enabled
                              ? "border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
                              : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                          }`}
                        >
                          {c.enabled ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => deleteCampaign(c.id)}
                          title="حذف الحملة"
                          className="p-2 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* مودال إنشاء حملة إعلانية جديدة */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-[var(--text)]">إضافة مساحة إعلانية جديدة</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                ✕ إغلاق
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[var(--text)] mb-1">اسم الحملة / المعرف *</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: بنك فلسطين - راعي شريط الأخبار"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)] font-medium focus:outline-hidden focus:border-[var(--primary)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[var(--text)] mb-1">نوع الإعلان *</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)] font-medium"
                  >
                    <option value="CUSTOM_BANNER">بانر صورة مباشر</option>
                    <option value="GOOGLE_ADSENSE">Google AdSense</option>
                    <option value="HTML_SCRIPT">شفرة HTML / JS خارجية</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[var(--text)] mb-1">موقع المساحة الإعلانية *</label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)] font-medium"
                  >
                    {Object.entries(POSITION_LABELS).map(([val, label]) => (
                      <option key={val} value={val}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {type === "CUSTOM_BANNER" && (
                <>
                  <div>
                    <label className="block font-bold text-[var(--text)] mb-1">اسم العميل أو الراعي</label>
                    <input
                      type="text"
                      placeholder="مثال: شركة جوال / Ooredoo"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[var(--text)] mb-1">رابط صورة البنر (Image URL) *</label>
                    <input
                      type="url"
                      placeholder="https://example.com/ad-banner.webp"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[var(--text)] mb-1">النص البديل للصورة (Alt Text)</label>
                    <input
                      type="text"
                      placeholder="وصف مختصر للبانر الإعلاني"
                      value={altText}
                      onChange={(e) => setAltText(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[var(--text)] mb-1">رابط التوجيه عند النقر (Target URL) *</label>
                    <input
                      type="url"
                      placeholder="https://client-landing-page.com"
                      value={targetUrl}
                      onChange={(e) => setTargetUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)]"
                    />
                  </div>
                </>
              )}

              {(type === "GOOGLE_ADSENSE" || type === "HTML_SCRIPT") && (
                <div>
                  <label className="block font-bold text-[var(--text)] mb-1">
                    شفرة الإعلان (AdSense Code / Script) *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="<script async src='https://pagead2.googlesyndication.com...'></script>"
                    value={scriptCode}
                    onChange={(e) => setScriptCode(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] text-[var(--text)] font-mono text-[11px]"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[var(--border)] text-[var(--text-muted)] font-bold hover:bg-[var(--surface-hover)]"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-slate-950 font-bold hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? "جاري الحفظ..." : "حفظ وتفعيل الحملة"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

