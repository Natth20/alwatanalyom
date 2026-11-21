"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Bell,
  Flame,
  ShieldCheck,
  Volume2,
  VolumeX,
  CheckCircle2,
  ChevronLeft,
  Radio,
  Sparkles,
  Send,
  Zap,
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  time: string;
  isBreaking?: boolean;
  section: string;
  slug: string;
}

// دالة توليد نغمة تنبيه صحفية فاخرة عبر Web Audio API بدون أي ملفات خارجية
function playNewsChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = "sine";
    osc2.type = "triangle";

    // نغمات كلاسيكية متناغمة (F5 ثم A5)
    osc1.frequency.setValueAtTime(698.46, ctx.currentTime);
    osc2.frequency.setValueAtTime(880.0, ctx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime + 0.08);

    osc1.stop(ctx.currentTime + 0.6);
    osc2.stop(ctx.currentTime + 0.6);
  } catch {}
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [testSent, setTestSent] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "art-breaking-gaza-aid",
      title: "عاجل: وصول أولى قوافل الإمدادات الطبية والوقود إلى مجمع الشفاء ومستشفيات شمال القطاع برعاية أممية",
      time: "منذ 5 دقائق",
      isBreaking: true,
      section: "فلسطين والميدان",
      slug: "urgent-convoy-enters-northern-gaza",
    },
    {
      id: "art-breaking-gold-record",
      title: "عاجل: الذهب يقفز لمستوى قياسي جديد متجاوزاً 2,850 دولاراً للأونصة وسط طلب استثماري هائل",
      time: "منذ 15 دقيقة",
      isBreaking: true,
      section: "الاقتصاد والأسواق",
      slug: "gold-breaks-historical-threshold-2026",
    },
    {
      id: "art-hero-jerusalem-wafa",
      title: "القدس وغزة تتصدران الأولويات: تحركات دبلوماسية مكثفة واجتماع طارئ لدعم صمود الهوية الفلسطينية",
      time: "منذ 40 دقيقة",
      isBreaking: false,
      section: "تغطيات خاصة",
      slug: "palestine-national-summit-and-resilience",
    },
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // التحقق من حالة إذن المتصفح للإشعارات عند التحميل
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        setPushEnabled(true);
      }
    }
  }, []);

  // جلب الأخبار العاجلة الحقيقية من API
  useEffect(() => {
    fetch("/api/v1/breaking")
      .then((res) => res.json())
      .then((data) => {
        const rawList = Array.isArray(data?.items) ? data.items : Array.isArray(data?.articles) ? data.articles : [];
        if (rawList.length > 0) {
          const fetched: NotificationItem[] = rawList.map((a: any) => ({
            id: a.id,
            title: a.titleAr,
            time: "مباشر الآن",
            isBreaking: true,
            section: a.sectionNameAr || "عاجل",
            slug: a.slug,
          }));
          setNotifications(fetched);
          setUnreadCount(fetched.length);
        }
      })
      .catch(() => {});
  }, []);

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
          if (soundEnabled) playNewsChime();
          new Notification("الوطن اليوم | تم تفعيل الإشعارات", {
            body: "ستتلقى الآن أهم الأخبار العاجلة لحظة بلحظة على جهازك.",
            icon: "/favicon.ico",
          });
        }
      } catch {}
    }
  };

  // إرسال تنبيه تجريبي حي للمتصفح والنغمة الصوتية
  const handleSendTestNotification = () => {
    if (soundEnabled) {
      playNewsChime();
    }

    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      new Notification("الوطن اليوم | عاجل فوري", {
        body: "وصول أولى قوافل الإمدادات الطبية والوقود إلى مجمع الشفاء ومشافي الشمال.",
        icon: "/favicon.ico",
      });
    }

    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
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
                {soundEnabled ? (
                  <Volume2 className="w-3.5 h-3.5 text-[var(--gold)]" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* قائمة الإشعارات الحية */}
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

          {/* أزرار التفاعل والإشعارات الحية */}
          <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
            {!pushEnabled ? (
              <button
                onClick={handleEnablePush}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#590018] to-[#730020] text-[var(--gold)] border border-[var(--gold)]/40 text-xs font-black hover:shadow-lg hover:shadow-[var(--gold-glow)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>تفعيل إشعارات المتصفح العاجلة</span>
              </button>
            ) : (
              <div className="flex items-center justify-between text-xs text-emerald-400 font-bold py-1 px-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>إشعارات المتصفح مفعلة بنجاح</span>
                </div>
                <button
                  onClick={handleSendTestNotification}
                  disabled={testSent}
                  className="text-[10px] bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                >
                  {testSent ? "تم البث!" : "اختبار إشعار"}
                </button>
              </div>
            )}

            {/* زر تجربة فوري إذا لم تكن مفعلة */}
            {!pushEnabled && (
              <button
                onClick={handleSendTestNotification}
                className="w-full py-1.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/10"
              >
                <Zap className="w-3 h-3 text-[var(--gold)]" />
                <span>{testSent ? "تم إصدار التنبيه الصوتي!" : "تجربة نغمة التنبيه العاجل"}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
