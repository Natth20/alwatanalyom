import { Fuel, Flame, ShoppingBag, ShieldCheck, TrendingDown, TrendingUp } from "lucide-react";

interface CommodityItem {
  id: string;
  name: string;
  unit: string;
  priceIls: string;
  priceJod: string;
  change: string;
  isUp: boolean;
  category: "fuel" | "food";
}

const COMMODITIES: CommodityItem[] = [
  {
    id: "c-1",
    name: "بنزين 95 أوكتان",
    unit: "لتر واحد",
    priceIls: "7.14 ₪",
    priceJod: "1.35 د.أ",
    change: "-0.05 ₪",
    isUp: false,
    category: "fuel",
  },
  {
    id: "c-2",
    name: "سولار (ديزل)",
    unit: "لتر واحد",
    priceIls: "6.25 ₪",
    priceJod: "1.18 د.أ",
    change: "مستقر",
    isUp: false,
    category: "fuel",
  },
  {
    id: "c-3",
    name: "أسطوانة غاز الطهي",
    unit: "12 كغم",
    priceIls: "70.00 ₪",
    priceJod: "13.20 د.أ",
    change: "رسمي معتمد",
    isUp: false,
    category: "fuel",
  },
  {
    id: "c-4",
    name: "كيس دقيق القمح الأبيض",
    unit: "50 كغم",
    priceIls: "125.00 ₪",
    priceJod: "23.60 د.أ",
    change: "-3.00 ₪",
    isUp: false,
    category: "food",
  },
];

export function PalestineCommoditiesWidget() {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center shadow-md">
            <Fuel className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base md:text-lg text-[var(--text)]">
                سلة المحروقات والسلع الحيوية في السوق الفلسطيني
              </h3>
              <span className="text-[10px] bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold px-2 py-0.5 rounded-full">
                التسعيرة الرسمية
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              محدثة بالتنسيق مع الهيئة العامة للبترول ووزارة الاقتصاد الوطني الفلسطيني
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-[var(--bg)] px-3 py-1.5 rounded-lg border border-[var(--border)]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>أسعار مراقبة رسمياً</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {COMMODITIES.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 flex flex-col justify-between hover:border-[var(--primary)]/40 hover:shadow-sm transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2">
                <span className="font-semibold">{item.unit}</span>
                <span className="text-[10px] bg-[var(--surface)] px-1.5 py-0.5 rounded font-mono">
                  {item.change}
                </span>
              </div>
              <h4 className="font-bold text-sm text-[var(--text)] mb-3">
                {item.name}
              </h4>
            </div>

            <div className="pt-3 border-t border-[var(--border)]/70 flex items-center justify-between">
              <div>
                <span className="text-xl font-black text-[var(--text)] block">
                  {item.priceIls}
                </span>
                <span className="text-[11px] text-[var(--text-muted)] font-mono">
                  {item.priceJod}
                </span>
              </div>
              <div className="w-7 h-7 rounded-lg bg-[var(--surface)] flex items-center justify-center text-[var(--primary)]">
                {item.category === "fuel" ? (
                  <Flame className="w-4 h-4 text-amber-500" />
                ) : (
                  <ShoppingBag className="w-4 h-4 text-emerald-500" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
