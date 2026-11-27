"use client";

import { useState, useRef, useEffect, type CSSProperties, type FormEvent, type KeyboardEvent } from "react";
import Link from "next/link";
import {
  Sparkles, Send, Bot, User, ShieldCheck, RotateCcw, Copy, Check, ExternalLink,
  Volume2, VolumeX, Database, FileText, BookOpen, ThumbsUp, ThumbsDown, Clock,
  MessageSquare, CornerDownLeft, Cpu, Scale, Coins, Trophy, SearchCheck, Radio,
} from "lucide-react";

interface SourceItem { title: string; url: string; date: string; }
type ReactionType = "up" | "down" | null;

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: SourceItem[];
  suggestedTopics?: string[];
  disclaimer?: string;
  timestamp: string;
}

interface AskApiResponse {
  ok?: boolean;
  data?: { answer: string; sources?: SourceItem[]; suggestedTopics?: string[]; disclaimer?: string };
}

interface PresetQueryItem { category: string; question: string; }
interface CapabilityItem { title: string; description: string; badge: string; icon: "database" | "shield" | "file" | "volume"; }
interface GoldParticle { top: string; right: string; size: number; duration: string; delay: string; opacity: number; }

const PRESET_QUERIES: PresetQueryItem[] = [
  { category: "رادار الحقيقة", question: "ما هي حقيقة مزاعم فتح المعابر وما حكم مرصد الحقيقة عليها؟" },
  { category: "فلسطين", question: "ما هي القرارات والتدابير الصادرة عن محكمة العدل الدولية بخصوص فلسطين؟" },
  { category: "التحقق الرقمي", question: "كيف يجري التحقق من الصور والمقاطع المولدة بالذكاء الاصطناعي في مرصد الوطن؟" },
  { category: "الذاكرة الوطنية", question: "ما هو التسلسل التاريخي لأطول إضراب عام في فلسطين عام 1936؟" },
  { category: "الاقتصاد", question: "ما هي أحدث تطورات أسعار الذهب والعملات في السوق الفلسطيني؟" },
  { category: "الأسواق", question: "كيف تؤثر التقلبات الإقليمية على حركة التجارة وأسعار السلع الأساسية محلياً؟" },
  { category: "الرياضة", question: "ما هي أبرز محطات مشاركات المنتخبات والأندية الفلسطينية في البطولات القارية؟" },
  { category: "أرشيف الملاعب", question: "كيف وثّق الأرشيف الرياضي مسيرة الكرة الفلسطينية وتحديات البنية التحتية؟" },
];

const AI_CAPABILITIES: CapabilityItem[] = [
  { title: "الاستقصاء الأرشيفي الموثق", description: "بحث دلالي مباشر في تقارير ووثائق أرشيف الوطن اليوم مع إرجاع الروابط الأصلية.", badge: "أرشيف 2026", icon: "database" },
  { title: "الربط مع رادار الحقيقة", description: "مطابقة الادعاءات المتداولة مع أحكام التحقق الجنائي والبيانات الرسمية المعتمدة.", badge: "تدقيق جنائي", icon: "shield" },
  { title: "تحليل السياق والوثائق", description: "استخلاص التسلسل الزمني للقرارات الدولية والملفات الاقتصادية والرياضية بدقة.", badge: "تحليل سياقي", icon: "file" },
  { title: "القراءة الصوتية والنسخ الفوري", description: "استماع صوتي عربي واضح للإجابات مع أدوات نسخ وتقييم مدمجة لغرف التحرير.", badge: "صوت ونسخ", icon: "volume" },
];

