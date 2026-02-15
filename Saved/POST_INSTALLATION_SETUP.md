# Post-Installation Setup Guide - Getting Started with GOTS Development

After completing the full macOS developer environment installation, follow these step-by-step instructions to verify everything works and prepare for GOTS website development.

---

## Phase 1: Verification (15 minutes)

Verify that all installed applications are working correctly before proceeding.

### Step 1.1: Verify Git Installation and Configuration

Open Terminal and run:

```bash
git --version
```

**Expected output:** `git version 2.52.0` or higher

Verify your Git configuration:

```bash
git config --global user.name
git config --global user.email
git config --global init.defaultBranch
```

**Expected output:**
```
Your Full Name
your.email@example.com
main
```

If any configuration is missing, set it again:

```bash
git config --global user.name "Your Full Name"
git config --global user.email "your.email@example.com"
```

### Step 1.2: Verify Node.js and npm Installation

```bash
node -v
npm -v
```

**Expected output:**
- Node: `v22.x.x` or `v24.x.x` (LTS versions)
- npm: `v10.x` or `v11.x`

Verify nvm is working:

```bash
nvm --version
nvm list
```

**Expected output:**
```
0.40.1
->      v22.x.x (currently using 64-bit executable)
         system
default -> node (-> v22.x.x)
```

### Step 1.3: Verify Docker Desktop Installation

```bash
docker --version
docker compose version
```

**Expected output:**
- Docker: `Docker version 4.54.0` or higher
- Compose: `Docker Compose version v2.40.3` or higher

Test Docker is running:

```bash
docker run hello-world
```

**Expected output:**
```
Hello from Docker!
This message shows that your installation appears to be working correctly.
```

If Docker fails, ensure Docker Desktop is running:
- Open Applications → Docker
- Wait for Docker icon in menu bar
- Try the command again

### Step 1.4: Verify Cursor IDE Installation

From Terminal:

```bash
cursor --version
```

Or open Cursor manually:
- Applications folder → Cursor
- Should launch without errors

### Step 1.5: Verify Vercel CLI Installation

```bash
vercel --version
```

**Expected output:** `Vercel CLI 50.4.5` or higher

### Step 1.6: Summary Verification Script

Run all verifications at once:

```bash
echo "=== Git ===" && git --version && \
echo "=== Node.js ===" && node -v && \
echo "=== npm ===" && npm -v && \
echo "=== Docker ===" && docker --version && \
echo "=== Vercel CLI ===" && vercel --version && \
echo "=== nvm ===" && nvm --version
```

**All commands should complete without errors.**

---

## Phase 2: Shell Configuration Optimization (5 minutes)

Ensure your Terminal is properly configured for development.

### Step 2.1: Verify Shell Configuration

Check your shell:

```bash
echo $SHELL
```

**Should output:** `/bin/zsh` (modern macOS default)

### Step 2.2: Verify .zshrc Configuration

Open the configuration file:

```bash
cat ~/.zshrc
```

**Should include these lines:**
```bash
eval "$(/opt/homebrew/bin/brew shellenv)"
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

If missing, add them:

```bash
nano ~/.zshrc
```

Add the lines, save with `Ctrl+O`, press Enter, then `Ctrl+X` to exit.

Reload configuration:

```bash
source ~/.zshrc
```

### Step 2.3: Create Projects Directory

Create organized project structure:

```bash
mkdir -p ~/Projects/personal
cd ~/Projects/personal
```

Verify:

```bash
ls -la ~/Projects/
```

---

## Phase 3: Initial Git Setup (5 minutes)

### Step 3.1: Create GitHub Account (if needed)

Visit https://github.com/signup and create account.

### Step 3.2: Configure Git SSH (Optional but Recommended)

Generate SSH key:

```bash
ssh-keygen -t ed25519 -C "your.email@example.com"
```

**Press Enter** for all prompts to accept defaults.

Display your public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

Add to GitHub:
1. Go to GitHub Settings → SSH and GPG keys
2. Click "New SSH key"
3. Paste the output from above
4. Name it "Mac Development"
5. Click "Add SSH key"

Test connection:

```bash
ssh -T git@github.com
```

**Expected output:** `Hi [username]! You've successfully authenticated...`

