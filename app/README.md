# 📋 React Kanban Board

A drag-and-drop task board built with React. Features multiple columns, card management, filtering, labels, and LocalStorage persistence — no backend needed.

## Features

- **Drag & Drop** — Move cards between columns with native HTML5 drag API (no library dependencies)
- **CRUD** — Create, edit, and delete cards with title, description, labels, and priority
- **Filtering** — Filter by label, priority, or search text
- **Persistence** — All data saved to LocalStorage automatically
- **Keyboard Accessible** — Full keyboard navigation support
- **Responsive** — Works on desktop and tablet

## Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/react-kanban-board.git
cd react-kanban-board
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

## Project Structure

```
react-kanban-board/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Board.jsx           # Main board layout
│   │   ├── Column.jsx          # Single column (droppable)
│   │   ├── Card.jsx            # Task card (draggable)
│   │   ├── CardModal.jsx       # Add/edit card form
│   │   └── FilterBar.jsx       # Search + filter controls
│   ├── hooks/
│   │   ├── useLocalStorage.js  # Persistent state hook
│   │   └── useDragAndDrop.js   # DnD logic hook
│   ├── utils/
│   │   └── data.js             # Default board data & helpers
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

## Default Columns

| Column | Purpose |
|--------|---------|
| Backlog | Ideas and future tasks |
| To Do | Planned for current sprint |
| In Progress | Actively being worked on |
| Done | Completed tasks |

## Customization

Edit `src/utils/data.js` to change default columns, labels, and priorities:

```js
export const DEFAULT_COLUMNS = ["Backlog", "To Do", "In Progress", "Done"];

export const LABELS = ["feature", "bug", "docs", "refactor", "test"];

export const PRIORITIES = ["low", "medium", "high", "urgent"];
```

## Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |

## Tech Stack

- React 18 with Hooks
- Vite for build tooling
- HTML5 Drag and Drop API (zero dependencies)
- CSS Modules for scoped styling
- LocalStorage for persistence

## License

MIT
