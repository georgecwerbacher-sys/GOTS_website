# Next.js App Setup Guide - GOTS Website
## Step-by-Step Creation & Configuration

**Created:** January 18, 2025  
**Project:** Guardians of the Spear (GOTS)  
**Location:** `/Users/werby/GOTS_website/GOTS_website/Review/next-app-setup.md`

---

## Overview

This guide walks you through creating a new Next.js 14+ project from scratch with all necessary configuration for the GOTS website.

**Time Estimate:** 30-45 minutes  
**Prerequisites:** Node.js 22+, npm, Cursor IDE installed

---

## Phase 1: Create Next.js Project (5 minutes)

### Step 1: Navigate to Projects Directory
```bash
cd ~/Projects/personal
```

### Step 2: Create Next.js Project
```bash
npx create-next-app@latest gots_website --yes
```

**Options Selected:**
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: Yes
- App Router: Yes
- Turbopack: Optional

### Step 3: Navigate to Project
```bash
cd gots_website
```

**Verify:**
```bash
ls -la
# Should show: next.config.ts, tsconfig.json, package.json, src/, etc.
```

✅ **Checkpoint:** Project created successfully

---

## Phase 2: Verify TypeScript Strict Mode (3 minutes)

### Step 1: Check tsconfig.json
```bash
cat tsconfig.json
```

### Step 2: Verify Strict Mode is Enabled
Look for:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

### Step 3: If Not Enabled, Update tsconfig.json
Add/modify:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"]
  }
}
```

✅ **Checkpoint:** TypeScript strict mode verified

---

## Phase 3: Create Directory Structure (5 minutes)

### Create All Necessary Directories
```bash
mkdir -p src/components/{ui,layout,sections,shared}
mkdir -p src/lib/{utils,types,hooks}
mkdir -p src/app/{about,characters,chapters,world,resources}
mkdir -p src/app/api/{chapters,characters,world}
mkdir -p src/styles
```

### Verify Structure
```bash
tree -L 3 src/
```

Should show:
```
src/
├── app/
│   ├── about/
│   ├── api/
│   │   ├── chapters/
│   │   ├── characters/
│   │   └── world/
│   ├── characters/
│   ├── chapters/
│   ├── resources/
│   ├── world/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   ├── sections/
│   ├── shared/
│   └── ui/
├── lib/
│   ├── hooks/
│   ├── types/
│   └── utils/
├── styles/
└── globals.css
```

✅ **Checkpoint:** Directory structure created

---

## Phase 4: Setup Prettier & ESLint (5 minutes)

### Step 1: Verify Prettier Config
Check `.prettierrc.json` exists:
```bash
cat .prettierrc.json
```

Should contain:
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

### Step 2: Verify ESLint Config
Check `.eslintrc.json` exists:
```bash
cat .eslintrc.json
```

Should extend:
```json
{
  "extends": ["next/core-web-vitals"]
}
```

### Step 3: Test Linting
```bash
npm run lint
```

Should show no critical errors (warnings are okay).

✅ **Checkpoint:** Prettier & ESLint configured

---

## Phase 5: Verify TypeScript Configuration (5 minutes)

### Step 1: Check TypeScript Compilation
```bash
npx tsc --noEmit
```

Should show no errors.

### Step 2: Verify tsconfig.json Paths
Add path aliases for easier imports:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Step 3: Test Import Alias
Create a test file:
```bash
echo "export const TEST = true;" > src/lib/test.ts
```

In `src/app/page.tsx`, test:
```typescript
import { TEST } from '@/lib/test';
```

Should work without error.

✅ **Checkpoint:** TypeScript paths configured

---

## Phase 6: Setup Environment Variables (5 minutes)

### Step 1: Create .env.example
```bash
cat > .env.example << 'EOF'
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Guardians of the Spear
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
DATABASE_URL=
NEXT_PUBLIC_GA_ID=
EOF
```

### Step 2: Create .env.local
```bash
cp .env.example .env.local
```

### Step 3: Verify .gitignore
Check `.gitignore` includes:
```
.env.local
.env.*.local
.next/
dist/
build/
node_modules/
```

### Step 4: Verify .env.local is NOT committed
```bash
git status
# Should NOT show .env.local
```

✅ **Checkpoint:** Environment variables configured

---

## Phase 7: Update Root Layout (10 minutes)

### Step 1: Update src/app/layout.tsx
Replace with:
```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Guardians of the Spear',
  description: 'A historical fiction website',
};

