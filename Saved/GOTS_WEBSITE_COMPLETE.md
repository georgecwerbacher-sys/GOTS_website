# GOTS WEBSITE - NARRATIVE HIERARCHY PLAN COMPLETE

**Date**: January 18, 2026  
**Focus**: Story → Acts → Sequences → Scenes → Beats Architecture  
**Status**: ✅ COMPLETE - Ready for Implementation

---

## 📄 NEW PRIMARY DOCUMENT

**`GOTS_WEBSITE_INTEGRATION_NARRATIVE_HIERARCHY.md`**

This is your **definitive website integration plan** - all other plans are now reference materials only.

**Size**: ~15,000 words  
**Contains**: Complete architectural blueprint for narrative-hierarchical website

---

## WHAT YOU NOW HAVE

### Document Organization

```
MAIN DOCUMENTS:
├── GOTS_PART1_DETAILED_CHAPTER_ANALYSIS.md (8,000 words)
│   Literary analysis of Part 1 - CHARACTER JOURNEYS
│
├── GOTS_WEBSITE_INTEGRATION_NARRATIVE_HIERARCHY.md (15,000 words) ← USE THIS
│   Website architecture using Story → Acts → Sequences → Scenes → Beats
│   Complete with:
│   - Data type definitions (TypeScript)
│   - JSON file structure
│   - Component architecture
│   - API routes
│   - Page templates
│   - Implementation roadmap
│
├── GOTS_CHARACTER_JOURNEY_MAPPING_PROJECT_INDEX.md (3,000 words)
│   Quick reference for character findings
│
├── GOTS_CHARACTER_JOURNEY_MAPPING_PHASE1.md (4,000 words)
│   Analysis framework for Parts 2-3
│
└── GOTS_PROJECT_COMPLETION_SUMMARY.md (3,000 words)
    Overall project summary

REFERENCE DOCUMENTS (Ignore these - old planning):
├── GOTS_WEBSITE_INTEGRATION_PLAN.md (old web-centric approach)
├── GOTS_WEBSITE_INTEGRATION_PLAN_NARRATIVE_STRUCTURE.md (old version)
└── GOTS_NARRATIVE_STRUCTURE_SUMMARY.md (transition doc)
```

---

## THE ARCHITECTURE: STORY → ACTS → SEQUENCES → SCENES → BEATS

### Narrative Hierarchy

```
Story
├── Act I: The Hidden Witness (Part 1)
│   ├── Sequence 1: The March
│   │   ├── Scene 1: The Desert March
│   │   │   ├── Beat 1: The Armor Burden
│   │   │   ├── Beat 2: Memory of Rome's Gutters
│   │   │   └── Beat 3: Brutus Observes
│   │   └── Scene 2: Outpost Discovery
│   ├── Sequence 2: The Breakdown
│   │   ├── Scene 1: Parade Ground Failure
│   │   └── Scene 2: False Reprieve & Death Squad
│   └── Sequence 3: The Crucifixion
│       ├── Scene 1: The Presentation
│       ├── Scene 2: The Mounting
│       ├── Scene 3: The Mercy
│       └── Scene 4: The Piercing & The Light
├── Act II: The Exodus (Part 2)
└── Act III: The Resurrection (Part 3)
```

### URL Structure

```
/story/act-1/sequence-1/scene-1/beat-1
/story/act-1/sequence-1/scene-1/beat-1/analysis
/story/act-1/sequence-2/scene-1
/story/act-2/sequence-n/scene-n/beat-n
```

---

## KEY FEATURES IN NEW PLAN

### 1. TypeScript Type Definitions
Complete types for entire hierarchy:
- `story` interface
- `act` interface
- `sequence` interface
- `scene` interface
- `beat` interface
- `narrative_arc_point`, `beat_connection`, `character_beat_presence`

All in strict TypeScript mode following your conventions.

### 2. JSON Data Structure
Organized following narrative hierarchy:
```
src/content/narrative/
├── story.json
└── acts/
    ├── act-1/
    │   └── sequences/
    │       ├── sequence-1/
    │       │   └── scenes/
    │       │       ├── scene-1/
    │       │       │   └── beats/
    │       │       │       ├── beat-1.json
    │       │       │       └── ...
```

### 3. Component Architecture
Organized by narrative level:
- `beat_display.tsx` - Individual beat
- `scene_container.tsx` - Complete scene with beats
- `sequence_container.tsx` - All scenes in sequence
- `act_container.tsx` - Full act structure
- `story_viewer.tsx` - Complete story

