import { NextResponse } from "next/server";
import { prisma } from "@awt/db";

export async function GET() {
  let dbStatus = "OK";

  try {
    // اختبار بسيط للاتصال بقاعدة البيانات
    await prisma.$queryRaw`SELECT 1`;
  } catch (err: any) {
    dbStatus = `FAIL: ${err.message}`;
  }

  const isHealthy = dbStatus === "OK";

  return NextResponse.json(
    {
      status: isHealthy ? "OK" : "DEGRADED",
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus,
        webApp: "OK",
      },
    },
    { status: isHealthy ? 200 : 503 }
  );
}

