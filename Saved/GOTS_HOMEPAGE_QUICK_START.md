# GOTS WEBSITE - CHARACTER-FIRST HOMEPAGE GUIDE

**Date**: January 18, 2026  
**Document**: `GOTS_HOMEPAGE_CHARACTER_FIRST.md`  
**Status**: ✅ READY FOR IMPLEMENTATION

---

## QUICK OVERVIEW

Instead of starting with the full story structure, you're using a **character-driven entry point**:

```
Homepage
  ↓
List of Characters (8 clickable cards)
  ↓
Click Character → Character Profile Page
  ↓
See all scenes they appear in
  ↓
Click "Read Story" → Only their scenes (filtered)
  ↓
Navigate through scenes where they appear
```

---

## HOMEPAGE FLOW

### Step 1: User Lands on Homepage (`/`)

Sees:
- **Title**: "Guardians of the Spear"
- **Subtitle**: "A story of grace defeating predation"
- **Call to Action**: "Choose a character and follow their journey through the narrative"
- **8 Character Cards** organized by role:
  - The Hidden Witness (Protagonist)
  - The Predators (Antagonists)
  - The Network (Supporting)
  - The Divine (Spiritual Force)

Each character card shows:
- Character image
- Character name + alternative names
- Role & symbolic meaning
- Brief description (1-2 sentences)
- Journey arc preview
- "Follow Their Story →" button

### Step 2: Click Character Card

Takes user to: `/characters/[character-id]`

### Step 3: Character Profile Page

Shows:
- **Full character profile** (left column):
  - Character image
  - Basic info card (role, symbolic, origin, occupation, first appearance)
  
- **Character details** (center/right):
  - Full name + alternative names
  - Complete description (3-4 paragraphs)
  - Character Journey section:
    - Opening State (who they are at start)
    - Key Transformation (how they change)
    - Closing State (who they are at end)
  - Key themes they embody

- **Scenes They Appear In** (bottom):
  - Card-based list of all scenes featuring character
  - Each scene card shows:
    - Scene title
    - Chapter number
    - Summary
    - Thematic tags
    - "Read →" link
  
  - **Big Call to Action Button**:
    "Start Reading [Character Name]'s Story"

### Step 4: Click "Read Story"

Takes user to: `/characters/[character-id]/read`

Loads first scene featuring that character.

### Step 5: Reading Page

Shows:
- **Scene header** with:
  - Scene title
  - Chapter number
  - Thematic tags
  - Scene summary
  
- **Scene beats** displayed in full (just like regular narrative)

- **Character impact section**:
  - How this scene affects the selected character
  - Turning point indicators

- **Navigation**:
  - Previous/Next scene buttons (only scenes with this character)
  - Progress bar showing "X of Y scenes"
  - Quick scene jump grid (click to jump to any scene)

- **Footer**:
  - Link back to character profile

---

## KEY FILES

### New/Updated Files

**`GOTS_HOMEPAGE_CHARACTER_FIRST.md`** (15,000 words)
- Complete implementation guide
- All React components with working code
- Data types and structures
- Routing layout
- Step-by-step instructions

---

## ROUTES

```
/                                    # Homepage - Character list
  ↓
/characters/[character-id]          # Character profile page
  ↓
/characters/[character-id]/read     # Start reading their scenes
  ↓
[Internal Navigation]               # Jump between scenes of that character
```

---

## COMPONENTS NEEDED

### Homepage
- `character_list.tsx` - Grid of all characters organized by role
- `character_card.tsx` - Individual character preview card

### Character Profile
- `character_profile_view.tsx` - Full character profile display
- `character_scene_list.tsx` - List of scenes they appear in with cards

### Reading View
- `character_story_view.tsx` - Story reader filtered to character's scenes
- Uses existing `beat_display.tsx` to show beat content

---

## DATA STRUCTURE

### Character Data (`/content/characters/[id].json`)
```json
{
  "id": "longinus",
  "name": "Gaius Cassius Longinus",
  "role": "protagonist",
  "opening_state": "...",
  "key_transformation": "...",
  "closing_state": "...",
  ...
}
```

### Character Scenes (`/content/character-scenes/[id].json`)
```json
{
  "character_id": "longinus",
  "scenes": [
    {
      "scene_id": "scene-1-desert-march",
      "title": "The Desert March",
      "chapter": 1,
      "role_in_scene": "POV character",
      "impact": "..."
    },
    ...
  ]
}
```

---

## ADVANTAGES OF THIS APPROACH

✅ **Intuitive UX**
- Users immediately understand: pick character → read their story

✅ **Personalized Experience**
- Each reader follows their favorite character
- Feels like reading from that character's POV

✅ **Simple Navigation**
- No complex hierarchy to learn
- Character → Scenes → Beat is obvious

✅ **Works with Narrative Hierarchy**
- Underneath, you still have Story → Acts → Sequences → Scenes → Beats
- Character filter just limits which scenes are shown

✅ **Scalable**
- Add new characters easily
- Works for Parts 2-3 as you add them
- No structural changes needed

