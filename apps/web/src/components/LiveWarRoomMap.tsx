"use client";

import { useState } from "react";
import { ShieldAlert, Activity, Truck, CheckCircle2, Radio, HeartPulse, Building, Clock, MapPin } from "lucide-react";

interface SectorStatus {
  id: string;
  name: string;
  status: "critical" | "warning" | "stable";
  statusText: string;
  details: string;
  medicalAidStatus: string;
  verifiedSource: string;
  trustScore: string;
  lastUpdate: string;
}

const SECTORS: SectorStatus[] = [
  {
    id: "gaza-north",
    name: "شمال غزة (جباليا وبيت لاهيا)",
    status: "critical",
    statusText: "ضغط إنساني وصحي بالغ",
    details: "طواقم الإسعاف والدفاع المدني تواصل عملها لإخلاء الجرحى وسط حصار مستمر لمستشفيات كمال عدوان والعودة ونفاد مخزون أدوية العناية المركزة والوقود.",
    medicalAidStatus: "طوارئ قصوى ونقص بالمستلزمات الحيوية",
    verifiedSource: "وزارة الصحة الفلسطينية · الهلال الأحمر",
    trustScore: "توثيق ميداني مؤكد 100%",
    lastUpdate: "منذ 10 دقائق",
  },
  {
    id: "gaza-middle",
    name: "المنطقة الوسطى (دير البلح والنصيرات)",
    status: "warning",
    statusText: "ضغط إنساني وكثافة إيواء",
    details: "مستشفى شهداء الأقصى يقدم الخدمات الطبية لآلاف النازحين، مع استمرار عمل آبار المياه ومحطات التحلية بنظام الطاقة الشمسية والوقود التكافلي.",
    medicalAidStatus: "جاهزية مستمرة للتدخل الإسعافي",
    verifiedSource: "بلدية دير البلح · الدفاع المدني",
    trustScore: "توثيق ميداني مؤكد 100%",
    lastUpdate: "منذ 25 دقيقة",
  },
  {
    id: "gaza-south",
    name: "خان يونس ورفح",
    status: "warning",
    statusText: "توزيع خيام وإغاثة",
    details: "توزيع المساعدات الإغاثية والطرود الغذائية عبر مراكز الأونروا والمؤسسات المجتمعية، واستمرار تقديم خدمات الرعاية الأولية في النقاط الطبية الميدانية.",
    medicalAidStatus: "تدفق تدريجي للسلع والمساعدات",
    verifiedSource: "وكالة الأونروا · جمعية الهلال الأحمر",
    trustScore: "توثيق أممي ومحلي 100%",
    lastUpdate: "منذ 40 دقيقة",
  },
  {
    id: "westbank-north",
    name: "جنين وطولكرم ومخيماتها",
    status: "warning",
    statusText: "إعادة تأهيل للبنى والمرافق",
    details: "طواقم البلديات وشركات الكهرباء تعمل على إصلاح شبكات المياه والاتصالات المتضررة، وانتظام الخدمات في المستشفيات الحكومية والمراكز الصحية.",
    medicalAidStatus: "استقرار الكوادر الطبية والمراكز",
    verifiedSource: "بلدية جنين · مديرية الصحة",
    trustScore: "توثيق حكومي ومحلي 100%",
    lastUpdate: "منذ ساعة",
  },
  {
    id: "jerusalem",
    name: "القدس الشريف والبلدة القديمة",
    status: "stable",
    statusText: "انتظام الصلوات والحياة المجتمعية",
    details: "المسجد الأقصى المبارك وأسواق البلدة القديمة تشهد حركة طبيعية وانتظام صلوات الجماعة، مع تواجد طواقم الإسعاف الميداني للمتطوعين لخدمة المصلين.",
    medicalAidStatus: "طواقم المتطوعين والإسعاف مرابطة",
    verifiedSource: "دائرة الأوقاف الإسلامية بالقدس",
    trustScore: "توثيق موثوق 100%",
    lastUpdate: "منذ ساعة ونصف",
  },
];

