"use client";

import { useState, useEffect, useMemo, useCallback, type MouseEvent } from "react";
import Link from "next/link";
import { HubsNav } from "@/components/HubsNav";
import {
  Map, Search, MapPin, Filter, Users, Compass, Landmark, X, Share2,
  BookOpen, ArrowRight, Radio, ExternalLink, Newspaper, Check, Copy,
  Printer, Navigation, ShieldAlert, ShieldCheck, Tent, Sparkles,
  Globe, RotateCcw, Quote, Maximize2, type LucideIcon,
} from "lucide-react";
import { PLACES, DISTRICTS, type PalestinianPlace } from "@/data/atlas";
import type { ArticleCard } from "@awt/shared";

type StatusFilter = "all" | PalestinianPlace["status"];
type ModalTab = "history" | "landmarks" | "news";

interface AtlasArticlesResponse { ok?: boolean; articles?: ArticleCard[]; }

interface StatusStyleMeta {
  label: string;
  icon: LucideIcon;
  badgeClass: string;
  dotClass: string;
  glowClass: string;
  activePillClass: string;
}

interface ReferenceSource {
  id: string;
  nameAr: string;
  nameEn: string;
  description: string;
  url: string;
  tag: string;
}

interface HeroStatCard {
  id: string;
  label: string;
  value: number;
  icon: LucideIcon;
  borderClass: string;
  valueClass: string;
  iconBoxClass: string;
}

const STATUS_META: Record<PalestinianPlace["status"], StatusStyleMeta> = {
  depopulated_1948: {
    label: "مهجرة عام 1948",
    icon: ShieldAlert,
    badgeClass: "bg-rose-950/90 text-rose-200 border border-rose-500/50 shadow-[0_0_16px_rgba(244,63,94,0.45)]",
    dotClass: "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.9)]",
    glowClass: "hover:border-rose-500/50 hover:shadow-[0_24px_60px_-15px_rgba(225,29,72,0.35)]",
    activePillClass: "bg-gradient-to-l from-rose-700 to-rose-900 text-white border-rose-400/60 shadow-[0_0_24px_-4px_rgba(244,63,94,0.65)]",
  },
  surviving: {
    label: "صامدة ومأهولة",
    icon: ShieldCheck,
    badgeClass: "bg-emerald-950/90 text-emerald-200 border border-emerald-400/50 shadow-[0_0_16px_rgba(16,185,129,0.45)]",
    dotClass: "bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]",
    glowClass: "hover:border-emerald-400/50 hover:shadow-[0_24px_60px_-15px_rgba(16,185,129,0.35)]",
    activePillClass: "bg-gradient-to-l from-emerald-600 to-emerald-800 text-white border-emerald-300/60 shadow-[0_0_24px_-4px_rgba(16,185,129,0.65)]",
  },
  camp: {
    label: "مخيمات العودة",
    icon: Tent,
    badgeClass: "bg-amber-950/90 text-amber-200 border border-[#f5b900]/55 shadow-[0_0_16px_rgba(245,185,0,0.4)]",
    dotClass: "bg-[#f5b900] shadow-[0_0_8px_rgba(245,185,0,0.9)]",
    glowClass: "hover:border-[#f5b900]/50 hover:shadow-[0_24px_60px_-15px_rgba(245,185,0,0.3)]",
    activePillClass: "bg-gradient-to-l from-amber-600 to-[#7a5800] text-white border-[#f5b900]/70 shadow-[0_0_24px_-4px_rgba(245,185,0,0.65)]",
  },
};

