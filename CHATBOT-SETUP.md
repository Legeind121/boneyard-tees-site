# Merica AI Chatbot - Deployment Guide

Complete setup instructions for deploying the Merica chatbot powered by Claude AI (Haiku 4.5).

---

## Prerequisites

✅ Anthropic API account with API key (you have this!)
✅ API key stored in `.env` file (done!)
✅ Cloudflare account (you already have one for boneyardtees.com)
✅ Node.js installed (you have this)

---

## Step 1: Install Cloudflare Wrangler CLI

Wrangler is the command-line tool for deploying Cloudflare Workers.

```bash
npm install -g wrangler
```

Verify installation:
```bash
wrangler --version
```

---

## Step 2: Login to Cloudflare

Authenticate Wrangler with your Cloudflare account:

```bash
wrangler login
```

This will open a browser window - click "Allow" to authorize Wrangler.

---

## Step 3: Install Dependencies for Worker

The worker needs the Anthropic SDK. Install it:

```bash
npm install @anthropic-ai/sdk
```

This adds the package to your `package.json` and `node_modules/`.

---

## Step 4: Deploy the Worker

From your project root directory, run:

```bash
wrangler deploy
```

**What this does:**
- Packages your `worker.js` code
- Uploads it to Cloudflare's global network
- Gives you a public URL like: `https://merica-chatbot.<your-subdomain>.workers.dev`

**Save this URL!** You'll need it in Step 6.

---

## Step 5: Set API Key as Secret

Your API key needs to be stored securely on Cloudflare (not in your code).

Run this command:

```bash
wrangler secret put ANTHROPIC_API_KEY
```

When prompted, **paste your API key** from `.env` file:
```
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
```

Press Enter. You should see: `✨ Success! Uploaded secret ANTHROPIC_API_KEY`

**Security Note:** This stores your key encrypted on Cloudflare. It's never visible in your code or logs.

---

## Step 6: Update ChatWidget with Worker URL

Open `src/components/ChatWidget.jsx` and find this line (near the top):

```javascript
const API_ENDPOINT = 'YOUR_WORKER_URL_HERE';
```

Replace it with your actual Worker URL from Step 4:

```javascript
const API_ENDPOINT = 'https://merica-chatbot.your-subdomain.workers.dev';
```

**Example:**
```javascript
const API_ENDPOINT = 'https://merica-chatbot.legeind121.workers.dev';
```

Save the file.

---

## Step 7: Restore Full Site (When Ready)

When you're ready to go live with the chatbot:

### 7a. Restore the React App

Replace the maintenance page with your full React site:

```bash
cp index.html.backup index.html
```

This restores your original Vite React entry point.

### 7b. Import ChatWidget in App.jsx

Open `src/App.jsx` and add the ChatWidget:

```javascript
// At the top of the file, add this import:
import ChatWidget from './components/ChatWidget';

// At the bottom of your App component's return statement, add:
function App() {
  // ... all your existing code ...

  return (
    <div className="App">
      {/* All your existing JSX */}

      {/* Add ChatWidget at the very end, before closing div */}
      <ChatWidget />
    </div>
  );
}
```

### 7c. Test Locally

Run the dev server:

```bash
npm run dev
```

Visit `http://127.0.0.1:5173` and:
- Click the chat bubble (bottom-right)
- Send a test message: "What is DTF printing?"
- Verify Merica responds with his badass personality

### 7d. Deploy to Production

Once everything works locally:

```bash
git add .
git commit -m "Add Merica AI chatbot integration"
git push
```

Cloudflare Pages will automatically deploy the update in ~1 minute.

---

## Troubleshooting

### "Failed to process chat request"

**Cause:** API key not set correctly on Worker.

**Fix:** Run `wrangler secret put ANTHROPIC_API_KEY` again and paste your key.

---

### "Can't reach the server"

**Cause:** Wrong Worker URL in ChatWidget.jsx or Worker not deployed.

