# GOTS Website - API Routes Plan

## 📋 Overview

RESTful API endpoints for the GOTS interactive story platform. All routes follow the conventions of the Next.js App Router (`src/app/api/`) and return consistent JSON responses.

---

## 🏗️ API Structure

```
/api
├── /characters          # Character management
│   ├── GET  /           # List all characters
│   ├── POST /           # Create character (admin)
│   ├── GET  /:id        # Get character details
│   ├── PUT  /:id        # Update character (admin)
│   └── DELETE /:id      # Delete character (admin)
├── /scenes              # Scene management
│   ├── GET  /           # List scenes (with filters)
│   ├── POST /           # Create scene (admin)
│   ├── GET  /:id        # Get scene content
│   ├── PUT  /:id        # Update scene (admin)
│   └── DELETE /:id      # Delete scene (admin)
├── /choices             # Scene choices/branching
│   ├── GET  /scene/:id  # Get choices for scene
│   ├── POST /           # Create choice (admin)
│   ├── PUT  /:id        # Update choice (admin)
│   └── DELETE /:id      # Delete choice (admin)
├── /members             # Member/user profiles
│   ├── GET  /profile    # Get current user profile
│   ├── POST /register   # Register new member
│   ├── PUT  /profile    # Update profile
│   ├── GET  /:id        # Get member details
│   └── DELETE /profile  # Delete account
├── /progress            # Member progress tracking
│   ├── GET  /           # Get current progress
│   ├── POST /visit      # Log scene visit
│   ├── GET  /journey    # Get member's journey
│   ├── GET  /stats      # Get progress statistics
│   └── PUT  /update     # Update current position
└── /auth                # Authentication
    ├── POST /login      # Login member
    ├── POST /logout     # Logout member
    ├── POST /refresh    # Refresh token
    └── GET  /me         # Get current user
```

---

## 📡 Detailed API Routes

### Characters API

#### GET /api/characters
**List all active characters**

```typescript
// Request
GET /api/characters?active=true&limit=10&offset=0

// Response
{
  success: true,
  data: [
    {
      id: "char-123",
      name: "Aragorn",
      role: "Ranger",
      biography: "...",
      historicalEra: "Third Age",
      portraitUrl: "https://...",
      firstSceneId: "scene-456",
      totalScenes: 12,
      totalWords: 45000,
      isActive: true
    },
    // ... more characters
  ],
  pagination: {
    total: 8,
    limit: 10,
    offset: 0,
    hasMore: false
  }
}
```

**Query Parameters:**
- `active` (boolean): Filter by active status (default: true)
- `limit` (number): Items per page (default: 10, max: 50)
- `offset` (number): Pagination offset (default: 0)
- `search` (string): Search by character name

---

#### GET /api/characters/:id
**Get single character with scene list**

```typescript
// Request
GET /api/characters/char-123

// Response
{
  success: true,
  data: {
    id: "char-123",
    name: "Aragorn",
    role: "Ranger",
    biography: "Long text...",
    historicalEra: "Third Age",
    portraitUrl: "https://...",
    firstSceneId: "scene-456",
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-20T12:00:00Z",
    // Nested relationships
    scenes: [
      {
        id: "scene-456",
        title: "Aragorn's Beginning",
        chapterNumber: 1,
        sceneNumber: 1,
        wordCount: 3500,
        readingTimeMinutes: 12,
        isPublished: true
      },
      // ... more scenes
    ],
    relationships: [
      {
        relatedCharacterId: "char-789",
        relatedCharacterName: "Legolas",
        relationshipType: "ally"
      }
    ]
  }
}
```

---

#### POST /api/characters (Admin)
**Create new character**