const REFERENCE_SOURCES: ReferenceSource[] = [
  {
    id: "pls",
    nameAr: "جمعية الأراضي الفلسطينية",
    nameEn: "Palestinian Land Society (PLS)",
    description: "أرشيف جغرافي وتاريخي موثق للخرائط العثمانية والانتدابية، مساحات القرى المهجرة، وسجلات الملكية والأطالس المعتمدة.",
    url: "https://www.plands.org/",
    tag: "خرائط وأطالس الملكية",
  },
  {
    id: "badil",
    nameAr: "مركز بديل لمصادر حقوق المواطنة واللاجئين",
    nameEn: "BADIL Resource Center",
    description: "مرجع بحثي وقانوني متخصص في توثيق التهجير القسري منذ عام 1948، أوضاع المخيمات، وحقوق اللاجئين والعودة.",
    url: "https://www.badil.org/",
    tag: "أبحاث التهجير والعودة",
  },
  {
    id: "palestine-remembered",
    nameAr: "موسوعة فلسطين في الذاكرة",
    nameEn: "Palestine Remembered",
    description: "قاعدة بيانات توثيقية شاملة تضم الإحداثيات، الإحصاءات السكانية لعام 1948، والشهادات الشفوية للبلدات والقرى الفلسطينية.",
    url: "https://www.palestineremembered.com/",
    tag: "التوثيق الشفوي والديموغرافي",
  },
];

function formatCoordinates(coords: PalestinianPlace["coordinates"]): string {
  return `${coords.lat.toFixed(4)}° N · ${coords.lng.toFixed(4)}° E`;
}

function getPopulationLabel(place: PalestinianPlace): string {
  if (place.population1948) return `${place.population1948.toLocaleString("ar-EG")} (عام 1948)`;
  return place.populationCurrent ?? "توثيق ديموغرافي مستمر";
}

function buildCitationText(place: PalestinianPlace): string {
  const year = new Date().getFullYear();
  return `أطلس الوطن اليوم الجغرافي (${year}). "${place.name}" — قضاء ${place.district} (${place.statusLabel})، الإحداثيات: ${formatCoordinates(place.coordinates)}. منصة الوطن اليوم الإخبارية.`;
}

