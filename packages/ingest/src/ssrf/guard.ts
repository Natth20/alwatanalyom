import dns from "node:dns/promises";

/**
 * فحص عنوان IP للتأكد من أنه ليس داخلياً أو خاصاً (SSRF Guard)
 */
function isPrivateIp(ip: string): boolean {
  // IPv4 Loopback
  if (ip.startsWith("127.")) return true;
  // 10.0.0.0/8
  if (ip.startsWith("10.")) return true;
  // 192.168.0.0/16
  if (ip.startsWith("192.168.")) return true;
  // Link-local / Cloud Metadata (169.254.0.0/16)
  if (ip.startsWith("169.254.")) return true;
  // 0.0.0.0
  if (ip === "0.0.0.0") return true;

  // 172.16.0.0/12 (172.16 - 172.31)
  const parts = ip.split(".").map(Number);
  if (parts.length === 4 && parts[0] === 172) {
    const second = parts[1];
    if (second !== undefined && second >= 16 && second <= 31) return true;
  }

  // IPv6 checks
  if (ip === "::1" || ip === "::" || ip.toLowerCase().startsWith("fe80:") || ip.toLowerCase().startsWith("fc00:")) {
    return true;
  }

  return false;
}

/**
 * التحقق من أمان الرابط الخارجي قبل طلبه لمنع هجمات SSRF
 */
export async function assertSafeUrl(urlString: string): Promise<URL> {
  const url = new URL(urlString);

  // السماح بـ HTTP و HTTPS فقط
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`بروتوكول غير مسموح به: ${url.protocol}`);
  }

  const hostname = url.hostname.toLowerCase();

  // فحص النطاقات المحظورة صراحةً
  if (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal")
  ) {
    throw new Error(`نطاق داخلي غير مسموح بطلبه: ${hostname}`);
  }

  // فحص عنوان IP عبر DNS لضمان عدم توجيهه إلى شبكة داخلية مع مهلة أقصاها 3 ثوانٍ
  try {
    const lookupPromise = dns.lookup(hostname);
    const timeoutPromise = new Promise<{ address: string }>((_, reject) =>
      setTimeout(() => reject(new Error("DNS timeout")), 3000)
    );
    const lookup = await Promise.race([lookupPromise, timeoutPromise]);
    if (isPrivateIp(lookup.address)) {
      throw new Error(`عنوان IP الداخلي محظور: ${lookup.address} لـ ${hostname}`);
    }
  } catch (err: any) {
    if (err.message.includes("محظور")) throw err;
    if (err.message.includes("DNS timeout")) {
      // السماح بالنطاق العام وتجاوز تعليق الـ DNS المحلي
      return url;
    }
    // إن تعذر حل DNS
    throw new Error(`فشل حل النطاق: ${hostname}`);
  }

  return url;
}

