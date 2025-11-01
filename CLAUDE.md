# CLAUDE.md

Guidance for Claude Code when working with this repository.

## Project Overview

**Boneyard Tees** - T-shirt company website featuring "Merica" pit bull mascot character.

- **Tech Stack:** React 19, Vite, JavaScript (no TypeScript)
- **Domain:** boneyardtees.com (Cloudflare)
- **Status:** Landing page complete, shop/e-commerce features not yet built
- **Owner:** Non-technical - use simple, clear explanations
- **Code Quality:** A-grade (95%) - Production-ready with comprehensive error handling, accessibility, and security

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
  main.jsx                    # Entry point with ErrorBoundary wrapper
  App.jsx                     # Main landing page component with lazy-loaded ChatWidget
  App.css                     # Component styles
  index.css                   # Global styles, cyberpunk colors, fonts
  constants.js                # Centralized configuration values (NEW)
  components/
    ChatWidget.jsx            # Merica AI chatbot component with PropTypes
    ChatWidget.css            # Chatbot styling (cyberpunk theme)
    ErrorBoundary.jsx         # React error boundary (NEW)
public/
  Images/                     # All images (Merica character, customer photos, logos, line art)
  fonts/                      # Warbones, Ardillah Kafi fonts
worker.js                     # Cloudflare Worker backend with rate limiting (ENHANCED)
wrangler.toml                 # Cloudflare Worker configuration
.env                          # Environment variables (ANTHROPIC_API_KEY) - NEVER COMMIT
package.json                  # Dependencies (includes prop-types)
index.html                    # Vite entry point
CHATBOT-SETUP.md              # Complete chatbot deployment guide
CLAUDE.md                     # This file - project documentation for Claude
```

**Asset Paths:** Reference public files as `/Images/folder/file.ext` or `/fonts/file.otf`

## Configuration & Constants

**File:** `src/constants.js`

Centralized configuration for all timing, animation, and path constants. **ALWAYS use these constants** instead of magic numbers:

**Animation Timing:**
- `MERICA_POSE_MIN_INTERVAL` = 8000ms
- `MERICA_POSE_MAX_INTERVAL` = 15000ms
- `MERICA_POSE_IDLE_WEIGHT` = 0.5 (50% chance)
- `CAROUSEL_AUTO_ROTATE_INTERVAL` = 5000ms
- `CAROUSEL_PAUSE_DURATION` = 10000ms

**Carousel Animation:**
- `CARD_HORIZONTAL_OFFSET` = 250px
- `CARD_SCALE_REDUCTION` = 0.08
- `CARD_ROTATION_DEGREES` = 3
- `CARD_VERTICAL_OFFSET` = 5px
- `CAROUSEL_INACTIVE_OPACITY` = 0.3

**Chat Configuration:**
- `MAX_CHAT_MESSAGES` = 50 (history limit)
- `CHAT_CONVERSATION_CONTEXT_LENGTH` = 10 (sent to API)

**Image Paths:**
- `IMAGE_PATHS.MERICA.*` - Merica character poses
- `IMAGE_PATHS.CUSTOMER_DESIGNS.*` - Customer photos
- `IMAGE_PATHS.DECORATIVE.*` - Background decorations

## Error Handling & Reliability

### Error Boundary

**File:** `src/components/ErrorBoundary.jsx`

React Error Boundary catches errors in child components and displays fallback UI. Prevents app crashes.

**Features:**
- Catches React errors during rendering
- Displays cyberpunk-themed error page
- "Try Again" button to reset error state
- "Go Home" button to reload page
- Development-only console logging
- PropTypes validation

**Integration:** Wraps `<App />` in `main.jsx`

### Image Error Handling

**ALL images have fallback handlers:**
- Merica character: Falls back to Idle pose if image fails
- Carousel images: Shows "Image not available" placeholder
- Decorative images: Hides silently (no visual break)
- Lazy loading on all images (`loading="lazy"`)

### ChatWidget Error Handling

**Comprehensive error differentiation:**
- Network errors: "Can't reach the server. Check your connection."
- Timeout errors: "Request timed out. Try again."
- Invalid response: "Got a weird response from the server. Try again."
- Generic fallback: "Damn, something broke. Try again in a sec."
- Development-only console logging

## Merica AI Chatbot

**CRITICAL:** Interactive AI chatbot powered by Claude AI (Haiku 4.5) - allows customers to chat with Merica mascot.

### ✅ Current Status: LIVE AND WORKING

**Latest Update (2025-10-31):**
- ✅ Chatbot fully functional and deployed to production
- ✅ Worker endpoint: `https://merica-chatbot.boneyardtees.workers.dev`
- ✅ Using correct Claude model: `claude-haiku-4-5-20251001`
- ✅ Rate limiting: 10 requests/minute per IP
- ✅ CORS restricted to boneyardtees.com + Cloudflare Pages
- ✅ Message history limited to 50 messages
- ✅ PropTypes validation
- ✅ Lazy loaded for performance
- ✅ Live on boneyardtees.com

