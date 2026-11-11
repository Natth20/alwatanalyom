"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Flame, Landmark, Users2, ArrowLeft } from "lucide-react";

interface HubItem {
  id: string;
  tag: string;
  title: string;
  time: string;
  source: string;
  badge: string;
  slug: string;
}

const REGION_DATA: Record<
  string,
  { label: string; icon: any; count: number; items: HubItem[] }
> = {
  gaza: {
    label: "غزة الصامدة",
    icon: Flame,
    count: 28,
    items: [
      {
        id: "gz-1",
        tag: "شمال غزة",
        title: "المنظومة الصحية تكافح لإبقاء العنايات المركزة عاملة وسط شح المستلزمات الطبية",
        time: "منذ 15 دقيقة",
        source: "وكالة الأنباء الفلسطينية (وفا)",
        badge: "ميداني عاجل",
        slug: "gaza-health-sector-resilience",
      },
      {
        id: "gz-2",
        tag: "خانيونس",
        title: "مبادرات تكافلية شعبية لإعادة تأهيل شبكات المياه والآبار في الأحياء السكنية",
        time: "منذ 40 دقيقة",
        source: "الجزيرة نت",
        badge: "تقرير خاص",
        slug: "khan-younis-water-initiatives",
      },
      {
        id: "gz-3",
        tag: "دير البلح",
        title: "فرق الدفاع المدني تناشد توفير الوقود لمركبات الإسعاف والإنقاذ",
        time: "منذ ساعة",
        source: "القدس العربي",
        badge: "نداء إنساني",
        slug: "civil-defense-fuel-plea",
      },
    ],
  },
  jerusalem: {
    label: "القدس الشريف",
    icon: Landmark,
    count: 14,
    items: [
      {
        id: "jr-1",
        tag: "المسجد الأقصى",
        title: "عشرات آلاف المصلين يؤدون الصلاة في رحاب الأقصى وسط إجراءات أمنية مشددة",
        time: "منذ 25 دقيقة",
        source: "دائرة الأوقاف الإسلامية بالقدس",
        badge: "البلدة القديمة",
        slug: "jerusalem-aqsa-prayers-update",
      },
      {
        id: "jr-2",
        tag: "سلوان والشيخ جراح",
        title: "عائلات مقدسية تؤكد تمسكها بمنازلها وترفض قرارات الإخلاء القسرية",
        time: "منذ ساعتين",
        source: "مركز معلومات وادي حلوة",
        badge: "صمود مقدسي",
        slug: "silwan-sheikh-jarrah-stand",
      },
    ],
  },
  westbank: {
    label: "الضفة الغربية",
    icon: MapPin,
    count: 19,
    items: [
      {
        id: "wb-1",
        tag: "جنين وطولكرم",
        title: "إعادة تأهيل عاجلة للبنية التحتية وشبكات الكهرباء بعد اقتحامات الاحتلال",
        time: "منذ نصف ساعة",
        source: "تلفزيون فلسطين",
        badge: "متابعة ميدانية",
        slug: "jenin-tulkarm-infrastructure",
      },
      {
        id: "wb-2",
        tag: "نابلس والخليل",
        title: "انتظام الحركة التجارية وفتح الأسواق القديمة وسط إقبال شعبي واسع",
        time: "منذ ساعتين",
        source: "صحيفة الأيام",
        badge: "اقتصاد محلي",
        slug: "nablus-hebron-markets",
      },
    ],
  },
  diaspora: {
    label: "مخيمات الشتات والـ 48",
    icon: Users2,
    count: 9,
    items: [
      {
        id: "ds-1",
        tag: "لبنان وسوريا",
        title: "حملات إغاثة طبية شاملة في مخيمي عين الحلوة واليرموك لدعم العائلات المتعففة",
        time: "منذ 3 ساعات",
        source: "وكالة الأونروا",
        badge: "حق العودة",
        slug: "diaspora-camps-relief",
      },
      {
        id: "ds-2",
        tag: "الداخل المحتل 1948",
        title: "مؤتمر وطني في الناصرة وحيفا لتعزيز الهوية وحماية الأوقاف والمقدسات التاريخية",
        time: "منذ 4 ساعات",
        source: "عرب 48",
        badge: "حماية الهوية",
        slug: "interior-48-heritage-conference",
      },
    ],
  },
};

export function PalestineCoverageHub() {
  const [activeTab, setActiveTab] = useState<string>("gaza");

  const currentRegion = REGION_DATA[activeTab];

  return (
    <section className="relative rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-[var(--surface-elevated)] via-[var(--surface)] to-[var(--surface)] p-6 md:p-8 shadow-lg overflow-hidden">
      {/* هالة خضراء ملكية خفيفة في الخلفية */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* الترويسة الرئيسية */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg text-2xl font-bold border border-emerald-400/30">
            🇵🇸
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black text-[var(--text)] tracking-tight">
                نبض فلسطين · التغطية الميدانية الشاملة
              </h2>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full animate-pulse">
                مباشر دقيقة بدقيقة
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              تغطية جغرافية موثقة وشاملة لكافة المحافظات والمخيمات والقدس الشريف والشتات
            </p>
          </div>
        </div>

        <Link
          href="/palestine"
          className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 transition-colors group"
        >
          <span>كل أرشيف فلسطين</span>
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* شريط التبويبات الجغرافية */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {Object.entries(REGION_DATA).map(([key, reg]) => {
          const Icon = reg.icon;
          const isActive = activeTab === key;

          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-md"
                  : "bg-[var(--bg)] text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--text)]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{reg.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-[var(--surface)] text-[var(--text-muted)]"
                }`}
              >
                {reg.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* قائمة أخبار الإقليم المختار */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentRegion.items.map((item) => (
          <article
            key={item.id}
            className="card-luxury rounded-2xl p-5 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-xs mb-3">
                <span className="font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2.5 py-0.5 rounded-full text-[11px] border border-[var(--primary)]/20">
                  {item.tag}
                </span>
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  {item.badge}
                </span>
              </div>

              <h3 className="font-black text-sm md:text-base text-[var(--text)] leading-snug group-hover:text-[var(--primary)] transition-colors mb-3">
                <Link href={`/article/hub-${item.id}/${item.slug}`}>
                  {item.title}
                </Link>
              </h3>
            </div>

            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
              <span className="font-semibold">{item.source}</span>
              <span className="font-mono">{item.time}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

