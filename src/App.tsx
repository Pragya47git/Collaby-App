import React, { useState, useEffect } from 'react';
import {
  INITIAL_TASKS,
  INITIAL_DOCS,
  INITIAL_STICKY_NOTES,
  INITIAL_COLLABORATORS,
} from './data/mockData';
import { ViewMode, WorkspaceTab, Task, DocItem, StickyNote } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { GitHubPagesModal } from './components/GitHubPagesModal';
import { WorkspaceLayout } from './components/workspace/WorkspaceLayout';
import { AiChatDrawer } from './components/workspace/AiChatDrawer';
import { ArrowRight, Sparkles, CheckCircle2, Play } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('landing');
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('whiteboard');
  const [isDark, setIsDark] = useState<boolean>(true);

  // App State
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [docs, setDocs] = useState<DocItem[]>(INITIAL_DOCS);
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>(INITIAL_STICKY_NOTES);
  const [collaborators] = useState(INITIAL_COLLABORATORS);

  // Modals & Drawers
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Team Pro');

  // Sync Dark Theme class on html element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleLaunchStudio = () => {
    setViewMode('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFeature = (tab: WorkspaceTab) => {
    setActiveTab(tab);
    setViewMode('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans antialiased transition-colors duration-200">
      {/* Strict Top Bar Contract */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {viewMode === 'landing' ? (
          <div>
            {/* Hero Section */}
            <Hero
              onLaunch={handleLaunchStudio}
              onExploreDemo={() => {
                const el = document.getElementById('interactive-preview');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Interactive Live Preview Sandbox Section */}
            <section
              id="interactive-preview"
              className="py-16 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-100/50 dark:bg-neutral-900/20"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                  <div>
                    <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase font-mono mb-1">
                      Live Studio Sandbox
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
                      Test the Collaby workspace in real time
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                      Interact with live components or click to expand into full studio mode.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleLaunchStudio}
                      className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <span>Expand to Full Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Embedded Live Workspace Preview */}
                <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden p-4 sm:p-6">
                  <WorkspaceLayout
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    tasks={tasks}
                    setTasks={setTasks}
                    docs={docs}
                    setDocs={setDocs}
                    stickyNotes={stickyNotes}
                    setStickyNotes={setStickyNotes}
                    collaborators={collaborators}
                    onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
                  />
                </div>
              </div>
            </section>

            {/* Bento Grid Feature Breakdown */}
            <BentoGrid onSelectFeature={handleSelectFeature} />

            {/* Customer Testimonials & Attributable Proof */}
            <Testimonials />

            {/* Transparent Economics & Pricing */}
            <Pricing onSelectPlan={handleSelectPlan} />
          </div>
        ) : (
          /* Dedicated Workspace Experience */
          <div className="py-2">
            <WorkspaceLayout
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tasks={tasks}
              setTasks={setTasks}
              docs={docs}
              setDocs={setDocs}
              stickyNotes={stickyNotes}
              setStickyNotes={setStickyNotes}
              collaborators={collaborators}
              onOpenAiDrawer={() => setIsAiDrawerOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Global AI Co-pilot Chat Drawer */}
      <AiChatDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        tasks={tasks}
        activeDoc={docs[0]}
      />

      {/* Validated Lead / Enterprise Inquiry Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        defaultPlan={selectedPlan}
      />

      {/* GitHub Pages Step-by-Step Deployment Guide Modal */}
      <GitHubPagesModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
      />

      {/* Clean, Refined Footer */}
      <Footer
        onOpenWorkspace={handleSelectFeature}
        onOpenDeployGuide={() => setIsDeployModalOpen(true)}
      />
    </div>
  );
}