**CRITICAL SECURITY:**
- `.env` file protected by `.gitignore` - API keys never committed to git
- `ANTHROPIC_API_KEY` stored as encrypted Cloudflare Worker secret
- `CLOUDFLARE_API_TOKEN` stored in local `.env` for wrangler deployments
- **Rate limiting:** 10 requests per minute per IP address (prevents API abuse)
- **CORS:** Restricted to `boneyardtees.com`, `www.boneyardtees.com`, and `boneyard-tees-site.pages.dev`
- Error messages sanitized (no internal details exposed to users)

### Architecture

**Backend:** Cloudflare Worker (serverless)
- `worker.js` - API endpoint that communicates with Claude API
- `wrangler.toml` - Cloudflare Worker configuration
- **Endpoint:** Deployed to `https://merica-chatbot.boneyardtees.workers.dev`
- **Rate Limiting:** In-memory Map with automatic cleanup (10 req/min per IP)
- **CORS Helper:** `getCorsOrigin()` function validates request origins

**Frontend:** React component (Lazy Loaded)
- `src/components/ChatWidget.jsx` - Chat bubble and window component
- `src/components/ChatWidget.css` - Cyberpunk-styled chat interface (cyan/pink neon theme)
- **Integration:** Lazy loaded with `React.lazy()` and `<Suspense>` in App.jsx
- **PropTypes:** Validates `isOpen` (bool) and `setIsOpen` (func)
- **Message Limit:** Frontend stores max 50 messages, backend receives last 10 for context

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

**System Prompt Location:** `worker.js` (`MERICA_SYSTEM_PROMPT` constant)

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
- Lazy loaded for performance (React.lazy + Suspense)
- PropTypes validation on all props
- Maintains conversation history (last 50 messages max, sends 10 to API for context)
- Fetches responses from Cloudflare Worker API endpoint
- Comprehensive error handling with user-friendly messages
- Mobile responsive (fullscreen on screens <480px)

**API Configuration:**
- Update `API_ENDPOINT` constant in ChatWidget.jsx after deploying worker
- Format: `https://merica-chatbot.<subdomain>.workers.dev` or custom domain

### Deployment Status

**Already Completed:**
- ✅ Wrangler CLI installed (v4.45.3)
- ✅ Worker deployed to: `https://merica-chatbot.boneyardtees.workers.dev`
- ✅ API key stored as Cloudflare secret
- ✅ ChatWidget integrated into App.jsx (lazy loaded)
- ✅ Code pushed to GitHub (main branch)
- ✅ Cloudflare Pages auto-deploys from GitHub
- ✅ Rate limiting configured
- ✅ CORS restrictions in place

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
- Rate limiting prevents API abuse (10 req/min per IP)
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
1. Header - "BONEYARD TEES" logo with cyan-to-pink gradient (6.5rem desktop)
2. Hero - Animated Merica character (585px desktop), tagline, welcome message
3. Featured Designs - Stacked vertical layout with two independent carousels (customer & shop)
4. How It Works - Three-column layout with themed carousels (Blanks, BoneYard, Custom)

### Accessibility Features

**Skip-to-Content Link:**
- Hidden link at top of page for keyboard users
- Appears on focus, jumps to `#main-content`
- Styled with cyan background matching theme

