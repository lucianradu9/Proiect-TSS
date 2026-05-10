import { useEffect } from "react";

export default function ConfirmDialog({ message, onConfirm, onCancel }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onCancel();
      if (e.key === "Enter") onConfirm();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onConfirm, onCancel]);

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal modal--small" onClick={(e) => e.stopPropagation()}>
        <p className="confirm__message">{message}</p>
        <div className="form-actions">
          <button className="btn btn--secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn--danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
