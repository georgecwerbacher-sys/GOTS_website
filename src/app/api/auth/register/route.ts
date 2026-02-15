import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateTokens } from '@/lib/auth/jwt';
import { hashPassword } from '@/lib/auth/password';
import {
  setAuthCookies,
  validateRegistrationData,
  emailExists,
  usernameExists,
} from '@/lib/auth/auth-handler';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, username, displayName, password, confirmPassword } = body;

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
    return NextResponse.json(
      {
        success: false,
        error: {
          message: 'Internal server error',
          code: 'INTERNAL_ERROR',
        },
      },
      { status: 500 }
    );
  }
}
