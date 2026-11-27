import Link from "next/link";
import { Metadata } from "next";
import { getLatestQuotes, getSectionFeed } from "@/lib/dal";
import { derivePalestineGoldTable } from "@/lib/live-data/markets";
import { QuoteTile } from "@/components/QuoteTile";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { GoldCalculator } from "@/components/GoldCalculator";
import { ArticleCard } from "@/components/ArticleCard";
import { EconomicCalendarWidget } from "@/components/EconomicCalendarWidget";
import { Coins, Zap, Globe, TrendingUp, BarChart3, ShieldCheck, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الوطن الاقتصادي — أسعار الذهب، العملات، النفط والأسواق الحية",
  description: "تغطية شاملة لأسعار الذهب بالشيكل والدينار والدولار، أسعار صرف العملات، برنت والعملات الرقمية، وتحليلات الأسواق العربية والعالمية.",
  alternates: { canonical: "/economy" },
};

export default async function EconomyPage() {
  const [quotes, economyFeed] = await Promise.all([
    getLatestQuotes(),
    getSectionFeed("economy"),
  ]);

  const economyArticles = economyFeed?.articles || [];
  const energy = quotes.filter((q) => q.category === "energy");
  const metals = quotes.filter((q) => q.category === "metals");
  const indices = quotes.filter((q) => q.category === "index");
  const fx = quotes.filter((q) => q.category === "fx");
  const crypto = quotes.filter((q) => q.category === "crypto");

  const goldQuote = quotes.find((q) => q.symbol === "XAUUSD");
  const ilsQuote = quotes.find((q) => q.symbol === "USDILS");
  const jodQuote = quotes.find((q) => q.symbol === "USDJOD");

  const ouncePrice = goldQuote?.price ? parseFloat(goldQuote.price) : null;
  const ilsRate = ilsQuote?.price ? parseFloat(ilsQuote.price) : null;
  const jodRate = jodQuote?.price ? parseFloat(jodQuote.price) : null;

  const goldKarats = derivePalestineGoldTable(ouncePrice, ilsRate, jodRate);

  return (
    <div className="container-custom py-10 space-y-12">
      {/* 1. الترويسة المالية الفاخرة */}
      <header className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-br from-[#1C1202] via-[#26060F] to-[#0D0104] text-white p-7 md:p-10 shadow-2xl">
        <div className="absolute -top-24 end-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-black">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>بث الأسواق العالمية الحية (COMEX / Yahoo / Open ER-API / CoinGecko)</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              مركز المال والأعمال <span className="text-[var(--gold)]">والأسواق</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              بيانات سوقية فورية بدون أرقام تقديرية: أسعار أونصة الذهب، اشتقاق الغرام في السوق الفلسطيني بالشيكل والدينار والدولار، أسعار صرف العملات، الطاقة، والعملات الرقمية.
            </p>
          </div>

          {goldKarats.length > 0 && (
            <div className="grid grid-cols-2 gap-3 shrink-0 lg:w-80">
              {goldKarats.slice(0, 4).map((row) => (
                <div
                  key={row.karatNumber}
                  className="rounded-2xl border border-amber-500/25 bg-black/45 p-3.5 space-y-1 backdrop-blur-md"
                >
                  <span className="text-[11px] font-bold text-amber-300 block">
                    ذهب عيار {row.karatNumber}
                  </span>
                  <strong className="font-mono text-lg font-black text-white block">
                    {row.ilsPerGram.toFixed(2)} ₪
                  </strong>
                  <span className="text-[10px] font-mono text-stone-400 block">
                    {row.jodPerGram.toFixed(2)} د.أ | ${row.usdPerGram.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* 2. المعادن والطاقة والمؤشرات العالمية */}
      <section className="space-y-5">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <h2 className="text-xl font-black text-[var(--text)] flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <span>المعادن الثمينة، الطاقة والمؤشرات</span>
          </h2>
          <span className="text-xs text-[var(--text-muted)]">انقر على أي مؤشر لعرض الرسم البياني</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...metals, ...energy, ...indices].map((quote) => (
            <QuoteTile key={quote.symbol} quote={quote} />
          ))}
        </div>
      </section>

      {/* 3. الحاسبات التفاعلية المباشرة (الذهب + تحويل العملات) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6">
          <GoldCalculator
            initialOuncePrice={ouncePrice}
            usdToIlsRate={ilsRate}
            usdToJodRate={jodRate}
          />
        </div>
        <div className="lg:col-span-6">
          <CurrencyConverter quotes={quotes} />
        </div>
      </section>

      {/* 4. العملات الصعبة والرقمية + جلسات البورصة */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          {/* أسعار الصرف */}
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <h2 className="text-lg font-black text-[var(--text)] flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-500" />
                <span>جدول أسعار صرف العملات العالمية والعربية المباشر</span>
              </h2>
              <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Open ER-API</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {fx.map((item) => (
                <Link
                  key={item.symbol}
                  href={`/economy/instrument/${item.symbol}`}
                  className="p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-emerald-500/40 transition-all space-y-1"
                >
                  <span className="text-xs font-bold text-[var(--text-muted)] block truncate">
                    {item.nameAr}
                  </span>
                  <strong className="font-mono text-base font-black text-emerald-600 dark:text-emerald-400 block">
                    {item.price || "—"} {item.unit || ""}
                  </strong>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] block">{item.symbol}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* العملات الرقمية */}
          {crypto.length > 0 && (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-black text-[var(--text)] flex items-center gap-2 border-b border-[var(--border)] pb-3">
                <BarChart3 className="w-5 h-5 text-indigo-500" />
                <span>العملات الرقمية الرئيسية (CoinGecko Live)</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {crypto.map((c) => {
                  const isUp = c.changePct?.startsWith("+");
                  return (
                    <Link
                      key={c.symbol}
                      href={`/economy/instrument/${c.symbol}`}
                      className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-indigo-500/40 flex items-center justify-between transition-all"
                    >
                      <div>
                        <span className="font-black text-sm text-[var(--text)] block">{c.nameAr}</span>
                        <span className="text-[11px] font-mono text-[var(--text-muted)]">{c.symbol}</span>
                      </div>
                      <div className="text-end font-mono">
                        <strong className="text-lg font-black text-[var(--text)] block">
                          ${c.price ? Number(c.price).toLocaleString("en-US") : "—"}
                        </strong>
                        {c.changePct && (
                          <span
                            className={`inline-flex items-center gap-0.5 text-xs font-bold ${
                              isUp ? "text-emerald-500" : "text-rose-500"
                            }`}
                          >
                            {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                            {c.changePct}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <EconomicCalendarWidget />
        </aside>
      </section>

      {/* 5. أحدث تقارير المال والأعمال */}
      {economyArticles.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <h2 className="text-2xl font-black text-[var(--text)] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--primary)]" />
              <span>تقارير وأخبار المال والأعمال</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {economyArticles.map((art) => (
              <ArticleCard key={art.id} article={art} variant="medium" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
