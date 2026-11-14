import { Megaphone, ShieldCheck, CheckCircle2, Layout, Smartphone, Eye, Mail } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "للإعلان معنا وشراكات الرعاية — الوطن اليوم",
  description: "دليل الإعلان المؤسسي والحلول التسويقية في منصة الوطن اليوم ويلا سبورت. شفافية تامة وبدون إزعاج أو قفز في التخطيط.",
};

export default function AdvertisePage() {
  return (
    <div className="container-custom py-12 max-w-4xl mx-auto space-y-12">
      {/* الترويسة الرئيسية */}
      <div className="rounded-2xl border border-[var(--gold)]/30 bg-gradient-to-r from-[var(--maroon-dark)] via-[#3D0010] to-[var(--maroon-dark)] text-white p-6 md:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-[var(--gold)] text-[var(--maroon-dark)] flex items-center justify-center font-bold shadow-md">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-wider text-[var(--gold)] uppercase">
              الحلول الإعلامية والشراكات التسويقية
            </span>
            <h1 className="text-2xl md:text-3xl font-black">
              أعلن مع منصة «الوطن اليوم» وشقيقتها «يلا سبورت»
            </h1>
          </div>
        </div>

        <p className="text-xs md:text-sm text-stone-300 max-w-2xl leading-relaxed">
          نصل بمحتواك وعلامتك التجارية إلى جمهور عريض في فلسطين والعالم العربي من الباحثين عن الأخبار الصادقة، المساعدات الموثقة، وفرص العمل والرياضة.
        </p>
      </div>

      {/* معايير الإعلان النزيه (Section 11 Integrity) */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2 pb-3 border-b border-[var(--border)]">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <h2 className="text-lg font-bold text-[var(--text)]">
            ميثاق الإعلان النزيه وحماية تجربة القارئ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[var(--text-muted)]">
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-2">
            <Layout className="w-5 h-5 text-[var(--primary)]" />
            <h3 className="font-bold text-[var(--text)] text-sm">مساحات ثابتة (Zero CLS)</h3>
            <p className="leading-relaxed">
              جميع الوحدات الإعلانية محجوزة بمساحات وأبعاد مسبقة لضمان عدم قفز النص أو تشتيت القارئ أثناء التصفح.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-2">
            <Eye className="w-5 h-5 text-[var(--gold)]" />
            <h3 className="font-bold text-[var(--text)] text-sm">تمييز الإعلان بوضوح</h3>
            <p className="leading-relaxed">
              كل مادة ترويجية توسم صراحة بـ «إعلان» أو «محتوى مروّج» منعاً لأي خلط بين التحرير والإعلان.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] space-y-2">
            <Smartphone className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-[var(--text)] text-sm">حظر الإعلانات المضللة</h3>
            <p className="leading-relaxed">
              نحظر تماماً إعلانات الاحتيال المالي، الرهانات، أو الروابط المضللة التي تنتهك خصوصية وأمان القراء.
            </p>
          </div>
        </div>
      </div>

      {/* المساحات المتوفرة والقياسات القياسية */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[var(--text)]">المساحات الإعلانية القياسية المتاحة</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-2">
            <span className="text-[10px] bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-0.5 rounded font-bold">
              أعلى الصفحة
            </span>
            <div className="font-mono text-sm font-bold text-[var(--text)]">728 × 90 px</div>
            <p className="text-[11px] text-[var(--text-muted)]">بانر الترويسة الرئيسية (Desktop)</p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-2">
            <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded font-bold">
              داخل المقالات
            </span>
            <div className="font-mono text-sm font-bold text-[var(--text)]">300 × 250 px</div>
            <p className="text-[11px] text-[var(--text-muted)]">بين الفقرات في المقالات والتغطيات</p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-2">
            <span className="text-[10px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded font-bold">
              الشريط الجانبي
            </span>
            <div className="font-mono text-sm font-bold text-[var(--text)]">300 × 600 px</div>
            <p className="text-[11px] text-[var(--text-muted)]">برج إعلاني ثابت على سطح المكتب</p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-center space-y-2">
            <span className="text-[10px] bg-sky-500/10 text-sky-600 px-2 py-0.5 rounded font-bold">
              الموبايل
            </span>
            <div className="font-mono text-sm font-bold text-[var(--text)]">320 × 50 px</div>
            <p className="text-[11px] text-[var(--text-muted)]">شريط سفلي مثبت للهواتف الذكية</p>
          </div>
        </div>
      </div>

      {/* نموذج طلب التواصل الإعلاني */}
      <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-tr from-[var(--surface)] to-[var(--bg)] p-8 text-center space-y-4 shadow-sm">
        <Mail className="w-10 h-10 text-[var(--primary)] mx-auto" />
        <h2 className="text-xl font-black text-[var(--text)]">
          لبدء حملتك الإعلانية أو طلب الدليل الإعلاني (Media Kit)
        </h2>
        <p className="text-xs text-[var(--text-muted)] max-w-lg mx-auto leading-relaxed">
          تواصل مباشرة مع قسم الإعلانات والشراكات التجارية لتزويدك بالأسعار، إحصاءات الوصول، والخيارات المتاحة لمنصتي الوطن اليوم ويلا سبورت.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:ads@alwatantoday.net"
            className="px-6 py-3 rounded-xl bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-2"
          >
            <span>ads@alwatantoday.net</span>
          </a>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-xs font-bold text-[var(--text)] hover:border-[var(--primary)] transition-colors"
          >
            نموذج التواصل السريع
          </Link>
        </div>
      </div>
    </div>
  );
}
