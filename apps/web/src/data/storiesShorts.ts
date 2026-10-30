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

export const STORIES_SHORTS: StoryCard[] = [
  {
    id: "story-1",
    category: "عاجل وإنساني",
    categoryColor: "bg-red-600",
    headline: "دخول 114 شاحنة إغاثية جديدة إلى قطاع غزة عبر معبري رفح وكرم أبو سالم",
    summaryBullets: [
      "تضم الشاحنات 42 طناً من الأدوية والمستلزمات الطبية المخصصة لمشافي الوسط والجنوب.",
      "تنسيق مباشر مع الهلال الأحمر الفلسطيني والأونروا لتوزيع الطحين ومحطات تنقية المياه.",
      "المجاعة تتراجع نسبياً في مراكز الإيواء مع استمرار المطالبة بفتح ممرات دائمة شمالاً.",
    ],
    sourceName: "غرفة المتابعة الإنسانية · الهلال الأحمر",
    sourceUrl: "/live",
    timestamp: "منذ 15 دقيقة",
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=900&q=80",
    statNumber: "114",
    statLabel: "شاحنة إغاثة دخلت اليوم",
  },
  {
    id: "story-2",
    category: "رادار الحقيقة",
    categoryColor: "bg-amber-600",
    headline: "تفنيـد: مقطع الفيديو المتداول حول انفجار محطة كهرباء القدس مولد بالذكاء الاصطناعي",
    summaryBullets: [
      "الفحص الجنائي الرقمي عبر أداة SynthID كشف معاملات بصرية اصطناعية بنسبة 99.4%.",
      "طواقم الإطفاء بالقدس نفت تلقي أي بلاغات أو حرائق في شبكة الضغط العالي.",
      "ندعو الجمهور لعدم إعادة تدوير المقاطع المجهولة والاعتماد على مرصد الحقيقة.",
    ],
    sourceName: "وحدة الفحص الجنائي · الوطن اليوم",
    sourceUrl: "/fact-check/fc-2",
    timestamp: "منذ 40 دقيقة",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80",
    statNumber: "99.4%",
    statLabel: "نسبة التوليد الاصطناعي المثبتة",
  },
  {
    id: "story-3",
    category: "اقتصاد وأسواق",
    categoryColor: "bg-emerald-600",
    headline: "الذهب يسجل مستوى تاريخياً جديداً والليرة واليورو يستقران أمام الدولار",
    summaryBullets: [
      "أونصة الذهب تلامس 2748 دولاراً في المعاملات الفورية بدعم الطلب على الملاذات الآمنة.",
      "مؤشر بورصة فلسطين يسجل تداولات بقيمة 1.8 مليون دولار مع تركز الشراء في قطاع البنوك.",
      "توقعات بتثبيت البنوك المركزية الكبرى لأسعار الفائدة في اجتماعات الربع الحالي.",
    ],
    sourceName: "قسم الاقتصاد والأسواق العالمية",
    sourceUrl: "/economy",
    timestamp: "منذ ساعة",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80",
    statNumber: "$2,748",
    statLabel: "سعر الأونصة التاريخي",
  },
  {
    id: "story-4",
    category: "تقنية ومستقبل",
    categoryColor: "bg-indigo-600",
    headline: "إطلاق خوارزمية ذكاء اصطناعي وطنية لكشف التضليل الإعلامي في المنصات الاجتماعية",
    summaryBullets: [
      "النموذج اللغوي العربي يحلل 10,000 منشور في الدقيقة لرصد الحسابات الوهمية واللجان الإلكترونية.",
      "تتبع مصادر الشائعات الأولى وكشف شبكات التنسيق المنظم ضد الرواية الفلسطينية.",
      "إتاحة واجهة الاستعلام المجانية للمؤسسات الحقوقية والصحفيين المستقلين.",
    ],
    sourceName: "مختبر الوطن للتقنية والتحقق",
    sourceUrl: "/tech",
    timestamp: "منذ ساعتين",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    statNumber: "10K",
    statLabel: "منشور مفحوص كل دقيقة",
  },
];

