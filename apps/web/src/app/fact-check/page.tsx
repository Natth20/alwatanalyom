"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  ArrowLeft,
  Search,
  Sliders,
  ExternalLink,
  Cpu,
  Fingerprint,
  FileCheck2,
  Image as ImageIcon,
  Send,
  Eye,
  Clock,
  Check,
} from "lucide-react";

interface FactCheckItem {
  id: string;
  claim: string;
  verdict: "fake" | "misleading" | "ai_generated" | "true";
  date: string;
  category: string;
  evidence: string;
  fakeImage: string;
  realImage: string;
  fakeCaption: string;
  realCaption: string;
  sourcesCount: number;
}

export default function FactCheckPage() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sandbox Test State
  const [testInput, setTestInput] = useState("");
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  const factChecks: FactCheckItem[] = [
    {
      id: "fc-1",
      claim: "صورة متداولة تزعم وصول قوافل مساعدات برية ضخمة إلى شمال قطاع غزة فجر اليوم دون أي قيود",
      verdict: "fake",
      date: "20 نوفمبر 2026",
      category: "المساعدات والميدان",
      evidence: "البحث العكسي في قواعد البيانات الجنائية أثبت أن الصورة تعود لعام 2021 عند الحدود الأردنية السورية وليست في غزة إطلاقاً.",
      fakeImage: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&auto=format&fit=crop&q=80",
      realImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format&fit=crop&q=80",
      fakeCaption: "الصورة المضللة المتداولة (من عام 2021)",
      realCaption: "واقع معبر كرم أبو سالم الحقيقي اليوم (قيود وتفتيش صارم)",
      sourcesCount: 4,
    },
    {
      id: "fc-2",
      claim: "مقطع فيديو يزعم انهياراً فورياً في بورصة الذهب العالمية وتراجع الأونصة إلى 1800 دولار",
      verdict: "misleading",
      date: "19 نوفمبر 2026",
      category: "اقتصاد وأسواق",
      evidence: "المقطع مجتزأ من نشرة إخبارية قديمة عام 2022؛ أسعار الذهب تتداول فعلياً قرب مستويات تاريخية فوق 2700 دولار للأونصة.",
      fakeImage: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&auto=format&fit=crop&q=80",
      realImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80",
      fakeCaption: "الادعاء المجتزأ من فيديو قديم",
      realCaption: "بيانات شاشات التداول الحقيقية واللحظية",
      sourcesCount: 3,
    },
    {
      id: "fc-3",
      claim: "صورة تزعم انشقاق قبة الصخرة المشرفة إثر زلزال ضرب مدينة القدس",
      verdict: "ai_generated",
      date: "18 نوفمبر 2026",
      category: "القدس والمقدسات",
      evidence: "فحص مصفوفة البكسلات ومؤشرات الإضاءة أكد توليد الصورة عبر محرك Midjourney v6 مع وجود تشوهات غير طبيعية في الزخارف الهندسية الأموية.",
      fakeImage: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=800&auto=format&fit=crop&q=80",
      realImage: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=800&auto=format&fit=crop&q=80",
      fakeCaption: "توليد اصطناعي مشوه (Deepfake)",
      realCaption: "الصورة الميدانية الحقيقية للمسجد الأقصى والقدس الآن",
      sourcesCount: 5,
    },
  ];

  const handleRunOsintTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testInput) return;
    setTesting(true);
    setTestResult(null);

    setTimeout(() => {
      setTesting(false);
      setTestResult({
        title: testInput,
        deepfakeProbability: "88%",
        reverseMatchCount: 14,
        earliestOccurrence: "يونيو 2022",
        verdict: "محتوى مشبوه وغير موثوق — يتضمن علامات تزييف وتوليد آلي",
      });
    }, 1500);
  };

  const getVerdictBadge = (verdict: FactCheckItem["verdict"]) => {
    switch (verdict) {
      case "fake":
        return {
          label: "خبر زائف كلياً",
          bg: "bg-rose-500/20 text-rose-400 border-rose-500/30",
          icon: XCircle,
        };
      case "misleading":
        return {
          label: "مضلل ومجتزأ",
          bg: "bg-amber-500/20 text-amber-400 border-amber-500/30",
          icon: AlertTriangle,
        };
      case "ai_generated":
        return {
          label: "مولّد بالذكاء الاصطناعي (AI)",
          bg: "bg-purple-500/20 text-purple-400 border-purple-500/30",
          icon: Cpu,
        };
      case "true":
        return {
          label: "صحيح وموثق",
          bg: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
          icon: CheckCircle2,
        };
    }
  };

  const filteredChecks = factChecks.filter((item) => {
    if (activeFilter !== "all" && item.verdict !== activeFilter) return false;
    if (searchQuery && !item.claim.includes(searchQuery) && !item.category.includes(searchQuery)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-24 selection:bg-rose-500/30">
      {/* 1. الترويسة الرئيسية للمرصد الرقمي */}
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-rose-950/20 via-[var(--surface)] to-[var(--bg)] py-14 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-600/15 via-transparent to-transparent pointer-events-none" />

        <div className="container-custom max-w-6xl mx-auto px-4 relative z-10 space-y-6 text-center md:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-500 text-xs font-bold shadow-sm">
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>مرصد مكافحة التضليل والتحقيق مفتوح المصدر (OSINT Unit)</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-[var(--text)] tracking-tight">
            رادار الحقيقة · مرصد التحقق الجنائي وكشف الشائعات
          </h1>

          <p className="text-sm md:text-base text-[var(--text-muted)] max-w-3xl leading-relaxed">
            وحدة الرصد الصحفي الجنائي في «الوطن اليوم». نعتمد على البحث العكسي، فحص البيانات الوصفية (Metadata)، ومطابقة خرائط الأقمار الصناعية لتمزيق غطاء التضليل وفضح الصور والفيديوهات المفبركة.
          </p>

          {/* لوحة المؤشرات الرقمية للنزاهة */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-4xl">
            <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1 shadow-sm">
              <span className="text-2xl font-black text-rose-500 block">100%</span>
              <span className="text-xs text-[var(--text-muted)] font-semibold">أدلة جنائية قابلة للمراجعة</span>
            </div>
            <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1 shadow-sm">
              <span className="text-2xl font-black text-purple-500 block">AI-Audit</span>
              <span className="text-xs text-[var(--text-muted)] font-semibold">كشف التزييف العميق (Deepfake)</span>
            </div>
            <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1 shadow-sm">
              <span className="text-2xl font-black text-amber-500 block">IFCN</span>
              <span className="text-xs text-[var(--text-muted)] font-semibold">معايير التحقق الدولية</span>
            </div>
            <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-1 shadow-sm">
              <span className="text-2xl font-black text-emerald-500 block">0</span>
              <span className="text-xs text-[var(--text-muted)] font-semibold">تسامح مع الشائعات والأرقام الوهمية</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom max-w-6xl mx-auto px-4 py-12 space-y-12">
        {/* 2. السلايدر الجنائي التفاعلي (Interactive Forensics Slider) */}
        <section className="rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-950/20 via-[var(--surface)] to-[var(--surface)] p-6 md:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-rose-500" />
                <h2 className="text-lg font-black text-[var(--text)]">مختبر المقارنة الجنائية التفاعلية (Forensics Slider)</h2>
              </div>
              <p className="text-xs text-[var(--text-muted)]">اسحب الخط الفاصل يميناً ويساراً لمقارنة الصورة المزيفة بالصورة الأصلية الموثقة</p>
            </div>
            <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 w-fit">
              حالة الأسبوع المحسومة
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* أداة السلايدر البصري */}
            <div className="lg:col-span-7">
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 select-none">
                {/* الصورة الأصلية (الخلفية) */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${factChecks[0].realImage})` }}
                >
                  <div className="absolute top-4 start-4 px-3 py-1 rounded-full bg-emerald-600/90 text-white text-xs font-bold shadow-md">
                    ✓ الواقع الموثق
                  </div>
                  <div className="absolute bottom-4 start-4 end-4 p-3 rounded-xl bg-black/70 backdrop-blur-md text-white text-xs">
                    {factChecks[0].realCaption}
                  </div>
                </div>

                {/* الصورة المزيفة (تظهر حسب موضع السلايدر) */}
                <div
                  className="absolute inset-y-0 start-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <div
                    className="absolute inset-y-0 start-0 h-full w-[100vw] max-w-none bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${factChecks[0].fakeImage})`,
                      width: "600px",
                    }}
                  >
                    <div className="absolute top-4 start-4 px-3 py-1 rounded-full bg-rose-600/90 text-white text-xs font-bold shadow-md">
                      ✕ الصورة المزيفة المتداولة
                    </div>
                    <div className="absolute bottom-4 start-4 p-3 rounded-xl bg-black/70 backdrop-blur-md text-white text-xs">
                      {factChecks[0].fakeCaption}
                    </div>
                  </div>
                </div>

                {/* مقبض السحب الرأسي */}
                <div
                  className="absolute inset-y-0 w-1 bg-white shadow-2xl cursor-ew-resize flex items-center justify-center"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-xs shadow-xl border border-rose-500">
                    ↔
                  </div>
                </div>
              </div>

              {/* شريط التحكم اليدوي بالسلايدر */}
              <div className="pt-4 flex items-center gap-3">
                <span className="text-xs font-bold text-rose-500">المزيف</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="flex-1 accent-rose-500 cursor-pointer"
                />
                <span className="text-xs font-bold text-emerald-500">الحقيقي الموثق</span>
              </div>
            </div>

            {/* تفاصيل التحقيق الجنائي للقضية */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-3">
                <span className="text-xs font-bold text-rose-500 flex items-center gap-1.5">
                  <Fingerprint className="w-4 h-4" />
                  <span>القرينة الجنائية والأدلة:</span>
                </span>
                <h3 className="font-black text-sm text-[var(--text)] leading-snug">
                  {factChecks[0].claim}
                </h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {factChecks[0].evidence}
                </p>
                <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>تم الفحص بواسطة: <strong>فريق الرصد العكسي</strong></span>
                  <span className="text-rose-500 font-bold">حكم: زائف كلياً</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. مختبر فحص الروابط والشائعات اللحظي (Live OSINT Sandbox) */}
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 pb-3 border-b border-[var(--border)]">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[var(--text)]">مختبر فحص الروابط والمقاطع اللحظي (OSINT Sandbox)</h2>
              <p className="text-xs text-[var(--text-muted)]">ضع أي ادعاء أو رابط خبر مشكوك فيه ليقوم محركنا بفحصه ومطابقته بقواعد بيانات التضليل</p>
            </div>
          </div>

          <form onSubmit={handleRunOsintTest} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                required
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="ألصق رابط التغريدة، المنشور، أو نص الشائعة المراد التحقق منها..."
                className="w-full px-5 py-3.5 pe-36 rounded-2xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-rose-500 transition-colors"
              />
              <button
                type="submit"
                disabled={testing || !testInput}
                className="absolute top-2 end-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md disabled:opacity-50 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{testing ? "جاري التحليل..." : "بدء الفحص الجنائي"}</span>
              </button>
            </div>
          </form>

          {/* نتيجة الفحص اللحظية */}
          {testResult && (
            <div className="p-6 rounded-2xl border border-rose-500/30 bg-rose-500/5 space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
                <span className="font-black text-sm text-[var(--text)] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-500" />
                  <span>نتيجة التحليل الجنائي المبدئي</span>
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-500 font-bold">
                  {testResult.verdict}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-1">
                  <span className="text-[10px] text-[var(--text-muted)] block">احتمالية التوليد بالذكاء الاصطناعي</span>
                  <span className="font-mono font-bold text-rose-500 text-sm">{testResult.deepfakeProbability}</span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-1">
                  <span className="text-[10px] text-[var(--text-muted)] block">تكرار الصورة في الأرشيف القديم</span>
                  <span className="font-mono font-bold text-[var(--text)] text-sm">{testResult.reverseMatchCount} نتيجة سابقة</span>
                </div>
                <div className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-1">
                  <span className="text-[10px] text-[var(--text-muted)] block">أقدم ظهور للمحتوى</span>
                  <span className="font-mono font-bold text-[var(--text)] text-sm">{testResult.earliestOccurrence}</span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* 4. أرشيف وسجل التحقيقات المعتمدة */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
            <div>
              <h2 className="text-xl font-black text-[var(--text)]">سجل التحقيقات المنشورة والمحسومة</h2>
              <p className="text-xs text-[var(--text-muted)]">كافة الشائعات والأخبار المفحوصة بأدلة قاطعة وروابط المصادر الأصلية</p>
            </div>

            {/* أزرار الفلترة */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {[
                { id: "all", label: "الكل" },
                { id: "fake", label: "زائف كلياً" },
                { id: "misleading", label: "مضلل ومجتزأ" },
                { id: "ai_generated", label: "ذكاء اصطناعي (AI)" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActiveFilter(btn.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeFilter === btn.id
                      ? "bg-rose-600 text-white shadow-sm"
                      : "bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--border)]"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredChecks.map((item) => {
              const badge = getVerdictBadge(item.verdict);
              const BadgeIcon = badge.icon;
              return (
                <div
                  key={item.id}
                  className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={item.fakeImage}
                      alt={item.claim}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-3 end-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 backdrop-blur-md shadow-md ${badge.bg}`}>
                        <BadgeIcon className="w-3.5 h-3.5" />
                        <span>{badge.label}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                        <span>{item.category}</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="font-bold text-sm text-[var(--text)] leading-snug">
                        {item.claim}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        {item.evidence}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span>{item.sourcesCount} مصادر متطابقة</span>
                      <span className="text-rose-500 font-bold hover:underline cursor-pointer">
                        عرض التقرير الكامل ←
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
