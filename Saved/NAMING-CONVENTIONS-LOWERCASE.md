# GOTS Website - Lowercase Naming Conventions
## ALL NAMES MUST BE LOWERCASE - NO CAPITAL LETTERS

**Created:** January 18, 2025  
**Project:** Guardians of the Spear (GOTS)  
**Location:** `/Users/werby/GOTS_website/GOTS_website/Review/NAMING-CONVENTIONS-LOWERCASE.md`

---

## ⚠️ CRITICAL RULE

**ALL names must be lowercase with NO capital letters anywhere.**

This is non-negotiable and applies to EVERYTHING in your project.

---

## What This Applies To

- ✅ File names: `button.tsx` (NOT `Button.tsx`)
- ✅ Directory names: `components/` (NOT `Components/`)
- ✅ Component names: `function button()` (NOT `function Button()`)
- ✅ Type/Interface names: `interface buttonprops` (NOT `interface ButtonProps`)
- ✅ Function names: `format_date()` (NOT `formatDate()`)
- ✅ Variable names: `is_loading` (NOT `isLoading`)
- ✅ Constant names: `max_length` (NOT `MAX_LENGTH`)
- ✅ All exports and imports

---

## Quick Reference

| Item | Old (WRONG) | New (CORRECT) |
|------|-----------|---------------|
| Component file | `CharacterCard.tsx` | `charactercard.tsx` |
| Component function | `function Button()` | `function button()` |
| Type/Interface | `interface ButtonProps` | `interface buttonprops` |
| Function | `formatDate()` | `format_date()` |
| Variable | `isLoading` | `is_loading` |
| Constant | `MAX_LENGTH` | `max_length` |
| Boolean variable | `isLoading` | `is_loading` |
| Directory | `Components/` | `components/` |

---

## Examples by Category

### Files & Directories
```
✅ CORRECT:
src/components/button.tsx
src/components/ui/card.tsx
src/lib/utils/format_date.ts
src/app/about/page.tsx

❌ WRONG:
src/Components/Button.tsx
src/components/UI/Card.tsx
src/lib/utils/formatDate.ts
src/app/About/page.tsx
```

### Component Functions
```typescript
✅ CORRECT:
export function button() {
  return <button>Click</button>;
}

❌ WRONG:
export function Button() {
  return <button>Click</button>;
}
```

### TypeScript Types
```typescript
✅ CORRECT:
interface buttonprops {
  is_loading?: boolean;
  on_click?: () => void;
}

❌ WRONG:
interface ButtonProps {
  isLoading?: boolean;
  onClick?: () => void;
}
```

### Functions & Variables
```typescript
✅ CORRECT:
const is_loading = false;
const user_data = { name: 'John' };
function format_date(date: string) { ... }
function is_valid_email(email: string) { ... }

❌ WRONG:
const isLoading = false;
const userData = { name: 'John' };
function formatDate(date: string) { ... }
function isValidEmail(email: string) { ... }
```

### Constants
```typescript
✅ CORRECT:
export const max_chapter_length = 10000;
export const site_title = 'Guardians of the Spear';
export const api_base_url = 'https://api.example.com';

❌ WRONG:
export const MAX_CHAPTER_LENGTH = 10000;
export const SITE_TITLE = 'Guardians of the Spear';
export const API_BASE_URL = 'https://api.example.com';
```

---

## Pattern Rules

### For Files & Directories
- Use `lowercase` only
- No hyphens, no underscores, no capitals
- Examples: `button.tsx`, `charactercard.tsx`, `aboutpage.tsx`

### For Functions & Variables
- Use `lowercase_with_underscores`
- Start with verb for functions: `format_date()`, `is_valid()`
- Prefix booleans with `is_`, `has_`, `can_`, `should_`: `is_loading`, `has_error`
- Examples: `user_id`, `chapter_data`, `format_chapter_title()`

### For Types & Interfaces
- Use `lowercase` (no underscores)
- Suffix with `props` for React props: `buttonprops`, `cardprops`
- Suffix with specific type name: `chapter`, `character`, `user`
- Examples: `interface buttonprops`, `type chapter`, `interface userdata`

---

## Boolean Variables - Special Rules

Always prefix with `is_`, `has_`, `can_`, or `should_`:

```typescript
✅ CORRECT:
const is_loading = true;
const has_error = false;
const can_edit = true;
const should_render = false;

❌ WRONG:
const isLoading = true;
const loading = true;
const error = true;
const editable = true;
```

---

## Imports & Exports

```typescript
✅ CORRECT:
import { button } from '@/components/ui/button';
import type { buttonprops } from '@/components/ui/button';
export { button };
export type { buttonprops };

❌ WRONG:
import { Button } from '@/components/ui/Button';
import type { ButtonProps } from '@/components/ui/Button';
export { Button };
export type { ButtonProps };
```

---

## Project Root Example

```
✅ CORRECT:
gots_website/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── styles/
├── .cursorrules
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── package.json

❌ WRONG:
GOTS_Website/
├── Src/
│   ├── App/
│   ├── Components/
│   ├── Lib/
│   └── Styles/
├── .cursorrules
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── package.json
```

---

## When Using Cursor AI

Tell Cursor to use lowercase naming:

```
Generate a button component with all lowercase naming:
- Component: function button() { }
- Props interface: interface buttonprops { }
- All variables: lowercase_with_underscores
- All functions: lowercase_with_underscores
```

---

## Validation Checklist

Before committing code, verify:

- [ ] All file names are lowercase
- [ ] All directory names are lowercase
- [ ] All component functions are lowercase
- [ ] All type/interface names are lowercase
- [ ] All variables use lowercase_with_underscores
- [ ] All functions use lowercase_with_underscores
- [ ] All constants use lowercase_with_underscores
- [ ] Boolean variables prefix with is_/has_/can_/should_
- [ ] No capital letters anywhere in any name
- [ ] TypeScript strict mode enabled

---

## Reference

For complete standards, see:
- `/Users/werby/GOTS_website/GOTS_website/Review/RULES.md` - Section 3
- `/Users/werby/GOTS_website/GOTS_website/Review/.cursorrules` - Naming section

---

**Version:** 1.0  
**Created:** January 18, 2025  
**Project:** Guardians of the Spear (GOTS)  
**Status:** ACTIVE - All lowercase naming required
