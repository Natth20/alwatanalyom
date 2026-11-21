"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  User,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Building2,
  Fingerprint,
} from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const fillQuickDemo = (role: "admin" | "editor") => {
    if (role === "admin") {
      setEmail("admin@alwatantoday.net");
      setPassword("admin123");
      setTotpCode("123456");
    } else {
      setEmail("editor@alwatantoday.net");
      setPassword("admin123");
      setTotpCode("123456");
    }
    setErrorMsg("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/v1/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, totpCode }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "فشل تسجيل الدخول");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin");
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setErrorMsg(err.message || "حدث خطأ غير متوقع أثناء الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#120106] via-[#1f020c] to-[#0a0004] text-white relative overflow-hidden selection:bg-[var(--gold)]/30">
      {/* دوائر الأورورا والإضاءة الخلفية الملكية */}
      <div className="absolute -top-40 -start-40 w-96 h-96 bg-[var(--primary)]/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -end-40 w-96 h-96 bg-[var(--gold)]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* رابط العودة للموقع الرئيسي */}
        <div className="flex items-center justify-between text-xs text-white/60">
          <Link
            href="/"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            <span>العودة إلى منصة «الوطن اليوم»</span>
          </Link>
          <span className="flex items-center gap-1 text-[var(--gold)] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>النظام التحريري 2026</span>
          </span>
        </div>

        {/* بطاقة تسجيل الدخول الزجاجية الفاخرة */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-7 md:p-9 shadow-2xl space-y-6 relative overflow-hidden">
          {/* شريط الإطار الذهبي العلوي */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

          {/* الترويسة والشعار الرسمي المعتمد */}
          <div className="text-center space-y-3">
            <div className="inline-block p-1.5 rounded-2xl border border-[var(--gold)]/40 bg-black/60 shadow-xl mx-auto">
              <Image
                src="/brand/logo-banner.jpg"
                alt="شعار الوطن اليوم"
                width={200}
                height={60}
                priority
                className="h-12 w-auto object-contain rounded-xl"
              />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              بوابة غرفة الأخبار والإدارة
            </h1>
            <p className="text-xs text-white/60 leading-relaxed">
              تسجيل الدخول المشفر لهيئة التحرير وإدارة النظم الإعلامية
            </p>
          </div>

          {/* أزرار الملء السريع للاختبار المباشر */}
          <div className="p-3 rounded-2xl border border-white/10 bg-black/30 space-y-2">
            <div className="flex items-center justify-between text-[11px] text-white/70">
              <span className="font-bold text-[var(--gold)] flex items-center gap-1">
                <Fingerprint className="w-3.5 h-3.5" />
                <span>دخول سريع للاختبار والتجربة:</span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillQuickDemo("admin")}
                className="px-2.5 py-1.5 rounded-xl border border-[var(--gold)]/30 bg-[var(--gold)]/10 hover:bg-[var(--gold)]/20 text-[11px] font-bold text-[var(--gold)] transition-colors text-center cursor-pointer"
              >
                رئيس التحرير (Admin)
              </button>
              <button
                type="button"
                onClick={() => fillQuickDemo("editor")}
                className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-[11px] font-bold text-white transition-colors text-center cursor-pointer"
              >
                محرر الأخبار (Editor)
              </button>
            </div>
          </div>

          {/* نموذج تسجيل الدخول */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/90 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>البريد الإلكتروني المهني</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="editor@alwatantoday.net"
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-white/90 mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>كلمة المرور المشفرة</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-black/40 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--gold)] transition-colors pe-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 end-0 pe-3 flex items-center text-white/40 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* رمز المصادقة الثنائية 2FA */}
            <div className="p-3.5 rounded-2xl border border-amber-500/30 bg-amber-500/10 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>رمز التحقق الثنائي (TOTP 2FA)</span>
                </label>
                <span className="text-[10px] text-amber-300/70 font-mono">اختياري للتجربة: 123456</span>
              </div>
              <input
                type="text"
                maxLength={6}
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value)}
                placeholder="123456"
                className="w-full px-4 py-2 rounded-xl border border-amber-500/40 bg-black/50 text-center font-mono text-base tracking-widest text-amber-300 placeholder:text-amber-500/40 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl border border-rose-500/40 bg-rose-500/20 text-rose-300 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {success && (
              <div className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>تم التحقق بنجاح! جاري التوجيه إلى غرفة الأخبار...</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || success}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] font-black text-xs hover:brightness-110 active:scale-98 transition-all shadow-lg shadow-[var(--gold-glow)] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? "جاري التحقق من التشفير..." : "دخول غرفة التحكم التحريرية"}</span>
            </button>
          </form>

          {/* تنويه الأمان المؤسسي */}
          <div className="pt-2 text-center border-t border-white/5 space-y-1">
            <p className="text-[10px] text-white/50 leading-relaxed">
              🔒 اتصال محمي عبر بروتوكول TLS 1.3 مع تسجيل الجلسات في سجل التدقيق الجنائي.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
