# Tailwind CSS Setup Guide - GOTS Website
## Complete Tailwind Configuration & Customization

**Created:** January 18, 2025  
**Project:** Guardians of the Spear (GOTS)  
**Location:** `/Users/werby/GOTS_website/GOTS_website/Review/tailwind-setup.md`
**Framework:** Next.js 14+ with Tailwind CSS

---

## TABLE OF CONTENTS

1. Initial Setup (Already Done)
2. Theme Customization
3. Color Palette
4. Typography
5. Custom Components
6. Utilities & Plugins
7. Best Practices

---

## 1. INITIAL SETUP (Already Done in Next.js Create)

When you run `npx create-next-app@latest` with Tailwind selected, it creates:

- `tailwind.config.ts` - Tailwind configuration file
- `src/app/globals.css` - Global styles with Tailwind directives
- PostCSS configuration

**Verify files exist:**
```bash
ls -la tailwind.config.ts
ls -la postcss.config.js
ls -la src/app/globals.css
```

---

## 2. THEME CUSTOMIZATION

### Update tailwind.config.ts

**File:** `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Amber (historical/warm)
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Secondary: Slate (neutral)
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Garamond', 'serif'],
        sans: ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Courier New', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      spacing: {
        0: '0',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        6: '1.5rem',
        8: '2rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
        32: '8rem',
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        base: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px',
      },
      boxShadow: {
        none: 'none',
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        spin: 'spin 1s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
```

---

## 3. COLOR PALETTE

### GOTS Historical Theme

**Primary Colors (Amber):** Historical, warm, sophisticated
- `bg-amber-900` - Dark backgrounds (headers, footers)
- `bg-amber-800` - Medium dark
- `bg-amber-600` - Primary buttons
- `text-amber-700` - Primary text links
- `border-amber-200` - Subtle borders
- `bg-amber-50` - Very light backgrounds

**Secondary Colors (Slate):** Neutral, clean, readable
- `bg-slate-900` - Very dark backgrounds
- `bg-slate-100` - Light backgrounds
- `text-slate-900` - Primary text
- `text-slate-600` - Secondary text
- `text-slate-400` - Tertiary text
- `border-slate-200` - Standard borders

**Accent Colors:**
- `text-amber-400` - Links, highlights
- `bg-green-100` - Success states
- `bg-red-100` - Error states
- `bg-yellow-100` - Warning states

---

## 4. TYPOGRAPHY

### Font Families
```css
/* serif - Historical feel for headings */
font-serif

/* sans - Clean, modern for body text */
font-sans

/* mono - Code blocks */
font-mono
```

### Font Sizes (Tailwind Default + Custom)
```
xs    - 0.75rem   (12px) - Small labels
sm    - 0.875rem  (14px) - Navigation, small text
base  - 1rem      (16px) - Body text
lg    - 1.125rem  (18px) - Paragraphs
xl    - 1.25rem   (20px) - Section headings
2xl   - 1.5rem    (24px) - Page headings
3xl   - 1.875rem  (30px) - Large headings
4xl   - 2.25rem   (36px) - Hero headings
```

### Font Weights
```
font-light     - 300
font-normal    - 400
font-semibold  - 600
font-bold      - 700
```

### Heading Styles
```html
<!-- Hero Title (4xl bold serif) -->
<h1 class="text-4xl font-bold font-serif">Guardians of the Spear</h1>

<!-- Page Title (3xl bold serif) -->
<h2 class="text-3xl font-bold font-serif">Chapters</h2>

<!-- Section Title (2xl bold) -->
<h3 class="text-2xl font-bold">Chapter 1: The Beginning</h3>

<!-- Subsection (xl semibold) -->
<h4 class="text-xl font-semibold">Setting</h4>

<!-- Body text (base regular) -->
<p class="text-base">Lorem ipsum dolor sit amet...</p>

<!-- Small text (sm secondary) -->
<p class="text-sm text-slate-600">Published January 1, 2025</p>
```

---

## 5. CUSTOM COMPONENTS

