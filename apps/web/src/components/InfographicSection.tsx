import Link from "next/link";
import { BarChart2, TrendingUp, ShieldCheck, Activity, Award } from "lucide-react";

interface StatItem {
  id: string;
  label: string;
  value: string;
  subValue: string;
  trend: "up" | "down" | "neutral";
  trendText: string;
  sourceText: string;
  accentColor: string;
}

const STATS_DATA: StatItem[] = [
  {
    id: "stat-1",
    label: "صمود التجارة والمنشآت المحلية",
    value: "84.2%",
    subValue: "نسبة استمرار عمل الأسواق والمتاجر",
    trend: "up",
    trendText: "+3.4% مقارنة بالشهر الماضي",
    sourceText: "جهاز الإحصاء المركزي الفلسطيني",
    accentColor: "from-emerald-500 to-teal-700",
  },
  {
    id: "stat-2",
    label: "توليد الطاقة الشمسية البديلة",
    value: "318 MW",
    subValue: "القدرة المركبة المستقلة في المحافظات",
    trend: "up",
    trendText: "نمو سنوي قياسي",
    sourceText: "سلطة الطاقة والموارد الطبيعية",
    accentColor: "from-amber-500 to-orange-700",
  },
  {
    id: "stat-3",
    label: "التحويلات المالية وصمود الأسر",
    value: "$1.42B",
    subValue: "إجمالي تدفقات المغتربين السنوية",
    trend: "up",
    trendText: "شريان دعم اقتصادي حاسم",
    sourceText: "سلطة النقد الفلسطينية",
    accentColor: "from-blue-500 to-indigo-700",
  },
  {
    id: "stat-4",
    label: "مؤشر الشفافية ودقة الأخبار",
    value: "99.4%",
    subValue: "نسبة التحقق من الأخبار والمصادر",
    trend: "up",
    trendText: "معيار تدقيق رقمي صارم",
    sourceText: "وحدة التحقق — الوطن اليوم",
    accentColor: "from-rose-500 to-pink-700",
  },
];

export function InfographicSection() {
  return (
    <section className="card-luxury rounded-3xl p-6 md:p-8 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shadow-md">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black text-[var(--text)]">
                بيانات الوطن · صحافة الأرقام والمؤشرات
              </h2>
              <span className="text-[10px] font-bold bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-0.5 rounded-full">
                بيانات موثقة
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              قراءة بيانية تفاعلية في صمود المجتمع، نبض الاقتصاد، والأرقام الحيوية
            </p>
          </div>
        </div>

        <Link
          href="/data-journalism"
          className="text-xs font-bold text-[var(--primary)] hover:underline flex items-center gap-1"
        >
          <span>استعراض مركز الإحصاءات الكامل</span>
          <span>←</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {STATS_DATA.map((stat) => (
          <div
            key={stat.id}
            className="group relative rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5 hover:border-[var(--primary)]/50 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-[var(--text-muted)] line-clamp-1">
                {stat.label}
              </span>
              <div
                className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${stat.accentColor}`}
              />
            </div>

            <div className="mb-2">
              <span className="text-3xl md:text-4xl font-black text-[var(--text)] tracking-tight">
                {stat.value}
              </span>
            </div>

            <p className="text-xs text-[var(--text-muted)] mb-3 leading-snug">
              {stat.subValue}
            </p>

            <div className="pt-3 border-t border-[var(--border)]/70 flex flex-col gap-1 text-[11px]">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{stat.trendText}</span>
              </span>
              <span className="text-[10px] text-[var(--text-muted)] truncate">
                المصدر: {stat.sourceText}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

