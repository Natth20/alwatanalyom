"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowLeft, Award, BookOpen, Check, CheckCircle2, Compass, Crown,
  Flame, Landmark, MapPin, Medal, Play, RotateCcw, ScrollText, Share2,
  ShieldCheck, Sparkles, Star, Target, Trash2, Trophy, User, Volume2,
  VolumeX, XCircle, Zap,
} from "lucide-react";

type DifficultyLevel = "سهل" | "متوسط" | "صعب";
type QuestionCategory = "جغرافيا وتضاريس" | "معالم القدس" | "آثار وعمارة" | "تراث وهوية" | "محطات النضال";
type CategoryFilter = "الكل" | QuestionCategory;
type GamePhase = "lobby" | "playing" | "finished";
type SoundEffectType = "correct" | "wrong" | "tick" | "finish" | "start";

interface Question {
  id: number;
  question: string;
  category: QuestionCategory;
  difficulty: DifficultyLevel;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  city: string;
}

interface AnswerRecord {
  questionId: number;
  category: QuestionCategory;
  difficulty: DifficultyLevel;
  isCorrect: boolean;
  selectedOption: number;
  pointsEarned: number;
  timeSpent: number;
}

interface CategoryBreakdown { category: QuestionCategory; total: number; correct: number; wrong: number; accuracy: number; }
interface AchievementBadge { id: string; title: string; subtitle: string; description: string; unlocked: boolean; }
interface LeaderboardEntry { id: string; playerName: string; score: number; accuracy: number; correctCount: number; totalQuestions: number; maxStreak: number; category: CategoryFilter; dateIso: string; }

const QUESTION_TIME_SECONDS = 25;
const LEADERBOARD_STORAGE_KEY = "alwatan_games_leaderboard_v1";
const PLAYER_NAME_STORAGE_KEY = "alwatan_games_player_name_v1";

const DIFFICULTY_CONFIG: Record<DifficultyLevel, { bonusPoints: number; badgeClass: string; dotClass: string }> = {
  سهل: { bonusPoints: 0, badgeClass: "border-emerald-400/35 bg-emerald-500/15 text-emerald-300", dotClass: "bg-emerald-400" },
  متوسط: { bonusPoints: 25, badgeClass: "border-[#f5b900]/40 bg-[#f5b900]/15 text-[#f5b900]", dotClass: "bg-[#f5b900]" },
  صعب: { bonusPoints: 50, badgeClass: "border-[#f5b900]/55 bg-[#590018]/80 text-[#ffd54f]", dotClass: "bg-[#ff6b81]" },
};

const CATEGORIES: CategoryFilter[] = ["الكل", "جغرافيا وتضاريس", "معالم القدس", "آثار وعمارة", "تراث وهوية", "محطات النضال"];