```typescript
// Request
POST /api/characters
{
  name: "New Character",
  role: "Warrior",
  biography: "Long biography text...",
  historicalEra: "Third Age",
  portraitUrl: "https://example.com/image.jpg",
  firstSceneId: "scene-789" // optional, created later
}

// Response
{
  success: true,
  data: {
    id: "char-999",
    name: "New Character",
    role: "Warrior",
    // ... full character data
  },
  message: "Character created successfully"
}

// Error Response
{
  success: false,
  error: {
    message: "Character name must be unique",
    code: "DUPLICATE_NAME"
  }
}
```

---

### Scenes API

#### GET /api/scenes
**List scenes with filters**

```typescript
// Request
GET /api/scenes?characterId=char-123&published=true&limit=20

// Response
{
  success: true,
  data: [
    {
      id: "scene-456",
      characterId: "char-123",
      characterName: "Aragorn",
      chapterNumber: 1,
      sceneNumber: 1,
      title: "Aragorn's Beginning",
      preview: "Short preview text...",
      location: "Rivendell",
      wordCount: 3500,
      readingTimeMinutes: 12,
      themes: "betrayal, destiny, leadership",
      isPublished: true,
      createdAt: "2025-01-01T00:00:00Z"
    },
    // ... more scenes
  ],
  pagination: {
    total: 42,
    limit: 20,
    offset: 0,
    hasMore: true
  }
}
```

**Query Parameters:**
- `characterId` (string): Filter by character
- `published` (boolean): Filter by publication status
- `chapter` (number): Filter by chapter number
- `limit` (number): Items per page (default: 20)
- `offset` (number): Pagination offset
- `search` (string): Search by title

---

#### GET /api/scenes/:id
**Get full scene content**

```typescript
// Request
GET /api/scenes/scene-456

// Response
{
  success: true,
  data: {
    id: "scene-456",
    characterId: "char-123",
    characterName: "Aragorn",
    title: "Aragorn's Beginning",
    content: "Full scene text here... Very long text...",
    preview: "Short preview...",
    location: "Rivendell",
    themes: "betrayal, destiny",
    chapterNumber: 1,
    sceneNumber: 1,
    wordCount: 3500,
    readingTimeMinutes: 12,
    isPublished: true,
    // Available choices from this scene
    availableChoices: [
      {
        id: "choice-1",
        choiceText: "Follow Gandalf's advice",
        description: "Head north with the wizard",
        toCharacterId: "char-123",
        toCharacterName: "Aragorn",
        toSceneId: "scene-457",
        toSceneTitle: "The Northern Road"
      },
      {
        id: "choice-2",
        choiceText: "Switch to Legolas's perspective",
        description: "See events through elven eyes",
        toCharacterId: "char-789",
        toCharacterName: "Legolas",
        toSceneId: "scene-600",
        toSceneTitle: "Elven Watch"
      }
    ],
    metadata: {
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-20T12:00:00Z",
      views: 1250,
      averageReadingTime: 14
    }
  }
}
```

---

#### POST /api/scenes (Admin)
**Create new scene**

```typescript
// Request
POST /api/scenes
{
  characterId: "char-123",
  chapterNumber: 1,
  sceneNumber: 2,
  title: "The Council Meets",
  preview: "Short teaser text...",
  content: "Full scene content here...",
  location: "The Citadel",
  themes: "conflict, decision, unity",
  isPublished: false
}

// Response
{
  success: true,
  data: {
    id: "scene-999",
    characterId: "char-123",
    title: "The Council Meets",
    // ... full scene data
  },
  message: "Scene created successfully"
}
```

---

### Scene Choices API

#### GET /api/choices/scene/:sceneId
**Get all choices from a scene**

