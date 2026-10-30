"use client";

import { useState } from "react";
import { ShieldAlert, Activity, Flame, Truck, Crosshair, AlertTriangle, CheckCircle, Radio } from "lucide-react";

interface SectorStatus {
  id: string;
  name: string;
  status: "critical" | "warning" | "stable";
  statusText: string;
  details: string;
  medicalAidStatus: string;
  lastUpdate: string;
}

const SECTORS: SectorStatus[] = [
  {
    id: "gaza-north",
    name: "شمال غزة وجباليا وبيت لاهيا",
    status: "critical",
    statusText: "حصار مشدد وقصف متقطع",
    details: "المنظومة الطبية تعمل بأقل من 15% من طاقتها، واستمرار عمل فرق الإسعاف تحت ظروف بالغة الخطورة.",
    medicalAidStatus: "شح حاد في الوقود والمستلزمات",
    lastUpdate: "منذ 10 دقائق",
  },
  {
    id: "gaza-middle",
    name: "المنطقة الوسطى (دير البلح والنصيرات)",
    status: "warning",
    statusText: "ضغط إنساني كثيف",
    details: "مستشفى شهداء الأقصى يستقبل مئات الحالات يومياً، مع استقرار نسبي في خطوط الإمداد المائي المحلي.",
    medicalAidStatus: "طوارئ مستمرة",
    lastUpdate: "منذ 25 دقيقة",
  },
  {
    id: "gaza-south",
    name: "خان يونس ورفح",
    status: "warning",
    statusText: "حركة نزوح وإيواء",
    details: "توزيع المساعدات الإنسانية والخيام عبر المنظمات الأممية والهلال الأحمر الفلسطيني.",
    medicalAidStatus: "تدفق محدود للمساعدات",
    lastUpdate: "منذ 40 دقيقة",
  },
  {
    id: "westbank-north",
    name: "جنين وطولكرم ومخيماتها",
    status: "warning",
    statusText: "اقتحامات وتجريف للبنى",
    details: "طواقم البلديات والدفاع المدني تعيد تأهيل خطوط الكهرباء والمياه في الشوارع الرئيسية.",
    medicalAidStatus: "المستشفيات الحكومية متأهبة",
    lastUpdate: "منذ ساعة",
  },
  {
    id: "jerusalem",
    name: "القدس الشريف والبلدة القديمة",
    status: "stable",
    statusText: "تشديدات وتدقيق هويات",
    details: "انتظام الصلوات في المسجد الأقصى المبارك مع انتشار حواجز أمنية على أبواب السور التاريخي.",
    medicalAidStatus: "طواقم الإسعاف ترابط في المحيط",
    lastUpdate: "منذ ساعة ونصف",
  },
];

export function LiveWarRoomMap() {
  const [selectedSector, setSelectedSector] = useState<SectorStatus>(SECTORS[0]);

  return (
    <section className="relative rounded-2xl border border-rose-500/30 bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/30 text-white p-6 md:p-8 overflow-hidden shadow-xl">
      <div className="absolute top-0 end-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* الترويسة */}
      <div className="relative flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-lg">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black text-white">
                رادار الميدان · غرفة المتابعة الإنسانية والأمنية
              </h2>
              <span className="text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2.5 py-0.5 rounded-full animate-pulse">
                رصد حي
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              متابعة جغرافية فورية لحالة المحافظات والمعابر، وتدفق الإمدادات والمنظومة الصحية
            </p>
          </div>
        </div>

        {/* عدادات سريعة */}
        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-300">شاحنات المساعدات اليوم:</span>
            <strong className="text-emerald-400 font-mono">114 شاحنة</strong>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* قائمة القطاعات */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-slate-400 block mb-1">
            اختر المنطقة لعرض الموقف الميداني:
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
                    ? "bg-white/15 border-rose-500 ring-1 ring-rose-500/40 shadow-md"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-sm text-white">{sec.name}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isCritical
                        ? "bg-rose-500/30 text-rose-300 animate-pulse"
                        : "bg-amber-500/30 text-amber-300"
                    }`}
                  >
                    {sec.statusText}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{sec.medicalAidStatus}</span>
                  <span>{sec.lastUpdate}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* لوحة تفاصيل القطاع المختار */}
        <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <span className="text-xs text-rose-400 font-semibold block mb-0.5">
                  الموقف الميداني الراهن
                </span>
                <h3 className="text-xl font-black text-white">
                  {selectedSector.name}
                </h3>
              </div>
              <span className="text-xs text-slate-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                آخر تحديث معتمد: {selectedSector.lastUpdate}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-rose-400" />
                <span>تقرير المتابعة الميدانية المباشر:</span>
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedSector.details}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-400 block mb-1">
                  حالة المنظومة الصحية والإسعاف:
                </span>
                <span className="text-sm font-bold text-white flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>{selectedSector.medicalAidStatus}</span>
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-400 block mb-1">
                  المصادر الميدانية المعتمدة:
                </span>
                <span className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>الهلال الأحمر · الدفاع المدني · مستشفيات الصحة</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>بيانات الرادار تُحدث دورياً عبر مندوبي الميدان وغرفة الطوارئ</span>
            <span className="font-mono text-emerald-400">📡 بث مباشر مستقر</span>
          </div>
        </div>
      </div>
    </section>
  );
}
