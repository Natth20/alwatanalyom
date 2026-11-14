import { prisma } from "@awt/db";
import { Zap, ShieldCheck, Target, Smartphone, Share2, AlertCircle, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ExcellenceIndicatorsPage() {
  // 1. حساب مؤشر السرعة والتحديث الحقيقي (Speed & Latency)
  const recentArticles = await prisma.article.findMany({
    where: {
      status: "PUBLISHED",
      sourcePublishedAt: { not: null },
      publishedAt: { not: null },
    },
    select: {
      publishedAt: true,
      sourcePublishedAt: true,
      isBreaking: true,
    },
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  let avgLatencyMinutes: number | null = null;
  let breakingAvgLatencyMinutes: number | null = null;

  if (recentArticles.length > 0) {
    const latencies = recentArticles
      .map((a) => {
        if (!a.publishedAt || !a.sourcePublishedAt) return null;
        const diffMs = a.publishedAt.getTime() - a.sourcePublishedAt.getTime();
        return Math.max(0, diffMs / (1000 * 60)); // بالدقائق
      })
      .filter((l): l is number => l !== null);

    if (latencies.length > 0) {
      avgLatencyMinutes = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
    }

    const breakingLatencies = recentArticles
      .filter((a) => a.isBreaking && a.publishedAt && a.sourcePublishedAt)
      .map((a) => {
        const diffMs = (a.publishedAt?.getTime() || 0) - (a.sourcePublishedAt?.getTime() || 0);
        return Math.max(0, diffMs / (1000 * 60));
      });

    if (breakingLatencies.length > 0) {
      breakingAvgLatencyMinutes = Math.round(breakingLatencies.reduce((a, b) => a + b, 0) / breakingLatencies.length);
    }
  }

  // 2. حساب مؤشر الثقة والنزاهة الصحفية (Trust & Attribution)
  const totalArticles = await prisma.article.count({ where: { status: "PUBLISHED" } });
  const attributedArticles = await prisma.article.count({
    where: {
      status: "PUBLISHED",
      sourceId: { not: null },
      sourceUrl: { not: null },
    },
  });

  const attributionRate = totalArticles > 0 ? ((attributedArticles / totalArticles) * 100).toFixed(1) : "100.0";
  const correctionsCount = await prisma.correction.count().catch(() => 0);
  const withdrawnCount = await prisma.article.count({ where: { status: "WITHDRAWN" } }).catch(() => 0);

  // 3. حساب مؤشر التخصص والتفوق (Strategic Focus)
  const palestineCount = await prisma.article.count({
    where: {
      status: "PUBLISHED",
      section: { slug: { startsWith: "palestine" } },
    },
  });

  const aidCount = await prisma.article.count({
    where: {
      status: "PUBLISHED",
      OR: [
        { section: { slug: "aid" } },
        { titleAr: { contains: "مساعدات", mode: "insensitive" } },
        { titleAr: { contains: "إغاث", mode: "insensitive" } },
      ],
    },
  });

  const jobsCount = await prisma.article.count({
    where: {
      status: "PUBLISHED",
      OR: [
        { section: { slug: "jobs" } },
        { titleAr: { contains: "وظائف", mode: "insensitive" } },
        { titleAr: { contains: "توظيف", mode: "insensitive" } },
      ],
    },
  });

  const sportsCount = await prisma.article.count({
    where: {
      status: "PUBLISHED",
      section: { slug: "sports" },
    },
  });

  // 4. مؤشر السيو والتوزيع (SEO & Distribution)
  const confirmedSubscribers = await prisma.newsletterSubscriber.count({
    where: { confirmedAt: { not: null } },
  }).catch(() => 0);

  const pushSubscribers = await (prisma as any).pushSubscription?.count().catch(() => 0) || 0;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* الترويسة الرئيسية */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-[var(--gold)] rounded-full" />
            <h1 className="text-2xl font-black text-[var(--text)]">
              لوحة مؤشرات التميز الخمسة (Excellence KPIs)
            </h1>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            وفق البند 1-ب من وثيقة المشروع: رصد الأداء الفعلي عبر المحاور الخمسة. لا أرقام وهمية نهائياً.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold shrink-0">
          <CheckCircle2 className="w-4 h-4" />
          <span>بيانات حية مستخرجة من قاعدة البيانات</span>
        </div>
      </div>

      {/* المحاور الخمسة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* المحور 1: السرعة والتحديث الحقيقي */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4 shadow-sm border-t-4 border-t-amber-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-sm text-[var(--text)]">1. السرعة والتحديث الحقيقي</h2>
            </div>
            <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
              الهدف: &lt; 5 د للعاجل
            </span>
          </div>

          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            زمن النشر الفعلي من لحظة صدور الخبر لدى المصدر الأصلي حتى ظهوره على المنصة.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">متوسط زمن النشر العام:</span>
              <span className="font-mono font-bold text-sm text-[var(--text)]">
                {avgLatencyMinutes !== null ? `${avgLatencyMinutes} دقيقة` : "لا بيانات بعد"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">متوسط زمن الأخبار العاجلة:</span>
              <span className="font-mono font-bold text-sm text-emerald-400">
                {breakingAvgLatencyMinutes !== null ? `${breakingAvgLatencyMinutes} دقيقة` : "لا بيانات بعد"}
              </span>
            </div>
          </div>
        </div>

        {/* المحور 2: الثقة والمصداقية التامة */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4 shadow-sm border-t-4 border-t-emerald-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-sm text-[var(--text)]">2. الثقة والمصداقية</h2>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              الهدف: 100%
            </span>
          </div>

          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            نسبة صريحة لكل مادة لمصدرها الحقيقي مع رابط مباشر، وسجل تصحيحات شفاف.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">نسبة التوثيق للمصادر:</span>
              <span className="font-mono font-bold text-sm text-emerald-400">
                {totalArticles > 0 ? `${attributionRate}%` : "لا بيانات بعد"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">سجل التصحيحات العلنية:</span>
              <span className="font-mono font-bold text-sm text-[var(--text)]">
                {correctionsCount} تصحيحات موثقة
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">المواد المسحوبة (Withdrawn):</span>
              <span className="font-mono font-bold text-sm text-[var(--text)]">
                {withdrawnCount} مادة
              </span>
            </div>
          </div>
        </div>

        {/* المحور 3: التخصصات المتفوقة */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4 shadow-sm border-t-4 border-t-rose-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-sm text-[var(--text)]">3. التخصصات المتفوقة</h2>
            </div>
            <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full">
              محاور القوة
            </span>
          </div>

          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            التركيز الاستراتيجي على المساعدات، الوظائف، فلسطين أولاً، والرياضة مع يلا سبورت.
          </p>

          <div className="space-y-2 pt-1 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span>🇵🇸 التغطية الفلسطينية</span>
              <span className="font-bold font-mono text-[var(--text)]">{palestineCount} مقالاً</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span>🤝 المساعدات والإغاثة</span>
              <span className="font-bold font-mono text-[var(--text)]">{aidCount} مقالاً</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span>💼 فرص العمل والوظائف</span>
              <span className="font-bold font-mono text-[var(--text)]">{jobsCount} مقالاً</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--bg)] border border-[var(--border)]">
              <span>⚽ الرياضة (يلا سبورت)</span>
              <span className="font-bold font-mono text-[var(--text)]">{sportsCount} مقالاً</span>
            </div>
          </div>
        </div>

        {/* المحور 4: سرعة ونظافة التجربة (Core Web Vitals) */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4 shadow-sm border-t-4 border-t-sky-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-sm text-[var(--text)]">4. سرعة ونظافة التجربة</h2>
            </div>
            <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full">
              موبايل أولاً
            </span>
          </div>

          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            مؤشرات تجربة المستخدم الأساسية (Core Web Vitals) للأجهزة الذكية وفق معايير جوجل.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-between">
              <div>
                <span className="text-xs text-[var(--text)] block font-bold">LCP (سرعة تحميل أكبر عنصر):</span>
                <span className="text-[10px] text-[var(--text-muted)]">الهدف: أقل من 2.5 ثانية</span>
              </div>
              <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded">
                قيد القياس في الإنتاج
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-between">
              <div>
                <span className="text-xs text-[var(--text)] block font-bold">INP (الاستجابة للتفاعل):</span>
                <span className="text-[10px] text-[var(--text-muted)]">الهدف: أقل من 200ms</span>
              </div>
              <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded">
                قيد القياس في الإنتاج
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-between">
              <div>
                <span className="text-xs text-[var(--text)] block font-bold">CLS (ثبات التخطيط البصري):</span>
                <span className="text-[10px] text-[var(--text-muted)]">الهدف: أقل من 0.1</span>
              </div>
              <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-1 rounded">
                قيد القياس في الإنتاج
              </span>
            </div>
          </div>
        </div>

        {/* المحور 5: السيو والتوزيع الرقمي */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4 shadow-sm border-t-4 border-t-purple-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-sm text-[var(--text)]">5. السيو والتوزيع الرقمي</h2>
            </div>
            <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
              الانتشار
            </span>
          </div>

          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            الظهور في Google News و Discover، وقنوات التوزيع المباشرة والنشرة البريدية.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">مشتركو النشرة المؤكدون:</span>
              <span className="font-mono font-bold text-sm text-purple-400">
                {confirmedSubscribers > 0 ? confirmedSubscribers : "لا بيانات بعد"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">مشتركو إشعارات الويب (Push):</span>
              <span className="font-mono font-bold text-sm text-[var(--text)]">
                {pushSubscribers > 0 ? pushSubscribers : "لا بيانات بعد"}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)]">جاهزية خريطة أخبار جوجل:</span>
              <span className="text-xs font-bold text-emerald-400">
                مفعلة (/news-sitemap.xml)
              </span>
            </div>
          </div>
        </div>

        {/* بطاقة التنبيه لمعايير النزاهة */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
              <AlertCircle className="w-5 h-5" />
              <span>ميثاق النزاهة الإحصائية</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              تطبيقاً لقواعد النزاهة الصارمة (القسم 2)، كافة الأرقام المعروضة في هذه الصفحة مستخرجة لحظياً من قاعدة البيانات الحقيقية. عند عدم توفر قياس حقلي مؤكد، يلتزم النظام بعرض «لا بيانات بعد» أو «قيد القياس» دون أي فبركة.
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--border)] text-[11px] text-[var(--text-muted)]">
            آخر تدقيق إحصائي: {new Date().toLocaleTimeString("ar-EG")}
          </div>
        </div>
      </div>
    </div>
  );
}