---

## Phase 4: Create Your First Next.js Project (10 minutes)

### Step 4.1: Navigate to Projects Directory

```bash
cd ~/Projects/personal
```

### Step 4.2: Create Next.js Project

```bash
npx create-next-app@latest gots-starter --yes
```

This creates a project with:
- TypeScript enabled ✅
- Tailwind CSS enabled ✅
- ESLint enabled ✅
- App Router enabled ✅
- Turbopack enabled ✅

### Step 4.3: Navigate to Project

```bash
cd gots-starter
```

### Step 4.4: Verify Project Structure

```bash
ls -la
```

**Should include:**
- `src/` directory
- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `.eslintrc.json`
- `tailwind.config.ts`

### Step 4.5: Install Dependencies

```bash
npm install
```

**Wait for completion** - first installation may take 2-3 minutes.

---

## Phase 5: Open Project in Cursor IDE (5 minutes)

### Step 5.1: Open Project from Command Line

```bash
cursor .
```

Cursor launches with your project loaded.

**Or manually:**
1. Open Cursor application
2. File → Open Folder
3. Navigate to `~/Projects/personal/gots-starter`
4. Click "Open"

### Step 5.2: Explore Project Structure in Cursor

In Cursor sidebar, you should see:
```
gots-starter/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
├── public/
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

### Step 5.3: Review Key Files

Open `src/app/page.tsx`:
- Should show TypeScript React component
- Demonstrates proper component structure

### Step 5.4: Install Cursor Extensions

In Cursor, open Extensions (Cmd+Shift+X):

```
Search and install:
- ESLint
- Prettier
- TypeScript Vue Plugin
- REST Client (optional)
```

---

## Phase 6: Run Development Server (5 minutes)

### Step 6.1: Start Development Server in Cursor

Open Cursor Terminal (Ctrl+`):

```bash
npm run dev
```

**Expected output:**
```
> gots-starter@0.1.0 dev
> next dev

  ▲ Next.js 16.1.2
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 1.2s
```

### Step 6.2: Verify Server is Running

Open browser and navigate to:

```
http://localhost:3000
```

**Should see:** Next.js welcome page with "Get started by editing..."

### Step 6.3: Test Hot Reload

Edit `src/app/page.tsx`:
- Find the text content
- Change "Get started" to "Testing hot reload"
- Save file (Cmd+S)
- Browser updates automatically

**This verifies hot reload is working.**

### Step 6.4: Stop Development Server

In Terminal: `Ctrl+C`

---

## Phase 7: Docker Setup (5 minutes)

### Step 7.1: Verify Docker Desktop is Running

Click on Docker menu icon in top menu bar. Should show "Docker is running."

### Step 7.2: Create Dockerfile for Next.js Project

In project root (`gots-starter/`), create `Dockerfile`:

```bash
curl -o Dockerfile https://raw.githubusercontent.com/vercel/next.js/canary/examples/with-docker/Dockerfile
```

Or create manually in Cursor:

```dockerfile
FROM node:22-alpine AS base
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build
COPY . .
RUN npm run build

# Runtime
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

### Step 7.3: Create .dockerignore

```bash
cat > .dockerignore << 'EOF'
node_modules
npm-debug.log
.git
.gitignore
README.md
.next
.env.local
EOF
```

### Step 7.4: Build Docker Image

```bash
docker build -t gots-starter:latest .
```

**Wait for build completion** - first build takes 1-2 minutes.

### Step 7.5: Run Container

```bash
docker run -p 3000:3000 gots-starter:latest
```

**Expected output:**
```
> gots-starter@0.1.0 start
> next start

> Ready on http://0.0.0.0:3000
```

### Step 7.6: Verify Container

Open browser to `http://localhost:3000` - should see Next.js app.

Stop container: `Ctrl+C`

