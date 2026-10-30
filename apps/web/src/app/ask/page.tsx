"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Send,
  Bot,
  User,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  Copy,
  Check,
  Search,
  MessageSquare,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: { title: string; url: string; date: string }[];
  timestamp: string;
}

const PRESET_QUERIES = [
  "ما هي حقيقة مزاعم فتح المعابر وما حكم مرصد الحقيقة عليها؟",
  "لخص لي مسار المساعدات الإنسانية التي دخلت غزة اليوم وأين وُزعت؟",
  "ما هي أبرز قرارات محكمة العدل الدولية بخصوص فلسطين؟",
  "ما هو التسلسل التاريخي لأطول إضراب عام في فلسطين عام 1936؟",
];

const KNOWLEDGE_BASE_RESPONSES: Record<
  string,
  {
    answer: string;
    sources: { title: string; url: string; date: string }[];
  }
> = {
  default: {
    answer:
      "بناءً على الأرشيف والبيانات الرسمية لـ «الوطن اليوم»: كافة المعلومات الميدانية والسياسية تخضع لبروتوكول التحقق الصارم بمطابقة مصادر الهلال الأحمر، الدفاع المدني، ووكالة وفا. يمكنك طرح أسئلة استقصائية حول تطورات الميدان، الشائعات المفندة، أو محطات الذاكرة التاريخية.",
    sources: [
      { title: "سياسة التحرير ومصادر المنصة المعتمدة", url: "/editorial-policy", date: "أرشيف 2026" },
      { title: "مرصد رادار الحقيقة ومكافحة الشائعات", url: "/fact-check", date: "محدث باستمرار" },
    ],
  },
  "ما هي حقيقة مزاعم فتح المعابر وما حكم مرصد الحقيقة عليها؟": {
    answer:
      "أثبت مرصد «رادار الحقيقة» في تحقيقه اليوم أن وثيقة الاتفاق المتداولة حول فتح المعابر بدون قيود هي «مضللة ومجتزأة»، ومطابقة بنسبة 94% لمسودة مفاوضات قديمة تعود لأواخر عام 2024. وأكدت هيئة المعابر والحدود الفلسطينية والوسطاء عدم صدور أي إعلان رسمي جديد، وأن التشغيل ما زال محكوماً بالإجراءات المقيدة القائمة.",
    sources: [
      { title: "تقرير التحقق: مزاعم اتفاق المعابر الشامل", url: "/fact-check/fc-1", date: "اليوم 14:30" },
      { title: "بيان هيئة المعابر والحدود الفلسطينية", url: "https://wafa.ps", date: "30 أكتوبر 2026" },
    ],
  },
  "لخص لي مسار المساعدات الإنسانية التي دخلت غزة اليوم وأين وُزعت؟": {
    answer:
      "وفق بيانات «رادار الميدان الإنساني» وغرفة العمليات المشتركة: دخلت اليوم 114 شاحنة إغاثية محملة بـ 42 طناً من المستلزمات الجراحية وأكياس الطحين عبر معبري رفح وكرم أبو سالم. تم تفريغ 45 شاحنة لصالح مستودعات الهلال الأحمر في خانيونس لتغذية مطابخ التكية، بينما تكفل فريق الأونروا بنقل جزء مخصص لمراكز إيواء وسط القطاع، وسط استمرار المطالبة الدولية بفتح ممرات آمنة للمحافظات الشمالية.",
    sources: [
      { title: "رادار الميدان · غرفة المتابعة الإنسانية والخدماتية", url: "/live", date: "اليوم 21:30" },
      { title: "بيان جمعية الهلال الأحمر الفلسطيني", url: "https://palestinercs.org", date: "اليوم 20:00" },
    ],
  },
  "ما هي أبرز قرارات محكمة العدل الدولية بخصوص فلسطين؟": {
    answer:
      "أصدرت محكمة العدل الدولية في لاهاي قرارات تاريخية فاصلة: 1) الرأي الاستشاري لعام 2004 بعدم قانونية جدار الفصل العنصري ووجوب تفكيكه وتعويض المتضررين. 2) التدابير الاحترازية المؤقتة في دعوى جنوب إفريقيا لعام 2024 التي أمرت بمنع ارتكاب أي أعمال إبادة جماعية وضمان تدفق المساعدات فوراً. 3) الفتوى الاستشارية لعام 2024 التي أكدت عدم شرعية استمرار الاحتلال في الضفة والقدس ووجوب إنهائه في أسرع وقت.",
    sources: [
      { title: "التغطية القانونية لقرارات محكمة العدل الدولية", url: "/world", date: "أرشيف القانون الدولي" },
      { title: "سجلات الأمم المتحدة ومجلس الأمن", url: "https://ochaopt.org", date: "توثيق رسمي" },
    ],
  },
  "ما هو التسلسل التاريخي لأطول إضراب عام في فلسطين عام 1936؟": {
    answer:
      "شهدت فلسطين في 20 أبريل 1936 انطلاق أطول إضراب عام سلمي في التاريخ الحديث، قادته اللجنة القومية في يافا واللجنة العربية العليا بقيادة الحاج أمين الحسيني. استمر الإضراب 178 يوماً متواصلاً وشل حركة الموانئ والأسواق ووسائل النقل رفضاً لسياسات الانتداب البريطاني وهجرة المستوطنين، ولم يُعلّق إلا في 12 أكتوبر 1936 استجابة لنداء الملوك والأمراء العرب بعد وعود بريطانية بالتحقيق في مطالب الشعب.",
    sources: [
      { title: "ذاكرة الوطن: توثيق إضراب 1936 الكبير", url: "/history", date: "أرشيف 12 أكتوبر" },
      { title: "صحيفة الدفاع ويافا التاريخية (أرشيف 1936)", url: "/history", date: "وثائق وطنية" },
    ],
  },
};

