import Link from "next/link";
import { HeartHandshake, Briefcase, ShieldCheck, ChevronLeft, CheckCircle2 } from "lucide-react";

export function HomeAidAndJobsBar() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* بطاقة المساعدات الإنسانية الموثقة */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-l from-amber-950/20 via-[var(--surface)] to-[var(--surface)] p-6 space-y-4 hover:shadow-md transition-all flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <HeartHandshake className="w-4 h-4" />
              <span>دليل المساعدات والإغاثة</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>روابط رسمية 100%</span>
            </span>
          </div>

          <h3 className="text-xl font-black text-[var(--text)] leading-snug">
            بوابة المساعدات النقدية وتحديث بيانات الأونروا وبرنامج الأغذية
          </h3>

          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            روابط تسجيل وفحص أسماء موثقة مباشرة للجهات الإغاثية المعتمدة (الأونروا، WFP، الهلال الأحمر، ووزارة التنمية الاجتماعية). التقديم مجاني بالكامل بدون وسطاء.
          </p>
        </div>

        <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
          <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>حماية من الروابط المشبوهة</span>
          </span>
          <Link
            href="/aid"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <span>دخول بوابة المساعدات</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* بطاقة الوظائف والتمكين المهني */}
      <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-l from-sky-950/20 via-[var(--surface)] to-[var(--surface)] p-6 space-y-4 hover:shadow-md transition-all flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-500 border border-sky-500/20">
              <Briefcase className="w-4 h-4" />
              <span>شواغر وفرص عمل</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>شواغر موثقة</span>
            </span>
          </div>

          <h3 className="text-xl font-black text-[var(--text)] leading-snug">
            بوابة التوظيف المهني والشواغر في المنظمات والعمل عن بعد
          </h3>

          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            فرص عمل رسمية في منظمات الأمم المتحدة، المؤسسات التعليمية، والشركات الدولية مع روابط التقديم المباشرة ومواعيد الإغلاق المعتمدة.
          </p>
        </div>

        <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
          <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>تقديم مجاني بلا رسوم</span>
          </span>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <span>استعراض الشواغر الوظيفية</span>
            <ChevronLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
