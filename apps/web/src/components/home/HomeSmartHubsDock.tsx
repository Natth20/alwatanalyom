import Link from "next/link";
import {
  Bot,
  ShieldAlert,
  Map,
  Radio,
  Trophy,
  Sparkles,
  ChevronLeft,
  Compass,
} from "lucide-react";

const SMART_HUBS = [
  {
    href: "/ask",
    title: "اسأل الوطن AI",
    subtitle: "محرك الاستقصاء والأرشيف الذكي 2026",
    badge: "ذكاء اصطناعي",
    icon: Bot,
    accent: "from-amber-500/15 via-transparent to-transparent border-amber-500/30 hover:border-[var(--gold)]",
    iconBox: "bg-[var(--gold)]/15 text-[var(--gold)] border-[var(--gold)]/35",
  },
  {
    href: "/fact-check",
    title: "رادار الحقيقة (OSINT)",
    subtitle: "فحص الروابط وكشف التضليل الجنائي",
    badge: "تحقق فوري",
    icon: ShieldAlert,
    accent: "from-rose-500/15 via-transparent to-transparent border-rose-500/30 hover:border-rose-400",
    iconBox: "bg-rose-500/15 text-rose-400 border-rose-500/35",
  },
  {
    href: "/atlas",
    title: "أطلس فلسطين التفاعلي",
    subtitle: "القرى المهجرة 1948 والمدن والمخيمات",
    badge: "جغرافيا حية",
    icon: Map,
    accent: "from-emerald-500/15 via-transparent to-transparent border-emerald-500/30 hover:border-emerald-400",
    iconBox: "bg-emerald-500/15 text-emerald-400 border-emerald-500/35",
  },
  {
    href: "/podcast",
    title: "بودكاست صوت الوطن",
    subtitle: "نشرة الأخبار والذهب الصوتية المباشرة",
    badge: "استوديو حي",
    icon: Radio,
    accent: "from-teal-500/15 via-transparent to-transparent border-teal-500/30 hover:border-teal-400",
    iconBox: "bg-teal-500/15 text-teal-400 border-teal-500/35",
  },
  {
    href: "/games",
    title: "ألعاب المعرفة والتراث",
    subtitle: "15 سؤالاً موثقاً ووسام حارس الذاكرة",
    badge: "تحدي وطني",
    icon: Trophy,
    accent: "from-amber-600/15 via-transparent to-transparent border-amber-500/30 hover:border-[var(--gold)]",
    iconBox: "bg-amber-500/15 text-amber-400 border-amber-500/35",
  },
] as const;

export function HomeSmartHubsDock() {
  return (
    <section className="space-y-6 rounded-3xl border border-[var(--border)] dark:border-[var(--gold)]/25 bg-[var(--surface)] dark:bg-gradient-to-br dark:from-[#16060B]/95 dark:via-[#110308]/95 dark:to-[#0A0204]/95 p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 start-1/3 w-80 h-80 bg-[var(--gold)]/10 rounded-full blur-3xl" />

      {/* الترويسة */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] dark:border-white/10 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#590018] to-[#26000a] text-[var(--gold)] flex items-center justify-center border border-[var(--gold)]/40 shadow-lg shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text)] tracking-tight">
                المراكز التفاعلية والمنصات الذكية
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[var(--gold)]/15 text-[var(--primary)] dark:text-[var(--gold)] border border-[var(--gold)]/30">
                <Sparkles className="w-3 h-3" />
                <span>5 أدوات حصرية</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              استقصاء بالذكاء الاصطناعي، تحقق جنائي، خرائط جغرافية، بث صوتي، وتحديات تراثية في مكان واحد.
            </p>
          </div>
        </div>
      </div>

      {/* شبكة البطاقات الخمس */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {SMART_HUBS.map((hub) => {
          const Icon = hub.icon;
          return (
            <Link
              key={hub.href}
              href={hub.href}
              className={`group rounded-2xl border bg-gradient-to-b ${hub.accent} bg-[var(--bg)] dark:bg-black/40 p-5 flex flex-col justify-between gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${hub.iconBox}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[var(--surface)] dark:bg-white/5 border border-[var(--border)] dark:border-white/10 text-[var(--text-muted)]">
                    {hub.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-black text-sm text-[var(--text)] group-hover:text-[var(--primary)] dark:group-hover:text-[var(--gold)] transition-colors">
                    {hub.title}
                  </h3>
                  <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">
                    {hub.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[var(--border)] dark:border-white/10 flex items-center justify-between text-[11px] font-bold text-[var(--primary)] dark:text-[var(--gold)]">
                <span>دخول المركز</span>
                <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0 group-hover:-translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