### Utility CSS Classes
**File:** `src/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom utility classes */
@layer components {
  /* Container */
  .container_max {
    @apply max-w-4xl mx-auto;
  }

  .container_wide {
    @apply max-w-6xl mx-auto;
  }

  /* Spacing */
  .section {
    @apply py-12 px-4;
  }

  .section_large {
    @apply py-16 px-4;
  }

  /* Text utilities */
  .text_hero {
    @apply text-4xl font-bold font-serif text-slate-900;
  }

  .text_heading {
    @apply text-3xl font-bold font-serif text-slate-900;
  }

  .text_subheading {
    @apply text-2xl font-bold text-slate-900;
  }

  .text_secondary {
    @apply text-slate-600;
  }

  .text_tertiary {
    @apply text-slate-400;
  }

  /* Button base */
  .btn {
    @apply px-4 py-2 rounded font-semibold transition-colors duration-200;
  }

  .btn_primary {
    @apply btn bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800;
  }

  .btn_secondary {
    @apply btn bg-slate-200 text-slate-900 hover:bg-slate-300 active:bg-slate-400;
  }

  .btn_danger {
    @apply btn bg-red-600 text-white hover:bg-red-700 active:bg-red-800;
  }

  .btn_lg {
    @apply btn px-6 py-3 text-lg;
  }

  /* Card */
  .card {
    @apply bg-white rounded-lg shadow-md p-6 border border-amber-100 hover:shadow-lg transition-shadow;
  }

  /* Badge */
  .badge {
    @apply inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800;
  }

  /* Links */
  .link {
    @apply text-amber-600 hover:text-amber-700 font-semibold transition-colors;
  }

  /* Divider */
  .divider {
    @apply border-t border-slate-200;
  }

  /* Focus states */
  .focus_ring {
    @apply focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2;
  }
}
```

---

## 6. RESPONSIVE DESIGN

### Breakpoints
Tailwind default breakpoints:
```
sm    640px    - Small screens (tablets)
md    768px    - Medium screens (larger tablets)
lg    1024px   - Large screens (laptops)
xl    1280px   - Extra large screens
2xl   1536px   - Ultra wide screens
```

### Example: Responsive Grid
```html
<!-- 1 column on mobile, 2 on tablet, 3 on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Example: Responsive Text
```html
<!-- Small on mobile, large on desktop -->
<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold">
  Guardians of the Spear
</h1>
```

### Example: Responsive Spacing
```html
<div class="px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
  Content
</div>
```

---

## 7. COMMON PATTERNS

### Hero Section
```html
<section class="bg-gradient-to-r from-amber-900 to-amber-800 text-white py-20">
  <div class="max-w-4xl mx-auto px-4">
    <h1 class="text-5xl font-bold font-serif mb-4">Guardians of the Spear</h1>
    <p class="text-xl text-amber-100 mb-8">A historical fiction epic</p>
    <button class="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded font-semibold">
      Read Now
    </button>
  </div>
</section>
```

### Card Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
  <div class="card">
    <h3 class="text-xl font-bold mb-2">Card Title</h3>
    <p class="text-slate-600">Card content here...</p>
  </div>
</div>
```

### Navigation Bar
```html
<header class="bg-amber-900 text-white shadow-lg sticky top-0">
  <div class="max-w-6xl mx-auto px-4 py-4">
    <nav class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">Guardians</h1>
      <ul class="hidden md:flex gap-6">
        <li><a href="/" class="hover:text-amber-200">Home</a></li>
        <li><a href="/chapters" class="hover:text-amber-200">Chapters</a></li>
        <li><a href="/characters" class="hover:text-amber-200">Characters</a></li>
      </ul>
    </nav>
  </div>
</header>
```

### Footer
```html
<footer class="bg-slate-900 text-slate-100 mt-16">
  <div class="max-w-6xl mx-auto px-4 py-12">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div>
        <h3 class="text-lg font-bold mb-4 text-amber-400">About</h3>
        <p class="text-slate-400">Historical fiction website...</p>
      </div>
    </div>
    <div class="border-t border-slate-700 pt-8">
      <p class="text-center text-slate-400">&copy; 2025 All rights reserved.</p>
    </div>
  </div>
</footer>
```

---

## BEST PRACTICES

1. **Use utility-first:** Compose components from Tailwind utilities
2. **Extract repeated patterns:** Use @layer components for reusable styles
3. **Avoid custom CSS:** Use Tailwind utilities instead of custom classes
4. **Mobile-first:** Start with mobile styles, add breakpoints
5. **Color consistency:** Use theme colors (amber, slate) throughout
6. **Spacing scale:** Use defined spacing values (2, 4, 6, 8, 12, 16)
7. **Semantic HTML:** Use proper HTML elements for structure

---

## TROUBLESHOOTING

### Styles Not Appearing
```bash
# Clear cache and rebuild
rm -rf .next
npm run dev
```

### Color Not Showing
- Verify the color class is in `content` paths in tailwind.config.ts
- Check exact spelling of Tailwind class names
- Use exact color names from config

### Performance Issues
- Remove unused color variants in tailwind.config.ts
- Minimize custom CSS in globals.css
- Use Tailwind's built-in utilities instead of custom classes

---

**Version:** 1.0  
**Created:** January 18, 2025  
**Project:** Guardians of the Spear (GOTS)  
**Location:** `/Users/werby/GOTS_website/GOTS_website/Review/tailwind-setup.md`