✅ **Encourages Exploration**
- Users might read one character's story
- Then go back to try another character
- Discover connections between characters

---

## IMPLEMENTATION CHECKLIST

### Phase 1: Homepage (Week 1)
- [ ] Create `/page.tsx` with hero section
- [ ] Create `character_list.tsx` component
- [ ] Create `character_card.tsx` component  
- [ ] Populate 8 character JSON files
- [ ] Test character grid display

### Phase 2: Character Profiles (Week 2)
- [ ] Create `/characters/[character-id]/page.tsx`
- [ ] Create `character_profile_view.tsx`
- [ ] Create `character_scene_list.tsx`
- [ ] Create `scene_card.tsx` sub-component
- [ ] Populate character scene data
- [ ] Test profile pages for all characters

### Phase 3: Reading View (Week 2-3)
- [ ] Create `/characters/[character-id]/read/page.tsx`
- [ ] Create `character_story_view.tsx`
- [ ] Integrate with existing `beat_display.tsx`
- [ ] Implement scene navigation
- [ ] Test reading flows

### Phase 4: Polish (Week 3)
- [ ] Mobile responsiveness
- [ ] Loading states
- [ ] Error handling
- [ ] SEO meta tags
- [ ] Test all user flows

---

## EXAMPLE USER JOURNEYS

### Journey 1: Reading Longinus's Story
```
1. Land on homepage
2. See "The Hidden Witness" section
3. Click Longinus character card
4. See his full profile + character arc
5. Click "Start Reading Longinus's Story"
6. Read Scene 1: The Desert March
7. Read Scene 2: Outpost Discovery
8. ... (only scenes with Longinus)
9. Navigation controls to jump between scenes
10. Option to go back and try another character
```

### Journey 2: Exploring Multiple Characters
```
1. Start with Longinus
2. Read a few of his scenes
3. Go back to homepage
4. Click Brutus character card
5. Read his profile
6. Discover his transformation through the story
7. Read scenes featuring Brutus
8. See how he interacts with Longinus from his perspective
```

### Journey 3: Quick Character Comparison
```
1. Click Longinus → see his arc summary
2. Go back to homepage
3. Click Brutus → see his arc summary
4. Compare opening/closing states
5. Understand their relationship through their arcs
```

---

## WHAT'S DIFFERENT FROM NARRATIVE HIERARCHY PLAN

### Narrative Hierarchy Plan
- Entry point: Full story structure (Acts → Sequences → Scenes)
- Reading: Full narrative, or filtered by theme/turning point
- Navigation: Story-centric

### Character-First Plan (NEW)
- Entry point: Characters
- Reading: Only scenes with selected character
- Navigation: Character-centric
- More intuitive for readers who want to follow someone

**They're not mutually exclusive**:
- Homepage uses character-first approach (simpler)
- Underneath, scenes still use narrative hierarchy structure
- You could add a "Read Full Story" link later if desired
- Best of both worlds

---

## NEXT STEPS

### Immediately:
1. **Review**: `GOTS_HOMEPAGE_CHARACTER_FIRST.md`
2. **Understand**: Character → Profile → Scenes flow
3. **Prepare**: 8 character JSON files with all data

### Then:
1. **Open Cursor**
2. **Use the plan**: It has complete working code
3. **Build Phase 1**: Homepage with character grid
4. **Build Phase 2**: Character profile pages
5. **Build Phase 3**: Reading with scene filtering
6. **Deploy**: To Vercel

---

## KEY FEATURES

✅ **Responsive Grid**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

✅ **Character Organization**
- Grouped by role (protagonist, antagonist, supporting, spiritual)
- Clear visual hierarchy

✅ **Profile Pages**
- Character image + full profile
- Arc progression (opening → transformation → closing)
- All scenes they appear in

✅ **Reading Experience**
- Only scenes with selected character shown
- Sequential navigation (previous/next)
- Quick scene jump grid
- Progress indicator
- Beat-level detail

✅ **Navigation Breadcrumbs**
- Always know where you are
- Easy returns to character profile or homepage

---

## STYLING NOTES

Using Tailwind CSS:
- **Dark theme**: slate-900/slate-800 background
- **Accent color**: amber-600/amber-500 (warm, inviting)
- **Hover effects**: Smooth transitions between states
- **Cards**: Rounded with subtle borders and shadows

Visual hierarchy keeps characters as focal points.

---

## COMPLETENESS

The document `GOTS_HOMEPAGE_CHARACTER_FIRST.md` includes:

✅ Complete React component code (all components shown in full)
✅ TypeScript type definitions
✅ Data fetching functions
✅ JSON data structure examples
✅ Routing diagram
✅ Implementation checklist
✅ Example character data
✅ Content organization guide
✅ Step-by-step instructions

**Everything you need to build with Cursor is there.**

---

## STATUS

**✅ READY TO IMPLEMENT**

The plan is:
- Detailed (15,000+ words)
- Comprehensive (covers all components)
- Production-ready (working code examples)
- Cursor-compatible (follows your rules)

Start with Phase 1 (homepage) and build from there.

You've got this! 🚀
