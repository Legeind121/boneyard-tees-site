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
- Spacing below character: `1.75rem` desktop, `1.25rem` tablet, `1rem` mobile

**Featured Designs Section (Section 3):**
- Two-column layout (side-by-side on desktop, stacked on mobile/tablet)
- **Left Column - "Featured Customer Designs":**
  - Title: Cyan color with multi-layer glow and faint neon outline
  - Card deck-style carousel with 5 images (1 real customer photo + 4 gray placeholders)
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

**Line Art:** `/Images/landing page/` - dog bone.png, paw.png, dog tags.png
**Customer Photos:** `/Images/customer images/`
**Logos:** `/Images/logos/`

## Responsive Sizing Specifications

**Site Title "BONEYARD TEES" (.site-title):**
- Desktop: `6.5rem` font-size
- Tablet (768px): `3.9rem` font-size
- Mobile (480px): `2.6rem` font-size

**Merica Character (.merica-character):**
- Desktop: `585px` width, `1.75rem` margin-bottom
- Tablet (768px): `364px` width, `1.25rem` margin-bottom
- Mobile (480px): `286px` width, `1rem` margin-bottom

## Important Notes

- Mobile responsive design implemented (breakpoints: 768px, 480px)
- No routing library yet (single page app)
- No e-commerce functionality yet
- Use functional components and React hooks
- Owner is non-technical - explain changes clearly
- **DO NOT** modify animation timing (Merica poses or carousel rotation) without discussing with owner first
- Multiple independent animations run simultaneously (Merica + carousel) - both use separate state and useEffect hooks
