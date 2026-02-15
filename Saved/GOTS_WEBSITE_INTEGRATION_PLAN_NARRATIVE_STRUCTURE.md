
## OVERVIEW: NARRATIVE-DRIVEN WEBSITE ARCHITECTURE

Your website will mirror the actual structure of storytelling rather than traditional web pages. Readers navigate through the story as it's actually structured, not through artificial page categories.

---

## PART 1: NARRATIVE ROUTING STRUCTURE

### 1.1 URL Structure

```
/story
  /[story-id]                    # guardians-of-the-spear
    /acts
      /[act-number]              # 1, 2, 3
        /sequences
          /[sequence-id]         # part-1-the-hidden-witness
            /scenes
              /[scene-number]    # 1, 2, 3, 4...
                /beats
                  /[beat-id]     # key moments within scene

Example URLs:
/story/guardians-of-the-spear/acts/1/sequences/part-1-the-hidden-witness/scenes/1
/story/guardians-of-the-spear/acts/1/sequences/part-1-the-hidden-witness/scenes/1/beats/1

/characters
  /[character-id]                # longinus, brutus, corvus, etc.
    /journey                     # character's arc through story
    /relationships               # character's connections
    /moments                     # key beats featuring this character

/themes
  /[theme-id]                    # grace, truth, mercy, violence, etc.
    /exploration                 # how theme develops
    /occurrences                 # where theme appears in story
    
/analysis
  /character-arcs                # how characters change
  /turning-points                # narrative pivots
  /system-mechanics              # four horsemen coordination
```

### 1.2 Hierarchy Explanation

**Story** (Top level)
- Contains entire novel
- Has metadata (title, author, description)
- Example: "Guardians of the Spear"

**Acts** (Story divisions)
- Larger structural divisions
- Act 1: Part 1 - The Hidden Witness
- Act 2: Part 2 - Exodus of the Followers
- Act 3: Part 3 - The Resurrection

**Sequences** (Act divisions)
- Individual parts or major sequences
- Each act has one or more sequences
- Example: "Part 1: The Hidden Witness" is a sequence within Act 1

**Scenes** (Sequence divisions)
- Individual chapters or scene groupings
- Example: Chapter 1, Chapter 2, Chapter 3, etc.
- Each scene is a narrative unit (typically one chapter)

**Beats** (Scene divisions)
- Individual story moments within a scene
- Key moments, turning points, character interactions
- Example: "Longinus's failing vision revealed", "Brutus turns away", "Prisoner forgives executioners"

---

## PART 2: DATA STRUCTURE & DATABASE SCHEMA

### 2.1 Narrative Data Models

```typescript
// src/lib/types/narrative.ts

interface story {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  description: string;
  cover_image?: string;
  total_acts: number;
  created_at: Date;
  updated_at: Date;
}

interface act {
  id: string;
  story_id: string;
  number: number;
  title: string;
  description: string;
  total_sequences: number;
  narrative_focus: string;
  thematic_focus: string[];
  opening_state: string;
  closing_state: string;
}

interface sequence {
  id: string;
  act_id: string;
  number: number;
  title: string;
  description: string;
  setting: string;
  total_scenes: number;
  thematic_focus: string[];
  characters_present: string[]; // character IDs
  narrative_purpose: string;
  opening_state: string;
  closing_state: string;
}

interface scene {
  id: string;
  sequence_id: string;
  number: number;
  title: string;
  chapter_number: number; // maps to actual chapter
  setting: string;
  pov_character?: string; // character ID
  duration: string; // "One morning", "Throughout the day", etc.
  summary: string;
  total_beats: number;
  thematic_focus: string[];
  characters_present: string[]; // character IDs
  arc_developments: arc_development[];
  key_imagery: string[];
  narrative_function: string;
}

interface beat {
  id: string;
  scene_id: string;
  number: number;
  title: string;
  moment_type: 'dialogue' | 'action' | 'internal_reflection' | 'relationship_shift' | 'revelation' | 'turning_point';
  content: string;
  characters_involved: string[]; // character IDs
  thematic_significance: string[];
  emotional_intensity: 0 | 1 | 2 | 3 | 4 | 5; // 0=quiet, 5=climactic
  mask_status?: {
    character_id: string;
    status: 'intact' | 'cracking' | 'broken';
    visibility: 'hidden' | 'subtle' | 'obvious';
  }[];
  reader_understanding_shift?: string;
  consequences: string[];
  preceding_beat_id?: string;
  following_beat_id?: string;
}

interface arc_development {
  character_id: string;
  movement: string;
  direction: 'forward' | 'backward' | 'sideways'; // toward goal, away, stalled
  significance: string;
}

interface character_in_narrative {
  character_id: string;
  introduction_beat_id: string;
  introduction_act: number;
  introduction_sequence: string;
  key_beats: beat[]; // beats where this character has significant moments
  relationship_shifts: {
    with_character_id: string;
    beat_id: string;
    before_dynamic: string;
    after_dynamic: string;
  }[];
  arc_path: {
    act: number;
    opening_state: string;
    closing_state: string;
  }[];
  thematic_embodiment: string[];
  symbolic_meaning?: string;
}

interface theme_in_narrative {
  theme_id: string;
  title: string;
  description: string;
  first_appearance: {
    act: number;
    sequence: string;
    beat_id: string;
  };
  occurrences: {
    act: number;
    beat_id: string;
    manifestation: string;
    intensity: 0 | 1 | 2 | 3 | 4 | 5;
  }[];
  character_embodiment: {
    character_id: string;
    how_they_embody: string;
    evolution: string;
  }[];
  resolution?: {
    act: number;
    beat_id: string;
    outcome: string;
  };
}

interface narrative_turning_point {
  id: string;
  beat_id: string;
  act: number;
  sequence: string;
  scene: number;
  description: string;
  before_state: string;
  after_state: string;
  characters_affected: string[]; // character IDs
  themes_affected: string[]; // theme IDs
  narrative_significance: string;
  point_of_no_return: boolean;
}
```

