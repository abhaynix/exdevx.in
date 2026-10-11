/**
 * Server-only Gemini chat proxy.
 * Reads GEMINI_API_KEY from the server environment (never shipped to the client)
 * and returns the AI response text.
 *
 * Reused by Vite dev middleware in local development and serverless runtimes.
 */
import { GoogleGenAI } from '@google/genai';

const DEFAULT_MODEL = 'gemini-3.5-flash';

const SYSTEM_INSTRUCTION = `
You are the ExDevX website assistant. Answer clearly, warmly, and briefly using only the ExDevX information provided here.

## ABOUT EXDEVX
- Founded: 2022 by Abhay Jadhav
- Headquarters: Pune, Maharashtra, India
- Coverage: Pune, Ahilyanagar, Shrigonda, Maharashtra, and remote clients worldwide
- Core Agency Values:
  1. Execution over theory: zero fluff, rapid working prototypes, measurable outcomes.
  2. Automation first: background workers, resilient cron queues, LLM reasoning pipelines.
  3. Self-hosted & resilient infrastructure: Docker, VPS, AWS, bare-metal without vendor lock-in.

## SERVICES OFFERED
1. Web Applications: High-performance React, Next.js, and TypeScript platforms with sub-second TTFB, Lighthouse 95+ scores, and SSR/SSG architectures.
2. Mobile Apps: Cross-platform iOS and Android apps using React Native and Flutter with 60fps native performance and offline-first syncing.
3. Automation Systems: Event-driven microservices, background job queues (BullMQ/Redis), WhatsApp/Telegram notification bots, and automated ETL pipelines.
4. AI Integrations: Gemini API reasoning agents, enterprise RAG with vector search (pgvector), autonomous decision workflows, and multimodal document processing.
5. SaaS Platforms & Architecture: End-to-end multi-tenant systems, subscription billing, and administrative portals.
6. Backend & API Development: Node.js, Python FastAPI, PostgreSQL, MongoDB, REST and GraphQL APIs.
7. UI/UX Design & E-Commerce: High-converting Figma prototypes, accessible design systems, and digital storefronts.
8. SEO & Digital Performance: Technical SEO, structured JSON-LD schemas, and Core Web Vitals optimization.

## NOTABLE CASE STUDIES
- KisanPool: Decentralized agricultural produce pooling platform in Maharashtra. Aggregated 12,000+ quintals of produce, saving farmers 22% in freight costs.
- ssnlc.in: Shri Shivaji New Law College portal handling admissions and exam notices with 100% digital workflows and zero downtime.
- Sumit Ubale Portfolio: Design engineer portfolio with 100/100 Lighthouse score and 0.000 CLS.
- PerpWise AI: Autonomous quantitative market hedging bot processing 850,000+ daily data ticks with sub-800ms inference.

## TYPICAL TIMELINE & ENGAGEMENT
- Standard sprint duration: 2 to 6 weeks per milestone.
- Full source code ownership transferred 100% to clients.

## CONTACT DETAILS
- Email: hello@exdevx.in
- Phone / WhatsApp: +91 88301 74066
- Consultation: Free initial discovery call. Visitors can use the Contact page form on the website or message directly on WhatsApp.

## BEHAVIOR RULES
- Keep responses concise, warm, and professional (aim for 2-4 sentences or clear bullet points).
- Answer using only the verified facts above. Never invent fake pricing, fake testimonials, or speculative guarantees.
- If a visitor wants to start a project or get a quote, warmly encourage them to share their project requirements or use the Contact form on the site or WhatsApp (+91 88301 74066).
`.trim();

function readStream(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => {
      data += c;
      if (data.length > 100_000) reject(new Error('payload too large'));
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

async function getBody(req) {
  if (req.body !== undefined && req.body !== null) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }
  const raw = await readStream(req);
  return raw ? JSON.parse(raw) : {};
}

function send(res, code, obj) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(obj));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return send(res, 405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[chat] GEMINI_API_KEY is not configured in the server environment');
    return send(res, 200, {
      text: "Hi! I'm the ExDevX assistant. Live AI chat requires the GEMINI_API_KEY environment variable. You can reach Abhay Jadhav and our engineering team directly at hello@exdevx.in or WhatsApp +91 88301 74066!",
    });
  }

  let body;
  try {
    body = await getBody(req);
  } catch {
    return send(res, 400, { error: 'Invalid request body.' });
  }

  const userMessage = typeof body.message === 'string' ? body.message.trim() : '';
  const history = Array.isArray(body.messages) ? body.messages : [];

  if (!userMessage) {
    return send(res, 400, { error: 'Message is required.' });
  }

  const modelName = process.env.GEMINI_MODEL || DEFAULT_MODEL;

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    // Build multi-turn content history for @google/genai
    // Role mapping: 'user' -> 'user', 'assistant' -> 'model'
    const contents = [
      ...history
        .filter((m) => m && typeof m.content === 'string' && m.content.trim().length > 0)
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content.trim() }],
        })),
      {
        role: 'user',
        parts: [{ text: userMessage }],
      },
    ];

    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5,
      },
    });

    const replyText = response.text?.trim() || "I'm here to help! Could you please tell me more about your project requirements?";

    return send(res, 200, { text: replyText });
  } catch (err) {
    console.error('[chat] Gemini API error:', err?.message || err);
    return send(res, 502, {
      error: 'Upstream AI service error.',
      text: "I'm having a momentary connection glitch. Feel free to contact our team directly at hello@exdevx.in or via WhatsApp at +91 88301 74066.",
    });
  }
}
