import Column from "./Column";
import { useDragAndDrop } from "../hooks/useDragAndDrop";

export default function Board({
  columns,
  cards,
  onCardMove,
  onAddCard,
  onEditCard,
  onDeleteCard,
}) {
  const {
    draggedCardId,
    dragOverColumn,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useDragAndDrop(onCardMove);

  return (
    <div className="board">
      {columns.map((colName) => (
        <Column
          key={colName}
          name={colName}
          cards={cards.filter((c) => c.column === colName)}
          isDropTarget={dragOverColumn === colName}
          draggedCardId={draggedCardId}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onAddCard={onAddCard}
          onEditCard={onEditCard}
          onDeleteCard={onDeleteCard}
        />
      ))}
    </div>
  );
}