**Carousel Controls:**
- All navigation buttons have `aria-label` attributes
- All carousel indicators are interactive buttons (not just visual)
- Screen reader announcements with `aria-current`
- Keyboard navigation: Arrow buttons focusable and clickable
- Manual navigation pauses auto-rotation for 10 seconds

**Merica Character:**
- Clickable to open chat (keyboard accessible)
- `onKeyDown` handler for Enter and Spacebar
- `aria-label="Chat with Merica"`
- Image fallback to Idle pose if loading fails

**Decorative Images:**
- All decorative images have `aria-hidden="true"`
- Error handlers hide broken images gracefully

### Merica Character Animation

- Uses React `useState`, `useEffect`, and `useRef` hooks
- Cycles through 4 poses: Idle (default), head slightly left, head right, head slightly left blink
- Random timing: Changes every 8-15 seconds (from `MERICA_POSE_MIN_INTERVAL` and `MERICA_POSE_MAX_INTERVAL`)
- Weighted probability: 50% chance to return to Idle (`MERICA_POSE_IDLE_WEIGHT`)
- Smooth 0.4s opacity fade transitions between poses
- Images preloaded on component mount to prevent flashing
- **Memory leak fixed:** Uses `useRef` for timeout tracking (no leaks on unmount)
- Current pose tracked in state: `currentPose`
- Image fallback handler returns to Idle if pose image fails to load
- Spacing below character: `0.75rem` desktop, `0.65rem` tablet, `0.5rem` mobile

### Hero Section

**Text Spacing:**
- `.hero-section h2` (Welcome heading) margin-bottom: `0.5rem`
- `.hero-section .tagline` margin-bottom: `0.75rem`
- These values have been reduced from original 1.5rem to create tighter, more cohesive layout

### Dog Chain Divider

- Horizontal decorative element spanning 75% of screen width (80% tablet, 85% mobile)
- Image: `/Images/landing page/dog chain.png`
- Lazy loaded with error fallback (hides entire divider if image fails)
- Cyan neon glow effect (3-layer drop-shadow matching other decorative elements)
- Hover effect intensifies glow
- Positioned between hero section and featured designs carousel
- Margin: `2rem` vertical (desktop), `1.5rem` (tablet), `1rem` (mobile)

### Featured Designs Section

- **Stacked vertical layout** with 3rem gap between carousels
- Both carousels run **independently** for optimal performance
- Both use identical carousel component structure with opposite animations
- **Animation constants:** All values pulled from `constants.js` (CARD_HORIZONTAL_OFFSET, etc.)

**"Featured Customer Designs" Carousel (Top):**
- Title: Cyan color with multi-layer glow and faint neon outline
- **Cyan theme:** Navigation buttons and indicators use cyan (`--cyber-cyan`)
- Card deck-style carousel with 5 images (3 real customer photos + 2 gray placeholders)
- **Current customer images:**
  - `barber & burnout.jpg` (image 1)
  - `Dorman '25 picnic.png` (image 2)
  - `Strongside kettlebell.png` (image 3)
- **Animation:** Cards slide **RIGHT** (left to right) with dramatic "card dealer" effect
  - Uses `CARD_HORIZONTAL_OFFSET` (250px), `CARD_ROTATION_DEGREES` (3°)
  - `CARD_SCALE_REDUCTION` (0.08), `CARD_VERTICAL_OFFSET` (5px)
  - Inactive cards use `CAROUSEL_INACTIVE_OPACITY` (0.3)
- **Horizontal offset:** Entire carousel offset **9rem to the left** (`.customer-carousel-column`)
- Auto-rotation: Changes every `CAROUSEL_AUTO_ROTATE_INTERVAL` (5 seconds)
- Manual navigation: Left/right arrow buttons with `aria-label` attributes
- When arrows clicked, auto-rotation pauses for `CAROUSEL_PAUSE_DURATION` (10 seconds)
- Active card: Full opacity, largest, front of stack (z-index: 5)
- Background cards: 30% opacity, stacked progressively behind
- Smooth 0.6s cubic-bezier(0.4, 0, 0.2, 1) transitions between cards
- Pink glow effect on customer images (box-shadow: 0 0 40px rgba(255, 0, 110, 0.4))
- **Indicator dots:** Interactive buttons with `aria-label` and `aria-current`, clickable to jump to slide
- State tracked: `currentCarouselIndex`, `isCarouselPaused`
- **Images:** Lazy loaded with error fallback (shows placeholder if image fails)
- Carousel images array in App.jsx: `carouselImages` (5 objects with src, alt, isPlaceholder properties)

