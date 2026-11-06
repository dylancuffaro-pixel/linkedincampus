import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Built-in rule fallback in case API key is missing or model rate-limited
const BUZZWORDS: Record<string, { reason: string; replacement: string }> = {
  'humbled and honored': {
    reason: 'Overused corporate trope that often comes across as insincere humble-bragging.',
    replacement: 'grateful / thrilled / proud to share',
  },
  'pleased to announce': {
    reason: 'Formal press-release phrasing that sounds stiff for a student or early-career builder.',
    replacement: 'excited to share / here is what I worked on',
  },
  'synergy': {
    reason: 'Vague corporate buzzword that obscures concrete teamwork or cross-functional results.',
    replacement: 'teamwork / combined effort / close collaboration',
  },
  'leverage': {
    reason: 'Cold corporate transaction term when applied to relationships or skills.',
    replacement: 'apply / use / build upon / draw from',
  },
  'bandwidth': {
    reason: 'Machine-like term used for human time and energy.',
    replacement: 'time / capacity / focus',
  },
  'move the needle': {
    reason: 'Overused management cliché.',
    replacement: 'make a measurable impact / see real progress',
  },
  'circle back': {
    reason: 'Passive corporate delay phrase.',
    replacement: 'follow up / check in next week',
  },
  'touch base': {
    reason: 'Dated corporate euphemism.',
    replacement: 'connect / speak / catch up',
  },
  'deep dive': {
    reason: 'Buzzwordy substitute for thorough research or learning.',
    replacement: 'detailed look / careful study / in-depth exploration',
  },
  'actionable insights': {
    reason: 'Consultant jargon that can sound detached.',
    replacement: 'practical takeaways / lessons learned',
  },
  'low-hanging fruit': {
    reason: 'Corporate cliché for quick wins.',
    replacement: 'immediate opportunities / quick wins',
  },
  'unpack': {
    reason: 'Overused colloquialism in business speak.',
    replacement: 'break down / examine / explore',
  },
};

function ruleBasedAnalysis(text: string) {
  const lower = text.toLowerCase();
  const hits: Array<{ term: string; reason: string; replacement: string }> = [];

  for (const [term, meta] of Object.entries(BUZZWORDS)) {
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    if (regex.test(lower)) {
      hits.push({
        term,
        reason: meta.reason,
        replacement: meta.replacement,
      });
    }
  }

  const length = text.trim().length;
  let score = 85;
  score -= hits.length * 10;
  if (length < 80) score -= 15;
  if (length > 1200) score -= 10;
  score = Math.max(25, Math.min(98, score));

  let toneAssessment = 'Authentic & Engaging';
  if (hits.length >= 2) {
    toneAssessment = 'Too Formal / Posturing';
  } else if (length < 60) {
    toneAssessment = 'Too Brief';
  }

  const strengths = [];
  if (length >= 100) strengths.push('Good narrative length with room for context.');
  if (hits.length === 0) strengths.push('Zero corporate jargon detected—feels sincere and grounded.');
  if (text.includes('?')) strengths.push('Includes a question to invite genuine dialogue.');

  const suggestions = [];
  if (hits.length > 0) {
    suggestions.push(`Replace detected corporate jargon (${hits.map((h) => `"${h.term}"`).join(', ')}) with conversational student language.`);
  }
  if (!text.includes('\n\n') && length > 200) {
    suggestions.push('Add line breaks between thoughts so mobile readers can scan easily.');
  }
  if (!text.includes('?')) {
    suggestions.push('End with an open question to encourage peers and mentors to comment.');
  }

  // Generate a polished rewrite
  let polished = text;
  for (const hit of hits) {
    const regex = new RegExp(hit.term, 'gi');
    const firstOption = hit.replacement.split('/')[0].trim();
    polished = polished.replace(regex, firstOption);
  }

  return {
    score,
    toneAssessment,
    summary: hits.length > 0
      ? `Identified ${hits.length} corporate cliché${hits.length > 1 ? 's' : ''} that can be rewritten to sound more genuine.`
      : 'Solid, authentic tone! Your post sounds like a real student sharing real experiences.',
    jargonHits: hits,
    strengths: strengths.length > 0 ? strengths : ['Clear starting concept.'],
    suggestions: suggestions.length > 0 ? suggestions : ['Your draft is ready for the Campus Sandbox!'],
    polishedVersion: polished,
  };
}

// API endpoint for Tone Coach & De-Jargonizer
app.post('/api/tone-coach', async (req, res) => {
  const { text, category } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Text content is required' });
  }

  const trimmed = text.trim();

  // If Gemini API is not configured, return smart rule-based analysis
  if (!ai) {
    const fallback = ruleBasedAnalysis(trimmed);
    return res.json(fallback);
  }

  try {
    const prompt = `You are the "LinkedIn Campus Tone Coach & De-Jargonizer", a supportive mentor for college students and young professionals transitioning to corporate life.
Students often feel intimidated by LinkedIn's performative corporate culture and rely on stiff buzzwords ("humbled and honored", "synergize", "leverage", "move the needle", "bandwidth").

Analyze this student's draft post:
"""
${trimmed}
"""
Category: ${category || 'General post / learning reflection'}

Provide an encouraging, actionable critique in JSON format.
Detect:
1. Corporate buzzwords / clichés that sound inauthentic, with friendly reasons and human alternatives.
2. An Authenticity & Clarity Score from 0 to 100.
3. Tone classification: either "Authentic & Engaging", "Too Formal / Posturing", or "Too Casual / Unclear".
4. Specific strengths.
5. Concrete suggestions for formatting (hooks, line breaks, ending question).
6. A "polishedVersion" that retains the student's exact personal voice and details, but replaces posturing and jargon with punchy, conversational, and humble clarity.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are an empathetic, insightful career mentor for university students. You prioritize authentic storytelling over corporate posturing. Always output valid JSON matching the schema.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.INTEGER,
              description: 'Authenticity & clarity score from 0 to 100',
            },
            toneAssessment: {
              type: Type.STRING,
              description: 'Tone category: Authentic & Engaging, Too Formal / Posturing, or Too Casual / Unclear',
            },
            summary: {
              type: Type.STRING,
              description: '1-2 sentence overall encouraging summary of the draft',
            },
            jargonHits: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  term: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  replacement: { type: Type.STRING },
                },
                required: ['term', 'reason', 'replacement'],
              },
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            polishedVersion: {
              type: Type.STRING,
              description: 'A refreshed, human, and polished version of the post',
            },
          },
          required: [
            'score',
            'toneAssessment',
            'summary',
            'jargonHits',
            'strengths',
            'suggestions',
            'polishedVersion',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error) {
    console.error('Gemini Tone Coach Error:', error);
    // Graceful fallback on network or model error
    const fallback = ruleBasedAnalysis(trimmed);
    return res.json(fallback);
  }
});

// Setup Vite development server or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
