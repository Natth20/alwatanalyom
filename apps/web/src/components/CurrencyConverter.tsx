"use client";

import { useState, useEffect } from "react";
import type { InstrumentQuote } from "@awt/shared";
import { ArrowLeftRight, RefreshCw } from "lucide-react";

interface Props {
  quotes: InstrumentQuote[];
}

const CURRENCY_LABELS: Record<string, string> = {
  USD: "دولار أمريكي (USD)",
  ILS: "شيكل (ILS)",
  JOD: "دينار أردني (JOD)",
  EUR: "يورو أوروبي (EUR)",
  GBP: "جنيه إسترليني (GBP)",
  SAR: "ريال سعودي (SAR)",
  EGP: "جنيه مصري (EGP)",
  AED: "درهم إماراتي (AED)",
  KWD: "دينار كويتي (KWD)",
};

export function CurrencyConverter({ quotes: initialQuotes }: Props) {
  const [quotes, setQuotes] = useState<InstrumentQuote[]>(initialQuotes || []);
  const [amount, setAmount] = useState<string>("100");
  const [fromCurr, setFromCurr] = useState<string>("USD");
  const [toCurr, setToCurr] = useState<string>("ILS");

  useEffect(() => {
    const hasFx = quotes.some((q) => q.symbol === "USDILS" && q.price);
    if (hasFx) return;

    fetch("/api/v1/quotes")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.quotes)) {
          setQuotes(data.quotes);
        }
      })
      .catch(() => {});
  }, [quotes]);

  // Build USD-per-unit table strictly from real live quotes
  const findRate = (sym: string): number | null => {
    const val = quotes.find((q) => q.symbol === sym)?.price;
    return val ? parseFloat(val) : null;
  };

  const unitsPerUsd: Record<string, number> = { USD: 1 };
  const ils = findRate("USDILS");
  const jod = findRate("USDJOD");
  const eurUsd = findRate("EURUSD");
  const gbpUsd = findRate("GBPUSD");
  const sar = findRate("USDSAR");
  const egp = findRate("USDEGP");
  const aed = findRate("USDAED");
  const kwd = findRate("USDKWD");

  if (ils) unitsPerUsd["ILS"] = ils;
  if (jod) unitsPerUsd["JOD"] = jod;
  if (eurUsd) unitsPerUsd["EUR"] = 1 / eurUsd;
  if (gbpUsd) unitsPerUsd["GBP"] = 1 / gbpUsd;
  if (sar) unitsPerUsd["SAR"] = sar;
  if (egp) unitsPerUsd["EGP"] = egp;
  if (aed) unitsPerUsd["AED"] = aed;
  if (kwd) unitsPerUsd["KWD"] = kwd;

  const availableCodes = Object.keys(CURRENCY_LABELS).filter((c) => unitsPerUsd[c]);
  const amtNum = Math.max(0, parseFloat(amount) || 0);
  const fromUnit = unitsPerUsd[fromCurr];
  const toUnit = unitsPerUsd[toCurr];
  const converted =
    fromUnit && toUnit ? (amtNum / fromUnit) * toUnit : null;

  return (
    <div className="rounded-3xl border border-emerald-500/30 bg-[var(--surface)] p-6 shadow-md space-y-5">
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
            <ArrowLeftRight className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base text-[var(--text)]">محوّل العملات بالأسعار الحية</h3>
            <span className="text-[10px] text-[var(--text-muted)]">
              أسعار فورية مباشرة بدون هوامش صرافة وهمية
            </span>
          </div>
        </div>
      </div>

      {availableCodes.length < 2 ? (
        <div className="py-6 flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>جاري استيراد أسعار الصرف المباشرة...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-4 space-y-1.5">
              <label className="text-xs font-bold text-[var(--text-muted)] block">المبلغ</label>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm font-mono font-bold text-[var(--text)]"
              />
            </div>

            <div className="sm:col-span-3 space-y-1.5">
              <label className="text-xs font-bold text-[var(--text-muted)] block">من</label>
              <select
                value={fromCurr}
                onChange={(e) => setFromCurr(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs font-bold text-[var(--text)]"
              >
                {availableCodes.map((c) => (
                  <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setFromCurr(toCurr);
                  setToCurr(fromCurr);
                }}
                className="w-10 h-10 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-500 flex items-center justify-center cursor-pointer"
                aria-label="تبديل العملتين"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            <div className="sm:col-span-3 space-y-1.5">
              <label className="text-xs font-bold text-[var(--text-muted)] block">إلى</label>
              <select
                value={toCurr}
                onChange={(e) => setToCurr(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs font-bold text-[var(--text)]"
              >
                {availableCodes.map((c) => (
                  <option key={c} value={c}>{CURRENCY_LABELS[c]}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--bg)] border border-[var(--border)] p-4 flex items-center justify-between">
            <span className="text-xs text-[var(--text-muted)]">النتيجة الفورية:</span>
            <strong className="font-mono text-2xl font-black text-emerald-500">
              {converted !== null ? `${converted.toLocaleString("en-US", { maximumFractionDigits: 2 })} ${toCurr}` : "—"}
            </strong>
          </div>
        </>
      )}
    </div>
  );
}
