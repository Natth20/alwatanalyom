"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArticleCard } from "@awt/shared";
import { Flame, Volume2, VolumeX, ChevronRight, ChevronLeft, Clock, ShieldCheck } from "lucide-react";

interface Props {
  articles: ArticleCard[];
}

function playBreakingPing() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {}
}

export function BreakingBar({ articles: initialArticles }: Props) {
  const [articles, setArticles] = useState<ArticleCard[]>(initialArticles);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const prevIdsRef = useRef<Set<string>>(new Set(initialArticles.map((a) => a.id)));

  useEffect(() => {
    try {
      const saved = localStorage.getItem("awt_breaking_sound");
      if (saved === "true") {
        setSoundEnabled(true);
      }
    } catch {}
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    try {
      localStorage.setItem("awt_breaking_sound", next.toString());
      if (next) {
        playBreakingPing();
      }
    } catch {}
  };

  useEffect(() => {
    // تحديث شريط الأخبار العاجلة دورياً كل 25 ثانية
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/v1/breaking");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.items) && data.items.length > 0) {
            const hasNew = data.items.some((item: ArticleCard) => !prevIdsRef.current.has(item.id));
            if (hasNew && soundEnabled) {
              playBreakingPing();
            }
            prevIdsRef.current = new Set(data.items.map((it: ArticleCard) => it.id));
            setArticles(data.items);
          }
        }
      } catch {}
    }, 25000);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  if (!articles || articles.length === 0) return null;

  return (
    <div className="relative bg-gradient-to-r from-[#3D0010] via-[#590018] to-[#3D0010] text-white text-xs font-semibold py-2 px-3 shadow-md border-b-2 border-[var(--gold)]/40 overflow-hidden z-30">
      {/* وميض جمالي خلفي خافت */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="container-custom flex items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          {/* شارة عاجل الملكية المستوحاة من كبرى القنوات الإخبارية */}
          <div className="flex items-center shrink-0">
            <span className="bg-gradient-to-r from-red-600 to-rose-600 text-white px-3 py-1 rounded-xl text-xs font-black shadow-md flex items-center gap-1.5 border border-red-400/40">
              <span className="w-2 h-2 rounded-full bg-white inline-block animate-ping" />
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>عاجل</span>
            </span>
          </div>

          {/* مسار الأخبار العاجلة المتحرك مع التوقف عند التحويم */}
          <div className="flex-1 overflow-hidden whitespace-nowrap py-0.5">
            <div className="ticker-track flex items-center gap-8">
              {articles.concat(articles).map((item, idx) => (
                <Link
                  key={`${item.id}-${idx}`}
                  href={`/article/${item.id}/${item.slug}`}
                  className="inline-flex items-center gap-2.5 text-white/95 hover:text-[var(--gold)] transition-colors group cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                  <span className="font-bold tracking-tight text-xs sm:text-sm group-hover:underline">
                    {item.titleAr}
                  </span>
                  {item.source && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/30 text-white/80 border border-white/10 shrink-0 font-medium">
                      {item.source.nameAr}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* أدوات التحكم في شريط العاجل: الصوت والأرشيف */}
        <div className="flex items-center gap-1.5 shrink-0 ps-2 border-s border-white/20">
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              soundEnabled
                ? "bg-[var(--gold)] text-[#26000A] border-[var(--gold)] shadow-xs"
                : "bg-black/30 border-white/20 text-white/70 hover:text-white hover:border-white/40"
            }`}
            title={soundEnabled ? "كتم التنبيه الصوتي للعاجل" : "تفعيل التنبيه الصوتي للخبر العاجل"}
            aria-label="تنبيه صوتي"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <Link
            href="/breaking"
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/30 hover:bg-black/50 border border-white/20 text-[11px] font-bold text-white hover:text-[var(--gold)] transition-colors"
          >
            <span>أرشيف العاجل</span>
            <ChevronLeft className="w-3 h-3 rtl:rotate-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
