export interface PalestinianPlace {
  id: string;
  name: string;
  district: string;
  status: "surviving" | "depopulated_1948" | "camp";
  statusLabel: string;
  population1948?: number;
  populationCurrent?: string;
  areaKm2?: number;
  coordinates: { lat: number; lng: number };
  famousFor: string;
  historicalSummary: string;
  landmarks: string[];
  image: string;
}

export const DISTRICTS = [
  "الكل",
  "القدس",
  "يافا",
  "حيفا",
  "غزة",
  "الخليل",
  "نابلس",
  "جنين",
  "عكا",
  "طولكرم",
  "رام الله والبيرة",
  "بيسان",
  "بئر السبع",
  "صفد",
  "طبريا",
  "الرملة",
];

export const PLACES: PalestinianPlace[] = [
  {
    id: "jerusalem-old-city",
    name: "البلدة القديمة — القدس الشريف",
    district: "القدس",
    status: "surviving",
    statusLabel: "صامدة تحت الحصار",
    populationCurrent: "38,000 نسمة",
    coordinates: { lat: 31.7767, lng: 35.2345 },
    famousFor: "المسجد الأقصى المبارك، قبة الصخرة، كنيسة القيامة، حارة المغاربة والأسواق العتيقة",
    historicalSummary: "قلب فلسطين التاريخي والروحي، تمتد أسوارها الكنعانية والإسلامية لأكثر من 4 آلاف عام، وتضم أقدس المقدسات الإسلامية والمسيحية، وتشهد صموداً يومياً في مواجهة مخططات التهويد والاستيطان.",
    landmarks: ["المسجد الأقصى (144 دونماً)", "قبة الصخرة المشرفة", "كنيسة القيامة", "باب العامود", "سبيل قايتباي"],
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "jaffa-manshiyya",
    name: "حي المنشية — يافا",
    district: "يافا",
    status: "depopulated_1948",
    statusLabel: "مهجرة ومدمرة عام 1948",
    population1948: 13000,
    coordinates: { lat: 32.0592, lng: 34.7594 },
    famousFor: "مسجد حسن بك التاريخي، مسارح يافا القديمة، وواجهة البحر الأبيض المتوسط",
    historicalSummary: "أحد أحدث وأرقى أحياء يافا قبل النكبة، كان جسراً عمرانياً واقتصادياً يربط يافا بشمالها. دُمر بالكامل خلال هجوم عصابات الإرغون في أبريل 1948، ولم يتبقَ منه سوى مسجد حسن بك الشاهد على عروبة الحي.",
    landmarks: ["مسجد حسن بك", "شاطئ المنشية", "أطلال البيوت اليافاوية العثمانية"],
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "haifa-balad-al-sheikh",
    name: "بلد الشيخ — قضاء حيفا",
    district: "حيفا",
    status: "depopulated_1948",
    statusLabel: "مهجرة عام 1948",
    population1948: 4120,
    coordinates: { lat: 32.7667, lng: 35.0333 },
    famousFor: "ضريح الشيخ عز الدين القسام ومعارك ثورة 1936 الكبرى",
    historicalSummary: "قرية فلسطينية تاريخية تقع جنوب شرق حيفا عند سفح جبل الكرمل الشمالي، اشتهرت بزراعة الزيتون ومصانع الإسمنت. تحتضن مقبرتها التاريخية ضريح الشهيد القائد عز الدين القسام.",
    landmarks: ["مقبرة القسام التاريخية", "مقام الشيخ عبد الله السهلي", "ينابيع عين السعادة"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "gaza-shujaiya",
    name: "حي الشجاعية — غزة",
    district: "غزة",
    status: "surviving",
    statusLabel: "صامد ومقاوم",
    populationCurrent: "110,000 نسمة",
    coordinates: { lat: 31.5036, lng: 34.4812 },
    famousFor: "معارك الصمود الأسطورية، جامع أحمد بن عثمان، وتلة المنطار التاريخية",
    historicalSummary: "أكبر أحياء مدينة غزة عراقة ومساحة، سُمي نسبة للشهيد شجاع الدين الكردي الذي استشهد في معارك الأيوبيين ضد الصليبيين عام 1239م. يضم تلة المنطار التي ترتفع 85 متراً وتشرف على عموم الساحل الفلسطيني.",
    landmarks: ["تلة المنطار التاريخية", "مسجد عثمان بن عفان الكبير", "سوق القيسارية وسوق الجمعة"],
    image: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "hebron-old-city",
    name: "البلدة القديمة — الخليل",
    district: "الخليل",
    status: "surviving",
    statusLabel: "صامدة ومسجلة بالتراث العالمي",
    populationCurrent: "45,000 نسمة",
    coordinates: { lat: 31.5247, lng: 35.1099 },
    famousFor: "الحرم الإبراهيمي الشريف، صناعة الخزف والزجاج التراثي، وصمود حارات القزازين وبني دار",
    historicalSummary: "إحدى أقدم مدن العالم المأهولة باستمرار، مسجلة على لائحة التراث العالمي لمنظمة اليونسكو. تضم الحرم الإبراهيمي الشريف ومقامات الأنبياء إبراهيم وإسحاق ويعقوب، وتتميز بالعمارة المملوكية والأيوبية الفريدة.",
    landmarks: ["الحرم الإبراهيمي الشريف", "بركة السلطان المملوكية", "خان الخليل القديم", "معامل الزجاج المنفوخ يدوياً"],
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "jenin-camp",
    name: "مخيم جنين — عاصمة الصمود",
    district: "جنين",
    status: "camp",
    statusLabel: "مخيم لاجئين صامد",
    populationCurrent: "18,000 نسمة",
    coordinates: { lat: 32.4619, lng: 35.2917 },
    famousFor: "ملحمة نيسان 2002، معارك التصدي، ومسرح الحرية الثقافي",
    historicalSummary: "تأسس عام 1953 لإيواء اللاجئين المهجرين من منطقة الكرمل وحيفا وقرى جبال الروحة. تحول المخيم إلى رمز عالمي للمقاومة والصمود الشعبي دفاعاً عن كرامة وحرية الشعب الفلسطيني.",
    landmarks: ["ساحة العودة", "مسرح الحرية الفلسطيني", "نصب شهداء معركة 2002"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "acre-old-city",
    name: "عكا القديمة — قاهرة الغزاة",
    district: "عكا",
    status: "surviving",
    statusLabel: "صامدة وراسخة في الذاكرة",
    populationCurrent: "22,000 نسمة",
    coordinates: { lat: 32.9211, lng: 35.0689 },
    famousFor: "أسوار عكا المنيعة التي حطمت أحلام نابليون بونابرت، خان العمدان، وجامع الجزار",
    historicalSummary: "ميناء فلسطين الشمالي العريق، تميزت بأسوارها البحرية والبرية التي هزمت حصار نابليون عام 1799. تشتهر ببرج الساعة وخان العمدان وجامع أحمد باشا الجزار وسوق البازار العثماني.",
    landmarks: ["أسوار عكا البحرية", "خان العمدان وبرج الساعة", "جامع الجزار التاريخي", "نفق الفرسان"],
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "deir-yassin",
    name: "دير ياسين — قضاء القدس",
    district: "القدس",
    status: "depopulated_1948",
    statusLabel: "مهجرة ومطهرة عرقياً عام 1948",
    population1948: 750,
    coordinates: { lat: 31.7869, lng: 35.1783 },
    famousFor: "مجزرة دير ياسين المروعة (9 أبريل 1948) وحجارة مقالع القدس الوردية الشهيرة",
    historicalSummary: "قرية وادعة غربي القدس اشتهرت بمقالع حجر البناء القدسي ومزارع التين واللوز. ارتكبت فيها عصابات الإرغون وشتيرن مجزرة وحشية استشهد فيها أكثر من 100 مدني بينهم أطفال ونساء لإجبار القرى المجاورة على الهجرة.",
    landmarks: ["مقام الشيخ ياسين الأثري", "مباني المستشفى القروي القديم", "مقالع حجر القدس التاريخية"],
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
  },
];
