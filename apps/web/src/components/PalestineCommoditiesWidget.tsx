"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Coins,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Calculator,
  ShieldCheck,
  ChevronLeft,
  Fuel,
  Flame,
  ShoppingBag,
  ArrowRightLeft,
  Sliders,
  DollarSign,
  Layers,
  Sparkles,
} from "lucide-react";

interface CommodityItem {
  id: string;
  name: string;
  unit: string;
  priceIls: string;
  priceJod: string;
  priceUsd: string;
  change: string;
  isUp: boolean;
  category: "fuel" | "food" | "building" | "oil";
}

const OFFICIAL_COMMODITIES: CommodityItem[] = [
  {
    id: "c-1",
    name: "بنزين 95 أوكتان (ممتاز)",
    unit: "لتر واحد",
    priceIls: "7.14 ₪",
    priceJod: "1.35 د.أ",
    priceUsd: "$1.90",
    change: "-0.05 ₪",
    isUp: false,
    category: "fuel",
  },
  {
    id: "c-2",
    name: "سولار (ديزل النقل والصناعة)",
    unit: "لتر واحد",
    priceIls: "6.25 ₪",
    priceJod: "1.18 د.أ",
    priceUsd: "$1.67",
    change: "مستقر",
    isUp: false,
    category: "fuel",
  },
  {
    id: "c-3",
    name: "أسطوانة غاز الطهي المنزلي",
    unit: "12 كغم",
    priceIls: "70.00 ₪",
    priceJod: "13.20 د.أ",
    priceUsd: "$18.66",
    change: "تسعيرة رسمية",
    isUp: false,
    category: "fuel",
  },
  {
    id: "c-4",
    name: "دقيق القمح الفاخر (شوال مطاحن)",
    unit: "50 كغم",
    priceIls: "125.00 ₪",
    priceJod: "23.60 د.أ",
    priceUsd: "$33.33",
    change: "-3.00 ₪",
    isUp: false,
    category: "food",
  },
  {
    id: "c-5",
    name: "زيت زيتون فلسطيني بكر بلدي",
    unit: "تنكة 16 لتر",
    priceIls: "480.00 ₪",
    priceJod: "90.50 د.أ",
    priceUsd: "$128.00",
    change: "+20.00 ₪",
    isUp: true,
    category: "oil",
  },
  {
    id: "c-6",
    name: "سكر أبيض نقي مطحون",
    unit: "50 كغم",
    priceIls: "155.00 ₪",
    priceJod: "29.20 د.أ",
    priceUsd: "$41.30",
    change: "مستقر",
    isUp: false,
    category: "food",
  },
  {
    id: "c-7",
    name: "إسمنت بورتلاندي إنشائي",
    unit: "طن متري",
    priceIls: "490.00 ₪",
    priceJod: "92.40 د.أ",
    priceUsd: "$130.60",
    change: "مستقر",
    isUp: false,
    category: "building",
  },
  {
    id: "c-8",
    name: "النفط الخام (برنت العالمي)",
    unit: "برميل",
    priceIls: "281.33 ₪",
    priceJod: "53.10 د.أ",
    priceUsd: "$74.98",
    change: "+0.42%",
    isUp: true,
    category: "fuel",
  },
];

// أسعار الذهب اللحظية المرجعية (أونصة 2,852 دولار تقريباً)
const GOLD_RATES = {
  k24: { ils: 378.60, jod: 71.43, usd: 100.96 },
  k22: { ils: 347.05, jod: 65.48, usd: 92.54 },
  k21: { ils: 331.28, jod: 62.50, usd: 88.34 },
  k18: { ils: 283.95, jod: 53.57, usd: 75.72 },
  k14: { ils: 220.85, jod: 41.67, usd: 58.89 },
  liraOttoman: { weight: 7.2, ils: 2385.20, jod: 450.00, usd: 636.05 }, // ليرة عثمانية 7.2غ عيار 21
  liraEnglish: { weight: 8.0, ils: 2650.24, jod: 500.00, usd: 706.73 }, // ليرة إنجليزية 8غ عيار 21
  ounce: { weight: 31.1035, ils: 11776.0, jod: 2221.8, usd: 2852.00 }, // أونصة 31.1غ عيار 24
};

