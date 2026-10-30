import { CalendarDays, AlertCircle, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface CalendarEvent {
  id: string;
  dateStr: string;
  timeStr: string;
  country: string;
  title: string;
  importance: "high" | "medium" | "low";
  expected: string;
  previous: string;
}

const EVENTS: CalendarEvent[] = [
  {
    id: "ev-1",
    dateStr: "الأربعاء، 5 نوفمبر",
    timeStr: "21:00 بتوقيت القدس",
    country: "الولايات المتحدة",
    title: "قرار الفائدة الصادر عن البنك الفيدرالي الأمريكي",
    importance: "high",
    expected: "تخفيض 25 نقطة أساس",
    previous: "5.00%",
  },
  {
    id: "ev-2",
    dateStr: "الخميس، 6 نوفمبر",
    timeStr: "11:00 بتوقيت القدس",
    country: "فلسطين",
    title: "تقرير الرقم القياسي لأسعار المستهلك (التضخم لشهر أكتوبر)",
    importance: "high",
    expected: "+0.4%",
    previous: "+0.6%",
  },
  {
    id: "ev-3",
    dateStr: "الجمعة، 7 نوفمبر",
    timeStr: "15:30 بتوقيت القدس",
    country: "منظمة أوبك+",
    title: "مراجعة معدلات الإنتاج وتوازنات سوق النفط الخام",
    importance: "medium",
    expected: "تمديد الخفض الطوعي",
    previous: "استقرار الأسعار",
  },
];

export function EconomicCalendarWidget() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-600 text-white flex items-center justify-center shadow-md">
            <CalendarDays className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base md:text-lg text-[var(--text)]">
                التقويم الاقتصادي · مواعيد القرارات والأحداث المرتقبة
              </h3>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full">
                بلومبرغ لايف
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              جدول زمني لأهم القرارات المالية وبيانات التضخم ومحاضر البنوك المركزية
            </p>
          </div>
        </div>

        <Link
          href="/economy"
          className="text-xs font-bold text-[var(--primary)] hover:underline flex items-center gap-1"
        >
          <span>استعراض التقويم الكامل</span>
          <ChevronLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {EVENTS.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 flex flex-col justify-between hover:border-[var(--primary)]/40 transition-all space-y-3"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded text-[11px]">
                  {item.country}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.importance === "high"
                      ? "bg-rose-500/15 text-rose-600"
                      : "bg-amber-500/15 text-amber-600"
                  }`}
                >
                  {item.importance === "high" ? "أثر اقتصادي مرتفع" : "أثر متوسط"}
                </span>
              </div>

              <h4 className="font-bold text-sm text-[var(--text)] leading-snug mb-2">
                {item.title}
              </h4>
            </div>

            <div className="pt-3 border-t border-[var(--border)]/70 space-y-2 text-xs">
              <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{item.timeStr}</span>
                </span>
                <span className="font-semibold">{item.dateStr}</span>
              </div>

              <div className="flex items-center justify-between text-[11px] bg-[var(--surface)] p-2 rounded-lg">
                <span>التوقع: <strong className="text-[var(--text)]">{item.expected}</strong></span>
                <span>السابق: <strong className="text-[var(--text-muted)]">{item.previous}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
