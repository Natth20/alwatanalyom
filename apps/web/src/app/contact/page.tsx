"use client";

import { useState } from "react";
import InstitutionalNav from "@/components/InstitutionalNav";
import {
  Mail,
  Send,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  PhoneCall,
  MapPin,
  Globe,
  Radio,
  FileText,
  User,
  AtSign,
  Phone,
  Sparkles,
  Lock,
  ExternalLink,
  MessageSquare,
  BadgeAlert,
  Headphones,
  Check,
  AlertCircle,
  Award,
} from "lucide-react";
import Link from "next/link";

interface Department {
  id: string;
  title: string;
  sla: string;
  desc: string;
  email: string;
  icon: any;
  color: string;
}

const DEPARTMENTS: Department[] = [
  {
    id: "editorial",
    title: "غرفة التحرير والميدان 24/7",
    sla: "خلال 15 - 30 دقيقة",
    desc: "لتغطية الأخبار العاجلة، التصحيحات الصحفية الميدانية، وتدقيق الروايات الإخبارية.",
    email: "editorial@alwatantoday.net",
    icon: Radio,
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
  {
    id: "opinion",
    title: "ديسك الرأي والتحليلات",
    sla: "خلال 4 ساعات عمل",
    desc: "لاستقبال مقالات الرأي، الدراسات الاستراتيجية، وأبحاث مراكز الفكر المستقلة.",
    email: "opinion@alwatantoday.net",
    icon: FileText,
    color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  {
    id: "advertising",
    title: "إدارة الإعلانات والرعايات",
    sla: "خلال ساعتين",
    desc: "لحجز المساحات الإعلانية، رعاية إيجاز الصباح، وحملات يلا سبورت الرياضية.",
    email: "ads@alwatantoday.net",
    icon: Building2,
    color: "text-[var(--gold)] border-[var(--gold)]/30 bg-[var(--gold)]/10",
  },
  {
    id: "technical",
    title: "أمن المعلومات والدعم التقني",
    sla: "استجابة فورية",
    desc: "للإبلاغ عن أعطال الموقع، مشاكل التشفير، ومقترحات تحسين تجربة القراءة.",
    email: "tech@alwatantoday.net",
    icon: Lock,
    color: "text-sky-400 border-sky-500/30 bg-sky-500/10",
  },
  {
    id: "management",
    title: "مكتب رئيس التحرير والمستشار القانوني",
    sla: "خلال 24 ساعة",
    desc: "للشكاوى المؤسسية الكبرى، قضايا الملكية الفكرية، والتعاون الدولي الإخباري.",
    email: "legal@alwatantoday.net",
    icon: ShieldCheck,
    color: "text-rose-400 border-rose-500/30 bg-rose-500/10",
  },
];

const BUREAUS = [
  {
    city: "القدس الشريف",
    role: "المقر السيادي وهيئة التحرير",
    address: "شارع صلاح الدين، القدس المحتلة",
    phone: "+972 2 628 0000",
  },
  {
    city: "رام الله",
    role: "المكتب الميداني المركزي",
    address: "حي الماصيون، عمارة البرج الصحفي",
    phone: "+970 2 298 0000",
  },
  {
    city: "غزة الصامدة",
    role: "غرفة عمليات المراسلين والطوارئ",
    address: "شارع الوحدة، مجمع التحرير الميداني",
    phone: "+970 8 284 0000",
  },
  {
    city: "عمان",
    role: "ديسك المتابعة الإقليمية والدولية",
    address: "الشميساني، مجمع الصحافة العربية",
    phone: "+962 6 560 0000",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("editorial");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ticketCode, setTicketCode] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          department: selectedDept,
          subject: subject || undefined,
          message,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        setTicketCode(`AWT-MSG-${Date.now().toString().slice(-6)}`);
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else {
        setSubmitError(
          json?.error?.message || "تعذر إرسال الرسالة، يرجى مراجعة الحقول المطلوبة."
        );
      }
    } catch {
      setSubmitError("تعذر الاتصال بالخادم حالياً. يرجى إعادة المحاولة.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 selection:text-white pb-24">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="contact" />

      {/* 1. Hero Header السينمائي الفاخر */}
      <section className="relative overflow-hidden border-b border-[var(--gold)]/20 bg-gradient-to-b from-[#1b020a] via-[#140006] to-[#0E0407] py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/12 via-rose-950/20 to-transparent pointer-events-none" />

        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[var(--gold)] text-xs font-black shadow-lg shadow-amber-950/20">
            <Headphones className="w-4 h-4 text-[var(--gold)]" />
            <span>بوابة الاتصال المباشر بهيئة التحرير وغرف العمليات الميدانية</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            تواصل مع صرح «الوطن اليوم»
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-3xl mx-auto leading-relaxed">
            نسعد بتلقي ملاحظاتكم، مقترحاتكم، وبياناتكم الصحفية. نلتزم باتفاقية مستوى خدمة (SLA) صارمة تضمن الرد على رسالتكم من الغرفة التحريرية المختصة بأعلى سرعة ومهنية ومسؤولية.
          </p>
        </div>
      </section>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* 2. غرف العمليات الخمس المباشرة مع مؤشرات الـ SLA */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider block">
              الأقسام التخصصية المعتمدة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              غرف المتابعة ومؤشرات سرعة الاستجابة (SLA)
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              اختر القسم المعني لتوجيه رسالتك مباشرة إلى فريقه المختص
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEPARTMENTS.map((dept) => {
              const Icon = dept.icon;
              const isSelected = selectedDept === dept.id;

              return (
                <div
                  key={dept.id}
                  onClick={() => setSelectedDept(dept.id)}
                  className={`rounded-2xl border p-5 transition-all duration-300 cursor-pointer space-y-3.5 ${
                    isSelected
                      ? "border-[var(--gold)] bg-gradient-to-b from-[#25020c] via-[#1a0108] to-[#140006] shadow-xl shadow-amber-950/25 scale-[1.01]"
                      : "border-white/10 bg-[#16060B]/70 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold border ${dept.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-stone-300 font-mono">
                      {dept.sla}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white">{dept.title}</h3>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed line-clamp-2">
                      {dept.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-[var(--gold)] font-bold">
                    {dept.email}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. استمارة الاتصال التفاعلية السريعة مع توليد رقم التذكرة */}
        <section className="rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-b from-[#1c020a] via-[#140006] to-[#0E0407] p-6 sm:p-9 space-y-8 shadow-2xl">
          <div className="border-b border-white/10 pb-4 space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--gold)]">
              <MessageSquare className="w-4 h-4" />
              <span>استمارة التواصل المباشر مع الديسك المختص</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              أرسل رسالتك أو استفسارك لهيئة التحرير
            </h2>
            <p className="text-xs text-stone-400">
              سيتم توجيه رسالتك فوراً إلى الغرفة المختارة أعلاه وتوليد رقم تذكرة فوري
            </p>
          </div>

          {ticketCode ? (
            <div className="p-8 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-4 animate-in fade-in">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
              <h3 className="text-lg font-black text-emerald-300">
                تم استلام رسالتك بنجاح وتحويلها لغرفة العمليات!
              </h3>
              <p className="text-xs text-stone-200 max-w-md mx-auto leading-relaxed">
                رقم التذكرة الصادر لطلبك هو: <strong className="text-[var(--gold)] font-mono text-base">{ticketCode}</strong>. سيصلك الرد على بريدك الإلكتروني وفق مؤشر الـ SLA المحدد للغرفة.
              </p>
              <button
                onClick={() => setTicketCode(null)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer hover:brightness-110 transition-all"
              >
                إرسال استفسار آخر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-right">
              {submitError && (
                <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300 block">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="الاسم الكريم..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300 block">
                    البريد الإلكتروني للرد *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300 block">
                    رقم الهاتف / واتساب (اختياري)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+970 / +972..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300 block">
                  موضوع الرسالة *
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="موضوع التواصل باختصار..."
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300 block">
                  نص الرسالة أو المقترح أو الشكوى *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="اكتب رسالتك بالتفصيل..."
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-slate-950 font-black text-xs hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-950/20"
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
                <span>
                  {submitting ? "جاري الإرسال للغرفة..." : "إرسال الرسالة إلى هيئة التحرير"}
                </span>
              </button>
            </form>
          )}
        </section>

        {/* 4. مقرات المكاتب وغرف العمليات الميدانية */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider block">
              الانتشار الميداني
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              المكاتب الميدانية وغرف التحرير المركزية
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BUREAUS.map((bureau, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl space-y-3 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold)] flex items-center justify-center font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-[var(--gold)] font-bold">
                    معتمد
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">{bureau.city}</h4>
                  <span className="text-[11px] text-[var(--gold)] block font-medium">
                    {bureau.role}
                  </span>
                  <p className="text-[11px] text-stone-400">{bureau.address}</p>
                </div>
                <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-stone-300">
                  {bureau.phone}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