```typescript
// Request
GET /api/choices/scene/scene-456

// Response
{
  success: true,
  data: [
    {
      id: "choice-1",
      fromSceneId: "scene-456",
      toSceneId: "scene-457",
      toCharacterId: "char-123",
      toCharacterName: "Aragorn",
      choiceText: "Follow Gandalf's advice",
      description: "Continue with the wizard",
      sortOrder: 1,
      toSceneMetadata: {
        title: "The Northern Road",
        location: "Mountain Pass",
        wordCount: 4200
      }
    },
    {
      id: "choice-2",
      fromSceneId: "scene-456",
      toSceneId: "scene-600",
      toCharacterId: "char-789",
      toCharacterName: "Legolas",
      choiceText: "Switch to Legolas's perspective",
      description: "See events through elven eyes",
      sortOrder: 2,
      toSceneMetadata: {
        title: "Elven Watch",
        location: "Forest Edge",
        wordCount: 3800
      }
    }
  ]
}
```

---

#### POST /api/choices (Admin)
**Create scene choice**

```typescript
// Request
POST /api/choices
{
  fromSceneId: "scene-456",
  toSceneId: "scene-457",
  toCharacterId: "char-123",
  choiceText: "Follow Gandalf's advice",
  description: "Continue with the wizard",
  sortOrder: 1
}

// Response
{
  success: true,
  data: {
    id: "choice-999",
    // ... full choice data
  },
  message: "Choice created successfully"
}
```

---

### Members (Users) API

#### GET /api/members/profile
**Get current logged-in user's profile**

```typescript
// Request
GET /api/members/profile
Authorization: Bearer <token>

// Response
{
  success: true,
  data: {
    id: "member-123",
    userId: "auth0|user123",
    email: "user@example.com",
    username: "aragorn_fan",
    displayName: "Aragorn Fan",
    bio: "Love the ranger stories",
    avatarUrl: "https://...",
    currentCharacterId: "char-123",
    currentCharacterName: "Aragorn",
    currentSceneId: "scene-456",
    currentSceneTitle: "Aragorn's Beginning",
    progressPercentage: 35,
    totalScenesVisited: 15,
    totalReadingTimeSeconds: 54000,
    favoriteCharacterId: "char-123",
    lastAccessed: "2025-01-20T15:30:00Z",
    createdAt: "2024-12-15T00:00:00Z"
  }
}
```

---

#### POST /api/members/register
**Register new member**

```typescript
// Request
POST /api/members/register
{
  email: "newuser@example.com",
  username: "newuser",
  displayName: "New User",
  password: "securePassword123"
}

// Response
{
  success: true,
  data: {
    id: "member-999",
    email: "newuser@example.com",
    username: "newuser",
    displayName: "New User",
    token: "jwt_token_here",
    expiresIn: 86400
  },
  message: "Member registered successfully"
}

// Error
{
  success: false,
  error: {
    message: "Username already exists",
    code: "USERNAME_EXISTS"
  }
}
```

---

#### PUT /api/members/profile
**Update member profile**

```typescript
// Request
PUT /api/members/profile
Authorization: Bearer <token>
{
  displayName: "Updated Name",
  bio: "Updated bio",
  avatarUrl: "https://new-image.jpg",
  favoriteCharacterId: "char-789"
}

// Response
{
  success: true,
  data: {
    id: "member-123",
    displayName: "Updated Name",
    bio: "Updated bio",
    // ... full updated profile
  },
  message: "Profile updated successfully"
}
```

---

### Progress API

#### GET /api/progress
**Get current member's progress**

```typescript
// Request
GET /api/progress
Authorization: Bearer <token>

// Response
{
  success: true,
  data: {
    memberId: "member-123",
    currentCharacterId: "char-123",
    currentCharacterName: "Aragorn",
    currentSceneId: "scene-456",
    currentSceneTitle: "Aragorn's Beginning",
    progressPercentage: 35,
    totalScenesVisited: 15,
    totalReadingTimeSeconds: 54000,
    characters: [
      {
        characterId: "char-123",
        characterName: "Aragorn",
        scenesVisited: 8,
        totalTime: 28000
      },
      {
        characterId: "char-789",
        characterName: "Legolas",
        scenesVisited: 7,
        totalTime: 26000
      }
    ]
  }
}
```

