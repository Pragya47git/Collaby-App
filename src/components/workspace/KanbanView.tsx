import React, { useState } from 'react';
import {
  Plus,
  Sparkles,
  Search,
  Filter,
  MoreVertical,
  Clock,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit2,
  CheckCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Task, Collaborator } from '../../types';
import { fetchGenerateTasks } from '../../utils/aiClient';

interface KanbanViewProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  collaborators: Collaborator[];
}

export const KanbanView: React.FC<KanbanViewProps> = ({
  tasks,
  setTasks,
  collaborators,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTags, setNewTags] = useState('Frontend, Feature');
  const [newHours, setNewHours] = useState(4);
  const [selectedAssignee, setSelectedAssignee] = useState(collaborators[0]?.name || 'Elena Rostova');

  // AI Generator state
  const [aiGoal, setAiGoal] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiStatusMessage, setAiStatusMessage] = useState('');

  const columns: { key: Task['status']; label: string; count: number }[] = [
    { key: 'todo', label: 'To Do', count: tasks.filter((t) => t.status === 'todo').length },
    { key: 'inprogress', label: 'In Progress', count: tasks.filter((t) => t.status === 'inprogress').length },
    { key: 'review', label: 'In Review', count: tasks.filter((t) => t.status === 'review').length },
    { key: 'done', label: 'Completed', count: tasks.filter((t) => t.status === 'done').length },
  ];

  const handleMoveTask = (taskId: string, direction: 'prev' | 'next') => {
    const order: Task['status'][] = ['todo', 'inprogress', 'review', 'done'];
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        const currentIndex = order.indexOf(task.status);
        const targetIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (targetIndex >= 0 && targetIndex < order.length) {
          return { ...task, status: order[targetIndex] };
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const assigneeObj = collaborators.find((c) => c.name === selectedAssignee) || {
      name: selectedAssignee,
      avatar: '/src/assets/images/avatar_collaborator_elena_1794232996163.jpg',
      role: 'Contributor',
    };

    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTitle,
      description: newDescription || 'Standard development sprint item',
      status: 'todo',
      priority: newPriority,
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      assignee: {
        name: assigneeObj.name,
        avatar: assigneeObj.avatar,
        role: assigneeObj.role,
      },
      estimatedHours: Number(newHours) || 4,
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [task, ...prev]);
    setNewTitle('');
    setNewDescription('');
    setShowAddModal(false);
  };

  // AI Task Breakdown Generator using server-side Gemini
  const handleAiBreakdown = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiGoal.trim() || isGeneratingAi) return;
    setIsGeneratingAi(true);
    setAiStatusMessage('Gemini 3.8 Flash is decomposing feature goal...');

    try {
      const taskList = await fetchGenerateTasks(aiGoal, tasks.map((t) => t.title));
      if (taskList && Array.isArray(taskList)) {
        const generated: Task[] = taskList.map((item: any, idx: number) => {
          const assigneeObj = collaborators[idx % collaborators.length];
          return {
            id: `task-ai-${Date.now()}-${idx}`,
            title: item.title,
            description: item.description,
            status: item.status === 'inprogress' ? 'inprogress' : 'todo',
            priority: (item.priority as any) || 'medium',
            tags: item.tags || ['AI Generated'],
            assignee: {
              name: assigneeObj.name,
              avatar: assigneeObj.avatar,
              role: assigneeObj.role,
            },
            estimatedHours: item.estimatedHours || 6,
            createdAt: new Date().toISOString(),
          };
        });

        setTasks((prev) => [...generated, ...prev]);
        setAiStatusMessage(`Generated ${generated.length} actionable sprint tasks.`);
        setAiGoal('');
      } else {
        setAiStatusMessage('Could not parse task list.');
      }
    } catch (err: any) {
      console.error('Failed to generate tasks:', err);
      setAiStatusMessage('Error calling Gemini agent.');
    } finally {
      setIsGeneratingAi(false);
      setTimeout(() => setAiStatusMessage(''), 4000);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter & Action Bar */}
      <div className="p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search & Filter */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search sprint tasks or tags..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-xs">
            {(['all', 'high', 'medium', 'low'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  priorityFilter === p
                    ? 'bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Create Task Button */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Task Card</span>
          </button>
        </div>
      </div>

      {/* AI Automated Sprint Decomposer Bar */}
      <form
        onSubmit={handleAiBreakdown}
        className="p-3 bg-gradient-to-r from-indigo-500/5 via-sky-500/5 to-transparent dark:from-indigo-950/30 dark:via-sky-950/30 rounded-xl border border-indigo-200/60 dark:border-indigo-800/40 flex flex-col sm:flex-row items-center gap-2.5"
      >
        <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 px-1 whitespace-nowrap shrink-0">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Sprint Breakdown:</span>
        </div>
        <input
          type="text"
          value={aiGoal}
          onChange={(e) => setAiGoal(e.target.value)}
          placeholder="e.g. Implement real-time WebRTC audio channel with volume visualizer and mute controls"
          className="flex-1 w-full px-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={isGeneratingAi || !aiGoal.trim()}
          className="w-full sm:w-auto px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          {isGeneratingAi ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Decomposing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Backlog Cards</span>
            </>
          )}
        </button>
      </form>

      {aiStatusMessage && (
        <div className="text-xs text-indigo-600 dark:text-indigo-400 font-mono flex items-center gap-1.5 px-1 animate-pulse">
          <Sparkles className="w-3 h-3" />
          <span>{aiStatusMessage}</span>
        </div>
      )}

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.key);

          return (
            <div
              key={col.key}
              className="rounded-2xl bg-neutral-100/60 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 p-4 min-h-[500px] flex flex-col"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200/80 dark:border-neutral-800/80">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-neutral-950 dark:text-white">
                    {col.label}
                  </h3>
                  <span className="text-xs text-neutral-500 font-mono tabular-nums">
                    {colTasks.length}
                  </span>
                </div>
              </div>

              {/* Task Cards Container */}
              <div className="space-y-3 flex-1">
                {colTasks.length === 0 ? (
                  <div className="py-12 text-center text-xs text-neutral-400">
                    No tasks in {col.label.toLowerCase()}
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-all group"
                    >
                      {/* Priority Tag & Actions */}
                      <div className="flex items-center justify-between gap-2 mb-2 text-[11px]">
                        <span
                          className={`font-semibold capitalize ${
                            task.priority === 'high'
                              ? 'text-rose-600 dark:text-rose-400'
                              : task.priority === 'medium'
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-neutral-500 dark:text-neutral-400'
                          }`}
                        >
                          {task.priority} Priority
                        </span>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="text-neutral-400 hover:text-rose-600 p-0.5 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-neutral-950 dark:text-white leading-snug mb-1.5">
                        {task.title}
                      </h4>

                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3 line-clamp-3">
                        {task.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-1 text-[10px] text-neutral-500 mb-3">
                        {task.tags.map((tag, i) => (
                          <span key={i} className="text-neutral-600 dark:text-neutral-400">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer: Assignee, Hours, Movement Controls */}
                      <div className="pt-2.5 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={task.assignee.avatar}
                            alt={task.assignee.name}
                            referrerPolicy="no-referrer"
                            className="w-5 h-5 rounded-full object-cover shrink-0 ring-1 ring-neutral-300 dark:ring-neutral-700"
                          />
                          <span className="text-[10px] text-neutral-600 dark:text-neutral-400 truncate max-w-[80px]">
                            {task.assignee.name.split(' ')[0]}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-mono tabular-nums mr-1">
                            <Clock className="w-3 h-3 text-neutral-400" />
                            <span>{task.estimatedHours}h</span>
                          </div>

                          {col.key !== 'todo' && (
                            <button
                              onClick={() => handleMoveTask(task.id, 'prev')}
                              title="Move left"
                              className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {col.key !== 'done' && (
                            <button
                              onClick={() => handleMoveTask(task.id, 'next')}
                              title="Advance task"
                              className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-neutral-950 dark:text-white mb-4">
              Add New Sprint Task
            </h3>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Implement OAuth PKCE authorization code exchange"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                  Task Description
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={3}
                  placeholder="Technical acceptance criteria and implementation notes..."
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                    Estimate (Hours)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newHours}
                    onChange={(e) => setNewHours(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                  Assignee
                </label>
                <select
                  value={selectedAssignee}
                  onChange={(e) => setSelectedAssignee(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                >
                  {collaborators.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.role})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Backend, Security, API"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg cursor-pointer"
                >
                  Create Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
