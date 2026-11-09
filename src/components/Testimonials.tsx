import React from 'react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase mb-2">
            Engineering & Product Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
            Trusted by distributed engineering organizations
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400">
            Real outcomes from design systems teams, infrastructure architects, and agile delivery squads.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Testimonial 1: Elena Rostova */}
          <div className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
            <blockquote className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">
              "Before Collaby, our product specs took 6 to 8 business days to decompose into engineer-ready backlog tickets. With Collaby's continuous workspace, our architecture whiteboard directly feeds the sprint backlog. We cut our sprint kickoff latency by 65% in our first two quarters."
            </blockquote>

            <div className="flex items-center gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <img
                src="/src/assets/images/avatar_collaborator_elena_1794232996163.jpg"
                alt="Elena Rostova, VP of Product"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20 shrink-0"
              />
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white text-sm">
                  Elena Rostova
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  VP of Product · CloudScale Networks
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 2: Marcus Chen */}
          <div className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
            <blockquote className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">
              "The ability for our staff engineers to sketch distributed microservices on the whiteboard and have Gemini generate the exact service nodes and connection contracts directly saved dozens of design review hours. It feels like pair-architecting with an active collaborator."
            </blockquote>

            <div className="flex items-center gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <img
                src="/src/assets/images/avatar_collaborator_marcus_1794232996080.jpg"
                alt="Marcus Chen, Staff Platform Architect"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20 shrink-0"
              />
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white text-sm">
                  Marcus Chen
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Staff Platform Architect · Vektor Systems
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
