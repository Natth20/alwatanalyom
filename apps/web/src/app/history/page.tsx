import Link from "next/link";
import { History, Calendar, Landmark, MapPin, BookOpen, Search, ArrowRight, Share2, Sparkles, Filter } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ذاكرة الوطن · الأرشيف والتوثيق التاريخي الفلسطيني — الوطن اليوم",
  description: "أرشيف توثيقي يومي لأبرز المحطات، الأحداث، المعارك، والقرارات الفاصلة في تاريخ فلسطين والأمة العربية.",
};

interface HistoricEvent {
  year: number;
  dayMonth: string;
  title: string;
  location: string;
  era: "ottoman" | "mandate" | "nakba" | "intifada" | "modern";
  eraLabel: string;
  summary: string;
  source: string;
  details: string;
}

const HISTORIC_EVENTS: HistoricEvent[] = [
  {
    year: 1917,
    dayMonth: "31 أكتوبر",
    title: "معركة بئر السبع الفاصلة وكسر خط الدفاع العثماني",
    location: "بئر السبع، النقب",
    era: "ottoman",
    eraLabel: "العهد العثماني",
    summary: "شهدت مدينة بئر السبع التاريخية هجوماً واسع النطاق من قوات الخيالة الخفيفة ضمن الحملة البريطانية في الشرق الأوسط، مما مهد لسقوط القدس لاحقاً.",
    source: "الأرشيف العثماني الوطني وسجلات بلديات النقب",
    details: "تعتبر معركة بئر السبع من أضخم هجمات سلاح الفرسان في التاريخ العسكري الحديث، حيث صمدت الحامية العثمانية والعشائر العربية في مواجهة قوات تفوقها عدداً وعتاداً قبل انسحابها نحو الخليل وغزة.",
  },
  {
    year: 1936,
    dayMonth: "12 أكتوبر",
    title: "تعليق الإضراب العام الكبير بعد 6 أشهر من العصيان المدني الأطول في التاريخ",
    location: "عموم فلسطين (القدس، يافا، حيفا، نابلس)",
    era: "mandate",
    eraLabel: "عهد الانتداب والثورة الكبرى",
    summary: "اللجنة العربية العليا تعلق الإضراب الفلسطيني الشامل استجابة لنداء الملوك والأمراء العرب، بعد 178 يوماً من الشلل الاقتصادي ومقاومة سياسات الانتداب.",
    source: "صحيفة الدفاع ويافا وأرشيف وثائق الثورة الفلسطينية 1936",
    details: "قاد الشعب الفلسطيني في 1936 أطول إضراب عام سلمي مدني ضد سلطات الانتداب البريطاني للمطالبة بوقف الهجرة اليهودية وتأسيس حكومة وطنية مستقلة.",
  },
  {
    year: 1948,
    dayMonth: "29 أكتوبر",
    title: "مجزرة الدوايمة وتفريغ قرى غرب الخليل",
    location: "الدوايمة، الخليل",
    era: "nakba",
    eraLabel: "النكبة 1948",
    summary: "اقتحام الكتيبة 89 لبلدة الدوايمة وارتكاب مجزرة مروعة استشهد فيها مئات المدنيين أثناء احتفالهم أو لجوئهم إلى مسجد الزاوية ومغارة طور الزاغ.",
    source: "شهادات المؤرخين (بيني موريس، وليد الخالدي) وسجلات الصليب الأحمر الدولي",
    details: "تعد الدوايمة إحدى أبشع المجازر غير الموثقة في وقتها بفعل الحصار العسكري، وأدت إلى تهجير آلاف السكان نحو مخيمات جنوب الضفة الغربية وقطاع غزة.",
  },
  {
    year: 1956,
    dayMonth: "29 أكتوبر",
    title: "مجزرة كفر قاسم ضد العمال والمزارعين العائدين من حقولهم",
    location: "كفر قاسم، المثلث الجنوبي",
    era: "nakba",
    eraLabel: "ما بعد النكبة",
    summary: "قوات حرس الحدود تطلق النار بدم بارد على 49 شهيداً بينهم نساء وأطفال أثناء عودتهم إلى منازلهم دون علمهم بحظر التجول العسكري المفاجئ.",
    source: "محاضر محاكمة مجرمي كفر قاسم وأرشيف بلدية كفر قاسم",
    details: "خلدت كفر قاسم رمزاً لصمود أهلنا في الداخل المحتل عام 1948 ورفضهم لمخططات التهجير والتطهير العرقي القسري.",
  },
  {
    year: 1974,
    dayMonth: "28 أكتوبر",
    title: "قمة الرباط التاريخية: منظمة التحرير الممثل الشرعي والوحيد للشعب الفلسطيني",
    location: "الرباط، المغرب",
    era: "modern",
    eraLabel: "التاريخ السياسي المعاصر",
    summary: "مؤتمر القمة العربي السابع يجمع بالإجماع على الاعتراف بمنظمة التحرير الفلسطينية ممثلاً شرعياً وحيداً للشعب الفلسطيني في كافة المحافل.",
    source: "البيان الختامي لمؤتمر القمة العربي السابع (الرباط 1974)",
    details: "كرس هذا القرار استقلالية القرار الوطني الفلسطيني ومهد لإلقاء الشهيد ياسر عرفات خطابه الشهير أمام الجمعية العامة للأمم المتحدة.",
  },
  {
    year: 1991,
    dayMonth: "30 أكتوبر",
    title: "افتتاح مؤتمر مدريد للسلام في الشرق الأوسط",
    location: "مدريد، إسبانيا",
    era: "modern",
    eraLabel: "المسار الدبلوماسي",
    summary: "انطلاق مؤتمر مدريد برعاية أمريكية وسوفيتية مشتركة بمشاركة وفد فلسطيني ضمن الوفد الأردني المشترك بقيادة الدكتور حيدر عبد الشافي.",
    source: "سجلات المؤتمر الدبلوماسية وأرشيف الصحافة الدولية",
    details: "تميز المؤتمر بكلمة الدكتور حيدر عبد الشافي التاريخية التي نقلت صوت شعب فلسطين المحاصر تحت الاحتلال ورفضت سياسة الاستيطان وفرض الأمر الواقع.",
  },
  {
    year: 2000,
    dayMonth: "28 سبتمبر",
    title: "اندلاع انتفاضة الأقصى المباركة عقب تدنيس باحات الحرم الشريف",
    location: "القدس المحتلة وكافة مدن الضفة وغزة",
    era: "intifada",
    eraLabel: "انتفاضة الأقصى",
    summary: "هبة جماهيرية واسعة دفاعاً عن المسجد الأقصى المبارك تحولت إلى ثورة شعبية شاملة استمرت لأكثر من خمس سنوات.",
    source: "سجلات مركز المعلومات الوطني الفلسطيني ومستشفيات الهلال الأحمر",
    details: "شهدت الانتفاضة الثانية بطولات أسطورية وسقوط آلاف الشهداء من أجل حماية الهوية العربية والإسلامية للقدس والمقدسات.",
  },
];

