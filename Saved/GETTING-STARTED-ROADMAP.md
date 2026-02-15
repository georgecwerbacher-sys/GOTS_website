# GOTS Website - Getting Started Roadmap
## 4-Week Action Plan to Production

**Created:** January 18, 2025  
**Project:** Guardians of the Spear (GOTS)  
**Location:** `/Users/werby/GOTS_website/GOTS_website/Review/GETTING-STARTED-ROADMAP.md`
**Timeline:** 4 weeks | ~2.5 hours per day | 36-45 hours total

---

## 🚀 QUICK START (30 MINUTES)

### Minute 0-5: Create Project
```bash
cd ~/Projects/personal
npx create-next-app@latest gots_website --yes
cd gots_website
```

### Minute 5-6: Copy Rules
```bash
cp /Users/werby/GOTS_website/GOTS_website/Review/.cursorrules .
```

### Minute 6-7: Open in Cursor
```bash
cursor .
```

### Minute 7-9: Start Dev Server
```bash
npm run dev
```

### Minute 9-30: Verify
- Open http://localhost:3000
- See Next.js welcome page
- Check no errors in console

✅ **Quick Start Complete!** Foundation ready.

---

## 📅 WEEK 1: FOUNDATION & SETUP
**Goal:** Create working website skeleton with all pages  
**Time:** 12-15 hours (2-3 hours per day)  
**Result:** Fully functional site with responsive design

---

## Monday: Complete Next.js Setup (3 hours)

### Morning Session (1-2 hours): Setup Phase
1. **Read:** `next-app-setup.md` Phases 1-5
2. **Create:** Directory structure
   ```bash
   mkdir -p src/components/{ui,layout,sections,shared}
   mkdir -p src/lib/{utils,types,hooks}
   mkdir -p src/app/{about,characters,chapters,world,resources}
   mkdir -p src/app/api/{chapters,characters,world}
   ```
3. **Verify:** TypeScript strict mode
4. **Setup:** Environment variables (.env.example, .env.local)
5. **Update:** Root layout (src/app/layout.tsx) with header, nav, footer

**Checklist:**
- [x] All directories created
- [x] TypeScript strict mode enabled
- [x] .env files configured
- [x] Root layout styled

**Commit:**
```bash
git add .
git commit -m "feat: initial Next.js setup with TypeScript and structure"
```

### Afternoon Session (1-2 hours): Styling Phase
1. **Read:** `tailwind-setup.md`
2. **Update:** `tailwind.config.ts` with custom colors
3. **Update:** `src/app/globals.css` with utilities
4. **Create:** Basic styled components (button, card)

**Checklist:**
- [x] Tailwind customization applied
- [x] Button component styled
- [x] Card component styled
- [x] Homepage looks good

**Commit:**
```bash
git add .
git commit -m "style: customize Tailwind theme and create base components"
```

---

## Tuesday: Type System & API Foundation (3-4 hours)

### Morning Session (1.5 hours): Types
1. **Read:** `type-definitions.ts`
2. **Create:** `src/lib/types/index.ts` with all types
3. **Create:** `src/lib/types/api.ts` with API response types

**Checklist:**
- [ ] Type files created
- [ ] All interfaces defined
- [ ] No TypeScript errors
- [ ] Types import without errors

**Verify:**
```bash
npx tsc --noEmit
# Should pass with no errors
```

### Afternoon Session (1.5-2 hours): API Foundation
1. **Read:** `api-route-templates.ts`
2. **Create:** `src/lib/utils/api_errors.ts`
3. **Create:** `src/lib/utils/validation.ts`
4. **Create:** First API route `src/app/api/chapters/route.ts`
5. **Create:** `src/lib/hooks/use_fetch.ts` custom hook

**Checklist:**
- [ ] API utilities created
- [ ] GET endpoint working
- [ ] Test with curl:
  ```bash
  curl http://localhost:3000/api/chapters
  ```
- [ ] Returns proper JSON format

**Commit:**
```bash
git add .
git commit -m "feat: add API foundation with types, utilities, and hooks"
```

---

## Wednesday: Create Pages (3-4 hours)

### Morning Session (1.5 hours): About & Setup
1. **Create:** `src/app/about/page.tsx`
   - Project synopsis
   - Key themes
   - Author info
   - Use Card components

2. **Create:** `src/components/sections/` folder structure

**Checklist:**
- [ ] About page accessible at /about
- [ ] Styled with components
- [ ] Navigation links work
- [ ] Mobile responsive

