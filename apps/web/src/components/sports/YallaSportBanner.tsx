import { ExternalLink, Radio, Trophy, Play } from "lucide-react";

interface Props {
  variant?: "leaderboard" | "card";
}

export function YallaSportBanner({ variant = "leaderboard" }: Props) {
  if (variant === "card") {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 text-white p-5 space-y-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
              المنصة الرياضية الشقيقة
            </span>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
            yallasport.com
          </span>
        </div>

        <div>
          <h3 className="text-lg font-black text-white">يلا سبورت · بث ونتائج حية</h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            تغطية حصرية لمباريات المنتخب الفلسطيني (الفدائي)، الدوريات الأوروبية والعربية، وأهداف المباريات بجودة عالية.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
          <a
            href="https://yallasport.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-center transition-all flex items-center justify-center gap-1"
          >
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span>يلا سبورت</span>
          </a>
          <a
            href="https://yallasport1.com/live/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-center transition-all flex items-center justify-center gap-1 shadow-sm"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>البث المباشر</span>
          </a>
        </div>
      </div>
    );
  }

  // Leaderboard layout (728x90 style responsive with Zero CLS)
  return (
    <div className="w-full min-h-[90px] rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-[#590018] via-[#1A382A] to-[#04331E] text-white p-3 md:px-6 md:py-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-3 text-center md:text-right">
        <div className="w-11 h-11 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xl shrink-0 shadow-md">
          ⚽
        </div>
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-base font-black text-white">يلا سبورت · Yalla Sport</span>
            <span className="text-[10px] bg-emerald-400 text-slate-950 px-2 py-0.5 rounded-full font-bold">
              شريك البث
            </span>
          </div>
          <p className="text-xs text-stone-200 mt-0.5 line-clamp-1">
            الأهداف أولاً بأول، جداول الترتيب، وخدمة البث المباشر عبر (سبورت لايف)
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <a
          href="https://yallasport.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all flex items-center gap-1.5"
        >
          <span>الموقع الرسمي</span>
          <ExternalLink className="w-3.5 h-3.5 text-stone-300" />
        </a>

        <a
          href="https://yallasport1.com/live/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-md"
        >
          <Play className="w-3.5 h-3.5 fill-slate-950" />
          <span>سبورت لايف (بث حي)</span>
        </a>
      </div>
    </div>
  );
}
