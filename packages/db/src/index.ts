import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | null | undefined;
};

/**
 * إنشاء PrismaClient بشكل آمن — في بيئة Serverless قد يفشل التهيئة
 * إن غاب المحرك، فنلتقط الخطأ دون تعطل استيراد الوحدات.
 */
function buildSafeDatasourceUrl(): string | undefined {
  const raw = process.env["DATABASE_URL"];
  if (!raw) return undefined;
  try {
    const parsed = new URL(raw);
    const isProd = process.env["NODE_ENV"] === "production" || Boolean(process.env["VERCEL"]);
    if (isProd && !parsed.searchParams.has("connection_limit")) {
      parsed.searchParams.set("connection_limit", "5");
    }
    if (parsed.port === "6543" && !parsed.searchParams.has("pgbouncer")) {
      parsed.searchParams.set("pgbouncer", "true");
    }
    if (!parsed.searchParams.has("pool_timeout")) {
      parsed.searchParams.set("pool_timeout", "20");
    }
    return parsed.toString();
  } catch {
    return raw;
  }
}

function createSafePrismaClient(): PrismaClient | null {
  try {
    const safeUrl = buildSafeDatasourceUrl();
    return new PrismaClient({
      ...(safeUrl ? { datasources: { db: { url: safeUrl } } } : {}),
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
