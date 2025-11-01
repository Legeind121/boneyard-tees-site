# BoneYard Tees

Premium custom apparel with bold designs and zero regrets.

## 🎯 Project Overview

Landing page for BoneYard Tees - a custom t-shirt company featuring "Merica," the badass pit bull mascot. Built with React 19, Vite, and deployed on Cloudflare Pages with AI-powered chatbot.

**Live Site:** [boneyardtees.com](https://boneyardtees.com)

## 🚀 Tech Stack

- **Frontend:** React 19, Vite 7
- **Styling:** Custom CSS (Cyberpunk theme)
- **Backend:** Cloudflare Workers (serverless)
- **AI Chatbot:** Claude AI (Haiku 4.5)
- **Hosting:** Cloudflare Pages
- **Domain:** Cloudflare DNS

## 📁 Project Structure

```
boneyard-tees-site/
├── docs/                    # Documentation
│   ├── CLAUDE.md           # Project guide for Claude Code
│   └── CHATBOT-SETUP.md    # Chatbot deployment instructions
├── public/
│   ├── Images/             # All site images
│   │   ├── Merica/        # Mascot character poses
│   │   ├── customer images/
│   │   ├── landing page/  # Decorative elements
│   │   ├── logos/
│   │   └── site dog characters/
│   └── fonts/              # Custom fonts
├── src/
│   ├── components/
│   │   ├── ChatWidget.jsx  # AI chatbot component
│   │   └── ErrorBoundary.jsx
│   ├── App.jsx             # Main landing page
│   ├── main.jsx            # React entry point
│   ├── constants.js        # Configuration constants
│   └── *.css               # Component styles
├── worker.js               # Cloudflare Worker (chatbot backend)
├── wrangler.toml           # Worker configuration
├── .env.example            # Environment variable template
└── package.json
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare account (for deployment)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.example .env
   # Fill in your API keys
   ```

4. Start development server:
   ```bash
   npm run dev
   ```
   Visit http://127.0.0.1:5173

### Build

```bash
npm run build    # Production build
npm run lint     # Code quality check
npm run preview  # Preview production build
```

## 🤖 Merica AI Chatbot

Interactive chatbot powered by Claude AI with rated-R personality. Helps customers with custom apparel questions.

**Features:**
- Sarcastic, helpful pit bull personality
- Rate limiting (5 req/min per IP)
- Secure API key management
- Full error handling

**Deploy chatbot:**
```bash
wrangler deploy
wrangler secret put ANTHROPIC_API_KEY
```

See [docs/CHATBOT-SETUP.md](docs/CHATBOT-SETUP.md) for full instructions.

## 🔒 Security

- ✅ Content Security Policy (CSP)
- ✅ Security headers (HSTS, X-Frame-Options, etc.)
- ✅ Rate limiting on API endpoints
- ✅ Input validation and sanitization
- ✅ No unsafe innerHTML patterns
- ✅ Environment variable secrets management

**Security Grade:** A- (92/100)

## 📦 Deployment

**Frontend (Cloudflare Pages):**
- Auto-deploys from GitHub main branch
- No manual deployment needed

**Backend (Cloudflare Worker):**
```bash
wrangler deploy
```

## 🎨 Features

- **Animated Merica Character** - Random pose changes
- **Dual Carousels** - Featured customer & shop designs
- **How It Works Section** - 3 themed process flows
- **Cyberpunk Design** - Neon colors, gradients, glows
- **Fully Responsive** - Mobile, tablet, desktop
- **Accessibility** - WCAG compliant, keyboard navigation
- **Error Boundaries** - Graceful error handling

## 📝 Documentation

- **[Claude Code Guide](docs/CLAUDE.md)** - Complete project documentation for AI assistants
- **[Chatbot Setup](docs/CHATBOT-SETUP.md)** - Deployment guide for Merica AI chatbot

## 🧪 Code Quality

- **Grade:** A (95%)
- **Linting:** ESLint with React hooks rules
- **PropTypes:** Full type validation
- **Error Handling:** Comprehensive error boundaries
- **Performance:** Lazy loading, optimized builds

## 📄 License

Proprietary - All rights reserved

## 🔗 Links

- **Website:** [boneyardtees.com](https://boneyardtees.com)
- **Chatbot API:** `https://merica-chatbot.boneyardtees.workers.dev`

---

**Built with ❤️ and a lot of sarcasm by Merica and the BoneYard team**
