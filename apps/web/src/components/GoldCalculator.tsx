"use client";

import { useState } from "react";
import { Coins, Sparkles, Calculator } from "lucide-react";

interface Props {
  initialOuncePrice?: number; // سعر الأونصة بالدولار (افتراضياً 2735.40)
  usdToIlsRate?: number; // سعر صرف الدولار للشيكل (افتراضياً 3.75)
}

export function GoldCalculator({
  initialOuncePrice = 2735.4,
  usdToIlsRate = 3.75,
}: Props) {
  const [weightGrams, setWeightGrams] = useState<number>(10);
  const [karat, setKarat] = useState<24 | 21 | 18>(21);
  const [currency, setCurrency] = useState<"ILS" | "USD">("ILS");

  // وزن أونصة الذهب الصافي = 31.1035 غرام
  const gramPrice24Usd = initialOuncePrice / 31.1035;
  const gramPrice21Usd = gramPrice24Usd * (21 / 24);
  const gramPrice18Usd = gramPrice24Usd * (18 / 24);

  const getGramPriceUsd = (k: number) => {
    if (k === 24) return gramPrice24Usd;
    if (k === 21) return gramPrice21Usd;
    return gramPrice18Usd;
  };

  const selectedGramPriceUsd = getGramPriceUsd(karat);
  const selectedGramPrice = currency === "ILS" ? selectedGramPriceUsd * usdToIlsRate : selectedGramPriceUsd;

  const totalCalculated = weightGrams * selectedGramPrice;

  const presets = [
    { label: "1 غرام", weight: 1 },
    { label: "ليرة ذهب (8غ)", weight: 8 },
    { label: "10 غرام", weight: 10 },
    { label: "أونصة (31.1غ)", weight: 31.1 },
    { label: "50 غرام", weight: 50 },
    { label: "100 غرام", weight: 100 },
  ];

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-[var(--surface)] to-[var(--surface)] p-6 space-y-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base text-[var(--text)] flex items-center gap-2">
              <span>حاسبة أسعار الذهب الفورية</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                مباشر
              </span>
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              احتساب دقيق حسب أسعار البورصة العالمية وسعر صرف الشيكل والدولار
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[var(--bg)] p-1 rounded-xl border border-[var(--border)] text-xs font-bold">
          <button
            type="button"
            onClick={() => setCurrency("ILS")}
            className={`px-3 py-1 rounded-lg transition-colors ${
              currency === "ILS" ? "bg-amber-500 text-slate-950 font-black shadow-sm" : "text-[var(--text-muted)]"
            }`}
          >
            بالشيكل (₪)
          </button>
          <button
            type="button"
            onClick={() => setCurrency("USD")}
            className={`px-3 py-1 rounded-lg transition-colors ${
              currency === "USD" ? "bg-amber-500 text-slate-950 font-black shadow-sm" : "text-[var(--text-muted)]"
            }`}
          >
            بالدولار ($)
          </button>
        </div>
      </div>

      {/* شريط بطاقات أسعار الجرام الحالية */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div
          onClick={() => setKarat(24)}
          className={`p-3 rounded-xl border cursor-pointer transition-all ${
            karat === 24
              ? "border-amber-500 bg-amber-500/10 shadow-sm"
              : "border-[var(--border)] bg-[var(--surface)] hover:border-amber-500/50"
          }`}
        >
          <span className="text-xs text-[var(--text-muted)] block font-semibold">عيار 24 (النقي)</span>
          <div className="text-base font-black text-amber-500 font-mono mt-1">
            {(currency === "ILS" ? gramPrice24Usd * usdToIlsRate : gramPrice24Usd).toFixed(2)}{" "}
            {currency === "ILS" ? "₪" : "$"}
          </div>
        </div>

        <div
          onClick={() => setKarat(21)}
          className={`p-3 rounded-xl border cursor-pointer transition-all ${
            karat === 21
              ? "border-amber-500 bg-amber-500/10 shadow-sm"
              : "border-[var(--border)] bg-[var(--surface)] hover:border-amber-500/50"
          }`}
        >
          <span className="text-xs text-[var(--text-muted)] block font-semibold">عيار 21 (الشائع)</span>
          <div className="text-base font-black text-amber-500 font-mono mt-1">
            {(currency === "ILS" ? gramPrice21Usd * usdToIlsRate : gramPrice21Usd).toFixed(2)}{" "}
            {currency === "ILS" ? "₪" : "$"}
          </div>
        </div>

        <div
          onClick={() => setKarat(18)}
          className={`p-3 rounded-xl border cursor-pointer transition-all ${
            karat === 18
              ? "border-amber-500 bg-amber-500/10 shadow-sm"
              : "border-[var(--border)] bg-[var(--surface)] hover:border-amber-500/50"
          }`}
        >
          <span className="text-xs text-[var(--text-muted)] block font-semibold">عيار 18</span>
          <div className="text-base font-black text-amber-500 font-mono mt-1">
            {(currency === "ILS" ? gramPrice18Usd * usdToIlsRate : gramPrice18Usd).toFixed(2)}{" "}
            {currency === "ILS" ? "₪" : "$"}
          </div>
        </div>
      </div>

      {/* حقل إدخال الوزن والخيارات الجاهزة */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[var(--text)]">أدخل الوزن المطلوب حسابه (بالغرام):</label>
          <span className="text-xs font-mono text-amber-500 font-bold">{weightGrams} غرام</span>
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            min={0.1}
            step={0.5}
            value={weightGrams || ""}
            onChange={(e) => setWeightGrams(parseFloat(e.target.value) || 0)}
            className="flex-1 px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-base font-bold text-[var(--text)] font-mono focus:outline-none focus:border-amber-500"
            placeholder="أدخل عدد الغرامات..."
          />
        </div>

        {/* أزرار الأوزان السريعة */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[11px] text-[var(--text-muted)] font-semibold shrink-0">أوزان شائعة:</span>
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setWeightGrams(p.weight)}
              className="px-2.5 py-1 rounded-lg border border-[var(--border)] hover:border-amber-500 bg-[var(--surface)] text-[var(--text-muted)] hover:text-amber-500 transition-colors shrink-0 font-medium"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* النتيجة الإجمالية الكبرى */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-[var(--text-muted)] font-bold block mb-1">
            القيمة التقديرية الصافية لـ {weightGrams} غرام (عيار {karat}):
          </span>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
            {totalCalculated.toLocaleString("ar-EG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
            <span className="text-base font-sans font-bold">{currency === "ILS" ? "شيكل" : "دولار"}</span>
          </div>
        </div>

        <div className="text-xs text-[var(--text-muted)] sm:text-start bg-black/10 dark:bg-white/5 p-3 rounded-lg border border-amber-500/20">
          <div className="flex items-center gap-1 font-semibold text-[var(--text)] mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>سعر الأونصة عالمياً</span>
          </div>
          <span className="font-mono font-bold">${initialOuncePrice.toFixed(2)}</span> · سعر الصرف:{" "}
          <span className="font-mono font-bold">{usdToIlsRate} ₪</span>
        </div>
      </div>
    </div>
  );
}