### 2.2 JSON File Structure

```
src/content/
  story/
    guardians-of-the-spear.json
  
  acts/
    act-1.json
    act-2.json
    act-3.json
  
  sequences/
    part-1-the-hidden-witness.json
    part-2-exodus-of-the-followers.json
    part-3-the-resurrection.json
  
  scenes/
    act-1/
      sequence-1/
        scene-1.json      # Chapter 1
        scene-2.json      # Chapter 2
        ...scene-12.json
  
  beats/
    act-1/
      sequence-1/
        scene-1/
          beat-1.json
          beat-2.json
          ...
  
  characters/
    longinus.json
    brutus.json
    ...
  
  themes/
    grace.json
    truth.json
    mercy.json
    ...
  
  turning-points/
    turning-points.json
```

### 2.3 JSON Example: Scene with Beats

```json
{
  "scene": {
    "id": "act-1-sequence-1-scene-1",
    "sequence_id": "part-1-the-hidden-witness",
    "number": 1,
    "title": "The March Through the Wilderness",
    "chapter_number": 1,
    "setting": "Desert road toward Jerusalem garrison",
    "pov_character": "longinus",
    "duration": "Throughout the day",
    "summary": "Longinus marches with Brutus's cohort toward the garrison. His vision begins to fail. He struggles with hiding this weakness from his mentor. The narrative establishes his devotion to Brutus and his terror of being deemed 'broken.'",
    "thematic_focus": ["vulnerability", "devotion", "hidden_weakness", "false_mentorship"],
    "characters_present": ["longinus", "brutus"],
    "narrative_function": "Introduction of protagonist's vulnerability; establishment of Brutus as mentor figure; setup of the central inversion",
    "key_imagery": ["armor as burden", "endless march", "blur of vision", "Rome's gutters"],
    "beats": [
      {
        "id": "beat-1-1-1",
        "number": 1,
        "title": "The March Begins",
        "moment_type": "action",
        "content": "The opening paragraph: 'The sky presses down like a curse. Endless. Merciless.' Longinus's armor becomes a furnace. The column stretches behind in two rows. His body knows the rhythm but his thoughts betray him.",
        "characters_involved": ["longinus"],
        "thematic_significance": ["vulnerability", "suffering_made_routine"],
        "emotional_intensity": 2,
        "narrative_function": "Establish setting, tone, and Longinus's internal state"
      },
      {
        "id": "beat-1-1-2",
        "number": 2,
        "title": "Memory of the Gutters",
        "moment_type": "internal_reflection",
        "content": "Longinus reflects on Rome's gutters, his sling, his survival through skill. How Brutus noticed him. Ten years of climbing from nothing to centurion.",
        "characters_involved": ["longinus"],
        "thematic_significance": ["survival", "gratitude", "devotion"],
        "emotional_intensity": 2,
        "narrative_function": "Establish Longinus's background and why he's devoted to Brutus"
      },
      {
        "id": "beat-1-1-3",
        "number": 3,
        "title": "The Vision Problem Emerges",
        "moment_type": "internal_reflection",
        "content": "His vision has changed over past months. Blur at fifty paces. Getting worse. He hasn't told anyone. He understands what Brutus does to men with afflictions.",
        "characters_involved": ["longinus"],
        "thematic_significance": ["hidden_weakness", "fear_of_abandonment", "illness_as_liability"],
        "emotional_intensity": 3,
        "narrative_function": "Introduce the central conflict: Longinus's failing vision and his terror of Brutus discovering it"
      },
      {
        "id": "beat-1-1-4",
        "number": 4,
        "title": "Brutus's Mercy (False)",
        "moment_type": "internal_reflection",
        "content": "Memory of Brutus speaking about Marius, the legionary with broken leg. 'A broken leg is a broken sword. The question is whether it serves any purpose.' Longinus understands: if Brutus discovers his affliction, he'll be deemed broken and worthless.",
        "characters_involved": ["longinus", "brutus"],
        "thematic_significance": ["false_mercy", "predatory_philosophy", "system_of_elimination"],
        "emotional_intensity": 4,
        "mask_status": [
          {
            "character_id": "brutus",
            "status": "intact",
            "visibility": "hidden"
          }
        ],
        "reader_understanding_shift": "Reader begins to see Brutus's 'pragmatism' as something darker",
        "narrative_function": "Reveal Brutus's predatory philosophy disguised as mercy"
      },
      {
        "id": "beat-1-1-5",
        "number": 5,
        "title": "Brutus's Observant Gaze",
        "moment_type": "action",
        "content": "Longinus feels observed. Brutus is watching him from ahead. Does Brutus see the squint? The hesitation? Something deeper? Brutus's gaze assesses and moves on.",
        "characters_involved": ["longinus", "brutus"],
        "thematic_significance": ["assessment", "vulnerability_exposed", "fear_of_judgment"],
        "emotional_intensity": 3,
        "mask_status": [
          {
            "character_id": "brutus",
            "status": "intact",
            "visibility": "subtle"
          }
        ],
        "narrative_function": "Longinus's paranoia; reader unsure if Brutus actually noticed or if Longinus is projecting"
      },
      {
        "id": "beat-1-1-6",
        "number": 6,
        "title": "The Shout and the Meaning",
        "moment_type": "dialogue",
        "content": "Brutus bellows: 'Cohort! Eyes on the horizon, not on your regrets! The outpost lies within striking distance if you don't collapse beneath your own self-pity!' The shout stings, but Longinus understands: A man doesn't push you to breaking unless he believes you can survive it.",
        "characters_involved": ["brutus", "longinus"],
        "thematic_significance": ["false_caring", "mentorship_misread", "devotion_deepened"],
        "emotional_intensity": 3,
        "reader_understanding_shift": "Reader interprets Brutus's harshness as actually caring; narrative suggests something darker",
        "narrative_function": "Longinus deepens his false belief that Brutus cares about him; reader begins to see manipulation"
      }
    ]
  }
}
```