### Afternoon Session (1.5-2 hours): Chapters Page
1. **Create:** `src/components/sections/chaptercard.tsx`
   - Display chapter metadata
   - Show word count, excerpt
   - Styled card layout

2. **Create:** `src/app/chapters/page.tsx`
   - Mock chapter data
   - Display in grid
   - Responsive layout

**Checklist:**
- [ ] ChapterCard component works
- [ ] Chapters page displays cards
- [ ] Grid responsive on mobile/tablet/desktop
- [ ] No TypeScript errors

**Commit:**
```bash
git add .
git commit -m "feat: create about and chapters pages with components"
```

---

## Thursday: Characters & World (2-3 hours)

### Morning Session (1 hour): Characters
1. **Create:** `src/components/sections/charactercard.tsx`
   - Character info display
   - Role badge
   - Image support

2. **Create:** `src/app/characters/page.tsx`
   - Mock character data
   - Gallery grid

**Checklist:**
- [ ] CharacterCard component works
- [ ] Characters page displays gallery
- [ ] Role badges visible
- [ ] Mobile responsive

### Afternoon Session (1-2 hours): World
1. **Create:** `src/app/world/page.tsx`
   - Locations section
   - Timeline section
   - Historical context
   - Multiple Card components

**Checklist:**
- [ ] World page accessible
- [ ] Multiple sections organized
- [ ] Uses Card components
- [ ] Styled consistently

**Commit:**
```bash
git add .
git commit -m "feat: create characters and world pages"
```

---

## Friday: Testing & Responsive Verification (2-3 hours)

### Morning Session (1 hour): Quality Checks
```bash
npm run lint      # Check for errors
npm run format    # Format code
npm run build     # Verify production build
npx tsc --noEmit  # TypeScript check
```

**Checklist:**
- [ ] No linting errors
- [ ] Code formatted properly
- [ ] Build succeeds
- [ ] No TypeScript errors

### Afternoon Session (1-2 hours): Responsive Testing
Test all pages on:
- **Mobile (xs: 320px)**
  - Header stacks vertically
  - Navigation responsive
  - Cards stack single column
  - No horizontal scroll
  - Text readable

- **Tablet (md: 768px)**
  - 2-column layout
  - Proper spacing
  - Images scale correctly

- **Desktop (lg: 1024px)**
  - 3-column layout when appropriate
  - Full spacing
  - No layout issues

**Pages to test:**
- [ ] Home page
- [ ] About page
- [ ] Chapters page
- [ ] Characters page
- [ ] World page

**Commit:**
```bash
git add .
git commit -m "fix: ensure responsive design across all breakpoints"
```

---

## ✅ END OF WEEK 1 SUMMARY

### Components Created
- [x] `button.tsx`
- [x] `card.tsx`
- [x] `header.tsx`
- [x] `footer.tsx`
- [x] `chaptercard.tsx`
- [x] `charactercard.tsx`

### Pages Created
- [x] Home page (`/`)
- [x] About page (`/about`)
- [x] Chapters page (`/chapters`)
- [x] Characters page (`/characters`)
- [x] World page (`/world`)

### Technical Setup
- [x] TypeScript strict mode
- [x] All types defined
- [x] API utilities created
- [x] First API route working
- [x] Tailwind customized
- [x] Environment configured

### Quality
- [x] ESLint passes
- [x] Prettier formatted
- [x] TypeScript strict passes
- [x] Build succeeds
- [x] Mobile responsive verified
- [x] All git commits made

---

## 📅 WEEK 2: DATABASE & CONTENT
**Goal:** Connect real database and API  
**Time:** 8-10 hours

### Key Tasks
1. Setup PostgreSQL or MongoDB
2. Install & configure Prisma ORM
3. Create database schema
4. Connect API routes to database
5. Seed initial data
6. Test all endpoints

---

## 📅 WEEK 3: FEATURES & POLISH
**Goal:** Add advanced features and optimize  
**Time:** 10-12 hours

### Key Tasks
1. Create detail pages (`/chapters/[id]`, `/characters/[id]`)
2. Implement search functionality
3. Add user features (bookmarks, favorites)
4. Add SEO metadata to all pages
5. Optimize performance
6. Add analytics

---

## 📅 WEEK 4: DEPLOYMENT
**Goal:** Deploy to production  
**Time:** 6-8 hours

