"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ArticleCard } from "@awt/shared";
import { UserCircle2, Check, Bookmark, Sliders, Compass, Sparkles, Clock } from "lucide-react";

const TOPICS = [
  { id: "palestine", label: "فلسطين والميدان والقدس", desc: "التغطيات الميدانية وبلاغات غزة والضفة والقدس" },
  { id: "economy", label: "الذهب والعملات والاقتصاد", desc: "أسعار الأونصة، الشيكل والبورصة" },
  { id: "sports", label: "يلا سبورت والملاعب", desc: "نتائج المباريات والترتيب العالمي" },
  { id: "world", label: "الشؤون الدولية والدبلوماسية", desc: "قرارات مجلس الأمن والتحركات العالمية" },
  { id: "tech", label: "التقنية والذكاء الاصطناعي", desc: "أحدث ابتكارات البرمجيات والأمن السيبراني" },
  { id: "aid", label: "المساعدات والإغاثة والوظائف", desc: "البوابات الإغاثية الرسمية والفرص المهنية" },
];

export default function MyWatanPage() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["palestine", "economy"]);
  const [articles, setArticles] = useState<ArticleCard[]>([]);
  const [savedCount, setSavedCount] = useState(0);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("awt_user_topics");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) setSelectedTopics(parsed);
      }
      const saved = JSON.parse(localStorage.getItem("awt_saved_articles") || "[]");
      if (Array.isArray(saved)) setSavedCount(saved.length);
    } catch {}
  }, []);

  useEffect(() => {
    const activeSec = selectedTopics[0] || "palestine";
    Promise.all(
      selectedTopics.slice(0, 3).map((sec) =>
        fetch(`/api/v1/search?section=${encodeURIComponent(sec)}&limit=4`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null)
      )
    ).then((results) => {
      const merged: ArticleCard[] = [];
      const seen = new Set<string>();
      for (const res of results) {
        if (Array.isArray(res?.results)) {
          for (const item of res.results) {
            if (!seen.has(item.id)) {
              seen.add(item.id);
              merged.push(item);
            }
          }
        }
      }
      if (merged.length === 0 && activeSec) {
        fetch(`/api/v1/search?section=palestine&limit=6`)
          .then((r) => (r.ok ? r.json() : null))
          .then((d) => {
            if (Array.isArray(d?.results)) setArticles(d.results);
          })
          .catch(() => {});
      } else {
        setArticles(merged);
      }
    });
  }, [selectedTopics]);

  const toggleTopic = (id: string) => {
    const next = selectedTopics.includes(id)
      ? selectedTopics.filter((t) => t !== id)
      : [...selectedTopics, id];
    setSelectedTopics(next);
    try {
      localStorage.setItem("awt_user_topics", JSON.stringify(next));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    } catch {}
  };

  return (
    <div className="container-custom py-10 max-w-5xl space-y-10">
      <header className="rounded-3xl border border-[var(--gold)]/30 bg-gradient-to-l from-[#36000E] via-[#1C0108] to-[#0D0004] text-white p-7 md:p-9 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[var(--gold)] text-[#140106] flex items-center justify-center shadow-lg">
            <UserCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black">مساحتي الخاصة · وطني</h1>
            <p className="text-xs text-stone-300 mt-1">
              اختر الأقسام التي تهمك لتظهر أحدث تقاريرها الحية هنا مباشرة على جهازك.
            </p>
          </div>
        </div>

        <Link
          href="/saved"
          className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold flex items-center gap-2 shrink-0"
        >
          <Bookmark className="w-4 h-4 text-[var(--gold)]" />
          <span>مقروءاتي المحفوظة ({savedCount})</span>
        </Link>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-[var(--text)] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[var(--primary)]" />
            <span>اهتماماتي التحريرية</span>
          </h2>
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>تم حفظ تفضيلاتك محلياً</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {TOPICS.map((topic) => {
            const active = selectedTopics.includes(topic.id);
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => toggleTopic(topic.id)}
                className={`p-4 rounded-2xl border text-start transition-all cursor-pointer space-y-1 ${
                  active
                    ? "border-[var(--primary)] bg-[var(--primary)]/10 shadow-sm"
                    : "border-[var(--border)] bg-[var(--surface)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs text-[var(--text)]">{topic.label}</span>
                  {active && <Check className="w-4 h-4 text-[var(--primary)]" />}
                </div>
                <p className="text-[11px] text-[var(--text-muted)]">{topic.desc}</p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-black text-[var(--text)] flex items-center gap-2 border-b border-[var(--border)] pb-3">
          <Sparkles className="w-5 h-5 text-[var(--gold)]" />
          <span>موجزك الشخصي المباشر من الأقسام المختارة ({articles.length})</span>
        </h2>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((art) => (
              <Link
                key={art.id}
                href={`/article/${art.id}/${art.slug}`}
                className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)]/50 transition-all space-y-2"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-black text-[var(--primary)]">{art.sectionNameAr}</span>
                  <span className="text-[var(--text-muted)] font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(art.publishedAt).toLocaleDateString("ar-EG")}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[var(--text)] line-clamp-2 leading-snug">
                  {art.titleAr}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-center text-xs text-[var(--text-muted)]">
            <Compass className="w-6 h-6 mx-auto mb-2 opacity-60" />
            <span>اختر قسماً واحداً على الأقل لعرض الأخبار المخصصة لك.</span>
          </div>
        )}
      </section>
    </div>
  );
}
