# GitHub Copilot Instructions for Soc Ops

**Mandatory Development Checklist (before commit):**
- [ ] `npm run lint` — ESLint passes
- [ ] `npm run build` — TypeScript + Vite success
- [ ] `npm run test` — All tests pass

---

## Project Overview

Social bingo game for in-person networking. Players find matches to questions ("bikes to work", "speaks 3+ languages"), tap squares to mark them, and win with 5 in a row.

**Stack**: React 19 + TypeScript + Vite + Tailwind CSS v4 + Vitest | **Deployment**: GitHub Pages (auto on `main` push)

## Architecture Overview

### Core Component Hierarchy

```
App
├── StartScreen (initial game state)
└── GameScreen (playing state + bingo state)
    ├── BingoBoard
    │   └── BingoSquare (x25)
    └── BingoModal (overlay on bingo completion)
```

### State Management

**Hook**: `useBingoGame` ([src/hooks/useBingoGame.ts](src/hooks/useBingoGame.ts)) — Single source of truth, manages `'start' | 'playing' | 'bingo'` states, persists to localStorage with strict validation.

**Data**: [src/data/questions.ts](src/data/questions.ts) (24 questions), [src/types/index.ts](src/types/index.ts) (`BingoSquareData`, `BingoLine`, `GameState`)

### Game Logic

Pure functions in [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts): `generateBoard()`, `toggleSquare()`, `checkBingo()`, `getWinningSquareIds()`. **All mutations immutable** (map/spread).

### Styling & Theme

Tailwind CSS v4 with custom theme in [src/index.css](src/index.css): `--color-accent` (#2563eb), `--color-marked` (#dcfce7), `--color-bingo` (#fbbf24). Use Tailwind classes; avoid hardcoding colors.

## Developer Workflows

**Dev**: `npm run dev` (http://localhost:5173 with HMR)
**Build**: `npm run build` (TypeScript + Vite)
**Test**: `npm run test` (Vitest + jsdom, setup in [src/test/setup.ts](src/test/setup.ts))
**Lint**: `npm run lint` (ESLint strict mode)

Tests in [src/utils/bingoLogic.test.ts](src/utils/bingoLogic.test.ts); add component tests as `.test.tsx` files.

## Critical Patterns

**1. Immutable State** — Use map/spread, never mutate: `board.map(sq => sq.id === id ? {...sq, isMarked: !sq.isMarked} : sq)`

**2. Async Updates** — Use `queueMicrotask()` when detecting bingo to batch state updates (prevents React warnings).

**3. Validation** — Always validate external data (localStorage, APIs). Hook includes strict type guards.

**4. Props Only** — Components pure, no context/Redux. Pass all state + handlers via props.

**5. Accessibility** — Add `aria-label`, `aria-pressed` to interactive elements.

**6. Styling** — Concat className strings for readability: `\`${baseClasses} ${stateClasses}\``

**7. TypeScript Strict** — `noUnusedLocals: true`, strict null checks. Unused vars/imports cause build failure.

## Integration Points

**New game state**: Update type in [src/types/index.ts](src/types/index.ts), hook logic, validation.
**New winning condition**: Add to `getWinningLines()` in [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts).
**New questions**: Replace array in [src/data/questions.ts](src/data/questions.ts) (need 24+).
**Styling**: Edit theme vars in [src/index.css](src/index.css), use Tailwind classes.
**Testing**: Add to [src/utils/bingoLogic.test.ts](src/utils/bingoLogic.test.ts) or create `.test.tsx` files.

## Build Artifacts & Deployment

**Output Directory**: `dist/`
- Vite bundles to `dist/index.html`, `dist/*.js`, `dist/*.css`
- Base path injected: If deployed to `github.com/user/soc-ops/`, base becomes `/soc-ops/`
- GitHub Actions deploys `dist/` to `gh-pages` branch on `main` push

**Local Preview**: `npm run build && npx http-server dist`

## External Dependencies & Versions

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.0 | UI framework |
| tailwindcss | ^4.1.17 | CSS framework (v4 features: variables, nesting) |
| @tailwindcss/vite | ^4.1.17 | Vite integration for Tailwind |
| vitest | ^4.0.15 | Unit test runner |
| @testing-library/react | ^16.3.0 | Component test utilities |
| typescript | ~5.9.3 | Type checking |
| vite | ^7.2.4 | Build tool & dev server |
| eslint | ^9.39.1 | Linting (React + TS rules) |

## Build Artifacts & Deployment

**Output Directory**: `dist/`
- Vite bundles to `dist/index.html`, `dist/*.js`, `dist/*.css`
- Base path injected: If deployed to `github.com/user/soc-ops/`, base becomes `/soc-ops/`
- GitHub Actions deploys `dist/` to `gh-pages` branch on `main` push

**Local Preview**: `npm run build && npx http-server dist`

## File Structure

```
src/App.tsx                    // Root; state management → StartScreen | GameScreen
src/components/
  ├── StartScreen.tsx          // Welcome + play button
  ├── GameScreen.tsx           // Header, board, modal overlay
  ├── BingoBoard.tsx           // 5×5 grid layout
  ├── BingoSquare.tsx          // Single button (marked/unmarked/free)
  └── BingoModal.tsx           // Bingo celebration overlay
src/hooks/useBingoGame.ts      // State hook + localStorage
src/utils/bingoLogic.ts        // Pure game logic functions
src/utils/bingoLogic.test.ts   // ~220 unit tests
src/data/questions.ts          // 24 bingo questions + FREE_SPACE
src/types/index.ts             // BingoSquareData, BingoLine, GameState
src/index.css                  // Tailwind @import + theme variables
```

**Config**: TypeScript (ES2022, react-jsx, strict), Vite (HMR, auto base path), Vitest (globals, jsdom)