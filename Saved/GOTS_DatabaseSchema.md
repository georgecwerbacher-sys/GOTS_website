# GOTS Website - Database Schema Plan

## 📋 Overview

The GOTS database tracks:
- **Characters** with their opening scenes and metadata
- **Scenes** with multiple POV paths and branching choices
- **Scene Choices** for path branching and character POV switching
- **Member Profiles** tracking user progress through the story
- **Progress History** recording which scenes members have visited

---

## 🏗️ Entity Relationship Diagram

```
┌─────────────────┐
│    Character    │
├─────────────────┤
│ id (PK)         │
│ name            │
│ role            │
│ biography       │
│ first_scene_id  │──┐
│ historical_era  │  │
│ created_at      │  │
└─────────────────┘  │
         │           │
         ├─ 1:M ──────┤
         │           │
         │      ┌─────────────┐
         ├──────│    Scene    │
         │      ├─────────────┤
         │      │ id (PK)     │
         │      │ character_id│──┐ M:1
         │      │ title       │  │
         │      │ content     │  │
         │      │ chapter_num │  │
         │      │ location    │  │
         │      │ created_at  │  │
         │      └─────────────┘  │
         │             │         │
         │             ├─ 1:M ───┴──────────────┐
         │             │                        │
         │      ┌──────────────────────┐        │
         │      │   Scene Choice       │        │
         │      ├──────────────────────┤        │
         │      │ id (PK)              │        │
         │      │ from_scene_id (FK)   │        │
         │      │ to_scene_id (FK)     │        │
         │      │ to_character_id (FK) │        │
         │      │ choice_text          │        │
         │      │ created_at           │        │
         │      └──────────────────────┘        │
         │                                      │
         │                 ┌────────────────────┘
         │                 │
         │      ┌──────────────────────┐
         └──────│ MemberProfile        │
                ├──────────────────────┤
                │ id (PK)              │
                │ user_id (FK)         │
                │ current_character_id │
                │ current_scene_id     │
                │ progress_percentage  │
                │ created_at           │
                │ updated_at           │
                └──────────────────────┘
                         │
                         ├─ 1:M
                         │
                ┌──────────────────────┐
                │ VisitedScene         │
                ├──────────────────────┤
                │ id (PK)              │
                │ member_id (FK)       │
                │ scene_id (FK)        │
                │ character_id (FK)    │
                │ visited_at           │
                │ time_spent_seconds   │
                └──────────────────────┘
```

---

## 📊 Table Schemas

### 1. Characters Table

Stores character information and entry points into the story.

```sql
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(255) NOT NULL,
  biography TEXT,
  historical_era VARCHAR(100),
  time_period VARCHAR(100),
  portrait_url VARCHAR(500),
  first_scene_id UUID,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (first_scene_id) REFERENCES scenes(id)
);

CREATE INDEX idx_characters_name ON characters(name);
CREATE INDEX idx_characters_active ON characters(is_active);
```

**Field Descriptions:**
- `id`: Unique identifier (UUID for distribution)
- `name`: Character's full name (e.g., "Aragorn", "Galadriel")
- `role`: Character's primary role (e.g., "Ranger", "Elf Queen")
- `biography`: Detailed background and context
- `historical_era`: Historical period/setting (e.g., "Third Age")
- `time_period`: Specific era reference
- `portrait_url`: Link to character image
- `first_scene_id`: Starting scene for this character's journey
- `is_active`: Soft delete flag for archived characters

---

### 2. Scenes Table

Stores individual scenes/chapters with metadata.

```sql
CREATE TABLE scenes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id UUID NOT NULL,
  chapter_number INT NOT NULL,
  scene_number INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  preview TEXT,
  content TEXT NOT NULL,
  location VARCHAR(255),
  themes VARCHAR(500),
  word_count INT,
  reading_time_minutes INT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
  UNIQUE(character_id, chapter_number, scene_number)
);

CREATE INDEX idx_scenes_character ON scenes(character_id);
CREATE INDEX idx_scenes_chapter ON scenes(chapter_number);
CREATE INDEX idx_scenes_published ON scenes(is_published);
```

