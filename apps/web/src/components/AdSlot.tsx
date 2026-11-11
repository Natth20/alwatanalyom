"use client";

import { useEffect, useRef } from "react";



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
  position: string;
  className?: string;
}

export function AdSlot({ campaign, position, className = "" }: AdSlotProps) {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!campaign?.id || trackedRef.current) return;
    trackedRef.current = true;

    // تسجيل ظهور الإعلان (Impression)
    fetch("/api/v1/ads/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: campaign.id, event: "impression" }),
    }).catch(() => {});
  }, [campaign?.id]);

  if (!campaign) {
    return null;
  }

  const handleAdClick = () => {
    if (!campaign?.id) return;
    fetch("/api/v1/ads/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: campaign.id, event: "click" }),
    }).catch(() => {});
  };

  return (
    <div
      data-ad-position={position}
      className={`relative mx-auto my-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-center transition-all ${className}`}
    >
      <div className="absolute top-1.5 left-2 z-10 rounded-sm bg-slate-950/60 px-1.5 py-0.5 text-[9px] font-bold text-slate-300 backdrop-blur-xs">
        إعلان ممول
      </div>

      {campaign.type === "CUSTOM_BANNER" && campaign.imageUrl && (
        <a
          href={campaign.targetUrl || "#"}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleAdClick}
          className="group block"
        >
          <img
            src={campaign.imageUrl}
            alt={campaign.altText || campaign.name}
            className="w-full h-auto max-h-[160px] sm:max-h-[220px] object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />
        </a>
      )}

      {campaign.type === "GOOGLE_ADSENSE" && (
        <div className="min-h-[90px] flex items-center justify-center p-2 bg-[var(--surface-hover)]">
          {campaign.scriptCode ? (
            <div dangerouslySetInnerHTML={{ __html: campaign.scriptCode }} />
          ) : (
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          )}
        </div>
      )}

      {campaign.type === "HTML_SCRIPT" && campaign.scriptCode && (
        <div
          className="p-2"
          dangerouslySetInnerHTML={{ __html: campaign.scriptCode }}
        />
      )}
    </div>
  );
}

