"use client";

import { useState } from "react";
import { Search, Radio, ExternalLink, ShieldCheck, Tv, Play, Volume2, Globe, Sparkles } from "lucide-react";
import { ChannelCard } from "@awt/shared";

interface Props {
  channels: ChannelCard[];
}

export function LiveChannelsFilter({ channels }: Props) {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [activeChannel, setActiveChannel] = useState<ChannelCard | null>(channels[0] || null);

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
    <div className="space-y-8">
      {/* مشغل الشاشة الحية السينمائي (Featured Cinema Stream Player) */}
      {activeChannel && (
        <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white p-6 md:p-8 shadow-xl">
          <div className="absolute top-0 end-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>بث حي ومباشر على مدار الساعة</span>
                </span>
                <span className="text-xs text-slate-300 flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>بث موثق ومصرّح به رسمياً</span>
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                {activeChannel.nameAr}
                {activeChannel.nameEn && (
                  <span className="text-sm font-normal text-slate-300 ms-3 font-mono">
                    ({activeChannel.nameEn})
                  </span>
                )}
              </h2>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {activeChannel.descriptionAr ||
                  "تغطيات إخبارية متواصلة ونقل حي للأحداث الميدانية والتحليلات السياسية من استوديوهات البث الرسمية."}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                <span>الجودة: HD 1080p عالية الدقة</span>
                <span>•</span>
                <span>الصوت: ستيريو رقمي</span>
                <span>•</span>
                <span>التأخير: أقل من ثانية واحدة</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full lg:w-auto">
              <a
                href={activeChannel.officialSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>فتح مشغل البث المباشر</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* شريط التصفية والبحث في القنوات */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              filter === "all"
                ? "bg-[var(--primary)] text-white shadow-sm"
                : "border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            جميع القنوات الإخبارية ({channels.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("arabic")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              filter === "arabic"
                ? "bg-[var(--primary)] text-white shadow-sm"
                : "border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            القنوات العربية
          </button>
          <button
            type="button"
            onClick={() => setFilter("international")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              filter === "international"
                ? "bg-[var(--primary)] text-white shadow-sm"
                : "border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            القنوات الدولية المعتمدة
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute start-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن قناة إخبارية..."
            className="w-full ps-9 pe-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)] shadow-sm"
          />
        </div>
      </div>

      {/* شبكة القنوات */}
      {filteredChannels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChannels.map((channel) => {
            const isSelected = activeChannel?.id === channel.id;

            return (
              <div
                key={channel.id}
                onClick={() => setActiveChannel(channel)}
                className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 shadow-sm space-y-4 cursor-pointer ${
                  isSelected
                    ? "border-[var(--primary)] bg-[var(--primary)]/5 ring-2 ring-[var(--primary)]/20"
                    : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded">
                      {channel.category === "arabic" ? "قناة عربية" : "قناة دولية"}
                    </span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>رابط رسمي معتمد</span>
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm transition-colors ${
                        isSelected
                          ? "bg-[var(--primary)] text-white"
                          : "bg-[var(--primary)]/10 text-[var(--primary)]"
                      }`}
                    >
                      <Tv className="w-5 h-5" />
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
                    {channel.countryCode ? `الدولة: ${channel.countryCode}` : "بث رسمي دولي"}
                  </span>

                  <a
                    href={channel.officialSiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-3.5 py-1.5 rounded-lg bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Radio className="w-3 h-3 text-white animate-pulse" />
                    <span>مشاهدة البث</span>
                    <ExternalLink className="w-3 h-3 ms-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 text-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] space-y-3">
          <Radio className="w-10 h-10 mx-auto opacity-30" />
          <h3 className="font-bold text-base text-[var(--text)]">لم نجد قنوات مطابقة لبحثك</h3>
          <p className="text-xs">جرب البحث بكلمة أخرى أو إعادة ضبط التصفية.</p>
        </div>
      )}
    </div>
  );
}
