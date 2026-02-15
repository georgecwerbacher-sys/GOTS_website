# GOTS Website - Auth Middleware & Utilities

## 📋 Overview

Complete backend authentication infrastructure including JWT token generation/verification, middleware, context providers, and utility functions.

---

## 🔑 JWT Token Utilities (`lib/auth/jwt.ts`)

```typescript
import jwt from 'jsonwebtoken';

interface TokenPayload {
  sub: string;           // Member ID
  email: string;
  username: string;
  role: 'user' | 'admin';
  iat: number;
  exp: number;
  iss: string;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh-secret';

/**
 * Generate JWT access and refresh tokens
 */
export function generateTokens(memberId: string, email: string, username: string, role: 'user' | 'admin' = 'user'): TokenPair {
  const now = Math.floor(Date.now() / 1000);
  const accessExpiry = now + (24 * 60 * 60); // 24 hours
  const refreshExpiry = now + (30 * 24 * 60 * 60); // 30 days

  const accessPayload: TokenPayload = {
    sub: memberId,
    email,
    username,
    role,
    iat: now,
    exp: accessExpiry,
    iss: 'gots.example.com',
  };

  const refreshPayload = {
    sub: memberId,
    iat: now,
    exp: refreshExpiry,
    iss: 'gots.example.com',
    type: 'refresh',
  };

  const accessToken = jwt.sign(accessPayload, JWT_SECRET);
  const refreshToken = jwt.sign(refreshPayload, REFRESH_SECRET);

  return {
    accessToken,
    refreshToken,
    expiresIn: 24 * 60 * 60,
  };
}

/**
 * Verify and decode JWT access token
 */
export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Verify refresh token
 */
export function verifyRefreshToken(token: string): any | null {
  try {
    const decoded = jwt.verify(token, REFRESH_SECRET);
    return decoded;
  } catch (error) {
    console.error('Refresh token verification failed:', error);
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.decode(token) as any;
    if (!decoded || !decoded.exp) return true;
    
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp <= now;
  } catch {
    return true;
  }
}

/**
 * Get time until token expires (in seconds)
 */
export function getTokenExpiryTime(token: string): number {
  try {
    const decoded = jwt.decode(token) as any;
    if (!decoded || !decoded.exp) return 0;
    
    const now = Math.floor(Date.now() / 1000);
    return Math.max(0, decoded.exp - now);
  } catch {
    return 0;
  }
}

/**
 * Decode token without verification
 */
export function decodeToken(token: string): any {
  try {
    return jwt.decode(token);
  } catch {
    return null;
  }
}
```

---

## 🔐 Password Utilities (`lib/auth/password.ts`)

```typescript
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

/**
 * Hash password for storage
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    console.error('Password hashing failed:', error);
    throw new Error('Failed to hash password');
  }
}

/**
 * Compare password with hash
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error('Password comparison failed:', error);
    return false;
  }
}

/**
 * Validate password strength
 */
export function isPasswordStrong(password: string): {
  isStrong: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain number');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain special character');
  }

  return {
    isStrong: errors.length === 0,
    errors,
  };
}

/**
 * Generate random password
 */
export function generateRandomPassword(length: number = 16): string {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = '';

  // Ensure all required character types
  password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[
    Math.floor(Math.random() * 26)
  ];
  password += 'abcdefghijklmnopqrstuvwxyz'[
    Math.floor(Math.random() * 26)
  ];
  password += '0123456789'[Math.floor(Math.random() * 10)];
  password += '!@#$%^&*()'[Math.floor(Math.random() * 10)];

  // Fill rest
  for (let i = password.length; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }

  // Shuffle
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}
```

---

## 🛡️ Authentication Middleware (`lib/middleware.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, verifyRefreshToken } from '@/lib/auth/jwt';

/**
 * Protected routes require authentication
 */
const PROTECTED_ROUTES = [
  '/profile',
  '/story',
  '/api/progress',
  '/api/members/profile',
];

/**
 * Public routes anyone can access
 */
const PUBLIC_ROUTES = [
  '/',
  '/auth/login',
  '/auth/register',
  '/characters',
  '/api/auth/login',
  '/api/auth/register',
  '/api/characters',
  '/api/scenes',
  '/api/choices',
];