**Field Descriptions:**
- `id`: Unique scene identifier
- `character_id`: Which character's POV this scene is from
- `chapter_number`: Overall chapter in the novel
- `scene_number`: Scene order within that chapter
- `title`: Scene title (e.g., "The Council Meets")
- `preview`: Short teaser (100-200 words)
- `content`: Full scene text
- `location`: Where the scene takes place
- `themes`: Tags/themes (serialized as JSON or separate tags table)
- `word_count`: Scene length
- `reading_time_minutes`: Estimated read time
- `is_published`: Draft vs. published status

---

### 3. Scene Choices Table

Defines branching paths and POV switches at the end of scenes.

```sql
CREATE TABLE scene_choices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_scene_id UUID NOT NULL,
  to_scene_id UUID NOT NULL,
  to_character_id UUID NOT NULL,
  choice_text VARCHAR(500) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (from_scene_id) REFERENCES scenes(id) ON DELETE CASCADE,
  FOREIGN KEY (to_scene_id) REFERENCES scenes(id) ON DELETE CASCADE,
  FOREIGN KEY (to_character_id) REFERENCES characters(id) ON DELETE CASCADE,
  UNIQUE(from_scene_id, to_scene_id, to_character_id)
);

CREATE INDEX idx_choices_from_scene ON scene_choices(from_scene_id);
CREATE INDEX idx_choices_to_scene ON scene_choices(to_scene_id);
CREATE INDEX idx_choices_to_character ON scene_choices(to_character_id);
```

**Field Descriptions:**
- `from_scene_id`: Scene this choice appears at the end of
- `to_scene_id`: Scene player transitions to
- `to_character_id`: Character POV they switch to (allows POV switching mid-choice)
- `choice_text`: Button/menu text (e.g., "Follow Gandalf's advice")
- `description`: Tooltip explaining what this choice leads to
- `sort_order`: Display order of choices on a scene

**Example Flow:**
```
Scene: "Aragorn's Dilemma" (Aragorn POV)
├─ Choice 1: "Lead the assault now"
│  └─ → Scene: "Charge at Dawn" (Aragorn POV)
├─ Choice 2: "Wait for reinforcements"
│  └─ → Scene: "The Wait" (Aragorn POV)
└─ Choice 3: "Switch to Legolas's perspective"
   └─ → Scene: "Elven Arrows" (Legolas POV) ← POV switch!
```

---

### 4. Members (Users) Profile Table

Tracks individual member accounts and current progress.

```sql
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(255) NOT NULL UNIQUE,
  display_name VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(500),
  current_character_id UUID,
  current_scene_id UUID,
  progress_percentage INT DEFAULT 0,
  total_scenes_visited INT DEFAULT 0,
  total_reading_time_seconds INT DEFAULT 0,
  favorite_character_id UUID,
  is_active BOOLEAN DEFAULT true,
  last_accessed TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (current_character_id) REFERENCES characters(id),
  FOREIGN KEY (current_scene_id) REFERENCES scenes(id),
  FOREIGN KEY (favorite_character_id) REFERENCES characters(id)
);

CREATE INDEX idx_members_user_id ON members(user_id);
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_members_username ON members(username);
CREATE INDEX idx_members_active ON members(is_active);
```

**Field Descriptions:**
- `user_id`: External auth system ID (Auth0, Firebase, etc.)
- `email`: Member email
- `username`: Unique display username
- `display_name`: Preferred name for public profile
- `current_character_id`: Which character they're currently following
- `current_scene_id`: Last scene they were reading
- `progress_percentage`: Overall story completion %
- `total_scenes_visited`: Cumulative count
- `total_reading_time_seconds`: Total time spent reading
- `favorite_character_id`: Their most-followed character
- `last_accessed`: For activity tracking

