"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArticleCard } from "@awt/shared";
import { ChevronLeft, Bell, BellOff } from "lucide-react";

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
        // نغمة تجريبية فورية لتأكيد التفعيل
        playBreakingPing();
      }
    } catch {}
  };

  useEffect(() => {
    // استطلاع دوري فوري لتحديث شريط الأخبار العاجلة كل 25 ثانية
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/v1/breaking");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.items) && data.items.length > 0) {
            // التحقق من وجود خبر جديد لم يكن موجوداً
            const hasNew = data.items.some((item: ArticleCard) => !prevIdsRef.current.has(item.id));
            if (hasNew && soundEnabled) {
              playBreakingPing();
            }
            prevIdsRef.current = new Set(data.items.map((it: ArticleCard) => it.id));
            setArticles(data.items);
          }
        }
      } catch {
        // تجاهل أخطاء الشبكة المؤقتة
      }
    }, 25000);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  if (!articles || articles.length === 0) return null;

  return (
    <div className="bg-[var(--breaking)] text-white text-sm font-medium py-2 px-4 shadow-sm border-b border-rose-700/30">
      <div className="container-custom flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          <span className="bg-white/20 text-white px-2.5 py-0.5 rounded text-xs font-black animate-pulse flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-white inline-block" />
            <span>عاجل</span>
          </span>

          <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
            {articles.map((item) => (
              <Link
                key={item.id}
                href={`/article/${item.id}/${item.slug}`}
                className="inline-flex items-center gap-2 hover:underline me-8 text-white/95 text-xs md:text-sm font-semibold transition-opacity hover:opacity-90"
              >
                <span>{item.titleAr}</span>
                {item.source && (
                  <span className="text-white/70 text-[11px] font-normal">
                    ({item.source.nameAr})
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* زر تفعيل التنبيه الصوتي للعاجل */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "إيقاف صوت تنبيه العاجل" : "تشغيل صوت تنبيه للعاجل"}
            className="p-1 rounded bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-colors text-xs flex items-center gap-1"
            aria-label="تنبيه صوتي للعاجل"
          >
            {soundEnabled ? (
              <>
                <Bell className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
                <span className="hidden sm:inline text-[11px] font-semibold text-amber-200">صوت العاجل</span>
              </>
            ) : (
              <>
                <BellOff className="w-3.5 h-3.5 opacity-70" />
                <span className="hidden sm:inline text-[11px] opacity-70">صامت</span>
              </>
            )}
          </button>

          <Link
            href="/breaking"
            className="text-xs text-white/90 hover:text-white underline underline-offset-2 flex items-center gap-1 font-bold"
          >
            <span>كل العاجل</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
