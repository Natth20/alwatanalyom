import Link from "next/link";
import { ArticleCard as ArticleCardType } from "@awt/shared";
import { Play, Film, Clock, ChevronLeft } from "lucide-react";
import { resolveEditorialImage } from "@/lib/editorial-images";

interface Props {
  articles: ArticleCardType[];
}

export function HomeVideoSection({ articles }: Props) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="space-y-6 rounded-3xl border border-[var(--gold)]/20 bg-gradient-to-b from-[#200008] via-[#140005] to-[#0A0002] p-6 sm:p-8 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#590018] text-[var(--gold)] flex items-center justify-center border border-[var(--gold)]/30 shadow-md">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              الصحافة المرئية · فيديو الوطن
            </h2>
            <p className="text-xs text-stone-300">
              تقارير استقصائية، إيجازات ميدانية ولقطات حصرية بالصوت والصورة
            </p>
          </div>
        </div>

        <Link
          href="/videos"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-[var(--gold)] hover:bg-white/20 text-xs font-bold transition-colors border border-[var(--gold)]/30"
        >
          <span>استعراض أرشيف الفيديو</span>
          <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.slice(0, 3).map((item, idx) => {
          const videoImg = resolveEditorialImage(item);
          const durations = ["02:45", "03:12", "04:30"];
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden group hover:border-[var(--gold)]/50 transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* إطار الفيديو مع الصورة الحقيقية وزر التشغيل */}
                <div className="relative aspect-video bg-stone-950 overflow-hidden">
                  <img
                    src={videoImg}
                    alt={item.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    loading="lazy"
                  />
                  {/* تدرج ظلي داكن لزر التشغيل والعناوين */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-center justify-center pointer-events-none">
                    <div className="w-13 h-13 rounded-full bg-[var(--gold)] text-[#140005] flex items-center justify-center group-hover:scale-115 transition-transform duration-300 shadow-2xl border-2 border-white/80">
                      <Play className="w-6 h-6 fill-current ms-0.5 text-[#140005]" />
                    </div>
                  </div>

                  {/* شارات المدة والتصنيف */}
                  <div className="absolute bottom-2.5 start-2.5 end-2.5 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg bg-black/80 text-[var(--gold)] text-[11px] font-mono font-bold flex items-center gap-1 border border-white/10 backdrop-blur-xs">
                      <Clock className="w-3 h-3" />
                      <span>{durations[idx % durations.length]}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-[#590018]/90 text-white text-[11px] font-bold border border-[var(--gold)]/30 backdrop-blur-xs">
                      {item.sectionNameAr}
                    </span>
                  </div>
                </div>

                {/* عنوان الفيديو */}
                <div className="p-4 space-y-1.5">
                  <h3 className="font-bold text-sm sm:text-base text-white line-clamp-2 group-hover:text-[var(--gold)] transition-colors leading-snug">
                    <Link href={`/article/${item.id}/${item.slug}`}>
                      {item.titleAr}
                    </Link>
                  </h3>
                </div>
              </div>

              {/* تذييل البطاقة */}
              <div className="p-4 pt-0 text-[11px] text-stone-400 flex items-center justify-between border-t border-white/10 mt-2">
                <span>{item.source?.nameAr || "استوديو الوطن اليوم"}</span>
                <span className="font-mono">{new Date(item.publishedAt).toLocaleDateString("ar-EG")}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
