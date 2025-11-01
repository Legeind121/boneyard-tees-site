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
npm run dev      # Dev server at http://127.0.0.1:5173
npm run build    # Production build
npm run lint     # Check code quality
```

**IMPORTANT:**
- **Local Browser URL:** http://127.0.0.1:5173 (NOT localhost:5173)
- `vite.config.js` is configured with `host: '127.0.0.1'` to bind to IPv4 explicitly
- This fixes Windows connection issues where Vite defaults to IPv6 causing ERR_CONNECTION_REFUSED errors in browsers

## Project Structure

```
src/
  main.jsx                    # Entry point
  App.jsx                     # Main landing page component (has ChatWidget imported)
  App.css                     # Component styles
  index.css                   # Global styles, cyberpunk colors, fonts
  components/
    ChatWidget.jsx            # Merica AI chatbot component
    ChatWidget.css            # Chatbot styling (cyberpunk theme)
public/
  Images/                     # All images (Merica character, customer photos, logos, line art)
  fonts/                      # Warbones, Ardillah Kafi fonts
worker.js                     # Cloudflare Worker backend for chatbot
wrangler.toml                 # Cloudflare Worker configuration
.env                          # Environment variables (ANTHROPIC_API_KEY) - NEVER COMMIT
index.html                    # Vite entry point
CHATBOT-SETUP.md              # Complete chatbot deployment guide
CLAUDE.md                     # This file - project documentation for Claude
```

**Asset Paths:** Reference public files as `/Images/folder/file.ext` or `/fonts/file.otf`

## Merica AI Chatbot

**CRITICAL:** Interactive AI chatbot powered by Claude AI (Haiku 4.5) - allows customers to chat with Merica mascot.

### ✅ Current Status: LIVE AND WORKING

**Latest Update (2025-10-31):**
- ✅ Chatbot fully functional and deployed to production
- ✅ Worker endpoint: `https://merica-chatbot.boneyardtees.workers.dev`
- ✅ Using correct Claude model: `claude-haiku-4-5-20251001`
- ✅ Personality tuned with natural conversation endings
- ✅ Live on boneyardtees.com

**Recent Improvements:**
- Fixed model name error (was using invalid `claude-haiku-4-20250514`, now using correct `claude-haiku-4-5-20251001`)
- Conversation flow optimization: Better natural endings with engaging CTAs ("Ready for some fresh drip?", "Want some new diggs?")
- System prompt refinements to avoid awkward "anything else?" loops

**CRITICAL SECURITY:**
- `.env` file protected by `.gitignore` - API keys never committed to git
- `ANTHROPIC_API_KEY` stored as encrypted Cloudflare Worker secret
- `CLOUDFLARE_API_TOKEN` stored in local `.env` for wrangler deployments

### Architecture

**Backend:** Cloudflare Worker (serverless)
- `worker.js` - API endpoint that communicates with Claude API
- `wrangler.toml` - Cloudflare Worker configuration
- **Endpoint:** Deployed to `https://merica-chatbot.boneyardtees.workers.dev`

**Frontend:** React component
- `src/components/ChatWidget.jsx` - Chat bubble and window component
- `src/components/ChatWidget.css` - Cyberpunk-styled chat interface (cyan/pink neon theme)
- **Integration:** Import and add `<ChatWidget />` to App.jsx

**Environment Variables:**
- `.env` - Contains sensitive credentials (NEVER commit to git):
  - `ANTHROPIC_API_KEY` - Claude API access for chatbot
  - `CLOUDFLARE_API_TOKEN` - Wrangler CLI authentication for deployments
- `.gitignore` - Protects `.env`, `.env.local`, `.env.*.local` from git commits
- `ANTHROPIC_API_KEY` is also stored as encrypted secret on Cloudflare Worker via `wrangler secret put ANTHROPIC_API_KEY`

### Merica's Personality (Rated-R Badass)

**CRITICAL CONSTRAINTS - DO NOT MODIFY WITHOUT OWNER APPROVAL:**

**Tone & Voice:**
- Rated-R: Sarcastic, dark humor, ball-busting, edgy adult humor
- No kid-friendly softness - think biker bar pit bull who runs a custom tee shop
- Roasting, dad jokes, mom jokes all fair game
- Confident bordering on cocky, street-smart, zero BS tolerance
- **Response length:** 2-3 sentences MAX (enforced via `max_tokens: 200` in worker.js)

**Topic Boundaries (STRICT):**
- **ONLY discusses:** BoneYard Tees brand, custom apparel, DTF printing, embroidery, custom orders
- **Refuses all off-topic requests:** politics, medical advice, homework, news, etc.
- **Redirect example:** "I'm a pit bull who knows custom tees. That's it. What apparel you need?"

