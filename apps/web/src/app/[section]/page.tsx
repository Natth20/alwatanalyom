import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getSectionFeed } from "@/lib/dal";
import { ArticleCard } from "@/components/ArticleCard";
import { TodayMatchesWidget } from "@/components/sports/TodayMatchesWidget";
import { YallaSportBanner } from "@/components/sports/YallaSportBanner";
import { LiveWarRoomMap } from "@/components/LiveWarRoomMap";
import { PalestineCommoditiesWidget } from "@/components/PalestineCommoditiesWidget";
import {
  Activity, ArrowUpLeft, Building2, ChevronLeft, Clock, Coins, Compass,
  Flame, Globe, Home, Landmark, Layers, MapPin, Newspaper, Radio,
  Scale, ShieldCheck, Sparkles, Trophy,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ section: string }>; }
interface SubSectionItem { readonly id: string; readonly slug: string; readonly nameAr: string; }
interface RegionalTag { readonly id: string; readonly nameAr: string; readonly subtitleAr: string; }
interface CapitalItem { readonly nameAr: string; readonly countryAr: string; }
interface AgencyBadge { readonly shortName: string; readonly fullName: string; readonly scopeAr: string; }
interface InstitutionItem { readonly nameAr: string; readonly cityAr: string; readonly roleAr: string; }

interface SectionTheme {
  readonly border: string;
  readonly bg: string;
  readonly accent: string;
  readonly badge: string;
  readonly pillHover: string;
  readonly glowDot: string;
  readonly descBox: string;
  readonly labelAr: string;
}

const SECTION_HERO_THEMES: Readonly<Record<string, SectionTheme>> = {
  palestine: {
    border: "border-emerald-500/35", bg: "bg-gradient-to-br from-[#062415]/45 via-[var(--surface)] to-[var(--surface)]", accent: "from-transparent via-emerald-400 to-transparent",
    badge: "text-emerald-400", pillHover: "hover:border-emerald-400/60 hover:text-emerald-400", glowDot: "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.85)]",
    descBox: "border-emerald-500/25 bg-emerald-950/15", labelAr: "غرفة التغطية الميدانية",
  },
  "arab-world": {
    border: "border-amber-500/40", bg: "bg-gradient-to-br from-[#2B1603]/45 via-[var(--surface)] to-[var(--surface)]", accent: "from-transparent via-amber-400 to-transparent",
    badge: "text-amber-400", pillHover: "hover:border-amber-400/60 hover:text-amber-400", glowDot: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.85)]",
    descBox: "border-amber-500/25 bg-amber-950/15", labelAr: "النطاق الإقليمي العربي",
  },
  world: {
    border: "border-sky-500/40", bg: "bg-gradient-to-br from-[#06182B]/45 via-[var(--surface)] to-[var(--surface)]", accent: "from-transparent via-sky-400 to-transparent",
    badge: "text-sky-400", pillHover: "hover:border-sky-400/60 hover:text-sky-400", glowDot: "bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.85)]",
    descBox: "border-sky-500/25 bg-sky-950/15", labelAr: "المشهد الدولي والمنظمات",
  },
  sports: {
    border: "border-emerald-500/35", bg: "bg-gradient-to-br from-[#06241A]/35 via-[var(--surface)] to-[var(--surface)]", accent: "from-transparent via-emerald-400 to-transparent",
    badge: "text-emerald-400", pillHover: "hover:border-emerald-400/60 hover:text-emerald-400", glowDot: "bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.85)]",
    descBox: "border-emerald-500/25 bg-emerald-950/15", labelAr: "البوابة الرياضية المباشرة",
  },
  economy: {
    border: "border-[#f5b900]/40", bg: "bg-gradient-to-br from-[#2B1E02]/35 via-[var(--surface)] to-[var(--surface)]", accent: "from-transparent via-[#f5b900] to-transparent",
    badge: "text-[#f5b900]", pillHover: "hover:border-[#f5b900]/60 hover:text-[#f5b900]", glowDot: "bg-[#f5b900] shadow-[0_0_12px_rgba(245,185,0,0.85)]",
    descBox: "border-[#f5b900]/25 bg-[#f5b900]/5", labelAr: "مرصد الأسواق والسلع",
  },
  tech: {
    border: "border-indigo-500/35", bg: "bg-gradient-to-br from-[#120A2E]/40 via-[var(--surface)] to-[var(--surface)]", accent: "from-transparent via-indigo-400 to-transparent",
    badge: "text-indigo-400", pillHover: "hover:border-indigo-400/60 hover:text-indigo-400", glowDot: "bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.85)]",
    descBox: "border-indigo-500/25 bg-indigo-950/15", labelAr: "منظومة التقنية والابتكار",
  },
  opinion: {
    border: "border-[var(--gold)]/40", bg: "bg-gradient-to-br from-[#241305]/35 via-[var(--surface)] to-[var(--surface)]", accent: "from-transparent via-[var(--gold)] to-transparent",
    badge: "text-[var(--gold)]", pillHover: "hover:border-[var(--gold)]/60 hover:text-[var(--gold)]", glowDot: "bg-[var(--gold)] shadow-[0_0_12px_var(--gold)]",
    descBox: "border-[var(--gold)]/25 bg-[var(--gold)]/5", labelAr: "المنبر التحليلي والرأي",
  },
};