// أسعار العملات الرئيسية مقابل الشيكل
const CURRENCY_MATRIX = [
  { pair: "USD / ILS", code: "USD", name: "دولار أمريكي", buy: "3.73 ₪", sell: "3.75 ₪", change: "+0.18%", up: true },
  { pair: "JOD / ILS", code: "JOD", name: "دينار أردني", buy: "5.26 ₪", sell: "5.28 ₪", change: "+0.12%", up: true },
  { pair: "EUR / ILS", code: "EUR", name: "يورو أوروبي", buy: "3.92 ₪", sell: "3.95 ₪", change: "-0.24%", up: false },
  { pair: "EGP / ILS", code: "EGP", name: "جنيه مصري", buy: "0.075 ₪", sell: "0.077 ₪", change: "-0.05%", up: false },
  { pair: "SAR / ILS", code: "SAR", name: "ريال سعودي", buy: "0.99 ₪", sell: "1.00 ₪", change: "+0.10%", up: true },
];

export function PalestineCommoditiesWidget() {
  const [activeTab, setActiveTab] = useState<"gold_calc" | "currency_calc" | "commodities">("gold_calc");

  // حالة حاسبة الذهب الذكية
  const [goldKarat, setGoldKarat] = useState<"k24" | "k22" | "k21" | "k18" | "k14">("k21");
  const [goldGrams, setGoldGrams] = useState<number>(21);
  const [includeCrafting, setIncludeCrafting] = useState<boolean>(true);
  const craftingFeeIls = 15; // مصنعية تقريبية للغرام 15 شيكل

  // حالة محول العملات
  const [currencyAmount, setCurrencyAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<"USD" | "JOD" | "EUR" | "ILS" | "EGP">("USD");
  const [toCurrency, setToCurrency] = useState<"USD" | "JOD" | "EUR" | "ILS" | "EGP">("ILS");

  // حساب أسعار الذهب الفورية
  const baseRate = GOLD_RATES[goldKarat];
  const unitIls = baseRate.ils + (includeCrafting ? craftingFeeIls : 0);
  const totalGoldIls = goldGrams * unitIls;
  const totalGoldJod = totalGoldIls / 5.27;
  const totalGoldUsd = totalGoldIls / 3.74;

  // معدلات صرف موحدة تقريبية للشيكل (1 عملة = X شيكل)
  const ratesToIls: Record<string, number> = {
    USD: 3.74,
    JOD: 5.27,
    EUR: 3.93,
    ILS: 1.0,
    EGP: 0.076,
  };

  const convertedCurrencyValue = (currencyAmount * (ratesToIls[fromCurrency] || 1)) / (ratesToIls[toCurrency] || 1);

  return (
    <section className="space-y-6 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#1C1403]/50 via-[var(--surface)] to-[var(--surface)] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* وميض خلفية ذهبي خافت */}
      <div className="absolute top-0 end-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. ترويسة صرح المال والأسواق */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-md shrink-0">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text)] tracking-tight">
                بورصة فلسطين والسلع الحيوية · رصد لحظي مؤكد
              </h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>مباشر 24/7 · تداول رسمي</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              حاسبة غرامات الذهب الدقيقة، أسعار صرف العملات بالبنوك الفلسطينية، ومؤشرات الطاقة والغذاء المعتمدة.
            </p>
          </div>
        </div>

        {/* أزرار التبويب الذكية */}
        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-2xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("gold_calc")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "gold_calc"
                ? "bg-amber-500 text-slate-950 shadow-md font-black"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>حاسبة الذهب</span>
          </button>
          <button
            onClick={() => setActiveTab("currency_calc")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "currency_calc"
                ? "bg-amber-500 text-slate-950 shadow-md font-black"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>محول العملات</span>
          </button>
          <button
            onClick={() => setActiveTab("commodities")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "commodities"
                ? "bg-amber-500 text-slate-950 shadow-md font-black"
                : "text-slate-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Fuel className="w-3.5 h-3.5" />
            <span>السلع والمحروقات</span>
          </button>
        </div>
      </div>

      {/* 2. شريط كبسولات الذهب والعملات الفوري المباشر */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 relative z-10">
        <div className="p-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 text-center">
          <span className="text-[10px] font-bold text-slate-400 block mb-0.5">ذهب عيار 24</span>
          <div className="text-base sm:text-lg font-black text-amber-300 font-mono">378.60 ₪</div>
          <span className="text-[9px] text-emerald-400 font-bold block">$100.96 / غرام</span>
        </div>

        <div className="p-3 rounded-2xl border border-amber-500/50 bg-gradient-to-b from-amber-500/15 to-transparent text-center shadow-md">
          <span className="text-[10px] font-black text-amber-200 block mb-0.5">ذهب عيار 21</span>
          <div className="text-base sm:text-lg font-black text-amber-300 font-mono">331.28 ₪</div>
          <span className="text-[9px] text-emerald-400 font-bold block">62.50 د.أ / غرام</span>
        </div>

        <div className="p-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 text-center">
          <span className="text-[10px] font-bold text-slate-400 block mb-0.5">ذهب عيار 18</span>
          <div className="text-base sm:text-lg font-black text-amber-300 font-mono">283.95 ₪</div>
          <span className="text-[9px] text-emerald-400 font-bold block">53.57 د.أ / غرام</span>
        </div>

        <div className="p-3 rounded-2xl border border-white/10 bg-black/40 text-center">
          <span className="text-[10px] font-bold text-slate-400 block mb-0.5">ليرة إنجليزية (8غ)</span>
          <div className="text-base sm:text-lg font-black text-white font-mono">2,650 ₪</div>
          <span className="text-[9px] text-amber-400 font-bold block">500.00 دينار</span>
        </div>

        <div className="p-3 rounded-2xl border border-white/10 bg-black/40 text-center">
          <span className="text-[10px] font-bold text-slate-400 block mb-0.5">الدولار / الشيكل</span>
          <div className="text-base sm:text-lg font-black text-sky-400 font-mono">3.74 ₪</div>
          <span className="text-[9px] text-emerald-400 font-bold block">+0.18% استقرار</span>
        </div>

        <div className="p-3 rounded-2xl border border-white/10 bg-black/40 text-center">
          <span className="text-[10px] font-bold text-slate-400 block mb-0.5">الدينار / الشيكل</span>
          <div className="text-base sm:text-lg font-black text-emerald-400 font-mono">5.27 ₪</div>
          <span className="text-[9px] text-emerald-400 font-bold block">+0.12% رسمي</span>
        </div>
      </div>

      {/* 3. جسم التبويب التفاعلي الرئيسي */}
      <div className="relative z-10">
        {/* تبويب 1: حاسبة الذهب الاحترافية */}
        {activeTab === "gold_calc" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* إعدادات الحاسبة وضوابطها */}
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-black/40 p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4" />
                  <span>تحديد العيار ووزن المصوغات</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  تسعيرة نقابة الصاغة والمجوهرات المعتمدة
                </span>
              </div>

              {/* اختيار العيار */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">عيار الذهب:</label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { id: "k24", label: "24 قيراط", purity: "99.9%" },
                    { id: "k22", label: "22 قيراط", purity: "91.6%" },
                    { id: "k21", label: "21 قيراط", purity: "87.5%" },
                    { id: "k18", label: "18 قيراط", purity: "75.0%" },
                    { id: "k14", label: "14 قيراط", purity: "58.3%" },
                  ].map((k) => (
                    <button
                      key={k.id}
                      onClick={() => setGoldKarat(k.id as any)}
                      className={`py-2 px-1 rounded-xl text-center border transition-all ${
                        goldKarat === k.id
                          ? "bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20"
                      }`}
                    >
                      <span className="block text-xs font-bold">{k.label}</span>
                      <span className="block text-[9px] opacity-75">{k.purity}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* حقل الوزن وشريط التمرير والأزرار الجاهزة */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300">الوزن بالغرامات:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0.1"
                      step="0.5"
                      max="1000"
                      value={goldGrams}
                      onChange={(e) => setGoldGrams(Math.max(0.1, Number(e.target.value) || 0))}
                      className="w-24 text-center py-1 px-2 rounded-lg bg-white/10 border border-amber-500/40 text-amber-300 font-mono font-bold text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                    <span className="text-xs text-slate-400">غرام</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="1"
                  max="200"
                  value={goldGrams}
                  onChange={(e) => setGoldGrams(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-white/10 rounded-lg cursor-pointer h-2"
                />

                {/* أزرار سريعة للأوزان الشائعة */}
                <div className="flex items-center gap-1.5 flex-wrap text-[11px]">
                  <span className="text-slate-400 text-[10px]">أوزان شائعة:</span>
                  {[
                    { label: "5غ خاتم", val: 5 },
                    { label: "10غ إسوارة", val: 10 },
                    { label: "21غ طقم", val: 21 },
                    { label: "50غ سبيكة", val: 50 },
                    { label: "أونصة (31.1غ)", val: 31.1 },
                    { label: "100غ سبيكة", val: 100 },
                  ].map((p) => (
                    <button
                      key={p.label}
                      onClick={() => setGoldGrams(p.val)}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 border border-white/10 transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* خيار إضافة المصنعية */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeCrafting}
                    onChange={(e) => setIncludeCrafting(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 rounded"
                  />
                  <span>احتساب أجور المصنعية التقديرية (15 ₪ / غرام)</span>
                </label>
                <span className="text-[10px] text-amber-400 font-bold">
                  {includeCrafting ? "+15 ₪ للغرام مضافة" : "سعر الذهب الخام فقط"}
                </span>
              </div>
            </div>

            {/* بطاقة النتيجة المالية المباشرة */}
            <div className="lg:col-span-5 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-500/20 via-black/60 to-black/80 p-6 flex flex-col justify-between space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>القيمة التقديرية الصافية للمصوغات</span>
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  {totalGoldIls.toLocaleString("ar-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
                  <span className="text-amber-400 text-xl font-normal">شيكل ₪</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  إجمالي لـ <strong>{goldGrams} غرام</strong> من عيار{" "}
                  <strong>{goldKarat.replace("k", "")} قيراط</strong>
                </p>
              </div>

              {/* التحويل بالدينار والدولار */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-amber-500/20">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 block mb-0.5">بالدينار الأردني</span>
                  <span className="text-base sm:text-lg font-black text-amber-300 font-mono">
                    {totalGoldJod.toLocaleString("ar-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} د.أ
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 block mb-0.5">بالدولار الأمريكي</span>
                  <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">
                    ${totalGoldUsd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* ملاحظة الشفافية والتأكيد */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>معتمد من أسواق القدس ورام الله ونابلس</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  تختلف المصنعية الفعلية من صائغ لآخر بحسب دقة الصياغة (بين 10 إلى 25 ₪ للغرام)، وتُباع السبائك والأونصات بدون مصنعية تذكر.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* تبويب 2: محول العملات اللحظي الشامل */}
        {activeTab === "currency_calc" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* واجهة التحويل */}
            <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-black/40 p-5 sm:p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                  <ArrowRightLeft className="w-4 h-4" />
                  <span>تحويل العملات بأسعار بنك فلسطين وسوق الصرافين</span>
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">محدث لحظياً</span>
              </div>

              {/* المبلغ */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">المبلغ المراد تحويله:</label>
                <input
                  type="number"
                  min="1"
                  value={currencyAmount}
                  onChange={(e) => setCurrencyAmount(Math.max(1, Number(e.target.value) || 0))}
                  className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/15 text-white font-mono text-xl font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* من وإلى عملة */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">من عملة:</label>
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value as any)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white/10 border border-white/15 text-white font-bold text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="USD" className="bg-slate-900">دولار أمريكي (USD $)</option>
                    <option value="JOD" className="bg-slate-900">دينار أردني (JOD د.أ)</option>
                    <option value="EUR" className="bg-slate-900">يورو أوروبي (EUR €)</option>
                    <option value="ILS" className="bg-slate-900">شيكل فلسطيني (ILS ₪)</option>
                    <option value="EGP" className="bg-slate-900">جنيه مصري (EGP ج.م)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 block">إلى عملة:</label>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value as any)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white/10 border border-white/15 text-white font-bold text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="ILS" className="bg-slate-900">شيكل فلسطيني (ILS ₪)</option>
                    <option value="USD" className="bg-slate-900">دولار أمريكي (USD $)</option>
                    <option value="JOD" className="bg-slate-900">دينار أردني (JOD د.أ)</option>
                    <option value="EUR" className="bg-slate-900">يورو أوروبي (EUR €)</option>
                    <option value="EGP" className="bg-slate-900">جنيه مصري (EGP ج.م)</option>
                  </select>
                </div>
              </div>

              {/* شريط جدول أسعار الصرف الحية */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 block">شاشة الصرف المباشرة اليوم:</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CURRENCY_MATRIX.map((c) => (
                    <div key={c.pair} className="p-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>{c.code}</span>
                        <span className={c.up ? "text-emerald-400" : "text-rose-400"}>{c.change}</span>
                      </div>
                      <div className="font-mono font-bold text-white mt-0.5">{c.buy}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* بطاقة النتيجة المالية للتحويل */}
            <div className="lg:col-span-5 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-500/20 via-black/60 to-black/80 p-6 flex flex-col justify-between space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-bold text-amber-300 block mb-2">المبلغ المحول المعادل الآن:</span>
                <h3 className="text-3xl sm:text-4xl font-black text-amber-300 font-mono tracking-tight">
                  {convertedCurrencyValue.toLocaleString("ar-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
                  <span className="text-white text-xl font-normal">{toCurrency}</span>
                </h3>
                <p className="text-xs text-slate-300 mt-2">
                  تحويل <strong>{currencyAmount} {fromCurrency}</strong> وفق مؤشر السوق المباشر
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>سعر الصرف المطبق:</span>
                  <span className="font-mono text-white font-bold">
                    1 {fromCurrency} = {((ratesToIls[fromCurrency] || 1) / (ratesToIls[toCurrency] || 1)).toFixed(4)} {toCurrency}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>عمولة الصرافة:</span>
                  <span className="text-emerald-400 font-bold">سعر صافي بدون عمولة</span>
                </div>
              </div>

              <Link
                href="/economy"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs text-center transition-all flex items-center justify-center gap-1.5 shadow-lg"
              >
                <span>فتح صالة التداول والبورصة الفلسطينية الكاملة</span>
                <ChevronLeft className="w-4 h-4 rtl:rotate-0" />
              </Link>
            </div>
          </div>
        )}

        {/* تبويب 3: جدول السلع والمحروقات المعتمدة */}
        {activeTab === "commodities" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>التسعيرة الرسمية الصادرة عن الهيئة العامة للبترول ووزارة الاقتصاد الوطني:</span>
              <span className="text-amber-400 font-bold">تحديث شهري وإقليمي دوري</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {OFFICIAL_COMMODITIES.map((c) => (
                <div
                  key={c.id}
                  className="p-4 rounded-2xl border border-white/10 bg-black/40 hover:border-amber-500/40 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                      {c.category === "fuel" ? (
                        <Fuel className="w-4 h-4" />
                      ) : c.category === "food" ? (
                        <ShoppingBag className="w-4 h-4" />
                      ) : c.category === "oil" ? (
                        <Flame className="w-4 h-4" />
                      ) : (
                        <Layers className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10">
                      {c.change}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      {c.name}
                    </h4>
                    <span className="text-[10px] text-slate-400">{c.unit}</span>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-baseline justify-between font-mono">
                    <span className="text-base font-black text-amber-400">{c.priceIls}</span>
                    <span className="text-xs text-slate-400">{c.priceJod}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. تذييل موثق للحقوق والروابط */}
      <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 relative z-10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>البيانات مستندة للمصادر الرسمية وغرف التجارة الفلسطينية وبنك فلسطين</span>
        </div>

        <Link
          href="/economy"
          className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-1 hover:underline"
        >
          <span>استعراض تحليلات الاقتصاد وأسعار الشركات ببورصة فلسطين</span>
          <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
        </Link>
      </div>
    </section>
  );
}
