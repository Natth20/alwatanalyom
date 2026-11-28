"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { InstrumentQuote } from "@awt/shared";
import { Coins, RefreshCw, ShieldCheck, ArrowUpRight, ArrowDownRight, ChevronLeft } from "lucide-react";

interface GoldKaratRow {
  karat: string;
  karatNumber: number;
  purityPct: string;
  usdPerGram: number;
  ilsPerGram: number;
  jodPerGram: number;
}

export function PalestineCommoditiesWidget() {
  const [quotes, setQuotes] = useState<InstrumentQuote[]>([]);
  const [goldKarats, setGoldKarats] = useState<GoldKaratRow[]>([]);
  const [asOf, setAsOf] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"gold" | "fx" | "commodities">("gold");
  const [gramWeight, setGramWeight] = useState<number>(1);

  const loadData = () => {
    setLoading(true);
    fetch("/api/v1/quotes")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.quotes)) setQuotes(data.quotes);
        if (Array.isArray(data?.goldKarats)) setGoldKarats(data.goldKarats);
        if (data?.asOf) setAsOf(data.asOf);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 120000);
    return () => clearInterval(timer);
  }, []);

  const fxQuotes = quotes.filter((q) => q.category === "fx");
  const marketQuotes = quotes.filter((q) => q.category === "metals" || q.category === "energy" || q.category === "crypto" || q.category === "index");

  const ouncePrice = quotes.find((q) => q.symbol === "XAUUSD")?.price;

  return (
    <section className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#1B1103]/90 via-[#120408] to-[#0B0104] text-white p-6 md:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-[var(--gold)]" />
            <h2 className="text-xl md:text-2xl font-black text-white">
              مرصد أسعار الذهب والعملات في السوق الفلسطيني
            </h2>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              محسوب لحظياً من البورصة العالمية
            </span>
          </div>
          <p className="text-xs text-stone-300">
            أسعار غرامات الذهب وصرف العملات الرئيسية مشتقة لحظياً من سعر الأونصة العالمي (COMEX) وأسعار الصرف الرسمية
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={loadData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold cursor-pointer transition-colors"
            title="تحديث الأسعار الآن"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[var(--gold)] ${loading ? "animate-spin" : ""}`} />
            <span>تحديث</span>
          </button>
          <Link
            href="/economy"
            className="inline-flex items-center gap-1 px-4 py-1.5 rounded-xl bg-[var(--gold)] text-[#140106] text-xs font-black hover:brightness-110 transition-all"
          >
            <span>قسم الاقتصاد الكامل</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* التبويبات */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: "gold", label: "الذهب بالشيكل والدينار والدولار" },
          { id: "fx", label: "أسعار الصرف والعملات الحية" },
          { id: "commodities", label: "المعادن، النفط والمؤشرات العالمية" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[var(--gold)] text-[#140106] shadow-md"
                : "bg-white/[0.06] text-stone-300 hover:bg-white/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading && quotes.length === 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : activeTab === "gold" ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-black/35 border border-amber-500/20 rounded-2xl px-4 py-2.5 text-xs">
            <span className="text-amber-200 font-bold">مضاعف الوزن الفوري (لحساب الصاغة والشبكة):</span>
            <div className="flex items-center gap-1.5 font-mono">
              {[1, 5, 10, 20, 50].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setGramWeight(w)}
                  className={`px-2.5 py-1 rounded-lg font-black transition-all cursor-pointer ${
                    gramWeight === w
                      ? "bg-[var(--gold)] text-[#140106] shadow-sm"
                      : "bg-white/10 text-stone-200 hover:bg-white/20"
                  }`}
                >
                  {w} غ
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {goldKarats.map((row) => (
              <div
                key={row.karatNumber}
                className="rounded-2xl border border-amber-500/25 bg-white/[0.04] hover:border-[var(--gold)]/55 transition-colors p-4 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[var(--gold)]">{row.karat}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-stone-300">
                    نقاء {row.purityPct}
                  </span>
                </div>
                <div className="text-2xl font-black font-mono text-white">
                  {(row.ilsPerGram * gramWeight).toFixed(2)}{" "}
                  <span className="text-sm text-amber-300">₪ / {gramWeight}غ</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-300 pt-1.5 border-t border-white/10 font-mono">
                  <span>{(row.jodPerGram * gramWeight).toFixed(2)} د.أ</span>
                  <span>${(row.usdPerGram * gramWeight).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
          {ouncePrice && (
            <p className="text-[11px] text-stone-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                سعر الأونصة العالمي المعتمد حالياً في المعادلة: ${Number(ouncePrice).toLocaleString("en-US", { maximumFractionDigits: 2 })} (تضاف مصنعية الصائغ في السوق المحلي).
              </span>
            </p>
          )}
        </div>
      ) : activeTab === "fx" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {fxQuotes.map((q) => (
            <Link
              key={q.symbol}
              href={`/economy/instrument/${q.symbol}`}
              className="rounded-2xl border border-white/10 hover:border-emerald-500/40 bg-white/[0.04] p-4 space-y-1.5 transition-all"
            >
              <span className="text-[11px] font-bold text-stone-300 block">{q.nameAr}</span>
              <strong className="font-mono text-lg font-black text-emerald-400 block">
                {q.price || "—"} {q.unit || ""}
              </strong>
              <span className="text-[9px] text-stone-500 block font-mono">{q.symbol}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {marketQuotes.map((q) => {
            const isUp = q.changePct?.startsWith("+");
            const isDown = q.changePct?.startsWith("-");
            return (
              <Link
                key={q.symbol}
                href={`/economy/instrument/${q.symbol}`}
                className="rounded-2xl border border-white/10 hover:border-[var(--gold)]/50 bg-white/[0.04] p-4 flex items-center justify-between transition-all"
              >
                <div className="space-y-1">
                  <span className="text-xs font-black text-white block">{q.nameAr}</span>
                  <span className="text-[10px] text-stone-400 block">{q.provider}</span>
                </div>
                <div className="text-end space-y-1">
                  <strong className="font-mono text-lg font-black text-[var(--gold)] block">
                    {q.price ? `$${Number(q.price).toLocaleString("en-US")}` : "—"}
                  </strong>
                  {q.changePct && (
                    <span
                      className={`inline-flex items-center gap-0.5 text-[11px] font-mono font-bold ${
                        isUp ? "text-emerald-400" : isDown ? "text-rose-400" : "text-stone-300"
                      }`}
                    >
                      {isUp ? <ArrowUpRight className="w-3 h-3" /> : isDown ? <ArrowDownRight className="w-3 h-3" /> : null}
                      {q.changePct}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {asOf && (
        <div className="text-[10px] text-stone-400 flex items-center justify-between pt-2 border-t border-white/10">
          <span>المصدر: Yahoo Finance / Open Exchange Rates / CoinGecko</span>
          <span className="font-mono">
            آخر تحديث: {new Date(asOf).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      )}
    </section>
  );
}
