# GOTS Website - Component Architecture Plan

## 📋 Overview

Complete React component structure for the GOTS interactive story platform. Uses Next.js 14+ with App Router, TypeScript, Server Components by default, and Client Components only where necessary.

---

## 🏗️ Component Hierarchy

```
src/app/
├── layout.tsx (Root Layout - Server)
├── page.tsx (Homepage - Server)
├── characters/
│   ├── page.tsx (CharacterSelect - Server)
│   └── [id]/
│       └── page.tsx (CharacterDetail - Server)
├── story/
│   ├── layout.tsx (Story Layout)
│   └── [characterId]/
│       ├── page.tsx (StoryViewer - Server)
│       └── [sceneId]/
│           └── page.tsx (SceneContent - Server)
├── profile/
│   ├── layout.tsx (Profile Layout)
│   └── page.tsx (ProfilePage - Server)
└── api/ (See API Routes Plan)

src/components/
├── layout/
│   ├── Header.tsx (Client)
│   ├── Navigation.tsx (Client)
│   ├── Footer.tsx (Server)
│   └── Sidebar.tsx (Client)
├── sections/
│   ├── CharacterGallery.tsx (Client)
│   ├── SceneViewer.tsx (Client)
│   ├── ProgressDashboard.tsx (Client)
│   ├── ChoiceButtons.tsx (Client)
│   └── JourneyTimeline.tsx (Client)
├── ui/
│   ├── Button.tsx (Server/Client utility)
│   ├── Card.tsx (Server)
│   ├── Modal.tsx (Client)
│   ├── Badge.tsx (Server)
│   ├── Spinner.tsx (Client)
│   ├── ProgressBar.tsx (Client)
│   └── Toast.tsx (Client)
└── shared/
    ├── LoadingState.tsx (Client)
    ├── ErrorBoundary.tsx (Client)
    └── AuthGuard.tsx (Client)

src/lib/
├── api_client.ts (API client)
├── hooks.ts (Custom React hooks)
├── types.ts (TypeScript types)
├── utils.ts (Utility functions)
└── constants.ts (Constants)

src/context/
├── AuthContext.tsx (Authentication)
├── ProgressContext.tsx (Progress tracking)
└── ThemeContext.tsx (Theme management)
```

---

## 📄 Page Components

### 1. Root Layout (`src/app/layout.tsx`)
**Server Component - Provides global layout**

```typescript
import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Providers from '@/app/providers';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
```

**Key Features:**
- Wraps all pages
- Applies global styles and fonts
- Provides context providers
- Includes header and footer

---

### 2. Homepage (`src/app/page.tsx`)
**Server Component - Landing page**

```typescript
import { Suspense } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/sections/HeroSection';
import FeaturedCharacters from '@/components/sections/FeaturedCharacters';

export const metadata = {
  title: 'Guardians of the Spear - Interactive Story',
  description: 'Choose your character and begin an immersive historical fiction journey',
};

export default async function HomePage() {
  return (
    <div className="space-y-12">
      <HeroSection />
      
      <section className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Choose Your Path</h2>
        <p className="text-xl text-gray-600 mb-8">
          Select a character and begin your unique journey through history
        </p>
        <Link
          href="/characters"
          className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark"
        >
          Begin Your Journey
        </Link>
      </section>

      <Suspense fallback={<div>Loading featured characters...</div>}>
        <FeaturedCharacters />
      </Suspense>
    </div>
  );
}
```

---

### 3. Character Selection (`src/app/characters/page.tsx`)
**Server Component - Character gallery**

```typescript
import { Suspense } from 'react';
import { getCharacters } from '@/lib/api_client';
import CharacterGallery from '@/components/sections/CharacterGallery';
import CharacterFilter from '@/components/sections/CharacterFilter';

export const metadata = {
  title: 'Select Character - GOTS',
  description: 'Choose a character to follow through the story',
};

export default async function CharacterSelectPage() {
  const charactersResponse = await getCharacters({ active: true });

  if (!charactersResponse.success) {
    return <div className="text-center py-12">Failed to load characters</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Select Your Character</h1>
      <p className="text-xl text-gray-600 mb-8">
        Each character offers a unique perspective on the story
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <CharacterFilter />
        <CharacterGallery characters={charactersResponse.data} />
      </Suspense>
    </div>
  );
}
```

---

### 4. Story Viewer (`src/app/story/[characterId]/page.tsx`)
**Server Component - Scene reader**

