"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Bell, BellRing, Clock, Flame, CheckCheck, Sparkles } from "lucide-react";

interface AlertItem {
  id: string;
  slug: string;
  titleAr: string;
  sectionNameAr: string;
  publishedAt: string;
  isBreaking?: boolean;
}

function formatArabicRelative(iso: string): string {
  const diffMin = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 60000));
  if (diffMin < 1) return "الآن";
  if (diffMin < 60) return `منذ ${diffMin} دقيقة`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `منذ ${diffHr} ساعة`;
  return new Date(iso).toLocaleDateString("ar-EG", { month: "short", day: "numeric" });
}

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<AlertItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pushStatus, setPushStatus] = useState<"default" | "granted" | "denied">("default");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPushStatus(Notification.permission);
    }

    const fetchAlerts = async () => {
      try {
        const [brkRes, pulseRes] = await Promise.all([
          fetch("/api/v1/breaking").catch(() => null),
          fetch("/api/v1/pulse").catch(() => null),
        ]);

        const combined: AlertItem[] = [];
        const seen = new Set<string>();

        if (brkRes?.ok) {
          const brkData = await brkRes.json();
          const list = Array.isArray(brkData?.items) ? brkData.items : [];
          for (const it of list) {
            if (it?.id && !seen.has(it.id)) {
              seen.add(it.id);
              combined.push({
                id: it.id,
                slug: it.slug,
                titleAr: it.titleAr,
                sectionNameAr: it.sectionNameAr || "عاجل",
                publishedAt: it.publishedAt || new Date().toISOString(),
                isBreaking: true,
              });
            }
          }
        }

        if (pulseRes?.ok && combined.length < 6) {
          const pulseData = await pulseRes.json();
          const topics = Array.isArray(pulseData?.latestTopics) ? pulseData.latestTopics : [];
          for (const t of topics) {
            if (t?.id && !seen.has(t.id) && combined.length < 8) {
              seen.add(t.id);
              combined.push({
                id: t.id,
                slug: t.slug,
                titleAr: t.titleAr,
                sectionNameAr: t.sectionNameAr || "أخبار",
                publishedAt: t.publishedAt || new Date().toISOString(),
                isBreaking: Boolean(t.isBreaking),
              });
            }
          }
        }

        setItems(combined);
        setUnreadCount(combined.length);
      } catch {}
    };

    fetchAlerts();
    const timer = setInterval(fetchAlerts, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  const handleEnablePush = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    const res = await Notification.requestPermission();
    setPushStatus(res);
    if (res === "granted" && items[0]) {
      new Notification("الوطن اليوم · أحدث التنبيهات", {
        body: items[0].titleAr,
      });
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => {
          setOpen((prev) => !prev);
          setUnreadCount(0);
        }}
        className="relative w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-[var(--gold)]/50 text-white flex items-center justify-center transition-all cursor-pointer"
        aria-label="مركز التنبيهات الإخبارية"
        title="التنبيهات الإخبارية المباشرة"
      >
        {unreadCount > 0 ? (
          <BellRing className="w-4 h-4 text-[var(--gold)]" />
        ) : (
          <Bell className="w-4 h-4" />
        )}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -end-1 min-w-[17px] h-[17px] px-1 rounded-full bg-red-600 text-white text-[9px] font-black flex items-center justify-center shadow-md">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-full mt-2.5 end-0 w-80 sm:w-96 rounded-3xl bg-[#1A0209] border border-[var(--gold)]/30 shadow-2xl p-4 space-y-3 z-50 text-white backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--gold)]" />
              <span className="text-xs font-black">غرفة التنبيهات المباشرة</span>
            </div>
            {pushStatus !== "granted" && (
              <button
                type="button"
                onClick={handleEnablePush}
                className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/30 hover:bg-[var(--gold)]/25 transition-colors cursor-pointer"
              >
                تفعيل إشعارات المتصفح
              </button>
            )}
            {pushStatus === "granted" && (
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <CheckCheck className="w-3.5 h-3.5" />
                <span>مفعّل</span>
              </span>
            )}
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pe-1">
            {items.length > 0 ? (
              items.map((item) => (
                <Link
                  key={item.id}
                  href={`/article/${item.id}/${item.slug}`}
                  onClick={() => setOpen(false)}
                  className="block p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span
                      className={`font-black px-2 py-0.5 rounded-md flex items-center gap-1 ${
                        item.isBreaking
                          ? "bg-red-500/20 text-red-400"
                          : "bg-[var(--gold)]/15 text-[var(--gold)]"
                      }`}
                    >
                      {item.isBreaking && <Flame className="w-3 h-3" />}
                      <span>{item.sectionNameAr}</span>
                    </span>
                    <span className="text-white/50 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatArabicRelative(item.publishedAt)}</span>
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white leading-snug line-clamp-2">
                    {item.titleAr}
                  </p>
                </Link>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-white/60">
                لا توجد تنبيهات جديدة في هذه اللحظة — كافة البرقيات محدثة.
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-white/10 text-center">
            <Link
              href="/breaking"
              onClick={() => setOpen(false)}
              className="text-[11px] font-black text-[var(--gold)] hover:underline"
            >
              فتح مركز العواجل والبث اللحظي ←
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