---

## PART 3: COMPONENT ARCHITECTURE

### 3.1 Narrative-Focused Components

```
src/components/
  narrative/
    story_view.tsx              # Top-level story display
    act_selector.tsx            # Choose which act to explore
    sequence_navigator.tsx      # Navigate sequences within act
    scene_viewer.tsx            # Display complete scene
    beat_player.tsx             # Play through beats sequentially
    beat_detail.tsx             # Show individual beat
    
  narrative_journey/
    character_journey_through_narrative.tsx  # How character moves through story
    scene_focus.tsx             # Scenes featuring specific character
    beat_timeline.tsx           # Timeline of beats affecting character
    relationship_arc.tsx        # How relationship changes through narrative
    
  narrative_analysis/
    turning_points_in_narrative.tsx         # Where story pivots
    thematic_journey.tsx                    # How themes develop
    beat_significance.tsx                   # Why this beat matters
    narrative_function_explainer.tsx        # What this beat does for story
    
  characters/
    character_profile.tsx       # Character page
    character_arc_in_narrative.tsx # Character's path through story
    character_relationship_in_narrative.tsx # Character's connections
    
  shared/
    beat_card.tsx              # Reusable beat display
    character_link.tsx         # Link to character
    theme_tag.tsx              # Tag for themes
    beat_breadcrumb.tsx        # Show narrative path to this beat
    reading_guide.tsx          # Guide for reading/exploring
```

