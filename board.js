// Candy Crush Game Board & Match-3 Logic Engine

const CANDY_COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
const ROWS = 8;
const COLS = 8;

let candyIdCounter = 1;

class Candy {
    constructor(color, type = 'normal', id = null) {
        this.id = id || candyIdCounter++;
        this.color = color; // 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'rainbow'
        this.type = type;   // 'normal' | 'striped-h' | 'striped-v' | 'wrapped' | 'color-bomb'
    }

    clone() {
        return new Candy(this.color, this.type, this.id);
    }
}

class Board {
    constructor(rows = ROWS, cols = COLS) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.init();
    }

    // Initialize board with no pre-existing matches, but with at least one valid move
    init() {
        do {
            this.grid = [];
            for (let r = 0; r < this.rows; r++) {
                const row = [];
                for (let c = 0; c < this.cols; c++) {
                    const color = this.getRandomColorWithoutMatch(r, c, row);
                    row.push(new Candy(color));
                }
                this.grid.push(row);
            }
        } while (this.getPossibleMoves().length === 0);
    }

    // Pick a random color that won't create a match-3 upon spawn
    getRandomColorWithoutMatch(r, c, currentRow) {
        const forbidden = new Set();
        // Check horizontal preceding 2
        if (c >= 2 && currentRow[c - 1] && currentRow[c - 2]) {
            if (currentRow[c - 1].color === currentRow[c - 2].color) {
                forbidden.add(currentRow[c - 1].color);
            }
        }
        // Check vertical preceding 2
        if (r >= 2 && this.grid[r - 1][c] && this.grid[r - 2][c]) {
            if (this.grid[r - 1][c].color === this.grid[r - 2][c].color) {
                forbidden.add(this.grid[r - 1][c].color);
            }
        }

        const validColors = CANDY_COLORS.filter(color => !forbidden.has(color));
        return validColors[Math.floor(Math.random() * validColors.length)];
    }

    getRandomColor() {
        return CANDY_COLORS[Math.floor(Math.random() * CANDY_COLORS.length)];
    }

    get(r, c) {
        if (r < 0 || r >= this.rows || c < 0 || c >= this.cols) return null;
        return this.grid[r][c];
    }

    set(r, c, candy) {
        if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
            this.grid[r][c] = candy;
        }
    }

    swap(r1, c1, r2, c2) {
        const temp = this.grid[r1][c1];
        this.grid[r1][c1] = this.grid[r2][c2];
        this.grid[r2][c2] = temp;
    }

    areAdjacent(r1, c1, r2, c2) {
        const dr = Math.abs(r1 - r2);
        const dc = Math.abs(c1 - c2);
        return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
    }

    // Find all raw horizontal and vertical matches
    findRawMatches() {
        const matches = [];

        // Horizontal matches
        for (let r = 0; r < this.rows; r++) {
            let matchLength = 1;
            for (let c = 0; c < this.cols; c++) {
                const current = this.grid[r][c];
                const next = c < this.cols - 1 ? this.grid[r][c + 1] : null;

                if (current && next && current.color !== 'rainbow' && current.color === next.color) {
                    matchLength++;
                } else {
                    if (matchLength >= 3) {
                        const coords = [];
                        for (let k = 0; k < matchLength; k++) {
                            coords.push({ r, c: c - k });
                        }
                        matches.push({ dir: 'h', coords, color: this.grid[r][c].color });
                    }
                    matchLength = 1;
                }
            }
        }

        // Vertical matches
        for (let c = 0; c < this.cols; c++) {
            let matchLength = 1;
            for (let r = 0; r < this.rows; r++) {
                const current = this.grid[r][c];
                const next = r < this.rows - 1 ? this.grid[r + 1][c] : null;

                if (current && next && current.color !== 'rainbow' && current.color === next.color) {
                    matchLength++;
                } else {
                    if (matchLength >= 3) {
                        const coords = [];
                        for (let k = 0; k < matchLength; k++) {
                            coords.push({ r: r - k, c });
                        }
                        matches.push({ dir: 'v', coords, color: this.grid[r][c].color });
                    }
                    matchLength = 1;
                }
            }
        }

        return matches;
    }

    // Analyzes matches to determine created special candies and destroyed candies
    // swappedPos is { r, c } where the player made the swap (preferred spawn position for special candy)
    processMatches(swappedPos = null) {
        const rawMatches = this.findRawMatches();
        if (rawMatches.length === 0) return null;

        // Group intersecting matches of same color to find T/L shapes or 5-in-a-row
        const cellMap = new Map(); // "r,c" -> { r, c, hMatch: matchObj, vMatch: matchObj, color }

        for (const m of rawMatches) {
            for (const coord of m.coords) {
                const key = `${coord.r},${coord.c}`;
                if (!cellMap.has(key)) {
                    cellMap.set(key, { r: coord.r, c: coord.c, hMatch: null, vMatch: null, color: m.color });
                }
                const entry = cellMap.get(key);
                if (m.dir === 'h') entry.hMatch = m;
                if (m.dir === 'v') entry.vMatch = m;
            }
        }

        const specialCreations = []; // { r, c, candy: Candy }
        const processedMatches = new Set();
        const clearedCells = new Set(); // Set of "r,c" keys

        // Check for T/L shapes (both hMatch and vMatch intersect on the same color)
        for (const [, entry] of cellMap) {
            if (entry.hMatch && entry.vMatch && entry.hMatch.color === entry.vMatch.color) {
                const h = entry.hMatch;
                const v = entry.vMatch;
                if (!processedMatches.has(h) && !processedMatches.has(v)) {
                    processedMatches.add(h);
                    processedMatches.add(v);

                    h.coords.forEach(pt => clearedCells.add(`${pt.r},${pt.c}`));
                    v.coords.forEach(pt => clearedCells.add(`${pt.r},${pt.c}`));

                    // Spawn Wrapped Candy at intersection
                    specialCreations.push({
                        r: entry.r,
                        c: entry.c,
                        candy: new Candy(entry.color, 'wrapped')
                    });
                }
            }
        }

        // Process remaining individual matches
        for (const m of rawMatches) {
            if (processedMatches.has(m)) continue;
            processedMatches.add(m);

            m.coords.forEach(pt => clearedCells.add(`${pt.r},${pt.c}`));

            // Find best anchor coordinate for special candy creation (where user moved, or midpoint)
            let anchor = m.coords[Math.floor(m.coords.length / 2)];
            if (swappedPos) {
                const found = m.coords.find(pt => pt.r === swappedPos.r && pt.c === swappedPos.c);
                if (found) anchor = found;
            }

            if (m.coords.length >= 5) {
                // Color Bomb (Rainbow)
                specialCreations.push({
                    r: anchor.r,
                    c: anchor.c,
                    candy: new Candy('rainbow', 'color-bomb')
                });
            } else if (m.coords.length === 4) {
                // Striped candy:
                // If matched horizontally, give vertical stripe (or horizontal stripe)
                // In classic CC: moving horizontally gives vertical striped candy, moving vertically gives horizontal striped candy
                const stripeType = m.dir === 'h' ? 'striped-v' : 'striped-h';
                specialCreations.push({
                    r: anchor.r,
                    c: anchor.c,
                    candy: new Candy(m.color, stripeType)
                });
            }
        }

        // Expand cleared cells for any activated special candies inside the cleared area
        const allExplodedCells = this.resolveExplosions(clearedCells);

        return {
            explodedCells: allExplodedCells, // Array of { r, c }
            specialCreations                // Array of { r, c, candy }
        };
    }

    // Recursively or iteratively trigger special candies inside cleared cells
    resolveExplosions(initialClearedSet) {
        const finalSet = new Set(initialClearedSet);
        const queue = Array.from(initialClearedSet);
        const detonatedSpecials = new Set();

        while (queue.length > 0) {
            const key = queue.shift();
            const [rStr, cStr] = key.split(',');
            const r = parseInt(rStr, 10);
            const c = parseInt(cStr, 10);

            const candy = this.get(r, c);
            if (!candy || detonatedSpecials.has(key)) continue;

            detonatedSpecials.add(key);

            if (candy.type === 'striped-h') {
                // Clears whole row
                for (let col = 0; col < this.cols; col++) {
                    const k = `${r},${col}`;
                    if (!finalSet.has(k)) {
                        finalSet.add(k);
                        queue.push(k);
                    }
                }
            } else if (candy.type === 'striped-v') {
                // Clears whole column
                for (let row = 0; row < this.rows; row++) {
                    const k = `${row},${c}`;
                    if (!finalSet.has(k)) {
                        finalSet.add(k);
                        queue.push(k);
                    }
                }
            } else if (candy.type === 'wrapped') {
                // Explodes 3x3
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        const nr = r + dr;
                        const nc = c + dc;
                        if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
                            const k = `${nr},${nc}`;
                            if (!finalSet.has(k)) {
                                finalSet.add(k);
                                queue.push(k);
                            }
                        }
                    }
                }
            }
        }

        return Array.from(finalSet).map(key => {
            const [r, c] = key.split(',').map(Number);
            return { r, c };
        });
    }

    // Handles direct combo when player swaps two special candies together
    handleSpecialCombo(r1, c1, r2, c2) {
        const c1Candy = this.get(r1, c1);
        const c2Candy = this.get(r2, c2);
        if (!c1Candy || !c2Candy) return null;

        const isSpecial1 = c1Candy.type !== 'normal';
        const isSpecial2 = c2Candy.type !== 'normal';

        // 1. Color Bomb + Color Bomb -> Clears the entire board!
        if (c1Candy.type === 'color-bomb' && c2Candy.type === 'color-bomb') {
            const cleared = [];
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    cleared.push({ r, c });
                }
            }
            return {
                type: 'double-color-bomb',
                explodedCells: cleared,
                specialCreations: []
            };
        }

        // 2. Color Bomb + Striped -> All candies of that color become striped and detonate!
        if ((c1Candy.type === 'color-bomb' && (c2Candy.type === 'striped-h' || c2Candy.type === 'striped-v')) ||
            (c2Candy.type === 'color-bomb' && (c1Candy.type === 'striped-h' || c1Candy.type === 'striped-v'))) {
            const stripedCandy = c1Candy.type.startsWith('striped') ? c1Candy : c2Candy;
            const targetColor = stripedCandy.color;
            const targetCells = [];

            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    const candy = this.get(r, c);
                    if (candy && candy.color === targetColor) {
                        targetCells.push({ r, c });
                        // Randomly assign horizontal or vertical stripe
                        candy.type = Math.random() > 0.5 ? 'striped-h' : 'striped-v';
                    }
                }
            }

            const initialSet = new Set(targetCells.map(p => `${p.r},${p.c}`));
            initialSet.add(`${r1},${c1}`);
            initialSet.add(`${r2},${c2}`);
            const exploded = this.resolveExplosions(initialSet);

            return {
                type: 'color-bomb-striped',
                explodedCells: exploded,
                specialCreations: []
            };
        }

        // 3. Color Bomb + Wrapped -> Transforms candies of color into wrapped and detonates!
        if ((c1Candy.type === 'color-bomb' && c2Candy.type === 'wrapped') ||
            (c2Candy.type === 'color-bomb' && c1Candy.type === 'wrapped')) {
            const wrappedCandy = c1Candy.type === 'wrapped' ? c1Candy : c2Candy;
            const targetColor = wrappedCandy.color;
            const targetCells = [];

            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    const candy = this.get(r, c);
                    if (candy && candy.color === targetColor) {
                        targetCells.push({ r, c });
                        candy.type = 'wrapped';
                    }
                }
            }

            const initialSet = new Set(targetCells.map(p => `${p.r},${p.c}`));
            initialSet.add(`${r1},${c1}`);
            initialSet.add(`${r2},${c2}`);
            const exploded = this.resolveExplosions(initialSet);

            return {
                type: 'color-bomb-wrapped',
                explodedCells: exploded,
                specialCreations: []
            };
        }

        // 4. Color Bomb + Normal Candy -> Clears all candies of that color!
        if (c1Candy.type === 'color-bomb' || c2Candy.type === 'color-bomb') {
            const bombPos = c1Candy.type === 'color-bomb' ? { r: r1, c: c1 } : { r: r2, c: c2 };
            const otherCandy = c1Candy.type === 'color-bomb' ? c2Candy : c1Candy;
            const targetColor = otherCandy.color;

            const cleared = [{ r: bombPos.r, c: bombPos.c }];
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    const candy = this.get(r, c);
                    if (candy && candy.color === targetColor) {
                        cleared.push({ r, c });
                    }
                }
            }

            const exploded = this.resolveExplosions(new Set(cleared.map(p => `${p.r},${p.c}`)));
            return {
                type: 'color-bomb-regular',
                explodedCells: exploded,
                targetColor,
                specialCreations: []
            };
        }

        // 5. Striped + Striped -> Cross blast (entire row and entire column)
        if (c1Candy.type.startsWith('striped') && c2Candy.type.startsWith('striped')) {
            const cleared = new Set();
            for (let c = 0; c < this.cols; c++) cleared.add(`${r2},${c}`);
            for (let r = 0; r < this.rows; r++) cleared.add(`${r},${c2}`);
            const exploded = this.resolveExplosions(cleared);
            return {
                type: 'striped-striped',
                explodedCells: exploded,
                specialCreations: []
            };
        }

        // 6. Striped + Wrapped -> Giant 3-row & 3-column cross blast!
        if ((c1Candy.type.startsWith('striped') && c2Candy.type === 'wrapped') ||
            (c2Candy.type.startsWith('striped') && c1Candy.type === 'wrapped')) {
            const cleared = new Set();
            for (let dr = -1; dr <= 1; dr++) {
                const tr = r2 + dr;
                if (tr >= 0 && tr < this.rows) {
                    for (let c = 0; c < this.cols; c++) cleared.add(`${tr},${c}`);
                }
            }
            for (let dc = -1; dc <= 1; dc++) {
                const tc = c2 + dc;
                if (tc >= 0 && tc < this.cols) {
                    for (let r = 0; r < this.rows; r++) cleared.add(`${r},${tc}`);
                }
            }
            const exploded = this.resolveExplosions(cleared);
            return {
                type: 'striped-wrapped',
                explodedCells: exploded,
                specialCreations: []
            };
        }

        // 7. Wrapped + Wrapped -> Huge 5x5 explosion!
        if (c1Candy.type === 'wrapped' && c2Candy.type === 'wrapped') {
            const cleared = new Set();
            for (let dr = -2; dr <= 2; dr++) {
                for (let dc = -2; dc <= 2; dc++) {
                    const nr = r2 + dr;
                    const nc = c2 + dc;
                    if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
                        cleared.add(`${nr},${nc}`);
                    }
                }
            }
            const exploded = this.resolveExplosions(cleared);
            return {
                type: 'wrapped-wrapped',
                explodedCells: exploded,
                specialCreations: []
            };
        }

        return null;
    }

    // Apply gravity: candies fall down to fill holes, return movements and spawns
    applyGravity(explodedCells, specialCreations = []) {
        // First remove all exploded candies from grid
        for (const pt of explodedCells) {
            this.grid[pt.r][pt.c] = null;
        }

        // Place new special candies
        for (const item of specialCreations) {
            this.grid[item.r][item.c] = item.candy;
        }

        const dropMovements = []; // { candy, fromR, fromC, toR, toC }
        const newCandies = [];    // { candy, toR, toC, spawnRowOffset }

        // Drop existing candies down per column
        for (let c = 0; c < this.cols; c++) {
            let emptyRow = this.rows - 1;

            for (let r = this.rows - 1; r >= 0; r--) {
                if (this.grid[r][c] !== null) {
                    if (emptyRow !== r) {
                        const candy = this.grid[r][c];
                        this.grid[emptyRow][c] = candy;
                        this.grid[r][c] = null;
                        dropMovements.push({
                            candy,
                            fromR: r,
                            fromC: c,
                            toR: emptyRow,
                            toC: c
                        });
                    }
                    emptyRow--;
                }
            }

            // Spawn new candies at top to fill remaining empty spaces in column
            let spawnOffset = 1;
            for (let r = emptyRow; r >= 0; r--) {
                const color = this.getRandomColor();
                const candy = new Candy(color);
                this.grid[r][c] = candy;
                newCandies.push({
                    candy,
                    toR: r,
                    toC: c,
                    spawnRowOffset: spawnOffset++
                });
            }
        }

        return {
            dropMovements,
            newCandies
        };
    }

    // Check if any valid moves exist on the board
    getPossibleMoves() {
        const validMoves = [];

        // Check horizontal swaps
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols - 1; c++) {
                if (this.isMoveValid(r, c, r, c + 1)) {
                    validMoves.push({ r1: r, c1: c, r2: r, c2: c + 1 });
                }
            }
        }

        // Check vertical swaps
        for (let r = 0; r < this.rows - 1; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.isMoveValid(r, c, r + 1, c)) {
                    validMoves.push({ r1: r, c1: c, r2: r + 1, c2: c });
                }
            }
        }

        return validMoves;
    }

    // Test if a swap creates a match or is a valid special combo
    isMoveValid(r1, c1, r2, c2) {
        const c1Candy = this.get(r1, c1);
        const c2Candy = this.get(r2, c2);
        if (!c1Candy || !c2Candy) return false;

        // Color bomb swapped with anything is always a match
        if (c1Candy.type === 'color-bomb' || c2Candy.type === 'color-bomb') {
            return true;
        }

        // Two special candies swapped together is always valid
        if (c1Candy.type !== 'normal' && c2Candy.type !== 'normal') {
            return true;
        }

        // Normal swap check
        this.swap(r1, c1, r2, c2);
        const matches = this.findRawMatches();
        this.swap(r1, c1, r2, c2); // Swap back

        return matches.length > 0;
    }

    // Shuffle all candies currently on the board until a valid move exists
    shuffle() {
        const candies = [];
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.grid[r][c]) {
                    candies.push(this.grid[r][c]);
                }
            }
        }

        let attempts = 0;
        do {
            // Fisher-Yates shuffle
            for (let i = candies.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = candies[i];
                candies[i] = candies[j];
                candies[j] = temp;
            }

            let idx = 0;
            for (let r = 0; r < this.rows; r++) {
                for (let c = 0; c < this.cols; c++) {
                    this.grid[r][c] = candies[idx++];
                }
            }
            attempts++;
        } while ((this.findRawMatches().length > 0 || this.getPossibleMoves().length === 0) && attempts < 100);

        // If after 100 shuffles still no match-free board with moves, re-init cleanly
        if (this.getPossibleMoves().length === 0 || this.findRawMatches().length > 0) {
            this.init();
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Board, Candy, CANDY_COLORS, ROWS, COLS };
}
