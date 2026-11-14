import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { BrandLogo } from "@/components/BrandLogo";
import { ArticleCard } from "@/components/ArticleCard";
import { ArticleCard as ArticleCardType } from "@awt/shared";
import {
  Flame,
  Radio,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers,
  HeartHandshake,
  Briefcase,
  Activity,
  ArrowLeft,
  Sun,
  Moon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "دليل نظام التصميم والهوية البصرية — الوطن اليوم",
  description: "المعايير البصرية الرسمية، نسب توزيع الألوان (عنابي 60%، أبيض 25%، ذهبي 10%)، والخطوط والمكونات التفاعلية لمنصة الوطن اليوم.",
};

const SAMPLE_HERO_ARTICLE: ArticleCardType = {
  id: "demo-hero-1",
  slug: "تطورات-الميدان-في-غزة-وصمود-الاهالي",
  titleAr: "قمة إقليمية مرتقبة لبحث ترتيبات ممرات الإغاثة ووقف إطلاق النار الشامل في فلسطين",
  titleOriginal: "Regional summit to discuss humanitarian aid corridors",
  summaryAr: "تنسيق دبلوماسي عربي وإقليمي رفيع المستوى لاعتماد خطة موحدة تضمن تدفق المساعدات الإنسانية والطبية بدون شروط أمنية، وإعادة تأهيل المرافق الصحية.",
  kind: "NEWS",
  publishedAt: new Date().toISOString(),
  displayPolicy: "LICENSED_FULL",
  isBreaking: true,
  sectionSlug: "palestine",
  sectionNameAr: "فلسطين",
  source: {
    id: "src-1",
    slug: "wafa-ps",
    nameAr: "وكالة الأنباء الرسمية",
    logoUrl: null,
    homepageUrl: "https://wafa.ps",
  },
};

const SAMPLE_MEDIUM_ARTICLE: ArticleCardType = {
  id: "demo-med-1",
  slug: "اسعار-الذهب-والعملات-في-اسواق-فلسطين",
  titleAr: "أسواق الصرف والذهب: استقرار سعر صرف الدولار والشيكل وتداولات حذرة في البورصة",
  titleOriginal: "Gold and FX markets update",
  summaryAr: "سجلت مؤشرات التداول في الأسواق المحلية نشاطاً متوازناً مع استمرار الطلب على أونصات وسبائك الذهب كملاذ ادخاري آمن.",
  kind: "NEWS",
  publishedAt: new Date(Date.now() - 3600000).toISOString(),
  displayPolicy: "LICENSED_FULL",
  isBreaking: false,
  sectionSlug: "economy",
  sectionNameAr: "الاقتصاد",
  source: {
    id: "src-2",
    slug: "alwatantoday-econ",
    nameAr: "الوطن الاقتصادي",
    logoUrl: null,
    homepageUrl: "https://alwatantoday.net/economy",
  },
};

const SAMPLE_COMPACT_ARTICLE: ArticleCardType = {
  id: "demo-comp-1",
  slug: "تحول-رقمي-في-خدمات-التعليم",
  titleAr: "إطلاق برنامج تدريبي مجاني لتمكين الكفاءات الفلسطينية في هندسة الذكاء الاصطناعي",
  kind: "NEWS",
  publishedAt: new Date(Date.now() - 7200000).toISOString(),
  displayPolicy: "LICENSED_FULL",
  isBreaking: false,
  sectionSlug: "tech",
  sectionNameAr: "التقنية والابتكار",
  source: {
    id: "src-3",
    slug: "aitnews",
    nameAr: "البوابة التقنية",
    logoUrl: null,
    homepageUrl: "https://aitnews.com",
  },
};

