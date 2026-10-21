/**
 * Server-only Gemini chat proxy.
 * Reads GEMINI_API_KEY from the server environment (never shipped to the client)
 * and returns the AI response text.
 *
 * Reused by Vite dev middleware in local development and serverless runtimes.
 */
import { GoogleGenAI } from '@google/genai';

const DEFAULT_MODEL = 'gemini-3.5-flash';
const MAX_BODY_BYTES = 100_000;
const MAX_MESSAGE_LENGTH = 2_000;
const MAX_HISTORY_MESSAGES = 20;
const WHATSAPP_NUMBER = '+91 70204 01094';

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
1. Web Applications: React, Next.js, and TypeScript platforms using SSR/SSG architectures.
2. Mobile Apps: Cross-platform iOS and Android apps using React Native and Flutter.
3. Automation Systems: Event-driven microservices, background job queues (BullMQ/Redis), WhatsApp/Telegram notification bots, and automated ETL pipelines.
4. AI Integrations: Gemini API reasoning agents, enterprise RAG with vector search (pgvector), autonomous decision workflows, and multimodal document processing.
5. SaaS Platforms & Architecture: End-to-end multi-tenant systems, subscription billing, and administrative portals.
6. Backend & API Development: Node.js, Python FastAPI, PostgreSQL, MongoDB, REST and GraphQL APIs.
7. UI/UX Design & E-Commerce: High-converting Figma prototypes, accessible design systems, and digital storefronts.
8. SEO & Digital Performance: Technical SEO, structured JSON-LD schemas, and Core Web Vitals optimization.

## NOTABLE CASE STUDIES
- KisanPool: Decentralized agricultural produce pooling platform in Maharashtra, supporting produce aggregation and sales coordination.
- ssnlc.in: Shri Shivaji New Law College platform for academic information, online applications, notices and faculty resources.
- Sumit Ubale Portfolio: Design engineer portfolio presenting work and profile.
- PerpWise AI: Quantitative monitoring application bringing together market data and alerts.

## TYPICAL TIMELINE & ENGAGEMENT
- Project timelines, payment milestones, and source code ownership are agreed in the written proposal or project agreement.

## CONTACT DETAILS
- Email: hello@exdevx.in
- Phone / WhatsApp: ${WHATSAPP_NUMBER}
- Consultation: Visitors can send a project inquiry through the Contact page form or message directly on WhatsApp.

## BEHAVIOR RULES
- Keep responses concise, warm, and professional (aim for 2-4 sentences or clear bullet points).
- Answer using only the verified facts above. Never invent fake pricing, fake testimonials, or speculative guarantees.
- If a visitor wants to start a project or get a quote, warmly encourage them to share their project requirements or use the Contact form on the site or WhatsApp (${WHATSAPP_NUMBER}).
`.trim();

function readStream(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let tooLarge = false;
    const chunks = [];
    req.on('data', (chunk) => {
      if (tooLarge) return;
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      size += buffer.length;
      if (size > MAX_BODY_BYTES) {
        tooLarge = true;
        const error = new Error('payload too large');
        error.statusCode = 413;
        reject(error);
        req.resume();
        return;
      }
      chunks.push(buffer);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

async function getBody(req) {
  let body;
  if (req.body !== undefined && req.body !== null) {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } else {
    const raw = await readStream(req);
    body = raw ? JSON.parse(raw) : {};
  }

  if (Buffer.byteLength(JSON.stringify(body) ?? '') > MAX_BODY_BYTES) {
    const error = new Error('payload too large');
    error.statusCode = 413;
    throw error;
  }
  return body;
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
      text: `Hi! I'm the ExDevX assistant. Live AI chat requires the GEMINI_API_KEY environment variable. You can reach Abhay Jadhav and our engineering team directly at hello@exdevx.in or WhatsApp ${WHATSAPP_NUMBER}!`,
    });
  }

  let body;
  try {
    body = await getBody(req);
  } catch (error) {
    if (error.statusCode === 413) return send(res, 413, { error: 'Request is too large.' });
    return send(res, 400, { error: 'Invalid request body.' });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return send(res, 400, { error: 'Invalid request body.' });
  }

  const userMessage = typeof body.message === 'string' ? body.message.trim() : '';
  const history = body.messages === undefined ? [] : body.messages;

  if (!userMessage || userMessage.length > MAX_MESSAGE_LENGTH) {
    return send(res, 400, { error: 'Message is required and must be 2,000 characters or fewer.' });
  }
  if (!Array.isArray(history) || history.length > MAX_HISTORY_MESSAGES || history.some((message) =>
    !message || !['user', 'assistant'].includes(message.role) ||
    typeof message.content !== 'string' || !message.content.trim() || message.content.length > MAX_MESSAGE_LENGTH
  )) {
    return send(res, 400, { error: 'Conversation history is invalid or too large.' });
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
    console.error('[chat] Gemini API request failed');
    return send(res, 502, {
      error: 'Upstream AI service error.',
      text: `I'm having a momentary connection glitch. Feel free to contact our team directly at hello@exdevx.in or via WhatsApp at ${WHATSAPP_NUMBER}.`,
    });
  }
}