export default function HistoryPage() {
  return (
    <div className="container-custom py-8 max-w-5xl">
      {/* Header */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 mb-8 text-center relative overflow-hidden shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[var(--bg)] border border-[var(--border)] text-[var(--primary)] mb-3">
          <History className="w-3.5 h-3.5" />
          ذاكرة الوطن · الأرشيف والتوثيق الحي
        </div>
        <h1 className="text-2xl md:text-4xl font-black mb-3">
          أحداث اليوم في ذاكرة فلسطين والأمة
        </h1>
        <p className="text-sm md:text-base text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
          سجل توثيقي حي يربط الحاضر بالجذور، ويستعرض المحطات الفاصلة، المعارك، والمعاهدات التي رسمت تاريخ فلسطين وهويتها الصامدة عبر العصور.
        </p>

        {/* Date Selector Banner */}
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-xs font-bold">
          <Calendar className="w-4 h-4 text-[var(--primary)] ml-1" />
          <span>تاريخ اليوم المختار:</span>
          <span className="px-2.5 py-1 rounded-lg bg-[var(--primary)] text-white">30 أكتوبر</span>
          <span className="text-[var(--text-muted)]">|</span>
          <span className="text-[var(--text-muted)]">جمادى الأولى 1448 هـ</span>
        </div>
      </div>

      {/* Eras Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none text-xs font-bold">
        <button className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white whitespace-nowrap">
          جميع العصور (7 أحداث)
        </button>
        <button className="px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] whitespace-nowrap">
          العهد العثماني
        </button>
        <button className="px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] whitespace-nowrap">
          فترة الانتداب والثورة الكبرى
        </button>
        <button className="px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] whitespace-nowrap">
          النكبة 1948 وما بعدها
        </button>
        <button className="px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] whitespace-nowrap">
          الانتفاضات الشعبية
        </button>
        <button className="px-4 py-2 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] whitespace-nowrap">
          التاريخ المعاصر
        </button>
      </div>

      {/* Timeline List */}
      <div className="space-y-6 relative before:absolute before:inset-0 before:right-6 md:before:right-8 before:w-0.5 before:bg-[var(--border)]">
        {HISTORIC_EVENTS.map((evt, idx) => (
          <article
            key={idx}
            className="relative pr-12 md:pr-16 group transition-all"
          >
            {/* Timeline Year Dot */}
            <div className="absolute right-3.5 md:right-5 top-4 w-5 h-5 rounded-full bg-[var(--bg)] border-4 border-[var(--primary)] shadow-sm group-hover:scale-125 transition-transform" />

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--primary)]/50 transition-colors shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg text-sm font-black bg-[var(--primary)]/10 text-[var(--primary)]">
                    عام {evt.year} م
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-medium">
                    ({evt.dayMonth})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    {evt.location}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] font-semibold">
                    {evt.eraLabel}
                  </span>
                </div>
              </div>

              <h2 className="text-lg md:text-xl font-black text-[var(--text)] mb-3 leading-snug">
                {evt.title}
              </h2>

              <p className="text-sm text-[var(--text)] leading-relaxed mb-4">
                {evt.details}
              </p>

              <div className="pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-1 font-medium">
                  <BookOpen className="w-3.5 h-3.5 text-[var(--primary)]" />
                  المصدر التوثيقي: {evt.source}
                </span>
                <button
                  type="button"
                  className="font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  مشاركة الحدث التاريخي
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Archival Research Footer Card */}
      <div className="mt-12 rounded-2xl border border-[var(--border)] bg-gradient-to-r from-[var(--primary)]/10 via-[var(--surface)] to-[var(--surface)] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-black text-[var(--text)] mb-2 flex items-center gap-2">
            <Landmark className="w-5 h-5 text-[var(--primary)]" />
            هل لديك وثيقة أو صورة أرشيفية نادرة؟
          </h3>
          <p className="text-xs md:text-sm text-[var(--text-muted)] max-w-xl leading-relaxed">
            يستقبل قسم الأرشيف في «الوطن اليوم» صور الوثائق، مقتنيات العائلات، والشهادات الشفوية لحفظ الرواية الوطنية وحمايتها من التهويد والاندثار.
          </p>
        </div>
        <Link
          href="/contact"
          className="shrink-0 px-5 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-colors shadow-sm"
        >
          تواصل مع وحدة التوثيق والأرشيف
        </Link>
      </div>
    </div>
  );
}

