# Proiect TSS - Tema 4: Testare unitară în JavaScript

Acest repo conține proiectul pentru tema 4 din cadrul materiei Testarea Sistemelor Software.

Tema aleasă:

```text
T4 - Testare unitară în JavaScript
```

Scopul proiectului este testarea unitară a unor componente JavaScript/React dintr-o aplicație frontend-only de tip Kanban Board.

## Structura repository-ului

```text
Proiect-TSS/
├── app/
│   ├── src/
│   ├── tests/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── project/
│   ├── coverage/
│   ├── diagrame/
│   ├── screenshots/
│   ├── README.md
│   ├── strategie-testare.md
│   ├── raport-ai.md
│   └── referinte.md
│
└── README.md
```

## Conținut

- `app/src/` - codul sursă al aplicației;
- `app/tests/` - testele unitare implementate;
- `project/` - documentația proiectului;
- `project/README.md` - raportul principal al proiectului;
- `project/strategie-testare.md` - strategia de testare;
- `project/raport-ai.md` - raportul despre utilizarea unui tool AI;
- `project/referinte.md` - referințele bibliografice;
- `project/screenshots/` - capturi de ecran;
- `project/diagrame/` - diagrama de arhitectură;
- `project/coverage/` - raportul HTML de coverage.

## Aplicația testată

Aplicația testată este o aplicație open-source frontend-only de tip Kanban Board, dezvoltată cu React și Vite.

Aplicația permite:

- afișarea task-urilor în coloane;
- gestionarea cardurilor;
- filtrarea task-urilor;
- salvarea datelor în LocalStorage;
- interacțiuni de tip drag-and-drop.

## Tehnologii folosite

- JavaScript
- React
- Vite
- Vitest
- React Testing Library
- jsdom
- @testing-library/jest-dom
- @testing-library/user-event
- @vitest/coverage-v8

## Instalare dependițe

```bash
cd app
npm install
```

## Rulare aplicație

```bash
cd app
npm run dev
```

Aplicația va rula local, la URL-ul:

```text
http://localhost:5173
```

## Rulare teste

```bash
cd app
npm run test:run
```

Rezultatul obținut:

```text
4 fișiere de test trecute
26 teste trecute
0 teste eșuate
```

## Rulare coverage

```bash
cd app
npm run coverage
```

Rezultatele coverage obținute:

| Metrica | Valoare |
|---|---:|
| Statements | 97.91% |
| Branches | 88.88% |
| Functions | 100% |
| Lines | 97.72% |

Raportul HTML de coverage este generat în:

```text
project/coverage/
```

## Documentație

Documentația completă se află în directorul:

```text
project/
```

Fișierul principal de documentație este:

```text
project/README.md
```

## Raport AI

Raportul despre utilizarea ChatGPT în procesul de testare software:

```text
project/raport-ai.md
```

Acesta include promptul folosit, testele generate, rularea acestora, comparația cu testele proprii și interpretarea rezultatelor.

## Referințe

Referințele bibliografice se află în:

```text
project/referinte.md
```
