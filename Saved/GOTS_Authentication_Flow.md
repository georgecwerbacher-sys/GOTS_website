# GOTS Website - Authentication Flow Document

## 📋 Overview

Complete authentication system for GOTS including login, registration, logout, JWT token management, and protected routes. Implements optional login with guest session support.

---

## 🎯 Authentication Strategy

### Option: Login Optional (Recommended for GOTS)

**Benefits:**
- ✅ Lower friction - users jump right into story
- ✅ Better engagement - hook on content first
- ✅ Higher conversion - soft prompts for signup
- ✅ Guest sessions - track progress client-side before login

**Flow:**
```
Visitor arrives on homepage
    ↓
"Begin Your Journey" (no login required)
    ↓
Character selection (guest mode)
    ↓
Read scenes (guest progress tracked locally)
    ↓
After N scenes OR on profile page:
"Save your progress with a free account?"
    ↓
Login/Register (merge guest session)
```

---

## 🔑 Authentication Methods

### Supported Auth Systems

**Option 1: Custom JWT (Recommended for learning/control)**
- Store credentials in database (hashed bcrypt)
- Issue JWT tokens on login
- Tokens valid for 24 hours
- Refresh tokens for longer sessions
- Stored in httpOnly cookies

**Option 2: Third-Party (Production-ready)**
- Auth0, Firebase, NextAuth.js
- Outsource complexity to third party
- Social login support
- Better security by default

**This document uses JWT approach** (can be adapted for third-party)

---

## 🏗️ Auth Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                       │
└─────────────────────────────────────────────────────────────┘

Homepage
    ↓
┌───────────────────────────┐
│  Check: isAuthenticated?  │
└─────────────┬─────────────┘
              │
       ┌──────┴──────┐
       ↓             ↓
    [YES]          [NO]
       │             │
       │        Show Login/Register
       │        Buttons/Prompts
       │             ↓
       │        Click "Begin Journey"
       │             ↓
       │        ┌──────────────────┐
       │        │  /auth/login     │
       │        │  Login Form      │
       │        └──────┬───────────┘
       │               ↓
       │        Submit credentials
       │               ↓
       │        POST /api/auth/login
       │               ↓
       │        ┌──────────────────────┐
       │        │ Validate credentials │
       │        │ Hash password match? │
       │        │ Return JWT token     │
       │        └──────┬───────────────┘
       │               ↓
       │        Set httpOnly cookie
       │               ↓
       ├───────────────┤
       ↓
┌──────────────────────────────┐
│  Authenticated User          │
│  ✓ Can read stories          │
│  ✓ Progress saved to DB      │
│  ✓ Can view profile          │
└──────────────────────────────┘
```

---

## 📊 Authentication Database Schema

### Auth Tables

```sql
-- Members table (existing, extended for auth)
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(500),
  role VARCHAR(50) DEFAULT 'user', -- 'user' or 'admin'
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  email_verified_at TIMESTAMP,
  current_character_id UUID,
  current_scene_id UUID,
  progress_percentage INT DEFAULT 0,
  total_scenes_visited INT DEFAULT 0,
  total_reading_time_seconds INT DEFAULT 0,
  favorite_character_id UUID,
  last_accessed TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (current_character_id) REFERENCES characters(id),
  FOREIGN KEY (current_scene_id) REFERENCES scenes(id),
  FOREIGN KEY (favorite_character_id) REFERENCES characters(id)
);

-- Refresh tokens table (for persistent login)
CREATE TABLE refresh_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL,
  token VARCHAR(500) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  is_revoked BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

-- Login history (optional, for audit trail)
CREATE TABLE login_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  successful BOOLEAN,
  login_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE
);

CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_members_username ON members(username);
CREATE INDEX idx_refresh_tokens_member ON refresh_tokens(member_id);
CREATE INDEX idx_login_history_member ON login_history(member_id);
```

### Prisma Schema Extension

```prisma
model Member {
  id                    String    @id @default(cuid())
  userId                String    @unique
  email                 String    @unique
  username              String    @unique
  passwordHash          String
  displayName           String?
  bio                   String?   @db.Text
  avatarUrl             String?
  role                  String    @default("user") // "user" | "admin"
  isActive              Boolean   @default(true)
  emailVerified         Boolean   @default(false)
  emailVerifiedAt       DateTime?
  
  currentCharacterId    String?
  currentCharacter      Character? @relation(fields: [currentCharacterId], references: [id])
  currentSceneId        String?
  currentScene          Scene?    @relation(fields: [currentSceneId], references: [id])
  progressPercentage    Int       @default(0)
  totalScenesVisited    Int       @default(0)
  totalReadingSeconds   Int       @default(0)
  favoriteCharacterId   String?
  favoriteCharacter     Character? @relation("FavoriteCharacter", fields: [favoriteCharacterId], references: [id])
  
  lastAccessed          DateTime?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  
  visitedScenes         VisitedScene[]
  refreshTokens         RefreshToken[]
  loginHistory          LoginHistory[]
  
  @@index([email])
  @@index([username])
}

