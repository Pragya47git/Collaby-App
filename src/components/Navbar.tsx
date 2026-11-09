import React from 'react';
import { Sparkles, Sun, Moon, ArrowRight } from 'lucide-react';
import { ViewMode, WorkspaceTab } from '../types';

interface NavbarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeTab: WorkspaceTab;
  setActiveTab: (tab: WorkspaceTab) => void;
  isDark: boolean;
  toggleTheme: () => void;
  onOpenAiDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  setViewMode,
  activeTab,
  setActiveTab,
  isDark,
  toggleTheme,
  onOpenAiDrawer,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/85 dark:bg-neutral-950/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face, no adjacent pills or slogans) */}
        <button
          onClick={() => setViewMode('landing')}
          className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 flex items-center gap-2 text-left"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </span>
          <span className="font-display font-bold tracking-tight">collaby</span>
        </button>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          {viewMode === 'landing' ? (
            <>
              <a
                href="#features"
                className="hover:text-neutral-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                Capabilities
              </a>
              <a
                href="#canvas-preview"
                className="hover:text-neutral-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                Canvas
              </a>
              <a
                href="#sprint-board"
                className="hover:text-neutral-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                Sprint Board
              </a>
              <a
                href="#testimonials"
                className="hover:text-neutral-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                Case Studies
              </a>
              <a
                href="#pricing"
                className="hover:text-neutral-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                Pricing
              </a>
            </>
          ) : (
            <div className="flex items-center p-1 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setActiveTab('whiteboard')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'whiteboard'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                Infinite Canvas
              </button>
              <button
                onClick={() => setActiveTab('kanban')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'kanban'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                Sprint Kanban
              </button>
              <button
                onClick={() => setActiveTab('docs')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'docs'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                Live Documents
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                  activeTab === 'analytics'
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                Team Velocity
              </button>
            </div>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle visual theme"
            className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {viewMode === 'landing' ? (
            <button
              onClick={() => setViewMode('workspace')}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm shadow-indigo-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAiDrawer}
                className="px-3 py-1.5 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-lg border border-indigo-200 dark:border-indigo-800/60 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>AI Co-pilot</span>
              </button>

              <button
                onClick={() => setViewMode('landing')}
                className="px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Overview
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
