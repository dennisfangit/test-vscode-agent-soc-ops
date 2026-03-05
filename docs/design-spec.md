# Design Spec: Card Deck Shuffle Mode

## Overview
New game mode "Card Deck Shuffle" where players open the game and tap a button to draw random cards with questions. Complementary to the existing 5x5 Bingo grid mode.

## Game Flow
1. **Start Screen**: Display two mode options - "Bingo" and "Card Deck"
2. **Card Deck View**: 
   - Large centered card display showing a single question
   - Tap/click to draw the next card
   - Visual shuffle/flip animation on card change
   - Question updates with each tap

## UI Architecture
- New component: `CardDeck.tsx` (similar role to GameScreen for this mode)
- Updated `StartScreen.tsx` with mode selection
- Updated types in `types/index.ts` to support 'card-deck' game state
- Updated `useBingoGame.ts` hook to manage card deck logic

## Implementation Complete ✓

### Changes Made:
1. **Types** (`src/types/index.ts`):
   - Added `'card-deck'` to GameState union type
   - Added `CardDeckState` interface for future card-specific state

2. **Hook** (`src/hooks/useBingoGame.ts`):
   - Added `currentCardIndex` state tracking
   - Added `startCardDeck()` callback to enter card deck mode
   - Added `drawCard()` callback to advance to next card
   - Updated validation to include 'card-deck' state
   - Imported questions directly for use in card cycling

3. **Components**:
   - **CardDeck.tsx** (new): Displays card with question, tap to draw next, progress counter, quit button
   - **StartScreen.tsx**: Updated to show two buttons - "BINGO" and "CARDS"
   - **App.tsx**: Added routing for card-deck state, passes callbacks to CardDeck

### Component Details

**CardDeck Component**:
- Responsive card container with neon cyan/magenta borders
- Large centered question text (Press Start 2P font)
- Card count display (e.g., "1 / 24")
- "NEXT CARD" button (magenta/yellow) to draw next
- "QUIT" button to return to start screen
- Keyboard accessible (Enter/Space to draw)

**StartScreen Changes**:
- Replaced single "START" button with two side-by-side buttons
- "BINGO" button: Magenta with yellow border (original style)
- "CARDS" button: Cyan border with transparency, hover effect

**App Routing**:
- `gameState === 'start'`: Show StartScreen
- `gameState === 'card-deck'`: Show CardDeck
- `gameState === 'playing'|'bingo'`: Show GameScreen

## Styling & Theme
- Consistent with 8-bit neon arcade aesthetic
- Uses Tailwind v4 with project color variables
- Responsive design (mobile-first)
- Gradient background on card (neon-magenta/10 to neon-cyan/10)
- Thick borders (border-6) for chunky arcade feel
- Hover states for interactivity

## Testing
- Build verified: `npm run build` ✓
- No TypeScript errors in src/
- All routing logic integrated

---

**Status**: Ready for visual testing and user feedback  
**Branch**: copilot/redesign-startscreen-accordion


