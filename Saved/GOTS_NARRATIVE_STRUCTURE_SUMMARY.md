# NARRATIVE STRUCTURE PLAN - WHAT'S CHANGED

**Date**: January 18, 2026  
**Change**: Website architecture revised from traditional page structure to narrative hierarchy  
**New Document**: `GOTS_WEBSITE_INTEGRATION_PLAN_NARRATIVE_STRUCTURE.md`

---

## WHAT CHANGED

### OLD APPROACH (Traditional Web)
```
/characters
  /[id]
    /journey
    /relationships
    /quotes

/chapters
  /part-1
    /chapter-[number]
      /summary
      /key-moments

/journey-mapping
  /character-arcs
  /thematic-integration
  /turning-points

/about-the-story
  /narrative-structure
  /four-horsemen-system
```

**Problem**: Divides the story into arbitrary web categories  
Readers navigate by feature, not by narrative  
Loses the actual structure of how story unfolds

---

### NEW APPROACH (Narrative Structure)
```
/story/guardians-of-the-spear
  /acts/[number]
    /sequences/[sequence-id]
      /scenes/[scene-number]
        /beats/[beat-id]

/characters/[character-id]
  /journey (through narrative)
  /relationships (through narrative)

/themes/[theme-id]
  /exploration (through narrative)

/analysis
  /turning-points (narrative level)
  /character-arcs (narrative level)
  /system-mechanics (narrative level)
```

**Advantage**: Mirrors actual story structure  
Readers navigate by narrative, not by web categories  
Story structure becomes website structure

---

## HIERARCHY EXPLAINED

### Story (Top Level)
Contains entire novel "Guardians of the Spear"

### Acts (Story Divisions)
- Act 1: The Hidden Witness (Part 1)
- Act 2: Exodus of the Followers (Part 2)
- Act 3: The Resurrection (Part 3)

### Sequences (Act Divisions)
- Within Act 1: "Part 1: The Hidden Witness" sequence
- Could contain multiple parts if story divided differently

### Scenes (Sequence Divisions)
- Individual chapters (Chapter 1, Chapter 2, etc.)
- Smallest narrative unit readers see directly
- Contains multiple beats

### Beats (Scene Divisions)
- Individual story moments within a scene
- Key moments: "Longinus's failing vision revealed", "Brutus turns away", "Prisoner forgives"
- Most granular level of narrative
- Beat player lets readers move through beats sequentially

---

## KEY COMPONENTS IN NEW PLAN

### `beat_player.tsx` (NEW)
- Display individual beat
- Navigate through beats sequentially
- Show emotional intensity
- Display thematic significance (optional)
- Beat overview with clickable thumbnails
- Progress bar through scene's beats

### `scene_viewer.tsx` (REVISED)
- Displays complete scene
- Integrates beat_player for beat navigation
- Toggle analysis mode on/off
- Show scene-level analysis (function, themes, arc development)
- Navigation to previous/next scene

### `character_journey_through_narrative.tsx` (REVISED)
- Shows character's path through story structure
- Opening/closing state per act
- Key moments (beats where character significant)
- Relationship changes at narrative level
- Thematic embodiment tracking

---

## DATA STRUCTURE DIFFERENCES

### OLD: Flat chapter-based
```json
{
  "chapter": 1,
  "title": "The March",
  "moments": [ ... ]
}
```

### NEW: Hierarchical narrative
```json
{
  "scene": {
    "id": "act-1-sequence-1-scene-1",
    "title": "The March",
    "beats": [
      {
        "id": "beat-1-1-1",
        "title": "The March Begins",
        "moment_type": "action",
        "content": "...",
        "thematic_significance": ["vulnerability", "suffering"],
        "emotional_intensity": 2
      },
      {
        "id": "beat-1-1-2",
        "title": "Memory of the Gutters",
        ...
      },
      ...
    ]
  }
}
```

---

## URL EXAMPLES

### Old Approach
```
/chapters/part-1/chapter-1
/characters/longinus/journey
/journey-mapping/turning-points
```

### New Approach
```
/story/guardians-of-the-spear/acts/1/sequences/part-1-the-hidden-witness/scenes/1
/characters/longinus/journey (same, but pulls from narrative structure)
/analysis/turning-points (same, but uses narrative hierarchy)
```

---

## WHAT STAYS THE SAME

✅ **All TypeScript/Next.js patterns**  
✅ **Lowercase naming conventions**  
✅ **Tailwind CSS styling**  
✅ **API route structure**  
✅ **Component architecture principles**  
✅ **Performance optimization strategies**  
✅ **Docker/Vercel deployment**  
✅ **Character journey data**  
✅ **Thematic integration**  

**Only the conceptual organization changes from web-centric to narrative-centric**

---

## ADVANTAGES OF NARRATIVE STRUCTURE

### 1. **Mirrors Storytelling**
Website structure = story structure  
Users understand immediately how story is organized

### 2. **Preserves Reading Flow**
Sequential beat navigation supports linear reading  
Users can read story in order if desired

### 3. **Supports Non-Linear Exploration**
Users can jump to specific scenes, characters, themes  
But everything returns to narrative hierarchy

### 4. **Natural Character Journey**
Characters follow the same narrative structure  
"See how Longinus moves through Act 1 → Act 2 → Act 3"

