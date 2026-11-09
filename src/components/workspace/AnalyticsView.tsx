import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  Users,
  Activity,
  ArrowUpRight,
  Download,
} from 'lucide-react';
import { Task, Collaborator } from '../../types';

interface AnalyticsViewProps {
  tasks: Task[];
  collaborators: Collaborator[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  tasks,
  collaborators,
}) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'inprogress').length;
  const inReviewTasks = tasks.filter((t) => t.status === 'review').length;
  const todoTasks = tasks.filter((t) => t.status === 'todo').length;

  const totalEstimatedHours = tasks.reduce((sum, t) => sum + t.estimatedHours, 0);
  const completedHours = tasks
    .filter((t) => t.status === 'done')
    .reduce((sum, t) => sum + t.estimatedHours, 0);

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Telemetry Header */}
      <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-neutral-950 dark:text-white">
            Sprint 24: Team Velocity & Delivery Telemetry
          </h3>
          <p className="text-xs text-neutral-500 font-mono">
            Active cycle: Nov 01 – Nov 14 · Target: 48 story points
          </p>
        </div>

        <button
          onClick={() => {
            const report = `Collaby Sprint 24 Telemetry Report\nTotal Tasks: ${totalTasks}\nCompleted: ${completedTasks}\nCompletion Rate: ${completionRate}%\nTotal Estimated Hours: ${totalEstimatedHours}h`;
            const blob = new Blob([report], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `sprint-24-velocity-${Date.now()}.txt`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="px-3.5 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Velocity Digest</span>
        </button>
      </div>

      {/* KPI Numerical Strips (§1.D Tabular Figures) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>Sprint Completion</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-neutral-950 dark:text-white font-mono tabular-nums">
            {completionRate}%
          </div>
          <div className="text-[11px] text-neutral-500">
            <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400">{completedTasks}</span> of{' '}
            <span className="font-mono tabular-nums">{totalTasks}</span> cards shipped
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>Hours Burned</span>
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-neutral-950 dark:text-white font-mono tabular-nums">
            {completedHours}h
          </div>
          <div className="text-[11px] text-neutral-500">
            of <span className="font-mono tabular-nums">{totalEstimatedHours}h</span> budgeted velocity
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>Active Contributors</span>
            <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </div>
          <div className="text-3xl font-extrabold text-neutral-950 dark:text-white font-mono tabular-nums">
            {collaborators.length}
          </div>
          <div className="text-[11px] text-neutral-500">
            Synchronized via real-time canvas
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <span>WIP Bottleneck Index</span>
            <Activity className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-neutral-950 dark:text-white font-mono tabular-nums">
            {inProgressTasks + inReviewTasks}
          </div>
          <div className="text-[11px] text-neutral-500">
            Active in-flight work items
          </div>
        </div>
      </div>

      {/* Task Distribution & Progress Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Status Distribution (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-neutral-950 dark:text-white">
            Backlog State Distribution
          </h4>

          {/* Segmented Progress Bar */}
          <div className="w-full h-3 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex">
            <div
              style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
              className="bg-emerald-500 transition-all duration-500"
              title={`Completed: ${completedTasks}`}
            />
            <div
              style={{ width: `${totalTasks > 0 ? (inReviewTasks / totalTasks) * 100 : 0}%` }}
              className="bg-sky-500 transition-all duration-500"
              title={`In Review: ${inReviewTasks}`}
            />
            <div
              style={{ width: `${totalTasks > 0 ? (inProgressTasks / totalTasks) * 100 : 0}%` }}
              className="bg-indigo-500 transition-all duration-500"
              title={`In Progress: ${inProgressTasks}`}
            />
            <div
              style={{ width: `${totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0}%` }}
              className="bg-neutral-300 dark:bg-neutral-700 transition-all duration-500"
              title={`To Do: ${todoTasks}`}
            />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-neutral-600 dark:text-neutral-400">Done ({completedTasks})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              <span className="text-neutral-600 dark:text-neutral-400">Review ({inReviewTasks})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span className="text-neutral-600 dark:text-neutral-400">In Progress ({inProgressTasks})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="text-neutral-600 dark:text-neutral-400">To Do ({todoTasks})</span>
            </div>
          </div>
        </div>

        {/* Squad Allocation & Workload (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-neutral-950 dark:text-white">
            Squad Allocation
          </h4>

          <div className="space-y-3">
            {collaborators.map((c) => {
              const assignedTasks = tasks.filter((t) => t.assignee.name === c.name);
              const assignedHours = assignedTasks.reduce((acc, cur) => acc + cur.estimatedHours, 0);

              return (
                <div key={c.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover shrink-0"
                    />
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-white">{c.name}</div>
                      <div className="text-[10px] text-neutral-500">{c.role}</div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <span className="font-bold text-neutral-900 dark:text-white tabular-nums">
                      {assignedTasks.length}
                    </span>{' '}
                    <span className="text-neutral-500">cards · {assignedHours}h</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