### Key Tasks
1. Setup Docker containerization
2. Build Docker image locally
3. Setup Vercel account
4. Connect GitHub repository
5. Deploy to Vercel
6. Configure environment variables
7. Test production site
8. Setup monitoring

---

## 🎯 DAILY WORKFLOW TEMPLATE

### Morning (9am)
```bash
# 1. Review today's tasks
# 2. Start dev server
npm run dev

# 3. Check for errors
npm run lint
```

### Throughout Day
- [ ] Follow the step for the day
- [ ] Test in browser frequently
- [ ] Use Cursor Chat (Cmd+K) with @Codebase for code generation
- [ ] Use Cursor Inline (Cmd+I) for quick edits
- [ ] Commit every 1-2 hours

### End of Day (5pm)
```bash
# 1. Run full quality checks
npm run build

# 2. Commit remaining changes
git add .
git commit -m "message"

# 3. Format code
npm run format

# 4. Push to GitHub (if applicable)
git push origin branch-name
```

---

## 🚀 MILESTONES & REWARDS

### Milestone 1: Foundation Complete (Week 1)
✅ Project created and running  
✅ All main pages created  
✅ Components working  
✅ Responsive design verified  
**Reward:** You have a working website skeleton!

### Milestone 2: Data Connected (Week 2)
✅ Database setup  
✅ API routes working  
✅ Data displaying dynamically  
**Reward:** Your website has real data!

### Milestone 3: Features Complete (Week 3)
✅ All features implemented  
✅ Search working  
✅ SEO optimized  
**Reward:** Production-ready website!

### Milestone 4: Live on Web (Week 4)
✅ Docker containerized  
✅ Deployed to Vercel  
✅ Live URL working  
**Reward:** Your website is live! 🎉

---

## 📊 TIME TRACKING

| Week | Phase | Hours | Daily |
|------|-------|-------|-------|
| 1 | Foundation | 12-15 | 2.5-3 |
| 2 | Database | 8-10 | 1.5-2 |
| 3 | Features | 10-12 | 2-2.5 |
| 4 | Deployment | 6-8 | 1.5-2 |
| **Total** | **All** | **36-45** | **2.5** |

---

## 📖 REFERENCE GUIDES

Use these files when needed:

- **RULES.md** - Master project rules (consult first)
- **NAMING-CONVENTIONS-LOWERCASE.md** - Naming standards
- **next-app-setup.md** - Next.js setup details
- **initial-components.ts** - Component templates
- **api-route-templates.ts** - API patterns
- **type-definitions.ts** - TypeScript types
- **tailwind-setup.md** - Styling configuration
- **docker-setup.md** - Docker guide
- **GETTING-STARTED-CHECKLIST.md** - Daily checklist

---

## 🎯 SUCCESS CRITERIA

### Week 1 Complete When:
- [ ] 5 pages fully functional
- [ ] 6 components created
- [ ] No TypeScript errors
- [ ] Mobile responsive verified
- [ ] All code committed to Git
- [ ] ESLint passes
- [ ] Production build succeeds

### Week 2 Complete When:
- [ ] Database connected
- [ ] API endpoints working
- [ ] Data persisted in database
- [ ] All CRUD operations work
- [ ] Lighthouse score >80

### Week 3 Complete When:
- [ ] Detail pages working
- [ ] All features implemented
- [ ] SEO metadata added
- [ ] Search functional
- [ ] Lighthouse score >85

### Week 4 Complete When:
- [ ] Docker image builds
- [ ] Deployed to Vercel
- [ ] Production URL works
- [ ] All features working in production
- [ ] Monitoring enabled

---

## 🎓 CURSOR AI USAGE

### Use Cursor for:
- Component generation with `Cmd+K`
- Quick edits with `Cmd+I`
- API route creation
- Type definition help
- Test file generation
- Documentation

### Example Prompts:
```
"Generate a button component using @Codebase patterns with lowercase naming"
"Create an API route at /api/[resource]/route.ts for chapters"
"Build a detail page at app/chapters/[id]/page.tsx"
"Generate tests for @File:src/components/chaptercard.tsx"
```

---

## 🚀 READY TO BEGIN!

**Next Action:** 
1. Follow QUICK START above (30 minutes)
2. Follow Monday in WEEK 1 (3 hours)
3. Continue with the roadmap

**Total to functional website:** 4 weeks, 2.5 hours/day

---

**Version:** 1.0  
**Created:** January 18, 2025  
**Project:** Guardians of the Spear (GOTS)  
**Status:** Ready to launch 🚀
