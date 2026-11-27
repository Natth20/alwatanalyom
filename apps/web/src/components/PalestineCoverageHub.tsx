"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ArticleCard } from "@awt/shared";
import { MapPin, Flame, Landmark, Clock } from "lucide-react";

const TABS = [
  { key: "gaza", label: "غزة الصامدة", query: "غزة", icon: Flame, href: "/palestine/gaza" },
  { key: "jerusalem", label: "القدس الشريف", query: "القدس", icon: Landmark, href: "/palestine/jerusalem" },
  { key: "westbank", label: "الضفة الغربية", query: "الضفة", icon: MapPin, href: "/palestine/west-bank" },
] as const;

export function PalestineCoverageHub() {
  const [activeTab, setActiveTab] = useState<string>("gaza");
  const [articles, setArticles] = useState<ArticleCard[]>([]);
  const [loading, setLoading] = useState(true);

  const currentTab = TABS.find((t) => t.key === activeTab) || TABS[0];

  useEffect(() => {
    setLoading(true);
    fetch(`/api/v1/atlas/articles?place=${encodeURIComponent(currentTab.query)}&limit=4`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        setArticles(Array.isArray(data?.articles) ? data.articles : []);
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, [currentTab.query]);

  return (
    <section className="rounded-3xl border border-emerald-500/30 bg-[var(--surface)] p-6 space-y-5 shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
        <h3 className="font-black text-lg text-[var(--text)]">غرفة المتابعة الميدانية — فلسطين</h3>
        <div className="flex items-center gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-emerald-600 text-white"
                    : "bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="h-32 rounded-2xl bg-[var(--bg)] animate-pulse" />
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.map((art) => (
            <Link
              key={art.id}
              href={`/article/${art.id}/${art.slug}`}
              className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-emerald-500/50 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                <span className="font-bold text-emerald-500">{art.source?.nameAr || "الوطن اليوم"}</span>
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {new Date(art.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <h4 className="font-bold text-sm text-[var(--text)] line-clamp-2">{art.titleAr}</h4>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-xs text-[var(--text-muted)] py-6 text-center">
          تصفح قسم <Link href={currentTab.href} className="text-emerald-500 font-bold underline">{currentTab.label}</Link> للاطلاع على أحدث التغطيات.
        </p>
      )}
    </section>
  );
}