model RefreshToken {
  id                String    @id @default(cuid())
  memberId          String
  member            Member    @relation(fields: [memberId], references: [id], onDelete: Cascade)
  token             String    @unique
  expiresAt         DateTime
  isRevoked         Boolean   @default(false)
  createdAt         DateTime  @default(now())
  
  @@index([memberId])
}

model LoginHistory {
  id                String    @id @default(cuid())
  memberId          String
  member            Member    @relation(fields: [memberId], references: [id], onDelete: Cascade)
  ipAddress         String?
  userAgent         String?   @db.Text
  successful        Boolean
  loginAt           DateTime  @default(now())
  
  @@index([memberId])
}
```

---

## 🔐 JWT Token Structure

### Access Token (24 hours)
```typescript
{
  sub: "member-123",           // Member ID
  email: "user@example.com",
  username: "username",
  role: "user",                // "user" or "admin"
  iat: 1705756800,             // Issued at
  exp: 1705843200,             // Expires in 24 hours
  iss: "gots.example.com"      // Issuer
}
```

### Refresh Token (30 days)
- Stored in database
- Used to get new access token
- Can be revoked (logout)
- httpOnly cookie only

---

## 📡 API Endpoints

### POST /api/auth/register
**Create new user account**

```typescript
// Request
POST /api/auth/register
{
  email: "newuser@example.com",
  username: "newuser",
  displayName: "New User",
  password: "SecurePassword123!",
  confirmPassword: "SecurePassword123!"
}

// Response (201 Created)
{
  success: true,
  data: {
    id: "member-999",
    email: "newuser@example.com",
    username: "newuser",
    displayName: "New User",
    token: "eyJhbGciOiJIUzI1NiIs...",
    refreshToken: "rt_eyJhbGciOiJIUzI1NiIs...",
    expiresIn: 86400
  },
  message: "Registration successful. Welcome to GOTS!"
}

// Error (400 Bad Request)
{
  success: false,
  error: {
    message: "Email already in use",
    code: "EMAIL_EXISTS",
    field: "email"
  }
}
```

**Validation:**
- Email: valid format, unique, not already registered
- Username: 3-20 chars, alphanumeric + underscore, unique
- Password: minimum 8 chars, uppercase, lowercase, number, special char
- Display Name: optional, max 255 chars
- Passwords match

**On Success:**
- Hash password with bcrypt
- Create member in database
- Generate JWT access token
- Generate refresh token
- Set httpOnly cookie
- Return tokens to client
- Redirect to character selection

---

### POST /api/auth/login
**Authenticate existing user**

```typescript
// Request
POST /api/auth/login
{
  email: "user@example.com",
  password: "SecurePassword123!",
  rememberMe: true  // optional, extends refresh token to 90 days
}

// Response (200 OK)
{
  success: true,
  data: {
    id: "member-123",
    email: "user@example.com",
    username: "aragorn_fan",
    displayName: "Aragorn Fan",
    token: "eyJhbGciOiJIUzI1NiIs...",
    refreshToken: "rt_eyJhbGciOiJIUzI1NiIs...",
    expiresIn: 86400,
    currentCharacterId: "char-123",
    currentSceneId: "scene-456"
  },
  message: "Login successful"
}

// Error (401 Unauthorized)
{
  success: false,
  error: {
    message: "Invalid email or password",
    code: "INVALID_CREDENTIALS"
  }
}
```

**Validation:**
- Email/password combo valid
- Member account is active
- Log login attempt to database

**On Success:**
- Generate JWT tokens
- Update last_accessed timestamp
- Set httpOnly cookies
- Merge any guest session data
- Return current position (character/scene)

---

### POST /api/auth/logout
**End user session**

```typescript
// Request
POST /api/auth/logout
Authorization: Bearer <token>

