# 🍬 Candy Crush

A visually polished, responsive Candy Crush match-3 game built with HTML5, CSS3 animations, and ES6 JavaScript.

## 🚀 How to Run

You can run the game directly with no installation or build steps required:

### Option 1: Open Directly in Browser
Double-click `index.html` or run this command on macOS:
```bash
open index.html
```

### Option 2: Local Web Server
If you prefer running via a local server:
```bash
python3 -m http.server 8000
```
Then open [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🎮 Game Features & Mechanics

- **8x8 Grid**: Populated with 6 colorful candies (Red Jelly Bean, Orange Lozenge, Yellow Lemon Drop, Green Chiclet, Blue Sphere, Purple Gem).
- **Controls**:
  - **Click-to-Swap**: Click one candy, then click an adjacent candy to swap.
  - **Swipe/Drag**: Click and drag or swipe in the direction you want to move.
- **Match-3 Rules**:
  - Match 3 candies in a row or column to clear them.
  - Invalid swaps automatically bounce back to their original spots.
- **Special Candies**:
  - **Striped Candy** (Match 4): Clears an entire row or column with a laser blast.
  - **Wrapped Candy** (L or T shape): Explodes a 3x3 grid zone.
  - **Color Bomb** (Match 5): Swapping with any candy detonates all candies of that color across the board.
- **Special Combos**:
  - Swap two special candies together for massive board-clearing reactions (Color Bomb + Striped, Double Color Bomb, Striped + Wrapped, etc.)!
- **Juicy FX & Audio**:
  - Web Audio API procedural sound synthesizer (ascending combo chimes, pops, explosions, victory fanfare).
  - Sound mute/unmute toggle.
  - Canvas particle bursts and sweet floating combo banners (*SWEET!*, *TASTY!*, *DELICIOUS!*).
- **Quality of Life**:
  - Idle Hint System: Gently wiggles a valid move after 5.5 seconds of inactivity.
  - Automatic Deadlock Detection: Shuffles the board if no valid moves remain.
  - 3-Star progress bar tracking your score against the level target.