---

## Phase 8: Vercel Deployment Setup (5 minutes)

### Step 8.1: Initialize Vercel Project

```bash
vercel
```

**Answer prompts:**
```
? Set up and deploy "~/Projects/personal/gots-starter"? → yes
? Which scope? → [Your GitHub Account]
? Linked to [your-account]/gots-starter [Y/n]? → yes
? Create "~/Projects/personal/gots-starter/.vercel"? → yes
```

### Step 8.2: View Deployment

After setup, Vercel provides:
- Production URL: `https://gots-starter-[random].vercel.app`
- Preview deployments on pull requests

### Step 8.3: Test Local Vercel Development Server

```bash
vercel dev
```

**Should start local development server at `http://localhost:3000`**

### Step 8.4: Link to GitHub Repository (Optional)

1. Create repository on GitHub at https://github.com/new
2. Name: `gots-starter`
3. Click "Create repository"
4. Follow GitHub instructions to push local code:

```bash
git init
git add .
git commit -m "Initial commit: Next.js starter project"
git branch -M main
git remote add origin https://github.com/[your-username]/gots-starter.git
git push -u origin main
```

---

## Phase 9: Git Workflow Practice (5 minutes)

### Step 9.1: Create Feature Branch

```bash
git checkout -b feature/test-setup
```

### Step 9.2: Make a Test Change

Edit `src/app/page.tsx`, change page heading, save.

### Step 9.3: Verify Git Status

```bash
git status
```

**Expected output:**
```
On branch feature/test-setup
Changes not staged for commit:
  modified:   src/app/page.tsx
```

### Step 9.4: Stage and Commit

```bash
git add src/app/page.tsx
git commit -m "feat: update page heading"
```

### Step 9.5: View Git Log

```bash
git log --oneline -5
```

---

## Phase 10: TypeScript Verification (5 minutes)

### Step 10.1: Verify TypeScript Configuration

```bash
cat tsconfig.json | grep -A 5 '"strict"'
```

**Should show:**
```
"strict": true,
```

### Step 10.2: Test TypeScript Strict Mode

In Cursor, open `src/app/page.tsx` and intentionally add a type error:

```typescript
function testFunction(value: number) {
  return value.toUpperCase(); // Error: Property 'toUpperCase' does not exist on type 'number'
}
```

**TypeScript should immediately show red error underline in editor.**

### Step 10.3: Fix the Error

```typescript
function testFunction(value: string) {
  return value.toUpperCase(); // ✓ No error
}
```

**Error disappears.**

### Step 10.4: Run TypeScript Check

```bash
npx tsc --noEmit
```

Should complete without errors (or show only intentional issues you added).

---

## Phase 11: NPM Scripts Verification (5 minutes)

### Step 11.1: View Available Scripts

```bash
npm run
```

**Should list:**
```
dev           - Start dev server
build         - Create production build
start         - Start production server
lint          - Run ESLint
```

### Step 11.2: Test Lint Command

```bash
npm run lint
```

**Should complete without errors** for a fresh project.

### Step 11.3: Test Build Command

```bash
npm run build
```

**Expected output:**
```
Creating an optimized production build...
Compiled successfully
```

**This creates `.next/` production build directory.**

### Step 11.4: Test Production Start

```bash
npm start
```

**Runs the production build locally at `http://localhost:3000`**

Stop with `Ctrl+C`

---

## Phase 12: Configure for GOTS Project (10 minutes)

### Step 12.1: Review RULES.md

```bash
open /Users/werby/GOTS_website/GOTS_website/Review/RULES.md
```

Read sections:
- ⚠️ CRITICAL: File Saving Protocol
- ⚠️ TypeScript Mandate
- Section 1: Technology Stack Rules
- Section 19: Cursor IDE Integration

### Step 12.2: Create .cursorrules File

In project root (`gots-starter/`), create `.cursorrules`:

```bash
curl -o .cursorrules https://raw.githubusercontent.com/antml:cite/GOTS/main/.cursorrules
```

