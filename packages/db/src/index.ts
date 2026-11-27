import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | null | undefined;
};

/**
 * إنشاء PrismaClient بشكل آمن — في بيئة Serverless قد يفشل التهيئة
 * إن غاب المحرك، فنلتقط الخطأ دون تعطل استيراد الوحدات.
 */
function createSafePrismaClient(): PrismaClient | null {
  try {
    return new PrismaClient({
      log: process.env["NODE_ENV"] === "development" ? ["query", "error", "warn"] : ["error"],
    });
  } catch (err) {
    console.warn(
      "[DB] PrismaClient init failed — serverless engine unavailable. Using resilient fallback.",
      (err as Error)?.message ?? err
    );
    return null;
  }
}

function createUnavailableProxy(): PrismaClient {
  const unavailableError = () =>
    Promise.reject(new Error("[DB] PrismaClient unavailable in current runtime"));

  const handler: ProxyHandler<any> = {
    get(_target, prop) {
      if (prop === "then" || prop === Symbol.toStringTag) return undefined;
      if (prop === "$connect" || prop === "$disconnect") {
        return () => Promise.resolve();
      }
      if (typeof prop === "string" && prop.startsWith("$")) {
        return unavailableError;
      }
      return new Proxy(unavailableError, handler);
    },
    apply() {
      return unavailableError();
    },
  };

  return new Proxy(function () {}, handler) as unknown as PrismaClient;
}

const realPrisma: PrismaClient | null =
  globalForPrisma.prisma !== undefined
    ? globalForPrisma.prisma
    : (() => {
        const client = createSafePrismaClient();
        globalForPrisma.prisma = client;
        return client;
      })();

export function isPrismaAvailable(): boolean {
  return realPrisma !== null;
}

export const prisma: PrismaClient = realPrisma ?? createUnavailableProxy();

export * from "@prisma/client";
