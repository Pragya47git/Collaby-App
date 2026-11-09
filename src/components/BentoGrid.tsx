import React from 'react';
import { ArrowRight, Layout, PenTool, FileText, Bot, Zap, Sparkles } from 'lucide-react';
import { WorkspaceTab } from '../types';

interface BentoGridProps {
  onSelectFeature: (tab: WorkspaceTab) => void;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ onSelectFeature }) => {
  return (
    <section id="features" className="py-20 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase mb-2">
            The Collaby Engine
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            Four unified modalities. Zero context fragmentation.
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Stop switching between isolated whiteboards, issue trackers, and document silos. Collaby keeps every artifact dynamically connected.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Infinite Whiteboard (Large col-span-7) */}
          <div className="md:col-span-7 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 flex flex-col justify-between group overflow-hidden relative">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  <span>01</span>
                  <span>·</span>
                  <span>Spatial Ideation</span>
                </div>
                <button
                  onClick={() => onSelectFeature('whiteboard')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Open Canvas</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white mb-2">
                Infinite Collaborative Whiteboard
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Sketch system flows, drop sticky notes, and run architecture reviews in real-time. Use the built-in Gemini synthesis engine to turn prompt concepts into connected node diagrams automatically.
              </p>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-950 mt-2">
              <img
                src="/src/assets/images/collaby_feature_whiteboard_1794232995121.jpg"
                alt="Collaby infinite whiteboard with interactive diagrams and sticky notes"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-72 object-cover object-left-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-800 text-[11px] text-neutral-300 font-mono">
                Real-time canvas delta engine
              </div>
            </div>
          </div>

          {/* Card 2: Smart Sprint Kanban (col-span-5) */}
          <div className="md:col-span-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 flex flex-col justify-between group overflow-hidden">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  <span>02</span>
                  <span>·</span>
                  <span>Agile Orchestration</span>
                </div>
                <button
                  onClick={() => onSelectFeature('kanban')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Open Kanban</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white mb-2">
                Automated Sprint Kanban
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Organize work with drag-and-drop velocity stages. Provide a feature goal and Collaby's AI will parse requirements into structured, tagged, time-estimated user stories.
              </p>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-950 mt-2">
              <img
                src="/src/assets/images/collaby_feature_kanban_1794232996338.jpg"
                alt="Collaby modern agile sprint kanban board interface"
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-72 object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-800 text-[11px] text-neutral-300 font-mono">
                Automated backlog decomposition
              </div>
            </div>
          </div>

          {/* Card 3: Living Technical Specs (col-span-6) */}
          <div className="md:col-span-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  <span>03</span>
                  <span>·</span>
                  <span>Synchronous Documentation</span>
                </div>
                <button
                  onClick={() => onSelectFeature('docs')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Open Docs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white mb-2">
                Living Product & Engineering Specs
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Rich markdown document studio with automated executive summaries, action item extraction, and professional tone polishing directly within the text stream.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-500 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                <span>Architecture-v3.md</span>
                <span className="text-indigo-600 dark:text-indigo-400">✨ AI Polish Ready</span>
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                "All mutations propagate via CRDT vector clocks. Server-side validation guarantees zero conflict across concurrent board edits."
              </p>
            </div>
          </div>

          {/* Card 4: Multi-Agent AI Co-pilot (col-span-6) */}
          <div className="md:col-span-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  <span>04</span>
                  <span>·</span>
                  <span>Context-Aware Intelligence</span>
                </div>
                <button
                  onClick={() => onSelectFeature('analytics')}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Team Velocity</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <h3 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white mb-2">
                Grounded Multi-Agent Co-pilot
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                Unlike generic chat windows, Collaby's assistant understands your board's live state, ongoing document drafts, and team member workload to answer questions accurately.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 via-sky-500/10 to-transparent border border-indigo-200/50 dark:border-indigo-800/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Contextual Query Simulation</span>
              </div>
              <div className="text-xs text-neutral-700 dark:text-neutral-300">
                "Collaby, check Sprint 24: are any API gateway dependencies unassigned before release?"
              </div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-mono pt-1">
                ✓ Identified 1 unassigned task: "OAuth PKCE fallback"
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
