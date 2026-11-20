import Link from "next/link";
import { Metadata } from "next";
import { getVideosData } from "@/lib/dal";
import { VideosClientStudio } from "./VideosClientStudio";
import { Video, Film, Radio, ShieldCheck } from "lucide-react";

export const revalidate = 180; // ISR 3 دقائق

export const metadata: Metadata = {
  title: "الصحافة المرئية وفيديو الوطن — الوطن اليوم",
  description: "استوديو البث المرئي والتغطيات المصورة الحية، وثائقيات الميدان وإيجازات الأخبار بدقة 4K من شبكة مراسلي الوطن اليوم.",
  alternates: {
    canonical: "/videos",
  },
  openGraph: {
    title: "الصحافة المرئية وفيديو الوطن — الوطن اليوم",
    description: "شاهد أحدث التغطيات المرئية والتقارير الميدانية المصورة والوثائقيات بدقة 4K.",
    type: "website",
  },
};

export default async function VideosPage() {
  const videos = await getVideosData();
  const heroVideo = videos[0];
  const otherVideos = videos.slice(1);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "الرئيسية",
        item: "https://alwatantoday.net",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "فيديو",
        item: "https://alwatantoday.net/videos",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-24 selection:bg-red-500/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-red-950/20 via-[var(--surface)] to-[var(--bg)] py-12 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent pointer-events-none" />

        <div className="container-custom max-w-7xl mx-auto px-4 relative z-10 space-y-4 text-center md:text-right">
          {/* Breadcrumb */}
          <nav aria-label="فتات الخبز" className="flex items-center gap-2 text-xs text-[var(--text-muted)] justify-center md:justify-start">
            <Link href="/" className="hover:text-[var(--primary)] transition-colors">الرئيسية</Link>
            <span>/</span>
            <span className="text-[var(--primary)] font-bold">فيديو وتغطيات مرئية</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold shadow-sm">
            <Film className="w-4 h-4" />
            <span>استوديو الصحافة المرئية والبث السينمائي 4K</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-[var(--text)] tracking-tight">
            الصحافة المرئية · عين الوطن على الميدان
          </h1>

          <p className="text-sm md:text-base text-[var(--text-muted)] max-w-3xl leading-relaxed">
            تقارير مصورة، وثائقيات الميدان، تحقيقات استقصائية معتمدة بالصوت والصورة، وإيجازات إخبارية لحظية تنقل نبض فلسطين والعالم باحترافية صحفية فائقة.
          </p>
        </div>
      </div>

      {/* الاستوديو التفاعلي للعميل */}
      <div className="container-custom max-w-7xl mx-auto px-4 py-8">
        <VideosClientStudio heroVideo={heroVideo} otherVideos={otherVideos} />
      </div>
    </div>
  );
}
