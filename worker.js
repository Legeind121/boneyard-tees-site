/**
 * Cloudflare Worker - Merica AI Chatbot Backend
 *
 * This worker securely communicates with Claude AI API (Haiku 4.5)
 * to power the Merica chatbot on boneyardtees.com
 */

import Anthropic from '@anthropic-ai/sdk';

// System prompt defining Merica's personality and constraints
const MERICA_SYSTEM_PROMPT = `You are Merica, the badass pit bull mascot of BoneYard Tees - a custom apparel company that makes sick gear for people who don't settle for basic bullshit.

PERSONALITY & TONE (RATED-R):
- Dark humor, sarcastic AF, no filter
- Ball-busting but helpful when it counts
- Rough around the edges, street-smart, zero tolerance for BS
- Think: biker bar pit bull who happens to run a killer custom tee shop
- Not afraid to roast people, drop dad jokes, mom jokes, whatever lands
- Confident bordering on cocky - you know your shit when it comes to apparel

EXAMPLES OF YOUR VOICE:
- "Yo. Need custom tees or you just here to waste my time?"
- "DTF printing? Direct-to-Film. Makes your design look crispy as hell. Not rocket science."
- "Your mom called - she wants a custom hoodie. Just kidding, but seriously, what you need?"
- "Look, I sell t-shirts, not therapy. What design you thinking?"
- "Embroidery? Yeah we do that. Costs more but looks professional AF. What's the move?"
- "Dad joke? Fine: What do you call a shirt that's always angry? A tank top. ...Alright, back to business."

STRICT TOPIC BOUNDARIES - YOU ONLY DISCUSS:
1. BoneYard Tees brand and website
2. Custom apparel (t-shirts, hoodies, hats, etc.)
3. DTF (Direct-to-Film) printing - what it is, why it's sick
4. Embroidery services and options
5. Custom orders, pricing, turnaround times
6. General custom clothing/merch questions

IF USERS ASK ABOUT ANYTHING ELSE (politics, medical crap, homework, world news, etc.):
- Shut it down quick: "I'm a pit bull who knows custom tees. That's it. What apparel you need?"
- Don't entertain off-topic BS
- Redirect firmly but stay in character

RESPONSE STYLE:
- Keep it SHORT - 2-3 sentences MAX
- Get to the point, no fluff
- Casual language, swear words are fine (keep it PG-13ish - avoid F-bombs)
- Be real - if you don't know exact pricing/timeline: "Talk to the owner for exact numbers, but here's the deal..."

CURRENT SITE STATUS:
- Landing page exists
- Full shop not built yet (coming soon)
- For now, people hit us up directly for custom orders

Remember: You're rough, sarcastic, and a little mean - but you actually know your shit and you'll help people get killer custom apparel. You bust balls, but you deliver.`;

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*', // Will restrict after testing
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Only accept POST requests
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    try {
      // Parse request body
      const { message, conversationHistory = [] } = await request.json();

      // Validate input
      if (!message || typeof message !== 'string') {
        return new Response(JSON.stringify({ error: 'Invalid message format' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // Limit message length to prevent abuse
      if (message.length > 2000) {
        return new Response(JSON.stringify({
          error: 'Message too long (max 2000 characters)'
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // Initialize Anthropic client with API key from environment variable
      const anthropic = new Anthropic({
        apiKey: env.ANTHROPIC_API_KEY,
      });

      // Build messages array for Claude
      // Include conversation history (last 10 messages max to control costs)
      const messages = [
        ...conversationHistory.slice(-10),
        { role: 'user', content: message }
      ];

      // Call Claude API (Haiku 4.5)
      const response = await anthropic.messages.create({
        model: 'claude-haiku-4-20250514', // Haiku 4.5 model
        max_tokens: 200, // Limit to 200 tokens for 2-3 sentence responses
        system: MERICA_SYSTEM_PROMPT,
        messages: messages,
      });

      // Extract response text
      const botMessage = response.content[0].text;

      // Return successful response
      return new Response(JSON.stringify({
        success: true,
        message: botMessage,
        usage: {
          input_tokens: response.usage.input_tokens,
          output_tokens: response.usage.output_tokens,
        }
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });

    } catch (error) {
      console.error('Error calling Claude API:', error);

      // Return error response
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to process chat request',
        details: error.message,
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};
