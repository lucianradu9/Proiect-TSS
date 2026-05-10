cd /home/lucian/Documents/Proiect-TSS

cat > project/strategie-testare.md <<'EOF'
# Strategie de testare

## 1. Obiectivul testării

Obiectivul testării este verificarea funcționalităților JavaScript/React din aplicația Kanban Board.

Aplicația permite organizarea task-urilor, afișarea cardurilor, filtrarea task-urilor, salvarea datelor în LocalStorage și interacțiuni de tip drag-and-drop.

Testarea se concentrează pe testare unitară. Scopul este verificarea izolată a unor funcții, hook-uri și componente React, fără a testa aplicația printr-un browser real și fără a implica un backend.

## 2. Framework-uri și tool-uri utilizate

Pentru testare au fost utilizate următoarele tool-uri:

- Vitest - framework de testare unitară pentru JavaScript;
- React Testing Library - bibliotecă pentru testarea componentelor React;
- jsdom - mediu DOM simulat pentru rularea testelor în Node.js;
- @testing-library/jest-dom - extensii pentru aserțiuni DOM;
- @testing-library/user-event - simularea interacțiunilor utilizatorului;
- @vitest/coverage-v8 - generarea raportului de coverage.

Vitest a fost ales deoarece se integrează bine cu aplicațiile Vite și permite rularea rapidă a testelor. React Testing Library a fost folosit pentru testarea componentelor React din perspectiva comportamentului observabil al utilizatorului.

## 3. Module selectate pentru testare

Au fost selectate următoarele module:

```text
src/utils/helpers.js
src/utils/data.js
src/hooks/useLocalStorage.js
src/components/Card.jsx
```

Testele corespunzătoare sunt:

```text
tests/utils/helpers.test.js
tests/utils/data.test.js
tests/hooks/useLocalStorage.test.jsx
tests/components/Card.test.jsx
```

Aceste module au fost alese deoarece acoperă tipuri diferite de logică:

- funcții utilitare pure;
- generare de date;
- interacțiune cu LocalStorage;
- hook React personalizat;
- componentă React;
- interacțiuni ale utilizatorului;
- callback-uri pentru editare, ștergere și drag-and-drop.

## 4. Strategia generală

Strategia de testare a fost împărțită în patru direcții principale:

1. Testarea funcțiilor pure din `helpers.js`;
2. Testarea funcțiilor de creare și inițializare date din `data.js`;
3. Testarea hook-ului `useLocalStorage.js`;
4. Testarea componentei React `Card.jsx`.

## 5. Testarea funcțiilor utilitare

Pentru `helpers.js` au fost testate funcțiile:

- `generateId`;
- `formatDate`;
- `filterTasks`.

### 5.1 Funcția `generateId`

Scopul testării a fost verificarea faptului că funcția returnează un identificator valid.

Cazuri testate:

| Caz de test | Input | Rezultat așteptat |
|---|---|---|
| ID valid | apel funcție | rezultatul este string nevid |
| ID-uri diferite | două apeluri succesive | rezultatele sunt diferite |

### 5.2 Funcția `formatDate`

Scopul testării a fost verificarea formatării relative a datelor.

Cazuri testate:

| Caz de test | Situație | Rezultat așteptat |
|---|---|---|
| Dată foarte recentă | diferență 0 minute | `just now` |
| Diferență în minute | diferență 10 minute | `10m ago` |
| Diferență în ore | diferență 3 ore | `3h ago` |
| Diferență în zile | diferență 3 zile | `3d ago` |

Pentru aceste teste a fost folosit `vi.useFakeTimers()` și `vi.setSystemTime()` pentru controlul timpului curent.

### 5.3 Funcția `filterTasks`

Scopul testării a fost verificarea filtrării task-urilor după criterii diferite.

Cazuri testate:

| Caz de test | Filtru aplicat | Rezultat așteptat |
|---|---|---|
| Fără filtre | obiect filtru gol | toate task-urile sunt returnate |
| Filtrare după titlu | `search: "login"` | se returnează task-ul corespunzător |
| Filtrare după descriere | `search: "readme"` | se returnează task-ul corespunzător |
| Filtrare după prioritate | `priority: "high"` | se returnează task-urile cu prioritate high |
| Filtrare după label | `label: "feature"` | se returnează task-urile cu label-ul respectiv |
| Filtrare combinată | search + priority + label | se returnează doar task-ul care respectă toate condițiile |
| Niciun rezultat | filtru fără potriviri | se returnează listă goală |

## 6. Testarea generării datelor

Pentru `data.js` au fost testate:

- `createCard`;
- `getDefaultBoard`.

### 6.1 Funcția `createCard`

Cazuri testate:

| Caz de test | Input | Rezultat așteptat |
|---|---|---|
| Card cu date complete | titlu, descriere, coloană, label-uri, prioritate | cardul conține valorile primite |
| Card cu date parțiale | titlu și coloană | se folosesc valori implicite pentru câmpurile opționale |

S-a verificat că un card nou conține:

- `id`;
- `title`;
- `description`;
- `column`;
- `labels`;
- `priority`;
- `createdAt`.

### 6.2 Funcția `getDefaultBoard`

Cazuri testate:

| Caz de test | Rezultat așteptat |
|---|---|
| Board inițial | conține coloanele implicite |
| Carduri inițiale | fiecare card are valori valide |
| Priorități | fiecare prioritate este inclusă în lista de priorități acceptate |
| Label-uri | fiecare label este inclus în lista de label-uri acceptate |

## 7. Testarea hook-ului `useLocalStorage`

Hook-ul `useLocalStorage` a fost testat deoarece reprezintă o parte importantă a aplicației: persistența locală a datelor.

Cazuri testate:

