"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Activity,
  Truck,
  CheckCircle2,
  Radio,
  HeartPulse,
  Building,
  Clock,
  MapPin,
  Flame,
  Droplets,
  Zap,
  Wifi,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";

interface SectorStatus {
  id: string;
  name: string;
  region: "gaza" | "westbank" | "jerusalem";
  status: "critical" | "warning" | "stable";
  statusText: string;
  details: string;
  hospitalsOperating: string;
  waterSupply: string;
  powerStatus: string;
  connectivity: string;
  medicalAidStatus: string;
  verifiedSource: string;
  trustScore: string;
  lastUpdate: string;
}

interface CrossingStatus {
  id: string;
  name: string;
  location: string;
  type: "إغاثي وتجاري" | "مسافرين وإغاثي" | "تجاري فقط" | "مسافرين فقط";
  status: "مفتوح جزئياً" | "مخصص للمساعدات" | "قيود مشددة" | "مغلق مؤقتاً";
  statusTone: "warning" | "stable" | "critical";
  dailyVolume: string;
  notes: string;
}

const CROSSINGS: CrossingStatus[] = [
  {
    id: "cr-1",
    name: "معبر كرم أبو سالم التجاري",
    location: "جنوب قطاع غزة",
    type: "إغاثي وتجاري",
    status: "مخصص للمساعدات",
    statusTone: "warning",
    dailyVolume: "114 شاحنة إغاثية مسجلة اليوم",
    notes: "دخول متقطع لشاحنات الطحين والمستلزمات الطبية بعد التفتيش الأمني",
  },
  {
    id: "cr-2",
    name: "معبر رفح البري",
    location: "الحدود الفلسطينية المصرية",
    type: "مسافرين وإغاثي",
    status: "مغلق مؤقتاً",
    statusTone: "critical",
    dailyVolume: "حركة الجرحى متوقفة مؤقتاً",
    notes: "جهود دبلوماسية مكثفة مع الجانب المصري والأمم المتحدة لإعادة فتحه",
  },
  {
    id: "cr-3",
    name: "معبر الكرامة (جسر الملك حسين)",
    location: "أريحا · الحدود الأردنية",
    type: "مسافرين فقط",
    status: "مفتوح جزئياً",
    statusTone: "stable",
    dailyVolume: "حركة منتظمة للمسافرين حتى 3:00 م",
    notes: "انتظام سفر الحالات الإنسانية والمواطنين مع تشديدات تفتيش روتينية",
  },
  {
    id: "cr-4",
    name: "معبر بيت حانون (إيرز)",
    location: "أقصى شمال قطاع غزة",
    type: "إغاثي وتجاري",
    status: "قيود مشددة",
    statusTone: "critical",
    dailyVolume: "قوافل إغاثية أممية محدودة",
    notes: "تنسيق عالي المخاطر لمرور صهاريج وقود المستشفيات إلى الشمال",
  },
  {
    id: "cr-5",
    name: "معبر ترقوميا التجاري",
    location: "الخليل · جنوب الضفة",
    type: "تجاري فقط",
    status: "مفتوح جزئياً",
    statusTone: "stable",
    dailyVolume: "تدفق البضائع والمنتجات الزراعية",
    notes: "حركة نشطة لشاحنات الخضار والأغذية لتزويد أسواق وسط وجنوب الضفة",
  },
];

