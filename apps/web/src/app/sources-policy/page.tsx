import Link from "next/link";
import { Metadata } from "next";
import { InstitutionalNav } from "@/components/InstitutionalNav";
import {
  FileSearch,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  Award,
  Globe,
  Radio,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "سياسة عزو المصادر وحماية الاقتباس الصحفي — الوطن اليوم",
  description: "المعايير الصارمة لنسب الأخبار لمصادرها الأصلية، وهرم الثقة، وحماية حقوق الوكالات والمراسلين في الوطن اليوم.",
};

export default function SourcesPolicyPage() {
  const trustTiers = [
    {
      tier: "المستوى الأول · الثقة السيادية (100%)",
      title: "الوكالات الرسمية والمنظمات الإنسانية المعتمدة",
      badge: "نشر مباشر مع تدقيق التحرير",
      badgeColor: "bg-emerald-950/60 text-emerald-400 border-emerald-500/40",
      description:
        "المصادر الرسمية ذات التمثيل الميداني والقانوني الموثق، ويشمل ذلك في الشأن الفلسطيني وكالات الأنباء الرسمية المعتمدة (وفا، صفا، شهاب)، وبيانات وزارة الصحة الفلسطينية، وتقارير جمعية الهلال الأحمر الفلسطيني، والدفاع المدني، وبيانات وكالة الأونروا.",
      rules: [
        "ذكر اسم المصدر في مقدمة الخبر أو كبسولة المصدر المعتمد.",
        "توثيق تاريخ ووقت صدور البيان الرسمي بدقة.",
        "وضع رابط مباشر للمصدر الأصلي أو حسابه الرسمي الموثق متى أمكن.",
      ],
    },
    {
      tier: "المستوى الثاني · الثقة الدولية المعتمدة (90%)",
      title: "وكالات الأنباء العالمية والصحافة الرصينة",
      badge: "اعتماد وتدقيق التوافق",
      badgeColor: "bg-sky-950/60 text-sky-400 border-sky-500/40",
      description:
        "وكالات الأنباء الدولية الرائدة (رويترز، وكالة الصحافة الفرنسية AFP، أسوشيتد برس AP)، والصحف والشبكات الإخبارية ذات مجالس التحرير المستقلة والمعايير المهنية الصارمة.",
      rules: [
        "النسب الصريح لاسم الوكالة الدولية في سياق الخبر.",
        "التدقيق في الترجمة العربية للمصطلحات لضمان عدم تحريف المعنى الأصلي.",
        "مراعاة القاموس الوطني الفلسطيني المعتمد عند ترجمة تقارير الوكالات الغربية.",
      ],
    },
    {
      tier: "المستوى الثالث · مصادر قيد الفحص والمطابقة (60%)",
      title: "شهود العيان والنشطاء الميدانيون وشبكات التواصل",
      badge: "يخضع لبروتوكول رادار الحقيقة",
      badgeColor: "bg-amber-950/60 text-amber-400 border-amber-500/40",
      description:
        "مقاطع الفيديو والصور والتسجيلات الواردة من المواطنين في مناطق الحدث الميداني، أو القنوات الإخبارية المحلية على تيليجرام ومنصات التواصل الاجتماعي.",
      rules: [
        "حظر النشر الفوري حتى يتم التحقق من بيانات الملف الوصفية (Metadata / Geolocation).",
        "مطابقة الرواية مع شاهد ثانٍ أو جهة إسعافية متواجدة في نفس النطاق الجغرافي.",
        "وضع وسم «قيد التحقق الميداني» في حال كان الخبر عاجلاً وله تداعيات إنسانية ملحة.",
      ],
    },
    {
      tier: "المستوى الرابع · مصادر محظورة النشر (0%)",
      title: "الحسابات المجهولة والشائعات غير المنسوبة",
      badge: "حظر مطلق للنشر",
      badgeColor: "bg-red-950/60 text-red-400 border-red-500/40",
      description:
        "القنوات والصفحات المجهولة التي تروج لأخبار بدون إسناد، الحسابات المشبوهة التي تنشر مقاطع قديمة أو خارج سياقها لإثارة الهلع، والبيانات المزورة غير الصادرة عن جهات رسمية.",
      rules: [
        "حظر النقل أو إعادة النشر أو الإشارة إليها كأخبار موثوقة.",
        "إحالتها فورياً إلى وحدة رادار الحقيقة لتفنيدها وتفكيكها بالأدلة الجنائية.",
        "توعية القراء بخطورة الشائعات ومصادرها المشبوهة.",
      ],
    },
  ];

  return (
    <div className="container-custom py-10 space-y-10">
      <InstitutionalNav />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* المحتوى الرئيسي (8 أعمدة) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="card-hyper-luxury p-6 sm:p-8 space-y-4 border border-[var(--gold)]/30">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#730020] via-[#590018] to-[#26000A] text-[var(--gold)] flex items-center justify-center font-black shadow-md border border-[var(--gold)]/40">
                <FileSearch className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[var(--gold)] uppercase font-bold">
                  أمانة الاقتباس وحماية الحقوق · Attribution Standards
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight">
                  سياسة عزو المصادر وحماية الاقتباس الصحفي
                </h1>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed font-medium">
              السرقة الصحفية وإعادة تدوير الأخبار دون ذكر مصادرها الأصلية جريمة مهنية ترفضها «الوطن اليوم» جملة وتفصيلاً. نلتزم بنسب كل معلومة، تصريح، أو صورة فوتوغرافية إلى صاحبها أو وكالتها الأصلية، ونعتمد هرم ثقة علمي صارم يحكم كل كلمة تُنشر في المنصة.
            </p>
          </div>

          {/* استعراض مستويات هرم الثقة الأربعة */}
          <div className="space-y-4">
            <h2 className="text-lg font-black text-[var(--text)] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold)]" />
              <span>هرم الثقة والمعايير المعتمدة لتدقيق المصادر</span>
            </h2>

            {trustTiers.map((t, idx) => (
              <div
                key={idx}
                className="card-hyper-luxury p-6 space-y-3.5 border border-[var(--border)] hover:border-[var(--gold)]/40 transition-all duration-300"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--gold)] font-bold block">
                      {t.tier}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-[var(--text)]">
                      {t.title}
                    </h3>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${t.badgeColor}`}>
                    {t.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {t.description}
                </p>

                <div className="pt-2 border-t border-[var(--border)] space-y-1.5">
                  <span className="text-[11px] font-black text-[var(--text)] block">
                    قواعد التعامل التحريري الإلزامية:
                  </span>
                  <ul className="space-y-1 text-xs text-[var(--text-muted)]">
                    {t.rules.map((r, rIdx) => (
                      <li key={rIdx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* بروتوكول الروابط المباشرة وحماية الحقوق (Canonical Attribution) */}
          <div className="rounded-3xl glass-hud p-6 sm:p-8 space-y-4 border-2 border-[var(--gold)]/40 text-white shadow-xl">
            <div className="flex items-center gap-2.5">
              <Globe className="w-6 h-6 text-[var(--gold)]" />
              <h3 className="text-lg sm:text-xl font-black text-[var(--gold)]">
                بروتوكول الروابط المباشرة والأمانة الرقمية (Canonical Links)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal">
              لا نكتفي بذكر اسم الوكالة كتابياً، بل يلتزم محررونا بوضع روابط تشعبية مباشرة (Do-Follow Links) تنقل القارئ إلى الصفحة الأصلية للتقرير متى كانت متاحة، مما يعزز مصداقية المحتوى ويمنح الناشر الأصلي حقه التام في حركة الزيارات وحقوق السيو الرقمي.
            </p>
          </div>
        </div>

        {/* الشريط الجانبي (4 أعمدة) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card-hyper-luxury p-6 space-y-4 border border-[var(--gold)]/30">
            <div className="flex items-center gap-2 font-black text-sm text-[var(--text)] border-b border-[var(--border)] pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>الشركاء والوكالات المعتمدة</span>
            </div>

            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              تعتمد المنصة شريطاً إخبارياً متكاملاً يتغذى من مصادر موثوقة تشمل:
            </p>

            <ul className="space-y-2 text-xs font-bold text-[var(--text)]">
              <li className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                <span>وكالة الأنباء الفلسطينية (وفا)</span>
                <span className="text-[10px] text-emerald-400">شريك معتمد</span>
              </li>
              <li className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                <span>وكالة الصحافة الفلسطينية (صفا)</span>
                <span className="text-[10px] text-emerald-400">شريك معتمد</span>
              </li>
              <li className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                <span>شبكة يلا سبورت الرياضية</span>
                <span className="text-[10px] text-[var(--gold)]">شريك رياضي حصري</span>
              </li>
              <li className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                <span>رويترز العالمية (Reuters)</span>
                <span className="text-[10px] text-sky-400">تغطية دولية</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-[var(--border)]">
              <Link
                href="/editorial-policy"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#590018] to-[#730020] text-[var(--gold)] border border-[var(--gold)]/40 text-xs font-black hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>مراجعة ميثاق الشرف التحريري</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