```typescript
import { Suspense } from 'react';
import { getCharacter, getMemberProgress } from '@/lib/api_client';
import SceneViewer from '@/components/sections/SceneViewer';
import ProgressSidebar from '@/components/sections/ProgressSidebar';

interface StoryViewerPageProps {
  params: {
    characterId: string;
  };
}

export default async function StoryViewerPage({
  params,
}: StoryViewerPageProps) {
  const character = await getCharacter(params.characterId);

  if (!character.success) {
    return <div>Character not found</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 container mx-auto px-4 py-8">
      {/* Main content */}
      <div className="lg:col-span-3">
        <Suspense fallback={<div>Loading scene...</div>}>
          <SceneViewer
            characterId={params.characterId}
            character={character.data}
          />
        </Suspense>
      </div>

      {/* Sidebar */}
      <aside className="lg:col-span-1">
        <Suspense fallback={<div>Loading progress...</div>}>
          <ProgressSidebar characterId={params.characterId} />
        </Suspense>
      </aside>
    </div>
  );
}
```

---

### 5. Profile Page (`src/app/profile/page.tsx`)
**Server Component - User profile and progress**

```typescript
import { Suspense } from 'react';
import { getMemberProfile, getProgressStats } from '@/lib/api_client';
import ProfileHeader from '@/components/sections/ProfileHeader';
import ProgressDashboard from '@/components/sections/ProgressDashboard';
import JourneyTimeline from '@/components/sections/JourneyTimeline';

export const metadata = {
  title: 'My Profile - GOTS',
  description: 'View your reading progress and journey',
};

export default async function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Suspense fallback={<div>Loading profile...</div>}>
        <ProfileHeader />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <Suspense fallback={<div>Loading dashboard...</div>}>
          <ProgressDashboard />
        </Suspense>

        <Suspense fallback={<div>Loading timeline...</div>}>
          <JourneyTimeline />
        </Suspense>
      </div>
    </div>
  );
}
```

---

## 🎨 Feature Components

### 1. CharacterGallery (Client Component)
**Displays character cards in a grid with filtering**

```typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Character } from '@/lib/types';

interface CharacterGalleryProps {
  characters: Character[];
}

export default function CharacterGallery({
  characters,
}: CharacterGalleryProps) {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);

  const filtered = selectedEra
    ? characters.filter((c) => c.historicalEra === selectedEra)
    : characters;

  return (
    <div className="space-y-8">
      {/* Filter buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedEra(null)}
          className={`px-4 py-2 rounded ${
            selectedEra === null
              ? 'bg-primary text-white'
              : 'bg-gray-200'
          }`}
        >
          All Characters
        </button>
        {/* Dynamic era filters */}
      </div>

      {/* Character grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((character) => (
          <Link
            key={character.id}
            href={`/story/${character.id}`}
          >
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="relative h-64 bg-gray-200">
                {character.portraitUrl && (
                  <Image
                    src={character.portraitUrl}
                    alt={character.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">
                  {character.name}
                </h3>
                <p className="text-gray-600 mb-4">{character.role}</p>
                <p className="text-sm text-gray-500">
                  {character.historicalEra}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**Props:**
- `characters`: Array of Character objects

**State:**
- `selectedEra`: Currently filtered era

**Interactions:**
- Click character card → Navigate to story viewer
- Click era filter → Filter characters by era

---

### 2. SceneViewer (Client Component)
**Main content area for reading scenes**

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getScene } from '@/lib/api_client';
import ChoiceButtons from '@/components/sections/ChoiceButtons';
import { Scene, SceneChoice } from '@/lib/types';

interface SceneViewerProps {
  characterId: string;
  character: { name: string; role: string };
}

export default function SceneViewer({
  characterId,
  character,
}: SceneViewerProps) {
  const [scene, setScene] = useState<Scene | null>(null);
  const [choices, setChoices] = useState<SceneChoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    loadScene();
    
    // Track reading time
    const timer = setInterval(() => {
      setReadingTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  async function loadScene() {
    try {
      // Get first scene for character
      const response = await getScene(characterId);
      if (response.success) {
        setScene(response.data);
        setChoices(response.data.availableChoices);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="text-center py-12">Loading scene...</div>;
  if (!scene) return <div className="text-center py-12">Scene not found</div>;

  const formattedTime = formatSeconds(readingTime);

  return (
    <article className="prose max-w-none">
      {/* Scene header */}
      <div className="mb-8 pb-8 border-b">
        <p className="text-sm text-gray-500 mb-2">
          {character.name} • {character.role}
        </p>
        <h1 className="text-4xl font-bold mb-4">{scene.title}</h1>
        <p className="text-gray-600">
          {scene.location} • {scene.readingTimeMinutes} min read
        </p>
      </div>

      {/* Scene content */}
      <div className="mb-12 leading-relaxed text-lg">
        {scene.content}
      </div>

      {/* Choice buttons */}
      <div className="border-t pt-8">
        <h3 className="text-xl font-bold mb-4">What happens next?</h3>
        <ChoiceButtons choices={choices} />
      </div>

      {/* Reading time indicator */}
      <div className="fixed bottom-4 right-4 bg-gray-200 px-4 py-2 rounded">
        Reading time: {formattedTime}
      </div>
    </article>
  );
}

function formatSeconds(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}
```

