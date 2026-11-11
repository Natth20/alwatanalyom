import { getChannels } from "@/lib/dal";
import { LiveChannelsFilter } from "@/components/LiveChannelsFilter";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "دليل البث المباشر المعتمد — الوطن اليوم",
  description:
    "دليل شامل وموثق لقنوات البث الإخباري الحي العربية والعالمية بروابط رسمية مفحوصة دورياً.",
};

export default async function LiveDirectoryPage() {
  const channels = await getChannels();

  return (
    <div className="container-custom py-8 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-3 h-3 rounded-full bg-[var(--primary)]"></span>
          <h1 className="text-3xl font-black text-[var(--text)]">دليل البث المباشر المعتمد</h1>
          <span className="text-xs bg-[var(--primary)]/10 text-[var(--primary)] px-2 py-0.5 rounded font-bold">
            روابط رسمية
          </span>
        </div>
        <p className="text-sm text-[var(--text-muted)] max-w-2xl">
          دليل رسمي للقنوات الإخبارية العربية والدولية. يتم فحص سلامة الروابط دورياً وتوجيه القارئ إلى منصات البث المصرّح بها رسمياً من قبل أصحاب البث.
        </p>
      </div>

      {/* مكوّن التصفية التفاعلي وشبكة القنوات */}
      <LiveChannelsFilter channels={channels} />
    </div>
  );
}
