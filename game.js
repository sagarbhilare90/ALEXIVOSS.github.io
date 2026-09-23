// Candy Crush Game Controller & FX Engine

// SVG Definitions for Candies
const CANDY_SVGS = {
    red: `
        <svg viewBox="0 0 100 100">
            <defs>
                <radialGradient id="redGrad" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stop-color="#ff7675" />
                    <stop offset="45%" stop-color="#d63031" />
                    <stop offset="100%" stop-color="#911414" />
                </radialGradient>
                <linearGradient id="redHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
                </linearGradient>
            </defs>
            <!-- Jelly Bean Body -->
            <path d="M 25,50 C 25,25 45,15 65,22 C 85,28 90,55 80,75 C 70,92 40,90 28,78 C 22,70 25,58 25,50 Z" 
                  fill="url(#redGrad)" stroke="#660a0a" stroke-width="2.5" />
            <!-- Gloss Shine -->
            <ellipse cx="48" cy="30" rx="16" ry="8" transform="rotate(-18 48 30)" fill="url(#redHighlight)" />
            <circle cx="68" cy="42" r="3.5" fill="#ffffff" opacity="0.6" />
        </svg>
    `,
    orange: `
        <svg viewBox="0 0 100 100">
            <defs>
                <radialGradient id="orangeGrad" cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stop-color="#ffeaa7" />
                    <stop offset="35%" stop-color="#e17055" />
                    <stop offset="100%" stop-color="#a3361a" />
                </radialGradient>
                <linearGradient id="orangeShine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
                </linearGradient>
            </defs>
            <!-- Orange Lozenge -->
            <path d="M 20,50 L 50,18 L 80,50 L 50,82 Z" rx="14" ry="14"
                  fill="url(#orangeGrad)" stroke="#6b1d09" stroke-width="2.5" />
            <!-- Core Inset -->
            <path d="M 28,50 L 50,26 L 72,50 L 50,74 Z" fill="none" stroke="#fab1a0" stroke-width="2" opacity="0.5" />
            <!-- Highlight -->
            <ellipse cx="42" cy="34" rx="12" ry="5" transform="rotate(-40 42 34)" fill="url(#orangeShine)" />
        </svg>
    `,
    yellow: `
        <svg viewBox="0 0 100 100">
            <defs>
                <radialGradient id="yellowGrad" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stop-color="#fff9b0" />
                    <stop offset="40%" stop-color="#fdcb6e" />
                    <stop offset="100%" stop-color="#c58900" />
                </radialGradient>
                <linearGradient id="yellowShine" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
                </linearGradient>
            </defs>
            <!-- Yellow Teardrop -->
            <path d="M 50,15 C 65,35 84,55 82,72 C 80,86 66,92 50,92 C 34,92 20,86 18,72 C 16,55 35,35 50,15 Z"
                  fill="url(#yellowGrad)" stroke="#825a00" stroke-width="2.5" />
            <!-- Shine curve -->
            <path d="M 32,60 C 32,45 42,32 50,25" fill="none" stroke="url(#yellowShine)" stroke-width="6" stroke-linecap="round" />
            <circle cx="65" cy="65" r="4" fill="#ffffff" opacity="0.6" />
        </svg>
    `,
    green: `
        <svg viewBox="0 0 100 100">
            <defs>
                <radialGradient id="greenGrad" cx="35%" cy="35%" r="70%">
                    <stop offset="0%" stop-color="#a8ff78" />
                    <stop offset="40%" stop-color="#00b894" />
                    <stop offset="100%" stop-color="#00624f" />
                </radialGradient>
                <linearGradient id="greenHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
                </linearGradient>
            </defs>
            <!-- Green Square Chiclet -->
            <rect x="18" y="18" width="64" height="64" rx="16" ry="16"
                  fill="url(#greenGrad)" stroke="#004336" stroke-width="2.5" />
            <rect x="25" y="25" width="50" height="50" rx="10" ry="10"
                  fill="none" stroke="#55efc4" stroke-width="1.8" opacity="0.5" />
            <!-- Corner highlight -->
            <path d="M 28,38 C 28,28 32,26 44,26" fill="none" stroke="url(#greenHighlight)" stroke-width="5" stroke-linecap="round" />
            <circle cx="64" cy="64" r="3.5" fill="#ffffff" opacity="0.6" />
        </svg>
    `,
    blue: `
        <svg viewBox="0 0 100 100">
            <defs>
                <radialGradient id="blueGrad" cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stop-color="#a0c4ff" />
                    <stop offset="45%" stop-color="#0984e3" />
                    <stop offset="100%" stop-color="#07447b" />
                </radialGradient>
                <linearGradient id="blueShine" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
                </linearGradient>
            </defs>
            <!-- Blue Sphere -->
            <circle cx="50" cy="50" r="36" fill="url(#blueGrad)" stroke="#042a4d" stroke-width="2.5" />
            <!-- Inset ring -->
            <circle cx="50" cy="50" r="28" fill="none" stroke="#74b9ff" stroke-width="2" opacity="0.4" />
            <!-- Crescent highlight -->
            <path d="M 26,45 C 26,30 38,20 54,20" fill="none" stroke="url(#blueShine)" stroke-width="6" stroke-linecap="round" />
            <circle cx="68" cy="56" r="3.5" fill="#ffffff" opacity="0.7" />
        </svg>
    `,
    purple: `
        <svg viewBox="0 0 100 100">
            <defs>
                <radialGradient id="purpleGrad" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stop-color="#e8b0ff" />
                    <stop offset="40%" stop-color="#6c5ce7" />
                    <stop offset="100%" stop-color="#3c2f9e" />
                </radialGradient>
                <linearGradient id="purpleShine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8" />
                    <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
                </linearGradient>
            </defs>
            <!-- Purple Hexagon/Jewel -->
            <polygon points="50,15 84,33 84,67 50,85 16,67 16,33"
                     fill="url(#purpleGrad)" stroke="#221966" stroke-width="2.5" />
            <!-- Inner Facets -->
            <polygon points="50,26 73,38 73,62 50,74 27,62 27,38"
                     fill="none" stroke="#a29bfe" stroke-width="1.8" opacity="0.6" />
            <!-- Top highlight -->
            <line x1="28" y1="32" x2="50" y2="20" stroke="url(#purpleShine)" stroke-width="4.5" stroke-linecap="round" />
        </svg>
    `,
    colorBomb: `
        <svg viewBox="0 0 100 100">
            <defs>
                <radialGradient id="chocoGrad" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stop-color="#6d4c41" />
                    <stop offset="40%" stop-color="#3e2723" />
                    <stop offset="100%" stop-color="#1b0000" />
                </radialGradient>
            </defs>
            <!-- Chocolate Sphere -->
            <circle cx="50" cy="50" r="38" fill="url(#chocoGrad)" stroke="#1a0c08" stroke-width="2.5" />
            <circle cx="40" cy="30" r="14" fill="#ffffff" opacity="0.2" />
            
            <!-- Rainbow Sprinkles -->
            <rect x="36" y="24" width="7" height="3" rx="1.5" fill="#ff7675" transform="rotate(25 36 24)" />
            <rect x="58" y="26" width="7" height="3" rx="1.5" fill="#55efc4" transform="rotate(-30 58 26)" />
            <rect x="25" y="45" width="7" height="3" rx="1.5" fill="#ffeaa7" transform="rotate(75 25 45)" />
            <rect x="46" y="44" width="8" height="4" rx="2" fill="#74b9ff" transform="rotate(-15 46 44)" />
            <rect x="68" y="42" width="7" height="3" rx="1.5" fill="#fd79a8" transform="rotate(40 68 42)" />
            <rect x="32" y="65" width="7" height="3" rx="1.5" fill="#a29bfe" transform="rotate(-45 32 65)" />
            <rect x="55" y="68" width="7" height="3" rx="1.5" fill="#00b894" transform="rotate(20 55 68)" />
            <rect x="70" y="60" width="7" height="3" rx="1.5" fill="#fdcb6e" transform="rotate(-60 70 60)" />

            <!-- Sparkling white stars -->
            <circle cx="48" cy="36" r="2.5" fill="#ffffff" />
            <circle cx="62" cy="54" r="2" fill="#ffffff" />
        </svg>
    `
};