const QUESTIONS: Question[] = [
  {
    id: 1, category: "جغرافيا وتضاريس", difficulty: "سهل", city: "يافا المحتلة", correctIndex: 1,
    question: "ما هي المدينة الفلسطينية التاريخية المعروفة بلقب «عروس البحر الأبيض المتوسط» وتشتهر ببيارات البرتقال الشموطي ومينائها العريق؟",
    options: ["عكا", "يافا", "حيفا", "غزة"],
    explanation: "يافا هي عروس البحر وواحدة من أقدم مدن العالم وموانئ البحر المتوسط، وعُرفت عالمياً ببرتقال «يافا الشموطي» الذي كان يُصدر لكل قارات العالم.",
  },
  {
    id: 2, category: "معالم القدس", difficulty: "سهل", city: "القدس الشريف", correctIndex: 2,
    question: "ما اسم الباب الشهير في أسوار البلدة القديمة بالقدس الذي يُعرف أيضاً باسم «باب دمشق» ويعد المدخل الرئيسي المؤدي إلى المسجد الأقصى وأسواق المدينة؟",
    options: ["باب الخليل", "باب الساهرة", "باب العامود", "باب الأسباط"],
    explanation: "باب العامود هو أعظم أبواب القدس وأفخمها عمارة، شيده السلطان العثماني سليمان القانوني عام 1537م فوق بقايا بوابات رومانية قديمة.",
  },
  {
    id: 3, category: "آثار وعمارة", difficulty: "متوسط", city: "أريحا", correctIndex: 0,
    question: "ما اسم القصر الأثري التاريخي في أريحا الذي يحتوي على واحدة من أضخم وأجمل لوحات الفسيفساء المتصلة في العالم (شجرة الحياة)؟",
    options: ["قصر هشام بن عبد الملك", "قلعة بيسان", "قصر الباشا", "خان العمدان"],
    explanation: "قصر هشام في أريحا يعود للعهد الأموي ويضم سجادة فسيفساء بديعة تبلغ مساحتها 827 متراً مربعاً تزين قاعة الحمام الملكي الشهيرة بـ«شجرة الحياة».",
  },
  {
    id: 4, category: "تراث وهوية", difficulty: "سهل", city: "الخليل", correctIndex: 2,
    question: "أي مدينة فلسطينية تشتهر بلقب «مدينة الخليل الرحمن» وتضم الحرم الإبراهيمي الشريف وأسواق صناعة الخزف والزجاج اليدوي؟",
    options: ["نابلس", "بيت لحم", "الخليل", "جنين"],
    explanation: "الخليل هي رابع أقدس مدن الإسلام التاريخية بعد مكة والمدينة والقدس، وتضم مقام خليل الله إبراهيم عليه السلام وزوجته سارة في الحرم الإبراهيمي.",
  },
  {
    id: 5, category: "جغرافيا وتضاريس", difficulty: "متوسط", city: "نابلس جبل النار", correctIndex: 1,
    question: "ما هو الجبل المشهور في نابلس الذي يقابله جبل عيبال، وتُلقب المدينة بسببهما بحاضنة الجبلين؟",
    options: ["جبل الشيخ", "جبل جرزيم", "جبل المكبر", "جبل الكرمل"],
    explanation: "تقع مدينة نابلس (دمشق الصغرى) في وادٍ خصب بين جبلي جرزيم جنوباً وعيبال شمالاً، وتضم طائفة السامريين العريقة.",
  },
  {
    id: 6, category: "محطات النضال", difficulty: "متوسط", city: "القدس والخليل وصفد", correctIndex: 0,
    question: "ما هو العام الذي شهد اندلاع «ثورة البراق» المباركة دفاعاً عن الحائط الغربي للمسجد الأقصى المبارك ضد الانتداب والتهويد؟",
    options: ["1929م", "1936م", "1948م", "1920م"],
    explanation: "اندلعت ثورة البراق في أغسطس 1929م دفاعاً عن إسلامية حائط البراق، وأسفرت عن استشهاد قادة الثلاثاء الحمراء (محمد جمجوم وفؤاد حجازي وعطا الزير).",
  },
  {
    id: 7, category: "معالم القدس", difficulty: "صعب", city: "القدس الشريف", correctIndex: 1,
    question: "في أي عام أُتم بناء الجامع القبلي المسقوف في المسجد الأقصى المبارك، والذي بناه الخليفة الأموي عبد الملك بن مروان وأتمه ابنه الوليد بن عبد الملك؟",
    options: ["691م", "705م", "715م", "638م"],
    explanation: "بدأ الخليفة الأموي عبد الملك بن مروان بناء الجامع القبلي في المسجد الأقصى وأتمه الوليد بن عبد الملك عام 705م (86 هـ)، بينما أُنجزت قبة الصخرة المشرفة عام 691م.",
  },
  {
    id: 8, category: "جغرافيا وتضاريس", difficulty: "سهل", city: "أريحا", correctIndex: 1,
    question: "ما هي أقدم مدينة مأهولة بالسكان بشكل متواصل في فلسطين ومن أقدم مدن العالم المسوّرة، إذ يمتد تاريخ الاستيطان فيها لأكثر من 10,000 عام؟",
    options: ["غزة", "أريحا", "بيسان", "عسقلان"],
    explanation: "تُعد أريحا (تل السلطان) أقدم مدينة مسوّرة ومأهولة دون انقطاع في فلسطين والعالم، وتعود طبقاتها الأثرية لنحو 9000 قبل الميلاد (أكثر من 10,000 عام).",
  },
  {
    id: 9, category: "تراث وهوية", difficulty: "سهل", city: "مدن وقرى فلسطين", correctIndex: 0,
    question: "ما هو الفن الشعبي الفلسطيني المدرج لدى اليونسكو، والذي تعكس غرزه ونقوشه هوية كل مدينة وقرية مثل «نجمة بيت لحم» و«عرق السرو»؟",
    options: ["التطريز الفلاحي الفلسطيني", "الزخرفة الجصية", "النحت على الخشب", "النسيج الدمشقي"],
    explanation: "التطريز الفلاحي الفلسطيني سجل تراثي حي تعبر ألوانه وأنماطه عن كل منطقة من رام الله وبيت لحم إلى يافا والخليل وغزة، وأُدرج في اليونسكو عام 2021.",
  },
  {
    id: 10, category: "جغرافيا وتضاريس", difficulty: "متوسط", city: "نابلس", correctIndex: 2,
    question: "أي مدينة فلسطينية أطلق عليها المؤرخون والرحالة العرب لقب «دمشق الصغرى» لكثرة ينابيعها وبساتينها وطراز أسواقها وحماماتها الأثرية؟",
    options: ["صفد", "الناصرة", "نابلس", "طولكرم"],
    explanation: "لُقبت نابلس بـ«دمشق الصغرى» لتشابه عمرانها المملوكي والعثماني ووفرة عيونها المائية مع دمشق، كما عُرفت تاريخياً بـ«جبل النار» وبصابونها وكنافتها الفاخرة.",
  },
  {
    id: 11, category: "تراث وهوية", difficulty: "متوسط", city: "الولجة وعموم فلسطين", correctIndex: 1,
    question: "ما المكانة الثقافية لشجرة الزيتون في التراث الفلسطيني، والتي تمثلها شجرة «البدوي» المعمرة في قرية الولجة غرب بيت لحم؟",
    options: [
      "شجرة موسمية لا يتجاوز عمرها ثلاثين عاماً",
      "رمز الصمود والتجذر في الأرض ويعود عمر بعضها لأكثر من 4,000 عام",
      "نبتة أُدخلت إلى فلسطين حديثاً في القرن التاسع عشر",
      "زراعة تقتصر على صحراء النقب فقط",
    ],
    explanation: "ترمز شجرة الزيتون في الثقافة الفلسطينية إلى البقاء والانتماء المتوارث؛ وتحتضن قرية الولجة شجرة «البدوي» التي يُقدّر عمرها بين 4,000 و5,000 عام.",
  },
  {
    id: 12, category: "جغرافيا وتضاريس", difficulty: "سهل", city: "أريحا والأغوار", correctIndex: 1,
    question: "ما الاسم العربي التاريخي والسمة الجغرافية الفريدة للمسطح المائي شرق فلسطين الذي ينخفض سطحه لنحو 430 متراً تحت مستوى سطح البحر؟",
    options: [
      "بحيرة طبريا — أكبر بحيرة عذبة في العالم",
      "البحر الميت (بحيرة لوط) — أخفض نقطة على سطح اليابسة في العالم",
      "خليج حيفا — أعمق ميناء في البحر الأحمر",
      "بحيرة الحولة — أعلى هضبة بركانية في بلاد الشام",
    ],
    explanation: "البحر الميت (بحيرة لوط أو بحر زغر) هو أخفض بقعة على سطح اليابسة في الأرض (-430م تحت مستوى البحر)، وتبلغ ملوحته قرابة 34%.",
  },
  {
    id: 13, category: "تراث وهوية", difficulty: "صعب", city: "عموم فلسطين", correctIndex: 0,
    question: "أي طبق فلسطيني تقليدي ارتبط بحفظ الذاكرة المطبخية الشعبية، وحظي موروث برمه وتحضيره باعتراف اليونسكو ضمن التراث الثقافي غير المادي؟",
    options: ["المفتول والمقلوبة", "الكبسة", "الحنيذ", "المندي"],
    explanation: "يُعد المفتول (ضمن ملف مهارات ومعارف إنتاج الحبوب المبرومة في اليونسكو عام 2020) والمقلوبة عنوانين أصيلين للمطبخ التراثي الفلسطيني ومواسم الضيافة واللمة.",
  },
  {
    id: 14, category: "معالم القدس", difficulty: "صعب", city: "القدس الشريف", correctIndex: 2,
    question: "أيٌّ من أبواب المسجد الأقصى المبارك يُعد الأقرب إلى صحن قبة الصخرة المشرفة من الجهة الغربية، ويفضي إلى سوق مملوكي يحمل الاسم نفسه؟",
    options: ["باب الأسباط", "باب المغاربة", "باب القطانين", "باب حطة"],
    explanation: "باب القطانين من أفخم الأبواب الغربية للمسجد الأقصى وأقربها لقبة الصخرة؛ جدده السلطان المملوكي الناصر محمد بن قلاوون عام 1336م عبر الأمير تنكز، ويتصل بسوق القطانين.",
  },
  {
    id: 15, category: "آثار وعمارة", difficulty: "صعب", city: "الخليل", correctIndex: 2,
    question: "في أي عام أدرجت منظمة اليونسكو البلدة القديمة في مدينة الخليل والحرم الإبراهيمي الشريف على قائمة التراث العالمي؟",
    options: ["2011م", "2014م", "2017م", "2021م"],
    explanation: "في 7 يوليو 2017م، أدرجت لجنة التراث العالمي لليونسكو البلدة القديمة بالخليل والحرم الإبراهيمي الشريف على قائمة التراث العالمي والتراث المعرض للخطر.",
  },
];

