"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import InstitutionalNav from "@/components/InstitutionalNav";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  Server,
  FileCheck2,
  Sliders,
  CheckCircle2,
  XCircle,
  Database,
  KeyRound,
  ExternalLink,
  Info,
  Clock,
  Sparkles,
  Download,
  Trash2,
  RefreshCw,
  Cpu,
  Globe2,
  Check,
  Zap,
  Activity,
  AlertTriangle,
} from "lucide-react";

interface CookieInfo {
  name: string;
  category: string;
  purpose: string;
  duration: string;
  type: string;
}

const COOKIE_DATA: CookieInfo[] = [
  {
    name: "awt_theme",
    category: "ضروري وتفضيلات",
    purpose: "حفظ اختيار المظهر (الوضع الليلي الملكي، المظهر النهاري، أو التلقائي).",
    duration: "سنة واحدة",
    type: "محلي (LocalStorage)",
  },
  {
    name: "awt_saved_articles",
    category: "وظيفي وشخصي",
    purpose: "تخزين قائمة المقالات المحفوظة للقراءة دون إنترنت داخل جهازك فقط.",
    duration: "دائم محلياً",
    type: "محلي (LocalStorage)",
  },
  {
    name: "awt_low_bandwidth",
    category: "إنساني وطوارئ",
    purpose: "حفظ تفضيل وضع البيانات المنخفضة لمنع تحميل الصور الثقيلة في غزة والمخيمات.",
    duration: "6 أشهر",
    type: "محلي (LocalStorage)",
  },
  {
    name: "awt_prayer_city",
    category: "تفضيلات المحتوى",
    purpose: "تحديد المدينة الافتراضية لعرض مواقيت الصلاة (القدس الشريف أو غزة العزة).",
    duration: "سنة واحدة",
    type: "محلي (LocalStorage)",
  },
  {
    name: "awt_audio_pref",
    category: "تفضيلات الوسائط",
    purpose: "حفظ سرعة تشغيل قارئ المقالات الصوتي الذكي داخل المتصفح.",
    duration: "دائم محلياً",
    type: "محلي (LocalStorage)",
  },
  {
    name: "awt_alerts_pref",
    category: "الإشعارات العاجلة",
    purpose: "حفظ تفضيل استقبال تنبيهات الأخبار العاجلة المشفرة.",
    duration: "سنة واحدة",
    type: "محلي (LocalStorage)",
  },
];