---

#### POST /api/progress/visit
**Log scene visit (called when member reads a scene)**

```typescript
// Request
POST /api/progress/visit
Authorization: Bearer <token>
{
  sceneId: "scene-456",
  characterId: "char-123",
  timeSpentSeconds: 720
}

// Response
{
  success: true,
  data: {
    id: "visit-999",
    memberId: "member-123",
    sceneId: "scene-456",
    characterId: "char-123",
    visitedAt: "2025-01-20T15:30:00Z",
    timeSpentSeconds: 720,
    visitOrder: 15,
    newProgressPercentage: 36
  },
  message: "Visit logged successfully"
}
```

---

#### PUT /api/progress/update
**Update member's current position**

```typescript
// Request
PUT /api/progress/update
Authorization: Bearer <token>
{
  currentCharacterId: "char-123",
  currentSceneId: "scene-456"
}

// Response
{
  success: true,
  data: {
    memberId: "member-123",
    currentCharacterId: "char-123",
    currentSceneId: "scene-456",
    updatedAt: "2025-01-20T15:30:00Z"
  },
  message: "Position updated successfully"
}
```

---

#### GET /api/progress/journey
**Get member's complete journey history**

```typescript
// Request
GET /api/progress/journey?limit=50&offset=0
Authorization: Bearer <token>

// Response
{
  success: true,
  data: [
    {
      visitOrder: 1,
      visitedAt: "2025-01-15T10:00:00Z",
      sceneId: "scene-456",
      sceneTitle: "Aragorn's Beginning",
      characterId: "char-123",
      characterName: "Aragorn",
      timeSpentSeconds: 600,
      location: "Rivendell"
    },
    {
      visitOrder: 2,
      visitedAt: "2025-01-15T10:15:00Z",
      sceneId: "scene-457",
      sceneTitle: "The Council Meets",
      characterId: "char-123",
      characterName: "Aragorn",
      timeSpentSeconds: 720,
      location: "The Citadel"
    },
    // ... more visits
  ],
  pagination: {
    total: 47,
    limit: 50,
    offset: 0,
    hasMore: false
  }
}
```

---

#### GET /api/progress/stats
**Get detailed progress statistics**

```typescript
// Request
GET /api/progress/stats
Authorization: Bearer <token>

// Response
{
  success: true,
  data: {
    memberId: "member-123",
    totalScenesVisited: 15,
    totalPublishedScenes: 42,
    progressPercentage: 36,
    totalReadingTimeSeconds: 54000,
    totalReadingTimeFormatted: "15 hours 2 minutes",
    charactersMetCount: 2,
    characterList: [
      {
        characterId: "char-123",
        characterName: "Aragorn",
        scenesRead: 8,
        percentageOfCharacter: 67,
        totalTimeSeconds: 28000
      },
      {
        characterId: "char-789",
        characterName: "Legolas",
        scenesRead: 7,
        percentageOfCharacter: 64,
        totalTimeSeconds: 26000
      }
    ],
    averageReadingTimePerScene: 3600,
    joinedAt: "2024-12-15T00:00:00Z",
    lastActivity: "2025-01-20T15:30:00Z",
    daysSinceJoin: 37,
    estimatedCompletionDays: 22
  }
}
```

---

### Authentication API

#### POST /api/auth/login
**Login member**

```typescript
// Request
POST /api/auth/login
{
  email: "user@example.com",
  password: "password123"
}

// Response
{
  success: true,
  data: {
    memberId: "member-123",
    email: "user@example.com",
    token: "jwt_token_here",
    expiresIn: 86400,
    user: {
      id: "member-123",
      username: "user",
      displayName: "User Name"
    }
  }
}

// Error
{
  success: false,
  error: {
    message: "Invalid email or password",
    code: "INVALID_CREDENTIALS"
  }
}
```

---

#### GET /api/auth/me
**Get current authenticated user**

