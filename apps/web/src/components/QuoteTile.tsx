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
      className="block p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] transition-colors"
    >
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="font-bold text-[var(--text)]">{quote.nameAr}</span>
        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${statusInfo?.class}`}>
          {statusInfo?.label}
        </span>
      </div>

      <div className="flex items-baseline justify-between mt-2">
        <div className="text-lg font-black tracking-tight text-[var(--text)]">
          {quote.price !== null ? (
            <span>
              {quote.price}{" "}
              <span className="text-[10px] font-normal text-[var(--text-muted)]">
                {quote.currency || ""}
              </span>
            </span>
          ) : (
            <span className="text-xs text-[var(--text-muted)]">بانتظار البيانات</span>
          )}
        </div>

        {quote.changePct && quote.price !== null && (
          <div
            className={`text-xs font-bold flex items-center gap-0.5 ${
              isUp ? "text-[var(--up)]" : isDown ? "text-[var(--down)]" : "text-[var(--text-muted)]"
            }`}
          >
            <span>{isUp ? "▲ +" : isDown ? "▼ " : ""}</span>
            <span>{quote.changePct}%</span>
          </div>
        )}
      </div>

      <div className="text-[10px] text-[var(--text-muted)] mt-1 flex justify-between">
        <span>{quote.symbol}</span>
        <span>{quote.unit ? quote.unit : ""}</span>
      </div>
    </Link>
  );
}

