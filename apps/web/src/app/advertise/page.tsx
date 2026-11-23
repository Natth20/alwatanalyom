"use client";

import { useState } from "react";
import InstitutionalNav from "@/components/InstitutionalNav";
import {
  Megaphone,
  ShieldCheck,
  CheckCircle2,
  Layout,
  Smartphone,
  Eye,
  Mail,
  Sliders,
  TrendingUp,
  Sparkles,
  Send,
  Coins,
  Trophy,
  Layers,
  Award,
  Globe2,
} from "lucide-react";
import Link from "next/link";

interface AdPlacement {
  id: string;
  name: string;
  dimensions: string;
  placement: string;
  views: string;
  description: string;
  badge: string;
  icon: any;
}

const PLACEMENTS: AdPlacement[] = [
  {
    id: "hero-leaderboard",
    name: "البانر الرئاسي الفاخر (Hero Leaderboard)",
    dimensions: "970 × 90 أو 728 × 90",
    placement: "أعلى الصفحة الرئيسية وتحت الهيدر مباشرة",
    views: "+150,000 ظهور يومي",
    description: "المساحة الأكثر هيبة وظهوراً على الإطلاق، تحظى بانتباه 100% من الزوار فور فتح الموقع.",
    badge: "المساحة الماسية",
    icon: Layout,
  },
  {
    id: "breaking-sponsor",
    name: "راعي شريط العاجل الميداني 24/7",
    dimensions: "شعار تفاعلي + وسم رعاية",
    placement: "مرافق لشريط الأخبار العاجلة على مدار الساعة",
    views: "+300,000 ظهور يومي",
    description: "يقترن اسم علامتك التجارية بمصدر الحقيقة الموثوق، مع نقرة مباشرة إلى منصتك.",
    badge: "الأعلى تفاعلاً",
    icon: Sparkles,
  },
  {
    id: "morning-brief",
    name: "رعاية إيجاز الفجر الملكي (Newsletter)",
    dimensions: "بطاقة رعاية بريدية كاملة",
    placement: "في صلب البريد اليومي الواصل لآلاف المشتركين فجراً",
    views: "وصول مباشر لبريد صناع القرار",
    description: "تصل رسالتك التسويقية إلى بريد النخب، الصحفيين، والمهنيين مع معدل فتح يتجاوز 42%.",
    badge: "جمهور نوعي",
    icon: Mail,
  },
  {
    id: "sports-sponsor",
    name: "رعاية مباريات واستوديو «يلا سبورت»",
    dimensions: "بانر رادار المباريات + فيديو",
    placement: "صفحة يلا سبورت ومباريات دوري أبطال أوروبا",
    views: "+200,000 متابع رياضي",
    description: "استهدف الجمهور الرياضي الشغوف بمباريات اليوم ونتائج الملاعب الأوروبية والعربية.",
    badge: "شريك كروي",
    icon: Trophy,
  },
];

