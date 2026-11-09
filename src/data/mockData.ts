import { Task, DocItem, Collaborator, StickyNote } from '../types';

export const INITIAL_COLLABORATORS: Collaborator[] = [
  {
    id: 'user-1',
    name: 'Elena Rostova',
    role: 'VP of Product',
    avatar: './images/avatar_elena.jpg',
    status: 'active',
    cursor: { x: 340, y: 180 },
  },
  {
    id: 'user-2',
    name: 'Marcus Chen',
    role: 'Staff Architect',
    avatar: './images/avatar_marcus.jpg',
    status: 'active',
    cursor: { x: 720, y: 260 },
  },
  {
    id: 'user-3',
    name: 'Sophia Patel',
    role: 'Design Systems Lead',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'active',
    cursor: { x: 510, y: 430 },
  },
  {
    id: 'user-4',
    name: 'Alex Rivera',
    role: 'Full-Stack Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'idle',
    cursor: { x: 190, y: 310 },
  },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-101',
    title: 'Architect multi-tenant event stream for real-time canvas',
    description: 'Implement WebSocket delta compression with CRDT synchronization for seamless multi-cursor canvas editing.',
    status: 'inprogress',
    priority: 'high',
    tags: ['Architecture', 'WebSockets', 'Canvas'],
    assignee: {
      name: 'Marcus Chen',
      avatar: './images/avatar_marcus.jpg',
      role: 'Staff Architect',
    },
    estimatedHours: 12,
    createdAt: '2026-11-08T10:30:00Z',
  },
  {
    id: 'task-102',
    title: 'Design token hierarchy for high-contrast dark theme',
    description: 'Harmonize semantic color variables across canvas sticky notes, kanban cards, and markdown typography.',
    status: 'review',
    priority: 'medium',
    tags: ['Design System', 'Tailwind', 'Accessibility'],
    assignee: {
      name: 'Sophia Patel',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'Design Systems Lead',
    },
    estimatedHours: 6,
    createdAt: '2026-11-07T14:15:00Z',
  },
  {
    id: 'task-103',
    title: 'Deploy Gemini 3.8 Flash automated sprint breakdown agent',
    description: 'Connect server-side structured output schema to transform ambiguous user requirements into actionable tasks.',
    status: 'done',
    priority: 'high',
    tags: ['AI Agent', 'Gemini', 'Backend'],
    assignee: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Full-Stack Engineer',
    },
    estimatedHours: 8,
    createdAt: '2026-11-06T09:00:00Z',
  },
  {
    id: 'task-104',
    title: 'Add export to vector SVG & PNG for infinite whiteboard',
    description: 'Export canvas strokes, sticky notes, and AI diagram nodes as crisp vector graphics with metadata.',
    status: 'todo',
    priority: 'medium',
    tags: ['Canvas', 'Export', 'Client'],
    assignee: {
      name: 'Elena Rostova',
      avatar: './images/avatar_elena.jpg',
      role: 'VP of Product',
    },
    estimatedHours: 4,
    createdAt: '2026-11-08T16:45:00Z',
  },
  {
    id: 'task-105',
    title: 'Optimize mobile touch gestures for whiteboard pan & zoom',
    description: 'Ensure double-finger pan and pinch-to-zoom maintain 60fps frame rate without canvas jitter.',
    status: 'todo',
    priority: 'low',
    tags: ['Mobile', 'Gestures', 'UX'],
    assignee: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Full-Stack Engineer',
    },
    estimatedHours: 5,
    createdAt: '2026-11-09T08:20:00Z',
  },
];