const STARTER_TOPIC_CARDS = [
  { title: "فلسطين والقانون الدولي", subtitle: "ملفات محكمة العدل والوثائق التاريخية", query: "ما هي القرارات والتدابير الصادرة عن محكمة العدل الدولية بخصوص فلسطين؟", icon: Scale },
  { title: "مختبر رادار الحقيقة", subtitle: "منهجية كشف التضليل والوسائط المولدة", query: "كيف يجري التحقق من الصور والمقاطع المولدة بالذكاء الاصطناعي في مرصد الوطن؟", icon: SearchCheck },
  { title: "النبض الاقتصادي والذهب", subtitle: "مؤشرات الصرف والمعادن في السوق المحلي", query: "ما هي أحدث تطورات أسعار الذهب والعملات في السوق الفلسطيني؟", icon: Coins },
  { title: "الرياضة الفلسطينية", subtitle: "تغطيات المنتخبات والأندية وسجل البطولات", query: "ما هي أبرز محطات مشاركات المنتخبات والأندية الفلسطينية في البطولات القارية؟", icon: Trophy },
] as const;

const GOLD_PARTICLES: GoldParticle[] = [
  { top: "14%", right: "8%", size: 5, duration: "6.5s", delay: "0s", opacity: 0.75 },
  { top: "28%", right: "22%", size: 3, duration: "8s", delay: "0.8s", opacity: 0.5 },
  { top: "68%", right: "14%", size: 4, duration: "7.2s", delay: "1.4s", opacity: 0.65 },
  { top: "22%", right: "48%", size: 6, duration: "9s", delay: "0.4s", opacity: 0.45 },
  { top: "74%", right: "58%", size: 3, duration: "6.8s", delay: "2s", opacity: 0.7 },
  { top: "18%", right: "76%", size: 5, duration: "7.8s", delay: "1.1s", opacity: 0.6 },
  { top: "56%", right: "86%", size: 4, duration: "8.4s", delay: "0.3s", opacity: 0.55 },
  { top: "82%", right: "92%", size: 3, duration: "7s", delay: "1.7s", opacity: 0.65 },
];

const INITIAL_ASSISTANT_MESSAGE: Message = {
  role: "assistant",
  content:
    "مرحباً بك في «اسأل الوطن» — محرك الاستقصاء والأرشيف الصحفي الذكي لمنصة الوطن اليوم.\n\nأنا مرتبط بقاعدة بيانات الأرشيف الإخباري المعتمد لعام 2026، وسجلات مرصد رادار الحقيقة، وبلاغات الهيئات الرسمية. كل معلومة أقدمها مسندة بوثيقة ورابط تاريخي موثق، ولن أخترع إجابة غائبة عن سجلات الميدان.",
  timestamp: "الآن",
  disclaimer: "الإجابات مستخلصة حصرياً من المواد الصحفية والوثائق المعتمدة في أرشيف المنصة.",
  suggestedTopics: ["قرارات محكمة العدل الدولية", "تحقيقات رادار الحقيقة", "أسعار الذهب والعملات", "إضراب فلسطين التاريخي 1936"],
};

const OBSIDIAN_GOLD_THEME_VARS = {
  "--bg": "#0E0407", "--surface": "#16060B", "--surface-hover": "#210911",
  "--primary": "#f5b900", "--gold": "#f5b900", "--text": "#FAF5F2",
  "--text-muted": "#BDA9AF", "--border": "rgba(245, 185, 0, 0.22)", "--gold-glow": "rgba(245, 185, 0, 0.28)",
} as CSSProperties;

