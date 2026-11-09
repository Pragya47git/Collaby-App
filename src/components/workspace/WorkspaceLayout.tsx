import React, { useState } from 'react';
import {
  Layout,
  PenTool,
  FileText,
  BarChart3,
  Sparkles,
  Share2,
  Check,
  Circle,
  Copy,
} from 'lucide-react';
import {
  WorkspaceTab,
  Task,
  DocItem,
  StickyNote,
  Collaborator,
} from '../../types';
import { WhiteboardView } from './WhiteboardView';
import { KanbanView } from './KanbanView';
import { DocumentEditorView } from './DocumentEditorView';
import { AnalyticsView } from './AnalyticsView';

interface WorkspaceLayoutProps {
  activeTab: WorkspaceTab;
  setActiveTab: (tab: WorkspaceTab) => void;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  docs: DocItem[];
  setDocs: React.Dispatch<React.SetStateAction<DocItem[]>>;
  stickyNotes: StickyNote[];
  setStickyNotes: React.Dispatch<React.SetStateAction<StickyNote[]>>;
  collaborators: Collaborator[];
  onOpenAiDrawer: () => void;
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  activeTab,
  setActiveTab,
  tasks,
  setTasks,
  docs,
  setDocs,
  stickyNotes,
  setStickyNotes,
  collaborators,
  onOpenAiDrawer,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const roomId = 'nebula-sprint-24';

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Workspace Sub-Header & Presence Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs">
        {/* Contextual Breadcrumb */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
            <span>Workspaces</span>
            <span>/</span>
            <span className="text-neutral-900 dark:text-white font-semibold">Project Nebula</span>
            <span>/</span>
            <span className="text-indigo-600 dark:text-indigo-400 capitalize">{activeTab}</span>
          </div>
          <div className="text-xs text-neutral-500 flex items-center gap-2">
            <span>Room Code:</span>
            <span className="font-mono text-neutral-800 dark:text-neutral-200">{roomId}</span>
          </div>
        </div>

        {/* Collaborators & Share Room */}
        <div className="flex items-center gap-4">
          <div className="flex items-center -space-x-2">
            {collaborators.map((c) => (
              <img
                key={c.id}
                src={c.avatar}
                alt={c.name}
                title={`${c.name} (${c.role})`}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-neutral-900"
              />
            ))}
          </div>

          <button
            onClick={handleCopyShareLink}
            className="px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-mono">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-neutral-400" />
                <span>Invite Team</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Dynamic Tab Views */}
      {activeTab === 'whiteboard' && (
        <WhiteboardView
          collaborators={collaborators}
          stickyNotes={stickyNotes}
          setStickyNotes={setStickyNotes}
        />
      )}

      {activeTab === 'kanban' && (
        <KanbanView
          tasks={tasks}
          setTasks={setTasks}
          collaborators={collaborators}
        />
      )}

      {activeTab === 'docs' && (
        <DocumentEditorView docs={docs} setDocs={setDocs} />
      )}

      {activeTab === 'analytics' && (
        <AnalyticsView tasks={tasks} collaborators={collaborators} />
      )}

      {/* Floating Quick Action Button for AI Co-pilot */}
      <div className="fixed bottom-6 right-6 z-30">
        <button
          onClick={onOpenAiDrawer}
          className="px-4 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask Collaby AI</span>
        </button>
      </div>
    </div>
  );
};
