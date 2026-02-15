import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateTokens, verifyRefreshToken, isTokenExpired } from '@/lib/auth/jwt';
import { setAuthCookies } from '@/lib/auth/auth-handler';

export async function POST(request: NextRequest) {
  try {
    // Get refresh token from cookies
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Refresh token not found',
            code: 'REFRESH_TOKEN_MISSING',
          },
        },
        { status: 401 }
      );
    }

    // Check if token is expired
    if (isTokenExpired(refreshToken)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Refresh token expired',
            code: 'TOKEN_EXPIRED',
          },
        },
        { status: 401 }
      );
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded || !decoded.sub) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Invalid refresh token',
            code: 'REFRESH_TOKEN_INVALID',
          },
        },
        { status: 401 }
      );
    }

    // Check if refresh token is revoked in database
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken || storedToken.isRevoked) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Refresh token has been revoked',
            code: 'REFRESH_TOKEN_REVOKED',
          },
        },
        { status: 401 }
      );
    }

    // Get member details
    const member = await prisma.member.findUnique({
      where: { id: decoded.sub },
    });

    if (!member || !member.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Member not found or inactive',
            code: 'MEMBER_INVALID',
          },
        },
        { status: 401 }
      );
    }

    // Generate new tokens
    const newTokens = generateTokens(
      member.id,
      member.email,
      member.username,
      (member.role as 'user' | 'admin') || 'user'
    );

    // Update refresh token in database
    await prisma.refreshToken.update({
      where: { token: refreshToken },
      data: { token: newTokens.refreshToken },
    });

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        data: {
          token: newTokens.accessToken,
          expiresIn: newTokens.expiresIn,
        },
        message: 'Token refreshed successfully',
      },
      { status: 200 }
    );

    // Set new cookies
    setAuthCookies(response, newTokens.accessToken, newTokens.refreshToken, false);

    return response;
  } catch (error) {
    console.error('Refresh error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          message: 'Failed to refresh token',
          code: 'REFRESH_FAILED',
        },
      },
      { status: 500 }
    );
  }
}