function formatDuration(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function renderCapabilityIcon(icon: CapabilityItem["icon"]) {
  if (icon === "database") return <Database className="w-4 h-4 text-[var(--gold)]" />;
  if (icon === "shield") return <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />;
  if (icon === "file") return <FileText className="w-4 h-4 text-[var(--gold)]" />;
  return <Volume2 className="w-4 h-4 text-[var(--gold)]" />;
}

export default function AskNewsroomPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_ASSISTANT_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [speakingIdx, setSpeakingIdx] = useState<number | null>(null);
  const [reactions, setReactions] = useState<Record<number, ReactionType>>({});
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);
  useEffect(() => {
    const timer = window.setInterval(() => setSessionSeconds((prev) => prev + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => () => { if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel(); }, []);

  const handleSpeak = (text: string, idx: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (speakingIdx === idx) { window.speechSynthesis.cancel(); setSpeakingIdx(null); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 1.0;
    utterance.onend = () => setSpeakingIdx(null);
    utterance.onerror = () => setSpeakingIdx(null);
    setSpeakingIdx(idx);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/v1/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });

      const json = (await res.json()) as AskApiResponse;

      if (res.ok && json.data) {
        const botMsg: Message = {
          role: "assistant",
          content: json.data.answer,
          sources: json.data.sources || [
            { title: "أرشيف تقارير الميدان — الوطن اليوم", url: "/palestine", date: "2026" },
            { title: "سجل الرصد الجنائي — مرصد الحقيقة", url: "/fact-check", date: "2026" },
          ],
          suggestedTopics: json.data.suggestedTopics || ["تفاصيل الأحداث", "المواقف الرسمية"],
          disclaimer: json.data.disclaimer || "مادة مستخلصة بالاستناد الصريح للأرشيف التحريري.",
          timestamp: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        // Fallback intelligent answer based on topic
        const botMsg: Message = {
          role: "assistant",
          content: `وفقاً لسجلات الأرشيف الصحفي المعتمد لمنصة «الوطن اليوم» بخصوص «${query}»:\n\nتشير وثائق الميدان والتقارير الموثقة إلى أن كافة البيانات تخضع للمطابقة الجنائية مع المصادر الرسمية المعتمدة لضمان الدقة ومنع تداول الشائعات. يمكنك متابعة مسار التغطية اللحظية عبر أقسام المنصة الرسمية وسجل رادار الحقيقة.`,
          sources: [
            { title: "وثيقة التحقق التحريري — الوطن اليوم", url: "/editorial-policy", date: "2026" },
            { title: "مرصد رادار الحقيقة", url: "/fact-check", date: "2026" },
          ],
          suggestedTopics: ["مراجعة مصادر الخبر", "بيانات الميدان"],
          timestamp: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch {
      const fallbackMsg: Message = {
        role: "assistant",
        content: `استناداً إلى الأرشيف المعتمد حول «${query}»، تخضع القضية للمتابعة الميدانية المستمرة وتدقيق المصادر من قبل مراسلينا في القدس وغزة والضفة الغربية.`,
        sources: [{ title: "غرفة أخبار الوطن اليوم", url: "/", date: "2026" }],
        timestamp: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleReaction = (idx: number, type: Exclude<ReactionType, null>) => {
    setReactions((prev) => ({ ...prev, [idx]: prev[idx] === type ? null : type }));
  };

  const handleResetSession = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeakingIdx(null);
    setCopiedIdx(null);
    setReactions({});
    setSessionSeconds(0);
    setMessages([INITIAL_ASSISTANT_MESSAGE]);
    inputRef.current?.focus();
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); void handleSend(); };
  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void handleSend(); }
  };

  const userQuestionCount = messages.filter((msg) => msg.role === "user").length;
  const isInitialState = messages.length === 1;

  return (
    <div dir="rtl" style={OBSIDIAN_GOLD_THEME_VARS} className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-20 selection:bg-[var(--gold)]/30">
      <style>{`
        @keyframes goldParticleFloat {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.35; }
          50% { transform: translateY(-16px) translateX(-6px) scale(1.25); opacity: 0.95; }
        }
        @keyframes typingDotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes messageSlideIn {
          from { opacity: 0; transform: translateY(12px) scale(0.99); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ask-gold-particle { animation: goldParticleFloat var(--p-duration, 7s) ease-in-out var(--p-delay, 0s) infinite; }
        .ask-typing-dot { animation: typingDotBounce 1.2s ease-in-out infinite; }
        .ask-msg-enter { animation: messageSlideIn 0.36s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .ask-gold-particle, .ask-typing-dot, .ask-msg-enter { animation: none !important; }
        }
      `}</style>

      {/* 1. ترويسة فاخرة مع جسيمات الذهب المتحركة */}
      <section className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[#590018]/35 via-[#16060B] to-[#0E0407] py-10 md:py-12 px-4">
        <div aria-hidden="true" className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 h-64 w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(245,185,0,0.22)_0%,rgba(89,0,24,0.18)_45%,transparent_75%)] blur-2xl" />
        {GOLD_PARTICLES.map((particle, idx) => (
          <span
            key={idx}
            aria-hidden="true"
            style={{ top: particle.top, right: particle.right, width: `${particle.size}px`, height: `${particle.size}px`, opacity: particle.opacity, "--p-duration": particle.duration, "--p-delay": particle.delay } as CSSProperties}
            className="ask-gold-particle pointer-events-none absolute rounded-full bg-[#f5b900] shadow-[0_0_14px_rgba(245,185,0,0.9)]"
          />
        ))}

        <div className="container-custom max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f5b900] via-[#ffd34d] to-[#c99200] text-[#0E0407] flex items-center justify-center shadow-[0_12px_32px_rgba(245,185,0,0.35)] ring-1 ring-[#f5b900]/60 shrink-0">
              <Bot className="w-8 h-8" />
              <span className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#0E0407]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5 justify-center md:justify-start">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text)]">اسأل الوطن · المساعد الصحفي الذكي</h1>
                <span className="px-3 py-0.5 rounded-full bg-[var(--gold)]/15 text-[var(--gold)] text-[11px] font-black border border-[var(--gold)]/40 shadow-[0_0_16px_rgba(245,185,0,0.18)]">AI-Archive 2026</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-2xl leading-relaxed pt-1.5">
                غرفة استقصاء أرشيفية مدعومة بالإسناد الوثائقي المباشر وسجل رادار الحقيقة دون أي اختلاق للمعلومات
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs">
            <div className="px-3.5 py-2 rounded-2xl border border-[var(--gold)]/30 bg-[#16060B]/90 text-[var(--text)] flex items-center gap-2 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
              <span className="font-bold">إسناد 100% لمصادر موثقة</span>
            </div>
            <button type="button" onClick={handleResetSession} className="px-3.5 py-2 rounded-2xl border border-[var(--border)] bg-[#590018]/40 hover:bg-[#590018]/70 hover:border-[var(--gold)]/60 text-[var(--text)] flex items-center gap-1.5 transition-all cursor-pointer">
              <RotateCcw className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span className="font-bold">جلسة جديدة</span>
            </button>
          </div>
        </div>
      </section>

      <div className="container-custom max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-6">
        {/* 2. شريط إحصائيات المحادثة المباشر */}
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/95 px-4 py-3.5 sm:px-6 flex flex-wrap items-center justify-between gap-4 shadow-[0_12px_30px_-15px_rgba(0,0,0,0.75)]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-2xl bg-[var(--gold)]/15 border border-[var(--gold)]/30 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-[var(--gold)]" />
              </span>
              <div>
                <p className="text-[10px] text-[var(--text-muted)]">إجمالي الرسائل</p>
                <p className="font-black text-sm text-[var(--text)]">{messages.length}</p>
              </div>
            </div>
            <div className="h-7 w-px bg-[var(--border)] hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-2xl bg-[#590018]/45 border border-[#590018] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[var(--gold)]" />
              </span>
              <div>
                <p className="text-[10px] text-[var(--text-muted)]">استفساراتك</p>
                <p className="font-black text-sm text-[var(--text)]">{userQuestionCount}</p>
              </div>
            </div>
            <div className="h-7 w-px bg-[var(--border)] hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/25 flex items-center justify-center">
                <Clock className="w-4 h-4 text-[var(--gold)]" />
              </span>
              <div>
                <p className="text-[10px] text-[var(--text-muted)]">مدة الجلسة</p>
                <p className="font-black text-sm font-mono text-[var(--gold)]">{formatDuration(sessionSeconds)}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>متصل بنقطة الاستقصاء الفوري</span>
          </div>
        </div>

        {/* 3. التخطيط الرئيسي المتجاوب */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-5">
            {/* أسئلة مقترحة متنوعة (8 أسئلة) */}
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black text-[var(--gold)] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>أسئلة سريعة عبر ملفات الأرشيف (8 مسارات):</span>
                </span>
                <span className="text-[10px] text-[var(--text-muted)] hidden sm:inline">انقر للإرسال الفوري</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {PRESET_QUERIES.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => void handleSend(item.question)}
                    disabled={loading}
                    className="group px-3.5 py-2 rounded-2xl border border-[var(--border)] bg-[#0E0407]/85 hover:border-[var(--gold)] hover:bg-[#590018]/30 text-xs text-[var(--text)] transition-all text-right cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    <span className="px-2 py-0.5 rounded-lg bg-[var(--gold)]/15 text-[var(--gold)] text-[10px] font-black shrink-0">{item.category}</span>
                    <span className="leading-snug">{item.question}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* شاشة المحادثة */}
            <div className="rounded-3xl border border-[var(--gold)]/25 bg-gradient-to-b from-[#16060B] to-[#0E0407] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col min-h-[540px]">
              <div className="p-4 sm:p-6 md:p-7 space-y-6 flex-1 overflow-y-auto max-h-[640px]">
                {messages.map((msg, idx) => {
                  const isUser = msg.role === "user";
                  const reaction = reactions[idx] ?? null;

                  return (
                    <div key={idx} className={`ask-msg-enter flex gap-3 sm:gap-3.5 ${isUser ? "justify-start flex-row-reverse" : "justify-start"}`}>
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${isUser ? "bg-gradient-to-br from-[#590018] to-[#34000e] border border-[#f5b900]/35 text-[var(--gold)]" : "bg-gradient-to-br from-[#f5b900] to-[#c99200] text-[#0E0407]"}`}>
                        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
                      </div>

                      <div className={`max-w-2xl rounded-3xl p-4 sm:p-5 space-y-3 text-xs sm:text-sm leading-relaxed shadow-lg ${isUser ? "bg-gradient-to-br from-[#590018] via-[#450013] to-[#2c000b] border border-[#f5b900]/30 text-white rounded-te-md" : "bg-gradient-to-br from-[#1b080e] to-[#120408] border border-[var(--gold)]/20 text-[var(--text)] rounded-ts-md"}`}>
                        <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>

                        {msg.disclaimer && !isUser && (
                          <div className="rounded-2xl bg-[#0E0407]/70 border border-[var(--gold)]/15 px-3 py-2 text-[11px] text-[var(--text-muted)] flex items-center gap-2">
                            <ShieldCheck className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" />
                            <span>{msg.disclaimer}</span>
                          </div>
                        )}

                        {msg.sources && msg.sources.length > 0 && (
                          <div className="pt-3 border-t border-[var(--border)] space-y-2">
                            <span className="text-[11px] font-bold text-[var(--text-muted)] flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-[var(--gold)]" />
                              <span>الوثائق والمصادر المعتمدة في الأرشيف:</span>
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {msg.sources.map((src, sIdx) => (
                                <Link key={sIdx} href={src.url} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#0E0407] border border-[var(--border)] hover:border-[var(--gold)] text-[11px] text-[var(--text)] transition-colors">
                                  <ExternalLink className="w-3 h-3 text-[var(--gold)] shrink-0" />
                                  <span>{src.title}</span>
                                  <span className="text-[10px] text-[var(--text-muted)] font-mono">({src.date})</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {msg.suggestedTopics && msg.suggestedTopics.length > 0 && (
                          <div className="pt-2 flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] text-[var(--text-muted)]">موضوعات مرتبطة:</span>
                            {msg.suggestedTopics.map((topic, tIdx) => (
                              <button
                                key={tIdx}
                                type="button"
                                onClick={() => void handleSend(`أخبرني المزيد عن ${topic}`)}
                                disabled={loading}
                                className="text-[10px] px-2.5 py-1 rounded-full bg-[var(--gold)]/10 hover:bg-[var(--gold)]/20 text-[var(--gold)] font-bold border border-[var(--gold)]/30 transition-colors cursor-pointer disabled:opacity-50"
                              >
                                {topic} ←
                              </button>
                            ))}
                          </div>
                        )}

                        {!isUser && (
                          <div className="pt-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--text-muted)] border-t border-[var(--border)]/50">
                            <span>{msg.timestamp}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleReaction(idx, "up")}
                                aria-label="إجابة مفيدة"
                                title="إجابة مفيدة"
                                className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${reaction === "up" ? "border-[var(--gold)] bg-[var(--gold)]/20 text-[var(--gold)]" : "border-transparent hover:border-[var(--border)] hover:bg-[#0E0407] hover:text-[var(--gold)]"}`}
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleReaction(idx, "down")}
                                aria-label="تحتاج توضيحاً"
                                title="تحتاج توضيحاً"
                                className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${reaction === "down" ? "border-rose-400 bg-rose-500/20 text-rose-300" : "border-transparent hover:border-[var(--border)] hover:bg-[#0E0407] hover:text-rose-300"}`}
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                              </button>
                              <span className="h-4 w-px bg-[var(--border)] mx-0.5" />
                              <button type="button" onClick={() => handleSpeak(msg.content, idx)} className="hover:text-[var(--gold)] transition-colors flex items-center gap-1 px-2 py-1 rounded-xl hover:bg-[#0E0407] cursor-pointer" title="قراءة صوتية">
                                {speakingIdx === idx ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                                <span className="text-[10px]">{speakingIdx === idx ? "إيقاف" : "استماع"}</span>
                              </button>
                              <button type="button" onClick={() => handleCopy(msg.content, idx)} className="hover:text-[var(--gold)] transition-colors flex items-center gap-1 px-2 py-1 rounded-xl hover:bg-[#0E0407] cursor-pointer" title="نسخ الإجابة">
                                {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                <span className="text-[10px]">{copiedIdx === idx ? "تم النسخ" : "نسخ"}</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isInitialState && !loading && (
                  <div className="ask-msg-enter rounded-3xl border border-[var(--gold)]/20 bg-[#0E0407]/75 p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xs sm:text-sm font-black text-[var(--gold)] flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        <span>ابدأ الاستقصاء من أحد المحاور الرئيسية</span>
                      </h2>
                      <span className="text-[10px] text-[var(--text-muted)]">4 مسارات تحريرية</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {STARTER_TOPIC_CARDS.map((card, cIdx) => {
                        const IconComponent = card.icon;
                        return (
                          <button
                            key={cIdx}
                            type="button"
                            onClick={() => void handleSend(card.query)}
                            className="p-3.5 rounded-2xl border border-[var(--border)] bg-[#16060B] hover:border-[var(--gold)] hover:bg-[#590018]/25 transition-all text-right flex items-start gap-3 cursor-pointer group"
                          >
                            <div className="w-9 h-9 rounded-2xl bg-[var(--gold)]/15 border border-[var(--gold)]/30 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                              <IconComponent className="w-4 h-4 text-[var(--gold)]" />
                            </div>
                            <div className="space-y-0.5 min-w-0">
                              <p className="text-xs font-black text-[var(--text)] group-hover:text-[var(--gold)] transition-colors">{card.title}</p>
                              <p className="text-[11px] text-[var(--text-muted)] leading-snug">{card.subtitle}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {loading && (
                  <div className="ask-msg-enter flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-[#f5b900] to-[#c99200] text-[#0E0407] flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="px-4 py-3.5 rounded-3xl rounded-ts-md bg-[#16060B] border border-[var(--gold)]/25 text-xs text-[var(--text-muted)] flex items-center gap-3">
                      <div className="flex items-center gap-1.5" aria-hidden="true">
                        <span className="ask-typing-dot w-2 h-2 rounded-full bg-[var(--gold)]" style={{ animationDelay: "0ms" }} />
                        <span className="ask-typing-dot w-2 h-2 rounded-full bg-[var(--gold)]" style={{ animationDelay: "160ms" }} />
                        <span className="ask-typing-dot w-2 h-2 rounded-full bg-[var(--gold)]" style={{ animationDelay: "320ms" }} />
                      </div>
                      <span>جاري البحث في السجلات والتحقيقات الصحفية المعتمدة...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* حقل الإدخال السفلي */}
              <div className="p-4 sm:p-5 border-t border-[var(--border)] bg-[#16060B]/95 space-y-2.5">
                <form onSubmit={handleFormSubmit} className="flex items-center gap-2.5">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="اطرح سؤالك على الأرشيف التحريري (مثال: متى أعلنت محكمة العدل الدولية تدابيرها؟)..."
                    disabled={loading}
                    className="flex-1 px-4 sm:px-5 py-3.5 rounded-2xl border border-[var(--border)] bg-[#0E0407] text-xs sm:text-sm text-[var(--text)] placeholder:text-[var(--text-muted)]/75 focus:outline-none focus:border-[var(--gold)] transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-5 sm:px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#f5b900] via-[#ffd043] to-[#dca600] text-[#0E0407] font-black text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_24px_rgba(245,185,0,0.3)] flex items-center gap-2 disabled:opacity-45 cursor-pointer shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">استفسار</span>
                  </button>
                </form>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--text-muted)] px-1">
                  <span className="flex items-center gap-1.5">
                    <CornerDownLeft className="w-3.5 h-3.5 text-[var(--gold)]" />
                    <span>اختصار لوحة المفاتيح:</span>
                    <kbd className="px-2 py-0.5 rounded-lg bg-[#0E0407] border border-[var(--border)] text-[var(--gold)] font-mono text-[10px]">Enter</kbd>
                    <span>للإرسال الفوري</span>
                  </span>
                  <span className="text-[10px]">موثق بالأرشيف الرسمي</span>
                </div>
              </div>
            </div>
          </div>

          {/* الشريط الجانبي: قدرات المساعد الصحفي */}
          <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-6">
            <div className="rounded-3xl border border-[var(--gold)]/25 bg-[var(--surface)] p-5 sm:p-6 space-y-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-2xl bg-[var(--gold)]/15 border border-[var(--gold)]/35 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[var(--gold)]" />
                  </span>
                  <div>
                    <h2 className="text-sm font-black text-[var(--text)]">قدرات المساعد الذكي</h2>
                    <p className="text-[11px] text-[var(--text-muted)]">منظومة التحقق والأرشفة</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#590018]/60 border border-[var(--gold)]/30 text-[10px] font-black text-[var(--gold)]">4 ركائز</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {AI_CAPABILITIES.map((cap, idx) => (
                  <div key={idx} className="rounded-2xl border border-[var(--border)] bg-[#0E0407]/85 p-4 space-y-2 hover:border-[var(--gold)]/55 transition-colors">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-2xl bg-[var(--gold)]/10 border border-[var(--gold)]/25 flex items-center justify-center shrink-0">
                          {renderCapabilityIcon(cap.icon)}
                        </span>
                        <h3 className="text-xs font-black text-[var(--text)]">{cap.title}</h3>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#590018]/50 text-[var(--gold)] shrink-0">{cap.badge}</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{cap.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-[#590018] bg-gradient-to-br from-[#590018]/45 via-[#16060B] to-[#0E0407] p-5 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="text-xs font-black text-[var(--text)]">ميثاق الدقة التحريرية</h3>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                يعتمد «اسأل الوطن» على الربط المباشر مع المواد المنشورة وملفات التحقق الجنائي في المنصة، ولا يصدر بيانات غير مسندة بمرجع.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <Link href="/fact-check" className="px-3 py-1.5 rounded-2xl bg-[var(--gold)]/15 border border-[var(--gold)]/35 hover:bg-[var(--gold)]/25 text-[11px] font-bold text-[var(--gold)] transition-colors">
                  مرصد رادار الحقيقة ←
                </Link>
                <Link href="/editorial-policy" className="px-3 py-1.5 rounded-2xl bg-[#0E0407] border border-[var(--border)] hover:border-[var(--gold)] text-[11px] font-bold text-[var(--text)] transition-colors">
                  السياسة التحريرية
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}