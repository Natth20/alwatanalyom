import type { InstrumentDetail, InstrumentQuote, DataStatus } from "@awt/shared";

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

interface YahooSpec {
  symbol: string;
  yahooSymbol: string;
  nameAr: string;
  nameEn: string;
  category: InstrumentQuote["category"];
  unit: string;
  currency: string;
  decimals: number;
}

const YAHOO_SPECS: YahooSpec[] = [
  {
    symbol: "XAUUSD",
    yahooSymbol: "GC=F",
    nameAr: "الذهب الفوري (الأونصة)",
    nameEn: "Gold (COMEX / XAUUSD)",
    category: "metals",
    unit: "أونصة",
    currency: "USD",
    decimals: 2,
  },
  {
    symbol: "XAGUSD",
    yahooSymbol: "SI=F",
    nameAr: "الفضة الفورية (الأونصة)",
    nameEn: "Silver (COMEX / XAGUSD)",
    category: "metals",
    unit: "أونصة",
    currency: "USD",
    decimals: 2,
  },
  {
    symbol: "BRENT",
    yahooSymbol: "BZ=F",
    nameAr: "نفط برنت القياسي",
    nameEn: "Brent Crude Oil",
    category: "energy",
    unit: "برميل",
    currency: "USD",
    decimals: 2,
  },
  {
    symbol: "WTI",
    yahooSymbol: "CL=F",
    nameAr: "خام غرب تكساس (WTI)",
    nameEn: "WTI Crude Oil",
    category: "energy",
    unit: "برميل",
    currency: "USD",
    decimals: 2,
  },
  {
    symbol: "SP500",
    yahooSymbol: "^GSPC",
    nameAr: "مؤشر S&P 500 الأمريكي",
    nameEn: "S&P 500 Index",
    category: "index",
    unit: "نقطة",
    currency: "USD",
    decimals: 2,
  },
  {
    symbol: "NASDAQ",
    yahooSymbol: "^IXIC",
    nameAr: "مؤشر ناسداك المركب",
    nameEn: "NASDAQ Composite",
    category: "index",
    unit: "نقطة",
    currency: "USD",
    decimals: 2,
  },
];

