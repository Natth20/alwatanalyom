"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  UserCircle2,
  Bell,
  Bookmark,
  Flame,
  Settings,
  Mail,
  Volume2,
  Sparkles,
  Check,
  ShieldCheck,
  Sliders,
  Compass,
  ArrowRight,
} from "lucide-react";

const TOPICS = [
  { id: "palestine_urgent", label: "عواجل فلسطين وغزة", desc: "التطورات الميدانية وبلاغات الهلال الأحمر" },
  { id: "jerusalem_holy", label: "القدس والمسجد الأقصى", desc: "أخبار البلدة القديمة واقتحامات المستوطنين" },
  { id: "fact_check", label: "رادار الحقيقة ومكافحة الشائعات", desc: "تقارير الفحص الجنائي للأخبار والصور المزيفة" },
  { id: "economy_gold", label: "أسعار الذهب والعملات والبورصة", desc: "المؤشرات المالية وبورصة فلسطين والنفط" },
  { id: "history_today", label: "في مثل هذا اليوم والذاكرة", desc: "المحطات التاريخية والقرارات المصيرية" },
  { id: "tech_ai", label: "التقنية والابتكار والذكاء الاصطناعي", desc: "أحدث التطورات التقنية وحروب الرقمنة" },
];

export default function MyWatanPage() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "palestine_urgent",
    "jerusalem_holy",
    "fact_check",
  ]);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState("1.0");
  const [savedStreak, setSavedStreak] = useState(3);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("awt_user_preferences");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.topics) setSelectedTopics(parsed.topics);
        if (parsed.push !== undefined) setPushEnabled(parsed.push);
        if (parsed.email !== undefined) setEmailDigest(parsed.email);
        if (parsed.speed) setAudioSpeed(parsed.speed);
      }
      const streak = localStorage.getItem("awt_daily_streak");
      if (streak) setSavedStreak(parseInt(streak, 10));
    } catch {
      // LocalStorage fallback
    }
  }, []);

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    try {
      localStorage.setItem(
        "awt_user_preferences",
        JSON.stringify({
          topics: selectedTopics,
          push: pushEnabled,
          email: emailDigest,
          speed: audioSpeed,
        })
      );
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch {
      // LocalStorage fallback
    }
  };

  return (
    <div className="container-custom py-8 max-w-4xl">
      {/* Header */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 mb-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center text-2xl shadow-md font-black">
            وطني
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-[var(--text)]">مساحتي الخاصة · وطني</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
                مخصص لك
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              خصص تدفق الأخبار، التنبيهات الذكية، وسجل قراءاتك لتجربة فريدة تلائم اهتماماتك.
            </p>
          </div>
        </div>

        {/* Reader Stats */}
        <div className="flex items-center gap-4 text-xs font-bold shrink-0">
          <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-center">
            <span className="block text-amber-500 font-black text-base">🔥 {savedStreak}</span>
            <span className="text-[10px] text-[var(--text-muted)]">أيام متتالية</span>
          </div>
          <Link
            href="/saved"
            className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-center hover:border-[var(--primary)] transition-colors"
          >
            <span className="block text-[var(--primary)] font-black text-base">
              <Bookmark className="w-4 h-4 mx-auto inline" />
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">محفوظاتي</span>
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        {/* Section 1: Topics Preference */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <h2 className="text-base font-black text-[var(--text)] mb-1 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[var(--primary)]" />
            القطاعات والمواضيع المفضلة لديك
          </h2>
          <p className="text-xs text-[var(--text-muted)] mb-5">
            اختر المجالات التي ترغب في ظهورها أولاً في واجهتك الرئيسية وتلقي تنبيهاتها
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TOPICS.map((topic) => {
              const isSelected = selectedTopics.includes(topic.id);
              return (
                <div
                  key={topic.id}
                  onClick={() => toggleTopic(topic.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isSelected
                      ? "bg-[var(--bg)] border-[var(--primary)] shadow-sm"
                      : "bg-[var(--surface)] border-[var(--border)] opacity-60 hover:opacity-100"
                  }`}
                >
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text)] mb-0.5">{topic.label}</h3>
                    <p className="text-xs text-[var(--text-muted)]">{topic.desc}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? "bg-[var(--primary)] border-[var(--primary)] text-white"
                        : "border-[var(--border)]"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: Alert & Delivery Preferences */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <h2 className="text-base font-black text-[var(--text)] mb-1 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" />
            خيارات التنبيه والنشر
          </h2>
          <p className="text-xs text-[var(--text-muted)] mb-5">
            تحكم بطريقة استلام العواجل والملخصات اليومية
          </p>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text)]">إشعارات الويب الفورية (Web Push)</h3>
                  <p className="text-xs text-[var(--text-muted)]">إرسال التنبيهات للأخبار شديدة الأهمية على هاتفك مباشرة</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={pushEnabled}
                onChange={(e) => setPushEnabled(e.target.checked)}
                className="w-5 h-5 accent-[var(--primary)] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--text)]">النشرة البريدية اليومية (حصاد المساء)</h3>
                  <p className="text-xs text-[var(--text-muted)]">إرسال ملخص من 5 دقائق لأهم قضايا اليوم عبر البريد الإلكتروني</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                className="w-5 h-5 accent-[var(--primary)] cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Audio Preferences */}
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <h2 className="text-base font-black text-[var(--text)] mb-1 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-emerald-600" />
            سرعة الموجز الصوتي والبودكاست
          </h2>
          <p className="text-xs text-[var(--text-muted)] mb-4">
            تحديد السرعة الافتراضية لقراءة الأخبار والاستماع للموجز
          </p>

          <div className="flex items-center gap-3 text-xs font-bold">
            {["0.9", "1.0", "1.25", "1.5"].map((speed) => (
              <button
                key={speed}
                onClick={() => setAudioSpeed(speed)}
                className={`px-4 py-2 rounded-xl transition-colors cursor-pointer ${
                  audioSpeed === speed
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </section>

        {/* Save Bar */}
        <div className="flex items-center justify-between p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
          <span className="text-xs text-[var(--text-muted)] font-medium">
            يتم حفظ إعداداتك محلياً في متصفحك وتبقى فعالة في كل زيارة.
          </span>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            <span>{savedSuccess ? "تم حفظ التفضيلات!" : "حفظ التفضيلات"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