**Example Responses:**
- "Yo. Need custom tees or you just here to waste my time?"
- "DTF printing? Direct-to-Film. Makes your design look crispy as hell. Not rocket science."
- "Your mom called - she wants a custom hoodie. Just kidding, but seriously, what you need?"
- "Dad joke? Fine: What do you call a shirt that's always angry? A tank top. ...Alright, back to business."

**System Prompt Location:** `worker.js` lines 11-73 (`MERICA_SYSTEM_PROMPT` constant)

### Chat Widget Features

**UI/UX:**
- Floating chat bubble (bottom-right corner) with Merica avatar
- Pulsing cyan neon glow animation on bubble
- Expandable chat window (400px × 600px desktop, fullscreen on mobile)
- Cyberpunk styling matches site aesthetic (cyan/pink gradients, neon glows)
- Typing indicator (3 animated dots with cyan glow)
- Auto-scroll to newest messages
- Welcome message on first open: "Yo. I'm Merica. Need custom tees or you just browsing?"

**Technical Details:**
- Uses React hooks: `useState`, `useEffect`, `useRef`
- Maintains conversation history (last 10 messages sent to API for context)
- Fetches responses from Cloudflare Worker API endpoint
- Error handling with fallback messages
- Mobile responsive (fullscreen on screens <480px)

**API Configuration:**
- Update `API_ENDPOINT` constant in ChatWidget.jsx after deploying worker
- Format: `https://merica-chatbot.<subdomain>.workers.dev` or custom domain

### Deployment Status

**Already Completed:**
- ✅ Wrangler CLI installed (v4.45.3)
- ✅ Worker deployed to: `https://merica-chatbot.boneyardtees.workers.dev`
- ✅ API key stored as Cloudflare secret
- ✅ ChatWidget integrated into App.jsx
- ✅ Code pushed to GitHub (main branch)
- ✅ Cloudflare Pages auto-deploys from GitHub

**To Redeploy Worker:**
```bash
wrangler deploy
```

**To Update API Key Secret:**
```bash
wrangler secret put ANTHROPIC_API_KEY
```

**Full deployment guide:** See [CHATBOT-SETUP.md](CHATBOT-SETUP.md)

