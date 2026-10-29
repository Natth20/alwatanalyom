"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  FileText, 
  Send, 
  Save, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Bold,
  Heading,
  Quote,
  List
} from "lucide-react";

interface GlossaryRule {
  target: string;
  replacement: string;
  reason: string;
}

const PALESTINE_GLOSSARY_RULES: GlossaryRule[] = [
  { target: "جيش الدفاع", replacement: "جيش الاحتلال الإسرائيلي", reason: "التزاماً بالمصطلح المهني للواقع القانوني والتحريري" },
  { target: "مستوطنة", replacement: "مستعمرة", reason: "وفق التوصيف القانوني لانتهاك اتفاقيات جنيف" },
  { target: "مستوطن", replacement: "مستعمر", reason: "وفق التوصيف التحريري للأفراد المستعمرين في الأراضي المحتلة" },
  { target: "القدس الشرقية", replacement: "القدس المحتلة", reason: "التأكيد على الوضع القانوني الموحد للعاصمة الفلسطينية المحتلة" },
  { target: "مقتل فلسطيني", replacement: "استشهاد فلسطيني", reason: "وفق المعجم التحريري الوطني لضحايا الاعتداءات" },
  { target: "حرب إسرائيل وحماس", replacement: "العدوان الإسرائيلي على غزة", reason: "بيان دقة الطرف المعتدي على المدنيين والأعيان المدنية" },
  { target: "المخربين", replacement: "المقاومين", reason: "تجنب المصطلحات الدعائية التابعة للاحتلال" },
  { target: "جبل الهيكل", replacement: "المسجد الأقصى المبارك", reason: "الاسم التاريخي والإسلامي المعترف به دولياً" },
];

