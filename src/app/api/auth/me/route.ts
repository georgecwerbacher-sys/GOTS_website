import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/auth-handler';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Unauthorized',
            code: 'UNAUTHORIZED',
          },
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get current user error:', error);
    const err = error as Error & { code?: string };
    const msg = (err?.message || String(error)).toLowerCase();
    let message = 'Authentication check failed.';
    if (msg.includes('does not exist') || err?.code === 'P1014') {
      message = 'Database setup incomplete. Run migrations on your production database.';
    } else if (err?.code === 'P1001' || msg.includes('connection')) {
      message = 'Database connection failed. Check DATABASE_URL.';
    }
    return NextResponse.json(
      { success: false, error: { message, code: 'INTERNAL_ERROR' } },
      { status: 500 }
    );
  }
}
