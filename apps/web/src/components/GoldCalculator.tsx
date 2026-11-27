"use client";

import { useState, useEffect } from "react";
import { Coins, Calculator, ShieldCheck } from "lucide-react";

interface Props {
  initialOuncePrice?: number | null;
  usdToIlsRate?: number | null;
  usdToJodRate?: number | null;
}

export function GoldCalculator({
  initialOuncePrice = null,
  usdToIlsRate = null,
  usdToJodRate = null,
}: Props) {
  const [ouncePrice, setOuncePrice] = useState<number | null>(initialOuncePrice);
  const [ilsRate, setIlsRate] = useState<number | null>(usdToIlsRate);
  const [jodRate, setJodRate] = useState<number>(usdToJodRate || 0.709);
  const [grams, setGrams] = useState<string>("10");
  const [karat, setKarat] = useState<number>(21);
  const [currency, setCurrency] = useState<"ILS" | "JOD" | "USD">("ILS");

  useEffect(() => {
    if (ouncePrice && ilsRate) return;
    fetch("/api/v1/quotes")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        const list = Array.isArray(data?.quotes) ? data.quotes : [];
        const xau = list.find((q: any) => q.symbol === "XAUUSD")?.price;
        const ils = list.find((q: any) => q.symbol === "USDILS")?.price;
        const jod = list.find((q: any) => q.symbol === "USDJOD")?.price;
        if (xau) setOuncePrice(parseFloat(xau));
        if (ils) setIlsRate(parseFloat(ils));
        if (jod) setJodRate(parseFloat(jod));
      })
      .catch(() => {});
  }, [ouncePrice, ilsRate]);

  const gramsNum = Math.max(0, parseFloat(grams) || 0);
  const gram24Usd = ouncePrice ? ouncePrice / 31.1034768 : null;
  const karatFactor = karat / 24;
  const pricePerGramUsd = gram24Usd ? gram24Usd * karatFactor : null;

  let convertedPerGram: number | null = null;
  if (pricePerGramUsd) {
    if (currency === "USD") convertedPerGram = pricePerGramUsd;
    else if (currency === "JOD") convertedPerGram = pricePerGramUsd * jodRate;
    else if (currency === "ILS" && ilsRate) convertedPerGram = pricePerGramUsd * ilsRate;
  }

  const totalPrice = convertedPerGram !== null ? convertedPerGram * gramsNum : null;
  const unitLabel = currency === "ILS" ? "شيكل" : currency === "JOD" ? "دينار أردني" : "دولار";

  return (
    <div className="rounded-3xl border border-amber-500/30 bg-[var(--surface)] p-6 shadow-md space-y-5">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base text-[var(--text)]">حاسبة الذهب بالأسعار الحية</h3>
            <span className="text-[10px] text-[var(--text-muted)]">
              مربوطة مباشرة بأونصة البورصة العالمية وسعر الصرف
            </span>
          </div>
        </div>
        {ouncePrice && (
          <span className="text-xs font-mono font-black text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-lg">
            ${ouncePrice.toLocaleString("en-US", { maximumFractionDigits: 2 })} / أونصة
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--text-muted)] block">الوزن (غرام)</label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={grams}
            onChange={(e) => setGrams(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm font-mono font-bold text-[var(--text)]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--text-muted)] block">العيار</label>
          <select
            value={karat}
            onChange={(e) => setKarat(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm font-bold text-[var(--text)]"
          >
            <option value={24}>عيار 24 (الخالص)</option>
            <option value={22}>عيار 22 (الرشادي)</option>
            <option value={21}>عيار 21 (السوق المحلي)</option>
            <option value={18}>عيار 18</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--text-muted)] block">العملة</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as any)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm font-bold text-[var(--text)]"
          >
            <option value="ILS">شيكل إسرائيلي (ILS)</option>
            <option value="JOD">دينار أردني (JOD)</option>
            <option value="USD">دولار أمريكي (USD)</option>
          </select>
        </div>
      </div>

      <div className="rounded-2xl bg-[var(--bg)] border border-[var(--border)] p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Calculator className="w-4 h-4 text-amber-500" />
          <span>سعر الغرام الحي لعيار {karat}:</span>
          <strong className="font-mono text-[var(--text)]">
            {convertedPerGram !== null ? `${convertedPerGram.toFixed(2)} ${unitLabel}` : "جاري التحميل..."}
          </strong>
        </div>

        <div className="text-end">
          <span className="text-[10px] text-[var(--text-muted)] block">الإجمالي التقديري</span>
          <strong className="font-mono text-xl font-black text-amber-500">
            {totalPrice !== null ? `${totalPrice.toLocaleString("en-US", { maximumFractionDigits: 2 })} ${unitLabel}` : "—"}
          </strong>
        </div>
      </div>

      <p className="text-[11px] text-[var(--text-muted)] flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        <span>القيم أعلاه للسعر الصافي دون احتساب أجرة المصنعية والضرائب المحلية.</span>
      </p>
    </div>
  );
}