export default function AdvertisePage() {
  const [budget, setBudget] = useState<number>(1500);
  const [selectedAudience, setSelectedAudience] = useState<string>("palestine");
  const [selectedPlacement, setSelectedPlacement] = useState<string>("hero-leaderboard");

  // نموذج الحجز الفوري
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<string | null>(null);

  // حسابات التأثير اللحظية
  const impressions = Math.round(budget * 14200);
  const clicks = Math.round(impressions * 0.034);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
    setSubmitting(true);
    setTimeout(() => {
      const code = `AWT-ADS-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingConfirmed(code);
      setSubmitting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 selection:text-white pb-24">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="advertise" />

      {/* 1. Hero Header السينمائي الفاخر */}
      <div className="relative overflow-hidden border-b border-[var(--gold)]/20 bg-gradient-to-b from-[#1b020a] via-[#140006] to-[#0E0407] py-14 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-rose-950/20 to-transparent pointer-events-none" />
        
        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-bold shadow-md shadow-amber-950/20">
            <Megaphone className="w-4 h-4" />
            <span>بوابة الشراكات الإستراتيجية والرعايات المؤسسية الفاخرة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            أعلن مع «الوطن اليوم» وشريكها «يلا سبورت»
          </h1>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
            اربط علامتك التجارية بأرقى منصة إعلامية رقمية موثوقة في فلسطين والمنطقة العربية. نضمن وصول إعلانك لجمهور بشري حقيقي بدون أي روبوتات، وبمساحات ثابتة تحترم القارئ وتزيد من العائد على الاستثمار.
          </p>
        </div>
      </div>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-14">
        {/* 2. حاسبة ميزانية وتأثير الوصول التفاعلية (ROI & Reach Calculator) */}
        <div className="rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-b from-[#1c020a] via-[#140006] to-[#0E0407] p-6 sm:p-8 space-y-8 shadow-2xl">
          <div className="border-b border-white/10 pb-4 space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--gold)]">
              <Sliders className="w-4 h-4" />
              <span>الحاسبة الذكية لعائد الاستثمار الإعلاني</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              احسب حجم وصول حملتك بدقة فورية
            </h2>
            <p className="text-xs text-stone-400">
              حرك شريط الميزانية واختر النطاق الجغرافي لمعرفة عدد الظهور والنقرات المتوقعة
            </p>
          </div>

          <div className="space-y-6">
            {/* شريط تمرير الميزانية */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-300">
                  الميزانية المقترحة للحملة:
                </span>
                <span className="text-2xl font-black text-[var(--gold)] font-mono">
                  ${budget.toLocaleString()} دولار
                </span>
              </div>
              <input
                type="range"
                min="300"
                max="10000"
                step="100"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-[var(--gold)] cursor-pointer h-2 bg-black/60 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                <span>$300 (حملة مرنة)</span>
                <span>$2,500</span>
                <span>$5,000</span>
                <span>$10,000 (رعاية سيادية كبرى)</span>
              </div>
            </div>

            {/* تحديد الجمهور المستهدف */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-300 block">
                الجمهور الجغرافي المستهدف:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "palestine", label: "🇵🇸 فلسطين، القدس، وغزة", sub: "تأثير محلي مباشر" },
                  { id: "gulf", label: "🇸🇦 الخليج العربي والعواصم", sub: "قوة شرائية عالية" },
                  { id: "global", label: "🌍 المغتربون والعالم العربي", sub: "انتشار دولي واسع" },
                ].map((aud) => (
                  <button
                    key={aud.id}
                    type="button"
                    onClick={() => setSelectedAudience(aud.id)}
                    className={`p-3.5 rounded-2xl border text-right transition-all cursor-pointer ${
                      selectedAudience === aud.id
                        ? "border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold)] font-bold shadow-md shadow-amber-950/20"
                        : "border-white/10 bg-black/40 text-stone-300 hover:bg-white/5"
                    }`}
                  >
                    <span className="text-xs block font-bold">{aud.label}</span>
                    <span className="text-[10px] opacity-70 block mt-0.5">{aud.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* بطاقات النتائج اللحظية المتوقعة */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-black/50 border border-emerald-500/30 space-y-1">
                <span className="text-[11px] text-stone-400 block font-medium">الظهور الفعلي المضمون</span>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                  {impressions.toLocaleString("ar-EG")}
                </div>
                <span className="text-[10px] text-stone-400 block">مشاهدة حقيقية 100%</span>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-[var(--gold)]/30 space-y-1">
                <span className="text-[11px] text-stone-400 block font-medium">النقرات المتوقعة لموقعك</span>
                <div className="text-2xl sm:text-3xl font-black text-[var(--gold)] font-mono">
                  {clicks.toLocaleString("ar-EG")}
                </div>
                <span className="text-[10px] text-stone-400 block">CTR مرتفع بمعدل 3.4%</span>
              </div>

              <div className="p-4 rounded-2xl bg-black/50 border border-sky-500/30 space-y-1">
                <span className="text-[11px] text-stone-400 block font-medium">ضمان النقاء البرمجي</span>
                <div className="text-xl sm:text-2xl font-black text-sky-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-5 h-5 text-sky-400" />
                  <span>Zero-Bot</span>
                </div>
                <span className="text-[10px] text-stone-400 block">فلترة فورية لحركة الروبوتات</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. معرض المساحات الإعلانية التفاعلي 3D (Ad Showroom) */}
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider block">
              المساحات المتاحة
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              معرض المساحات الإعلانية المعتمدة (Zero CLS)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PLACEMENTS.map((ad) => {
              const Icon = ad.icon;
              const isSelected = selectedPlacement === ad.id;

              return (
                <div
                  key={ad.id}
                  onClick={() => setSelectedPlacement(ad.id)}
                  className={`rounded-3xl border p-6 transition-all duration-300 cursor-pointer space-y-4 ${
                    isSelected
                      ? "border-[var(--gold)] bg-gradient-to-b from-[#25020c] to-[#140006] shadow-xl shadow-amber-950/20 scale-[1.01]"
                      : "border-white/10 bg-[#16060B]/70 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--gold)]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-white">{ad.name}</h3>
                        <span className="text-[11px] text-stone-400 font-mono">{ad.dimensions}</span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full bg-[var(--gold)]/20 text-[var(--gold)] text-[10px] font-bold border border-[var(--gold)]/30">
                      {ad.badge}
                    </span>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {ad.description}
                  </p>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="text-stone-400">{ad.placement}</span>
                    <strong className="text-emerald-400 font-mono">{ad.views}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. نموذج حجز رعاية وشراكة فوري يتصل بنظام الإعلانات */}
        <div className="rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-b from-[#1c020a] via-[#140006] to-[#0E0407] p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4 space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--gold)]">
              <Mail className="w-4 h-4" />
              <span>فريق العلاقات العامة والشراكات المؤسسية</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              احجز مساحتك أو اطلب خطة رعاية مخصصة
            </h3>
            <p className="text-xs text-stone-400">
              سيقوم مستشار الحملات الإعلانية بالتواصل معك خلال ساعتين لتأكيد الحجز وتزويدك بالتقرير المالي
            </p>
          </div>

          {bookingConfirmed ? (
            <div className="p-8 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-4 animate-in fade-in">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-black text-emerald-300">
                تم استلام طلب حجز الحملة الإعلانية بنجاح!
              </h4>
              <p className="text-xs text-stone-200 max-w-md mx-auto leading-relaxed">
                رقم حجز الحملة: <strong className="text-[var(--gold)] font-mono text-sm">{bookingConfirmed}</strong>. تم تحويل الطلب إلى قسم إدارة الإعلانات في كابينة الإدارة.
              </p>
              <button
                onClick={() => setBookingConfirmed(null)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs"
              >
                حجز حملة إضافية
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4 text-right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">
                    الاسم الكامل للمعلن أو المسؤول *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="الاسم الكريم..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">
                    اسم الشركة أو المؤسسة أو العلامة التجارية
                  </label>
                  <input
                    type="text"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    placeholder="اسم الجهة الراعية..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">
                    البريد الإلكتروني المهني للتواصل *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="marketing@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">
                    رقم الهاتف / واتساب للتواصل السريع
                  </label>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+970 / +972 / +966..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300">
                  ملاحظات إضافية أو موعد الإطلاق المفضل
                </label>
                <textarea
                  rows={2}
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                  placeholder="الموعد المقترح لبدء الحملة، رغبات خاصة، إلخ..."
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-slate-950 font-black text-xs hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-950/20"
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
                <span>{submitting ? "جاري تسجيل الحجز..." : "تأكيد طلب حجز الرعاية الفوري"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
