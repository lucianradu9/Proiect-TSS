import { useState, useCallback } from "react";

export function useDragAndDrop(onCardMove) {
  const [draggedCardId, setDraggedCardId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleDragStart = useCallback((e, cardId) => {
    setDraggedCardId(cardId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", cardId);
    // Add slight delay for visual feedback
    requestAnimationFrame(() => {
      e.target.classList.add("dragging");
    });
  }, []);

  const handleDragEnd = useCallback((e) => {
    e.target.classList.remove("dragging");
    setDraggedCardId(null);
    setDragOverColumn(null);
  }, []);

  const handleDragOver = useCallback((e, columnName) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(columnName);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverColumn(null);
  }, []);

  const handleDrop = useCallback(
    (e, targetColumn) => {
      e.preventDefault();
      const cardId = e.dataTransfer.getData("text/plain");
      if (cardId && onCardMove) {
        onCardMove(cardId, targetColumn);
      }
      setDraggedCardId(null);
      setDragOverColumn(null);
    },
    [onCardMove]
  );

  return {
    draggedCardId,
    dragOverColumn,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}
