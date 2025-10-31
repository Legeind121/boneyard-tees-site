# CLAUDE.md

Guidance for Claude Code when working with this repository.

## Project Overview

**Boneyard Tees** - T-shirt company website featuring "Merica" pit bull mascot character.

- **Tech Stack:** React 19, Vite, JavaScript (no TypeScript)
- **Domain:** boneyardtees.com (Cloudflare)
- **Status:** Landing page complete, shop/e-commerce features not yet built
- **Owner:** Non-technical - use simple, clear explanations

## Dev Commands

```bash
npm run dev      # Dev server at http://localhost:5173
npm run build    # Production build
npm run lint     # Check code quality
```

**IMPORTANT:** `vite.config.js` is configured with `host: '127.0.0.1'` to bind to IPv4 explicitly. This fixes Windows connection issues where Vite defaults to IPv6 causing ERR_CONNECTION_REFUSED errors in browsers.

## Project Structure

```
src/
  main.jsx        # Entry point
  App.jsx         # Main landing page component
  App.css         # Component styles
  index.css       # Global styles, cyberpunk colors, fonts
public/
  Images/         # All images (Merica character, customer photos, logos, line art)
  fonts/          # Warbones, Ardillah Kafi fonts
```

**Asset Paths:** Reference public files as `/Images/folder/file.ext` or `/fonts/file.otf`

## Brand & Design

**Brand Voice:** Sarcastic, adult humor, helpful, confident

**Custom Fonts:**
- Warbones - Site title "BONEYARD TEES"
- Ardillah Kafi - All body text

**Cyberpunk Color Variables** (`src/index.css`):
```css
--cyber-bg: #0a0e27;              /* Dark background */
--cyber-bg-secondary: #1a1f3a;    /* Secondary background */
--cyber-pink: #ff006e;            /* Neon pink */
--cyber-cyan: #00f5ff;            /* Neon cyan */
--cyber-purple: #9d4edd;          /* Purple */
--cyber-blue: #3a86ff;            /* Blue */
--cyber-text: #e0e7ff;            /* Light text */
--cyber-text-dim: #a8b2d1;        /* Dimmed text */
```

## Landing Page Features

**Main Sections:**
1. Header - "BONEYARD TEES" logo with cyan-to-pink gradient (6.5rem desktop, 30% larger than original)
2. Hero - Animated Merica character (585px desktop, 30% larger), tagline, welcome message
3. Featured Designs - Two-column section with customer carousel and shop placeholder (new)
4. CTA - Customer photo, "GET FITTED" button (placeholder, not functional yet)

**Merica Character Animation:**
- Uses React `useState` and `useEffect` hooks for random pose changes
- Cycles through 4 poses: Idle (default), head slightly left, head right, head slightly left blink
- Random timing: Changes every 8-15 seconds with weighted probability (50% chance to return to Idle)
- Smooth 0.4s opacity fade transitions between poses
- Images preloaded on component mount to prevent flashing
- Current pose tracked in state: `currentPose`
- Spacing below character: `0.75rem` desktop, `0.65rem` tablet, `0.5rem` mobile

**Hero Section Text Spacing:**
- `.hero-section h2` (Welcome heading) margin-bottom: `0.5rem`
- `.hero-section .tagline` margin-bottom: `0.75rem`
- These values have been reduced from original 1.5rem to create tighter, more cohesive layout

**Dog Chain Divider (Between Sections 1 & 2):**
- Horizontal decorative element spanning 75% of screen width (80% tablet, 85% mobile)
- Image: `/Images/landing page/dog chain.png`
- Cyan neon glow effect (3-layer drop-shadow matching other decorative elements)
- Hover effect intensifies glow
- Positioned between hero section and featured designs carousel
- Margin: `2rem` vertical (desktop), `1.5rem` (tablet), `1rem` (mobile)

**Featured Designs Section (Section 3):**
- Two-column layout (side-by-side on desktop, stacked on mobile/tablet)
- **Left Column - "Featured Customer Designs":**
  - Title: Cyan color with multi-layer glow and faint neon outline
  - Card deck-style carousel with 5 images (3 real customer photos + 2 gray placeholders)
  - **Current customer images:**
    - `barber & burnout.jpg` (image 1)
    - `Dorman '25 picnic.png` (image 2)
    - `Strongside kettlebell.png` (image 3)
  - Auto-rotation: Changes every 5 seconds
  - Manual navigation: Left/right arrow buttons
  - When arrows clicked, auto-rotation pauses for 10 seconds then resumes
  - Card stacking animation: Cards slide behind each other like a deck
  - Active card: Full opacity, largest, front of stack
  - Background cards: 30% opacity, stacked with slight offset
  - Smooth 0.6s cubic-bezier transitions between cards
  - Pink glow effect on customer images (same as CTA section)
  - Indicator dots below carousel show active slide
  - State tracked: `currentCarouselIndex`, `isCarouselPaused`
  - Carousel images array in App.jsx: 5 objects with src, alt, isPlaceholder properties