**Key Features:**
- Displays full scene content
- Tracks reading time
- Shows available choices
- Character and location metadata

---

### 3. ChoiceButtons (Client Component)
**Interactive choice buttons for branching paths**

```typescript
'use client';

import { useRouter } from 'next/navigation';
import { logSceneVisit } from '@/lib/api_client';
import { SceneChoice } from '@/lib/types';
import { useState } from 'react';

interface ChoiceButtonsProps {
  choices: SceneChoice[];
}

export default function ChoiceButtons({ choices }: ChoiceButtonsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleChoice(choice: SceneChoice) {
    setLoading(true);
    try {
      // Log the visit
      await logSceneVisit({
        sceneId: choice.toSceneId,
        characterId: choice.toCharacterId,
        timeSpentSeconds: Math.floor(Date.now() / 1000),
      });

      // Navigate to next scene
      router.push(
        `/story/${choice.toCharacterId}/${choice.toSceneId}`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {choices.map((choice) => (
        <button
          key={choice.id}
          onClick={() => handleChoice(choice)}
          disabled={loading}
          className="w-full p-6 text-left bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-400 transition-colors disabled:opacity-50"
        >
          <p className="font-semibold text-lg mb-2">
            {choice.choiceText}
          </p>
          {choice.description && (
            <p className="text-sm text-gray-600">
              {choice.description}
            </p>
          )}
          {choice.toCharacterName && (
            <p className="text-xs text-blue-600 mt-2">
              Switch to {choice.toCharacterName}
            </p>
          )}
        </button>
      ))}
    </div>
  );
}
```

**Interactive Features:**
- Click to select choice
- Logs scene visit to database
- Navigates to next scene
- Indicates POV switches

---

### 4. ProgressDashboard (Client Component)
**Shows member's overall progress and stats**

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getProgressStats } from '@/lib/api_client';
import ProgressBar from '@/components/ui/ProgressBar';
import { ProgressStats } from '@/lib/types';

export default function ProgressDashboard() {
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const response = await getProgressStats();
      if (response.success) {
        setStats(response.data);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading stats...</div>;
  if (!stats) return <div>No stats available</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <h2 className="text-2xl font-bold">Your Progress</h2>

      {/* Overall progress */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Story Completion</span>
          <span className="text-gray-600">{stats.progressPercentage}%</span>
        </div>
        <ProgressBar
          value={stats.progressPercentage}
          max={100}
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded">
          <p className="text-sm text-gray-600">Scenes Read</p>
          <p className="text-2xl font-bold">
            {stats.totalScenesVisited}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded">
          <p className="text-sm text-gray-600">Characters Met</p>
          <p className="text-2xl font-bold">
            {stats.charactersMetCount}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded">
          <p className="text-sm text-gray-600">Reading Time</p>
          <p className="text-lg font-bold">
            {stats.totalReadingTimeFormatted}
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded">
          <p className="text-sm text-gray-600">Est. Completion</p>
          <p className="text-lg font-bold">
            {stats.estimatedCompletionDays}d
          </p>
        </div>
      </div>

      {/* Character breakdown */}
      <div>
        <h3 className="font-semibold mb-3">Character Progress</h3>
        <div className="space-y-3">
          {stats.characterList.map((char) => (
            <div key={char.characterId}>
              <div className="flex justify-between mb-1">
                <span className="text-sm">{char.characterName}</span>
                <span className="text-xs text-gray-600">
                  {char.percentageOfCharacter}%
                </span>
              </div>
              <ProgressBar
                value={char.percentageOfCharacter}
                max={100}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Displays:**
- Overall story completion %
- Total scenes read
- Characters encountered
- Reading time spent
- Per-character progress
- Estimated days to completion

---

### 5. JourneyTimeline (Client Component)
**Visual timeline of member's journey**

```typescript
'use client';

import { useEffect, useState } from 'react';
import { getJourney } from '@/lib/api_client';
import { JourneyEntry } from '@/lib/types';

export default function JourneyTimeline() {
  const [journey, setJourney] = useState<JourneyEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJourney();
  }, []);

  async function loadJourney() {
    try {
      const response = await getJourney();
      if (response.success) {
        setJourney(response.data);
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading journey...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Your Journey</h2>

      <div className="space-y-4">
        {journey.map((entry, index) => (
          <div key={entry.visitOrder} className="flex gap-4">
            {/* Timeline marker */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                {entry.visitOrder}
              </div>
              {index < journey.length - 1 && (
                <div className="w-1 h-16 bg-blue-200 mt-2" />
              )}
            </div>

            {/* Entry details */}
            <div className="pb-4 flex-1">
              <h3 className="font-semibold">{entry.sceneTitle}</h3>
              <p className="text-sm text-gray-600">
                {entry.characterName} • {entry.location}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(entry.visitedAt)} • {entry.timeSpentSeconds}s
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
```

**Features:**
- Visual timeline of scenes read
- Visit order numbering
- Character and location info
- Timestamps and time spent

---

## 🔌 UI Components

### Button Component
```typescript
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-semibold rounded transition-colors disabled:opacity-50';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

### ProgressBar Component
```typescript
interface ProgressBarProps {
  value: number;
  max: number;
  showLabel?: boolean;
}

export default function ProgressBar({
  value,
  max,
  showLabel = false,
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-gray-600 mt-2">{percentage}%</p>
      )}
    </div>
  );
}
```

---

## 🎯 Custom Hooks

### useProgress Hook
```typescript
'use client';

import { useEffect, useState } from 'react';
import { getProgress } from '@/lib/api_client';

export function useProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    try {
      const response = await getProgress();
      if (response.success) {
        setProgress(response.data);
      } else {
        setError(response.error?.message || 'Failed to load progress');
      }
    } finally {
      setLoading(false);
    }
  }

  return { progress, loading, error, refetch: loadProgress };
}
```

### useScene Hook
```typescript
'use client';

import { useEffect, useState } from 'react';
import { getScene } from '@/lib/api_client';
import { Scene } from '@/lib/types';

export function useScene(sceneId: string) {
  const [scene, setScene] = useState<Scene | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sceneId) return;

    loadScene();
  }, [sceneId]);

  async function loadScene() {
    try {
      const response = await getScene(sceneId);
      if (response.success) {
        setScene(response.data);
      }
    } finally {
      setLoading(false);
    }
  }

  return { scene, loading };
}
```

---

## 🎨 Context Providers

### AuthContext
```typescript
'use client';

import { createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  memberId: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Implementation...
  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
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

### ProgressContext
```typescript
'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

interface ProgressContextType {
  currentCharacterId: string | null;
  currentSceneId: string | null;
  setPosition: (characterId: string, sceneId: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [currentCharacterId, setCurrentCharacterId] = useState<
    string | null
  >(null);
  const [currentSceneId, setCurrentSceneId] = useState<string | null>(null);

  const setPosition = (characterId: string, sceneId: string) => {
    setCurrentCharacterId(characterId);
    setCurrentSceneId(sceneId);
  };

  return (
    <ProgressContext.Provider
      value={{
        currentCharacterId,
        currentSceneId,
        setPosition,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}
```

---

## 📋 Component Checklist

### Layout Components
- [ ] Header (with navigation, auth status)
- [ ] Navigation Menu (mobile + desktop)
- [ ] Footer (links, copyright)
- [ ] Sidebar (for story view)

### Feature Components
- [ ] CharacterGallery (with filtering)
- [ ] SceneViewer (with timer)
- [ ] ChoiceButtons (interactive)
- [ ] ProgressDashboard (stats)
- [ ] JourneyTimeline (history)
- [ ] CharacterDetail (bio, scenes)
- [ ] ProfileHeader (user info)

### UI Components
- [ ] Button (variants, sizes)
- [ ] Card (generic container)
- [ ] ProgressBar (visual indicator)
- [ ] Badge (tags, labels)
- [ ] Spinner (loading state)
- [ ] Modal (confirmation, info)
- [ ] Toast (notifications)

### Shared Components
- [ ] LoadingState (skeleton, spinner)
- [ ] ErrorBoundary (error handling)
- [ ] AuthGuard (protected routes)

---

## 🎯 State Management Strategy

### Server State (Database)
- Characters, scenes, choices
- Member profiles, progress history
- Fetched via API routes with ISR caching

### Client State (React)
- UI state (modals, dropdowns, filters)
- Temporary user interactions
- Managed with useState/useReducer

### Shared State (Context)
- Authentication status
- Current position (character/scene)
- User preferences (theme)

### URL State
- Current character: `/story/:characterId`
- Current scene: `/story/:characterId/:sceneId`
- Pagination, filters on list pages

---

## 🚀 Performance Optimizations

### Code Splitting
- Dynamic imports for heavy components
- Route-based code splitting (Next.js automatic)

### Image Optimization
- Use Next.js `Image` component
- Lazy load portrait images
- WebP format with fallbacks

### Caching Strategy
- ISR for character and scene lists
- Redis cache for progress stats
- Client-side React Query/SWR for frequent updates

### Database Queries
- Avoid N+1 queries
- Batch related data fetches
- Pagination for large lists

---

## 📱 Responsive Design

- **Mobile-first** approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Single column on mobile → Multi-column on desktop
- Touch-friendly buttons and interaction targets

---

## ♿ Accessibility

- Semantic HTML tags
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratios
- Alt text for images
- Focus states visible

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-20 | Initial component architecture planning with page, feature, and UI components |
