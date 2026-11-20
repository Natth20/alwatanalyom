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
} from "lucide-react";

export default function PrivacyPage() {
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [preferencesEnabled, setPreferencesEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [savedSettings, setSavedSettings] = useState(false);
  const [cacheCleared, setCacheCleared] = useState(false);

  useEffect(() => {
    // قراءة التفضيلات المحلية إن وجدت
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("awt_privacy_prefs");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setAnalyticsEnabled(parsed.analytics ?? false);
          setPreferencesEnabled(parsed.preferences ?? true);
          setSoundEnabled(parsed.sound ?? true);
        } catch {
          // fallback default
        }
      }
    }
  }, []);

  const handleSavePreferences = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "awt_privacy_prefs",
        JSON.stringify({
          analytics: analyticsEnabled,
          preferences: preferencesEnabled,
          sound: soundEnabled,
          savedAt: new Date().toISOString(),
        })
      );
      setSavedSettings(true);
      setTimeout(() => setSavedSettings(false), 3000);
    }
  };

  const handleClearLocalData = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("awt_privacy_prefs");
      localStorage.removeItem("saved_articles");
      localStorage.removeItem("reading_history");
      setCacheCleared(true);
      setTimeout(() => setCacheCleared(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-24 selection:bg-emerald-500/30">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="privacy" />

      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] via-[var(--surface)]/60 to-[var(--bg)] py-14 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container-custom max-w-5xl mx-auto px-4 relative z-10 space-y-6 text-center md:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            <span>معايير الخصوصية الرقمية المشفرة (Zero Cross-Site Tracking)</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-[var(--text)] tracking-tight">
            سياسة الخصوصية وحماية البيانات السيادية
          </h1>

          <p className="text-sm md:text-base text-[var(--text-muted)] max-w-3xl leading-relaxed">
            في «الوطن اليوم»، نؤمن بأن حرية الصحافة لا تنفصل عن قدسية خصوصية القارئ. نحن لا نتاجر ببياناتك، لا نزرع ملفات تتبع تجسسية تابعة لشركات الإعلانات، وبنيتنا التحتية مصممة برمجياً وفق مبدأ <span className="font-bold text-[var(--text)]">«الخصوصية بالبناء والتصميم» (Privacy by Design)</span>.
          </p>

          {/* لوحة المؤشرات السريعة للنزاهة الرقمية */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-4xl">
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1">
              <span className="text-xl md:text-2xl font-black text-emerald-500 block">0</span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)]">ملفات تتبع أطراف ثالثة</span>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1">
              <span className="text-xl md:text-2xl font-black text-emerald-500 block">100%</span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)]">تخزين محلي للتفضيلات</span>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1">
              <span className="text-xl md:text-2xl font-black text-emerald-500 block">TLS 1.3</span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)]">تشفير كامل لكل اتصال</span>
            </div>
            <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1">
              <span className="text-xl md:text-2xl font-black text-emerald-500 block">GDPR & CCPA</span>
              <span className="text-[11px] font-semibold text-[var(--text-muted)]">امتثال كامل للمعايير الدولية</span>
            </div>
          </div>
        </div>
      </div>

      {/* المحتوى الرئيسي والمحاور القانونية والتقنية */}
      <div className="container-custom max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* مركز تحكم المستخدم التفاعلي في الخصوصية (Privacy & Cookie Control Center) */}
        <section className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 via-[var(--surface)] to-[var(--surface)] p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-[var(--text)]">مركز التحكم في الخصوصية والبيانات المخزنة</h2>
                <p className="text-xs text-[var(--text-muted)]">أنت المالك الوحيد لتجربتك، تحكّم فيما يُحفظ محلياً داخل متصفحك</p>
              </div>
            </div>
            <button
              onClick={handleClearLocalData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-500/30 bg-rose-500/5 text-rose-500 hover:bg-rose-500/15 text-xs font-bold transition-colors w-fit"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{cacheCleared ? "تم مسح البيانات المحلية!" : "مسح سجل القراءة المحلي"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* خيار 1: التفضيلات الأساسية */}
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text)]">التفضيلات وحجم الخط</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">ضرورية</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                تخزين حجم الخط، وتفعيل الوضع الليلي أو النهاري، وتخصيص تجربة القراءة محلياً على جهازك.
              </p>
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={preferencesEnabled}
                  onChange={(e) => setPreferencesEnabled(e.target.checked)}
                  className="rounded border-[var(--border)] text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-xs text-[var(--text)] font-semibold">تفعيل حفظ إعدادات القراءة</span>
              </label>
            </div>

            {/* خيار 2: المؤثرات الصوتية ومشغل الراديو */}
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text)]">مستوى صوت المشغل العائم</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/15 text-blue-500 font-bold">اختياري</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                حفظ آخر مستوى صوت للراديو البث الحي وقارئ المقالات الصوتي حتى لا يتم تعديله في كل صفحة.
              </p>
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="rounded border-[var(--border)] text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-xs text-[var(--text)] font-semibold">تذكر تفضيلات الصوت</span>
              </label>
            </div>

            {/* خيار 3: التحليلات الإحصائية المجمعة */}
            <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text)]">تحليلات الأداء المجهولة</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold">بدون IP</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                مساعدتنا في قياس سرعة تحميل الأخبار دون جمع أي معلومات تعريفية أو ملفات تعريف ارتباط.
              </p>
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="rounded border-[var(--border)] text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-xs text-[var(--text)] font-semibold">الموافقة على قياس سرعة الأداء</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[var(--text-muted)]">
              جميع التفضيلات تُحفظ حصرياً في التخزين المحلي لمتصفحك (HTML5 LocalStorage) ولا تُرسل لخدمات خارجية.
            </span>
            <button
              onClick={handleSavePreferences}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{savedSettings ? "تم حفظ خياراتك بنجاح!" : "حفظ التفضيلات"}</span>
            </button>
          </div>
        </section>

        {/* مصفوفة البيانات: ما نجمعه vs ما لا نلمسه نهائياً */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)]">
            <Database className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold text-[var(--text)]">مصفوفة الإفصاح والشفافية في التعامل مع البيانات</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* العمود الأخضر: ما نجمعه فقط لتشغيل المنصة */}
            <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-4">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>البيانات التي نصل إليها (فقط لتشغيل الخدمة)</span>
              </div>
              <ul className="space-y-3 text-xs text-[var(--text-muted)] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong className="text-[var(--text)]">البريد الإلكتروني للنشرة:</strong> يُجمع فقط باختيارك الطوعي عبر نظام التحقق المزدوج (Double Opt-in) مع رابط إلغاء فوري بكل رسالة.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong className="text-[var(--text)]">بيانات التواصل والبلاغات:</strong> الاسم والبريد ونص الرسالة المقدمة في نماذج التواصل والشكاوى لتسهيل الرد القانوني والمهني.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong className="text-[var(--text)]">المحفوظات وسجل القراءة:</strong> تحفظ محلياً على جهازك بنسبة 100% ولا تخرج أبداً من جهازك.</span>
                </li>
              </ul>
            </div>

            {/* العمود الأحمر: ما نمتنع عنه كلياً وتجريم بيعه */}
            <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-4">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                <XCircle className="w-4 h-4" />
                <span>الممارسات الممنوعة والمجرمة في سياستنا</span>
              </div>
              <ul className="space-y-3 text-xs text-[var(--text-muted)] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span><strong className="text-[var(--text)]">منع بيع البيانات:</strong> لا نبيع أو نؤجر أو نتبادل قوائم الزوار أو الإيميلات مع أي وكالة إعلانية أو وسيط بيانات.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span><strong className="text-[var(--text)]">حظر بصمة الجهاز (Fingerprinting):</strong> نمنع تقنيات تحديد هوية الجهاز عبر فحص الخطوط والعتاد (Canvas Fingerprinting).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span><strong className="text-[var(--text)]">حظر ملفات التتبع المتقاطعة (Cross-Site):</strong> لا نسمح للشبكات الإعلانية بتتبع نشاطك خارج منصة «الوطن اليوم».</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* البنود والوثائق الدستورية الستة لحماية الخصوصية */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)]">
            <FileCheck2 className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold text-[var(--text)]">البنود النظامية لسياسة الخصوصية</h2>
          </div>

          <div className="space-y-4">
            {/* مادة 1 */}
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[var(--text)]">
                  المادة الأولى: الأساس القانوني لمعالجة البيانات
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]">
                  ART-01/GDPR
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                تتم أي معالجة طفيفة للبيانات (مثل استقبال رسائل الاتصال أو اشتراك النشرة البريدية) استناداً إلى الموافقة الصريحة الحرة للزائر (Consent) أو المصلحة المشروعة المشتركة لتأمين الخوادم ضد هجمات حجب الخدمة (DDoS)، دون المساس بحقوق وحريات الأفراد.
              </p>
            </div>

            {/* مادة 2 */}
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[var(--text)]">
                  المادة الثانية: بروتوكول التشفير وأمن نقل البيانات
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]">
                  SEC-TLS/256
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                تخضع جميع الاتصالات بين متصفحك وخوادم المنصة لتشفير إلزامي عبر بروتوكول HTTPS مدعوماً بشهادات TLS 1.3 مع مفاتيح تشفير بطول 256-bit، مع تطبيق سياسات Strict-Transport-Security (HSTS) لمنع أي محاولة اعتراض للمعلومات.
              </p>
            </div>

            {/* مادة 3 */}
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[var(--text)]">
                  المادة الثالثة: حق النسيان والحذف الشامل (Right to Erasure)
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]">
                  RIGHT-TO-FORGET
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                لكل مستخدم الحق الكامل في ممارسة «حق النسيان» بطلب محو أي سجل يرتبط ببريده الإلكتروني أو استفساراته السابقة من قواعد البيانات الخادمة خلال مهلة أقصاها 72 ساعة عمل من استلام الطلب دون أي اشتراطات مسبقة.
              </p>
            </div>

            {/* مادة 4 */}
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[var(--text)]">
                  المادة الرابعة: عدم استخدام الإعلانات السلوكية المتطفلة
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]">
                  NO-BEHAVIORAL-ADS
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                تعتمد منصة «الوطن اليوم» على نموذج الرعاية المباشرة والإعلانات السياقية الصديقة للبيئة (Contextual Advertising) القائمة على موضوع المقال المقروء وليس على بناء ملف شخصي نفسي أو استهلاكي للقارئ.
              </p>
            </div>

            {/* مادة 5 */}
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-[var(--text)]">
                  المادة الخامسة: خصوصية القاصرين والأطفال
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)]">
                  COPPA-COMPLIANT
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                محتوى «الوطن اليوم» موجه للجمهور العام ونحن لا نجمع عمداً أي بيانات تعريفية من أطفال دون سن 16 عاماً. وفي حال تبين وصول بيانات غير مقصودة، يتم إتلافها فوراً من خوادم النظام.
              </p>
            </div>
          </div>
        </section>

        {/* نافذة الاتصال بمسؤول حماية البيانات (DPO Contact Box) */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-right">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500">
              <KeyRound className="w-4 h-4" />
              <span>مكتب مسؤول حماية البيانات (Data Protection Officer)</span>
            </div>
            <h3 className="text-lg font-bold text-[var(--text)]">
              هل لديك استفسار أو ترغب في ممارسة حقوقك في الخصوصية؟
            </h3>
            <p className="text-xs text-[var(--text-muted)] max-w-xl leading-relaxed">
              يمكنك مراسلة مسؤول الخصوصية وحماية البيانات مباشرة لممارسة حق الوصول، التصحيح، أو الحذف النهائي من سجلات النظام.
            </p>
          </div>
          <a
            href="mailto:privacy@alwatantoday.net"
            className="px-6 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm shrink-0 flex items-center gap-2"
          >
            <span>مراسلة مكتب الخصوصية</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </section>
      </div>
    </div>
  );
}
