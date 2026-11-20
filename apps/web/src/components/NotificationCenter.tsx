"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Bell, Flame, ShieldCheck, Volume2, VolumeX, CheckCircle2, ChevronLeft, Radio, Sparkles } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  time: string;
  isBreaking?: boolean;
  section: string;
  slug: string;
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notifications: NotificationItem[] = [
    {
      id: "notif-1",
      title: "صمود المنظومة الصحية في شمال غزة ومناشدات دولية عاجلة لتأمين الوقود للمشافي",
      time: "منذ دقيقتين",
      isBreaking: true,
      section: "فلسطين والميدان",
      slug: "gaza-health-system-resilience",
    },
    {
      id: "notif-2",
      title: "أسعار الذهب تواصل الارتفاع القياسي عالمياً مع زيادة الطلب على الملاذات الآمنة",
      time: "منذ 15 دقيقة",
      isBreaking: false,
      section: "الاقتصاد والأسواق",
      slug: "gold-prices-record-highs",
    },
    {
      id: "notif-3",
      title: "رادار الحقيقة: تفنيد ادعاءات مضللة حول أزمة المحروقات في محافظات الضفة",
      time: "منذ 40 دقيقة",
      isBreaking: false,
      section: "رادار الحقيقة",
      slug: "fact-check-fuel-crisis-rumor",
    },
  ];

  // إغلاق النافذة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleEnablePush = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          setPushEnabled(true);
        }
      } catch {}
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* زر جرس الإشعارات الملكي */}
      <button
        onClick={handleToggle}
        className="relative p-2 sm:p-2.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)] text-[var(--text)] transition-all duration-300 shadow-2xs cursor-pointer group hover:scale-105 active:scale-95"
        title="مركز الإشعارات والتنبيهات المباشرة"
        aria-label="مركز الإشعارات"
      >
        <Bell className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-[var(--gold)] transition-colors" />

        {/* شارة عدد الإشعارات غير المقروءة النابضة */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -end-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-[9px] font-black shadow-md border-2 border-[var(--surface)] animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* لوحة مركز الإشعارات المنسدلة الزجاجية الفاخرة */}
      {isOpen && (
        <div className="absolute top-full end-0 mt-2.5 w-80 sm:w-96 rounded-3xl glass-hud p-4 text-white z-50 shadow-2xl animate-in fade-in slide-in-from-top-3 duration-250 border border-[var(--gold)]/30">
          {/* ترويسة اللوحة */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <h4 className="font-black text-sm text-[var(--gold)] tracking-wide">
                التنبيهات المباشرة وغرفة الأخبار
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                title={soundEnabled ? "كتم التنبيهات الصوتية" : "تفعيل التنبيهات الصوتية"}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[var(--gold)]" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* قائمة الإشعارات */}
          <div className="space-y-2.5 max-h-72 overflow-y-auto scrollbar-none">
            {notifications.map((item) => (
              <Link
                key={item.id}
                href={`/article/${item.id}/${item.slug}`}
                onClick={() => setIsOpen(false)}
                className="p-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 hover:border-[var(--gold)]/40 transition-all flex items-start gap-3 group block"
              >
                <div className="mt-0.5 shrink-0">
                  {item.isBreaking ? (
                    <span className="w-7 h-7 rounded-xl bg-red-600/30 border border-red-500/40 text-red-400 flex items-center justify-center shadow-xs">
                      <Flame className="w-3.5 h-3.5 fill-current" />
                    </span>
                  ) : (
                    <span className="w-7 h-7 rounded-xl bg-[var(--gold)]/20 border border-[var(--gold)]/40 text-[var(--gold)] flex items-center justify-center shadow-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px] text-white/50">
                    <span className="text-[var(--gold)] font-bold">{item.section}</span>
                    <span className="font-mono">{item.time}</span>
                  </div>
                  <p className="text-xs font-bold text-stone-100 group-hover:text-[var(--gold)] transition-colors line-clamp-2 leading-relaxed">
                    {item.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* زر تفعيل إشعارات المتصفح الفورية */}
          <div className="mt-3 pt-3 border-t border-white/10">
            {!pushEnabled ? (
              <button
                onClick={handleEnablePush}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#590018] to-[#730020] text-[var(--gold)] border border-[var(--gold)]/40 text-xs font-black hover:shadow-lg hover:shadow-[var(--gold-glow)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>تفعيل إشعارات المتصفح العاجلة</span>
              </button>
            ) : (
              <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-bold py-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>إشعارات المتصفح المباشرة مفعلة</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
