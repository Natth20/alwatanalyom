"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  Video,
  Clock,
  Film,
  ShieldCheck,
  ChevronLeft,
  Sparkles,
  Maximize2,
  Volume2,
  VolumeX,
  Share2,
  Tv,
  Radio,
  Eye,
  Check,
  Sliders,
  Calendar,
} from "lucide-react";

interface VideoData {
  id: string;
  slug: string;
  titleAr: string;
  summaryAr: string | null;
  publishedAt: string;
  sectionSlug: string;
  sectionNameAr: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration?: string;
  sourceName?: string;
}

interface VideosClientStudioProps {
  heroVideo?: VideoData;
  otherVideos: VideoData[];
}

export function VideosClientStudio({ heroVideo, otherVideos }: VideosClientStudioProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(heroVideo || otherVideos[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [copied, setCopied] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { time: "00:00", title: "المقدمة وسياق الأحداث الميدانية" },
    { time: "01:15", title: "شهادات حية من الطواقم الطبية والمراسلين" },
    { time: "02:40", title: "التحليل الاستراتيجي وتداعيات الموقف" },
    { time: "04:10", title: "الخلاصة والآفاق المتوقعة" },
  ];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const allVideos = heroVideo ? [heroVideo, ...otherVideos] : otherVideos;

  const filteredVideos = allVideos.filter((v) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "field") return v.sectionSlug.includes("palestine") || v.titleAr.includes("غزة") || v.titleAr.includes("الميدان");
    if (activeCategory === "economy") return v.sectionSlug.includes("economy") || v.titleAr.includes("ذهب") || v.titleAr.includes("اقتصاد");
    if (activeCategory === "sports") return v.sectionSlug.includes("sport") || v.titleAr.includes("كأس") || v.titleAr.includes("سبورت");
    return true;
  });

  return (
    <div className="space-y-12">
      {/* 1. المشغل السينمائي الرئيسي (Cinema Theater Player) */}
      {selectedVideo && (
        <section className="relative rounded-3xl overflow-hidden border border-white/10 bg-black/80 shadow-2xl backdrop-blur-2xl">
          {/* توهج ضوئي سينمائي خلفي (Ambient Glow) */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--maroon)]/40 via-transparent to-[var(--gold)]/20 blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            {/* منطقة عرض الفيديو 16:9 */}
            <div className="lg:col-span-8 relative bg-black flex items-center justify-center min-h-[320px] sm:min-h-[460px] overflow-hidden group">
              <img
                src={selectedVideo.thumbnailUrl}
                alt={selectedVideo.titleAr}
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105 opacity-90' : 'opacity-80'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />

              {/* أزرار التحكم في الشاشة */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>فيديو 4K UHD · استوديو الوطن</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white/90 text-xs font-mono font-bold border border-white/15">
                    {selectedVideo.duration || "03:45"}
                  </span>
                </div>

                {/* زر التشغيل المركزي الضخم */}
                <div className="self-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--gold)] to-[#dca600] text-[#140106] flex items-center justify-center shadow-2xl shadow-[var(--gold-glow)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل الفيديو"}
                  >
                    {isPlaying ? <Pause className="w-9 h-9 fill-current" /> : <Play className="w-9 h-9 fill-current ms-1" />}
                  </button>
                </div>

                {/* شريط التحكم السفلي */}
                <div className="space-y-2">
                  {/* شريط التقدم الفصلي */}
                  <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden relative cursor-pointer">
                    <div className="h-full bg-gradient-to-r from-red-600 to-[var(--gold)] w-2/5" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <span className="font-mono text-[11px]">01:30 / {selectedVideo.duration || "03:45"}</span>
                    </div>

                    <button
                      onClick={handleShare}
                      className="hover:text-[var(--gold)] transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-bold"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copied ? "تم نسخ الرابط" : "مشاركة الفيديو"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* تفاصيل الفيديو والفصول الزمنية التفاعلية */}
            <div className="lg:col-span-4 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-b from-[#18020a] to-[#0d0105] border-t lg:border-t-0 lg:border-s border-white/10 text-white">
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[var(--gold)] block">
                    {selectedVideo.sectionNameAr} · تغطية مصورة
                  </span>
                  <h2 className="text-lg md:text-xl font-black text-white leading-snug">
                    {selectedVideo.titleAr}
                  </h2>
                  <p className="text-xs text-white/70 leading-relaxed line-clamp-3">
                    {selectedVideo.summaryAr}
                  </p>
                </div>

                {/* قائمة الفصول الزمنية التفاعلية */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-[11px] font-bold text-white/50 block">فصول التقرير المرئي (Chapters):</span>
                  <div className="space-y-1.5">
                    {chapters.map((ch, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveChapter(idx)}
                        className={`w-full p-2 rounded-xl text-right text-xs transition-all flex items-center justify-between cursor-pointer ${
                          activeChapter === idx
                            ? "bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/30 font-bold"
                            : "bg-white/5 text-white/70 hover:bg-white/10"
                        }`}
                      >
                        <span className="truncate">{ch.title}</span>
                        <span className="font-mono text-[10px] text-white/40 ps-2">{ch.time}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>موثق بالكامل</span>
                </span>
                <span className="font-mono">{selectedVideo.sourceName || "الوطن اليوم"}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. شريط التصنيفات وفلاتر الاستوديو المرئي */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <h2 className="text-xl font-black text-[var(--text)]">مكتبة التقارير والتغطيات المرئية</h2>
          <p className="text-xs text-[var(--text-muted)]">وثائقيات الميدان، تحقيقات استقصائية، وموجزات إخبارية مصورة</p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          {[
            { id: "all", label: "كافة الفيديوهات" },
            { id: "field", label: "الميدان وفلسطين" },
            { id: "economy", label: "تقارير الاقتصاد" },
            { id: "sports", label: "يلا سبورت" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[var(--primary)] text-white shadow-sm"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. شبكة كروت الفيديوهات الفاخرة */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => {
              setSelectedVideo(vid);
              setIsPlaying(true);
              window.scrollTo({ top: 180, behavior: "smooth" });
            }}
            className="group rounded-3xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm hover:shadow-xl hover:border-[var(--gold)]/50 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-48 w-full overflow-hidden bg-black">
              <img
                src={vid.thumbnailUrl}
                alt={vid.titleAr}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* زر التشغيل العائم المصغر */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-[var(--gold)] text-[#140106] flex items-center justify-center shadow-xl shadow-[var(--gold-glow)]">
                  <Play className="w-6 h-6 fill-current ms-0.5" />
                </div>
              </div>

              {/* وسم المدة الزمنية */}
              <div className="absolute bottom-3 end-3 px-2 py-0.5 rounded-md bg-black/80 text-white text-[11px] font-mono font-bold border border-white/20">
                {vid.duration || "02:45"}
              </div>

              <div className="absolute top-3 start-3 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold shadow">
                HD
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[var(--gold)] block">
                  {vid.sectionNameAr}
                </span>
                <h3 className="font-bold text-sm text-[var(--text)] group-hover:text-[var(--primary)] transition-colors leading-snug line-clamp-2">
                  {vid.titleAr}
                </h3>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                  {vid.summaryAr}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>{vid.publishedAt ? new Date(vid.publishedAt).toLocaleDateString("ar-EG") : "مؤخراً"}</span>
                <span className="text-[var(--primary)] font-bold group-hover:underline flex items-center gap-1">
                  <span>مشاهدة الآن</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