const ARENA_THEME_VARS: CSSProperties & Record<`--${string}`, string> = {
  "--bg": "#0E0407", "--surface": "#16060B", "--primary": "#590018", "--gold": "#f5b900",
  "--text": "#ffffff", "--text-muted": "#c9b3b9", "--border": "rgba(245, 185, 0, 0.22)",
};

const SOUND_PATTERNS: Record<SoundEffectType, Array<{ freq: number; delay: number; duration: number; type: OscillatorType; gain: number }>> = {
  correct: [
    { freq: 523.25, delay: 0, duration: 0.12, type: "triangle", gain: 0.12 },
    { freq: 659.25, delay: 0.08, duration: 0.14, type: "triangle", gain: 0.12 },
    { freq: 783.99, delay: 0.16, duration: 0.22, type: "sine", gain: 0.14 },
  ],
  wrong: [{ freq: 240, delay: 0, duration: 0.16, type: "sawtooth", gain: 0.07 }, { freq: 175, delay: 0.12, duration: 0.24, type: "sawtooth", gain: 0.06 }],
  tick: [{ freq: 880, delay: 0, duration: 0.05, type: "sine", gain: 0.04 }],
  start: [{ freq: 440, delay: 0, duration: 0.1, type: "triangle", gain: 0.09 }, { freq: 587.33, delay: 0.08, duration: 0.16, type: "triangle", gain: 0.1 }],
  finish: [
    { freq: 523.25, delay: 0, duration: 0.14, type: "triangle", gain: 0.1 }, { freq: 659.25, delay: 0.1, duration: 0.14, type: "triangle", gain: 0.1 },
    { freq: 783.99, delay: 0.2, duration: 0.16, type: "triangle", gain: 0.12 }, { freq: 1046.5, delay: 0.3, duration: 0.32, type: "sine", gain: 0.14 },
  ],
};

function getAudioContext(ctxRef: React.MutableRefObject<AudioContext | null>): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AudioCtx = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!ctxRef.current) ctxRef.current = new AudioCtx();
  if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
  return ctxRef.current;
}

function playToneSequence(ctx: AudioContext, effect: SoundEffectType): void {
  const now = ctx.currentTime;
  for (const note of SOUND_PATTERNS[effect]) {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    osc.type = note.type;
    osc.frequency.setValueAtTime(note.freq, now + note.delay);
    gainNode.gain.setValueAtTime(0.0001, now + note.delay);
    gainNode.gain.exponentialRampToValueAtTime(note.gain, now + note.delay + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + note.delay + note.duration);
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    osc.start(now + note.delay);
    osc.stop(now + note.delay + note.duration + 0.02);
  }
}

function getRankTitle(accuracy: number, correctCount: number): string {
  if (correctCount === 0) return "مستكشف البدايات";
  if (accuracy >= 90) return "عميد الذاكرة الملكية";
  if (accuracy >= 75) return "حارس التراث الأول";
  if (accuracy >= 50) return "فارس الجغرافيا والتاريخ";
  return "باحث في الجذور الوطنية";
}

