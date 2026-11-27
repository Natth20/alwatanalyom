const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

export interface LiveMatchItem {
  id: string;
  leagueSlug: string;
  leagueNameAr: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  homeScore: string | null;
  awayScore: string | null;
  status: "LIVE" | "FT" | "NS";
  statusDetail: string;
  kickoffIso: string;
  kickoffTime: string;
  venue?: string;
  isFeatured: boolean;
}

export interface LiveStandingRow {
  rank: number;
  team: string;
  teamLogo?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
  points: number;
}

export interface LeagueStandingsTable {
  leagueSlug: string;
  leagueNameAr: string;
  rows: LiveStandingRow[];
}

export interface LiveSportsSnapshot {
  matches: LiveMatchItem[];
  standings: LeagueStandingsTable[];
  updatedAt: string;
  provider: string;
}

const TEAM_AR_NAMES: Record<string, string> = {
  "Real Madrid": "ريال مدريد",
  Barcelona: "برشلونة",
  "Atletico Madrid": "أتلتيكو مدريد",
  "Athletic Club": "أتلتيك بلباو",
  Villarreal: "فياريال",
  Sevilla: "إشبيلية",
  "Real Betis": "ريال بيتيس",
  "Real Sociedad": "ريال سوسييداد",
  "Manchester City": "مانشستر سيتي",
  Liverpool: "ليفربول",
  Arsenal: "أرسنال",
  Chelsea: "تشيلسي",
  "Manchester United": "مانشستر يونايتد",
  Tottenham: "توتنهام هوتسبير",
  "Tottenham Hotspur": "توتنهام هوتسبير",
  "Newcastle United": "نيوكاسل يونايتد",
  "Aston Villa": "أستون فيلا",
  Brighton: "برايتون",
  "Brighton & Hove Albion": "برايتون",
  "Bayern Munich": "بايرن ميونخ",
  "Bayer Leverkusen": "باير ليفركوزن",
  "Borussia Dortmund": "بوروسيا دورتموند",
  "Inter Milan": "إنتر ميلان",
  Internazionale: "إنتر ميلان",
  "AC Milan": "إي سي ميلان",
  Juventus: "يوفنتوس",
  Napoli: "نابولي",
  "AS Roma": "روما",
  "Paris Saint-Germain": "باريس سان جيرمان",
  "Al Hilal": "الهلال",
  "Al-Hilal": "الهلال",
  "Al Nassr": "النصر",
  "Al-Nassr": "النصر",
  "Al Ittihad": "الاتحاد",
  "Al-Ittihad": "الاتحاد",
  "Al Ahli": "الأهلي",
  "Al-Ahli": "الأهلي",
};

function translateTeam(name: string): string {
  if (!name) return "";
  return TEAM_AR_NAMES[name] || name;
}

const SCOREBOARD_LEAGUES = [
  { slug: "uefa.champions", nameAr: "دوري أبطال أوروبا" },
  { slug: "eng.1", nameAr: "الدوري الإنجليزي الممتاز" },
  { slug: "esp.1", nameAr: "الدوري الإسباني (الليغا)" },
  { slug: "ita.1", nameAr: "الدوري الإيطالي (السيري أ)" },
  { slug: "ger.1", nameAr: "الدوري الألماني (البوندسليغا)" },
  { slug: "ksa.1", nameAr: "دوري روشن السعودي" },
] as const;

const STANDINGS_LEAGUES = [
  { slug: "eng.1", nameAr: "الدوري الإنجليزي الممتاز" },
  { slug: "esp.1", nameAr: "الدوري الإسباني (الليغا)" },
  { slug: "ita.1", nameAr: "الدوري الإيطالي" },
  { slug: "ger.1", nameAr: "الدوري الألماني" },
  { slug: "ksa.1", nameAr: "دوري روشن السعودي" },
] as const;

