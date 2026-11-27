"use client";

import { useEffect, useRef } from "react";

export function ArticleViewTracker({ articleId }: { articleId: string }) {
  const sentRef = useRef(false);

  useEffect(() => {
    if (!articleId || sentRef.current) return;
    sentRef.current = true;
    fetch("/api/v1/articles/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId }),
    }).catch(() => {});
  }, [articleId]);

  return null;
}
