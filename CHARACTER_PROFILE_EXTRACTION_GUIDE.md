# Character Profile Extraction Guide for Cursor

**Purpose**: Extract reader-facing character information from full profiles  
**Scope**: Create detailed character pages that help readers understand characters deeply  
**Status**: Ready for implementation

---

## WHAT TO INCLUDE (Reader-Relevant)

### ✅ INCLUDE

- **Full name & alternative names**
- **Role in the story**
- **Physical description** (age, build, distinctive features, appearance)
- **Personality** (traits, strengths, flaws, emotional landscape)
- **Motivations and conflicts**
- **Relationships with other characters**
- **Story arc** (opening state → transformation → closing state)
- **Why readers care about this character**
- **Key moments in their journey**
- **Thematic significance**

---

## WHAT TO EXCLUDE (Writer-Only)

### ❌ EXCLUDE

- **Midjourney Prompts** (AI image generation notes)
- **Writing Voice Guidelines** (how author should write them)
- **Character Voice Details** (speech patterns for dialogue writing)
- **Authorial Intent** (why writer created them, craft notes)
- **Internal References** (writer's file organization)
- **Placeholder Notes** (draft sections, TBDs)
- **Revision History** (what changed and why)
- **Writer's Personal Notes** (brainstorm ideas, development notes)

---

## CURSOR PROMPT FOR EXTRACTION

Use this prompt when extracting from your character profiles:

```
I have a character profile from my novel "Guardians of the Spear". 
I need you to extract READER-FACING information and convert to JSON format.

INCLUDE:
- Full name, alternative names, role
- Physical description (age, build, distinctive features, appearance)
- Personality (traits, strengths, flaws, emotional landscape)
- Motivations and conflicts
- Relationships with other characters
- Story arc (opening → transformation → closing)
- Why readers care about this character
- Key moments in their journey
- Thematic significance
- Character questions for readers

EXCLUDE:
- Midjourney prompts
- Writing voice guidelines
- Speech pattern notes
- Authorial intent or craft notes
- Internal references
- Placeholder notes
- Writer's brainstorm notes

Format as valid JSON with this structure:
{
  "character": {
    "id": "character-id",
    "image": "/images/characters/[category]/[character-id].webp",
    "identification": { ... },
    "physical_description": { ... },
    "personality": { ... },
    "relationships": [ ... ],
    "story_arc": { ... },
    "thematic_significance": [ ... ],
    "key_moments": [ ... ],
    "why_readers_care": "...",
    "character_questions_for_readers": [ ... ]
  }
}

Character profile to extract:

[PASTE CHARACTER PROFILE HERE]
```

---

## WORKFLOW

### 1. Find Character Profile
```
Location: /Users/werby/Projects/Guardians_of_the_Spear/PROFILE_SYSTEM/CHARACTER_PROFILES/
Example: Followers/Guardians/CHARACTER_Cassius_Longinus_Mercator_Profile.md
```

### 2. Copy Profile to Cursor
- Open profile in Cursor
- Select all text (Cmd+A / Ctrl+A)
- Copy

### 3. Paste into Chat with Prompt
- Open Cursor chat
- Paste the extraction prompt above
- At bottom: paste character profile
- Send

### 4. Get JSON Output
- Cursor extracts reader-relevant data
- Returns valid JSON

### 5. Create JSON File
```
Create: src/content/characters/[character-id].json
Example: src/content/characters/cassius-longinus-mercator.json
Paste: JSON output from Cursor
```

### 6. Repeat for All Characters
- 46+ character profiles in PROFILE_SYSTEM
- One JSON file per character
- Complete coverage of your cast

---

## EXAMPLE JSON STRUCTURE

```json
{
  "character": {
    "id": "cassius-longinus-mercator",
    "image": "/images/characters/followers/guardians/longinus.webp",
    
    "identification": {
      "full_name": "Cassius Longinus Mercator",
      "alternative_names": ["The Spear Bearer", "The Archer", "Longinus"],
      "role": "The Sacred Spear Bearer; witness to resurrection",
      "category": "Followers / Guardians",
      "story_status": "Primary protagonist through Chapter 24",
      "primary_narrative_function": "Bridge between Roman occupation and divine intervention"
    },
    
    "physical_description": {
      "age": "24-26 years old",
      "build": "Compact, wiry frame (5'6\"); athletic, lean",
      "distinctive_features": {
        "eyes": "Pre-disease: legendary clarity; post-resurrection: perfect clarity with luminous quality",
        "scars": "Multiple thin scars; prominent scar across left ribs",
        "hands": "Calloused; unusual dexterous precision"
      },
      "visual_signature": "Compact frame with intense assessing eyes; centurion's armor with visible authority; spear positioned as extension of identity"
    },
    
    "personality": {
      "primary_traits": [
        {
          "trait": "Exceptional Accuracy/Precision",
          "description": "Defines identity and self-worth"
        },
        {
          "trait": "Survivor's Resilience",
          "description": "Street origins grant danger assessment and endurance"
        },
        {
          "trait": "Compassion & Empathy",
          "description": "Recognizes humanity especially in the downtrodden"
        },
        {
          "trait": "Moral Integrity",
          "description": "Experiences conflict when duty violates conscience"
        },
        {
          "trait": "Loyal Adaptability",
          "description": "Deep loyalty with capacity to adjust approaches"
        }
      ],
      
      "strengths": [
        {
          "strength": "Exceptional Accuracy",
          "shows_in": "Target perfection, life-saving throws"
        },
        {
          "strength": "Survival Instinct",
          "shows_in": "Crisis decisions, strategic positioning"
        }
      ],
      
      "flaws_and_vulnerabilities": [
        {
          "flaw": "Identity Insecurity",
          "manifestation": "Street orphan wearing centurion's armor"
        },
        {
          "flaw": "Vision Disease",
          "manifestation": "Greatest gift being stolen"
        }
      ],
      
      "core_motivations": [
        "Prove worth beyond street origins",
        "Protect those he cares about",
        "Navigate conflicts between duty and conscience"
      ]
    },
    
    "relationships": [
      {
        "character_id": "malchus-bar-eleazar",
        "character_name": "Malchus bar Eleazar",
        "relationship_type": "Mentor/Father Figure",
        "dynamic": "Deep loyalty; sees as savior from street life"
      }
    ],
    
    "story_arc": {
      "opening_state": "Respected centurion hiding vision failure",
      "transformation": "From isolated victim to spiritual awakening through mercy",
      "closing_state": "Spiritually awakened; physically healed; reconciles duty with spiritual calling"
    },
    
    "thematic_significance": [
      "Grace as power transcending violence",
      "Transformation through mercy",
      "Spiritual blindness vs. sight"
    ],
    
    "why_readers_care": "Longinus represents universal struggle of transformation despite impossible circumstances. His vulnerability and moral integrity create internal tension readers recognize. His spiritual awakening through mercy offers hope.",
    
    "character_questions_for_readers": [
      "What makes someone worthy despite humble origins?",
      "Can you maintain moral integrity within an immoral system?",
      "Can grace defeat systemic violence?"
    ]
  }
}
```

---

## HOW TO BUILD DETAILED CHARACTER PAGES

Once you have JSON files for all characters:

### Component: `character_detail_view.tsx`

```typescript
import { ReactNode } from 'react';
import Image from 'next/image';

interface character_detail_view_props {
  character: any; // Your character_detailed type
}

export function character_detail_view({
  character
}: character_detail_view_props): ReactNode {
  return (
    <main className="min-h-screen bg-gots-body text-gots-primary">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gots-charred to-gots-dark py-12 px-6 border-b-2 border-dashed border-gots-accent">
        <h1 className="text-5xl font-bold text-gots-accent mb-2">
          {character.identification.full_name}
        </h1>
        <p className="text-2xl text-gots-secondary">
          {character.identification.role}
        </p>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Image & Quick Profile */}
          <div className="md:col-span-1">
            {character.image && (
              <div className="relative h-96 rounded-lg overflow-hidden mb-6">
                <Image
                  src={character.image}
                  alt={character.identification.full_name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            
            {/* Quick Stats */}
            <div className="bg-gots-charred rounded-lg p-6 space-y-4">
              <div>
                <p className="text-xs text-gots-medium-gray uppercase">Age</p>
                <p className="text-gots-secondary">{character.physical_description.age}</p>
              </div>
              <div>
                <p className="text-xs text-gots-medium-gray uppercase">Build</p>
                <p className="text-gots-secondary">{character.physical_description.build}</p>
              </div>
              <div>
                <p className="text-xs text-gots-medium-gray uppercase">Role</p>
                <p className="text-gots-secondary">{character.identification.category}</p>
              </div>
            </div>
          </div>

          {/* Right: Full Profile */}
          <div className="md:col-span-2 space-y-8">
            {/* Why Readers Care */}
            <div className="bg-gots-charred/50 rounded-lg p-6 border-l-4 border-gots-accent">
              <h2 className="text-2xl font-bold text-gots-accent mb-4">Why Readers Care</h2>
              <p className="text-gots-secondary">{character.why_readers_care}</p>
            </div>

            {/* Personality */}
            <div>
              <h2 className="text-2xl font-bold text-gots-accent mb-4">Personality</h2>
              <div className="space-y-3">
                {character.personality.primary_traits.map((trait, idx) => (
                  <div key={idx} className="bg-gots-dark rounded p-3 border-l-2 border-gots-accent">
                    <h4 className="font-bold text-gots-accent">{trait.trait}</h4>
                    <p className="text-sm text-gots-secondary mt-1">{trait.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Story Arc */}
            <div>
              <h2 className="text-2xl font-bold text-gots-accent mb-4">Character Journey</h2>
              <div className="space-y-3">
                <div className="bg-gots-dark rounded p-4">
                  <p className="text-xs text-gots-medium-gray uppercase mb-1">Opening</p>
                  <p className="text-gots-secondary">{character.story_arc.opening_state}</p>
                </div>
                <div className="bg-gots-dark rounded p-4">
                  <p className="text-xs text-gots-medium-gray uppercase mb-1">Transformation</p>
                  <p className="text-gots-secondary">{character.story_arc.transformation}</p>
                </div>
                <div className="bg-gots-dark rounded p-4">
                  <p className="text-xs text-gots-medium-gray uppercase mb-1">Closing</p>
                  <p className="text-gots-secondary">{character.story_arc.closing_state}</p>
                </div>
              </div>
            </div>

            {/* Questions for Readers */}
            <div className="bg-gots-charred/50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gots-accent mb-4">Questions to Consider</h2>
              <ul className="space-y-2">
                {character.character_questions_for_readers.map((question, idx) => (
                  <li key={idx} className="text-gots-secondary flex gap-3">
                    <span className="text-gots-accent">•</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

## SUMMARY

✅ **Extract reader-relevant info** from character profiles  
✅ **Exclude writer-only content** (Midjourney, voice guidelines, etc.)  
✅ **Format as JSON** for Cursor integration  
✅ **Build detailed character pages** for readers  
✅ **Create 46+ character profiles** for website  

**Ready to extract your character profiles into Cursor!** 📖

---

**Version**: 1.0  
**Purpose**: Reader-facing character extraction  
**Format**: JSON + React Components  
**Status**: Ready to implement
