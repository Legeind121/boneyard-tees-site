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
1. Header - "BONEYARD TEES" logo with cyan-to-pink gradient
2. Hero - Merica Idle character, tagline, welcome message
3. CTA - Customer photo, "GET FITTED" button (placeholder, not functional yet)

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

**Merica Character:** `/Images/Merica/` - Excited, Grumpy, Idle (in use), Thinking, Wave
**Line Art:** `/Images/landing page/` - dog bone.png, paw.png, dog tags.png
**Customer Photos:** `/Images/customer images/`
**Logos:** `/Images/logos/`

## Important Notes

- Mobile responsive design implemented (breakpoints: 768px, 480px)
- No routing library yet (single page app)
- No e-commerce functionality yet
- Use functional components and React hooks
- Owner is non-technical - explain changes clearly
