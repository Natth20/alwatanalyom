"use client";

import { useState } from "react";
import { Search, Radio, ExternalLink, ShieldCheck, Tv } from "lucide-react";
import { ChannelCard } from "@awt/shared";

interface Props {
  channels: ChannelCard[];
}

export function LiveChannelsFilter({ channels }: Props) {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");

  const filteredChannels = channels.filter((ch) => {
    const matchesCategory =
      filter === "all" ||
      (filter === "arabic" && ch.category === "arabic") ||
      (filter === "international" && ch.category !== "arabic");

    const matchesSearch =
      !search.trim() ||
      ch.nameAr.toLowerCase().includes(search.toLowerCase()) ||
      (ch.nameEn && ch.nameEn.toLowerCase().includes(search.toLowerCase())) ||
      (ch.descriptionAr && ch.descriptionAr.toLowerCase().includes(search.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* شريط التصفية والبحث في القنوات */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filter === "all"
                ? "bg-[var(--primary)] text-white shadow-sm"
                : "border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            جميع القنوات ({channels.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("arabic")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filter === "arabic"
                ? "bg-[var(--primary)] text-white shadow-sm"
                : "border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            قنوات إخبارية عربية
          </button>
          <button
            type="button"
            onClick={() => setFilter("international")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filter === "international"
                ? "bg-[var(--primary)] text-white shadow-sm"
                : "border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            قنوات دولية معتمدة
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن قناة إخبارية..."
            className="w-full ps-9 pe-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
          />
        </div>
      </div>

      {/* شبكة القنوات */}
      {filteredChannels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChannels.map((channel) => (
            <div
              key={channel.id}
              className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between hover:border-[var(--primary)]/50 transition-all shadow-sm space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded">
                    {channel.category === "arabic" ? "قناة عربية" : "قناة دولية"}
                  </span>
                  <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>رابط رسمي محقق</span>
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center shrink-0 mt-0.5">
                    <Tv className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[var(--text)] leading-snug">
                      {channel.nameAr}
                    </h3>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono block">
                      {channel.nameEn}
                    </span>
                  </div>
                </div>

                {channel.descriptionAr && (
                  <p className="text-xs text-[var(--text-muted)] line-clamp-3 mt-3 leading-relaxed">
                    {channel.descriptionAr}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-[10px] text-[var(--text-muted)]">
                  {channel.countryCode ? `الدولة: ${channel.countryCode}` : "بث رسمي عالمي"}
                </span>

                <a
                  href={channel.officialSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Radio className="w-3 h-3 text-white animate-pulse" />
                  <span>مشاهدة البث الرسمي</span>
                  <ExternalLink className="w-3 h-3 ms-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] space-y-2">
          <Radio className="w-8 h-8 mx-auto opacity-30" />
          <p className="font-bold text-sm">لم نجد قنوات مطابقة لبحثك</p>
          <p className="text-xs">جرب البحث باسم آخر أو إزالة التصفية الحالية.</p>
        </div>
      )}
    </div>
  );
}