// Response (200 OK)
{
  success: true,
  message: "Logged out successfully"
}
```

**On Logout:**
- Revoke refresh token in database
- Clear httpOnly cookies
- Redirect to homepage

---

### POST /api/auth/refresh
**Get new access token using refresh token**

```typescript
// Request
POST /api/auth/refresh
(Uses httpOnly cookie automatically)

// Response (200 OK)
{
  success: true,
  data: {
    token: "eyJhbGciOiJIUzI1NiIs...",
    expiresIn: 86400
  }
}

// Error (401 Unauthorized)
{
  success: false,
  error: {
    message: "Refresh token expired or invalid",
    code: "REFRESH_TOKEN_INVALID"
  }
}
```

---

### GET /api/auth/me
**Get current authenticated user**

```typescript
// Request
GET /api/auth/me
Authorization: Bearer <token>

// Response (200 OK)
{
  success: true,
  data: {
    id: "member-123",
    email: "user@example.com",
    username: "aragorn_fan",
    displayName: "Aragorn Fan",
    role: "user",
    avatarUrl: "https://...",
    currentCharacterId: "char-123",
    currentSceneId: "scene-456",
    progressPercentage: 35
  }
}

// Error (401 Unauthorized)
{
  success: false,
  error: {
    message: "Unauthorized",
    code: "UNAUTHORIZED"
  }
}
```

---

### POST /api/auth/verify-email
**Verify email address (optional)**

```typescript
// Request
POST /api/auth/verify-email
{
  token: "email_verification_token"
}

// Response
{
  success: true,
  message: "Email verified successfully"
}
```

---

## 🛡️ Security Considerations

### Password Security
```typescript
import bcrypt from 'bcrypt';

// Hash password on registration/change
const saltRounds = 12;
const passwordHash = await bcrypt.hash(password, saltRounds);

// Verify password on login
const isValid = await bcrypt.compare(inputPassword, passwordHash);
```

### Token Security
- ✅ JWT tokens in httpOnly cookies (not localStorage)
- ✅ Access tokens short-lived (24 hours)
- ✅ Refresh tokens long-lived (30 days) with revocation support
- ✅ CSRF protection with SameSite=Strict
- ✅ Rate limiting on login endpoint (5 attempts per 15 minutes)

### Session Security
- ✅ Verify token on each API request
- ✅ Log all login attempts
- ✅ Require email verification (optional)
- ✅ Two-factor authentication (future enhancement)

### Input Validation
- ✅ Sanitize email, username, passwords
- ✅ Check password strength
- ✅ Rate limit registration per IP
- ✅ Check for injection attacks

---

## 🔄 Guest Session Flow

### Before Login
```typescript
// Client-side: localStorage or sessionStorage
{
  guestSession: true,
  characterId: "char-123",
  sceneId: "scene-456",
  visitedScenes: [
    { sceneId: "scene-456", timeSpent: 600 },
    { sceneId: "scene-457", timeSpent: 720 }
  ],
  progressPercentage: 10
}
```

### On Login
```
1. User logs in
2. POST /api/progress/merge-guest-session
3. Server:
   - Get guest session data from request
   - Create VisitedScene entries for each guest visit
   - Update member's current position
   - Calculate and update progress %
4. Clear guest session from client
5. Redirect to character selection or continue reading
```

### API Endpoint: POST /api/progress/merge-guest-session
```typescript
// Request
POST /api/progress/merge-guest-session
Authorization: Bearer <token>
{
  characterId: "char-123",
  sceneId: "scene-456",
  visitedScenes: [
    { sceneId: "scene-456", timeSpentSeconds: 600 },
    { sceneId: "scene-457", timeSpentSeconds: 720 }
  ]
}

// Response
{
  success: true,
  data: {
    mergedCount: 2,
    newProgressPercentage: 10,
    currentCharacterId: "char-123",
    currentSceneId: "scene-456"
  },
  message: "Guest session merged successfully"
}
```

---

## 📱 User Journeys

### Journey 1: New User Registration

```
1. Visit homepage
   ↓
2. Click "Begin Your Journey" (guest mode)
   ↓
3. Browse characters, start reading
   ↓
4. After 1-2 scenes: Toast "Save your progress?"
   ↓
5. Click "Sign Up"
   ↓
6. Fill registration form
   ↓
7. Submit → POST /api/auth/register
   ↓
8. Merge guest session
   ↓