export default function NewArticlePage() {
  const router = useRouter();
  const [titleAr, setTitleAr] = useState("");
  const [sectionSlug, setSectionSlug] = useState("palestine");
  const [kind, setKind] = useState("NEWS");
  const [authorName, setAuthorName] = useState("هيئة التحرير");
  const [summaryAr, setSummaryAr] = useState("");
  const [content, setContent] = useState("");
  const [isBreaking, setIsBreaking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // فحص المصطلحات الفلسطينية الحساسة في النص الحي
  const fullText = `${titleAr} ${summaryAr} ${content}`;
  const glossaryViolations = PALESTINE_GLOSSARY_RULES.filter((rule) =>
    fullText.includes(rule.target)
  );

  const applyCorrection = (rule: GlossaryRule) => {
    setTitleAr((prev) => prev.replaceAll(rule.target, rule.replacement));
    setSummaryAr((prev) => prev.replaceAll(rule.target, rule.replacement));
    setContent((prev) => prev.replaceAll(rule.target, rule.replacement));
  };

  const insertFormatting = (prefix: string, suffix = "") => {
    setContent((prev) => `${prev}\n${prefix}نص منسق${suffix}\n`);
  };

  const handleSubmit = async (targetStatus: "PUBLISHED" | "IN_REVIEW" | "DRAFT") => {
    if (!titleAr.trim()) {
      setErrorMessage("يرجى إدخال عنوان المقال");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titleAr,
          sectionSlug,
          kind,
          authorName,
          summaryAr,
          content,
          isBreaking,
          status: targetStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "فشل حفظ المقال");
      }

      setSuccessMessage("تم حفظ المقال بنجاح! جاري الانتقال...");
      setTimeout(() => {
        router.push("/articles");
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.message || "حدث خطأ في الاتصال بالخادم");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* رأس الصفحة */}
      <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-1">
            <Link href="/articles" className="hover:underline flex items-center gap-1">
              <ArrowRight className="w-3 h-3" />
              <span>المقالات</span>
            </Link>
            <span>/</span>
            <span>كتابة مقال أصلي</span>
          </div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-[var(--primary)]" />
            <span>كتابة ونشر مادة صحفية أصلية</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("DRAFT")}
            className="px-3 py-2 rounded-lg border border-[var(--border)] text-xs font-semibold hover:bg-[var(--surface-hover)] text-[var(--text-muted)] transition-colors flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>مسودة</span>
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("IN_REVIEW")}
            className="px-3.5 py-2 rounded-lg bg-sky-600/20 text-sky-400 border border-sky-500/30 text-xs font-bold hover:bg-sky-600/30 transition-colors"
          >
            إرسال للمراجعة
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSubmit("PUBLISHED")}
            className="px-4 py-2 rounded-lg bg-[var(--primary)] text-slate-950 text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>نشر فوري الآن</span>
          </button>
        </div>
      </div>

      {/* رسائل التنبيه والنجاح */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* حارس الدليل التحريري الفلسطيني */}
      {glossaryViolations.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>تنبيه حارس الدليل التحريري لفلسطين (تم رصد {glossaryViolations.length} مصطلحات موصى بتعديلها):</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {glossaryViolations.map((rule, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-[var(--surface)] border border-amber-500/20 flex items-center justify-between">
                <div>
                  <span className="line-through text-rose-400 font-bold ms-1">"{rule.target}"</span>
                  <span className="text-[var(--text-muted)]">←</span>
                  <span className="text-emerald-400 font-bold me-1">"{rule.replacement}"</span>
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{rule.reason}</p>
                </div>
                <button
                  type="button"
                  onClick={() => applyCorrection(rule)}
                  className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-[10px] transition-colors shrink-0"
                >
                  تصحيح تلقائي
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* نموذج التحرير */}
      <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] space-y-6">
        {/* عنوان المقال */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-[var(--text)]">عنوان المقال الصحفي *</label>
            <span className="text-[10px] text-[var(--text-muted)] font-mono">{titleAr.length} حرف</span>
          </div>
          <input
            type="text"
            value={titleAr}
            onChange={(e) => setTitleAr(e.target.value)}
            placeholder="أدخل عنواناً تحريرياً جذاباً وموثوقاً..."
            className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-base font-bold text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors"
          />
        </div>

        {/* خيارات التصنيف والقسم والكاتب */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[var(--text-muted)] mb-1.5">القسم التحريري</label>
            <select
              value={sectionSlug}
              onChange={(e) => setSectionSlug(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
            >
              <option value="palestine">فلسطين (التغطية الشاملة)</option>
              <option value="arab">عربي ودولي</option>
              <option value="world">العالم</option>
              <option value="economy">الوطن الاقتصادي</option>
              <option value="tech">تكنولوجيا وعلوم</option>
              <option value="sports">رياضة (ويلا سبورت)</option>
              <option value="culture">ثقافة ومجتمع</option>
              <option value="opinion">رأي وتحليلات</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--text-muted)] mb-1.5">نوع المادة الصحفية</label>
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
            >
              <option value="NEWS">خبر صحفي (News)</option>
              <option value="ANALYSIS">تحليل معمق (Analysis)</option>
              <option value="INVESTIGATION">تحقيق استقصائي (Investigation)</option>
              <option value="OPINION">مقال رأي (Opinion)</option>
              <option value="FACTCHECK">تحقق من الأخبار (Fact-Check)</option>
              <option value="CORRECTION">تصحيح رسمي (Correction)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--text-muted)] mb-1.5">اسم الكاتب / التوقيع</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="مثال: هيئة التحرير، أو اسم الكاتب"
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
        </div>

        {/* الملخص التحريري */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-[var(--text)]">الملخص التحريري (Lead Paragraph)</label>
            <span className="text-[10px] text-[var(--text-muted)]">يظهر في بطاقات الأخبار والـ SEO ومحركات البحث</span>
          </div>
          <textarea
            rows={3}
            value={summaryAr}
            onChange={(e) => setSummaryAr(e.target.value)}
            placeholder="ملخص مكثف من جملتين أو ثلاث يوضح جوهر الخبر وأبعاده وسياقه..."
            className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)] leading-relaxed"
          />
        </div>

        {/* المحتوى ومحرر التنسيق */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-[var(--text)]">المتن الكامل للمقال</label>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => insertFormatting("### ")}
                title="عنوان فرعي"
                className="p-1.5 rounded hover:bg-[var(--surface-hover)] text-[var(--text-muted)]"
              >
                <Heading className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("**", "**")}
                title="نص عريض"
                className="p-1.5 rounded hover:bg-[var(--surface-hover)] text-[var(--text-muted)]"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("> ")}
                title="اقتباس أو تصريح"
                className="p-1.5 rounded hover:bg-[var(--surface-hover)] text-[var(--text-muted)]"
              >
                <Quote className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => insertFormatting("- ")}
                title="قائمة نقطية"
                className="p-1.5 rounded hover:bg-[var(--surface-hover)] text-[var(--text-muted)]"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <textarea
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="اكتب تفاصيل التغطية الصحفية، السياق، التصريحات، والخط الزمني..."
            className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] font-sans focus:outline-none focus:border-[var(--primary)] leading-relaxed font-normal"
          />
        </div>

        {/* خيار الخبر العاجل */}
        <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isBreaking}
              onChange={(e) => setIsBreaking(e.target.checked)}
              className="w-4 h-4 rounded text-rose-500 focus:ring-rose-500 accent-rose-500"
            />
            <div>
              <span className="text-xs font-bold text-[var(--text)] flex items-center gap-1.5">
                <span>تضمين في شريط الأخبار العاجلة (Breaking Bar)</span>
                {isBreaking && (
                  <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                )}
              </span>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                سيتصدر الشريط الإخباري باللون الأحمر الفاقع مع بث تنبيه لحظي للقراء لمدة 60 دقيقة
              </p>
            </div>
          </label>

          <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">
            <Sparkles className="w-3 h-3" />
            <span>سياسة عرض: مادة أصلية كاملة</span>
          </div>
        </div>
      </div>
    </div>
  );
}
