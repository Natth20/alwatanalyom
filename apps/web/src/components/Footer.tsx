import Link from "next/link";
import { SITE_SECTIONS } from "@awt/shared";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-16 text-sm text-[var(--text-muted)]">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* العمود 1: عن المنصة والمبادئ */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm">
                وطن
              </div>
              <span className="text-xl font-bold text-[var(--text)]">الوطن اليوم</span>
            </div>
            <p className="text-xs leading-relaxed">
              الوجهة الإخبارية العربية الأولى لجمع الأخبار بمصادرها الأصلية، ودمج التغطيات في قصص متكاملة مع سياق تحريري وتحقق موضوعي.
            </p>
            <p className="text-[11px] text-[var(--primary)] font-medium">
              «لا خبر بلا مصدر • لا أرقام مختلقة • فلسطين أولاً»
            </p>
          </div>

          {/* العمود 2: الأقسام الإخبارية */}
          <div>
            <h4 className="font-bold text-[var(--text)] mb-3">الأقسام الرئيسية</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {SITE_SECTIONS.map((sec) => (
                <Link key={sec.slug} href={`/${sec.slug}`} className="hover:text-[var(--primary)]">
                  {sec.nameAr}
                </Link>
              ))}
            </div>
          </div>

          {/* العمود 3: الشفافية والسياسات */}
          <div>
            <h4 className="font-bold text-[var(--text)] mb-3">الشفافية والحقوق</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-[var(--primary)]">من نحن ورؤيتنا</Link></li>
              <li><Link href="/how-we-aggregate" className="hover:text-[var(--primary)]">كيف نجمع الأخبار</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-[var(--primary)]">السياسة التحريرية</Link></li>
              <li><Link href="/sources-policy" className="hover:text-[var(--primary)]">سياسة المصادر والعرض</Link></li>
              <li><Link href="/corrections" className="hover:text-[var(--primary)]">سجل التصحيحات</Link></li>
              <li><Link href="/dmca" className="hover:text-[var(--primary)]">طلبات إزالة المحتوى (DMCA)</Link></li>
            </ul>
          </div>

          {/* العمود 4: الخدمات والشراكات */}
          <div>
            <h4 className="font-bold text-[var(--text)] mb-3">الخدمات والمتابعة</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/economy" className="hover:text-[var(--primary)]">الوطن الاقتصادي والأسواق</Link></li>
              <li><Link href="/live" className="hover:text-[var(--primary)]">دليل البث المباشر الموثوق</Link></li>
              <li><Link href="/sports" className="hover:text-[var(--primary)]">الرياضة بالتعاون مع يلا سبورت</Link></li>
              <li><Link href="/newsletter" className="hover:text-[var(--primary)]">النشرات الإخبارية البريدية</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--primary)]">الخصوصية وشروط الاستخدام</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--primary)]">اتصل بنا وغرفة التحرير</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs gap-4">
          <p>© {new Date().getFullYear()} الوطن اليوم (alwatantoday.net). جميع الحقوق محفوظة للناشرين الأصليين.</p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/rss" className="hover:text-[var(--primary)]">خلاصات RSS</Link>
            <span>•</span>
            <Link href="/sitemap.xml" className="hover:text-[var(--primary)]">خريطة الموقع</Link>
            <span>•</span>
            <span className="text-[var(--text-muted)]">خوادم صديقة للخصوصية وخالية من ملفات التتبع المتطفلة</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

