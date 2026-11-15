export interface StoryClusterItem {
  id: string;
  headline: string;
  summary: string;
  category: string;
  importance: number;
  sourcesCount: number;
  lastUpdated: string;
  sources: { name: string; url: string; time: string; headline: string }[];
  timeline: { time: string; event: string; source: string }[];
}

export interface StoryCard {
  id: string;
  category: string;
  categoryColor: string;
  headline: string;
  summaryBullets: string[];
  sourceName: string;
  sourceUrl: string;
  timestamp: string;
  image: string;
  statNumber?: string;
  statLabel?: string;
}

export const STORY_CLUSTERS: StoryClusterItem[] = [
  {
    id: "cluster-aid-coordination",
    headline: "مسار تدفق المساعدات الإغاثية ومطالبات فتح الممرات الإنسانية إلى غزة",
    summary: "تغطية مجمعة من مصادر ميدانية وحقوقية متعددة ترصد حركة قوافل المساعدات الإغاثية، التوزيع الإنساني في مراكز الإيواء، والنداءات الدولية العاجلة لتأمين ممرات شمال القطاع.",
    category: "إنساني وميداني",
    importance: 95,
    sourcesCount: 4,
    lastUpdated: "منذ 25 دقيقة",
    sources: [
      { name: "جمعية الهلال الأحمر الفلسطيني", url: "https://palestinercs.org", time: "11:30", headline: "توزيع مستلزمات طبية وطحين لمشافي المحافظة الوسطى" },
      { name: "وكالة الأنباء الفلسطينية (وفا)", url: "https://wafa.ps", time: "10:45", headline: "وصول شحنات إغاثية جديدة وتنسيق لفرق الإسعاف" },
      { name: "مكتب الأمم المتحدة لتنسيق الشؤون الإنسانية (أوتشا)", url: "https://ochaopt.org", time: "09:15", headline: "تقرير الاحتياجات الإنسانية ومسارات الطوارئ" },
      { name: "وكالة الأونروا", url: "https://unrwa.org", time: "08:00", headline: "إحاطة إمدادات مراكز الإيواء وشبكات المياه" },
    ],
    timeline: [
      { time: "08:00", event: "بدء إجراءات تفريغ الشاحنات وتدقيق الفحوصات الإغاثية", source: "الأونروا" },
      { time: "09:15", event: "صدور تقرير أوتشا حول العجز الدوائي في مشافي الشمال", source: "أوتشا" },
      { time: "10:45", event: "تحرك أولى القوافل الطبية باتجاه المستودعات المركزية", source: "وفا" },
      { time: "11:30", event: "تسلم فرق الهلال الأحمر مستلزمات العناية المركزة", source: "الهلال الأحمر" },
    ],
  },
  {
    id: "cluster-icj-proceedings",
    headline: "المسار القانوني الدولي: متابعة قرارات وتدابير محكمة العدل الدولية",
    summary: "متابعة شاملة لردود الفعل والتقارير المرفوعة إلى أجهزة الأمم المتحدة بشأن التدابير الاحترازية الصادرة عن محكمة العدل الدولية في لاهاي والالتزام القانوني الدولي.",
    category: "قانون دولي وسياسة",
    importance: 88,
    sourcesCount: 3,
    lastUpdated: "منذ ساعتين",
    sources: [
      { name: "محكمة العدل الدولية (ICJ)", url: "https://icj-cij.org", time: "أمس", headline: "سجلات الإيداع والمذكرات القانونية الرسمية" },
      { name: "وكالة وفا الرسمية", url: "https://wafa.ps", time: "12:00", headline: "الخارجية الفلسطينية تطالب بإلزام الأطراف بالتدابير المؤقتة" },
      { name: "مجلس الأمن الدولي", url: "https://un.org", time: "13:30", headline: "جلسة إحاطة مفتوحة حول تنفيذ الأوامر القضائية" },
    ],
    timeline: [
      { time: "أمس 18:00", event: "استلام قلم المحكمة المذكرات الإيضاحية من الدول المنضمة", source: "سجلات لاهاي" },
      { time: "اليوم 12:00", event: "بيان الخارجية الفلسطينية الداعي لإنفاذ فوري للقرارات", source: "وفا" },
      { time: "اليوم 13:30", event: "بدء مداولات مجلس الأمن لتقييم الامتثال للقرارات القضائية", source: "الأمم المتحدة" },
    ],
  },
  {
    id: "cluster-palestine-economy",
    headline: "الاستقرار المالي والتجاري: حركة أسواق المال وأسعار الصرف في فلسطين",
    summary: "رصد مشترك لأداء بورصة فلسطين، مستويات السيولة المصرفية، وتغيرات أسعار صرف العملات والمعادن الثمينة محلياً وإقليمياً.",
    category: "اقتصاد وأسواق",
    importance: 75,
    sourcesCount: 3,
    lastUpdated: "منذ 3 ساعات",
    sources: [
      { name: "بورصة فلسطين (PEX)", url: "https://pex.ps", time: "13:00", headline: "إغلاق التداولات اليومية بمؤشر القدس" },
      { name: "سلطة النقد الفلسطينية", url: "https://pma.ps", time: "11:00", headline: "بيان استقرار المنظومة المصرفية الإلكترونية" },
      { name: "رويترز للأسواق المالية", url: "https://reuters.com", time: "10:30", headline: "تحركات أسعار أونصة الذهب والمعاملات الفورية" },
    ],
    timeline: [
      { time: "10:30", event: "افتتاح الأسواق مع استقرار مؤشر الذهب والعملات الرئيسية", source: "رويترز" },
      { time: "11:00", event: "تأكيد سلطة النقد انتظام مقاصة الشيكات والتحويلات الرقمية", source: "سلطة النقد" },
      { time: "13:00", event: "إغلاق مؤشر القدس على صعود نسبي بنشاط قطاع الخدمات", source: "بورصة فلسطين" },
    ],
  },
];

