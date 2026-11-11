"use client";

import { useState } from "react";
import { Radio, RefreshCw, Clock, Flame } from "lucide-react";




interface LiveUpdateItem {
  id: string;
  title?: string | null;
  bodyText: string;
  isUrgent: boolean;
  mediaUrl?: string | null;
  sourceName?: string | null;
  publishedAt: string;
}

interface LiveCoverageStreamProps {
  coverage: {
    id: string;
    title: string;
    summary?: string | null;
    streamUrl?: string | null;
    startedAt: string;
    updates: LiveUpdateItem[];
  };
}

export function LiveCoverageStream({ coverage }: LiveCoverageStreamProps) {
  const [updates, setUpdates] = useState<LiveUpdateItem[]>(coverage.updates);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/v1/live/${coverage.id}`);
      const data = await res.json();
      if (data.ok && data.updates) {
        setUpdates(data.updates);
      }
    } catch {}
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="space-y-8">
      {/* 1. الترويسة وبث الفيديو المباشر */}
      <div className="rounded-3xl border border-rose-600/30 bg-gradient-to-r from-rose-950/40 via-[var(--surface)] to-[var(--surface)] p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black animate-pulse">
                <Radio className="w-3.5 h-3.5 animate-spin" />
                <span>تغطية حية مستمرة</span>
              </span>
              <span className="text-xs text-[var(--text-muted)] font-semibold">
                دقيقة بدقيقة من قلب الحدث
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-[var(--text)] tracking-tight">
              {coverage.title}
            </h1>

            {coverage.summary && (
              <p className="text-xs md:text-sm text-[var(--text-muted)] leading-relaxed max-w-3xl">
                {coverage.summary}
              </p>
            )}
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[var(--surface-hover)] border border-[var(--border)] text-xs font-bold hover:border-[var(--primary)] text-[var(--text)] transition-all shadow-xs shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-rose-500" : ""}`} />
            <span>تحديث التغطية</span>
          </button>
        </div>

        {/* بث الفيديو المباشر إن وجد */}
        {coverage.streamUrl && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[var(--border)] bg-slate-950 shadow-md">
            <iframe
              src={coverage.streamUrl}
              title="Live Stream Broadcast"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        )}
      </div>

      {/* 2. الخط الزمني للتحديثات دقيقة بدقيقة (Timeline Stream) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <h2 className="text-xl font-black text-[var(--text)]">موجز التحديثات اللحظية</h2>
          </div>
          <span className="text-xs font-bold text-[var(--text-muted)]">
            {updates.length} تحديث موثق
          </span>
        </div>

        <div className="relative border-r-2 border-[var(--border)] mr-3 space-y-6 pr-6">
          {updates.map((update) => {
            const timeStr = new Date(update.publishedAt).toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={update.id}
                className="relative group transition-all"
              >
                {/* النقطة الزمنية على الخط */}
                <span
                  className={`absolute -right-[31px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--surface)] transition-transform group-hover:scale-125 ${
                    update.isUrgent ? "bg-rose-600 ring-4 ring-rose-500/20" : "bg-[var(--primary)]"
                  }`}
                />

                <div className={`p-5 rounded-2xl border transition-all ${
                  update.isUrgent
                    ? "border-rose-500/30 bg-rose-500/5 shadow-xs"
                    : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/40 shadow-xs"
                }`}>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-[var(--text-muted)]">
                        <Clock className="w-3 h-3" />
                        <span>{timeStr}</span>
                      </span>

                      {update.isUrgent && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[10px] font-black">
                          <Flame className="w-3 h-3 fill-current" />
                          <span>عاجل</span>
                        </span>
                      )}

                      {update.sourceName && (
                        <span className="text-[10px] font-bold text-[var(--primary)] px-2 py-0.5 rounded-md bg-[var(--primary)]/10">
                          {update.sourceName}
                        </span>
                      )}
                    </div>
                  </div>

                  {update.title && (
                    <h3 className="font-bold text-base text-[var(--text)] mb-2 leading-snug">
                      {update.title}
                    </h3>
                  )}

                  <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed font-normal">
                    {update.bodyText}
                  </p>

                  {update.mediaUrl && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-[var(--border)] max-h-80">
                      <img src={update.mediaUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

