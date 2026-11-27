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
  Copy,
  RefreshCw,
  Layers,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface Department {
  id: "editorial" | "opinion" | "advertising" | "technical" | "management";
  title: string;
  sla: string;
  desc: string;
  email: string;
  icon: any;
  badgeColor: string;
}

const DEPARTMENTS: Department[] = [
  {
    id: "editorial",
    title: "غرفة التحرير والميدان 24/7",
    sla: "خلال 15 - 30 دقيقة",
    desc: "لتغطية الأخبار العاجلة، التصحيحات الميدانية، وتدقيق الروايات الإخبارية من القدس وغزة والضفة.",
    email: "editorial@alwatantoday.net",
    icon: Radio,
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  },
  {
    id: "opinion",
    title: "ديسك الرأي والتحليلات",
    sla: "خلال 4 ساعات عمل",
    desc: "لاستقبال مقالات الرأي، الدراسات الاستراتيجية، ومساهمات الكتاب والباحثين المستقلين.",
    email: "opinion@alwatantoday.net",
    icon: FileText,
    badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
  },
  {
    id: "advertising",
    title: "إدارة الإعلانات والرعايات",
    sla: "خلال ساعتين",
    desc: "لحجز المساحات الإعلانية، رعاية إيجاز الصباح الاقتصادي، وحملات تغطيات يلا سبورت.",
    email: "ads@alwatantoday.net",
    icon: Building2,
    badgeColor: "text-[var(--gold)] border-[var(--gold)]/30 bg-[var(--gold)]/10",
  },
  {
    id: "technical",
    title: "أمن المعلومات والدعم التقني",
    sla: "استجابة فورية",
    desc: "للإبلاغ عن أعطال الموقع، مشاكل التشفير، أو مقترحات تحسين تجربة القراءة والأرشفة.",
    email: "tech@alwatantoday.net",
    icon: Lock,
    badgeColor: "text-sky-400 border-sky-500/30 bg-sky-500/10",
  },
  {
    id: "management",
    title: "رئاسة التحرير والمستشار القانوني",
    sla: "خلال 24 ساعة",
    desc: "للشكاوى المؤسسية الكبرى، قضايا الملكية الفكرية، واتفاقيات التعاون الإخباري الدولي.",
    email: "legal@alwatantoday.net",
    icon: ShieldCheck,
    badgeColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
  },
];

