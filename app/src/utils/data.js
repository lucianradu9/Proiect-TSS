export const DEFAULT_COLUMNS = ["Backlog", "To Do", "In Progress", "Done"];

export const LABELS = ["feature", "bug", "docs", "refactor", "test"];

export const PRIORITIES = ["low", "medium", "high", "urgent"];

export const PRIORITY_COLORS = {
  low: "#6b7280",
  medium: "#3b82f6",
  high: "#f59e0b",
  urgent: "#ef4444",
};

export const LABEL_COLORS = {
  feature: "#8b5cf6",
  bug: "#ef4444",
  docs: "#06b6d4",
  refactor: "#f59e0b",
  test: "#22c55e",
};

let _idCounter = Date.now();

export function generateId() {
  return `card-${_idCounter++}`;
}

export function createCard({ title, description = "", column, labels = [], priority = "medium" }) {
  return {
    id: generateId(),
    title,
    description,
    column,
    labels,
    priority,
    createdAt: new Date().toISOString(),
  };
}

export function getDefaultBoard() {
  return {
    columns: DEFAULT_COLUMNS,
    cards: [
      createCard({ title: "Research competitors", column: "Backlog", labels: ["docs"], priority: "low" }),
      createCard({ title: "Design landing page", column: "To Do", labels: ["feature"], priority: "high" }),
      createCard({ title: "Set up CI/CD pipeline", column: "To Do", labels: ["refactor"], priority: "medium" }),
      createCard({ title: "Implement auth flow", column: "In Progress", labels: ["feature"], priority: "urgent" }),
      createCard({ title: "Write unit tests for API", column: "In Progress", labels: ["test"], priority: "medium" }),
      createCard({ title: "Fix login redirect bug", column: "In Progress", labels: ["bug"], priority: "high" }),
      createCard({ title: "Update README", column: "Done", labels: ["docs"], priority: "low" }),
    ],
  };
}
