import { useState, useEffect, useRef } from "react";
import { LABELS, PRIORITIES, LABEL_COLORS, PRIORITY_COLORS } from "../utils/data";

export default function CardModal({ card, column, onSave, onClose }) {
  const isEditing = !!card?.id;
  const titleRef = useRef(null);

  const [form, setForm] = useState({
    title: card?.title || "",
    description: card?.description || "",
    labels: card?.labels || [],
    priority: card?.priority || "medium",
  });

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const toggleLabel = (label) => {
    setForm((prev) => ({
      ...prev,
      labels: prev.labels.includes(label)
        ? prev.labels.filter((l) => l !== label)
        : [...prev.labels, label],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    onSave({
      ...(card || {}),
      ...form,
      column: card?.column || column,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={isEditing ? "Edit card" : "Add card"}>
        <div className="modal-header">
          <h2>{isEditing ? "Edit Card" : "New Card"}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="card-title">Title</label>
            <input
              ref={titleRef}
              id="card-title"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Card title"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="card-desc">Description</label>
            <textarea
              id="card-desc"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Optional description"
              rows={3}
            />
          </div>

          <div className="form-field">
            <label>Labels</label>
            <div className="chip-group">
              {LABELS.map((label) => (
                <button
                  key={label}
                  type="button"
                  className={`filter-chip ${form.labels.includes(label) ? "active" : ""}`}
                  style={{ "--chip-color": LABEL_COLORS[label] }}
                  onClick={() => toggleLabel(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-field">
            <label>Priority</label>
            <div className="chip-group">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`filter-chip ${form.priority === p ? "active" : ""}`}
                  style={{ "--chip-color": PRIORITY_COLORS[p] }}
                  onClick={() => setForm({ ...form, priority: p })}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEditing ? "Save" : "Add Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
