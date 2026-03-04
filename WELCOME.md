# 🎮 Welcome to Soc Ops!

A social bingo game for in-person mixers. Find people who match the questions and get 5 in a row!

## What is this?

**Soc Ops** is an interactive React app that generates randomized bingo cards for social networking events. Players tap squares when they meet people matching each prompt — first to complete a line wins! 🎉

---

## 🚀 Quick Start

The development environment is ready to go:

```bash
npm run dev      # Start the live dev server (already running!)
npm run build    # Create production bundle
npm run test     # Run the test suite
npm run lint     # Check code quality
```

Your app is live at **http://localhost:5173/** — changes auto-refresh in the browser!

---

## 📖 How to Use the Game

1. **Start Screen** — Click the start button to generate your bingo card
2. **Find Matches** — Tap squares as you meet people matching each prompt
3. **Get Bingo** — Complete a horizontal, vertical, or diagonal line to win
4. **Play Again** — Hit the back button to generate a fresh card

---

## 🎯 Project Structure

```
src/
├── components/          # React UI components
│   ├── StartScreen.tsx  # Welcome & game start
│   ├── GameScreen.tsx   # Main game interface
│   ├── BingoBoard.tsx   # 5×5 grid display
│   ├── BingoSquare.tsx  # Individual square
│   └── BingoModal.tsx   # BINGO! celebration
├── hooks/
│   └── useBingoGame.ts  # Game state & logic
├── utils/
│   └── bingoLogic.ts    # Bingo calculations (21 tests! ✅)
├── data/
│   └── questions.ts     # Customizable prompts
├── types/
│   └── index.ts         # TypeScript definitions
└── App.tsx              # Root component
```

---

## ✨ Key Features

- **Randomized Boards** — Different questions every game
- **Center Free Space** — Classic bingo rules
- **Real-time Detection** — Instant BINGO! announcement
- **Mobile-Ready** — Works great on phones & tablets
- **Fully Tested** — 21 unit tests covering game logic
- **TypeScript** — Type-safe React code

---

## 🎨 Customize It

### Change the Questions

Edit `src/data/questions.ts` to customize prompts for your event:

```typescript
export const questions = [
  'Started a company',
  'Written a book',
  'Learned a new language',
  // Add your own!
];
```

### Styling

The app uses **Tailwind CSS v4** with the Vite integration. Modify component classes to match your brand colors and spacing.

---

## 🧪 Testing

The bingo logic is thoroughly tested:

```bash
npm run test
```

Tests verify:
- Board generation (25 squares, center free space, uniqueness)
- Square toggling (marked/unmarked states)
- Win detection (rows, columns, diagonals)
- Winning square highlighting

---

## 📦 Tech Stack

- **React 19** — Modern UI library
- **Vite** — Fast build tool & dev server
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Utility-first styling
- **Vitest** — Testing framework
- **ESLint** — Code quality

---

## 🚀 Deploy

This project auto-deploys to GitHub Pages on every push to `main`:

```
https://your-github-username.github.io/my-soc-ops/
```

Enable GitHub Pages in repository settings → **Pages** → **GitHub Actions**.

---

## 📚 Learn More

- **Lab Guide** — See `.lab/GUIDE.md` for workshop tasks and learning objectives
- **Setup Instructions** — Check `.github/prompts/setup.prompt.md`
- **Contributing** — Read `CONTRIBUTING.md` for guidelines

---

## 💡 Pro Tips

1. **Keep browser preview open** — See changes as you code
2. **Commit often** — Especially after successful features
3. **Check the console** — Browser DevTools show any errors
4. **Reuse questions** — Import & shuffle for multiple events

---

## 🎉 Ready to Build?

Your next steps:
- [ ] Customize questions for your event
- [ ] Test on mobile with your phone
- [ ] Deploy to GitHub Pages
- [ ] Host a social mixer! 🥳

**Happy building!** Questions? Check `SUPPORT.md` or the repository issues.
