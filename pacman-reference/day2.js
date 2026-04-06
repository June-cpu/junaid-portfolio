// ════════════════════════════════════════════════════════════
//  DAY 2 — Moving Pacman
//  Goal: make Pacman move with arrow keys, collide with walls,
//        eat pellets, and animate the mouth
//
//  What students ADD on top of Day 1:
//    1. pacRow, pacCol variables (starting position)
//    2. pacDir — which direction Pacman is facing
//    3. mouthAngle — for the open/close mouth animation
//    4. drawPacman() — draws a wedge (arc) instead of a circle
//    5. keyPressed() — moves Pacman, checks for walls, eats pellets
// ════════════════════════════════════════════════════════════

const TILE_SIZE = 20;
const COLS      = 21;
const ROWS      = 21;

const PATH   = 0;
const WALL   = 1;
const PELLET = 2;
const POWER  = 3;

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

// ── PACMAN STATE (NEW in Day 2) ───────────────────────────────
let pacRow = 16;
let pacCol = 10;
let pacDir = 0;          // angle in degrees: 0=right, 180=left, 90=down, 270=up
let mouthAngle = 0;      // grows from 0 → 40 degrees (mouth open width)
let mouthOpen  = true;   // true = opening, false = closing

let score = 0;

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
  animateMouth();   // update mouth open/close each frame
  drawPacman();
  drawScore();
}

// ── DRAW MAZE (same as Day 1) ─────────────────────────────────
function drawMaze() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      let cell = maze[row][col];
      let x    = col * TILE_SIZE;
      let y    = row * TILE_SIZE;

      if (cell === WALL) {
        fill(0, 0, 180); noStroke();
        rect(x, y, TILE_SIZE, TILE_SIZE);
      } else if (cell === PELLET) {
        fill(0); rect(x, y, TILE_SIZE, TILE_SIZE);
        fill(255, 255, 200); noStroke();
        circle(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 4);
      } else if (cell === POWER) {
        fill(0); rect(x, y, TILE_SIZE, TILE_SIZE);
        fill(255, 180, 0); noStroke();
        circle(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 12);
      } else {
        fill(0); rect(x, y, TILE_SIZE, TILE_SIZE);
      }
    }
  }
}

// ── ANIMATE MOUTH (NEW in Day 2) ──────────────────────────────
// Oscillates mouthAngle between 0 and 40 degrees
function animateMouth() {
  if (mouthOpen) {
    mouthAngle += 4;
    if (mouthAngle >= 40) mouthOpen = false;
  } else {
    mouthAngle -= 4;
    if (mouthAngle <= 0)  mouthOpen = true;
  }
}

// ── DRAW PACMAN (NEW in Day 2) ────────────────────────────────
// Draws Pacman as a yellow pie/wedge using arc()
function drawPacman() {
  let x = pacCol * TILE_SIZE + TILE_SIZE / 2;
  let y = pacRow * TILE_SIZE + TILE_SIZE / 2;
  let r = TILE_SIZE - 2;   // diameter

  fill(255, 220, 0);
  noStroke();

  // arc(x, y, w, h, startAngle, stopAngle, PIE)
  // pacDir rotates the mouth opening to face the right direction
  let startA = radians(pacDir + mouthAngle);
  let stopA  = radians(pacDir + 360 - mouthAngle);
  arc(x, y, r, r, startA, stopA, PIE);
}

// ── DRAW SCORE (NEW in Day 2) ─────────────────────────────────
function drawScore() {
  fill(255);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  text('SCORE: ' + score, 6, 4);
}

// ── KEY PRESSED (NEW in Day 2) ────────────────────────────────
// Moves Pacman one tile in the pressed direction if no wall is there
function keyPressed() {
  let nextRow = pacRow;
  let nextCol = pacCol;

  if (keyCode === UP_ARROW)    { nextRow -= 1; pacDir = 270; }
  if (keyCode === DOWN_ARROW)  { nextRow += 1; pacDir = 90;  }
  if (keyCode === LEFT_ARROW)  { nextCol -= 1; pacDir = 180; }
  if (keyCode === RIGHT_ARROW) { nextCol += 1; pacDir = 0;   }

  // Wall collision — only move if the next tile is not a wall
  if (maze[nextRow][nextCol] !== WALL) {
    pacRow = nextRow;
    pacCol = nextCol;

    // Eat pellet or power pellet
    if (maze[pacRow][pacCol] === PELLET) {
      maze[pacRow][pacCol] = PATH;
      score += 10;
    } else if (maze[pacRow][pacCol] === POWER) {
      maze[pacRow][pacCol] = PATH;
      score += 50;
    }
  }
}
