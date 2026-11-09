import React from 'react';
import { Sparkles, Github, Terminal } from 'lucide-react';
import { WorkspaceTab } from '../types';

interface FooterProps {
  onOpenWorkspace: (tab: WorkspaceTab) => void;
  onOpenDeployGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWorkspace, onOpenDeployGuide }) => {
  return (
    <footer className="border-t border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-neutral-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-sky-400 flex items-center justify-center text-white">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className="font-display font-bold text-xl tracking-tight text-neutral-950 dark:text-white">collaby</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              The unified AI collaboration workspace for modern cross-functional engineering teams.
            </p>
            <div className="text-xs text-neutral-500 font-mono">
              Designed for continuous delivery
            </div>
          </div>

          {/* Column 1: Workspace Modules */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-neutral-950 dark:text-white font-mono uppercase tracking-wider">
              Workspace
            </div>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <button
                  onClick={() => onOpenWorkspace('whiteboard')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Infinite Whiteboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenWorkspace('kanban')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Sprint Kanban Board
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenWorkspace('docs')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Living Technical Specs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenWorkspace('analytics')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Team Velocity Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Architecture & Models */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-neutral-950 dark:text-white font-mono uppercase tracking-wider">
              AI Architecture
            </div>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li>
                <span>Gemini 3.8 Flash Engine</span>
              </li>
              <li>
                <span>Structured Output JSON Schema</span>
              </li>
              <li>
                <span>CRDT State Synchronization</span>
              </li>
              <li>
                <span>Server-Side Telemetry & Security</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Open Source & Community */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-neutral-950 dark:text-white font-mono uppercase tracking-wider">
              Community & API
            </div>
            <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <li className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-neutral-400" />
                <a
                  href="https://github.com/Mridul2214/CollabAi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  GitHub Repository (Mridul2214/CollabAi)
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                <span>REST & WebSocket APIs</span>
              </li>
              <li>
                <button
                  onClick={onOpenDeployGuide}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>Deploy to GitHub Pages ↗</span>
                </button>
              </li>
              <li>
                <span>MIT Open Source License</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} collaby. Open collaborative workspace platform.
          </div>
          <div className="flex items-center gap-4 text-neutral-500 font-mono">
            <span>v2.4.0</span>
            <span>·</span>
            <span>All systems nominal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
