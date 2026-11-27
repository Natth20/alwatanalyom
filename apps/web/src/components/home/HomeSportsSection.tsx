import Link from "next/link";
import { ArticleCard as ArticleCardType } from "@awt/shared";
import { ArticleCard } from "@/components/ArticleCard";
import { TodayMatchesWidget } from "@/components/sports/TodayMatchesWidget";
import { Trophy, ChevronLeft, ExternalLink } from "lucide-react";

interface Props {
  articles: ArticleCardType[];
}

export function HomeSportsSection({ articles }: Props) {
  return (
    <section className="space-y-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#082214]/30 via-[var(--surface)] to-[var(--surface)] p-6 sm:p-8 shadow-md">
      {/* ترويسة ساحة يلا سبورت والملاعب */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-2xl shadow-md border border-emerald-400/40 shrink-0">
            ⚽
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight">
                الملاعب والرياضة · دوري الأبطال ويلا سبورت
              </h2>
              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Trophy className="w-3.5 h-3.5" />
                <span>تغطية حصرية مباشرة</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              متابعة مباشرة لنتائج المباريات، كواليس الملاعب العالمية والعربية، وترتيب الدوريات بالشراكة مع يلا سبورت.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <a
            href="https://yallasport.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-[var(--text)] border border-[var(--border)] transition-colors"
          >
            <span>بث يلا سبورت</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </a>
          <Link
            href="/sports"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-colors shadow-md shrink-0"
          >
            <span>كل الأخبار الرياضية</span>
            <ChevronLeft className="w-4 h-4 rtl:rotate-0" />
          </Link>
        </div>
      </div>

      {/* المحتوى المركزي: مباريات اليوم المباشرة + شبكة الأخبار الرياضية المصورة */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* عمود جدول المباريات المباشرة */}
        <div className="lg:col-span-5">
          <TodayMatchesWidget />
        </div>

        {/* عمود الأخبار والتقارير الكروية المصورة */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
            <h3 className="font-black text-sm text-[var(--text)]">
              أبرز التقارير الرياضية العالمية والمحلية
            </h3>
            <span className="text-[11px] text-[var(--text-muted)]">محدث لحظياً</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articles.slice(0, 4).map((art) => (
              <ArticleCard key={art.id} article={art} variant="medium" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

