import { LABEL_COLORS, PRIORITY_COLORS } from "../utils/data";

export default function Card({ card, onDragStart, onDragEnd, onEdit, onDelete, isDragging }) {
  return (
    <div
      className={`card ${isDragging ? "dragging" : ""}`}
      draggable
      onDragStart={(e) => onDragStart(e, card.id)}
      onDragEnd={onDragEnd}
      tabIndex={0}
      role="listitem"
      aria-label={`${card.title}, priority ${card.priority}`}
    >
      <div className="card-top">
        <span
          className="card-priority"
          style={{ background: PRIORITY_COLORS[card.priority] }}
          title={card.priority}
        />
        <div className="card-actions">
          <button className="card-btn" onClick={() => onEdit(card)} title="Edit" aria-label="Edit card">
            ✏️
          </button>
          <button className="card-btn" onClick={() => onDelete(card.id)} title="Delete" aria-label="Delete card">
            🗑
          </button>
        </div>
      </div>

      <h3 className="card-title">{card.title}</h3>

      {card.description && <p className="card-desc">{card.description}</p>}

      {card.labels.length > 0 && (
        <div className="card-labels">
          {card.labels.map((label) => (
            <span
              key={label}
              className="card-label"
              style={{ background: `${LABEL_COLORS[label]}30`, color: LABEL_COLORS[label] }}
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