const SECTORS: SectorStatus[] = [
  {
    id: "gaza-north",
    name: "شمال غزة (جباليا وبيت لاهيا ومحيطها)",
    region: "gaza",
    status: "critical",
    statusText: "ضغط إنساني وصحي بالغ",
    details: "طواقم الإسعاف والدفاع المدني تواصل عملها لإخلاء الجرحى وسط حصار مستمر لمستشفيات كمال عدوان والعودة ونفاد مخزون أدوية العناية المركزة والوقود.",
    hospitalsOperating: "مستشفيان يعملان بطاقة استيعابية 30% فقط",
    waterSupply: "شح حاد · اعتماد على آبار محلية محدودة",
    powerStatus: "انقطاع شامل · اعتماد على مولدات مستهلكة",
    connectivity: "انقطاعات متكررة وشبكات بديلة",
    medicalAidStatus: "طوارئ قصوى ونقص بالمستلزمات الحيوية",
    verifiedSource: "وزارة الصحة الفلسطينية · الهلال الأحمر الفلسطيني",
    trustScore: "توثيق ميداني مؤكد 100%",
    lastUpdate: "منذ 8 دقائق",
  },
  {
    id: "gaza-middle",
    name: "المنطقة الوسطى (دير البلح والنصيرات)",
    region: "gaza",
    status: "warning",
    statusText: "ضغط إنساني وكثافة إيواء",
    details: "مستشفى شهداء الأقصى يقدم الخدمات الطبية لآلاف النازحين، مع استمرار عمل آبار المياه ومحطات التحلية بنظام الطاقة الشمسية والوقود التكافلي.",
    hospitalsOperating: "مستشفى شهداء الأقصى + 4 نقاط ميدانية",
    waterSupply: "تشغيل جزئي لمحطات التحلية المركزية",
    powerStatus: "طاقة شمسية ومولدات طوارئ للمشافي",
    connectivity: "مستقرة نسبياً بنسبة 70%",
    medicalAidStatus: "جاهزية مستمرة للتدخل الإسعافي",
    verifiedSource: "بلدية دير البلح · الدفاع المدني",
    trustScore: "توثيق ميداني مؤكد 100%",
    lastUpdate: "منذ 20 دقيقة",
  },
  {
    id: "gaza-south",
    name: "خان يونس ورفح",
    region: "gaza",
    status: "warning",
    statusText: "توزيع خيام وإغاثة",
    details: "توزيع المساعدات الإغاثية والطرود الغذائية عبر مراكز الأونروا والمؤسسات المجتمعية، واستمرار تقديم خدمات الرعاية الأولية في النقاط الطبية الميدانية بمجمع ناصر الطبي.",
    hospitalsOperating: "مجمع ناصر الطبي والمستشفى الميداني الإماراتي",
    waterSupply: "توزيع صهاريج مياه شرب معقمة",
    powerStatus: "مولدات مركزية تعمل بحصص وقود محسوبة",
    connectivity: "تغطية اتصال 4G/3G خلوية جزئية",
    medicalAidStatus: "تدفق تدريجي للسلع والمساعدات",
    verifiedSource: "وكالة الأونروا · جمعية الهلال الأحمر",
    trustScore: "توثيق أممي ومحلي 100%",
    lastUpdate: "منذ 35 دقيقة",
  },
  {
    id: "westbank-north",
    name: "جنين وطولكرم ومخيماتها",
    region: "westbank",
    status: "warning",
    statusText: "إعادة تأهيل للبنى والمرافق",
    details: "طواقم البلديات وشركات الكهرباء تعمل على إصلاح شبكات المياه والاتصالات المتضررة، وانتظام الخدمات في المستشفيات الحكومية والمراكز الصحية.",
    hospitalsOperating: "مستشفى جنين الحكومي ومستشفى ثابت ثابت",
    waterSupply: "إصلاح 80% من خطوط المياه الرئيسية",
    powerStatus: "شبكة كهرباء عامة منتظمة",
    connectivity: "اتصالات وإنترنت فايبر تعمل بكفاءة",
    medicalAidStatus: "استقرار الكوادر الطبية والمراكز",
    verifiedSource: "بلدية جنين · مديرية الصحة الفلسطينية",
    trustScore: "توثيق حكومي ومحلي 100%",
    lastUpdate: "منذ 50 دقيقة",
  },
  {
    id: "jerusalem",
    name: "القدس الشريف والبلدة القديمة",
    region: "jerusalem",
    status: "stable",
    statusText: "انتظام الصلوات والحياة المجتمعية",
    details: "المسجد الأقصى المبارك وأسواق البلدة القديمة تشهد حركة طبيعية وانتظام صلوات الجماعة، مع تواجد طواقم الإسعاف الميداني للمتطوعين لخدمة المصلين والزوار.",
    hospitalsOperating: "مستشفى المقاصد والمطلع والفرنساوي بكامل الجاهزية",
    waterSupply: "إمدادات طبيعية مستمرة",
    powerStatus: "كهرباء محافظة القدس مستقرة",
    connectivity: "تغطية اتصالات كاملة 100%",
    medicalAidStatus: "طواقم المتطوعين والإسعاف مرابطة",
    verifiedSource: "دائرة الأوقاف الإسلامية بالقدس · شبكة مشافي القدس",
    trustScore: "توثيق موثوق 100%",
    lastUpdate: "منذ ساعة ونصف",
  },
];

