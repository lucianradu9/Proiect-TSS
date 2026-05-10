import { useState, useEffect, useRef } from "react";
import { PRIORITIES, LABELS, COLUMNS } from "../utils/constants";

export default function TaskForm({ task, defaultColumn, onSave, onClose }) {
  const isEditing = !!task;
  const titleRef = useRef(null);

  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    labels: task?.labels || [],
    column: task?.column || defaultColumn || COLUMNS[0].id,
  });

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({
      ...(task || {}),
      ...form,
      title: form.title.trim(),
    });
  };

  const toggleLabel = (labelId) => {
    setForm((prev) => ({
      ...prev,
      labels: prev.labels.includes(labelId)
        ? prev.labels.filter((l) => l !== labelId)
        : [...prev.labels, labelId],
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2>{isEditing ? "Edit Task" : "New Task"}</h2>
          <button className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              ref={titleRef}
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Task title..."
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Optional description..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="column">Column</label>
            <select
              id="column"
              value={form.column}
              onChange={(e) => setForm({ ...form, column: e.target.value })}
            >
              {COLUMNS.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Priority</label>
            <div className="radio-group">
              {PRIORITIES.map((p) => (
                <label
                  key={p.id}
                  className={`radio-pill ${form.priority === p.id ? "radio-pill--active" : ""}`}
                  style={
                    form.priority === p.id
                      ? { backgroundColor: p.color + "22", borderColor: p.color }
                      : {}
                  }
                >
                  <input
                    type="radio"
                    name="priority"
                    value={p.id}
                    checked={form.priority === p.id}
                    onChange={(e) =>
                      setForm({ ...form, priority: e.target.value })
                    }
                  />
                  <span style={{ color: p.color }}>● </span>
                  {p.label}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Labels</label>
            <div className="checkbox-group">
              {LABELS.map((l) => (
                <label
                  key={l.id}
                  className={`checkbox-pill ${form.labels.includes(l.id) ? "checkbox-pill--active" : ""}`}
                  style={
                    form.labels.includes(l.id)
                      ? { backgroundColor: l.color + "22", borderColor: l.color }
                      : {}
                  }
                >
                  <input
                    type="checkbox"
                    checked={form.labels.includes(l.id)}
                    onChange={() => toggleLabel(l.id)}
                  />
                  {l.label}
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              {isEditing ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
