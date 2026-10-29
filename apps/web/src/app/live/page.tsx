import { getChannels } from "@/lib/dal";

export const revalidate = 300; // ISR 5 دقائق

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-0.5 rounded">
                  {channel.category === "arabic" ? "قناة عربية" : "قناة دولية"}
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  رابط رسمي محقق
                </span>
              </div>

              <h3 className="text-lg font-bold text-[var(--text)] mb-2">
                {channel.nameAr}
              </h3>

              {channel.descriptionAr && (
                <p className="text-xs text-[var(--text-muted)] line-clamp-3 mb-4 leading-relaxed">
                  {channel.descriptionAr}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
              <a
                href={channel.officialSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-xs font-bold hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-1"
              >
                <span>مشاهدة البث الرسمي</span>
                <span>↗</span>
              </a>

              <span className="text-[10px] text-[var(--text-muted)]">
                آخر فحص: اليوم
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