| Caz de test | Situație | Rezultat așteptat |
|---|---|---|
| LocalStorage gol | cheia nu există | se returnează valoarea inițială |
| Valoare existentă | cheia există în LocalStorage | se returnează valoarea salvată |
| Actualizare valoare | se apelează setter-ul | valoarea se actualizează și se salvează |
| Resetare valoare | se apelează funcția de reset | se revine la valoarea inițială |
| JSON invalid | LocalStorage conține JSON invalid | se folosește valoarea fallback |

## 8. Testarea componentei `Card.jsx`

Componenta `Card` a fost testată cu React Testing Library.

Cazuri testate:

| Caz de test | Acțiune | Rezultat așteptat |
|---|---|---|
| Afișare card | randare componentă | titlul, descrierea și label-urile sunt afișate |
| Editare card | click pe butonul de editare | se apelează callback-ul `onEdit` |
| Ștergere card | click pe butonul de ștergere | se apelează callback-ul `onDelete` |
| Drag-and-drop | eveniment `dragstart` | se apelează callback-ul `onDragStart` |

Pentru callback-uri au fost folosite funcții mock create cu `vi.fn()`.

## 9. Partiționare în clase de echivalență

Pentru funcția `filterTasks`, datele au fost împărțite în clase de echivalență:

| Clasă de echivalență | Exemplu | Comportament așteptat |
|---|---|---|
| Task-uri care respectă filtrul | task cu titlu care conține textul căutat | task-ul este returnat |
| Task-uri care nu respectă filtrul | task fără potrivire | task-ul este exclus |
| Filtru gol | `{}` | toate task-urile sunt returnate |
| Filtru după prioritate | `priority: "high"` | doar task-urile cu prioritate high sunt returnate |
| Filtru după label | `label: "feature"` | doar task-urile cu label-ul respectiv sunt returnate |
| Filtru combinat | search + priority + label | doar task-urile care respectă toate condițiile sunt returnate |

Pentru `useLocalStorage`, clasele de echivalență au fost:

| Clasă de echivalență | Exemplu |
|---|---|
| Cheie inexistentă | LocalStorage nu conține cheia |
| Cheie existentă validă | LocalStorage conține JSON valid |
| Cheie existentă invalidă | LocalStorage conține JSON invalid |

## 10. Analiza valorilor de frontieră

Analiza valorilor de frontieră a fost aplicată în special pentru funcția `formatDate`.

Au fost testate diferențe de timp la limite logice:

| Frontieră | Caz testat |
|---|---|
| Diferență foarte mică | `just now` |
| Diferență sub o oră | minute |
| Diferență sub o zi | ore |
| Diferență sub o săptămână | zile |

Pentru `useLocalStorage`, un caz de frontieră relevant este situația în care LocalStorage conține un string care nu poate fi parsat ca JSON valid.

## 11. Acoperire la nivel de instrucțiune

Coverage-ul la nivel de instrucțiune obținut a fost:

```text
Statements: 97.91%
```

Acest rezultat arată că aproape toate instrucțiunile din modulele incluse în testare au fost executate cel puțin o dată în timpul rulării testelor.

## 12. Acoperire la nivel de decizie / ramură

Coverage-ul la nivel de ramură obținut a fost:

```text
Branches: 88.88%
```

Acoperirea pe ramuri este mai mică decât cea pe instrucțiuni deoarece există câteva condiții secundare care nu au fost acoperite complet în `Card.jsx` și `helpers.js`.

## 13. Acoperire la nivel de funcție

Coverage-ul la nivel de funcție obținut a fost:

```text
Functions: 100%
```

Acest rezultat indică faptul că toate funcțiile din modulele testate au fost apelate cel puțin o dată în timpul testelor.

## 14. Rezultatele testelor

Rularea testelor a produs următorul rezultat:

```text
4 fișiere de test trecute
26 teste trecute
0 teste eșuate
```

Fișierele de test rulate au fost:

```text
tests/utils/data.test.js
tests/utils/helpers.test.js
tests/hooks/useLocalStorage.test.jsx
tests/components/Card.test.jsx
```

## 15. Rezultatele coverage

Rezultatele coverage obținute au fost:

| Metrica | Valoare |
|---|---:|
| Statements | 97.91% |
| Branches | 88.88% |
| Functions | 100% |
| Lines | 97.72% |

Pe fișiere, rezultatele au fost:

| Fișier | Statements | Branches | Functions | Lines |
|---|---:|---:|---:|---:|
| `Card.jsx` | 100% | 83.33% | 100% | 100% |
| `useLocalStorage.js` | 100% | 100% | 100% | 100% |
| `data.js` | 100% | 100% | 100% | 100% |
| `helpers.js` | 95.23% | 88% | 100% | 94.11% |

## 16. Interpretarea rezultatelor

Rezultatele arată că suita de teste acoperă modulele selectate.

Cele mai bune rezultate au fost obținute pentru:

- `useLocalStorage.js`;
- `data.js`;
- `Card.jsx`.

Aceste fișiere au coverage de 100% pe instrucțiuni sau funcții.

Fișierul `helpers.js` are o acoperire mai mică, deoarece unele ramuri secundare nu au fost executate în testele existente. Totuși, funcțiile principale au fost testate, iar comportamentele relevante pentru aplicație sunt acoperite.


## 17. Concluzie

Strategia de testare aplicată a permis verificarea unor componente importante ale aplicației Kanban Board.

Prin testele implementate au fost acoperite funcții utilitare, generarea datelor inițiale, persistența în LocalStorage și comportamentul componentei `Card`.

Rezultatele obținute confirmă faptul că suita de teste este stabilă, toate testele trec cu succes, iar coverage-ul obținut este ridicat.

