import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Sparkles,
  Download,
  Check,
  Copy,
  Loader2,
  ListOrdered,
  List,
  Heading1,
  Heading2,
  Code,
  Quote,
  Bold,
  Italic,
  Clock,
} from 'lucide-react';
import { DocItem } from '../../types';

interface DocumentEditorViewProps {
  docs: DocItem[];
  setDocs: React.Dispatch<React.SetStateAction<DocItem[]>>;
}

export const DocumentEditorView: React.FC<DocumentEditorViewProps> = ({
  docs,
  setDocs,
}) => {
  const [activeDocId, setActiveDocId] = useState<string>(docs[0]?.id || '');
  const activeDoc = docs.find((d) => d.id === activeDocId) || docs[0];

  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleUpdateContent = (content: string) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === activeDoc.id
          ? { ...d, content, updatedAt: 'Just now', version: d.version + 1 }
          : d
      )
    );
  };

  const handleUpdateTitle = (title: string) => {
    setDocs((prev) =>
      prev.map((d) => (d.id === activeDoc.id ? { ...d, title } : d))
    );
  };

  const handleCreateNewDoc = () => {
    const newDoc: DocItem = {
      id: `doc-${Date.now()}`,
      title: 'Untitled Engineering Document',
      category: 'Specification',
      updatedAt: 'Just now',
      author: 'You',
      version: 1,
      content: `# Untitled Document\n\n## Overview\nEnter implementation notes and architecture decisions here...`,
    };
    setDocs((prev) => [newDoc, ...prev]);
    setActiveDocId(newDoc.id);
  };

  const handleDownloadDoc = () => {
    if (!activeDoc) return;
    const blob = new Blob([activeDoc.content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeDoc.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Quick formatting insert helpers
  const insertFormatting = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('doc-editor-textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = activeDoc.content;
    const selection = text.substring(start, end) || 'text';
    const replacement = `${prefix}${selection}${suffix}`;
    const newContent = text.substring(0, start) + replacement + text.substring(end);
    handleUpdateContent(newContent);
  };

  // AI Assistant trigger
  const runAiAssist = async (action: 'summarize' | 'action_items' | 'polish' | 'expand') => {
    if (!activeDoc || isAiLoading) return;
    setIsAiLoading(true);
    setAiOutput(null);

    try {
      const res = await fetch('/api/ai/assist-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          content: activeDoc.content,
        }),
      });
      const data = await res.json();
      if (data?.result) {
        setAiOutput(data.result);
      }
    } catch (err) {
      console.error('AI Doc Assist failed:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleApplyAiOutput = () => {
    if (!aiOutput || !activeDoc) return;
    handleUpdateContent(`${activeDoc.content}\n\n---\n### AI Generated Extension\n${aiOutput}`);
    setAiOutput(null);
  };

  const wordCount = activeDoc?.content ? activeDoc.content.trim().split(/\s+/).length : 0;
  const readTimeMin = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="space-y-6">
      {/* Document Selector Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {docs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setActiveDocId(doc.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeDoc.id === doc.id
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-neutral-400" />
              <span className="truncate max-w-[140px]">{doc.title}</span>
            </button>
          ))}

          <button
            onClick={handleCreateNewDoc}
            className="p-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Create new document"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadDoc}
            className="px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Markdown</span>
          </button>
        </div>
      </div>

      {/* Main Document Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Editor Main Column (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm p-6 sm:p-8 space-y-4">
          {/* Doc Title & Meta Header */}
          <div className="space-y-2 border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <input
              type="text"
              value={activeDoc.title}
              onChange={(e) => handleUpdateTitle(e.target.value)}
              className="w-full text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white bg-transparent border-none focus:outline-none"
            />
            <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono">
              <span>Author: {activeDoc.author}</span>
              <span>·</span>
              <span>Updated {activeDoc.updatedAt}</span>
              <span>·</span>
              <span className="tabular-nums">v{activeDoc.version}</span>
              <span>·</span>
              <span className="tabular-nums">{wordCount} words</span>
              <span>·</span>
              <span className="tabular-nums">{readTimeMin} min read</span>
            </div>
          </div>

          {/* Rich Format Quick-Action Toolbar */}
          <div className="flex flex-wrap items-center gap-1 py-1 px-2 bg-neutral-50 dark:bg-neutral-800/60 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs">
            <button
              onClick={() => insertFormatting('# ')}
              title="Heading 1"
              className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 cursor-pointer"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('## ')}
              title="Heading 2"
              className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 cursor-pointer"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('**', '**')}
              title="Bold"
              className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 cursor-pointer"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('*', '*')}
              title="Italic"
              className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 cursor-pointer"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('- ')}
              title="Bullet list"
              className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 cursor-pointer"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('1. ')}
              title="Numbered list"
              className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 cursor-pointer"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('```ts\n', '\n```')}
              title="Code block"
              className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 cursor-pointer"
            >
              <Code className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('> ')}
              title="Quote block"
              className="p-1.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 cursor-pointer"
            >
              <Quote className="w-4 h-4" />
            </button>
          </div>

          {/* Text Area */}
          <textarea
            id="doc-editor-textarea"
            value={activeDoc.content}
            onChange={(e) => handleUpdateContent(e.target.value)}
            rows={22}
            className="w-full bg-transparent text-sm leading-relaxed text-neutral-800 dark:text-neutral-200 font-mono resize-y border-none focus:outline-none"
          />
        </div>

        {/* AI Co-pilot Spec Actions Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gemini Doc Intelligence</span>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Use Gemini 3.8 Flash to transform technical specs into actionable deliverables.
            </p>

            <div className="space-y-2">
              <button
                onClick={() => runAiAssist('summarize')}
                disabled={isAiLoading}
                className="w-full py-2 px-3 text-xs font-medium text-left rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-neutral-800 dark:text-neutral-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-neutral-200 dark:border-neutral-700 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Executive Summary</span>
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              </button>

              <button
                onClick={() => runAiAssist('action_items')}
                disabled={isAiLoading}
                className="w-full py-2 px-3 text-xs font-medium text-left rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-neutral-800 dark:text-neutral-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-neutral-200 dark:border-neutral-700 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Extract Action Checklist</span>
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              </button>

              <button
                onClick={() => runAiAssist('polish')}
                disabled={isAiLoading}
                className="w-full py-2 px-3 text-xs font-medium text-left rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-neutral-800 dark:text-neutral-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-neutral-200 dark:border-neutral-700 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Polish Executive Tone</span>
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              </button>

              <button
                onClick={() => runAiAssist('expand')}
                disabled={isAiLoading}
                className="w-full py-2 px-3 text-xs font-medium text-left rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-neutral-800 dark:text-neutral-200 hover:text-indigo-600 dark:hover:text-indigo-400 border border-neutral-200 dark:border-neutral-700 transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Expand Edge Cases & Specs</span>
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              </button>
            </div>

            {isAiLoading && (
              <div className="py-6 text-center space-y-2">
                <Loader2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400 animate-spin mx-auto" />
                <div className="text-xs text-neutral-500 font-mono">
                  Synthesizing with Gemini 3.8 Flash...
                </div>
              </div>
            )}

            {aiOutput && (
              <div className="mt-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-neutral-900 dark:text-white">
                  <span>AI Result</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(aiOutput);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="p-1 text-neutral-500 hover:text-neutral-900 dark:hover:text-white rounded cursor-pointer"
                      title="Copy output"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans max-h-56 overflow-y-auto whitespace-pre-wrap">
                  {aiOutput}
                </div>

                <button
                  onClick={handleApplyAiOutput}
                  className="w-full py-2 px-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
                >
                  Append to Document
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