/**
 * Authentication middleware
 */
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for static files
  if (path.match(/\.(jpg|jpeg|png|gif|webp|svg|css|js)$/)) {
    return NextResponse.next();
  }

  // Get tokens from cookies
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  // Check if route is protected
  const isProtected = PROTECTED_ROUTES.some(route =>
    path.startsWith(route)
  );

  // Check if route is public
  const isPublic = PUBLIC_ROUTES.some(route =>
    path === route || path.startsWith(route)
  );

  // If public route, allow access
  if (isPublic && !isProtected) {
    return NextResponse.next();
  }

  // If protected route, verify authentication
  if (isProtected) {
    // Check access token
    if (accessToken && verifyAccessToken(accessToken)) {
      return NextResponse.next();
    }

    // Try to refresh with refresh token
    if (refreshToken && verifyRefreshToken(refreshToken)) {
      return NextResponse.next();
    }

    // No valid tokens, redirect to login
    if (path.startsWith('/api')) {
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
    } else {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
```

---

## 🔌 Auth API Handler Utils (`lib/auth/auth-handler.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateTokens, verifyRefreshToken } from './jwt';
import { hashPassword, comparePassword } from './password';

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
    maxAge: 24 * 60 * 60,
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
  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) return null;

  try {
    const { sub: memberId } = require('jsonwebtoken').verify(
      accessToken,
      process.env.JWT_SECRET
    );

    const member = await prisma.member.findUnique({
      where: { id: memberId },
    });

    return member;
  } catch {
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

  const { isStrong, errors: passwordErrors } = require('./password').isPasswordStrong(data.password);
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
  const member = await prisma.member.findUnique({
    where: { email: email.toLowerCase() },
  });
  return !!member;
}

/**
 * Check if username already exists
 */
export async function usernameExists(username: string): Promise<boolean> {
  const member = await prisma.member.findUnique({
    where: { username: username.toLowerCase() },
  });
  return !!member;
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
  await prisma.loginHistory.create({
    data: {
      memberId,
      successful,
      ipAddress,
      userAgent,
    },
  });

  if (successful) {
    await prisma.member.update({
      where: { id: memberId },
      data: { lastAccessed: new Date() },
    });
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

---

## 🎣 Auth Context Provider (`context/AuthContext.tsx`)

```typescript
'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api_client';

interface AuthContextType {
  isAuthenticated: boolean;
  member: any | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: any) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [member, setMember] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  async function checkAuthentication() {
    try {
      const response = await apiClient.auth.getMe();
      if (response.success) {
        setMember(response.data);
      }
    } catch (error) {
      // User not authenticated
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.auth.login({
        email,
        password,
      });

      if (response.success) {
        setMember(response.data.user);
      } else {
        setError(
          response.error?.message || 'Login failed'
        );
        throw new Error(response.error?.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    setLoading(true);

    try {
      await apiClient.auth.logout();
      setMember(null);
      router.push('/');
    } catch (error) {
      setError('Logout failed');
    } finally {
      setLoading(false);
    }
  }

  async function register(data: any) {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.auth.register(data);

      if (response.success) {
        setMember(response.data.user);
      } else {
        setError(
          response.error?.message || 'Registration failed'
        );
        throw new Error(response.error?.message);
      }
    } finally {
      setLoading(false);
    }
  }

  function clearError() {
    setError(null);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!member,
        member,
        loading,
        error,
        login,
        logout,
        register,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

---

## 🛡️ Protected Route Wrapper (`components/shared/AuthGuard.tsx`)

```typescript
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [mounted, loading, isAuthenticated, router]);

  if (!mounted || loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-center py-12">Redirecting...</div>;
  }

  return <>{children}</>;
}
```

---

## 🛠️ Environment Variables (`.env.local`)

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/gots"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production"

# API
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api"

# Auth Config
AUTH_COOKIE_SECURE="false"  # true in production
AUTH_COOKIE_SAME_SITE="strict"
```

---

## 📋 Checklist: Auth Setup

- [ ] Create JWT utility functions
- [ ] Create password hashing utilities
- [ ] Set up authentication middleware
- [ ] Create login API route
- [ ] Create register API route
- [ ] Create logout API route
- [ ] Create refresh token API route
- [ ] Create `/api/auth/me` endpoint
- [ ] Set up AuthContext provider
- [ ] Create LoginForm component
- [ ] Create RegisterForm component
- [ ] Create auth layout
- [ ] Create AuthGuard component
- [ ] Add environment variables
- [ ] Test login flow
- [ ] Test registration flow
- [ ] Test logout flow
- [ ] Test token refresh
- [ ] Add rate limiting
- [ ] Add login history logging

---

## 🚀 Implementation Order

1. Database schema & Prisma migrations
2. JWT utilities
3. Password utilities
4. Middleware setup
5. Auth API routes
6. AuthContext provider
7. UI Components (Login/Register forms)
8. Auth pages
9. Protected routes with AuthGuard
10. Test complete flow

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-20 | Initial auth middleware and utilities documentation |
