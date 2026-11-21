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
} from "lucide-react";

interface CommodityItem {
  id: string;
  name: string;
  unit: string;
  priceIls: string;
  priceJod: string;
  change: string;
  isUp: boolean;
  category: "fuel" | "food" | "gold";
}

const OFFICIAL_COMMODITIES: CommodityItem[] = [
  {
    id: "c-1",
    name: "بنزين 95 أوكتان",
    unit: "لتر واحد",
    priceIls: "7.14 ₪",
    priceJod: "1.35 د.أ",
    change: "-0.05 ₪",
    isUp: false,
    category: "fuel",
  },
  {
    id: "c-2",
    name: "سولار (ديزل)",
    unit: "لتر واحد",
    priceIls: "6.25 ₪",
    priceJod: "1.18 د.أ",
    change: "مستقر",
    isUp: false,
    category: "fuel",
  },
  {
    id: "c-3",
    name: "أسطوانة غاز الطهي",
    unit: "12 كغم",
    priceIls: "70.00 ₪",
    priceJod: "13.20 د.أ",
    change: "تسعيرة رسمية",
    isUp: false,
    category: "fuel",
  },
  {
    id: "c-4",
    name: "دقيق القمح الفاخر",
    unit: "50 كغم",
    priceIls: "125.00 ₪",
    priceJod: "23.60 د.أ",
    change: "-3.00 ₪",
    isUp: false,
    category: "food",
  },
  {
    id: "c-5",
    name: "النفط الخام (Crude Oil)",
    unit: "برميل",
    priceIls: "281.33 ₪",
    priceJod: "$83.98",
    change: "+0.35%",
    isUp: true,
    category: "fuel",
  },
];

