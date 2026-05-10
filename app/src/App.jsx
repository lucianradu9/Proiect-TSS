import { useState, useMemo, useCallback } from "react";
import Board from "./components/Board";
import FilterBar from "./components/FilterBar";
import CardModal from "./components/CardModal";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { getDefaultBoard, createCard } from "./utils/data";

export default function App() {
  const [board, setBoard, resetBoard] = useLocalStorage("kanban-board", getDefaultBoard());
  const [filters, setFilters] = useState({ search: "", labels: [], priority: [] });
  const [modal, setModal] = useState(null); // { mode: "add" | "edit", column?, card? }

  // ── Filtering ──────────────────────────────────────────────
  const filteredCards = useMemo(() => {
    return board.cards.filter((card) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!card.title.toLowerCase().includes(q) && !card.description.toLowerCase().includes(q)) {
          return false;
        }
      }
      if (filters.labels?.length > 0) {
        if (!card.labels.some((l) => filters.labels.includes(l))) {
          return false;
        }
      }
      if (filters.priority?.length > 0) {
        if (!filters.priority.includes(card.priority)) {
          return false;
        }
      }
      return true;
    });
  }, [board.cards, filters]);

  // ── Card operations ────────────────────────────────────────
  const handleCardMove = useCallback(
    (cardId, targetColumn) => {
      setBoard((prev) => ({
        ...prev,
        cards: prev.cards.map((c) => (c.id === cardId ? { ...c, column: targetColumn } : c)),
      }));
    },
    [setBoard]
  );

  const handleAddCard = useCallback((column) => {
    setModal({ mode: "add", column });
  }, []);

  const handleEditCard = useCallback((card) => {
    setModal({ mode: "edit", card });
  }, []);

  const handleDeleteCard = useCallback(
    (cardId) => {
      setBoard((prev) => ({
        ...prev,
        cards: prev.cards.filter((c) => c.id !== cardId),
      }));
    },
    [setBoard]
  );

  const handleSaveCard = useCallback(
    (cardData) => {
      setBoard((prev) => {
        if (cardData.id) {
          // Edit existing
          return {
            ...prev,
            cards: prev.cards.map((c) => (c.id === cardData.id ? { ...c, ...cardData } : c)),
          };
        }
        // Create new
        return {
          ...prev,
          cards: [...prev.cards, createCard(cardData)],
        };
      });
    },
    [setBoard]
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>📋 Kanban Board</h1>
        <button className="btn-reset" onClick={resetBoard} title="Reset board to defaults">
          Reset Board
        </button>
      </header>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      <Board
        columns={board.columns}
        cards={filteredCards}
        onCardMove={handleCardMove}
        onAddCard={handleAddCard}
        onEditCard={handleEditCard}
        onDeleteCard={handleDeleteCard}
      />

      {modal && (
        <CardModal
          card={modal.mode === "edit" ? modal.card : null}
          column={modal.column}
          onSave={handleSaveCard}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
