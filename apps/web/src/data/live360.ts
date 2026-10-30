export interface PerspectiveUpdate {
  id: string;
  timestamp: string;
  headline: string;
  body: string;
  source: string;
  reliabilityLevel: "high" | "official" | "verified";
  mediaUrl?: string;
  keyMetric?: string;
}

export interface Live360Event {
  id: string;
  title: string;
  status: "live" | "concluded";
  activeViewers: number;
  lastUpdate: string;
  summary: string;
  fieldPerspective: PerspectiveUpdate[];
  geopoliticalPerspective: PerspectiveUpdate[];
  humanitarianPerspective: PerspectiveUpdate[];
}

export const LIVE_360_EVENT: Live360Event = {
  id: "gaza-truce-and-aid-flow",
  title: "التغطية الشاملة 360°: مسار المساعدات الإنسانية ومفاوضات وقف إطلاق النار",
  status: "live",
  activeViewers: 14820,
  lastUpdate: "منذ 3 دقائق",
  summary: "تغطية ثلاثية متزامنة لحظة بلحظة: ترصد نبض الميدان على الأرض، ردود الفعل الدبلوماسية في العواصم، والوضع الإنساني ومسار شاحنات الإغاثة.",
  fieldPerspective: [
    {
      id: "f-1",
      timestamp: "21:45",
      headline: "توقف الغارات على محاور دير البلح وخانيونس وتحليق مستمر للاستطلاع",
      body: "مراسلونا في الميدان يؤكدون هدوءاً حذراً في المناطق الغربية، مع عودة طواقم البلدية لفتح الشوارع الرئيسية وإزالة الركام لتسهيل حركة سيارات الإسعاف.",
      source: "مراسلو الوطن اليوم الميدانيون",
      reliabilityLevel: "verified",
      keyMetric: "هدوء حذر في 3 محاور",
    },
    {
      id: "f-2",
      timestamp: "20:30",
      headline: "الدفاع المدني ينجح في انتشال 6 ناجين من تحت ركام منزل بمدينة غزة",
      body: "طواقم الإنقاذ استجابت لاستغاثة واستمرت عمليات الحفر اليدوي لمدة 8 ساعات نظراً لشح الوقود وعدم توفر آليات ثقيلة.",
      source: "جهاز الدفاع المدني الفلسطيني",
      reliabilityLevel: "official",
      keyMetric: "6 ناجين",
    },
  ],
  geopoliticalPerspective: [
    {
      id: "g-1",
      timestamp: "21:50",
      headline: "اجتماع طارئ لمجلس الأمن في نيويورك لبحث ضمانات استمرار دخول القوافل",
      body: "مشروع قرار مشترك برعاية الجزائر والوسطاء يطالب بوقف دائم لإطلاق النار ورفع القيود عن المعابر بدون شروط سياسية مسبقة.",
      source: "مقر الأمم المتحدة — نيويورك",
      reliabilityLevel: "official",
      keyMetric: "مشروع قرار بمجلس الأمن",
    },
    {
      id: "g-2",
      timestamp: "19:15",
      headline: "الاتحاد الأوروبي: الأوضاع في غزة غير مقبولة ونطالب باحترام القانون الإنساني",
      body: "مسؤول السياسة الخارجية يؤكد في بيان رسمي أن تجويع المدنيين يمثل خرقاً صريحاً لمعاهدات جنيف الرابعة وقرارات محكمة العدل.",
      source: "مفوضية الاتحاد الأوروبي — بروكسل",
      reliabilityLevel: "official",
    },
  ],
  humanitarianPerspective: [
    {
      id: "h-1",
      timestamp: "21:30",
      headline: "الهلال الأحمر يفرغ حمولة 45 شاحنة طحين ومستلزمات جراحة في مستودعات خانيونس",
      body: "بدء التوزيع الميداني فجر الغد على مراكز النزوح الأكثر تضرراً ومطابخ التكية الخيرية التابعة للجان الشعبية.",
      source: "جمعية الهلال الأحمر الفلسطيني",
      reliabilityLevel: "verified",
      keyMetric: "45 شاحنة طحين",
    },
    {
      id: "h-2",
      timestamp: "18:40",
      headline: "إعادة تشغيل مولد الأكسجين المركزي في مجمع ناصر الطبي بعد وصول صهريج وقود",
      body: "إدارة المجمع تؤكد أن كمية السولار تكفي لتشغيل غرف العناية المركزة وحضانات الأطفال لمدة 72 ساعة قادمة فقط.",
      source: "إدارة مجمع ناصر الطبي",
      reliabilityLevel: "official",
      keyMetric: "72 ساعة وقود متوفرة",
    },
  ],
};
