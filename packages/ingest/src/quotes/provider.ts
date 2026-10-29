import { DataStatus } from "@awt/shared";

export interface RawQuote {
  symbol: string;
  price: string | null; // نص عشري لتجنب أخطاء الفاصلة العائمة
  change?: string | null;
  changePct?: string | null;
  status: DataStatus;
  asOf: Date | null;
}

export interface QuoteProvider {
  key: string;
  termsUrl: string;
  maxSymbolsPerCall: number;
  fetchQuotes(symbols: string[]): Promise<RawQuote[]>;
  fetchHistory?(symbol: string, range: "1d" | "1w" | "1m" | "1y"): Promise<{ t: Date; c: string }[]>;
  health(): Promise<{ ok: boolean; latencyMs: number }>;
}

/**
 * مزود تجريبي يحاكي بيانات الأسواق بدقة لأغراض التطوير والاختبار المحلي
 */
export class MockQuoteProvider implements QuoteProvider {
  key = "mock-provider";
  termsUrl = "https://alwatantoday.net/sources-policy";
  maxSymbolsPerCall = 50;

  private basePrices: Record<string, number> = {
    BRENT: 74.5,
    XAUUSD: 2735.2,
    USDILS: 3.74,
    EURUSD: 1.082,
    BTCUSD: 68500.0,
  };

  async fetchQuotes(symbols: string[]): Promise<RawQuote[]> {
    const now = new Date();

    return symbols.map((sym) => {
      const base = this.basePrices[sym];
      if (base === undefined) {
        return {
          symbol: sym,
          price: null,
          status: "UNAVAILABLE",
          asOf: null,
        };
      }

      // إضافة تذبذب طفيف واقعي بنسبة ±0.2%
      const jitter = (Math.random() - 0.48) * 0.004;
      const currentPrice = base * (1 + jitter);
      const change = currentPrice - base;
      const changePct = (change / base) * 100;

      return {
        symbol: sym,
        price: currentPrice >= 100 ? currentPrice.toFixed(2) : currentPrice.toFixed(4),
        change: change.toFixed(4),
        changePct: changePct.toFixed(2),
        status: "LIVE",
        asOf: now,
      };
    });
  }

  async health(): Promise<{ ok: boolean; latencyMs: number }> {
    return { ok: true, latencyMs: 5 };
  }
}
