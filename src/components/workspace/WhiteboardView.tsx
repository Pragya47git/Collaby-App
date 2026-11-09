import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Pen,
  Eraser,
  Type,
  StickyNote as StickyIcon,
  RotateCcw,
  RotateCw,
  Trash2,
  Download,
  Sparkles,
  Loader2,
  Plus,
  Users,
  Move,
} from 'lucide-react';
import { StickyNote, DiagramNode, DiagramConnection, Collaborator } from '../../types';
import { fetchWhiteboardNodes } from '../../utils/aiClient';

interface WhiteboardViewProps {
  collaborators: Collaborator[];
  stickyNotes: StickyNote[];
  setStickyNotes: React.Dispatch<React.SetStateAction<StickyNote[]>>;
}

export const WhiteboardView: React.FC<WhiteboardViewProps> = ({
  collaborators,
  stickyNotes,
  setStickyNotes,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tool, setTool] = useState<'pen' | 'eraser' | 'text'>('pen');
  const [color, setColor] = useState<string>('#6366F1'); // Indigo default
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Undo / Redo history
  const [history, setHistory] = useState<ImageData[]>([]);
  const [redoList, setRedoList] = useState<ImageData[]>([]);

  // Text tool state
  const [textInput, setTextInput] = useState<{
    active: boolean;
    x: number;
    y: number;
    text: string;
  }>({ active: false, x: 0, y: 0, text: '' });

  // AI Diagram state
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGeneratingDiagram, setIsGeneratingDiagram] = useState(false);
  const [diagramNodes, setDiagramNodes] = useState<DiagramNode[]>([
    { label: 'Client App (React)', x: 120, y: 160, color: '#6366F1', type: 'frontend', description: 'Next-gen reactive UI' },
    { label: 'API Gateway (Node.js)', x: 380, y: 160, color: '#3B82F6', type: 'gateway', description: 'Reverse proxy & auth' },
    { label: 'Gemini 3.8 Flash Agent', x: 640, y: 90, color: '#8B5CF6', type: 'ai', description: 'High-throughput reasoning' },
    { label: 'Postgres / CRDT Log', x: 640, y: 240, color: '#10B981', type: 'database', description: 'Persistent state store' },
  ]);
  const [diagramConnections, setDiagramConnections] = useState<DiagramConnection[]>([
    { from: 0, to: 1, label: 'HTTPS / WSS' },
    { from: 1, to: 2, label: 'JSON Prompt' },
    { from: 1, to: 3, label: 'Delta Log' },
  ]);

  // Selected note for dragging
  const [draggingNoteId, setDraggingNoteId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    // Set high-DPI canvas
    const rect = parent.getBoundingClientRect();
    canvas.width = Math.max(rect.width, 1000);
    canvas.height = 650;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      // Fill canvas background
      ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#0c101c' : '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // Save initial blank state
      const initialSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory([initialSnapshot]);
    }
  }, []);

  const saveStateToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-15), snapshot]);
    setRedoList([]);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'text') {
      setTextInput({ active: true, x, y, text: '' });
      return;
    }

    setIsDrawing(true);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || tool === 'text') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = tool === 'eraser' ? (document.documentElement.classList.contains('dark') ? '#0c101c' : '#ffffff') : color;
    ctx.lineWidth = tool === 'eraser' ? lineWidth * 4 : lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveStateToHistory();
  };

  const handleApplyText = () => {
    if (!textInput.text.trim()) {
      setTextInput({ active: false, x: 0, y: 0, text: '' });
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.font = '16px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = color;
    ctx.fillText(textInput.text, textInput.x, textInput.y + 14);
    setTextInput({ active: false, x: 0, y: 0, text: '' });
    saveStateToHistory();
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lastState = history[history.length - 1];
    setRedoList((prev) => [lastState, ...prev]);

    const newHistory = history.slice(0, history.length - 1);
    setHistory(newHistory);
    const previousState = newHistory[newHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
  };

  const handleRedo = () => {
    if (redoList.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nextState = redoList[0];
    setRedoList((prev) => prev.slice(1));
    setHistory((prev) => [...prev, nextState]);
    ctx.putImageData(nextState, 0, 0);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = document.documentElement.classList.contains('dark') ? '#0c101c' : '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveStateToHistory();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `collaby-whiteboard-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleAddSticky = (colorHex: string) => {
    const newNote: StickyNote = {
      id: `note-${Date.now()}`,
      text: 'Double click to edit note...',
      x: 100 + Math.random() * 200,
      y: 120 + Math.random() * 150,
      color: colorHex,
      author: 'You',
    };
    setStickyNotes((prev) => [...prev, newNote]);
  };

  const handleDeleteSticky = (id: string) => {
    setStickyNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleUpdateStickyText = (id: string, text: string) => {
    setStickyNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, text } : n))
    );
  };

  // Sticky Note Dragging
  const handleNoteMouseDown = (e: React.MouseEvent, note: StickyNote) => {
    e.stopPropagation();
    setDraggingNoteId(note.id);
    setDragOffset({
      x: e.clientX - note.x,
      y: e.clientY - note.y,
    });
  };

  const handleContainerMouseMove = (e: React.MouseEvent) => {
    if (!draggingNoteId) return;
    const container = e.currentTarget.getBoundingClientRect();
    const newX = Math.max(10, Math.min(container.width - 200, e.clientX - container.left - 20));
    const newY = Math.max(10, Math.min(container.height - 150, e.clientY - container.top - 20));

    setStickyNotes((prev) =>
      prev.map((n) => (n.id === draggingNoteId ? { ...n, x: newX, y: newY } : n))
    );
  };

  const handleContainerMouseUp = () => {
    setDraggingNoteId(null);
  };

  // AI Diagram Generator
  const handleGenerateAiDiagram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim() || isGeneratingDiagram) return;
    setIsGeneratingDiagram(true);

    try {
      const diagram = await fetchWhiteboardNodes(aiPrompt);
      if (diagram?.nodes?.length) {
        setDiagramNodes(diagram.nodes);
        setDiagramConnections(diagram.connections || []);
      }
    } catch (err) {
      console.error('Error generating AI diagram:', err);
    } finally {
      setIsGeneratingDiagram(false);
      setAiPrompt('');
    }
  };

  return (
    <div
      className="space-y-4"
      onMouseMove={handleContainerMouseMove}
      onMouseUp={handleContainerMouseUp}
    >
      {/* Top Whiteboard Control Bar */}
      <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        {/* Drawing Tools */}
        <div className="flex items-center gap-1.5 border-r border-neutral-200 dark:border-neutral-800 pr-3">
          <button
            onClick={() => setTool('pen')}
            className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              tool === 'pen'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Pen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pen</span>
          </button>

          <button
            onClick={() => setTool('eraser')}
            className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              tool === 'eraser'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Eraser className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Eraser</span>
          </button>

          <button
            onClick={() => setTool('text')}
            className={`p-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              tool === 'text'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Text</span>
          </button>
        </div>

        {/* Color Palette & Stroke Width */}
        <div className="flex items-center gap-3 border-r border-neutral-200 dark:border-neutral-800 pr-3">
          <div className="flex items-center gap-1">
            {['#6366F1', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#111827'].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                style={{ backgroundColor: c }}
                className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                  color === c ? 'scale-125 border-white ring-2 ring-indigo-500' : 'border-transparent'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 text-xs text-neutral-500">
            <span>Size:</span>
            <input
              type="range"
              min="1"
              max="16"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-16 h-1 accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Add Sticky Note buttons */}
        <div className="flex items-center gap-1.5 border-r border-neutral-200 dark:border-neutral-800 pr-3">
          <span className="text-xs text-neutral-500 hidden md:inline">Sticky:</span>
          <button
            onClick={() => handleAddSticky('#FEF08A')}
            title="Add Yellow Sticky Note"
            className="w-5 h-5 rounded bg-amber-200 border border-amber-300 hover:scale-110 transition-transform cursor-pointer"
          />
          <button
            onClick={() => handleAddSticky('#BAE6FD')}
            title="Add Sky Blue Sticky Note"
            className="w-5 h-5 rounded bg-sky-200 border border-sky-300 hover:scale-110 transition-transform cursor-pointer"
          />
          <button
            onClick={() => handleAddSticky('#BBF7D0')}
            title="Add Green Sticky Note"
            className="w-5 h-5 rounded bg-emerald-200 border border-emerald-300 hover:scale-110 transition-transform cursor-pointer"
          />
          <button
            onClick={() => handleAddSticky('#FBCFE8')}
            title="Add Pink Sticky Note"
            className="w-5 h-5 rounded bg-pink-200 border border-pink-300 hover:scale-110 transition-transform cursor-pointer"
          />
        </div>

        {/* Undo, Redo, Clear, Download */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleUndo}
            disabled={history.length <= 1}
            title="Undo stroke"
            className="p-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={redoList.length === 0}
            title="Redo stroke"
            className="p-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-40 cursor-pointer"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleClear}
            title="Clear entire whiteboard"
            className="p-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownload}
            title="Download PNG snapshot"
            className="p-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* AI Diagram Generation Bar */}
      <form
        onSubmit={handleGenerateAiDiagram}
        className="p-2.5 bg-gradient-to-r from-indigo-500/5 via-sky-500/5 to-transparent dark:from-indigo-950/30 dark:via-sky-950/30 rounded-xl border border-indigo-200/60 dark:border-indigo-800/40 flex items-center gap-2"
      >
        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 px-2 whitespace-nowrap shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Diagram Synthesizer:</span>
        </div>
        <input
          type="text"
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="e.g. Serverless payment webhook pipeline with Stripe, AWS Lambda, and PostgreSQL"
          className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={isGeneratingDiagram || !aiPrompt.trim()}
          className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          {isGeneratingDiagram ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Generating Diagram...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Synthesize Diagram</span>
            </>
          )}
        </button>
      </form>

      {/* Main Canvas & Spatial Surface */}
      <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c101c] shadow-lg min-h-[650px] select-none">
        {/* Interactive HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-[650px] cursor-crosshair block"
        />

        {/* Text tool entry popup */}
        {textInput.active && (
          <div
            className="absolute z-30 flex items-center gap-1 p-1 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700"
            style={{ left: textInput.x, top: textInput.y }}
          >
            <input
              autoFocus
              type="text"
              value={textInput.text}
              onChange={(e) => setTextInput((prev) => ({ ...prev, text: e.target.value }))}
              onKeyDown={(e) => e.key === 'Enter' && handleApplyText()}
              onBlur={handleApplyText}
              placeholder="Type annotation..."
              className="px-2 py-1 text-xs bg-transparent text-neutral-900 dark:text-white focus:outline-none"
            />
            <button
              onClick={handleApplyText}
              className="px-2 py-1 text-[10px] font-semibold text-white bg-indigo-600 rounded cursor-pointer"
            >
              Add
            </button>
          </div>
        )}

        {/* SVG Connection Lines for AI Diagram Nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="7"
              markerHeight="7"
              refX="6"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 7 3.5, 0 7" fill="#6366F1" opacity="0.7" />
            </marker>
          </defs>
          {diagramConnections.map((conn, idx) => {
            const source = diagramNodes[conn.from];
            const target = diagramNodes[conn.to];
            if (!source || !target) return null;
            const sx = source.x + 90;
            const sy = source.y + 40;
            const tx = target.x + 90;
            const ty = target.y + 40;
            const midX = (sx + tx) / 2;
            const midY = (sy + ty) / 2;

            return (
              <g key={idx}>
                <line
                  x1={sx}
                  y1={sy}
                  x2={tx}
                  y2={ty}
                  stroke="#6366F1"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  markerEnd="url(#arrowhead)"
                  opacity="0.6"
                />
                {conn.label && (
                  <text
                    x={midX}
                    y={midY - 8}
                    fill="#818CF8"
                    fontSize="10"
                    fontFamily="JetBrains Mono"
                    textAnchor="middle"
                  >
                    {conn.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Diagram Nodes Layer */}
        {diagramNodes.map((node, idx) => (
          <div
            key={idx}
            className="absolute z-20 w-48 p-3 rounded-xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 shadow-md transition-all hover:scale-105 cursor-pointer"
            style={{ left: node.x, top: node.y }}
          >
            <div className="flex items-center justify-between mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: node.color }}
              />
              <span className="text-[10px] font-mono text-neutral-400 uppercase">
                {node.type}
              </span>
            </div>
            <div className="text-xs font-bold text-neutral-900 dark:text-white leading-tight">
              {node.label}
            </div>
            {node.description && (
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                {node.description}
              </div>
            )}
          </div>
        ))}

        {/* Interactive Sticky Notes Layer */}
        {stickyNotes.map((note) => (
          <div
            key={note.id}
            onMouseDown={(e) => handleNoteMouseDown(e, note)}
            className="absolute z-25 w-52 p-4 rounded-xl shadow-lg border border-black/10 cursor-move text-neutral-900 transition-shadow hover:shadow-xl group"
            style={{
              left: note.x,
              top: note.y,
              backgroundColor: note.color,
            }}
          >
            <div className="flex items-center justify-between mb-2 text-[10px] text-neutral-700/80 font-mono">
              <div className="flex items-center gap-1">
                <Move className="w-3 h-3 opacity-60" />
                <span>{note.author}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSticky(note.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-rose-700 hover:text-rose-900 transition-opacity p-0.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <textarea
              value={note.text}
              onChange={(e) => handleUpdateStickyText(note.id, e.target.value)}
              className="w-full bg-transparent resize-none text-xs text-neutral-900 font-medium leading-relaxed border-none focus:outline-none"
              rows={3}
            />
          </div>
        ))}

        {/* Live Collaborator Cursors Overlay */}
        {collaborators.map((c) =>
          c.cursor ? (
            <div
              key={c.id}
              className="absolute z-30 pointer-events-none transition-all duration-300 flex items-center gap-2"
              style={{ left: c.cursor.x, top: c.cursor.y }}
            >
              <svg
                className="w-4 h-4 text-indigo-500 drop-shadow-md"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 0l16 12-7 2-4 10-5-24z" />
              </svg>
              <div className="px-2 py-0.5 rounded-md bg-neutral-900 text-white text-[10px] font-mono whitespace-nowrap shadow-md opacity-90">
                {c.name.split(' ')[0]}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
