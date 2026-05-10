/**
 * Generate a short unique ID.
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

/**
 * Format a timestamp as a relative or absolute date string.
 */
export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Filter tasks by search query, priority, and label.
 */
export function filterTasks(tasks, { search = "", priority = "", label = "" }) {
  return tasks.filter((task) => {
    const matchSearch =
      !search ||
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      (task.description || "").toLowerCase().includes(search.toLowerCase());

    const matchPriority = !priority || task.priority === priority;
    const matchLabel = !label || (task.labels || []).includes(label);

    return matchSearch && matchPriority && matchLabel;
  });
}
