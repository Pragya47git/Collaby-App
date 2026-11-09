import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Globe, GitBranch, Terminal } from 'lucide-react';

interface GitHubPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubPagesModal: React.FC<GitHubPagesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyCommand = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: '1. Push to your GitHub Repository',
      desc: 'Commit all files (including the pre-configured .github/workflows/deploy.yml)',
      code: 'git add .\ngit commit -m "Deploy Collaby to GitHub Pages"\ngit push origin main',
    },
    {
      title: '2. Select GitHub Actions as the Pages Source',
      desc: 'Go to your repo on GitHub: Settings → Pages. Under "Build and deployment" Source, select "GitHub Actions".',
      code: '',
    },
    {
      title: '3. View your live site',
      desc: 'The workflow will automatically run, build the static bundle with relative base paths, and publish your URL at:',
      code: 'https://<your-username>.github.io/CollabAi/',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <Globe className="w-3.5 h-3.5" />
            <span>Deployment Guide</span>
          </div>
          <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
            Host Collaby on GitHub Pages
          </h3>
          <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Your project is ready with relative path bundling (<code className="font-mono text-indigo-600 dark:text-indigo-400">base: './'</code>), static assets, and an automated GitHub Actions deployment workflow.
          </p>
        </div>

        <div className="space-y-4 text-xs">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2"
            >
              <div className="font-semibold text-neutral-900 dark:text-white text-sm">
                {step.title}
              </div>
              <div className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {step.desc}
              </div>

              {step.code && (
                <div className="relative mt-2 p-3 rounded-lg bg-neutral-900 text-neutral-100 font-mono text-[11px] flex items-center justify-between">
                  <pre className="overflow-x-auto whitespace-pre">{step.code}</pre>
                  <button
                    onClick={() => copyCommand(step.code, idx)}
                    className="p-1.5 ml-2 text-neutral-400 hover:text-white rounded bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer shrink-0"
                    title="Copy to clipboard"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 text-xs">
          <div className="text-neutral-500 font-mono">
            Full instructions in GITHUB_PAGES_DEPLOYMENT.md
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
          >
            Got it, ready to deploy
          </button>
        </div>
      </div>
    </div>
  );
};