**Fix:**
1. Run `wrangler deployments list` to see your Worker URL
2. Update `API_ENDPOINT` in ChatWidget.jsx
3. Rebuild and test: `npm run dev`

---

### CORS Errors in Browser Console

**Cause:** Worker's CORS headers need adjustment.

**Fix:** If you only want boneyardtees.com to access the Worker, edit `worker.js` line 59:

Change:
```javascript
'Access-Control-Allow-Origin': '*',
```

To:
```javascript
'Access-Control-Allow-Origin': 'https://boneyardtees.com',
```

Then redeploy: `wrangler deploy`

---

### Merica's Responses are Too Long

**Cause:** Claude sometimes ignores token limits if system prompt is verbose.

**Fix:** In `worker.js` line 116, reduce `max_tokens`:

```javascript
max_tokens: 150, // Reduced from 200
```

Then redeploy: `wrangler deploy`

---

### Chatbot Costs More Than Expected

**Monitor Usage:**
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Click "Usage" in sidebar
3. Check daily token usage and costs

**Reduce Costs:**
- Lower `max_tokens` in worker.js (see above)
- Reduce conversation history: In worker.js line 111, change `.slice(-10)` to `.slice(-5)`
- Add rate limiting on frontend (limit messages per minute per user)

---

## Cost Monitoring

Your chatbot uses **Haiku 4.5** which is very affordable:

**Typical Costs:**
- 1 conversation (5 back-and-forth messages): ~$0.001 (1/10th of a cent)
- 100 conversations/day: ~$3-5/month
- 1,000 conversations/day: ~$30-50/month

**Set Budget Alerts:**
1. Go to [console.anthropic.com/settings/limits](https://console.anthropic.com/settings/limits)
2. Set monthly spend limit (e.g., $20/month)
3. Add email notifications for 50%, 75%, 90% thresholds

---

## Testing Merica's Personality

Try these test prompts to verify his badass tone:

1. **"What is DTF printing?"**
   - Expected: Short, sarcastic explanation

2. **"Can you help me with my math homework?"**
   - Expected: Redirects to apparel topics, stays in character

3. **"Tell me a dad joke"**
   - Expected: Drops a dad joke, then asks about custom tees

4. **"How much for custom hoodies?"**
   - Expected: Helpful response, suggests contacting owner for exact pricing

If responses are too soft/kid-friendly, adjust the system prompt in `worker.js` (lines 11-73).

---

## Updating Merica's Personality

To change his tone or knowledge:

1. Edit `worker.js` lines 11-73 (the `MERICA_SYSTEM_PROMPT` constant)
2. Redeploy: `wrangler deploy`
3. Test immediately - changes are live in ~5 seconds

**No need to touch React code** - personality lives entirely in the backend.

---

## Optional: Custom Domain for Worker

Instead of `merica-chatbot.your-subdomain.workers.dev`, use `chat.boneyardtees.com`:

1. Go to Cloudflare Dashboard → Workers & Pages
2. Click your `merica-chatbot` worker
3. Click "Triggers" tab
4. Click "Add Custom Domain"
5. Enter: `chat.boneyardtees.com`
6. Update `API_ENDPOINT` in ChatWidget.jsx to: `https://chat.boneyardtees.com`

---

## Support

**Cloudflare Workers Docs:** [developers.cloudflare.com/workers](https://developers.cloudflare.com/workers/)
**Anthropic API Docs:** [docs.anthropic.com](https://docs.anthropic.com/)
**Wrangler CLI Docs:** [developers.cloudflare.com/workers/wrangler](https://developers.cloudflare.com/workers/wrangler/)

---

## Quick Reference Commands

```bash
# Deploy worker
wrangler deploy

# Update API key
wrangler secret put ANTHROPIC_API_KEY

# View worker logs (live debugging)
wrangler tail

# List deployments
wrangler deployments list

# Delete worker (if needed)
wrangler delete
```

---

**You're all set!** Follow the steps above and Merica will be chatting with customers in no time. Let me know if you hit any snags.
