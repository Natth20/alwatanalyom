"use client";

import { useState } from "react";
import { Calculator, ArrowRightLeft, Sparkles } from "lucide-react";
import { InstrumentQuote } from "@awt/shared";

interface Props {
  quotes: InstrumentQuote[];
}

export function CurrencyConverter({ quotes }: Props) {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("ILS");

  // استخراج أسعار الصرف الحية وتحويلها لأرقام حسابية
  const usdIlsRaw = quotes.find((q) => q.symbol === "USDILS")?.price;
  const usdIls = usdIlsRaw ? parseFloat(usdIlsRaw) || 3.75 : 3.75;

  const eurUsdRaw = quotes.find((q) => q.symbol === "EURUSD")?.price;
  const eurUsd = eurUsdRaw ? parseFloat(eurUsdRaw) || 1.08 : 1.08;

  const goldOunceRaw = quotes.find((q) => q.symbol === "XAUUSD")?.price;
  const goldOunce = goldOunceRaw ? parseFloat(goldOunceRaw) || 2700 : 2700;

  // أسعار التحويل التقريبية بالنسبة للدولار
  const ratesToUsd: Record<string, number> = {
    USD: 1,
    ILS: 1 / usdIls,
    JOD: 1 / 0.709, // الدينار الأردني مربوط بالدولار تقريباً 0.709
    EUR: eurUsd,
  };

  const calculateConversion = () => {
    const fromRate = ratesToUsd[fromCurrency] || 1;
    const toRate = ratesToUsd[toCurrency] || 1;
    const amountInUsd = amount * fromRate;
    const result = amountInUsd / toRate;
    return result.toFixed(2);
  };

  // حساب أسعار غرام الذهب
  const goldGram24 = goldOunce / 31.1035;
  const goldGram21 = goldGram24 * (21 / 24);
  const goldGram18 = goldGram24 * (18 / 24);

  return (
    <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-6 my-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-[var(--primary)]" />
          <h3 className="font-bold text-base text-[var(--text)]">
            حاسبة تحويل العملات والذهب في فلسطين
          </h3>
        </div>
        <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>محدثة وفق مؤشرات الصرف الحالية</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* محول العملات */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-[var(--text-muted)] block">
            تحويل العملات النقدية (شيكل، دولار، دينار، يورو)
          </label>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="text-[10px] text-[var(--text-muted)] block mb-1">المبلغ</label>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm font-bold text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
              />
            </div>

            <div>
              <label className="text-[10px] text-[var(--text-muted)] block mb-1">من</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-2 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs font-bold text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
              >
                <option value="USD">دولار أمريكي ($)</option>
                <option value="JOD">دينار أردني (JOD)</option>
                <option value="EUR">يورو أوروبي (€)</option>
                <option value="ILS">شيكل إسرائيلي (₪)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-[var(--text-muted)] block mb-1">إلى</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-2 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs font-bold text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
              >
                <option value="ILS">شيكل إسرائيلي (₪)</option>
                <option value="JOD">دينار أردني (JOD)</option>
                <option value="USD">دولار أمريكي ($)</option>
                <option value="EUR">يورو أوروبي (€)</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <span>{amount} {fromCurrency}</span>
              <ArrowRightLeft className="w-3.5 h-3.5 text-[var(--primary)]" />
              <span className="font-bold text-[var(--text)]">{toCurrency}</span>
            </div>
            <div className="text-xl font-black text-emerald-500">
              {calculateConversion()} {toCurrency}
            </div>
          </div>
        </div>

        {/* حاسبة أسعار الذهب الفوري بالغرام */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-[var(--text-muted)] block">
            أسعار غرام الذهب الفوري اليوم (خام عالمي)
          </label>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
              <span className="block text-[11px] font-bold text-[var(--text-muted)]">عيار 24 (الخام)</span>
              <span className="block text-base font-black text-[var(--text)] mt-1">
                ${goldGram24.toFixed(1)}
              </span>
              <span className="block text-[10px] text-emerald-500 font-semibold mt-0.5">
                {(goldGram24 * usdIls).toFixed(1)} ₪
              </span>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <span className="block text-[11px] font-bold text-amber-500">عيار 21 (الأكثر طلباً)</span>
              <span className="block text-base font-black text-amber-500 mt-1">
                ${goldGram21.toFixed(1)}
              </span>
              <span className="block text-[10px] text-amber-400 font-semibold mt-0.5">
                {(goldGram21 * usdIls).toFixed(1)} ₪
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
              <span className="block text-[11px] font-bold text-[var(--text-muted)]">عيار 18</span>
              <span className="block text-base font-black text-[var(--text)] mt-1">
                ${goldGram18.toFixed(1)}
              </span>
              <span className="block text-[10px] text-emerald-500 font-semibold mt-0.5">
                {(goldGram18 * usdIls).toFixed(1)} ₪
              </span>
            </div>
          </div>

          <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
            * الأسعار مبنية على سعر الأونصة العالمية (${goldOunce.toFixed(0)}) ولا تشمل عمولة المصنعية أو ضريبة القيمة المضافة لدى محلات الصاغة.
          </p>
        </div>
      </div>
    </div>
  );
}
