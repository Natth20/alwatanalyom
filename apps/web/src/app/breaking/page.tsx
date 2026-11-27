import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity, AlertTriangle, ArrowLeft, CheckCircle2, ChevronLeft, Clock,
  Crosshair, Eye, FileCheck2, Flame, Globe, Home, Layers, MapPin,
  Radar, Radio, ShieldCheck, Signal, Siren, Zap,
} from "lucide-react";
import { OFFICIAL_SOCIAL_LINKS } from "@awt/shared";
import type { ArticleCard } from "@awt/shared";
import { getActiveBreaking } from "@/lib/dal";
import { resolveEditorialImage } from "@/lib/editorial-images";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "غرفة العمليات العاجلة — شريط العواجل والتحديثات الفورية | الوطن اليوم",
  description: "متابعة لحظية من غرفة العمليات الإخبارية للأخبار العاجلة والتطورات الميدانية في فلسطين والعالم بمصادرها الأصلية الموثقة.",
  alternates: { canonical: "/breaking" },
  openGraph: {
    title: "غرفة العمليات العاجلة — الوطن اليوم",
    description: "بث ميداني موثق ولحظي لأهم التطورات والأخبار العاجلة في غزة والقدس والضفة الغربية والعالم.",
    type: "website",
    locale: "ar_AR",
    url: "https://alwatantoday.net/breaking",
    siteName: "الوطن اليوم",
  },
  twitter: {
    card: "summary_large_image",
    title: "غرفة العمليات العاجلة — الوطن اليوم",
    description: "متابعة لحظية للأخبار العاجلة والتطورات الميدانية بمصادرها الأصلية الموثقة.",
  },
};

interface GeographicSector {
  readonly id: string;
  readonly label: string;
  readonly sectorCode: string;
  readonly isLocal: boolean;
}

interface VerificationPillar {
  readonly step: string;
  readonly title: string;
  readonly description: string;
}

const GEOGRAPHIC_SECTORS: readonly GeographicSector[] = [
  { id: "gaza", label: "غزة", sectorCode: "SEC-GZ", isLocal: true },
  { id: "jerusalem", label: "القدس", sectorCode: "SEC-JQ", isLocal: true },
  { id: "west-bank", label: "الضفة الغربية", sectorCode: "SEC-WB", isLocal: true },
  { id: "regional", label: "إقليمي", sectorCode: "SEC-RG", isLocal: false },
  { id: "international", label: "دولي", sectorCode: "SEC-GL", isLocal: false },
] as const;

const VERIFICATION_PILLARS: readonly VerificationPillar[] = [
  {
    step: "01",
    title: "الالتقاط من المصدر الأولي",
    description: "تستقبل غرفة المتابعة الإشارات العاجلة مباشرة من الوكالات الرسمية والمراسلين الميدانيين وغرف الطوارئ المعتمدة دون وسائط مجهولة.",
  },
  {
    step: "02",
    title: "مطابقة التوقيت والإحداثيات",
    description: "يخضع كل بلاغ عاجل لفحص زمني وجغرافي دقيق للتحقق من تزامنه مع الحدث الميداني واستبعاد المقاطع أو التصريحات المعاد تدويرها.",
  },
  {
    step: "03",
    title: "التدقيق التحريري المزدوج",
    description: "يراجع محررو غرفة الأخبار الصياغة الخبرية قبل بثها لتجريدها من المبالغات أو الشائعات مع إظهار اسم المصدر الأصلي بوضوح.",
  },
  {
    step: "04",
    title: "الشفافية والتحديث المستمر",
    description: "تبقى البطاقة الإخبارية مرتبطة بملفها الكامل وسجل التعديلات فور ورود معطيات ميدانية أحدث، التزاماً بميثاق النزاهة المهنية.",
  },
] as const;

const WAR_ROOM_THEME_VARS: Record<`--${string}`, string> = {
  "--bg": "#0E0407",
  "--surface": "#16060B",
  "--text": "#FBF7F8",
  "--text-muted": "#BDA9B0",
  "--border": "rgba(225, 29, 72, 0.24)",
  "--primary": "#590018",
  "--gold": "#f5b900",
};

