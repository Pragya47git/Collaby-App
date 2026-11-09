export type ViewMode = 'landing' | 'workspace';
export type WorkspaceTab = 'whiteboard' | 'kanban' | 'docs' | 'analytics';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inprogress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  assignee: {
    name: string;
    avatar: string;
    role: string;
  };
  estimatedHours: number;
  createdAt: string;
}

export interface StickyNote {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  author: string;
}

export interface DiagramNode {
  label: string;
  x: number;
  y: number;
  color: string;
  type: string;
  description?: string;
}

export interface DiagramConnection {
  from: number;
  to: number;
  label?: string;
}

export interface CanvasStroke {
  points: { x: number; y: number }[];
  color: string;
  lineWidth: number;
  tool: 'pen' | 'eraser';
}

export interface DocItem {
  id: string;
  title: string;
  category: string;
  updatedAt: string;
  author: string;
  content: string;
  version: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface Collaborator {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'active' | 'idle' | 'in_call';
  cursor?: { x: number; y: number };
}
