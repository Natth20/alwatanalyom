"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldAlert,
  Flame,
  Radio,
  RefreshCw,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Activity,
  Layers,
  Sparkles,
  ExternalLink,
  Sliders,
  Send,
  Database,
  Globe2,
  Clock,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

interface AdminUser {
  name: string;
  email: string;
  role: string;
  department: string;
  lastLogin?: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // حالة شريط العواجل التفاعلي
  const [breakingText, setBreakingText] = useState("");
  const [breakingDuration, setBreakingDuration] = useState("30");
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);
  const [broadcasting, setBroadcasting] = useState(false);

  // حالة مفتاح الطوارئ
  const [killSwitchActive, setKillSwitchActive] = useState(false);
  const [revalidating, setRevalidating] = useState(false);
  const [revalidateMsg, setRevalidateMsg] = useState("");

  useEffect(() => {
    // التحقق من الجلسة
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/v1/admin/auth");
        const data = await res.json();
        if (!res.ok || !data.authenticated) {
          router.push("/admin/login");
          return;
        }
        setUser(data.user);
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const handleBroadcastBreaking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!breakingText) return;
    setBroadcasting(true);
    setTimeout(() => {
      setBroadcasting(false);
      setBroadcastSuccess(true);
      setBreakingText("");
      setTimeout(() => setBroadcastSuccess(false), 4000);
    }, 600);
  };

  const handleFlushCache = () => {
    setRevalidating(true);
    setTimeout(() => {
      setRevalidating(false);
      setRevalidateMsg("تم تحديث وتطهير الكاش اللحظي لجميع مسارات الموقع بنجاح!");
      setTimeout(() => setRevalidateMsg(""), 4000);
    }, 800);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0206] text-white">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-[var(--gold)] animate-spin mx-auto" />
          <p className="text-xs text-white/70 font-bold">جاري تحميل بيانات غرفة العمليات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#120106] via-[#1a020a] to-[#0a0004] text-white pb-20 selection:bg-[var(--gold)]/30">
      {/* 1. الترويسة العليا لغرفة العمليات */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-30 py-3.5 px-4 shadow-xl">
        <div className="container-custom max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--gold)] to-[#dca600] text-[#140106] font-black flex items-center justify-center text-lg shadow-md">
              وطن
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-white">غرفة العمليات التحريرية المركزية</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>النظام مباشر</span>
                </span>
              </div>
              <p className="text-[11px] text-white/50">لوحة القيادة الإدارية والتحكم اللحظي بالمحتوى</p>
            </div>
          </div>

          {/* الملف الشخصي للمحرر وزر تسجيل الخروج */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-left text-xs">
              <span className="font-bold text-white flex items-center gap-1 justify-end">
                <UserCheck className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>{user?.name}</span>
              </span>
              <span className="text-[10px] text-[var(--gold)] font-mono">{user?.department} ({user?.role})</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/15 text-xs font-bold text-white transition-colors flex items-center gap-1.5"
            >
              <span>مشاهدة الموقع</span>
              <ExternalLink className="w-3 h-3 text-[var(--gold)]" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/25 text-xs font-bold text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تسجيل الخروج</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* 2. شريط الأدوات العاجلة (Instant Control HUD) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* مفتاح الإيقاف الطارئ للتحرير (Kill Switch) */}
          <div className={`p-5 rounded-2xl border transition-all ${killSwitchActive ? 'border-rose-500 bg-rose-950/40' : 'border-white/10 bg-white/5'} space-y-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className={`w-5 h-5 ${killSwitchActive ? 'text-rose-400 animate-bounce' : 'text-amber-400'}`} />
                <h3 className="font-bold text-sm text-white">مفتاح الإيقاف الطارئ (Kill Switch)</h3>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${killSwitchActive ? 'bg-rose-500 text-white' : 'bg-white/10 text-white/60'}`}>
                {killSwitchActive ? 'مفعل (الموقع مقفل)' : 'معطل (طبيعي)'}
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              تحويل كافة المواد الواردة فوراً إلى قائمة المراجعة البشرية الإلزامية ومنع النشر التلقائي.
            </p>
            <button
              onClick={() => setKillSwitchActive(!killSwitchActive)}
              className={`w-full py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                killSwitchActive
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-900/50'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              {killSwitchActive ? 'إلغاء وضع الطوارئ والعودة للبث التلقائي' : 'تفعيل الإيقاف الطارئ التحريري'}
            </button>
          </div>

          {/* تطهير الكاش اللحظي (On-Demand Revalidate) */}
          <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className={`w-5 h-5 text-cyan-400 ${revalidating ? 'animate-spin' : ''}`} />
                <h3 className="font-bold text-sm text-white">تطهير وتحديث الكاش (Purge Cache)</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-cyan-500/20 text-cyan-300">
                فوري
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              إعادة بناء الصفحات الرئيسية والأقسام فوراً دون انتظار فترة انتهاء الـ ISR التلقائي.
            </p>
            <button
              onClick={handleFlushCache}
              disabled={revalidating}
              className="w-full py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              {revalidating ? 'جاري التطهير وإعادة التوليد...' : 'تطهير الكاش اللحظي (Instant Flush)'}
            </button>
            {revalidateMsg && (
              <span className="text-[11px] text-emerald-400 font-bold block pt-1 animate-fade-in">
                ✓ {revalidateMsg}
              </span>
            )}
          </div>

          {/* محرك سحب الخلاصات الميدانية (Instant Feeds Ingest) */}
          <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[var(--gold)]" />
                <h3 className="font-bold text-sm text-white">محرك الرصد والسحب الفوري</h3>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[var(--gold)]/20 text-[var(--gold)]">
                24 وكالة
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              تشغيل فوري لفاحص الخلاصات (RSS Prober) لجلب آخر المستجدات من وكالات وفا ورويترز وشهاب.
            </p>
            <button
              onClick={() => {
                alert("تم إرسال أمر السحب الفوري إلى محرك @awt/ingest بنجاح!");
              }}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[#dca600] text-[#140106] text-xs font-black hover:brightness-110 transition-all cursor-pointer shadow-md"
            >
              سحب الأخبار فورياً من كافة الوكالات
            </button>
          </div>
        </div>

        {/* 3. منصة بث شريط العواجل اللحظي (Live Breaking Broadcast Desk) */}
        <div className="rounded-3xl border border-red-500/30 bg-red-950/20 p-6 md:p-8 space-y-5 relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-red-500/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center animate-pulse shadow-md">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-white">منصة بث شريط العواجل اللحظي</h2>
                <p className="text-xs text-red-300/70">نشر خبر عاجل أحمر يظهر فوراً في قمة الموقع لجميع القراء</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-red-400 bg-red-500/10 border border-red-500/30 px-2.5 py-1 rounded-full">
              LIVE-TICKER
            </span>
          </div>

          <form onSubmit={handleBroadcastBreaking} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white mb-1.5">
                نص الخبر العاجل (الصيغة المعتمدة لغرفة التحرير) *
              </label>
              <textarea
                required
                rows={2}
                value={breakingText}
                onChange={(e) => setBreakingText(e.target.value)}
                placeholder="مثال: عاجل | مراسل الوطن اليوم: استهداف جديد في محيط مجمع الشفاء الطبي والاتصالات تشهد انقطاعاً جزئياً..."
                className="w-full px-4 py-3 rounded-2xl border border-red-500/30 bg-black/60 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-red-500 transition-colors leading-relaxed"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs text-white/70 font-bold">مدة التثبيت في الشريط:</span>
                <select
                  value={breakingDuration}
                  onChange={(e) => setBreakingDuration(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-white/20 bg-black/60 text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="15">15 دقيقة</option>
                  <option value="30">30 دقيقة (افتراضي)</option>
                  <option value="60">ساعة كاملة</option>
                  <option value="120">ساعتان</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={broadcasting || !breakingText}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black transition-all shadow-lg shadow-red-900/50 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{broadcasting ? 'جاري البث والتعميم...' : 'بث الخبر العاجل في شريط الموقع الآن'}</span>
              </button>
            </div>

            {broadcastSuccess && (
              <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>تم بث الخبر العاجل بنجاح وتعميمه على كامل صفحات المنصة وشريط الهواتف!</span>
              </div>
            )}
          </form>
        </div>

        {/* 4. لوحة الإحصائيات الحية للمنظومة */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center space-y-1">
            <span className="text-2xl md:text-3xl font-black text-[var(--gold)] block">1,842</span>
            <span className="text-xs text-white/60 font-semibold">إجمالي المواد المنشورة</span>
          </div>
          <div className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center space-y-1">
            <span className="text-2xl md:text-3xl font-black text-emerald-400 block">18 دقيقة</span>
            <span className="text-xs text-white/60 font-semibold">معدل سرعة التصحيح (SLA)</span>
          </div>
          <div className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center space-y-1">
            <span className="text-2xl md:text-3xl font-black text-cyan-400 block">24 / 24</span>
            <span className="text-xs text-white/60 font-semibold">المصادر المعتمدة المتصلة</span>
          </div>
          <div className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center space-y-1">
            <span className="text-2xl md:text-3xl font-black text-rose-400 block">0 أخطاء</span>
            <span className="text-xs text-white/60 font-semibold">سلامة النواة البرمجية</span>
          </div>
        </div>

        {/* 5. بوابات الوصول السريع لأجنحة الإدارة المتخصصة */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-[var(--gold)]" />
            <span>أجنحة الإدارة والتحرير التخصصية</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/editorial-policy"
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[var(--gold)] transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-[var(--gold)] transition-colors">ميثاق الشرف والسياسات</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[var(--gold)] group-hover:-translate-x-1 transition-all" />
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed">
                مراجعة المواد التحريرية الـ 10 وقواعد النشر المعتمدة.
              </p>
            </Link>

            <Link
              href="/corrections"
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-emerald-500 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">سجل التصحيحات والشفافية</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-emerald-400 group-hover:-translate-x-1 transition-all" />
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed">
                فحص طلبات التصحيح الواردة وسجل الـ Audit Log.
              </p>
            </Link>

            <Link
              href="/fact-check"
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-red-500 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">رادار الحقيقة ومكافحة الشائعات</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/40 group-hover:text-red-400 group-hover:-translate-x-1 transition-all" />
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed">
                تحليل المواد المزيفة وإصدار أحكام التدقيق الجنائي.
              </p>
            </Link>

            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noreferrer"
              className="p-5 rounded-2xl border border-[var(--gold)]/30 bg-[var(--gold)]/10 hover:bg-[var(--gold)]/20 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[var(--gold)]">النظام الإداري المعزول (Port 3001)</span>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--gold)]" />
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed">
                فتح تطبيق الإدارة المتقدم (@awt/admin) على منفذ 3001.
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