async function fetchYahooQuote(spec: YahooSpec): Promise<InstrumentQuote | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
      spec.yahooSymbol
    )}?interval=1d&range=2d`;
    const res = await fetch(url, {
      headers: { "User-Agent": BROWSER_UA, Accept: "application/json" },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta || typeof meta.regularMarketPrice !== "number") return null;

    const priceNum = meta.regularMarketPrice as number;
    const prevNum =
      typeof meta.chartPreviousClose === "number" && meta.chartPreviousClose > 0
        ? (meta.chartPreviousClose as number)
        : priceNum;
    const diff = priceNum - prevNum;
    const pct = prevNum > 0 ? (diff / prevNum) * 100 : 0;
    const marketTime =
      typeof meta.regularMarketTime === "number"
        ? new Date(meta.regularMarketTime * 1000).toISOString()
        : new Date().toISOString();

    const status: DataStatus =
      meta.marketState === "CLOSED" ? "CLOSE" : "LIVE";

    return {
      symbol: spec.symbol,
      nameAr: spec.nameAr,
      nameEn: spec.nameEn,
      category: spec.category,
      price: priceNum.toFixed(spec.decimals),
      change: `${diff >= 0 ? "+" : ""}${diff.toFixed(spec.decimals)}`,
      changePct: `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`,
      unit: spec.unit,
      currency: spec.currency,
      status,
      asOf: marketTime,
      provider: `Yahoo Finance (${meta.fullExchangeName || "Global Market"})`,
    };
  } catch {
    return null;
  }
}

async function fetchFxQuotes(): Promise<InstrumentQuote[]> {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD", {
      headers: { "User-Agent": BROWSER_UA, Accept: "application/json" },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return [];
    const json = await res.json();
    if (json?.result !== "success" || !json?.rates) return [];

    const rates = json.rates as Record<string, number>;
    const asOf =
      typeof json.time_last_update_unix === "number"
        ? new Date(json.time_last_update_unix * 1000).toISOString()
        : new Date().toISOString();

    const quotes: InstrumentQuote[] = [];
    const pushFx = (
      symbol: string,
      nameAr: string,
      nameEn: string,
      val: number | undefined,
      unit: string,
      currency: string,
      decimals = 4
    ) => {
      if (typeof val !== "number" || !Number.isFinite(val) || val <= 0) return;
      quotes.push({
        symbol,
        nameAr,
        nameEn,
        category: "fx",
        price: val.toFixed(decimals),
        change: null,
        changePct: null,
        unit,
        currency,
        status: "LIVE",
        asOf,
        provider: "Open Exchange Rates API",
      });
    };

    pushFx("USDILS", "الدولار / الشيكل", "USD / ILS", rates["ILS"], "شيكل", "ILS", 4);
    pushFx("USDJOD", "الدولار / الدينار الأردني", "USD / JOD", rates["JOD"], "دينار", "JOD", 4);
    pushFx(
      "JODILS",
      "الدينار الأردني / الشيكل",
      "JOD / ILS",
      rates["ILS"] && rates["JOD"] ? rates["ILS"] / rates["JOD"] : undefined,
      "شيكل",
      "ILS",
      4
    );
    pushFx(
      "EURUSD",
      "اليورو / الدولار",
      "EUR / USD",
      rates["EUR"] ? 1 / rates["EUR"] : undefined,
      "دولار",
      "USD",
      4
    );
    pushFx(
      "EURILS",
      "اليورو / الشيكل",
      "EUR / ILS",
      rates["ILS"] && rates["EUR"] ? rates["ILS"] / rates["EUR"] : undefined,
      "شيكل",
      "ILS",
      4
    );
    pushFx(
      "GBPUSD",
      "الجنيه الإسترليني / الدولار",
      "GBP / USD",
      rates["GBP"] ? 1 / rates["GBP"] : undefined,
      "دولار",
      "USD",
      4
    );
    pushFx("USDEGP", "الدولار / الجنيه المصري", "USD / EGP", rates["EGP"], "جنيه", "EGP", 2);
    pushFx("USDSAR", "الدولار / الريال السعودي", "USD / SAR", rates["SAR"], "ريال", "SAR", 4);
    pushFx("USDAED", "الدولار / الدرهم الإماراتي", "USD / AED", rates["AED"], "درهم", "AED", 4);
    pushFx("USDKWD", "الدولار / الدينار الكويتي", "USD / KWD", rates["KWD"], "دينار كويتي", "KWD", 4);

    return quotes;
  } catch {
    return [];
  }
}

async function fetchCryptoQuotes(): Promise<InstrumentQuote[]> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true",
      {
        headers: { "User-Agent": BROWSER_UA, Accept: "application/json" },
        next: { revalidate: 120 },
        signal: AbortSignal.timeout(2500),
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const results: InstrumentQuote[] = [];

    if (data?.bitcoin?.usd) {
      const price = Number(data.bitcoin.usd);
      const pct = Number(data.bitcoin.usd_24h_change || 0);
      results.push({
        symbol: "BTCUSD",
        nameAr: "بيتكوين (BTC / USD)",
        nameEn: "Bitcoin",
        category: "crypto",
        price: price.toFixed(0),
        change: null,
        changePct: `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`,
        unit: "عملة",
        currency: "USD",
        status: "LIVE",
        asOf: data.bitcoin.last_updated_at
          ? new Date(data.bitcoin.last_updated_at * 1000).toISOString()
          : new Date().toISOString(),
        provider: "CoinGecko Live Market",
      });
    }

    if (data?.ethereum?.usd) {
      const price = Number(data.ethereum.usd);
      const pct = Number(data.ethereum.usd_24h_change || 0);
      results.push({
        symbol: "ETHUSD",
        nameAr: "إيثيريوم (ETH / USD)",
        nameEn: "Ethereum",
        category: "crypto",
        price: price.toFixed(2),
        change: null,
        changePct: `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`,
        unit: "عملة",
        currency: "USD",
        status: "LIVE",
        asOf: data.ethereum.last_updated_at
          ? new Date(data.ethereum.last_updated_at * 1000).toISOString()
          : new Date().toISOString(),
        provider: "CoinGecko Live Market",
      });
    }

    return results;
  } catch {
    return [];
  }
}

let _quotesMemoryCache: { data: InstrumentQuote[]; expiresAt: number } | null = null;

export async function fetchAllLiveQuotes(): Promise<InstrumentQuote[]> {
  if (_quotesMemoryCache && _quotesMemoryCache.expiresAt > Date.now()) {
    return _quotesMemoryCache.data;
  }

  const [yahooResults, fxResults, cryptoResults] = await Promise.all([
    Promise.all(YAHOO_SPECS.map(fetchYahooQuote)),
    fetchFxQuotes(),
    fetchCryptoQuotes(),
  ]);

  const flatYahoo = yahooResults.filter((item): item is InstrumentQuote => item !== null);
  const combined = [...flatYahoo, ...fxResults, ...cryptoResults];
  if (combined.length > 0) {
    _quotesMemoryCache = { data: combined, expiresAt: Date.now() + 60_000 };
  }
  return combined;
}

export interface PalestineGoldKaratRow {
  karat: string;
  karatNumber: number;
  purityPct: string;
  usdPerGram: number;
  ilsPerGram: number;
  jodPerGram: number;
}

export function derivePalestineGoldTable(
  ounceUsd: number | null,
  usdIls: number | null,
  usdJod: number | null
): PalestineGoldKaratRow[] {
  if (!ounceUsd || ounceUsd <= 0 || !usdIls || usdIls <= 0) return [];
  const jodRate = usdJod && usdJod > 0 ? usdJod : 0.709;
  const gram24Usd = ounceUsd / 31.1034768;

  const tiers = [
    { karat: "عيار 24 (الخالص)", karatNumber: 24, purity: 1, purityPct: "99.9%" },
    { karat: "عيار 22 (الرشادي)", karatNumber: 22, purity: 22 / 24, purityPct: "91.6%" },
    { karat: "عيار 21 (الأكثر تداولاً)", karatNumber: 21, purity: 21 / 24, purityPct: "87.5%" },
    { karat: "عيار 18 (المشغولات)", karatNumber: 18, purity: 18 / 24, purityPct: "75.0%" },
  ];

  return tiers.map((t) => {
    const usd = gram24Usd * t.purity;
    return {
      karat: t.karat,
      karatNumber: t.karatNumber,
      purityPct: t.purityPct,
      usdPerGram: Number(usd.toFixed(2)),
      ilsPerGram: Number((usd * usdIls).toFixed(2)),
      jodPerGram: Number((usd * jodRate).toFixed(2)),
    };
  });
}

export async function fetchLiveInstrumentDetail(
  symbol: string
): Promise<InstrumentDetail | null> {
  const upper = symbol.toUpperCase();
  const yahooSpec = YAHOO_SPECS.find((s) => s.symbol === upper);

  if (yahooSpec) {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
        yahooSpec.yahooSymbol
      )}?interval=1h&range=5d`;
      const res = await fetch(url, {
        headers: { "User-Agent": BROWSER_UA, Accept: "application/json" },
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(6000),
      });
      if (res.ok) {
        const json = await res.json();
        const result = json?.chart?.result?.[0];
        const meta = result?.meta;
        const timestamps: number[] = result?.timestamp || [];
        const closes: Array<number | null> = result?.indicators?.quote?.[0]?.close || [];
        const highs: Array<number | null> = result?.indicators?.quote?.[0]?.high || [];
        const lows: Array<number | null> = result?.indicators?.quote?.[0]?.low || [];

        if (meta && typeof meta.regularMarketPrice === "number") {
          const priceNum = Number(meta.regularMarketPrice);
          const prevNum =
            typeof meta.chartPreviousClose === "number" && meta.chartPreviousClose > 0
              ? Number(meta.chartPreviousClose)
              : priceNum;
          const diff = priceNum - prevNum;
          const pct = prevNum > 0 ? (diff / prevNum) * 100 : 0;

          const history: { time: string; price: number }[] = [];
          for (let i = 0; i < timestamps.length; i++) {
            const c = closes[i];
            if (typeof c === "number" && Number.isFinite(c)) {
              history.push({
                time: new Date(timestamps[i]! * 1000).toISOString(),
                price: Number(c.toFixed(yahooSpec.decimals)),
              });
            }
          }

          const validHighs = highs.filter((n): n is number => typeof n === "number" && Number.isFinite(n));
          const validLows = lows.filter((n): n is number => typeof n === "number" && Number.isFinite(n));

          return {
            symbol: yahooSpec.symbol,
            nameAr: yahooSpec.nameAr,
            nameEn: yahooSpec.nameEn,
            category: yahooSpec.category,
            price: priceNum.toFixed(yahooSpec.decimals),
            change: `${diff >= 0 ? "+" : ""}${diff.toFixed(yahooSpec.decimals)}`,
            changePct: `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`,
            unit: yahooSpec.unit,
            currency: yahooSpec.currency,
            status: meta.marketState === "CLOSED" ? "CLOSE" : "LIVE",
            asOf: meta.regularMarketTime
              ? new Date(meta.regularMarketTime * 1000).toISOString()
              : new Date().toISOString(),
            provider: `Yahoo Finance (${meta.fullExchangeName || "Global"})`,
            history: history.slice(-48),
            high24h: validHighs.length > 0 ? Math.max(...validHighs.slice(-24)) : null,
            low24h: validLows.length > 0 ? Math.min(...validLows.slice(-24)) : null,
          };
        }
      }
    } catch {
      // Fall back to snapshot search
    }
  }

  const all = await fetchAllLiveQuotes();
  const found = all.find((q) => q.symbol.toUpperCase() === upper);
  if (!found) return null;
  return {
    ...found,
    history: [],
    high24h: null,
    low24h: null,
  };
}