export const INITIAL_STICKY_NOTES: StickyNote[] = [
  {
    id: 'note-1',
    text: 'Idea: Auto-link Kanban tasks directly to whiteboard diagram nodes',
    x: 80,
    y: 100,
    color: '#FEF08A',
    author: 'Elena Rostova',
  },
  {
    id: 'note-2',
    text: 'Security: Zero-trust token rotation on WebSockets reconnect',
    x: 320,
    y: 90,
    color: '#BAE6FD',
    author: 'Marcus Chen',
  },
  {
    id: 'note-3',
    text: 'Gemini 3.8 Flash latency benchmark: sub-400ms TTFT confirmed',
    x: 560,
    y: 110,
    color: '#BBF7D0',
    author: 'Alex Rivera',
  },
  {
    id: 'note-4',
    text: 'Design rule: Keep line weights at 2px with rounded joints',
    x: 200,
    y: 330,
    color: '#FBCFE8',
    author: 'Sophia Patel',
  },
];

export const INITIAL_DOCS: DocItem[] = [
  {
    id: 'doc-1',
    title: 'Collaby Workspace Architecture & System Specification',
    category: 'Engineering Spec',
    updatedAt: '2 hours ago',
    author: 'Marcus Chen',
    version: 3,
    content: `# Collaby Workspace Architecture & System Specification

## 1. Executive Overview
Collaby is designed as a unified real-time collaboration environment bridging asynchronous sprint tracking, synchronous visual ideation, and AI-augmented document development.

### Core Objectives:
- Single source of truth for cross-functional teams
- Zero-latency multi-agent assistance via Gemini 3.8 Flash
- Bidirectional state linking: Kanban tasks reflect in whiteboard nodes and document references

## 2. Real-Time Data Pipeline
All client operations propagate through an event-driven delta log. The server maintains conflict-free data synchronization with the following operational constraints:
- Event delivery latency: < 35ms target across geographic regions
- Local optimistic mutation rollbacks upon conflict
- Background snapshot persistence every 30 seconds

## 3. AI Co-Pilot Integration Layer
The AI engine runs server-side with direct access to contextual state:
1. Automated sprint decomposition (Feature Goal -> Actionable Tasks)
2. Document summarization and formal executive tone polishing
3. Automated system architecture diagram node synthesis on canvas

## 4. Key Security Principles
- Encrypted data transport via TLS 1.3
- Server-side token validation on every workspace mutating API
- Private workspace sandboxing per tenant organisation
`,
  },
  {
    id: 'doc-2',
    title: 'Q4 Product Roadmap & Team Velocity Goals',
    category: 'Product Strategy',
    updatedAt: 'Yesterday',
    author: 'Elena Rostova',
    version: 2,
    content: `# Q4 Product Roadmap & Team Velocity Goals

## Strategic Objectives
Our mission for this quarter is to accelerate product discovery and design handoff cycles by 40%.

### Key Deliverables:
- **Sprint 24**: Release Infinite Whiteboard AI Diagram Generation
- **Sprint 25**: Bi-directional Kanban synchronization with GitHub issues
- **Sprint 26**: Instant voice-to-diagram transcription module

## Team Metrics:
- Target Sprint Velocity: 48 story points per bi-weekly cycle
- PR Cycle Time: < 18 hours from review request to merge
- Customer Satisfaction Benchmark: 98% positive sentiment on collaborative features
`,
  },
  {
    id: 'doc-3',
    title: 'Design System & Typography Guidelines',
    category: 'Design Standards',
    updatedAt: 'Nov 6, 2026',
    author: 'Sophia Patel',
    version: 1,
    content: `# Collaby Design System & UI/UX Standards

## 1. Typography Hierarchy
- **Display Face**: Outfit (Crisp geometric sans for headers)
- **Body Face**: Plus Jakarta Sans (High legibility at 14px-16px)
- **Code & Telemetry**: JetBrains Mono (Strict tabular numerals)

## 2. Color Balance (60-30-10 Rule)
- 60% Neutral canvas (Deep obsidian dark / Crisp alabaster light)
- 30% Structural container surfaces with subtle hairline borders
- 10% Intent-focused accents: Electric Indigo (#6366F1) and Emerald (#10B981)

## 3. Micro-Interaction Standard
All user actions settle within 150ms using cubic bezier curves. Zero layout jitter.
`,
  },
];