export default function DesignSystemPage() {
  return (
    <div className="container-custom py-12 space-y-16 max-w-6xl">
      {/* 1. الترويسة الرئيسية للنظام */}
      <div className="border-b border-[var(--border)] pb-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>دليل الهوية ونظام المكونات (Design Tokens v2.0)</span>
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-[var(--text)] tracking-tight">
              نظام التصميم الفاخر لمنصة «الوطن اليوم»
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border-gold)] text-xs font-bold text-[var(--gold)] hover:bg-[#590018] hover:text-white transition-colors"
            >
              ← العودة للرئيسية
            </Link>
          </div>
        </div>
        <p className="text-sm text-[var(--text-muted)] max-w-3xl leading-relaxed">
          وثيقة التوجيه البصري الصارم المعتمدة لمنصة الوطن اليوم، والمبنية على فلسفة العنابي الداكن السيادي، والذهبي الملكي، والأبيض الصريح، مع خطوط عربية رصينة ومكونات متجاوبة بنسبة 100% باتجاه RTL.
        </p>
      </div>

      {/* 2. الهوية المعتمدة والشعار الرسمي */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3">
          <Layers className="w-5 h-5 text-[var(--gold)]" />
          <h2 className="text-2xl font-black text-[var(--text)]">الهوية البصرية والشعار المعتمد</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[var(--text-muted)]">الشعار في الترويسة والبطاقات</h3>
            <div className="p-8 rounded-2xl bg-[#140106] border border-[var(--border-gold)] shadow-xl flex items-center justify-center">
              <BrandLogo variant="header" />
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#E8DED7] shadow-sm flex items-center justify-center">
              <BrandLogo variant="header" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[var(--text-muted)]">البانر الكامل للهوية المعتمدة</h3>
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border-gold)] shadow-xl">
              <Image
                src="/brand/logo-banner.jpg"
                alt="شعار الوطن اليوم الرسمي"
                width={800}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. لوحة الألوان الرسمية ونسب التوزيع */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#590018]" />
            <h2 className="text-2xl font-black text-[var(--text)]">لوحة الألوان الرسمية ونسب التوزيع المعتمدة</h2>
          </div>
          <span className="text-xs font-bold text-[var(--gold)] bg-[#590018]/10 px-3 py-1 rounded-full border border-[var(--border-gold)]">
            معتمدة بالكامل
          </span>
        </div>

        {/* شريط نسب التوزيع */}
        <div className="space-y-2">
          <div className="h-6 w-full rounded-xl overflow-hidden flex shadow-inner border border-black/10">
            <div style={{ width: "60%" }} className="bg-[#590018] flex items-center justify-center text-white text-[10px] font-black">
              عنابي داكن 60%
            </div>
            <div style={{ width: "25%" }} className="bg-white border-x border-slate-300 flex items-center justify-center text-slate-900 text-[10px] font-black">
              أبيض 25%
            </div>
            <div style={{ width: "10%" }} className="bg-[#F5B900] flex items-center justify-center text-slate-950 text-[10px] font-black">
              ذهبي 10%
            </div>
            <div style={{ width: "5%" }} className="bg-[#0F2A44] flex items-center justify-center text-white text-[9px] font-bold">
              مساعد 5%
            </div>
          </div>
          <p className="text-xs text-[var(--text-muted)] text-center">
            توزيع النسبة البصرية: 60% للخلفيات والترويسات السيادية • 25% للنصوص والمساحات القرائية • 10% للعناوين والأزرار والأيقونات • 5% للتوازن والعمق.
          </p>
        </div>

        {/* بطاقات الألوان التفصيلية */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-[#590018] text-white shadow-lg space-y-1">
            <span className="text-[10px] text-[var(--gold)] font-bold block">الأساسي (60%)</span>
            <span className="text-base font-black block">عنابي داكن</span>
            <code className="text-xs font-mono block opacity-90">#590018</code>
            <span className="text-[10px] block opacity-75">الخلفيات والشريط العلوي</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5B900] text-slate-950 shadow-lg space-y-1">
            <span className="text-[10px] text-[#590018] font-bold block">البارز (10%)</span>
            <span className="text-base font-black block">ذهبي ملكي</span>
            <code className="text-xs font-mono block font-bold">#F5B900</code>
            <span className="text-[10px] block font-medium">العناوين، الأزرار، الأيقونات</span>
          </div>

          <div className="p-4 rounded-2xl bg-white text-slate-950 border border-slate-300 shadow-sm space-y-1">
            <span className="text-[10px] text-slate-500 font-bold block">النصوص (25%)</span>
            <span className="text-base font-black block">أبيض نقي</span>
            <code className="text-xs font-mono block text-slate-600">#FFFFFF</code>
            <span className="text-[10px] block text-slate-600">المحتوى وسهولة القراءة</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#D9C6A3] text-slate-950 shadow-sm space-y-1">
            <span className="text-[10px] text-slate-700 font-bold block">مساعد (5%)</span>
            <span className="text-base font-black block">بيج فاخر</span>
            <code className="text-xs font-mono block text-slate-800">#D9C6A3</code>
            <span className="text-[10px] block text-slate-700">الخلفيات الهادئة والتفاصيل</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0F2A44] text-white shadow-sm space-y-1">
            <span className="text-[10px] text-cyan-300 font-bold block">مساعد (عمق)</span>
            <span className="text-base font-black block">كحلي عميق</span>
            <code className="text-xs font-mono block opacity-90">#0F2A44</code>
            <span className="text-[10px] block opacity-75">للتوازن وإضافة عمق بصري</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#E84A5F] text-white shadow-lg space-y-1">
            <span className="text-[10px] text-yellow-200 font-bold block">العواجل والنبض</span>
            <span className="text-base font-black block">أحمر مرجاني</span>
            <code className="text-xs font-mono block opacity-90">#E84A5F</code>
            <span className="text-[10px] block opacity-75">الأخبار العاجلة والتنبيهات</span>
          </div>
        </div>

        {/* صورة لوحة الألوان المرجعية الأصلية */}
        <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-3">
          <span className="text-xs font-bold text-[var(--text-muted)] block">
            المخطط المعتمد من المالك (لوحة الألوان المثالية لهوية الوطن اليوم):
          </span>
          <div className="relative overflow-hidden rounded-xl border border-[var(--border-gold)] shadow-md">
            <Image
              src="/brand/brand-palette.jpg"
              alt="لوحة الألوان المثالية لهوية الوطن اليوم"
              width={1000}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. معرض بطاقات الأخبار والمكونات */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3">
          <Sparkles className="w-5 h-5 text-[var(--gold)]" />
          <h2 className="text-2xl font-black text-[var(--text)]">مكتبة بطاقات الأخبار والمكونات</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* بطاقة البطل */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-bold text-[var(--text-muted)]">1. بطاقة الخبر البطل (Hero Card)</span>
            <ArticleCard article={SAMPLE_HERO_ARTICLE} variant="hero" />
          </div>

          {/* بطاقات ثانوية ومضغوطة */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[var(--text-muted)]">2. بطاقة متوسطة (Medium Card)</span>
              <ArticleCard article={SAMPLE_MEDIUM_ARTICLE} variant="medium" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[var(--text-muted)]">3. بطاقة مضغوطة (Compact Card)</span>
              <ArticleCard article={SAMPLE_COMPACT_ARTICLE} variant="compact" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. الأزرار والشارات التفاعلية */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3">
          <Activity className="w-5 h-5 text-[var(--gold)]" />
          <h2 className="text-2xl font-black text-[var(--text)]">الأزرار والشارات التفاعلية (Badges & Buttons)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الأزرار */}
          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-4">
            <h3 className="font-bold text-sm text-[var(--text)]">أنماط الأزرار الرسمية:</h3>
            <div className="flex flex-wrap items-center gap-3">
              <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#DCA600] text-slate-950 text-xs font-black shadow-md hover:shadow-lg hover:shadow-[var(--gold-glow)] transition-all">
                زر ذهبي ملكي رئيسي
              </button>

              <button className="px-5 py-2.5 rounded-xl bg-[#590018] hover:bg-[#730020] text-white text-xs font-bold shadow-md transition-colors">
                زر عنابي سيادي
              </button>

              <button className="px-5 py-2.5 rounded-xl border border-[var(--border-gold)] text-[var(--text)] hover:border-[var(--gold)] hover:text-[var(--gold)] text-xs font-bold transition-colors">
                زر بإطار ذهبي هادئ
              </button>
            </div>
          </div>

          {/* الشارات والوسوم */}
          <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-4">
            <h3 className="font-bold text-sm text-[var(--text)]">شارات التحقق والحالة:</h3>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-black flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span>عاجل</span>
              </span>

              <span className="px-2.5 py-1 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--border-gold)] text-xs font-black flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>رابط رسمي موثق</span>
              </span>

              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>فحص الحقائق: صحيح</span>
              </span>

              <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold">
                فرصة عمل معتمدة
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

