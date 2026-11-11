"use client";

import Link from "next/link";
import { PenTool, ArrowLeft, Quote } from "lucide-react";

interface Columnist {
  id: string;
  name: string;
  title: string;
  columnName: string;
  articleTitle: string;
  slug: string;
  avatarText: string;
  avatarBg: string;
  quoteSnippet: string;
}

const FEATURED_COLUMNISTS: Columnist[] = [
  {
    id: "col-1",
    name: "د. إبراهيم عريقات",
    title: "أستاذ العلوم السياسية والدراسات الإقليمية",
    columnName: "أفق استراتيجي",
    articleTitle: "مآلات التوازن الإقليمي ومعادلة الصمود في غزة والقدس المحتلة",
    slug: "strategic-horizon-regional-balance",
    avatarText: "إ.ع",
    avatarBg: "from-emerald-700 to-teal-900",
    quoteSnippet: "«الصمود ليس مجرد بقاء جغرافي، بل صياغة لوعي وطني لا يقبل التجزئة أو النسيان».",
  },
  {
    id: "col-2",
    name: "ميساء عبد الهادي",
    title: "كاتبة وباحثة في الشأن الاقتصادي والاجتماعي",
    columnName: "عين على الوطن",
    articleTitle: "صمود الاقتصاد الفلسطيني البديل: كيف يعيد المجتمع بناء دورته الحيوية؟",
    slug: "palestine-alternative-economy-resilience",
    avatarText: "م.ع",
    avatarBg: "from-amber-700 to-rose-900",
    quoteSnippet: "«السيادة الحقيقية تبدأ من الاكتفاء الذاتي وحماية المنتج الوطني من التبعية».",
  },
  {
    id: "col-3",
    name: "أ. خليل البرغوثي",
    title: "محلل استراتيجي ورئيس مركز دراسات العودة",
    columnName: "بوصلة التحرير",
    articleTitle: "القانون الدولي وازدواجية المعايير أمام حق تقرير المصير الفلسطيني",
    slug: "international-law-double-standards",
    avatarText: "خ.ب",
    avatarBg: "from-blue-700 to-indigo-950",
    quoteSnippet: "«سقوط الأقنعة الحقوقية فرصة تاريخية لتدشين خطاب عالمي جديد يضع الحقيقة في نصابها».",
  },
];

export function OpinionSection() {
  return (
    <section className="relative rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--surface)] to-[var(--bg)] p-6 md:p-8 overflow-hidden shadow-sm">
      {/* خلفية جمالية خافتة */}
      <div className="absolute -top-12 -start-12 w-48 h-48 bg-[var(--primary)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -end-12 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* عنوان القسم والترويسة */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center shadow-md">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-black text-[var(--text)]">
                الرأي والتحليلات الاستراتيجية
              </h2>
              <span className="text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">
                أقلام الوطن
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              رؤى معمقة وتحليلات رصينة لنخبة من كبار الكتّاب والمفكرين
            </p>
          </div>
        </div>

        <Link
          href="/opinions"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] hover:text-[var(--primary-hover)] group transition-colors"
        >
          <span>كافة مقالات الرأي</span>
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* شبكة مقالات الرأي */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURED_COLUMNISTS.map((col) => (
          <article
            key={col.id}
            className="card-luxury group relative flex flex-col justify-between rounded-2xl p-5 transition-all duration-300"
          >
            <div>
              {/* ترويسة الكاتب */}
              <div className="flex items-center gap-3.5 mb-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-tr ${col.avatarBg} text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-[var(--surface)] shrink-0`}
                >
                  {col.avatarText}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-[var(--text)] group-hover:text-[var(--primary)] transition-colors truncate">
                    {col.name}
                  </h3>
                  <span className="block text-[11px] text-[var(--text-muted)] truncate">
                    {col.columnName}
                  </span>
                </div>
              </div>

              {/* عنوان المقال */}
              <h4 className="font-extrabold text-base text-[var(--text)] leading-snug group-hover:text-[var(--primary)] transition-colors mb-3">
                <Link href={`/opinions/${col.slug}`}>
                  {col.articleTitle}
                </Link>
              </h4>

              {/* اقتباس تحفيزي */}
              <div className="relative p-3 rounded-lg bg-[var(--surface)]/70 text-xs text-[var(--text-muted)] italic leading-relaxed mb-4 border-s-2 border-[var(--primary)]">
                <Quote className="w-3.5 h-3.5 text-[var(--primary)]/40 absolute top-2 end-2" />
                {col.quoteSnippet}
              </div>
            </div>

            {/* ذيل البطاقة */}
            <div className="pt-3 border-t border-[var(--border)]/60 flex items-center justify-between text-xs">
              <span className="text-[11px] text-[var(--text-muted)]">
                {col.title.split(" ")[0]} {col.title.split(" ")[1]}
              </span>
              <Link
                href={`/opinions/${col.slug}`}
                className="font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
              >
                <span>قراءة المقال</span>
                <span className="text-sm">←</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