**Cost Monitoring:**
- Haiku 4.5: ~$0.0003 per chat (~$3-5/month for 100 chats/day)
- Set budget alerts: [console.anthropic.com/settings/limits](https://console.anthropic.com/settings/limits)

### Important Notes

- **NEVER commit `.env` file** - API key must stay private
- **Personality is in backend** - changes to Merica's tone require redeploying worker (`wrangler deploy`)
- **Frontend changes** (ChatWidget UI) require React rebuild and Cloudflare Pages deployment
- **Test responses locally** before deploying personality changes
- **Monitor API costs** weekly during initial launch
- **DO NOT modify personality without owner approval** - tone is intentionally edgy/rated-R
- Worker logs available via: `wrangler tail` (useful for debugging API issues)

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
3. Featured Designs - Stacked vertical layout with two independent carousels (customer & shop)

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
- **Stacked vertical layout** with 3rem gap between carousels
- Both carousels run **independently** for optimal performance (lower system power)
- Both use identical carousel component structure with opposite animations

**"Featured Customer Designs" Carousel (Top):**
- Title: Cyan color with multi-layer glow and faint neon outline
- **Cyan theme:** Navigation buttons and indicators use cyan (`--cyber-cyan`)
- Card deck-style carousel with 5 images (3 real customer photos + 2 gray placeholders)
- **Current customer images:**
  - `barber & burnout.jpg` (image 1)
  - `Dorman '25 picnic.png` (image 2)
  - `Strongside kettlebell.png` (image 3)
- **Animation:** Cards slide **RIGHT** (left to right) with dramatic "card dealer" effect
  - `translateX(${position * 250}px)` - 250px horizontal offset per position
  - `rotate(${position * 3}deg)` - 3° clockwise rotation per position
  - `scale(${1 - position * 0.08})` - 8% scale reduction per position
  - `translateY(${position * 5}px)` - 5px vertical offset per position
- **Horizontal offset:** Entire carousel offset **9rem to the left** (`.customer-carousel-column`)
- Auto-rotation: Changes every 5 seconds
- Manual navigation: Left/right arrow buttons (cyan)
- When arrows clicked, auto-rotation pauses for 10 seconds then resumes
- Active card: Full opacity, largest, front of stack (z-index: 5)
- Background cards: 30% opacity, stacked progressively behind
- Smooth 0.6s cubic-bezier(0.4, 0, 0.2, 1) transitions between cards
- Pink glow effect on customer images (box-shadow: 0 0 40px rgba(255, 0, 110, 0.4))
- Indicator dots below carousel show active slide
- State tracked: `currentCarouselIndex`, `isCarouselPaused`
- Carousel images array in App.jsx: `carouselImages` (5 objects with src, alt, isPlaceholder properties)

**"Featured Shop Designs" Carousel (Bottom):**
- Title: Purple color with multi-layer glow and faint neon outline
- **Purple theme:** Navigation buttons and indicators use purple (`--cyber-purple`) via `.shop-theme` class
- Card deck-style carousel with 5 placeholder cards (all gray "Coming Soon" boxes for now)
- **Animation:** Cards slide **LEFT** (right to left) - opposite of customer carousel
  - `translateX(${position * -250}px)` - **Negative** 250px horizontal offset (slides left)
  - `rotate(${position * -3}deg)` - **Negative** 3° counter-clockwise rotation
  - `scale(${1 - position * 0.08})` - 8% scale reduction per position
  - `translateY(${position * 5}px)` - 5px vertical offset per position
- **Horizontal offset:** Entire carousel offset **9rem to the right** (`.shop-carousel-column`)
- Auto-rotation: Changes every 5 seconds (independent of customer carousel)
- Manual navigation: Left/right arrow buttons (purple)
- When arrows clicked, auto-rotation pauses for 10 seconds then resumes
- Same opacity, z-index stacking, and transition properties as customer carousel
- Indicator dots below carousel show active slide (purple theme)
- State tracked: `currentShopCarouselIndex`, `isShopCarouselPaused`
- Carousel images array in App.jsx: `shopCarouselImages` (5 placeholder objects)
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
- **DO NOT** modify animation timing (Merica poses or carousel rotations) without discussing with owner first
- Multiple independent animations run simultaneously:
  - Merica character pose changes (8-15 second intervals)
  - Customer carousel auto-rotation (5 second intervals)
  - Shop carousel auto-rotation (5 second intervals, independent of customer carousel)
  - All use separate state and useEffect hooks for optimal performance

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

**Carousel Animation System:**
- **Opposite directions achieved with negative values:** Customer carousel uses positive `translateX(250px)` and `rotate(3deg)`, shop carousel uses negative `translateX(-250px)` and `rotate(-3deg)`
- **Animation intensity:** 250px horizontal offset per position creates dramatic "card dealer" effect (increased from original 10px subtle stacking)
- **Rotation adds flair:** 3° rotation per position makes cards appear to "flip" as they move to back of deck
- **Horizontal carousel offsets:** Use negative margins on `.customer-carousel-column` (left offset) and `.shop-carousel-column` (right offset) to create asymmetric staggered layout
- **Independent state:** Each carousel has its own state variables (`currentCarouselIndex` vs `currentShopCarouselIndex`) and navigation functions to prevent conflicts
- **Theme customization:** Use `.shop-theme` class on navigation/indicators to override cyan defaults with purple colors

**CSS Spacing Changes:**
- When reducing spacing, do it incrementally and check results before continuing
- The `.main-content gap` property controls spacing between ALL main sections (hero, featured designs)
- The `.featured-section gap` property controls vertical spacing between the two carousels (currently 3rem)
- Hero section text spacing is controlled by individual margin-bottom values on h2, .tagline, etc.

**Development Workflow:**
- Run `npm run dev` and check browser console for 404 errors when adding new images
- Use browser DevTools to inspect computed styles when debugging layout issues
- If making multiple related changes, test incrementally rather than all at once

**Cloudflare Worker & Chatbot Issues:**
- **Model Name Errors:** Always use exact model IDs from Anthropic documentation (e.g., `claude-haiku-4-5-20251001`). Incorrect model names cause 500 server errors. Check [https://docs.claude.com/en/docs/about-claude/models](https://docs.claude.com/en/docs/about-claude/models) for current model names.
- **Wrangler Authentication:** Store `CLOUDFLARE_API_TOKEN` in `.env` file to prevent login prompts during `wrangler deploy` or `wrangler tail` commands. Set with: `$env:CLOUDFLARE_API_TOKEN="your_token"` (PowerShell) or `export CLOUDFLARE_API_TOKEN="your_token"` (bash).
- **Debugging Worker Errors:** Use `wrangler tail --format pretty` to view real-time logs when chatbot isn't responding correctly. Send test message in browser and watch console output for actual error messages from Claude API.
- **Testing Worker Locally:** Use `wrangler dev` to test worker locally before deploying to production. Worker runs at `http://localhost:8787`.
- **API Key Security:** Never commit `.env` to git. `ANTHROPIC_API_KEY` is stored as encrypted secret on Cloudflare via `wrangler secret put ANTHROPIC_API_KEY`.
- **Deployment:** After making changes to `worker.js`, deploy with `wrangler deploy`. Changes are live immediately.
