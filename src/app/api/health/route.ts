import { NextResponse } from 'next/server';

/**
 * Health check endpoint for debugging production issues.
 * GET /api/health - Returns basic status (no DB dependency)
 * GET /api/health?db=1 - Tests database connectivity
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const checkDb = searchParams.get('db') === '1';

  const result: Record<string, unknown> = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasJwtSecret: !!process.env.JWT_SECRET,
      nodeEnv: process.env.NODE_ENV,
    },
  };

  if (checkDb) {
    try {
      const { prisma } = await import('@/lib/prisma');
      await prisma.$queryRaw`SELECT 1`;
      (result as Record<string, unknown>).database = 'connected';
    } catch (error) {
      (result as Record<string, unknown>).database = 'error';
      (result as Record<string, unknown>).databaseError = String(
        (error as Error)?.message || error
      );
      (result as Record<string, unknown>).status = 'db_error';
    }
  }

  return NextResponse.json(result);
}
