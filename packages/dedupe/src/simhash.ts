import { createHash } from "node:crypto";

/**
 * حساب hash 64-bit لكلمة أو رمز
 */
function hash64(token: string): bigint {
  const md5 = createHash("md5").update(token).digest();
  // أخذ أول 8 بايتات (64 بت) كـ BigInt غير مسبوق بإشارة
  return md5.readBigUInt64BE(0);
}

/**
 * حساب بصمة Simhash بطول 64-bit لنص عربي مطبّع
 */
export function computeSimhash(text: string): bigint {
  if (!text.trim()) return 0n;

  const words = text.split(/\s+/).filter((t) => t.length > 1);
  if (words.length === 0) return 0n;

  // توليد الكلمات وثنائيات الكلمات (Bigrams) لحساسية أعلى في النصوص القصيرة
  const tokens = [...words];
  for (let i = 0; i < words.length - 1; i++) {
    tokens.push(`${words[i]}_${words[i + 1]}`);
  }

  // مصفوفة تراكمية لـ 64 بتاً
  const bitWeights = new Array<number>(64).fill(0);

  for (const token of tokens) {
    const h = hash64(token);
    for (let i = 0; i < 64; i++) {
      const bit = (h >> BigInt(63 - i)) & 1n;
      if (bit === 1n) {
        bitWeights[i] = (bitWeights[i] ?? 0) + 1;
      } else {
        bitWeights[i] = (bitWeights[i] ?? 0) - 1;
      }
    }
  }

  let fingerprint = 0n;
  for (let i = 0; i < 64; i++) {
    if ((bitWeights[i] ?? 0) > 0) {
      fingerprint |= 1n << BigInt(63 - i);
    }
  }

  return fingerprint;
}

/**
 * حساب مسافة هامنغ (Hamming Distance) بين بصمتي Simhash
 * تشير القيمة 0-3 بتات إلى احتمال كبير جداً لتطابق المحتوى
 */
export function hammingDistance(a: bigint, b: bigint): number {
  let xor = a ^ b;
  let dist = 0;
  while (xor > 0n) {
    dist += Number(xor & 1n);
    xor >>= 1n;
  }
  return dist;
}

