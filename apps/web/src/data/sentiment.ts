export interface SentimentMetric {
  category: string;
  positive: number;
  neutral: number;
  negativeOrBiased: number;
  trend: "up" | "down" | "stable";
  summary: string;
}

export interface TrendingTopic {
  rank: number;
  tag: string;
  mentions: number;
  sentimentScore: number; // 0 to 100
  dominantTone: "تعاطف وتضامن" | "حياد إخباري" | "انحياز وازدواجية" | "اهتمام حقوقي";
  category: string;
}

export const SENTIMENT_METRICS: SentimentMetric[] = [
  {
    category: "الإعلام الغربي والأوروبي (BBC, CNN, Reuters, Le Monde)",
    positive: 34,
    neutral: 42,
    negativeOrBiased: 24,
    trend: "up",
    summary: "تحول ملحوظ نحو تسليط الضوء على الأزمة الإنسانية والمجازر ضد الأطفال، مع تراجع في تبني الرواية الإسرائيلية الرسمية مقارنة ببداية الأحداث.",
  },
  {
    category: "الإعلام العربي والإقليمي",
    positive: 82,
    neutral: 14,
    negativeOrBiased: 4,
    trend: "stable",
    summary: "إجماع واسع على مساندة صمود شعب فلسطين وإدانة جرائم الحرب، مع تركيز استثنائي على التحركات الشعبية والدبلوماسية في المحافل الدولية.",
  },
  {
    category: "منصات التواصل العالمية (X, TikTok, Instagram)",
    positive: 76,
    neutral: 12,
    negativeOrBiased: 12,
    trend: "up",
    summary: "هيمنة للمحتوى البصري الموثق من داخل غزة والضفة، وفشل لحملات الحجب والـ Shadowban في إخفاء الرواية الحقيقية أمام الرأي العام العالمي.",
  },
];

export const TRENDING_TOPICS: TrendingTopic[] = [
  {
    rank: 1,
    tag: "#غزة_الصامدة",
    mentions: 842000,
    sentimentScore: 89,
    dominantTone: "تعاطف وتضامن",
    category: "ميداني وإنساني",
  },
  {
    rank: 2,
    tag: "#القدس_المحتلة",
    mentions: 431000,
    sentimentScore: 85,
    dominantTone: "اهتمام حقوقي",
    category: "مقدسات وحريات",
  },
  {
    rank: 3,
    tag: "#محكمة_العدل_الدولية",
    mentions: 295000,
    sentimentScore: 78,
    dominantTone: "حياد إخباري",
    category: "قانون دولي",
  },
  {
    rank: 4,
    tag: "#معبر_رفح_شريان_الحياة",
    mentions: 218000,
    sentimentScore: 92,
    dominantTone: "اهتمام حقوقي",
    category: "إغاثة ومساعدات",
  },
  {
    rank: 5,
    tag: "#الرواية_الفلسطينية",
    mentions: 174000,
    sentimentScore: 95,
    dominantTone: "تعاطف وتضامن",
    category: "إعلام وتوثيق",
  },
];
