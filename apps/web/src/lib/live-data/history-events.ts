export interface OnThisDayEvent {
  year: number;
  title: string;
  description: string;
  wikiUrl?: string;
  thumbnail?: string;
  isPalestineOrArab: boolean;
}

export interface OnThisDaySnapshot {
  dateLabelAr: string;
  month: number;
  day: number;
  events: OnThisDayEvent[];
  source: string;
}

const ARAB_PALESTINE_KEYWORDS = [
  "فلسطين",
  "القدس",
  "غزة",
  "حيفا",
  "يافا",
  "عكا",
  "الخليل",
  "نابلس",
  "بيروت",
  "لبنان",
  "مصر",
  "القاهرة",
  "دمشق",
  "سوريا",
  "الأردن",
  "عمّان",
  "بغداد",
  "العراق",
  "مكة",
  "المدينة",
  "المغرب",
  "تونس",
  "الجزائر",
  "العرب",
  "عثمان",
  "صلاح الدين",
];

export async function fetchWikipediaOnThisDay(): Promise<OnThisDaySnapshot> {
  const now = new Date();
  // Format today's month & day in Jerusalem timezone
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jerusalem",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const month = Number(parts.find((p) => p.type === "month")?.value || now.getMonth() + 1);
  const day = Number(parts.find((p) => p.type === "day")?.value || now.getDate());
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");

  const dateLabelAr = now.toLocaleDateString("ar-EG", {
    timeZone: "Asia/Jerusalem",
    day: "numeric",
    month: "long",
  });

  try {
    const res = await fetch(
      `https://ar.wikipedia.org/api/rest_v1/feed/onthisday/events/${mm}/${dd}`,
      {
        headers: {
          "User-Agent": "AlWatanTodayBot/1.0 (https://alwatantoday.net)",
          Accept: "application/json",
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(7000),
      }
    );

    if (!res.ok) {
      return {
        dateLabelAr,
        month,
        day,
        events: [],
        source: "ويكيبيديا العربية (On This Day)",
      };
    }

    const json = await res.json();
    const rawEvents: any[] = Array.isArray(json?.events) ? json.events : [];

    const mapped: OnThisDayEvent[] = rawEvents
      .filter((ev) => ev?.text && typeof ev.year === "number")
      .map((ev) => {
        const text = String(ev.text);
        const page = ev?.pages?.[0];
        const description =
          page?.extract && page.extract.length > text.length
            ? String(page.extract)
            : text;
        const isPalestineOrArab = ARAB_PALESTINE_KEYWORDS.some((kw) =>
          text.includes(kw) || description.includes(kw)
        );
        return {
          year: Number(ev.year),
          title: text,
          description: description.slice(0, 360),
          wikiUrl: page?.content_urls?.desktop?.page,
          thumbnail: page?.thumbnail?.source,
          isPalestineOrArab,
        };
      })
      .sort((a, b) => {
        if (a.isPalestineOrArab !== b.isPalestineOrArab) {
          return a.isPalestineOrArab ? -1 : 1;
        }
        return b.year - a.year;
      })
      .slice(0, 12);

    return {
      dateLabelAr,
      month,
      day,
      events: mapped,
      source: "أرشيف ويكيبيديا العربية التاريخي (بث مباشر)",
    };
  } catch {
    return {
      dateLabelAr,
      month,
      day,
      events: [],
      source: "أرشيف ويكيبيديا العربية التاريخي",
    };
  }
}
