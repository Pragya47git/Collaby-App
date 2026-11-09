import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini client with user-agent telemetry per system skill
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    app: 'collaby',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// AI Chat / Brainstorming Endpoint
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { messages, context } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: 'Messages array is required' });
      return;
    }

    const systemInstruction = `You are Collaby AI, an elite technical co-pilot and agile collaboration partner for cross-functional product teams (designers, software engineers, and product managers).
Your tone is sharp, concise, actionable, and encouraging.
Help the team brainstorm architectures, break down sprint backlogs, solve technical challenges, and draft documentation.
When context is provided (e.g. current kanban board, document draft, or whiteboard nodes), reference it directly.
Current workspace context: ${context ? JSON.stringify(context) : 'None'}.`;

    // Map conversation history
    const conversation = messages.map((m: { role: string; content: string }) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n\n');

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: conversation,
      config: {
        systemInstruction,
      },
    });

    const reply = response.text || 'I could not generate a response. Please try again.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/ai/chat:', error);
    res.status(500).json({
      error: error?.message || 'Failed to communicate with AI model',
    });
  }
});

// AI Kanban Task Breakdown Endpoint
app.post('/api/ai/generate-tasks', async (req: Request, res: Response) => {
  try {
    const { goal, currentTasks } = req.body;
    if (!goal) {
      res.status(400).json({ error: 'Goal description is required' });
      return;
    }

    const prompt = `Break down this feature goal into 3 to 5 clear, high-impact agile kanban task cards:
Goal: "${goal}"
Current backlog context: ${currentTasks ? JSON.stringify(currentTasks) : 'Empty'}
Each task should have a clear title, practical description, status ("todo" or "inprogress"), priority ("high", "medium", or "low"), tags (e.g., ["Frontend", "API"]), and realistic estimated hours.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              status: { type: Type.STRING },
              priority: { type: Type.STRING },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              estimatedHours: { type: Type.NUMBER },
              assignee: { type: Type.STRING },
            },
            required: ['title', 'description', 'status', 'priority', 'tags'],
          },
        },
      },
    });

    const tasks = JSON.parse(response.text || '[]');
    res.json({ tasks });
  } catch (error: any) {
    console.error('Error in /api/ai/generate-tasks:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate sprint tasks',
    });
  }
});

// AI Document Editor Assistance (Summarize, Polish, Expand, Action Items)
app.post('/api/ai/assist-doc', async (req: Request, res: Response) => {
  try {
    const { action, content, promptExtra } = req.body;
    if (!content) {
      res.status(400).json({ error: 'Document content is required' });
      return;
    }

    let instruction = '';
    switch (action) {
      case 'summarize':
        instruction = 'Provide an executive summary of this document in 2 concise paragraphs with 3 key bullet points.';
        break;
      case 'action_items':
        instruction = 'Extract all actionable tasks, deliverables, and owners from this document as an organized markdown checklist.';
        break;
      case 'polish':
        instruction = 'Polish this document for professional tone, grammatical clarity, and punchy executive phrasing while preserving all technical facts.';
        break;
      case 'expand':
        instruction = `Expand this section with detailed technical specifications, edge cases, and design requirements. Additional instructions: ${promptExtra || 'Provide thorough details.'}`;
        break;
      default:
        instruction = promptExtra || 'Enhance and improve this document.';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Document Content:\n${content}\n\nTask: ${instruction}`,
    });

    res.json({ result: response.text || '' });
  } catch (error: any) {
    console.error('Error in /api/ai/assist-doc:', error);
    res.status(500).json({
      error: error?.message || 'Failed to process document assistance',
    });
  }
});

// AI Whiteboard Node Generator Endpoint
app.post('/api/ai/whiteboard-nodes', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    const userPrompt = `Generate a structured diagram topology for an infinite canvas based on this architecture/flow:
"${prompt}"
Return 4 to 8 nodes with x, y coordinates (in a 900x600 space), color (hex e.g. #3B82F6, #10B981, #F59E0B, #8B5CF6, #EC4899), label, and type ("service", "database", "user", "gateway", "queue"). Also return connections array with sourceIndex and targetIndex.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            nodes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING },
                  x: { type: Type.NUMBER },
                  y: { type: Type.NUMBER },
                  color: { type: Type.STRING },
                  type: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ['label', 'x', 'y', 'color', 'type'],
              },
            },
            connections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  from: { type: Type.NUMBER },
                  to: { type: Type.NUMBER },
                  label: { type: Type.STRING },
                },
                required: ['from', 'to'],
              },
            },
          },
          required: ['title', 'nodes', 'connections'],
        },
      },
    });

    const diagram = JSON.parse(response.text || '{}');
    res.json({ diagram });
  } catch (error: any) {
    console.error('Error in /api/ai/whiteboard-nodes:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate whiteboard diagram',
    });
  }
});

// Setup Vite Dev Server Middleware or Static Production Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Collaby server running at http://localhost:${PORT}`);
  });
}

startServer();