function formatElapsedArabic(publishedIso: string, referenceDate: Date): string {
  const publishedMs = new Date(publishedIso).getTime();
  if (Number.isNaN(publishedMs)) return "تحديث حديث";
  const diffSeconds = Math.max(0, Math.floor((referenceDate.getTime() - publishedMs) / 1000));
  if (diffSeconds < 60) return "منذ لحظات";
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes === 1) return "منذ دقيقة واحدة";
  if (diffMinutes === 2) return "منذ دقيقتين";
  if (diffMinutes <= 10) return `منذ ${diffMinutes} دقائق`;
  if (diffMinutes < 60) return `منذ ${diffMinutes} دقيقة`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours === 1) return "منذ ساعة";
  if (diffHours === 2) return "منذ ساعتين";
  if (diffHours <= 10) return `منذ ${diffHours} ساعات`;
  if (diffHours < 24) return `منذ ${diffHours} ساعة`;
  const diffDays = Math.floor(diffHours / 24);
  return diffDays === 1 ? "منذ يوم واحد" : `منذ ${diffDays} أيام`;
}

function formatServerClock(date: Date): { clock: string; fullDate: string } {
  const clock = date.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Asia/Jerusalem" });
  const fullDate = date.toLocaleDateString("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Jerusalem" });
  return { clock, fullDate };
}

function getDispatchTier(index: number): { label: string; badgeStyle: string } {
  if (index === 0) {
    return {
      label: "أولوية قصوى · أحدث إشارة",
      badgeStyle: "bg-red-600/20 text-rose-300 border-red-500/40 shadow-[0_0_15px_rgba(220,38,38,0.28)]",
    };
  }
  return {
    label: "بث ميداني عاجل",
    badgeStyle: "bg-[#590018]/60 text-[var(--gold)] border-[var(--gold)]/30",
  };
}

