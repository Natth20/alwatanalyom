import { getLatestQuotes } from "@/lib/dal";
import { QuoteTile } from "@/components/QuoteTile";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { GoldCalculator } from "@/components/GoldCalculator";

export const revalidate = 30; // ISR 30 ثانية

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
      {/* الترويسة والتنبيه القانوني */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 rounded-full bg-[var(--primary)]"></span>
          <h1 className="text-3xl font-black text-[var(--text)]">الوطن الاقتصادي</h1>
          <span className="text-xs bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-0.5 rounded font-bold">
            بيانات معتمدة
          </span>
        </div>
        <p className="text-sm text-[var(--text-muted)] max-w-2xl">
          مركز متابعة الأسواق العالمية، أسعار النفط، الذهب، العملات، والصرف في فلسطين والمنطقة بمصادرها الرسمية وتحديثاتها اللحظية.
        </p>

        {/* تنبيه الأمانة المالية الإلزامي */}
        <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400">
          ⚠️ <strong>تنويه:</strong> كافة الأسعار والمؤشرات المعروضة هي لأغراض إخبارية وإعلامية فقط، ولا تشكّل بأي حال من الأحوال نصيحة مالية أو توصية استثمارية.
        </div>
      </div>

      {/* حاسبة أسعار الصرف والعملات */}
      <CurrencyConverter quotes={quotes} />

      {/* حاسبة أسعار الذهب الفورية بالأعيرة */}
      <GoldCalculator initialOuncePrice={ouncePrice} usdToIlsRate={ilsRate} />

      {/* أقسام المؤشرات */}
      <div className="space-y-8">
        {/* الطاقة والمعادن */}
        <div>
          <h2 className="text-lg font-bold text-[var(--text)] mb-3 pb-2 border-b border-[var(--border)]">
            النفط والطاقة والمعادن الثمينة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...energy, ...metals].map((quote) => (
              <QuoteTile key={quote.symbol} quote={quote} />
            ))}
          </div>
        </div>

        {/* العملات والصرف */}
        <div>
          <h2 className="text-lg font-bold text-[var(--text)] mb-3 pb-2 border-b border-[var(--border)]">
            العملات وأسعار الصرف (فلسطين والعالم)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fx.map((quote) => (
              <QuoteTile key={quote.symbol} quote={quote} />
            ))}
          </div>
        </div>

        {/* الأصول الرقمية */}
        {crypto.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-[var(--text)] mb-3 pb-2 border-b border-[var(--border)]">
              العملات الرقمية الكبرى
            </h2>
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