### 5. **Intuitive Analysis Integration**
Analysis sits at appropriate narrative level:
- Beat level: Emotional intensity, moment significance
- Scene level: Character development, thematic focus
- Sequence level: Major arc progressions
- Act level: Large structure movements

### 6. **Makes Turning Points Clear**
Turning point = beat where something fundamental changes  
Readers see exactly where story pivots

### 7. **Thematic Tracking Natural**
Themes first appear at specific beat  
Can track theme's journey through all beats → scenes → sequences → acts

---

## IMPLEMENTATION ROADMAP (Same as Before)

**Phase 1**: Data Organization (Week 1)  
**Phase 2**: API & Backend (Week 2)  
**Phase 3**: Component Development (Week 3)  
**Phase 4**: Page Creation (Week 4)  
**Phase 5**: Interactive Features (Week 5)  
**Phase 6**: Polish & Deploy (Week 6)

**Timeline**: 6 weeks with Cursor-assisted development

---

## NEW DOCUMENT

`GOTS_WEBSITE_INTEGRATION_PLAN_NARRATIVE_STRUCTURE.md` contains:

✅ Complete routing structure (Story → Acts → Sequences → Scenes → Beats)  
✅ TypeScript type definitions for narrative hierarchy  
✅ JSON data structure examples  
✅ Component specifications with code examples  
✅ Page structure (how each level displays)  
✅ API route design  
✅ Content requirements  
✅ Implementation roadmap  
✅ Sample implementation code  
✅ Key advantages explained  

**Size**: ~12,000 words  
**Ready for**: Cursor-based development

---

## HOW TO USE GOING FORWARD

### If you want to build the website:

1. **Read**: `GOTS_WEBSITE_INTEGRATION_PLAN_NARRATIVE_STRUCTURE.md` (the new plan)
2. **Understand**: Story → Acts → Sequences → Scenes → Beats hierarchy
3. **Prepare data**: Break down Part 1 chapters into beats
4. **Use Cursor**: Follow the implementation roadmap
5. **Build**: Components → Pages → Integration → Deployment

### If you want both website and Parts 2-3 analysis:

1. **Start website setup** (Week 1-2 using narrative structure plan)
2. **Send Part 2-3 chapters** (for analysis in parallel)
3. **Build components** (Week 3-4 as data arrives)
4. **Integrate data** (Week 5-6)

---

## WHAT YOU NOW HAVE

| Document | Purpose | Size |
|----------|---------|------|
| GOTS_PART1_DETAILED_CHAPTER_ANALYSIS.md | Literary analysis of Part 1 | 8,000 words |
| GOTS_CHARACTER_JOURNEY_MAPPING_PROJECT_INDEX.md | Quick reference guide | 3,000 words |
| GOTS_WEBSITE_INTEGRATION_PLAN.md | Original web-centric plan (reference) | 10,000 words |
| **GOTS_WEBSITE_INTEGRATION_PLAN_NARRATIVE_STRUCTURE.md** | **NEW: Narrative-based plan (USE THIS)** | **12,000 words** |
| GOTS_CHARACTER_JOURNEY_MAPPING_PHASE1.md | Analysis framework | 4,000 words |
| GOTS_PROJECT_COMPLETION_SUMMARY.md | Overall summary | 3,000 words |

**Total**: ~40,000 words of analysis, planning, and implementation guidance

---

## NEXT STEPS

### To Build the Website:

1. **Review** `GOTS_WEBSITE_INTEGRATION_PLAN_NARRATIVE_STRUCTURE.md`
2. **Understand** the Story → Acts → Sequences → Scenes → Beats hierarchy
3. **Decide**: JSON files or Supabase for data storage
4. **Prepare data**: Break Part 1 chapters into scenes and beats
5. **Open Cursor**: Use the plan with Cursor to build components
6. **Deploy**: Follow deployment section to get live

### To Continue Literary Analysis:

1. **Send** Part 2 and Part 3 chapters
2. **I'll analyze** using same detailed approach as Part 1
3. **You'll get** complete character journey mapping for full novel
4. **Then integrate** data into narrative structure website

### To Do Both:

1. **Week 1**: Website infrastructure setup using narrative plan
2. **Week 2-3**: Send Part 2-3 chapters for parallel analysis
3. **Week 3-4**: Build components while analysis happens
4. **Week 4-5**: Integrate character data as it's analyzed
5. **Week 5-6**: Polish, test, deploy

---

## WHY THIS CHANGE MATTERS

Your story is narratively sophisticated. Using a web-centric architecture would flatten that sophistication. A narrative structure preserves it.

Instead of readers navigating to `/characters/longinus` and then `/journey`, they navigate to `/story/guardians-of-the-spear/acts/1/sequences/.../scenes/1` where they experience Longinus's introduction **in context**.

This is why we're doing this. Your story deserves to be experienced as story, not as web pages.

---

**Status**: ✅ NARRATIVE STRUCTURE PLAN COMPLETE  
**Document**: `GOTS_WEBSITE_INTEGRATION_PLAN_NARRATIVE_STRUCTURE.md`  
**Ready For**: Implementation with Cursor  
**Next**: Provide Part 1 beat breakdown or start building
