// ════════════════════════════════════════════════════════════
//  DAY 1 — How Games Store Data
//  Goal: draw a maze on screen using a 2D array
//
//  What students WRITE themselves:
//    1. The maze array (designed on paper first, then typed in)
//    2. The drawMaze() if/else block (guided by the slides)
//
//  What is PRE-PROVIDED in the starter:
//    • All constants (TILE_SIZE, COLS, ROWS, PATH, WALL, PELLET, POWER)
//    • setup() and draw() skeleton
//    • The maze variable declaration (empty or with a tiny example)
// ════════════════════════════════════════════════════════════

// ── CONSTANTS ────────────────────────────────────────────────
const TILE_SIZE = 20;
const COLS      = 21;
const ROWS      = 21;

const PATH   = 0;
const WALL   = 1;
const PELLET = 2;
const POWER  = 3;

// ── MAZE (students fill this in from their paper design) ─────
// Every row must have exactly 21 numbers.
// Outer border must be all 1s.
let maze = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,2,1],
  [1,3,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,3,1],
  [1,2,1,1,2,2,2,1,1,2,2,2,1,1,2,2,2,1,1,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,0,1,0,0,1,1,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,0,0,0,1,0,0,0,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,1,1,0,0,0,1,1,0,1,2,1,1,1,1],
  [1,2,2,2,2,0,0,1,0,0,0,0,0,1,0,0,2,2,2,2,1],
  [1,1,1,1,2,1,0,1,1,1,1,1,1,1,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,0,0,0,0,1,0,0,0,0,1,2,1,1,1,1],
  [1,1,1,1,2,1,1,1,0,0,1,0,0,1,1,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,2,1],
  [1,2,1,1,2,2,2,1,1,2,2,2,1,1,2,2,2,1,1,2,1],
  [1,3,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,3,1],
  [1,2,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// ── SETUP ────────────────────────────────────────────────────
function setup() {
  createCanvas(COLS * TILE_SIZE, ROWS * TILE_SIZE);
  frameRate(60);
  noSmooth();
}

// ── DRAW ─────────────────────────────────────────────────────
function draw() {
  background(0);
  drawMaze();
}

// ── DRAW MAZE (students write this if/else block) ─────────────
function drawMaze() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {

      let cell = maze[row][col];
      let x    = col * TILE_SIZE;
      let y    = row * TILE_SIZE;

      if (cell === WALL) {
        fill(0, 0, 180);
        noStroke();
        rect(x, y, TILE_SIZE, TILE_SIZE);

      } else if (cell === PELLET) {
        fill(0);
        rect(x, y, TILE_SIZE, TILE_SIZE);
        fill(255, 255, 200);
        noStroke();
        circle(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 4);

      } else if (cell === POWER) {
        fill(0);
        rect(x, y, TILE_SIZE, TILE_SIZE);
        fill(255, 180, 0);
        noStroke();
        circle(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 12);

      } else {
        fill(0);
        rect(x, y, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}
