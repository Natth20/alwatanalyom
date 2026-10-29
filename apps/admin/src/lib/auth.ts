import { createHmac, randomBytes } from "node:crypto";
import { prisma, Role } from "@awt/db";

const AUTH_SECRET = process.env["AUTH_SECRET"] || "awt_default_secure_secret_key_change_in_production_32chars";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  twoFactorOn: boolean;
}

/**
 * إنشاء توكن جلسة مشفر
 */
export function createSessionToken(userId: string): string {
  const timestamp = Date.now().toString(36);
  const random = randomBytes(16).toString("hex");
  const payload = `${userId}.${timestamp}.${random}`;
  const signature = createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

/**
 * التحقق من صحة توكن الجلسة واستخراج معرف المستخدم
 */
export function verifySessionToken(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 4) return null;

    const [userId, timestamp, random, signature] = parts;
    const payload = `${userId}.${timestamp}.${random}`;
    const expectedSig = createHmac("sha256", AUTH_SECRET).update(payload).digest("hex");

    if (signature !== expectedSig) return null;

    // فحص انتهاء الصلاحية المطلقة بعد 12 ساعة
    const createdTime = parseInt(timestamp || "0", 36);
    if (Date.now() - createdTime > 12 * 60 * 60 * 1000) {
      return null;
    }

    return userId || null;
  } catch {
    return null;
  }
}

/**
 * جلب بيانات المستخدم للجلسة الحالية
 */
export async function getSessionUser(token?: string): Promise<SessionUser | null> {
  if (!token) return null;

  const userId = verifySessionToken(token);
  if (!userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId, active: true },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        twoFactorOn: true,
      },
    });

    return user;
  } catch {
    return null;
  }
}

/**
 * فحص صلاحيات المستخدم للأدوار المسموحة
 */
export function hasPermission(userRole: Role, allowedRoles: Role[]): boolean {
  if (userRole === "ADMIN") return true; // المدير يملك كافة الصلاحيات
  return allowedRoles.includes(userRole);
}