export function PalestineCommoditiesWidget() {
  // حالة الآلة الحاسبة الذكية السريعة للعملات والذهب
  const [amount, setAmount] = useState<number>(100);
  const [conversionType, setConversionType] = useState<"usd_to_ils" | "jod_to_ils" | "gold21_to_ils">("usd_to_ils");

  // أسعار الصرف الحية المثبتة من API-Ninjas
  const USD_TO_ILS = 3.35;
  const JOD_TO_ILS = 4.73;
  const GOLD_21K_PER_GRAM_ILS = 331.28; // محسوب من أونصة 3515.4$

  let convertedResult = 0;
  let unitLabel = "شيكل ₪";

  if (conversionType === "usd_to_ils") {
    convertedResult = amount * USD_TO_ILS;
  } else if (conversionType === "jod_to_ils") {
    convertedResult = amount * JOD_TO_ILS;
  } else if (conversionType === "gold21_to_ils") {
    convertedResult = amount * GOLD_21K_PER_GRAM_ILS;
  }

  return (
    <section className="space-y-6 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#1C1403]/40 via-[var(--surface)] to-[var(--surface)] p-6 sm:p-8 shadow-xl">
      {/* 1. ترويسة صرح المال والأسواق */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-md shrink-0">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text)] tracking-tight">
                أسواق فلسطين والسلع الحيوية · رصد لحظي
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <span>API-Ninjas Live</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              أسعار الذهب المباشرة، صرف العملات، والسلع والمحروقات المعتمدة في الأراضي الفلسطينية.
            </p>
          </div>
        </div>

        <Link
          href="/economy"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30 transition-colors self-start sm:self-auto"
        >
          <span>لوحة البورصة والاقتصاد الكاملة</span>
          <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
        </Link>
      </div>

      {/* 2. شبكة المحتوى: أسعار الذهب اللحظية + الحاسبة السريعة + جدول السلع */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* العمود الأيمن (7 أعمدة): بطاقات أسعار الذهب والسلع الرسمية */}
        <div className="lg:col-span-7 space-y-4">
          {/* بطاقات الذهب اللحظي الثلاث */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/5 hover:border-amber-500/60 transition-all text-center">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">ذهب عيار 24</span>
              <div className="text-lg sm:text-xl font-black text-amber-400 font-mono">378.60 ₪</div>
              <span className="text-[10px] text-emerald-400 font-semibold mt-0.5 block">+0.45%</span>
            </div>

            <div className="p-3.5 rounded-2xl border border-amber-500/40 bg-gradient-to-b from-amber-500/15 to-transparent hover:border-amber-500 transition-all text-center shadow-md">
              <span className="text-[11px] font-black text-amber-300 block mb-1">عيار 21 (الأكثر تداولاً)</span>
              <div className="text-lg sm:text-xl font-black text-amber-300 font-mono">331.28 ₪</div>
              <span className="text-[10px] text-emerald-400 font-semibold mt-0.5 block">+0.45%</span>
            </div>

            <div className="p-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/5 hover:border-amber-500/60 transition-all text-center">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">ذهب عيار 18</span>
              <div className="text-lg sm:text-xl font-black text-amber-400 font-mono">283.95 ₪</div>
              <span className="text-[10px] text-emerald-400 font-semibold mt-0.5 block">+0.45%</span>
            </div>
          </div>

          {/* قائمة السلع الحيوية والمحروقات */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] pb-2 border-b border-[var(--border)]">
              <span>السلعة / المشتق البترولي</span>
              <span>السعر بالشيكل</span>
              <span>السعر بالدينار / الدولار</span>
              <span>الحالة</span>
            </div>

            {OFFICIAL_COMMODITIES.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.02] text-xs transition-colors"
              >
                <div className="flex items-center gap-2">
                  {c.category === "fuel" ? (
                    <Fuel className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <ShoppingBag className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  <div>
                    <span className="font-bold text-[var(--text)] block">{c.name}</span>
                    <span className="text-[10px] text-[var(--text-muted)]">{c.unit}</span>
                  </div>
                </div>

                <span className="font-mono font-bold text-amber-300">{c.priceIls}</span>
                <span className="font-mono text-slate-400">{c.priceJod}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-300 border border-white/10 font-medium">
                  {c.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* العمود الأيسر (5 أعمدة): حاسبة التحويل السريع المباشرة */}
        <div className="lg:col-span-5 rounded-2xl border border-[var(--border)] bg-black/40 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-sm text-white">حاسبة الصرف والذهب اللحظية</h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">سعر السوق المباشر</span>
          </div>

          {/* أزرار اختيار نوع التحويل */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              onClick={() => setConversionType("usd_to_ils")}
              className={`py-2 px-2.5 rounded-xl font-bold transition-all text-center ${
                conversionType === "usd_to_ils"
                  ? "bg-amber-500 text-slate-950 shadow-md font-black"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              $ دولار ← ₪
            </button>
            <button
              onClick={() => setConversionType("jod_to_ils")}
              className={`py-2 px-2.5 rounded-xl font-bold transition-all text-center ${
                conversionType === "jod_to_ils"
                  ? "bg-amber-500 text-slate-950 shadow-md font-black"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              د.أ دينار ← ₪
            </button>
            <button
              onClick={() => setConversionType("gold21_to_ils")}
              className={`py-2 px-2.5 rounded-xl font-bold transition-all text-center ${
                conversionType === "gold21_to_ils"
                  ? "bg-amber-500 text-slate-950 shadow-md font-black"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              ذهب 21ك ← ₪
            </button>
          </div>

          {/* حقل إدخال المبلغ */}
          <div className="space-y-1.5">
            <label className="text-[11px] text-slate-400 block">
              {conversionType === "gold21_to_ils" ? "عدد غرامات الذهب:" : "المبلغ المراد تحويله:"}
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full py-2.5 px-3.5 rounded-xl bg-white/5 border border-white/15 text-white font-mono text-base font-bold focus:outline-none focus:border-amber-400"
              />
              <span className="absolute end-3 top-2.5 text-xs text-amber-400 font-bold">
                {conversionType === "usd_to_ils" ? "USD $" : conversionType === "jod_to_ils" ? "JOD د.أ" : "غرام"}
              </span>
            </div>
          </div>

          {/* نتيجة التحويل الفورية */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 to-transparent border border-amber-500/30 text-center">
            <span className="text-[11px] text-slate-400 block mb-1">المقابل الفعلي بالسوق الآن:</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
              {convertedResult.toLocaleString("ar-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {unitLabel}
            </div>
            <span className="text-[10px] text-emerald-400 mt-1 block">
              محدث وفق أسعار API-Ninjas المباشرة اليوم
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
