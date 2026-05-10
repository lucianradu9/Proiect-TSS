import { LABELS, PRIORITIES, LABEL_COLORS, PRIORITY_COLORS } from "../utils/data";

export default function FilterBar({ filters, onFilterChange }) {
  const handleSearch = (e) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const toggleLabel = (label) => {
    const current = filters.labels || [];
    const next = current.includes(label)
      ? current.filter((l) => l !== label)
      : [...current, label];
    onFilterChange({ ...filters, labels: next });
  };

  const togglePriority = (priority) => {
    const current = filters.priority || [];
    const next = current.includes(priority)
      ? current.filter((p) => p !== priority)
      : [...current, priority];
    onFilterChange({ ...filters, priority: next });
  };

  const clearFilters = () => {
    onFilterChange({ search: "", labels: [], priority: [] });
  };

  const hasActiveFilters =
    filters.search || filters.labels?.length > 0 || filters.priority?.length > 0;

  return (
    <div className="filter-bar">
      <input
        type="text"
        className="filter-search"
        placeholder="Search cards..."
        value={filters.search || ""}
        onChange={handleSearch}
      />

      <div className="filter-group">
        <span className="filter-label">Labels:</span>
        {LABELS.map((label) => (
          <button
            key={label}
            className={`filter-chip ${filters.labels?.includes(label) ? "active" : ""}`}
            style={{
              "--chip-color": LABEL_COLORS[label],
            }}
            onClick={() => toggleLabel(label)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="filter-group">
        <span className="filter-label">Priority:</span>
        {PRIORITIES.map((p) => (
          <button
            key={p}
            className={`filter-chip ${filters.priority?.includes(p) ? "active" : ""}`}
            style={{
              "--chip-color": PRIORITY_COLORS[p],
            }}
            onClick={() => togglePriority(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {hasActiveFilters && (
        <button className="filter-clear" onClick={clearFilters}>
          Clear filters
        </button>
      )}
    </div>
  );
}
