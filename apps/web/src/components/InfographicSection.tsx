"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BarChart2, TrendingUp, ShieldCheck, Activity, Coins } from "lucide-react";

interface LiveMetricTile {
  id: string;
  label: string;
  value: string;
  subValue: string;
  sourceText: string;
  accentColor: string;
}

export function InfographicSection() {
  const [tiles, setTiles] = useState<LiveMetricTile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("/api/v1/pulse").then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch("/api/v1/quotes").then((r) => (r.ok ? r.json() : null)).catch(() => null),
    ])
      .then(([pulse, market]) => {
        if (!active) return;
        const list: LiveMetricTile[] = [];

        if (pulse) {
          list.push({
            id: "articles",
            label: "الأرشيف الإخباري الموثق",
            value: (pulse.totalPublishedArticles ?? 0).toLocaleString("ar-EG"),
            subValue: `${(pulse.last24hArticles ?? 0).toLocaleString("ar-EG")} مادة نُشرت خلال آخر 24 ساعة`,
            sourceText: "سجل قاعدة البيانات الحية — الوطن اليوم",
            accentColor: "from-emerald-500 to-teal-700",
          });
          list.push({
            id: "sources",
            label: "الوكالات والمصادر المفعّلة",
            value: (pulse.activeSourcesCount ?? 0).toLocaleString("ar-EG"),
            subValue: "مصادر إخبارية ووكالات معتمدة متصل بها لحظياً",
            sourceText: "نظام الالتقاط والتوثيق (RSS / API)",
            accentColor: "from-blue-500 to-indigo-700",
          });
        }

        const goldQ = Array.isArray(market?.quotes)
          ? market.quotes.find((q: any) => q.symbol === "XAUUSD")
          : null;
        if (goldQ?.price) {
          list.push({
            id: "gold",
            label: "أونصة الذهب العالمية",
            value: `$${Number(goldQ.price).toLocaleString("en-US", { maximumFractionDigits: 2 })}`,
            subValue: goldQ.changePct ? `التغير اليومي: ${goldQ.changePct}` : "تحديث سوقي مباشر",
            sourceText: goldQ.provider || "Yahoo Finance Live",
            accentColor: "from-amber-500 to-orange-700",
          });
        }

        const fxQ = Array.isArray(market?.quotes)
          ? market.quotes.find((q: any) => q.symbol === "USDILS")
          : null;
        if (fxQ?.price) {
          list.push({
            id: "usdils",
            label: "صرف الدولار مقابل الشيكل",
            value: `${Number(fxQ.price).toFixed(4)} ₪`,
            subValue: "سعر الصرف الفوري المرجعي في السوق المحلي",
            sourceText: fxQ.provider || "Open Exchange Rates",
            accentColor: "from-rose-500 to-pink-700",
          });
        }

        setTiles(list);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (!loading && tiles.length === 0) return null;

  return (
    <section className="card-luxury rounded-3xl p-6 md:p-8 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shadow-md">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black text-[var(--text)]">
                بيانات الوطن · المؤشرات الحية من المصدر
              </h2>
              <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full">
                أرقام حقيقية 100%
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              إحصاءات فورية محسوبة مباشرة من قاعدة بيانات المنصة وأسواق المال العالمية بدون أي تقديرات
            </p>
          </div>
        </div>

        <Link
          href="/pulse"
          className="text-xs font-bold text-[var(--primary)] hover:underline flex items-center gap-1"
        >
          <span>فتح مرصد البيانات الكامل</span>
          <span>←</span>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-36 rounded-2xl bg-[var(--bg)] border border-[var(--border)] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {tiles.map((stat) => (
            <div
              key={stat.id}
              className="group relative rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5 hover:border-[var(--primary)]/50 hover:shadow-md transition-all duration-300 space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[var(--text-muted)] line-clamp-1">
                  {stat.label}
                </span>
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${stat.accentColor} text-white flex items-center justify-center shrink-0`}>
                  {stat.id === "gold" || stat.id === "usdils" ? (
                    <Coins className="w-3.5 h-3.5" />
                  ) : (
                    <Activity className="w-3.5 h-3.5" />
                  )}
                </div>
              </div>

              <div className="text-2xl md:text-3xl font-black font-mono text-[var(--text)]">
                {stat.value}
              </div>

              <p className="text-[11px] text-[var(--text-muted)] leading-snug">
                {stat.subValue}
              </p>

              <div className="pt-2 border-t border-[var(--border)]/60 flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                <ShieldCheck className="w-3 h-3 shrink-0" />
                <span className="truncate">{stat.sourceText}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