Plus navigation and analysis components.

### 4. API Routes
One route per narrative level:
```
GET /api/story/act-[id]/sequence-[id]/scene-[id]/beat-[id]
GET /api/story/act-[id]/sequence-[id]/scene-[id]
GET /api/story/act-[id]/sequence-[id]
GET /api/story/act-[id]
```

### 5. Page Templates
One template per level:
- Story page
- Act page
- Sequence page
- Scene page
- Beat page (with optional analysis)

### 6. Implementation Roadmap
6-week phased plan:
- Week 1: Data structure
- Week 2: API development
- Week 3-4: Components
- Week 4-5: Pages
- Week 5-6: Features & deploy

---

## CONTENT INCLUDED IN PLAN

### Complete Data Model

Example Act I with all sequences, scenes, and beats already defined:

```json
{
  "act": {
    "id": "act-1-hidden-witness",
    "title": "The Hidden Witness",
    "sequences": [
      {
        "id": "seq-1-the-march",
        "scenes": [
          {
            "id": "scene-1-desert-march",
            "beats": [
              {
                "id": "beat-1-armor-burden",
                "title": "The Armor Burden",
                "content": "...",
                "emotional_intensity": 2,
                "thematic_significance": "..."
              }
              // ... all beats for this scene
            ]
          }
          // ... all scenes for this sequence
        ]
      }
      // ... all sequences for this act
    ]
  }
}
```

**This is NOT just architecture - it's a complete working example you can use as template.**

### Complete Component Examples

Production-ready code for:
- `beat_display.tsx` - Full working component
- `scene_container.tsx` - Full working component
- API route example - Ready to copy/paste

### Complete Page Templates

Design for every page type:
- Story page layout
- Act page layout
- Sequence page layout
- Scene page layout
- Beat page layout

Each with specific content, navigation, and features.

---

## WHAT MAKES THIS DIFFERENT FROM OLD PLANS

### OLD Plans
- ✗ Web-centric thinking (pages, sections)
- ✗ Divided story into abstract categories
- ✗ Lost narrative structure in web structure
- ✗ Reader navigates by feature, not story

### NEW Plan
- ✅ Narrative-centric thinking (hierarchy mirrors story)
- ✅ Preserves actual story structure
- ✅ Website structure = narrative structure
- ✅ Reader navigates through story naturally

---

## HOW TO USE THIS DOCUMENT

### Step 1: Understand the Hierarchy
Read sections on:
- Part 1: Narrative Hierarchy Data Model
- Part 2: Website Routing Structure

Understand: Story → Acts → Sequences → Scenes → Beats

### Step 2: Review Component Architecture
Section Part 3 shows:
- Which components exist
- How they relate to each other
- Example code for key components

### Step 3: Prepare Your Data
Follow the JSON structure in Part 1 to organize:
- Your chapters into scenes
- Your scenes into beats
- Your beats into sequences
- Your sequences into acts

Example Act I structure provided as template.

### Step 4: Follow Implementation Roadmap
Part 6 provides 6-week plan:
- What to build each week
- Dependencies between phases
- Testing checkpoints

### Step 5: Build with Cursor
Use the plan + example code with Cursor to:
- Create components
- Build pages
- Connect API routes
- Deploy

---

## IMPLEMENTATION CHECKLIST

### Phase 1: Data Setup (Week 1)
- [ ] Create `src/content/narrative/` directory structure
- [ ] Create `story.json` with all metadata
- [ ] Create `acts/act-1/` directory structure
- [ ] Create sequence JSON files
- [ ] Create scene JSON files
- [ ] Create all beat JSON files for Act I
- [ ] Validate all IDs and connections

### Phase 2: API Routes (Week 2)
- [ ] Create `/api/story` endpoint
- [ ] Create `/api/story/act-[id]` endpoint
- [ ] Create `/api/story/act-[id]/sequence-[id]` endpoint
- [ ] Create `/api/story/act-[id]/sequence-[id]/scene-[id]` endpoint
- [ ] Create `/api/story/act-[id]/sequence-[id]/scene-[id]/beat-[id]` endpoint
- [ ] Test all endpoints
- [ ] Document API

### Phase 3: Components (Week 3-4)
- [ ] Create `beat_display.tsx`
- [ ] Create `scene_container.tsx`
- [ ] Create `sequence_container.tsx`
- [ ] Create `act_container.tsx`
- [ ] Create `story_viewer.tsx`
- [ ] Create `narrative_breadcrumb.tsx`
- [ ] Create navigation components
- [ ] Create analysis components

