import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { clearAuthCookies, getCurrentUser } from '@/lib/auth/auth-handler';

export async function POST(request: NextRequest) {
  try {
    // Get current user
    const user = await getCurrentUser(request);

    // Revoke all refresh tokens for this user if authenticated
    if (user) {
      await prisma.refreshToken.updateMany({
        where: { memberId: user.id },
        data: { isRevoked: true },
      });
    }

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Logged out successfully',
      },
      { status: 200 }
    );

    // Clear cookies
    clearAuthCookies(response);

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    
    // Still clear cookies even if there's an error
    const response = NextResponse.json(
      {
        success: true,
        message: 'Logged out successfully',
      },
      { status: 200 }
    );

    clearAuthCookies(response);
    return response;
  }
}