function PlaceTiltCard({ place, onSelect }: { place: PalestinianPlace; onSelect: (place: PalestinianPlace) => void }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, active: false });
  const meta = STATUS_META[place.status];
  const StatusIcon = meta.icon;

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - y) * 9, ry: (x - 0.5) * 9, active: true });
  };

  return (
    <div className="[perspective:1200px]">
      <article
        onClick={() => onSelect(place)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0, active: false })}
        style={{ transform: tilt.active ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-6px)` : "rotateX(0deg) rotateY(0deg) translateY(0px)" }}
        className={`rounded-3xl border border-emerald-500/20 bg-[#16060B]/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-out cursor-pointer group shadow-[0_18px_45px_-18px_rgba(0,0,0,0.85)] flex flex-col h-full will-change-transform ${meta.glowClass}`}
      >
        <div className="relative h-56 w-full overflow-hidden bg-[#0E0407]">
          <img src={place.image} alt={place.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0407] via-[#0E0407]/45 to-emerald-950/30" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,0.22),transparent_65%)]" />
          <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-wide backdrop-blur-md ${meta.badgeClass}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${meta.dotClass}`} />
              <StatusIcon className="w-3 h-3" />
              <span>{place.statusLabel}</span>
            </span>
            <span dir="ltr" className="px-2.5 py-1 rounded-xl bg-black/65 border border-white/15 backdrop-blur-md text-[10px] font-mono text-emerald-200 flex items-center gap-1">
              <Navigation className="w-2.5 h-2.5 text-[var(--gold)]" />
              {place.coordinates.lat.toFixed(2)}°N
            </span>
          </div>
          <div className="absolute bottom-3.5 inset-x-4 text-white space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-300 bg-emerald-950/75 border border-emerald-500/35 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                <MapPin className="w-3 h-3 text-[var(--gold)]" />
                قضاء {place.district}
              </span>
              <span dir="ltr" className="text-[10px] font-mono text-stone-300/80">{formatCoordinates(place.coordinates)}</span>
            </div>
            <h2 className="text-lg md:text-xl font-black leading-snug drop-shadow-md group-hover:text-[var(--gold)] transition-colors">{place.name}</h2>
          </div>
        </div>

        <div className="p-5 md:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <p className="text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed line-clamp-3">{place.historicalSummary}</p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#0E0407]/90 border border-emerald-500/20 text-[11px] font-bold text-stone-200">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>{getPopulationLabel(place)}</span>
              </span>
              {place.areaKm2 !== undefined ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#0E0407]/90 border border-[var(--gold)]/25 text-[11px] font-bold text-[var(--gold)]">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{place.areaKm2.toLocaleString("ar-EG")} كم²</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#0E0407]/90 border border-[var(--gold)]/20 text-[11px] font-bold text-amber-200">
                  <Landmark className="w-3.5 h-3.5 text-[var(--gold)]" />
                  <span>{place.landmarks.length} معالم مسجلة</span>
                </span>
              )}
            </div>
          </div>
          <div className="pt-3.5 border-t border-white/10 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5"><Compass className="w-3.5 h-3.5 text-emerald-400" /><span>أبرز المعالم:</span></span>
              <span className="font-bold text-stone-200 truncate max-w-[185px]">{place.landmarks[0]}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-black text-emerald-300 group-hover:text-[var(--gold)] transition-colors">
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" />استعراض الملف التاريخي والأخبار</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function AtlasPage() {
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("الكل");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [activePlace, setActivePlace] = useState<PalestinianPlace | null>(null);
  const [activeTab, setActiveTab] = useState<ModalTab>("history");
  const [placeArticles, setPlaceArticles] = useState<ArticleCard[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [citationCopied, setCitationCopied] = useState(false);

  const stats = useMemo(() => {
    const depopulated = PLACES.filter((p) => p.status === "depopulated_1948").length;
    const surviving = PLACES.filter((p) => p.status === "surviving").length;
    const camps = PLACES.filter((p) => p.status === "camp").length;
    const districtMap: Record<string, number> = {};
    for (const place of PLACES) districtMap[place.district] = (districtMap[place.district] ?? 0) + 1;
    return { total: PLACES.length, depopulated, surviving, camps, districtMap };
  }, []);

  const heroStats: HeroStatCard[] = useMemo(
    () => [
      { id: "total", label: "إجمالي المواقع الموثقة", value: stats.total, icon: Map, borderClass: "border-emerald-500/25", valueClass: "text-white", iconBoxClass: "bg-emerald-500/15 border-emerald-400/30 text-emerald-300" },
      { id: "depopulated", label: "مهجرة عام 1948", value: stats.depopulated, icon: ShieldAlert, borderClass: "border-rose-500/25", valueClass: "text-rose-300", iconBoxClass: "bg-rose-500/15 border-rose-400/30 text-rose-300" },
      { id: "surviving", label: "صامدة ومأهولة", value: stats.surviving, icon: ShieldCheck, borderClass: "border-emerald-400/30", valueClass: "text-emerald-300", iconBoxClass: "bg-emerald-500/15 border-emerald-400/30 text-emerald-300" },
      { id: "camps", label: "مخيمات العودة", value: stats.camps, icon: Tent, borderClass: "border-[var(--gold)]/30", valueClass: "text-[var(--gold)]", iconBoxClass: "bg-[var(--gold)]/15 border-[var(--gold)]/35 text-[var(--gold)]" },
    ],
    [stats]
  );

  // Fetch live articles when a place is selected
  useEffect(() => {
    if (!activePlace) { setPlaceArticles([]); return; }
    setActiveTab("history");
    setShareCopied(false);
    setCitationCopied(false);
    setLoadingArticles(true);

    const searchTarget = activePlace.district || activePlace.name.split("—")[0].trim();
    fetch(`/api/v1/atlas/articles?place=${encodeURIComponent(searchTarget)}&limit=4`)
      .then((res) => res.json())
      .then((data: AtlasArticlesResponse) => setPlaceArticles(data.ok && Array.isArray(data.articles) ? data.articles : []))
      .catch(() => setPlaceArticles([]))
      .finally(() => setLoadingArticles(false));
  }, [activePlace]);

  useEffect(() => {
    if (!activePlace) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setActivePlace(null); };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = prevOverflow; window.removeEventListener("keydown", onKeyDown); };
  }, [activePlace]);

  const filteredPlaces = useMemo(() => {
    const query = search.trim();
    return PLACES.filter((place) => {
      const matchSearch = !query || place.name.includes(query) || place.famousFor.includes(query) || place.district.includes(query) || place.landmarks.some((lm) => lm.includes(query));
      const matchDistrict = selectedDistrict === "الكل" || place.district === selectedDistrict;
      const matchStatus = selectedStatus === "all" || place.status === selectedStatus;
      return matchSearch && matchDistrict && matchStatus;
    });
  }, [search, selectedDistrict, selectedStatus]);

  const hasActiveFilters = search.trim().length > 0 || selectedDistrict !== "الكل" || selectedStatus !== "all";
  const resetFilters = useCallback(() => { setSearch(""); setSelectedDistrict("الكل"); setSelectedStatus("all"); }, []);

  const handleSharePlace = async (place: PalestinianPlace) => {
    const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/atlas#${place.id}` : "";
    const shareText = `${place.name} — قضاء ${place.district} (${place.statusLabel})\n${place.historicalSummary}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title: `${place.name} | أطلس فلسطين`, text: shareText, url: shareUrl }); return; } catch { /* fallback */ }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(`${place.name} - ${shareUrl}`);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  const handleCopyCitation = async (place: PalestinianPlace) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(buildCitationText(place));
      setCitationCopied(true);
      setTimeout(() => setCitationCopied(false), 2500);
    }
  };

  const modalTabs: { id: ModalTab; label: string; icon: LucideIcon }[] = activePlace
    ? [
        { id: "history", label: "التاريخ", icon: BookOpen },
        { id: "landmarks", label: `المعالم (${activePlace.landmarks.length})`, icon: Landmark },
        { id: "news", label: "الأخبار", icon: Newspaper },
      ]
    : [];

  return (
    <div dir="rtl" className="min-h-screen bg-[#0E0407] text-[var(--text)] print:bg-white print:text-black">
      <HubsNav current="/atlas" />
      {/* Dramatic Full-Width Emerald/Olive Hero Section */}
      <section className="relative overflow-hidden border-b border-emerald-500/25 bg-gradient-to-br from-[#062417] via-[#0B1C14] to-[#0E0407]">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/4 h-80 w-80 rounded-full bg-[#590018]/35 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(245,185,0,0.08)_1px,transparent_0)] [background-size:28px_28px] opacity-50" />

        {/* Palestine Map Silhouette Decorative Element */}
        <div aria-hidden="true" className="pointer-events-none absolute left-4 md:left-12 top-6 bottom-6 hidden sm:flex items-center justify-center opacity-20 md:opacity-30">
          <svg viewBox="0 0 220 480" className="h-[340px] md:h-[420px] w-auto drop-shadow-[0_0_28px_rgba(16,185,129,0.5)]" fill="none">
            <defs>
              <linearGradient id="palestineSilhouette" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="55%" stopColor="#4d7c0f" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#f5b900" stopOpacity="0.35" />
              </linearGradient>
            </defs>
            <path d="M118 14 L148 16 L160 32 L155 68 L166 96 L154 134 L158 176 L146 218 L149 266 L142 310 L124 358 L108 418 L92 466 L80 452 L66 394 L38 326 L22 274 L48 214 L64 156 L78 102 L86 58 L102 28 Z" fill="url(#palestineSilhouette)" stroke="#34d399" strokeWidth="2" />
            <circle cx="114" cy="212" r="5" fill="#f5b900" />
            <circle cx="114" cy="212" r="14" stroke="#f5b900" strokeOpacity="0.45" strokeDasharray="3 3" />
            <circle cx="46" cy="260" r="3.5" fill="#34d399" />
            <circle cx="88" cy="76" r="3.5" fill="#34d399" />
          </svg>
        </div>

        <div className="container-custom max-w-7xl py-12 md:py-16 relative z-10 space-y-8">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/35 text-emerald-300 text-xs font-black shadow-[0_0_24px_rgba(16,185,129,0.2)]">
              <Compass className="w-4 h-4 text-[var(--gold)] animate-[spin_18s_linear_infinite]" />
              <span>أطلس الهوية والجغرافيا والتغطيات · فلسطين التاريخية</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
              أطلس القرى والبلدات{" "}
              <span className="bg-gradient-to-l from-emerald-300 via-[#a3e635] to-[var(--gold)] bg-clip-text text-transparent">والذاكرة الصامدة</span>
            </h1>
            <p className="text-sm md:text-base text-stone-300 leading-relaxed max-w-2xl">
              خريطة تفاعلية فاخرة توثق المدن والقرى الصامدة والمهجرة عام 1948 ومخيمات العودة، مع إحداثياتها الدقيقة ومعالمها التاريخية وربطها الفوري بأحدث التغطيات الميدانية.
            </p>
            <div className="pt-1 max-w-2xl relative">
              <Search className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث بالاسم أو القضاء أو المعلم (مثال: دير ياسين، القدس، يافا، جنين، غزة)..."
                className="w-full pr-12 pl-12 py-4 rounded-2xl border border-emerald-500/35 bg-[#16060B]/90 backdrop-blur-md text-sm text-white placeholder:text-stone-400 focus:outline-none focus:border-[var(--gold)] focus:shadow-[0_0_28px_-6px_rgba(245,185,0,0.45)] transition-all"
              />
              {search && (
                <button type="button" onClick={() => setSearch("")} aria-label="مسح البحث" className="absolute left-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-stone-300 transition-colors cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            {heroStats.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className={`rounded-3xl border ${item.borderClass} bg-[#16060B]/85 backdrop-blur-md p-4 md:p-5 flex items-center justify-between`}>
                  <div>
                    <span className="text-[11px] font-bold text-stone-400 block">{item.label}</span>
                    <span className={`text-2xl md:text-3xl font-black mt-1 block ${item.valueClass}`}>{item.value.toLocaleString("ar-EG")}</span>
                  </div>
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${item.iconBoxClass}`}><Icon className="w-5 h-5" /></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-custom max-w-7xl py-8 md:py-10 space-y-8">
        <section className="rounded-3xl border border-emerald-500/20 bg-[#16060B]/95 p-4 md:p-6 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-black">
              <span className="text-emerald-300 ml-1 inline-flex items-center gap-1.5"><Filter className="w-3.5 h-3.5 text-[var(--gold)]" />تصنيف الحالة:</span>
              <button
                type="button"
                onClick={() => setSelectedStatus("all")}
                className={`px-3.5 py-2 rounded-2xl border transition-all cursor-pointer inline-flex items-center gap-2 ${
                  selectedStatus === "all"
                    ? "bg-gradient-to-l from-[#590018] to-emerald-900 text-white border-[var(--gold)]/60 shadow-[0_0_24px_-4px_rgba(245,185,0,0.55)]"
                    : "bg-[#0E0407] border-white/10 text-stone-300 hover:border-emerald-400/40"
                }`}
              >
                <span>الكل</span>
                <span className="px-2 py-0.5 rounded-full bg-black/40 text-[10px]">{stats.total}</span>
              </button>
              {(["depopulated_1948", "surviving", "camp"] as const).map((statusKey) => {
                const meta = STATUS_META[statusKey];
                const Icon = meta.icon;
                const count = statusKey === "depopulated_1948" ? stats.depopulated : statusKey === "surviving" ? stats.surviving : stats.camps;
                return (
                  <button
                    key={statusKey}
                    type="button"
                    onClick={() => setSelectedStatus(statusKey)}
                    className={`px-3.5 py-2 rounded-2xl border transition-all cursor-pointer inline-flex items-center gap-2 ${
                      selectedStatus === statusKey ? meta.activePillClass : "bg-[#0E0407] border-white/10 text-stone-300 hover:border-emerald-400/40"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{meta.label}</span>
                    <span className="px-2 py-0.5 rounded-full bg-black/35 text-[10px]">{count}</span>
                  </button>
                );
              })}
            </div>
            {hasActiveFilters && (
              <button type="button" onClick={resetFilters} className="px-3.5 py-2 rounded-2xl border border-[var(--gold)]/35 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-black inline-flex items-center gap-1.5 hover:bg-[var(--gold)]/20 transition-colors cursor-pointer">
                <RotateCcw className="w-3.5 h-3.5" />إعادة ضبط الفلاتر
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto snap-x snap-mandatory pb-1.5 text-xs font-bold">
            <span className="text-stone-400 ml-1 shrink-0 inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-400" />القضاء:</span>
            {DISTRICTS.map((district) => {
              const isSelected = selectedDistrict === district;
              const districtCount = district === "الكل" ? stats.total : stats.districtMap[district] ?? 0;
              return (
                <button
                  key={district}
                  type="button"
                  onClick={() => setSelectedDistrict(district)}
                  className={`snap-start px-3.5 py-1.5 rounded-2xl shrink-0 border transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-gradient-to-l from-emerald-600 to-emerald-800 text-white border-emerald-300/60 shadow-[0_0_20px_-4px_rgba(16,185,129,0.65)] font-black"
                      : "bg-[#0E0407] border-white/10 text-stone-300 hover:text-white hover:border-emerald-500/40"
                  }`}
                >
                  <span>{district}</span>
                  {districtCount > 0 && (
                    <span className={`text-[10px] px-1.5 rounded-full ${isSelected ? "bg-black/30 text-emerald-100" : "bg-white/5 text-stone-400"}`}>{districtCount}</span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <div className="flex items-center justify-between text-xs text-stone-400 px-1">
          <span>عرض <strong className="text-emerald-300 font-black">{filteredPlaces.length.toLocaleString("ar-EG")}</strong> من أصل {stats.total.toLocaleString("ar-EG")} موقعاً موثقاً</span>
          {selectedDistrict !== "الكل" && <span className="text-[var(--gold)] font-bold">القضاء المختار: {selectedDistrict}</span>}
        </div>

        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => <PlaceTiltCard key={place.id} place={place} onSelect={setActivePlace} />)}
          </div>
        ) : (
          <div className="rounded-3xl border border-emerald-500/20 bg-[#16060B] p-12 text-center space-y-4">
            <Compass className="w-12 h-12 text-emerald-400/60 mx-auto" />
            <h3 className="text-lg font-black text-white">لا توجد مواقع مطابقة لمعايير البحث</h3>
            <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">جرّب تغيير القضاء أو الحالة، أو أعد ضبط البحث لاستعراض كافة القرى والمدن والمخيمات المسجلة في الأطلس.</p>
            <button type="button" onClick={resetFilters} className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-colors cursor-pointer">عرض جميع المواقع</button>
          </div>
        )}

        {/* Sources and References Footer */}
        <footer className="rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-[#16060B] via-[#101813] to-[#0E0407] p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-5">
            <div className="space-y-1">
              <span className="text-xs font-black text-emerald-400 inline-flex items-center gap-1.5"><Globe className="w-4 h-4 text-[var(--gold)]" />المصادر والمراجع التوثيقية المعتمدة</span>
              <h2 className="text-xl md:text-2xl font-black text-white">توثيق علمي وجغرافي عابر للأجيال</h2>
            </div>
            <span className="text-[11px] font-bold text-stone-400 bg-[#0E0407] border border-white/10 px-3.5 py-1.5 rounded-2xl self-start md:self-auto">بيانات وإحداثيات موثقة · خالية من التقديرات العشوائية</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REFERENCE_SOURCES.map((source) => (
              <a key={source.id} href={source.url} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-emerald-500/20 bg-[#0E0407]/85 p-5 hover:border-[var(--gold)]/55 hover:shadow-[0_12px_32px_-12px_rgba(245,185,0,0.28)] transition-all group flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">{source.tag}</span>
                    <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[var(--gold)] transition-colors" />
                  </div>
                  <h3 className="text-sm font-black text-white group-hover:text-[var(--gold)] transition-colors">{source.nameAr}</h3>
                  <span className="text-[11px] font-mono text-emerald-400/80 block">{source.nameEn}</span>
                  <p className="text-xs text-stone-400 leading-relaxed">{source.description}</p>
                </div>
                <span className="text-[11px] font-black text-[var(--gold)] inline-flex items-center gap-1">
                  زيارة المرجع الرسمي<ArrowRight className="w-3.5 h-3.5 rtl:rotate-180 group-hover:-translate-x-1 transition-transform" />
                </span>
              </a>
            ))}
          </div>
        </footer>
      </div>

      {/* Full-Screen Detail Modal */}
      {activePlace && (
        <div role="dialog" aria-modal="true" aria-labelledby="atlas-modal-title" onClick={() => setActivePlace(null)} className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-xl print:static print:bg-white print:p-0">
          <div onClick={(e) => e.stopPropagation()} className="bg-[#16060B] border border-emerald-500/30 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-[0_32px_90px_-15px_rgba(0,0,0,0.95)] relative print:max-h-none print:border-0 print:shadow-none print:bg-white print:text-black">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#0E0407]">
              <img src={activePlace.image} alt={activePlace.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16060B] via-[#16060B]/45 to-black/40" />
              <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-3 print:hidden">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => handleSharePlace(activePlace)} className="px-3.5 py-2 rounded-2xl bg-black/65 hover:bg-black/85 border border-white/15 backdrop-blur-md text-xs font-black text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer">
                    {shareCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-[var(--gold)]" />}
                    <span>{shareCopied ? "تم نسخ الرابط" : "مشاركة"}</span>
                  </button>
                  <button type="button" onClick={() => window.print()} className="px-3.5 py-2 rounded-2xl bg-black/65 hover:bg-black/85 border border-white/15 backdrop-blur-md text-xs font-black text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer">
                    <Printer className="w-4 h-4 text-emerald-300" />
                    <span className="hidden sm:inline">طباعة التوثيق</span>
                  </button>
                </div>
                <button type="button" onClick={() => setActivePlace(null)} aria-label="إغلاق النافذة" className="p-2.5 rounded-2xl bg-black/65 hover:bg-[#590018] border border-white/20 backdrop-blur-md text-white transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute bottom-5 inset-x-5 sm:inset-x-8 space-y-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-black inline-flex items-center gap-1.5 ${STATUS_META[activePlace.status].badgeClass}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_META[activePlace.status].dotClass}`} />
                    {activePlace.statusLabel}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/65 border border-emerald-400/35 text-emerald-200 text-xs font-bold">قضاء {activePlace.district}</span>
                  <span dir="ltr" className="px-3 py-1 rounded-full bg-black/65 border border-white/15 text-[11px] font-mono text-[var(--gold)]">{formatCoordinates(activePlace.coordinates)}</span>
                </div>
                <h2 id="atlas-modal-title" className="text-2xl sm:text-3xl font-black text-white">{activePlace.name}</h2>
              </div>
            </div>

            <div className="p-5 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0E0407] border border-white/10 print:hidden">
                {modalTabs.map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 min-w-[100px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-black inline-flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        activeTab === tab.id ? "bg-gradient-to-l from-emerald-700 to-emerald-900 text-white shadow-[0_0_20px_-4px_rgba(16,185,129,0.5)]" : "text-stone-400 hover:text-white"
                      }`}
                    >
                      <TabIcon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {activeTab === "history" && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-[#0E0407] p-4 space-y-1">
                      <span className="text-[11px] text-stone-400 block">التقدير السكاني</span>
                      <span className="text-sm font-black text-white flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-400" />{getPopulationLabel(activePlace)}</span>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#0E0407] p-4 space-y-1">
                      <span className="text-[11px] text-stone-400 block">الإحداثيات الجغرافية</span>
                      <span dir="ltr" className="text-xs font-mono font-bold text-[var(--gold)] block">{formatCoordinates(activePlace.coordinates)}</span>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#0E0407] p-4 space-y-1">
                      <span className="text-[11px] text-stone-400 block">المساحة / التوثيق</span>
                      <span className="text-sm font-black text-emerald-300 block">
                        {activePlace.areaKm2 !== undefined ? `${activePlace.areaKm2.toLocaleString("ar-EG")} كم²` : `${activePlace.landmarks.length} معالم تاريخية موثقة`}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-emerald-500/20 bg-[#0E0407]/90 p-5 space-y-2.5">
                    <h3 className="font-black text-base text-white flex items-center gap-2"><BookOpen className="w-4 h-4 text-emerald-400" />السياق والتوثيق التاريخي</h3>
                    <p className="text-sm text-stone-200 leading-relaxed">{activePlace.historicalSummary}</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--gold)]/25 bg-emerald-950/20 p-5 space-y-2">
                    <h3 className="font-black text-base text-[var(--gold)] flex items-center gap-2"><Compass className="w-4 h-4" />اشتهرت به تاريخياً</h3>
                    <p className="text-sm font-semibold text-emerald-200 leading-relaxed">{activePlace.famousFor}</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-[#0E0407] p-5 space-y-3 print:border-black/30 print:bg-white">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-stone-300 inline-flex items-center gap-1.5 print:text-black">
                        <Quote className="w-4 h-4 text-[var(--gold)]" />الاستشهاد التوثيقي القابل للطباعة
                      </span>
                      <button type="button" onClick={() => handleCopyCitation(activePlace)} className="px-3 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-bold text-[var(--gold)] inline-flex items-center gap-1.5 cursor-pointer print:hidden">
                        {citationCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{citationCopied ? "نُسخ الاقتباس" : "نسخ الاقتباس"}</span>
                      </button>
                    </div>
                    <blockquote className="text-xs text-stone-300 leading-relaxed border-r-2 border-[var(--gold)] pr-3 print:text-black">{buildCitationText(activePlace)}</blockquote>
                  </div>
                </div>
              )}

              {activeTab === "landmarks" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-base text-white flex items-center gap-2"><Landmark className="w-4 h-4 text-[var(--gold)]" />المعالم والآثار المسجلة في {activePlace.name}</h3>
                    <span className="text-xs text-emerald-300 font-bold">{activePlace.landmarks.length} معالم</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePlace.landmarks.map((lm, idx) => (
                      <div key={idx} className="rounded-2xl border border-emerald-500/20 bg-[#0E0407] p-4 flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-black flex items-center justify-center shrink-0">{(idx + 1).toLocaleString("ar-EG")}</span>
                        <span className="text-sm font-bold text-stone-100 leading-snug">{lm}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "news" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-sm sm:text-base text-white flex items-center gap-2"><Radio className="w-4 h-4 text-rose-500 animate-pulse" />التغطيات الإخبارية الجارية في قضاء {activePlace.district}</h3>
                    <span className="text-[11px] text-stone-400">مباشر من الأرشيف</span>
                  </div>
                  {loadingArticles ? (
                    <div className="p-6 rounded-2xl bg-[#0E0407] border border-white/10 text-xs text-stone-400 text-center">جاري جلب آخر التقارير الميدانية المرتبطة بالمنطقة...</div>
                  ) : placeArticles.length > 0 ? (
                    <div className="space-y-2.5">
                      {placeArticles.map((art) => (
                        <Link key={art.id} href={`/article/${art.slug}`} className="p-4 rounded-2xl border border-white/10 bg-[#0E0407] hover:border-emerald-400/50 transition-colors flex items-center justify-between gap-3 group">
                          <div className="min-w-0 space-y-1">
                            <span className="text-xs sm:text-sm font-bold block text-white group-hover:text-[var(--gold)] truncate">{art.titleAr}</span>
                            <span className="text-[11px] text-stone-400 block">{art.source?.nameAr || "مراسل الوطن"} · {new Date(art.publishedAt).toLocaleDateString("ar-EG")}</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-[var(--gold)] shrink-0" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-[#0E0407] border border-white/10 text-xs text-stone-400 text-center">لا توجد تطورات ميدانية عاجلة مسجلة في هذا القضاء حالياً. تغطياتنا مستمرة على مدار الساعة.</div>
                  )}
                </div>
              )}

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 print:hidden">
                <span className="text-[11px] text-stone-400">اضغط <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-stone-200">ESC</kbd> للإغلاق</span>
                <button type="button" onClick={() => setActivePlace(null)} className="px-6 py-2.5 rounded-2xl bg-gradient-to-l from-[#590018] to-emerald-900 border border-[var(--gold)]/40 text-white text-xs font-black cursor-pointer hover:brightness-110 transition-all">إغلاق النافذة</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}