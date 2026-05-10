import Card from "./Card";

export default function Column({
  name,
  cards,
  isDropTarget,
  draggedCardId,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
  onAddCard,
  onEditCard,
  onDeleteCard,
}) {
  return (
    <div
      className={`column ${isDropTarget ? "drop-target" : ""}`}
      onDragOver={(e) => onDragOver(e, name)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, name)}
      role="list"
      aria-label={`${name} column, ${cards.length} cards`}
    >
      <div className="column-header">
        <h2 className="column-title">{name}</h2>
        <span className="column-count">{cards.length}</span>
      </div>

      <div className="column-cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isDragging={card.id === draggedCardId}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onEdit={onEditCard}
            onDelete={onDeleteCard}
          />
        ))}
      </div>

      <button className="add-card-btn" onClick={() => onAddCard(name)}>
        + Add card
      </button>
    </div>
  );
}
