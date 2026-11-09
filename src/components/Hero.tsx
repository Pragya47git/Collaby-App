import React from 'react';
import { ArrowRight, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import { ViewMode } from '../types';

interface HeroProps {
  onLaunch: () => void;
  onExploreDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunch, onExploreDemo }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Background radial accent with subtle depth */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-500/10 via-sky-500/10 to-transparent blur-3xl pointer-events-none rounded-full"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Subtle Editorial Kicker - No pill sandwich */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">
            <span>Unified Team Intelligence</span>
            <span aria-hidden="true">·</span>
            <span>Real-time Multi-Agent Platform</span>
          </div>

          {/* Focal Headline with text-wrap balance */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 dark:text-white leading-[1.12]" style={{ textWrap: 'balance' }}>
            Where high-velocity teams brainstorm, build, and ship with AI.
          </h1>

          {/* Concrete Value Proposition */}
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Collaby unifies infinite whiteboard ideation, intelligent sprint kanban boards, collaborative specs, and autonomous AI copilots into one fluid workspace.
          </p>

          {/* Action Decision Block */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onLaunch}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Launch Collaby Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreDemo}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-800 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
              <span>Explore Interactive Demo</span>
            </button>
          </div>

          {/* Trust Signals */}
          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Zero-latency CRDT sync</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Gemini 3.8 Flash Powered</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Self-hostable & Cloud-ready</span>
            </span>
          </div>
        </div>

        {/* Hero Visual Asset Showcase with Resilient Fallback */}
        <div className="mt-12 sm:mt-16 relative">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 shadow-2xl bg-neutral-900 group">
            {/* Real generated high-fidelity hero image */}
            <img
              src="/src/assets/images/collaby_hero_workspace_1794232995087.jpg"
              alt="Collaby team collaboration workspace environment with interactive displays"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover max-h-[580px] transition-transform duration-700 group-hover:scale-[1.01]"
            />
            {/* Subtle Gradient Scrim for contrast overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />

            {/* In-viewport Live Floating Artifact Bar */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-neutral-900/90 dark:bg-neutral-950/90 backdrop-blur-md border border-neutral-700/60 text-white flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Live Sprint Synchronization: Project Nebula</h3>
                  <div className="text-xs text-neutral-300 flex items-center gap-2">
                    <span>4 engineers active</span>
                    <span>·</span>
                    <span className="font-mono tabular-nums text-emerald-400">14 tasks in sync</span>
                    <span>·</span>
                    <span>Gemini agent ready</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={onLaunch}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Join Live Room →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Quantitative Adjacency Bar (§1.H) */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white font-mono tabular-nums">
              12,400+
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              Sprints orchestrated across 840 teams
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white font-mono tabular-nums">
              4.2x
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              Faster spec-to-backlog decomposition
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white font-mono tabular-nums">
              &lt; 35ms
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              Live cursor and canvas delta sync latency
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white font-mono tabular-nums">
              99.98%
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              Conflict-free CRDT uptime reliability
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