### Phase 4: Pages (Week 4-5)
- [ ] Create `/story` page
- [ ] Create `/story/act-[id]` page
- [ ] Create `/story/act-[id]/sequence-[id]` page
- [ ] Create `/story/act-[id]/sequence-[id]/scene-[id]` page
- [ ] Create `/story/act-[id]/sequence-[id]/scene-[id]/beat-[id]` page
- [ ] Set up routing for all pages
- [ ] Implement breadcrumb navigation

### Phase 5: Features (Week 5-6)
- [ ] Character journey tracker
- [ ] Thematic visualization
- [ ] Turning points map
- [ ] Relationship explorer
- [ ] Mask integrity tracker

### Phase 6: Deploy (Week 6-7)
- [ ] Performance testing
- [ ] Mobile responsive testing
- [ ] Accessibility audit
- [ ] Docker container setup
- [ ] Vercel deployment
- [ ] Analytics integration

---

## KEY ADVANTAGES

✅ **Narrative Integrity**: Website structure mirrors story structure
✅ **Reader Experience**: Navigate naturally through story
✅ **Granular Control**: Users can read at beat, scene, sequence, or act level
✅ **Thematic Exploration**: Follow themes through narrative
✅ **Character Tracking**: See journeys explicitly through hierarchy
✅ **Sequential Reading**: Can read straight through if desired
✅ **Non-Linear Access**: Jump to specific beats/scenes/themes
✅ **Analysis Integration**: Each level has appropriate analysis
✅ **Professional Architecture**: Production-ready TypeScript code
✅ **Scalable**: Easy to add Acts II and III later

---

## NEXT STEPS

### To Begin Implementation:

1. **Read**: `GOTS_WEBSITE_INTEGRATION_NARRATIVE_HIERARCHY.md`
   (Focus on Parts 1-3: Data Model, Routing, Components)

2. **Understand**: Story → Acts → Sequences → Scenes → Beats hierarchy

3. **Prepare Data**: Break Part 1 chapters into JSON following examples provided

4. **Open Cursor**: Use the plan + code examples to build components

5. **Build**: Follow 6-week roadmap, one phase at a time

### Optional: Continue Literary Analysis

If you also want Parts 2-3 analyzed:
- Send chapters to me
- I'll analyze with same depth as Part 1
- You can integrate character data as it arrives

---

## DOCUMENT REFERENCE

| Document | Purpose | Size | Status |
|----------|---------|------|--------|
| GOTS_WEBSITE_INTEGRATION_NARRATIVE_HIERARCHY.md | **Website Plan (PRIMARY)** | **15,000 words** | **← USE THIS** |
| GOTS_PART1_DETAILED_CHAPTER_ANALYSIS.md | Character Journey Analysis | 8,000 words | Reference |
| GOTS_CHARACTER_JOURNEY_MAPPING_PHASE1.md | Analysis Framework | 4,000 words | Reference |
| GOTS_CHARACTER_JOURNEY_MAPPING_PROJECT_INDEX.md | Quick Reference | 3,000 words | Reference |
| GOTS_PROJECT_COMPLETION_SUMMARY.md | Project Summary | 3,000 words | Reference |

**Old documents** (ignore - kept for reference only):
- GOTS_WEBSITE_INTEGRATION_PLAN.md
- GOTS_WEBSITE_INTEGRATION_PLAN_NARRATIVE_STRUCTURE.md
- GOTS_NARRATIVE_STRUCTURE_SUMMARY.md

---

## WHAT YOU'RE READY TO DO

✅ **Build Website**: You have complete blueprint + code examples
✅ **Organize Data**: You have JSON structure template
✅ **Create Components**: You have working code to start with
✅ **Deploy**: You have full roadmap through deployment
✅ **Continue Analysis**: You have framework for Parts 2-3

---

## FINAL THOUGHTS

You're creating something sophisticated and beautiful:
- A novel about grace defeating predation
- A website that honors that narrative structure
- An interactive experience that lets readers explore deeply
- A professional implementation using modern tech stack

This is exactly what your story deserves.

**Everything you need is in `GOTS_WEBSITE_INTEGRATION_NARRATIVE_HIERARCHY.md`**

Start there. Build from there. You've got this. 🚀

---

**Status**: ✅ ALL DOCUMENTATION COMPLETE
**Primary Document**: `GOTS_WEBSITE_INTEGRATION_NARRATIVE_HIERARCHY.md`
**Ready For**: Cursor-based implementation
**Next Step**: Begin Phase 1 data organization