**"Featured Shop Designs" Carousel (Bottom):**
- Title: Purple color with multi-layer glow and faint neon outline
- **Purple theme:** Navigation buttons and indicators use purple (`--cyber-purple`) via `.shop-theme` class
- Card deck-style carousel with 5 placeholder cards (all gray "Coming Soon" boxes for now)
- **Animation:** Cards slide **LEFT** (right to left) - opposite of customer carousel
  - Uses negative `CARD_HORIZONTAL_OFFSET` (-250px), negative `CARD_ROTATION_DEGREES` (-3°)
  - Same scale reduction and vertical offset as customer carousel
- **Horizontal offset:** Entire carousel offset **9rem to the right** (`.shop-carousel-column`)
- Auto-rotation: Changes every `CAROUSEL_AUTO_ROTATE_INTERVAL` (5 seconds, independent of customer carousel)
- Manual navigation: Left/right arrow buttons (purple) with `aria-label`
- When arrows clicked, auto-rotation pauses for `CAROUSEL_PAUSE_DURATION` (10 seconds)
- Same opacity, z-index stacking, and transition properties as customer carousel
- **Indicator dots:** Interactive buttons (purple theme) with `aria-label` and `aria-current`
- State tracked: `currentShopCarouselIndex`, `isShopCarouselPaused`
- **Images:** Lazy loaded with error fallback
- Carousel images array in App.jsx: `shopCarouselImages` (5 placeholder objects)
- Ready for future shop product images

### How It Works Section

- Explains the custom order process with 3 columns: Blanks, BoneYard, Custom
- **Vertical spacing reduced by 50%** for more compact layout:
  - `.how-it-works-section` margin: `1.5rem 0` (was 3rem)
  - `.section-title` margin-bottom: `1.5rem` (was 3rem)
  - `.how-it-works-columns` gap: `1.5rem` (was 3rem)
  - `.how-it-works-title` margin-bottom: `1rem` (was 2rem)
  - `.how-it-works-text` margin-top: `1rem` (was 2rem)
- Three independent carousels (Blanks, BoneYard, Custom) - same card deck structure as Featured Designs
- Each carousel has themed navigation and indicators:
  - Blanks: Blue theme (`.blanks-theme`)
  - BoneYard: Purple theme (`.boneyard-theme`)
  - Custom: Pink theme (`.custom-theme`)
- **Navigation:** Arrow text (‹ ›) buttons with themed colors and aria-labels
- **Indicators:** Interactive buttons with themed colors, aria-labels, and aria-current
- Auto-rotation: Changes every `CAROUSEL_AUTO_ROTATE_INTERVAL` (5 seconds, independent of other carousels)
- State tracked: `currentBlanksIndex`, `currentBoneyardIndex`, `currentCustomIndex`

### Animated Background

- Perspective grid (Tron-style) - subtle cyan lines, slow scrolling animation
- 5 floating shapes with vibrant neon glows (PNG line art from `/Images/landing page/`):
  - 2x Dog bones (`dog bone.png`) - Cyan & Blue glows
  - 2x Paw prints (`paw.png`) - Pink & Cyan glows
  - 1x Dog tags (`dog tags.png`) - Purple glow
- Slow floating/rotating animations (25-35 second cycles)
- All positioned behind content (z-index: -1)
- **All decorative images:** Lazy loaded, aria-hidden, with error fallbacks (hide silently if image fails)
- Responsive - scales down on mobile/tablet

## Key Assets

**Merica Character:** `/Images/Merica/`
- **In animation rotation:** Idle (default), head slightly left, head right, head slightly left blink
- **Available (not in use):** Excited, Grumpy, Thinking, Wave, pointing
- Managed via `mericaPoses` array in App.jsx using `IMAGE_PATHS.MERICA.*` constants

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

## Code Quality Standards

**This codebase maintains A-grade (95%) code quality. Follow these standards:**

### React Best Practices