// Overlays for special candies
const SPECIAL_OVERLAYS = {
    'striped-h': `
        <g class="stripe-overlay">
            <line x1="12" y1="36" x2="88" y2="36" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity="0.9" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="#ffffff" stroke-width="7" stroke-linecap="round" opacity="0.95" />
            <line x1="12" y1="64" x2="88" y2="64" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity="0.9" />
        </g>
    `,
    'striped-v': `
        <g class="stripe-overlay">
            <line x1="36" y1="12" x2="36" y2="88" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity="0.9" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#ffffff" stroke-width="7" stroke-linecap="round" opacity="0.95" />
            <line x1="64" y1="12" x2="64" y2="88" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity="0.9" />
        </g>
    `,
    'wrapped': `
        <g class="wrapped-overlay">
            <!-- Left wrapper twist -->
            <polygon points="16,50 3,34 3,66" fill="#ffffff" opacity="0.8" stroke="#dfe6e9" stroke-width="1.5" />
            <!-- Right wrapper twist -->
            <polygon points="84,50 97,34 97,66" fill="#ffffff" opacity="0.8" stroke="#dfe6e9" stroke-width="1.5" />
            <!-- Center sparkling ribbon band -->
            <rect x="42" y="16" width="16" height="68" rx="4" fill="#ffffff" opacity="0.65" />
            <circle cx="50" cy="50" r="9" fill="#ffd700" stroke="#ffffff" stroke-width="2" />
        </g>
    `
};

