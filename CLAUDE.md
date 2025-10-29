# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a website for **Boneyard Tees**, a t-shirt company featuring the "Merica" character. The site is built with React 19 and Vite, and is in early development stages.

**Domain:** boneyardtees.com (Porkbun domain managed through Cloudflare)

**Key Context:**
- This is a brand new project, just getting started
- The owner is non-technical - explain things in simple, clear terms
- Focus on practical, step-by-step guidance
- Currently using the default Vite template - real features need to be built

## Development Commands

**Start the development server:**
```bash
npm run dev
```
Opens a local preview at http://localhost:5173 with live updates as you edit files.

**Build for production:**
```bash
npm run build
```
Creates optimized files in the `dist/` folder ready to deploy.

**Preview production build:**
```bash
npm run preview
```
Test the production build locally before deploying.

**Check code quality:**
```bash
npm run lint
```
Runs ESLint to catch common code issues.

**Note:** No testing framework is configured yet.

## Architecture & Tech Stack

**Framework:** React 19 with Vite (JavaScript, not TypeScript)

**Current State:**
- Landing page is complete and live in development
- Single-page application (no routing library installed yet)
- Using React hooks for state management (no Redux/Zustand)
- Plain CSS for styling with cyberpunk theme (no Tailwind or component library)
- No e-commerce functionality yet - "Get Fitted" button is a placeholder
- Mobile responsive design implemented

**Project Structure:**
- `src/main.jsx` - Entry point, sets up React
- `src/App.jsx` - Main landing page component
- `src/App.css` - Component-specific styles including responsive design
- `src/index.css` - Global styles, cyberpunk color variables, custom fonts
- `public/` - Static assets accessible at root path
- `public/Images/` - Organized image folders (Merica, customer images, logos, site dog characters)
- `public/fonts/` - Custom font files (Warbones, Ardillah Kafi)

## Landing Page Structure

**Three Main Sections:**

1. **Header** - "BONEYARD TEES" text logo using Warbones font with cyan-to-pink gradient
2. **Hero Section** - Merica Idle character, welcome heading, tagline: "T-shirts with more personality than your ex", subtext about premium quality
3. **CTA Section** - Customer hoodie image, headline: "Blank tees or custom designs. Your call.", "GET FITTED" button (placeholder, not linked yet)

**Key Features:**
- Cyberpunk color scheme (dark blue/black background, neon cyan/pink accents)
- Interactive button with hover effects (glow, lift animation)
- Fully responsive for mobile, tablet, and desktop
- Smooth scrolling enabled

## Assets & Branding

**Brand Voice:** Sarcastic, adult humor, helpful, confident

**Custom Fonts:**
- `Warbones-RpM1V.otf` - Used for main "BONEYARD TEES" header (located in `/public/fonts/`)
- `Ardillah Kafi.otf` - Used for all body text (located in `/public/fonts/`)

**Merica Character Images:** (located in `/public/Images/Merica/`)
- Merica Excited.png
- Merica Grumpy.png
- Merica Idle.png (currently used on landing page)
- Merica Thinking.png
- Merica Wave.png

**Customer Images:** (located in `/public/Images/customer images/`)
- customer hoody 1.jpg (currently used in CTA section)

**Logo Files:** (located in `/public/Images/logos/`)
- business name logo.svg
- Logo for square.png

**Site Dog Characters:** 13 character images in `/public/Images/site dog characters/` for future use

**Asset Paths:**
- Files in `public/` are referenced as `/Images/folder/filename.ext` in code
- Fonts in `public/fonts/` are referenced as `/fonts/filename.otf` in CSS @font-face

## Styling & Design System

**Cyberpunk Color Variables** (defined in `src/index.css`):
```css
--cyber-bg: #0a0e27;              /* Dark blue-black background */
--cyber-bg-secondary: #1a1f3a;    /* Secondary background */
--cyber-pink: #ff006e;            /* Neon pink accent */
--cyber-cyan: #00f5ff;            /* Neon cyan accent */
--cyber-purple: #9d4edd;          /* Purple accent */
--cyber-blue: #3a86ff;            /* Blue accent */
--cyber-text: #e0e7ff;            /* Light text color */
--cyber-text-dim: #a8b2d1;        /* Dimmed text color */
```

**Typography:**
- Headers use cyan-to-pink gradient: `background: linear-gradient(135deg, var(--cyber-cyan), var(--cyber-pink));`
- Main title uses Warbones font
- Body text uses Ardillah Kafi font

**Common Effects:**
- Rounded corners: `border-radius: 20px` or `12px`
- Glow effects: `box-shadow: 0 0 30px rgba(color, opacity);`
- Hover animations: `transform: translateY(-3px);` with `transition: all 0.3s ease;`

**Responsive Breakpoints:**
- Mobile: `@media (max-width: 480px)`
- Tablet: `@media (max-width: 768px)`

## Code Standards

**React Patterns:**
- Use functional components (not class components)
- Use React hooks (useState, useEffect, etc.)
- Fast Refresh is enabled for instant updates while coding

**ESLint Rules:**
- Linting is configured with React-specific rules
- React Hooks rules are enforced
- The `dist/` folder is ignored

**File Extensions:**
- Use `.jsx` for files with React components
- Use `.js` for utilities without JSX

## Build & Deployment

**Build Output:**
- Vite builds to `dist/` directory
- Creates optimized static files ready for any host
- Single-page application structure

**Deployment Options:**
- Static hosting (Netlify, Vercel, Cloudflare Pages, GitHub Pages)
- Domain is already configured with Cloudflare
- No deployment automation configured yet
- May need SPA redirect rules when routing is added

## Next Steps & Future Development

**Immediate Next Steps:**
- Connect "Get Fitted" button to shop page (needs to be built)
- Build shop page for blank apparel and custom orders
- Add navigation/routing (React Router) when multiple pages are created
- Deploy to Cloudflare Pages at boneyardtees.com

**Future Features Needed:**
- Product catalog/gallery for t-shirt designs
- Shopping cart functionality
- E-commerce integration (Shopify, Stripe, or similar)
- Contact/about pages
- Order customization interface

**Not Yet Configured:**
- Testing framework
- Environment variables
- API integration
- State management library (may need when shop is built)
- UI component library

## Working with Non-Technical Users

When explaining concepts or changes:
- Use simple, everyday language
- Avoid jargon or explain it when necessary
- Break complex tasks into small, clear steps
- Show examples and previews when possible
- Confirm understanding before moving forward
