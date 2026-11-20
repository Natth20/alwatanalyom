import Link from "next/link";
import { Metadata } from "next";
import { InstitutionalNav } from "@/components/InstitutionalNav";
import {
  FileCheck2,
  ShieldCheck,
  Scale,
  Sparkles,
  ChevronLeft,
  Award,
  CheckCircle2,
  AlertTriangle,
  Bot,
  HeartHandshake,
  Lock,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ميثاق الشرف التحريري والسياسة المعيارية — الوطن اليوم",
  description: "الوثيقة الدستورية الرسمية للسياسة التحريرية وقواعد النشر والأمانة الصحفية المعتمدة لدى منصة الوطن اليوم.",
};

export default function EditorialPolicyPage() {
  const articles = [
    {
      num: "المادة الأولى",
      title: "قاعدة التثبت المزدوج ونزاهة الرواية الإخبارية",
      icon: Scale,
      content:
        "تلتزم منصة «الوطن اليوم» بعدم نشر أي خبر عاجل أو ادعاء رئيسي يمس الشأن العام ما لم يكن موثقاً من مصدرين مستقلين على الأقل، أو صادراً عن جهة حكومية أو أممية أو حقوقية معتمدة برصيد مهني موثوق. تخضع كافة المواد العاجلة لبروتوكول التدقيق اللحظي لمنع نشر الشائعات أو الأخبار غير المكتملة.",
    },
    {
      num: "المادة الثانية",
      title: "القاموس الوطني الفلسطيني الموحد ومعايير التسمية",
      icon: ShieldCheck,
      content:
        "انطلاقاً من مبدأ «فلسطين أولاً»، تعتمد المنصة دليلاً معيارياً ملزماً لكافة المحررين والمراسلين: تسمية عاصمة فلسطين بـ «القدس المحتلة»، إطلاق صفة «الشهداء» على ضحايا العمليات العسكرية وقصف الاحتلال مع توثيق أسمائهم وأعمارهم وسيرهم الإنسانية، التمييز التام بين «المستوطنات» والأراضي المحتلة، والتعامل بحذر وتدقيق مضاعف مع إعلام الاحتلال بوضع وسم صريح يوضح روايته.",
    },
    {
      num: "المادة الثالثة",
      title: "الفصل الصارم والواضح بين الخبر والرأي والتحليل",
      icon: FileCheck2,
      content:
        "تلتزم المنصة بالفصل البصري والتحريري التام بين المادة الإخبارية المجردة ومقالات الرأي والتحليلات السياسية. توسم مقالات الرأي بوسم واضح («رأي وتحليل») مع إبراز اسم الكاتب وصورته وصفته، والتنويه بأن المقال يعبر عن وجهة نظر صاحبه ولا يمثل بالضرورة الموقف التحريري لمنصة الوطن اليوم.",
    },
    {
      num: "المادة الرابعة",
      title: "أخلاقيات الذكاء الاصطناعي الصحفي ومكافحة التوليد الوهمي",
      icon: Bot,
      content:
        "يُحظر حظراً مطلقاً استخدام نماذج الذكاء الاصطناعي لتأليف أخبار، أو فبركة اقتباسات، أو توليد صور ومقاطع فيديو توهم القارئ بأنها أحداث حقيقية. يقتصر دور الذكاء الاصطناعي على تحسين محركات البحث، وتلخيص المقالات الطويلة، والتدقيق الإملائي، والترجمة، مع إلزامية مراجعة المحرر البشري ووسم أي محتوى معالج آلياً بشارة الشفافية المعتمدة.",
    },
    {
      num: "المادة الخامسة",
      title: "حماية المصادر الميدانية والشهود والمبلغين",
      icon: Lock,
      content:
        "تضمن «الوطن اليوم» الحماية القانونية والأخلاقية الكاملة لكافة المصادر الميدانية والمبلغين وشهود العيان الذين يدلون بمعلومات حساسة للمنصة. لا يجوز لأي محرر الكشف عن هوية المصدر السري تحت أي ظرف ما لم يكن هناك تصريح كتابي صريح منه، وتُستخدم قنوات تشفير عالية الأمان لحماية بياناتهم.",
    },
    {
      num: "المادة السادسة",
      title: "الكرامة الإنسانية وحماية الأطفال وخصوصية الضحايا",
      icon: HeartHandshake,
      content:
        "تلتزم المنصة باحترام كرامة الضحايا والمصابين وأسرهم، وتمنع نشر صور الجثامين المشوهة أو المشاهد الدامية الصادمة دون تنويه تحذيري وتعتيم بصري يحفظ حرمة الميت ومشاعر ذويه. كما يُحظر نشر أسماء وصور الأطفال القُصّر المتورطين في قضايا أمنية أو جنائية دون إذن أولياء أمورهم.",
    },
    {
      num: "المادة السابعة",
      title: "مكافحة خطاب الكراهية والتحريض والتمييز",
      icon: AlertTriangle,
      content:
        "ترفض المنصة رفضاً قاطعاً أي خطاب يحرض على العنف، أو التكفير، أو التخوين، أو التمييز القائم على العرق، أو الدين، أو الجنسية، أو المذهب السياسي. كما تلتزم بتطبيق سياسة إشراف صارمة ومستمرة على مساحات التعليقات المجتمعية لضمان بقائها بيئة حوار حضارية وبناءة.",
    },
    {
      num: "المادة الثامنة",
      title: "سياسة التصحيح المفتوح والاعتراف الفوري بالخطأ",
      icon: Scale,
      content:
        "تؤمن المنصة بأن الاعتراف بالخطأ وتصحيحه علناً وفورياً هو جوهر الشجاعة الصحفية ومقياس النزاهة. عند اكتشاف أي خطأ في اسم، أو رقم، أو سياق، تلتزم المنصة بتعديل المادة فوراً مع وضع صندوق تصحيح بارز يوضح ما تم تعديله وتاريخه وساعته، وتوثيق ذلك في سجل التصحيحات العلني.",
    },
    {
      num: "المادة التاسعة",
      title: "حظر تضارب المصالح والهدايا الصحفية",
      icon: Award,
      content:
        "يُحظر على الصحفيين والمحررين العاملين في المنصة قبول أي هدايا، أو رحلات مدفوعة، أو مكافآت مالية من جهات أو شركات أو أحزاب تهدف للتأثير على استقلالية التغطية. كما يُلزم المحرر بالإفصاح عن أي علاقة شخصية أو مالية قد تتقاطع مع المادة التي يحررها.",
    },
    {
      num: "المادة العاشرة",
      title: "حماية حقوق الملكية الفكرية والعزو الصريح للمصادر",
      icon: Globe,
      content:
        "تلتزم المنصة بحفظ حقوق كافة الناشرين والمصورين والمؤلفين، وتمنع النقل أو الاقتباس دون إشارة واضحة وصريحة للمصدر الأصلي مع رابط مباشر دائم (Canonical Link). كما تلتزم ببروتوكول الألفية الرقمية (DMCA) للتعامل الفوري مع أي شكاوى ملكية فكرية.",
    },
  ];

  return (
    <div className="container-custom py-10 space-y-10">
      <InstitutionalNav />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* متن الوثيقة الدستورية (8 أعمدة) */}
        <div className="lg:col-span-8 space-y-6">
          {/* مقدمة الدستور التحريري */}
          <div className="card-hyper-luxury p-6 sm:p-8 space-y-4 border border-[var(--gold)]/30">
            <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#730020] via-[#590018] to-[#26000A] text-[var(--gold)] flex items-center justify-center font-black shadow-md border border-[var(--gold)]/40">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[var(--gold)] uppercase font-bold">
                  الدستور المهني · وثيقة التحرير السيادية
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-[var(--text)] tracking-tight">
                  ميثاق الشرف التحريري ومعايير النشر 2026
                </h1>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)] leading-relaxed font-medium">
              تضع «الوطن اليوم» هذا الميثاق ليكون عقداً أخلاقياً ملزماً بين المنصة وقرائها في كل مكان. هدفنا ليس السبق الصحفي على حساب الحقيقة، بل بناء مرجع إخباري ذي موثوقية سيادية يوازن بين دقة التحقيق الميداني والواجب الإنساني والوطني، مستنداً إلى أحدث المعايير الصحفية العالمية.
            </p>
          </div>

          {/* استعراض المواد العشر بالتفصيل */}
          <div className="space-y-4">
            {articles.map((art, idx) => {
              const Icon = art.icon;
              return (
                <div
                  key={idx}
                  className="card-hyper-luxury p-6 space-y-3 border border-[var(--border)] hover:border-[var(--gold)]/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-[var(--gold)]/15 text-[var(--gold)] flex items-center justify-center border border-[var(--gold)]/30">
                        <Icon className="w-4 h-4" />
                      </span>
                      <div>
                        <span className="text-[10px] font-mono text-[var(--gold)] font-bold">
                          {art.num}
                        </span>
                        <h2 className="text-base sm:text-lg font-black text-[var(--text)]">
                          {art.title}
                        </h2>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      بند ملزم
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {art.content}
                  </p>
                </div>
              );
            })}
          </div>

          {/* صندوق قسم الشرف الصحفي والتوقيع المعتمد */}
          <div className="rounded-3xl glass-hud p-6 sm:p-8 space-y-4 border-2 border-[var(--gold)]/50 text-white shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2.5">
              <Award className="w-6 h-6 text-[var(--gold)]" />
              <h3 className="text-xl font-black text-[var(--gold)]">
                قسم الأمانة الصحفية المعتمد لهيئة التحرير
              </h3>
            </div>

            <blockquote className="text-sm sm:text-base text-stone-200 leading-relaxed italic border-s-4 border-[var(--gold)] ps-4 my-3 font-serif">
              «أقسم بالله العظيم أن أتحرى الحقيقة بنزاهة، وأن أضع دقة الخبر وأمانة الكلمة فوق كل اعتبار، وأن أنصف الضحايا والمظلومين، وألا أساوم على أمانة النقل أو كرامة الإنسان، وأن ألتزم بالقاموس الوطني الفلسطيني وبأصول هذا الميثاق ما حييت.»
            </blockquote>

            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70">
              <span className="font-bold text-white">صادر عن: مجلس الأمناء وهيئة التحرير المركزية · «الوطن اليوم»</span>
              <span className="font-mono text-[var(--gold)]">ساري المفعول لعام 2026</span>
            </div>
          </div>
        </div>

        {/* الشريط الجانبي الاستراتيجي (4 أعمدة) */}
        <div className="lg:col-span-4 space-y-6">
          {/* بطاقة الضمان والاعتماد */}
          <div className="card-hyper-luxury p-6 space-y-4 border border-[var(--gold)]/30">
            <div className="flex items-center gap-2 font-black text-sm text-[var(--text)] border-b border-[var(--border)] pb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>شهادة الالتزام والتدقيق</span>
            </div>

            <ul className="space-y-3 text-xs text-[var(--text-muted)]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>تحقق بشري مضاعف 100% لكافة العواجل</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>سجل تصحيحات علني مفصل ومفتوح</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>حماية كاملة لهوية المصادر الميدانية</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>عزو صريح وروابط مباشرة للمصادر الأصلية</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-[var(--border)]">
              <Link
                href="/corrections"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#590018] to-[#730020] text-[var(--gold)] border border-[var(--gold)]/40 text-xs font-black hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Scale className="w-4 h-4" />
                <span>الاطلاع على سجل التصحيحات العلني</span>
              </Link>
            </div>
          </div>

          {/* صندوق الإبلاغ الفوري عن مخالفة للميثاق */}
          <div className="card-hyper-luxury p-6 space-y-3 border border-red-500/30 bg-red-950/10">
            <div className="flex items-center gap-2 font-black text-sm text-red-500">
              <AlertTriangle className="w-4 h-4" />
              <span>لاحظت مخالفة لأحد بنود هذا الميثاق؟</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              إذا لاحظت أي مادة صحفية تخالف أياً من المواد العشر أعلاه، يسعدنا استقبال بلاغك والتحقيق الفوري فيه وتصحيحه خلال أقل من ساعتين.
            </p>
            <Link
              href="/submit-news"
              className="inline-flex items-center gap-1.5 text-xs font-black text-red-500 hover:underline pt-1"
            >
              <span>تقديم بلاغ أو تصحيح خبر الآن ←</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