function renderCandyHtml(candy) {
    if (!candy) return '';
    if (candy.type === 'color-bomb') {
        return CANDY_SVGS.colorBomb;
    }

    let baseSvg = CANDY_SVGS[candy.color] || CANDY_SVGS.red;
    let overlay = SPECIAL_OVERLAYS[candy.type] || '';

    if (overlay) {
        // Inject overlay inside the SVG before closing tag
        baseSvg = baseSvg.replace('</svg>', `${overlay}</svg>`);
    }
    return baseSvg;
}

// Particle Engine for juicy canvas match bursts
class FXManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.loop = this.loop.bind(this);
        requestAnimationFrame(this.loop);
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width * (window.devicePixelRatio || 1);
        this.canvas.height = rect.height * (window.devicePixelRatio || 1);
        this.scale = window.devicePixelRatio || 1;
    }

    spawnBurst(x, y, color = '#ffd700', count = 16) {
        const px = x * this.scale;
        const py = y * this.scale;
        const colorPalette = [color, '#ffffff', '#ffeaa7', '#ff7675'];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = (Math.random() * 4 + 2) * this.scale;
            const pColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            this.particles.push({
                x: px,
                y: py,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: (Math.random() * 4 + 3) * this.scale,
                alpha: 1,
                decay: Math.random() * 0.03 + 0.02,
                color: pColor,
                gravity: 0.12 * this.scale
            });
        }
    }

    spawnLaser(isRow, index, gridSize) {
        // Laser beam visual effect
        const container = document.getElementById('grid');
        const beam = document.createElement('div');
        beam.className = isRow ? 'laser-beam-h' : 'laser-beam-v';
        const cellSize = 100 / gridSize;
        if (isRow) {
            beam.style.top = `calc(${index * cellSize}% + ${cellSize / 2}%)`;
            beam.style.transform = 'translateY(-50%)';
        } else {
            beam.style.left = `calc(${index * cellSize}% + ${cellSize / 2}%)`;
            beam.style.transform = 'translateX(-50%)';
        }
        container.appendChild(beam);
        setTimeout(() => beam.remove(), 350);
    }

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.alpha -= p.decay;

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.alpha);
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }

        requestAnimationFrame(this.loop);
    }
}

// Main Game Controller
class CandyCrushGame {
    constructor() {
        this.board = new Board(ROWS, COLS);
        this.score = 0;
        this.moves = 25;
        this.targetScore = 3000;
        this.stars = 0;
        this.starThresholds = [1200, 2500, 4000];
        this.isBusy = false;
        this.selectedTile = null;
        this.dragStart = null;
        this.hintTimer = null;
        this.combo = 1;

        this.initDOM();
        this.initFX();
        this.bindEvents();
        this.renderBoard();
        this.updateHUD();
        this.resetHintTimer();
    }

