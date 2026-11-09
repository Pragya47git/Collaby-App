import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (plan: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 border-t border-neutral-200/80 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase mb-2">
            Predictable Platform Economics
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            Transparent plans for high-output squads
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400">
            Self-host for open source freedom, or deploy our managed real-time cloud with unified AI compute.
          </p>

          {/* Interactive Billing Cadence Selector */}
          <div className="mt-6 inline-flex items-center p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                !annual
                  ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                annual
                  ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan 1: Starter / Open Core */}
          <div className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="text-xs text-neutral-500 font-mono mb-1">For early-stage builders</div>
              <h3 className="text-xl font-bold text-neutral-950 dark:text-white">Community Edition</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-neutral-950 dark:text-white font-mono tabular-nums">$0</span>
                <span className="text-xs text-neutral-500 font-mono">/ forever open</span>
              </div>
              <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Self-hosted Node & Vite stack with local SQLite or memory store, infinite canvas, and manual backlog tracking.
              </p>

              <div className="mt-8 space-y-3 text-xs text-neutral-700 dark:text-neutral-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Unlimited local canvas & kanban boards</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Bring-your-own Gemini API key</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Up to 5 concurrent peer connections</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Markdown doc export to HTML/PDF</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('Community')}
              className="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer"
            >
              Start Self-Hosting
            </button>
          </div>

          {/* Plan 2: Team Pro (Featured) */}
          <div className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-indigo-600 dark:border-indigo-500 flex flex-col justify-between relative shadow-lg shadow-indigo-600/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
              Recommended for Engineering Squads
            </div>

            <div>
              <div className="text-xs text-indigo-600 dark:text-indigo-400 font-mono mb-1">For scaling product teams</div>
              <h3 className="text-xl font-bold text-neutral-950 dark:text-white">Team Pro</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-neutral-950 dark:text-white font-mono tabular-nums">
                  {annual ? '$18' : '$22'}
                </span>
                <span className="text-xs text-neutral-500 font-mono">/ member / month</span>
              </div>
              <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Managed low-latency CRDT cloud with unified Gemini 3.8 Flash compute, automated sprint breakdown, and team analytics.
              </p>

              <div className="mt-8 space-y-3 text-xs text-neutral-700 dark:text-neutral-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>Unlimited team workspaces & live rooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>Sub-35ms global delta synchronization</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>10,000 AI agent calls / month included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>Automated architecture diagram synthesis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span>Version history & sprint burndown metrics</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('Team Pro')}
              className="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-sm shadow-indigo-600/20 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Get Started with Team Pro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Plan 3: Enterprise Grid */}
          <div className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="text-xs text-neutral-500 font-mono mb-1">For regulated enterprises</div>
              <h3 className="text-xl font-bold text-neutral-950 dark:text-white">Enterprise Grid</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-neutral-950 dark:text-white font-mono tabular-nums">Custom</span>
                <span className="text-xs text-neutral-500 font-mono">/ volume tiers</span>
              </div>
              <p className="mt-3 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Dedicated tenant VPC isolation, custom fine-tuned model endpoints, SSO/SAML 2.0 integration, and audit logs.
              </p>

              <div className="mt-8 space-y-3 text-xs text-neutral-700 dark:text-neutral-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Dedicated VPC isolation or on-prem deploy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Custom SAML SSO & Okta provisioning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Unlimited AI compute quota with zero logging</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>24/7 dedicated enterprise SLA & SOC2 Type II</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onSelectPlan('Enterprise')}
              className="mt-8 w-full py-2.5 px-4 text-xs font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-xl transition-colors cursor-pointer"
            >
              Contact Solutions Architect
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