export default function root_layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <header className="bg-amber-900 text-white p-4">
          <h1 className="text-3xl font-bold">Guardians of the Spear</h1>
          <nav className="mt-2 flex gap-4">
            <a href="/" className="hover:text-amber-200">Home</a>
            <a href="/chapters" className="hover:text-amber-200">Chapters</a>
            <a href="/characters" className="hover:text-amber-200">Characters</a>
            <a href="/world" className="hover:text-amber-200">World</a>
            <a href="/about" className="hover:text-amber-200">About</a>
          </nav>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-slate-900 text-white p-4 mt-12">
          <p>&copy; 2025 Guardians of the Spear. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
```

### Step 2: Verify Layout Works
```bash
npm run dev
# Open http://localhost:3000
# Should see header, nav, footer
```

✅ **Checkpoint:** Root layout updated

---

## Phase 8: Create Starter Components (10 minutes)

### Step 1: Create Button Component
File: `src/components/ui/button.tsx`
```typescript
interface buttonprops {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  class_name?: string;
  on_click?: () => void;
}

export function button({
  children,
  variant = 'primary',
  class_name = '',
  on_click,
}: buttonprops) {
  const base_styles = 'px-4 py-2 rounded font-semibold transition-colors';
  const variant_styles = variant === 'primary'
    ? 'bg-amber-600 text-white hover:bg-amber-700'
    : 'bg-slate-200 text-slate-900 hover:bg-slate-300';

  return (
    <button
      className={`${base_styles} ${variant_styles} ${class_name}`}
      onClick={on_click}
    >
      {children}
    </button>
  );
}
```

### Step 2: Create Card Component
File: `src/components/ui/card.tsx`
```typescript
interface cardprops {
  title?: string;
  children: React.ReactNode;
  class_name?: string;
}

export function card({ title, children, class_name = '' }: cardprops) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${class_name}`}>
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      {children}
    </div>
  );
}
```

### Step 3: Update Homepage
File: `src/app/page.tsx`
```typescript
import { button } from '@/components/ui/button';
import { card } from '@/components/ui/card';

export default function home_page() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {card({
        title: 'Welcome to Guardians of the Spear',
        children: (
          <div className="space-y-4">
            <p className="text-lg text-slate-700">
              Explore a historical fiction epic spanning ages and continents.
            </p>
            {button({
              children: 'Read First Chapter',
              class_name: 'mt-4',
            })}
          </div>
        ),
      })}
    </div>
  );
}
```

### Step 4: Verify Components Load
```bash
npm run dev
# Open http://localhost:3000
# Should see styled button and card
```

✅ **Checkpoint:** Starter components created

---

## Phase 9: Initialize Git Repository (5 minutes)

### Step 1: Initialize Git
```bash
git init
```

### Step 2: Create .gitignore (if not exists)
Verify it includes:
```
node_modules/
.next/
.env.local
.env.*.local
dist/
build/
*.log
.DS_Store
```

### Step 3: Make Initial Commit
```bash
git add .
git commit -m "feat: initial Next.js setup with TypeScript"
```

### Step 4: Verify Commit
```bash
git log --oneline
# Should show 1 commit
```

✅ **Checkpoint:** Git initialized

---

## Phase 10: Integrate .cursorrules (2 minutes)

### Step 1: Copy Cursor Rules
```bash
cp /Users/werby/GOTS_website/GOTS_website/Review/.cursorrules .
```

### Step 2: Verify File Exists
```bash
ls -la .cursorrules
# Should show the file with content
```

### Step 3: Open in Cursor
```bash
cursor .
```

Cursor should automatically read `.cursorrules` and apply all project rules.

✅ **Checkpoint:** Cursor rules integrated

---

## Phase 11: Configure Cursor IDE (5 minutes)