---

### 5. Visited Scenes Table

Records member's journey through the story with metrics.

```sql
CREATE TABLE visited_scenes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id UUID NOT NULL,
  scene_id UUID NOT NULL,
  character_id UUID NOT NULL,
  visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  time_spent_seconds INT DEFAULT 0,
  visit_order INT NOT NULL,
  
  FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
  FOREIGN KEY (scene_id) REFERENCES scenes(id) ON DELETE CASCADE,
  FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
  UNIQUE(member_id, scene_id, visit_order)
);

CREATE INDEX idx_visited_member ON visited_scenes(member_id);
CREATE INDEX idx_visited_scene ON visited_scenes(scene_id);
CREATE INDEX idx_visited_character ON visited_scenes(character_id);
CREATE INDEX idx_visited_timestamp ON visited_scenes(visited_at);
```

**Field Descriptions:**
- `member_id`: Which user visited this scene
- `scene_id`: Scene they read
- `character_id`: Character POV during visit
- `visited_at`: Timestamp of visit
- `time_spent_seconds`: How long they spent on this scene
- `visit_order`: Sequence number (for journey reconstruction)

**Example Data:**
```
member_id: 123
├─ visit_order: 1, scene: "Aragorn's Beginning", time: 600s, character: Aragorn
├─ visit_order: 2, scene: "Legolas's Perspective", time: 450s, character: Legolas
├─ visit_order: 3, scene: "Gandalf's Council", time: 720s, character: Gandalf
└─ visit_order: 4, scene: "Aragorn's Dilemma", time: 800s, character: Aragorn
```

---

### 6. Character Relationships Table (Optional)

Track connections between characters for relationship mapping.

```sql
CREATE TABLE character_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_a_id UUID NOT NULL,
  character_b_id UUID NOT NULL,
  relationship_type VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (character_a_id) REFERENCES characters(id) ON DELETE CASCADE,
  FOREIGN KEY (character_b_id) REFERENCES characters(id) ON DELETE CASCADE,
  CHECK (character_a_id < character_b_id),
  UNIQUE(character_a_id, character_b_id)
);

CREATE INDEX idx_relationships_a ON character_relationships(character_a_id);
CREATE INDEX idx_relationships_b ON character_relationships(character_b_id);
```

**Relationship Types:**
- `allies`, `rivals`, `family`, `lovers`, `enemies`, `mentors`

---

## 🔑 Key Relationships

### 1. Character → Scene (1 to Many)
- One character has many scenes (their POV scenes)
- Each scene belongs to one character

### 2. Scene → Scene Choice → Scene (Path Branching)
- One scene can have multiple choices (exit points)
- Each choice leads to another scene
- Choice also specifies character POV switch

### 3. Scene Choice → Character (POV Switch)
- When a choice is selected, member can switch to different character
- Allows for: "Follow Legolas's perspective" mid-story

### 4. Member → Current Character/Scene
- Member always has a current position
- Stored for quick resume functionality

### 5. Member → Visited Scenes (1 to Many)
- Records complete journey history
- Enables progress tracking and analytics

---

## 📈 Query Patterns

### Get Character's Opening Scene
```sql
SELECT s.* FROM scenes s
WHERE s.character_id = $1
  AND s.chapter_number = 1
  AND s.scene_number = 1
LIMIT 1;
```

### Get Available Choices from Current Scene
```sql
SELECT sc.*, c.name as next_character
FROM scene_choices sc
JOIN characters c ON sc.to_character_id = c.id
WHERE sc.from_scene_id = $1
ORDER BY sc.sort_order;
```

### Get Member's Journey (with character context)
```sql
SELECT 
  vs.visit_order,
  vs.visited_at,
  s.title as scene_title,
  c.name as character_name,
  vs.time_spent_seconds
FROM visited_scenes vs
JOIN scenes s ON vs.scene_id = s.id
JOIN characters c ON vs.character_id = c.id
WHERE vs.member_id = $1
ORDER BY vs.visit_order;
```