Or create manually in Cursor with content from RULES.md Section 20.

### Step 12.3: Create .env.example

```bash
cat > .env.example << 'EOF'
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Guardians of the Spear
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
EOF
```

### Step 12.4: Create .env.local

```bash
cp .env.example .env.local
```

**Never commit `.env.local` - only `.env.example`**

### Step 12.5: Add to .gitignore

```bash
echo ".env.local" >> .gitignore
echo ".DS_Store" >> .gitignore
```

---

## Phase 13: First Development Session (15 minutes)

### Step 13.1: Open Project in Cursor

```bash
cd ~/Projects/personal/gots-starter
cursor .
```

### Step 13.2: Create TypeScript Component

In Cursor, create `src/components/Welcome.tsx`:

```typescript
interface WelcomeProps {
  title: string;
  description: string;
}

export default function Welcome({ title, description }: WelcomeProps) {
  return (
    <div className="p-8 bg-blue-50 rounded-lg">
      <h2 className="text-2xl font-bold text-blue-900">{title}</h2>
      <p className="mt-2 text-blue-700">{description}</p>
    </div>
  );
}
```

### Step 13.3: Use Component in Page

Edit `src/app/page.tsx`:

```typescript
import Welcome from '@/components/Welcome';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Welcome 
        title="Welcome to GOTS" 
        description="Guardians of the Spear - Historical Fiction Website"
      />
    </main>
  );
}
```

### Step 13.4: Start Dev Server

```bash
npm run dev
```

Browser shows your custom component.

### Step 13.5: Commit Changes

```bash
git add .
git commit -m "feat: add Welcome component"
```

---

## Phase 14: Final Checklist

Verify everything is working:

- [x] Git installed and configured
- [x] Node.js and npm working (verified versions)
- [x] nvm managing Node.js versions
- [x] Docker Desktop running and tested
- [x] Cursor IDE installed and opened projects
- [x] Vercel CLI authenticated and working
- [ ] Next.js project created with TypeScript
- [ ] Development server runs (`npm run dev`)
- [x] Hot reload working
- [ ] Docker container builds and runs
- [ ] Vercel deployment initialized
- [ ] Git repository initialized
- [ ] TypeScript strict mode enabled
- [ ] Component created and working
- [ ] Commits made with conventional messages

---

## Phase 15: Ready for GOTS Development

Once all phases complete, you're ready to begin GOTS website development:

1. **Review Project Structure** - Align with RULES.md Section 2
2. **Set Up Pages** - Create About, Characters, Chapters, World sections
3. **Build Components** - Follow Section 5 (Component Architecture)
4. **Create API Routes** - Implement chapters, characters endpoints (Section 7)
5. **Configure Database** - If needed for content storage
6. **Deploy to Vercel** - Push to `main` branch for production
7. **Monitor with Cursor** - Use AI for code generation and refinement

---

## Troubleshooting Quick Reference

| Issue | Solution |
|-------|----------|
| "npm: command not found" | Reload shell: `source ~/.zshrc` |
| Docker won't start | Open Docker Desktop app from Applications |
| Port 3000 in use | Kill process: `lsof -i :3000` then `kill -9 [PID]` |
| TypeScript errors in Cursor | Verify tsconfig.json exists, reload Cursor |
| Git shows "not a git repository" | Run `git init` in project directory |
| Vercel CLI authentication fails | Run `vercel logout` then `vercel login` |
| Cursor says "TypeScript server crashed" | Reload window: Cmd+Shift+P → "Developer: Reload Window" |

---

## Next Steps

After completing all phases:

1. **Weekly Maintenance** - Run `brew update && brew upgrade` every Sunday
2. **Keep Learning** - Review RULES.md monthly for best practices
3. **Start GOTS Development** - Create new `feature/` branches for features
4. **Use Cursor AI** - Reference @Codebase in Cursor Chat for code generation
5. **Deploy Regularly** - Push to `main` for Vercel deployments

---

**You're now fully set up for GOTS website development! 🚀**