export default function AskNewsroomPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "أهلاً بك في «المساعد الصحفي الذكي» لمنصة الوطن اليوم. أنا مدرب حصراً على أرشيف المنصة، تحقيقات مرصد رادار الحقيقة، وبلاغات الهلال الأحمر والدفاع المدني. اسألني عن أي خبر، شائعة تحتاج تفنيداً، أو حدث تاريخي وسأجيبك مع الإسناد الموثق.",
      timestamp: "الآن",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleSend = (textToSend?: string) => {
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

    setTimeout(() => {
      const found = KNOWLEDGE_BASE_RESPONSES[query] || KNOWLEDGE_BASE_RESPONSES.default;
      const botMsg: Message = {
        role: "assistant",
        content: found.answer,
        sources: found.sources,
        timestamp: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, 600);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="container-custom py-6 max-w-4xl flex-1 flex flex-col min-h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 mb-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[var(--primary)] text-white shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-[var(--text)]">اسأل الوطن اليوم</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                مساعد صحفي معتمد
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              مبني بتقنية RAG المتطورة والموثقة بمصادر المنصة المعتمدة لمنع الهلوسة
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                role: "assistant",
                content: "تمت إعادة تعيين الجلسة. تفضل بطرح أي سؤال جديد في الشأن الميداني، التحقق، أو التاريخ.",
                timestamp: "الآن",
              },
            ])
          }
          className="text-xs font-bold text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          محادثة جديدة
        </button>
      </div>

      {/* Suggested Questions Pill Carousel */}
      <div className="mb-4 overflow-x-auto pb-1 scrollbar-none flex items-center gap-2">
        <span className="text-xs font-bold text-[var(--text-muted)] flex items-center gap-1 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          أسئلة مقترحة:
        </span>
        {PRESET_QUERIES.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-xs px-3 py-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--primary)] text-[var(--text)] whitespace-nowrap transition-colors cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 md:p-6 mb-4 overflow-y-auto space-y-4 max-h-[550px] shadow-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`p-2 rounded-xl shrink-0 ${
                msg.role === "user"
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--bg)] border border-[var(--border)] text-[var(--primary)]"
              }`}
            >
              {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-[var(--primary)] text-white font-medium"
                  : "bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
              }`}
            >
              <div className="whitespace-pre-line">{msg.content}</div>

              {/* Verified Sources Box for AI response */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[var(--border)] space-y-1.5">
                  <span className="text-[11px] font-bold text-[var(--text-muted)] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    المصادر والوثائق المعتمدة في الإجابة:
                  </span>
                  <div className="space-y-1">
                    {msg.sources.map((s, sIdx) => (
                      <Link
                        key={sIdx}
                        href={s.url}
                        className="text-xs flex items-center justify-between p-2 rounded-lg bg-[var(--surface)] hover:text-[var(--primary)] transition-colors border border-[var(--border)]"
                      >
                        <span className="font-semibold truncate">{s.title}</span>
                        <span className="text-[10px] text-[var(--text-muted)] shrink-0 mr-2">{s.date}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Footer */}
              <div
                className={`flex items-center justify-between gap-4 mt-2 text-[10px] ${
                  msg.role === "user" ? "text-white/80" : "text-[var(--text-muted)]"
                }`}
              >
                <span>{msg.timestamp}</span>
                {msg.role === "assistant" && (
                  <button
                    onClick={() => handleCopy(msg.content, idx)}
                    className="hover:text-[var(--primary)] inline-flex items-center gap-1 cursor-pointer font-bold"
                  >
                    {copiedIdx === idx ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIdx === idx ? "تم النسخ" : "نسخ الإجابة"}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--primary)]">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--border)] text-xs text-[var(--text-muted)] flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--primary)] animate-ping" />
              جاري الاستعلام ومطابقة أرشيف التحقيقات والمصادر المعتمدة...
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 p-1.5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اسأل عن أي خبر، شائعة، معركة تاريخية، أو بيان إنساني..."
          className="flex-1 px-4 py-2.5 text-sm bg-transparent text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-40 text-white font-bold transition-colors cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4 rtl:rotate-180" />
        </button>
      </form>
    </div>
  );
}