```typescript
// Request
GET /api/auth/me
Authorization: Bearer <token>

// Response
{
  success: true,
  data: {
    id: "member-123",
    email: "user@example.com",
    username: "user",
    displayName: "User Name"
  }
}
```

---

## 🔐 Authentication & Authorization

### Token-Based Auth
- JWT tokens in Authorization header: `Authorization: Bearer <token>`
- Token expires in 24 hours
- Refresh endpoint to get new token

- ### Admin Routes
Routes marked `(Admin)` require:
```typescript
// Check user role in middleware
if (member.role !== 'admin') {
  return res.status(403).json({
    success: false,
    error: {
      message: "Unauthorized: Admin access required",
      code: "FORBIDDEN"
    }
  });
}
```

---

## 📊 Response Format Standards

All endpoints return consistent JSON:

```typescript
// Success Response
{
  success: true,
  data: { /* response data */ },
  message?: "Optional success message",
  pagination?: {
    total: number,
    limit: number,
    offset: number,
    hasMore: boolean
  }
}

// Error Response
{
  success: false,
  error: {
    message: "Human-readable error message",
    code: "ERROR_CODE",
    details?: { /* additional error details */ }
  }
}
```

---

## 🚀 Implementation with Next.js App Router

### Route Structure
```typescript
// src/app/api/characters/route.ts
export async function GET(req: Request) {
  try {
    // Handle GET request
    return Response.json({ success: true, data: [...] });
  } catch (error) {
    return Response.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Handle POST request
    return Response.json({ success: true, data: {...} }, { status: 201 });
  } catch (error) {
    return Response.json(
      { success: false, error: { message: error.message } },
      { status: 400 }
    );
  }
}
```

---

## 📝 Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| `UNAUTHORIZED` | 401 | Not authenticated |
| `FORBIDDEN` | 403 | Authenticated but no permission |
| `NOT_FOUND` | 404 | Resource not found |
| `DUPLICATE_NAME` | 409 | Name/unique field already exists |
| `INVALID_REQUEST` | 400 | Invalid request body |
| `INTERNAL_ERROR` | 500 | Server error |

---

## 🔄 Pagination Standards

All list endpoints support:
- `limit`: Items per page (default: 20, max: 100)
- `offset`: Number of items to skip (default: 0)

Response includes:
```typescript
pagination: {
  total: number,      // Total items available
  limit: number,      // Items returned
  offset: number,     // Items skipped
  hasMore: boolean    // More items available
}
```

---

## ⚡ Performance Considerations

### Caching
- Cache character opening scenes: 1 hour
- Cache published scene content: 4 hours
- Cache member profile: 5 minutes
- Cache progress stats: 10 minutes

### Rate Limiting
- Authenticated requests: 1000/hour per user
- Unauthenticated requests: 100/hour per IP
- Visit logging: No limit (critical path)

### Database Queries
- Use indexes on character_id, scene_id, member_id
- Limit nested relationships in list endpoints
- Use pagination for large datasets

---

## 📚 API Client Library

Recommended client setup for Next.js components:

```typescript
// lib/api_client.ts
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: { message: string; code: string };
  pagination?: PaginationInfo;
}

class GOTSApiClient {
  private baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options?.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    return response.json();
  }

  // Character methods
  characters = {
    list: (params?) => this.request(`/characters`, { params }),
    get: (id) => this.request(`/characters/${id}`),
  };

  // Scene methods
  scenes = {
    list: (params?) => this.request(`/scenes`, { params }),
    get: (id) => this.request(`/scenes/${id}`),
  };

  // Progress methods
  progress = {
    get: () => this.request(`/progress`),
    visit: (data) => this.request(`/progress/visit`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    journey: () => this.request(`/progress/journey`),
  };
}

export const apiClient = new GOTSApiClient();
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-20 | Initial API routes planning with full endpoint documentation |
