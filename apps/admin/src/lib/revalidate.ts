/**
 * وحدة إعادة التحقق اللحظي من لوحة الإدارة (On-demand Web Cache Invalidation)
 */
export async function triggerWebRevalidation(params: {
  paths?: string[];
  sectionSlug?: string;
  isBreaking?: boolean;
}) {
  const siteUrl = process.env.SITE_URL || "http://localhost:3000";
  const token = process.env.REVALIDATE_TOKEN || "internal_cache_revalidate_token_change_me";

  try {
    const res = await fetch(`${siteUrl}/api/revalidate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-revalidate-token": token,
      },
      body: JSON.stringify(params),
      // لا ننتظر طويلاً حتى لا نعطل واجهة المحرر
      signal: AbortSignal.timeout(4000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.warn(`⚠️ On-demand revalidation returned status ${res.status}:`, errText);
      return false;
    }

    const data = await res.json().catch(() => ({}));
    console.log("⚡ On-demand revalidation succeeded:", data.revalidatedPaths);
    return true;
  } catch (err: any) {
    // عدم كسر عملية النشر في حال تعذر الوصول اللحظي لخادم الويب
    console.warn("⚠️ On-demand revalidation skipped or unreachable:", err?.message || err);
    return false;
  }
}