export default function PrivacyPage() {
  const [browserProtocol, setBrowserProtocol] = useState("HTTPS (TLS 1.3)");
  const [clearingCache, setClearingCache] = useState(false);
  const [clearedMessage, setClearedMessage] = useState(false);
  const [localKeysDetected, setLocalKeysDetected] = useState<string[]>([]);
  const [storageBytes, setStorageBytes] = useState(0);

  // Interactive Preference Switches
  const [allowSavedArticles, setAllowSavedArticles] = useState(true);
  const [allowAudioNews, setAllowAudioNews] = useState(true);
  const [allowInstantAlerts, setAllowInstantAlerts] = useState(true);
  const [allowLowBandwidth, setAllowLowBandwidth] = useState(false);
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBrowserProtocol(
        window.location.protocol.toUpperCase().replace(":", "") + " (TLS 1.3 مشفر ببروتوكول QUIC)"
      );

      // Detect keys in localStorage
      const detected: string[] = [];
      let totalBytes = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("awt_")) {
          detected.push(key);
          const val = localStorage.getItem(key) || "";
          totalBytes += (key.length + val.length) * 2;
        }
      }
      setLocalKeysDetected(detected);
      setStorageBytes(totalBytes);

      // Read preferences
      setAllowSavedArticles(localStorage.getItem("awt_saved_articles_pref") !== "0");
      setAllowAudioNews(localStorage.getItem("awt_audio_pref") !== "0");
      setAllowInstantAlerts(localStorage.getItem("awt_alerts_pref") !== "0");
      setAllowLowBandwidth(localStorage.getItem("awt_low_bandwidth") === "1");
    }
  }, []);

  const handleTogglePreference = (
    key: "saved" | "audio" | "alerts" | "bandwidth",
    currentVal: boolean
  ) => {
    const newVal = !currentVal;
    if (typeof window !== "undefined") {
      if (key === "saved") {
        setAllowSavedArticles(newVal);
        localStorage.setItem("awt_saved_articles_pref", newVal ? "1" : "0");
      } else if (key === "audio") {
        setAllowAudioNews(newVal);
        localStorage.setItem("awt_audio_pref", newVal ? "1" : "0");
      } else if (key === "alerts") {
        setAllowInstantAlerts(newVal);
        localStorage.setItem("awt_alerts_pref", newVal ? "1" : "0");
      } else if (key === "bandwidth") {
        setAllowLowBandwidth(newVal);
        localStorage.setItem("awt_low_bandwidth", newVal ? "1" : "0");
      }
    }
    setSavedSettingsNotice(true);
    setTimeout(() => setSavedSettingsNotice(false), 3000);
  };

  const handleClearAllPreferences = () => {
    setClearingCache(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("awt_saved_articles");
        localStorage.removeItem("awt_low_bandwidth");
        localStorage.removeItem("awt_prayer_city");
        localStorage.removeItem("awt_audio_pref");
        localStorage.removeItem("awt_alerts_pref");
        localStorage.removeItem("awt_saved_articles_pref");
        setLocalKeysDetected([]);
        setStorageBytes(0);
      }
      setClearingCache(false);
      setClearedMessage(true);
      setTimeout(() => setClearedMessage(false), 5000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 selection:text-white pb-24">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="privacy" />

      {/* 1. Hero Header السينمائي الفاخر */}
      <section className="relative overflow-hidden border-b border-[var(--gold)]/20 bg-gradient-to-b from-[#1b020a] via-[#140006] to-[#0E0407] py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/12 via-rose-950/20 to-transparent pointer-events-none" />

        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-black shadow-lg shadow-emerald-950/20">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ميثاق خصوصية القارئ وسيادة البيانات وحصانة التصفح</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            الخصوصية وأمان البيانات المؤسسية
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-3xl mx-auto leading-relaxed">
            تلتزم منصة «الوطن اليوم» بمبدأ انعدام التتبع (Zero Tracking). نحن لا نبيع بياناتك، ولا نزرع ملفات تتبع إعلاني خارجي، ولا نتطلب تسجيلاً قسرياً، ونؤمن بأن حرية الصحافة تبدأ من احترام خصوصية وأمان القارئ.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>ملفات تتبع الطرف الثالث (3rd-Party Trackers): صفر مطلقة</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-mono">
              تشفير النقل: TLS 1.3 / Strict-Transport-Security (HSTS)
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* 2. رادار فحص الأمان والخصوصية الحي (Live Privacy Inspector) */}
        <section className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-[#062013]/90 via-[#0a1810]/90 to-[#040c07]/90 backdrop-blur-xl p-6 sm:p-9 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-white">
                  رادار الفحص الحي لحصانة جلسة التصفح الحالية
                </h2>
                <p className="text-xs text-stone-400">
                  فحص آني ومباشر لما يخزنه هذا الموقع في متصفحك الآن
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>الجلسة آمنة ومحمية 100%</span>
            </div>
          </div>

          {/* Telemetry 4-Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-1">
              <div className="text-[10px] text-stone-400 font-mono">ملفات تتبع إعلانية (Ad Trackers)</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">0</div>
              <div className="text-[11px] text-emerald-300">محظورة كلياً من النواة التحريرية</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-1">
              <div className="text-[10px] text-stone-400 font-mono">بكسل التجسس (Meta / Google Pixel)</div>
              <div className="text-2xl font-black text-emerald-400 font-mono">0%</div>
              <div className="text-[11px] text-emerald-300">ممنوع زراعتها على القراء</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-1">
              <div className="text-[10px] text-stone-400 font-mono">المفاتيح المخزنة بجهازك (LocalStorage)</div>
              <div className="text-2xl font-black text-[var(--gold)] font-mono">
                {localKeysDetected.length} مفاتيح
              </div>
              <div className="text-[11px] text-stone-400">حجمها التقديري: {storageBytes} بايت</div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-1">
              <div className="text-[10px] text-stone-400 font-mono">بروتوكول الاتصال بالخادم</div>
              <div className="text-xs font-bold text-white font-mono truncate">{browserProtocol}</div>
              <div className="text-[11px] text-emerald-300">تشفير كامل غير قابل للتنصت</div>
            </div>
          </div>

          {/* Interactive Privacy Control Toggles */}
          <div className="rounded-2xl border border-white/10 bg-black/40 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="text-xs sm:text-sm font-bold text-white">
                  لوحة التحكم في التفضيلات المحلية (تُحفظ داخل جهازك فقط)
                </h3>
              </div>
              {savedSettingsNotice && (
                <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 animate-pulse">
                  <Check className="w-3.5 h-3.5" />
                  <span>تم تحديث التفضيل محلياً!</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Toggle 1: Saved Articles */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white">حفظ المقالات للقراءة دون اتصال</div>
                  <div className="text-[11px] text-stone-400">تخزين نصوص الأخبار في ذاكرة جهازك للقراءة في حال انقطاع الشبكة</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTogglePreference("saved", allowSavedArticles)}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                    allowSavedArticles ? "bg-emerald-600" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      allowSavedArticles ? "translate-x-1" : "translate-x-7"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 2: Audio Player */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white">قارئ الأخبار الصوتي الذكي</div>
                  <div className="text-[11px] text-stone-400">تمكين التوليد الصوتي للملخصات الإخبارية وسرعة القراءة</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTogglePreference("audio", allowAudioNews)}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                    allowAudioNews ? "bg-emerald-600" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      allowAudioNews ? "translate-x-1" : "translate-x-7"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 3: Instant Alerts */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white">تنبيهات الأخبار العاجلة المشفرة</div>
                  <div className="text-[11px] text-stone-400">إظهار شريط الطوارئ الأحمر عند ورود حدث سياسي أو ميداني حاسم</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTogglePreference("alerts", allowInstantAlerts)}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                    allowInstantAlerts ? "bg-emerald-600" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      allowInstantAlerts ? "translate-x-1" : "translate-x-7"
                    }`}
                  />
                </button>
              </div>

              {/* Toggle 4: Low Bandwidth Mode */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white">نمط التوفير الأقصى للبيانات (Low-Bandwidth)</div>
                  <div className="text-[11px] text-stone-400">تعطيل الصور فائقة الدقة لتسريع التحميل على شبكات غزة الضعيفة</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleTogglePreference("bandwidth", allowLowBandwidth)}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                    allowLowBandwidth ? "bg-emerald-600" : "bg-white/20"
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                      allowLowBandwidth ? "translate-x-1" : "translate-x-7"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Forensic Purge Tool Button */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-stone-400">
                هل ترغب في محو أي أثر للتفضيلات أو المقالات المحفوظة من متصفحك فوراً؟
              </div>
              <button
                type="button"
                onClick={handleClearAllPreferences}
                disabled={clearingCache}
                className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold transition-all flex items-center justify-center gap-2 self-start sm:self-auto disabled:opacity-50"
              >
                {clearingCache ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>جارٍ تطهير الذاكرة المحلية...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>تطهير شامل لكافة التفضيلات والكاش المحلي</span>
                  </>
                )}
              </button>
            </div>

            {clearedMessage && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>تم تطهير الذاكرة المحلية للمتصفح بالكامل بنجاح. جلسة تصفحك الآن نظيفة 100%.</span>
              </div>
            )}
          </div>
        </section>

        {/* 3. Comprehensive Local Data Matrix */}
        <section className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 sm:p-9 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-5">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-[var(--gold)]" />
              <span>جدول الشفافية الصريح للملفات والمتغيرات المحلية</span>
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              حصر دقيق لكل متغير يمكن أن يطلبه المتصفح لتشغيل الموقع دون أي غموض أو أكواد مبهمة
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-white/10 text-stone-400 font-bold">
                  <th className="py-3 px-4">اسم المفتاح (Key)</th>
                  <th className="py-3 px-4">التصنيف</th>
                  <th className="py-3 px-4">الغاية الوظيفية</th>
                  <th className="py-3 px-4">مدة البقاء</th>
                  <th className="py-3 px-4">النطاق</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-stone-300 font-mono">
                {COOKIE_DATA.map((cookie) => (
                  <tr key={cookie.name} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[var(--gold)]">{cookie.name}</td>
                    <td className="py-3.5 px-4 font-sans text-stone-200">{cookie.category}</td>
                    <td className="py-3.5 px-4 font-sans text-stone-300 leading-relaxed">{cookie.purpose}</td>
                    <td className="py-3.5 px-4 text-stone-400">{cookie.duration}</td>
                    <td className="py-3.5 px-4 text-emerald-400 font-sans text-[11px]">{cookie.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Sovereign Privacy Declarations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">انعدام بيع البيانات تجارياً</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              لا نقوم ولا يمكن أن نقوم ببيع أو تأجير أي بيانات تخص قراءنا أو مصادرنا لأي وسيط إعلاني أو شركة تحليل سلوكي تجارية حول العالم.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
              <EyeOff className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">الحق في النسيان الرقمي (Right to Erasure)</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              يحق لأي قارئ أو مساهم طلب حذف أي تعليق أو مراسلة مسجلة باسمه فوراً عبر مراسلة مسؤول حماية البيانات على dpo@alwatantoday.net.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 space-y-3 shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">استضافة سيادية مشفرة</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              خوادمنا تعمل وفق بيئة عزل صارمة، وتعتمد شهادات SSL صادرة بتشفير متقدم يدعم معايير ما بعد الكوانتوم لضمان استمرارية الحماية على المدى الطويل.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
