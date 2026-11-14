"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { LayoutGrid, Layers, Radio, Sparkles } from "lucide-react";

export type PrototypeView = "stream" | "bento" | "live";

interface Props {
  currentView: PrototypeView;
}

export function VisualPrototypeSwitcher({ currentView }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectView = (view: PrototypeView) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", view);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const prototypes = [
    {
      id: "stream" as PrototypeView,
      name: "النموذج 1: التدفق الملكي (الموصى به)",
      icon: Layers,
      description: "هيرو مركزي عميق + ممر سريع لحظي على نمط كبرى المنصات الصحفية",
    },
    {
      id: "bento" as PrototypeView,
      name: "النموذج 2: الشبكة الذكية (Bento Grid)",
      icon: LayoutGrid,
      description: "توزيع شبكي متناسق ومتعدد المحاور (سياسة، اقتصاد، تقنية، رياضة)",
    },
    {
      id: "live" as PrototypeView,
      name: "النموذج 3: النبض المرئي والبث المباشر",
      icon: Radio,
      description: "صدارة للتغطيات الحية والفيديو الميداني والأخبار دقيقة بدقيقة",
    },
  ];

  return (
    <div className="rounded-2xl border border-[var(--gold)]/30 bg-[#26000a]/90 backdrop-blur-md p-3 sm:p-4 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-white">
          <Sparkles className="w-4 h-4 text-[var(--gold)]" />
          <span className="font-black text-xs sm:text-sm text-[var(--gold)]">
            نماذج الصفحة الرئيسية الأولية (المرحلة 4 · اختر الاتجاه البصري المفضل):
          </span>
        </div>
        <span className="text-[11px] text-stone-300">
          يمكنك التبديل بين النماذج الثلاثة بنقرة واحدة لمعاينة التخطيط والتسلسل
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {prototypes.map((proto) => {
          const isSelected = currentView === proto.id;
          const IconComp = proto.icon;

          return (
            <button
              key={proto.id}
              onClick={() => handleSelectView(proto.id)}
              className={`p-3 rounded-xl text-start transition-all flex flex-col justify-between border ${
                isSelected
                  ? "bg-[#590018] border-[var(--gold)] text-white shadow-md ring-2 ring-[var(--gold)]/30"
                  : "bg-black/30 border-white/10 text-stone-300 hover:border-[var(--gold)]/40 hover:bg-black/50"
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-bold text-xs flex items-center gap-1.5">
                  <IconComp className={`w-3.5 h-3.5 ${isSelected ? "text-[var(--gold)]" : "text-stone-400"}`} />
                  <span>{proto.name}</span>
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
                )}
              </div>
              <p className="text-[10px] text-stone-300 line-clamp-1">
                {proto.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