export const STORIES_SHORTS: StoryCard[] = [
  {
    id: "story-1",
    category: "إنساني وميداني",
    categoryColor: "bg-red-600",
    headline: "تنسيق إغاثي مشترك لنقل المستلزمات الطبية والغذائية لمراكز الإيواء",
    summaryBullets: [
      "فرق الهلال الأحمر والأونروا تشرف على تفريغ شحنات الطحين والأدوية الطارئة.",
      "توزيع المستلزمات لمشافي المحافظات وتغذية محطات تحلية المياه الميدانية.",
      "استمرار المناشدات الدولية لتأمين ممرات دائمة للمناطق الأكثر احتياجاً.",
    ],
    sourceName: "غرفة التنسيق الإنساني · الهلال الأحمر",
    sourceUrl: "/aid",
    timestamp: "محدث اليوم",
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=900&q=80",
    statLabel: "تنسيق ميداني موثق",
  },
  {
    id: "story-2",
    category: "رادار الحقيقة",
    categoryColor: "bg-amber-600",
    headline: "مرصد الحقيقة يفند شائعات التضليل الرقمي ويوثق الأدلة الجنائية",
    summaryBullets: [
      "الفحص الجنائي للصور والمقاطع يكشف المعاملات الاصطناعية والأدوات المولدة.",
      "مطابقة أرشيف البيانات الرسمية لنفي المراسلات المنسوبة لجهات الاختصاص.",
      "دعوة لجمهور المتابعين للاعتماد على المصادر الرسمية الموثقة بروابط صريحة.",
    ],
    sourceName: "وحدة التحقق الجنائي الرقمي · الوطن اليوم",
    sourceUrl: "/fact-check",
    timestamp: "محدث باستمرار",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80",
    statLabel: "تحقيق جنائي رقمي",
  },
  {
    id: "story-3",
    category: "اقتصاد وأسواق",
    categoryColor: "bg-emerald-600",
    headline: "متابعة أداء بورصة فلسطين ومستويات استقرار العملات الرئيسية",
    summaryBullets: [
      "بورصة فلسطين تشهد حركة تداولات نشطة بقيادة أسهم البنوك والاتصالات.",
      "مؤشر القدس يسجل استقراراً إيجابياً وسط تدفق طلبات المستثمرين المحليين.",
      "سلطة النقد تؤكد سلامة السيولة المصرفية وانتظام التحويلات الإلكترونية.",
    ],
    sourceName: "قسم الاقتصاد والأسواق المحلية",
    sourceUrl: "/economy",
    timestamp: "اليوم",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
    statLabel: "بيانات تداول حقيقية",
  },
];