    initDOM() {
        this.gridEl = document.getElementById('grid');
        this.scoreEl = document.getElementById('score-val');
        this.movesEl = document.getElementById('moves-val');
        this.targetEl = document.getElementById('target-val');
        this.movesCardEl = document.getElementById('moves-card');
        this.progressFillEl = document.getElementById('progress-fill');
        this.starEls = [
            document.getElementById('star-1'),
            document.getElementById('star-2'),
            document.getElementById('star-3')
        ];
        this.floatingTextEl = document.getElementById('floating-text-container');

        // Modals
        this.gameOverModal = document.getElementById('game-over-modal');
        this.victoryModal = document.getElementById('victory-modal');
        this.helpModal = document.getElementById('help-modal');

        // Build grid cell slots
        this.gridEl.innerHTML = '';
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const cell = document.createElement('div');
                cell.className = `cell ${(r + c) % 2 === 1 ? 'checker' : ''}`;
                cell.dataset.r = r;
                cell.dataset.c = c;
                this.gridEl.appendChild(cell);
            }
        }
    }

    initFX() {
        const canvas = document.getElementById('fx-canvas');
        this.fx = new FXManager(canvas);
    }

    bindEvents() {
        // Sound mute toggle
        const muteBtn = document.getElementById('btn-mute');
        muteBtn.addEventListener('click', () => {
            const isMuted = soundController.toggleMute();
            muteBtn.textContent = isMuted ? '🔇' : '🔊';
        });

        // Restart button
        document.getElementById('btn-restart').addEventListener('click', () => {
            this.restartGame();
        });

        // Help modal open & close
        document.getElementById('btn-help').addEventListener('click', () => {
            this.helpModal.classList.add('active');
        });
        document.getElementById('close-help-btn').addEventListener('click', () => {
            this.helpModal.classList.remove('active');
        });

        // Modal replay buttons
        document.getElementById('gameover-replay-btn').addEventListener('click', () => {
            this.gameOverModal.classList.remove('active');
            this.restartGame();
        });
        document.getElementById('victory-replay-btn').addEventListener('click', () => {
            this.victoryModal.classList.remove('active');
            this.restartGame();
        });

        // Grid Interaction: Mouse & Touch
        this.gridEl.addEventListener('pointerdown', (e) => this.handlePointerDown(e));
        this.gridEl.addEventListener('pointermove', (e) => this.handlePointerMove(e));
        this.gridEl.addEventListener('pointerup', () => this.handlePointerUp());
        this.gridEl.addEventListener('pointercancel', () => this.handlePointerUp());
    }

    restartGame() {
        this.score = 0;
        this.moves = 25;
        this.stars = 0;
        this.selectedTile = null;
        this.isBusy = false;
        this.board.init();
        this.renderBoard();
        this.updateHUD();
        this.resetHintTimer();
    }

    // Convert row and col to pixel position in grid for particle bursts
    getCellCenterCoords(r, c) {
        const cell = this.getCellElement(r, c);
        if (!cell) return { x: 0, y: 0 };
        const gridRect = this.gridEl.getBoundingClientRect();
        const cellRect = cell.getBoundingClientRect();
        return {
            x: cellRect.left - gridRect.left + cellRect.width / 2,
            y: cellRect.top - gridRect.top + cellRect.height / 2
        };
    }

    getCellElement(r, c) {
        return this.gridEl.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
    }

    renderBoard() {
        // Clear all candies from cells
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const cell = this.getCellElement(r, c);
                cell.innerHTML = '';
                const candy = this.board.get(r, c);
                if (candy) {
                    const candyEl = document.createElement('div');
                    candyEl.className = 'candy';
                    candyEl.dataset.r = r;
                    candyEl.dataset.c = c;
                    candyEl.dataset.id = candy.id;
                    candyEl.innerHTML = renderCandyHtml(candy);

                    if (this.selectedTile && this.selectedTile.r === r && this.selectedTile.c === c) {
                        candyEl.classList.add('selected');
                    }

                    cell.appendChild(candyEl);
                }
            }
        }
    }

    updateHUD() {
        this.scoreEl.textContent = this.score;
        this.movesEl.textContent = this.moves;
        this.targetEl.textContent = this.targetScore;

        if (this.moves <= 5) {
            this.movesCardEl.classList.add('low-moves');
        } else {
            this.movesCardEl.classList.remove('low-moves');
        }

        // Star Progress bar
        const maxStarScore = this.starThresholds[2];
        const pct = Math.min(100, Math.floor((this.score / maxStarScore) * 100));
        this.progressFillEl.style.width = `${pct}%`;

        // Star icons
        this.starThresholds.forEach((threshold, idx) => {
            if (this.score >= threshold) {
                if (!this.starEls[idx].classList.contains('achieved')) {
                    this.starEls[idx].classList.add('achieved');
                    soundController.playSpecialCreated();
                }
            } else {
                this.starEls[idx].classList.remove('achieved');
            }
        });
    }

    resetHintTimer() {
        clearTimeout(this.hintTimer);
        // Clear existing hints
        const hinted = this.gridEl.querySelectorAll('.candy.hint');
        hinted.forEach(el => el.classList.remove('hint'));

        if (this.isBusy || this.moves <= 0) return;

        this.hintTimer = setTimeout(() => {
            this.showHint();
        }, 5500);
    }

    showHint() {
        if (this.isBusy) return;
        const moves = this.board.getPossibleMoves();
        if (moves.length === 0) return;

        const hintMove = moves[Math.floor(Math.random() * moves.length)];
        const candy1 = this.getCellElement(hintMove.r1, hintMove.c1)?.querySelector('.candy');
        const candy2 = this.getCellElement(hintMove.r2, hintMove.c2)?.querySelector('.candy');
        if (candy1) candy1.classList.add('hint');
        if (candy2) candy2.classList.add('hint');
    }

    showFloatingScore(r, c, pts) {
        const coords = this.getCellCenterCoords(r, c);
        const floatEl = document.createElement('div');
        floatEl.className = 'float-score';
        floatEl.style.left = `${coords.x}px`;
        floatEl.style.top = `${coords.y}px`;
        floatEl.textContent = `+${pts}`;
        this.floatingTextEl.appendChild(floatEl);
        setTimeout(() => floatEl.remove(), 900);
    }

    showBanner(text) {
        const banner = document.createElement('div');
        banner.className = 'float-banner';
        banner.textContent = text;
        this.floatingTextEl.appendChild(banner);
        setTimeout(() => banner.remove(), 1200);
    }

    // Pointer & Gesture Handlers
    handlePointerDown(e) {
        if (this.isBusy || this.moves <= 0) return;
        this.resetHintTimer();

        const candyEl = e.target.closest('.candy');
        if (!candyEl) return;

        const r = parseInt(candyEl.dataset.r, 10);
        const c = parseInt(candyEl.dataset.c, 10);

        this.dragStart = { x: e.clientX, y: e.clientY, r, c };

        // Handle click selection
        if (!this.selectedTile) {
            this.selectTile(r, c);
        } else {
            // Already have a selected tile
            if (this.board.areAdjacent(this.selectedTile.r, this.selectedTile.c, r, c)) {
                const r1 = this.selectedTile.r;
                const c1 = this.selectedTile.c;
                this.clearSelection();
                this.trySwap(r1, c1, r, c);
            } else {
                // Switch selection to new tile
                this.selectTile(r, c);
            }
        }
    }

    handlePointerMove(e) {
        if (!this.dragStart || this.isBusy) return;

        const dx = e.clientX - this.dragStart.x;
        const dy = e.clientY - this.dragStart.y;
        const threshold = 26;

        if (Math.abs(dx) > threshold || Math.abs(dy) > threshold) {
            const { r, c } = this.dragStart;
            let targetR = r;
            let targetC = c;

            if (Math.abs(dx) > Math.abs(dy)) {
                // Horizontal swipe
                targetC = dx > 0 ? c + 1 : c - 1;
            } else {
                // Vertical swipe
                targetR = dy > 0 ? r + 1 : r - 1;
            }

            this.dragStart = null;

            if (targetR >= 0 && targetR < ROWS && targetC >= 0 && targetC < COLS) {
                this.clearSelection();
                this.trySwap(r, c, targetR, targetC);
            }
        }
    }

    handlePointerUp() {
        this.dragStart = null;
    }

    selectTile(r, c) {
        this.clearSelection();
        this.selectedTile = { r, c };
        const candyEl = this.getCellElement(r, c)?.querySelector('.candy');
        if (candyEl) candyEl.classList.add('selected');
    }

    clearSelection() {
        this.selectedTile = null;
        const selected = this.gridEl.querySelectorAll('.candy.selected');
        selected.forEach(el => el.classList.remove('selected'));
    }

    // Try Swap Operation
    async trySwap(r1, c1, r2, c2) {
        this.isBusy = true;
        this.resetHintTimer();

        // 1. Play swap sound
        soundController.playSwap();

        // 2. Visually animate swap
        await this.animateSwap(r1, c1, r2, c2);

        // 3. Swap in board state
        this.board.swap(r1, c1, r2, c2);

        // 4. Check for special combo (e.g. Color Bomb + Striped, Striped + Striped)
        const specialCombo = this.board.handleSpecialCombo(r1, c1, r2, c2);

        if (specialCombo) {
            this.moves--;
            this.combo = 1;
            this.updateHUD();

            if (specialCombo.type.includes('color-bomb')) {
                soundController.playColorBomb();
            } else {
                soundController.playExplosion();
            }

            this.showBanner('SUPER COMBO!');
            await this.executeCascade(specialCombo.explodedCells, specialCombo.specialCreations);
            return;
        }

        // 5. Check for regular match
        const matchResult = this.board.processMatches({ r: r2, c: c2 });

        if (matchResult) {
            // Valid move!
            this.moves--;
            this.combo = 1;
            this.updateHUD();
            await this.executeCascade(matchResult.explodedCells, matchResult.specialCreations);
        } else {
            // Invalid move -> Bounce back!
            soundController.playInvalidSwap();
            this.board.swap(r1, c1, r2, c2); // Revert logical swap
            await this.animateSwap(r1, c1, r2, c2); // Revert visual
            this.isBusy = false;
            this.resetHintTimer();
        }
    }

    // Smooth CSS translation animation for swapping two candies
    animateSwap(r1, c1, r2, c2) {
        return new Promise(resolve => {
            const cell1 = this.getCellElement(r1, c1);
            const cell2 = this.getCellElement(r2, c2);
            const candy1 = cell1?.querySelector('.candy');
            const candy2 = cell2?.querySelector('.candy');

            if (!candy1 || !candy2) {
                resolve();
                return;
            }

            const rect1 = cell1.getBoundingClientRect();
            const rect2 = cell2.getBoundingClientRect();
            const dx = rect2.left - rect1.left;
            const dy = rect2.top - rect1.top;

            candy1.style.transform = `translate(${dx}px, ${dy}px)`;
            candy2.style.transform = `translate(${-dx}px, ${-dy}px)`;

            setTimeout(() => {
                candy1.style.transform = '';
                candy2.style.transform = '';
                this.renderBoard();
                resolve();
            }, 210);
        });
    }

    // Cascade resolution loop
    async executeCascade(initialExplosions, initialCreations) {
        let currentExplosions = initialExplosions;
        let currentCreations = initialCreations;

        while (currentExplosions && currentExplosions.length > 0) {
            // Step A: Explode candies
            await this.animateExplosions(currentExplosions, currentCreations);

            // Step B: Calculate Score
            const ptsPerCandy = 60 * this.combo;
            const addedScore = currentExplosions.length * ptsPerCandy;
            this.score += addedScore;

            // Step C: Combo Banners and Sounds
            if (this.combo === 2) this.showBanner('SWEET!');
            else if (this.combo === 3) this.showBanner('TASTY!');
            else if (this.combo >= 4) this.showBanner('DELICIOUS!');

            soundController.playMatch(this.combo);
            this.updateHUD();

            // Step D: Apply Gravity & Drop new candies
            const gravityResult = this.board.applyGravity(currentExplosions, currentCreations);
            await this.animateGravity(gravityResult);

            // Step E: Check for cascades
            const nextMatch = this.board.processMatches();
            if (nextMatch) {
                this.combo++;
                currentExplosions = nextMatch.explodedCells;
                currentCreations = nextMatch.specialCreations;
                await new Promise(r => setTimeout(r, 120));
            } else {
                currentExplosions = null;
                currentCreations = [];
            }
        }

        // Post-turn cleanup & check state
        this.combo = 1;

        // Check if any valid moves remain on board
        const possibleMoves = this.board.getPossibleMoves();
        if (possibleMoves.length === 0) {
            this.showBanner('SHUFFLING!');
            await new Promise(r => setTimeout(r, 600));
            this.board.shuffle();
            this.renderBoard();
        }

        // Check win or lose
        this.checkGameStatus();
    }

    animateExplosions(explodedCells, specialCreations) {
        return new Promise(resolve => {
            // Show lasers for striped explosions
            explodedCells.forEach(pt => {
                const candy = this.board.get(pt.r, pt.c);
                if (candy) {
                    if (candy.type === 'striped-h') {
                        this.fx.spawnLaser(true, pt.r, ROWS);
                        soundController.playExplosion();
                    } else if (candy.type === 'striped-v') {
                        this.fx.spawnLaser(false, pt.c, COLS);
                        soundController.playExplosion();
                    } else if (candy.type === 'wrapped') {
                        soundController.playExplosion();
                    }
                }
            });

            // Trigger pop animations and particle bursts
            explodedCells.forEach(pt => {
                const cell = this.getCellElement(pt.r, pt.c);
                const candyEl = cell?.querySelector('.candy');
                if (candyEl) {
                    candyEl.classList.add('popping');
                    const coords = this.getCellCenterCoords(pt.r, pt.c);
                    const candy = this.board.get(pt.r, pt.c);
                    const color = candy ? candy.color : '#ffd700';
                    this.fx.spawnBurst(coords.x, coords.y, color, 14);
                }
            });

            // Show floating score at center of explosion
            if (explodedCells.length > 0) {
                const mid = explodedCells[Math.floor(explodedCells.length / 2)];
                this.showFloatingScore(mid.r, mid.c, explodedCells.length * 60 * this.combo);
            }

            if (specialCreations && specialCreations.length > 0) {
                soundController.playSpecialCreated();
            }

            setTimeout(() => {
                resolve();
            }, 240);
        });
    }

    animateGravity(gravityResult) {
        return new Promise(resolve => {
            const { dropMovements, newCandies } = gravityResult;

            // Re-render board with newly placed candies
            this.renderBoard();

            dropMovements.forEach(m => {
                const cellTo = this.getCellElement(m.toR, m.toC);
                const cellFrom = this.getCellElement(m.fromR, m.fromC);
                const candyEl = cellTo?.querySelector('.candy');
                if (candyEl && cellTo && cellFrom) {
                    const diffY = cellFrom.getBoundingClientRect().top - cellTo.getBoundingClientRect().top;
                    candyEl.style.transition = 'none';
                    candyEl.style.transform = `translateY(${diffY}px)`;
                    candyEl.offsetHeight; // trigger reflow
                    candyEl.style.transition = 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)';
                    candyEl.style.transform = 'translateY(0)';
                }
            });

            newCandies.forEach(n => {
                const cellTo = this.getCellElement(n.toR, n.toC);
                const candyEl = cellTo?.querySelector('.candy');
                if (candyEl && cellTo) {
                    const cellHeight = cellTo.offsetHeight + 4;
                    const spawnY = -cellHeight * (n.spawnRowOffset + 1);
                    candyEl.style.transition = 'none';
                    candyEl.style.transform = `translateY(${spawnY}px)`;
                    candyEl.offsetHeight; // trigger reflow
                    candyEl.style.transition = 'transform 0.28s cubic-bezier(0.25, 1, 0.5, 1)';
                    candyEl.style.transform = 'translateY(0)';
                }
            });

            setTimeout(() => {
                resolve();
            }, 290);
        });
    }

    checkGameStatus() {
        if (this.moves <= 0) {
            this.isBusy = true;
            clearTimeout(this.hintTimer);

            if (this.score >= this.targetScore) {
                // Victory!
                soundController.playWin();
                document.getElementById('victory-score').textContent = this.score;

                // Award stars
                const victoryStarsEl = document.getElementById('victory-stars');
                const starsEarned = this.score >= this.starThresholds[2] ? 3 :
                                   this.score >= this.starThresholds[1] ? 2 : 1;
                
                victoryStarsEl.innerHTML = '';
                for (let i = 1; i <= 3; i++) {
                    const s = document.createElement('span');
                    s.className = `star ${i <= starsEarned ? 'earned' : ''}`;
                    s.textContent = '⭐';
                    victoryStarsEl.appendChild(s);
                }

                setTimeout(() => {
                    this.victoryModal.classList.add('active');
                }, 500);
            } else {
                // Game Over
                soundController.playGameOver();
                document.getElementById('gameover-score').textContent = this.score;
                setTimeout(() => {
                    this.gameOverModal.classList.add('active');
                }, 500);
            }
        } else {
            this.isBusy = false;
            this.resetHintTimer();
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.game = new CandyCrushGame();
});
