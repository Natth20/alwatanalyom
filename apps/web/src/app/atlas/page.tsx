"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Map,
  Search,
  MapPin,
  Filter,
  Users,
  Compass,
  Landmark,
  X,
  Share2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { PLACES, DISTRICTS, PalestinianPlace } from "@/data/atlas";

export default function AtlasPage() {
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("الكل");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "depopulated_1948" | "surviving" | "camp">("all");
  const [activePlace, setActivePlace] = useState<PalestinianPlace | null>(null);

  const filteredPlaces = PLACES.filter((place) => {
    const matchSearch =
      place.name.includes(search) ||
      place.famousFor.includes(search) ||
      place.district.includes(search);
    const matchDistrict =
      selectedDistrict === "الكل" || place.district === selectedDistrict;
    const matchStatus =
      selectedStatus === "all" || place.status === selectedStatus;
    return matchSearch && matchDistrict && matchStatus;
  });

  return (
    <div className="container-custom py-8 max-w-7xl">
      {/* Header */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 mb-8 text-center relative overflow-hidden shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[var(--bg)] border border-[var(--border)] text-[var(--primary)] mb-3">
          <Map className="w-3.5 h-3.5" />
          أطلس الهوية والجغرافيا · فلسطين التاريخية
        </div>
        <h1 className="text-2xl md:text-4xl font-black mb-3">
          أطلس القرى والبلدات الفلسطينية
        </h1>
        <p className="text-sm md:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
          دليل رقمي تفاعلي لحفظ أسماء، معالم، وتاريخ القرى والمدن الفلسطينية؛ الصامدة منها والمهجرة عام 1948، لتبقى الجغرافيا حية في الذاكرة والوجدان.
        </p>

        {/* Search Bar */}
        <div className="mt-6 max-w-xl mx-auto relative">
          <Search className="w-5 h-5 absolute right-4 top-3.5 text-[var(--text-muted)] pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث بالاسم أو القضاء (مثال: دير ياسين، المنشية، القدس، الشجاعية)..."
            className="w-full pr-12 pl-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-sm text-[var(--text)] focus:outline-none focus:border-[var(--primary)] shadow-sm"
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="space-y-3 mb-8">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="text-[var(--text-muted)] ml-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> الحالة:
          </span>
          <button
            onClick={() => setSelectedStatus("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedStatus === "all"
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
            }`}
          >
            الكل ({PLACES.length})
          </button>
          <button
            onClick={() => setSelectedStatus("depopulated_1948")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedStatus === "depopulated_1948"
                ? "bg-red-600 text-white"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
            }`}
          >
            مهجرة ومطهرة عام 1948
          </button>
          <button
            onClick={() => setSelectedStatus("surviving")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedStatus === "surviving"
                ? "bg-emerald-600 text-white"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
            }`}
          >
            صامدة ومأهولة
          </button>
          <button
            onClick={() => setSelectedStatus("camp")}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              selectedStatus === "camp"
                ? "bg-amber-600 text-white"
                : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
            }`}
          >
            مخيمات العودة
          </button>
        </div>

        {/* District Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
          <span className="text-[var(--text-muted)] ml-1 shrink-0">القضاء:</span>
          {DISTRICTS.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDistrict(d)}
              className={`px-3 py-1 rounded-lg shrink-0 transition-colors cursor-pointer ${
                selectedDistrict === d
                  ? "bg-[var(--text)] text-[var(--bg)] font-bold"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place) => (
          <article
            key={place.id}
            onClick={() => setActivePlace(place)}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden hover:border-[var(--primary)]/50 transition-all cursor-pointer group shadow-sm flex flex-col"
          >
            {/* Place Card Image */}
            <div className="relative h-44 w-full overflow-hidden bg-zinc-900">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-black tracking-wide text-white shadow-sm ${
                    place.status === "depopulated_1948"
                      ? "bg-red-600/90"
                      : place.status === "camp"
                      ? "bg-amber-600/90"
                      : "bg-emerald-600/90"
                  }`}
                >
                  {place.statusLabel}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 left-3 text-white">
                <span className="text-xs font-bold text-emerald-400 block mb-0.5">
                  قضاء {place.district}
                </span>
                <h2 className="text-lg font-black leading-snug drop-shadow-sm">{place.name}</h2>
              </div>
            </div>

            {/* Place Info Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <p className="text-xs text-[var(--text)] leading-relaxed line-clamp-3 mb-4">
                {place.historicalSummary}
              </p>

              <div className="space-y-2 pt-3 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[var(--primary)]" />
                    السكان:
                  </span>
                  <span className="font-bold text-[var(--text)]">
                    {place.population1948
                      ? `${place.population1948.toLocaleString()} (عام 1948)`
                      : place.populationCurrent}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Landmark className="w-3.5 h-3.5 text-[var(--primary)]" />
                    أبرز المعالم:
                  </span>
                  <span className="font-semibold text-[var(--text)] truncate max-w-[170px]">
                    {place.landmarks[0]}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-bold text-[var(--primary)]">
                <span>استعراض الذاكرة والوثائق الكاملة</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-[-3px] transition-transform" />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Place Detail Modal */}
      {activePlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 md:p-8">
            <button
              onClick={() => setActivePlace(null)}
              className="absolute top-4 left-4 p-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-[var(--primary)] block mb-1">
              أطلس فلسطين التاريخية · قضاء {activePlace.district}
            </span>
            <h2 className="text-2xl font-black text-[var(--text)] mb-3">{activePlace.name}</h2>

            <div className="mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-black text-white ${
                  activePlace.status === "depopulated_1948"
                    ? "bg-red-600"
                    : activePlace.status === "camp"
                    ? "bg-amber-600"
                    : "bg-emerald-600"
                }`}
              >
                {activePlace.statusLabel}
              </span>
            </div>

            <div className="rounded-xl overflow-hidden mb-6 h-56 bg-zinc-900">
              <img
                src={activePlace.image}
                alt={activePlace.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-[var(--text)] leading-relaxed">
              <div>
                <h3 className="font-black text-base text-[var(--text)] mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[var(--primary)]" />
                  السياق والتوثيق التاريخي:
                </h3>
                <p>{activePlace.historicalSummary}</p>
              </div>

              <div>
                <h3 className="font-black text-base text-[var(--text)] mb-1 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[var(--primary)]" />
                  اشتهرت به تاريخياً:
                </h3>
                <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {activePlace.famousFor}
                </p>
              </div>

              <div>
                <h3 className="font-black text-base text-[var(--text)] mb-2 flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-[var(--primary)]" />
                  المعالم والآثار المسجلة:
                </h3>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  {activePlace.landmarks.map((lm, idx) => (
                    <li key={idx}>{lm}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border)] flex justify-end">
              <button
                onClick={() => setActivePlace(null)}
                className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-bold cursor-pointer hover:bg-[var(--primary-hover)] transition-colors"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

