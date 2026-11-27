"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ArticleCard } from "@awt/shared";
import {
  MapPin,
  Radio,
  ShieldCheck,
  ExternalLink,
  Clock,
  Landmark,
  Flame,
  Navigation,
  ChevronLeft,
} from "lucide-react";

interface SectorMeta {
  id: string;
  queryPlace: string;
  name: string;
  subtitle: string;
  href: string;
  color: string;
}

const SECTORS: SectorMeta[] = [
  {
    id: "gaza",
    queryPlace: "غزة",
    name: "قطاع غزة الصامد",
    subtitle: "التغطية الميدانية والإنسانية المباشرة",
    href: "/palestine/gaza",
    color: "text-rose-400 border-rose-500/40 bg-rose-500/10",
  },
  {
    id: "jerusalem",
    queryPlace: "القدس",
    name: "القدس الشريف والأقصى",
    subtitle: "البلدة القديمة والمقدسات والتطورات اليومية",
    href: "/palestine/jerusalem",
    color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
  },
  {
    id: "west-bank",
    queryPlace: "الضفة",
    name: "الضفة الغربية والأغوار",
    subtitle: "نابلس، جنين، طولكرم، رام الله والخليل",
    href: "/palestine/west-bank",
    color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
  },
  {
    id: "khan-younis",
    queryPlace: "خان يونس",
    name: "خانيونس ورفح والوسطى",
    subtitle: "مناطق الإيواء والمعابر والخدمات",
    href: "/palestine/humanitarian",
    color: "text-sky-400 border-sky-500/40 bg-sky-500/10",
  },
];

const OFFICIAL_PORTALS = [
  {
    name: "مكتب الأمم المتحدة لتنسيق الشؤون الإنسانية (OCHA oPt)",
    desc: "التقارير الرسمية لحركة المعابر والإغاثة والاحتياجات الميدانية.",
    url: "https://www.ochaopt.org",
  },
  {
    name: "وكالة الأنباء والمعلومات الفلسطينية الرسمية (وفا)",
    desc: "البيانات الميدانية والقرارات الرسمية المعتمدة ساعة بساعة.",
    url: "https://www.wafa.ps",
  },
  {
    name: "جمعية الهلال الأحمر الفلسطيني (PRCS)",
    desc: "تقارير الطوارئ الطبية والإغاثية في قطاع غزة والضفة الغربية.",
    url: "https://www.palestinercs.org",
  },
];

export function LiveWarRoomMap() {
  const [selectedSectorId, setSelectedSectorId] = useState<string>("gaza");
  const [sectorArticles, setSectorArticles] = useState<ArticleCard[]>([]);
  const [loading, setLoading] = useState(true);

  const activeSector = SECTORS.find((s) => s.id === selectedSectorId) || SECTORS[0]!;

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/v1/atlas/articles?place=${encodeURIComponent(activeSector.queryPlace)}&limit=4`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (active) {
          setSectorArticles(Array.isArray(data?.articles) ? data.articles : []);
        }
      })
      .catch(() => {
        if (active) setSectorArticles([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [activeSector.queryPlace]);

  return (
    <section className="rounded-3xl border border-rose-500/25 bg-gradient-to-br from-[#120308] via-[#1b050d] to-[#0a0205] text-white p-6 md:p-8 shadow-2xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-black text-[var(--gold)]">
              غرفة المتابعة الجغرافية للمحافظات الفلسطينية
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">
            رصد الأخبار الميدانية حسب المحافظة والقطاع
          </h2>
          <p className="text-xs text-stone-400">
            استعراض فوري للتقارير الموثقة من قاعدة بيانات المنصة والروابط الأممية المعتمدة
          </p>
        </div>

        <Link
          href="/atlas"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-xs font-bold text-[var(--gold)] transition-colors shrink-0 self-start md:self-auto"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>تصفح أطلس فلسطين الكامل</span>
        </Link>
      </div>

      {/* أزرار المحافظات التفاعلية */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {SECTORS.map((sector) => {
          const isSelected = sector.id === activeSector.id;
          return (
            <button
              key={sector.id}
              type="button"
              onClick={() => setSelectedSectorId(sector.id)}
              className={`p-4 rounded-2xl border text-start transition-all cursor-pointer ${
                isSelected
                  ? "bg-white/10 border-[var(--gold)] shadow-lg"
                  : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <MapPin className={`w-4 h-4 ${isSelected ? "text-[var(--gold)]" : "text-stone-400"}`} />
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-stone-200">
                  تحديث حي
                </span>
              </div>
              <h3 className="font-black text-sm text-white">{sector.name}</h3>
              <p className="text-[10px] text-stone-400 mt-1 line-clamp-1">{sector.subtitle}</p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* أخبار المحافظة المختارة الحية */}
        <div className="lg:col-span-8 space-y-3 rounded-2xl border border-white/10 bg-black/35 p-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-black text-[var(--gold)] flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-400 animate-pulse" />
              <span>آخر التقارير الميدانية: {activeSector.name}</span>
            </h3>
            <Link href={activeSector.href} className="text-xs font-bold text-stone-300 hover:text-white flex items-center gap-1">
              <span>قسم {activeSector.name}</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : sectorArticles.length > 0 ? (
            <div className="divide-y divide-white/10">
              {sectorArticles.map((art) => (
                <article key={art.id} className="py-3.5 first:pt-1 last:pb-1 space-y-1.5 group">
                  <div className="flex items-center justify-between text-[10px] text-stone-400">
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {art.source?.nameAr || "الوطن اليوم"}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {new Date(art.publishedAt).toLocaleString("ar-EG", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-white group-hover:text-[var(--gold)] transition-colors leading-snug">
                    <Link href={`/article/${art.id}/${art.slug}`}>{art.titleAr}</Link>
                  </h4>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-stone-400">
              لا توجد برقيات جديدة مطابقة للوسم الجغرافي حالياً — تصفح قسم فلسطين لمتابعة أحدث الأخبار الشاملة.
            </div>
          )}
        </div>

        {/* المرجعيات الرسمية للمعابر والبيانات الإنسانية */}
        <div className="lg:col-span-4 space-y-3 rounded-2xl border border-white/10 bg-black/35 p-5">
          <h3 className="text-sm font-black text-emerald-400 flex items-center gap-2 border-b border-white/10 pb-3">
            <Landmark className="w-4 h-4" />
            <span>المصادر والجهات المرجعية</span>
          </h3>
          <div className="space-y-2.5">
            {OFFICIAL_PORTALS.map((p) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black text-white group-hover:text-[var(--gold)]">
                    {p.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">{p.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