export default async function BreakingPage() {
  const fetchedAt = new Date();
  const breakingNews: ArticleCard[] = await getActiveBreaking();
  const { clock: serverClock, fullDate: serverDate } = formatServerClock(fetchedAt);

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "الوطن اليوم",
    alternateName: "Al-Watan Al-Youm",
    url: "https://alwatantoday.net",
    logo: "https://alwatantoday.net/brand/logo-banner.jpg",
    mainEntityOfPage: { "@type": "WebPage", "@id": "https://alwatantoday.net/breaking", name: "غرفة العمليات العاجلة — الوطن اليوم" },
    sameAs: [
      OFFICIAL_SOCIAL_LINKS.facebook,
      OFFICIAL_SOCIAL_LINKS.twitter,
      OFFICIAL_SOCIAL_LINKS.instagram,
      OFFICIAL_SOCIAL_LINKS.telegram,
      OFFICIAL_SOCIAL_LINKS.youtube,
      OFFICIAL_SOCIAL_LINKS.tumblr,
    ],
    publishingPrinciples: "https://alwatantoday.net/editorial-policy",
    correctionsPolicy: "https://alwatantoday.net/corrections",
    diversityPolicy: "https://alwatantoday.net/sources-policy",
    ethicsPolicy: "https://alwatantoday.net/editorial-policy",
  };

  return (
    <div dir="rtl" style={WAR_ROOM_THEME_VARS as CSSProperties} className="relative min-h-screen bg-[#0E0407] text-[var(--text)] overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />

      {/* الإضاءة المحيطية وشبكة غرفة العمليات */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(225,29,72,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(225,29,72,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 start-1/2 -translate-x-1/2 w-[780px] h-[420px] rounded-full bg-red-600/15 blur-[130px]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 end-0 w-[520px] h-[360px] rounded-full bg-[#590018]/30 blur-[120px]" />

      <div className="container-custom relative z-10 py-8 md:py-10 max-w-5xl mx-auto space-y-8">
        {/* شريط التنقل الهرمي (Breadcrumb) */}
        <nav aria-label="مسار التنقل" className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rose-600/20 bg-[#16060B]/80 backdrop-blur-md px-4 py-2.5 text-xs">
          <ol className="flex items-center gap-2 text-[var(--text-muted)]">
            <li>
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-[var(--gold)] transition-colors font-semibold">
                <Home className="w-3.5 h-3.5 text-rose-500" />
                <span>الرئيسية</span>
              </Link>
            </li>
            <li aria-hidden="true"><ChevronLeft className="w-3.5 h-3.5 text-rose-500/60" /></li>
            <li className="inline-flex items-center gap-1.5 text-rose-400 font-black">
              <Siren className="w-3.5 h-3.5" />
              <span>غرفة العمليات العاجلة</span>
            </li>
          </ol>
          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-muted)]">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SSR LIVE FEED</span>
          </div>
        </nav>

        {/* الترويسة الدرامية الفاخرة لغرفة العمليات (WAR ROOM HERO) */}
        <section className="relative rounded-3xl overflow-hidden border border-red-600/35 bg-gradient-to-br from-[#16060B] via-[#0E0407] to-[#2B000C] p-6 sm:p-8 md:p-10 shadow-[0_30px_80px_-20px_rgba(220,38,38,0.28)]">
          {/* الرادار المتحرك بالخلفية عبر CSS فقط */}
          <div aria-hidden="true" className="pointer-events-none absolute -end-20 -top-20 sm:-end-12 sm:-top-16 w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center opacity-55">
            <span className="absolute inset-0 rounded-full border border-red-600/20" />
            <span className="absolute inset-8 rounded-full border border-rose-600/25" />
            <span className="absolute inset-16 rounded-full border border-red-500/30 animate-pulse" />
            <span className="absolute inset-24 rounded-full border border-[var(--gold)]/20" />
            <span className="absolute inset-14 rounded-full border border-red-500/40 animate-ping [animation-duration:3.4s]" />
            <span
              className="absolute inset-2 rounded-full animate-[spin_10s_linear_infinite]"
              style={{ background: "conic-gradient(from 0deg, rgba(220,38,38,0.38) 0deg, rgba(225,29,72,0.12) 48deg, transparent 90deg, transparent 360deg)" }}
            />
            <span className="relative w-3 h-3 rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.95)]" />
          </div>

          <div className="relative z-10 space-y-7">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-red-600/20 pb-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-red-600/15 border border-red-500/40 text-rose-300 text-xs font-black tracking-wide">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-80" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
                  </span>
                  <span>مباشر · غرفة الإنذار والتحقق الفوري</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#590018]/70 border border-[var(--gold)]/30 text-[var(--gold)] text-[11px] font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>آخر تحديث من الخادم:</span>
                  <time dateTime={fetchedAt.toISOString()} className="font-mono font-black text-white">{serverClock}</time>
                </span>
              </div>

              <div className="flex items-center gap-3 self-start lg:self-auto">
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-gradient-to-l from-red-600 via-rose-600 to-[#590018] text-white text-xs sm:text-sm font-black border border-rose-400/40 shadow-[0_0_32px_rgba(225,29,72,0.55)]">
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>{breakingNews.length > 0 ? `${breakingNews.length} عواجل نشطة الآن` : "0 عواجل نشطة · تأهب دائم"}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[var(--gold)]/90">
                  <Crosshair className="w-3.5 h-3.5 text-rose-500" />
                  <span>{serverDate} · توقيت القدس المحتلة</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.18]">
                  غرفة العمليات <span className="bg-gradient-to-l from-red-500 via-rose-400 to-[var(--gold)] bg-clip-text text-transparent">العاجلة</span> والرصد الميداني
                </h1>
                <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl leading-relaxed">
                  منصة قيادة إخبارية عالية الحساسية تتابع التدفق الميداني العاجل لحظة بلحظة في غزة، القدس الشريف، الضفة الغربية، والساحتين الإقليمية والدولية عبر مصادر موثقة.
                </p>
              </div>

              <div className="lg:col-span-4 rounded-2xl border border-rose-500/25 bg-[#0E0407]/75 backdrop-blur-md p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--text-muted)] font-semibold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-rose-500" />
                    <span>حالة الرادار التحريري</span>
                  </span>
                  <span className="text-emerald-400 font-black">نشط 24/7</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-l from-red-600 via-rose-500 to-[var(--gold)] animate-pulse" />
                </div>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">تُعرض البرقيات الموثقة زمنياً من الأحدث مع ربط مباشر بالمصدر الأصلي وتفاصيل الحدث.</p>
              </div>
            </div>

            {/* شارات القطاعات الجغرافية الزخرفية (SSR Decorative Badges) */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <span className="text-[11px] font-bold text-[var(--text-muted)] inline-flex items-center gap-1.5 me-1">
                <Layers className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>نطاقات الرصد الميداني:</span>
              </span>
              {GEOGRAPHIC_SECTORS.map((sector) => (
                <span key={sector.id} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border border-rose-600/25 bg-[#16060B]/90 text-xs font-bold text-stone-200 shadow-xs">
                  {sector.isLocal ? <MapPin className="w-3.5 h-3.5 text-rose-500" /> : <Globe className="w-3.5 h-3.5 text-[var(--gold)]" />}
                  <span>{sector.label}</span>
                  <span className="font-mono text-[10px] text-rose-400/80 border-s border-white/10 ps-2">{sector.sectorCode}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* شريط العنوان الفرعي لتدفق البرقيات */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-2xl bg-red-600/15 border border-red-600/35 flex items-center justify-center text-rose-400">
              <Flame className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">تدفق البلاغات العاجلة الموثقة</h2>
              <p className="text-xs text-[var(--text-muted)]">مرتبة تنازلياً حسب توقيت النشر المعتمد في قاعدة البيانات</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#16060B] border border-[var(--border)] text-[11px] font-bold text-[var(--gold)]">
            <Signal className="w-3.5 h-3.5 text-rose-500" />
            <span>معيار النزاهة: لا خبر بلا مصدر</span>
          </span>
        </div>

        {/* قائمة بطاقات الأخبار العاجلة أو حالة الفراغ */}
        {breakingNews.length > 0 ? (
          <div className="space-y-6">
            {breakingNews.map((news, idx) => {
              const publishDate = new Date(news.publishedAt);
              const timeStr = publishDate.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jerusalem" });
              const elapsedStr = formatElapsedArabic(news.publishedAt, fetchedAt);
              const newsImg = resolveEditorialImage(news);
              const tier = getDispatchTier(idx);

              return (
                <article
                  key={news.id}
                  className="group relative rounded-3xl overflow-hidden border border-rose-600/25 bg-[#16060B]/85 backdrop-blur-xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] hover:border-rose-500/65 hover:shadow-[0_28px_70px_-18px_rgba(225,29,72,0.32)] transition-all duration-300"
                >
                  <div aria-hidden="true" className="absolute inset-y-0 start-0 w-1.5 z-20 bg-gradient-to-b from-red-600 via-rose-600 to-[#590018]" />
                  <div className="p-4 sm:p-6 ps-5 sm:ps-7 space-y-5">
                    <Link href={`/article/${news.id}/${news.slug}`} className="relative block w-full h-56 sm:h-64 md:h-72 rounded-2xl overflow-hidden border border-white/10 bg-[#0E0407]">
                      <img src={newsImg} alt={news.titleAr} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading={idx === 0 ? "eager" : "lazy"} />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0E0407] via-[#0E0407]/45 to-transparent" />
                      <div className="absolute top-3 start-3 end-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-red-600 text-white text-[11px] font-black shadow-[0_0_20px_rgba(220,38,38,0.65)]">
                          <Zap className="w-3.5 h-3.5" />
                          <span>عاجل</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-[#0E0407]/85 backdrop-blur-md border border-[var(--gold)]/35 text-[var(--gold)] text-[11px] font-bold">
                          <span>{news.sectionNameAr}</span>
                        </span>
                      </div>
                      <div className="absolute bottom-3 start-3 end-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl border text-[11px] font-black backdrop-blur-md ${tier.badgeStyle}`}>
                          <Radio className="w-3 h-3" />
                          <span>{tier.label}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-[#16060B]/90 backdrop-blur-md border border-rose-500/30 text-rose-300 text-[11px] font-bold">
                          <Clock className="w-3.5 h-3.5 text-rose-500" />
                          <span>{elapsedStr}</span>
                          <span className="text-white/30">·</span>
                          <time dateTime={news.publishedAt} className="font-mono text-white">{timeStr}</time>
                        </span>
                      </div>
                    </Link>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2.5 text-xs">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>مصدر موثق: {news.source?.nameAr || "وكالة معتمدة"}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-[#590018]/45 border border-rose-500/25 text-stone-200 font-semibold">
                          <Eye className="w-3.5 h-3.5 text-[var(--gold)]" />
                          <span>تغطية ميدانية مباشرة</span>
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-[var(--text-muted)]">#{String(idx + 1).padStart(2, "0")}</span>
                    </div>

                    <div className="space-y-2.5">
                      <h3 className="text-xl sm:text-2xl font-black text-white leading-snug group-hover:text-rose-400 transition-colors">
                        <Link href={`/article/${news.id}/${news.slug}`}>{news.titleAr}</Link>
                      </h3>
                      {news.summaryAr && <p className="text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3">{news.summaryAr}</p>}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>مفحوص ومرتبط بملف المصدر الأصلي</span>
                      </div>
                      <Link href={`/article/${news.id}/${news.slug}`} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-l from-[#590018] to-red-700 hover:from-red-600 hover:to-rose-600 text-white border border-[var(--gold)]/30 hover:border-rose-400/60 text-xs font-black transition-all shadow-md group/cta">
                        <span>تفاصيل الخبر والمصدر</span>
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover/cta:-translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* حالة الفراغ الأنيقة: الهدوء الذي يسبق العاصفة مع رادار CSS متحرك */
          <div className="relative rounded-3xl overflow-hidden border border-rose-600/25 bg-[#16060B]/90 backdrop-blur-xl p-8 sm:p-14 text-center shadow-2xl">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at center, rgba(220,38,38,0.14), transparent 68%)" }} />
            <div className="relative z-10 max-w-xl mx-auto space-y-6">
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-red-600/25" />
                <span className="absolute inset-4 rounded-full border border-rose-500/30 animate-ping [animation-duration:3s]" />
                <span className="absolute inset-8 rounded-full border border-[var(--gold)]/25 animate-pulse" />
                <span className="absolute inset-1 rounded-full animate-[spin_7s_linear_infinite]" style={{ background: "conic-gradient(from 0deg, rgba(225,29,72,0.35) 0deg, transparent 70deg, transparent 360deg)" }} />
                <div className="relative w-14 h-14 rounded-2xl bg-[#0E0407] border border-rose-500/40 flex items-center justify-center shadow-[0_0_25px_rgba(225,29,72,0.35)]">
                  <Radar className="w-7 h-7 text-rose-400" />
                </div>
              </div>
              <div className="space-y-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-[#590018]/60 border border-[var(--gold)]/30 text-[var(--gold)] text-[11px] font-black">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>الهدوء الذي يسبق العاصفة · وضع المراقبة الصامتة</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">لا توجد بلاغات عاجلة نشطة في هذه اللحظة</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  رادار غرفة العمليات يمسح تدفقات الوكالات المعتمدة والميدان الفلسطيني على مدار الساعة. فور تحقق أي تطور طارئ سيظهر هنا مباشرة مع توقيته ومصدره الموثق.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link href="/palestine" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-l from-[#590018] to-rose-700 text-white text-xs font-black border border-[var(--gold)]/30 hover:brightness-110 transition-all">
                  <span>تصفح تغطية فلسطين</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
                <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0E0407] border border-white/15 text-stone-200 hover:border-[var(--gold)]/50 hover:text-[var(--gold)] text-xs font-bold transition-all">
                  <span>العودة إلى الصفحة الرئيسية</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* قسم منهجية التحقق من الأخبار العاجلة (Methodology Footer) */}
        <footer className="rounded-3xl border border-[#590018]/70 bg-gradient-to-b from-[#16060B] to-[#0E0407] p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs font-black text-[var(--gold)]">
                <FileCheck2 className="w-4 h-4 text-rose-500" />
                <span>بروتوكول غرفة التحرير والأخبار العاجلة</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">كيف نتحقق من صحة الأخبار العاجلة قبل نشرها؟</h2>
            </div>
            <Link href="/how-we-aggregate" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#590018]/50 border border-[var(--gold)]/30 text-[var(--gold)] hover:bg-[#590018] text-xs font-bold transition-colors shrink-0 self-start sm:self-auto">
              <span>دليل منهجية الرصد</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VERIFICATION_PILLARS.map((pillar) => (
              <div key={pillar.step} className="rounded-2xl border border-rose-600/20 bg-[#0E0407]/85 p-4 space-y-2.5 hover:border-rose-500/45 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black px-2.5 py-1 rounded-xl bg-red-600/15 text-rose-400 border border-red-500/30">{pillar.step}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-sm font-black text-white">{pillar.title}</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
            <span>تلتزم منصة «الوطن اليوم» بسياسات التحرير والتصحيح المهني وحفظ حقوق الناشرين الأصليين.</span>
            <div className="flex flex-wrap items-center gap-4 font-semibold">
              <Link href="/editorial-policy" className="hover:text-[var(--gold)] transition-colors">السياسة التحريرية</Link>
              <Link href="/sources-policy" className="hover:text-[var(--gold)] transition-colors">سياسة المصادر</Link>
              <Link href="/corrections" className="hover:text-[var(--gold)] transition-colors">سجل التصويبات</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}