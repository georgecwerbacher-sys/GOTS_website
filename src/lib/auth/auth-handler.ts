import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateTokens } from './jwt';
import { isValidEmail } from './password';

/**
 * Set authentication cookies
 */
export function setAuthCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
  rememberMe: boolean = false
) {
  const secure = process.env.NODE_ENV === 'production';
  const maxAge = rememberMe ? 90 * 24 * 60 * 60 : 30 * 24 * 60 * 60;

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60, // Always 24h for access token
    path: '/',
  });

  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure,
    sameSite: 'strict',
    maxAge,
    path: '/',
  });
}

/**
 * Clear authentication cookies
 */
export function clearAuthCookies(response: NextResponse) {
  response.cookies.set('accessToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  response.cookies.set('refreshToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
}

/**
 * Get current user from request
 */
export async function getCurrentUser(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) return null;

    // Verify token is valid by decoding it
    const { default: jwt } = await import('jsonwebtoken');
    const decoded = jwt.decode(accessToken) as any;

    if (!decoded || !decoded.sub) return null;

    const member = await prisma.member.findUnique({
      where: { id: decoded.sub },
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        role: true,
        avatarUrl: true,
        currentCharacterId: true,
        currentSceneId: true,
        progressPercentage: true,
      },
    });

    return member;
  } catch (error) {
    console.error('Failed to get current user:', error);
    return null;
  }
}

/**
 * Validate registration data
 */
export function validateRegistrationData(data: {
  email: string;
  username: string;
  password: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Email
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Invalid email address');
  }

  // Username
  if (!data.username || data.username.length < 3 || data.username.length > 20) {
    errors.push('Username must be 3-20 characters');
  }

  if (!/^[a-zA-Z0-9_]+$/.test(data.username)) {
    errors.push('Username can only contain letters, numbers, and underscores');
  }

  // Password
  if (!data.password || data.password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  const { isPasswordStrong } = require('./password');
  const { isStrong, errors: passwordErrors } = isPasswordStrong(data.password);
  if (!isStrong) {
    errors.push(...passwordErrors);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Check if email already exists
 */
export async function emailExists(email: string): Promise<boolean> {
  try {
    const member = await prisma.member.findUnique({
      where: { email: email.toLowerCase() },
    });
    return !!member;
  } catch (error) {
    console.error('Error checking email:', error);
    return false;
  }
}

/**
 * Check if username already exists
 */
export async function usernameExists(username: string): Promise<boolean> {
  try {
    const member = await prisma.member.findUnique({
      where: { username: username.toLowerCase() },
    });
    return !!member;
  } catch (error) {
    console.error('Error checking username:', error);
    return false;
  }
}

/**
 * Log login attempt
 */
export async function logLoginAttempt(
  memberId: string,
  successful: boolean,
  ipAddress?: string,
  userAgent?: string
) {
  try {
    await prisma.loginHistory.create({
      data: {
        memberId,
        successful,
        ipAddress,
        userAgent,
      },
    });

    // Update last_accessed if successful
    if (successful) {
      await prisma.member.update({
        where: { id: memberId },
        data: { lastAccessed: new Date() },
      });
    }
  } catch (error) {
    console.error('Error logging login attempt:', error);
  }
}
