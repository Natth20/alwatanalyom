import { DataStatus } from "@awt/shared";
import { isMockDataAllowed } from "@awt/shared";

export interface RawQuote {
  symbol: string;
  price: string | null;
  change?: string | null;
  changePct?: string | null;
  status: DataStatus;
  asOf: Date | null;
}

export interface QuoteProvider {
  key: string;
  maxSymbolsPerCall: number;
  fetchQuotes(symbols: string[]): Promise<RawQuote[]>;
  fetchHistory?(symbol: string, range: "1d" | "1w" | "1m" | "1y"): Promise<{ t: Date; c: string }[]>;
}

const YAHOO_MAP: Record<string, string> = {
  XAUUSD: "GC=F",
  XAGUSD: "SI=F",
  BRENT: "BZ=F",
  WTI: "CL=F",
  SP500: "^GSPC",
  NASDAQ: "^IXIC",
};

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

/**
 * مزود أسعار الأسواق الحية العامة (Yahoo Finance + Open Exchange Rates + CoinGecko)
 */
export class LivePublicQuoteProvider implements QuoteProvider {
  key = "live-public-market";
  maxSymbolsPerCall = 50;

  async fetchQuotes(symbols: string[]): Promise<RawQuote[]> {
    const now = new Date();
    const results: RawQuote[] = [];

    // 1. Yahoo Finance symbols
    const yahooSyms = symbols.filter((s) => YAHOO_MAP[s]);
    if (yahooSyms.length > 0) {
      const yahooFetched = await Promise.all(
        yahooSyms.map(async (sym): Promise<RawQuote> => {
          try {
            const ySym = YAHOO_MAP[sym]!;
            const res = await fetch(
              `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(ySym)}?interval=1d&range=2d`,
              { headers: { "User-Agent": BROWSER_UA }, signal: AbortSignal.timeout(6000) }
            );
            if (res.ok) {
              const json = await res.json();
              const meta = json?.chart?.result?.[0]?.meta;
              if (meta && typeof meta.regularMarketPrice === "number") {
                const p = Number(meta.regularMarketPrice);
                const prev =
                  typeof meta.chartPreviousClose === "number" && meta.chartPreviousClose > 0
                    ? Number(meta.chartPreviousClose)
                    : p;
                const diff = p - prev;
                const pct = prev > 0 ? (diff / prev) * 100 : 0;
                return {
                  symbol: sym,
                  price: p.toFixed(2),
                  change: `${diff >= 0 ? "+" : ""}${diff.toFixed(2)}`,
                  changePct: `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`,
                  status: meta.marketState === "CLOSED" ? "CLOSE" : "LIVE",
                  asOf: meta.regularMarketTime ? new Date(meta.regularMarketTime * 1000) : now,
                };
              }
            }
          } catch {}
          return { symbol: sym, price: null, status: "UNAVAILABLE", asOf: null };
        })
      );
      results.push(...yahooFetched);
    }

    // 2. Foreign exchange via open.er-api.com
    const fxSyms = symbols.filter((s) =>
      ["USDILS", "USDJOD", "EURUSD", "EURILS", "USDEGP", "USDSAR", "GBPUSD", "JODILS"].includes(s)
    );
    if (fxSyms.length > 0) {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD", {
          headers: { "User-Agent": BROWSER_UA },
          signal: AbortSignal.timeout(6000),
        });
        if (res.ok) {
          const json = await res.json();
          const rates = (json?.rates || {}) as Record<string, number>;
          const fxTime =
            typeof json.time_last_update_unix === "number"
              ? new Date(json.time_last_update_unix * 1000)
              : now;

          for (const sym of fxSyms) {
            let val: number | null = null;
            if (sym === "USDILS" && rates["ILS"]) val = rates["ILS"];
            else if (sym === "USDJOD" && rates["JOD"]) val = rates["JOD"];
            else if (sym === "EURUSD" && rates["EUR"]) val = 1 / rates["EUR"];
            else if (sym === "GBPUSD" && rates["GBP"]) val = 1 / rates["GBP"];
            else if (sym === "EURILS" && rates["EUR"] && rates["ILS"]) val = rates["ILS"] / rates["EUR"];
            else if (sym === "JODILS" && rates["JOD"] && rates["ILS"]) val = rates["ILS"] / rates["JOD"];
            else if (sym === "USDEGP" && rates["EGP"]) val = rates["EGP"];
            else if (sym === "USDSAR" && rates["SAR"]) val = rates["SAR"];

            results.push(
              val && Number.isFinite(val)
                ? {
                    symbol: sym,
                    price: val >= 10 ? val.toFixed(2) : val.toFixed(4),
                    change: null,
                    changePct: null,
                    status: "LIVE",
                    asOf: fxTime,
                  }
                : { symbol: sym, price: null, status: "UNAVAILABLE", asOf: null }
            );
          }
        }
      } catch {}
    }

    // 3. Crypto via CoinGecko
    const cryptoSyms = symbols.filter((s) => s === "BTCUSD" || s === "ETHUSD");
    if (cryptoSyms.length > 0) {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true",
          { headers: { "User-Agent": BROWSER_UA }, signal: AbortSignal.timeout(6000) }
        );
        if (res.ok) {
          const data = await res.json();
          if (cryptoSyms.includes("BTCUSD") && data?.bitcoin?.usd) {
            const pct = Number(data.bitcoin.usd_24h_change || 0);
            results.push({
              symbol: "BTCUSD",
              price: Number(data.bitcoin.usd).toFixed(0),
              change: null,
              changePct: `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`,
              status: "LIVE",
              asOf: now,
            });
          }
          if (cryptoSyms.includes("ETHUSD") && data?.ethereum?.usd) {
            const pct = Number(data.ethereum.usd_24h_change || 0);
            results.push({
              symbol: "ETHUSD",
              price: Number(data.ethereum.usd).toFixed(2),
              change: null,
              changePct: `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`,
              status: "LIVE",
              asOf: now,
            });
          }
        }
      } catch {}
    }

    // Ensure all requested symbols are represented honestly
    const foundSet = new Set(results.map((r) => r.symbol));
    for (const sym of symbols) {
      if (!foundSet.has(sym)) {
        results.push({ symbol: sym, price: null, status: "UNAVAILABLE", asOf: null });
      }
    }
    return results;
  }

  async fetchHistory(
    symbol: string,
    range: "1d" | "1w" | "1m" | "1y"
  ): Promise<{ t: Date; c: string }[]> {
    const ySym = YAHOO_MAP[symbol];
    if (!ySym) return [];
    const rangeParam =
      range === "1d" ? "1d" : range === "1w" ? "5d" : range === "1m" ? "1mo" : "1y";
    const intervalParam =
      range === "1d" ? "30m" : range === "1w" ? "1h" : range === "1m" ? "1d" : "1wk";

    try {
      const res = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
          ySym
        )}?interval=${intervalParam}&range=${rangeParam}`,
        { headers: { "User-Agent": BROWSER_UA }, signal: AbortSignal.timeout(6000) }
      );
      if (!res.ok) return [];
      const json = await res.json();
      const result = json?.chart?.result?.[0];
      const timestamps: number[] = result?.timestamp || [];
      const closes: Array<number | null> = result?.indicators?.quote?.[0]?.close || [];
      const pts: { t: Date; c: string }[] = [];
      for (let i = 0; i < timestamps.length; i++) {
        const c = closes[i];
        if (typeof c === "number" && Number.isFinite(c)) {
          pts.push({ t: new Date(timestamps[i]! * 1000), c: c.toFixed(2) });
        }
      }
      return pts;
    } catch {
      return [];
    }
  }
}

/**
 * @deprecated Kept strictly for explicit offline test mode when ENABLE_MOCK_DATA="true".
 */
export class MockQuoteProvider implements QuoteProvider {
  key = "mock-provider";
  maxSymbolsPerCall = 50;

  async fetchQuotes(symbols: string[]): Promise<RawQuote[]> {
    return symbols.map((sym) => ({
      symbol: sym,
      price: null,
      status: "UNAVAILABLE",
      asOf: null,
    }));
  }
}

export class ApiNinjasQuoteProvider implements QuoteProvider {
  key = "api-ninjas";
  maxSymbolsPerCall = 10;
  private liveFallback = new LivePublicQuoteProvider();

  constructor(private apiKey: string) {}

  async fetchQuotes(symbols: string[]): Promise<RawQuote[]> {
    if (!this.apiKey) {
      return this.liveFallback.fetchQuotes(symbols);
    }

    const liveQuotes = await this.liveFallback.fetchQuotes(symbols);
    return liveQuotes;
  }

  async fetchHistory(
    symbol: string,
    range: "1d" | "1w" | "1m" | "1y"
  ): Promise<{ t: Date; c: string }[]> {
    return this.liveFallback.fetchHistory(symbol, range);
  }
}

export function getQuoteProvider(apiKey?: string): QuoteProvider {
  const key = apiKey || process.env["API_NINJAS_KEY"] || process.env["QUOTES_API_KEY"];
  if (key) {
    return new ApiNinjasQuoteProvider(key);
  }
  if (isMockDataAllowed() && process.env["FORCE_UNAVAILABLE_MOCK"] === "true") {
    return new MockQuoteProvider();
  }
  return new LivePublicQuoteProvider();
}
