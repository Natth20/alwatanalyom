import Link from "next/link";
import { ArticleCard as ArticleCardType } from "@awt/shared";
import { Play, Film, Clock, ChevronLeft, Sparkles } from "lucide-react";
import { resolveEditorialImage } from "@/lib/editorial-images";

interface Props {
  articles: ArticleCardType[];
}

export function HomeVideoSection({ articles }: Props) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="space-y-6 rounded-3xl border border-[var(--gold)]/30 bg-gradient-to-b from-[#180006] via-[#0E0004] to-[#070002] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* إضاءة محيطية ذهبية خافتة */}
      <div className="absolute top-0 start-1/4 w-72 h-72 bg-[var(--gold)]/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. الترويسة السينمائية الفاخرة */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#590018] text-[var(--gold)] flex items-center justify-center border border-[var(--gold)]/40 shadow-xl shrink-0">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                الصحافة المرئية · فيديو الوطن
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                <Sparkles className="w-3 h-3" />
                <span>4K Ultra HD</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              تحقيقات استقصائية حصرية، توثيق ميداني، ولقطات من قلب الأحداث بالصوت والصورة.
            </p>
          </div>
        </div>

        <Link
          href="/videos"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 text-[var(--gold)] hover:bg-white/20 text-xs font-bold transition-all border border-[var(--gold)]/30 shrink-0 self-start sm:self-auto"
        >
          <span>استعراض استوديو الفيديو الكامل</span>
          <ChevronLeft className="w-4 h-4 rtl:rotate-0" />
        </Link>
      </div>

      {/* 2. شبكة الفيديوهات السينمائية الثلاث */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {articles.slice(0, 3).map((item, idx) => {
          const videoImg = resolveEditorialImage(item);
          const durations = ["03:42", "04:15", "02:50"];
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden group hover:border-[var(--gold)]/50 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* إطار الفيديو مع زر التشغيل الذهبي المتوهج */}
                <div className="relative aspect-video bg-stone-950 overflow-hidden">
                  <img
                    src={videoImg}
                    alt={item.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                    loading="lazy"
                  />
                  {/* تدرج ظلي متقن */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                  {/* زر التشغيل في المركز */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[var(--gold)] text-[#140005] flex items-center justify-center group-hover:scale-115 transition-transform duration-300 shadow-2xl border-2 border-white/80">
                      <Play className="w-6 h-6 fill-current ms-0.5 text-[#140005]" />
                    </div>
                  </div>

                  {/* المدة الزمنية وشارة القسم */}
                  <div className="absolute bottom-3 start-3 end-3 flex items-center justify-between text-[11px] text-white z-10">
                    <span className="bg-[#590018]/90 text-[var(--gold)] px-2.5 py-0.5 rounded-md font-bold text-[10px] border border-[var(--gold)]/30 backdrop-blur-md">
                      {item.sectionNameAr}
                    </span>
                    <span className="bg-black/70 px-2.5 py-0.5 rounded-md font-mono flex items-center gap-1 border border-white/10 backdrop-blur-md">
                      <Clock className="w-3 h-3 text-[var(--gold)]" />
                      <span>{durations[idx % durations.length]}</span>
                    </span>
                  </div>
                </div>

                {/* نص التقرير المرئي */}
                <div className="p-4 sm:p-5 space-y-2">
                  <h3 className="font-bold text-sm sm:text-base text-white line-clamp-2 leading-snug group-hover:text-[var(--gold)] transition-colors">
                    <Link href={`/article/${item.id}/${item.slug}`}>
                      {item.titleAr}
                    </Link>
                  </h3>
                  {item.summaryAr && (
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {item.summaryAr}
                    </p>
                  )}
                </div>
              </div>

              {/* سطر التذييل */}
              <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px] font-medium">{item.source?.nameAr || "استوديو الوطن اليوم"}</span>
                <Link
                  href={`/article/${item.id}/${item.slug}`}
                  className="text-[var(--gold)] font-bold hover:underline flex items-center gap-1 text-[11px]"
                >
                  <span>مشاهدة التقرير</span>
                  <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. شريط الريلز واللقطات السريعة العمودية (Vertical Reels Strip) */}
      {articles.length > 0 && (
        <div className="pt-6 border-t border-white/10 space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>ريلز الوطن · لقطات سريعة وميدانية</span>
            </h3>
            <span className="text-[11px] text-stone-400">عرض عمودي فائق السرعة</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(articles.length > 3 ? articles.slice(3, 7) : articles.slice(0, 4)).map((reel, rIdx) => {
              const reelImg = resolveEditorialImage(reel);
              return (
                <Link
                  key={`reel-${reel.id}-${rIdx}`}
                  href={`/article/${reel.id}/${reel.slug}`}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-[var(--gold)]/60 transition-all shadow-lg block"
                >
                  <img
                    src={reelImg}
                    alt={reel.titleAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

                  <div className="absolute top-3 start-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-[var(--gold)]">
                    <Play className="w-3.5 h-3.5 fill-current ms-0.5" />
                  </div>

                  <div className="absolute bottom-3.5 inset-x-3.5 space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-[var(--gold)]/20 border border-[var(--gold)]/40 text-[var(--gold)] text-[9px] font-black">
                      {reel.sectionNameAr}
                    </span>
                    <h4 className="text-xs font-bold text-white leading-snug line-clamp-2 group-hover:text-[var(--gold)] transition-colors">
                      {reel.titleAr}
                    </h4>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
