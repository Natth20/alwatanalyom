/**
 * استخراج الـ Trigrams (ثلاثيات الحروف) من النص
 */
export function extractTrigrams(text: string): Set<string> {
  const padded = `  ${text} `;
  const trigrams = new Set<string>();
  for (let i = 0; i <= padded.length - 3; i++) {
    trigrams.add(padded.slice(i, i + 3));
  }
  return trigrams;
}

/**
 * حساب معامل التشابه Trigram Similarity بين نصين (0.0 إلى 1.0)
 * يعادل دالة similarity() في إضافة pg_trgm
 */
export function trigramSimilarity(textA: string, textB: string): number {
  if (!textA || !textB) return 0;
  if (textA === textB) return 1;

  const setA = extractTrigrams(textA);
  const setB = extractTrigrams(textB);

  let intersection = 0;
  for (const tri of setA) {
    if (setB.has(tri)) {
      intersection++;
    }
  }

  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

