import Link from "next/link";
import { getHomeFeed } from "@/lib/dal";
import { Globe, ExternalLink, ShieldCheck, Flame, Radio } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Al-Watan Today — Independent Arab World News & Fact Aggregator",
  description:
    "The primary destination for Middle East and global news, featuring direct links to verified original sources and context-driven reporting.",
};

export default async function EnglishHomePage() {
  const feed = await getHomeFeed();
  const allArticles = [
    ...feed.breaking,
    ...feed.arabWorldArticles,
    ...feed.worldArticles,
    ...feed.economyArticles,
    ...feed.techArticles,
    ...feed.sportsArticles,
  ];

  return (
    <div dir="ltr" className="min-h-screen bg-[var(--bg)] text-[var(--text)] font-sans">
      {/* Top Bar */}
      <div className="border-b border-[var(--border)] bg-[var(--surface)] text-xs text-[var(--text-muted)] py-2.5">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-rose-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              AL-WATAN TODAY · ENGLISH EDITION
            </span>
            <span>•</span>
            <span>Real-time aggregation with direct source provenance</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-2.5 py-0.5 rounded border border-[var(--border)] text-xs font-bold text-[var(--text)] hover:border-rose-600 transition-colors"
            >
              العربية (RTL)
            </Link>
          </div>
        </div>
      </div>

      {/* Main Brand Header */}
      <header className="border-b border-[var(--border)] py-6 bg-[var(--bg)]">
        <div className="container-custom flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link href="/en" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
                WT
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-[var(--text)] leading-none">
                  AL-WATAN TODAY
                </h1>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  Global wire & Middle East news aggregation · alwatantoday.net
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Link
              href="/en"
              className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold"
            >
              Top Stories
            </Link>
            <Link
              href="/live"
              className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] flex items-center gap-1.5"
            >
              <Radio className="w-3.5 h-3.5 text-rose-600" />
              <span>Live Feeds</span>
            </Link>
            <Link
              href="/economy"
              className="px-3 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              Markets
            </Link>
          </div>
        </div>
      </header>

      {/* Principle Banner */}
      <section className="bg-rose-500/5 border-b border-rose-500/20 py-4">
        <div className="container-custom flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-rose-500 font-semibold">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              Editorial Principle #1: No news without original source attribution and time-stamped provenance.
            </span>
          </div>
          <Link href="/how-we-aggregate" className="text-[var(--text-muted)] hover:underline">
            Read our aggregation manifesto →
          </Link>
        </div>
      </section>

      {/* Main Feed */}
      <main className="container-custom py-8 space-y-8">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-600" />
            <h2 className="text-lg font-bold">Latest Wire Dispatches</h2>
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            Displaying {allArticles.length} recent verified items
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allArticles.map((article) => {
            const displayTitle = article.titleOriginal || article.titleAr;
            return (
              <article
                key={article.id}
                className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] hover:border-rose-600/50 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 font-semibold">
                      {article.sectionNameAr}
                    </span>
                    <time dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleDateString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </div>

                  <h3 className="font-bold text-sm leading-snug line-clamp-3 text-[var(--text)]">
                    <Link
                      href={`/article/${article.id}/${article.slug}`}
                      className="hover:text-rose-600 transition-colors"
                    >
                      {displayTitle}
                    </Link>
                  </h3>

                  {article.summaryAr && (
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                      {article.summaryAr}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-[var(--text)]">
                    <Globe className="w-3.5 h-3.5 text-rose-600" />
                    <span>{article.source?.nameAr || "Original Wire"}</span>
                  </div>

                  <Link
                    href={`/article/${article.id}/${article.slug}`}
                    className="text-xs font-semibold text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <span>Full Context</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* English Footer */}
      <footer className="border-t border-[var(--border)] py-8 mt-16 bg-[var(--surface)] text-xs text-[var(--text-muted)]">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Al-Watan Today (alwatantoday.net). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:underline">About</Link>
            <Link href="/sources-policy" className="hover:underline">Sources Policy</Link>
            <Link href="/corrections" className="hover:underline">Corrections</Link>
            <Link href="/dmca" className="hover:underline">DMCA</Link>
            <Link href="/" className="text-rose-600 font-bold hover:underline">العربية</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