const DEFAULT_THEME: SectionTheme = {
  border: "border-[var(--gold)]/30", bg: "bg-gradient-to-b from-[#590018]/15 via-[var(--surface)] to-[var(--surface)]",
  accent: "from-transparent via-[var(--gold)] to-transparent", badge: "text-[var(--gold)]",
  pillHover: "hover:border-[var(--gold)] hover:text-[var(--primary)]", glowDot: "bg-[var(--gold)] shadow-[0_0_12px_var(--gold)]",
  descBox: "border-[var(--gold)]/20 bg-[#590018]/5", labelAr: "التغطية التحريرية المعتمدة",
};

const ARAB_REGIONS: readonly RegionalTag[] = [
  { id: "mashreq", nameAr: "المشرق العربي", subtitleAr: "بلاد الشام والعراق ومصر" },
  { id: "gulf", nameAr: "الخليج", subtitleAr: "مجلس التعاون والجزيرة" },
  { id: "maghreb", nameAr: "شمال أفريقيا", subtitleAr: "المغرب العربي ووادي النيل" },
];

const ARAB_CAPITALS: readonly CapitalItem[] = [
  { nameAr: "القاهرة", countryAr: "مصر" }, { nameAr: "الرياض", countryAr: "السعودية" },
  { nameAr: "بغداد", countryAr: "العراق" }, { nameAr: "بيروت", countryAr: "لبنان" },
  { nameAr: "عمّان", countryAr: "الأردن" }, { nameAr: "الرباط", countryAr: "المغرب" },
];

const ARAB_AGENCIES: readonly AgencyBadge[] = [
  { shortName: "أ ش أ", fullName: "وكالة أنباء الشرق الأوسط", scopeAr: "مصر والمحيط الإقليمي" },
  { shortName: "واس", fullName: "وكالة الأنباء السعودية", scopeAr: "الخليج العربي والبيانات الرسمية" },
  { shortName: "بترا", fullName: "وكالة الأنباء الأردنية", scopeAr: "بلاد الشام والدبلوماسية" },
];

const WORLD_REGIONS: readonly RegionalTag[] = [
  { id: "europe", nameAr: "أوروبا", subtitleAr: "الاتحاد الأوروبي والعواصم الغربية" },
  { id: "north-america", nameAr: "أمريكا الشمالية", subtitleAr: "واشنطن وأوتاوا ومراكز القرار" },
  { id: "asia", nameAr: "آسيا", subtitleAr: "شرق وجنوب القارة والمحيط الهادئ" },
  { id: "africa", nameAr: "أفريقيا", subtitleAr: "القارة السمراء والقرن الأفريقي" },
];

const WORLD_INSTITUTIONS: readonly InstitutionItem[] = [
  { nameAr: "الأمم المتحدة", cityAr: "نيويورك · جنيف", roleAr: "مجلس الأمن والوكالات الأممية" },
  { nameAr: "محكمة العدل الدولية", cityAr: "لاهاي", roleAr: "الفصل في النزاعات بين الدول" },
  { nameAr: "الجنائية الدولية", cityAr: "لاهاي", roleAr: "الملاحقات القضائية الدولية" },
];