function evaluateAchievements(records: AnswerRecord[], maxStreak: number, totalQuestions: number): AchievementBadge[] {
  const correctCount = records.filter((r) => r.isCorrect).length;
  const geoRecords = records.filter((r) => r.category === "جغرافيا وتضاريس");
  return [
    { id: "jerusalem-guardian", title: "حارس القدس", subtitle: "5+ إجابات صحيحة", description: `أصبت ${correctCount} إجابات موثقة في الذاكرة الفلسطينية`, unlocked: correctCount >= 5 },
    {
      id: "geography-scholar", title: "عالم الجغرافيا", subtitle: "إتقان جميع أسئلة الجغرافيا",
      description: geoRecords.length > 0 ? `أجبت ${geoRecords.filter((r) => r.isCorrect).length} من ${geoRecords.length} في الجغرافيا والتضاريس` : "اختر مسار الكل أو الجغرافيا لفتح هذا الوسام",
      unlocked: geoRecords.length > 0 && geoRecords.every((r) => r.isCorrect),
    },
    { id: "streak-master", title: "شعلة الثبات", subtitle: "تتابع 4+ إجابات متتالية", description: `أطول سلسلة انتصارات متصلة: x${maxStreak}`, unlocked: maxStreak >= 4 },
    { id: "royal-perfection", title: "التاج الذهبي الكامل", subtitle: "العلامة الكاملة 100%", description: `الدرجة الكاملة عبر ${totalQuestions} أسئلة تراثية`, unlocked: totalQuestions >= 3 && correctCount === totalQuestions },
  ];
}