export function LiveWarRoomMap() {
  const [activeTab, setActiveTab] = useState<"sectors" | "crossings">("sectors");
  const [selectedSector, setSelectedSector] = useState<SectorStatus>(SECTORS[0]);

  return (
    <section className="card-luxury relative rounded-3xl p-6 md:p-8 overflow-hidden shadow-2xl space-y-6">
      {/* 1. الترويسة الإنسانية والمهنية */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-800 to-teal-700 text-white flex items-center justify-center shadow-lg shrink-0">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-black text-[var(--text)]">
                رادار الميدان · غرفة العمليات الإنسانية واللوجستية
              </h2>
              <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-3 py-0.5 rounded-full border border-emerald-500/30">
                توثيق حقوقي وإنساني 100%
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              متابعة مباشرة على مدار الساعة للموقف الطبي والإغاثي، حالة المعابر البرية، وتدفق المساعدات بمحافظات الوطن.
            </p>
          </div>
        </div>

        {/* أزرار التبديل ومؤشر الشاحنات */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <div className="flex items-center gap-2 text-xs font-semibold bg-[var(--surface)] px-3 py-1.5 rounded-xl border border-[var(--border)]">
            <Truck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[var(--text-muted)]">إجمالي شاحنات اليوم:</span>
            <strong className="text-emerald-500 font-mono">142 شاحنة</strong>
          </div>

          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab("sectors")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === "sectors"
                  ? "bg-emerald-600 text-white shadow-md font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              المحافظات الحيوية
            </button>
            <button
              onClick={() => setActiveTab("crossings")}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                activeTab === "crossings"
                  ? "bg-emerald-600 text-white shadow-md font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              رادار المعابر البرية (5)
            </button>
          </div>
        </div>
      </div>

      {/* 2. المحتوى بحسب التبويب المختار */}
      {activeTab === "sectors" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* قائمة المحاور والمحافظات (4 أعمدة) */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-xs font-bold text-[var(--text-muted)] block mb-1">
              اختر المنطقة لمتابعة الجاهزية الخدماتية:
            </span>
            {SECTORS.map((sec) => {
              const isSelected = selectedSector.id === sec.id;
              const isCritical = sec.status === "critical";
              const isStable = sec.status === "stable";

              return (
                <div
                  key={sec.id}
                  onClick={() => setSelectedSector(sec)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 ring-1 ring-emerald-500/40 shadow-md"
                      : "bg-[var(--surface)] border-[var(--border)] hover:border-emerald-500/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-bold text-sm text-[var(--text)]">{sec.name}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCritical
                          ? "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                          : isStable
                          ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                          : "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                      }`}
                    >
                      {sec.statusText}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                    <span className="truncate max-w-[200px]">{sec.medicalAidStatus}</span>
                    <span className="shrink-0 font-mono text-[10px]">{sec.lastUpdate}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* لوحة تفاصيل المحور المختار (8 أعمدة) */}
          <div className="lg:col-span-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 flex flex-col justify-between space-y-5 shadow-lg">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
                <div>
                  <span className="text-xs text-emerald-500 font-bold block mb-0.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>الموقف الإنساني والخدماتي الميداني المعتمد</span>
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[var(--text)]">
                    {selectedSector.name}
                  </h3>
                </div>
                <span className="text-xs text-[var(--text-muted)] bg-white/5 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>تحديث: {selectedSector.lastUpdate}</span>
                </span>
              </div>

              {/* خلاصة المتابعة الميدانية */}
              <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Activity className="w-4 h-4" />
                  <span>التقرير الميداني المباشر:</span>
                </span>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  {selectedSector.details}
                </p>
              </div>

              {/* مؤشرات البنية الحيوية الأربعة */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3">
                  <HeartPulse className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block">المشافي والقطاع الصحي</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{selectedSector.hospitalsOperating}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3">
                  <Droplets className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block">إمدادات المياه والتحلية</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{selectedSector.waterSupply}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3">
                  <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block">الطاقة والمولدات والوقود</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{selectedSector.powerStatus}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-3">
                  <Wifi className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block">الاتصالات والإنترنت</span>
                    <span className="text-xs font-bold text-white block mt-0.5">{selectedSector.connectivity}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* سطر المصدر والتوثيق */}
            <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>المصدر المعتمد: <strong className="text-white">{selectedSector.verifiedSource}</strong></span>
              </div>

              <Link
                href={`/palestine`}
                className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1 hover:underline"
              >
                <span>فتح ملف التغطية الميدانية الشاملة للمحافظة</span>
                <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* تبويب 2: رادار المعابر البرية الخمسة */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CROSSINGS.map((cr) => (
              <div
                key={cr.id}
                className="p-4 rounded-2xl border border-white/10 bg-black/30 hover:border-emerald-500/40 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-black text-white">{cr.name}</h4>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{cr.location}</span>
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                      cr.statusTone === "critical"
                        ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                        : cr.statusTone === "warning"
                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {cr.status}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-[11px] text-slate-400">التصنيف التشغيلي:</span>
                    <strong className="text-emerald-300">{cr.type}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-[11px] text-slate-400">الحجم الإغاثي:</span>
                    <span className="font-mono text-white text-[11px]">{cr.dailyVolume}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed border-t border-white/5 pt-2">
                  {cr.notes}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>يتم تحديث حركة المعابر والشاحنات بالتنسيق المباشر مع غرفة تجارة غزة والأونروا وهيئة المعابر</span>
            </div>
            <Link href="/aid" className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1">
              <span>منظومة تتبع قوافل الإغاثة الإنسانية</span>
              <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
