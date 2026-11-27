import Link from "next/link";
import { Metadata } from "next";
import { getHomeFeed, getActiveLiveCoverage } from "@/lib/dal";
import { Radio, MapPin, Globe2, HeartHandshake, ShieldCheck, Clock, ChevronLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "تغطية 360° الميدانية المتزامنة — الوطن اليوم",
  description: "متابعة حية ثلاثية الأبعاد للمشهد الفلسطيني والعربي والدولي: الميدان، الحراك السياسي والدبلوماسي، والملف الإنساني والاقتصادي.",
  alternates: { canonical: "/live-360" },
};

export default async function Live360Page() {
  const [feed, liveCoverages] = await Promise.all([
    getHomeFeed(),
    getActiveLiveCoverage(),
  ]);

  const fieldArticles = [
    ...feed.breaking,
    ...feed.palestineStories.flatMap((s) => s.articles),
  ].slice(0, 6);

  const geopoliticalArticles = [
    ...feed.arabWorldArticles,
    ...feed.worldArticles,
  ].slice(0, 6);

  const economySocialArticles = [
    ...feed.economyArticles,
    ...feed.fastStreamArticles.filter(
      (a) => a.sectionSlug === "aid" || a.sectionSlug === "jobs" || a.sectionSlug === "economy"
    ),
  ].slice(0, 6);

  const activeCover = liveCoverages;

  return (
    <div className="container-custom py-10 max-w-7xl space-y-10">
      {/* ترويسة غرفة العمليات 360 الفاخرة */}
      <header className="relative rounded-3xl overflow-hidden border border-rose-500/30 bg-gradient-to-br from-[#230109] via-[#130106] to-[#060002] text-white p-8 md:p-10 shadow-2xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600 text-white text-xs font-black shadow-lg">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>عدسة التغطية الشاملة 360° · بث متزامن</span>
          </div>

          <Link
            href="/live"
            className="inline-flex items-center gap-1.5 text-xs font-black text-[var(--gold)] hover:underline"
          >
            <span>غرفة البث الفضائي المباشر</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        <h1 className="text-3xl md:text-4xl font-black leading-tight">
          {activeCover?.title || "بانوراما الأحداث الثلاثية: الميدان والسياسة والاقتصاد لحظة بلحظة"}
        </h1>

        <p className="text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
          {activeCover?.summary ||
            "قراءة متكاملة تضع الحدث في إطاره الثلاثي الحقيقي عبر الربط المباشر بين التطورات الميدانية في فلسطين، التحركات الدولية، والواقع المعيشي والاقتصادي."}
        </p>

        {activeCover?.updates && activeCover.updates.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-2.5">
            <span className="text-xs font-black text-[var(--gold)] block">
              أحدث تحديثات غرفة المتابعة الحية:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeCover.updates.slice(0, 4).map((u: any) => (
                <div key={u.id} className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-stone-400">
                    <span className="font-bold text-rose-400">{u.sourceName || "مراسل الوطن"}</span>
                    <span className="font-mono">
                      {new Date(u.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-white leading-snug">{u.title || u.bodyText}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* الأعمدة الثلاثية المتوازية من البيانات الحية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* 1. العدسة الميدانية */}
        <section className="rounded-3xl border border-rose-500/30 bg-[var(--surface)] p-6 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <h2 className="font-black text-base text-[var(--text)] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>نبض الميدان وفلسطين ({fieldArticles.length})</span>
            </h2>
            <Link href="/palestine" className="text-[11px] font-bold text-rose-500 hover:underline">
              القسم ←
            </Link>
          </div>
          <div className="space-y-3">
            {fieldArticles.map((art) => (
              <Link
                key={art.id}
                href={`/article/${art.id}/${art.slug}`}
                className="block p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-rose-500/40 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                  <span className="font-bold text-rose-500">{art.source?.nameAr || "الوطن اليوم"}</span>
                  <span className="font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(art.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-[var(--text)] leading-snug line-clamp-2">
                  {art.titleAr}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* 2. العدسة الدبلوماسية والدولية */}
        <section className="rounded-3xl border border-indigo-500/30 bg-[var(--surface)] p-6 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <h2 className="font-black text-base text-[var(--text)] flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-indigo-500" />
              <span>التحرك السياسي والدولي ({geopoliticalArticles.length})</span>
            </h2>
            <Link href="/world" className="text-[11px] font-bold text-indigo-500 hover:underline">
              القسم ←
            </Link>
          </div>
          <div className="space-y-3">
            {geopoliticalArticles.map((art) => (
              <Link
                key={art.id}
                href={`/article/${art.id}/${art.slug}`}
                className="block p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-indigo-500/40 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                  <span className="font-bold text-indigo-500">{art.source?.nameAr || "دولي"}</span>
                  <span className="font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(art.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-[var(--text)] leading-snug line-clamp-2">
                  {art.titleAr}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. العدسة الاقتصادية والمعيشية */}
        <section className="rounded-3xl border border-emerald-500/30 bg-[var(--surface)] p-6 space-y-4 shadow-md">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <h2 className="font-black text-base text-[var(--text)] flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-emerald-500" />
              <span>البُعد الاقتصادي والإغاثي ({economySocialArticles.length})</span>
            </h2>
            <Link href="/economy" className="text-[11px] font-bold text-emerald-500 hover:underline">
              القسم ←
            </Link>
          </div>
          <div className="space-y-3">
            {economySocialArticles.map((art) => (
              <Link
                key={art.id}
                href={`/article/${art.id}/${art.slug}`}
                className="block p-3.5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-emerald-500/40 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                  <span className="font-bold text-emerald-500 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    {art.source?.nameAr || "اقتصاد"}
                  </span>
                  <span className="font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(art.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-[var(--text)] leading-snug line-clamp-2">
                  {art.titleAr}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