- **Use PropTypes** for all component props
- **Lazy load** components that aren't immediately visible (ChatWidget example)
- **useRef** for timeout/interval IDs to prevent memory leaks
- **Proper dependency arrays** in all useEffect hooks
- **Error boundaries** to catch rendering errors
- **Functional components** with hooks only (no class components except ErrorBoundary)

### Constants & Configuration

- **NEVER use magic numbers** - all timing, sizing, and path values must use constants from `constants.js`
- **Update constants.js** when adding new configurable values
- **Import from constants.js** at top of file

### Error Handling

- **Image fallbacks** on all images (onError handlers)
- **Lazy loading** on all images (loading="lazy")
- **Try-catch blocks** around async operations
- **User-friendly error messages** (development details only in dev mode)
- **Graceful degradation** when features fail

### Accessibility (WCAG Compliance)

- **aria-label** on all interactive elements without visible text
- **aria-current** on active carousel indicators
- **aria-hidden** on decorative images
- **Keyboard navigation** (onKeyDown, not onKeyPress)
- **Skip-to-content link** for keyboard users
- **Interactive indicators** (buttons, not divs)

### Performance

- **Lazy load** components with React.lazy + Suspense
- **Lazy load images** with loading="lazy" attribute
- **useRef** for timeout/interval tracking
- **Proper cleanup** in useEffect return functions
- **Bounded state** (message history limits, etc.)

### Security

- **Rate limiting** on all API endpoints
- **CORS restrictions** to allowed domains only
- **No sensitive data** in error messages
- **PropTypes validation** to prevent type errors
- **Environment variables** for secrets (never commit .env)

## Important Notes

- Mobile responsive design implemented (breakpoints: 768px, 480px)
- No routing library yet (single page app)
- No e-commerce functionality yet
- Use functional components and React hooks
- Owner is non-technical - explain changes clearly
- **DO NOT** modify animation timing without discussing with owner first
- **ALWAYS use constants** from `constants.js` instead of hardcoding values
- **NEVER commit `.env` file** to git

## Development Workflow

1. **Before making changes:**
   - Read `constants.js` to understand configuration
   - Check `CLAUDE.md` for project standards
   - Review PropTypes if modifying component props

2. **During development:**
   - Use constants instead of magic numbers
   - Add PropTypes to new components
   - Add error handlers to images
   - Add aria-labels to interactive elements
   - Test keyboard navigation

3. **Before committing:**
   - Run `npm run lint` to check for issues
   - Verify no `.env` changes are staged
   - Test error scenarios (broken images, API failures)
   - Check accessibility (keyboard nav, screen readers)

4. **Deployment:**
   - Frontend: Push to GitHub → Cloudflare Pages auto-deploys
   - Backend: `wrangler deploy` for worker changes
   - Secrets: `wrangler secret put ANTHROPIC_API_KEY` if updating

## Troubleshooting

**Image Path Issues:**
- **ALWAYS verify image filenames match exactly**
- Windows file paths are case-insensitive but React/Vite asset paths ARE case-sensitive in production
- Special characters in filenames (like `&` in `barber & burnout.jpg`) are fine in paths
- All images should have lazy loading and error fallbacks

**Carousel Issues:**
- All animation values should come from `constants.js`
- Check that carousel state variables have unique names (no conflicts between different carousels)
- Verify `aria-label` attributes are present on navigation buttons
- Ensure indicators are buttons, not divs

**Memory Leaks:**
- Always use `useRef` for setTimeout/setInterval IDs
- Always return cleanup function in useEffect
- Check that all intervals are cleared on unmount

**Cloudflare Worker Issues:**
- **Rate Limiting:** 10 requests/minute per IP - test with different IPs if hitting limit
- **CORS Errors:** Verify request origin matches allowed domains in worker.js
- **Model Errors:** Use exact model ID: `claude-haiku-4-5-20251001`
- **Debugging:** Use `wrangler tail --format pretty` to view real-time logs
- **Local Testing:** Use `wrangler dev` to test worker locally (runs at `http://localhost:8787`)

**PropTypes Errors:**
- All components should have PropTypes defined
- ChatWidget: expects `isOpen` (bool) and `setIsOpen` (func)
- ErrorBoundary: expects `children` (node)