async function fetchLeagueMatches(slug: string, nameAr: string): Promise<LiveMatchItem[]> {
  try {
    const res = await fetch(
      `https://site.api.espn.com/apis/site/v2/sports/soccer/${slug}/scoreboard`,
      {
        headers: { "User-Agent": BROWSER_UA, Accept: "application/json" },
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(6500),
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    const events: any[] = data?.events || [];

    return events.map((ev) => {
      const comp = ev?.competitions?.[0];
      const competitors: any[] = comp?.competitors || [];
      const home = competitors.find((c) => c.homeAway === "home") || competitors[0];
      const away = competitors.find((c) => c.homeAway === "away") || competitors[1];

      const state: string = ev?.status?.type?.state || "pre";
      let status: LiveMatchItem["status"] = "NS";
      if (state === "in") status = "LIVE";
      else if (state === "post") status = "FT";

      const detail: string =
        ev?.status?.type?.shortDetail || ev?.status?.type?.description || "";
      const kickoffIso = String(ev?.date || new Date().toISOString());
      const kickoffTime = new Date(kickoffIso).toLocaleTimeString("ar-EG", {
        timeZone: "Asia/Jerusalem",
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        id: String(ev.id),
        leagueSlug: slug,
        leagueNameAr: nameAr,
        homeTeam: translateTeam(home?.team?.displayName || home?.team?.name || ""),
        awayTeam: translateTeam(away?.team?.displayName || away?.team?.name || ""),
        homeLogo: home?.team?.logo,
        awayLogo: away?.team?.logo,
        homeScore: status === "NS" ? null : String(home?.score ?? "0"),
        awayScore: status === "NS" ? null : String(away?.score ?? "0"),
        status,
        statusDetail:
          status === "LIVE"
            ? `مباشر ${detail}`
            : status === "FT"
              ? "انتهت"
              : kickoffTime,
        kickoffIso,
        kickoffTime,
        venue: comp?.venue?.fullName,
        isFeatured: slug === "uefa.champions" || status === "LIVE",
      };
    });
  } catch {
    return [];
  }
}

async function fetchLeagueStandings(
  slug: string,
  nameAr: string
): Promise<LeagueStandingsTable | null> {
  try {
    const res = await fetch(
      `https://site.api.espn.com/apis/v2/sports/soccer/${slug}/standings`,
      {
        headers: { "User-Agent": BROWSER_UA, Accept: "application/json" },
        next: { revalidate: 900 },
        signal: AbortSignal.timeout(6500),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const entries: any[] =
      data?.children?.[0]?.standings?.entries || data?.standings?.entries || [];
    if (!Array.isArray(entries) || entries.length === 0) return null;

    const getStat = (stats: any[], names: string[]): number => {
      for (const n of names) {
        const hit = stats?.find((s) => s.name === n || s.abbreviation === n);
        if (hit && typeof hit.value === "number") return hit.value;
      }
      return 0;
    };

    const rows: LiveStandingRow[] = entries.slice(0, 12).map((entry, idx) => {
      const stats = entry?.stats || [];
      const rankStat = getStat(stats, ["rank", "RANK"]);
      return {
        rank: rankStat > 0 ? rankStat : idx + 1,
        team: translateTeam(entry?.team?.displayName || entry?.team?.name || ""),
        teamLogo: entry?.team?.logos?.[0]?.href,
        played: getStat(stats, ["gamesPlayed", "GP"]),
        won: getStat(stats, ["wins", "W"]),
        drawn: getStat(stats, ["ties", "D"]),
        lost: getStat(stats, ["losses", "L"]),
        gd: getStat(stats, ["pointDifferential", "GD"]),
        points: getStat(stats, ["points", "PTS"]),
      };
    });

    rows.sort((a, b) => a.rank - b.rank || b.points - a.points);

    return {
      leagueSlug: slug,
      leagueNameAr: nameAr,
      rows,
    };
  } catch {
    return null;
  }
}

export async function fetchLiveSports(): Promise<LiveSportsSnapshot> {
  const [leagueMatchArrays, standingsResults] = await Promise.all([
    Promise.all(SCOREBOARD_LEAGUES.map((l) => fetchLeagueMatches(l.slug, l.nameAr))),
    Promise.all(STANDINGS_LEAGUES.map((l) => fetchLeagueStandings(l.slug, l.nameAr))),
  ]);

  const matches = leagueMatchArrays
    .flat()
    .sort((a, b) => {
      const order = { LIVE: 0, NS: 1, FT: 2 };
      if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
      return new Date(a.kickoffIso).getTime() - new Date(b.kickoffIso).getTime();
    });

  const standings = standingsResults.filter(
    (s): s is LeagueStandingsTable => s !== null && s.rows.length > 0
  );

  return {
    matches,
    standings,
    updatedAt: new Date().toISOString(),
    provider: "ESPN Official Global Soccer Data",
  };
}
