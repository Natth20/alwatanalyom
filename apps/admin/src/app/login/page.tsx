import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تسجيل الدخول — غرفة أخبار الوطن اليوم",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg)]">
      <div className="w-full max-w-md p-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] space-y-6 shadow-xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[var(--primary)] text-slate-950 font-black flex items-center justify-center mx-auto text-xl shadow">
            وطن
          </div>
          <h1 className="text-2xl font-black text-[var(--text)]">تسجيل دخول هيئة التحرير</h1>
          <p className="text-xs text-[var(--text-muted)]">
            لوحة الإدارة المعزولة · admin.alwatantoday.net
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[var(--text)] mb-1.5">
              البريد الإلكتروني المهني
            </label>
            <input
              type="email"
              required
              placeholder="editor@alwatantoday.net"
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[var(--text)] mb-1.5">
              كلمة المرور
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-xs text-[var(--text)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>

          <div className="p-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] space-y-1">
            <label className="block text-xs font-bold text-amber-400">
              رمز المصادقة الثنائية (TOTP 2FA)
            </label>
            <input
              type="text"
              maxLength={6}
              placeholder="000000"
              className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-center font-mono text-base tracking-widest text-[var(--text)] focus:outline-none focus:border-amber-400"
            />
            <span className="text-[10px] text-[var(--text-muted)] block">
              أدخل الرمز المكون من 6 أرقام من تطبيق Authenticator
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[var(--primary)] text-slate-950 font-bold text-xs hover:bg-[var(--primary-hover)] transition-colors shadow"
          >
            تسجيل الدخول المشفر
          </button>
        </form>

        <p className="text-[10px] text-[var(--text-muted)] text-center leading-relaxed">
          🔒 هذا النطاق مخصص للمحررين المصرح لهم فقط. يتم تسجيل كافة محاولات الدخول وعناوين IP في سجل التدقيق الأمني.
        </p>
      </div>
    </div>
  );
}
