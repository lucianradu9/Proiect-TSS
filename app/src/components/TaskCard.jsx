import { PRIORITIES, LABELS } from "../utils/constants";
import { formatDate } from "../utils/helpers";

export default function TaskCard({
  task,
  columnId,
  onDragStart,
  onDragEnd,
  onEdit,
  onDelete,
  isDragging,
}) {
  const priority = PRIORITIES.find((p) => p.id === task.priority);
  const taskLabels = (task.labels || [])
    .map((id) => LABELS.find((l) => l.id === id))
    .filter(Boolean);

  return (
    <div
      className={`task-card ${isDragging ? "task-card--dragging" : ""}`}
      draggable
      onDragStart={(e) => onDragStart(e, task.id, columnId)}
      onDragEnd={onDragEnd}
    >
      <div className="task-card__header">
        <div className="task-card__labels">
          {taskLabels.map((label) => (
            <span
              key={label.id}
              className="task-card__label"
              style={{ backgroundColor: label.color + "22", color: label.color }}
            >
              {label.label}
            </span>
          ))}
        </div>
        <div className="task-card__actions">
          <button
            className="task-card__btn"
            onClick={() => onEdit(task)}
            title="Edit"
          >
            ✏️
          </button>
          <button
            className="task-card__btn"
            onClick={() => onDelete(task.id)}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      <h3 className="task-card__title">{task.title}</h3>

      {task.description && (
        <p className="task-card__desc">{task.description}</p>
      )}

      <div className="task-card__footer">
        {priority && (
          <span
            className="task-card__priority"
            style={{ color: priority.color }}
          >
            ● {priority.label}
          </span>
        )}
        <span className="task-card__date">{formatDate(task.createdAt)}</span>
      </div>
    </div>
  );
}
