import { getLatestQuotes } from "@/lib/dal";
import { QuoteTile } from "@/components/QuoteTile";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { GoldCalculator } from "@/components/GoldCalculator";
import { PalestineCommoditiesWidget } from "@/components/PalestineCommoditiesWidget";
import { TrendingUp, Coins, Fuel, Banknote, ShieldAlert } from "lucide-react";
import { Metadata } from "next";

export const revalidate = 30; // ISR 30 ثانية

export const metadata: Metadata = {
  title: "الوطن الاقتصادي — أسعار الصرف، الذهب، والأسواق الحية في فلسطين",
  description: "مركز المال والأعمال: أسعار الذهب بالأعيرة، العملات والصرف، أسعار المحروقات، والنفط والسلع بمصادرها الرسمية الموثقة.",
};

export default async function EconomyPage() {
  const quotes = await getLatestQuotes();

  const energy = quotes.filter((q) => q.category === "energy");
  const metals = quotes.filter((q) => q.category === "metals");
  const fx = quotes.filter((q) => q.category === "fx");
  const crypto = quotes.filter((q) => q.category === "crypto");

  const goldQuote = quotes.find((q) => q.symbol === "XAUUSD");
  const ilsQuote = quotes.find((q) => q.symbol === "USDILS");
  const ouncePrice = goldQuote?.price ? parseFloat(goldQuote.price) : 2735.4;
  const ilsRate = ilsQuote?.price ? parseFloat(ilsQuote.price) : 3.75;

  return (
    <div className="container-custom py-8 space-y-10">
      {/* الترويسة الرئيسية لمركز الوطن الاقتصادي */}
      <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-[var(--surface)] to-[var(--surface)] p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                مؤشرات حية · أسواق فلسطين والعالم
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                تحديث لحظي مستمر
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-[var(--text)] tracking-tight">
              الوطن الاقتصادي · بورصة الأسواق والمال
            </h1>

            <p className="text-xs md:text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed">
              مركز رصد متقدم لأسعار صرف العملات في السوق الفلسطيني (شيكل، دينار، دولار، يورو)، أسعار الذهب بالأعيرة والليرات، المحروقات الرسمية، وأسواق الطاقة والسلع العالمية.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-center shadow-sm">
              <span className="block text-[10px] text-[var(--text-muted)]">أونصة الذهب عالمياً</span>
              <span className="text-lg font-black text-amber-500 font-mono">
                ${ouncePrice.toLocaleString("en-US", { minimumFractionDigits: 1 })}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-center shadow-sm">
              <span className="block text-[10px] text-[var(--text-muted)]">الدولار مقابل الشيكل</span>
              <span className="text-lg font-black text-emerald-500 font-mono">
                {ilsRate.toFixed(2)} ₪
              </span>
            </div>
          </div>
        </div>

        {/* تنبيه الأمانة المالية والشفافية */}
        <div className="mt-4 pt-3 border-t border-[var(--border)]/70 flex items-center gap-2 text-xs text-amber-600 dark:text-amber-400">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>
            كافة البيانات والمؤشرات المعروضة هي لأغراض إخبارية ومعرفية، ولا تشكّل استشارة أو توصية استثمارية مباشرة.
          </span>
        </div>
      </div>

      {/* حاسبة أسعار الصرف والعملات الذكية */}
      <CurrencyConverter quotes={quotes} />

      {/* حاسبة أسعار الذهب الفورية بالأعيرة والليرات المستخدمة في فلسطين */}
      <GoldCalculator initialOuncePrice={ouncePrice} usdToIlsRate={ilsRate} />

      {/* سلة المحروقات والسلع الحيوية بالسوق الفلسطيني */}
      <PalestineCommoditiesWidget />

      {/* أقسام المؤشرات العالمية التفصيلية */}
      <div className="space-y-8">
        {/* الطاقة والمعادن */}
        <div>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]">
            <Fuel className="w-4 h-4 text-[var(--primary)]" />
            <h2 className="text-lg font-bold text-[var(--text)]">
              النفط والطاقة والمعادن الثمينة
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...energy, ...metals].map((quote) => (
              <QuoteTile key={quote.symbol} quote={quote} />
            ))}
          </div>
        </div>

        {/* العملات والصرف */}
        <div>
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]">
            <Banknote className="w-4 h-4 text-[var(--primary)]" />
            <h2 className="text-lg font-bold text-[var(--text)]">
              العملات وأسعار الصرف (فلسطين والعالم)
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fx.map((quote) => (
              <QuoteTile key={quote.symbol} quote={quote} />
            ))}
          </div>
        </div>

        {/* الأصول الرقمية */}
        {crypto.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]">
              <Coins className="w-4 h-4 text-[var(--primary)]" />
              <h2 className="text-lg font-bold text-[var(--text)]">
                العملات الرقمية الكبرى
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {crypto.map((quote) => (
                <QuoteTile key={quote.symbol} quote={quote} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