### 3.2 Key Component Examples

#### `beat_player.tsx` - Navigate through beats sequentially

```typescript
import { ReactNode } from 'react';
import { beat } from '@/lib/types/narrative';

interface beat_player_props {
  beats: beat[];
  current_beat_index: number;
  on_beat_change: (index: number) => void;
  show_analysis: boolean;
}

export function beat_player({
  beats,
  current_beat_index,
  on_beat_change,
  show_analysis
}: beat_player_props): ReactNode {
  const current_beat = beats[current_beat_index];
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Current Beat Display */}
      <section className="bg-slate-50 rounded-lg p-8 mb-6">
        <h3 className="text-2xl font-bold mb-2">{current_beat.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{current_beat.moment_type}</p>
        
        <div className="prose max-w-none mb-6">
          {current_beat.content}
        </div>
        
        {/* Emotional Intensity Indicator */}
        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">Emotional Intensity</p>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded ${
                  i < current_beat.emotional_intensity
                    ? 'bg-amber-600'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Thematic Significance */}
        {show_analysis && (
          <div className="bg-white p-4 rounded border-l-4 border-amber-600">
            <p className="text-sm font-semibold mb-2">Thematic Significance</p>
            <div className="flex flex-wrap gap-2">
              {current_beat.thematic_significance.map((theme) => (
                <span key={theme} className="px-3 py-1 bg-amber-100 text-sm rounded">
                  {theme}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
      
      {/* Navigation Controls */}
      <section className="flex justify-between items-center mb-6">
        <button
          onClick={() => on_beat_change(current_beat_index - 1)}
          disabled={current_beat_index === 0}
          className="px-4 py-2 bg-slate-600 text-white rounded disabled:opacity-50"
        >
          ← Previous Beat
        </button>
        
        <span className="text-sm text-gray-600">
          Beat {current_beat_index + 1} of {beats.length}
        </span>
        
        <button
          onClick={() => on_beat_change(current_beat_index + 1)}
          disabled={current_beat_index === beats.length - 1}
          className="px-4 py-2 bg-slate-600 text-white rounded disabled:opacity-50"
        >
          Next Beat →
        </button>
      </section>
      
      {/* Beat Progress Bar */}
      <div className="w-full bg-gray-300 rounded-full h-1 mb-6">
        <div
          className="bg-amber-600 h-1 rounded-full transition-all"
          style={{ width: `${((current_beat_index + 1) / beats.length) * 100}%` }}
        />
      </div>
      
      {/* Beat Overview */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-6">
        {beats.map((beat, index) => (
          <button
            key={beat.id}
            onClick={() => on_beat_change(index)}
            className={`p-2 rounded text-sm font-semibold transition-all ${
              index === current_beat_index
                ? 'bg-amber-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {beat.number}. {beat.title}
          </button>
        ))}
      </section>
    </div>
  );
}
```

#### `scene_viewer.tsx` - Display complete scene with beats

```typescript
import { ReactNode, useState } from 'react';
import { scene, beat } from '@/lib/types/narrative';
import { beat_player } from './beat_player';

interface scene_viewer_props {
  scene: scene;
  beats: beat[];
  previous_scene?: scene;
  next_scene?: scene;
}