const BUREAUS = [
  {
    id: "jerusalem",
    city: "القدس الشريف",
    role: "المقر السيادي وهيئة التحرير المركزية",
    address: "شارع صلاح الدين، القدس المحتلة",
    phone: "+972 2 628 0000",
    satellite: "Inmarsat BGAN: #8707-7200-AWT",
    coverage: "القدس العتيقة، أحياء العاصمة، والداخل المحتل",
  },
  {
    id: "ramallah",
    city: "رام الله والبيرة",
    role: "المكتب الميداني لوسط الضفة الغربية",
    address: "حي الماصيون، عمارة البرج الصحفي، ط 4",
    phone: "+970 2 298 0000",
    satellite: "Thuraya Emergency: #8821-6540-AWT",
    coverage: "رام الله، نابلس، جنين، طولكرم، والخليل",
  },
  {
    id: "gaza",
    city: "غزة الصامدة",
    role: "غرفة عمليات المراسلين وملاذ الطوارئ الميداني",
    address: "شارع الوحدة، مجمع التحرير والاستجابة السريعة",
    phone: "+970 8 284 0000",
    satellite: "Iridium Extreme PTT: #8816-9021-GAZ",
    coverage: "كافة محافظات قطاع غزة وشماله الصامد",
  },
  {
    id: "amman",
    city: "عمان",
    role: "ديسك المتابعة الإقليمية والدولية",
    address: "منطقة الشميساني، مجمع الصحافة العربية، مبنى 12",
    phone: "+962 6 560 0000",
    satellite: "VoIP Trunk: amman-hub.alwatantoday.net",
    coverage: "الأردن، المشرق العربي، والشتات الفلسطيني",
  },
  {
    id: "cairo",
    city: "القاهرة",
    role: "مكتب التنسيق العربي والدبلوماسي",
    address: "حي المهندسين، شارع جامعة الدول العربية",
    phone: "+20 2 3340 0000",
    satellite: "Direct Line: cairo-desk.alwatantoday.net",
    coverage: "مصر، شمال أفريقيا، والمنظمات الإقليمية",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [selectedDept, setSelectedDept] = useState<
    "editorial" | "opinion" | "advertising" | "technical" | "management"
  >("editorial");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ticketCode, setTicketCode] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedTicket, setCopiedTicket] = useState(false);

  // Active bureau card
  const [activeBureau, setActiveBureau] = useState("jerusalem");

  const currentDept = DEPARTMENTS.find((d) => d.id === selectedDept) || DEPARTMENTS[0];

  const handleSelectDepartment = (deptId: typeof selectedDept) => {
    setSelectedDept(deptId);
    const formElement = document.getElementById("contact-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message || message.length < 10) {
      setSubmitError("يرجى التأكد من كتابة الاسم والبريد ورسالة لا تقل عن 10 أحرف.");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone.trim() || undefined,
          department: selectedDept,
          subject: subject.trim() || undefined,
          message,
        }),
      });
      const json = await res.json();
      if (res.ok) {
        const generatedCode = `AWT-MSG-${Date.now().toString().slice(-6)}`;
        setTicketCode(generatedCode);
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      } else {
        setSubmitError(json?.error?.message || "تعذر إرسال الرسالة، يرجى مراجعة الحقول وإعادة المحاولة.");
      }
    } catch {
      setSubmitError("تعذر الاتصال بمركز الاتصال المؤسسي حالياً. يرجى المحاولة لاحقاً.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyTicket = () => {
    if (ticketCode && typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(ticketCode);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 3000);
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
            <Radio className="w-4 h-4 text-[var(--gold)] animate-pulse" />
            <span>غرفة العمليات المركزية وقنوات التواصل السيادي المعتمدة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            الاتصال بهيئة التحرير وغرفة العمليات
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-3xl mx-auto leading-relaxed">
            نضع قنوات تواصل مفتوحة ومباشرة بين القراء، المراسلين الميدانيين، والباحثين، ومسؤولي التحرير. اختر الديسك المعني أدناه لتوجيه رسالتك مباشرة إلى الفريق المختص وضمان سرعة الاستجابة الميدانية.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-ping" />
              <span>ديسك الطوارئ الميداني: يعمل 24 ساعة دون توقف</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-stone-300 text-xs font-mono">
              السنترال الموحد: contact@alwatantoday.net
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* 2. Interactive Department Desk Router */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[var(--gold)]" />
                <span>الموزع التفاعلي للمكاتب والديسكات المتخصصة</span>
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                اضغط على الديسك المطلوب لربطه مباشرة بنموذج المراسلة والاطلاع على سرعة الرد المضمونة
              </p>
            </div>
            <div className="text-xs text-stone-400 font-mono">
              القسم المختار حالياً: <span className="text-[var(--gold)] font-bold">{currentDept.title}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEPARTMENTS.map((dept) => {
              const isSelected = selectedDept === dept.id;
              const Icon = dept.icon;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => handleSelectDepartment(dept.id)}
                  className={`p-5 rounded-3xl border text-right transition-all flex flex-col justify-between gap-4 ${
                    isSelected
                      ? "border-[var(--gold)] bg-gradient-to-b from-[#240a12] to-[#16060b] shadow-2xl scale-[1.02]"
                      : "border-white/10 bg-[#16060B]/60 hover:border-white/25 hover:bg-[#16060B]"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold border ${dept.badgeColor}`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${dept.badgeColor}`}>
                        {dept.sla}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-black text-white text-sm sm:text-base">{dept.title}</h3>
                      <p className="text-xs text-stone-400 mt-1 leading-relaxed">{dept.desc}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                    <span className="font-mono text-stone-400 text-[11px]">{dept.email}</span>
                    <span className={`font-bold flex items-center gap-1 ${isSelected ? "text-[var(--gold)]" : "text-stone-500"}`}>
                      <span>{isSelected ? "محدد للرسالة" : "تحديد"}</span>
                      <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 3. The Interactive Contact Form & Live Dispatch Ticket */}
        <section id="contact-form-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (8 Cols) */}
          <div className="lg:col-span-8 rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 sm:p-9 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-[var(--gold)]" />
                  <span>إرسال برقية أو استفسار رسمي</span>
                </h2>
                <p className="text-xs text-stone-400 mt-1">
                  موجهة تلقائياً إلى: <strong className="text-white">{currentDept.title}</strong>
                </p>
              </div>

              <div className="px-3 py-1 rounded-xl bg-black/50 border border-white/10 text-stone-300 text-xs font-mono self-start sm:self-auto">
                SLA: {currentDept.sla}
              </div>
            </div>

            {submitError && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {ticketCode ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">تم استلام برقيتك وإرسالها للديسك المختص!</h3>
                <p className="text-xs text-stone-300 max-w-lg mx-auto leading-relaxed">
                  تم قيد رسالتك في جدول الاستجابة المركزية لـ ({currentDept.title}). احتفظ برقم التذكرة التالي للمتابعة:
                </p>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <div className="px-5 py-3 rounded-xl bg-black/60 border border-emerald-500/50 text-emerald-300 font-mono text-base font-black tracking-wider">
                    {ticketCode}
                  </div>
                  <button
                    onClick={handleCopyTicket}
                    className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                    title="نسخ كود التذكرة"
                  >
                    {copiedTicket ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => setTicketCode(null)}
                    className="text-xs text-stone-400 hover:text-white underline transition-all"
                  >
                    إرسال برقية أخرى
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      <span>الاسم الكامل أو الصفة *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="مثال: د. حسام النجار"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[var(--gold)] focus:outline-none placeholder:text-stone-600"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                      <AtSign className="w-3.5 h-3.5 text-stone-400" />
                      <span>البريد الإلكتروني للرد *</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hossam@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[var(--gold)] focus:outline-none placeholder:text-stone-600 font-mono text-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>رقم الهاتف أو تطبيق Signal (اختياري)</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+970 59..."
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[var(--gold)] focus:outline-none placeholder:text-stone-600 font-mono text-left"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                      <span>موضوع البرقية *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="موجز محدد لموضوع الرسالة"
                      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:border-[var(--gold)] focus:outline-none placeholder:text-stone-600"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-300">نص الرسالة أو الاستفسار بالتفصيل *</label>
                    <span className="text-[10px] text-stone-500">{message.length}/4000 حرف</span>
                  </div>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب رسالتك بوضوح... إذا كان الموضوع يخص خبراً عاجلاً أو تصحيحاً اذكر رابط المادة أو تفاصيل الزمان والمكان."
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white text-xs sm:text-sm focus:border-[var(--gold)] focus:outline-none leading-relaxed placeholder:text-stone-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-2xl bg-[var(--gold)] hover:bg-[#d49e00] text-black font-black text-sm transition-all shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>جارٍ إرسال البرقية وتوليد كود التذكرة...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>إرسال البرقية إلى {currentDept.title}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Rail: Sovereign Bureau Network (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                <Globe className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="text-sm font-bold text-white">شبكة مكاتب العواصم الإخبارية</h3>
              </div>

              {/* Bureau Tabs */}
              <div className="flex flex-wrap gap-1.5 pb-1">
                {BUREAUS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setActiveBureau(b.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeBureau === b.id
                        ? "bg-[var(--gold)] text-black"
                        : "bg-white/5 text-stone-400 hover:text-white"
                    }`}
                  >
                    {b.city}
                  </button>
                ))}
              </div>

              {/* Active Bureau Details */}
              {(() => {
                const b = BUREAUS.find((x) => x.id === activeBureau) || BUREAUS[0];
                return (
                  <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs">
                    <div>
                      <div className="font-black text-white text-sm">{b.city}</div>
                      <div className="text-[11px] text-[var(--gold)] font-medium mt-0.5">{b.role}</div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/5 text-stone-300">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 mt-0.5 shrink-0" />
                        <span>{b.address}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <PhoneCall className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{b.phone}</span>
                      </div>
                      <div className="flex items-start gap-2 font-mono text-[11px] text-emerald-400">
                        <Radio className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{b.satellite}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5 text-[11px] text-stone-400">
                      نطاق التغطية: {b.coverage}
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Emergency Hotline for Field Press */}
            <div className="rounded-3xl border border-rose-500/40 bg-gradient-to-b from-[#2a0610] to-[#160309] p-6 space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                <BadgeAlert className="w-4 h-4 animate-bounce" />
                <span>خط الطوارئ الصحفي والميداني العاجل</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                للصحفيين والمراسلين في الميدان أو مصادر الإغاثة الطبية الذين يواجهون تهديدات أمنية مباشرة، يمكن الاتصال بخط الطوارئ المشفر عبر تطبيق Signal على مدار الساعة.
              </p>
              <div className="pt-2">
                <Link
                  href="/submit-news"
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-950/50"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>الانتقال لقناة التسريبات المشفرة</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
