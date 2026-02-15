import jwt from 'jsonwebtoken';

export interface TokenPayload {
  sub: string;           // Member ID
  email: string;
  username: string;
  role: 'user' | 'admin';
  iat: number;
  exp: number;
  iss: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret-change-in-production';

/**
 * Generate JWT access and refresh tokens
 */
export function generateTokens(
  memberId: string,
  email: string,
  username: string,
  role: 'user' | 'admin' = 'user'
): TokenPair {
  const now = Math.floor(Date.now() / 1000);
  const accessExpiry = now + 24 * 60 * 60; // 24 hours
  const refreshExpiry = now + 30 * 24 * 60 * 60; // 30 days

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
    expiresIn: 24 * 60 * 60, // 24 hours in seconds
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
 * Decode token without verification (for reading payload)
 */
export function decodeToken(token: string): any {
  try {
    return jwt.decode(token);
  } catch {
    return null;
  }
}
