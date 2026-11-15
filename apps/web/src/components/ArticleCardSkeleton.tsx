interface Props {
  variant?: "hero" | "medium" | "compact" | "text-only";
}

export function ArticleCardSkeleton({ variant = "medium" }: Props) {
  // 1. هيكل المادة البطلة (Hero Skeleton)
  if (variant === "hero") {
    return (
      <div
        role="status"
        aria-label="جارٍ تحميل المادة الصحفية..."
        className="rounded-3xl border border-[var(--border-card)] bg-[var(--surface-card)] p-6 md:p-8 animate-pulse space-y-4"
      >
        <div className="flex items-center gap-2">
          <div className="h-6 w-20 bg-stone-300 dark:bg-stone-800 rounded-full" />
          <div className="h-6 w-28 bg-stone-200 dark:bg-stone-800/80 rounded-md" />
          <div className="h-4 w-16 bg-stone-200 dark:bg-stone-800/60 rounded ms-auto" />
        </div>

        <div className="w-full aspect-16/9 bg-stone-200 dark:bg-stone-800 rounded-2xl" />

        <div className="space-y-2 pt-2">
          <div className="h-8 w-4/5 bg-stone-300 dark:bg-stone-800 rounded-lg" />
          <div className="h-8 w-3/5 bg-stone-300 dark:bg-stone-800 rounded-lg" />
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="h-4 w-full bg-stone-200 dark:bg-stone-800/70 rounded" />
          <div className="h-4 w-2/3 bg-stone-200 dark:bg-stone-800/70 rounded" />
        </div>

        <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
          <div className="h-4 w-36 bg-stone-200 dark:bg-stone-800/60 rounded" />
          <div className="h-8 w-28 bg-stone-200 dark:bg-stone-800 rounded-xl" />
        </div>
      </div>
    );
  }

  // 2. هيكل القوائم السريعة (Compact Skeleton)
  if (variant === "compact") {
    return (
      <div
        role="status"
        aria-label="جارٍ تحميل المادة..."
        className="py-3.5 border-b border-[var(--border)] last:border-none flex items-start justify-between gap-3 animate-pulse"
      >
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="h-4 w-14 bg-stone-200 dark:bg-stone-800 rounded" />
            <div className="h-4 w-20 bg-stone-200 dark:bg-stone-800/70 rounded" />
          </div>
          <div className="h-4 w-full bg-stone-300 dark:bg-stone-800 rounded" />
          <div className="h-4 w-3/4 bg-stone-300 dark:bg-stone-800 rounded" />
        </div>

        <div className="w-20 h-20 bg-stone-200 dark:bg-stone-800 rounded-xl shrink-0" />
      </div>
    );
  }

  // 3. هيكل البطاقة القياسية المتوسطة (Medium Skeleton)
  return (
    <div
      role="status"
      aria-label="جارٍ تحميل المادة الصحفية..."
      className="rounded-2xl border border-[var(--border-card)] bg-[var(--surface-card)] p-4 md:p-5 animate-pulse space-y-3"
    >
      <div className="w-full aspect-16/9 bg-stone-200 dark:bg-stone-800 rounded-xl" />

      <div className="flex items-center gap-2">
        <div className="h-5 w-16 bg-stone-300 dark:bg-stone-800 rounded-full" />
        <div className="h-4 w-20 bg-stone-200 dark:bg-stone-800/60 rounded" />
      </div>

      <div className="space-y-2">
        <div className="h-5 w-full bg-stone-300 dark:bg-stone-800 rounded" />
        <div className="h-5 w-4/5 bg-stone-300 dark:bg-stone-800 rounded" />
      </div>

      <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
        <div className="h-4 w-24 bg-stone-200 dark:bg-stone-800/60 rounded" />
        <div className="h-4 w-12 bg-stone-200 dark:bg-stone-800/60 rounded" />
      </div>
    </div>
  );
}
