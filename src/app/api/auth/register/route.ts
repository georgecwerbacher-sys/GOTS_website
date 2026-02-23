import { NextRequest, NextResponse } from 'next/server';

// Use Node.js runtime for Prisma (Edge can have DB connection issues)
export const runtime = 'nodejs';
import { prisma } from '@/lib/prisma';
import { generateTokens } from '@/lib/auth/jwt';
import { hashPassword } from '@/lib/auth/password';
import {
  setAuthCookies,
  validateRegistrationData,
  emailExists,
  usernameExists,
} from '@/lib/auth/auth-handler';

function getErrorMessage(error: unknown): string {
  const err = error as Error & { code?: string; meta?: unknown };
  const msg = err?.message || String(error);
  const code = err?.code;
  const str = msg.toLowerCase();

  if (
    code === 'P1014' ||
    str.includes('does not exist') ||
    str.includes('"members"') ||
    str.includes('"refresh_tokens"')
  ) {
    return 'Database setup incomplete. Run migrations on your production database.';
  }
  if (
    code === 'P1001' ||
    str.includes("can't reach database") ||
    str.includes('connection refused') ||
    str.includes('etimedout') ||
    str.includes('econnrefused')
  ) {
    return 'Database connection failed. Check DATABASE_URL and that your database is reachable.';
  }
  if (
    code === 'P2002' ||
    str.includes('unique constraint') ||
    str.includes('already exists')
  ) {
    return 'Email or username already in use. Try logging in or use different credentials.';
  }
  if (
    str.includes('pool') ||
    str.includes('connection limit') ||
    str.includes('too many clients')
  ) {
    return 'Database connection limit reached. Add ?connection_limit=1 to your DATABASE_URL for serverless.';
  }
  return 'Registration failed. Please try again or contact support.';
}

export async function POST(request: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: { message: 'Invalid request body' } },
        { status: 400 }
      );
    }
    const email = body.email as string | undefined;
    const username = body.username as string | undefined;
    const displayName = body.displayName as string | undefined;
    const password = body.password as string | undefined;
    const confirmPassword = body.confirmPassword as string | undefined;

    // Validate passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Passwords do not match',
            code: 'PASSWORD_MISMATCH',
            field: 'confirmPassword',
          },
        },
        { status: 400 }
      );
    }

    // Validate registration data
    const validation = validateRegistrationData({
      email,
      username,
      password,
    });

    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: validation.errors[0],
            code: 'VALIDATION_ERROR',
            details: validation.errors,
          },
        },
        { status: 400 }
      );
    }

    // Check if email exists
    const emailAlreadyExists = await emailExists(email);
    if (emailAlreadyExists) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Email already in use',
            code: 'EMAIL_EXISTS',
            field: 'email',
          },
        },
        { status: 409 }
      );
    }

    // Check if username exists
    const usernameAlreadyExists = await usernameExists(username);
    if (usernameAlreadyExists) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: 'Username already taken',
            code: 'USERNAME_EXISTS',
            field: 'username',
          },
        },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create member
    const member = await prisma.member.create({
      data: {
        userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        displayName: displayName || username,
        passwordHash,
        role: 'user',
      },
    });

    // Generate tokens
    const tokens = generateTokens(
      member.id,
      member.email,
      member.username,
      'user'
    );

    // Store refresh token
    const refreshTokenExpiry = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
    );

    await prisma.refreshToken.create({
      data: {
        memberId: member.id,
        token: tokens.refreshToken,
        expiresAt: refreshTokenExpiry,
      },
    });

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
        },
        message: 'Registration successful. Welcome to GOTS!',
      },
      { status: 201 }
    );

    // Set auth cookies
    setAuthCookies(response, tokens.accessToken, tokens.refreshToken, false);

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    const message = getErrorMessage(error);
    return NextResponse.json(
      {
        success: false,
        error: { message, code: 'INTERNAL_ERROR' },
      },
      { status: 500 }
    );
  }
}