const WORLD_WIRES: readonly AgencyBadge[] = [
  { shortName: "Reuters", fullName: "رويترز", scopeAr: "برقيات سياسية واقتصادية" },
  { shortName: "AFP", fullName: "أ ف ب", scopeAr: "تغطيات ميدانية عالمية" },
  { shortName: "AP", fullName: "أسوشيتد برس", scopeAr: "أخبار عاجلة وتحقيقات" },
];

function RegionalStripBar(props: { title: string; regions: readonly RegionalTag[]; dotClass: string; chipBorderClass: string; titleClass: string; icon: ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">{props.icon}<span className={`text-xs font-black ${props.titleClass}`}>{props.title}</span></div>
      <div className="flex flex-wrap items-center gap-2.5">
        {props.regions.map((region) => (
          <div key={region.id} className={`px-4 py-2 rounded-2xl border ${props.chipBorderClass} bg-[#0E0407]/80 flex items-center gap-2`}>
            <span className={`w-2 h-2 rounded-full ${props.dotClass}`} />
            <span className="text-xs font-black text-white">{region.nameAr}</span>
            <span className="text-[11px] text-white/65 hidden sm:inline">· {region.subtitleAr}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SourcesBadgeBar(props: { label: string; sources: readonly AgencyBadge[]; labelClass: string; badgeClass: string; borderClass: string }) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t ${props.borderClass}`}>
      <div className={`flex items-center gap-2 text-xs font-black ${props.labelClass}`}><Radio className="w-4 h-4 text-[var(--gold)]" /><span>{props.label}</span></div>
      <div className="flex flex-wrap items-center gap-2.5">
        {props.sources.map((src) => (
          <div key={src.shortName} className={`px-3.5 py-2 rounded-2xl border ${props.badgeClass} flex items-center gap-2 text-xs`}>
            <span className="font-black text-[var(--gold)]">{src.fullName}</span>
            <span className="text-[10px] font-mono text-white/75">{src.shortName}</span>
            <span className="text-[10px] text-white/65 hidden sm:inline">· {src.scopeAr}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section: sectionSlug } = await params;
  const feed = await getSectionFeed(sectionSlug);
  if (!feed) return { title: "القسم غير موجود — الوطن اليوم" };

  return {
    title: `أخبار ${feed.section.nameAr} — الوطن اليوم`,
    description: feed.section.descriptionAr || `آخر الأخبار والتقارير والتغطيات المباشرة لقسم ${feed.section.nameAr} من مصادرها الأصلية.`,
    alternates: { canonical: `/${sectionSlug}` },
  };
}

export default async function SectionPage({ params }: Props) {
  const { section: sectionSlug } = await params;
  const feed = await getSectionFeed(sectionSlug);
  if (!feed) notFound();

  const { section, articles } = feed;
  const heroArticle = articles[0];
  const sideArticles = articles.slice(1, 4);
  const remainingArticles = articles.slice(4);
  const rawChildren = section.children as ReadonlyArray<SubSectionItem> | undefined;
  const subSections: readonly SubSectionItem[] = Array.isArray(rawChildren) ? rawChildren : [];

  const breakingCount = articles.filter((art) => art.isBreaking).length;
  const uniqueSourcesCount = new Set(articles.map((art) => art.source?.id || art.source?.nameAr).filter(Boolean)).size;
  const latestUpdateLabel = heroArticle?.publishedAt
    ? new Date(heroArticle.publishedAt).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
    : null;

  const theme = SECTION_HERO_THEMES[sectionSlug] ?? DEFAULT_THEME;
  const sectionDescription = section.descriptionAr || `تغطية إخبارية موثقة ومتابعة تحريرية متواصلة لملفات ${section.nameAr} من مصادرها المعتمدة.`;

  return (
    <div dir="rtl" className="container-custom py-10 space-y-12">
      {/* 1. ترويسة القسم المصممة بهوية مميزة لكل قطاع */}
      <section className={`card-imperial rounded-3xl border ${theme.border} ${theme.bg} p-6 sm:p-9 space-y-6 shadow-imperial relative overflow-hidden`}>
        <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${theme.accent} opacity-90`} />

        {/* مسار التنقل الإمبراطوري */}
        <nav aria-label="فتات الخبز" className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
          <Link href="/" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--gold)]/60 hover:text-[var(--gold)] transition-colors font-bold">
            <Home className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>الرئيسية</span>
          </Link>
          <ChevronLeft className="w-3.5 h-3.5 text-[var(--gold)]/60 shrink-0" />
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border border-[var(--gold)]/35 bg-[#590018] text-[#f5b900] font-black shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{section.nameAr}</span>
          </span>
        </nav>

        {/* عنوان القسم وإحصاءات المواد */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b border-[var(--border)] pb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`w-3.5 h-3.5 rounded-full animate-pulse ${theme.glowDot}`} />
            <h1 className="text-3xl sm:text-4xl font-black text-[var(--text)] tracking-tight title-imperial">{section.nameAr}</h1>
            <span className={`text-[11px] font-black px-3 py-1 rounded-2xl border border-[var(--border)] bg-[#16060B] ${theme.badge}`}>{theme.labelAr}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
            <div className="flex items-center gap-2 text-xs font-bold text-white bg-[#16060B] px-4 py-2.5 rounded-2xl border border-[#f5b900]/40 shadow-xs">
              <Layers className="w-4 h-4 text-[#f5b900]" />
              <span className="font-mono text-[#f5b900] font-black text-sm">{articles.length}</span>
              <span>مادة صحفية معتمدة</span>
            </div>
            {uniqueSourcesCount > 0 && (
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--text)] bg-[var(--bg)] px-3.5 py-2.5 rounded-2xl border border-[var(--border)]">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="font-mono font-black">{uniqueSourcesCount}</span>
                <span className="text-[var(--text-muted)]">مصادر فاعلة</span>
              </div>
            )}
            {breakingCount > 0 && (
              <div className="flex items-center gap-2 text-xs font-black text-rose-100 bg-[#590018] px-3.5 py-2.5 rounded-2xl border border-rose-500/45">
                <Flame className="w-4 h-4 text-rose-400" />
                <span className="font-mono">{breakingCount}</span>
                <span>عاجل</span>
              </div>
            )}
            {latestUpdateLabel && (
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] bg-[var(--bg)] px-3.5 py-2.5 rounded-2xl border border-[var(--border)]">
                <Clock className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>آخر تحديث {latestUpdateLabel}</span>
              </div>
            )}
          </div>
        </div>

        {/* بطاقة وصف القسم التحريرية */}
        <div className={`rounded-2xl border ${theme.descBox} p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-[#590018] border border-[#f5b900]/35 shrink-0">
              <Newspaper className="w-4 h-4 text-[#f5b900]" />
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-black text-[var(--primary)]">الهوية التحريرية للقسم</p>
              <p className="text-sm text-[var(--text)] max-w-3xl leading-relaxed">{sectionDescription}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold text-[var(--text-muted)] shrink-0 border-t sm:border-t-0 sm:border-r border-[var(--border)] pt-3 sm:pt-0 sm:pe-4">
            <Activity className="w-4 h-4 text-[var(--gold)]" />
            <span>نشرة محدثة تلقائياً</span>
          </div>
        </div>

        {/* شريط الأقسام الفرعية */}
        {subSections.length > 0 && (
          <div className="flex items-center gap-2.5 overflow-x-auto pt-1 scrollbar-none">
            <span className="text-xs text-[var(--text-muted)] font-black shrink-0">التصنيفات الميدانية:</span>
            {subSections.map((sub) => (
              <Link key={sub.id} href={`/${sectionSlug}/${sub.slug}`} className={`px-4 py-1.5 rounded-2xl text-xs font-bold border border-[var(--border)] bg-[var(--surface)] ${theme.pillHover} transition-all whitespace-nowrap shadow-2xs`}>
                {sub.nameAr}
              </Link>
            ))}
          </div>
        )}

        {/* لوحة التغطية الخاصة لفلسطين أولاً */}
        {sectionSlug === "palestine" && (
          <div className="mt-2 p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-l from-[#072415]/45 via-[var(--surface)] to-[var(--surface)] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black text-emerald-400">فلسطين أولاً — التغطية المركزية الميدانية الموحدة</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">تغطية ميدانية وتحقق لحظي لكافة المستجدات في غزة والقدس والضفة وكافة الأراضي المحتلة، ملتزمة بالقاموس التحريري الوطني والمصادر الرسمية.</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-[var(--text)] border-t md:border-t-0 md:border-r border-[var(--border)] pt-3 md:pt-0 md:pe-4 shrink-0">
              <div className="text-center">
                <span className="block text-[10px] text-[var(--text-muted)]">المصادر المعتمدة</span>
                <span className="text-emerald-400 font-bold">وفا · صفا · شهاب</span>
              </div>
              <div className="text-center border-r border-[var(--border)] pe-4">
                <span className="block text-[10px] text-[var(--text-muted)]">الرصد الإنساني</span>
                <span className="text-[var(--gold)] font-bold">الهلال الأحمر · الصحة</span>
              </div>
            </div>
          </div>
        )}

        {/* لوحة العالم العربي الفاخرة */}
        {sectionSlug === "arab-world" && (
          <div className="mt-2 p-5 sm:p-6 rounded-2xl border border-amber-500/35 bg-gradient-to-l from-[#2B1603] via-[#16060B] to-[#0E0407] space-y-5">
            <RegionalStripBar title="المحاور الإقليمية للعالم العربي" regions={ARAB_REGIONS} dotClass="bg-amber-400" chipBorderClass="border-amber-500/30" titleClass="text-amber-300" icon={<Compass className="w-4 h-4 text-amber-400 shrink-0" />} />
            <div className="rounded-2xl border border-[#f5b900]/25 bg-[#0E0407]/75 p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black text-[#f5b900] flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /><span>العواصم المحورية قيد المتابعة</span></span>
                <span className="text-[11px] text-white/60">تغطية دبلوماسية وسياسية</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {ARAB_CAPITALS.map((capital) => (
                  <div key={capital.nameAr} className="rounded-2xl border border-amber-500/25 bg-[#16060B] px-3 py-2.5 flex items-center justify-between">
                    <span className="text-xs font-black text-white">{capital.nameAr}</span>
                    <span className="text-[10px] font-bold text-amber-300/85">{capital.countryAr}</span>
                  </div>
                ))}
              </div>
            </div>
            <SourcesBadgeBar label="وكالات الأنباء العربية المعتمدة:" sources={ARAB_AGENCIES} labelClass="text-amber-300" badgeClass="border-[#f5b900]/30 bg-[#590018]/65" borderClass="border-amber-500/20" />
          </div>
        )}

        {/* لوحة الأخبار الدولية الفاخرة */}
        {sectionSlug === "world" && (
          <div className="mt-2 p-5 sm:p-6 rounded-2xl border border-sky-500/35 bg-gradient-to-l from-[#06182B] via-[#16060B] to-[#0E0407] space-y-5">
            <RegionalStripBar title="نطاقات التغطية القارية" regions={WORLD_REGIONS} dotClass="bg-sky-400" chipBorderClass="border-sky-500/30" titleClass="text-sky-300" icon={<Globe className="w-4 h-4 text-sky-400 shrink-0" />} />
            <div className="rounded-2xl border border-sky-500/25 bg-[#0E0407]/75 p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black text-sky-300 flex items-center gap-2"><Landmark className="w-3.5 h-3.5 text-[#f5b900]" /><span>المؤسسات والهيئات الدولية المرصودة</span></span>
                <span className="text-[11px] text-white/60 flex items-center gap-1.5"><Scale className="w-3.5 h-3.5 text-sky-400" /><span>النظام الدولي والقانون الإنساني</span></span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {WORLD_INSTITUTIONS.map((inst) => (
                  <div key={inst.nameAr} className="rounded-2xl border border-sky-500/25 bg-[#16060B] p-3.5 flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-white flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-sky-400 shrink-0" /><span>{inst.nameAr}</span></p>
                      <p className="text-[11px] text-white/70">{inst.roleAr}</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#f5b900] bg-[#590018]/75 px-2.5 py-1 rounded-2xl border border-[#f5b900]/30 shrink-0">{inst.cityAr}</span>
                  </div>
                ))}
              </div>
            </div>
            <SourcesBadgeBar label="وكالات البرقيات الدولية:" sources={WORLD_WIRES} labelClass="text-sky-300" badgeClass="border-sky-400/30 bg-[#06182B]/80" borderClass="border-sky-500/20" />
          </div>
        )}

        {/* لوحة الشراكة مع يلا سبورت لقسم الرياضة */}
        {sectionSlug === "sports" && (
          <div className="mt-2 p-5 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-black text-emerald-400">تكامل حصري مع شبكة يلا سبورت الرياضية (yallasport.com)</span>
              </div>
              <p className="text-xs text-[var(--text-muted)]">تابع التغطيات الحية، جداول المباريات، وترتيب الدوريات الأوروبية والعربية لحظة بلحظة عبر شريكنا الرياضي المعتمد.</p>
            </div>
            <a href="https://yallasport.com" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-colors flex items-center gap-2 shrink-0 shadow-md">
              <span>الانتقال إلى منصة يلا سبورت</span>
              <ArrowUpLeft className="w-4 h-4" />
            </a>
          </div>
        )}
      </section>

      {/* 2. ويدجت رادار الميدان الحي المباشر لقسم فلسطين */}
      {sectionSlug === "palestine" && <div className="space-y-6"><LiveWarRoomMap /></div>}

      {/* 3. قسم الرياضة الخاص: جدول مباريات اليوم وبانر يلا سبورت */}
      {sectionSlug === "sports" && (
        <div className="space-y-6">
          <TodayMatchesWidget />
          <YallaSportBanner variant="leaderboard" />
        </div>
      )}

      {/* 4. قسم الاقتصاد الخاص: البورصة والسلع الحيوية */}
      {sectionSlug === "economy" && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-black text-[var(--gold)]">
            <Coins className="w-4 h-4" />
            <span>مؤشرات السلع والأسواق الحيوية</span>
          </div>
          <PalestineCommoditiesWidget />
        </div>
      )}

      {/* 5. شبكة المقالات والمواد الصحفية المصورة بالكامل */}
      {articles.length > 0 ? (
        <div className="space-y-10">
          {heroArticle && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7"><ArticleCard article={heroArticle} variant="hero" /></div>
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between border-b-2 border-[var(--primary)] pb-2">
                  <h3 className="font-black text-sm text-[var(--text)] flex items-center gap-2">
                    <span className="w-2 h-4 bg-[var(--gold)] rounded-sm" />
                    <span>أحدث المواد في القسم</span>
                  </h3>
                  <span className="text-[11px] text-[var(--text-muted)]">محدث باستمرار</span>
                </div>
                <div className="space-y-3">
                  {sideArticles.map((art) => <ArticleCard key={art.id} article={art} variant="compact" />)}
                </div>
              </div>
            </div>
          )}

          {remainingArticles.length > 0 && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between border-b-2 border-[var(--border)] pb-2.5">
                <h3 className="text-xl font-black text-[var(--text)] flex items-center gap-2">
                  <span className="w-2 h-4 bg-[var(--primary)] rounded-sm" />
                  <span>تغطيات وتقارير إضافية</span>
                </h3>
                <span className="text-xs text-[var(--text-muted)]">{remainingArticles.length} مادة صحفية</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingArticles.map((art) => <ArticleCard key={art.id} article={art} variant="medium" />)}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] space-y-2">
          <p className="font-black text-lg text-[var(--text)]">لا توجد مواد منشورة حالياً في هذا القسم</p>
          <p className="text-xs max-w-md mx-auto">يقوم محرك الجلب الآلي بمتابعة المصادر على مدار الساعة وسيتم نشر الأخبار فور وصولها وتدقيقها تحريرياً.</p>
        </div>
      )}
    </div>
  );
}