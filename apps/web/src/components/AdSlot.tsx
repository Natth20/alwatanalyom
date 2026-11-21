"use client";

import { useEffect, useRef, useState } from "react";
import { X, ExternalLink, Sparkles } from "lucide-react";

export interface AdData {
  id: string;
  name: string;
  type: "GOOGLE_ADSENSE" | "CUSTOM_BANNER" | "HTML_SCRIPT" | "SPONSORED_POST";
  position: string;
  clientName?: string | null;
  imageUrl?: string | null;
  targetUrl?: string | null;
  altText?: string | null;
  scriptCode?: string | null;
}

interface AdSlotProps {
  campaign?: AdData | null;
  position:
    | "HEADER_TOP_LEADERBOARD"
    | "STICKY_MOBILE_FOOTER"
    | "SIDEBAR_TOP_RECTANGLE"
    | "SIDEBAR_STICKY_SKYSCRAPER"
    | "IN_ARTICLE_PARAGRAPH_3"
    | "IN_ARTICLE_PARAGRAPH_6"
    | "BETWEEN_HOMEPAGE_SECTIONS"
    | "BREAKING_BAR_SPONSOR"
    | "STORY_TIMELINE_BANNER"
    | string;
  className?: string;
  allowDismiss?: boolean;
}

export function AdSlot({
  campaign: initialCampaign,
  position,
  className = "",
  allowDismiss = true,
}: AdSlotProps) {
  const [ad, setAd] = useState<AdData | null>(initialCampaign || null);
  const [dismissed, setDismissed] = useState(false);
  const trackedRef = useRef(false);

  // إذا لم يتم تمرير حملة، نقوم بجلب الحملة النشطة لهذا الموضع تلقائياً
  useEffect(() => {
    if (initialCampaign) {
      setAd(initialCampaign);
      return;
    }

    let isMounted = true;
    fetch(`/api/v1/ads?position=${encodeURIComponent(position)}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data?.ok && Array.isArray(data.ads) && data.ads.length > 0) {
          setAd(data.ads[0]);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [initialCampaign, position]);

  // تسجيل المشاهدة (Impression)
  useEffect(() => {
    if (!ad?.id || trackedRef.current) return;
    trackedRef.current = true;

    fetch("/api/v1/ads/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: ad.id, event: "impression" }),
    }).catch(() => {});
  }, [ad?.id]);

  if (dismissed || !ad) {
    return null;
  }

  const handleAdClick = () => {
    if (!ad?.id) return;
    fetch("/api/v1/ads/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: ad.id, event: "click" }),
    }).catch(() => {});
  };

  const isLeaderboard = position === "HEADER_TOP_LEADERBOARD";
  const isSidebar = position.includes("SIDEBAR");

  return (
    <div
      data-ad-position={position}
      className={`relative mx-auto my-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-center transition-all duration-300 shadow-xs hover:border-[var(--gold)]/40 group ${className}`}
    >
      {/* شارة إعلان ممول مع اسم المعلن وزر الإغلاق */}
      <div className="flex items-center justify-between px-3 py-1 bg-[var(--surface-hover)] border-b border-[var(--border)]/60 text-[10px] text-[var(--text-muted)]">
        <div className="flex items-center gap-1.5 font-bold">
          <Sparkles className="w-3 h-3 text-[var(--gold)]" />
          <span className="text-[var(--gold)]">إعلان ممول</span>
          {ad.clientName && (
            <>
              <span className="text-[var(--border)]">•</span>
              <span className="text-[var(--text-secondary)]">{ad.clientName}</span>
            </>
          )}
        </div>

        {allowDismiss && (
          <button
            onClick={() => setDismissed(true)}
            className="p-0.5 rounded-md hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
            title="إخفاء الإعلان"
            aria-label="إخفاء الإعلان"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* عرض البانر المخصص */}
      {ad.type === "CUSTOM_BANNER" && ad.imageUrl && (
        <a
          href={ad.targetUrl || "#"}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleAdClick}
          className="relative block overflow-hidden"
        >
          <img
            src={ad.imageUrl}
            alt={ad.altText || ad.name}
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.01] ${
              isLeaderboard
                ? "h-20 sm:h-24 md:h-28"
                : isSidebar
                ? "h-80 sm:h-96"
                : "h-36 sm:h-44"
            }`}
          />
          <div className="absolute bottom-2 end-2 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-xs text-[10px] text-white/90 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <span>زيارة الرابط</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </div>
        </a>
      )}

      {/* عرض سكريبت جوجل أدسنس أو HTML */}
      {ad.type === "GOOGLE_ADSENSE" && (
        <div className="min-h-[90px] flex items-center justify-center p-3 bg-[var(--surface-hover)]">
          {ad.scriptCode ? (
            <div dangerouslySetInnerHTML={{ __html: ad.scriptCode }} />
          ) : (
            <div className="text-xs text-[var(--text-muted)] py-4">
              مساحة إعلانية مخصصة لشركاء الوطن اليوم
            </div>
          )}
        </div>
      )}

      {ad.type === "HTML_SCRIPT" && ad.scriptCode && (
        <div
          className="p-2"
          dangerouslySetInnerHTML={{ __html: ad.scriptCode }}
        />
      )}
    </div>
  );
}
