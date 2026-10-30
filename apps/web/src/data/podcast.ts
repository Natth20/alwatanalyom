export interface PodcastDialogueLine {
  speaker: "نور (المذيعة)" | "أحمد (المحلل)";
  speakerRole: "تقديم وتحقيق" | "تحليل سياسي واستراتيجي";
  avatar: string;
  text: string;
  timestamp: string;
}

export interface PodcastEpisode {
  id: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  date: string;
  category: string;
  coverImage: string; 
  audioUrl?: string;
  dialogue: PodcastDialogueLine[];
}

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: "ep-1",
    title: "حوار الوطن · حقيقة مسار المفاوضات ومصير معابر غزة",
    subtitle: "حوار استقصائي يناقش ما وراء الكواليس الدبلوماسية وأثرها الحقيقي على الميدان",
    durationMinutes: 4,
    date: "اليوم · 30 أكتوبر 2026",
    category: "تحقيق وحوار سياسي",
    coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80",
    dialogue: [
      {
        speaker: "نور (المذيعة)",
        speakerRole: "تقديم وتحقيق",
        avatar: "👩‍💼",
        text: "أهلاً بكم في بودكاست «الوطن اليوم». نناقش الليلة التطورات المتسارعة في ملف المعابر ومزاعم التوصل إلى اتفاق شامل. أحمد، ما الذي يجري فعلياً خلف الأبواب المغلقة؟",
        timestamp: "00:15",
      },
      {
        speaker: "أحمد (المحلل)",
        speakerRole: "تحليل سياسي واستراتيجي",
        avatar: "👨‍💼",
        text: "مرحباً نور ومرحباً بمتابعينا. الحقيقة أن هناك فجوة هائلة بين التسريبات الإعلامية التي تتحدث عن انفراجة كاملة وبين ما يجري تداوله في أروقة الوسطاء. النص الذي روجت له بعض القنوات اليوم هو في الواقع مسودة مقترحات قديمة تم رفضها سابقاً.",
        timestamp: "00:48",
      },
      {
        speaker: "نور (المذيعة)",
        speakerRole: "تقديم وتحقيق",
        avatar: "👩‍💼",
        text: "وهذا ما أثبته أيضاً مرصد «رادار الحقيقة» في منصتنا اليوم. لكن ماذا عن تدفق المساعدات الإنسانية الفعلي؟ هل شهدنا تغييراً على أرض الواقع؟",
        timestamp: "01:30",
      },
      {
        speaker: "أحمد (المحلل)",
        speakerRole: "تحليل سياسي واستراتيجي",
        avatar: "👨‍💼",
        text: "نعم، دخول 114 شاحنة اليوم خفف الضغط قليلاً في محافظات الجنوب والوسط، لكن العقدة الكبرى لا تزال في مناطق الشمال التي تعاني من نقص حاد في الدقيق وحليب الأطفال والوقود للمستشفيات.",
        timestamp: "02:15",
      },
      {
        speaker: "نور (المذيعة)",
        speakerRole: "تقديم وتحقيق",
        avatar: "👩‍💼",
        text: "رسالتنا دائماً: تابعوا الأخبار من مصادرها الأصلية الموثقة ولا تلتفتوا للشائعات. شكراً أحمد، ونلتقي غداً في موجز تحليلي جديد.",
        timestamp: "03:45",
      },
    ],
  },
];