export function LiveWarRoomMap() {
  const [selectedSector, setSelectedSector] = useState<SectorStatus>(SECTORS[0]);

  return (
    <section className="card-luxury relative rounded-3xl p-6 md:p-8 overflow-hidden shadow-lg">
      {/* الترويسة الإنسانية والمهنية */}
      <div className="relative flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 to-teal-700 text-white flex items-center justify-center shadow-md">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black text-[var(--text)]">
                رادار الميدان · غرفة المتابعة الإنسانية والخدماتية
              </h2>
              <span className="text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 px-2.5 py-0.5 rounded-full">
                توثيق حقوقي وإنساني
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              رصد مهني دقيق للحالة الإنسانية، جاهزية المستشفيات، تدفق المساعدات، ومصادر التوثيق الميدانية
            </p>
          </div>
        </div>

        {/* مؤشر شاحنات المساعدات المعتمدة */}
        <div className="flex items-center gap-2 text-xs font-semibold bg-[var(--surface)] px-3 py-1.5 rounded-xl border border-[var(--border)]">
          <Truck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-[var(--text-muted)]">تدفق المساعدات الإغاثية اليوم:</span>
          <strong className="text-emerald-600 dark:text-emerald-400 font-mono">114 شاحنة مسجلة</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* قائمة المحاور والمحافظات */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-[var(--text-muted)] block mb-1">
            اختر المنطقة لعرض الموقف الإنساني والخدماتي:
          </span>
          {SECTORS.map((sec) => {
            const isSelected = selectedSector.id === sec.id;
            const isCritical = sec.status === "critical";

            return (
              <div
                key={sec.id}
                onClick={() => setSelectedSector(sec)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-[var(--primary)]/10 border-[var(--primary)] ring-1 ring-[var(--primary)]/40 shadow-sm"
                    : "bg-[var(--bg)] border-[var(--border)] hover:border-[var(--primary)]/40"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm text-[var(--text)]">{sec.name}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isCritical
                        ? "bg-rose-500/15 text-rose-600"
                        : "bg-amber-500/15 text-amber-600"
                    }`}
                  >
                    {sec.statusText}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                  <span className="truncate max-w-[180px]">{sec.medicalAidStatus}</span>
                  <span className="shrink-0">{sec.lastUpdate}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* لوحة تفاصيل المحور المختار */}
        <div className="lg:col-span-2 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
              <div>
                <span className="text-xs text-[var(--primary)] font-bold block mb-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>الموقف الإنساني والتطويرات الخدماتية</span>
                </span>
                <h3 className="text-xl font-black text-[var(--text)]">
                  {selectedSector.name}
                </h3>
              </div>
              <span className="text-xs text-[var(--text-muted)] bg-[var(--surface)] px-3 py-1 rounded-full border border-[var(--border)] flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>آخر تحديث معتمد: {selectedSector.lastUpdate}</span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] space-y-2">
              <span className="text-xs font-bold text-[var(--text)] flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>خلاصة المتابعة الميدانية والجهود المجتمعية:</span>
              </span>
              <p className="text-sm text-[var(--text)] leading-relaxed">
                {selectedSector.details}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <span className="text-xs text-[var(--text-muted)] block mb-1">
                  حالة القطاع الصحي والإسعافي:
                </span>
                <span className="text-sm font-bold text-[var(--text)] flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-rose-500" />
                  <span>{selectedSector.medicalAidStatus}</span>
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <span className="text-xs text-[var(--text-muted)] block mb-1">
                  المصادر المعتمدة ونسبة الموثوقية:
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{selectedSector.verifiedSource}</span>
                </span>
                <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">
                  {selectedSector.trustScore}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center justify-between text-xs text-[var(--text-muted)] gap-2">
            <span>🛡️ تلتزم غرفة المتابعة بالمعايير الإنسانية الدولية والامتناع عن بث أي بيانات تشغيلية حساسة.</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">● تدفق معلومات موثق</span>
          </div>
        </div>
      </div>
    </section>
  );
}