### Step 1: Open Cursor Settings
- Cmd+, (macOS) or Ctrl+, (Windows)

### Step 2: Set Editor Preferences
- Format on save: ON
- Default formatter: Prettier
- Tab size: 2
- Insert spaces: ON
- End of line: LF

### Step 3: Verify .cursorrules Loads
- Look for `.cursorrules` in file explorer
- Cursor should show project rules in chat context

✅ **Checkpoint:** Cursor IDE configured

---

## Phase 12: Create First Real Component (10 minutes)

### Step 1: Create chapter_card Component
File: `src/components/sections/chaptercard.tsx`
```typescript
interface chapter_cardprops {
  number: number;
  title: string;
  excerpt: string;
  word_count: number;
}

export function chaptercard({
  number,
  title,
  excerpt,
  word_count,
}: chapter_cardprops) {
  return (
    <div className="border border-amber-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-amber-700 font-semibold">Chapter {number}</p>
          <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
        </div>
        <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
          {word_count.toLocaleString()} words
        </span>
      </div>
      <p className="text-slate-700 mb-4">{excerpt}</p>
      <button className="text-amber-600 font-semibold hover:text-amber-700">
        Read More →
      </button>
    </div>
  );
}
```

### Step 2: Test Component
File: `src/app/chapters/page.tsx`
```typescript
import { chaptercard } from '@/components/sections/chaptercard';

export default function chapters_page() {
  const mock_chapters = [
    {
      number: 1,
      title: 'The Beginning',
      excerpt: 'In the shadow of ancient mountains...',
      word_count: 3500,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Chapters</h1>
      <div className="space-y-4">
        {mock_chapters.map((ch) =>
          chaptercard({
            number: ch.number,
            title: ch.title,
            excerpt: ch.excerpt,
            word_count: ch.word_count,
          })
        )}
      </div>
    </div>
  );
}
```

### Step 3: Verify in Browser
```bash
npm run dev
# Open http://localhost:3000/chapters
# Should see styled chapter card
```

✅ **Checkpoint:** First real component created

---

## Phase 13: Production Build Verification (5 minutes)

### Step 1: Build for Production
```bash
npm run build
```

**Expected Output:**
```
Compiled successfully
✓ Linting and type checking
✓ Creating optimized production build
✓ Finalizing page optimization
```

### Step 2: Run Production Build
```bash
npm start
# Opens on http://localhost:3000
```

### Step 3: Test Production Version
- Navigate all pages
- Check console for errors
- Verify styling works

### Step 4: Verify No Build Errors
```bash
npm run lint
# Should pass with no critical errors
```

✅ **Checkpoint:** Production build verified

---

## Final Verification Checklist

- [x] Project created at `~/Projects/personal/gots_website/`
- [x] TypeScript strict mode enabled
- [x] All directories created
- [x] Environment variables configured
- [x] Root layout styled with header, nav, footer
- [x] Button component works
- [x] Card component works
- [x] ChapterCard component works
- [x] Homepage loads without errors
- [x] Git initialized with first commit
- [x] .cursorrules copied to project root
- [x] Cursor IDE opens project
- [x] Production build succeeds
- [x] All TypeScript types correct
- [x] All naming is lowercase
- [x] No console errors in browser

---

## Troubleshooting

### "Port 3000 already in use"
```bash
lsof -i :3000
kill -9 <PID>
npm run dev
```

### "TypeScript errors"
```bash
npx tsc --noEmit
# Check specific errors and fix
```

### "Module not found"
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### "Prettier not formatting"
```bash
# Verify format on save is enabled in Cursor
# Restart Cursor
# Try manual format: Shift+Option+F
```

---

## Next Steps

1. ✅ Complete all 13 phases above
2. ✅ Verify all checkpoints pass
3. ✅ Follow Week 1 in GETTING-STARTED-ROADMAP.md
4. ✅ Create components from initial-components.ts
5. ✅ Setup types from type-definitions.ts

---

**Version:** 1.0  
**Created:** January 18, 2025  
**Project:** Guardians of the Spear (GOTS)  
**Status:** Ready to use
