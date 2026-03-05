# 🎯 Soc Ops — Social Bingo

> **Break the ice. Make connections. Win at networking.**

A lightweight React app that turns any in-person mixer into a game. Each player gets a randomised bingo card full of conversation starters — find people who match each prompt, tap to mark the square, and score **5 in a row** to win!

[![Deploy to GitHub Pages](https://img.shields.io/badge/deploy-GitHub_Pages-blue?logo=github)](https://pages.github.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/tested_with-Vitest-6e9f18?logo=vitest)](https://vitest.dev/)

---

## ✨ Features

| | |
|---|---|
| 🎲 **Randomised boards** | Every player gets a unique card — no two games the same |
| ⭐ **Free centre space** | Classic bingo rules right out of the box |
| ⚡ **Instant win detection** | Rows, columns, and diagonals — all checked in real time |
| 📱 **Mobile-first** | Tap to mark squares on any phone or tablet |
| 🛠️ **Fully customisable** | Swap in your own prompts in one file |
| ✅ **Well tested** | 220+ unit tests covering all game logic |

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the live dev server
npm run dev
```

Open **http://localhost:5173** — the app hot-reloads as you edit.

---

## 🕹️ How to Play

1. **Start** — Hit the play button to generate your bingo card.
2. **Mingle** — Find people who match each prompt on your card.
3. **Mark** — Tap a square every time you find a match.
4. **Win** — Complete a horizontal, vertical, or diagonal line.
5. **Replay** — Hit the back button for a fresh randomised card.

---

## 🎨 Customise Your Event

Edit **`src/data/questions.ts`** to tailor the prompts for your audience:

```typescript
export const questions = [
  'Started a company',
  'Written a book',
  'Learned a new language this year',
  // Add as many as you like — the board picks 24 at random
];
```

Colours live in `src/index.css` as CSS custom properties — swap `--color-accent`, `--color-marked`, and `--color-bingo` to match your brand in seconds.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| UI | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Build | [Vite](https://vite.dev/) |
| Testing | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) |
| Linting | [ESLint](https://eslint.org/) (strict mode) |

---

## 🧪 Tests & Quality

```bash
npm run test    # Run the full test suite
npm run lint    # Check code quality
npm run build   # Production build + type-check
```

---

## 🌐 Deploy

Pushing to `main` automatically publishes the app to **GitHub Pages** via the included Actions workflow:

```
https://<your-username>.github.io/<your-repo>/
```

Enable it once under **Settings → Pages → GitHub Actions**, then every push ships the latest version automatically.

---

## 📋 Prerequisites

- [Node.js 22](https://nodejs.org/) or higher

---

## 🤝 Contributing

Pull requests are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines. Questions? Open an issue or check [SUPPORT.md](SUPPORT.md).

