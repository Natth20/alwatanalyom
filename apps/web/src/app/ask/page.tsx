"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShieldCheck,
  RotateCcw,
  Copy,
  Check,
  HelpCircle,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

interface SourceItem {
  title: string;
  url: string;
  date: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: SourceItem[];
  suggestedTopics?: string[];
  disclaimer?: string;
  timestamp: string;
}

const PRESET_QUERIES = [
  "ما هي حقيقة مزاعم فتح المعابر وما حكم مرصد الحقيقة عليها؟",
  "ما هي القرارات والتدابير الصادرة عن محكمة العدل الدولية بخصوص فلسطين؟",
  "كيف يجري التحقق من الصور والمقاطع المولدة بالذكاء الاصطناعي؟",
  "ما هو التسلسل التاريخي لأطول إضراب عام في فلسطين عام 1936؟",
];

export default function AskNewsroomPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "أهلاً بك في «اسأل الوطن» — المساعد الصحفي الذكي لمنصة الوطن اليوم.\n\nأنا مرتبط مباشرة بالأرشيف الإخباري المعتمد وتحقيقات مرصد رادار الحقيقة وبلاغات المصادر الرسمية. ألتزم بالإسناد الصريح لمصادر حقيقية، وإن لم أجد تغطية كافية في الأرشيف فلن أخترع إجابة.",
      timestamp: "الآن",
      disclaimer: "الإجابات تعتمد حصراً على المواد المنشورة والموثقة في سجلات المنصة.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

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

      const json = await res.json();

      if (res.ok && json.data) {
        const botMsg: Message = {
          role: "assistant",
          content: json.data.answer,
          sources: json.data.sources || [],
          suggestedTopics: json.data.suggestedTopics || [],
          disclaimer: json.data.disclaimer,
          timestamp: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const errorMsg: Message = {
          role: "assistant",
          content: json.error?.message || "لم نتمكن من معالجة السؤال حالياً. يرجى المحاولة لاحقاً.",
          timestamp: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    } catch {
      const fallbackMsg: Message = {
        role: "assistant",
        content: "تعذر الاتصال بقاعدة بيانات الأرشيف حالياً. تأكد من اتصال الإنترنت ثم أعد المحاولة.",
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
              <h1 className="text-xl font-black text-[var(--text)]">اسأل الوطن</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                أرشيف موثق وصفر اختلاق
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              محرك إجابات صحفي يعتمد على مواد وأرشيف المنصة المنشورة فقط ويشير لمصادره بدقة
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                role: "assistant",
                content: "تمت إعادة تعيين الجلسة. تفضل بطرح سؤالك في الشأن الميداني، التحقق، أو الملفات التوثيقية.",
                timestamp: "الآن",
                disclaimer: "الإجابات تعتمد حصراً على المواد المنشورة والموثقة في سجلات المنصة.",
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
          أسئلة استرشادية:
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
                    المصادر الأرشيفية المعتمدة في هذه الإجابة:
                  </span>
                  <div className="space-y-1">
                    {msg.sources.map((s, sIdx) => (
                      <Link
                        key={sIdx}
                        href={s.url}
                        prefetch={false}
                        className="text-xs flex items-center justify-between p-2 rounded-lg bg-[var(--surface)] hover:text-[var(--primary)] transition-colors border border-[var(--border)] group"
                      >
                        <span className="font-semibold truncate">{s.title}</span>
                        <span className="text-[10px] text-[var(--text-muted)] shrink-0 mr-2 flex items-center gap-1">
                          {s.date}
                          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Topics if no direct answer */}
              {msg.suggestedTopics && msg.suggestedTopics.length > 0 && (
                <div className="mt-3 pt-3 border-t border-[var(--border)]">
                  <span className="text-[11px] font-bold text-[var(--text-muted)] block mb-1.5">
                    موضوعات قد تهمك في أرشيف المنصة:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestedTopics.map((topic, tIdx) => (
                      <button
                        key={tIdx}
                        onClick={() => handleSend(`ما هي آخر تغطيات موضوع ${topic}؟`)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              {msg.disclaimer && (
                <div className="mt-2 pt-2 text-[10px] text-[var(--text-muted)] flex items-center gap-1 border-t border-[var(--border)]/40">
                  <AlertCircle className="w-3 h-3 text-amber-500 shrink-0" />
                  <span>{msg.disclaimer}</span>
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
              جاري فحص الأرشيف ومطابقة المصادر والتحقيقات المعتمدة لمنع أي اختلاق...
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
          placeholder="ابحث في الأرشيف الموثق (مثال: حقيقة مزاعم المعابر، قرارات محكمة العدل الدولية)..."
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
