import { NextResponse } from "next/server";
import { prisma } from "@awt/db";
import { isMockDataAllowed } from "@awt/shared";

export async function GET() {
  let dbStatus = "OK";
  let dbDetail: string | undefined;

  if (!prisma) {
    dbStatus = isMockDataAllowed() ? "STANDBY_MOCK" : "FAIL: PrismaClient unavailable";
    dbDetail = "PrismaClient initialized as null";
  } else {
    try {
      await prisma.$queryRaw`SELECT 1`;
    } catch (err: any) {
      dbDetail = err?.message || String(err);
      dbStatus = isMockDataAllowed() ? "STANDBY_MOCK" : `FAIL: ${dbDetail}`;
    }
  }

  const isHealthy = dbStatus === "OK" || dbStatus === "STANDBY_MOCK";

  return NextResponse.json(
    {
      status: isHealthy ? "OK" : "DEGRADED",
      timestamp: new Date().toISOString(),
      services: {
        database: dbStatus,
        ...(dbDetail ? { databaseDetail: dbDetail } : {}),
        webApp: "OK",
      },
    },
    { status: isHealthy ? 200 : 503 }
  );
}