9. Redirect to current story
   ↓
10. Progress now saved to database
```

### Journey 2: Returning User Login

```
1. Visit homepage
   ↓
2. See "Continue Reading" button (if authenticated)
   ↓
3. OR click "Login" → /auth/login
   ↓
4. Enter credentials
   ↓
5. Submit → POST /api/auth/login
   ↓
6. Server validates, returns tokens
   ↓
7. Redirect to last position (character/scene)
   ↓
8. Resume reading where they left off
```

### Journey 3: Logout

```
1. Click account menu → "Logout"
   ↓
2. Confirm logout
   ↓
3. POST /api/auth/logout
   ↓
4. Clear tokens, revoke refresh token
   ↓
5. Redirect to homepage
   ↓
6. Guest mode again
```

---

## 🔐 Middleware & Route Protection

### Authentication Middleware
```typescript
// lib/middleware.ts
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  // Check if user is authenticated
  if (!token) {
    // Check if it's a protected route
    if (isProtectedRoute(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  } else {
    // Verify token validity
    const isValid = await verifyToken(token);
    if (!isValid) {
      // Try to refresh
      const refreshToken = request.cookies.get('refreshToken')?.value;
      if (refreshToken) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        // ... set new token in response
      } else {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

function isProtectedRoute(pathname: string): boolean {
  return ['/profile', '/story'].some(path => pathname.startsWith(path));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
```

### Protected Route Component
```typescript
// lib/AuthGuard.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;
  if (loading) return <div>Checking authentication...</div>;

  if (!isAuthenticated) {
    router.push('/auth/login');
    return <div>Redirecting to login...</div>;
  }

  return <>{children}</>;
}
```

---

## 🎯 Email Verification Flow (Optional)

```
1. User registers
   ↓
2. Send verification email with token link
   ↓
3. Email: "Verify your email: https://gots.com/auth/verify?token=xxx"
   ↓
4. Click link → GET /auth/verify?token=xxx
   ↓
5. Verify token, mark email_verified = true
   ↓
6. Show success, redirect to character selection
```

---

## 📊 Session Management

### Session Duration
- **Access Token**: 24 hours
- **Refresh Token**: 30 days (or 90 with "Remember Me")
- **Remember Me**: Extends refresh to 90 days
- **Idle Timeout**: Optional 30-minute inactivity logout

### Refresh Strategy
- Auto-refresh on page load if token expiring soon
- Auto-refresh on API error 401
- Manual refresh on logout (revoke all tokens)

### Multi-Device Sessions
- Each login creates new refresh token
- Users can see active sessions
- Logout from other devices feature

---

## 🚨 Error Handling

### Auth Errors

| Code | Status | Message | Action |
|------|--------|---------|--------|
| `INVALID_CREDENTIALS` | 401 | Email or password incorrect | Show form error |
| `EMAIL_EXISTS` | 409 | Email already registered | Suggest login |
| `USERNAME_EXISTS` | 409 | Username taken | Suggest different |
| `WEAK_PASSWORD` | 400 | Password doesn't meet requirements | Show requirements |
| `UNAUTHORIZED` | 401 | Token invalid/expired | Redirect to login |
| `FORBIDDEN` | 403 | Insufficient permissions | Show access denied |
| `TOKEN_EXPIRED` | 401 | Access token expired | Auto-refresh |
| `REFRESH_FAILED` | 401 | Refresh token invalid | Redirect to login |
| `RATE_LIMITED` | 429 | Too many login attempts | Show cooldown |

---

## 📈 Analytics & Monitoring

### Track
- Registration success/failure rates
- Login success/failure rates (IP, timestamp)
- Password reset requests
- Email verification rates
- Session duration
- Multi-device login attempts
- Token refresh frequency

---

## 🔄 Future Enhancements

1. **Two-Factor Authentication (2FA)**
   - SMS or authenticator app
   - Backup codes
   - Recovery options

2. **Social Login**
   - Google OAuth
   - GitHub OAuth
   - Apple Sign In

3. **Password Reset**
   - Forgot password flow
   - Email verification
   - Security questions

4. **User Roles & Permissions**
   - Admin access to content management
   - Moderator for community features
   - Member tier system (free/premium)

5. **Advanced Session Management**
   - View all active sessions
   - Logout from other devices
   - Suspicious login alerts

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-20 | Initial authentication flow documentation with JWT, optional login, guest sessions |
