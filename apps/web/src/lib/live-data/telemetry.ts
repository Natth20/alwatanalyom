export interface CityWeatherTelemetry {
  id: string;
  cityAr: string;
  tempC: number;
  humidityPct: number;
  windKmh: number;
  conditionAr: string;
  conditionKind: "sun" | "partly" | "cloud" | "rain" | "storm";
  updatedAt: string;
}

export interface CityPrayerTimings {
  cityId: string;
  cityAr: string;
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  hijriDateAr: string;
  gregorianDate: string;
  timezone: string;
}

export interface LiveTelemetrySnapshot {
  weather: CityWeatherTelemetry[];
  prayers: Record<string, CityPrayerTimings>;
  fetchedAt: string;
}

const WEATHER_CITIES = [
  { id: "jerusalem", cityAr: "القدس الشريف", lat: 31.7683, lon: 35.2137 },
  { id: "gaza", cityAr: "غزة العزة", lat: 31.5017, lon: 34.4668 },
  { id: "ramallah", cityAr: "رام الله والبيرة", lat: 31.9038, lon: 35.2034 },
  { id: "nablus", cityAr: "نابلس", lat: 32.2211, lon: 35.2544 },
  { id: "hebron", cityAr: "الخليل", lat: 31.5326, lon: 35.0998 },
  { id: "amman", cityAr: "عمّان", lat: 31.9539, lon: 35.9106 },
  { id: "cairo", cityAr: "القاهرة", lat: 30.0444, lon: 31.2357 },
  { id: "beirut", cityAr: "بيروت", lat: 33.8938, lon: 35.5018 },
] as const;

const PRAYER_CITIES = [
  { id: "jerusalem", cityAr: "القدس الشريف", lat: 31.7683, lon: 35.2137, tz: "Asia/Jerusalem" },
  { id: "gaza", cityAr: "غزة العزة", lat: 31.5017, lon: 34.4668, tz: "Asia/Gaza" },
  { id: "ramallah", cityAr: "رام الله", lat: 31.9038, lon: 35.2034, tz: "Asia/Jerusalem" },
  { id: "amman", cityAr: "عمّان", lat: 31.9539, lon: 35.9106, tz: "Asia/Amman" },
  { id: "cairo", cityAr: "القاهرة", lat: 30.0444, lon: 31.2357, tz: "Africa/Cairo" },
] as const;

function mapWmoWeather(code: number): {
  conditionAr: string;
  conditionKind: CityWeatherTelemetry["conditionKind"];
} {
  if (code === 0) return { conditionAr: "صافٍ ومشرق", conditionKind: "sun" };
  if (code === 1 || code === 2) return { conditionAr: "غائم جزئياً", conditionKind: "partly" };
  if (code === 3) return { conditionAr: "غائم", conditionKind: "cloud" };
  if (code === 45 || code === 48) return { conditionAr: "ضباب خفيف", conditionKind: "cloud" };
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return { conditionAr: "أمطار متفرقة", conditionKind: "rain" };
  }
  if (code >= 95) return { conditionAr: "عواصف رعدية", conditionKind: "storm" };
  return { conditionAr: "معتدل", conditionKind: "partly" };
}

export async function fetchLiveWeather(): Promise<CityWeatherTelemetry[]> {
  try {
    const lats = WEATHER_CITIES.map((c) => c.lat).join(",");
    const lons = WEATHER_CITIES.map((c) => c.lon).join(",");
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`;

    const res = await fetch(url, {
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(7000),
    });
    if (!res.ok) return [];
    const raw = await res.json();
    const list = Array.isArray(raw) ? raw : [raw];

    return WEATHER_CITIES.map((city, idx): CityWeatherTelemetry | null => {
      const entry = list[idx];
      const cur = entry?.current;
      if (!cur || typeof cur.temperature_2m !== "number") return null;
      const mapped = mapWmoWeather(Number(cur.weather_code ?? 0));
      return {
        id: city.id,
        cityAr: city.cityAr,
        tempC: Math.round(cur.temperature_2m),
        humidityPct: Math.round(Number(cur.relative_humidity_2m ?? 0)),
        windKmh: Math.round(Number(cur.wind_speed_10m ?? 0)),
        conditionAr: mapped.conditionAr,
        conditionKind: mapped.conditionKind,
        updatedAt: String(cur.time || new Date().toISOString()),
      };
    }).filter((x): x is CityWeatherTelemetry => x !== null);
  } catch {
    return [];
  }
}

export async function fetchLivePrayers(): Promise<Record<string, CityPrayerTimings>> {
  const entries = await Promise.all(
    PRAYER_CITIES.map(async (city): Promise<[string, CityPrayerTimings] | null> => {
      try {
        // Method 5: Egyptian General Authority of Survey (standard Levant/Palestine alignment)
        const url = `https://api.aladhan.com/v1/timings?latitude=${city.lat}&longitude=${city.lon}&method=5`;
        const res = await fetch(url, {
          next: { revalidate: 3600 },
          signal: AbortSignal.timeout(7000),
        });
        if (!res.ok) return null;
        const json = await res.json();
        const data = json?.data;
        const timings = data?.timings;
        const hijri = data?.date?.hijri;
        if (!timings?.Fajr) return null;

        const clean = (val: string) => String(val).replace(/\s*\(.*\)$/, "");
        const hijriStr = hijri
          ? `${hijri.day} ${hijri.month?.ar || ""} ${hijri.year} هـ`
          : "";

        return [
          city.id,
          {
            cityId: city.id,
            cityAr: city.cityAr,
            fajr: clean(timings.Fajr),
            sunrise: clean(timings.Sunrise),
            dhuhr: clean(timings.Dhuhr),
            asr: clean(timings.Asr),
            maghrib: clean(timings.Maghrib),
            isha: clean(timings.Isha),
            hijriDateAr: hijriStr,
            gregorianDate: data?.date?.readable || "",
            timezone: city.tz,
          },
        ];
      } catch {
        return null;
      }
    })
  );

  const out: Record<string, CityPrayerTimings> = {};
  for (const entry of entries) {
    if (entry) {
      out[entry[0]] = entry[1];
    }
  }
  return out;
}

export async function fetchLiveTelemetry(): Promise<LiveTelemetrySnapshot> {
  const [weather, prayers] = await Promise.all([
    fetchLiveWeather(),
    fetchLivePrayers(),
  ]);
  return {
    weather,
    prayers,
    fetchedAt: new Date().toISOString(),
  };
}