export default function GamesMemoryPage() {
  const [gamePhase, setGamePhase] = useState<GamePhase>("lobby");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("الكل");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timer, setTimer] = useState(QUESTION_TIME_SECONDS);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [playerName, setPlayerName] = useState("حارس الذاكرة");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const activeQuestions = useMemo<Question[]>(() => (selectedCategory === "الكل" ? QUESTIONS : QUESTIONS.filter((q) => q.category === selectedCategory)), [selectedCategory]);
  const currentQ = activeQuestions[currentIdx] ?? QUESTIONS[0];

  const playSound = useCallback((type: SoundEffectType) => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext(audioCtxRef);
      if (ctx) playToneSequence(ctx, type);
    } catch { /* Ignore browser audio restriction errors */ }
  }, [soundEnabled]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedName = window.localStorage.getItem(PLAYER_NAME_STORAGE_KEY);
      if (savedName?.trim()) setPlayerName(savedName.trim());
      const rawBoard = window.localStorage.getItem(LEADERBOARD_STORAGE_KEY);
      if (rawBoard) {
        const parsed = JSON.parse(rawBoard) as unknown;
        if (Array.isArray(parsed)) {
          setLeaderboard(parsed.filter((item): item is LeaderboardEntry => typeof item === "object" && item !== null && typeof (item as LeaderboardEntry).id === "string" && typeof (item as LeaderboardEntry).score === "number").slice(0, 5));
        }
      }
    } catch { /* Ignore malformed localStorage entries */ }
  }, []);

  const handlePlayerNameChange = (name: string) => {
    setPlayerName(name);
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(PLAYER_NAME_STORAGE_KEY, name); } catch { /* Ignore storage errors */ }
  };

  const handleOptionSelect = useCallback((optionIdx: number) => {
    if (isAnswered || gamePhase !== "playing") return;
    const isCorrect = optionIdx === currentQ.correctIndex;
    const diffBonus = DIFFICULTY_CONFIG[currentQ.difficulty].bonusPoints;
    const timeSpent = Math.max(1, QUESTION_TIME_SECONDS - timer);
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    let pointsEarned = 0;
    if (isCorrect) {
      pointsEarned = 100 + diffBonus + streak * 25;
      const nextStreak = streak + 1;
      setScore((prev) => prev + pointsEarned);
      setStreak(nextStreak);
      setMaxStreak((prev) => Math.max(prev, nextStreak));
      playSound("correct");
    } else {
      setStreak(0);
      playSound("wrong");
    }

    setRecords((prev) => [...prev, { questionId: currentQ.id, category: currentQ.category, difficulty: currentQ.difficulty, isCorrect, selectedOption: optionIdx, pointsEarned, timeSpent }]);
  }, [currentQ, gamePhase, isAnswered, playSound, streak, timer]);

  useEffect(() => {
    if (gamePhase !== "playing" || isAnswered) return;
    const interval = setInterval(() => setTimer((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [gamePhase, isAnswered, currentIdx]);

  useEffect(() => {
    if (gamePhase !== "playing" || isAnswered) return;
    if (timer === 0) handleOptionSelect(-1);
    else if (timer <= 5) playSound("tick");
  }, [timer, gamePhase, isAnswered, handleOptionSelect, playSound]);

  const persistRunToLeaderboard = useCallback((finalRecords: AnswerRecord[], finalScore: number, finalMaxStreak: number) => {
    if (typeof window === "undefined" || finalRecords.length === 0) return;
    const correct = finalRecords.filter((r) => r.isCorrect).length;
    const entry: LeaderboardEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      playerName: playerName.trim() || "حارس الذاكرة",
      score: finalScore,
      accuracy: Math.round((correct / finalRecords.length) * 100),
      correctCount: correct,
      totalQuestions: finalRecords.length,
      maxStreak: finalMaxStreak,
      category: selectedCategory,
      dateIso: new Date().toISOString(),
    };
    setLeaderboard((prev) => {
      const updated = [...prev, entry].sort((a, b) => b.score - a.score || b.accuracy - a.accuracy).slice(0, 5);
      try { window.localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(updated)); } catch { /* Ignore quota errors */ }
      return updated;
    });
  }, [playerName, selectedCategory]);

  const handleStartGame = () => {
    setCurrentIdx(0); setSelectedOption(null); setScore(0); setStreak(0); setMaxStreak(0);
    setRecords([]); setIsAnswered(false); setTimer(QUESTION_TIME_SECONDS); setGamePhase("playing");
    playSound("start");
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < activeQuestions.length) {
      setCurrentIdx((prev) => prev + 1); setSelectedOption(null); setIsAnswered(false); setTimer(QUESTION_TIME_SECONDS);
    } else {
      setGamePhase("finished");
      playSound("finish");
      persistRunToLeaderboard(records, score, maxStreak);
    }
  };

  const handleReturnLobby = () => { setGamePhase("lobby"); setIsAnswered(false); setSelectedOption(null); setTimer(QUESTION_TIME_SECONDS); };
  const handleClearLeaderboard = () => {
    setLeaderboard([]);
    if (typeof window !== "undefined") { try { window.localStorage.removeItem(LEADERBOARD_STORAGE_KEY); } catch { /* Ignore */ } }
  };

  const correctCount = useMemo(() => records.filter((r) => r.isCorrect).length, [records]);
  const accuracyPct = useMemo(() => (activeQuestions.length > 0 ? Math.round((correctCount / activeQuestions.length) * 100) : 0), [activeQuestions.length, correctCount]);
  const avgTimeSeconds = useMemo(() => (records.length ? Math.round(records.reduce((acc, r) => acc + r.timeSpent, 0) / records.length) : 0), [records]);

  const categoryBreakdown = useMemo<CategoryBreakdown[]>(() => {
    const map = new Map<QuestionCategory, { total: number; correct: number }>();
    for (const q of activeQuestions) { const prev = map.get(q.category) ?? { total: 0, correct: 0 }; map.set(q.category, { ...prev, total: prev.total + 1 }); }
    for (const r of records) { const prev = map.get(r.category); if (prev && r.isCorrect) map.set(r.category, { ...prev, correct: prev.correct + 1 }); }
    return Array.from(map.entries()).map(([category, stats]) => ({
      category, total: stats.total, correct: stats.correct, wrong: stats.total - stats.correct,
      accuracy: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
    }));
  }, [activeQuestions, records]);

  const achievements = useMemo(() => evaluateAchievements(records, maxStreak, activeQuestions.length), [records, maxStreak, activeQuestions.length]);
  const unlockedBadges = useMemo(() => achievements.filter((b) => b.unlocked), [achievements]);
  const bestScore = leaderboard[0]?.score ?? 0;

  const handleShareCertificate = () => {
    if (typeof window === "undefined") return;
    const badgeNames = unlockedBadges.length > 0 ? unlockedBadges.map((b) => `«${b.title}»`).join("، ") : "مشارك في صون الذاكرة";
    const text = [
      `🏆 وسام حارس الذاكرة الوطنية الفلسطينية — منصة «الوطن اليوم»`,
      `👤 المتسابق: ${playerName.trim() || "حارس الذاكرة"} (${getRankTitle(accuracyPct, correctCount)})`,
      `⭐ النقاط: ${score} نقطة | 🎯 الدقة: ${accuracyPct}% (${correctCount}/${activeQuestions.length})`,
      `🔥 أطول تتابع: x${maxStreak} | ⏱️ متوسط السرعة: ${avgTimeSeconds}ث | 🏅 الأوسمة: ${badgeNames}`,
      `اختبر معرفتك بتاريخ وجغرافيا فلسطين الآن: ${window.location.href}`,
    ].join("\n");
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const ringRadius = 22;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const strokeDashoffset = ringCircumference * (1 - Math.max(0, Math.min(1, timer / QUESTION_TIME_SECONDS)));
  const isTimeCritical = timer <= 5;
  const streakTierLabel = streak >= 5 ? "تتابع أسطوري" : streak >= 3 ? "شعلة متقدة" : "تتابع متصاعد";

  return (
    <div dir="rtl" style={ARENA_THEME_VARS} className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-24 selection:bg-[var(--gold)]/30 relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 right-1/4 w-[520px] h-[520px] rounded-full bg-[#590018]/35 blur-[130px]" />
        <div className="absolute top-1/3 -left-32 w-[420px] h-[420px] rounded-full bg-[#f5b900]/10 blur-[140px]" />
      </div>

      {/* الترويسة الملكية لساحة التحدي */}
      <header className="relative z-10 border-b border-[var(--border)] bg-gradient-to-b from-[#2b000d]/85 via-[var(--surface)]/95 to-[var(--bg)] py-10 md:py-14">
        <div className="container-custom max-w-5xl mx-auto px-4 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--gold)]/40 bg-[#590018]/60 text-[var(--gold)] text-xs font-black shadow-lg shadow-[#590018]/30">
              <Crown className="w-4 h-4" />
              <span>ساحة الذاكرة الملكية · صون التراث الفلسطيني</span>
            </div>
            <div className="flex items-center gap-2.5">
              {bestScore > 0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border border-[var(--gold)]/30 bg-[var(--surface)] text-xs font-bold text-[var(--gold)]">
                  <Trophy className="w-3.5 h-3.5" /><span>أعلى رقم: {bestScore}</span>
                </div>
              )}
              <button type="button" onClick={() => setSoundEnabled((prev) => !prev)} aria-label={soundEnabled ? "كتم المؤثرات الصوتية" : "تفعيل المؤثرات الصوتية"} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--gold)] text-xs font-bold text-[var(--text)] transition-colors cursor-pointer">
                {soundEnabled ? <Volume2 className="w-4 h-4 text-[var(--gold)]" /> : <VolumeX className="w-4 h-4 text-[var(--text-muted)]" />}
                <span>{soundEnabled ? "الصوت مُفعّل" : "الصوت صامت"}</span>
              </button>
            </div>
          </div>
          <div className="space-y-3 text-center md:text-right">
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
              تحدي الذاكرة الوطنية · <span className="text-[var(--gold)]">حراس الجذور والتاريخ</span>
            </h1>
            <p className="text-sm md:text-base text-[var(--text-muted)] max-w-3xl leading-relaxed">
              15 سؤالاً تاريخياً وجغرافياً وتراثياً موثقاً عن القدس والخليل وأريحا ونابلس ويافا. اختر مسارك، تحدَّ المؤقت الدائري، واجمع أوسمة الشرف.
            </p>
          </div>
        </div>
      </header>

      <main className="container-custom max-w-5xl mx-auto px-4 py-8 relative z-10 space-y-8">
        {/* المرحلة 1: بهو الانطلاق وتصفية الفئات */}
        {gamePhase === "lobby" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in-up">
            <section className="lg:col-span-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 space-y-7 shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#590018] to-[#2b000d] border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)]"><Compass className="w-5 h-5" /></div>
                  <div>
                    <h2 className="text-lg md:text-xl font-black text-white">اختر ميدان المعرفة</h2>
                    <p className="text-xs text-[var(--text-muted)]">حدّد التصنيف أو خُض التحدي الشامل لفتح كافة الأوسمة</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/35 text-[var(--gold)] text-xs font-black">{activeQuestions.length} سؤالاً جاهزاً</span>
              </div>

              <div className="space-y-2">
                <label htmlFor="player-name-input" className="text-xs font-bold text-[var(--gold)] flex items-center gap-1.5"><User className="w-3.5 h-3.5" /><span>الاسم المنقوش على وسام الشرف ولوحة الأبطال:</span></label>
                <input id="player-name-input" type="text" maxLength={32} value={playerName} onChange={(e) => handlePlayerNameChange(e.target.value)} placeholder="أدخل اسمك الكريم..." className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm font-bold text-white placeholder:text-[var(--text-muted)]/60 focus:outline-none focus:border-[var(--gold)] transition-colors" />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-[var(--text-muted)] block">مسارات الأسئلة الموثقة:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CATEGORIES.map((cat) => {
                    const count = cat === "الكل" ? QUESTIONS.length : QUESTIONS.filter((q) => q.category === cat).length;
                    const isSelected = selectedCategory === cat;
                    return (
                      <button key={cat} type="button" onClick={() => setSelectedCategory(cat)} className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${isSelected ? "border-[var(--gold)] bg-gradient-to-l from-[#590018]/75 to-[#1c050c] text-white shadow-lg shadow-[#590018]/30" : "border-[var(--border)] bg-[var(--bg)]/80 hover:border-[var(--gold)]/50 text-[var(--text-muted)] hover:text-white"}`}>
                        <div className="flex items-center gap-2.5"><Landmark className={`w-4 h-4 ${isSelected ? "text-[var(--gold)]" : "text-[var(--text-muted)]"}`} /><span className="text-xs md:text-sm font-black">{cat}</span></div>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black ${isSelected ? "bg-[var(--gold)] text-[#140106]" : "bg-white/5 text-[var(--text-muted)]"}`}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-1.5"><Zap className="w-4 h-4 text-[var(--gold)]" /><span>مكافأة التتابع +25</span></span>
                  <span className="inline-flex items-center gap-1.5"><Target className="w-4 h-4 text-emerald-400" /><span>{QUESTION_TIME_SECONDS} ثانية للسؤال</span></span>
                </div>
                <button type="button" onClick={handleStartGame} className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#f5b900] to-[#dca600] text-[#140106] font-black text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-[#f5b900]/20 flex items-center gap-2 cursor-pointer">
                  <Play className="w-4 h-4 fill-current" /><span>ابدأ التحدي الآن</span>
                </button>
              </div>
            </section>

            <aside className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Trophy className="w-4 h-4 text-[var(--gold)]" /><h3 className="text-sm font-black text-white">لوحة الشرف المحلية</h3></div>
                  {leaderboard.length > 0 && (
                    <button type="button" onClick={handleClearLeaderboard} className="text-[11px] text-[var(--text-muted)] hover:text-rose-400 inline-flex items-center gap-1 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /><span>مسح</span></button>
                  )}
                </div>
                {leaderboard.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--bg)]/60 p-5 text-center space-y-2">
                    <Medal className="w-7 h-7 text-[var(--gold)]/60 mx-auto" />
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">لم تُسجّل جولات بعد على هذا المتصفح. أكمل جولتك الأولى لتتصدر القائمة.</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {leaderboard.map((entry, idx) => (
                      <div key={entry.id} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)]/85 px-3.5 py-2.5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${idx === 0 ? "bg-[var(--gold)] text-[#140106]" : "bg-[#590018] text-white border border-[var(--gold)]/30"}`}>{idx + 1}</span>
                          <div className="min-w-0">
                            <p className="text-xs font-black text-white truncate">{entry.playerName}</p>
                            <p className="text-[10px] text-[var(--text-muted)]">{entry.category} · دقة {entry.accuracy}%</p>
                          </div>
                        </div>
                        <span className="text-xs font-black text-[var(--gold)] font-mono shrink-0">{entry.score}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[#590018]/45 to-[var(--surface)] p-6 space-y-3 shadow-xl">
                <div className="flex items-center gap-2 text-[var(--gold)]"><ShieldCheck className="w-4 h-4" /><h3 className="text-sm font-black">أوسمة يمكنك انتزاعها</h3></div>
                <ul className="space-y-2.5 text-xs text-[var(--text-muted)]">
                  <li className="flex items-start gap-2"><Crown className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" /><span><strong className="text-white">حارس القدس:</strong> تحقيق 5 إجابات صحيحة فأكثر.</span></li>
                  <li className="flex items-start gap-2"><Compass className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /><span><strong className="text-white">عالم الجغرافيا:</strong> إتقان جميع أسئلة الجغرافيا والتضاريس دون خطأ.</span></li>
                </ul>
              </div>
            </aside>
          </div>
        )}

        {/* المرحلة 2: ساحة الأسئلة التفاعلية */}
        {gamePhase === "playing" && (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-10 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-[#260710]">
              <div className="h-full bg-gradient-to-l from-[#f5b900] via-[#ffd54f] to-[#590018] transition-all duration-500" style={{ width: `${Math.round(((currentIdx + (isAnswered ? 1 : 0)) / activeQuestions.length) * 100)}%` }} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[var(--border)]">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-black text-[var(--text-muted)]">السؤال {currentIdx + 1} من {activeQuestions.length}</span>
                <span className="px-3 py-1 rounded-full bg-[#590018] border border-[var(--gold)]/30 text-[var(--gold)] text-xs font-bold">{currentQ.category}</span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-black ${DIFFICULTY_CONFIG[currentQ.difficulty].badgeClass}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${DIFFICULTY_CONFIG[currentQ.difficulty].dotClass}`} /><span>{currentQ.difficulty}</span>
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                {streak >= 2 && (
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border font-black text-xs transition-all ${streak >= 4 ? "border-amber-400 bg-gradient-to-r from-amber-500/25 to-[#590018]/60 text-amber-300 shadow-lg shadow-amber-500/20 scale-105 animate-pulse" : "border-amber-500/40 bg-amber-500/15 text-amber-400 animate-pulse"}`}>
                    <Flame className="w-4 h-4 fill-current text-amber-400" /><span>{streakTierLabel} x{streak}</span>
                  </div>
                )}

                <div className={`relative w-14 h-14 flex items-center justify-center shrink-0 ${isTimeCritical && !isAnswered ? "animate-pulse" : ""}`} aria-label={`الوقت المتبقي ${timer} ثانية`}>
                  <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r={ringRadius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
                    <circle cx="28" cy="28" r={ringRadius} fill="none" stroke={isTimeCritical ? "#e84a5f" : "#f5b900"} strokeWidth="4" strokeLinecap="round" strokeDasharray={ringCircumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-700 ease-linear" />
                  </svg>
                  <span className={`absolute text-sm font-black font-mono tabular-nums ${isTimeCritical ? "text-rose-400" : "text-white"}`}>{timer}</span>
                </div>

                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-[#f5b900] to-[#dca600] text-[#140106] font-black text-xs shadow-md">
                  <Star className="w-3.5 h-3.5 fill-current" /><span className="font-mono tabular-nums">{score} نقطة</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-[var(--gold)] flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /><span>نطاق السؤال: {currentQ.city}</span></span>
                <span className="text-[11px] font-bold text-[var(--text-muted)]">القيمة الأساسية: {100 + DIFFICULTY_CONFIG[currentQ.difficulty].bonusPoints} نقطة</span>
              </div>
              <h2 className="text-lg md:text-2xl font-black text-white leading-snug">{currentQ.question}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === currentQ.correctIndex;
                const letters = ["أ", "ب", "ج", "د"];
                let btnStyle = "border-[var(--border)] bg-[var(--bg)] hover:border-[var(--gold)] hover:bg-[#1f070f] text-white";
                if (isAnswered) {
                  if (isCorrect) btnStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-200 font-bold shadow-lg shadow-emerald-500/10";
                  else if (isSelected) btnStyle = "border-rose-500 bg-rose-500/15 text-rose-200 font-bold";
                  else btnStyle = "border-[var(--border)] bg-[var(--bg)] opacity-40";
                }
                return (
                  <button key={optIdx} type="button" onClick={() => handleOptionSelect(optIdx)} disabled={isAnswered} className={`p-4 rounded-2xl border text-right text-xs md:text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer disabled:cursor-default ${btnStyle}`}>
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${isAnswered && isCorrect ? "bg-emerald-500 text-[#0b1f15]" : isAnswered && isSelected ? "bg-rose-500 text-white" : "bg-[#590018]/75 text-[var(--gold)] border border-[var(--gold)]/30"}`}>{letters[optIdx]}</span>
                      <span className="leading-relaxed">{opt}</span>
                    </div>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="p-5 md:p-6 rounded-2xl border border-[var(--gold)]/45 bg-gradient-to-l from-[#590018]/45 via-[#1d070e] to-[var(--bg)] space-y-3 animate-fade-in-up">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-black text-[var(--gold)]"><BookOpen className="w-4 h-4" /><span>التوثيق والشاهد التاريخي:</span></div>
                  {selectedOption === -1 && <span className="text-[11px] font-bold text-rose-400">انتهى الوقت المحدد للسؤال</span>}
                </div>
                <p className="text-xs md:text-sm text-white/90 leading-relaxed">{currentQ.explanation}</p>
                <div className="pt-2 flex items-center justify-between gap-3">
                  <button type="button" onClick={handleReturnLobby} className="text-xs font-bold text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer">العودة لاختيار المسار</button>
                  <button type="button" onClick={handleNextQuestion} className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#f5b900] to-[#dca600] text-[#140106] font-black text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center gap-2 cursor-pointer">
                    <span>{currentIdx + 1 === activeQuestions.length ? "عرض وسام الشرف والنتائج" : "السؤال التالي"}</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* المرحلة 3: وسام الشرف، تحليل الفئات، والأوسمة */}
        {gamePhase === "finished" && (
          <div className="space-y-8 animate-fade-in-up">
            <section className="rounded-3xl border-2 border-[var(--gold)] bg-gradient-to-br from-[#2b000d] via-[#16060B] to-[#0E0407] p-7 md:p-12 text-center text-white space-y-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-bold text-[var(--gold)]/75">
                <span className="inline-flex items-center gap-1"><ScrollText className="w-3.5 h-3.5" /><span>سجل الوطن اليوم التوثيقي</span></span>
                <span>{new Date().toLocaleDateString("ar-EG")}</span>
              </div>
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#f5b900] to-[#dca600] text-[#140106] flex items-center justify-center mx-auto shadow-2xl shadow-[#f5b900]/30"><Award className="w-12 h-12" /></div>
              <div className="space-y-2">
                <span className="text-xs font-black text-[var(--gold)] tracking-widest uppercase block">وثيقة التقدير والامتياز التراثي</span>
                <h2 className="text-2xl md:text-4xl font-black text-white">وسام حارس الذاكرة الوطنية الفلسطينية</h2>
                <p className="text-sm font-bold text-[var(--gold)]">الممنوح إلى: {playerName.trim() || "حارس الذاكرة"} · الرتبة: {getRankTitle(accuracyPct, correctCount)}</p>
                <p className="text-xs md:text-sm text-white/75 max-w-xl mx-auto leading-relaxed">
                  تمنح منصة «الوطن اليوم» هذا الوسام تقديراً لتمسكك بالرواية التاريخية الموثقة وصون معالم وجغرافيا فلسطين عبر مسار «{selectedCategory}».
                </p>
              </div>

              {unlockedBadges.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {unlockedBadges.map((b) => (
                    <span key={b.id} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--gold)]/45 bg-[var(--gold)]/15 text-[var(--gold)] text-xs font-black">
                      <Medal className="w-3.5 h-3.5" /><span>{b.title}</span>
                    </span>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-3xl mx-auto">
                <div className="p-4 rounded-2xl bg-white/5 border border-[var(--gold)]/25"><span className="text-[11px] text-white/60 block">مجموع النقاط</span><span className="text-2xl md:text-3xl font-black text-[var(--gold)] font-mono">{score}</span></div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10"><span className="text-[11px] text-white/60 block">الدقة المعرفية</span><span className="text-2xl md:text-3xl font-black text-emerald-400 font-mono">{accuracyPct}%</span></div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10"><span className="text-[11px] text-white/60 block">الإجابات الصحيحة</span><span className="text-2xl md:text-3xl font-black text-white font-mono">{correctCount}/{activeQuestions.length}</span></div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10"><span className="text-[11px] text-white/60 block">أطول تتابع · متوسط الوقت</span><span className="text-xl md:text-2xl font-black text-amber-300 font-mono">x{maxStreak} · {avgTimeSeconds}ث</span></div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button type="button" onClick={handleShareCertificate} className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#f5b900] to-[#dca600] text-[#140106] font-black text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center gap-2 cursor-pointer">
                  {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}<span>{copied ? "تم نسخ تفاصيل الوسام!" : "مشاركة شهادة الإنجاز"}</span>
                </button>
                <button type="button" onClick={handleStartGame} className="px-6 py-3 rounded-2xl border border-[var(--gold)]/40 bg-[#590018]/60 hover:bg-[#590018] text-white text-xs font-black transition-all flex items-center gap-2 cursor-pointer">
                  <RotateCcw className="w-4 h-4 text-[var(--gold)]" /><span>إعادة خوض المسار</span>
                </button>
                <button type="button" onClick={handleReturnLobby} className="px-6 py-3 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white/85 text-xs font-bold transition-all cursor-pointer">تغيير الفئة</button>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <section className="lg:col-span-7 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-[var(--gold)]" /><h3 className="text-base font-black text-white">تحليل الأداء حسب التصنيف</h3></div>
                  <span className="text-xs text-[var(--text-muted)]">صحيح مقابل خاطئ</span>
                </div>
                <div className="space-y-3.5">
                  {categoryBreakdown.map((item) => (
                    <div key={item.category} className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg)]/80 space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs md:text-sm font-black text-white">{item.category}</span>
                        <div className="flex items-center gap-3 text-xs font-bold">
                          <span className="text-emerald-400 inline-flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /><span>{item.correct} صحيح</span></span>
                          <span className="text-rose-400 inline-flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /><span>{item.wrong} خطأ</span></span>
                          <span className="text-[var(--gold)] font-mono">{item.accuracy}%</span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-l from-[#f5b900] to-emerald-400 transition-all duration-500" style={{ width: `${item.accuracy}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="lg:col-span-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Crown className="w-4 h-4 text-[var(--gold)]" /><h3 className="text-base font-black text-white">الأوسمة والشارات</h3></div>
                  <span className="text-xs font-bold text-[var(--gold)]">{unlockedBadges.length}/{achievements.length} مفتوح</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {achievements.map((badge) => (
                    <div key={badge.id} className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${badge.unlocked ? "border-[var(--gold)]/60 bg-gradient-to-l from-[#590018]/65 to-[var(--bg)] shadow-md" : "border-[var(--border)] bg-[var(--bg)]/50 opacity-55"}`}>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${badge.unlocked ? "bg-[var(--gold)] text-[#140106]" : "bg-white/10 text-[var(--text-muted)]"}`}><Medal className="w-4 h-4" /></div>
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-black text-white">{badge.title}</p>
                          {badge.unlocked && <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black">مُكتسب</span>}
                        </div>
                        <p className="text-[11px] text-[var(--gold)] font-bold">{badge.subtitle}</p>
                        <p className="text-[11px] text-[var(--text-muted)]">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}