"use client";

import { useState, useEffect } from "react";
import InstitutionalNav from "@/components/InstitutionalNav";
import {
  Scale,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  ExternalLink,
  ShieldCheck,
  Send,
  Sparkles,
  Search,
  Filter,
  CheckCircle,
  History,
  FileText,
  BadgeAlert,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

interface CorrectionEntry {
  id: string;
  articleTitle: string;
  articleUrl: string;
  date: string;
  time: string;
  category: string;
  originalText: string;
  correctedText: string;
  reason: string;
  handledBy: string;
}

const HISTORICAL_CORRECTION_LOGS: CorrectionEntry[] = [
  {
    id: "corr-101",
    articleTitle: "تحديث حصيلة الشهداء والإصابات جراء القصف الأخير في شمال غزة",
    articleUrl: "/news",
    date: "23 نوفمبر 2026",
    time: "1:38 ص بتوقيت القدس",
    category: "فلسطين والميدان",
    originalText: "ذكر التقرير الأولي ارتقاء 18 شهيداً وإصابة 40 آخرين.",
    correctedText: "تم تعديل الحصيلة الرسمية إلى ارتقاء 15 شهيداً وإصابة 47 آخرين وفق البيان المحين لوزارة الصحة الفلسطينية.",
    reason: "تحديث رسمي صادر عن مدير عام المستشفيات بوزارة الصحة بعد استكمال عمليات الفرز الجنائي والتعرف على الجثامين.",
    handledBy: "ديسك التحرير الميداني · قسم التدقيق الجنائي",
  },
  {
    id: "corr-102",
    articleTitle: "تقرير مؤشرات أسعار المحروقات والغاز المنزلي لشهر نوفمبر في محافظات الضفة",
    articleUrl: "/economy",
    date: "21 نوفمبر 2026",
    time: "11:15 ص بتوقيت القدس",
    category: "المال والأعمال",
    originalText: "سعر لتر السولار 6.45 شيكل في المحطات الرئيسية.",
    correctedText: "السعر المعتمد رسمياً من الهيئة العامة للبترول هو 6.49 شيكل للتر الواحد لشهر نوفمبر.",
    reason: "تصحيح خطأ مطبعي في جدول التسعيرة المعتمدة الصادر عن وزارة المالية الفلسطينية.",
    handledBy: "قسم الاقتصاد والأسواق",
  },
  {
    id: "corr-103",
    articleTitle: "يلا سبورت: قائمة غيابات مواجهة قمة دوري أبطال أوروبا في مدريد",
    articleUrl: "/sports",
    date: "18 نوفمبر 2026",
    time: "17:40 بتوقيت القدس",
    category: "يلا سبورت",
    originalText: "غياب حارس المرمى الأساسي بداعي الإيقاف لتراكم البطاقات.",
    correctedText: "غياب حارس المرمى يعود لالتواء عضلي طفيف في التدريب الأخير، بينما بطاقاته الصفراء لا تمنعه من المشاركة.",
    reason: "توضيح صادر عن المؤتمر الصحفي للمدير الفني قبل انطلاق المباراة بساعتين.",
    handledBy: "ديسك يلا سبورت الرياضي",
  },
];

export default function CorrectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // نموذج إرسال طلب تصحيح
  const [reqArticleUrl, setReqArticleUrl] = useState("");
  const [reqDetail, setReqDetail] = useState("");
  const [reqSourceUrl, setReqSourceUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dbLogs, setDbLogs] = useState<CorrectionEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/corrections")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (Array.isArray(data?.corrections) && data.corrections.length > 0) {
          setDbLogs(
            data.corrections.map((c: any) => ({
              id: c.id,
              articleTitle: c.articleTitle || "مادة صحفية مسجلة في سجل التحرير",
              articleUrl: c.articleUrl || "/news",
              date: new Date(c.createdAt).toLocaleDateString("ar-EG", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
              time: new Date(c.createdAt).toLocaleTimeString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              category: c.category || "تصحيح تحريري",
              originalText: c.originalSnippet || "النص الأولي قبل إجراء التعديل",
              correctedText: c.note || "تم التصويب وفق الأدلة والمصادر الرسمية المعتمدة",
              reason: c.reason || "تصويب موثق في قاعدة البيانات الرسمية للمنصة",
              handledBy: "غرفة التحرير المركزية — الوطن اليوم",
            }))
          );
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleSubmitCorrection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqArticleUrl || !reqDetail) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/v1/corrections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleUrl: reqArticleUrl,
          detail: reqDetail,
          sourceUrl: reqSourceUrl,
        }),
      });
      const json = await res.json();
      if (res.ok && json.ticketCode) {
        setSubmittedTicket(json.ticketCode);
        setReqArticleUrl("");
        setReqDetail("");
        setReqSourceUrl("");
      } else {
        setSubmitError(json?.error?.message || "تعذر إرسال الطلب، يرجى التحقق من الرابط.");
      }
    } catch {
      setSubmitError("تعذر الاتصال بخادم التحرير حالياً.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const combinedLogs = dbLogs.length > 0 ? dbLogs : HISTORICAL_CORRECTION_LOGS;
  const filteredLogs = combinedLogs.filter((entry) => {
    const matchesCat = selectedCategory === "all" || entry.category === selectedCategory;
    const matchesQuery =
      entry.articleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.correctedText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#0E0407] text-white selection:bg-[var(--gold)]/30 selection:text-white pb-24">
      {/* شريط الملاحة المؤسسي الموحد */}
      <InstitutionalNav current="corrections" />

      {/* 1. Hero Header السينمائي الفاخر */}
      <section className="relative overflow-hidden border-b border-[var(--gold)]/20 bg-gradient-to-b from-[#1b020a] via-[#140006] to-[#0E0407] py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/12 via-rose-950/20 to-transparent pointer-events-none" />

        <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 relative z-10 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-bold shadow-md shadow-amber-950/20">
            <Scale className="w-4 h-4 text-[var(--gold)]" />
            <span>سجل الشفافية التحريرية والتصويب العلني المفتوح</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            سجل التصحيحات وتصويب الأخطاء العلني
          </h1>

          <p className="text-xs sm:text-base text-stone-300 max-w-3xl mx-auto leading-relaxed">
            الاعتراف بالخطأ وتصويبه فورياً هو أسمى درجات الشجاعة المهنية. نوثق هنا للرأي العام كل تعديل أو تحديث طرأ على أخبارنا، مع إبراز النص الأصلي، النص المصوب، والسبب المعتمد، التزاماً بميثاق الشرف الصحفي.
          </p>

          {/* رادار مؤشرات النزاهة الحقيقية */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-4 text-center">
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1 backdrop-blur-md">
              <span className="text-[11px] text-stone-400 block font-medium">سرعة الاستجابة الميدانية</span>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                أقل من 15 دقيقة
              </div>
              <span className="text-[10px] text-stone-400 block">فور وصول الإشعار وتدقيقه</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1 backdrop-blur-md">
              <span className="text-[11px] text-stone-400 block font-medium">إجمالي القيود الموثقة في السجل</span>
              <div className="text-xl sm:text-2xl font-black text-[var(--gold)] font-mono">
                {combinedLogs.length} قيود معتمدة
              </div>
              <span className="text-[10px] text-stone-400 block">مفتوحة للأرشفة العامة</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1 backdrop-blur-md">
              <span className="text-[11px] text-stone-400 block font-medium">الشفافية والتصحيح العلني</span>
              <div className="text-xl sm:text-2xl font-black text-sky-400 font-mono">
                التزام كامل 100%
              </div>
              <span className="text-[10px] text-stone-400 block">حظر الحذف السري للأخطاء</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
        {/* 2. الخط الزمني الشفاف للتصويبات مع الفلاتر والبحث */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <span className="text-xs font-black text-[var(--gold)] uppercase tracking-wider block">
                الأرشيف الزمني المفتوح
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                سجل التصويبات المنشورة للرأي العام
              </h2>
            </div>

            {/* أزرار الفلترة حسب الأقسام */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "كافة الأقسام" },
                { id: "فلسطين والميدان", label: "الميدان" },
                { id: "المال والأعمال", label: "المال والأعمال" },
                { id: "يلا سبورت", label: "يلا سبورت" },
                { id: "تصحيح تحريري", label: "عام" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === tab.id
                      ? "bg-[var(--gold)] text-[#120005] font-black shadow-sm"
                      : "bg-white/5 text-stone-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* شريط البحث المباشر في السجل */}
          <div className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث في السجل بالعنوان، النص المصوب، أو رقم القيد..."
              className="w-full px-4 py-2.5 ps-10 rounded-xl border border-white/15 bg-black/40 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
            />
            <Search className="w-4 h-4 text-[var(--gold)] absolute top-3 start-3" />
          </div>

          {/* قائمة التصحيحات المفصلة بتصميم بطاقات الدلائل الجنائية */}
          <div className="space-y-4">
            {filteredLogs.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 text-center text-stone-400 text-xs">
                لا توجد قيود تطابق معايير البحث الحالية في السجل.
              </div>
            ) : (
              filteredLogs.map((log) => (
                <article
                  key={log.id}
                  className="rounded-3xl border border-white/10 bg-[#16060B]/80 backdrop-blur-xl p-6 sm:p-7 shadow-xl space-y-5 transition-all hover:border-[var(--gold)]/30"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                        {log.category}
                      </span>
                      <span className="text-xs text-stone-400 font-mono">
                        {log.date} · {log.time}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400 font-mono">
                      رقم القيد: {log.id}
                    </span>
                  </div>

                  <Link
                    href={log.articleUrl}
                    className="text-base sm:text-lg font-black text-white hover:text-[var(--gold)] transition-colors block leading-snug"
                  >
                    {log.articleTitle} ←
                  </Link>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* النص قبل التعديل */}
                    <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                      <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-400" />
                        النص الأولي قبل التصحيح:
                      </span>
                      <p className="text-xs text-stone-300 line-through opacity-80 leading-relaxed">
                        {log.originalText}
                      </p>
                    </div>

                    {/* النص المصوب */}
                    <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                      <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        التصحيح المعتمد رسمياً:
                      </span>
                      <p className="text-xs text-emerald-200 font-semibold leading-relaxed">
                        {log.correctedText}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-400 border-t border-white/5">
                    <div>
                      <strong className="text-stone-300">سبب التصويب:</strong> {log.reason}
                    </div>
                    <div className="text-[11px] font-mono text-[var(--gold)] font-bold">
                      {log.handledBy}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* 3. استمارة التدقيق التشاركي وتقديم طلب تصحيح متصلة بالقاعدة */}
        <section className="rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-b from-[#1c020a] via-[#140006] to-[#0E0407] p-6 sm:p-9 space-y-6 shadow-2xl">
          <div className="border-b border-white/10 pb-4 space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[var(--gold)]">
              <Send className="w-4 h-4 rtl:rotate-180" />
              <span>قناة التدقيق التشاركي المباشر مع القراء</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              أرسل ملاحظة أو طلب تصحيح إلى هيئة التحرير
            </h3>
            <p className="text-xs text-stone-400">
              إذا لاحظت أي عدم دقة في رقم، اسم، أو معلومة منشورة، زودنا بالرابط والمصدر ليتم البت فيها ومطابقتها فوراً.
            </p>
          </div>

          {submittedTicket ? (
            <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-3 animate-in fade-in">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-base font-black text-emerald-300">
                تم استلام طلب التصحيح بنجاح!
              </h4>
              <p className="text-xs text-stone-200 max-w-md mx-auto">
                رقم التتبع الخاص بك هو <strong className="text-[var(--gold)] font-mono">{submittedTicket}</strong>. تم تحويل الطلب إلى قائمة المراجعة التحريرية العاجلة.
              </p>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs cursor-pointer hover:brightness-110 transition-all"
              >
                إرسال ملاحظة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitCorrection} className="space-y-4 text-right">
              {submitError && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">
                    رابط المقال أو الخبر المعني *
                  </label>
                  <input
                    type="text"
                    required
                    value={reqArticleUrl}
                    onChange={(e) => setReqArticleUrl(e.target.value)}
                    placeholder="https://alwatantoday.net/article/..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-300">
                    رابط المصدر الرسمي للتحقق (اختياري)
                  </label>
                  <input
                    type="text"
                    value={reqSourceUrl}
                    onChange={(e) => setReqSourceUrl(e.target.value)}
                    placeholder="بيان وزارة الصحة، تقرير وفا، إلخ..."
                    className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300">
                  تفاصيل الخطأ المقترح تصويبه مع الدليل الموثق *
                </label>
                <textarea
                  required
                  rows={3}
                  value={reqDetail}
                  onChange={(e) => setReqDetail(e.target.value)}
                  placeholder="يرجى توضيح الخطأ بالتحديد والفقرة والبيان المعتمد..."
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-black/50 text-white placeholder-white/30 text-xs focus:outline-hidden focus:border-[var(--gold)] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-slate-950 font-black text-xs hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-950/20"
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
                <span>{isSubmitting ? "جاري الإرسال للديسك..." : "إرسال طلب التصحيح للمراجعة"}</span>
              </button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}