### Calculate Member Progress Percentage
```sql
SELECT 
  m.id,
  m.username,
  COUNT(DISTINCT vs.scene_id)::FLOAT / 
  (SELECT COUNT(*) FROM scenes WHERE is_published = true) * 100 as progress_pct
FROM members m
LEFT JOIN visited_scenes vs ON m.id = vs.member_id
GROUP BY m.id;
```

### Get Scenes for Dashboard Display
```sql
SELECT 
  c.name as character,
  COUNT(s.id) as total_scenes,
  SUM(s.word_count) as total_words,
  STRING_AGG(DISTINCT s.location, ', ') as locations
FROM characters c
LEFT JOIN scenes s ON c.id = s.character_id
WHERE c.is_active = true
GROUP BY c.id, c.name;
```

---

## 🎯 Member Progress Tracking

### Progress Percentage Calculation
```
Progress % = (Scenes Visited / Total Published Scenes) * 100
```

### Dashboard Metrics
- **Current Position**: character + scene
- **Reading Time**: total_reading_time_seconds formatted
- **Completion %**: progress_percentage
- **Characters Met**: COUNT(DISTINCT character_id) from visited_scenes
- **Latest Update**: last_accessed timestamp
- **Favorite Character**: favorite_character_id with stats

### Journey Reconstruction
Use `visited_scenes` with `visit_order` to show:
- Timeline of scenes read
- Character progression
- Reading pace over time
- Branching decisions made

---

## 💾 Database Optimization Tips

### Indexes
Already included on:
- Character name (for search)
- Scene character_id (for scene retrieval)
- Member user_id (for authentication)
- Visited scenes member_id (for progress queries)
- Visited scenes timestamp (for activity tracking)

### Partitioning (Future Scale)
Consider partitioning `visited_scenes` by member_id for very large datasets.

### Caching Strategy
Cache in Redis:
- Member's current position
- Character opening scenes
- Available choices for current scene
- Member's progress percentage

---

## 🛠️ Prisma Schema Reference

**Recommended setup** for Prisma ORM integration:

```prisma
// Character model
model Character {
  id                String    @id @default(cuid())
  name              String    @unique
  role              String
  biography         String?   @db.Text
  historicalEra     String?
  portraitUrl       String?
  firstSceneId      String?
  firstScene        Scene?    @relation("FirstScene", fields: [firstSceneId], references: [id])
  isActive          Boolean   @default(true)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  scenes            Scene[]
  choices           SceneChoice[] @relation("ToCharacter")
  members           MemberProfile[]
  favorites         MemberProfile[] @relation("FavoriteCharacter")
  relationships     CharacterRelationship[]
  visitedScenes     VisitedScene[]
  
  @@index([name])
  @@index([isActive])
}

// Scene model
model Scene {
  id                String    @id @default(cuid())
  characterId       String
  character         Character @relation(fields: [characterId], references: [id], onDelete: Cascade)
  chapterNumber     Int
  sceneNumber       Int
  title             String
  preview           String?   @db.Text
  content           String    @db.Text
  location          String?
  themes            String?
  wordCount         Int?
  readingTimeMin    Int?
  isPublished       Boolean   @default(false)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  choicesFrom       SceneChoice[] @relation("FromScene")
  choicesTo         SceneChoice[] @relation("ToScene")
  firstForChar      Character[] @relation("FirstScene")
  members           MemberProfile[]
  visitedScenes     VisitedScene[]
  
  @@unique([characterId, chapterNumber, sceneNumber])
  @@index([characterId])
  @@index([chapterNumber])
  @@index([isPublished])
}

// Scene Choice model
model SceneChoice {
  id                String    @id @default(cuid())
  fromSceneId       String
  fromScene         Scene     @relation("FromScene", fields: [fromSceneId], references: [id], onDelete: Cascade)
  toSceneId         String
  toScene           Scene     @relation("ToScene", fields: [toSceneId], references: [id], onDelete: Cascade)
  toCharacterId     String
  toCharacter       Character @relation("ToCharacter", fields: [toCharacterId], references: [id], onDelete: Cascade)
  choiceText        String
  description       String?   @db.Text
  sortOrder         Int       @default(0)
  createdAt         DateTime  @default(now())
  
  @@unique([fromSceneId, toSceneId, toCharacterId])
  @@index([fromSceneId])
  @@index([toSceneId])
  @@index([toCharacterId])
}

// Member Profile model
model MemberProfile {
  id                String    @id @default(cuid())
  userId            String    @unique
  email             String    @unique
  username          String    @unique
  displayName       String?
  bio               String?   @db.Text
  avatarUrl         String?
  currentCharacterId String?
  currentCharacter  Character? @relation(fields: [currentCharacterId], references: [id])
  currentSceneId    String?
  currentScene      Scene?    @relation(fields: [currentSceneId], references: [id])
  progressPercentage Int      @default(0)
  totalScenesVisited Int      @default(0)
  totalReadingSeconds Int     @default(0)
  favoriteCharacterId String?
  favoriteCharacter Character? @relation("FavoriteCharacter", fields: [favoriteCharacterId], references: [id])
  isActive          Boolean   @default(true)
  lastAccessed      DateTime?
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  visitedScenes     VisitedScene[]
  
  @@index([userId])
  @@index([email])
  @@index([username])
  @@index([isActive])
}

// Visited Scene model
model VisitedScene {
  id                String    @id @default(cuid())
  memberId          String
  member            MemberProfile @relation(fields: [memberId], references: [id], onDelete: Cascade)
  sceneId           String
  scene             Scene     @relation(fields: [sceneId], references: [id], onDelete: Cascade)
  characterId       String
  character         Character @relation(fields: [characterId], references: [id], onDelete: Cascade)
  visitedAt         DateTime  @default(now())
  timeSpentSeconds  Int       @default(0)
  visitOrder        Int
  createdAt         DateTime  @default(now())
  
  @@unique([memberId, sceneId, visitOrder])
  @@index([memberId])
  @@index([sceneId])
  @@index([characterId])
  @@index([visitedAt])
}

// Character Relationship model
model CharacterRelationship {
  id                String    @id @default(cuid())
  characterAId      String
  characterA        Character @relation(fields: [characterAId], references: [id], onDelete: Cascade)
  characterBId      String
  characterB        Character @relation(fields: [characterBId], references: [id], onDelete: Cascade)
  relationshipType  String
  description       String?   @db.Text
  createdAt         DateTime  @default(now())
  
  @@unique([characterAId, characterBId])
  @@index([characterAId])
  @@index([characterBId])
}
```

---

## 📝 Notes for Implementation

### Data Type Choices
- **UUIDs vs Sequential IDs**: Used UUIDs for distributed systems and security
- **Alternative**: Use sequential IDs if using PostgreSQL sequences

### Soft Deletes
- `is_active` field allows archiving without deletion
- Alternative: Use Prisma's `@db.Deleted` or hard delete

### Timestamps
- `created_at` and `updated_at` on all tables
- `visited_at` specifically tracks when scenes were read

### Constraints
- `UNIQUE` constraints prevent duplicate choices, relationships, visits
- `CHECK` constraints ensure data integrity
- `FOREIGN KEY` constraints maintain referential integrity

### Future Enhancements
1. **Favorites**: Add `favorite_scenes` table
2. **Ratings**: Add scene ratings/reviews
3. **Bookmarks**: Track saved positions
4. **Reading Lists**: Create custom scene collections
5. **Analytics**: Track choice statistics (which paths are popular)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-20 | Initial database schema planning |
