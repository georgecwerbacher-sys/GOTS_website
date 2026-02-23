import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateTokens } from '@/lib/auth/jwt';
import { comparePassword } from '@/lib/auth/password';
import { setAuthCookies, logLoginAttempt } from '@/lib/auth/auth-handler';

// Helper function to get client IP
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || 'unknown';
  return ip;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;
    const clientIp = getClientIp(request);
    const userAgent = request.headers.get('user-agent') || '';

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Email and password required',
            code: 'INVALID_REQUEST',
          },
        },
        { status: 400 }
      );
    }

    // Find member by email
    const member = await prisma.member.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!member) {
      // Log failed attempt
      await logLoginAttempt(
        'unknown',
        false,
        clientIp,
        userAgent
      );

      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Invalid email or password',
            code: 'INVALID_CREDENTIALS',
          },
        },
        { status: 401 }
      );
    }

    // Check if account is active
    if (!member.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Account is inactive',
            code: 'ACCOUNT_INACTIVE',
          },
        },
        { status: 403 }
      );
    }

    // Verify password
    const passwordValid = await comparePassword(password, member.passwordHash);

    if (!passwordValid) {
      // Log failed attempt
      await logLoginAttempt(
        member.id,
        false,
        clientIp,
        userAgent
      );

      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Invalid email or password',
            code: 'INVALID_CREDENTIALS',
          },
        },
        { status: 401 }
      );
    }

    // Generate tokens
    const tokens = generateTokens(
      member.id,
      member.email,
      member.username,
      (member.role as 'user' | 'admin') || 'user'
    );

    // Store refresh token in database
    const refreshTokenExpiry = new Date(
      Date.now() +
        (rememberMe ? 90 * 24 * 60 * 60 * 1000 : 30 * 24 * 60 * 60 * 1000)
    );

    await prisma.refreshToken.create({
      data: {
        memberId: member.id,
        token: tokens.refreshToken,
        expiresAt: refreshTokenExpiry,
      },
    });

    // Log successful login
    await logLoginAttempt(
      member.id,
      true,
      clientIp,
      userAgent
    );

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        data: {
          id: member.id,
          email: member.email,
          username: member.username,
          displayName: member.displayName,
          token: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresIn: tokens.expiresIn,
          currentCharacterId: member.currentCharacterId,
          currentSceneId: member.currentSceneId,
        },
        message: 'Login successful',
      },
      { status: 200 }
    );

    // Set auth cookies
    setAuthCookies(response, tokens.accessToken, tokens.refreshToken, rememberMe);

    return response;
  } catch (error) {
    console.error('Login error:', error);
    const errStr = String(error);
    const isTableMissing =
      errStr.includes('does not exist') ||
      errStr.includes('"members"') ||
      (error && typeof error === 'object' && (error as { code?: string }).code === 'P1014');
    const isDbConnection =
      errStr.includes('P1001') ||
      errStr.includes("Can't reach database") ||
      errStr.includes('connect ECONNREFUSED');

    let message = 'Something went wrong. Please try again.';
    if (isTableMissing) {
      message = 'Database setup incomplete. Please run: npx prisma db push';
    } else if (isDbConnection) {
      message = 'Database connection failed. Please ensure PostgreSQL is running.';
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          message,
          code: 'INTERNAL_ERROR',
        },
      },
      { status: 500 }
    );
  }
}