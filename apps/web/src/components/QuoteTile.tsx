import Link from "next/link";
import { InstrumentQuote } from "@awt/shared";

export function QuoteTile({ quote }: { quote: InstrumentQuote }) {
  const isUp = quote.change && parseFloat(quote.change) > 0;
  const isDown = quote.change && parseFloat(quote.change) < 0;

  const statusLabels: Record<string, { label: string; class: string }> = {
    LIVE: { label: "مباشر", class: "bg-emerald-500/10 text-emerald-600" },
    DELAYED: { label: "متأخر 15 د", class: "bg-amber-500/10 text-amber-600" },
    CLOSE: { label: "آخر إغلاق", class: "bg-slate-500/10 text-slate-600" },
    UNAVAILABLE: { label: "غير متاح مؤقتاً", class: "bg-rose-500/10 text-rose-600" },
  };

  const statusInfo = statusLabels[quote.status] || statusLabels["UNAVAILABLE"];

  return (
    <Link
      href={`/economy/instrument/${quote.symbol}`}
      className="card-luxury block p-3.5 rounded-2xl transition-all group"
    >
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">{quote.nameAr}</span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusInfo?.class}`}>
          {statusInfo?.label}
        </span>
      </div>

      <div className="flex items-baseline justify-between mt-2">
        <div className="text-lg font-black tracking-tight text-[var(--text)] font-mono">
          {quote.price !== null ? (
            <span>
              {quote.price}{" "}
              <span className="text-[10px] font-sans font-medium text-[var(--text-muted)]">
                {quote.currency || ""}
              </span>
            </span>
          ) : (
            <span className="text-xs text-[var(--text-muted)]">بانتظار البيانات</span>
          )}
        </div>

        {quote.changePct && quote.price !== null && (
          <div
            className={`text-xs font-mono font-bold flex items-center gap-0.5 px-1.5 py-0.5 rounded ${
              isUp
                ? "text-emerald-500 bg-emerald-500/10"
                : isDown
                ? "text-rose-500 bg-rose-500/10"
                : "text-[var(--text-muted)]"
            }`}
          >
            <span>{isUp ? "▲ +" : isDown ? "▼ " : ""}</span>
            <span>{quote.changePct}%</span>
          </div>
        )}
      </div>

      <div className="text-[10px] text-[var(--text-muted)] mt-1.5 flex justify-between font-mono">
        <span className="opacity-70">{quote.symbol}</span>
        <span>{quote.unit ? quote.unit : ""}</span>
      </div>
    </Link>
  );
}