- **Right Column - "Featured Shop Designs":**
  - Title: Purple color with multi-layer glow and faint neon outline
  - "Coming Soon" placeholder (purple border, matching carousel dimensions)
  - Ready for future shop product images

**Animated Background:**
- Perspective grid (Tron-style) - subtle cyan lines, slow scrolling animation
- 5 floating shapes with vibrant neon glows (PNG line art from `/Images/landing page/`):
  - 2x Dog bones (`dog bone.png`) - Cyan & Blue glows
  - 2x Paw prints (`paw.png`) - Pink & Cyan glows
  - 1x Dog tags (`dog tags.png`) - Purple glow
- Slow floating/rotating animations (25-35 second cycles)
- All positioned behind content (z-index: -1)
- Responsive - scales down on mobile/tablet

## Key Assets

**Merica Character:** `/Images/Merica/`
- **In animation rotation:** Idle (default), head slightly left, head right, head slightly left blink
- **Available (not in use):** Excited, Grumpy, Thinking, Wave, pointing
- Managed via `mericaPoses` array in App.jsx

**Line Art:** `/Images/landing page/`
- Background decorations: dog bone.png, paw.png, dog tags.png
- Divider: dog chain.png (used between sections 1 & 2)

**Customer Photos:** `/Images/customer images/`
- barber & burnout.jpg
- Dorman '25 picnic.png
- Strongside kettlebell.png

**Logos:** `/Images/logos/`

## Responsive Sizing Specifications

**Site Title "BONEYARD TEES" (.site-title):**
- Desktop: `6.5rem` font-size
- Tablet (768px): `3.9rem` font-size
- Mobile (480px): `2.6rem` font-size

**Merica Character (.merica-character):**
- Desktop: `585px` width, `0.75rem` margin-bottom
- Tablet (768px): `364px` width, `0.65rem` margin-bottom
- Mobile (480px): `286px` width, `0.5rem` margin-bottom

**Section Spacing (.main-content gap):**
- Desktop: `1rem` (reduced from original 4rem for tighter layout)
- Tablet/Mobile (768px): `0.5rem` (reduced from original 2rem)

## Important Notes

- Mobile responsive design implemented (breakpoints: 768px, 480px)
- No routing library yet (single page app)
- No e-commerce functionality yet
- Use functional components and React hooks
- Owner is non-technical - explain changes clearly
- **DO NOT** modify animation timing (Merica poses or carousel rotation) without discussing with owner first
- Multiple independent animations run simultaneously (Merica + carousel) - both use separate state and useEffect hooks

## Troubleshooting & Lessons Learned

**Image Path Issues:**
- **ALWAYS verify image filenames match exactly** - if carousel images aren't loading, check that the filename in `carouselImages` array matches the actual file in `/Images/customer images/`
- Windows file paths are case-insensitive but React/Vite asset paths ARE case-sensitive in production
- Special characters in filenames (like `&` in `barber & burnout.jpg`) are fine in paths, just use exact filename

**Carousel Display Problems:**
- If images show through each other or don't display properly, check:
  1. Image paths are correct and images exist at specified location
  2. `.carousel-card` z-index stacking is working (inline styles control this)
  3. `.carousel-cards` has proper dimensions and doesn't have conflicting overflow properties
  4. Don't add `background-color` to `.carousel-card` - causes visibility issues
  5. Don't override z-index with `!important` on `.carousel-card.active` - breaks stacking

**CSS Spacing Changes:**
- When reducing spacing, do it incrementally and check results before continuing
- The `.main-content gap` property controls spacing between ALL main sections (hero, featured, CTA)
- Hero section text spacing is controlled by individual margin-bottom values on h2, .tagline, etc.

**Development Workflow:**
- Run `npm run dev` and check browser console for 404 errors when adding new images
- Use browser DevTools to inspect computed styles when debugging layout issues
- If making multiple related changes, test incrementally rather than all at once
