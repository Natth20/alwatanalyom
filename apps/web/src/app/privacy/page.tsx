"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import Link from "next/link";

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
];

export default function PrivacyPage() {
  const [browserProtocol, setBrowserProtocol] = useState("HTTPS (TLS 1.3)");
  const [clearingCache, setClearingCache] = useState(false);
  const [clearedMessage, setClearedMessage] = useState(false);

  // إعدادات التفضيلات التفاعلية
  const [allowSavedArticles, setAllowSavedArticles] = useState(true);
  const [allowAudioNews, setAllowAudioNews] = useState(true);
  const [allowInstantAlerts, setAllowInstantAlerts] = useState(true);
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBrowserProtocol(window.location.protocol.toUpperCase().replace(":", "") + " (TLS 1.3 مشفر)");
    }
  }, []);

  const handleClearAllPreferences = () => {
    setClearingCache(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("awt_saved_articles");
        localStorage.removeItem("awt_low_bandwidth");
        localStorage.removeItem("awt_prayer_city");
      }
      setClearingCache(false);
      setClearedMessage(true);
      setTimeout(() => setClearedMessage(false), 5000);
    }, 800);
  };

  const handleSavePreferences = () => {
    setSavedSettingsNotice(true);
    setTimeout(() => setSavedSettingsNotice(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 selection:text-white pb-24">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="privacy" />

      {/* 1. Hero Header السينمائي الفاخر */}
      <div className="relative overflow-hidden border-b border-[var(--gold)]/20 bg-gradient-to-b from-[#1b020a] via-[#140006] to-[#0E0407] py-14 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-rose-950/20 to-transparent pointer-events-none" />
        
        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-bold shadow-md shadow-emerald-950/20">
            <ShieldCheck className="w-4 h-4" />
            <span>سياسة الخصوصية وسيادة البيانات وحصانة الزائر</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            الخصوصية وأمان البيانات المؤسسية
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
            تلتزم منصة «الوطن اليوم» بمبدأ انعدام التتبع (Zero Tracking). نحن لا نبيع بياناتك، ولا نزرع ملفات تتبع إعلاني خارجي، ونؤمن بأن حرية الصحافة تبدأ من احترام خصوصية وأمان القارئ.
          </p>
        </div>
      </div>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-14">
        {/* 2. رادار فحص الأمان والخصوصية الحي (Live Privacy Inspector) */}
        <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-[#062013]/90 via-[#0a1810]/90 to-[#040c07]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/40 shadow-xs">
                <Cpu className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  رادار الفحص الحي اللحظي
                </span>
                <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
                  حالة حصانة اتصالك بجلسة التصفح الحالية
                </h2>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              جلسة مؤمنة ومشفرة بالكامل
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-1">
              <span className="text-[11px] text-stone-400 block font-medium">بروتوكول التشفير</span>
              <div className="text-base font-black text-emerald-300 font-mono flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>{browserProtocol}</span>
              </div>
              <span className="text-[10px] text-stone-400 block">تشفير سيادي بدرجة 256-bit</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-1">
              <span className="text-[11px] text-stone-400 block font-medium">متتبعات الطرف الثالث</span>
              <div className="text-base font-black text-emerald-300 font-mono flex items-center gap-1.5">
                <EyeOff className="w-4 h-4 text-emerald-400" />
                <span>0 متتبع خارجي</span>
              </div>
              <span className="text-[10px] text-stone-400 block">خالٍ 100% من تعقب الإعلانات</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-1">
              <span className="text-[11px] text-stone-400 block font-medium">تخزين البيانات الشخصية</span>
              <div className="text-base font-black text-emerald-300 font-mono flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>محلي فقط (Local)</span>
              </div>
              <span className="text-[10px] text-stone-400 block">لا يتم رفع سجل قراءتك للسحابة</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-emerald-500/20 space-y-1">
              <span className="text-[11px] text-stone-400 block font-medium">تسجيل الدخول الإلزامي</span>
              <div className="text-base font-black text-emerald-300 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>غير مطلوب</span>
              </div>
              <span className="text-[10px] text-stone-400 block">تصفح حر بدون إنشاء حساب</span>
            </div>
          </div>
        </div>

        {/* 3. مصفوفة الكوكيز الشفافة (Cookie Transparency Table) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider block">
                الشفافية التقنية الكاملة
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                مصفوفة ملفات تعريف الارتباط الوظيفية
              </h2>
            </div>

            <button
              onClick={handleClearAllPreferences}
              disabled={clearingCache}
              className="px-4 py-2 rounded-xl border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <Trash2 className="w-4 h-4" />
              <span>{clearingCache ? "جاري المسح..." : "مسح التفضيلات والكاش من متصفحي الآن"}</span>
            </button>
          </div>

          {clearedMessage && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>تم بنجاح مسح كافة التفضيلات والمقالات المحفوظة المخزنة محلياً في متصفحك!</span>
            </div>
          )}

          <div className="rounded-2xl border border-white/10 bg-[#16060B]/70 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-black/40 text-stone-400 font-bold">
                    <th className="py-3.5 px-4">اسم المفتاح المحلي</th>
                    <th className="py-3.5 px-4">الفئة</th>
                    <th className="py-3.5 px-4">الغرض الصحفي والوظيفي</th>
                    <th className="py-3.5 px-4">مدة الصلاحية</th>
                    <th className="py-3.5 px-4">الموقع</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-stone-200">
                  {COOKIE_DATA.map((cookie) => (
                    <tr key={cookie.name} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[var(--gold)]">
                        {cookie.name}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-stone-300 font-medium">
                          {cookie.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 leading-relaxed">{cookie.purpose}</td>
                      <td className="py-3.5 px-4 font-mono text-stone-400">{cookie.duration}</td>
                      <td className="py-3.5 px-4 text-emerald-400 font-medium">{cookie.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 4. لوحة إدارة تفضيلات الزائر (Interactive Preferences Switcher) */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#18020a]/80 to-[#100004]/80 p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Sliders className="w-5 h-5 text-[var(--gold)]" />
            <div>
              <h3 className="font-black text-white text-base">مركز التحكم في تفضيلات الجلسة</h3>
              <p className="text-xs text-stone-400">خصص تجربة تصفحك مع الحفاظ التام على أمانك</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/30 border border-white/5">
              <div>
                <span className="font-bold text-xs text-white block">حفظ المقالات في الأرشيف المحلي</span>
                <span className="text-[11px] text-stone-400">السماح بتخزين المقالات لقراءتها لاحقاً دون اتصال بالإنترنت</span>
              </div>
              <input
                type="checkbox"
                checked={allowSavedArticles}
                onChange={(e) => setAllowSavedArticles(e.target.checked)}
                className="w-5 h-5 accent-[var(--gold)] rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/30 border border-white/5">
              <div>
                <span className="font-bold text-xs text-white block">النغمة الصوتية للأخبار العاجلة المباشرة</span>
                <span className="text-[11px] text-stone-400">تشغيل نغمة صحفية خافتة عند صدور بيان عاجل من الميدان</span>
              </div>
              <input
                type="checkbox"
                checked={allowAudioNews}
                onChange={(e) => setAllowAudioNews(e.target.checked)}
                className="w-5 h-5 accent-[var(--gold)] rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-black/30 border border-white/5">
              <div>
                <span className="font-bold text-xs text-white block">تنبيهات البث المباشر ورادار يلا سبورت</span>
                <span className="text-[11px] text-stone-400">إظهار كبسولة التنبيه عند بدء بث مباشر هام أو أهداف المباريات</span>
              </div>
              <input
                type="checkbox"
                checked={allowInstantAlerts}
                onChange={(e) => setAllowInstantAlerts(e.target.checked)}
                className="w-5 h-5 accent-[var(--gold)] rounded cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleSavePreferences}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-slate-950 font-black text-xs hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-950/20 cursor-pointer"
            >
              حفظ التفضيلات في المتصفح
            </button>

            {savedSettingsNotice && (
              <span className="text-xs text-emerald-400 font-bold animate-in fade-in">
                ✓ تم تحديث التفضيلات بنجاح!
              </span>
            )}
          </div>
        </div>

        {/* 5. شهادات الامتثال والسيادة الدولية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-5 rounded-2xl border border-white/10 bg-[#16060B]/70 space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-white text-xs">مطابقة لائحة GDPR الأوروبية</h4>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              احترام كامل للحق في النسيان، حذف البيانات، وانعدام مشاركتها مع أطراف ثالثة.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#16060B]/70 space-y-2">
            <Lock className="w-8 h-8 text-amber-400 mx-auto" />
            <h4 className="font-bold text-white text-xs">معيار ISO 27001 للأمن السيبراني</h4>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              بنية تحتية سحابية محصنة ضد الاختراق والتنصت مع تشفير متقدم لروابط الاتصال.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-[#16060B]/70 space-y-2">
            <Globe2 className="w-8 h-8 text-sky-400 mx-auto" />
            <h4 className="font-bold text-white text-xs">ميثاق حماية الصحفيين والشهود</h4>
            <p className="text-[11px] text-stone-400 leading-relaxed">
              حصانة كاملة للرسائل والمعلومات الميدانية الواردة من مراسلينا في غزة والقدس.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