export function scene_viewer({
  scene,
  beats,
  previous_scene,
  next_scene
}: scene_viewer_props): ReactNode {
  const [current_beat_index, set_current_beat_index] = useState(0);
  const [show_analysis, set_show_analysis] = useState(false);
  
  return (
    <main className="min-h-screen bg-white">
      {/* Scene Header */}
      <header className="bg-slate-900 text-white py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-400 mb-2">Scene {scene.number}</p>
          <h1 className="text-4xl font-bold mb-2">{scene.title}</h1>
          <p className="text-gray-300 mb-4">{scene.setting}</p>
          
          <div className="flex gap-4 text-sm">
            <span>POV: {scene.pov_character || 'Multiple'}</span>
            <span>•</span>
            <span>{scene.duration}</span>
            <span>•</span>
            <span>{beats.length} beats</span>
          </div>
        </div>
      </header>
      
      {/* Scene Summary */}
      <section className="max-w-4xl mx-auto px-6 py-6 bg-slate-50 mb-6">
        <p className="text-lg">{scene.summary}</p>
      </section>
      
      {/* Toggle Analysis */}
      <section className="max-w-4xl mx-auto px-6 mb-6">
        <button
          onClick={() => set_show_analysis(!show_analysis)}
          className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
        >
          {show_analysis ? 'Hide Analysis' : 'Show Analysis'}
        </button>
      </section>
      
      {/* Beat Player */}
      <beat_player
        beats={beats}
        current_beat_index={current_beat_index}
        on_beat_change={set_current_beat_index}
        show_analysis={show_analysis}
      />
      
      {/* Scene Analysis */}
      {show_analysis && (
        <section className="max-w-4xl mx-auto px-6 py-12 border-t-4 border-amber-600">
          <h2 className="text-3xl font-bold mb-6">Scene Analysis</h2>
          
          {/* Thematic Focus */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Thematic Focus</h3>
            <div className="flex flex-wrap gap-2">
              {scene.thematic_focus.map((theme) => (
                <span key={theme} className="px-4 py-2 bg-amber-100 rounded">
                  {theme}
                </span>
              ))}
            </div>
          </div>
          
          {/* Character Arc Development */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Character Development</h3>
            {scene.arc_developments.map((dev) => (
              <div key={dev.character_id} className="mb-4 p-4 bg-slate-50 rounded">
                <p className="font-semibold">{dev.character_id}</p>
                <p className="text-sm text-gray-600 mt-2">{dev.movement}</p>
              </div>
            ))}
          </div>
          
          {/* Narrative Function */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Narrative Function</h3>
            <p className="text-gray-700">{scene.narrative_function}</p>
          </div>
        </section>
      )}
      
      {/* Navigation */}
      <section className="max-w-4xl mx-auto px-6 py-12 flex justify-between border-t">
        {previous_scene ? (
          <a href={`/story/guardians-of-the-spear/acts/1/sequences/${scene.sequence_id}/scenes/${previous_scene.number}`}
             className="text-amber-600 hover:text-amber-700">
            ← Previous Scene
          </a>
        ) : (
          <div />
        )}
        
        {next_scene ? (
          <a href={`/story/guardians-of-the-spear/acts/1/sequences/${scene.sequence_id}/scenes/${next_scene.number}`}
             className="text-amber-600 hover:text-amber-700">
            Next Scene →
          </a>
        ) : (
          <div />
        )}
      </section>
    </main>
  );
}
```

#### `character_journey_through_narrative.tsx` - Show character's path through story

```typescript
import { ReactNode } from 'react';
import { character_in_narrative } from '@/lib/types/narrative';

interface character_journey_props {
  character: character_in_narrative;
}

export function character_journey_through_narrative({
  character
}: character_journey_props): ReactNode {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Journey Timeline by Act */}
      <div className="space-y-8">
        {character.arc_path.map((arc) => (
          <section key={arc.act} className="border-l-4 border-amber-600 pl-6 py-4">
            <h3 className="text-2xl font-bold mb-4">Act {arc.act}</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Opening State */}
              <div className="bg-slate-50 p-4 rounded">
                <p className="font-semibold text-sm text-gray-600 mb-2">Opening</p>
                <p className="text-lg">{arc.opening_state}</p>
              </div>
              
              {/* Closing State */}
              <div className="bg-amber-50 p-4 rounded">
                <p className="font-semibold text-sm text-gray-600 mb-2">Closing</p>
                <p className="text-lg">{arc.closing_state}</p>
              </div>
            </div>
            
            {/* Direction Arrow */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">↓ Character Progression ↓</p>
            </div>
          </section>
        ))}
      </div>
      
      {/* Key Beats for This Character */}
      <section className="mt-12 pt-8 border-t-2 border-gray-300">
        <h2 className="text-3xl font-bold mb-6">Key Moments</h2>
        <div className="space-y-4">
          {character.key_beats.map((beat) => (
            <div key={beat.id} className="p-6 bg-slate-50 rounded border-l-4 border-amber-600">
              <p className="font-semibold text-lg">{beat.title}</p>
              <p className="text-sm text-gray-600 mt-2">{beat.moment_type}</p>
              <p className="mt-4 text-gray-700">{beat.content}</p>
              
              {beat.emotional_intensity > 3 && (
                <p className="mt-2 text-sm font-semibold text-amber-600">
                  ⚡ High emotional intensity moment
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
```

---

## PART 4: PAGE STRUCTURE (Using Narrative Hierarchy)

### 4.1 Story Entry Page

```
/story/guardians-of-the-spear

HERO
  - Story title + author
  - Cover image
  - Brief description
  
ACT SELECTOR
  - Act 1: "The Hidden Witness"
  - Act 2: "Exodus of the Followers"
  - Act 3: "The Resurrection"
  
OR QUICK NAVIGATION
  - Start Reading (Act 1, Scene 1, Beat 1)
  - Continue Reading (where you left off)
  - Read About Characters
  - Explore Themes
  - View Analysis
```

### 4.2 Act Page

```
/story/guardians-of-the-spear/acts/1

ACT TITLE & DESCRIPTION
  - "Act 1: The Hidden Witness"
  - Overview of what happens in this act
  - Thematic focus
  
SEQUENCE NAVIGATOR
  - Part 1: The Hidden Witness (sequence)
    - Jump to specific scenes
    
ACT-LEVEL ANALYSIS
  - Opening state of characters
  - Closing state of characters
  - Thematic exploration
  - Key turning points in this act
  
CHARACTERS IN THIS ACT
  - Who appears?
  - How do they change?
  - Key moments featuring them
```

### 4.3 Sequence Page

```
/story/guardians-of-the-spear/acts/1/sequences/part-1-the-hidden-witness

SEQUENCE TITLE & DESCRIPTION
  - "Part 1: The Hidden Witness"
  - Overview of this sequence
  - Setting, timeframe, key events
  
SCENE SELECTOR
  - Scene 1: The March Through the Wilderness
  - Scene 2: The Arrival
  - Scene 3: The Burial and the Watch
  - ... (all 12 scenes)
  
SEQUENCE-LEVEL ANALYSIS
  - How sequence opens
  - How sequence closes
  - Major turning points
  - Thematic focus
  
CHARACTER ARCS IN SEQUENCE
  - How each character changes
  - Key relationships
  - Reversals and revelations
```

### 4.4 Scene Page (With Beat Navigation)

```
/story/guardians-of-the-spear/acts/1/sequences/part-1-the-hidden-witness/scenes/1

SCENE HEADER
  - Scene number & title
  - Setting, duration, POV
  - Brief summary
  
BEAT PLAYER (interactive)
  - Display current beat
  - Show beat content
  - Emotional intensity indicator
  - Navigation (previous/next beat)
  - Beat overview (clickable thumbnails)
  
OPTIONAL ANALYSIS PANEL
  - Toggle on/off
  - Show thematic significance
  - Show character arc development
  - Show narrative function
  - Show consequences
  
SCENE-LEVEL ANALYSIS
  - Why this scene matters
  - Character developments
  - Thematic focus
  - Connections to larger story
  
NAVIGATION
  - Previous scene
  - Next scene
  - Back to sequence
  - Jump to act
```

### 4.5 Character Journey Page

```
/characters/longinus/journey

CHARACTER NAME & ROLE
  - "Longinus - The Hidden Witness"
  - Character archetype and symbolic meaning

JOURNEY THROUGH NARRATIVE
  - Act 1: Opening → Closing
  - Act 2: Opening → Closing (when available)
  - Act 3: Opening → Closing (when available)
  
KEY MOMENTS
  - Beat player showing key beats for this character
  - Only beats where character has significant role
  
RELATIONSHIP CHANGES
  - With Brutus: How it evolves
  - With other characters: How they change
  - Turning points in relationships
  
THEMATIC EMBODIMENT
  - What themes does this character embody?
  - How does embodiment change through story?
```

### 4.6 Theme Exploration Page

```
/themes/grace/exploration

THEME TITLE
  - "Grace"
  - Definition and significance
  
THEME'S JOURNEY THROUGH NARRATIVE
  - First appearance (beat location)
  - How it evolves through story
  - Key manifestations
  - Resolution (if applicable)
  
CHARACTER EMBODIMENT
  - Which characters embody this theme?
  - How does their embodiment change?
  - Examples from narrative
  
BEAT OCCURRENCES
  - Every beat where this theme appears
  - How intensely it appears
  - Its form in that beat
  
THEMATIC SIGNIFICANCE
  - Why this theme matters
  - How it shapes the narrative
  - What it reveals about story
```

### 4.7 Analysis Pages

```
/analysis/turning-points

ALL TURNING POINTS
  - Listed by act
  - Listed by character
  - Listed by narrative significance
  - Beat location for each

TURNING POINT DETAILS
  - What was before?
  - What changed?
  - How does story change after?
  - Which characters affected?
  - Which themes affected?
```

---

## PART 5: API ROUTES (Narrative Structure)

```
GET /api/story
  Returns: Story metadata + act list

GET /api/acts/[act-number]
  Returns: Act details + sequences

GET /api/sequences/[sequence-id]
  Returns: Sequence details + scenes

GET /api/scenes/[scene-id]
  Returns: Scene details + beats

GET /api/beats/[beat-id]
  Returns: Complete beat data

GET /api/characters/[character-id]/journey
  Returns: Character's journey through narrative

GET /api/themes/[theme-id]
  Returns: Theme's journey through narrative

GET /api/turning-points
  Returns: All turning points in order

GET /api/characters/[character-id]/key-beats
  Returns: Beats where character has significant moments
```

---

## PART 6: DATA CONTENT REQUIREMENTS

### For Each Act
- [ ] Title and number
- [ ] Description (purpose, major events)
- [ ] Thematic focus (2-3 main themes)
- [ ] Opening character states
- [ ] Closing character states
- [ ] Opening state of story world
- [ ] Closing state of story world

### For Each Sequence
- [ ] Title (which part)
- [ ] Description
- [ ] Setting details
- [ ] Thematic focus
- [ ] Opening state
- [ ] Closing state
- [ ] Characters present

### For Each Scene (Chapter)
- [ ] Title (chapter title)
- [ ] Setting description
- [ ] POV character
- [ ] Duration ("One morning", "Throughout the day")
- [ ] Full summary (200-300 words)
- [ ] Thematic focus
- [ ] Characters present
- [ ] Narrative function
- [ ] Key imagery
- [ ] Character arc developments

### For Each Beat (Key Moment)
- [ ] Title (name of the moment)
- [ ] Type (dialogue, action, reflection, shift, revelation)
- [ ] Full content (the actual text/description)
- [ ] Characters involved
- [ ] Thematic significance (array)
- [ ] Emotional intensity (0-5 scale)
- [ ] Mask status (if applicable to characters)
- [ ] Reader understanding shift
- [ ] Consequences (what this beat changes)
- [ ] Preceding/following beat references

---

## PART 7: IMPLEMENTATION ROADMAP

### Phase 1: Data Organization (Week 1)
- [ ] Create JSON schema for narrative hierarchy
- [ ] Extract scene data from chapters
- [ ] Break scenes into beats
- [ ] Create beat JSON files
- [ ] Link beats to characters, themes
- [ ] Test data relationships

### Phase 2: API & Backend (Week 2)
- [ ] Build API routes for each level (acts → sequences → scenes → beats)
- [ ] Implement data fetching
- [ ] Set up caching strategy
- [ ] Test all endpoints
- [ ] Document API

### Phase 3: Component Development (Week 3)
- [ ] Build beat_player component
- [ ] Build scene_viewer component
- [ ] Build character_journey_through_narrative component
- [ ] Build theme_explorer component
- [ ] Build act_selector
- [ ] Build sequence_navigator

### Phase 4: Page Creation (Week 4)
- [ ] Create /story/[id] page
- [ ] Create /acts/[number] page
- [ ] Create /sequences/[id] page
- [ ] Create /scenes/[id] page with beat integration
- [ ] Create /characters/[id]/journey page
- [ ] Create /themes/[id]/exploration page

### Phase 5: Interactive Features (Week 5)
- [ ] Beat navigation (prev/next)
- [ ] Beat overview thumbnails
- [ ] Analysis toggle
- [ ] Thematic highlight mode
- [ ] Character focus mode
- [ ] Reading progress tracking

### Phase 6: Polish & Deploy (Week 6)
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Accessibility audit
- [ ] SEO optimization
- [ ] Docker setup
- [ ] Vercel deployment

---

## PART 8: KEY ADVANTAGES OF NARRATIVE STRUCTURE

### ✅ Mirrors Actual Story Structure
Readers navigate story as it's actually constructed, not through web categories

### ✅ Maintains Reading Flow
Beat player lets readers move through story sequentially
Supports both linear reading and non-linear exploration

### ✅ Preserves Narrative Hierarchy
Story → Acts → Sequences → Scenes → Beats is actual storytelling structure
Readers understand where they are in narrative at all times

### ✅ Supports Deep Analysis
Each level has analysis appropriate to that level:
- Beat-level: Emotional intensity, moment significance
- Scene-level: Character arc development, thematic focus
- Sequence-level: Major progressions
- Act-level: Large structure movements

### ✅ Natural Character Journey Integration
Characters follow this same structure
Reader can see how character moves through story's beats and scenes

### ✅ Thematic Integration Natural
Themes appear at beat level (most specific)
Can track theme's journey through all beats, scenes, sequences, acts

### ✅ Turning Points Become Clear
Turning point = beat where something fundamental changes
Readers see exactly where and why story pivots

---

## PART 9: SAMPLE IMPLEMENTATION (One Complete Flow)

### File Structure
```
src/app/story/[story-id]/acts/[act]/sequences/[sequence]/scenes/[scene]/page.tsx
src/components/narrative/scene_viewer.tsx
src/components/narrative/beat_player.tsx
src/lib/data/narrative.ts
src/content/scenes/act-1/sequence-1/scene-1.json
src/content/beats/act-1/sequence-1/scene-1/*.json
```

### Implementation Flow
1. User navigates to `/story/guardians-of-the-spear/acts/1/sequences/part-1-the-hidden-witness/scenes/1`
2. Page fetches scene data
3. Page fetches all beats for that scene
4. `scene_viewer` component renders with `beat_player`
5. User can click through beats sequentially
6. Optional analysis mode shows thematic/character significance
7. User can navigate to previous/next scene

---

## PART 10: TYPESCRIPT TYPES (Complete)

```typescript
// src/lib/types/narrative.ts

export interface story {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  description: string;
  cover_image?: string;
  total_acts: number;
}

export interface act {
  id: string;
  story_id: string;
  number: number;
  title: string;
  description: string;
  thematic_focus: string[];
  opening_state: {
    [key: string]: string; // character_id: state
  };
  closing_state: {
    [key: string]: string;
  };
}

export interface sequence {
  id: string;
  act_id: string;
  number: number;
  title: string;
  description: string;
  setting: string;
  thematic_focus: string[];
  characters_present: string[];
}

export interface scene {
  id: string;
  sequence_id: string;
  number: number;
  title: string;
  chapter_number: number;
  setting: string;
  pov_character?: string;
  duration: string;
  summary: string;
  thematic_focus: string[];
  characters_present: string[];
  narrative_function: string;
  arc_developments: {
    character_id: string;
    movement: string;
  }[];
}

export interface beat {
  id: string;
  scene_id: string;
  number: number;
  title: string;
  moment_type: 'dialogue' | 'action' | 'internal_reflection' | 'relationship_shift' | 'revelation' | 'turning_point';
  content: string;
  characters_involved: string[];
  thematic_significance: string[];
  emotional_intensity: 0 | 1 | 2 | 3 | 4 | 5;
  mask_status?: Array<{
    character_id: string;
    status: 'intact' | 'cracking' | 'broken';
  }>;
  reader_understanding_shift?: string;
  consequences: string[];
}

export interface character_in_narrative {
  character_id: string;
  introduction_beat_id: string;
  introduction_act: number;
  key_beats: beat[];
  arc_path: Array<{
    act: number;
    opening_state: string;
    closing_state: string;
  }>;
  relationship_shifts: Array<{
    with_character_id: string;
    beat_id: string;
    dynamic_change: string;
  }>;
  thematic_embodiment: string[];
  symbolic_meaning?: string;
}

export interface theme_in_narrative {
  theme_id: string;
  title: string;
  description: string;
  first_appearance: {
    beat_id: string;
    act: number;
  };
  occurrences: Array<{
    beat_id: string;
    manifestation: string;
    intensity: 0 | 1 | 2 | 3 | 4 | 5;
  }>;
  character_embodiment: Array<{
    character_id: string;
    how_they_embody: string;
  }>;
}
```

---

## CONCLUSION

This narrative-driven architecture:

✅ **Preserves story structure** in the website architecture  
✅ **Maintains reading flow** with sequential beat navigation  
✅ **Enables deep analysis** at appropriate narrative levels  
✅ **Makes character journeys explicit** through the same hierarchy  
✅ **Integrates themes naturally** at beat level with progression tracking  
✅ **Makes turning points clear** as beat-level pivots  
✅ **Supports exploration** of story at any granularity level  

This is more aligned with storytelling than traditional page/section thinking.

---

**Status**: NARRATIVE STRUCTURE PLAN COMPLETE  
**Ready For**: Implementation with Cursor  
**Next Step**: Provide Part 1 scene/beat breakdown data or start Cursor development
